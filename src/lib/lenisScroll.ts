/** Globale Lenis-Instanz (gesetzt von SiteSmoothScroll) */

export type LenisLike = {
  scrollTo: (
    target: number | string | HTMLElement,
    options?: { offset?: number; duration?: number; immediate?: boolean },
  ) => void;
  destroy: () => void;
};

let lenisInstance: LenisLike | null = null;

export function setLenisInstance(instance: LenisLike | null) {
  lenisInstance = instance;
}

export function getLenisInstance() {
  return lenisInstance;
}

/** Fixierter Header (SiteHeader) — Offset für Anker-Scroll */
export const SITE_HEADER_SCROLL_OFFSET = -68;

export function scrollToElement(target: HTMLElement, hash: string) {
  const lenis = getLenisInstance();
  const id = hash.replace(/^#/, "");

  if (lenis) {
    lenis.scrollTo(target, {
      offset: SITE_HEADER_SCROLL_OFFSET,
      duration: 1.15,
    });
  } else {
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  try {
    history.replaceState(null, "", hash.startsWith("#") ? hash : `#${id}`);
  } catch {
    /* noop */
  }
}

/** Scrollt ein Element in die vertikale Mitte des Viewports (z. B. Preiskarte). */
export function scrollToElementCentered(target: HTMLElement) {
  const lenis = getLenisInstance();

  if (lenis) {
    const rect = target.getBoundingClientRect();
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const elementTop = rect.top + scrollTop;
    const centeredTop =
      elementTop - window.innerHeight / 2 + rect.height / 2 + SITE_HEADER_SCROLL_OFFSET / 2;
    lenis.scrollTo(centeredTop, { duration: 1.15 });
    return;
  }

  target.scrollIntoView({ behavior: "smooth", block: "center" });
}
