"use client";

import { useState } from "react";
import { MobileGalleryHero } from "@/components/mobile/MobileGalleryHero";
import { useFreeTrialDemo } from "@/context/FreeTrialDemoContext";

/**
 * Leichter Mobile-Hero-Einstieg — ohne framer-motion / LiquidMetal / Parallax
 * (die nur im alten animated-hero Desktop-Pfad lagen und Mobile-JS aufblähten).
 */
export function MobileHomeEntry() {
  const { open: openFreeTrialDemo } = useFreeTrialDemo();
  const [ctaPending, setCtaPending] = useState(false);

  const onPrimaryCtaClick = () => {
    setCtaPending(true);
    openFreeTrialDemo();
    setCtaPending(false);
  };

  const onGalleryOpen = () => {
    if (typeof window === "undefined") return;
    const el =
      document.getElementById("beispiele") ??
      document.getElementById("echte-beispiele-aus-der-praxis");
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <MobileGalleryHero
      primaryCtaLabel="3 Bilder kostenlos generieren"
      onPrimaryCtaClick={onPrimaryCtaClick}
      ctaPending={ctaPending}
      onGalleryOpen={onGalleryOpen}
    />
  );
}
