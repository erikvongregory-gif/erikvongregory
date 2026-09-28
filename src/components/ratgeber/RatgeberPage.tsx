"use client";

import { RatgeberDesktop } from "@/components/ratgeber/RatgeberDesktop";
import { RatgeberMobile } from "@/components/ratgeber/RatgeberMobile";
import { useRatgeber } from "@/lib/useRatgeber";

export function RatgeberPage() {
  const ratgeber = useRatgeber();

  return (
    <main id="main" className="ratgeber-page relative z-20 min-h-[100dvh] pt-16">
      <div className="lg:hidden">
        <RatgeberMobile ratgeber={ratgeber} />
      </div>
      <div className="hidden lg:block">
        <RatgeberDesktop ratgeber={ratgeber} />
      </div>
    </main>
  );
}
