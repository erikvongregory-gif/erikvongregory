/** Einheitliche Hauptnavigation (Unterseiten, Rechtliches). */
export const SITE_NAV_LINKS = [
  { label: "Produkt", href: "#product" },
  { label: "So funktioniert’s", href: "#how-it-works" },
  { label: "Motive", href: "#formats" },
  { label: "Funktionen", href: "#features" },
  { label: "Preise", href: "#pricing" },
  { label: "FAQ", href: "#faqs" },
  { label: "Über uns", href: "/ueber-uns" },
  { label: "Ratgeber", href: "/ratgeber" },
  { label: "Kontakt", href: "#contact" },
] as const;

export type SiteNavLink = (typeof SITE_NAV_LINKS)[number];
