"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const PricingSection = dynamic(
  () => import("@/components/PricingSection").then((m) => m.PricingSection),
  { ssr: false },
);
const Section7AIDemo = dynamic(
  () => import("@/components/Section7AIDemo").then((m) => m.Section7AIDemo),
  { ssr: false },
);

const MOBILE_MAX = "(max-width: 1023px)";

/** Preise & Beispiele — erst nach Idle, damit Hero/LCP nicht konkurrieren. */
export function HomeMobileOnlySections() {
  const [showMobile, setShowMobile] = useState(false);
  const [loadHeavy, setLoadHeavy] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(MOBILE_MAX);
    const apply = () => setShowMobile(media.matches);
    apply();
    media.addEventListener("change", apply);
    return () => media.removeEventListener("change", apply);
  }, []);

  useEffect(() => {
    if (!showMobile) return;
    let cancelled = false;
    let idleId: number | null = null;
    let timeoutId: ReturnType<typeof setTimeout> | null = null;

    const enable = () => {
      if (!cancelled) setLoadHeavy(true);
    };

    if ("requestIdleCallback" in window) {
      idleId = window.requestIdleCallback(enable, { timeout: 2500 });
    } else {
      timeoutId = setTimeout(enable, 1200);
    }

    return () => {
      cancelled = true;
      if (idleId !== null) window.cancelIdleCallback?.(idleId);
      if (timeoutId !== null) clearTimeout(timeoutId);
    };
  }, [showMobile]);

  if (!showMobile || !loadHeavy) return null;

  return (
    <>
      <PricingSection />
      <Section7AIDemo />
    </>
  );
}
