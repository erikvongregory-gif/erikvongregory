# Prompt 08 — Schema Markup

## Wann verwenden

Wenn die Site-Struktur steht, Content live ist, und du die Chance auf Rich Snippets willst. Schema ist nicht optional mehr — Google nutzt es als Verstehens-Schicht, nicht nur für Rich Results.

**Voraussetzungen:**
- Liste deiner wichtigsten Seiten-Typen (Homepage, Product, Category, Article, FAQ, About)
- Brand-Basisdaten (Name, Logo-URL, Social-Profile, Kontakt)
- Pro Produkt: Preis, Verfügbarkeit, Bilder, Beschreibung
- FAQ-Inhalte (falls du Rich-Result-FAQs willst)

## Was der Prompt tut

Claude baut dir **JSON-LD Templates** für alle relevanten Schema-Typen, copy-paste-ready, nach Schema.org Spezifikation, Google-validiert-bar. Plus: Implementierungs-Anweisungen pro CMS-Typ.

Die 8 wichtigsten Schema-Typen für die meisten Brands:
1. Organization (Pflicht)
2. WebSite (Pflicht — SearchAction)
3. Product (D2C Pflicht)
4. FAQPage (wo FAQs existieren)
5. BreadcrumbList (automatisch aus meisten CMS)
6. Article / BlogPosting (für Blog-Content)
7. AggregateRating (wo Reviews/Ratings existieren)
8. HowTo (für Step-by-Step Guides)

## Input den du gibst

Ziemlich viel Input. Das ist kein 30-Sekunden-Prompt.

1. **Brand Basics:**
   - Name, URL, Logo-URL (direkte URL zum PNG/SVG)
   - Gründer-Name + Gründungsjahr (für Organization)
   - Social-Profile-URLs (Instagram, TikTok, LinkedIn, etc.)
   - Kontakt-E-Mail (Customer Service)
   - Adresse (Country minimum)

2. **Produkt-Daten** (pro Produkt):
   - Name, Kategorie, Beschreibung (2-3 Sätze)
   - Preis, Währung, Verfügbarkeit (InStock / PreOrder / OutOfStock)
   - Bilder-URLs
   - SKU
   - Bei Bundles: Preis pro Variante

3. **FAQ-Daten:**
   - Fragen + Antworten (wenn FAQ-Schema gewünscht)

4. **Plattform:**
   - Shopify / WordPress / Webflow / Custom → bestimmt Implementierungs-Pfad

## Der Prompt

```
Du bist ein Senior Technical SEO mit Fokus auf Schema.org und
strukturierte Daten. Du kennst Google Rich Results Guidelines auswendig
und weißt welche Properties required vs. recommended sind.

KONTEXT:

Brand Basics:
- Name: [X]
- URL: https://[domain].[tld]
- Logo-URL: [volle URL zum Logo, PNG oder SVG]
- Gründungsjahr: [YYYY]
- Gründer: [Name] (wenn relevant)
- Kontakt: [email]
- Sprachen: [de / en / etc.]
- Social:
  - Instagram: [URL]
  - TikTok: [URL]
  - [weitere]
- Land: [DE / AT / CH / US / etc.]

Produkte (pro Produkt ein Block):
Produkt 1:
- Name: [X]
- Kategorie: [Lebensmittel > Snacks > Savory o.ä.]
- Beschreibung: [2-3 Sätze]
- Preis: [X] EUR (oder andere Währung)
- Verfügbarkeit: [InStock / PreOrder / OutOfStock]
- SKU: [X]
- Bild-URL: [X]
- Rating falls vorhanden: [X.X / 5, basierend auf Y Reviews]

[Weitere Produkte...]

FAQ (wenn gewünscht):
- Frage 1: [?]
- Antwort 1: [Text]
- [weitere Frage/Antwort-Paare]

Plattform: [Shopify / WordPress / Webflow / Custom]

AUFGABE:

Erstelle JSON-LD Templates für die folgenden Schema-Typen, jeweils mit
Implementierungs-Anleitung für meine Plattform.

SCHEMA 1 — Organization
- Vollständige Organization mit ContactPoint
- Social Profiles via sameAs
- Optionale Properties nutzen wo sinnvoll

SCHEMA 2 — WebSite
- Mit potentialAction (SearchAction)
- SiteLinks Searchbox für Google

SCHEMA 3 — Product (pro Produkt)
- Name, Brand, Description, Category
- Offers mit Price, Currency, Availability, PriceValidUntil
- Bei Bundles: Multi-Offer-Schema
- AggregateRating wenn vorhanden
- NutritionInformation wenn Lebensmittel
- Images

SCHEMA 4 — FAQPage
- Alle Q&As als mainEntity Array
- Keine Marketing-Fragen ("Warum sind wir die Besten?") — nur echte
  User-Fragen

SCHEMA 5 — BreadcrumbList
- Auto-Generation-Template für meine CMS-Struktur

SCHEMA 6 — Article / BlogPosting (für Blog-Content)
- Template mit headline, datePublished, dateModified, author, image

SCHEMA 7 — HowTo (wenn passend)
- Template für Step-by-Step Guides

PRO SCHEMA:

1. Validiertes JSON-LD (ready to paste)
2. Kommentar-Zeilen mit WAS in [EXAMPLE_VARIABLE] zu ersetzen ist
3. Implementierungs-Anleitung für die genannte Plattform:
   - Shopify: Liquid-Template in welcher Datei
   - WordPress: wie mit Yoast / Rank Math / via Function
   - Webflow: via Custom Code Embed
   - Custom: reine JS-Injection-Anleitung
4. Validierungs-Hinweis (Google Rich Results Test)
5. Typische Fehler für diesen Schema-Typ + Vermeidung

ALLGEMEINE REGELN FÜR ALLE SCHEMAS:
- @context: "https://schema.org" (MIT https://, MIT www)
- @type: korrekt kapitalisiert
- Keine erfundenen Properties (nur schema.org-registrierte)
- AggregateRating nur wenn echte Daten
- Availability: https://schema.org/InStock (volle URL)
- Datumsangaben: ISO 8601 (YYYY-MM-DDTHH:MM:SSZ)
- Keine Content-Duplikation (nur strukturiert was visuell auch da ist)

AM ENDE:
- Vollständige File-Liste (welche .json-Files und wo sie landen)
- Deployment-Reihenfolge (welches Schema zuerst testen)
- Monitoring-Hinweis (was in Google Search Console anschauen)
```

## Erwarteter Output

Ein Paket von:
- 6-8 JSON-LD Templates (copy-paste-ready)
- Pro Template: Erklärung + Implementierungs-Pfad für deine Plattform
- Troubleshooting-Liste typischer Fehler
- Deployment-Reihenfolge

Gesamtgröße ca. 4.000-8.000 Wörter Output.

## Troubleshooting

**Schema validiert nicht (Google Rich Results Test wirft Errors)**

Die häufigsten Fehler:

| Fehler | Ursache | Fix |
|--------|---------|-----|
| `@context should be https://` | http statt https | `"@context": "https://schema.org"` |
| `Price is string but should be number` | `"price": "23.94"` mit Quotes | `"price": 23.94` (ohne Quotes für Zahlen) |
| `Required field availability missing` | Availability nicht gesetzt | Volle URL: `"availability": "https://schema.org/InStock"` |
| `AggregateRating missing reviewCount` | nur ratingValue gesetzt | `reviewCount` UND `ratingValue` nötig |
| `Invalid date format` | "23. April 2026" statt ISO | ISO 8601: `"2026-04-23"` |

**Schema ist unnötig aufgebläht (zu viele optionale Properties)**
→ *"Dein Organization Schema hat 25 Properties. Davon sind 10 für Google irrelevant. Strippe auf: Required + Recommended laut Google Docs. Nicht jede Schema.org-Property ist Google-relevant."*

**Produkt-Schemas klonen falsche Daten (alle gleich)**
→ Claude copy-pastet. Korrektur: *"Pro Produkt EIN eigenes Template mit unique Daten (name, sku, image, price). Kein generisches Template mit Variablen — individuelle Files, die ich direkt deployen kann."*

**FAQ-Schema hat Marketing-Fragen ("Was macht uns einzigartig?")**
→ *"FAQ-Schema nur für echte User-Fragen, nicht Marketing. Streiche alle Selbstbelobigungs-Fragen. Behalte nur Fragen, die User vor Kauf tatsächlich stellen: Lieferung, Haltbarkeit, Allergene, Zahlung, Retouren, Preis."*

**Plattform-Integration unklar**
→ *"Ich bin auf [Plattform]. Gib mir für jedes Schema: (1) genaue Datei + Zeile wo es rein kommt, (2) Copy-Paste-Code mit bereits eingefügten Liquid/PHP/JS-Variablen, (3) Test-URL zum Validieren nach Deploy."*

## Nächste Phase (nach allen 8 Phasen)

Du bist durch. Der initiale Build ist komplett. Ab jetzt läuft es operational:

**Wöchentlich:**
- GSC-Check: Impressions, CTR, Position pro Seite
- Seiten unter 2% CTR → Meta-Tags überarbeiten (Prompt 07)

**Monatlich:**
- 1-2 neue Content-Pieces (Prompt 03 → 05 → 06 → 07)
- Schema-Errors in GSC abarbeiten

**Quartalsweise:**
- Keyword-Map refresh (Prompt 02)
- Technical Audit refresh (Prompt 01)
- Master-Brief Review + Update (Prompt 04)

**Jährlich:**
- Kompletten Workflow neu durchgehen
- Vergleich: Ranking-Performance Y/Y
- Architektur-Refresh falls nötig

**Skalierungs-Tipp:** Wenn du Content-Team hast: Prompt 04 (Master-Brief) und Prompt 06 (Evaluate) bleiben bei dir. Prompts 02, 03, 05, 07 können Teammitglieder selbstständig fahren — der Brief diszipliniert die Qualität.
