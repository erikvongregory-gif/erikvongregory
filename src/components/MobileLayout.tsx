"use client";

import { cn } from "@/lib/utils";
import { MOBILE_EDITORIAL_PX } from "@/lib/mobileEditorial";
import { WarumEvGlabSection } from "@/components/mobile/WarumEvGlabSection";
import { ProcessDeliverySlipSection } from "@/components/mobile/ProcessDeliverySlipSection";
import { TapWallSection } from "@/components/mobile/TapWallSection";

export function MobileLayout() {
  return (
    <>
      <div className="relative z-10 flex flex-col">
        <div id="warum" className="scroll-mt-24" aria-hidden />
        <section
          id="section-2"
          aria-labelledby="warum-headline"
          className={cn(
            MOBILE_EDITORIAL_PX,
            "mobile-editorial-flow relative z-30 border-t border-ink/[0.06] pt-8 pb-10",
          )}
        >
          <WarumEvGlabSection />
        </section>

        <div id="prozess" className="scroll-mt-24" aria-hidden />
        <ProcessDeliverySlipSection />

        <div className="mobile-section-bridge pointer-events-none" aria-hidden>
          <div className="h-px bg-ink/10" />
          <div className="h-10 bg-gradient-to-b from-paper to-transparent" />
        </div>

        <div id="loesungen" className="scroll-mt-24" aria-hidden />
        <TapWallSection />
      </div>
    </>
  );
}
