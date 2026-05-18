"use client";

import { PricingBoxes } from "./PricingBoxes";
import { ScrollReveal } from "./ScrollReveal";

export function PricingSection() {
  return (
    <ScrollReveal softEntrance className="pricing-section-reveal">
      <>
        <div id="pakete" className="scroll-mt-24" aria-hidden />
        <section id="pakete-preise" className="relative z-[80] px-0 py-0 sm:px-4 sm:py-14 md:py-20">
          <div className="mx-auto max-w-6xl">
            <PricingBoxes />
          </div>
        </section>
      </>
    </ScrollReveal>
  );
}
