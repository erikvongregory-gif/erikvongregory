"use client";

import { RatgeberDesktop } from "@/components/ratgeber/RatgeberDesktop";
import { RatgeberMobile } from "@/components/ratgeber/RatgeberMobile";
import { SiteFooter } from "@/components/SiteFooter";
import { useRatgeber } from "@/lib/useRatgeber";

/** Ratgeber: Desktop/Mobile per CSS, SiteHeader aus AppShell. */
export function RatgeberPage() {
  const ratgeber = useRatgeber();

  return (
    <main id="main" className="ratgeber-page relative z-20 min-h-[100dvh] bg-paper text-ink pt-14 sm:pt-16 lg:pt-[68px]">
      <div className="lg:hidden">
        <RatgeberMobile ratgeber={ratgeber} />
      </div>
      <div className="hidden lg:block">
        <RatgeberDesktop ratgeber={ratgeber} />
      </div>
      <SiteFooter footerId="ratgeber-site-footer" className="ratgeber-page-footer" />
    </main>
  );
}
