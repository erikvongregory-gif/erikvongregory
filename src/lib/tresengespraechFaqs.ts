export type TresengespraechFaq = {
  q: string;
  a: string;
};

/** Narrative Reihenfolge: Risiko → Aufwand → Markenstil → Wechsel → Geschwindigkeit */
export const TRESENGESPRAECH_FAQS: TresengespraechFaq[] = [
  {
    q: "Ist das Risiko gering, wenn ich starte?",
    a: "Im Abo bist du monatlich kündbar — kein Lock-in. Beim einmaligen Paket arbeiten wir nach klarem Briefing, und du genehmigst jeden Meilenstein, bevor wir fortfahren. Wenn die ersten Motive nicht passen, korrigieren wir auf unsere Kosten.",
  },
  {
    q: "Wie viel Aufwand habe ich intern wirklich?",
    a: "Abo-Tool: ca. 1–2 Stunden pro Woche im Dashboard. Manufaktur: ein 30-Minuten-Briefing zum Start, danach ca. 15 Minuten pro Woche für Freigaben. Kein Marketing-Team nötig.",
  },
  {
    q: "Sind die Inhalte wirklich in meinem Markenstil?",
    a: "Ja. Wir starten mit deinem Markenprofil — Farben, Tonalität, No-Gos — und trainieren die KI darauf. Jedes Motiv durchläuft eine Markencheck-Schleife. Du siehst nichts, was nicht zu dir passt.",
  },
  {
    q: "Kann ich später hoch- oder runterwechseln?",
    a: "Jederzeit. Im Abo wechselst du den Tier zum nächsten Monat. Von Abo zu Manufaktur (oder umgekehrt) klappt mit einer Mail — dein Markenprofil bleibt erhalten.",
  },
  {
    q: "Wie schnell sehe ich erste Ergebnisse?",
    a: "Erste Bilder: 3–5 Tage nach dem Briefing. Erste veröffentlichte Posts: in der ersten Woche. Erste neue Anfragen über den Content: typischerweise innerhalb der ersten 4–6 Wochen.",
  },
];
