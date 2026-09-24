/**
 * Spiegel der Studio-Pläne aus app.brewai.de (`lib/billing/planCatalog.ts`).
 */

export type NeuStudioPlan = {
  id: "start" | "growth" | "pro" | "enterprise";
  tag: string;
  name: string;
  monthly: number;
  compareAtMonthly: number;
  recommended?: boolean;
  features: string[];
};

const TOKENS = { start: 1200, growth: 3000, pro: 7500, enterprise: 20000 } as const;

const CARRY: Record<keyof typeof TOKENS, string> = {
  start: "Keine Übertragung ungenutzter Tokens",
  growth: "Ungenutzte Tokens 1 Monat übertragbar",
  pro: "Ungenutzte Tokens 2 Monate übertragbar",
  enterprise: "Ungenutzte Tokens 3 Monate übertragbar",
};

function formatPlanImageEstimate(monthlyTokens: number): string {
  const min = Math.max(1, Math.floor(monthlyTokens / 17));
  const max = Math.max(min, Math.floor(monthlyTokens / 3));
  return `ca. ${min.toLocaleString("de-DE")}–${max.toLocaleString("de-DE")} Bilder`;
}

function formatPlanVideoEstimate(monthlyTokens: number): string {
  const standardCost = 100;
  const longCost = 240;
  const maxVideos = Math.max(1, Math.floor(monthlyTokens / standardCost));
  const minVideos = Math.max(1, Math.floor(monthlyTokens / longCost));
  return `ca. ${minVideos.toLocaleString("de-DE")}–${maxVideos.toLocaleString("de-DE")} Videos`;
}

function buildFeatures(
  planId: keyof typeof TOKENS,
  teamLine: string,
  supportLine: string,
): string[] {
  const tokens = TOKENS[planId];
  return [
    `${tokens.toLocaleString("de-DE")} Tokens / Monat`,
    `${formatPlanImageEstimate(tokens)} · ${formatPlanVideoEstimate(tokens)}`,
    "Videos erstellen mit Seedance 2.5",
    teamLine,
    supportLine,
    CARRY[planId],
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
  {
    id: "enterprise",
    tag: "Für Gruppen, Verbünde und Agenturen",
    name: "Brauerei Enterprise",
    monthly: 599,
    compareAtMonthly: 799,
    features: buildFeatures(
      "enterprise",
      "25 Teamplätze (Inhaber inklusive)",
      "Direkter Ansprechpartner für euer Team",
    ),
  },
];

export function getNeuPlanDisplayMonthlyPrice(plan: NeuStudioPlan, yearlyBilling: boolean): number {
  return yearlyBilling ? plan.monthly : plan.compareAtMonthly;
}

export function getNeuPlanAnnualSavingsVsList(plan: NeuStudioPlan): number {
  return (plan.compareAtMonthly - plan.monthly) * 12;
}
