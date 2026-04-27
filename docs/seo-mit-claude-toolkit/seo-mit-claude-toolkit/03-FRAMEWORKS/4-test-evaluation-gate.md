# Framework — 4-Test Evaluation Gate

## Wozu

Jeder AI-generierte Draft braucht eine Quality Gate vor Publish. 4 unabhängige Tests, die zusammen den Filter bilden zwischen "publishable" und "AI-Slop mit gutem Wortschatz".

Jeder Test fängt einen anderen Failure-Modus. Du brauchst alle 4. Einer alleine reicht nicht.

## Test 1 — Substitution

**Was er prüft:** Brand-Spezifität.

**Methode:** Ersetze in deinem Kopf "deine Brand" durch einen direkten Wettbewerber. Jeden Satz lesen und fragen "funktioniert noch?".

**Pass-Schwelle:** Unter 20% der Wörter sind generisch (= würden auch für Wettbewerber funktionieren).

**Fail-Modus den er fängt:** Generischer AI-Output der zwar gut geschrieben ist, aber keine Brand-Substanz hat. Häufigster Failure-Modus überhaupt.

**Wie ausführen:**
1. Pro Absatz: 2-3 Sätze auswählen
2. Mental ersetzen "Brand X" statt deine Brand
3. Notieren: Bricht der Sinn? Bleibt er gleich?
4. Zähl Wörter die "bleiben gleich" → das ist dein Generisch-Anteil

**Wenn Fail:** Korrektur-Prompt: *"Identifiziere die 5 generischsten Passagen. Schreibe sie um, sodass sie nur für [meine Brand] funktionieren. Nutze konkrete Brand-Spezifika aus dem Brief: Gründerstory, Produktion, Persona-Detail, Tonalität."*

## Test 2 — Persona

**Was er prüft:** Persona-Resonanz.

**Methode:** Lies den Draft mit Persona-Profil daneben. Pro Absatz: würde sie weiterlesen oder scrollen?

**Pass-Schwelle:** Über 80% der Absätze halten die Persona dran.

**Fail-Modus den er fängt:** Texte die "an niemanden" geschrieben sind. Generisch im Tonfall, ignorieren die spezifische Welt der Persona.

**Wie ausführen:**
1. Visualisiere Persona physisch (sie sitzt im Café, scrollt am Handy)
2. Pro Absatz: Was passiert in ihrem Gesicht? Nicken / Augen verdrehen / Stirnrunzeln / Weiterscrollen?
3. Markiere Scroll-Risiko-Passagen
4. Top-5 dieser Passagen dokumentieren

**Wenn Fail:** Korrektur-Prompt: *"Hier sind 5 Passagen die Persona zum Scrollen bringen: [Zitate]. Pro Passage: schreibe um, sodass Persona stattdessen nickt. Was würde sie SAGEN als sie das liest? Ihre innere Stimme."*

## Test 3 — SEO-Check

**Was er prüft:** Technische SEO-Grundlagen.

**Methode:** Tabelle mit harten Kriterien abhaken.

| Kriterium | Pass-Schwelle |
|-----------|---------------|
| Primary Keyword in H1 | Genau 1x, natürlich integriert |
| Primary Keyword in erste 100 Wörter | Mind. 1x |
| Primary Keyword in mind. 1 H2 | Ja |
| Primary Keyword in Meta-Description | Ja |
| Secondary Keywords verteilt | Pro Keyword mind. 1x |
| H1 genau 1x | Genau 1 |
| H2-Hierarchie logisch | Keine H3 ohne H2-Eltern |
| Interne Links eingebaut | Alle Soll-Links vorhanden |
| Word Count im Soll-Bereich | ±20% des SERP-Soll |
| Bilder mit Alt-Text geplant | Hinweise vorhanden |

**Pass-Schwelle:** Alle Kriterien grün, max 2 gelb.

**Fail-Modus den er fängt:** "Schöner Text" der SEO-technisch nicht performen kann. Häufig bei Drafts wo man sich nur auf Voice fokussiert hat.

**Wenn Fail:** Strukturelle Korrektur (nicht nur Wording). H1 fehlt? → einbauen. Keyword fehlt in Meta? → ergänzen. Links fehlen? → einarbeiten.

## Test 4 — Filler

**Was er prüft:** Substanz pro Satz.

**Methode:** Satz für Satz durchgehen. Frage: trägt dieser Satz Information ODER Emotion? Wenn beides nicht: streichen.

**Pass-Schwelle:** Filler-Anteil unter 15%.

**Fail-Modus den er fängt:** "Auffüller-Sätze" die Wortanzahl produzieren ohne Wert. Klassiker bei AI-Drafts: "Doch lass uns einen genaueren Blick werfen", "In der heutigen Zeit", "Es ist wichtig zu verstehen".

**Wie ausführen:**
1. Markiere Sätze mit Streich-Kandidaten
2. Pro Streich-Kandidat: einen Cover-Test machen. Streiche den Satz mental — wird der Text schlechter? Wenn nein: Filler.
3. Filler-Anteil = Filler-Sätze / Gesamt-Sätze

**Wenn Fail:** Korrektur-Prompt: *"Streiche folgende Sätze: [Zitate]. Liefere den Text neu, ohne diese Sätze, ohne sie durch andere Filler zu ersetzen. Der Text wird kürzer — das ist ok."*

## Wie die 4 Tests zusammen wirken

Jeder Test fängt einen Failure-Modus. Allein reicht keiner.

| Test | Fängt Failure | Was passiert wenn nur dieser Test läuft |
|------|--------------|------------------------------------------|
| 1 Substitution | Generizität | Brand-spezifisch aber vielleicht für Persona uninteressant |
| 2 Persona | Resonanz-Mangel | Persona-stark aber vielleicht generisch oder filler-haltig |
| 3 SEO | SEO-Schwäche | Rankt nicht — kein Test der Substanz |
| 4 Filler | Substanz-Verdünnung | Kompakt aber vielleicht generisch und SEO-schwach |

## Score-System

Nach 4 Tests vergibst du einen Score 1-10:

- **10:** Alle 4 Tests glatt bestanden, ready to publish as-is
- **8-9:** Alle Tests bestanden, kleine Revisions (Wording-Schliff, einzelne Filler-Sätze)
- **6-7:** 1-2 Tests Fail, größere Überarbeitung nötig
- **4-5:** 3 Tests Fail, REWRITE empfohlen, Brief checken
- **Unter 4:** Brief war zu schwach, oder Opportunity-Angle passt nicht — ZURÜCK an Brief / SERP-Analyse

## Häufige Fehler bei der Evaluation

**Fehler 1: Score zu hoch**

Claude (oder du selbst) gibt 8/10 obwohl Substitution-Test eigentlich Fail ist. Korrektur: Score muss durch Test-Detail begründet werden, nicht durch Bauchgefühl. Wenn 1 Test Fail → max 7. Wenn 2 → max 5.

**Fehler 2: Tests werden oberflächlich gemacht**

Substitution-Test wird "schnell durchgegangen". Persona-Test ignoriert das echte Profil. Korrektur: Pro Test mind. 5-7 konkrete Zitate dokumentieren. Ohne Zitate keine valide Test-Aussage.

**Fehler 3: Tests werden in der gleichen Session gemacht wie der Draft**

Du hast den Draft geschrieben (oder Claude). 5 Minuten später evaluierst du ihn. Bias ist enorm. Korrektur: 24h Pause oder neue Claude-Session für Evaluation.

**Fehler 4: Fail wird nicht in Action umgewandelt**

Test sagt Fail, aber Action-Liste fehlt. Korrektur: Pro Fail-Test mindestens 3 konkrete Actions ableiten ("Passage X auf Seite Y umschreiben — neuer Vorschlag: ...").

## Output-Form der Evaluation

Pro Evaluation:

1. **Score 1-10**
2. **Bereitschafts-Status** (READY / MINOR / MAJOR / REWRITE)
3. **Pro Test:** Pass/Fail + 5 Zitate (problematisch oder exemplarisch)
4. **Top 3 Stärken** (was funktioniert)
5. **Top 3 Schwächen** (mit konkretem Fix-Vorschlag)
6. **Handlungsliste** (priorisiert)

Diese Struktur ist 1.500-2.500 Wörter. Nicht weniger. Wer kürzer evaluiert, evaluiert oberflächlich.
