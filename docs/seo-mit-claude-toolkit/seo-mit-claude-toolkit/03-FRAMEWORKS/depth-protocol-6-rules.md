# Framework — Depth Protocol (6 Rules)

## Wozu

Das Depth-Protocol ist der Filter zwischen "AI hat geschrieben" und "Mensch mit Standpunkt hat geschrieben". 6 Regeln. Jeder Draft muss alle 6 bestehen.

Wenn Claude einen Draft liefert der einen schlechten Tag im Internet überlebt, hat er das Depth-Protocol bestanden. Wenn er nach 24h nach AI-Slop riecht, hat er es nicht.

## Regel 1 — Substitution-Test

**Frage:** Wenn ich "[meine Brand]" durch einen direkten Wettbewerber ersetze — funktioniert der Text noch?

**Wenn ja:** Der Text ist generisch. Brand-Substanz fehlt. Umschreiben.

**Wenn nein:** Der Text ist brand-exklusiv. Bestanden.

**Wie testen:** Mental-Übung. Lies jeden Absatz und denke "Wettbewerber X" statt "meine Brand". Wo der Sinn nicht bricht: rote Markierung.

**Häufigste Quelle von Substitution-Verstoss:** Allgemeine Aussagen über Kategorie ("Snacks sind schwierig zu wählen weil...") statt brand-spezifische Sicht ("Wir haben uns gegen Süß entschieden weil unsere Persona X erlebt...").

## Regel 2 — Persona-Filter

**Frage:** Würde [konkrete Persona aus dem Brief] bei diesem Satz nicken oder die Augen verdrehen?

**Wenn nicken:** Bestanden.

**Wenn Augen verdrehen:** Streichen oder umschreiben.

**Wie testen:** Visualisiere die Persona physisch. Sie sitzt am Schreibtisch, liest deinen Text. Bei welchem Satz scrollt sie weiter? Bei welchem Satz zuckt sie zusammen? Bei welchem nickt sie?

**Häufigste Quelle von Persona-Verstoss:** Marketing-Sprache ("entdecke jetzt", "einzigartig", "revolutionär"). Persona erkennt das als "wird mir was verkauft" und schaltet ab.

**Diagnostik:** Wenn dein Persona-Profil so vage ist dass du nicht weißt was sie denkt — der Brief hat ein Persona-Problem, nicht der Draft.

## Regel 3 — Problem First

**Frage:** Beginnt der Text bei der Persona's Welt — oder beim eigenen Produkt?

**Wenn Persona-Welt:** Bestanden.

**Wenn Produkt:** Umschreiben. Produkt kommt erst wenn Problem etabliert ist.

**Die korrekte Sequenz:**
1. Problem-State erkennen (Persona sieht ihren Moment beschrieben)
2. Frustration spiegeln (innere Stimme der Persona)
3. Kategorie / Lösung als Konzept einführen
4. Produkt als natürlicher Anker (nicht als Pitch)

**Was NIE passiert:** "Unser neues Produkt X löst..."

**Was passiert stattdessen:** "Du kennst diesen Moment um 15 Uhr, wenn..."

**Häufigste Quelle von Verstoss:** Claude default-startet mit Erklärung des Themas oder Produkts. Korrektur im Brief verlangt explizit Problem-First.

## Regel 4 — No Filler

**Frage:** Trägt jeder Satz neue Information ODER neue Emotion?

**Wenn beides nicht:** Streichen.

**Filler-Klassiker:**
- Übergangs-Floskeln ("Aber lass uns genauer hinschauen")
- Wiederholungen aus dem vorherigen Absatz
- Allgemein-Plätze ("In der heutigen Zeit...")
- Meta-Kommentare ("In diesem Artikel werden wir...")
- Selbstbestätigungen ("Wie wir bereits gesehen haben...")
- Hohle Adjektive ("einzigartig", "innovativ", "revolutionär")

**Faustregel:** Bei Erstdraft sind 15-25% Filler. Wenn du nach Streichen weniger als 10% Reduktion hast, hast du nicht ehrlich gesucht.

**Test:** Streiche einen Satz. Wird der Text schlechter? Wenn nein: war Filler.

## Regel 5 — Concreteness Beats Abstraction

**Frage:** Ist der Satz konkret-vorstellbar oder abstrakt-vage?

**Schwach (abstrakt):** "Stressiger Arbeitsalltag mit wenig Zeit für gesundes Essen."

**Stark (konkret):** "13:30, das nächste Meeting startet in 22 Minuten, du hast seit 8 Uhr nichts gegessen."

**Warum es funktioniert:** Konkretheit baut Bilder im Kopf. Bilder bauen Empathie. Empathie baut Vertrauen. Vertrauen ist Conversion.

**Wo eingesetzt:**
- Persona-Szenen (statt Demografie: konkrete Mikro-Momente)
- Beispiele (statt "viele Kunden": "eine Kundin mit Co-Working-Office in München")
- Zahlen (statt "viele": "23 von 30 in unserem Test-Set")
- Quotes (statt erfundener Worte: echte Sätze, falls vorhanden — sonst Platzhalter)

**Test:** Lies einen Absatz. Kannst du ein Bild sehen? Wenn nein: zu abstrakt. Konkretisieren.

## Regel 6 — Tonality Balance

**Frage:** Hält der Text die definierte Tonalitäts-Mischung deiner Brand?

Beispiele für Brand-Mischungen (illustrativ, ersetze für deine):
- 70% ruhig-kompetent + 30% neugierig-ironisch
- 60% direktstark + 40% empathisch
- 80% sachlich-präzise + 20% selbstironisch

**Wenn die Mischung kippt:** Umschreiben.

**Häufigste Verstöße:**
- Zu viel Ironie → wirkt frech, nicht souverän
- Zu wenig Ironie → wirkt steif, generisch
- Zu viel Empathie → wirkt anbiedernd, schwach
- Zu wenig Empathie → wirkt distant, kalt

**Test:** Lies 3 Absätze laut. Klingt das wie deine Brand? Wenn ein Außenstehender raten müsste welche Brand das ist — würde er deine raten?

## Wie das Protocol genutzt wird

### Vor dem Draft

Im Master-Brief stehen die 6 Regeln. Claude erhält den Brief. Claude weiß: ich werde danach evaluiert.

### Während des Drafts

Claude self-checked. Im Draft-Prompt steht: "Bevor du schreibst, internal check 5 Punkte." Diese Checks beziehen sich auf das Depth-Protocol.

### Nach dem Draft

In der Evaluation (Prompt 06) wird der Draft systematisch gegen das Protocol geprüft. Pro Regel: Pass / Fail mit Zitaten.

### Bei Revision

Korrektur-Prompt referenziert die spezifische Regel: "Du hast Regel 1 (Substitution) verletzt in folgenden Passagen: [Zitate]. Schreibe um."

## Das Protocol in der Praxis

Bei den ersten 5 Drafts wirst du häufig 3-4 von 6 Regeln verletzt sehen. Das ist normal. Nach 10 Drafts und sauberen Korrekturen lernt Claude (in deiner Brand-Schiene) das Protocol weitgehend einzuhalten — wenn der Master-Brief tight ist.

Wenn nach 20 Drafts immer noch Regel 1 (Substitution) brechen: dein Master-Brief hat zu wenig Brand-Substanz. Mehr Voice-Referenzen, konkretere Persona, härter formulierte Brand-Owned Words.

Wenn Regel 5 (Concreteness) immer bricht: dein Brief beschreibt die Persona zu demografisch. Mehr Szenen einbauen.

Das Depth-Protocol ist nicht statisch. Es wird mit jedem Draft härter, weil dein Brief mit jedem Draft schärfer wird.
