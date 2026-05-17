import { KI_BEISPIEL_VIDEOS_9X16 } from "@/lib/kiBeispiele";

/** Hartkodiert bis API/DB-Anbindung — leicht ersetzbar. */
export const MOBILE_HERO_MOTIF_COUNT = 1247;

export const MOBILE_HERO_CATEGORY_STATS = [
  { value: 320, label: "Produkt" },
  { value: 184, label: "Kampagne" },
  { value: 743, label: "Social" },
  { value: 64, label: "Verp." },
] as const;

export type MobileHeroPolaroidId = "product" | "campaign" | "social";

export type MobileHeroPolaroid = {
  id: MobileHeroPolaroidId;
  /** Mono-Label unter dem Bild */
  stamp: string;
  stampClassName?: string;
  /** Platzhalter-Caption im Streifen-Bereich */
  placeholderCaption: string;
  imageSrc?: string;
  /** Zwei Produktfotos nebeneinander (z. B. Produkt-Polaroid) */
  imageSrcs?: readonly [string, string];
  imageAlt?: string;
  videoSrc?: string;
  videoPoster?: string;
};

const REEL_VIDEO = KI_BEISPIEL_VIDEOS_9X16[0]!;

export const MOBILE_HERO_POLAROIDS: MobileHeroPolaroid[] = [
  {
    id: "social",
    stamp: "REELS · 9:16",
    placeholderCaption: "Social · Reels",
    videoSrc: REEL_VIDEO.src,
    videoPoster: REEL_VIDEO.poster,
    imageAlt: REEL_VIDEO.title,
  },
  {
    id: "campaign",
    stamp: "KAMPAGNE · 4:5",
    placeholderCaption: "Kampagne · Plakat",
    imageSrc: "/ki-beispiel-hafen.webp",
    imageAlt: "Lünebräu – Lifestyle-Foto am Hafen Lübeck",
  },
  {
    id: "product",
    stamp: "✦ AUSGEWÄHLT · 1:1",
    stampClassName: "text-amber",
    placeholderCaption: "Produktfoto · Hero",
    imageSrcs: ["/hero-brauerei-live-bg.png", "/ki-beispiel-praxis-7.webp"],
    imageAlt: "KI-Produktfotos: Bier mit Hopfen und Flasche am Bergfluss",
  },
];
