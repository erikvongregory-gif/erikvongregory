/**
 * Fragebogen „Wie läuft das Marketing in Ihrer Brauerei?“
 * 1:1 nach der Papierfassung (Fragebogen Brauereien_v2.pdf, 31 Fragen in 7 Teilen).
 * Der Produktname wird bewusst nicht genannt (Frage 27 fragt nach einem Namensvorschlag).
 * Neue Survey-ID, damit Antworten nicht mit dem alten Barometer vermischt werden.
 */
export const UMFRAGE_SURVEY_ID = "brauerei-marketing-fragebogen-2026" as const;

export type UmfrageOption = {
  id: string;
  label: string;
  /** Freitextfeld erscheint, wenn die Option gewählt ist (z. B. „Sonstiges:“). */
  allowText?: boolean;
  /** Schließt alle anderen Optionen aus (z. B. „keine“, „nein, noch nie“). */
  exclusive?: boolean;
};

export type UmfrageGroup = {
  id: string;
  label: string;
  options: UmfrageOption[];
};

export type UmfrageExtraField = {
  id: string;
  label: string;
  placeholder?: string;
  inputMode?: "numeric" | "text";
  suffix?: string;
  multiline?: boolean;
};

export type UmfrageQuestion = {
  id: string;
  /** Nummer wie auf dem Papierbogen. */
  n: string;
  part: number;
  /**
   * single = eine Antwort, multi = Mehrfachnennung, rank = Reihenfolge 1–3,
   * groups = mehrere Einfachauswahlen auf einem Screen (z. B. Preistabelle),
   * text = Freitext, info = nur Lesen (Variantenbeschreibung).
   */
  type: "single" | "multi" | "rank" | "groups" | "text" | "info";
  title: string;
  hint?: string;
  maxSelect?: number;
  options?: UmfrageOption[];
  groups?: UmfrageGroup[];
  /** Zusätzliches Eingabefeld unter den Antworten (z. B. „Stunden pro Woche“). */
  extra?: UmfrageExtraField;
  placeholder?: string;
  required?: boolean;
  showIf?: { questionId: string; values: string[] };
};

export const UMFRAGE_META = {
  title: "Wie läuft das Marketing in Ihrer Brauerei?",
  subtitle:
    "Kurze Umfrage unter Brauereien: wie Sie Ihr Marketing heute machen, was es kostet und was wirklich helfen würde.",
  duration: "ca. 10 Minuten",
  reportName: "Brauerei-Marketing-Umfrage 2026",
  /** Öffentliche Auswertungsseite. */
  resultsPath: "/umfrage/auswertung",
  author: "Erik von Gregory · Brauer und Mälzer",
  privacyNote:
    "Die Antworten werden ausschließlich zur Prüfung dieses Gründungsvorhabens ausgewertet und nur zusammengefasst dargestellt.",
} as const;

export const UMFRAGE_PARTS: Record<number, { title: string; subtitle: string }> = {
  1: { title: "Ihr Betrieb", subtitle: "Damit ich Ihre Antworten einordnen kann." },
  2: { title: "Ihr Marketing heute", subtitle: "Wie es bei Ihnen gerade wirklich läuft." },
  3: { title: "Bilder und Inhalte", subtitle: "Woher Ihre Bilder kommen und wo es klemmt." },
  4: { title: "Erfahrungen mit KI", subtitle: "Ehrliche Meinung erwünscht, gern auch Skepsis." },
  5: { title: "Was Sie heute ausgeben", subtitle: "Grobe Schätzungen reichen völlig." },
  6: { title: "Selbst machen oder machen lassen?", subtitle: "Hier zählt Ihr Bauchgefühl." },
  7: { title: "Wie geht es weiter?", subtitle: "Alles freiwillig." },
};

export const UMFRAGE_PART_COUNT = 7;

/** Kurze Einstiegs-Screens – ein Gedanke pro Klick. */
export const UMFRAGE_INTRO_STEPS = [
  {
    eyebrow: "Kurze Umfrage unter Brauereien",
    title: "Wie läuft das Marketing in Ihrer Brauerei?",
    body: "Ich bin Erik von Gregory, Brauer und Mälzer, und gründe gerade ein kleines Unternehmen rund um Bilder und Social Media für Brauereien. Bevor ich etwas anbiete, möchte ich von Ihnen lernen: wie Sie es heute machen, was es kostet und was wirklich helfen würde.",
    chips: [] as string[],
    cta: "Weiter",
  },
  {
    eyebrow: "So funktioniert’s",
    title: "Einfach antippen oder kurz notieren.",
    body: "Es gibt keine falschen Antworten, „weiß nicht“ ist völlig in Ordnung. Kontaktdaten tragen Sie nur ein, wenn Sie möchten.",
    chips: ["ca. 10 Minuten", "anonym", "kein Verkauf", "Dankeschön am Ende"],
    cta: "Los geht’s",
  },
];

/** Beschreibung der beiden Angebotsvarianten (Teil 6). */
export const UMFRAGE_VARIANTS = [
  {
    key: "A",
    eyebrow: "Variante A",
    title: "Online-Programm zum Selbermachen",
    points: [
      "Sie legen einmal Ihr Markenprofil an: Farben, Ton, Etiketten, Referenzbilder.",
      "Danach erstellen Sie selbst im Browser Produktfotos, Feed- und Story-Motive, in wenigen Minuten.",
      "Alle Formate passen direkt für Instagram, Facebook und Website.",
      "Mehrere Personen können mitarbeiten und freigeben.",
      "Monatliche Gebühr mit festem Kontingent, monatlich kündbar.",
    ],
  },
  {
    key: "B",
    eyebrow: "Variante B",
    title: "Fertige Motive als Dienstleistung",
    points: [
      "Sie schicken Etikett, Produktinfos und Anlass, z. B. „Bockbier im Oktober“.",
      "Sie erhalten ein fertiges Paket, z. B. 10 Motive in Ihrem Markenlook.",
      "Eine Korrekturrunde ist inklusive.",
      "Sie müssen nichts selbst bedienen.",
      "Bezahlung pro Paket, kein Abo.",
    ],
  },
] as const;

const KI_TOOL_IDS = ["chatgpt", "canva", "midjourney", "firefly", "anderes"];

export const UMFRAGE_QUESTIONS: UmfrageQuestion[] = [
  // ── Teil 1: Ihr Betrieb ──────────────────────────────────────────────
  {
    id: "betriebsart",
    n: "1",
    part: 1,
    type: "single",
    title: "Welche Art von Betrieb sind Sie?",
    required: true,
    options: [
      { id: "gasthaus", label: "Gasthaus-/Hausbrauerei" },
      { id: "craft", label: "Craft-Brauerei" },
      { id: "regional", label: "Private Regionalbrauerei" },
      { id: "kloster", label: "Klosterbrauerei" },
      { id: "industrie", label: "Industrie-/Konzernbrauerei" },
      { id: "marke_ohne_brauerei", label: "Getränkemarke ohne eigene Brauerei" },
      { id: "sonstiges", label: "Sonstiges", allowText: true },
    ],
  },
  {
    id: "ausstoss",
    n: "2",
    part: 1,
    type: "single",
    title: "Wie hoch ist Ihr Jahresausstoß?",
    required: true,
    options: [
      { id: "unter_1000", label: "unter 1.000 hl" },
      { id: "1000_5000", label: "1.000–5.000 hl" },
      { id: "5000_20000", label: "5.000–20.000 hl" },
      { id: "20000_100000", label: "20.000–100.000 hl" },
      { id: "100000_500000", label: "100.000–500.000 hl" },
      { id: "ueber_500000", label: "über 500.000 hl" },
    ],
  },
  {
    id: "vertriebswege",
    n: "3",
    part: 1,
    type: "multi",
    title: "Über welche Wege verkaufen Sie?",
    hint: "Mehrfachnennung möglich",
    required: true,
    options: [
      { id: "eigene_gaststaette", label: "eigene Gaststätte/Biergarten" },
      { id: "gastronomie", label: "Gastronomie" },
      { id: "gfgh", label: "Getränkefachhandel" },
      { id: "leh", label: "Lebensmittelhandel" },
      { id: "rampe", label: "Rampen-/Hofverkauf" },
      { id: "online", label: "Online-Shop" },
      { id: "events", label: "Feste/Events" },
      { id: "export", label: "Export" },
    ],
  },
  {
    id: "rolle",
    n: "4",
    part: 1,
    type: "single",
    title: "Ihre Rolle im Betrieb:",
    required: true,
    options: [
      { id: "inhaber", label: "Inhaber/Geschäftsführer" },
      { id: "braumeister", label: "Braumeister" },
      { id: "marketing", label: "Marketing/Vertrieb" },
      { id: "gastro", label: "Gastronomie/Service" },
      { id: "sonstiges", label: "Sonstiges", allowText: true },
    ],
  },

  // ── Teil 2: Ihr Marketing heute ──────────────────────────────────────
  {
    id: "kanaele",
    n: "5",
    part: 2,
    type: "multi",
    title: "Welche Kanäle nutzen Sie aktiv?",
    hint: "Mehrfachnennung möglich",
    required: true,
    options: [
      { id: "instagram", label: "Instagram" },
      { id: "facebook", label: "Facebook" },
      { id: "tiktok", label: "TikTok" },
      { id: "whatsapp", label: "WhatsApp-Kanal" },
      { id: "website", label: "Website" },
      { id: "newsletter", label: "Newsletter" },
      { id: "plakate", label: "Plakate/Flyer" },
      { id: "handelsmaterial", label: "Material für Händler/Gastronomie" },
      { id: "keine", label: "keine", exclusive: true },
    ],
  },
  {
    id: "posting_frequenz",
    n: "6",
    part: 2,
    type: "single",
    title: "Wie oft veröffentlichen Sie einen Beitrag in Social Media?",
    required: true,
    options: [
      { id: "mehrmals_woche", label: "mehrmals pro Woche" },
      { id: "einmal_woche", label: "etwa einmal pro Woche" },
      { id: "1_3_monat", label: "ein- bis dreimal im Monat" },
      { id: "selten", label: "unregelmäßig/selten" },
      { id: "nie", label: "nie" },
    ],
  },
  {
    id: "ersteller",
    n: "7",
    part: 2,
    type: "multi",
    title: "Wer erstellt die Beiträge, und wie viele Stunden pro Woche fließen insgesamt hinein?",
    hint: "Mehrfachnennung möglich",
    required: true,
    options: [
      { id: "inhaber", label: "Inhaber/Familie" },
      { id: "mitarbeiter", label: "eigene Mitarbeiter" },
      { id: "agentur", label: "Agentur" },
      { id: "freelancer", label: "Freelancer" },
      { id: "niemand", label: "niemand", exclusive: true },
    ],
    extra: {
      id: "stunden",
      label: "Stunden pro Woche",
      placeholder: "z. B. 3",
      inputMode: "numeric",
      suffix: "Std./Woche",
    },
  },
  {
    id: "beteiligte",
    n: "8",
    part: 2,
    type: "single",
    title: "Wie viele Personen sind beteiligt, vom Erstellen bis zur Freigabe eines Beitrags?",
    required: true,
    options: [
      { id: "1", label: "1" },
      { id: "2_3", label: "2–3" },
      { id: "4_10", label: "4–10" },
      { id: "mehr_10", label: "mehr als 10" },
    ],
  },

  // ── Teil 3: Bilder und Inhalte ───────────────────────────────────────
  {
    id: "bildquellen",
    n: "9",
    part: 3,
    type: "multi",
    title: "Woher kommen Ihre Produktbilder heute?",
    hint: "Mehrfachnennung möglich",
    required: true,
    options: [
      { id: "fotograf", label: "Fotograf" },
      { id: "handy", label: "eigene Handyfotos" },
      { id: "agentur", label: "Agentur" },
      { id: "etikettendesigner", label: "Etiketten-Designer (Mockups)" },
      { id: "bilddatenbanken", label: "Bilddatenbanken" },
      { id: "ki", label: "KI-Programme" },
      { id: "verband", label: "Brauerei-Verband/Lieferant" },
    ],
  },
  {
    id: "letztes_shooting",
    n: "10",
    part: 3,
    type: "single",
    title: "Wann hatten Sie das letzte professionelle Fotoshooting, und was hat es ungefähr gekostet?",
    required: true,
    options: [
      { id: "12_monate", label: "in den letzten 12 Monaten" },
      { id: "1_3_jahre", label: "vor 1–3 Jahren" },
      { id: "laenger", label: "länger her" },
      { id: "nie", label: "noch nie" },
    ],
    extra: {
      id: "kosten",
      label: "Kosten ca.",
      placeholder: "z. B. 1.500",
      inputMode: "numeric",
      suffix: "€",
    },
  },
  {
    id: "letzter_anlass",
    n: "11",
    part: 3,
    type: "single",
    title:
      "Denken Sie an das letzte neue Bier, Saisonbier oder Fest. Hatten Sie rechtzeitig passende Bilder und Beiträge dafür? Wie lief das ab?",
    required: true,
    options: [
      { id: "ohne_stress", label: "ja, ohne Stress" },
      { id: "knapp", label: "ja, aber knapp oder improvisiert" },
      { id: "kaum", label: "nein, es gab kaum etwas" },
    ],
    extra: {
      id: "ablauf",
      label: "Wie lief das ab? (optional)",
      placeholder: "Kurz notieren …",
      multiline: true,
    },
  },
  {
    id: "bedarf_monat",
    n: "12",
    part: 3,
    type: "single",
    title:
      "Wie viele neue Bilder oder Beiträge bräuchten Sie im Monat eigentlich, wenn Zeit und Geld keine Rolle spielten?",
    required: true,
    options: [
      { id: "unter_5", label: "unter 5" },
      { id: "5_15", label: "5–15" },
      { id: "15_40", label: "15–40" },
      { id: "mehr_40", label: "mehr als 40" },
    ],
  },
  {
    id: "groesste_probleme",
    n: "13",
    part: 3,
    type: "rank",
    title: "Was ist bei Ihnen das größte Problem im Marketing?",
    hint: "Bitte die wichtigsten drei der Reihe nach antippen: 1, 2, 3",
    maxSelect: 3,
    required: true,
    options: [
      { id: "zeit", label: "keine Zeit" },
      { id: "ideen", label: "keine Ideen" },
      { id: "bilder_teuer", label: "gute Bilder sind zu teuer" },
      { id: "markenlook", label: "kein einheitlicher Markenlook" },
      { id: "programme", label: "niemand kennt sich mit Programmen aus" },
      { id: "werberegeln", label: "unsicher bei Werberegeln für Alkohol" },
      { id: "handel_material", label: "Händler/Gastronomie wollen Material" },
      { id: "kein_problem", label: "kein Problem, läuft gut", exclusive: true },
    ],
  },

  // ── Teil 4: Erfahrungen mit KI ───────────────────────────────────────
  {
    id: "ki_tools",
    n: "14",
    part: 4,
    type: "multi",
    title: "Haben Sie schon KI-Programme für Bilder oder Texte ausprobiert?",
    hint: "Mehrfachnennung möglich",
    required: true,
    options: [
      { id: "chatgpt", label: "ChatGPT" },
      { id: "canva", label: "Canva (KI-Funktionen)" },
      { id: "midjourney", label: "Midjourney" },
      { id: "firefly", label: "Adobe Firefly" },
      { id: "anderes", label: "anderes", allowText: true },
      { id: "nein", label: "nein, noch nie", exclusive: true },
    ],
  },
  {
    id: "ki_ergebnis",
    n: "15",
    part: 4,
    type: "multi",
    title: "Falls ja: Wie war das Ergebnis?",
    hint: "Mehrfachnennung möglich",
    required: true,
    showIf: { questionId: "ki_tools", values: KI_TOOL_IDS },
    options: [
      { id: "brauchbar", label: "brauchbar, nutzen wir" },
      { id: "kuenstlich", label: "sah zu künstlich/beliebig aus" },
      { id: "etikett_falsch", label: "Etikett oder Schrift falsch dargestellt" },
      { id: "marke", label: "passte nicht zu unserer Marke" },
      { id: "umstaendlich", label: "zu umständlich" },
    ],
  },
  {
    id: "ki_bedenken",
    n: "16",
    part: 4,
    type: "multi",
    title: "Welche Bedenken hätten Sie bei KI-Bildern für Ihre Brauerei?",
    hint: "Mehrfachnennung möglich",
    required: true,
    options: [
      { id: "unecht", label: "Kunden merken es und finden es unecht" },
      { id: "tradition", label: "passt nicht zu Tradition/Handwerk" },
      { id: "rechtlich", label: "rechtliche Unsicherheit" },
      { id: "produkt", label: "Produkt sieht nicht aus wie das echte" },
      { id: "keine", label: "keine Bedenken", exclusive: true },
    ],
  },

  // ── Teil 5: Was Sie heute ausgeben ───────────────────────────────────
  {
    id: "budget_monat",
    n: "17",
    part: 5,
    type: "single",
    title: "Was gibt Ihr Betrieb pro Monat ungefähr für Marketing aus, ohne eigenes Personal?",
    hint: "Agentur, Fotograf, Programme, Anzeigen, Druck",
    required: true,
    options: [
      { id: "0", label: "0 €" },
      { id: "unter_250", label: "unter 250 €" },
      { id: "250_1000", label: "250–1.000 €" },
      { id: "1000_2500", label: "1.000–2.500 €" },
      { id: "2500_5000", label: "2.500–5.000 €" },
      { id: "5000_10000", label: "5.000–10.000 €" },
      { id: "ueber_10000", label: "über 10.000 €" },
      { id: "weiss_nicht", label: "weiß nicht" },
    ],
  },
  {
    id: "budget_posten",
    n: "18",
    part: 5,
    type: "single",
    title: "Wofür geht davon am meisten weg?",
    required: true,
    options: [
      { id: "agentur", label: "Agentur" },
      { id: "fotograf", label: "Fotograf/Video" },
      { id: "programme", label: "Programme/Abos" },
      { id: "anzeigen", label: "Werbeanzeigen" },
      { id: "druck", label: "Druck/Werbemittel" },
      { id: "feste", label: "Feste/Sponsoring" },
    ],
  },
  {
    id: "entscheider",
    n: "19",
    part: 5,
    type: "single",
    title: "Wer entscheidet bei Ihnen über ein neues Programm für etwa 100 € im Monat?",
    required: true,
    options: [
      { id: "inhaber", label: "Inhaber/Geschäftsführung" },
      { id: "marketing", label: "Marketing/Vertrieb" },
      { id: "braumeister", label: "Braumeister" },
      { id: "konzern", label: "Konzern/Zentrale" },
    ],
  },

  // ── Teil 6: Selbst machen oder machen lassen? ────────────────────────
  {
    id: "varianten_info",
    n: "",
    part: 6,
    type: "info",
    title: "Bitte lesen Sie beide Beschreibungen.",
    hint: "Beide liefern Produktbilder und Social-Media-Motive im Look Ihrer Brauerei, mit Ihrem echten Etikett.",
  },
  {
    id: "variante_nutzen",
    n: "20",
    part: 6,
    type: "single",
    title: "Was wäre für Ihren Betrieb nützlicher?",
    required: true,
    options: [
      { id: "a", label: "A · selbst machen" },
      { id: "b", label: "B · machen lassen" },
      { id: "b_dann_a", label: "erst B, später A" },
      { id: "beides", label: "beides je nach Anlass" },
      { id: "keins", label: "keins von beiden" },
    ],
    extra: {
      id: "warum",
      label: "Warum?",
      placeholder: "Kurz notieren …",
      multiline: true,
    },
  },
  {
    id: "variante_a_zugang",
    n: "21",
    part: 6,
    type: "groups",
    title: "Falls A: Wie viele Personen bräuchten Zugang, und wie viel Zeit hätten sie dafür?",
    required: true,
    showIf: { questionId: "variante_nutzen", values: ["a", "b_dann_a", "beides"] },
    groups: [
      {
        id: "personen",
        label: "Personen",
        options: [
          { id: "1", label: "1 Person" },
          { id: "2_3", label: "2–3" },
          { id: "4_10", label: "4–10" },
          { id: "mehr_10", label: "mehr als 10" },
        ],
      },
      {
        id: "zeit",
        label: "Zeit",
        options: [
          { id: "unter_1h", label: "unter 1 Std./Woche" },
          { id: "1_3h", label: "1–3 Std./Woche" },
          { id: "mehr_3h", label: "mehr als 3 Std./Woche" },
        ],
      },
    ],
  },
  {
    id: "preis_a",
    n: "22",
    part: 6,
    type: "groups",
    title:
      "Welcher Preis wäre für Variante A (Online-Programm) angemessen, und ab wann wäre es zu teuer?",
    hint: "pro Monat",
    required: true,
    groups: [
      {
        id: "angemessen",
        label: "angemessen",
        options: [
          { id: "unter_50", label: "unter 50 €" },
          { id: "50_100", label: "50–100 €" },
          { id: "100_200", label: "100–200 €" },
          { id: "200_400", label: "200–400 €" },
          { id: "ueber_400", label: "über 400 €" },
        ],
      },
      {
        id: "zu_teuer",
        label: "zu teuer ab",
        options: [
          { id: "unter_50", label: "unter 50 €" },
          { id: "50_100", label: "50–100 €" },
          { id: "100_200", label: "100–200 €" },
          { id: "200_400", label: "200–400 €" },
          { id: "ueber_400", label: "über 400 €" },
        ],
      },
    ],
  },
  {
    id: "preis_b",
    n: "23",
    part: 6,
    type: "groups",
    title:
      "Welcher Preis wäre für Variante B (Paket mit 10 fertigen Motiven) angemessen, und ab wann wäre es zu teuer?",
    hint: "pro Paket",
    required: true,
    groups: [
      {
        id: "angemessen",
        label: "angemessen",
        options: [
          { id: "unter_150", label: "unter 150 €" },
          { id: "150_300", label: "150–300 €" },
          { id: "300_600", label: "300–600 €" },
          { id: "600_1200", label: "600–1.200 €" },
          { id: "ueber_1200", label: "über 1.200 €" },
        ],
      },
      {
        id: "zu_teuer",
        label: "zu teuer ab",
        options: [
          { id: "unter_150", label: "unter 150 €" },
          { id: "150_300", label: "150–300 €" },
          { id: "300_600", label: "300–600 €" },
          { id: "600_1200", label: "600–1.200 €" },
          { id: "ueber_1200", label: "über 1.200 €" },
        ],
      },
    ],
  },
  {
    id: "videos_wichtig",
    n: "24",
    part: 6,
    type: "single",
    title: "Wie wichtig wären Ihnen kurze Videos (Reels, Storys) zusätzlich zu Bildern?",
    required: true,
    options: [
      { id: "sehr", label: "sehr wichtig" },
      { id: "schoen", label: "schön, aber nicht nötig" },
      { id: "unwichtig", label: "unwichtig" },
    ],
  },
  {
    id: "wichtigster_nutzen",
    n: "25",
    part: 6,
    type: "single",
    title: "Was wäre für Sie der wichtigste Nutzen?",
    hint: "Bitte nur eins auswählen",
    required: true,
    options: [
      { id: "zeit", label: "Zeit sparen" },
      { id: "kosten", label: "Kosten für Fotograf/Agentur sparen" },
      { id: "regelmaessig", label: "regelmäßiger posten" },
      { id: "markenlook", label: "einheitlicher, professioneller Markenlook" },
      { id: "schnell", label: "schnell Bilder für neue Biere und Feste" },
      { id: "handel", label: "Material für Händler und Gastronomie" },
    ],
  },
  {
    id: "gelohnt",
    n: "26",
    part: 6,
    type: "text",
    title: "Was müsste passieren, damit Sie sagen: „Das hat sich gelohnt“?",
    placeholder: "Ihre Antwort …",
    required: false,
  },
  {
    id: "app_name",
    n: "27",
    part: 6,
    type: "text",
    title: "Wenn es so eine App geben würde, welchen Namen würden Sie dieser App geben?",
    placeholder: "Ihr Namensvorschlag …",
    required: false,
  },

  // ── Teil 7: Wie geht es weiter? ──────────────────────────────────────
  {
    id: "test_79",
    n: "28",
    part: 7,
    type: "single",
    title:
      "Wenn Sie Variante A einen Monat lang für 79 € testen könnten, monatlich kündbar: Würden Sie es ausprobieren?",
    required: true,
    options: [
      { id: "ja", label: "ja" },
      { id: "vielleicht", label: "vielleicht, wenn …", allowText: true },
      { id: "nur_kostenlos", label: "nur kostenlos" },
      { id: "nein", label: "nein" },
    ],
  },
  {
    id: "beispielmotiv",
    n: "29",
    part: 7,
    type: "single",
    title: "Mein Dankeschön: Möchten Sie ein kostenloses Beispielmotiv mit Ihrem echten Etikett?",
    hint: "Dafür am Ende bitte Kontakt eintragen",
    required: true,
    options: [
      { id: "ja", label: "ja, gerne" },
      { id: "vielleicht", label: "vielleicht" },
      { id: "nein", label: "nein" },
    ],
  },
  {
    id: "empfehlung",
    n: "30",
    part: 7,
    type: "text",
    title: "Wen in der Branche sollte ich unbedingt auch noch fragen?",
    placeholder: "Name, Brauerei …",
    required: false,
  },
  {
    id: "gespraech",
    n: "31",
    part: 7,
    type: "single",
    title: "Darf ich mich für ein Gespräch von etwa 20 Minuten bei Ihnen melden?",
    hint: "freiwillig",
    required: true,
    options: [
      { id: "ja", label: "ja" },
      { id: "nein", label: "nein" },
    ],
  },
];

/** Freitextfeld am Ende („Was ich Sie nicht gefragt habe …“). */
export const UMFRAGE_FINAL_NOTE = {
  id: "nicht_gefragt",
  title: "Was ich Sie nicht gefragt habe, aber unbedingt wissen sollte",
  hint: "Ideen, Kritik, Erfahrungen: hier ist Platz dafür.",
} as const;

export const UMFRAGE_CONSENT_TEXT =
  "Ich bin einverstanden, dass meine Kontaktdaten nur für diese Rückfrage gespeichert und danach gelöscht werden. Eine Weitergabe an Dritte erfolgt nicht.";
