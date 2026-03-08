/**
 * SEO & Site-Konfiguration
 * WICHTIG: Beim Go-Live BaseUrl auf die echte Domain setzen!
 */
export const SITE = {
  name: "Erik von Gregory",
  baseUrl: "https://erikvongregory.de",
  defaultTitle: "Erik von Gregory | KI für Brauereien & Gastronomie",
  defaultDescription:
    "KI für Brauereien – Automatisierte Marketing, Content & Verkauf. Erik von Gregory hilft Brauereien, Gastronomen und Getränkeherstellern, mit KI sichtbar zu werden. Kostenloses Erstgespräch.",
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
    "Erik von Gregory",
  ],
  locale: "de_DE",
  ogImage: undefined as string | undefined, // "/og-image.jpg" (1200×630) für Social-Sharing erstellen

  /** Google Search Console – Code von search.google.com/search-console eintragen, z.B. "abc123xyz" */
  googleSiteVerification: "",

  /** FormSpree Form-ID für Kontaktformular – kostenlos bei formspree.io, z.B. "xyzwabcd" */
  formspreeFormId: "",
} as const;
