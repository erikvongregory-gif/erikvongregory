/**
 * Motive für den Prototyp — verkleinerte Kopien vorhandener BrewAI-Beispielbilder
 * aus /public (keine neuen Assets).
 */

const M = "/neu-motion/motifs";

export type Motif = { src: string; aspect: number; ratio: string };

const RATIO = {
  "1:1": 1,
  "4:5": 4 / 5,
  "9:16": 9 / 16,
  "16:9": 16 / 9,
} as const;

const motif = (file: string, ratio: keyof typeof RATIO): Motif => ({
  src: `${M}/${file}.webp`,
  aspect: RATIO[ratio],
  ratio,
});

/**
 * „Letzte Motive“ im Dashboard — beschriftet nach Fotostil wie im echten Composer
 * (Reportage / Premium / Kampagne, optional Hyperreal). Echte Lüne-Bräu-Generierungen.
 * Die Neu-Generierung verdichtet das Motiv erneut (ein Motiv je Karte).
 */
export const RECENT_SLOTS = [
  { label: "Kampagne", pool: [motif("kampagne-anstossen", "4:5")] },
  { label: "Premium", pool: [motif("premium-biergarten", "4:5")] },
  { label: "Reportage", pool: [motif("reportage-skatepark", "16:9")] },
  { label: "Kampagne · Hyperreal", pool: [motif("kampagne-hyperreal-hafen", "4:5")] },
] as const;

/** Mediathek — Reihenfolge wie FORMAT_ITEMS in data.ts */
export const LIBRARY_MOTIFS: Motif[] = [
  motif("produkt-flasche", "1:1"), // Produktfoto Flasche
  motif("feed-pils", "4:5"), // Feed Saisonbier
  motif("story-biergarten", "9:16"), // Story Biergarten
  motif("produkt-studio", "4:5"), // Händler-Promotion
  motif("produkt-weizen", "1:1"), // Saisonkampagne
  motif("event-festzelt", "16:9"), // Festzelt-Event
];

/** Motiv-Bezeichnung im Detail der Mediathek */
export const LIBRARY_KIND: Record<string, string> = {
  Produkt: "Produktshot",
  Feed: "Feed-Motiv",
  Story: "Story",
  Händler: "Aktionsmotiv",
  Serie: "Serienmotiv",
  Event: "Key Visual",
};

/** Mediathek-Tag → Format-Chip im Header (FORMAT_COUNTS) */
export const TAG_TO_CHIP: Record<string, string | null> = {
  Produkt: "Produkt",
  Feed: "Feed",
  Story: "Story",
  Händler: null,
  Serie: "Saison",
  Event: "Event",
};
