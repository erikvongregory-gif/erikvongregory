"use client";

import { useInViewReveal } from "@/hooks/useInViewReveal";
import { cn } from "@/lib/utils";
import { useEffect, useState, type CSSProperties, type ReactNode } from "react";

type RevealFrom = "up" | "right" | "left";

type DesktopRevealItemProps = {
  children: ReactNode;
  className?: string;
  /** Zusätzliche Verzögerung (ms) — gestaffelt via Stagger oder manuell */
  delay?: number;
  from?: RevealFrom;
};

/** Einzelnes Element für Hero-Load oder Scroll-Stagger */
export function DesktopRevealItem({ children, className, delay = 0, from = "up" }: DesktopRevealItemProps) {
  return (
    <div
      className={cn(
        "desktop-reveal-item",
        from === "right" && "desktop-reveal-item--from-right",
        from === "left" && "desktop-reveal-item--from-left",
        className,
      )}
      style={{ "--desktop-reveal-delay": `${delay}ms` } as CSSProperties}
    >
      {children}
    </div>
  );
}

type DesktopRevealStaggerProps = {
  children: ReactNode;
  className?: string;
  staggerMs?: number;
  softEntrance?: boolean;
  delay?: number;
};

/** Direkte Kinder mit `.desktop-reveal-item` blenden gestaffelt beim Scroll ein */
export function DesktopRevealStagger({
  children,
  className,
  staggerMs = 85,
  softEntrance = false,
  delay = 0,
}: DesktopRevealStaggerProps) {
  const { ref, isVisible } = useInViewReveal({
    delay,
    rootMargin: softEntrance ? "0px 0px -5% 0px" : "0px 0px -8% 0px",
    threshold: 0.06,
  });

  return (
    <div
      ref={ref}
      className={cn(
        "desktop-reveal-group",
        softEntrance && "desktop-reveal-group--soft",
        isVisible && "desktop-reveal-group--visible",
        className,
      )}
      style={{ "--desktop-reveal-stagger": `${staggerMs}ms` } as CSSProperties}
    >
      {children}
    </div>
  );
}

/** Hero: gestaffeltes Einblenden direkt nach Mount (Seiten-Load) */
export function useDesktopHeroReady() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setReady(true);
      return;
    }
    const id = requestAnimationFrame(() => {
      requestAnimationFrame(() => setReady(true));
    });
    return () => cancelAnimationFrame(id);
  }, []);

  return ready;
}
