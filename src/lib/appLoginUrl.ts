/**
 * Ziel der „Anmelden“-Links im Marketing (Dashboard-App).
 * Produktion: https://app.evglab.com/anmelden
 *
 * Lokal: in `.env.local` setzen, z. B. wenn die App auf Port 3001 läuft:
 * NEXT_PUBLIC_APP_LOGIN_URL=http://localhost:3001/anmelden
 */
export const APP_LOGIN_URL =
  process.env.NEXT_PUBLIC_APP_LOGIN_URL?.trim() || "https://app.evglab.com/anmelden";

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
