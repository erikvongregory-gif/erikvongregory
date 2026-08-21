"use client";

import dynamic from "next/dynamic";
import { cn } from "@/lib/utils";
import { MOBILE_EDITORIAL_PX } from "@/lib/mobileEditorial";

const WarumBrewAISection = dynamic(
  () => import("@/components/mobile/WarumBrewAISection").then((m) => m.WarumBrewAISection),
  { ssr: false },
);
const ProcessDeliverySlipSection = dynamic(
  () =>
    import("@/components/mobile/ProcessDeliverySlipSection").then((m) => m.ProcessDeliverySlipSection),
  { ssr: false },
);
const TapWallSection = dynamic(
  () => import("@/components/mobile/TapWallSection").then((m) => m.TapWallSection),
  { ssr: false },
);

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
          <WarumBrewAISection />
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
