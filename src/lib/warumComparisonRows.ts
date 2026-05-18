import {
  CalendarDays,
  Clock3,
  ImageIcon,
  Target,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";

export type WarumComparisonRow = {
  topic: string;
  icon: LucideIcon;
  /** Kurz für die Mobile-Ansicht mit Icons */
  withoutShort: string;
  withEvGlabShort: string;
  /** Ausführlich — Screenreader & optional Desktop */
  without: string;
  withEvGlab: string;
};

export const WARUM_COMPARISON_ROWS: WarumComparisonRow[] = [
  {
    topic: "Fokus",
    icon: Target,
    withoutShort: "Generalist „auch Brauerei“",
    withEvGlabShort: "Nur Brauereien & Gastro",
    without: "Generalist macht „auch Brauerei“",
    withEvGlab: "Ausschließlich Brauereien & Gastro",
  },
  {
    topic: "Planung",
    icon: CalendarDays,
    withoutShort: "Posts zwischen Schichten",
    withEvGlabShort: "Monatsplan, voraus geplant",
    without: "Letzte-Minute-Posts zwischen Schichten",
    withEvGlab: "Strukturierter Monatsplan, voraus geplant",
  },
  {
    topic: "Bildstil",
    icon: ImageIcon,
    withoutShort: "Stock + Handy gemixt",
    withEvGlabShort: "Ein Markenstil, alle Motive",
    without: "Stockfotos + Smartphone-Snaps gemixt",
    withEvGlab: "Konsistenter Markenstil über alle Motive",
  },
  {
    topic: "Output",
    icon: TrendingUp,
    withoutShort: "Einzelposts ohne Wiedererkennung",
    withEvGlabShort: "Sichtbarkeit & echte Anfragen",
    without: "Einzelne hübsche Posts, kein Wiedererkennen",
    withEvGlab: "Wiederkehrende Sichtbarkeit, echte Anfragen",
  },
  {
    topic: "Aufwand",
    icon: Clock3,
    withoutShort: "Stunden pro Woche intern",
    withEvGlabShort: "5 Min. Feedback, wir liefern",
    without: "Stunden pro Woche intern",
    withEvGlab: "Feedback in 5 Minuten, Rest übernehmen wir",
  },
];

export const WARUM_VALUE_PILLARS = [
  { label: "Klarheit", icon: Target },
  { label: "Qualität", icon: ImageIcon },
  { label: "Umsetzung", icon: Clock3 },
] as const;
