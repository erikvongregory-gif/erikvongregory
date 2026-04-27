# Prompt 01 — Technical Audit

## Wann verwenden

Vor allem anderen. Wenn du nicht weißt, was auf deiner Site technisch kaputt ist, ranking-Arbeit = Zeit verschwenden. Audit zuerst.

**Voraussetzungen:**
- Deine Live-URL
- Info über deine Plattform (Shopify / WordPress / Webflow / Custom)
- Zugang zu Google Search Console (für echte Zahlen)
- Optional: Chrome DevTools oder Lighthouse (für Core Web Vitals)

## Was der Prompt tut

Claude gibt dir eine **priorisierte Fix-Liste** mit High/Medium/Low Severity, konkreten Fix-Anweisungen pro Item, und einer Schätzung wie lange jeder Fix dauert. Du bekommst keinen Essay über "was SEO ist" — du bekommst eine Handlungsliste.

## Input den du gibst

Bevor du den Prompt pastest, sammle:

1. **URL + Plattform:** z.B. "deine-domain.de, Shopify"
2. **Top 3-5 Seiten** die du für wichtig hältst (Homepage, Hauptproduktseite, 1-2 Blog-Posts)
3. **Bekannte Probleme:** Dinge die du selbst schon gesehen hast (z.B. "Footer zeigt manchmal Dummy-Text")
4. **Screenshot/Source** von 1-2 Seiten (optional, macht Output deutlich besser)

Ohne diesen Input rät Claude. Mit dem Input analysiert Claude.

## Der Prompt

```
Du bist ein Senior Technical SEO Consultant mit 10+ Jahren Erfahrung.
Ich brauche einen Technical SEO Audit für meine Website.

KONTEXT:
- URL: [deine-domain.de]
- Plattform: [Shopify / WordPress / Webflow / Custom]
- Branche: [D2C Snack-Brand / SaaS / B2B Services / etc.]
- Wichtigste Seiten: [Liste von 3-5 URLs]
- Bekannte Probleme: [was dir schon aufgefallen ist, falls etwas]

AUFGABE:
Analysiere systematisch die folgenden 8 Bereiche und gib mir pro Bereich:
1. Status (OK / Problem / Kritisch)
2. Konkrete Fundstelle (welche Seite, welches Element)
3. Fix-Anweisung (was genau muss geändert werden)
4. Severity (High = Ranking-Blocker / Medium = Ranking-Hebel / Low = Hygiene)
5. Aufwand (Minuten)

DIE 8 BEREICHE:

A. Crawling & Indexing
   - Robots.txt: existiert, blockt wichtige Seiten nicht
   - Sitemap.xml: existiert, ist in Search Console eingereicht
   - Canonical Tags: auf allen Seiten, zeigen auf sich selbst
   - Noindex: nur auf Thank-you-Pages, Login, Admin

B. On-Page SEO (pro wichtiger Seite)
   - H1: genau eine pro Seite, enthält Primary Keyword
   - H2-H6: logische Hierarchie, nicht übersprungen
   - Title-Tag: unter 60 Zeichen, enthält Keyword
   - Meta Description: 140-160 Zeichen, CTA, enthält Keyword

C. URL Struktur
   - Kurze URLs mit Keyword (nicht /p?id=12345)
   - Bindestriche statt Unterstriche
   - Kleinbuchstaben
   - Keine Duplicate-URLs (www vs non-www, http vs https, trailing slash)

D. Content-Struktur
   - Dummy-Texte raus (Lorem Ipsum, Platzhalter)
   - Keine H1-Duplikate über die Seite
   - Keine leeren Headings
   - Breadcrumbs vorhanden wo sinnvoll

E. Internal Linking
   - Navigationsstruktur logisch (max 3 Klicks zur tiefsten Seite)
   - Hauptseiten in Main Nav
   - Footer-Links funktionieren
   - Keine Orphan Pages (Seiten ohne internen Link)

F. Technical Performance
   - Core Web Vitals: LCP unter 2.5s, INP unter 200ms, CLS unter 0.1
   - Bilder: alle komprimiert, Lazy-Load aktiv, alt-Text vorhanden
   - Mobile: responsive, touch-friendly, keine horizontalen Scrolls

G. Schema Markup
   - Organization Schema (Pflicht)
   - WebSite Schema mit SearchAction
   - Product Schema auf Produktseiten
   - FAQ Schema wo FAQs existieren

H. Meta & Social
   - Favicon vorhanden
   - Open Graph Tags (og:title, og:description, og:image) auf allen Seiten
   - Twitter Card Tags
   - hreflang wenn mehrere Sprachen

OUTPUT-FORMAT:
Eine Tabelle pro Bereich mit Spalten: Check | Status | Fundstelle | Fix | Severity | Aufwand

Am Ende:
- Top 5 "Quick Wins" (High Severity + Low Aufwand)
- Top 3 "Strategic Fixes" (High Severity + Mittlerer Aufwand, größter ROI)
- Was ignoriert werden kann (Low Severity, Low ROI)

Sei konkret. Wenn du etwas nicht weißt (weil ich dir den Seiten-Source nicht geschickt habe), sag das explizit statt zu spekulieren.
```

## Erwarteter Output

Claude liefert dir ~8 Tabellen (eine pro Bereich A-H), jede mit 4-12 Rows. Gesamtgröße: ~50-100 konkrete Fix-Items. Am Ende die 3 Prio-Listen (Quick Wins / Strategic / Ignore).

**Beispiel-Row:**

| Check | Status | Fundstelle | Fix | Severity | Aufwand |
|-------|--------|------------|-----|----------|---------|
| H1 Duplikate | Kritisch | /homepage zeigt "Willkommen" als H1, /shop zeigt gleiches H1 | /shop H1 ändern zu "[Produkt-Kategorie] kaufen" | High | 2 min |

## Troubleshooting

**Output ist zu generisch / "könnte sein dass..."**
→ Du hast Claude keinen echten Page-Source gegeben. Löse: Geh auf eine Seite, View Source (Ctrl+U), kopiere die ersten 200 Zeilen, paste sie an den Prompt an. Claude analysiert dann wirklich statt zu raten.

**Output listet Dinge auf die gar nicht existieren**
→ Klassische Claude-Halluzination bei Technical Audits. Mitigation: Am Anfang des Prompts ergänzen: *"Spekuliere nicht. Wenn du nicht sicher weißt, ob ein Element existiert, schreibe 'Muss manuell geprüft werden: [Prüfschritt]' statt es zu behaupten."*

**Prioritäten-Liste ist 50 Items lang, ich kann nur 5 Items machen**
→ Gib Claude dein Budget vor. Am Ende des Prompts: *"Ich habe maximal 4 Stunden diese Woche. Sortiere nach ROI/Aufwand und markiere die Top 10."*

**Severity ist unklar (High bei allem)**
→ Claude übertreibt oft bei Technical Audits. Korrektur-Prompt: *"Review deine Severity-Einstufungen. High = Fix bringt direktes Ranking-Delta. Medium = Fix unterstützt anderen Content. Low = Reine Hygiene. Stufe um."*

## Nächste Phase

→ Fixes ausführen (oder delegieren) innerhalb von 1-2 Wochen
→ Danach: `02-keyword-research.md` (während Entwickler die Fixes umsetzt, kannst du parallel die Keyword-Strategie bauen)

**Wichtig:** Lass Claude NICHT die Fixes selbst umsetzen. Er sieht keinen aktuellen Site-Source, er kann nur raten. Umsetzung = du oder dein Dev.
