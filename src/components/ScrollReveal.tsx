"use client";

import { useInViewReveal } from "@/hooks/useInViewReveal";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type ScrollRevealProps = {
  children: ReactNode;
  delay?: number;
  className?: string;
  /** Weicheres, etwas längeres Einblenden (z. B. Section 3) – an Desktop Clean Reveal angelehnt */
  softEntrance?: boolean;
};

export function ScrollReveal({
  children,
  delay = 0,
  className = "",
  softEntrance = false,
}: ScrollRevealProps) {
  const { ref, isVisible } = useInViewReveal({
    delay,
    rootMargin: softEntrance ? "0px 0px -4% 0px" : "0px 0px -6% 0px",
  });

  const hiddenY = softEntrance ? "translate-y-[22px]" : "translate-y-3.5";
  const durationClass = softEntrance
    ? "duration-[780ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
    : "duration-[560ms] ease-[cubic-bezier(0.22,1,0.36,1)]";

  return (
    <div
      ref={ref}
      className={cn(
        "transition-[opacity,transform] will-change-[opacity,transform]",
        durationClass,
        isVisible ? "translate-y-0 opacity-100" : cn(hiddenY, "opacity-0"),
        className,
      )}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}
