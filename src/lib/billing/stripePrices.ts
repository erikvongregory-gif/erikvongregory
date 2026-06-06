import type { SubscriptionPlanKey } from "@/lib/billing/tokenState";
import type { WerkstattBillingInterval } from "@/lib/werkstattBilling";

type PriceEnvSuffix = "MONTHLY" | "YEARLY";

function envKey(plan: SubscriptionPlanKey, suffix: PriceEnvSuffix) {
  const planKey = plan.toUpperCase();
  return `STRIPE_PRICE_${planKey}_${suffix}` as const;
}

function readPriceId(plan: SubscriptionPlanKey, suffix: PriceEnvSuffix) {
  const key = envKey(plan, suffix);
  return process.env[key];
}

/** Stripe-Preis-ID für Checkout — jährlich = Aktionspreis, monatlich = Listenpreis. */
export function getStripePriceIdForPlan(plan: SubscriptionPlanKey, interval: WerkstattBillingInterval) {
  const yearlyId = readPriceId(plan, "YEARLY");
  const monthlyId = readPriceId(plan, "MONTHLY");

  if (interval === "year") {
    const priceId = yearlyId ?? monthlyId;
    if (!priceId) throw new Error(`Stripe Price-ID für Plan "${plan}" (${interval}) fehlt.`);
    return priceId;
  }

  if (!monthlyId) throw new Error(`Stripe Price-ID für Plan "${plan}" (month) fehlt.`);
  return monthlyId;
}

/** Alle konfigurierten Preis-IDs einem Plan zuordnen (Webhook, Sync, Confirm). */
export function mapStripePriceIdToPlan(priceId?: string | null): SubscriptionPlanKey | null {
  if (!priceId) return null;

  const plans: SubscriptionPlanKey[] = ["start", "growth", "pro"];
  for (const plan of plans) {
    const ids = [readPriceId(plan, "YEARLY"), readPriceId(plan, "MONTHLY")].filter(Boolean);
    if (ids.includes(priceId)) return plan;
  }
  return null;
}
