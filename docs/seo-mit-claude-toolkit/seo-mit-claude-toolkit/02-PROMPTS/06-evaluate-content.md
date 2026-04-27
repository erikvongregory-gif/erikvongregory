# Prompt 06 — Evaluate Content

## Wann verwenden

Nach JEDEM Draft. Nie überspringen. Idealerweise in einer **frischen Claude-Session** (nicht der gleichen wo du den Draft erstellt hast). Claude ist mit Abstand ein besserer Kritiker als direkt danach.

**Voraussetzungen:**
- Der fertige Draft
- Der Master-Brief aus Prompt 04
- Die SERP-Analyse für das Keyword

## Was der Prompt tut

Claude läuft den Draft durch **4 unabhängige Tests**:

1. **Substitution-Test** — Ist der Text generisch oder brand-spezifisch?
2. **Persona-Test** — Würde deine Persona jeden Absatz zu Ende lesen?
3. **SEO-Check** — Sind alle technischen Voraussetzungen erfüllt?
4. **Filler-Check** — Welche Sätze tragen nichts?

Am Ende: Score, Top-3-Stärken, Top-3-Schwächen, konkrete Fix-Liste.

Das ist der Gate-Keeper zwischen AI-Slop und publishable Content.

## Input den du gibst

1. **Der Draft** (vollständig, Markdown)
2. **Master-Brief** (vollständig)
3. **Keyword + Secondary Keywords**
4. **Interne Links die eingebaut sein sollten**

## Der Prompt

```
Du bist ein Senior Content-Editor. Du evaluierst AI-generierten Content
gegen einen Master-Brief. Du bist brutal ehrlich — Schmeicheln hilft
niemandem.

═══════════════════════════════════════════════════════════════════
MASTER-BRIEF
═══════════════════════════════════════════════════════════════════

[HIER MASTER-BRIEF EINFÜGEN]

═══════════════════════════════════════════════════════════════════
DRAFT ZU EVALUIEREN
═══════════════════════════════════════════════════════════════════

[HIER DRAFT EINFÜGEN]

═══════════════════════════════════════════════════════════════════

CONTEXT:
- Primary Keyword: [X]
- Secondary Keywords: [Liste]
- Verpflichtende interne Links: [Liste]

AUFGABE:
Führe 4 unabhängige Tests durch. Jeder Test hat eigene Kriterien.
Am Ende: Gesamturteil + konkrete Handlungsliste.

═══════════════════════════════════════════════════════════════════
TEST 1: SUBSTITUTION-TEST
═══════════════════════════════════════════════════════════════════

Frage: Wenn ich "[meine Brand]" durch einen Wettbewerber ersetze —
funktioniert der Text noch?

Methode:
- Lies den Draft komplett
- Mental-ersetze Brand durch 2-3 konkrete Wettbewerber
- Identifiziere Passagen die "generisch" funktionieren würden
- Identifiziere Passagen die EXKLUSIV für [Brand] funktionieren

Output:
- Generische Passagen (Liste mit Zitaten): [...]
- Exklusive Passagen (Liste mit Zitaten): [...]
- Generisch-Quote: [%] der Wörter sind austauschbar
- Urteil: BESTANDEN (Generisch-Quote unter 20%) / NICHT BESTANDEN

═══════════════════════════════════════════════════════════════════
TEST 2: PERSONA-TEST
═══════════════════════════════════════════════════════════════════

Frage: Würde [konkrete Persona aus Brief] jeden Absatz zu Ende lesen?

Methode:
- Nimm Persona-Profil aus Brief
- Gehe Absatz für Absatz durch
- Pro Absatz: Bleibt Persona dran oder scrollt sie?
- Identifiziere Scroll-Risiko-Passagen (Top 5 problematische)

Output:
- Gesamt-Bestehensrate: [X/Y Absätze] = [%]
- Top 5 Scroll-Risiko-Passagen mit Zitat + Fix-Vorschlag
- Stärken (was funktioniert für Persona)
- Urteil: BESTANDEN (über 80%) / NICHT BESTANDEN

═══════════════════════════════════════════════════════════════════
TEST 3: SEO-CHECK
═══════════════════════════════════════════════════════════════════

Prüfe alle harten Kriterien. Tabelle:

| Kriterium | Status (✓/✗/⚠) | Feedback |
|-----------|----------------|----------|
| Primary Keyword in H1 | | |
| Primary Keyword in erste 100 Wörter | | |
| Primary Keyword in mindestens 1 H2 | | |
| Primary Keyword in Meta Description | | |
| Secondary Keywords verteilt | | (Liste pro Keyword mit Zählung) |
| Interne Links eingebaut | | (alle vs teilweise vs keine) |
| Word Count im Soll-Bereich | | |
| H1 genau 1x | | |
| H2-Hierarchie logisch | | |
| FAQ-Sektion vorhanden (wenn sinnvoll) | | |
| Alt-Text-Hinweise bei Bildern | | |

SEO-Stärken: [Liste]
SEO-Schwächen: [Liste]
Fix-Empfehlungen konkret: [Liste mit Line-Refs wenn möglich]

═══════════════════════════════════════════════════════════════════
TEST 4: FILLER-CHECK
═══════════════════════════════════════════════════════════════════

Frage: Welche Sätze tragen weder neue Information noch neue Emotion?

Methode:
- Gehe Satz für Satz durch
- Streiche Sätze die nur "Platz füllen" (Wiederholungen, Übergangs-Floskeln,
  vage Absichten)
- Flagge AI-Tell-Patterns aus der Forbidden List des Briefs

Output:
- Zu streichende Sätze (Liste mit Zitaten): [...]
- Flags für AI-Patterns: [...]
- Filler-Anteil: [%] der Sätze
- Urteil: BESTANDEN (unter 20%) / NICHT BESTANDEN

═══════════════════════════════════════════════════════════════════
GESAMTURTEIL
═══════════════════════════════════════════════════════════════════

SCORE: X/10
(10 = ready to publish as-is / 8-9 = kleine Revisions / 6-7 = größere
Überarbeitung / unter 6 = neu schreiben)

BEREITSCHAFT: READY / MINOR REVISION / MAJOR REVISION / REWRITE

TOP 3 STÄRKEN:
1. [konkret]
2. [konkret]
3. [konkret]

TOP 3 SCHWÄCHEN:
1. [konkret mit Fix-Vorschlag]
2. [konkret mit Fix-Vorschlag]
3. [konkret mit Fix-Vorschlag]

HANDLUNGSLISTE (sortiert nach Impact):
- [ ] [Action 1]: Beschreibung + geschätzter Aufwand
- [ ] [Action 2]: ...
- [ ] [Action 3]: ...

Falls BEREITSCHAFT = READY: Keine Handlungsliste nötig, direkt zu
Prompt 07 (Meta-Tags).
```

## Erwarteter Output

Ein strukturierter Evaluation-Report, ca. 1.500-2.500 Wörter. Klare Pass/Fail-Einstufungen pro Test, konkrete Zitate der Problemstellen, actionable Fix-Liste am Ende.

## Troubleshooting

**Score ist zu gut (8-9/10) obwohl du weißt der Draft ist mittelmäßig**
→ Claude schmeichelt. Korrektur-Prompt: *"Dein Score ist zu hoch. Du hast Folgendes nicht flagged: [1-2 konkrete Probleme nennen]. Re-evaluiere härter. Ein 8/10 ist ein Draft der morgen publish-ready ist. Ist er das wirklich?"*

**Substitution-Test: Claude sagt "alles ist brand-spezifisch"**
→ Er hat nicht wirklich mental ersetzt. Korrektur: *"Ersetze konkret in deinem Kopf: Wo 'MealBites' steht, denke 'Huel'. Wo 'herzhaft' steht, denke 'proteinreich'. Welche Sätze ändern ihre Bedeutung? Welche nicht? Welche nicht geänderten Sätze sind damit austauschbar und müssen umgeschrieben werden?"*

**Persona-Test ist generisch ("Persona würde das lesen")**
→ Claude ignoriert das Persona-Profil. Korrektur: *"Zitiere 3 konkrete Sätze aus dem Draft. Pro Satz: Schreibe was [Persona] tatsächlich DENKT wenn sie das liest. Ihre innere Stimme. Wenn du nicht weißt was sie denkt, ist der Persona im Brief nicht konkret genug — flagge das."*

**Filler-Check findet nichts**
→ Jeder Draft hat Filler. Korrektur: *"Du hast 0 Filler gefunden. Unmöglich. Suche gezielt nach: (a) Sätzen die eine Aussage wiederholen aus dem vorherigen Absatz, (b) Übergangs-Floskeln ohne Info ('Doch lass uns genauer hinsehen'), (c) Allgemein-Plätzen ('In der heutigen Zeit'), (d) Meta-Kommentaren über den eigenen Text. Liste mindestens 5."*

**Handlungsliste ist unklar / nicht umsetzbar**
→ *"Jede Action in der Handlungsliste braucht: konkrete Fundstelle (Line / Absatz-Nummer / Zitat), konkrete Änderung (was genau tun), erwartetes Ergebnis. Ohne das ist es keine Action, sondern ein Vorschlag. Re-format."*

## Nächste Phase

**Bei READY:** → `07-meta-tags.md`

**Bei MINOR REVISION:** → Fixes einbauen (manuell oder Claude), erneut evaluieren, dann 07

**Bei MAJOR REVISION:** → Draft in gleicher Session überarbeiten lassen (*"Arbeite die Handlungsliste ab. Liefere den revidierten Draft."*), dann NEU evaluieren in neuer Session

**Bei REWRITE:** → Zurück zu Prompt 05. Der Brief war vielleicht zu schwach — checken. Oder der Opportunity-Angle passte nicht — SERP-Analyse überprüfen.

**Härte-Test:** Ein Draft sollte selten beim ersten Durchlauf READY sein. Wenn Claude dir das öfter sagt, ist der Evaluations-Prompt zu weich. Füge hinzu: *"Sei strenger als beim letzten Mal. Ein READY-Draft hat keine Substitution-Test-Verstöße, unter 10% Filler, alle SEO-Kriterien, und mindestens 85% Persona-Bestehensrate."*
