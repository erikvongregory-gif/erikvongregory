# Workflow-Map: Die 8 Phasen in Reihenfolge

Die Sequenz ist nicht optional. Wer Phase 2 überspringt, produziert Content für Keywords die niemand sucht. Wer Phase 4 überspringt, schreibt gegen SERPs die er nicht verstanden hat. Wer Phase 6 überspringt, published AI-Content der generisch ist.

---

## Die 8 Phasen

```
┌─────────────────────────────────────────────────────────────┐
│  STRATEGIE-PHASEN (erst denken)                             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  1. Technical Audit         → Was ist kaputt?               │
│  2. Keyword Research        → Wo ist der Markt?             │
│  3. SERP Analysis           → Wo sind die Lücken?           │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│  EXEKUTIONS-PHASEN (dann bauen)                             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  4. Content Brief           → Was soll geschrieben werden?  │
│  5. Draft Content           → Wie wird es geschrieben?      │
│  6. Evaluate Content        → Ist es gut genug?             │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│  TECHNICAL-PHASEN (dann ausspielen)                         │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  7. Meta Tags               → Wie wird es klickbar?         │
│  8. Schema Markup           → Wie versteht Google es?       │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## Was jede Phase liefert

| # | Phase | Input | Output (Artefakt) | Zeitaufwand |
|---|-------|-------|-------------------|-------------|
| 1 | Technical Audit | Website-URL + Shopify/WP/Custom Info | Fix-Prioritäten-Liste mit High/Med/Low | 1-2h |
| 2 | Keyword Research | Brand + Zielperson + Produkt + Markt | Keyword-Map mit Tier 1-5 Priorisierung | 2-3h |
| 3 | SERP Analysis | Top-10 Keywords aus Phase 2 | SERP-Matrix mit Opportunity-Angles | 2-4h |
| 4 | Content Brief | 1 Keyword + Brand-Voice + Persona | Writing Brief (Master-Doc für alle Drafts) | 1h |
| 5 | Draft Content | Brief + Keyword + SERP-Insights | Content-Draft (1.500-2.500 Wörter) | 1-2h pro Stück |
| 6 | Evaluate Content | Draft + Brand-Voice + Persona | Evaluation-Report mit Score + Fix-Liste | 30-45 min |
| 7 | Meta Tags | Content-Finals | Title + Meta + Open-Graph Set | 15 min pro Stück |
| 8 | Schema Markup | Website-Struktur + Produkte | JSON-LD Templates (Org/Website/Product/FAQ) | 1-2h |

**Total für einen ersten Durchlauf (1 Brand, 5-10 Content-Pieces):** ~30-40 Arbeitsstunden. Davon ~60% Claude, ~40% du (Review, Kontext-Fütterung, Entscheidungen).

---

## Warum diese Reihenfolge

### Warum Audit vor Keyword Research?
Wenn deine Site technisch kaputt ist (404s, fehlende Canonicals, H1-Duplikate), wirst du für nichts ranken — egal wie gut dein Content ist. Audit räumt den Boden frei.

### Warum Keyword Research vor SERP Analysis?
Erst wenn du weißt *welche* Keywords überhaupt in Frage kommen (Volumen, Intent, Stage, Fit zur Brand), lohnt sich die SERP-Tiefenanalyse. SERP-Analyse ist teuer (jedes Keyword = 20-30 Min). Nicht auf Müll verschwenden.

### Warum SERP Analysis vor Content Brief?
Der Brief muss wissen, was Google für dieses Keyword belohnt: Welche Content-Länge, welches Format (Listicle/Guide/How-to/Product), welche FAQs, welcher Winkel. Ohne SERP-Analyse schreibst du blind.

### Warum Brief vor Draft?
Der Brief ist der einzige Weg, dass alle deine Content-Pieces brand-konsistent sind — egal wer/was schreibt. Ein Brief = 50 konsistente Drafts. Kein Brief = 50 verschiedene Stile.

### Warum Evaluate zwischen Draft und Publish?
AI produziert 80% gut, 20% generisch. Ohne Evaluation-Gate published du den Generic-Slop mit. Das Evaluation-Framework (siehe `06-evaluate-content`) fängt die 20% ab.

### Warum Meta und Schema ans Ende?
Meta-Tags brauchen den finalen Content. Schema braucht die finale Site-Struktur. Beides am Ende verhindert Doppelarbeit.

---

## Spezialfälle

**Case A: Du hast schon Content, willst nur optimieren**
Start bei Phase 3 (SERP Analysis deines aktuellen Contents) → Phase 6 (Evaluation) → Phase 7+8 (Meta + Schema). Phase 1+2 einmal im Quartal als Hygiene.

**Case B: Du baust gerade eine Brand auf, kein Content existiert**
Linear 1-8 durchgehen. Keine Abkürzungen. Das ist der Case, für den dieses Toolkit gebaut wurde.

**Case C: Du hast nur 1 Tag Zeit für einen Spot-Check**
Phase 1 (Audit, 2h) + Phase 2 (Keyword-Check, 2h) + Phase 6 (Evaluation von 2-3 bestehenden Pieces, 2h). Ergibt eine Handlungsliste für die nächsten 4 Wochen.

---

## Output-Konvention

Jeder Prompt in `02-PROMPTS/` folgt der gleichen Struktur:

1. **WANN verwenden** — Trigger, Voraussetzungen
2. **WAS der Prompt tut** — was Claude produziert
3. **INPUT den du gibst** — konkrete Bausteine
4. **DER PROMPT** — copy-paste-ready
5. **ERWARTETER OUTPUT** — Format + Beispielstruktur
6. **TROUBLESHOOTING** — was tun wenn Output mies ist
7. **NÄCHSTE PHASE** — was folgt logisch

Das ist das Muster. Du kannst damit in Phase 6 einsteigen ohne Phase 1 gemacht zu haben, wenn die Voraussetzungen erfüllt sind.

---

**Jetzt:** Geh in `02-PROMPTS/01-technical-audit.md` — oder wenn du den Denkrahmen zuerst willst: `03-FRAMEWORKS/buyer-journey-4-stages.md`.
