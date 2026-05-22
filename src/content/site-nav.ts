import { DESKTOP_NAV_LINKS } from "@/content/desktop-home";

/** Einheitliche Hauptnavigation (Startseite, Unterseiten, Rechtliches). */
export const SITE_NAV_LINKS = [
  ...DESKTOP_NAV_LINKS,
  { label: "Ratgeber", href: "/ratgeber" },
  { label: "Kontakt", href: "#contact" },
] as const;

export type SiteNavLink = (typeof SITE_NAV_LINKS)[number];
