"use client";

import { useEffect } from "react";
import {
  PRICING_DEEP_LINK_EVENT,
  readPricingDeepLinkTrack,
  type PricingDeepLinkTrack,
} from "@/lib/pricingDeepLink";

export function usePricingDeepLink(onTrack: (track: PricingDeepLinkTrack) => void): void {
  useEffect(() => {
    const applyFromLocation = () => {
      const track = readPricingDeepLinkTrack();
      if (track) onTrack(track);
    };

    const onCustom = (event: Event) => {
      const track = (event as CustomEvent<{ track: PricingDeepLinkTrack }>).detail?.track;
      if (track) onTrack(track);
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
  }, [onTrack]);
}
