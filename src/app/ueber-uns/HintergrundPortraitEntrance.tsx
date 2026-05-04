"use client";

import { useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type Props = {
  className?: string;
  children: ReactNode;
};

/**
 * „Hintergrund“-Spalte: Portrait-Karte fliegt von rechts ein, sobald sie ins Sichtfeld kommt
 * (Timing wie Hero-Karte; bei prefers-reduced-motion sofort sichtbar).
 */
export function HintergrundPortraitEntrance({ className, children }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useLayoutEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setActive(true);
      return;
    }
    const el = ref.current;
    if (!el) return;
    let cancelled = false;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || cancelled) return;
        io.disconnect();
        requestAnimationFrame(() => {
          if (!cancelled) setActive(true);
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -5% 0px" },
    );
    io.observe(el);
    return () => {
      cancelled = true;
      io.disconnect();
    };
  }, []);

  return (
    <div
      ref={ref}
      className={cn(
        "ueber-hintergrund-portrait-entrance",
        active && "ueber-hintergrund-portrait-entrance--active",
        className,
      )}
    >
      {children}
    </div>
  );
}
