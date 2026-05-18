export type TapWallItem = {
  n: string;
  label: string;
  shortLabel: string;
  title: string;
  body: string;
  deliv: string;
};

export const TAPS: TapWallItem[] = [
  {
    n: "01",
    label: "Produkt",
    shortLabel: "PROD",
    title: "KI-Produktfotos für Bier & Getränke",
    body: "Studio-Qualität ohne Studio. Flasche, Dose, Glas — in deinem Markenstil, in jeder Umgebung.",
    deliv: "Bildpaket · ab 8 Motive",
  },
  {
    n: "02",
    label: "Kampagne",
    shortLabel: "KAMP",
    title: "KI-Bildkampagnen für Social Media",
    body: "Saison-, Event- und Themen-Sets als konsistente Bildserien. Keine Einzelmotive — Serien.",
    deliv: "Kampagnen-Set · 12–20 Motive",
  },
  {
    n: "03",
    label: "Betrieb",
    shortLabel: "BETR",
    title: "Automatisiertes Social-Media-Marketing",
    body: "Planung, Veröffentlichung, Reporting laufen im Hintergrund. Du gibst frei, der Rest passiert.",
    deliv: "Monatlicher Betrieb",
  },
  {
    n: "04",
    label: "Website",
    shortLabel: "WEB",
    title: "Moderne Websites mit Storytelling",
    body: "Eine Seite, die deine Geschichte erzählt — und Reservierungen, Tap-Listen, Shop integriert.",
    deliv: "Website · 2 Wochen",
  },
  {
    n: "05",
    label: "Content",
    shortLabel: "CONT",
    title: "KI-Content für Instagram & Ads",
    body: "Reels-Hooks, Story-Templates, Ad-Creatives. Performance-Content statt hübscher Posts.",
    deliv: "Wöchentlicher Drop",
  },
];
