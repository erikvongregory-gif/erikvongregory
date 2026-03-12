"use client";

import dynamic from "next/dynamic";
import { LiquidBackground } from "@/components/LiquidBackground";
import { HeroWithScatter } from "@/components/HeroWithScatter";
import { Section6Clean } from "@/components/Section6Clean";

const FadeInSection = dynamic(() => import("@/components/FadeInSection").then((m) => ({ default: m.FadeInSection })), { ssr: true });
const ZoomSection3 = dynamic(() => import("@/components/ZoomSection3").then((m) => ({ default: m.ZoomSection3 })), { ssr: true });
const Section4Boxes = dynamic(() => import("@/components/Section4Boxes").then((m) => ({ default: m.Section4Boxes })), { ssr: true });

export function DesktopLayout() {
  return (
    <main id="main" className="relative min-h-screen overflow-x-hidden pt-14 sm:pt-16">
      <LiquidBackground />
      <div className="relative h-[400vh] lg:h-[420vh]" aria-hidden />
      <HeroWithScatter />
      <FadeInSection />
      <ZoomSection3 />
      <Section4Boxes />
      <Section6Clean />
    </main>
  );
}
