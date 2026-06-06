import type { PricingDeliverable, PricingTier } from "@/content/desktop-home";
import {
  MOBILE_PRICING_TRACKS,
  MOBILE_PRICING_TRACK_OPTIONS,
  tierContactPaket,
  type Tier,
  type TierName,
} from "@/lib/mobilePricingTiers";

const MANUFAKTUR_NAMES: Record<TierName, string> = {
  Start: "Starter Paket",
  Wachstum: "Wachstumspaket",
  Premium: "Brauerei Premium",
};

const WERKSTATT_NAMES: Record<TierName, string> = {
  Start: "Brauerei Start",
  Wachstum: "Brauerei Wachstum",
  Premium: "Brauerei Pro",
};

function featuresToDeliverables(features: string[], extra?: string[]): PricingDeliverable[] {
  const rows: PricingDeliverable[] = features.map((f) => ["✓", f]);
  if (extra?.length) rows.push(...extra.map((f) => ["✓", f] as PricingDeliverable));
  return rows;
}

function tierToDesktop(tier: Tier, track: "manufaktur" | "werkstatt"): PricingTier {
  const name = track === "manufaktur" ? MANUFAKTUR_NAMES[tier.tier] : WERKSTATT_NAMES[tier.tier];
  const forLabel = tier.tagline.replace(/\.$/, "").toUpperCase();

  const extraFeatures =
    track === "manufaktur" && !tier.features.some((f) => f.toLowerCase().includes("nutzungsrecht"))
      ? ["Kommerzielle Nutzungsrechte"]
      : [];

  const deliverables = featuresToDeliverables(tier.features, extraFeatures);

  if (tier.anchor && track === "manufaktur") {
    deliverables.unshift(["statt", `${tier.anchor} €`]);
  }

  return {
    forLabel,
    name,
    price: tier.price,
    modality: tier.cadence,
    deliverables,
    cta: tier.cta,
    highlight: tier.featured,
    checkoutPlanKey: tier.checkoutPlanKey,
    anchor: track === "werkstatt" ? tier.anchor : undefined,
    contactPaket: track === "manufaktur" ? tierContactPaket(tier.tier) : undefined,
  };
}

export const DESKTOP_PREIS_PLAENE: { premium: PricingTier[]; self: PricingTier[] } = {
  premium: MOBILE_PRICING_TRACKS.manufaktur.map((t) => tierToDesktop(t, "manufaktur")),
  self: MOBILE_PRICING_TRACKS.werkstatt.map((t) => tierToDesktop(t, "werkstatt")),
};

const manufakturOpt = MOBILE_PRICING_TRACK_OPTIONS.find((o) => o.key === "manufaktur")!;
const werkstattOpt = MOBILE_PRICING_TRACK_OPTIONS.find((o) => o.key === "werkstatt")!;

export const DESKTOP_PREIS_MODE_COPY = {
  premium: {
    toggle: `Option 1 · ${manufakturOpt.label} (${manufakturOpt.sublabel})`,
    headline: "Ich mache es für dich",
    body: "Höherpreisige Premium-Umsetzung mit maximaler Qualität. Du bekommst fertige Ergebnisse — ich übernehme Strategie, Gestaltung und saubere Ausspielung.",
    disclaimer: "Alle Preise gemäß § 19 UStG ohne Umsatzsteuer · Kommerzielle Nutzungsrechte enthalten",
  },
  self: {
    toggle: `Option 2 · ${werkstattOpt.label} (${werkstattOpt.sublabel})`,
    headline: "Du nutzt mein Abo-Tool",
    body: "Günstiger und flexibel. Du generierst Bilder selbst im Dashboard, bleibst schnell handlungsfähig und steuerst deinen Output eigenständig.",
    disclaimer: "Alle Preise gemäß § 19 UStG ohne Umsatzsteuer · Monatlich kündbar · Tokens übertragbar je nach Plan",
  },
} as const;
