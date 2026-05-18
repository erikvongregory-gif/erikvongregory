"use client";

import { useEffect, useRef, useState } from "react";
import { useLoading } from "@/context/LoadingContext";

type UseInViewRevealOptions = {
  /** Verzögerung nach Sichtbarkeit (ms) */
  delay?: number;
  rootMargin?: string;
  threshold?: number;
};

export function useInViewReveal({
  delay = 0,
  rootMargin = "0px 0px -6% 0px",
  threshold = 0,
}: UseInViewRevealOptions = {}) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const { isLoadComplete } = useLoading();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setIsVisible(true);
      return;
    }

    if (!isLoadComplete) return;

    let timeoutId = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        timeoutId = window.setTimeout(() => {
          setIsVisible(true);
          observer.disconnect();
        }, delay);
      },
      { threshold, rootMargin },
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [isLoadComplete, delay, rootMargin, threshold]);

  return { ref, isVisible };
}
