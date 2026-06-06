"use client";

import { useEffect } from "react";
import {
  focusPricingPlan,
  PRICING_DEEP_LINK_EVENT,
  readPricingDeepLinkPayload,
  type PricingDeepLinkPayload,
} from "@/lib/pricingDeepLink";

export function usePricingDeepLink(onDeepLink: (payload: PricingDeepLinkPayload) => void): void {
  useEffect(() => {
    const applyFromLocation = () => {
      const payload = readPricingDeepLinkPayload();
      if (!payload) return;
      onDeepLink(payload);
      if (payload.plan) {
        window.requestAnimationFrame(() => focusPricingPlan(payload.plan!));
      }
    };

    const onCustom = (event: Event) => {
      const payload = (event as CustomEvent<PricingDeepLinkPayload>).detail;
      if (!payload?.track) return;
      onDeepLink(payload);
      if (payload.plan) {
        window.requestAnimationFrame(() => focusPricingPlan(payload.plan!));
      }
    };

    applyFromLocation();
    window.addEventListener("hashchange", applyFromLocation);
    window.addEventListener("popstate", applyFromLocation);
    window.addEventListener(PRICING_DEEP_LINK_EVENT, onCustom);
    return () => {
      window.removeEventListener("hashchange", applyFromLocation);
      window.removeEventListener("popstate", applyFromLocation);
      window.removeEventListener(PRICING_DEEP_LINK_EVENT, onCustom);
    };
  }, [onDeepLink]);
}
