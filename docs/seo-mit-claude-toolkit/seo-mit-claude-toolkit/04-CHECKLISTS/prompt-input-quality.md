# Checklist — Prompt Input Quality

## Wozu

90% der schlechten AI-Outputs sind das Resultat von schlechten Inputs, nicht von schlechten Prompts oder schlechten Modellen. Diese Checkliste prüft DEINEN Input bevor du auf Send drückst.

5 Min pro Prompt. Spart dir 30+ Min Korrektur-Schleifen.

## Allgemein für jeden Prompt

- [ ] **Rolle definiert** — Claude weiß, in welcher Rolle er arbeitet ("Du bist Senior X")
- [ ] **Kontext geliefert** — Brand, Kategorie, Ziel sind klar (nicht angenommen)
- [ ] **Aufgabe explizit** — was genau soll Claude tun (Verb am Anfang, klar abgegrenzt)
- [ ] **Output-Format spezifiziert** — Markdown? Tabelle? Liste? Word Count? Sektionen?
- [ ] **Constraints benannt** — was darf NICHT vorkommen (Forbidden Patterns, Max-Länge, etc.)
- [ ] **Beispiel oder Referenz** — wenn möglich, ein konkretes Beispiel was du erwartest
- [ ] **Erwartete Tiefe** — soll Claude oberflächlich oder tief gehen (Wörter / Sektionen / Detail-Level)

## Brand-bezogen (für Brief- und Content-Prompts)

- [ ] **Brand-Name** korrekt geschrieben
- [ ] **Brand-Kategorie** in 1 Satz beschrieben (nicht "wir machen Snacks" — sondern "D2C savory snack-meal")
- [ ] **Brand-Kernversprechen** in 1 Satz
- [ ] **Brand-Tonalität** in 1-2 Sätzen ODER Voice-Referenz mit Original-Text
- [ ] **Persona** benannt (Name, Alter, Beruf, 1 konkreter Wochentags-Moment)
- [ ] **Was die Brand NICHT ist** explizit ausgeschlossen
- [ ] **Forbidden List** mitgeliefert (Wörter / Phrasen / Tonalitäten die nie vorkommen)

## SEO-bezogen (für Recherche- und Draft-Prompts)

- [ ] **Primary Keyword** explizit benannt (1 Keyword, nicht 5)
- [ ] **Secondary Keywords** als Liste (2-5 verwandte)
- [ ] **Buyer-Journey-Stage** benannt (1, 2, 3 oder 4)
- [ ] **Word-Count-Ziel** als Range (z.B. 1.500-2.000)
- [ ] **Wettbewerb-Kontext** (Top 3 SERP-URLs als Referenz, oder grobe SERP-Beschreibung)
- [ ] **Interne Links** die eingebaut werden sollen (URL + Anker-Text)
- [ ] **CMS** benannt (Shopify / WordPress / Webflow / etc.)

## Voice-Referenzen (für Brief-Prompts)

- [ ] Mindestens **5 echte Text-Passagen** als Referenz (nicht beschrieben, sondern gezeigt)
- [ ] Passagen sind **divers** (Landing Page, Email, Social, Founding Story — nicht alle vom gleichen Touchpoint)
- [ ] Passagen sind **wirklich gut** (nicht "die ersten 5 die ich gefunden habe" — sondern bewusst ausgewählt)
- [ ] Pro Passage **Kontext** (woher stammt sie, an wen gerichtet, warum repräsentativ)

## Persona-Beschreibung (für Brief- und Content-Prompts)

- [ ] **Name** (auch erfunden ist ok — gibt mentale Anker)
- [ ] **Alter, Beruf, Stadt** (konkret, nicht Range)
- [ ] **1 konkreter Mikro-Moment** aus ihrem Tag (13:30 Dienstag, sie macht X)
- [ ] **3 Marken die sie kauft** (zeigt Kategorie-Verständnis)
- [ ] **3 Marken die sie verachtet** (zeigt Anti-Werte)
- [ ] **Was sie nachts googelt** (zeigt latente Sorgen)
- [ ] **Was sie nervt wenn sie es liest** (Anti-Tonalitäten)
- [ ] **Was sie auf ihrem Schreibtisch liegen lassen würde** vs. verstecken (Identitäts-Test)

## Self-Diagnose

Wenn deine letzten 3 Outputs schlecht waren — pro Output die Frage:

1. **War mein Input vollständig?** (Brand-Kontext, Persona, Constraints, Format)
2. **War der Input konkret?** (Beispiele statt Beschreibungen)
3. **Habe ich Forbidden Patterns benannt?** (Wenn nein — Claude default-rutscht in AI-Tells)
4. **Habe ich Output-Format vorgegeben?** (Wenn nein — Claude wählt blind)
5. **Habe ich Constraints gesetzt?** (Word Count, Tonalität, Was nicht vorkommen darf)

Wenn du auf 3+ Fragen "Nein" hast: nicht der Prompt war schlecht, dein Input war es.

## Anti-Pattern-Liste (was du NIE in einen Prompt schreibst)

- "Sei kreativ" — bedeutungslos. Stattdessen: "Liefere 3 strukturell unterschiedliche Optionen."
- "Mach es gut" — bedeutungslos. Stattdessen: konkrete Pass-Kriterien benennen.
- "Schreibe einen Artikel über X" — zu weit. Stattdessen: Format, Länge, Stage, Persona, Angle benennen.
- "Wie würdest du..." — Claude antwortet mit Meinung, nicht mit Output. Stattdessen: "Liefere..."
- "Ich brauche..." → besser "Liefere..." (Verb am Anfang, klare Aufgabe).

## Faustregel für Input-Länge

| Aufgabe | Soll-Input-Länge |
|---------|------------------|
| Quick-Aufgabe (1 Title-Tag) | 100-300 Wörter |
| Single-Section Output (Meta-Tags) | 200-500 Wörter |
| Standard-Draft (1 Artikel) | 500-1.000 Wörter Input + Master-Brief |
| Master-Brief erstellen | 1.500-3.000 Wörter Input |
| Komplexe Recherche / Strategie | 2.000-5.000 Wörter Input |

Wenn dein Input deutlich kürzer ist als das Soll: Output wird unterspezifiziert. Wenn deutlich länger: Output wird zerfasert.

## Test deiner Input-Qualität

Bevor du auf Send drückst:

1. **Verständnis-Test:** Würde ein neuer Mitarbeiter den Prompt nach 5 Min Lesen umsetzen können?
2. **Eindeutigkeits-Test:** Gibt es Stellen die mehrere Interpretationen erlauben? Schließe sie.
3. **Constraint-Test:** Wenn ich nichts verbiete, wird Claude Defaults nehmen. Was sind meine Defaults — passen die zu meinem Output-Wunsch?
4. **Beispiel-Test:** Habe ich mindestens 1 konkretes Beispiel mitgegeben (von Persona, Voice, Output-Form)?

Wenn alle 4 grün: Send. Wenn 1+ rot: Input nachschärfen vor Send.
