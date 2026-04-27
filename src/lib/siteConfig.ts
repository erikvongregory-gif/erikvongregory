/**
 * SEO & Site-Konfiguration
 * WICHTIG: Beim Go-Live BaseUrl auf die echte Domain setzen!
 */
export const SITE = {
  name: "EvGlab",
  baseUrl: "https://evglab.com",
  defaultTitle: "Das KI-Content-System für Brauereien | EvGlab",
  defaultDescription:
    "EvGlab ist das KI-Content-System für Brauereien: planbare Produktbilder, Kampagnen und Social-Content für mehr Sichtbarkeit, Wiedererkennung und Anfragen.",
  keywords: [
    "KI Content System Brauerei",
    "KI Content für Brauereien",
    "KI Brauerei",
    "KI Marketing Brauerei",
    "KI für Brauereien",
    "KI Gastronomie",
    "automatisiertes Content System Brauerei",
    "KI Content Brauerei",
    "KI Produktfotos Bier",
    "Brauerei Content Marketing",
    "Digitale Sichtbarkeit Brauerei",
    "Getränkemarketing",
    "Brauerei Marketing",
    "EvGlab",
  ],
  locale: "de_DE",
  ogImage: "/og/evglab-og.jpg", // 1200×630 für WhatsApp, LinkedIn, Twitter etc.

  /** Google Search Console – Code von search.google.com/search-console eintragen, z.B. "abc123xyz" */
  googleSiteVerification: "",
} as const;
