/**
 * KI-Beispielbilder – gleiche Quellen für Section 7 (Demo) und Desktop-Hero (Parallax).
 */
export const KI_BEISPIELE = [
  { src: "/ki-beispiel-3.svg", alt: "Lünebräu KI-Werbemotiv: Markenauftritt mit KI erstellt" },
  { src: "/hero-brauerei-live-bg.png", alt: "Lünebräu – Produktfoto mit Zitrone und Hopfen" },
  { src: "/ki-beispiel-hafen.webp", alt: "Lünebräu – Lifestyle-Foto am Hafen Lübeck" },
  { src: "/ki-beispiel-strand.webp", alt: "Lünebräu – Lifestyle-Foto am Strand" },
  { src: "/ki-beispiel-biergarten.webp", alt: "Lünebräu – Lifestyle-Foto im Biergarten" },
] as const;

/** Karussell „Echte Beispiele“ – lokale Assets, gemischte Formate. */
export const KI_CAROUSEL = [
  { src: "/ki-beispiel-1.svg", alt: "KI-generiertes Werbebild Brauerei: Bierflasche im Biergarten" },
  { src: "/ki-beispiel-2.svg", alt: "KI-Produktbild Bier: Glas mit Schaumkrone im Sonnenlicht" },
  { src: "/ki-beispiel-3.svg", alt: "Lünebräu KI-Werbemotiv: Markenauftritt mit KI erstellt" },
  { src: "/ki-beispiel-hafen.webp", alt: "Lünebräu – Lifestyle am Hafen Lübeck" },
  { src: "/ki-beispiel-strand.webp", alt: "Lünebräu – Lifestyle am Strand" },
  { src: "/ki-beispiel-praxis-6.webp", alt: "Bierflasche in der Hand im Biergarten bei Abendlicht" },
  { src: "/ki-beispiel-praxis-7.webp", alt: "Weißbier-Flasche und Glas am Bergfluss als echtes Praxisbeispiel" },
  { src: "/ki-beispiel-praxis-8.webp", alt: "Praxisbeispiel: Person mit Bierflasche im Biergarten bei Sonnenschein" },
] as const;

/** Vertikale Video-Beispiele (9:16) — Dateien unter `public/videos/`. */
export type KiBeispielVideoPortrait = {
  src: string;
  title: string;
  caption: string;
  poster?: string;
};

/** Breites Video (16:9) — eine Zeile darunter. */
export type KiBeispielVideoLandscape = {
  src: string;
  title: string;
  caption: string;
  poster?: string;
};

/** Reels / Stories (9:16) — SEO-Dateinamen: ki-werbevideo-brauerei-reels-motiv-*-vertical-9x16.mp4 */
export const KI_BEISPIEL_VIDEOS_9X16: readonly KiBeispielVideoPortrait[] = [
  {
    src: "/videos/ki-werbevideo-brauerei-reels-motiv-1-vertical-9x16.mp4",
    title: "9:16 – Reel / Story (Beispiel 1)",
    caption: "Hochformat für Instagram Stories, Reels und vertikale Ads.",
  },
  {
    src: "/videos/ki-werbevideo-brauerei-reels-motiv-2-vertical-9x16.mp4",
    title: "9:16 – Reel / Story (Beispiel 2)",
    caption: "Zweites Motiv im gleichen Format — ideal für Serien oder A/B-Tests im Feed.",
  },
  {
    src: "/videos/ki-werbevideo-brauerei-reels-motiv-3-vertical-9x16.mp4",
    title: "9:16 – Reel / Story (Beispiel 3)",
    caption: "Drittes Hochformat-Motiv — z. B. für Content-Serien, saisonale Posts oder wechselnde CTA-Varianten.",
  },
];

export const KI_BEISPIEL_VIDEO_16X9: KiBeispielVideoLandscape = {
  src: "/videos/ki-werbevideo-brauerei-werbespot-web-youtube-16x9.mp4",
  title: "16:9 – Web, YouTube & Social (Querformat)",
  caption: "Klassisches Breitformat für Website, YouTube und Feed-Posts im Querformat.",
  poster: "/ki-werbevideo-16x9-poster.webp",
};
