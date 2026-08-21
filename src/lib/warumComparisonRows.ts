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
  withBrewAIShort: string;
  /** Ausführlich — Screenreader & optional Desktop */
  without: string;
  withBrewAI: string;
};

export const WARUM_COMPARISON_ROWS: WarumComparisonRow[] = [
  {
    topic: "Fokus",
    icon: Target,
    withoutShort: "Generalist „auch Brauerei“",
    withBrewAIShort: "Nur Brauereien & Gastro",
    without: "Generalist macht „auch Brauerei“",
    withBrewAI: "Ausschließlich Brauereien & Gastro",
  },
  {
    topic: "Planung",
    icon: CalendarDays,
    withoutShort: "Posts zwischen Schichten",
    withBrewAIShort: "Monatsplan, voraus geplant",
    without: "Letzte-Minute-Posts zwischen Schichten",
    withBrewAI: "Strukturierter Monatsplan, voraus geplant",
  },
  {
    topic: "Bildstil",
    icon: ImageIcon,
    withoutShort: "Stock + Handy gemixt",
    withBrewAIShort: "Ein Markenstil, alle Motive",
    without: "Stockfotos + Smartphone-Snaps gemixt",
    withBrewAI: "Konsistenter Markenstil über alle Motive",
  },
  {
    topic: "Output",
    icon: TrendingUp,
    withoutShort: "Einzelposts ohne Wiedererkennung",
    withBrewAIShort: "Sichtbarkeit & echte Anfragen",
    without: "Einzelne hübsche Posts, kein Wiedererkennen",
    withBrewAI: "Wiederkehrende Sichtbarkeit, echte Anfragen",
  },
  {
    topic: "Aufwand",
    icon: Clock3,
    withoutShort: "Stunden pro Woche intern",
    withBrewAIShort: "5 Min. Feedback, wir liefern",
    without: "Stunden pro Woche intern",
    withBrewAI: "Feedback in 5 Minuten, Rest übernehmen wir",
  },
];
