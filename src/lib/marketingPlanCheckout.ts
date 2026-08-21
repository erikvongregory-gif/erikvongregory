import type { SubscriptionPlanKey } from "@/lib/billing/tokenState";
import { navigateToAppPlanCheckout } from "@/lib/appLoginUrl";
import type { WerkstattBillingInterval } from "@/lib/werkstattBilling";

/** Checkout läuft in der App (SITE.appBaseUrl) — Marketing leitet nur mit Plan-Deep-Link weiter. */
export function startMarketingPlanCheckout(
  plan: SubscriptionPlanKey,
  _interval: WerkstattBillingInterval = "year",
): void {
  navigateToAppPlanCheckout(plan);
}
