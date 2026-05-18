"use client";

import { MobileEditorialEyebrow } from "@/components/mobile/MobileEditorialEyebrow";
import { WarumEvGlabComparisonTable } from "@/components/mobile/WarumEvGlabComparisonTable";
import { WarumEvGlabPullQuote } from "@/components/mobile/WarumEvGlabPullQuote";
import { ScrollRevealStagger } from "@/components/ScrollRevealStagger";

const PULL_QUOTE =
  "Klarheit vor Komplexität. Qualität vor Hype. Umsetzung vor Theorie.";

export function WarumEvGlabSection() {
  return (
    <ScrollRevealStagger softEntrance staggerMs={75}>
      <div className="mobile-scroll-reveal-item">
        <MobileEditorialEyebrow>Warum EvGlab</MobileEditorialEyebrow>
      </div>

      <h2
        id="warum-headline"
        className="mobile-scroll-reveal-item m-0 font-serif-hero text-4xl font-normal leading-[1.03] tracking-[-1px] text-ink"
      >
        Der Unterschied,
        <br />
        <em className="font-medium italic text-amber">Zeile für Zeile</em>.
      </h2>

      <p className="mobile-scroll-reveal-item mt-3.5 max-w-[320px] font-sans-tight text-sm leading-[1.5] text-ink2">
        Was die meisten Brauereien machen — und was sich mit EvGlab ändert.
      </p>

      <WarumEvGlabComparisonTable className="mobile-scroll-reveal-item mt-[22px]" />

      <div className="mobile-scroll-reveal-item">
        <WarumEvGlabPullQuote quote={PULL_QUOTE} caption="Wofür ich stehe" />
      </div>
    </ScrollRevealStagger>
  );
}
