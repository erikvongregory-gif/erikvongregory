const M = "/neu-motion/motifs";

export type BeispielFormat = "1:1" | "4:5" | "9:16" | "16:9";

export type Beispiel = {
  id: string;
  title: string;
  occasion: string;
  format: BeispielFormat;
  src: string;
  poster?: string;
  duration?: string;
  alt: string;
};

export const BEISPIELE_IMAGES: Beispiel[] = [
  {
    id: "i1",
    title: "Produktfoto Flasche",
    occasion: "Sommerkampagne · Mai",
    format: "1:1",
    src: `${M}/produkt-flasche.webp`,
    alt: "Produktfoto Flasche — Sommerkampagne",
  },
  {
    id: "i2",
    title: "Event am Hafen",
    occasion: "Reels-Hook · Juni",
    format: "4:5",
    src: `${M}/event-hafen.webp`,
    alt: "Event-Motiv am Hafen — Reels-Hook",
  },
  {
    id: "i3",
    title: "Story Biergarten",
    occasion: "Produktseite · Hero",
    format: "9:16",
    src: `${M}/story-biergarten.webp`,
    alt: "Story Biergarten — Produktseite Hero",
  },
  {
    id: "i4",
    title: "Weizen Studio",
    occasion: "Saisonkampagne · Winter",
    format: "1:1",
    src: `${M}/produkt-weizen.webp`,
    alt: "Weizen-Produktmotiv — Saisonkampagne",
  },
];

/** Legacy-Videos entfernt — nur Still-Motive. */
export const BEISPIELE_VIDEOS: Beispiel[] = [
  {
    id: "v1",
    title: "Story Eis",
    occasion: "Reel · Sommer",
    format: "9:16",
    src: `${M}/story-eis.webp`,
    poster: `${M}/story-eis.webp`,
    duration: "0:12",
    alt: "Story Eis — Reel Sommer",
  },
  {
    id: "v2",
    title: "Story Kühlbox",
    occasion: "Story · Event",
    format: "9:16",
    src: `${M}/story-kuehlbox.webp`,
    poster: `${M}/story-kuehlbox.webp`,
    duration: "0:08",
    alt: "Story Kühlbox — Event",
  },
  {
    id: "v3",
    title: "Event Festzelt",
    occasion: "Story · Saison",
    format: "16:9",
    src: `${M}/event-festzelt.webp`,
    poster: `${M}/event-festzelt.webp`,
    duration: "0:15",
    alt: "Event Festzelt — Saison",
  },
  {
    id: "v4",
    title: "Reportage Skatepark",
    occasion: "Website · Social",
    format: "16:9",
    src: `${M}/reportage-skatepark.webp`,
    poster: `${M}/reportage-skatepark.webp`,
    duration: "0:24",
    alt: "Reportage Skatepark — Website Social",
  },
];

export const BEISPIELE_MODE_OPTIONS = [
  { key: "images" as const, label: "Bilder", sublabel: "04 MOTIVE" },
  { key: "videos" as const, label: "Videos", sublabel: "04 MOTIVE" },
];

export function durationToSeconds(duration?: string): number {
  if (!duration) return 12;
  const parts = duration.split(":").map((p) => Number.parseInt(p, 10));
  if (parts.length === 2) return (parts[0] ?? 0) * 60 + (parts[1] ?? 0);
  if (parts.length === 1) return parts[0] ?? 12;
  return 12;
}
