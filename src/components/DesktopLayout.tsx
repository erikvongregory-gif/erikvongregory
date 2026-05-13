"use client";

import { DesktopSection2 } from "@/components/DesktopSection2";
import { DesktopSection4 } from "@/components/DesktopSection4";
import { DesktopFadeInView } from "@/components/DesktopFadeInView";

export function DesktopLayout() {
  return (
    <div className="flex w-full flex-col">
      <div id="warum" className="scroll-mt-24" aria-hidden />
      <DesktopFadeInView className="section2-slide-trigger">
        <DesktopSection2 />
      </DesktopFadeInView>
      <div id="loesungen" className="scroll-mt-24" aria-hidden />
      <DesktopFadeInView delay={150} className="section4-cards-trigger" resetOnExit>
        <DesktopSection4 />
      </DesktopFadeInView>
    </div>
  );
}
