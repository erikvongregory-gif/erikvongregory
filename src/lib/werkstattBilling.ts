import type { Tier } from "@/lib/mobilePricingTiers";
import { WERKSTATT_MAX_SAVINGS_PERCENT, werkstattSavingsLabel } from "@/lib/mobilePricingTiers";

export type WerkstattBillingInterval = "year" | "month";

/** Jährliche Zahlung ist Standard — dann gelten die Aktionspreise. */
export const WERKSTATT_DEFAULT_BILLING_INTERVAL: WerkstattBillingInterval = "year";

export const WERKSTATT_YEARLY_TOGGLE_LABEL = "Jährliche Zahlung";
export const WERKSTATT_YEARLY_TOGGLE_HINT =
  "Standard — du sparst gegenüber dem Monatstarif. Zum Monatsabo einfach deaktivieren.";
export const WERKSTATT_YEARLY_ACTIVE_BADGE = `−${WERKSTATT_MAX_SAVINGS_PERCENT} % AKTIV`;

export type WerkstattTierDisplay = {
  price: string;
  compareAtPrice?: string;
  showPromo: boolean;
  savingsLabel?: string;
  cadenceLabel: string;
  priceSubtext?: string;
};

export function isWerkstattYearlyBilling(interval: WerkstattBillingInterval) {
  return interval === "year";
}

/** Anzeige-Preise für Werkstatt je nach Abrechnungsintervall. */
export function getWerkstattTierDisplay(
  tier: Pick<Tier, "price" | "anchor" | "cadence">,
  interval: WerkstattBillingInterval,
): WerkstattTierDisplay {
  const yearly = isWerkstattYearlyBilling(interval);
  const listPrice = tier.anchor ?? tier.price;

  if (yearly) {
    const savingsLabel = werkstattSavingsLabel(tier);
    return {
      price: tier.price,
      compareAtPrice: tier.anchor,
      showPromo: Boolean(tier.anchor),
      savingsLabel: savingsLabel || undefined,
      cadenceLabel: tier.cadence,
      priceSubtext: savingsLabel ? `pro Monat · ${savingsLabel} inklusive` : undefined,
    };
  }

  return {
    price: listPrice,
    compareAtPrice: undefined,
    showPromo: false,
    cadenceLabel: tier.cadence,
    priceSubtext: "pro Monat",
  };
}
