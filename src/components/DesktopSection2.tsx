"use client";

import { Section2BreweryCards } from "@/components/Section2BreweryCards";
import { HowItWorks } from "@/components/ui/how-it-works";

/** Section 2 — „Warum“-Karten + Ablauf in drei Schritten (HowItWorks). */
export function DesktopSection2() {
  return (
    <section
      id="section-2"
      className="insurance-card-theme relative z-20 flex w-full min-h-0 flex-col items-stretch justify-center pt-24 pb-12 sm:pt-28 sm:pb-16 md:pt-36 md:pb-24"
    >
      <Section2BreweryCards layout="grid" />
      <HowItWorks className="mt-4 border-t border-zinc-200/40 pt-10 sm:mt-6 sm:pt-12 md:mt-8 md:pt-14" />
    </section>
  );
}
