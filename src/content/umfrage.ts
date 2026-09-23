export const UMFRAGE_SURVEY_ID = "brauerei-marketing-barometer-2026" as const;

export type UmfrageOption = {
  id: string;
  label: string;
  allowText?: boolean;
};

export type UmfrageQuestion =
  | {
      id: string;
      n: string;
      type: "single" | "multi" | "scale" | "text";
      title: string;
      hint?: string;
      maxSelect?: number;
      options?: UmfrageOption[];
      scaleMin?: number;
      scaleMax?: number;
      scaleLabels?: Record<number, string>;
      placeholder?: string;
      required?: boolean;
      showIf?: { questionId: string; values: string[] };
    };

export const UMFRAGE_META = {
  title: "Brauerei-Marketing-Barometer 2026",
  subtitle:
    "Wo liegen aktuell die größten Herausforderungen im Marketing deutscher Brauereien?",
  duration: "3–4 Minuten",
  reportName: "Brauerei-Marketing-Barometer 2026",
  /** Öffentliche Auswertungsseite – Link später an wants_results-Teilnehmer. */
  resultsPath: "/umfrage/auswertung",
} as const;

/** Kurze Funnel-Screens – ein Gedanke pro Klick. */
export const UMFRAGE_INTRO_STEPS = [
  {
    eyebrow: "Branchenumfrage 2026",
    title: "Wo verlieren Brauereien heute Zeit im Marketing?",
    body: "Als gelernter Brauer und Mälzer möchte ich wissen, wo im Alltag wirklich der Schuh drückt.",
    cta: "Weiter",
  },
  {
    eyebrow: "3–4 Minuten",
    title: "Kurz, konkret, anonym.",
    body: "Wenige Fragen zu Zeit, Content und Engpässen – ausgewertet als Branchenübersicht, nicht als Verkaufsgespräch.",
    cta: "Verstanden",
  },
  {
    eyebrow: "Für Teilnehmer",
    title: "Sie erhalten die Auswertung kostenlos.",
    body: "Nach genug Antworten schicken wir Ihnen auf Wunsch den Brauerei-Marketing-Report 2026 – und Sie sehen, wo Ihre Brauerei steht.",
    cta: "Los geht’s",
  },
] as const;

export const UMFRAGE_QUESTIONS: UmfrageQuestion[] = [
  {
    id: "size",
    n: "01",
    type: "single",
    title: "Wie groß ist Ihre Brauerei ungefähr?",
    required: true,
    options: [
      { id: "gasthaus", label: "Gasthaus-/Hausbrauerei" },
      { id: "bis_5000", label: "Bis 5.000 hl Jahresausstoß" },
      { id: "5000_20000", label: "5.000–20.000 hl" },
      { id: "20000_100000", label: "20.000–100.000 hl" },
      { id: "100000_500000", label: "100.000–500.000 hl" },
      { id: "ueber_500000", label: "Über 500.000 hl" },
      { id: "kA", label: "Keine Angabe" },
    ],
  },
  {
    id: "marketing_owners",
    n: "02",
    type: "multi",
    title: "Wer übernimmt bei Ihnen hauptsächlich das Marketing?",
    hint: "Mehrfachauswahl möglich",
    required: true,
    options: [
      { id: "gf", label: "Geschäftsführung / Inhaber" },
      { id: "vertrieb", label: "Vertrieb" },
      { id: "mitarbeiter", label: "Mitarbeiter zusätzlich zu anderen Aufgaben" },
      { id: "abteilung", label: "Eigene Marketingabteilung" },
      { id: "agentur", label: "Externe Agentur" },
      { id: "freelancer", label: "Freelancer" },
      { id: "social_agentur", label: "Social-Media-Agentur" },
      { id: "niemand", label: "Aktuell niemand konkret" },
      { id: "sonstiges", label: "Sonstiges", allowText: true },
    ],
  },
  {
    id: "challenges",
    n: "03",
    type: "multi",
    title: "Was sind aktuell die größten Herausforderungen in Ihrem Marketing?",
    hint: "Bitte maximal 3 auswählen",
    maxSelect: 3,
    required: true,
    options: [
      { id: "zeit", label: "Zu wenig Zeit" },
      { id: "personal", label: "Fehlendes Personal" },
      { id: "ideen", label: "Fehlende Ideen für Inhalte" },
      { id: "fotos", label: "Regelmäßig gute Fotos erstellen" },
      { id: "videos", label: "Videos / Reels erstellen" },
      { id: "social", label: "Social Media regelmäßig bespielen" },
      { id: "ads", label: "Werbeanzeigen erstellen" },
      { id: "produkte", label: "Produkte professionell präsentieren" },
      { id: "texte", label: "Texte / Beiträge schreiben" },
      { id: "events", label: "Veranstaltungen vermarkten" },
      { id: "zielgruppen", label: "Neue Zielgruppen erreichen" },
      { id: "jung", label: "Junge Zielgruppen erreichen" },
      { id: "messen", label: "Ergebnisse des Marketings messen" },
      { id: "kosten", label: "Kosten für Agenturen / Dienstleister" },
      { id: "knowhow", label: "Fehlendes Know-how" },
      { id: "freigaben", label: "Abstimmung und Freigaben innerhalb des Unternehmens" },
      { id: "sonstiges", label: "Sonstiges", allowText: true },
    ],
  },
  {
    id: "most_time",
    n: "04",
    type: "single",
    title: "Welche Marketingaufgabe kostet Sie aktuell am meisten Zeit?",
    required: true,
    options: [
      { id: "planung", label: "Planung von Social-Media-Inhalten" },
      { id: "bilder", label: "Erstellung von Bildern" },
      { id: "videos", label: "Erstellung von Videos" },
      { id: "texte", label: "Texte / Posts schreiben" },
      { id: "werbemittel", label: "Werbemittel gestalten" },
      { id: "kampagnen", label: "Kampagnen planen" },
      { id: "website", label: "Website pflegen" },
      { id: "ads", label: "Anzeigen erstellen" },
      { id: "freigaben", label: "Abstimmungen und Freigaben" },
      { id: "extern", label: "Zusammenarbeit mit externen Dienstleistern" },
      { id: "sonstiges", label: "Sonstiges", allowText: true },
    ],
  },
  {
    id: "social_frequency",
    n: "05",
    type: "single",
    title: "Wie regelmäßig veröffentlicht Ihre Brauerei neue Inhalte auf Social Media?",
    required: true,
    options: [
      { id: "taeglich", label: "Täglich" },
      { id: "mehrmals_woche", label: "Mehrmals pro Woche" },
      { id: "einmal_woche", label: "Ca. einmal pro Woche" },
      { id: "mehrmals_monat", label: "Mehrmals pro Monat" },
      { id: "seltener", label: "Seltener" },
      { id: "gar_nicht", label: "Aktuell gar nicht" },
    ],
  },
  {
    id: "content_creation",
    n: "06",
    type: "multi",
    title: "Wie entstehen aktuell Ihre Produktbilder, Werbemotive und Social-Media-Inhalte?",
    hint: "Mehrfachauswahl möglich",
    required: true,
    options: [
      { id: "selbst", label: "Wir fotografieren selbst" },
      { id: "mitarbeiter", label: "Mitarbeiter erstellen die Inhalte" },
      { id: "fotograf", label: "Professioneller Fotograf" },
      { id: "agentur", label: "Marketingagentur" },
      { id: "social_agentur", label: "Social-Media-Agentur" },
      { id: "stock", label: "Stockbilder / Vorlagen" },
      { id: "canva", label: "Canva oder ähnliche Design-Tools" },
      { id: "ki", label: "KI-Tools" },
      { id: "handel", label: "Inhalte von Handel / Partnern" },
      { id: "unterschiedlich", label: "Unterschiedlich, je nach Projekt" },
      { id: "sonstiges", label: "Sonstiges", allowText: true },
    ],
  },
  {
    id: "ai_usage",
    n: "07",
    type: "single",
    title: "Nutzen Sie bereits künstliche Intelligenz im Marketing?",
    required: true,
    options: [
      { id: "regelmaessig", label: "Ja, regelmäßig" },
      { id: "gelegentlich", label: "Ja, gelegentlich" },
      { id: "testen", label: "Wir testen aktuell erste Möglichkeiten" },
      { id: "interessant", label: "Noch nicht, aber grundsätzlich interessant" },
      { id: "nein", label: "Nein, aktuell kein Thema" },
    ],
  },
  {
    id: "ai_usage_for",
    n: "07b",
    type: "multi",
    title: "Wofür nutzen Sie KI bereits?",
    hint: "Mehrfachauswahl möglich",
    required: true,
    showIf: {
      questionId: "ai_usage",
      values: ["regelmaessig", "gelegentlich", "testen"],
    },
    options: [
      { id: "texte", label: "Texte" },
      { id: "ideen", label: "Social-Media-Ideen" },
      { id: "bilder", label: "Bilder" },
      { id: "videos", label: "Videos" },
      { id: "ads", label: "Werbeanzeigen" },
      { id: "uebersetzungen", label: "Übersetzungen" },
      { id: "kampagnen", label: "Kampagnenplanung" },
      { id: "daten", label: "Datenanalyse" },
      { id: "sonstiges", label: "Sonstiges", allowText: true },
    ],
  },
  {
    id: "ai_barriers",
    n: "08",
    type: "multi",
    title: "Was hält Ihre Brauerei aktuell davon ab, KI stärker im Marketing einzusetzen?",
    hint: "Mehrfachauswahl möglich",
    required: true,
    options: [
      { id: "wissen", label: "Fehlendes Wissen" },
      { id: "kompliziert", label: "Zu komplizierte Tools" },
      { id: "authentisch", label: "Ergebnisse wirken nicht authentisch genug" },
      { id: "marke", label: "Sorge um Marke / Corporate Design" },
      { id: "datenschutz", label: "Datenschutz / rechtliche Unsicherheit" },
      { id: "zeit", label: "Fehlende Zeit, sich damit zu beschäftigen" },
      { id: "tools", label: "Zu viele verschiedene Tools notwendig" },
      { id: "qualitaet", label: "Unsicherheit bezüglich der Qualität" },
      { id: "kein_fall", label: "Aktuell kein konkreter Anwendungsfall" },
      { id: "bereits", label: "Wir setzen KI bereits intensiv ein" },
      { id: "sonstiges", label: "Sonstiges", allowText: true },
    ],
  },
  {
    id: "automate_wish",
    n: "09",
    type: "text",
    title:
      "Wenn Sie eine Marketingaufgabe sofort deutlich vereinfachen oder automatisieren könnten – welche wäre das?",
    placeholder: "Ihre Antwort …",
    required: false,
  },
  {
    id: "interesting_features",
    n: "10",
    type: "multi",
    title: "Welche Funktionen wären für Ihre Brauerei besonders interessant?",
    hint: "Bitte maximal 3 auswählen",
    maxSelect: 3,
    required: true,
    options: [
      { id: "produktbilder", label: "Produktbilder aus vorhandenen Flaschen-/Dosenbildern erstellen" },
      { id: "social_posts", label: "Social-Media-Posts automatisch vorbereiten" },
      { id: "werbemotive", label: "Werbemotive erstellen" },
      { id: "videos", label: "Videos / kurze Werbeclips erstellen" },
      { id: "kampagnen", label: "Ideen für Kampagnen entwickeln" },
      { id: "texte", label: "Texte und Captions schreiben" },
      { id: "cd", label: "Inhalte automatisch an das eigene Corporate Design anpassen" },
      { id: "saisonal", label: "Saisonale Kampagnen, z. B. Volksfest, Weihnachten oder Sommer" },
      { id: "neue_produkte", label: "Neue Produkte schneller vermarkten" },
      { id: "ads", label: "Anzeigen für Instagram / Facebook erstellen" },
      { id: "gastro", label: "Inhalte für Gastronomie und Handel erstellen" },
      { id: "produktdaten", label: "Marketinginhalte aus bestehenden Produktdaten erzeugen" },
      { id: "weiss_nicht", label: "Weiß ich noch nicht" },
    ],
  },
  {
    id: "platform_interest",
    n: "11",
    type: "scale",
    title:
      "Wie interessant wäre für Sie eine Plattform speziell für Brauereien, über die sich solche Marketinginhalte an einem Ort erstellen lassen?",
    required: true,
    scaleMin: 1,
    scaleMax: 5,
    scaleLabels: {
      1: "überhaupt nicht interessant",
      2: "eher nicht interessant",
      3: "neutral",
      4: "interessant",
      5: "sehr interessant",
    },
  },
  {
    id: "must_have",
    n: "12",
    type: "text",
    title:
      "Was müsste eine solche Lösung können, damit Sie sie tatsächlich im Alltag einsetzen würden?",
    placeholder: "Ihre Antwort …",
    required: false,
  },
];
