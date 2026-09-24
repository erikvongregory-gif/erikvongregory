/**
 * Spiegel der Studio-Pläne aus app.brewai.de (`lib/billing/planCatalog.ts`).
 * Preise/Tokens hier halten — gleiche Logik wie im Dashboard.
 */

export type NeuStudioPlan = {
  id: "start" | "growth" | "pro";
  tag: string;
  name: string;
  /** Aktions-Monatspreis bei Jahresabo */
  monthly: number;
  /** Listenpreis Monatsabo */
  compareAtMonthly: number;
  recommended?: boolean;
  features: string[];
};

const TOKENS = { start: 1200, growth: 3000, pro: 7500 } as const;
const CARRY_FEATURE = "Ungenutzte Tokens 1 Monat übertragbar";

/** Spiegel `generationTokenCost.ts` — Bild 3–17 Tokens, Video 720p 5s/12s mit Audio. */
function formatPlanImageEstimate(monthlyTokens: number): string {
  const min = Math.max(1, Math.floor(monthlyTokens / 17));
  const max = Math.max(min, Math.floor(monthlyTokens / 3));
  return `ca. ${min.toLocaleString("de-DE")}–${max.toLocaleString("de-DE")} Bilder`;
}

function formatPlanVideoEstimate(monthlyTokens: number): string {
  const standardCost = 100; // Seedance 2.5 · 720p · 5 s · Audio
  const longCost = 240; // 720p · 12 s · Audio
  const maxVideos = Math.max(1, Math.floor(monthlyTokens / standardCost));
  const minVideos = Math.max(1, Math.floor(monthlyTokens / longCost));
  return `ca. ${minVideos.toLocaleString("de-DE")}–${maxVideos.toLocaleString("de-DE")} Videos`;
}

function buildFeatures(planId: keyof typeof TOKENS, teamLine: string, supportLine: string): string[] {
  const tokens = TOKENS[planId];
  return [
    `${tokens.toLocaleString("de-DE")} Tokens / Monat`,
    `${formatPlanImageEstimate(tokens)} · ${formatPlanVideoEstimate(tokens)}`,
    "Videos erstellen mit Seedance 2.5",
    teamLine,
    supportLine,
    CARRY_FEATURE,
  ];
}

export const NEU_STUDIO_PLANS: NeuStudioPlan[] = [
  {
    id: "start",
    tag: "Für kleine Teams, die regelmäßig posten",
    name: "Brauerei Start",
    monthly: 79,
    compareAtMonthly: 100,
    features: buildFeatures("start", "1 Teamplatz (Inhaber inklusive)", "E-Mail-Support"),
  },
  {
    id: "growth",
    tag: "Für aktive Brauereien mit Saisonkampagnen",
    name: "Brauerei Wachstum",
    monthly: 149,
    compareAtMonthly: 200,
    recommended: true,
    features: buildFeatures("growth", "3 Teamplätze (Inhaber inklusive)", "Priorisierter Support"),
  },
  {
    id: "pro",
    tag: "Für Marken mit hohem Content-Bedarf",
    name: "Brauerei Pro",
    monthly: 299,
    compareAtMonthly: 400,
    features: buildFeatures(
      "pro",
      "10 Teamplätze (Inhaber inklusive)",
      "Fast-Lane Rendering + Premium-Support",
    ),
  },
];

/** Wie Dashboard: jährlich = Aktionspreis, monatlich = Listenpreis. */
export function getNeuPlanDisplayMonthlyPrice(plan: NeuStudioPlan, yearlyBilling: boolean): number {
  return yearlyBilling ? plan.monthly : plan.compareAtMonthly;
}

export function getNeuPlanAnnualSavingsVsList(plan: NeuStudioPlan): number {
  return (plan.compareAtMonthly - plan.monthly) * 12;
}
