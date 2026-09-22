import { NextResponse } from "next/server";
import { z } from "zod";
import { UMFRAGE_SURVEY_ID } from "@/content/umfrage";
import { enforceRateLimitPersistent, enforceSameOrigin } from "@/lib/security/requestGuards";
import { createAdminClient } from "@/lib/supabase/admin";

const payloadSchema = z.object({
  answers: z.record(z.string(), z.unknown()),
  email: z.string().trim().max(254).optional(),
  company: z.string().trim().max(200).optional(),
  wantsResults: z.boolean().optional(),
  wantsPersonalAnalysis: z.enum(["ja", "spaeter", "nein"]).optional(),
});

export async function POST(req: Request) {
  try {
    const rateError = await enforceRateLimitPersistent(req, {
      keyPrefix: "umfrage",
      limit: 8,
      windowMs: 86_400_000,
    });
    if (rateError) return rateError;

    const originError = enforceSameOrigin(req);
    if (originError) return originError;

    const parsed = payloadSchema.safeParse(await req.json());
    if (!parsed.success) {
      return NextResponse.json({ error: "Ungültige Angaben." }, { status: 400 });
    }

    const emailRaw = parsed.data.email?.trim() || "";
    const email = emailRaw || null;
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Bitte eine gültige E-Mail-Adresse angeben." }, { status: 400 });
    }
    const company = parsed.data.company?.trim() || null;
    const wantsResults = Boolean(parsed.data.wantsResults && email);
    const wantsPersonalAnalysis = parsed.data.wantsPersonalAnalysis;
    const answers = parsed.data.answers;

    if (Object.keys(answers).length < 5) {
      return NextResponse.json({ error: "Bitte beantworten Sie die Fragen vollständig." }, { status: 400 });
    }

    const admin = createAdminClient();
    const { error } = await admin.from("survey_responses").insert({
      survey_id: UMFRAGE_SURVEY_ID,
      answers,
      email,
      company,
      wants_results: wantsResults,
      wants_personal_analysis: wantsPersonalAnalysis ?? null,
    });

    if (error) {
      console.error("[umfrage] supabase insert failed", error);
      return NextResponse.json(
        { error: "Speichern fehlgeschlagen. Bitte versuchen Sie es später erneut." },
        { status: 500 },
      );
    }

    // E-Mail-Benachrichtigung läuft clientseitig via FormSubmit
    // (Resend-Domain evglab.com ist aktuell nicht verifiziert).
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[umfrage] unexpected", err);
    return NextResponse.json(
      { error: "Ein Fehler ist aufgetreten. Bitte versuchen Sie es später erneut." },
      { status: 500 },
    );
  }
}
