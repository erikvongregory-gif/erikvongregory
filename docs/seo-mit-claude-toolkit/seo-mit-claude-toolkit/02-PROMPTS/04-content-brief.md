# Prompt 04 — Content Brief (Master-Brief)

## Wann verwenden

**Einmal pro Brand.** Das ist kein Per-Artikel-Brief, sondern der Master-Brief. Alle deine Content-Drafts laufen gegen diesen Brief. Konsistenz über 50 Artikel wird hier gemacht oder gebrochen.

**Voraussetzungen:**
- Brand Voice ist definiert (oder zumindest in deinem Kopf)
- Zielperson ist definiert (sehr konkret, nicht demografisch)
- Du kennst deine "Feinde" (Wettbewerber, aber auch kulturelle Zustände gegen die du kämpfst)
- Du weißt was du NICHT behaupten darfst (legale / faktische Constraints)

## Was der Prompt tut

Claude baut dir einen **Master-Content-Brief** mit:
- Voice-Definition (mit echten Beispiel-Passagen)
- Persona-Profil (inkl. "was lässt sie die Augen verdrehen")
- Feind-Definition (was du bekämpfst, konzeptionell)
- Kommunikations-Sequenz (in welcher Reihenfolge Argumente kommen)
- Forbidden Words & Patterns (Wortliste + AI-Tell-Patterns)
- Depth-Protocol (6 Regeln die jeder Draft bestehen muss)
- Proof-Constraints (was du claimen darfst, was nicht)

Dieser Brief ist das wichtigste Einzeldokument im gesamten Workflow. Wenn er gut ist, sind 50 Drafts brand-konsistent. Wenn er schlecht ist, bekommst du 50 AI-Textbausteine.

## Input den du gibst

Das ist der aufwendigste Input im ganzen Toolkit. Plan 30-60 Min für Input-Sammlung ein.

**1. Voice-Referenzen (5-10 echte Passagen)**
Texte die du schon geschrieben hast (Landing Page, Instagram-Bio, Founding Story, E-Mail an Kunden) die "klingen wie deine Brand". Nicht beschreiben — zeigen.

**2. Persona (sehr konkret)**
Name. Alter. Stadt. Beruf. Tagesablauf. Was sie kauft, was sie nie kaufen würde. Was sie nachts googelt. Was sie nervt wenn sie es liest.

**3. Der "Feind"**
Nicht dein Wettbewerber. Ein Zustand. Ein Muster. Ein kulturelles Problem. Beispiel: Für eine Focus-App wäre der Feind nicht "Headspace" — der Feind ist "der Reflex, das Handy anzufassen".

**4. Forbidden List**
Wörter die du nie nutzt. Phrasen die dich nervt bei anderen. Tonalitäten die deine Brand nicht ist.

**5. Claim-Liste**
Was du faktisch behaupten kannst (mit Beweis). Was du nicht behaupten darfst (weil kein Beweis).

## Der Prompt

```
Du bist ein Senior Brand Voice Architect. Du baust Master-Briefs für
Content-Teams, die über 50+ Artikel hinweg eine kohärente Marke-Stimme
halten müssen.

KONTEXT:
- Brand: [Brand-Name]
- Kategorie: [z.B. "D2C Savory Snack-Meal"]
- Brand-Kernversprechen: [1 Satz]
- Kommunikationssprache: [Deutsch du-Form / Englisch informal / etc.]

VOICE-REFERENZEN (5-10 Passagen):
[Hier fügst du deine echten Texte ein, jeweils als Block-Zitat]

PERSONA (konkret):
[Deine detaillierte Persona-Beschreibung, 5-10 Sätze]

FEIND (konzeptionell):
[Nicht der Wettbewerber — der kulturelle / psychologische Zustand gegen
den deine Brand kämpft, 3-5 Sätze]

FORBIDDEN LIST:
- Wörter die nie vorkommen: [Liste]
- Phrasen die nie vorkommen: [Liste]
- Tonalitäten die nie sind: [Liste]

PROOF-CONSTRAINTS:
Was ich claimen KANN (mit Beweis):
[Liste deiner faktischen Proof Points]

Was ich NICHT claimen kann (noch keine Daten):
[Liste der Platzhalter-Claims]

AUFGABE:
Baue einen Master-Content-Brief mit folgender Struktur. Sei konkret,
nicht abstrakt. Jede Regel muss umsetzbar und überprüfbar sein.

DER BRIEF MUSS ENTHALTEN:

1. VOICE-REFERENZ-ANALYSE
   Aus den 5-10 Passagen extrahiere:
   - Satz-Architektur-Muster (Länge, Rhythmus, Satzbau)
   - Lexikalische Eigenheiten (welche Worte tauchen immer auf?)
   - Emotionale Signatur (was ist der emotionale Kern?)
   - Ironie-Level / Ernst-Level
   - Anrede-Haltung (augenhöhe / autoritär / vertraut)

2. PERSONA-PROFIL (vollständig ausformuliert)
   - Konkrete Details (Beruf, Tagesablauf, Käufe)
   - Was sie erkennt als "meins" (Nod-Trigger)
   - Was sie erkennt als "nicht meins" (Eyeroll-Trigger)
   - Desk-Test: Was würde sie auf ihrem Schreibtisch liegen lassen
     vs. verstecken?

3. FEIND-DEFINITION
   - Als Konzept (nicht als Brand)
   - Seine "innere Stimme" (was sagt der Feind in ihrem Kopf?)
   - Sein Mechanismus (wie greift er zu?)
   - Tonale Regel: Wie redest du über den Feind (empathisch /
     mitleidsvoll / nie aggressiv)?

4. KOMMUNIKATIONS-SEQUENZ
   Die verpflichtende Reihenfolge in JEDEM Content-Piece:
   (Beispiel-Struktur, passe an deine Brand an)
   1. Problem-State erkennen (Leser sieht seinen Moment)
   2. Frustration spiegeln (innere Stimme)
   3. Kategorie / Lösung definieren
   4. Produkt als natürlicher Anker (nicht Pitch)
   Niemals: Produkt zuerst, Lösung zuerst, Claim zuerst

5. BRAND-OWNED WORDS
   3-5 Wörter die deine Brand besitzt. Diese werden NIE ersetzt durch
   Synonyme. Jeder Content-Draft muss mindestens 2 davon natürlich
   einsetzen.

6. VERBOTEN-LISTE (Full)
   A. Syntax-Verbote (z.B. "keine em-dashes")
   B. Wort-Verbote (Liste)
   C. AI-Tell-Patterns (instant detection):
      - "In today's fast-paced world"
      - "Let's dive in"
      - "Whether you're X or Y"
      - "Unlock / Leverage / Harness"
      - (erweitere spezifisch für meine Brand)
   D. Format-Verbote (z.B. "max 1 Ausrufezeichen pro 500 Wörter")

7. DEPTH-PROTOCOL (6 Regeln die jeder Draft bestehen muss)
   Regel 1: Substitution-Test
      Wenn ich "[meine Brand]" durch "[Wettbewerber]" ersetze — funktioniert
      der Text noch? Wenn ja: zu generisch, umschreiben.
   Regel 2: Persona-Filter
      Würde [Persona] bei diesem Satz nicken oder Augen verdrehen?
   Regel 3: Problem-First
      Der Draft folgt der Kommunikations-Sequenz. Niemals Produkt zuerst.
   Regel 4: No-Filler
      Jeder Satz trägt Information oder Emotion. Sätze die beides nicht tun
      werden gestrichen.
   Regel 5: Concreteness Beats Abstraction
      "13:30, Meeting in 20 Minuten" schlägt "stressiger Arbeitsalltag"
   Regel 6: Tonality-Balance
      [Brand-spezifische Mischung, z.B. 70% ruhig-kompetent + 30% neugierig-ironisch]

8. PROOF-CONSTRAINTS
   Was claimbar ist (mit Evidence):
   [Liste aus Input]

   Was mit Platzhalter markiert werden muss:
   [TESTIMONIAL-PLATZHALTER: ...] etc.

   Was NIE fabriziert wird:
   - Statistiken ohne Quelle
   - Expert-Endorsements die nicht existieren
   - Spezifische Test-Ergebnisse ohne Daten

9. COPY-VALIDATION-GATES (vor Publish)
   Jeder Satz muss durch 5 Tests:
   1. Visualisierbar? (Kann Persona eine Szene sehen?)
   2. Falsifizierbar? (Könnte jemand widersprechen?)
   3. Exklusiv? (Nur meine Brand würde das sagen?)
   4. Klarheits-Test? (Versteht Nicht-Experte sofort?)
   5. Register-Check? (Würde ein echter Mensch das so sagen?)

10. FORMAT-VORGABEN
    - Markdown oder HTML
    - Meta-Description als Kommentar oben
    - Sprach-Form (Du / Sie / Englisch informal)
    - Interne Links als Markdown-Links
    - Platzhalter klar markiert

OUTPUT-FORMAT:
Ein einzelnes Markdown-Dokument, klar strukturiert mit Überschriften
für jede der 10 Sektionen. Ziel-Länge: 2.500-4.000 Wörter. Dieses
Dokument wird Grundlage für JEDEN Content-Draft.

Der Brief ist kein Inspirationstext. Er ist Arbeitsanweisung. Schreibe
ihn als Handlungsanweisung, nicht als Essay.
```

## Erwarteter Output

Ein ~3.000-4.000 Wörter Master-Brief, strukturiert in 10 Sektionen. Das ist das Dokument, das du ab jetzt in JEDEN Content-Draft-Prompt oben anhängst (Prompt 05).

## Troubleshooting

**Voice-Analyse ist zu vage ("die Stimme ist modern und authentisch")**
→ Du hast zu wenige oder zu beliebige Voice-Referenzen gegeben. Korrektur: *"Review deine Voice-Analyse. Beliebige Worte wie 'modern', 'authentisch' sind verboten. Konkret werden: 'Satzlänge 4-12 Wörter', 'Verbs dominieren Adjektive', 'zweite Person Präsens im Moment-Kontext'."*

**Persona ist demografisch ("28-35, urban, gesundheitsbewusst")**
→ Du hast zu wenig Persona-Input gegeben. Nachladen: *"Erweitere Persona um: 1 Szene aus ihrem Dienstag-Nachmittag, 3 Marken die sie kauft, 3 Marken die sie verachtet, 1 Satz den sie selbst denkt aber nie laut sagen würde."*

**Depth-Protocol ist kopiert aus dem Prompt, nicht adaptiert**
→ Das ist OK als Startpunkt. Aber die 6 Regeln müssen mit deinen Brand-Spezifika unterfüttert werden. Manuell erweitern nach dem Run.

**AI-Tell-Patterns sind generisch**
→ Claude listet die Standard-5. Erweiterung: *"Gib mir 15 AI-Tell-Patterns die spezifisch für meine Branche problematisch sind. Denke an Wellness-Blog-Phrasen, FMCG-Marketing-Klischees, LinkedIn-Thoughtleader-Sprech."*

## Nächste Phase

→ Dieser Brief wird an JEDEN Content-Draft-Prompt oben angehängt
→ `05-draft-content.md` nutzt den Brief als Input
→ `06-evaluate-content.md` nutzt den Brief als Evaluations-Grundlage

**Wichtig:** Der Brief ist lebendiges Dokument. Nach jedem geschriebenen Artikel: Was hat Claude falsch interpretiert? Das klarstellen im Brief. Nach 5-10 Artikeln ist der Brief tight. Danach ändert sich selten etwas.

**Versionierung:** Speichere jede Brief-Version mit Datum. Wenn ein alter Artikel umgeschrieben werden muss, willst du wissen gegen welche Brief-Version er ursprünglich geschrieben wurde.
