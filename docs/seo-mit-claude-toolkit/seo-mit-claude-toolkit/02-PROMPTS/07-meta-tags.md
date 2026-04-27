# Prompt 07 — Meta Tags

## Wann verwenden

Nach dem finalen Content-Draft. Meta-Tags sind das was in der SERP steht — sie entscheiden ob jemand klickt, nicht ob du rankst. 10 Minuten Arbeit pro Piece, 20-30% CTR-Unterschied möglich.

**Voraussetzungen:**
- Finaler Content (nach Prompt 06 = READY)
- Klares Primary + Secondary Keyword
- Verständnis was dein "Klick-Incentive" ist (Benefit/Neugier/Spezifität)

## Was der Prompt tut

Claude baut dir **3-5 Varianten** von:
- Title-Tag (unter 60 Zeichen, Keyword vorn, Klick-Anreiz)
- Meta-Description (140-160 Zeichen, CTA, Benefit)
- Open Graph Title + Description (für Social Shares)
- Twitter Card Title + Description (für X/Twitter Shares)

Claude begründet warum welche Variante für welches Ziel funktioniert. Du wählst.

## Input den du gibst

1. **Finaler Content** (zumindest H1 + erster Absatz + Kernargument)
2. **Primary Keyword**
3. **Dein Klick-Incentive-Pattern** — wie deine Brand Leser reinholt:
   - Benefit-orientiert ("So machst du X")
   - Neugier-orientiert ("Warum X funktioniert — meistens nicht")
   - Spezifitäts-orientiert ("5 Wege X in 30 Minuten")
   - Kontrarisch ("X ist Blödsinn — hier die Alternative")

## Der Prompt

```
Du bist Senior Conversion-Copywriter mit Fokus auf SERP-Klickraten.
Title-Tags und Meta-Descriptions sind Mikro-Copy: jedes Zeichen zählt.

KONTEXT:
- Primary Keyword: [X]
- Secondary Keywords: [Liste]
- Content-H1: [H1 des Artikels]
- Content-Thema in 2 Sätzen: [Kern-Argument]
- Mein Klick-Incentive-Pattern: [Benefit / Neugier / Spezifität / Kontrarisch]
- Meine Brand-Tonalität: [aus Master-Brief, 1 Satz]

AUFGABE:
Baue Meta-Elemente für SERP + Social Shares. Pro Element 3-5 Varianten
mit Begründung.

HARTE REGELN:

Title-Tag:
- MAX 60 Zeichen (inklusive Spaces)
- Primary Keyword in den ersten 40 Zeichen
- Klick-Incentive hinten
- Brand-Name nur wenn wichtig (kostet Zeichen)
- Pipe | oder Dash — als Separator
- Nie ALL CAPS
- Nie "[year] Edition" wenn nicht wirklich jahresgebunden
- Nie "ultimate" / "comprehensive" / "definitive" (AI-Tell)

Meta-Description:
- 140-160 Zeichen (Sweet Spot)
- Erster Satz: Hook / Versprechen
- Zweiter Satz: Spezifizierung oder Soft-CTA
- Primary Keyword einmal (nicht mehr)
- Active Voice
- Konkrete Zahl oder Spezifität wenn möglich
- Kein Marketing-Bla ("entdecke unser einzigartiges...")

Open Graph:
- og:title: kann länger sein (bis 90 Zeichen auf manchen Plattformen)
- og:description: 2-4 Sätze, kann mehr Story-Arc haben als Meta-Description
- Ton kann persönlicher / direkter als SERP-Version sein

Twitter Card:
- title: max 70 Zeichen
- description: max 200 Zeichen, sharper als Meta-Description
- Oft mit Tension / Teaser (für X's Scroll-Rhythmus)

OUTPUT-FORMAT:

═══ TITLE-TAG ═══

Variante A (Primary): [Text]
- Zeichen: [Zahl]
- Keyword-Position: [Zahl]
- Klick-Incentive: [welche Mechanik]
- Begründung: [1 Satz]

Variante B (Klick-optimiert): [Text]
- [gleiche Struktur]

Variante C (Brand-first): [Text]
- [gleiche Struktur]

Empfehlung: [A / B / C] — weil [Grund].

═══ META-DESCRIPTION ═══

Variante A: [Text]
- Zeichen: [Zahl]
- Mechanik: [welcher Hook-Typ]
- CTA-Stärke: [weich/mittel/hart]

Variante B: [Text]
- [gleiche Struktur]

Variante C: [Text]
- [gleiche Struktur]

Empfehlung: [A / B / C] — weil [Grund].

═══ OPEN GRAPH ═══

og:title: [Text]
og:description: [Text, 2-4 Sätze]
- Unterschied zur SERP-Version: [erklären]

═══ TWITTER CARD ═══

title: [Text]
description: [Text]
- X-spezifische Anpassung: [erklären]

═══ TESTING-HINWEIS ═══

Wenn du nicht sicher bist welche Title-Variante läuft:
- Empfehlung zum A/B-Test (wenn Plattform es erlaubt)
- Timing (min 4 Wochen für valide Daten)
- Was du misst (CTR aus GSC, nicht Ranking)
```

## Erwarteter Output

3-5 Varianten pro Element mit Begründung. Du wählst eine, nimmst die Varianten als Backup für A/B-Tests oder für verwandte Seiten.

## Troubleshooting

**Alle Title-Varianten klingen gleich**
→ Claude variiert nur Wortstellung. Korrektur: *"Die 3 Varianten dürfen nicht alle der gleiche Hook-Typ sein. Variante A = Benefit. Variante B = Neugier (Frage oder Gegensatz). Variante C = Spezifität (Zahl / konkretes Ergebnis). Bau neu."*

**Meta-Description ist zu werblich**
→ *"Deine Meta ist typisches Marketing-Blabla ('einzigartige Snacks', 'entdecke jetzt'). Schreibe sie um im Stil der Brand-Tonalität aus dem Master-Brief. Konkreter. Ehrlicher. Weniger laut."*

**Zeichen-Count ist überschritten**
→ *"Variante [X] ist [Y] Zeichen, Grenze war [Z]. Kürze ohne Bedeutungsverlust. Strich: Artikel wo möglich, Synonyme falls kürzer, überflüssige Adjektive. Ziel: [Z-5] bis [Z]."*

**Keyword wird nicht natürlich eingebaut**
→ Wenn das Keyword sperrig ist ("proteinriegel alternative herzhaft"), wird der Title hölzern. Korrektur: *"Das Keyword ist sperrig. Arbeite mit Teilmatch: Haupt-Keyword-Kern in H1/Title, volle Keyword-Phrase in Meta-Description und H2. Gib mir 3 Title-Varianten die natürlich klingen trotz Teilmatch."*

## Nächste Phase

→ Title + Meta einsetzen in dein CMS (Shopify: Produktseiten-Edit / WordPress: Yoast oder Rank Math / Webflow: SEO Settings)
→ Nach 4 Wochen: GSC öffnen, CTR pro Seite checken. Seiten unter 2% CTR → Title umtesten
→ Mit allen Meta-Sets fertig: `08-schema-markup.md` für die technische Schicht

**Workflow-Tipp:** Speichere alle Varianten (auch die nicht-gewählten) in einer einfachen Tabelle. In 3-6 Monaten, wenn du optimieren willst, hast du sofort Alternativen für A/B-Test.
