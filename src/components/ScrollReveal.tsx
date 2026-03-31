"use client";

import { useRef, useEffect, useState, type ReactNode } from "react";

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
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setIsVisible(true);
        observer.disconnect();
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const hiddenY = softEntrance ? "translate-y-[26px]" : "translate-y-5";
  const durationClass = softEntrance ? "duration-[850ms] ease-[cubic-bezier(0.16,1,0.3,1)]" : "duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]";

  return (
    <div
      ref={ref}
      className={`transition-all ${durationClass} ${
        isVisible ? "translate-y-0 opacity-100" : `${hiddenY} opacity-0`
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}
