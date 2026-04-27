# Prompt 03 — SERP Analysis

## Wann verwenden

Nach der Keyword-Research. Pro Keyword aus Tier 1 und Tier 2 machst du eine SERP-Analyse. Das ist der Schritt den 90% der SEO-Workflows überspringen — und genau der Schritt, der den Unterschied macht zwischen "rankt nicht" und "rankt Top 5".

**Voraussetzungen:**
- Claude mit WebSearch aktiviert
- 1 Keyword (pro Run — nicht batchen, Qualität leidet)
- Idealerweise: Screenshot der SERP oder zumindest Top 10 URLs manuell kopiert

## Was der Prompt tut

Claude analysiert die **Top 5-10 Ergebnisse** für dein Keyword auf:
- Content-Typ (Guide / Listicle / Product / Comparison / How-to)
- Content-Länge (Word Count der ranken Seiten)
- Format-Muster (Was haben alle gemeinsam?)
- **Schwachstellen** (Was FEHLT bei allen?)
- Dein **Opportunity Angle** (Wo gewinnst du?)

Der Gold-Nugget-Teil ist Schritt 3: **Gemeinsame Blind Spots**. Dort rankst du.

## Input den du gibst

1. **Das Keyword** (ein einziges)
2. **Markt** (DACH / USA / etc.)
3. **Deine Brand in 2 Sätzen** (damit Claude den Opportunity-Angle matchen kann)
4. **Dein Differenziator** (was du hast was andere nicht haben)

## Der Prompt

```
Du bist ein Senior SEO Content Strategist. Du analysierst SERPs nicht
um sie zu kopieren, sondern um die Lücken zu finden.

KONTEXT:
- Keyword: [dein Keyword]
- Markt: [DACH / USA / UK / etc.]
- Meine Brand: [2 Sätze]
- Mein Differenziator: [1-2 Sätze — was du hast was andere nicht haben]

AUFGABE:
Führe eine tiefe SERP-Analyse durch und finde den Opportunity-Angle
für diese Brand.

METHODE:

Schritt 1 — SERP-Snapshot
Führe eine Google-Suche für das Keyword durch (Markt-spezifisch).
Liste die Top 10 Ergebnisse mit:
- Position
- Domain
- Content-Typ (Guide / Listicle / Product / How-to / Comparison / News / Video)
- Geschätzte Content-Länge (Wörter)
- Format (Table / Bullets / Long-form / Q&A / Step-by-step)
- Rich Snippets (Featured Snippet / FAQ / Video / Images / Sitelinks)

Notiere auch:
- Gibt es Ads? Wie viele? (= kommerzielles Volumen)
- People Also Ask Fragen (alle listen)
- Related Searches am Ende der SERP

Schritt 2 — Muster-Erkennung
Finde 3-5 Muster die in den Top 5 wiederkehren:
- Gemeinsame Content-Struktur?
- Gemeinsame Länge?
- Gemeinsame Hooks / Intros?
- Gemeinsame Unterthemen?
- Gemeinsame Quellen / Experten?
- Gemeinsame CTAs?

Das Muster ist was Google für dieses Keyword "will".

Schritt 3 — Schwachstellen-Analyse (KRITISCH)
Finde 3-5 Dinge die in den Top 5 FEHLEN:
- Welche Perspektive wird nicht abgedeckt?
- Welche Unterfragen werden oberflächlich behandelt?
- Welche Proof-Punkte haben alle nicht?
- Welcher Ton fehlt (z.B. alle sind "neutral-informativ" — wo ist "persönlich-scharf"?)
- Welche Format-Erweiterung (Video / Comparison Table / Rechner) hat keiner?
- Welche Zielgruppe wird nicht direkt angesprochen?

Dies ist der wichtigste Schritt. Sei gründlich. Die Lücke ist dein Einfallstor.

Schritt 4 — Opportunity-Angle für meine Brand
Basierend auf Schritt 3 und meinem Differenziator:
- Welcher Blind Spot passt zu meiner Brand-Stärke?
- Welches Format würde ich empfehlen (nicht Top 5 kopieren — Top 5 schlagen)
- Welche Word-Count-Range (gleich lang, kürzer-schärfer, oder länger-umfassender)?
- Welchen Hook würde ich bauen?
- Welche 3-5 Unter-H2s wären mein Content?

Schritt 5 — Ranking-Realismus
Bewerte ehrlich:
- Realistische Ranking-Chance (Grün = Top 5 in 3 Monaten / Gelb = Top 10 in 6 Monaten / Rot = Top 20 nach 12 Monaten)
- Nötige Backlink-Menge grob geschätzt
- Ist das ein SEO-Keyword oder ein PPC-Keyword?

OUTPUT-FORMAT:

1. SERP-Snapshot Tabelle (Top 10)
2. Erkannte Muster (Liste von 3-5)
3. Gemeinsame Blind Spots (Liste von 3-5, das ist der Kern)
4. Mein Opportunity-Angle (1 Absatz, konkret)
5. Content-Spezifikation:
   - Format (z.B. "Hybrid Guide: 70% Science, 30% Product-Comparison")
   - Word-Count Range
   - Hook-Vorschlag (2-3 Varianten)
   - H2-Struktur (5-8 Unter-H2s)
   - CTA-Strategie
6. Ranking-Realismus (Grün/Gelb/Rot + Zeithorizont + Warum)

Sei scharf. Wenn alle Top-5-Ergebnisse bullshit sind (oberflächlich,
austauschbar), sag das. Wenn das Keyword für deine Brand nicht winnable
ist, empfiehl Alternativen.
```

## Erwarteter Output

Pro Keyword ca. 1.500-2.500 Wörter Analyse. Der Kernwert liegt in Schritt 3 (Blind Spots) und Schritt 4 (Opportunity-Angle). Alles andere ist Dokumentation.

**Beispiel-Struktur des Outputs:**

```markdown
## Keyword: [dein Keyword]

### SERP-Snapshot
| Pos | Domain | Typ | Länge | Format | Rich Snippets |
|-----|--------|-----|-------|--------|---------------|
| 1 | ... | ... | ... | ... | ... |

### Erkannte Muster
1. Alle Top-5 sind Listicles mit 10-15 Items
2. Alle fokussieren auf Ernährungs-Tipps, keiner auf Zeit-Management
3. Keine nutzt konkrete Produkt-Beispiele
...

### Blind Spots (Dein Einfallstor)
1. Niemand löst das Problem aus der Perspektive von [deine Persona]
2. Niemand verbindet [Thema A] mit [Thema B]
3. Alle empfehlen DIY — niemand addressiert Convenience
...

### Dein Opportunity-Angle
[Konkreter Vorschlag für deinen Winkel]

### Content-Spezifikation
- Format: ...
- Länge: 2.000-2.500 Wörter
- Hook (Variante A): "..."
- Hook (Variante B): "..."
- H2-Struktur: ...

### Ranking-Realismus: GELB
Top 10 in 6 Monaten, Backlinks nötig: 5-10. Grund: ...
```

## Troubleshooting

**Claude listet nur 3 Muster, alles oberflächlich**
→ Prompt härten: *"Dein Muster-Output ist zu dünn. Geh zurück, lies die Top 5 Seiten vollständig durch (WebFetch), finde 5 konkrete Muster. Jedes Muster muss mit einem Zitat / Beispiel aus den Seiten belegt sein."*

**Blind Spots sind alle "niemand nennt [deine Brand]" — nutzlos**
→ Claude ist faul. Korrektur: *"Blind Spots müssen auf Inhaltsebene sein, nicht auf Marken-Ebene. Welche Perspektiven, Daten, Formate, Zielgruppen-Ansprachen fehlen allen Top-5? 'Keine Brand-Erwähnung' ist kein Blind Spot."*

**Opportunity-Angle ist beliebig / generisch**
→ Claude nutzt deinen Differenziator nicht. Ergänze im Prompt: *"Der Opportunity-Angle muss EXPLIZIT meinen Differenziator aus dem Kontext aufgreifen. Wenn ich 'herzhaft' habe, und der Blind Spot ist 'alle reden über süße Snacks' — dann ist das dein Angle."*

**Ranking-Realismus ist zu optimistisch (alles Grün)**
→ Claude will gefallen. Korrektur: *"Sei brutal ehrlich. Wenn die Top 5 alle DR 80+ Sites sind (große Medien, Bundesinstitute), ist Grün unrealistisch. Gib mir Realität, keine Motivation."*

## Nächste Phase

→ Wiederhole diesen Prompt für alle Tier-1 und Tier-2 Keywords (aus Prompt 02)
→ Sammle alle Opportunity-Angles in einem Content-Plan
→ Danach: `04-content-brief.md` — der Master-Brief für alle Drafts

**Zeitaufwand-Realismus:** Pro Keyword 20-30 Minuten (inkl. Claude-Run + dein Review). Bei 10 Keywords also 3-5 Stunden. Das ist teure Arbeit, aber sie determiniert alle 10 Drafts danach.
