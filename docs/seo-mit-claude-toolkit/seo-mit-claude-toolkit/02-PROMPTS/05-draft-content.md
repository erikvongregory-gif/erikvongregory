# Prompt 05 — Draft Content

## Wann verwenden

Sobald der Master-Brief (Prompt 04) steht UND du eine SERP-Analyse für das konkrete Keyword hast (Prompt 03). Ohne beide: nicht anfangen. Der Draft wird dann generisch.

**Voraussetzungen:**
- Master-Content-Brief als Dokument (paste-ready)
- SERP-Analyse für dieses eine Keyword (Opportunity-Angle, Format, Länge, H2-Struktur)
- 1-2h Zeit (Claude 20-30 Min, dein Review 30-60 Min)

## Was der Prompt tut

Claude schreibt dir den **kompletten Draft** eines Content-Pieces, der gegen deinen Brief geprüft wurde. Kein generischer AI-Text — ein Draft der deine Brand Voice trägt, deine Persona adressiert, den Opportunity-Angle bedient, und SEO-technisch sauber ist.

Der Trick: **Der Brief kommt in den Prompt VOR der Aufgabe.** Nicht danach, nicht als Anhang. Claude muss den Brief internalisieren bevor er schreibt.

## Input den du gibst

1. **Master-Content-Brief** (komplett, als langer Input)
2. **SERP-Analyse für dieses Keyword** (aus Prompt 03)
3. **Target-Keyword** (Primary + 2-3 Secondary)
4. **Word-Count-Ziel** (aus SERP-Analyse — meist 1.500-2.500)
5. **Interne Links** die eingebaut werden sollen (2-5 URLs + Anker-Text)

## Der Prompt

```
Du bist ein Senior Content Writer, spezialisiert auf Brand-konsistenten
SEO-Content. Du arbeitest strikt gegen einen Master-Brief.

═══════════════════════════════════════════════════════════════════
MASTER-BRIEF (VERPFLICHTEND — lies vollständig bevor du schreibst)
═══════════════════════════════════════════════════════════════════

[HIER DEN KOMPLETTEN BRIEF AUS PROMPT 04 EINFÜGEN]

═══════════════════════════════════════════════════════════════════
ENDE MASTER-BRIEF
═══════════════════════════════════════════════════════════════════

SERP-INSIGHTS (aus vorheriger Analyse):
- Keyword: [Primary Keyword]
- Secondary Keywords: [2-3 verwandte]
- Gewählter Opportunity-Angle: [aus Prompt 03, Schritt 4]
- Zielformat: [Guide / Listicle / Hybrid / etc.]
- Word-Count-Ziel: [Range]
- H2-Struktur (grobe Vorgabe): [aus SERP-Analyse]
- Gemeinsame Blind Spots in der SERP: [was alle Top-5 nicht tun]

INTERNE LINKS (verpflichtend einzubauen):
- [URL 1] als Anker: "[Anker-Text]"
- [URL 2] als Anker: "[Anker-Text]"
- [URL 3] als Anker: "[Anker-Text]"

AUFGABE:
Schreibe den kompletten Content-Draft. Dieser Draft muss alle 6 Regeln
des Depth-Protocols bestehen (siehe Master-Brief).

BEVOR DU SCHREIBST — interner Check (nicht ausgeben, aber durchführen):
1. Habe ich den Master-Brief wirklich verstanden?
2. Welche 3 Brand-Owned Words werde ich natürlich einbauen?
3. Welche 3 Sätze beweisen meinen Opportunity-Angle?
4. Welche 3 Sätze würde Persona SOFORT als "nicht meins" abstempeln —
   und habe ich sie vermieden?
5. Folgt meine Struktur der Kommunikations-Sequenz aus dem Brief?

DANN SCHREIBE DEN DRAFT:

FORMAT:
<!-- Meta: [Meta-Description 140-160 Zeichen] -->

# [H1 mit Primary Keyword]

[Intro-Absatz: 2-4 Sätze. Folgt Kommunikations-Sequenz. Konkret.
Problem-State erkennen, nicht Produkt.]

## [Erstes H2]

[Content...]

## [Zweites H2]

[Content...]

## [Drittes H2]

[Content...]

## [FAQ-H2 falls sinnvoll]

**[Frage 1]**
[Antwort, 2-4 Sätze]

**[Frage 2]**
[Antwort, 2-4 Sätze]

## [Closing-H2]

[Natürlicher Übergang zur Produkt-/Service-Seite. Niemals "Kauf jetzt"-Hammer.]

---

NACH DEM DRAFT — liefere zusätzlich:

1. SELF-CHECK gegen Depth-Protocol:
   - Substitution-Test: Welche 2-3 Passagen würden auch für Wettbewerber
     funktionieren? (= Schwächen die nachgeschärft werden müssen)
   - Persona-Filter: Gibt es Sätze wo du unsicher bist ob Persona
     zustimmt? Liste sie.
   - Filler-Anteil: Wie viele Sätze hast du gestrichen bevor du den
     Draft ausgeliefert hast? (Soll-Wert: 10-20% des Rohtexts)

2. SEO-CHECK:
   - Primary Keyword in: H1 ✓/✗, erste 100 Wörter ✓/✗, mindestens
     ein H2 ✓/✗, Meta-Description ✓/✗
   - Secondary Keywords eingebaut? (Liste mit Zählung)
   - Interne Links eingebaut? (alle 3 ✓/✗)
   - Word-Count final: [Zahl]

3. OPEN QUESTIONS:
   - Welche Proof-Punkte hast du als [PLATZHALTER] gelassen (weil
     Evidence fehlt)?
   - Welche Stellen wären mit mehr Brand-Input besser?

WICHTIG:
- Niemals em-dashes (—) wenn der Brief sie verbietet
- Niemals AI-Tell-Patterns aus der Forbidden List
- Niemals Produkt zuerst
- Niemals Claims ohne Evidence (dann Platzhalter)
- Niemals "In today's [adj] world"
- Niemals "Let's dive in"
```

## Erwarteter Output

Du bekommst:

1. **Der Draft** — 1.500-2.500 Wörter, ready-to-review
2. **Self-Check** — Claudes eigene Einschätzung gegen den Brief
3. **SEO-Check** — explizite Keyword-Platzierung
4. **Open Questions** — wo du nachschärfen musst

Der Self-Check ist Gold. Claude ist der beste Kritiker seines eigenen Outputs, wenn du ihn explizit danach fragst. Er findet seine eigenen Schwächen.

## Troubleshooting

**Draft ist "gut geschrieben" aber generisch (Substitution-Test fällt durch)**
→ Häufigstes Problem. Korrektur: *"Identifiziere 5 Passagen die den Substitution-Test nicht bestehen würden. Schreibe diese 5 Passagen so um, dass sie nur für [meine Brand] funktionieren. Nutze konkrete Details aus dem Brief: Gründer-Story, Produktions-Detail, spezifische Tasting-Notes, echten Moment aus der Persona."*

**Draft klingt nach "Claude-Guide" (lauter Bullet Points, viel "Pro Tipp:")**
→ Claude fällt in seinen Default-Modus zurück. Korrektur: *"Schreibe den Draft um — in fließenden Absätzen, Scene-based, nicht Listen-basiert. Bullet Points NUR wo eine echte Aufzählung (5+ Items) sinnvoll ist. Kein 'Pro Tipp:'. Kein 'Wichtig:'. Lies den Brief erneut, Abschnitt 'Voice-Analyse'."*

**Draft nutzt Brand-Owned Words nicht**
→ Claude vergisst sie. Nachschärfen: *"Im Brief stehen 3 Brand-Owned Words: [X, Y, Z]. Dein Draft nutzt sie [Zahl] mal. Integriere sie mindestens 2x pro Brand-Word natürlich im Text."*

**Draft hat zu viele em-dashes / verbotene Phrasen**
→ Hardcore-Nachschärfen: *"Suche im Draft nach allen em-dashes. Ersetze durch Punkte oder Kommata. Suche nach 'In today's', 'Let's dive in', 'Whether you're'. Lösche / umschreibe. Zeige mir die Liste der Änderungen."*

**Draft ist zu kurz / zu lang**
→ *"Draft ist [X] Wörter, Ziel war [Y]. Kürze/Erweitere auf [Y]. Bei Kürzen: strenger Filler-Test pro Satz. Bei Erweitern: mehr Konkretheit, mehr Szenen, mehr Proof, NICHT mehr Floskeln."*

**Self-Check ist oberflächlich**
→ *"Dein Self-Check listet 2 Schwächen. Das ist zu wenig. Ein Draft dieser Länge hat 5-8 Schwächen. Sei härter mit dir selbst. Finde auch die Stellen die du nicht sehen WOLLTEST."*

## Nächste Phase

→ Nimm den Draft und lass ihn durch Prompt 06 (Evaluate Content) laufen — idealerweise in einer FRISCHEN Claude-Session, damit er seinen eigenen Draft mit Abstand evaluieren kann
→ Danach Revision auf Basis der Evaluation
→ Nach 2-3 Revisions: Ready to publish

**Workflow-Tipp:** Schreibe 3 Drafts nach dem Draft-Prompt. Dann 1 Tag Pause. Dann Evaluation. Die Pause macht die Evaluation schärfer — du siehst AI-Tells die dir direkt nach dem Schreiben nicht aufgefallen wären.
