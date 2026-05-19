export type TapWallItem = {
  n: string;
  label: string;
  shortLabel: string;
  title: string;
  body: string;
  /** Kurzzeile unten — entspricht Manufaktur-/Werkstatt-Paketen in der Preis-Section */
  deliv: string;
};

export const TAPS: TapWallItem[] = [
  {
    n: "01",
    label: "Produkt",
    shortLabel: "PROD",
    title: "KI-Produktfotos für Bier & Getränke",
    body: "Studio-Qualität ohne Studio. Flasche, Dose, Glas — im Starter-Paket mit 5 Motiven in deinem Markenstil.",
    deliv: "Starter · 5 Motive · 890 €",
  },
  {
    n: "02",
    label: "Kampagne",
    shortLabel: "KAMP",
    title: "KI-Bildkampagnen für Social Media",
    body: "Saison-, Event- und Themen-Sets als konsistente Bildserien — im Wachstumspaket mit 10 Motiven und Posts für Feed und Ads.",
    deliv: "Wachstum · 10 Motive · 1.690 €",
  },
  {
    n: "03",
    label: "Betrieb",
    shortLabel: "BETR",
    title: "Content im Dashboard — monatlich",
    body: "Laufend Motive im Werkstatt-Abo erzeugen: Tokens, Team-Zugänge und Support — ohne Einzelprojekt pro Kampagne.",
    deliv: "Werkstatt Start · ab 79 €/Mo.",
  },
  {
    n: "04",
    label: "Website",
    shortLabel: "WEB",
    title: "Moderne Websites mit Storytelling",
    body: "Onepager mit Texten, Struktur und Social-Setup — im Brauerei-Premium-Paket inkl. 10 KI-Produktbildern.",
    deliv: "Premium · 2–3 Wochen · 3.990 €",
  },
  {
    n: "05",
    label: "Content",
    shortLabel: "CONT",
    title: "KI-Content für Instagram & Ads",
    body: "Posts inkl. Texte für Instagram, Facebook und Ads — im Wachstumspaket oder fortlaufend über das Token-Abo.",
    deliv: "Wachstum · 10 Posts inkl. Text",
  },
];
