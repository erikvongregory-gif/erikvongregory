# Checklist — Schema Validation

## Wozu

Schema deployen ist nicht "fertig". 70% der Brands haben Schema-Errors die sie nicht sehen. Diese Checkliste fängt sie alle.

15 Min pro Site-Audit. Wiederhole bei jedem neuen Schema-Deployment.

## Stufe 1 — Validierung Tools

Jedes Schema MUSS durch beide Tools laufen. Bestehen reicht nicht — verstehen was sie sagen.

- [ ] **Google Rich Results Test** (https://search.google.com/test/rich-results) — pro Schema-haltige Seite einmal
- [ ] **Schema.org Validator** (https://validator.schema.org/) — pro JSON-LD-Block einmal
- [ ] **Google Search Console → Enhancements → [Schema-Typ]** wöchentlich checken (zeigt Real-World-Errors)

## Stufe 2 — Pro Schema-Typ Checkliste

### Organization

- [ ] `@context` ist `"https://schema.org"` (mit https, mit www nicht nötig)
- [ ] `@type` ist `"Organization"` (nicht "Corporation" oder "Brand" außer du weißt warum)
- [ ] `name` exakt wie deine Marke (keine Tippfehler, keine Variationen)
- [ ] `url` zeigt auf deine Homepage (mit https, ohne trailing slash bei root)
- [ ] `logo` ist absolute URL (https://...) zu PNG oder SVG, mind. 112x112px, optimal 600x600px
- [ ] `sameAs` enthält ALLE deine Social-Profile-URLs (nicht Display-Name, nicht @-Handle, sondern volle URL)
- [ ] `contactPoint` mit `contactType` definiert (z.B. "customer service")
- [ ] `address` mit mindestens `addressCountry` (z.B. "DE")

### WebSite

- [ ] `@type` ist `"WebSite"`
- [ ] `url` zeigt auf Homepage
- [ ] `name` = Brand-Name (gleicher String wie in Organization.name)
- [ ] `potentialAction` enthält `SearchAction` für Google SiteLinks Searchbox
- [ ] `target` in SearchAction ist deine Such-URL mit `{search_term_string}` Platzhalter
- [ ] `query-input` ist `"required name=search_term_string"`

### Product

- [ ] `@type` ist `"Product"`
- [ ] `name` = exakter Produktname
- [ ] `description` mind. 50 Wörter, max 5000 Zeichen
- [ ] `image` ist ARRAY (auch wenn nur 1 Bild), absolute URLs
- [ ] `brand` mit `@type: "Brand"` und `name` definiert
- [ ] `sku` vorhanden (Produkt-SKU oder eindeutiger Identifier)
- [ ] `offers` mit:
  - [ ] `@type: "Offer"`
  - [ ] `price` als ZAHL ohne Quotes (nicht "23.94" sondern 23.94)
  - [ ] `priceCurrency` als ISO 4217 Code (z.B. "EUR")
  - [ ] `availability` als VOLLE URL (https://schema.org/InStock — nicht nur "InStock")
  - [ ] `priceValidUntil` (Datum bis wann der Preis gilt — empfohlen für Rich Results)
  - [ ] `url` (Direkt-Link zum Produkt)
- [ ] `aggregateRating` NUR wenn du ECHTE Reviews hast (nicht erfunden)
  - [ ] `ratingValue` als Zahl
  - [ ] `reviewCount` als Zahl (oder `ratingCount`)
  - [ ] Beide Werte müssen mit dem übereinstimmen, was visuell auf der Seite steht
- [ ] Bei Lebensmitteln: `nutrition` mit `NutritionInformation`-Objekt

### FAQPage

- [ ] `@type` ist `"FAQPage"`
- [ ] `mainEntity` ist Array mit `Question`-Objekten
- [ ] Pro `Question`:
  - [ ] `name` = die Frage (als String, mit Fragezeichen)
  - [ ] `acceptedAnswer` mit `@type: "Answer"` und `text` = die Antwort
- [ ] Antworten sind ECHTE Antworten (nicht Marketing-Pitches)
- [ ] FAQ existiert visuell auf der Seite (nicht versteckt — Google fordert sichtbare Übereinstimmung)
- [ ] Keine Marketing-Fragen ("Warum sind wir die Besten?" — Google straft das ab)

### BreadcrumbList

- [ ] `@type` ist `"BreadcrumbList"`
- [ ] `itemListElement` ist Array von `ListItem`-Objekten
- [ ] Pro `ListItem`:
  - [ ] `position` als Zahl (1, 2, 3...)
  - [ ] `name` = Anzeigename des Crumbs
  - [ ] `item` = absolute URL der Stufe (außer letzter — letzter Crumb braucht kein item)
- [ ] Reihenfolge stimmt mit visueller Breadcrumb überein

### Article / BlogPosting

- [ ] `@type` ist `"Article"` oder `"BlogPosting"` (BlogPosting ist Subtype von Article — beides ok)
- [ ] `headline` ist H1 oder kürzer (max 110 Zeichen)
- [ ] `image` ist Array mit mindestens einem Bild (absolute URL, mind. 1200x630px)
- [ ] `datePublished` als ISO 8601 (`"2026-04-13T08:00:00+02:00"`)
- [ ] `dateModified` als ISO 8601 (gleich oder später als datePublished)
- [ ] `author` mit `@type: "Person"` (oder Organization) und `name`
- [ ] `publisher` mit `@type: "Organization"`, `name`, und `logo` (verschachteltes ImageObject)
- [ ] `mainEntityOfPage` zeigt auf die Article-URL

### HowTo

- [ ] `@type` ist `"HowTo"`
- [ ] `name` = der Titel der Anleitung
- [ ] `step` ist Array von `HowToStep`-Objekten
- [ ] Pro `HowToStep`:
  - [ ] `name` = kurzer Schritt-Titel
  - [ ] `text` = ausführliche Beschreibung
  - [ ] Optional: `image`, `url`
- [ ] Optional aber empfohlen: `totalTime` als ISO 8601 Duration (`"PT30M"` für 30 Min)
- [ ] Optional: `tool`, `supply` Arrays

## Stufe 3 — Häufige Fehler & Quick-Fixes

| Fehler | Ursache | Fix |
|--------|---------|-----|
| `@context should be a URL` | http statt https | `"@context": "https://schema.org"` |
| `Required field "image" is missing` | Image als String statt Array | `"image": ["https://..."]` (Array, auch bei 1 Bild) |
| `Field "price" should be a number` | Quotes um Preis | `"price": 23.94` (ohne Quotes) |
| `Required field "availability" missing` | Availability nicht gesetzt | `"availability": "https://schema.org/InStock"` (volle URL) |
| `aggregateRating without reviewCount` | Nur ratingValue | `reviewCount` UND `ratingValue` beide Pflicht |
| `Invalid date format` | Lokales Datum statt ISO | `"datePublished": "2026-04-13T08:00:00+02:00"` |
| `Logo dimensions too small` | Logo unter 112px | Logo mind. 600x600px hochladen |
| `Image dimensions too small for Article` | Bild unter 1200x630px | Featured Image vergrößern |
| `Multiple Organization schemas` | Theme + manuell beide injecten | Eines deaktivieren, nur eines aktiv lassen |

## Stufe 4 — Site-Wide Tests

- [ ] **Sitemap.xml** existiert und ist in robots.txt referenziert
- [ ] **robots.txt** blockiert keine wichtigen Seiten
- [ ] **GSC** hat Sitemap akzeptiert (kein "Couldn't fetch" Status)
- [ ] **GSC → Pages** Tab zeigt mehr "Indexed" als "Not Indexed" für deine wichtigen URLs
- [ ] **GSC → Enhancements** zeigt Schema-Typen die du erwartest (Products, FAQ, Articles)
- [ ] **Strukturierte Daten Coverage:** GSC zeigt 0 oder sehr wenige Errors pro Schema-Typ

## Stufe 5 — Monitoring nach Deploy

- [ ] **Tag 1:** Schema validiert in Rich Results Test
- [ ] **Tag 7:** GSC zeigt Schema unter Enhancements
- [ ] **Tag 14:** Errors-Count in GSC-Enhancements stabil oder fallend
- [ ] **Tag 30:** Erste Rich Results sichtbar in SERP (testen mit Site-Search "site:deinedomain.de keyword")

## Anti-Patterns die viel Schmerz erzeugen

**Anti-Pattern 1:** Schema für Inhalte die nicht visuell auf der Seite sind. Google bestraft.
→ Schema MUSS mit visuellem Content übereinstimmen.

**Anti-Pattern 2:** AggregateRating mit erfundenen Zahlen.
→ Google entdeckt das mit Pattern-Recognition. Strafe: Rich Results entzogen für die ganze Site.

**Anti-Pattern 3:** Mehrere Organization-Schemas auf der gleichen Seite.
→ Google ignoriert dann oft beide. Genau eines pro Site, am besten in der Header-Komponente.

**Anti-Pattern 4:** FAQ-Schema für Marketing-FAQs.
→ "Warum sollte ich [Brand] kaufen?" ist kein FAQ. Google bestraft das. Nur echte Nutzerfragen.

**Anti-Pattern 5:** Schema testen, dann nie wieder anschauen.
→ Plattform-Updates können Schema brechen. Monatlich GSC-Enhancements checken.
