"use client";

import { LiquidBackground } from "@/components/LiquidBackground";
import { FadeInSection } from "@/components/FadeInSection";
import { HeroWithScatter } from "@/components/HeroWithScatter";
import { Section4Boxes } from "@/components/Section4Boxes";
import { Section6Glaubwuerdigkeit } from "@/components/Section6Glaubwuerdigkeit";
import { ZoomSection3 } from "@/components/ZoomSection3";

export function DesktopLayout() {
  return (
    <main id="main" className="relative min-h-screen overflow-x-hidden pt-14 sm:pt-16">
      <LiquidBackground />
      <div className="relative h-[600vh] lg:h-[850vh]" aria-hidden />
      <HeroWithScatter />
      <FadeInSection />
      <ZoomSection3 />
      <Section4Boxes />
      <Section6Glaubwuerdigkeit />
    </main>
  );
}
