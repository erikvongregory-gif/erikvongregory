import Anthropic from "@anthropic-ai/sdk";
import { NextResponse } from "next/server";
import { z } from "zod";
import { DEFAULT_BREWERY_IMAGE_SKILL_SYSTEM_PROMPT } from "@/lib/prompts/brewerySkill";
import { enforceRateLimit, enforceSameOrigin } from "@/lib/security/requestGuards";

type PromptRequestBody = {
  biertyp: string;
  behaelter?: string;
  markenname: string;
  zielgruppe: string;
  plattform: string;
  stimmung: string;
  kiPlattform: string;
  etikettModus?: string;
  referenzStaerke?: "Niedrig" | "Mittel" | "Hoch" | "Strikt";
  referenzen?: string;
  besondererHintergrund?: string;
  saisonalerBezug?: string;
  textImLabel?: string;
  vermeiden?: string;
};

const promptRequestSchema = z.object({
  biertyp: z.string().trim().min(1).max(80),
  behaelter: z.string().trim().max(50).optional(),
  markenname: z.string().trim().min(1).max(120),
  zielgruppe: z.string().trim().min(1).max(80),
  plattform: z.string().trim().min(1).max(80),
  stimmung: z.string().trim().min(1).max(80),
  kiPlattform: z.string().trim().max(80),
  etikettModus: z.string().trim().max(50).optional(),
  referenzStaerke: z.enum(["Niedrig", "Mittel", "Hoch", "Strikt"]).optional(),
  referenzen: z.string().trim().max(500).optional(),
  besondererHintergrund: z.string().trim().max(500).optional(),
  saisonalerBezug: z.string().trim().max(240).optional(),
  textImLabel: z.string().trim().max(240).optional(),
  vermeiden: z.string().trim().max(500).optional(),
});

function getStrictGlassRule(biertyp: string): string {
  const beer = biertyp.toLowerCase();
  if (/(helles|lager|export|radler|alkoholfrei)/i.test(beer)) {
    return "Mandatory glass constraint: use ONLY a traditional Willibecher glass. NEVER use a Weizen glass.";
  }
  if (/(weizen|weissbier|hefeweizen)/i.test(beer)) {
    return "Mandatory glass constraint: use ONLY a tall curved Weizen glass. NEVER use a Willibecher.";
  }
  if (/(pils|pilsner)/i.test(beer)) {
    return "Mandatory glass constraint: use ONLY a tall slender Pilsner flute. NEVER use a Weizen glass.";
  }
  return "Mandatory glass constraint: use the beer-style-correct glass only. Never substitute with a Weizen glass unless beer style is Weizen.";
}

function getClaudeSystemPrompt(): string {
  const fromEnv = process.env.ANTHROPIC_SKILL_PROMPT?.trim();
  return fromEnv || DEFAULT_BREWERY_IMAGE_SKILL_SYSTEM_PROMPT;
}

function getPreferredModel(): string {
  const fromEnv = process.env.ANTHROPIC_MODEL?.trim();
  if (fromEnv) return fromEnv;
  // Stable default alias from Anthropic docs; avoids brittle hard-coded snapshot names.
  return "claude-3-5-sonnet-latest";
}

function buildClaudeInput(body: PromptRequestBody): string {
  const strictGlassRule = getStrictGlassRule(body.biertyp ?? "");
  const containerRule =
    body.behaelter === "Nur Flasche"
      ? "Container constraint: show only bottle/can, no poured glass visible."
      : body.behaelter === "Nur Glas"
        ? "Container constraint: show only glass, no bottle/can visible."
        : "Container constraint: if both bottle and glass are shown, keep realistic scale and matching style.";

  const effectiveReferenceStrength =
    body.etikettModus === "Ja, Etikett 1:1"
      ? "Strikt"
      : (body.referenzStaerke ?? "Mittel");
  const referenceStrengthRule =
    effectiveReferenceStrength === "Strikt"
      ? "Reference adherence: STRICT. Prioritize exact branding fidelity to the reference (logo placement, typography proportions, color blocks). Avoid any stylized drift."
      : effectiveReferenceStrength === "Hoch"
        ? "Reference adherence: HIGH. Keep visual identity and label style very close to the reference."
        : effectiveReferenceStrength === "Niedrig"
          ? "Reference adherence: LOW. Use reference mainly for overall mood and palette."
          : "Reference adherence: MEDIUM. Follow key elements from reference while keeping room for adaptation.";
  const labelFidelityRule =
    body.etikettModus === "Ja, Etikett 1:1"
      ? "Label fidelity (NON-NEGOTIABLE): keep the exact bottle/label brand identity from reference. Do not redesign, replace, or substitute branding. Do NOT paste or overlay the reference image itself. Re-render the bottle naturally in-scene. Text must be tack-sharp, front-readable, and non-distorted. No warped, melted, stretched, mirrored, or blurred lettering."
      : "If any label text is rendered, keep it clean and legible.";
  const physicalRealismRule =
    "Physical realism lock: bottle must have plausible real-world scale versus human anatomy and surrounding props; no giant or toy-like proportions. Enforce true scene integration with contact shadows, finger occlusion, grip pressure, and matching light direction/speculars. Absolutely avoid cutout/sticker/composited look.";

  return [
    "Erstelle einen hochwertigen ENGLISCHEN Image-Generation Prompt fuer eine Brauerei auf Basis dieses Briefings.",
    "Nutze die folgenden Briefing-Daten:",
    JSON.stringify(body, null, 2),
    "",
    "Regeln:",
    "- Gib NUR den finalen Prompt als reinen Text aus (kein Markdown, keine Erklaerung).",
    "- Der Prompt soll fotorealistisch und werblich nutzbar sein.",
    "- Baue Biertyp, Stimmung, Plattform, Licht, Kamera/Linse und Kompositionshinweise ein.",
    "- Wenn Label-Text angegeben ist, integriere ihn klar lesbar.",
    "- Wenn 'vermeiden' gesetzt ist, beruecksichtige es im Prompt.",
    `- ${referenceStrengthRule}`,
    `- ${labelFidelityRule}`,
    `- ${physicalRealismRule}`,
    `- ${strictGlassRule}`,
    `- ${containerRule}`,
  ].join("\n");
}

export async function POST(req: Request) {
  try {
    const rateError = enforceRateLimit(req, {
      keyPrefix: "claude-prompt",
      limit: 20,
      windowMs: 60_000,
    });
    if (rateError) return rateError;
    const originError = enforceSameOrigin(req);
    if (originError) return originError;

    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "ANTHROPIC_API_KEY fehlt." }, { status: 500 });
    }

    const parseResult = promptRequestSchema.safeParse(await req.json());
    if (!parseResult.success) {
      return NextResponse.json({ error: "Ungültige Anfrage." }, { status: 400 });
    }

    const body = parseResult.data as PromptRequestBody;
    const anthropic = new Anthropic({ apiKey });
    const modelCandidates = Array.from(
      new Set([
        getPreferredModel(),
        "claude-3-5-sonnet-latest",
        "claude-3-5-haiku-latest",
      ]),
    );

    let response: Awaited<ReturnType<typeof anthropic.messages.create>> | null = null;
    let lastError: unknown = null;
    for (const model of modelCandidates) {
      try {
        response = await anthropic.messages.create({
          model,
          max_tokens: 1000,
          temperature: 0.4,
          system: getClaudeSystemPrompt(),
          messages: [
            {
              role: "user",
              content: buildClaudeInput(body),
            },
          ],
        });
        break;
      } catch (error) {
        lastError = error;
      }
    }

    if (!response) {
      throw lastError ?? new Error("Claude-Model konnte nicht geladen werden.");
    }

    const textBlock = response.content.find((item) => item.type === "text");
    const promptRaw = textBlock?.type === "text" ? textBlock.text.trim() : "";
    const prompt = promptRaw.replace(/^```[a-zA-Z]*\s*/g, "").replace(/```$/g, "").trim();

    if (!prompt) {
      return NextResponse.json({ error: "Claude hat keinen Prompt geliefert." }, { status: 502 });
    }

    return NextResponse.json({ prompt });
  } catch (error) {
    console.error("Claude API error:", error);
    const message = error instanceof Error ? error.message : "";
    if (/api key/i.test(message) || /authentication/i.test(message) || /unauthorized/i.test(message)) {
      return NextResponse.json({ error: "Anthropic-Authentifizierung fehlgeschlagen. Prüfe ANTHROPIC_API_KEY." }, { status: 500 });
    }
    if (/model/i.test(message) || /not found/i.test(message)) {
      return NextResponse.json({ error: "Anthropic-Modell nicht verfügbar. Prüfe ANTHROPIC_MODEL in den Umgebungsvariablen." }, { status: 500 });
    }
    return NextResponse.json({ error: "Claude-Anfrage fehlgeschlagen." }, { status: 500 });
  }
}
