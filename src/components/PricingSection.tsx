"use client";

import { PricingBoxes } from "./PricingBoxes";
import { ScrollReveal } from "./ScrollReveal";

export function PricingSection() {
  return (
    <ScrollReveal className="pricing-section-reveal">
      <>
        <div id="pakete" className="scroll-mt-24" aria-hidden />
        <section id="pakete-preise" className="relative z-[80] px-4 py-14 sm:py-16 md:py-20">
          <div className="mx-auto max-w-6xl">
            <PricingBoxes />
          </div>
        </section>
      </>
    </ScrollReveal>
  );
}
