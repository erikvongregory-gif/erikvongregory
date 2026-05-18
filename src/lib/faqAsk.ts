import { MOBILE_PRICING_TRACKS, tierDisplayName } from "@/lib/mobilePricingTiers";
import { TRESENGESPRAECH_FAQS } from "@/lib/tresengespraechFaqs";

const GERMAN_STOP = new Set([
  "und",
  "oder",
  "der",
  "die",
  "das",
  "ein",
  "eine",
  "ist",
  "sind",
  "wie",
  "was",
  "kann",
  "ich",
  "wir",
  "du",
  "sie",
  "mit",
  "für",
  "auf",
  "bei",
  "den",
  "dem",
  "des",
  "von",
  "zu",
  "im",
  "in",
  "am",
  "an",
]);

/** Keine verbindlichen Preis-/Lieferzeit-Aussagen per KI. */
const BLOCKED_TOPIC_PATTERN =
  /\b(preis|preise|kosten|euro|€|u?s?t\.?g\.?|lieferzeit|lieferfrist|garantie|vertraglich|rabatt|skonto|stundensatz|tag\s*\d|in\s+\d+\s*(tag|woche)|wochen?\s*\d)\b/i;

export const FAQ_ASK_SYSTEM = [
  "Du bist Erik von EvGlab und antwortest Brauerei-Inhabern in einem kurzen Chat (Tresengespräch).",
  "Antworte auf Deutsch, direkt und ruhig, maximal 3 kurze Sätze.",
  "Nutze NUR die mitgelieferten FAQ- und Produktinfos. Erfinde nichts.",
  "Nenne KEINE konkreten Euro-Preise, keine exakten Lieferfristen und keine rechtlichen Garantien — verweise dafür auf ein persönliches Gespräch.",
  "Wenn die Frage nicht aus dem Kontext beantwortbar ist, sage ehrlich, dass du es persönlich klärst, und lade zum Kontakt ein.",
  "Kein Marketing-Blabla, keine Emojis, keine Aufzählungslisten.",
].join(" ");

function tokenize(text: string): Set<string> {
  const tokens = text
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9äöüß\s]/gi, " ")
    .split(/\s+/)
    .filter((w) => w.length > 2 && !GERMAN_STOP.has(w));
  return new Set(tokens);
}

function jaccard(a: Set<string>, b: Set<string>): number {
  if (a.size === 0 || b.size === 0) return 0;
  let inter = 0;
  for (const t of a) {
    if (b.has(t)) inter += 1;
  }
  const union = a.size + b.size - inter;
  return union === 0 ? 0 : inter / union;
}

function buildPricingContext(): string {
  const lines: string[] = ["Pakete (ohne Euro-Beträge im Chat nennen):"];
  for (const track of ["manufaktur", "werkstatt"] as const) {
    for (const tier of MOBILE_PRICING_TRACKS[track]) {
      lines.push(
        `- ${tierDisplayName(tier.tier)} (${track}, ${tier.cadence}): ${tier.tagline}. Features: ${tier.features.join("; ")}`,
      );
    }
  }
  return lines.join("\n");
}

export function buildFaqKnowledgeContext(): string {
  const faqBlock = TRESENGESPRAECH_FAQS.map((f, i) => `${i + 1}. F: ${f.q}\n   A: ${f.a}`).join("\n");
  return [`Häufige Fragen:\n${faqBlock}`, buildPricingContext()].join("\n\n");
}

export function isBlockedFaqTopic(question: string): boolean {
  return BLOCKED_TOPIC_PATTERN.test(question);
}

export function findBestFaqMatch(question: string): { index: number; score: number } {
  const qTokens = tokenize(question);
  let bestIndex = -1;
  let bestScore = 0;

  TRESENGESPRAECH_FAQS.forEach((faq, index) => {
    const corpus = tokenize(`${faq.q} ${faq.a}`);
    const score = jaccard(qTokens, corpus);
    if (score > bestScore) {
      bestScore = score;
      bestIndex = index;
    }
  });

  return { index: bestIndex, score: bestScore };
}

export function faqContactFallbackMessage(): string {
  return "Gute Frage — Preise, Lieferzeiten und individuelle Konditionen kläre ich am liebsten persönlich. Schreib mir kurz über das Kontaktformular, dann melde ich mich meist binnen 24 Stunden.";
}

export function faqLowConfidenceFallbackMessage(): string {
  return "Das beantworte ich dir am besten direkt — schreib mir kurz deine Frage im Kontaktformular, dann gehe ich gezielt darauf ein.";
}
