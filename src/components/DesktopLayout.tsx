"use client";

import { DesktopSection2 } from "@/components/DesktopSection2";
import { DesktopSection4 } from "@/components/DesktopSection4";
import { DesktopFadeInView } from "@/components/DesktopFadeInView";
import { useLoading } from "@/context/LoadingContext";
import { Hero } from "@/components/ui/animated-hero";

export function DesktopLayout() {
  const { heroReady } = useLoading();

  return (
    <main id="main" className="desktop-light-theme relative min-h-screen overflow-x-hidden pt-14 sm:pt-16">
      <div
        className={`section1-wrapper relative mx-auto w-full max-w-screen-2xl ${heroReady ? "section1-ready" : ""}`}
      >
        <Hero />
      </div>
      {/* Sections: volle Breite, Inhalte zentriert */}
      <div className="flex w-full flex-col">
        <DesktopFadeInView className="section2-slide-trigger">
          <DesktopSection2 />
        </DesktopFadeInView>
        <DesktopFadeInView delay={150} className="section4-cards-trigger">
          <DesktopSection4 />
        </DesktopFadeInView>
      </div>
    </main>
  );
}
