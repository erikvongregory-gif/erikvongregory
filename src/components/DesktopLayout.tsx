"use client";

import { LiquidBackground } from "@/components/LiquidBackground";
import { DesktopHero } from "@/components/DesktopHero";
import { DesktopSection2 } from "@/components/DesktopSection2";
import { DesktopSection3 } from "@/components/DesktopSection3";
import { DesktopSection4 } from "@/components/DesktopSection4";
import { DesktopFadeInView } from "@/components/DesktopFadeInView";
import { StickyPortraitWithGlow } from "@/components/StickyPortraitWithGlow";
import { useLoading } from "@/context/LoadingContext";

export function DesktopLayout() {
  const { heroReady } = useLoading();

  return (
    <main id="main" className="desktop-light-theme relative min-h-screen overflow-x-hidden pt-14 sm:pt-16">
      <LiquidBackground />
      {/* Hero-Zeile: Content links, Portrait rechts (oben) – gestaffelte Einblendungen */}
      <div className={`section1-wrapper lg:grid lg:grid-cols-[1fr_minmax(320px,40%)] lg:gap-0 ${heroReady ? "section1-ready" : ""}`}>
        <div className="min-w-0">
          <DesktopHero />
        </div>
        <div className="section1-fade section1-fade-0 relative hidden lg:block">
          <StickyPortraitWithGlow />
        </div>
      </div>
      {/* Sections: volle Breite, Inhalte zentriert */}
      <div className="flex w-full flex-col">
        <DesktopFadeInView className="section2-slide-trigger" resetOnExit>
          <DesktopSection2 />
        </DesktopFadeInView>
        <DesktopFadeInView delay={100} className="section3-clean-reveal">
          <DesktopSection3 />
        </DesktopFadeInView>
        <DesktopFadeInView delay={150} className="section4-cards-trigger">
          <DesktopSection4 />
        </DesktopFadeInView>
      </div>
    </main>
  );
}
