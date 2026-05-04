"use client";

import { useLayoutEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Nach Client-Navigation mit Hash auf den Hero scrollen (Next scrollt Hash nicht immer zuverlässig).
 */
export function UeberUnsMountScroll() {
  const pathname = usePathname();

  useLayoutEffect(() => {
    if (pathname !== "/ueber-uns") return;
    if (typeof window === "undefined") return;
    if (window.location.hash !== "#ueber-intro") return;
    const el = document.getElementById("ueber-intro");
    if (el) {
      el.scrollIntoView({ behavior: "auto", block: "start" });
    }
  }, [pathname]);

  return null;
}
