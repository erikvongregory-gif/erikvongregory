import Anthropic from "@anthropic-ai/sdk";
import { NextResponse } from "next/server";
import { z } from "zod";
import {
  FAQ_ASK_SYSTEM,
  buildFaqKnowledgeContext,
  faqContactFallbackMessage,
  faqLowConfidenceFallbackMessage,
  findBestFaqMatch,
  isBlockedFaqTopic,
} from "@/lib/faqAsk";
import { TRESENGESPRAECH_FAQS } from "@/lib/tresengespraechFaqs";
import { enforceRateLimitPersistent, enforceSameOrigin } from "@/lib/security/requestGuards";

const requestSchema = z.object({
  question: z.string().trim().min(2).max(500),
});

const CONFIDENCE_CONTACT_THRESHOLD = 0.12;
const CONFIDENCE_FAQ_DIRECT_THRESHOLD = 0.42;

function getPreferredModel(): string {
  return process.env.ANTHROPIC_MODEL?.trim() || "claude-3-5-sonnet-latest";
}

function hasUsableAnthropicKey(value: string | undefined): value is string {
  if (!value) return false;
  const normalized = value.trim();
  if (!normalized) return false;
  if (/^paste[_-]?anthropic[_-]?api[_-]?key$/i.test(normalized)) return false;
  return true;
}

export async function POST(req: Request) {
  try {
    const rateError = await enforceRateLimitPersistent(req, {
      keyPrefix: "faq-ask",
      limit: 5,
      windowMs: 86_400_000,
    });
    if (rateError) {
      const body = (await rateError.json().catch(() => ({}))) as { error?: string };
      return NextResponse.json(
        {
          answer:
            "Du hast heute schon ein paar Fragen gestellt — schreib mir gern direkt im Kontaktformular, dann antworte ich persönlich.",
          confidence: 0,
          suggestContact: true,
          error: body.error,
        },
        { status: 429 },
      );
    }

    const originError = enforceSameOrigin(req);
    if (originError) return originError;

    const parsed = requestSchema.safeParse(await req.json());
    if (!parsed.success) {
      return NextResponse.json({ error: "Bitte formuliere eine kurze Frage." }, { status: 400 });
    }

    const { question } = parsed.data;

    if (isBlockedFaqTopic(question)) {
      return NextResponse.json({
        answer: faqContactFallbackMessage(),
        confidence: 0,
        suggestContact: true,
      });
    }

    const match = findBestFaqMatch(question);

    if (match.score < CONFIDENCE_CONTACT_THRESHOLD) {
      return NextResponse.json({
        answer: faqLowConfidenceFallbackMessage(),
        confidence: match.score,
        suggestContact: true,
      });
    }

    if (match.score >= CONFIDENCE_FAQ_DIRECT_THRESHOLD && match.index >= 0) {
      const faq = TRESENGESPRAECH_FAQS[match.index]!;
      return NextResponse.json({
        answer: faq.a,
        confidence: match.score,
        suggestContact: false,
        matchedFaq: faq.q,
      });
    }

    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!hasUsableAnthropicKey(apiKey)) {
      if (match.index >= 0) {
        return NextResponse.json({
          answer: TRESENGESPRAECH_FAQS[match.index]!.a,
          confidence: match.score,
          suggestContact: false,
        });
      }
      return NextResponse.json({
        answer: faqLowConfidenceFallbackMessage(),
        confidence: match.score,
        suggestContact: true,
      });
    }

    const anthropic = new Anthropic({ apiKey });
    const knowledge = buildFaqKnowledgeContext();
    const matchedHint =
      match.index >= 0
        ? `Ähnlichste FAQ: „${TRESENGESPRAECH_FAQS[match.index]!.q}"`
        : "Keine enge FAQ-Übereinstimmung.";

    const response = await anthropic.messages.create({
      model: getPreferredModel(),
      max_tokens: 280,
      temperature: 0.2,
      system: FAQ_ASK_SYSTEM,
      messages: [
        {
          role: "user",
          content: [
            "Wissensbasis:",
            knowledge,
            "",
            matchedHint,
            "",
            "Nutzerfrage:",
            question,
            "",
            "Antworte nur aus der Wissensbasis. Bei Preisen/Lieferzeiten: auf persönliches Gespräch verweisen.",
          ].join("\n"),
        },
      ],
    });

    const textBlock = response.content.find((item) => item.type === "text");
    const answer = textBlock?.type === "text" ? textBlock.text.trim() : "";

    if (!answer) {
      return NextResponse.json({
        answer: faqLowConfidenceFallbackMessage(),
        confidence: match.score,
        suggestContact: true,
      });
    }

    const suggestContact =
      /kontaktformular|persönlich|schreib mir|melde mich/i.test(answer) && match.score < 0.25;

    return NextResponse.json({
      answer,
      confidence: match.score,
      suggestContact,
    });
  } catch {
    return NextResponse.json(
      {
        answer: faqLowConfidenceFallbackMessage(),
        confidence: 0,
        suggestContact: true,
      },
      { status: 200 },
    );
  }
}
