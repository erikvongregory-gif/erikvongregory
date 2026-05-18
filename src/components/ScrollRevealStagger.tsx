"use client";

import { useInViewReveal } from "@/hooks/useInViewReveal";
import { cn } from "@/lib/utils";
import type { CSSProperties, ReactNode } from "react";

type ScrollRevealStaggerProps = {
  children: ReactNode;
  className?: string;
  /** Abstand zwischen Kind-Elementen in ms */
  staggerMs?: number;
  softEntrance?: boolean;
  delay?: number;
};

/**
 * Blendet direkte Kinder nacheinander ein (CSS `.mobile-scroll-reveal-item`).
 * Listen: `ul.mobile-scroll-reveal-contents` mit `display: contents`.
 */
export function ScrollRevealStagger({
  children,
  className,
  staggerMs = 70,
  softEntrance = false,
  delay = 0,
}: ScrollRevealStaggerProps) {
  const { ref, isVisible } = useInViewReveal({ delay, rootMargin: softEntrance ? "0px 0px -4% 0px" : "0px 0px -6% 0px" });

  return (
    <div
      ref={ref}
      className={cn(
        "mobile-scroll-reveal-group",
        softEntrance && "mobile-scroll-reveal-group--soft",
        isVisible && "mobile-scroll-reveal-group--visible",
        className,
      )}
      style={{ "--mobile-reveal-stagger": `${staggerMs}ms` } as CSSProperties}
    >
      {children}
    </div>
  );
}
