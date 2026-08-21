"use client";

import { useCallback, useState } from "react";
import type { SubscriptionPlanKey } from "@/lib/billing/tokenState";
import { trackEvent } from "@/lib/analytics";
import { startMarketingPlanCheckout } from "@/lib/marketingPlanCheckout";
import type { WerkstattBillingInterval } from "@/lib/werkstattBilling";
import { MobilePricingSection } from "@/components/mobile/MobilePricingSection";

/**
 * Leichter Mobile-Preise-Einstieg — ohne Shader / Desktop-PricingBoxes.
 */
export function HomeMobilePricingEntry() {
  const [checkoutBusyPlan, setCheckoutBusyPlan] = useState<SubscriptionPlanKey | null>(null);

  const handleCheckoutPlan = useCallback(
    (plan: SubscriptionPlanKey, interval?: WerkstattBillingInterval) => {
      setCheckoutBusyPlan(plan);
      trackEvent("pricing_checkout_start", {
        plan,
        source: "homepage_pricing_mobile",
        interval: interval ?? "month",
      });
      try {
        startMarketingPlanCheckout(plan, interval);
      } catch {
        setCheckoutBusyPlan(null);
        trackEvent("pricing_checkout_error", {
          plan,
          source: "homepage_pricing_mobile",
        });
        window.alert("Checkout konnte gerade nicht gestartet werden. Bitte gleich erneut versuchen.");
      }
    },
    [],
  );

  return (
    <>
      <div id="pakete" className="scroll-mt-24" aria-hidden />
      <div id="preise" className="scroll-mt-24" aria-hidden />
      <section id="pakete-preise" className="relative z-[80] px-0 py-0">
        <MobilePricingSection
          checkoutBusyPlan={checkoutBusyPlan}
          onCheckoutPlan={handleCheckoutPlan}
        />
      </section>
    </>
  );
}
