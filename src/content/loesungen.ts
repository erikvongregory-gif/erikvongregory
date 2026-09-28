import { APP_URL } from "@/components/neu/parlo/data";

export const LOESUNGEN = [
  {
    slug: "saisonkampagne-brauerei",
    href: "/loesungen/saisonkampagne-brauerei",
    title: "Saisonkampagnen für Brauereien",
    eyebrow: "Saison",
    summary: "Kampagnenmotive und Serien für Frühlings-, Sommer- und Winteraktionen — ein Look, viele Ausgaben.",
    motif: "/neu-motion/motifs/kampagne-anstossen.webp",
    motifAlt: "Saisonkampagne: Anstoßen im Markenlook",
    body: [
      "Saison heißt bei Brauereien selten ein Motiv. Es heißt Serie: Bock im Herbst, Weizen im Sommer, Festbier zur Wiesn — derselbe Markenlook, andere Geschichte.",
      "Im Dashboard sitzt das Markenprofil einmal. Daraus entstehen Feed, Story und Produktmotiv, ohne dass jedes Mal neu gebriefed wird.",
    ],
    bullets: [
      "Serien statt Einzelbilder — Frühling, Sommer, Winter aus einem Profil",
      "Formate fertig: Feed, Story, Produkt",
      "Freigabe im Team, bevor etwas live geht",
    ],
  },
  {
    slug: "biergarten-event-marketing",
    href: "/loesungen/biergarten-event-marketing",
    title: "Biergarten- & Event-Marketing",
    eyebrow: "Event",
    summary: "Planbare Visuals für Ausschanktage, Festzelt und lokale Aktionen — rechtzeitig, nicht in der Nacht davor.",
    motif: "/neu-motion/motifs/event-biergarten.webp",
    motifAlt: "Eventmotiv im Biergarten",
    body: [
      "Events leben von Motiven, die den Ort treffen: Biergarten, Hafen, Festzelt. Nicht von einer Vorlage, die überall gleich aussieht.",
      "Ein Briefing, mehrere Formate. Story für den Tag, Feed für die Woche, Plakat-Zuschnitt für den Ausschank.",
    ],
    bullets: [
      "Motive für Ausschank, Fest und lokale Aktion",
      "Story- und Feed-Formate aus demselben Look",
      "Schnell genug für den nächsten Termin im Kalender",
    ],
  },
  {
    slug: "haendler-gastro-promotion",
    href: "/loesungen/haendler-gastro-promotion",
    title: "Händler- & Gastro-Promotion",
    eyebrow: "Handel",
    summary: "Co-Branding-Motive für Handel, Gastro und Partner — bereit zum Teilen, ohne Fotostudio.",
    motif: "/neu-motion/motifs/produkt-studio.webp",
    motifAlt: "Produktmotiv für Händler-Promotion",
    body: [
      "Händler und Gastronomie brauchen Vorlagen, die eure Flasche tragen — nicht ein generisches Stockfoto mit Logo in der Ecke.",
      "Produktmotiv, Aktionsstörer, Story-Karte: einmal generiert, in der Mediathek abgelegt, an Partner weitergegeben.",
    ],
    bullets: [
      "Produkt- und Aktionsmotive für den Handel",
      "Dateien zum Weitergeben an Gastro und Partner",
      "Markenfarben und Ton bleiben gesperrt",
    ],
  },
] as const;

export type Loesung = (typeof LOESUNGEN)[number];

export function loesungBySlug(slug: string): Loesung | undefined {
  return LOESUNGEN.find((item) => item.slug === slug);
}

export const LOESUNG_CTA_HREF = APP_URL;
