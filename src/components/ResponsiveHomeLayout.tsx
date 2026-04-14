"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const DesktopLayout = dynamic(() => import("@/components/DesktopLayout").then((m) => m.DesktopLayout), {
  ssr: false,
});
const MobileLayout = dynamic(() => import("@/components/MobileLayout").then((m) => m.MobileLayout), {
  ssr: false,
});

export function ResponsiveHomeLayout() {
  const [isDesktop, setIsDesktop] = useState<boolean | null>(null);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 768px)");
    const apply = () => setIsDesktop(media.matches);
    apply();
    media.addEventListener("change", apply);
    return () => media.removeEventListener("change", apply);
  }, []);

  if (isDesktop === null) {
    return (
      <div id="mobile-content" className="mobile-root block md:hidden">
        <main id="main" className="relative min-h-[100dvh] overflow-x-hidden bg-transparent pt-14 sm:pt-16" />
      </div>
    );
  }

  if (isDesktop) {
    return (
      <div id="desktop-content" className="block">
        <DesktopLayout />
      </div>
    );
  }

  return (
    <div id="mobile-content" className="mobile-root block">
      <main id="main" className="relative min-h-[100dvh] overflow-x-hidden bg-transparent pt-14 sm:pt-16">
        <MobileLayout />
      </main>
    </div>
  );
}
