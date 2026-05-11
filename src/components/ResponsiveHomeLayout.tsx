"use client";

import { useLayoutEffect, useState } from "react";
import dynamic from "next/dynamic";

/** Gleiche Fläche wie echtes Layout, solange der Code-Chunk lädt (verhindert „Zwei Wege“-Flash). */
function DesktopHeroChunkFallback() {
  return (
    <main
      id="main"
      className="desktop-light-theme relative min-h-[100dvh] overflow-x-hidden pt-14 sm:pt-16"
      aria-hidden
    />
  );
}

function MobileHeroChunkFallback() {
  return (
    <main
      id="main"
      className="relative min-h-[100dvh] overflow-x-hidden bg-transparent pt-14 sm:pt-16"
      aria-hidden
    />
  );
}

const DesktopLayout = dynamic(
  () => import(/* webpackPrefetch: true */ "@/components/DesktopLayout").then((m) => m.DesktopLayout),
  { ssr: false, loading: () => <DesktopHeroChunkFallback /> },
);
const MobileLayout = dynamic(
  () => import(/* webpackPrefetch: true */ "@/components/MobileLayout").then((m) => m.MobileLayout),
  { ssr: false, loading: () => <MobileHeroChunkFallback /> },
);

export function ResponsiveHomeLayout() {
  const [isDesktop, setIsDesktop] = useState<boolean | null>(null);

  useLayoutEffect(() => {
    const media = window.matchMedia("(min-width: 768px)");
    const apply = () => setIsDesktop(media.matches);
    apply();
    media.addEventListener("change", apply);
    return () => media.removeEventListener("change", apply);
  }, []);

  if (isDesktop === null) {
    // Kein `md:hidden`: sonst ist der Platzhalter auf Desktop unsichtbar, `min-h` wirkt nicht
    // und die darunter gerenderte PricingSection („Zwei Wege …“) landet kurz oben im Viewport.
    return (
      <div id="mobile-content" className="mobile-root block min-h-[100dvh] w-full min-w-0">
        <main id="main" className="relative min-h-[100dvh] overflow-x-hidden bg-transparent pt-14 sm:pt-16" />
      </div>
    );
  }

  if (isDesktop) {
    return (
      <div id="desktop-content" className="block min-h-[100dvh] w-full min-w-0">
        <DesktopLayout />
      </div>
    );
  }

  return (
    <div id="mobile-content" className="mobile-root block min-h-[100dvh] w-full min-w-0">
      <main id="main" className="relative min-h-[100dvh] overflow-x-hidden bg-transparent pt-14 sm:pt-16">
        <MobileLayout />
      </main>
    </div>
  );
}
