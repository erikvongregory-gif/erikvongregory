export type WarumProof =
  | { kind: "stat"; value: string; label: string }
  | { kind: "calendar"; header: string; live: boolean; items: [string, string][] }
  | { kind: "bullets"; items: string[] };

export type WarumChapter = {
  n: string;
  kicker: string;
  head: string;
  headItalic: string;
  body: string;
  proof: WarumProof;
};

export type LoesungItem = {
  n: string;
  kicker: string;
  headline: string;
  body: string;
  formats: string[];
  delivery: string;
};

export type ProcessSlipLine = [key: string, value: string];

export type ProcessStep = {
  n: string;
  kicker: string;
  head: string;
  body: string;
  time: string;
  slipTitle: string;
  slipLines: ProcessSlipLine[];
};

export type PricingDeliverable = [qty: string, label: string];

export type PricingTier = {
  forLabel: string;
  name: string;
  price: string;
  modality: string;
  deliverables: PricingDeliverable[];
  cta: string;
  highlight?: boolean;
  checkoutPlanKey?: "start" | "growth" | "pro";
  /** Kontakt-Funnel-Paketname (Manufaktur) */
  contactPaket?: string;
};

export type FaqItem = { q: string; a: string };

export type FaqGroup = {
  n: string;
  title: string;
  countLabel: string;
  items: FaqItem[];
};

export const DESKTOP_NAV_LINKS = [
  { label: "Warum", href: "#warum" },
  { label: "Leistungen", href: "#loesungen" },
  { label: "Prozess", href: "#prozess" },
  { label: "Preise", href: "#preise" },
  { label: "Praxis", href: "#beispiele" },
  { label: "Fragen", href: "#faq" },
  { label: "Über uns", href: "/ueber-uns" },
] as const;

export const WARUM_CHAPTERS: WarumChapter[] = [
  {
    n: "01",
    kicker: "Positionierung",
    head: "Nur Brauereien.",
    headItalic: "Sonst nichts.",
    body: "Kein Generalisten-Mix aus Gastro, Handwerk und E-Commerce. Eine Klientel, ein Fokus — damit Look, Tonalität und No-Gos von Anfang an sitzen.",
    proof: { kind: "stat", value: "100%", label: "Brauerei-Fokus" },
  },
  {
    n: "02",
    kicker: "Arbeitsweise",
    head: "Monatsplan.",
    headItalic: "Keine Bauchgefühle.",
    body: "Du siehst die Woche vorher, was kommt — Reels, Produktshots, Stories. Kein „wir melden uns“, sondern ein klarer Rhythmus mit definierter Lieferung.",
    proof: {
      kind: "calendar",
      header: "BEISPIELWOCHE · MAI",
      live: true,
      items: [
        ["Mo", "Reels-Hook · 9:16"],
        ["Mi", "Produktshot · 4:5"],
        ["Fr", "Story-Serie · 9:16"],
        ["So", "Wochen-Rückblick"],
      ],
    },
  },
  {
    n: "03",
    kicker: "Ergebnis",
    head: "Wirkung.",
    headItalic: "Kein Theater.",
    body: "Weniger interner Aufwand, höhere Konsistenz im Auftritt und schnellere Umsetzung — ohne dass dein Team zum Content-Büro wird.",
    proof: {
      kind: "bullets",
      items: [
        "Weniger Zeitaufwand intern",
        "Höhere Konsistenz im Auftritt",
        "Schnellere Umsetzung im Alltag",
        "Wiederkehrende Anfragen",
      ],
    },
  },
];

export const WARUM_PULL_QUOTE =
  "Klarheit vor Komplexität. Qualität vor Hype. Umsetzung vor Theorie.";

export const PROCESS_STEPS: ProcessStep[] = [
  {
    n: "01",
    kicker: "Briefing",
    head: "Markenprofil festlegen",
    body: "Look & Feel, Tonalität und No-Gos in einem klaren Dokument — die Basis für jeden Output.",
    time: "Tag 1",
    slipTitle: "Markenprofil.pdf",
    slipLines: [
      ["Look & Feel", "Bernstein · Eiche · Spätsommer"],
      ["Tonalität", "Bodenständig, kein Hype"],
      ["No-Gos", "Kein Stockfoto-Look"],
    ],
  },
  {
    n: "02",
    kicker: "KI-Output",
    head: "Motive & Formate",
    body: "Produktfotos, Reels-Hooks und Kampagnenmotive — generiert und formatiert nach deinem Profil.",
    time: "Tag 2–5",
    slipTitle: "Output · Woche 18",
    slipLines: [
      ["12×", "Produktfotos · 4:5"],
      ["8×", "Reels-Hooks · 9:16"],
      ["4×", "Querformat · 16:9"],
    ],
  },
  {
    n: "03",
    kicker: "Freigabe",
    head: "Ausspielung & Freigabe",
    body: "Du gibst frei, wir liefern fertig für Feed, Ads und Website — mit klarem Lieferschein pro Woche.",
    time: "Tag 6+",
    slipTitle: "Freigabe · Mai",
    slipLines: [
      ["Meta", "6 Posts · 3 Reels"],
      ["Website", "2 Hero-Motive"],
      ["Ads", "4 Varianten · A/B"],
    ],
  },
];

export const LOESUNGEN: LoesungItem[] = [
  {
    n: "01",
    kicker: "Produktfotos",
    headline: "KI-Produktfotos für Bier & Getränke",
    body: "Studio-Qualität ohne Studio — konsistent in deinem Markenstil, sofort einsetzbar für Shop und Social.",
    formats: ["9:16", "4:5", "1:1"],
    delivery: "Ø 42s · ab 12 Motiven",
  },
  {
    n: "02",
    kicker: "Kampagne",
    headline: "KI-Bildkampagnen für Social Media",
    body: "Saisonale Hooks, Story-Serien und Feed-Motive — abgestimmt auf deinen Monatsplan.",
    formats: ["9:16", "1:1", "16:9"],
    delivery: "10 – 24 Motive pro Kampagne",
  },
  {
    n: "03",
    kicker: "Reels",
    headline: "Bewegte Motive & Reels mit Storytelling",
    body: "9:16-Clips mit klarer Dramaturgie — kein generisches Stock-Video, sondern Brauerei-Story.",
    formats: ["9:16", "16:9"],
    delivery: "6 – 12 Clips pro Monat",
  },
  {
    n: "04",
    kicker: "Website",
    headline: "Moderne Websites mit Storytelling",
    body: "Onepager bis Multi-Page — mit Hero-Motiven aus dem gleichen Markenstil wie dein Content.",
    formats: ["Desktop", "Mobile"],
    delivery: "4 – 6 Wochen · 1 Sprint",
  },
  {
    n: "05",
    kicker: "Ads",
    headline: "KI-Content für Instagram & Ads",
    body: "Varianten für A/B-Tests — Format-Chips, Headlines und Visuals aus einem Guss.",
    formats: ["1:1", "4:5", "9:16"],
    delivery: "20+ Varianten pro Test",
  },
];

export { DESKTOP_PREIS_MODE_COPY as PREIS_MODE_COPY, DESKTOP_PREIS_PLAENE as PREIS_PLAENE } from "@/lib/desktopPricing";

export const FAQ_GROUPS: FaqGroup[] = [
  {
    n: "01",
    title: "Vor dem Start",
    countLabel: "2 FRAGEN",
    items: [
      {
        q: "Ist das Risiko gering, wenn ich starte?",
        a: "Ja. Du fängst mit einem klar abgegrenzten Paket an, kannst nach 30 Tagen pausieren oder wechseln. Es gibt keine Mindestlaufzeit über das gebuchte Paket hinaus.",
      },
      {
        q: "Wie viel Aufwand habe ich intern wirklich?",
        a: "30 – 60 Minuten Briefing am Anfang, danach pro Woche 5 – 10 Minuten Freigaben. Alles über asynchrone Tools — keine Termin-Marathons.",
      },
    ],
  },
  {
    n: "02",
    title: "Während der Zusammenarbeit",
    countLabel: "2 FRAGEN",
    items: [
      {
        q: "Sind die Inhalte wirklich in meinem Markenstil?",
        a: "Ja. Im Briefing definieren wir Look & Feel, Tonalität und No-Gos in einem Markenprofil. Jeder KI-Output wird auf dieses Profil konditioniert — du erkennst dich wieder.",
      },
      {
        q: "Kann ich später hoch- oder runterwechseln?",
        a: "Jederzeit. Wechsel werden zum nächsten Monatswechsel wirksam. Bei einmaligen Premium-Paketen entscheidest du nach Ablauf, ob du in ein Abo wechselst.",
      },
    ],
  },
  {
    n: "03",
    title: "Ergebnisse",
    countLabel: "2 FRAGEN",
    items: [
      {
        q: "Wie schnell sehe ich erste Ergebnisse?",
        a: "Erste fertige Motive nach 5 – 7 Werktagen. Sichtbare Wirkung auf Reichweite und Anfragen typischerweise innerhalb von 4 – 8 Wochen, abhängig von Frequenz und Kanalwahl.",
      },
      {
        q: "Was passiert mit den Bildern nach der Lieferung?",
        a: "Alle Bilder gehören dir. Kommerzielle Nutzungsrechte sind enthalten. Du kannst sie für Social, Print, Ads und Website unbegrenzt einsetzen.",
      },
    ],
  },
];
