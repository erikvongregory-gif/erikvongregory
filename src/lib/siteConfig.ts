/**
 * SEO & Site-Konfiguration
 * WICHTIG: Beim Go-Live BaseUrl auf die echte Domain setzen!
 */
export const SITE = {
  name: "EvGlab",
  baseUrl: "https://www.erikvongregory.com",
  defaultTitle: "EvGlab | KI für Brauereien & Gastronomie",
  defaultDescription:
    "KI für Brauereien – Automatisierte Marketing, Content & Verkauf. EvGlab hilft Brauereien, Gastronomen und Getränkeherstellern, mit KI sichtbar zu werden. Kostenloses Erstgespräch.",
  keywords: [
    "KI Brauerei",
    "KI Marketing Brauerei",
    "KI für Brauereien",
    "KI Gastronomie",
    "automatisiertes Marketing Brauerei",
    "KI Content Brauerei",
    "KI Produktfotos Bier",
    "Marketing Brauerei",
    "Digitale Sichtbarkeit Brauerei",
    "Getränkemarketing",
    "Brauerei Marketing",
    "EvGlab",
  ],
  locale: "de_DE",
  ogImage: "/og-image.png", // 1200×630 für WhatsApp, LinkedIn, Twitter etc.

  /** Google Search Console – Code von search.google.com/search-console eintragen, z.B. "abc123xyz" */
  googleSiteVerification: "",
} as const;
