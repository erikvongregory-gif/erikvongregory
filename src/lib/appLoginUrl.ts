/**
 * Basis-URL der Dashboard-App (getrennt von der Marketing-Site).
 * Produktion: https://app.evglab.com
 *
 * Lokal: in `.env.local`, z. B. `NEXT_PUBLIC_APP_BASE_URL=http://localhost:3001`
 */
export const APP_BASE_URL =
  process.env.NEXT_PUBLIC_APP_BASE_URL?.trim() ||
  (process.env.NODE_ENV === "development"
    ? "http://localhost:3001"
    : "https://app.evglab.com");

/** Hostname für UI-Mockups (Browser-Leiste, Studio-Demo) — folgt NEXT_PUBLIC_APP_BASE_URL. */
export const APP_DISPLAY_HOST = (() => {
  try {
    return new URL(APP_BASE_URL).host;
  } catch {
    return "app.evglab.com";
  }
})();

/** Dashboard-Start — Hero-CTA „3 Bilder kostenlos generieren“ */
export const APP_DASHBOARD_URL = `${APP_BASE_URL.replace(/\/$/, "")}/dashboard`;

/** Registrierung mit Abo-Abschluss — Demo-Ergebnis-CTA */
export const APP_REGISTER_URL = `${APP_BASE_URL.replace(/\/$/, "")}/registrieren?mode=register`;

/**
 * Ziel der „Anmelden“-Links im Marketing (Dashboard-App).
 * Produktion: https://app.evglab.com/anmelden
 *
 * Lokal: in `.env.local` setzen, z. B. wenn die App auf Port 3001 läuft:
 * NEXT_PUBLIC_APP_LOGIN_URL=http://localhost:3001/anmelden
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
