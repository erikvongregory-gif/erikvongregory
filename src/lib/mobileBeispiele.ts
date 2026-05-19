import { KI_BEISPIEL_VIDEO_16X9, KI_BEISPIEL_VIDEOS_9X16 } from "@/lib/kiBeispiele";

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
    title: "Junge Frau mit Pils",
    occasion: "Sommerkampagne · Mai",
    format: "1:1",
    src: "/ki-beispiel-praxis-8.webp",
    alt: "Junge Frau mit Pils — Sommerkampagne Mai",
  },
  {
    id: "i2",
    title: "Junger Mann am Hafen",
    occasion: "Reels-Hook · Juni",
    format: "4:5",
    src: "/ki-beispiel-hafen.webp",
    alt: "Junger Mann am Hafen Lübeck — Reels-Hook Juni",
  },
  {
    id: "i3",
    title: "Junger Mann am Strand",
    occasion: "Produktseite · Hero",
    format: "4:5",
    src: "/ki-beispiel-strand.webp",
    alt: "Junger Mann am Strand — Produktseite Hero",
  },
  {
    id: "i4",
    title: "Weizen am Bach",
    occasion: "Saisonkampagne · Winter",
    format: "1:1",
    src: "/ki-beispiel-praxis-7.webp",
    alt: "Weizen am Bach — Saisonkampagne Winter",
  },
];

export const BEISPIELE_VIDEOS: Beispiel[] = [
  {
    id: "v1",
    title: "Eisbox am See",
    occasion: "Reel · Sommer",
    format: "9:16",
    src: KI_BEISPIEL_VIDEOS_9X16[0]!.src,
    poster: KI_BEISPIEL_VIDEOS_9X16[0]!.poster,
    duration: "0:12",
    alt: "Eisbox am See — Reel Sommer",
  },
  {
    id: "v2",
    title: "Eisbox am Abend",
    occasion: "Story · Event",
    format: "9:16",
    src: KI_BEISPIEL_VIDEOS_9X16[1]!.src,
    poster: KI_BEISPIEL_VIDEOS_9X16[1]!.poster,
    duration: "0:08",
    alt: "Eisbox am Abend — Story Event",
  },
  {
    id: "v3",
    title: "Hanseat am See",
    occasion: "Story · Winterhelles",
    format: "9:16",
    src: KI_BEISPIEL_VIDEOS_9X16[2]!.src,
    poster: KI_BEISPIEL_VIDEOS_9X16[2]!.poster,
    duration: "0:15",
    alt: "Hanseat am See — Story Winterhelles",
  },
  {
    id: "v4",
    title: "Brauerei-Imagefilm",
    occasion: "Website · YouTube",
    format: "16:9",
    src: KI_BEISPIEL_VIDEO_16X9.src,
    poster: KI_BEISPIEL_VIDEO_16X9.poster,
    duration: "0:24",
    alt: "Brauerei-Imagefilm — Website YouTube",
  },
];

export const BEISPIELE_MODE_OPTIONS = [
  { key: "images" as const, label: "Bilder", sublabel: "04 MOTIVE" },
  { key: "videos" as const, label: "Videos", sublabel: "03 REELS · 01 WEB" },
];

export function durationToSeconds(duration?: string): number {
  if (!duration) return 12;
  const parts = duration.split(":").map((p) => Number.parseInt(p, 10));
  if (parts.length === 2) return (parts[0] ?? 0) * 60 + (parts[1] ?? 0);
  if (parts.length === 1) return parts[0] ?? 12;
  return 12;
}

export function aspectClassForFormat(format: BeispielFormat): string {
  switch (format) {
    case "1:1":
      return "aspect-square";
    case "4:5":
      return "aspect-[4/5]";
    case "9:16":
      return "aspect-[9/16] max-h-[460px] w-full";
    case "16:9":
      return "aspect-[16/9] w-full";
    default:
      return "aspect-square";
  }
}
