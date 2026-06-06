import { scrollToSection } from "@/lib/scrollToSection";

export type PricingDeepLinkTrack = "werkstatt" | "manufaktur";

export const PRICING_DEEP_LINK_EVENT = "evglab-pricing-track";

/** Hash-Ziel + Query für Option 2 · Werkstatt (SELBST NUTZEN) */
export function buildPricingWerkstattHref(): string {
  return "/#preise?track=werkstatt";
}

function parseTrackFromHash(): PricingDeepLinkTrack | null {
  if (typeof window === "undefined") return null;
  const raw = window.location.hash.replace(/^#/, "");
  if (!raw) return null;
  const queryIndex = raw.indexOf("?");
  if (queryIndex === -1) return null;
  const params = new URLSearchParams(raw.slice(queryIndex + 1));
  const track = params.get("track");
  if (track === "werkstatt" || track === "self" || track === "dashboard") return "werkstatt";
  if (track === "manufaktur" || track === "premium" || track === "service") return "manufaktur";
  return null;
}

export function notifyPricingDeepLink(track: PricingDeepLinkTrack): void {
  window.dispatchEvent(new CustomEvent(PRICING_DEEP_LINK_EVENT, { detail: { track } }));
}

export function readPricingDeepLinkTrack(): PricingDeepLinkTrack | null {
  return parseTrackFromHash();
}

export function navigateToPricingWerkstatt(onBeforeNavigate?: () => void): void {
  onBeforeNavigate?.();
  document.body.style.overflow = "";

  const href = buildPricingWerkstattHref();
  const onHome = window.location.pathname === "/";

  if (onHome) {
    window.history.pushState(null, "", href);
    notifyPricingDeepLink("werkstatt");
    window.requestAnimationFrame(() => {
      scrollToSection("preise");
    });
    return;
  }

  window.location.assign(href);
}
