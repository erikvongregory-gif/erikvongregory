"use client";

import { UeberUnsMountScroll } from "@/app/ueber-uns/UeberUnsMountScroll";
import { AboutDesktop } from "@/components/ueber-uns/AboutDesktop";
import { AboutMobile } from "@/components/ueber-uns/AboutMobile";

/** Über-uns: Mobile/Desktop per CSS (kein JS-Flash, keine „unsichtbare“ falsche Variante). */
export function AboutPage() {
  return (
    <main id="main" className="about-page relative z-20 min-h-[100dvh] bg-paper text-ink">
      <UeberUnsMountScroll />
      <div className="lg:hidden">
        <AboutMobile />
      </div>
      <div className="hidden lg:block">
        <AboutDesktop />
      </div>
    </main>
  );
}
