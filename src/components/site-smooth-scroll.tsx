"use client";

import { useLayoutEffect } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";

/**
 * Weiches Scrollen (Lenis) für die gesamte Site.
 * Bei `prefers-reduced-motion: reduce` wird nichts gestartet.
 */
export function SiteSmoothScroll() {
  useLayoutEffect(() => {
    if (window.location.pathname === "/" && !window.location.hash) {
      // Force absolute top before any smooth-scroll engine boots.
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      autoRaf: true,
      lerp: 0.088,
      smoothWheel: true,
      wheelMultiplier: 0.95,
      touchMultiplier: 1.05,
      anchors: true,
      stopInertiaOnNavigate: true,
    });

    return () => {
      lenis.destroy();
    };
  }, []);

  return null;
}
