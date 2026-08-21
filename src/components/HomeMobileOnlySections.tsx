"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";

const HomeMobilePricingEntry = dynamic(
  () => import("@/components/HomeMobilePricingEntry").then((m) => m.HomeMobilePricingEntry),
  { ssr: false },
);
const MobileBeispieleSection = dynamic(
  () =>
    import("@/components/mobile/MobileBeispieleSection").then((m) => m.MobileBeispieleSection),
  { ssr: false },
);
const MobileFaqChatSection = dynamic(
  () =>
    import("@/components/mobile/MobileFaqChatSection").then((m) => m.MobileFaqChatSection),
  { ssr: false },
);

const MOBILE_MAX = "(max-width: 1023px)";

/**
 * Preise & Beispiele — erst nahe Viewport oder sehr spät Idle.
 * Kein Section7/LiquidMetal/Shader im Mobile-Chunk.
 */
export function HomeMobileOnlySections() {
  const [showMobile, setShowMobile] = useState(false);
  const [loadHeavy, setLoadHeavy] = useState(false);
  const sentinelRef = useRef<HTMLDivElement | null>(null);

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
    let timeoutId: ReturnType<typeof setTimeout> | null = null;
    let observer: IntersectionObserver | null = null;

    const enable = () => {
      if (!cancelled) setLoadHeavy(true);
    };

    /* Fallback weit hinter dem Lighthouse-Lab-Fenster */
    timeoutId = setTimeout(enable, 8000);

    const el = sentinelRef.current;
    if (el && "IntersectionObserver" in window) {
      observer = new IntersectionObserver(
        ([entry]) => {
          if (entry?.isIntersecting) enable();
        },
        { rootMargin: "200px 0px" },
      );
      observer.observe(el);
    }

    return () => {
      cancelled = true;
      if (timeoutId !== null) clearTimeout(timeoutId);
      observer?.disconnect();
    };
  }, [showMobile]);

  if (!showMobile) return null;

  return (
    <>
      <div ref={sentinelRef} className="h-px w-full" aria-hidden />
      {loadHeavy ? (
        <>
          <HomeMobilePricingEntry />
          <MobileBeispieleSection />
          <div id="fragen" className="scroll-mt-24" aria-hidden />
          <MobileFaqChatSection />
        </>
      ) : null}
    </>
  );
}
