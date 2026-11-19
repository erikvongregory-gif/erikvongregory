"use client";

import { useRef } from "react";
import { MotionConfig } from "framer-motion";
import { ParloNavbar } from "@/components/neu/parlo/ParloNavbar";
import { ParloFooter } from "@/components/neu/parlo/ParloFooter";
import { PerlageField } from "@/components/neu-motion/PerlageField";
import { ScanDivider } from "@/components/neu-motion/ScanDivider";

export function MotionChrome({
  children,
  perlage = "hero",
  hideNav = false,
}: {
  children: React.ReactNode;
  perlage?: "hero" | "cta";
  /** Ohne Logo-Leiste (z. B. Umfrage, damit der Produktname nicht auftaucht). */
  hideNav?: boolean;
}) {
  const guardRef = useRef<HTMLDivElement>(null);

  return (
    <MotionConfig reducedMotion="user">
      <div className="neu-motion relative min-h-screen">
        <div className="parlo-frame-line left-[22px]" aria-hidden />
        <div className="parlo-frame-line left-[30px]" aria-hidden />
        <div className="parlo-frame-line right-[22px]" aria-hidden />
        <div className="parlo-frame-line right-[30px]" aria-hidden />

        {hideNav ? null : <ParloNavbar />}
        <div className="relative isolate">
          <div aria-hidden className="nm-underglow pointer-events-none absolute inset-0 -z-20" />
          <PerlageField variant={perlage} guardRef={guardRef} className="-z-10" />
          <div ref={guardRef}>{children}</div>
        </div>
        <ScanDivider />
        <ParloFooter />
      </div>
    </MotionConfig>
  );
}
