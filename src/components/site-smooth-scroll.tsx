"use client";

import { useEffect, useLayoutEffect } from "react";
import { applyHomeScrollReset } from "@/lib/homeScrollReset";
import "lenis/dist/lenis.css";

/**
 * Weiches Scrollen (Lenis) für die gesamte Site.
 * Auf „/“: Scroll-Reset vor dem Paint (React-19-konform, kein Layout-<script>).
 */
export function SiteSmoothScroll() {
  useLayoutEffect(() => applyHomeScrollReset(), []);

  useEffect(() => {
    if (window.location.pathname === "/" && !window.location.hash) {
      return;
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let active = true;
    let lenisInstance: { destroy: () => void } | null = null;

    void import("lenis").then(({ default: Lenis }) => {
      if (!active) return;
      lenisInstance = new Lenis({
        autoRaf: true,
        lerp: 0.088,
        smoothWheel: true,
        wheelMultiplier: 0.95,
        touchMultiplier: 1.05,
        anchors: true,
        stopInertiaOnNavigate: true,
      });
    });

    return () => {
      active = false;
      lenisInstance?.destroy();
    };
  }, []);

  return null;
}
