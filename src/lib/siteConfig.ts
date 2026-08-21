/**
 * SEO, Branding & Domain-Konfiguration
 *
 * Domain-Wechsel: nur Defaults unten und/oder Env setzen — keine Hardcodes streuen.
 *
 * Env (Vercel / .env.local):
 *   NEXT_PUBLIC_SITE_URL          Marketing-Canonical, z.B. https://brewai.de
 *   NEXT_PUBLIC_APP_BASE_URL      Dashboard-App, z.B. https://app.evglab.com
 *   NEXT_PUBLIC_COOKIE_DOMAIN     Cookie-Root, z.B. brewai.de (ohne Leading-Dot)
 *   NEXT_PUBLIC_CONTACT_EMAIL     z.B. kontakt@brewai.de
 *   NEXT_PUBLIC_AGENCY_URL        Agentur-/Webdesign-Site, z.B. https://evglab.com
 *   NEXT_PUBLIC_SITE_NAME         Firmen-/Markenname (Anzeige)
 *   NEXT_PUBLIC_PRODUCT_NAME      SaaS-Produktname (falls ≠ Marke)
 *   NEXT_PUBLIC_LEGACY_HOSTS      Komma-getrennt, Redirect-Quellen
 *   NEXT_PUBLIC_APP_LOGIN_URL     optional Override Login-URL
 */

function trimEnv(key: string): string | undefined {
  const value = process.env[key]?.trim();
  return value ? value : undefined;
}

function stripTrailingSlash(url: string): string {
  return url.replace(/\/$/, "");
}

function hostnameOf(url: string, fallback: string): string {
  try {
    return new URL(url).hostname.toLowerCase();
  } catch {
    return fallback;
  }
}

/** e.g. www.brewai.de → brewai.de */
function rootDomainOf(hostname: string): string {
  const parts = hostname.split(".").filter(Boolean);
  if (parts.length >= 2) return parts.slice(-2).join(".");
  return hostname;
}

/** Defaults — BrewAI */
const DEFAULTS = {
  siteName: "BrewAI",
  productName: "BrewAI",
  /**
   * Canonical-URL. Ideal = Vercel-Primary-Domain.
   * www vs. Apex bitte NUR in Vercel umleiten — nicht hier (sonst Redirect-Loop).
   */
  marketingBaseUrl: "https://www.brewai.de",
  /** Dashboard-App */
  appBaseUrl: "https://app.brewai.de",
  agencyBaseUrl: "https://evglab.com",
  contactEmail: "kontakt@brewai.de",
  /**
   * Nur fremde/alte Domains. Niemals brewai.de oder www.brewai.de —
   * Apex/www regelt ausschließlich Vercel (Domains → Redirect).
   */
  legacyHosts: [
    "erikvongregory.com",
    "www.erikvongregory.com",
    "ki.evglab.com",
    "www.ki.evglab.com",
  ] as const,
} as const;

const marketingBaseUrl = stripTrailingSlash(
  trimEnv("NEXT_PUBLIC_SITE_URL") ?? DEFAULTS.marketingBaseUrl,
);
const appBaseUrl = stripTrailingSlash(
  trimEnv("NEXT_PUBLIC_APP_BASE_URL") ?? DEFAULTS.appBaseUrl,
);
const agencyBaseUrl = stripTrailingSlash(
  trimEnv("NEXT_PUBLIC_AGENCY_URL") ?? DEFAULTS.agencyBaseUrl,
);

const marketingHost = hostnameOf(marketingBaseUrl, "www.brewai.de");
const appHost = hostnameOf(appBaseUrl, "app.brewai.de");
const cookieDomain =
  trimEnv("NEXT_PUBLIC_COOKIE_DOMAIN") ?? rootDomainOf(marketingHost);

/** Legacy-Hosts ohne Canonical und ohne eigene Apex/www-Varianten (Loop-Schutz). */
const OWN_DOMAIN_SUFFIX = "brewai.de";
const legacyHosts = (
  trimEnv("NEXT_PUBLIC_LEGACY_HOSTS")?.split(",").map((h) => h.trim().toLowerCase()).filter(Boolean) ??
  [...DEFAULTS.legacyHosts]
).filter((host) => {
  if (host === marketingHost) return false;
  // Niemals brewai.de / www.brewai.de / *.brewai.de als Legacy (Vercel managed www↔apex)
  if (host === OWN_DOMAIN_SUFFIX || host.endsWith(`.${OWN_DOMAIN_SUFFIX}`)) return false;
  return true;
});

const siteName = trimEnv("NEXT_PUBLIC_SITE_NAME") ?? DEFAULTS.siteName;
const productName =
  trimEnv("NEXT_PUBLIC_PRODUCT_NAME") ?? siteName;

const contactEmail = trimEnv("NEXT_PUBLIC_CONTACT_EMAIL") ?? DEFAULTS.contactEmail;

export const SITE = {
  /** Firmen-/Markenname (Nav, Footer, SEO) */
  name: siteName,
  /** SaaS-Produktname — kann später von `name` abweichen */
  productName,
  baseUrl: marketingBaseUrl,
  marketingHost,
  appBaseUrl,
  appHost,
  /** Root-Domain für Secure-Cookies (Marketing + App unter Subdomains) */
  cookieDomain,
  agencyBaseUrl,
  agencyHost: hostnameOf(agencyBaseUrl, "evglab.com"),
  contactEmail,
  contactMailto: `mailto:${contactEmail}` as const,
  legacyHosts,

  /** Absolut-URL des Markenlogos (JSON-LD, Rich Results) */
  brandLogoUrl: `${marketingBaseUrl}/evglab-logo.svg` as const,
  /** Zwei terrakotta Wellen, transparenter Hintergrund */
  brandLogoPath: "/evglab-logo.svg" as const,
  brandLogoAlt: `${siteName} Wellen-Mark` as const,
  defaultTitle: `Das KI-Content-System für Brauereien | ${productName}`,
  defaultDescription: `${productName} ist das KI-Content-System für Brauereien: planbare Produktbilder, Kampagnen und Social-Content für mehr Sichtbarkeit, Wiedererkennung und Anfragen.`,
  keywords: [
    "KI Marketing",
    "KI Marketing Agentur",
    "KI Marketing für Brauereien",
    "KI für Brauereien",
    "KI Content für Brauereien",
    "Brauerei Marketing",
    "Brauerei Content Marketing",
    "Social Media Marketing Brauerei",
    "KI Social Media Content",
    "KI Produktfotos Bier",
    "KI Bilder für Werbung",
    "Content Automation Marketing",
    "digitale Sichtbarkeit Brauerei",
    "Marketing Automatisierung Mittelstand",
    "Getränkemarketing",
    "KI Marketing Deutschland",
    "KI Marketing DACH",
    "BrewAI",
    siteName,
    productName,
  ],
  locale: "de_DE",
  ogImage: "/og/evglab-og.jpg", // 1200×630 für WhatsApp, LinkedIn, Twitter etc.

  /** Anzeige im Footer / Kontakt; Chat über WhatsApp Business */
  contactPhoneDisplay: "+49 15565 602176",
  whatsappUrl: "https://wa.me/4915565602176",

  /** Persönliches LinkedIn-Profil (Footer, Über uns, JSON-LD) */
  linkedinUrl: "https://www.linkedin.com/in/erik-freiherr-von-gregory-22852b329/" as const,

  /** Google Search Console – HTML-Tag-Inhalt, z.B. "abc123xyz" */
  googleSiteVerification: "",
  /** Bing Webmaster Tools – msvalidate.01 Inhalt */
  bingSiteVerification: "",
} as const;

/** Host gehört zur Cookie-/Produktdomain (inkl. Subdomains). */
export function isSiteOwnedHost(hostname: string): boolean {
  const host = hostname.toLowerCase();
  const root = SITE.cookieDomain.toLowerCase();
  return host === root || host.endsWith(`.${root}`);
}
