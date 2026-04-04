"use client";

import { Section2BreweryCards } from "@/components/Section2BreweryCards";

/** Section 2 – zwei Karten (Insurance-Card-Stil): unsichtbar + Von der Brauerei. */
export function DesktopSection2() {
  return (
    <section
      id="section-2"
      className="insurance-card-theme relative z-20 flex w-full min-h-0 items-center justify-center pt-24 pb-12 sm:pt-28 sm:pb-16 md:pt-36 md:pb-24"
    >
      <Section2BreweryCards layout="grid" />
    </section>
  );
}
