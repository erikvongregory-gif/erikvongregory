import { NextResponse } from "next/server";
import { z } from "zod";
import { UMFRAGE_SURVEY_ID } from "@/content/umfrage";
import {
  formatUmfrageNotifyHtml,
  formatUmfrageNotifyText,
  type UmfrageNotifyInput,
} from "@/lib/umfrageNotifyFormat";
import { enforceRateLimitPersistent, enforceSameOrigin } from "@/lib/security/requestGuards";
import { createAdminClient } from "@/lib/supabase/admin";

/**
 * brewai.de ist bei Resend verifiziert → From + To auf @brewai.de.
 * Mehrere Empfänger: UMFRAGE_NOTIFY_EMAIL komma-getrennt.
 */
const UMFRAGE_RESEND_TO = (
  process.env.UMFRAGE_NOTIFY_EMAIL?.trim() || "umfrage@brewai.de"
)
  .split(",")
  .map((e) => e.trim())
  .filter(Boolean);

const payloadSchema = z.object({
  answers: z.record(z.string(), z.unknown()),
  name: z.string().trim().max(120).optional(),
  company: z.string().trim().max(200).optional(),
  /** Telefon oder E-Mail (Papierbogen: ein Feld). */
  contact: z.string().trim().max(254).optional(),
  consent: z.boolean().optional(),
});

const isEmail = (s: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);

async function notifyViaResend(input: UmfrageNotifyInput) {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  if (!apiKey) throw new Error("RESEND_API_KEY fehlt.");

  const subjectParts = ["Umfrage: Marketing in Brauereien"];
  if (input.company) subjectParts.push(input.company);
  if (input.answers.gespraech === "ja" && input.contact) subjectParts.push("Gespräch ja");
  else if (input.answers.beispielmotiv === "ja" && input.contact) subjectParts.push("Beispielmotiv");

  const from =
    process.env.UMFRAGE_FROM_EMAIL?.trim() ||
    "BrewAI Umfrage <umfrage@brewai.de>";

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: UMFRAGE_RESEND_TO,
      ...(input.email ? { reply_to: input.email } : {}),
      subject: subjectParts.join(" – "),
      text: formatUmfrageNotifyText(input),
      html: formatUmfrageNotifyHtml(input),
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

    const answers = { ...parsed.data.answers };
    // Kontaktfelder nur mit Einwilligung speichern (Papierbogen: Checkbox unter Frage 30).
    const consent = parsed.data.consent === true;
    const name = consent ? parsed.data.name?.trim() || null : null;
    const company = consent ? parsed.data.company?.trim() || null : null;
    const contact = consent ? parsed.data.contact?.trim() || null : null;

    if (contact && contact.includes("@") && !isEmail(contact)) {
      return NextResponse.json({ error: "Bitte eine gültige E-Mail-Adresse angeben." }, { status: 400 });
    }

    if (Object.keys(answers).length < 5) {
      return NextResponse.json({ error: "Bitte beantworten Sie die Fragen vollständig." }, { status: 400 });
    }

    const email = contact && isEmail(contact) ? contact : null;
    const phone = contact && !email ? contact : null;

    // Bestehende Tabelle ohne Migration: Name/Telefon liegen im answers-JSON unter _kontakt.
    if (name || phone) {
      answers._kontakt = { ...(name ? { name } : {}), ...(phone ? { telefon: phone } : {}) };
    }

    const beispielmotiv = answers.beispielmotiv;
    const gespraech = answers.gespraech;
    const wantsResults = Boolean(
      contact && (beispielmotiv === "ja" || beispielmotiv === "vielleicht"),
    );
    const wantsPersonalAnalysis =
      gespraech === "ja" ? "ja" : gespraech === "nein" ? "nein" : null;

    const admin = createAdminClient();
    const { error } = await admin.from("survey_responses").insert({
      survey_id: UMFRAGE_SURVEY_ID,
      answers,
      email,
      company,
      wants_results: wantsResults,
      wants_personal_analysis: wantsPersonalAnalysis,
    });

    if (error) {
      console.error("[umfrage] supabase insert failed", error);
      return NextResponse.json(
        { error: "Speichern fehlgeschlagen. Bitte versuchen Sie es später erneut." },
        { status: 500 },
      );
    }

    try {
      await notifyViaResend({
        name: name ?? undefined,
        company: company ?? undefined,
        contact: contact ?? undefined,
        email: email ?? undefined,
        answers,
      });
      return NextResponse.json({ ok: true, notified: true });
    } catch (err) {
      console.error("[umfrage] notify failed", err);
      // Antwort ist gespeichert – Mail-Fehler nicht als totalen Fail anzeigen.
      return NextResponse.json({ ok: true, notified: false });
    }
  } catch (err) {
    console.error("[umfrage] unexpected", err);
    return NextResponse.json(
      { error: "Ein Fehler ist aufgetreten. Bitte versuchen Sie es später erneut." },
      { status: 500 },
    );
  }
}
