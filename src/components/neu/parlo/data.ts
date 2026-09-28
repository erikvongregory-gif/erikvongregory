import { SITE } from "@/lib/siteConfig";
import { NEU_STUDIO_PLANS } from "@/lib/neu/studioPlans";

export const ASSET = "/neu/parlo";
export const APP_URL = SITE.appBaseUrl;
/** Neues BrewAI Markenzeichen (B-Becherglas + Wordmark), weiß auf transparent */
export const LOGO_SRC = "/brewai-logo-mark.png";

export const NAV_LINKS = [
  { href: "#product", label: "Produkt" },
  { href: "#how-it-works", label: "So funktioniert’s" },
  { href: "#formats", label: "Motive" },
  { href: "#features", label: "Funktionen" },
  { href: "#pricing", label: "Preise" },
  { href: "#faqs", label: "FAQ" },
] as const;

/** Marquee hinter der Sidebar-Card — BrewAI-Motive */
export const USE_CASES = [
  "Produktfotos",
  "Feed-Motive",
  "Story-Formate",
  "Saisonkampagne",
  "Biergarten-Event",
  "Händler-Promotion",
  "Markenprofil",
  "Mediathek",
  "Team-Freigaben",
  "Token-Abo",
  "BrewAI Chat",
  "Kampagnen-Look",
] as const;

export const BENEFITS = [
  {
    n: "01",
    title: "Marke einmal setzen",
    body: "Website einlesen, Farben und Ton festlegen — jedes Motiv folgt dem Markenprofil.",
  },
  {
    n: "02",
    title: "Motive in Minuten",
    body: "Produkt, Feed und Story aus dem Dashboard — bereit zum Posten, ohne Fotostudio.",
  },
  {
    n: "03",
    title: "Alles an einem Ort",
    body: "Mediathek, Tokens und Team im selben Cockpit — keine Tool-Kette mehr.",
  },
  {
    n: "04",
    title: "BrewAI an Bord",
    body: "Der Assistent hilft bei Prompts und Markenlook — ihr entscheidet, was freigegeben wird.",
  },
] as const;

export const HOW_TABS = [
  {
    id: "brand",
    label: "Markenprofil",
    eyebrow: "Einmal setzen.",
    description:
      "Brauereiname, Farben, Ton und Do/Don’ts — jedes Motiv folgt diesem Profil.",
    bullets: [
      "Website und Referenzen einlesen",
      "Farben, Ton und No-Gos festlegen",
      "Lock-Level für konsistenten Look",
    ],
    mock: {
      title: "Markenprofil",
      status: "Aktiv",
      rows: [
        { title: "Brauerei", meta: "Name & Website" },
        { title: "Farben & Ton", meta: "Gesetzt" },
        { title: "Referenzbilder", meta: "3 Dateien" },
      ],
      footer: "Bereit für Generierung",
    },
  },
  {
    id: "images",
    label: "Bilder erstellen",
    eyebrow: "Prompt → Motiv.",
    description:
      "Produkt-, Feed- und Story-Motive direkt im Dashboard — Tokens statt Fotostudio.",
    bullets: [
      "Prompt mit Markenkontext",
      "Formate 1K–4K und Aspect Ratios",
      "Ergebnis in der Mediathek",
    ],
    mock: {
      title: "Bilder erstellen",
      status: "Generiert",
      rows: [
        { title: "Produktshot Flasche", meta: "4K · 1:1" },
        { title: "Feed Saisonbier", meta: "2K · 4:5" },
        { title: "Story Event", meta: "1K · 9:16" },
      ],
      footer: "In Mediathek gespeichert",
    },
  },
  {
    id: "library",
    label: "Mediathek",
    eyebrow: "Alles wiederfinden.",
    description:
      "Freigaben, Downloads und Team-Zugriff — Motive bleiben organisiert.",
    bullets: [
      "Alle Generierungen an einem Ort",
      "Download und Freigabe",
      "Übersicht fürs ganze Team",
    ],
    mock: {
      title: "Mediathek",
      status: "12 Motive",
      rows: [
        { title: "Sommerkampagne", meta: "6 Dateien" },
        { title: "Händler-Kit", meta: "4 Dateien" },
        { title: "Event-Serie", meta: "2 Dateien" },
      ],
      footer: "Bereit zum Posten",
    },
  },
  {
    id: "assistant",
    label: "BrewAI",
    eyebrow: "Hilfe beim Prompt.",
    description:
      "Der Dashboard-Assistent zu Stil, Formaten, Mediathek und Tokens — nicht zu Rezepten.",
    bullets: [
      "Prompts und Stil schärfen",
      "Formate und Tokens erklären",
      "Markenlook im Blick behalten",
    ],
    mock: {
      title: "BrewAI",
      status: "Online",
      rows: [
        { title: "Prompt verbessern", meta: "Vorschlag bereit" },
        { title: "Format wählen", meta: "Story 9:16" },
        { title: "Token-Stand", meta: "Sichtbarkeit" },
      ],
      footer: "Weiter im Chat",
    },
  },
] as const;

/** Output-Formate / Kampagnenszenarien (ersetzt Inbox-Channels) */
export const FORMAT_COUNTS = [
  { name: "Produkt", count: "1:1" },
  { name: "Feed", count: "4:5" },
  { name: "Story", count: "9:16" },
  { name: "Saison", count: "Serie" },
  { name: "Event", count: "Kit" },
] as const;

export const FORMAT_ITEMS = [
  {
    initials: "PF",
    name: "Produktfoto Flasche",
    tag: "Produkt",
    time: "gerade",
    preview: "Markenprofil · 4K · bereit zum Download",
  },
  {
    initials: "FD",
    name: "Feed Saisonbier",
    tag: "Feed",
    time: "2 Min.",
    preview: "Sommerlook · 4:5 · in Mediathek",
  },
  {
    initials: "ST",
    name: "Story Biergarten",
    tag: "Story",
    time: "5 Min.",
    preview: "Event-Abend · 9:16 · freigegeben",
  },
  {
    initials: "HK",
    name: "Händler-Promotion",
    tag: "Händler",
    time: "8 Min.",
    preview: "Aktionsmotiv · Team-Freigabe offen",
  },
  {
    initials: "SK",
    name: "Saisonkampagne",
    tag: "Serie",
    time: "12 Min.",
    preview: "4 Motive · gleicher Markenlook",
  },
  {
    initials: "EV",
    name: "Festzelt-Event",
    tag: "Event",
    time: "15 Min.",
    preview: "Key Visual · Social-Kit",
  },
] as const;

export const FORMAT_CAPABILITIES = [
  {
    title: "Marke zuerst.",
    body: "Ohne Markenprofil keine Generierung — so bleibt der Look eurer Brauerei treu.",
  },
  {
    title: "Formate fertig.",
    body: "Produkt, Feed und Story direkt im richtigen Seitenverhältnis.",
  },
  {
    title: "Team im Loop.",
    body: "Freigaben und Rollen im Dashboard — Editor und Viewer inklusive.",
  },
  {
    title: "Tokens statt Chaos.",
    body: "Verbrauch sichtbar, Pläne klar — kein Tool-Wirrwarr mehr.",
  },
] as const;

export const WORKFLOW_STEPS = [
  {
    time: "01",
    title: "Markenprofil anlegen",
    description: "Website, Farben, Ton und Referenzen — einmal, für alle Motive.",
  },
  {
    time: "02",
    title: "Motiv generieren",
    description: "Prompt im Dashboard, Format wählen, Tokens verbrauchen.",
  },
  {
    time: "03",
    title: "In der Mediathek prüfen",
    description: "Ergebnis speichern, freigeben oder erneut anpassen.",
  },
  {
    time: "04",
    title: "Posten oder teilen",
    description: "Download für Feed, Story, Händler oder Event — fertig.",
  },
] as const;

export const ALERT_CARDS = [
  {
    title: "Markenprofil vollständig",
    meta: "Farben, Ton und Referenzen gesetzt",
  },
  {
    title: "3 Motive in der Mediathek",
    meta: "Saisonbier-Serie · bereit zum Posten",
  },
  {
    title: "Token-Stand aktualisiert",
    meta: "Verbrauch sichtbar im Abonnement",
  },
] as const;

export const DASHBOARD_MODULES = [
  { name: "Bilder erstellen" },
  { name: "Markenprofil" },
  { name: "Mediathek" },
  { name: "BrewAI" },
  { name: "Team" },
  { name: "Abonnement" },
] as const;

export type BillingPeriod = "monthly" | "annual";

export const PLANS = NEU_STUDIO_PLANS.map((plan) => ({
  id: plan.id,
  name: plan.name,
  tagline: plan.tag,
  monthly: plan.monthly,
  compareAtMonthly: plan.compareAtMonthly,
  featured: Boolean(plan.recommended),
  cta: "Plan wählen",
  features: plan.features,
}));

export function planPrice(
  monthly: number,
  compareAtMonthly: number,
  period: BillingPeriod,
): string {
  const display = period === "annual" ? monthly : compareAtMonthly;
  return `${display.toLocaleString("de-DE")} €`;
}

export const FAQS = [
  {
    q: "Was macht BrewAI im Dashboard?",
    a: "Ihr legt ein Markenprofil an und erzeugt daraus Produkt-, Feed- und Story-Motive. Mediathek, Tokens, Team und BrewAI-Chat liegen im selben Cockpit auf app.brewai.de.",
  },
  {
    q: "Muss das Markenprofil fertig sein?",
    a: "Ja. Vor der Generierung braucht ihr Name, Ton, Farben und idealerweise Referenzen — so bleibt jedes Motiv wiedererkennbar.",
  },
  {
    q: "Was sind Tokens?",
    a: "Tokens sind euer Monatskontingent für Generierungen. Jedes Motiv verbraucht Tokens; ungenutzte Kontingente sind je nach Plan teilweise übertragbar.",
  },
  {
    q: "Was ist mit Videos?",
    a: "Videos sind in den Plänen vorgesehen (Seedance). In der Sidebar steht der Einstieg teilweise noch als „bald“ — sobald freigeschaltet, nutzt ihr dieselben Tokens.",
  },
  {
    q: "Premium-Lieferung oder Dashboard-Abo?",
    a: "Das Dashboard-Abo ist Self-Service mit Tokens. Premium-Pakete (Manufaktur) sind Einmallieferungen fertiger Motive — getrennt vom monatlichen Werkstatt-Abo.",
  },
  {
    q: "Für wen ist BrewAI gedacht?",
    a: "Für Brauereien und Getränkemarken in DACH, die planbar Content im eigenen Markenlook brauchen — ohne Agentur-Chaos und ohne generische KI-Vorlagen.",
  },
] as const;

export const CTA_ICONS = [
  { alt: "Produkt", label: "Produkt" },
  { alt: "Feed", label: "Feed" },
  { alt: "Story", label: "Story" },
  { alt: "Saison", label: "Saison" },
  { alt: "Event", label: "Event" },
  { alt: "Händler", label: "Händler" },
  { alt: "Mediathek", label: "Mediathek" },
  { alt: "Team", label: "Team" },
] as const;

export const FOOTER_COLUMNS = [
  {
    title: "Produkt",
    links: [
      { label: "Dashboard", href: APP_URL },
      { label: "Preise", href: "#pricing" },
      { label: "Funktionen", href: "#features" },
      { label: "FAQ", href: "#faqs" },
    ],
  },
  {
    title: "Lösungen",
    links: [
      { label: "Saisonkampagne", href: "/loesungen/saisonkampagne-brauerei" },
      { label: "Biergarten & Event", href: "/loesungen/biergarten-event-marketing" },
      { label: "Händler & Gastro", href: "/loesungen/haendler-gastro-promotion" },
      { label: "Alle Lösungen", href: "/loesungen" },
    ],
  },
  {
    title: "Unternehmen",
    links: [
      { label: "Über uns", href: "/ueber-uns" },
      { label: "Ratgeber", href: "/ratgeber" },
      { label: "Kontakt", href: SITE.contactMailto },
    ],
  },
  {
    title: "Rechtliches",
    links: [
      { label: "Impressum", href: "/impressum" },
      { label: "Datenschutz", href: "/datenschutz" },
      { label: "AGB", href: "/agb" },
      { label: "Widerruf", href: "/widerruf" },
    ],
  },
] as const;
