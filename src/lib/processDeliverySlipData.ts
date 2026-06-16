export type ProcessStep = {
  n: string;
  time: string;
  head: string;
  detail: string;
  out: string;
};

export const PROCESS_STEPS: ProcessStep[] = [
  {
    n: "01",
    time: "Tag 1",
    head: "Briefing & Markenprofil",
    detail: "Logo · Tonalität · No-Gos · Zielgruppe",
    out: "Brand-Token-Set",
  },
  {
    n: "02",
    time: "Tag 2–5",
    head: "KI erzeugt Motive & Texte",
    detail: "Starter 15 · Wachstum 30 · Premium 40+",
    out: "15–40 Motive · je nach Paket",
  },
  {
    n: "03",
    time: "Tag 6+",
    head: "Freigabe & Veröffentlichung",
    detail: "Feed · Ads · Website · Meta-Formate",
    out: "Posts live · Wochenplan läuft",
  },
];

/** Kalenderwoche (vereinfacht, für Lieferschein-Header). */
export function getCalendarWeek(date = new Date()): number {
  const yearStart = new Date(date.getFullYear(), 0, 1);
  const dayOfYear = Math.floor((date.getTime() - yearStart.getTime()) / 86_400_000) + 1;
  return Math.ceil(dayOfYear / 7);
}

export function formatStepTimeTag(time: string): string {
  return time.replace(/^Tag\s/i, "TAG ").toUpperCase();
}

export const BARCODE_BAR_HEIGHTS = [3, 7, 4, 9, 5, 8, 3, 6, 11, 4, 7, 5, 9, 3, 6, 8, 4, 7].map((h) => h * 2);
