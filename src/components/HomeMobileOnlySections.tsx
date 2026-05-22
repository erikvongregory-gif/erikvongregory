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

/** Preise, Beispiele & FAQ — nur unter 1024px. */
export function HomeMobileOnlySections() {
  const [showMobile, setShowMobile] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(MOBILE_MAX);
    const apply = () => setShowMobile(media.matches);
    apply();
    media.addEventListener("change", apply);
    return () => media.removeEventListener("change", apply);
  }, []);

  if (!showMobile) return null;

  return (
    <>
      <PricingSection />
      <Section7AIDemo />
    </>
  );
}
