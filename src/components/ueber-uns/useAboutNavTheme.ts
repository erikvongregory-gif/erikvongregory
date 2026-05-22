"use client";

import { useEffect, useState } from "react";

const DARK_IDS = ["about-hero", "about-hugo", "about-closing"];

export function useAboutNavTheme() {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const sections = DARK_IDS.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    if (!sections.length) return;

    const update = () => {
      const navBottom = 68;
      const overDark = sections.some((el) => {
        const r = el.getBoundingClientRect();
        return r.top <= navBottom && r.bottom > navBottom;
      });
      setIsDark(overDark || window.scrollY < 400);
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
  }, []);

  return isDark;
}
