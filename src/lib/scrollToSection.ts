import { scrollToElement } from "@/lib/lenisScroll";

/**
 * Scrollt zum Abschnitt mit der gegebenen Hash-ID (ohne #).
 * Berücksichtigt duplizierte IDs in #mobile-content / #desktop-content.
 * Desktop: Lenis (weiches Scroll), sonst natives smooth scrollIntoView.
 */
export function scrollToSection(hash: string) {
  const id = hash.replace(/^#/, "");
  if (!id || typeof window === "undefined") return;
  const isDesktop = window.matchMedia("(min-width: 1024px)").matches;
  const wrapper = document.getElementById(isDesktop ? "desktop-content" : "mobile-content");
  const target =
    wrapper?.querySelector<HTMLElement>(`#${CSS.escape(id)}`) ??
    document.getElementById(id);
  if (target) {
    scrollToElement(target, hash.startsWith("#") ? hash : `#${id}`);
  }
}
