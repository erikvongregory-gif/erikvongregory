export type WarumComparisonRow = {
  topic: string;
  without: string;
  withEvGlab: string;
};

export const WARUM_COMPARISON_ROWS: WarumComparisonRow[] = [
  {
    topic: "Fokus",
    without: "Generalist macht „auch Brauerei“",
    withEvGlab: "Ausschließlich Brauereien & Gastro",
  },
  {
    topic: "Planung",
    without: "Letzte-Minute-Posts zwischen Schichten",
    withEvGlab: "Strukturierter Monatsplan, voraus geplant",
  },
  {
    topic: "Bildstil",
    without: "Stockfotos + Smartphone-Snaps gemixt",
    withEvGlab: "Konsistenter Markenstil über alle Motive",
  },
  {
    topic: "Output",
    without: "Einzelne hübsche Posts, kein Wiedererkennen",
    withEvGlab: "Wiederkehrende Sichtbarkeit, echte Anfragen",
  },
  {
    topic: "Aufwand",
    without: "Stunden pro Woche intern",
    withEvGlab: "Feedback in 5 Minuten, Rest übernehmen wir",
  },
];
