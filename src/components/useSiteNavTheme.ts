"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const HOME_DARK_SECTIONS = ["desktop-hero", "desktop-prozess", "desktop-beispiele", "desktop-footer"];
const ABOUT_DARK_SECTIONS = ["about-hero", "about-hugo", "about-closing"];

export function useSiteNavTheme() {
  const pathname = usePathname();
  const [isDark, setIsDark] = useState(() => pathname === "/" || pathname === "/ueber-uns");

  useEffect(() => {
    if (pathname !== "/" && pathname !== "/ueber-uns") {
      setIsDark(false);
      return;
    }

    const ids = pathname === "/" ? HOME_DARK_SECTIONS : ABOUT_DARK_SECTIONS;
    const sections = ids.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    if (!sections.length) {
      setIsDark(true);
      return;
    }

    const navBottom = 68;
    const scrollThreshold = pathname === "/" ? 700 : 400;

    const update = () => {
      const overDark = sections.some((el) => {
        const r = el.getBoundingClientRect();
        return r.top <= navBottom && r.bottom > navBottom;
      });
      setIsDark(overDark || window.scrollY < scrollThreshold);
    };

    update();
    const observer = new IntersectionObserver(update, { rootMargin: "-68px 0px -55% 0px", threshold: 0 });
    sections.forEach((el) => observer.observe(el));
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [pathname]);

  return isDark;
}
