"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { Hero } from "@/components/ui/animated-hero";
import { useLoading } from "@/context/LoadingContext";

const DesktopLayout = dynamic(
  () => import(/* webpackPrefetch: true */ "@/components/DesktopLayout").then((m) => m.DesktopLayout),
  { ssr: false },
);
const MobileLayout = dynamic(
  () => import(/* webpackPrefetch: true */ "@/components/MobileLayout").then((m) => m.MobileLayout),
  { ssr: false },
);

export function ResponsiveHomeLayout() {
  const { heroReady } = useLoading();
  const [isDesktop, setIsDesktop] = useState<boolean | null>(null);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 768px)");
    const apply = () => setIsDesktop(media.matches);
    apply();
    media.addEventListener("change", apply);
    return () => media.removeEventListener("change", apply);
  }, []);

  return (
    <div
      className={`block min-h-[100dvh] w-full min-w-0 ${isDesktop ? "" : "mobile-root mobile-root-home"}`}
    >
      <main id="main" className="relative min-h-[100dvh] overflow-x-hidden bg-transparent pt-14 sm:pt-16">
        <div
          id="start"
          className={`section1-wrapper relative mx-auto w-full max-w-screen-2xl ${heroReady ? "section1-ready" : ""} ${isDesktop === false ? "section1-wrapper--mobile-gallery" : ""}`}
        >
          <Hero />
        </div>
        {isDesktop ? (
          <div id="desktop-content" className="desktop-light-theme flex w-full flex-col">
            <DesktopLayout />
          </div>
        ) : null}
        {isDesktop === false ? (
          <div id="mobile-content" className="mobile-root flex w-full flex-col">
            <MobileLayout />
          </div>
        ) : null}
      </main>
    </div>
  );
}
