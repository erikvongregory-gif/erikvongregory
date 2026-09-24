import type { SubscriptionPlanKey } from "@/lib/billing/tokenState";

export type PricingTrack = "manufaktur" | "werkstatt";

export type TierName = "Start" | "Wachstum" | "Premium" | "Enterprise";

export const WERKSTATT_PROMO_BADGE = "Im Angebot";

export type Tier = {
  tier: TierName;
  tagline: string;
  price: string;
  cadence: "einmalig" | "pro Monat";
  anchor?: string;
  features: string[];
  cta: "Angebot anfragen" | "Plan wählen";
  featured?: boolean;
  checkoutPlanKey?: SubscriptionPlanKey;
};

export const MOBILE_PRICING_TRACKS: { manufaktur: Tier[]; werkstatt: Tier[] } = {
  manufaktur: [
    {
      tier: "Start",
      tagline: "Für den Einstieg in KI-Content.",
      price: "890",
      cadence: "einmalig",
      anchor: "1.290",
      features: [
        "15 KI-Produktbilder",
        "12 Social-Media-Posts inkl. Text",
        "Optimiert für Instagram & Facebook",
        "Lieferzeit 3–5 Tage",
      ],
      cta: "Angebot anfragen",
    },
    {
      tier: "Wachstum",
      tagline: "Regelmäßig hochwertiger Content.",
      price: "1.690",
      cadence: "einmalig",
      anchor: "2.490",
      features: [
        "30 KI-Produktbilder",
        "20 Social-Media-Posts inkl. Text",
        "Bildposts für Instagram & Ads",
        "Content für IG, FB & Ads",
        "Lieferzeit 5–7 Tage",
      ],
      cta: "Angebot anfragen",
      featured: true,
    },
    {
      tier: "Premium",
      tagline: "Komplettpaket mit Website.",
      price: "3.990",
      cadence: "einmalig",
      anchor: "5.490",
      features: [
        "Website-Setup (Onepager)",
        "40 KI-Produktbilder",
        "20 Social-Media-Posts inkl. Text",
        "3-Monats-Content-Plan für IG & FB",
        "Texte & Struktur für die Website",
        "Markenprofil-Setup im Dashboard",
        "Lieferzeit 2–3 Wochen",
      ],
      cta: "Angebot anfragen",
    },
  ],
  werkstatt: [
    {
      tier: "Start",
      tagline: "Für kleine Teams, die regelmäßig posten.",
      price: "79",
      anchor: "100",
      cadence: "pro Monat",
      features: [
        "1.200 Tokens / Monat",
        "ca. 70–400 Bilder · ca. 5–12 Videos",
        "1 Teammitglied",
        "E-Mail-Support",
        "Keine Übertragung ungenutzter Tokens",
      ],
      cta: "Plan wählen",
      checkoutPlanKey: "start",
    },
    {
      tier: "Wachstum",
      tagline: "Für aktive Brauereien mit Saisonkampagnen.",
      price: "149",
      anchor: "200",
      cadence: "pro Monat",
      features: [
        "3.000 Tokens / Monat",
        "ca. 175–1.000 Bilder · ca. 12–30 Videos",
        "3 Teammitglieder",
        "Priorisierter Support",
        "Ungenutzte Tokens 1 Monat übertragbar",
      ],
      cta: "Plan wählen",
      featured: true,
      checkoutPlanKey: "growth",
    },
    {
      tier: "Premium",
      tagline: "Für Marken mit hohem Content-Bedarf.",
      price: "299",
      anchor: "400",
      cadence: "pro Monat",
      features: [
        "7.500 Tokens / Monat",
        "ca. 440–2.500 Bilder · ca. 31–75 Videos",
        "10 Teammitglieder",
        "Fast-Lane Rendering + Premium-Support",
        "Ungenutzte Tokens 2 Monate übertragbar",
      ],
      cta: "Plan wählen",
      checkoutPlanKey: "pro",
    },
    {
      tier: "Enterprise",
      tagline: "Für Gruppen, Verbünde und Agenturen.",
      price: "599",
      anchor: "799",
      cadence: "pro Monat",
      features: [
        "20.000 Tokens / Monat",
        "ca. 1.175–6.600 Bilder · ca. 83–200 Videos",
        "25 Teammitglieder",
        "Direkter Ansprechpartner für euer Team",
        "Ungenutzte Tokens 3 Monate übertragbar",
      ],
      cta: "Plan wählen",
      checkoutPlanKey: "enterprise",
    },
  ],
};

export const MOBILE_PRICING_TRACK_OPTIONS: {
  key: PricingTrack;
  label: string;
  sublabel: string;
}[] = [
  { key: "manufaktur", label: "Manufaktur", sublabel: "BEAUFTRAGEN" },
  { key: "werkstatt", label: "Werkstatt", sublabel: "SELBST NUTZEN" },
];

export function tierDisplayName(tier: TierName) {
  return `Brauerei ${tier}`;
}

export function tierContactPaket(tier: TierName) {
  return tierDisplayName(tier);
}

function parseEuroAmount(value: string) {
  return Number(value.replace(/\./g, "").replace(/\s/g, ""));
}

/** Ersparnis in Prozent (jährlicher Aktionspreis vs. Monatslistenpreis), gerundet. */
export function getWerkstattTierSavingsPercent(tier: Pick<Tier, "price" | "anchor">) {
  if (!tier.anchor) return 0;
  const promo = parseEuroAmount(tier.price);
  const list = parseEuroAmount(tier.anchor);
  if (!promo || !list || list <= promo) return 0;
  return Math.round((1 - promo / list) * 100);
}

export function werkstattSavingsLabel(tier: Pick<Tier, "price" | "anchor">) {
  const percent = getWerkstattTierSavingsPercent(tier);
  return percent > 0 ? `${percent} % Ersparnis` : "";
}

/** Höchste Ersparnis über alle Werkstatt-Pläne (für Toggle-Badge & Demo-Funnel). */
export const WERKSTATT_MAX_SAVINGS_PERCENT = Math.max(
  ...MOBILE_PRICING_TRACKS.werkstatt.map((tier) => getWerkstattTierSavingsPercent(tier)),
);
export const WERKSTATT_MAX_SAVINGS_LABEL = `bis zu ${WERKSTATT_MAX_SAVINGS_PERCENT} % Ersparnis`;
