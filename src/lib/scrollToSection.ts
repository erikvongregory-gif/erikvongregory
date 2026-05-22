import { scrollToElement } from "@/lib/lenisScroll";

/** Desktop-Nav (#preise, #faq) ↔ Mobile-DOM (#pakete, #fragen / section-fragen). */
const MOBILE_SCROLL_IDS: Record<string, string[]> = {
  preise: ["pakete", "pakete-preise", "preise"],
  faq: ["fragen", "section-fragen", "faq"],
};

function resolveScrollIds(id: string, isDesktop: boolean): string[] {
  if (isDesktop) return [id];
  return MOBILE_SCROLL_IDS[id] ?? [id];
}

function findSectionElement(wrapper: HTMLElement | null, ids: string[]): HTMLElement | null {
  for (const candidate of ids) {
    const inWrapper = wrapper?.querySelector<HTMLElement>(`#${CSS.escape(candidate)}`);
    if (inWrapper) return inWrapper;
    const global = document.getElementById(candidate);
    if (global) return global;
  }
  return null;
}

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
  const target = findSectionElement(wrapper, resolveScrollIds(id, isDesktop));
  if (target) {
    scrollToElement(target, hash.startsWith("#") ? hash : `#${id}`);
  }
}
