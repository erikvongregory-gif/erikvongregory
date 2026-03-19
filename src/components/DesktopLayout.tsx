"use client";

import { LiquidBackground } from "@/components/LiquidBackground";
import { DesktopHero } from "@/components/DesktopHero";
import { DesktopSection2 } from "@/components/DesktopSection2";
import { DesktopSection3 } from "@/components/DesktopSection3";
import { DesktopSection4 } from "@/components/DesktopSection4";
import { DesktopFadeInView } from "@/components/DesktopFadeInView";
import { Section6Clean } from "@/components/Section6Clean";

export function DesktopLayout() {
  return (
    <main id="main" className="relative min-h-screen overflow-x-hidden pt-14 sm:pt-16">
      <LiquidBackground />
      <DesktopFadeInView>
        <DesktopHero />
      </DesktopFadeInView>
      <DesktopFadeInView>
        <DesktopSection2 />
      </DesktopFadeInView>
      <DesktopFadeInView delay={100}>
        <DesktopSection3 />
      </DesktopFadeInView>
      <DesktopFadeInView delay={150}>
        <DesktopSection4 />
      </DesktopFadeInView>
      <DesktopFadeInView delay={100}>
        <Section6Clean />
      </DesktopFadeInView>
    </main>
  );
}
