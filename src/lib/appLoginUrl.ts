import { SITE } from "@/lib/siteConfig";

/**
 * Basis-URL der Dashboard-App (getrennt von der Marketing-Site).
 * Override: NEXT_PUBLIC_APP_BASE_URL (siehe siteConfig Defaults).
 *
 * Lokal: in `.env.local`, z. B. `NEXT_PUBLIC_APP_BASE_URL=http://localhost:3001`
 */
export const APP_BASE_URL =
  process.env.NEXT_PUBLIC_APP_BASE_URL?.trim() ||
  (process.env.NODE_ENV === "development"
    ? "http://localhost:3001"
    : SITE.appBaseUrl);

/** Hostname für UI-Mockups (Browser-Leiste, Studio-Demo) — folgt NEXT_PUBLIC_APP_BASE_URL. */
export const APP_DISPLAY_HOST = (() => {
  try {
    return new URL(APP_BASE_URL).host;
  } catch {
    return SITE.appHost;
  }
})();

/** Dashboard-Start — Hero-CTA „3 Bilder kostenlos generieren“ */
export const APP_DASHBOARD_URL = `${APP_BASE_URL.replace(/\/$/, "")}/dashboard`;

/** Registrierung mit Abo-Abschluss — Demo-Ergebnis-CTA */
export const APP_REGISTER_URL = `${APP_BASE_URL.replace(/\/$/, "")}/registrieren?mode=register`;

/**
 * Ziel der „Anmelden“-Links im Marketing (Dashboard-App).
 * Override: NEXT_PUBLIC_APP_LOGIN_URL
 */
export const APP_LOGIN_URL =
  process.env.NEXT_PUBLIC_APP_LOGIN_URL?.trim() ||
  `${APP_BASE_URL.replace(/\/$/, "")}/anmelden`;

/** Volle Navigation zur App (z. B. Hero-CTA) */
export function navigateToAppDashboard(): void {
  if (typeof window === "undefined") return;
  window.location.assign(APP_DASHBOARD_URL);
}

/** Login-URL der App mit optionalen Query-Parametern (z. B. `plan` nach Pricing-Klick). */
export function buildAppLoginUrl(params?: Record<string, string>): string {
  const base = APP_LOGIN_URL.replace(/\/$/, "");
  if (!params || Object.keys(params).length === 0) {
    return base;
  }
  try {
    const u = new URL(base);
    for (const [key, value] of Object.entries(params)) {
      if (value) u.searchParams.set(key, value);
    }
    return u.toString();
  } catch {
    const q = new URLSearchParams(params);
    return `${base}?${q.toString()}`;
  }
}

export type AppCheckoutPlanKey = "start" | "growth" | "pro";

const HOMEPAGE_CHECKOUT_SOURCE = "homepage_pricing";

/** Nach Login/Registrierung in der App direkt in den Stripe-Checkout für einen Plan. */
export function buildAppHomepageCheckoutUrl(plan: AppCheckoutPlanKey): string {
  return buildAppLoginUrl({
    plan,
    checkout: "1",
    source: HOMEPAGE_CHECKOUT_SOURCE,
  });
}

/** Registrierung mit anschließendem Checkout in der App (Demo-Funnel, Pricing-CTAs). */
export function buildAppRegisterCheckoutUrl(plan: AppCheckoutPlanKey): string {
  try {
    const u = new URL(APP_REGISTER_URL);
    u.searchParams.set("plan", plan);
    u.searchParams.set("checkout", "1");
    u.searchParams.set("source", HOMEPAGE_CHECKOUT_SOURCE);
    return u.toString();
  } catch {
    const q = new URLSearchParams({
      mode: "register",
      plan,
      checkout: "1",
      source: HOMEPAGE_CHECKOUT_SOURCE,
    });
    return `${APP_BASE_URL.replace(/\/$/, "")}/registrieren?${q.toString()}`;
  }
}

/** Browser-Navigation zur App-Checkout-Einstieg (ersetzt fehleranfälligen Marketing-/api/billing/checkout). */
export function navigateToAppPlanCheckout(plan: AppCheckoutPlanKey): void {
  if (typeof window === "undefined") return;
  window.location.assign(buildAppHomepageCheckoutUrl(plan));
}
