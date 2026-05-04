import Anthropic from "@anthropic-ai/sdk";
import { NextResponse } from "next/server";
import { z } from "zod";
import { enforceRateLimitPersistent, enforceSameOrigin } from "@/lib/security/requestGuards";

const requestSchema = z.object({
  question: z.string().trim().min(1).max(1200),
  currentTab: z.string().trim().max(80).optional(),
  assistantPersona: z.string().trim().max(80).optional(),
});

const HOPFEN_HUGO_SYSTEM = [
  "Du bist Hopfen Hugo, der Chat-Assistent im EvGlab-Dashboard.",
  "Du beantwortest ausschliesslich Themen rund um KI-Bildgenerierung und die zugehoerigen Schritte im Dashboard: Bild-Prompts, Motive, Szenen, Licht, Kamera/Stil, Marken-Look, Brand-Lock, Varianten, Aufloesung/Format, Mediathek fuer generierte Bilder, Token-Verbrauch und Bedienung der Bild-Tools.",
  "Du gibst keine Rezepte, kein Brauwissen, keine Gaer-/Sudhaus-Anleitungen, kein allgemeines Bierwissen und keine Themen ausserhalb von Bild-Workflows in EvGlab.",
  "Wenn die Nutzerfrage nicht klar zu KI-Bildern oder diesen Dashboard-Schritten gehoert: lehne in einem kurzen Satz ab und biete maximal ein konkretes Bild-Thema an (z. B. naechstes Werbemotiv, Prompt-Formulierung).",
  "Keine Meta-Tipps wie \"frag konkret\" oder \"beende mit Danke\" — keine Life-Coach- oder ChatGPT-Allgemeinplaetze.",
  "Antworte auf Deutsch, kurz und praktisch, ohne Markdown-Listen wenn es ohne geht.",
].join(" ");

function fallbackAnswer(question: string): string {
  const q = question.toLowerCase();
  if (
    /rezept|brauen|maisch|wuerze|würze|gaer|gär|hefe|sudhaus|weiss|weiß|weizen|hopfeneinkauf|wasserprofile/i.test(q)
  ) {
    return "Dazu kann ich nicht helfen: Ich unterstuetze nur KI-Bildgenerierung in EvGlab — etwa Prompt, Szene, Licht oder Markenlook fuer euer naechstes Werbemotiv. Was moechtet ihr als Naechstes visuell umsetzen?";
  }
  if (/marke|brand|stil|look|prompt|bild|motiv|foto|render|kampagne/i.test(q)) {
    return "Fuer starke Bilder: Brand-Lock sinnvoll setzen, Referenzen knapp halten und den Prompt mit Szene, Licht, Produktpose und Format (z. B. 4:5 fuer Feed) schreiben — dann Varianten erzeugen und die beste behalten.";
  }
  if (/token|abo|billing|budget|credit/i.test(q)) {
    return "Unter Abo & Tokens siehst du Verbrauch und Restbudget fuer Bilder. Bei knappen Credits: weniger Varianten, passende Aufloesung waehlen und Prompts schlank halten.";
  }
  return "Ich helfe nur bei KI-Bildern in EvGlab: Prompt, Szene, Stil, Markenkonsistenz, Mediathek und Tokens fuer Bilder. Schreibt kurz, welches Motiv ihr braucht (Produkt, Umgebung, Format), dann schlage ich die naechsten Schritte vor.";
}

function getPreferredModel(): string {
  const fromEnv = process.env.ANTHROPIC_MODEL?.trim();
  if (fromEnv) return fromEnv;
  return "claude-3-5-sonnet-latest";
}

export async function POST(req: Request) {
  try {
    const rateError = await enforceRateLimitPersistent(req, {
      keyPrefix: "brauerei-assistant",
      limit: 40,
      windowMs: 60_000,
    });
    if (rateError) return rateError;
    const originError = enforceSameOrigin(req);
    if (originError) return originError;

    const parsed = requestSchema.safeParse(await req.json());
    if (!parsed.success) {
      return NextResponse.json({ error: "Ungueltige Anfrage." }, { status: 400 });
    }

    const { question, currentTab, assistantPersona } = parsed.data;
    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ answer: fallbackAnswer(question) }, { status: 200 });
    }

    const anthropic = new Anthropic({ apiKey });
    const response = await anthropic.messages.create({
      model: getPreferredModel(),
      max_tokens: 350,
      temperature: 0.35,
      system: HOPFEN_HUGO_SYSTEM,
      messages: [
        {
          role: "user",
          content: [
            `Aktiver Dashboard-Tab: ${currentTab ?? "unbekannt"}`,
            `Persona: ${assistantPersona ?? "hopfen-hugo"}`,
            "",
            "Nutzerfrage:",
            question,
            "",
            "Antworte nur im Rahmen von KI-Bildgenerierung und EvGlab-Bild-Workflows (siehe System).",
          ].join("\n"),
        },
      ],
    });

    const textBlock = response.content.find((item) => item.type === "text");
    const answer = textBlock?.type === "text" ? textBlock.text.trim() : "";
    return NextResponse.json({ answer: answer || fallbackAnswer(question) }, { status: 200 });
  } catch {
    return NextResponse.json({ error: "Assistent konnte nicht antworten." }, { status: 500 });
  }
}
