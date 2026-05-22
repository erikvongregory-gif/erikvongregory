export type RatgeberScore = "dash" | "mixed" | "prem";

export type RatgeberAnswer = {
  id: "a" | "b" | "c";
  text: string;
  hint: string;
  score: RatgeberScore;
};

export type RatgeberQuestion = {
  n: string;
  topic: string;
  title: string;
  context: string;
  answers: RatgeberAnswer[];
};

export type RatgeberResult = {
  key: RatgeberScore;
  badge: string;
  eyebrow: string;
  head: string;
  headItalic: string;
  body: string;
  cta: string;
  ctaMeta: string;
  plan: string;
  price: string;
  priceMeta: string;
  details: [string, string][];
  secondary: string;
  ctaHref: string;
  secondaryHref: string;
};

export const RATGEBER_QUESTIONS: RatgeberQuestion[] = [
  {
    n: "01",
    topic: "Zeit",
    title: "Wie viel Zeit kann dein Team pro Woche realistisch in Content stecken?",
    context: "Damit klar wird, wie viel ihr selbst übernehmen wollt.",
    answers: [
      { id: "a", text: "30 – 90 Minuten sind drin, wenn es strukturiert ist.", hint: "Eher Dashboard", score: "dash" },
      { id: "b", text: "Eher unregelmäßig — wir brauchen Entlastung.", hint: "Mixed", score: "mixed" },
      { id: "c", text: "Quasi keine Zeit — wir wollen alles komplett abgeben.", hint: "Eher Premium", score: "prem" },
    ],
  },
  {
    n: "02",
    topic: "Workflow",
    title: "Wie ist euer Content-Workflow heute aufgestellt?",
    context: "Status quo, ehrlich gesagt.",
    answers: [
      { id: "a", text: "Wir haben jemand intern, der das macht.", hint: "Eher Dashboard", score: "dash" },
      { id: "b", text: "Mal selbst, mal Agentur — kein klarer Prozess.", hint: "Mixed", score: "mixed" },
      { id: "c", text: "Komplett extern — wir brauchen einen festen Partner.", hint: "Eher Premium", score: "prem" },
    ],
  },
  {
    n: "03",
    topic: "Output",
    title: "Wie viele Motive braucht ihr realistisch pro Monat?",
    context: "Reels, Posts, Ads — alles zusammen gerechnet.",
    answers: [
      { id: "a", text: "5 – 10 Motive reichen uns gut aus.", hint: "Eher Dashboard", score: "dash" },
      { id: "b", text: "10 – 20 brauchen wir konstant.", hint: "Mixed", score: "mixed" },
      { id: "c", text: "20+ Motive plus Kampagnen.", hint: "Eher Premium", score: "prem" },
    ],
  },
  {
    n: "04",
    topic: "Zielbild",
    title: "Was ist euer Ziel in den nächsten 12 Monaten?",
    context: "Wo wollt ihr stehen, wenn wir das nächste Mal sprechen?",
    answers: [
      { id: "a", text: "Selbst schnell und konsistent Bilder generieren.", hint: "Eher Dashboard", score: "dash" },
      { id: "b", text: "Planbare Monats- oder Quartalslieferung.", hint: "Mixed", score: "mixed" },
      { id: "c", text: "Full-Service mit Ads, Reels und Strategie.", hint: "Eher Premium", score: "prem" },
    ],
  },
  {
    n: "05",
    topic: "Budget",
    title: "Welche Größenordnung passt zu eurem Budget?",
    context: "Monatlich, ohne Verpflichtung — nur als Richtwert.",
    answers: [
      { id: "a", text: "Eher 50 – 350 € im Monat (flexibel).", hint: "Eher Dashboard", score: "dash" },
      { id: "b", text: "800 – 1.700 € pro Monat oder im Quartal.", hint: "Mixed", score: "mixed" },
      { id: "c", text: "2.000 – 4.000 € im Monat — Full-Service.", hint: "Eher Premium", score: "prem" },
    ],
  },
];

const RESULT_BASE = {
  dash: {
    key: "dash" as const,
    badge: "Empfehlung · Dashboard",
    eyebrow: "Du willst selbst Gas geben",
    head: "Token-Abo",
    headItalic: "mit Hugo als Begleiter.",
    body: "Du hast Zeit, Lust und Workflow für Eigenständigkeit. Geh mit dem Token-Abo ins Dashboard, generiere selbst — Hopfen Hugo hilft bei Prompts und Formaten.",
    cta: "Dashboard kostenlos testen",
    ctaMeta: "30 Tokens · 7 Tage gratis",
    plan: "Brauerei · Wachstum",
    price: "149 €",
    priceMeta: "pro Monat",
    details: [
      ["Output", "120 Tokens / Monat"],
      ["Rendering", "Priority"],
      ["Team", "3 Accounts"],
      ["Support", "E-Mail + Hugo"],
    ] as [string, string][],
    secondary: "Doch lieber Beratung?",
    ctaHref: "/dashboard",
    secondaryHref: "/#contact",
  },
  mixed: {
    key: "mixed" as const,
    badge: "Empfehlung · Premium · Wachstum",
    eyebrow: "Mix aus Eigenleistung & Lieferung",
    head: "Premium-Wachstum",
    headItalic: "mit Markenprofil.",
    body: "Ihr habt klare Vorstellungen, aber begrenzte Kapazität. Mit dem Wachstums-Paket bekommt ihr planbare Lieferung — und nutzt das Dashboard für eigene Schnellschüsse.",
    cta: "Wachstum anfragen",
    ctaMeta: "Briefing-Call · 30 Min",
    plan: "Brauerei · Wachstum (Premium)",
    price: "1.690 €",
    priceMeta: "pro Monat",
    details: [
      ["Motive", "20+ pro Monat"],
      ["Reels", "8 · 9:16"],
      ["Strategie", "Monatsplan"],
      ["Feed", "Vorbereitung"],
    ] as [string, string][],
    secondary: "Lieber erst Dashboard testen?",
    ctaHref: "/#contact",
    secondaryHref: "/dashboard",
  },
  prem: {
    key: "prem" as const,
    badge: "Empfehlung · Premium · Pro",
    eyebrow: "Vollständig outsourcen",
    head: "Premium-Pro",
    headItalic: "Full-Service inkl. Ads.",
    body: "Ihr habt kaum interne Kapazität und wollt einen festen Partner. Der Pro-Plan übernimmt Strategie, Motive, Ads und Reporting — ihr bekommt ein wöchentliches Standup.",
    cta: "Pro-Plan anfragen",
    ctaMeta: "Gespräch · 45 Min",
    plan: "Brauerei · Pro",
    price: "3.990 €",
    priceMeta: "pro Monat",
    details: [
      ["Motive", "Unlimitiert + Iterationen"],
      ["Kampagnen", "Komplette Setups"],
      ["Ads", "Meta + Setup"],
      ["Bewertungen", "Google · gepflegt"],
    ] as [string, string][],
    secondary: "Doch nur Wachstum?",
    ctaHref: "/#contact",
    secondaryHref: "/#contact",
  },
};

export const RATGEBER_RESULTS: Record<RatgeberScore, RatgeberResult> = RESULT_BASE;

export function pickRatgeberResult(score: Record<RatgeberScore, number>): RatgeberResult {
  const { dash, mixed, prem } = score;
  const max = Math.max(dash, mixed, prem);
  if (prem === max) return RATGEBER_RESULTS.prem;
  if (mixed === max) return RATGEBER_RESULTS.mixed;
  return RATGEBER_RESULTS.dash;
}
