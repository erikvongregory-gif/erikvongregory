"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

type Section3TextRevealProps = {
  eyebrow: ReactNode;
  body: ReactNode;
  className?: string;
};

/**
 * Ein IntersectionObserver + Fallback, gestaffeltes Einblenden von Eyebrow → Rest.
 * Zuverlässiger als verschachtelte ScrollReveals in derselben Karte.
 */
export function Section3TextReveal({ eyebrow, body, className = "" }: Section3TextRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let cancelled = false;

    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      queueMicrotask(() => {
        if (!cancelled) setShown(true);
      });
      return () => {
        cancelled = true;
      };
    }

    let done = false;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting || done || cancelled) return;
        done = true;
        obs.disconnect();
        setShown(true);
      },
      { threshold: 0.06, rootMargin: "0px 0px 8% 0px" }
    );

    const finish = () => {
      if (done || cancelled) return;
      done = true;
      obs.disconnect();
      setShown(true);
    };

    obs.observe(el);

    const tryFallback = () => {
      if (cancelled || done) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight;
      const margin = vh * 0.06;
      if (rect.top < vh - margin && rect.bottom > margin) finish();
    };

    const id = window.requestAnimationFrame(() => {
      window.requestAnimationFrame(tryFallback);
    });

    return () => {
      cancelled = true;
      window.cancelAnimationFrame(id);
      obs.disconnect();
    };
  }, []);

  return (
    <div
      ref={ref}
      className={`section3-text-reveal ${shown ? "section3-text-reveal--shown" : ""} ${className}`.trim()}
    >
      <div className="section3-reveal-eyebrow">{eyebrow}</div>
      <div className="section3-reveal-body">{body}</div>
    </div>
  );
}
