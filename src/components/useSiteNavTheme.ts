"use client";

import { usePathname } from "next/navigation";
import { useLayoutEffect, useState } from "react";

const HOME_DARK_SECTIONS = ["desktop-hero", "desktop-prozess", "desktop-beispiele", "desktop-footer"];
const ABOUT_DARK_SECTIONS = ["about-hero", "about-hugo", "about-closing"];
const RATGEBER_DARK_SECTIONS = ["ratgeber-recommendation"];

const NAV_BOTTOM_PX = 68;
const SECTION_ATTACH_RETRY_MS = [0, 80, 200, 400, 800, 1200];

/** Gleicher Wert auf Server und beim ersten Client-Render (kein window/matchMedia). */
function navThemeInitial(pathname: string | null): boolean {
  return pathname === "/ueber-uns";
}

function isNavOverSection(el: HTMLElement, navBottom = NAV_BOTTOM_PX): boolean {
  const r = el.getBoundingClientRect();
  return r.top <= navBottom && r.bottom > navBottom;
}

function resolveSectionIds(pathname: string, isDesktop: boolean): string[] {
  if (pathname === "/") return isDesktop ? HOME_DARK_SECTIONS : [];
  if (pathname === "/ratgeber") return RATGEBER_DARK_SECTIONS;
  if (pathname === "/ueber-uns") return ABOUT_DARK_SECTIONS;
  return [];
}

function fallbackDarkWhenSectionsMissing(pathname: string, isDesktop: boolean): boolean {
  if (pathname === "/") return isDesktop;
  if (pathname === "/ratgeber") return false;
  if (pathname === "/ueber-uns") return true;
  return false;
}

function shouldUseScrollFallback(pathname: string): boolean {
  return pathname === "/ueber-uns" || pathname === "/ratgeber";
}

export function useSiteNavTheme() {
  const pathname = usePathname();
  const [isDark, setIsDark] = useState(() => navThemeInitial(pathname));

  useLayoutEffect(() => {
    if (pathname !== "/" && pathname !== "/ueber-uns" && pathname !== "/ratgeber") {
      setIsDark(false);
      return;
    }

    let disposed = false;
    let observer: IntersectionObserver | null = null;
    const retryTimers: number[] = [];

    const clearRetryTimers = () => {
      retryTimers.forEach((id) => window.clearTimeout(id));
      retryTimers.length = 0;
    };

    const update = () => {
      if (disposed) return;

      const isDesktop = window.matchMedia("(min-width: 1024px)").matches;
      const ids = resolveSectionIds(pathname, isDesktop);
      const sections = ids.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];

      if (!sections.length) {
        setIsDark(fallbackDarkWhenSectionsMissing(pathname, isDesktop));
        return;
      }

      const overDark = sections.some((el) => isNavOverSection(el));
      const scrollThreshold = pathname === "/ratgeber" ? 120 : 400;
      const scrollFallback = shouldUseScrollFallback(pathname) && window.scrollY < scrollThreshold;

      setIsDark(overDark || scrollFallback);
    };

    const detach = () => {
      observer?.disconnect();
      observer = null;
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", onLayoutChange);
    };

    const attach = (): boolean => {
      detach();

      const isDesktop = window.matchMedia("(min-width: 1024px)").matches;
      const ids = resolveSectionIds(pathname, isDesktop);
      const sections = ids.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];

      if (!sections.length) {
        setIsDark(fallbackDarkWhenSectionsMissing(pathname, isDesktop));
        return false;
      }

      update();
      observer = new IntersectionObserver(update, {
        rootMargin: `-${NAV_BOTTOM_PX}px 0px -55% 0px`,
        threshold: 0,
      });
      sections.forEach((el) => observer?.observe(el));
      window.addEventListener("scroll", update, { passive: true });
      window.addEventListener("resize", onLayoutChange);
      return true;
    };

    const onLayoutChange = () => {
      if (disposed) return;
      clearRetryTimers();
      if (!attach()) scheduleAttachRetries();
    };

    const scheduleAttachRetries = () => {
      clearRetryTimers();
      for (const ms of SECTION_ATTACH_RETRY_MS) {
        retryTimers.push(
          window.setTimeout(() => {
            if (disposed || observer) return;
            if (attach()) clearRetryTimers();
          }, ms),
        );
      }
    };

    if (!attach()) scheduleAttachRetries();

    return () => {
      disposed = true;
      clearRetryTimers();
      detach();
    };
  }, [pathname]);

  return isDark;
}
