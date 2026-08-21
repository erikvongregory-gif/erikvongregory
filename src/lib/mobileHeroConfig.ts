import { KI_BEISPIEL_VIDEOS_9X16 } from "@/lib/kiBeispiele";

const BERLIN_TZ = "Europe/Berlin";

const DAILY_MOTIF_MIN = 48;
const DAILY_MOTIF_MAX = 128;

const CATEGORY_LABELS = ["Produkt", "Kampagne", "Social", "Verp."] as const;

/** Deterministischer Tages-Hash (Mitternacht Europe/Berlin). */
function hashBerlinCalendarDay(date = new Date()): number {
  const key = new Intl.DateTimeFormat("en-CA", {
    timeZone: BERLIN_TZ,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(date);

  let h = 2_166_136_261;
  for (let i = 0; i < key.length; i++) {
    h ^= key.charCodeAt(i);
    h = Math.imul(h, 16_777_619);
  }
  return h >>> 0;
}

/** „Heute generiert“ — wechselt täglich, glaubwürdiger Bereich (ohne API). */
export function getDailyMotifCount(date = new Date()): number {
  const h = hashBerlinCalendarDay(date);
  return DAILY_MOTIF_MIN + (h % (DAILY_MOTIF_MAX - DAILY_MOTIF_MIN + 1));
}

export type DailyCategoryStat = { value: number; label: (typeof CATEGORY_LABELS)[number] };

/** Kategorie-Kacheln unten — Summe = Tages-Motivzahl. */
export function getDailyCategoryStats(date = new Date()): DailyCategoryStat[] {
  const total = getDailyMotifCount(date);
  const h = hashBerlinCalendarDay(date);

  const weights = [
    2 + (h % 6),
    2 + ((h >>> 4) % 5),
    3 + ((h >>> 9) % 8),
    1 + ((h >>> 14) % 4),
  ];
  const weightSum = weights.reduce((sum, w) => sum + w, 0);

  const values = weights.map((w) => Math.floor((w / weightSum) * total));
  let remainder = total - values.reduce((sum, v) => sum + v, 0);
  for (let i = 0; remainder > 0; i = (i + 1) % values.length, remainder -= 1) {
    values[i]! += 1;
  }

  return CATEGORY_LABELS.map((label, i) => ({ value: values[i]!, label }));
}

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
    /** ~627 KB / 2.2s Loop — startet nach LCP (Produkt vorne), dann Autoplay. */
    videoSrc: "/optimized/hero-reel-mobile.mp4",
    videoPoster: "/optimized/hero-poster-biergarten.jpg",
    imageAlt: REEL_VIDEO.title,
  },
  {
    id: "campaign",
    stamp: "KAMPAGNE · 4:5",
    placeholderCaption: "Kampagne · Plakat",
    imageSrc: "/optimized/hero-polaroid-hafen.jpg",
    imageAlt: "Lünebräu – Lifestyle-Foto am Hafen Lübeck",
  },
  {
    id: "product",
    stamp: "✦ AUSGEWÄHLT · 1:1",
    stampClassName: "text-amber",
    placeholderCaption: "Produktfoto · Hero",
    imageSrcs: ["/optimized/hero-product-left.jpg", "/optimized/hero-product-right.jpg"],
    imageAlt: "KI-Produktfotos: Bier mit Hopfen und Flasche am Bergfluss",
  },
];
