/**
 * SEO & Site-Konfiguration
 * WICHTIG: Beim Go-Live BaseUrl auf die echte Domain setzen!
 */
export const SITE = {
  name: "EvGlab",
  baseUrl: "https://ki.evglab.com",
  /** Absolut-URL des Markenlogos (JSON-LD, Rich Results) */
  brandLogoUrl: "https://ki.evglab.com/evglab-logo.svg" as const,
  /** Zwei terrakotta Wellen, transparenter Hintergrund */
  brandLogoPath: "/evglab-logo.svg" as const,
  brandLogoAlt: "EvGlab Wellen-Mark" as const,
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

  /** Anzeige im Footer / Kontakt; Chat über WhatsApp Business */
  contactPhoneDisplay: "+49 15565 602176",
  whatsappUrl: "https://wa.me/4915565602176",

  /** Persönliches LinkedIn-Profil (Footer, Über uns, JSON-LD) */
  linkedinUrl: "https://www.linkedin.com/in/erik-freiherr-von-gregory-22852b329/" as const,

  /** Google Search Console – Code von search.google.com/search-console eintragen, z.B. "abc123xyz" */
  googleSiteVerification: "",
} as const;
