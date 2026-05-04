"use client";

import { useEffect, useLayoutEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Hash-/Anker-Scroll zu „Geschichte“ (#ueber-intro). Next/Lenis liefern das nicht immer zuverlässig —
 * mehrere Versuche und hashchange, bis das Layout steht.
 */
function scrollToGeschichteIfHash() {
  if (typeof window === "undefined") return;
  if (window.location.hash !== "#ueber-intro") return;
  const el = document.getElementById("ueber-intro");
  if (!el) return;
  el.scrollIntoView({ behavior: "auto", block: "start" });
}

export function UeberUnsMountScroll() {
  const pathname = usePathname();

  useLayoutEffect(() => {
    if (pathname !== "/ueber-uns") return;
    scrollToGeschichteIfHash();
    requestAnimationFrame(() => {
      scrollToGeschichteIfHash();
      requestAnimationFrame(scrollToGeschichteIfHash);
    });
  }, [pathname]);

  useEffect(() => {
    if (pathname !== "/ueber-uns") return;
    const timers = [0, 40, 120, 280, 500].map((ms) =>
      window.setTimeout(scrollToGeschichteIfHash, ms),
    );
    const onHash = () => scrollToGeschichteIfHash();
    window.addEventListener("hashchange", onHash);
    return () => {
      timers.forEach(clearTimeout);
      window.removeEventListener("hashchange", onHash);
    };
  }, [pathname]);

  return null;
}
