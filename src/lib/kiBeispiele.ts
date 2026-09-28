/**
 * KI-Beispielbilder — aktuelle Motive unter `/neu-motion/motifs/`.
 */
const M = "/neu-motion/motifs";

export const KI_BEISPIELE = [
  { src: `${M}/kampagne-anstossen.webp`, alt: "Kampagnenmotiv: Anstoßen im Markenlook" },
  { src: `${M}/produkt-flasche.webp`, alt: "Produktfoto Flasche" },
  { src: `${M}/event-hafen.webp`, alt: "Event-Motiv am Hafen" },
  { src: `${M}/story-biergarten.webp`, alt: "Story-Motiv Biergarten" },
  { src: `${M}/premium-biergarten.webp`, alt: "Premium-Motiv Biergarten" },
] as const;

/** Desktop-Hero-Studio-Mockup: zwei fertige Varianten. */
export const KI_HERO_MOCKUP_THUMBS = [
  {
    src: `${M}/kampagne-hyperreal-hafen.webp`,
    alt: "Kampagnenmotiv am Hafen — goldene Stunde",
  },
  KI_BEISPIELE[1],
] as const;

/** Karussell „Echte Beispiele“. */
export const KI_CAROUSEL = [
  { src: `${M}/produkt-flasche.webp`, alt: "Produktfoto Flasche" },
  { src: `${M}/feed-pils.webp`, alt: "Feed-Motiv Pils" },
  { src: `${M}/kampagne-anstossen.webp`, alt: "Kampagnenmotiv Anstoßen" },
  { src: `${M}/event-hafen.webp`, alt: "Event-Motiv Hafen" },
  { src: `${M}/story-biergarten.webp`, alt: "Story Biergarten" },
  { src: `${M}/produkt-studio.webp`, alt: "Studio-Produktmotiv" },
  { src: `${M}/produkt-weizen.webp`, alt: "Weizen-Produktmotiv" },
  { src: `${M}/reportage-luna-barrels.webp`, alt: "Reportage Fässer" },
] as const;

export type KiBeispielVideoPortrait = {
  src: string;
  title: string;
  caption: string;
  poster?: string;
};

export type KiBeispielVideoLandscape = {
  src: string;
  title: string;
  caption: string;
  poster?: string;
};

/** Legacy-Videos entfernt — leere Listen, damit alte Imports nicht crashen. */
export const KI_BEISPIEL_VIDEOS_9X16: readonly KiBeispielVideoPortrait[] = [];

export const KI_BEISPIEL_VIDEO_16X9: KiBeispielVideoLandscape = {
  src: `${M}/reportage-skatepark.webp`,
  title: "16:9 – Beispielmotiv",
  caption: "Platzhalter nach Entfernung der Legacy-Videos.",
  poster: `${M}/reportage-skatepark.webp`,
};
