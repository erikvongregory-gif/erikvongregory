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
    "EvGlab",
  ],
  locale: "de_DE",
  ogImage: "/og/evglab-og.jpg", // 1200×630 für WhatsApp, LinkedIn, Twitter etc.

  /** Google Search Console – Code von search.google.com/search-console eintragen, z.B. "abc123xyz" */
  googleSiteVerification: "",
} as const;
