import { NextResponse } from "next/server";
import { z } from "zod";
import { UMFRAGE_SURVEY_ID } from "@/content/umfrage";
import { enforceRateLimitPersistent, enforceSameOrigin } from "@/lib/security/requestGuards";
import { createAdminClient } from "@/lib/supabase/admin";

/** Empfänger für Umfrage-Benachrichtigungen */
const UMFRAGE_NOTIFY_EMAIL = "umfrage@brewai.de";

const payloadSchema = z.object({
  answers: z.record(z.string(), z.unknown()),
  email: z.string().trim().max(254).optional(),
  company: z.string().trim().max(200).optional(),
  wantsResults: z.boolean().optional(),
  wantsPersonalAnalysis: z.enum(["ja", "spaeter", "nein"]).optional(),
});

function formatAnswersForEmail(answers: Record<string, unknown>): string {
  return Object.entries(answers)
    .map(([key, value]) => {
      const rendered =
        typeof value === "string"
          ? value
          : Array.isArray(value)
            ? value.join(", ")
            : JSON.stringify(value);
      return `${key}: ${rendered}`;
    })
    .join("\n");
}

async function notifyUmfrageInbox(input: {
  email?: string;
  company?: string;
  wantsResults: boolean;
  wantsPersonalAnalysis?: string;
  answers: Record<string, unknown>;
}) {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  const from = (process.env.RESEND_FROM_EMAIL || process.env.ADMIN_2FA_FROM_EMAIL)?.trim();
  if (!apiKey || !from) {
    throw new Error("RESEND_API_KEY oder RESEND_FROM_EMAIL fehlt.");
  }

  const replyEmail = input.email?.trim();
  const subjectParts = ["Umfrage: Brauerei-Marketing-Barometer 2026"];
  if (input.company) subjectParts.push(input.company);
  if (input.wantsPersonalAnalysis === "ja") subjectParts.push("Analyse-Interesse");

  const text = [
    `Brauerei: ${input.company || "(keine Angabe)"}`,
    `E-Mail Teilnehmer: ${replyEmail || "(keine Angabe)"}`,
    `Auswertung gewünscht: ${input.wantsResults ? "ja" : "nein"}`,
    `Persönliche Analyse: ${input.wantsPersonalAnalysis || "(keine Angabe)"}`,
    "",
    "Antworten:",
    formatAnswersForEmail(input.answers),
  ].join("\n");

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [UMFRAGE_NOTIFY_EMAIL],
      ...(replyEmail ? { reply_to: replyEmail } : {}),
      subject: subjectParts.join(" – "),
      text,
    }),
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Resend failed: ${body}`);
  }
}

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

    // Mail an umfrage@ – Fehler blockieren die Teilnahme nicht (Antwort ist schon gespeichert).
    try {
      await notifyUmfrageInbox({
        email: email ?? undefined,
        company: company ?? undefined,
        wantsResults,
        wantsPersonalAnalysis,
        answers,
      });
    } catch (err) {
      console.error("[umfrage] notify failed", err);
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[umfrage] unexpected", err);
    return NextResponse.json(
      { error: "Ein Fehler ist aufgetreten. Bitte versuchen Sie es später erneut." },
      { status: 500 },
    );
  }
}
