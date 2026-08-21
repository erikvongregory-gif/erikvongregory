import { SITE } from "@/lib/siteConfig";

export const FOUNDER = {
  name: "Erik Freiherr von Gregory",
  nameItalic: "Freiherr",
  shortName: "Erik von Gregory",
  rolle: "Strategie & Umsetzung",
  fokus: "Brauerei-Marketing",
  seit: "2026",
  portraitSrc: "/ueber-uns-portrait.webp",
  portraitAlt: "Erik Freiherr von Gregory — Gründer BrewAI",
} as const;

export const HERO_TAGS = [
  "KI-Werbebilder",
  "Video & Clips",
  "Premium & Abo",
  "DACH",
  "Markenlook",
] as const;

export const HERO_STATS: [string, string][] = [
  ["12+", "Brauereien"],
  ["DACH", "Region · Fokus"],
  ["100%", "Brauerei-Spezialisierung"],
  ["DE", "Hosting · DSGVO"],
];

export const ORIGIN_QUOTE =
  "Wie bekommen Brauereien schneller gute Werbemotive — ohne dass jedes Bild Wochen an interner Kapazität frisst?";

export const DELIVERY_ROWS: [string, string][] = [
  ["Premium", "Fertige Pakete · Briefing → Lieferung"],
  ["Abo", "Dashboard mit Token · selber generieren"],
  ["Setup", "Markenprofil im Hintergrund · jeder Output"],
];

export type KapitelProof =
  | { kind: "pillars"; title: string; items: [string, string][] }
  | { kind: "list"; items: string[] }
  | { kind: "stat"; value: string; label: string };

export type Kapitel = {
  n: string;
  kicker: string;
  head: string;
  headItalic: string;
  body: string;
  proof: KapitelProof;
};

export const KAPITEL: Kapitel[] = [
  {
    n: "01",
    kicker: "Haltung",
    head: "Wie wir denken.",
    headItalic: "KI ersetzt kein Briefing.",
    body: "KI spart Zeit — sie ersetzt aber kein Briefing. Wir arbeiten mit klaren Annahmen, eurem Markenlook und wiederholbaren Outputs, damit Qualität planbar bleibt.",
    proof: {
      kind: "pillars",
      title: "Drei Säulen",
      items: [
        ["Klare Annahmen", "Vor dem ersten Bild"],
        ["Markenlook", "In jedem Output verankert"],
        ["Wiederholbar", "Output statt Einzelstücke"],
      ],
    },
  },
  {
    n: "02",
    kicker: "Klientel",
    head: "Für wen wir bauen.",
    headItalic: "Brauereien in DACH.",
    body: "Brauereien und Getränkemarken in Deutschland, Österreich und der Schweiz — Teams, die wenig interne Design-Kapazität haben, aber professionelle Motive für Web, Social und Kampagnen brauchen.",
    proof: {
      kind: "list",
      items: ["Brauereien & Brauhäuser", "Getränkemarken & Limos", "Gastro mit eigenem Bier", "Saisonale Editionen"],
    },
  },
  {
    n: "03",
    kicker: "Richtung",
    head: "Wohin es geht.",
    headItalic: "Wiedererkennung statt Einzelmotive.",
    body: "Mehr Anfragen und Wiedererkennung durch konsistente Bildsprache — ohne dass jedes Motiv ein Einzelprojekt wird. Dafür gibt es Premium-Pakete und das Token-Abo.",
    proof: { kind: "stat", value: "2", label: "Wege · Premium oder Token-Abo" },
  },
];

export const HUGO_HELPS = [
  "Prompts schreiben und schärfen",
  "Motive im Markenstil bauen",
  "Varianten & Formate (9:16, 4:5, 1:1, 16:9)",
  "Mediathek navigieren",
  "Tokens & Bedienung der Bild-Funktionen",
] as const;

export const HUGO_REFERS = [
  "Bierrezepte & Sudhaus-Fragen",
  "Allgemeines Marketing-Coaching",
  "Steuer-, Rechts- oder Vertragsthemen",
] as const;

export type HugoMessage = {
  who: "user" | "hugo";
  text: string;
  meta?: string;
  offTopic?: boolean;
};

export const HUGO_MESSAGES_DESKTOP: HugoMessage[] = [
  { who: "user", text: "Wie bekomme ich ein Produktfoto im Format 4:5 mit warmem Abendlicht?" },
  {
    who: "hugo",
    text: "Beschreib dein Bier zuerst (Stil, Glas, Etikett). Danach fügen wir „warmes Abendlicht, leichte Kondenstropfen“ hinzu. Format vorher auf 4:5 stellen — dann 3 Varianten generieren.",
    meta: "Prompt-Hilfe · 02 Schritte",
  },
  { who: "user", text: "Kannst du mir auch ein Rezept für mein Märzen empfehlen?" },
  {
    who: "hugo",
    text: "Nein — Sudhaus-Wissen ist nicht meins. Ich helfe nur bei Bildgenerierung im BrewAI-Dashboard: Prompts, Motive, Markenlook, Varianten, Formate, Mediathek und Tokens.",
    meta: "Außerhalb · Bild-Funktionen",
    offTopic: true,
  },
  { who: "user", text: "Okay — wie viele Tokens kostet ein Reels-Hook 9:16?" },
  {
    who: "hugo",
    text: "Pro Generierung 4 Tokens (1 Variante = 1 Token, du bekommst 3 + 1 Final-Render). Im Pro-Plan ist die Final-Stage tokenfrei.",
    meta: "Tokens · Reels",
  },
];

export const HUGO_MESSAGES_MOBILE: HugoMessage[] = HUGO_MESSAGES_DESKTOP.filter(
  (_, i) => i < 4,
);

export const SATZ_TAGS = [
  "Briefing-first",
  "DACH-fokussiert",
  "Lieferobjekte statt Endlos-Schleife",
  "Tokens planbar",
] as const;

/** Beispiel-Fokusregionen — kein Kundenstamm, sondern typischer Einstieg pro Markt */
export const DACH_FOCUS_ROWS: {
  cc: string;
  stadt: string;
  region: string;
  angebot: "Premium" | "Dashboard";
}[] = [
  { cc: "DE", stadt: "München", region: "Bayern", angebot: "Premium" },
  { cc: "DE", stadt: "Hamburg", region: "Norddeutschland", angebot: "Dashboard" },
  { cc: "DE", stadt: "Köln", region: "Rheinland", angebot: "Premium" },
  { cc: "DE", stadt: "Berlin", region: "Hauptstadt", angebot: "Dashboard" },
  { cc: "AT", stadt: "Wien", region: "Österreich", angebot: "Premium" },
  { cc: "AT", stadt: "Salzburg", region: "Alpenraum", angebot: "Dashboard" },
  { cc: "CH", stadt: "Zürich", region: "Schweiz", angebot: "Premium" },
  { cc: "CH", stadt: "Bern", region: "Mittelland", angebot: "Dashboard" },
];

export const DACH_MAP_CITIES_DESKTOP = [
  { name: "München", x: 205, y: 195 },
  { name: "Hamburg", x: 180, y: 75 },
  { name: "Köln", x: 140, y: 140 },
  { name: "Berlin", x: 240, y: 100 },
  { name: "Wien", x: 305, y: 230 },
  { name: "Zürich", x: 195, y: 230 },
] as const;

export const DACH_MAP_CITIES_MOBILE = DACH_MAP_CITIES_DESKTOP.filter((c) =>
  ["München", "Hamburg", "Wien", "Zürich"].includes(c.name),
);

export const KONTAKT_KANAALE: {
  kanal: string;
  wert: string;
  meta: string;
  href: string;
  ariaLabel: string;
}[] = [
  {
    kanal: "E-Mail",
    wert: SITE.contactEmail,
    meta: "Antwort meist in 4h",
    href: SITE.contactMailto,
    ariaLabel: `E-Mail an ${SITE.contactEmail}`,
  },
  {
    kanal: "LinkedIn",
    wert: "evglab",
    meta: "Schnell · unkompliziert",
    href: SITE.linkedinUrl,
    ariaLabel: "BrewAI auf LinkedIn",
  },
  {
    kanal: "WhatsApp",
    wert: SITE.contactPhoneDisplay,
    meta: "Für Brauereien direkt",
    href: SITE.whatsappUrl,
    ariaLabel: `WhatsApp: ${SITE.contactPhoneDisplay}`,
  },
];
