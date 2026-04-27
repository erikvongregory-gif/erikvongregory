# Prompt 02 — Keyword Research

## Wann verwenden

Nachdem der Technical Audit läuft. Du brauchst eine Keyword-Map bevor du einen einzigen Content-Brief schreibst. Sonst ratest du was Nutzer suchen.

**Voraussetzungen:**
- Claude hat WebSearch aktiviert (wichtig — sonst halluziniert er Keywords)
- Du kennst deine Zielperson in 3-5 Sätzen
- Du kennst deine Kategorie (besonders wenn sie neu ist)
- Budget für ~2-3h (Claude macht 24+ WebSearches, das braucht Zeit)

## Was der Prompt tut

Claude erstellt dir eine **priorisierte Keyword-Map**. Nicht 500 Keywords aus einem Tool, sondern 20-40 relevante mit:
- Buyer-Journey-Stage (Problem-Unaware / Aware / Comparing / Ready-to-Buy)
- Geschätztes Suchvolumen
- Wettbewerbs-Einschätzung (wer rankt aktuell)
- Tier-Priorisierung (Quick Win / Mittelfrist / Langfrist / Nur PPC)
- Empfohlenes Content-Format pro Keyword

Der Trick liegt in der **Adjacent-Keyword-Logik**: Wenn deine Kategorie neu ist (wenig Volumen), suchst du nach **Symptom-Keywords** die deine Zielperson googelt. Nicht was sie kauft — was sie fühlt.

## Input den du gibst

Zwei Dinge, die den Output machen oder brechen:

**1. Zielperson (sehr konkret):**
Nicht: "Frauen 30-45, gesundheitsbewusst."
Sondern: "Marketing-Managerin, 32, München, 50h-Woche, bestellt täglich Oatly-Flat-White, scrollt TikTok für Rezepte, hat es aufgegeben ihr Mittagessen selbst zu machen."

**2. Dein Differenziator (1-2 Sätze):**
Was macht dein Produkt *wirklich* anders? Nicht "beste Qualität" — konkret.

## Der Prompt

```
Du bist ein Senior SEO Strategist mit Fokus auf Buyer-Journey-basierte
Keyword-Strategie für D2C-Brands.

KONTEXT:
- Brand: [Brand-Name]
- Kategorie: [z.B. "Savory Snack-Meal" — neue Kategorie]
- Differenziator: [2 Sätze was wirklich anders ist]
- Zielperson: [konkrete Persona-Beschreibung, 3-5 Sätze]
- Markt: [DACH / USA / UK / Global]
- Ziel: [Organisches Wachstum über 6-12 Monate]

AUFGABE:
Erstelle eine priorisierte Keyword-Map für diese Brand.

METHODE (nicht abkürzen):

Schritt 1 — Symptom-Mapping
Die Zielperson sucht nicht nach "[deine Kategorie]" (neues Konzept = kein
Volumen). Sie sucht nach SYMPTOMEN die dein Produkt löst.
Liste 10-15 Symptome / Probleme / Frustrationen die deine Zielperson
tatsächlich googelt. Denke in ihren Worten, nicht in deinen Feature-Worten.

Schritt 2 — WebSearch pro Symptom
Führe für jedes Symptom eine Google-Suche durch (Markt-spezifisch):
- Welche Suchanfragen completions schlägt Google vor?
- Welche "People Also Ask" Fragen erscheinen?
- Welche Top-5-Ergebnisse ranken? (Domain + Content-Typ)
- Gibt es Featured Snippets?
- Gibt es kommerzielle Ads (= transaktionales Volumen)?

Führe mindestens 20 WebSearches durch. Sei gründlich.

Schritt 3 — Keyword-Extraktion
Aus jeder SERP extrahiere 2-4 verwandte Keywords. Ziel: 30-50 Roh-Keywords.

Schritt 4 — Buyer-Journey-Mapping
Ordne jedes Keyword einer von 4 Stages zu:
- Stage 1 (Problem-Unaware): "ich bin müde nachmittags"
- Stage 2 (Problem-Aware): "energy boost arbeit"
- Stage 3 (Comparing): "proteinriegel vs shake"
- Stage 4 (Ready-to-Buy): "proteinriegel kaufen"

Schritt 5 — Bewertung pro Keyword
Für jedes Keyword bewerte:
- Volumen (grobe Schätzung: Niedrig/Mittel/Hoch/Sehr hoch)
- Wettbewerb (Grün = kleine Sites ranken / Gelb = Medium / Rot = Platzhirsche)
- Brand-Fit (Würde dein Produkt natürlich erwähnbar sein?)
- Intent-Match (Kommerziell / Informational / Navigational)

Schritt 6 — Tier-Priorisierung
Sortiere in 5 Tiers:
- Tier 1 (Sofort, Quick Wins): Niedriger Wettbewerb + hoher Fit, 2-3 Monate rankbar
- Tier 2 (Phase 2, Mittelfrist): Mittlerer Wettbewerb, 4-6 Monate
- Tier 3 (Phase 3, Awareness-Traffic): Hoher Wettbewerb, 6-12 Monate
- Tier 4 (Comparison-Content): Stage 3, braucht Domain-Authority
- Tier 5 (Nur PPC): Hoher Wettbewerb + transaktional + Brand kann nicht
  natürlich ranken → Paid Channel, nicht SEO

OUTPUT-FORMAT:

1. Executive Summary (5 Sätze): Was ist die Keyword-Gesamtstrategie?

2. Top 10 Must-Have Keywords Tabelle:
   Keyword | Stage | Volumen | Wettbewerb | Tier | Empfohlenes Format

3. Vollständige Keyword-Tabelle (alle 30-50):
   Keyword | Stage | Suchverhalten | Top 3 Ergebnisse | Rankender
   Content-Typ | Deine Chance | Empfohlene Seite/Format

4. Red-Flag-Liste: Keywords die du NICHT targetieren solltest (und warum)

5. PPC-Liste: Keywords für Paid statt SEO (und warum)

6. Content-Cluster-Empfehlung: Welche 3-5 Pillar-Topics ergeben sich?

Sei datenbasiert. Nenne deine WebSearch-Quellen. Wenn du ein Volumen
schätzt, sage auf welcher Basis (Anzahl SERP-Ergebnisse, PAA-Häufigkeit,
Ads-Dichte).
```

## Erwarteter Output

Du bekommst:

1. **Executive Summary** — 1 Absatz, was ist die Strategie
2. **Top 10 Keywords** — die sofort umsetzbaren
3. **Vollständige Map** — 30-50 Keywords tabellarisch
4. **Red Flags** — was du bewusst weglässt (oft wertvoller als die Picks)
5. **PPC-Liste** — SEO macht für diese Keywords keinen Sinn
6. **Cluster-Empfehlung** — 3-5 Pillar-Topics für Content-Architektur

Gesamt ~3.000-5.000 Wörter Output. Das ist dein Arbeitsmaterial für die nächsten 6 Monate.

## Troubleshooting

**Claude macht nur 3-5 WebSearches und bastelt den Rest**
→ Hart sein im Prompt: *"Führe MINDESTENS 20 WebSearches durch. Zähle sie am Ende auf. Ohne 20+ Searches ist der Output unbrauchbar."* Wenn er weniger macht, Prompt wiederholen mit *"Deine Analyse basiert nur auf [Zahl] Searches. Mach [20-X] weitere zu den Keywords [Liste]."*

**Volumen-Schätzungen sind wilde Phantasie**
→ Claude hat kein Ahrefs-Access. Er schätzt aus SERP-Signalen (Ads-Dichte, PAA, Wettbewerbs-Stärke). Das ist legitim, aber nenne es so. Füge hinzu: *"Markiere jede Volumen-Schätzung als 'Grobschätzung' und nenne die SERP-Signale auf denen sie basiert."*

**Keywords sind zu breit / zu generisch**
→ Du hast die Zielperson zu vage beschrieben. Verschärfe den Persona-Input und re-runne. Generische Persona = generische Keywords.

**Output ist nur Stage 2/4 (fehlt Stage 1 Awareness)**
→ Symptom-Mapping war zu oberflächlich. Korrektur: *"Geh zurück zu Schritt 1. Liste 15 Symptome (nicht 5). Denke: was googelt die Persona nachts um 23 Uhr wenn sie frustriert ist? Was googelt sie am Montagmorgen? Was googelt sie wenn sie nicht mal weiß dass sie ein Problem hat?"*

**Alle Tier-1-Empfehlungen sind super-breite Keywords**
→ Claude optimiert auf Volumen statt auf Ranking-Chance. Korrektur: *"Review Tier 1. Tier 1 = du kannst in 2-3 Monaten in Top 5 ranken. Ein Keyword auf dem Ahrefs, AOK und Huel ranken ist NICHT Tier 1, egal wie hoch das Volumen. Stufe um."*

## Nächste Phase

→ Nimm die Top 5-10 Keywords aus Tier 1 + Tier 2
→ Für jedes: `03-serp-analysis.md` laufen lassen
→ Ergebnis: Du weißt welchen Content Google für jedes Keyword belohnt

**Zeitlicher Rhythmus:** Keyword-Map einmal im Quartal komplett neu. Zwischendurch nur Einzel-Keywords ergänzen.
