"use client";

import { usePathname } from "next/navigation";
import { useEffect, useLayoutEffect } from "react";
import { applyHomeScrollReset } from "@/lib/homeScrollReset";
import { setLenisInstance, type LenisLike } from "@/lib/lenisScroll";

const DESKTOP_MIN = "(min-width: 1024px)";

function shouldUseLenis() {
  if (typeof window === "undefined") return false;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;

  const isHome = window.location.pathname === "/";
  const isDesktop = window.matchMedia(DESKTOP_MIN).matches;

  /* Startseite: nur Desktop (Mobile-Home bleibt natives Scroll wegen Gallery/Performance) */
  if (isHome) return isDesktop;

  return true;
}

/**
 * Weiches Scrollen (Lenis). Startseite Desktop + alle Unterseiten.
 * CSS/JS nur laden wenn Lenis wirklich aktiv — spart Mobile-Home TBT.
 */
export function SiteSmoothScroll() {
  const pathname = usePathname();
  useLayoutEffect(() => applyHomeScrollReset(), [pathname]);

  useEffect(() => {
    if (!shouldUseLenis()) {
      setLenisInstance(null);
      return;
    }

    let active = true;
    let lenis: LenisLike | null = null;

    void Promise.all([import("lenis"), import("lenis/dist/lenis.css")]).then(([{ default: Lenis }]) => {
      if (!active) return;

      lenis = new Lenis({
        autoRaf: true,
        lerp: 0.09,
        smoothWheel: true,
        wheelMultiplier: 0.92,
        touchMultiplier: 1,
        anchors: true,
        stopInertiaOnNavigate: true,
      }) as LenisLike;

      setLenisInstance(lenis);

      if (!window.location.hash) {
        lenis.scrollTo(0, { immediate: true });
      }
    });

    return () => {
      active = false;
      lenis?.destroy();
      setLenisInstance(null);
    };
  }, [pathname]);

  return null;
}
