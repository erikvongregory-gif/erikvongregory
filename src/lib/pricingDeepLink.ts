import type { SubscriptionPlanKey } from "@/lib/billing/tokenState";
import { scrollToElementCentered } from "@/lib/lenisScroll";
import { scrollToSection } from "@/lib/scrollToSection";

export type PricingDeepLinkTrack = "werkstatt" | "manufaktur";

export type PricingDeepLinkPayload = {
  track: PricingDeepLinkTrack;
  plan?: SubscriptionPlanKey;
};

/** Standard-Ziel aus dem Demo-Funnel („Abo ansehen“). */
export const PRICING_FUNNEL_HIGHLIGHT_PLAN: SubscriptionPlanKey = "growth";

export const PRICING_DEEP_LINK_EVENT = "evglab-pricing-track";

export function pricingPlanElementId(plan: SubscriptionPlanKey) {
  return `preise-plan-${plan}`;
}

function parseHashQuery(): URLSearchParams | null {
  if (typeof window === "undefined") return null;
  const raw = window.location.hash.replace(/^#/, "");
  if (!raw) return null;
  const queryIndex = raw.indexOf("?");
  if (queryIndex === -1) return null;
  return new URLSearchParams(raw.slice(queryIndex + 1));
}

function parseTrackFromParams(params: URLSearchParams | null): PricingDeepLinkTrack | null {
  if (!params) return null;
  const track = params.get("track");
  if (track === "werkstatt" || track === "self" || track === "dashboard") return "werkstatt";
  if (track === "manufaktur" || track === "premium" || track === "service") return "manufaktur";
  return null;
}

function parsePlanFromParams(params: URLSearchParams | null): SubscriptionPlanKey | null {
  if (!params) return null;
  const plan = params.get("plan");
  if (plan === "start" || plan === "starter") return "start";
  if (plan === "growth" || plan === "wachstum") return "growth";
  if (plan === "pro" || plan === "premium") return "pro";
  return null;
}

/** Hash-Ziel + Query für Option 2 · Werkstatt (optional mit Plan). */
export function buildPricingWerkstattHref(plan: SubscriptionPlanKey = PRICING_FUNNEL_HIGHLIGHT_PLAN): string {
  const params = new URLSearchParams({ track: "werkstatt", plan });
  return `/#preise?${params.toString()}`;
}

export function readPricingDeepLinkPayload(): PricingDeepLinkPayload | null {
  const params = parseHashQuery();
  const track = parseTrackFromParams(params);
  if (!track) return null;
  const plan = parsePlanFromParams(params) ?? undefined;
  return { track, plan };
}

export function readPricingDeepLinkTrack(): PricingDeepLinkTrack | null {
  return readPricingDeepLinkPayload()?.track ?? null;
}

export function notifyPricingDeepLink(payload: PricingDeepLinkPayload): void {
  window.dispatchEvent(new CustomEvent(PRICING_DEEP_LINK_EVENT, { detail: payload }));
}

const PLAN_FOCUS_MAX_ATTEMPTS = 16;
const PLAN_FOCUS_RETRY_MS = 80;

/** Scrollt eine Werkstatt-Preiskarte in die Bildschirmmitte (mit Retry bis DOM bereit). */
export function focusPricingPlan(plan: SubscriptionPlanKey, attempt = 0) {
  if (typeof window === "undefined") return;

  const id = pricingPlanElementId(plan);
  const isDesktop = window.matchMedia("(min-width: 1024px)").matches;
  const wrapper = document.getElementById(isDesktop ? "desktop-content" : "mobile-content");
  const target =
    wrapper?.querySelector<HTMLElement>(`#${CSS.escape(id)}`) ?? document.getElementById(id);

  if (!target) {
    if (attempt < PLAN_FOCUS_MAX_ATTEMPTS) {
      window.setTimeout(() => focusPricingPlan(plan, attempt + 1), PLAN_FOCUS_RETRY_MS);
    }
    return;
  }

  scrollToElementCentered(target);
}

export function navigateToPricingWerkstatt(
  onBeforeNavigate?: () => void,
  plan: SubscriptionPlanKey = PRICING_FUNNEL_HIGHLIGHT_PLAN,
): void {
  onBeforeNavigate?.();
  document.body.style.overflow = "";

  const payload: PricingDeepLinkPayload = { track: "werkstatt", plan };
  const href = buildPricingWerkstattHref(plan);
  const onHome = window.location.pathname === "/";

  if (onHome) {
    window.history.pushState(null, "", href);
    notifyPricingDeepLink(payload);
    window.requestAnimationFrame(() => {
      scrollToSection("preise");
      focusPricingPlan(plan);
    });
    return;
  }

  window.location.assign(href);
}
