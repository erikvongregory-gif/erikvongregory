import { NextResponse } from "next/server";
import { z } from "zod";
import { refundTokens } from "@/lib/billing/store";
import { getPendingTaskBillingMap, withoutPendingTask } from "@/lib/kie/taskBillingMetadata";
import { enforceRateLimit, sanitizeTaskId } from "@/lib/security/requestGuards";
import { createAdminClient } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/env";

function findFirstUrl(input: unknown): string | null {
  if (typeof input === "string" && /^https?:\/\//i.test(input)) return input;
  if (Array.isArray(input)) {
    for (const item of input) {
      const found = findFirstUrl(item);
      if (found) return found;
    }
    return null;
  }
  if (input && typeof input === "object") {
    for (const value of Object.values(input)) {
      const found = findFirstUrl(value);
      if (found) return found;
    }
  }
  return null;
}

export async function GET(req: Request) {
  try {
    const rateError = enforceRateLimit(req, {
      keyPrefix: "kie-task-status",
      limit: 60,
      windowMs: 60_000,
    });
    if (rateError) return rateError;

    let userId: string | null = null;
    let currentUserMetadata: Record<string, unknown> = {};
    if (isSupabaseConfigured()) {
      const supabase = await createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        return NextResponse.json({ error: "Nicht angemeldet." }, { status: 401 });
      }
      userId = user.id;
      currentUserMetadata = (user.user_metadata as Record<string, unknown> | null) ?? {};
    }

    const apiKey = process.env.KIE_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "KIE_API_KEY fehlt." }, { status: 500 });
    }

    const { searchParams } = new URL(req.url);
    const taskIdRaw = searchParams.get("taskId");
    const taskIdParsed = z.string().trim().min(1).max(120).safeParse(taskIdRaw);
    if (!taskIdParsed.success) {
      return NextResponse.json({ error: "taskId fehlt." }, { status: 400 });
    }
    const taskId = sanitizeTaskId(taskIdParsed.data);

    const baseUrl = process.env.KIE_API_BASE_URL || "https://api.kie.ai";
    const upstream = await fetch(
      `${baseUrl}/api/v1/jobs/recordInfo?taskId=${encodeURIComponent(taskId)}`,
      {
        headers: { Authorization: `Bearer ${apiKey}` },
      },
    );

    const data = (await upstream.json()) as Record<string, unknown>;
    if (!upstream.ok) {
      return NextResponse.json(
        { error: "Kie task-status fehlgeschlagen." },
        { status: upstream.status },
      );
    }

    const payload = (data.data as Record<string, unknown> | undefined) ?? {};
    const rawState =
      (data.state as string | undefined) ||
      (data.status as string | undefined) ||
      (payload.state as string | undefined) ||
      (payload.status as string | undefined) ||
      "unknown";
    const state = rawState.toLowerCase();
    let imageUrl = findFirstUrl(data);

    // Kie liefert bei manchen Modellen URLs als JSON-String in resultJson.
    if (!imageUrl && typeof payload.resultJson === "string") {
      try {
        const parsed = JSON.parse(payload.resultJson) as unknown;
        imageUrl = findFirstUrl(parsed);
      } catch {
        // ignore parse errors and keep null
      }
    }

    if (userId) {
      const pending = getPendingTaskBillingMap(currentUserMetadata)[taskId];
      const finishedSuccess = ["success", "succeeded", "completed", "done"].includes(state) && Boolean(imageUrl);
      const finishedError = ["failed", "error", "cancelled", "canceled"].includes(state);
      if (pending && (finishedSuccess || finishedError)) {
        if (finishedError && pending.consumed > 0) {
          await refundTokens(userId, pending.consumed);
        }
        const admin = createAdminClient();
        await admin.auth.admin.updateUserById(userId, {
          user_metadata: withoutPendingTask(currentUserMetadata, taskId),
        });
      }
    }

    return NextResponse.json({ state, imageUrl });
  } catch (error) {
    return NextResponse.json({ error: "Kie task-status fehlgeschlagen." }, { status: 500 });
  }
}
