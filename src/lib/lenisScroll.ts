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
