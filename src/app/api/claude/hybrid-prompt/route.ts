import Anthropic from "@anthropic-ai/sdk";
import { NextResponse } from "next/server";
import { z } from "zod";
import { DEFAULT_BREWERY_IMAGE_SKILL_SYSTEM_PROMPT } from "@/lib/prompts/brewerySkill";
import { enforceRateLimitPersistent, enforceSameOrigin } from "@/lib/security/requestGuards";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/env";

const requestSchema = z.object({
  initialInput: z.string().trim().min(1).max(2000),
  history: z
    .array(
      z.object({
        question: z.string().trim().min(1).max(400),
        answer: z.string().trim().min(1).max(1200),
      }),
    )
    .max(12)
    .default([]),
  questionCount: z.number().int().min(0).max(12),
});

function getPreferredModel(): string {
  const fromEnv = process.env.ANTHROPIC_MODEL?.trim();
  if (fromEnv) return fromEnv;
  return "claude-3-5-sonnet-latest";
}

function parseJsonObject(text: string): Record<string, unknown> | null {
  const trimmed = text.trim();
  const direct = trimmed.match(/\{[\s\S]*\}/);
  if (!direct) return null;
  try {
    return JSON.parse(direct[0]) as Record<string, unknown>;
  } catch {
    return null;
  }
}

export async function POST(req: Request) {
  try {
    const rateError = await enforceRateLimitPersistent(req, {
      keyPrefix: "claude-hybrid-prompt",
      limit: 20,
      windowMs: 60_000,
    });
    if (rateError) return rateError;
    const originError = enforceSameOrigin(req);
    if (originError) return originError;

    if (!isSupabaseConfigured()) {
      return NextResponse.json({ error: "Supabase-Konfiguration fehlt." }, { status: 500 });
    }
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json({ error: "Nicht angemeldet." }, { status: 401 });
    }

    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "ANTHROPIC_API_KEY fehlt." }, { status: 500 });
    }

    const parsed = requestSchema.safeParse(await req.json());
    if (!parsed.success) {
      return NextResponse.json({ error: "Ungültige Anfrage." }, { status: 400 });
    }

    const { initialInput, history, questionCount } = parsed.data;
    const anthropic = new Anthropic({ apiKey });
    const requiredFields = [
      "bildtyp",
      "biertyp",
      "behaelter",
      "markenname",
      "zielgruppe",
      "plattform",
      "stimmung",
      "etikettModus",
      "personenModus",
      "shotType",
    ] as const;

    const response = await anthropic.messages.create({
      model: getPreferredModel(),
      max_tokens: 900,
      temperature: 0.2,
      system:
        `${DEFAULT_BREWERY_IMAGE_SKILL_SYSTEM_PROMPT}\n\n` +
        "You are an expert brewery image prompt strategist. Reply with JSON only. " +
        'Schema: {"status":"follow_up","question":"...","missingFields":["..."],"collected":{"field":"value"}} OR {"status":"complete","prompt":"...","collected":{"field":"value"}}.' +
        "Follow-up questions must be short, specific, and in German. " +
        "Final prompt must be in English and production-ready for image generation. " +
        "When status=complete, the prompt must be highly detailed (at least 180 words) and include: " +
        "scene setup, product and glass constraints, subject styling, camera/lens, lighting, composition, texture realism, color palette, and quality constraints. " +
        "Avoid short generic prompts.",
      messages: [
        {
          role: "user",
          content: [
            "User initial request:",
            initialInput,
            "",
            "Collected follow-up answers:",
            history.length > 0 ? JSON.stringify(history, null, 2) : "[]",
            "",
            `Already asked follow-up questions: ${questionCount}`,
            "",
            `Required fields that MUST be captured before completion: ${requiredFields.join(", ")}`,
            "",
            "Rules:",
            "- Extract all required fields from initialInput + history.",
            "- If at least one required field is missing, return status=follow_up.",
            "- Ask only ONE focused follow-up that can fill one or multiple missing required fields.",
            "- Never ask about fields already present in collected data.",
            "- Include missingFields array in follow_up response.",
            "- Only return complete when all required fields are present.",
            "- If questionCount >= 10 and still missing, ask one final compact multi-field follow-up.",
            "- In complete mode, produce a rich commercial-grade prompt with concrete visual directives, not a short sentence.",
            "- Always include a human realism directive in the final prompt: hyper-realistic adult humans, natural anatomy/proportions, and explicit anti-artifact constraints for faces/hands/skin.",
            "- Always include an environment realism directive for outdoor scenes: physically plausible water behavior, layered background depth, and anti-generic/no-stock-like scenery constraints.",
            "- Always include liquid continuity constraints for pouring scenes: bottle volume and glass fill must be physically consistent (no near-full bottle when glass is nearly full).",
          ].join("\n"),
        },
      ],
    });

    const textBlock = response.content.find((item) => item.type === "text");
    const text = textBlock?.type === "text" ? textBlock.text : "";
    const payload = parseJsonObject(text);

    if (!payload) {
      return NextResponse.json({ status: "complete", prompt: initialInput }, { status: 200 });
    }

    const status = payload.status;
    if (status === "follow_up") {
      const question = typeof payload.question === "string" ? payload.question.trim() : "";
      if (question) return NextResponse.json({ status: "follow_up", question }, { status: 200 });
    }

    const prompt = typeof payload.prompt === "string" ? payload.prompt.trim() : "";
    if (!prompt) {
      return NextResponse.json({ status: "complete", prompt: initialInput }, { status: 200 });
    }
    return NextResponse.json({ status: "complete", prompt }, { status: 200 });
  } catch {
    return NextResponse.json({ error: "Hybrid-Prompt konnte nicht verarbeitet werden." }, { status: 500 });
  }
}
