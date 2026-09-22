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

function formatPlanImageEstimate(monthlyTokens: number): string {
  const min = Math.max(1, Math.floor(monthlyTokens / 35));
  const max = Math.max(min, Math.floor(monthlyTokens / 10));
  return `ca. ${min.toLocaleString("de-DE")}–${max.toLocaleString("de-DE")} Bilder`;
}

function formatPlanVideoEstimate(monthlyTokens: number): string {
  const standardCost = 90;
  const longCost = 106;
  const maxVideos = Math.max(1, Math.floor(monthlyTokens / standardCost));
  const minVideos = Math.max(1, Math.floor(monthlyTokens / longCost));
  return `ca. ${minVideos.toLocaleString("de-DE")}–${maxVideos.toLocaleString("de-DE")} Videos`;
}

const TOKENS = { start: 1200, growth: 3000, pro: 7500 } as const;

function buildFeatures(
  planId: keyof typeof TOKENS,
  carryDays: string,
  teamLine: string,
  supportLine: string,
): string[] {
  const tokens = TOKENS[planId];
  return [
    `${tokens.toLocaleString("de-DE")} Tokens / Monat`,
    `${formatPlanImageEstimate(tokens)} · ${formatPlanVideoEstimate(tokens)}`,
    "Videos Erstellen (in Vorbereitung)",
    teamLine,
    supportLine,
    carryDays,
  ];
}

export const NEU_STUDIO_PLANS: NeuStudioPlan[] = [
  {
    id: "start",
    tag: "Für kleine Teams, die regelmäßig posten",
    name: "Brauerei Start",
    monthly: 79,
    compareAtMonthly: 100,
    features: buildFeatures(
      "start",
      "Tokens 30 Tage übertragbar",
      "1 Teamplatz (Inhaber inklusive)",
      "E-Mail-Support",
    ),
  },
  {
    id: "growth",
    tag: "Für aktive Brauereien mit Saisonkampagnen",
    name: "Brauerei Wachstum",
    monthly: 149,
    compareAtMonthly: 200,
    recommended: true,
    features: buildFeatures(
      "growth",
      "Tokens 60 Tage übertragbar",
      "3 Teamplätze (Inhaber inklusive)",
      "Priorisierter Support",
    ),
  },
  {
    id: "pro",
    tag: "Für Marken mit hohem Content-Bedarf",
    name: "Brauerei Pro",
    monthly: 299,
    compareAtMonthly: 400,
    features: buildFeatures(
      "pro",
      "Tokens 90 Tage übertragbar",
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
