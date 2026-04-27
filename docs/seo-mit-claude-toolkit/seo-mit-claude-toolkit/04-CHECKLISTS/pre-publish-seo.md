# Checklist — Pre-Publish SEO

## Wozu

Nach Evaluation, vor Publish. Letzte Hygiene-Schicht. 5 Minuten Arbeit, fängt 80% der typischen Last-Mile-Fehler.

Drucke die Liste oder kopiere sie in dein Notion. Pro Artikel einmal durch.

## On-Page-Hygiene

- [ ] **H1** existiert genau 1x, enthält Primary Keyword in den ersten 60 Zeichen
- [ ] **H2-Hierarchie** ist logisch (kein H3 ohne H2-Eltern, keine H4 ohne H3-Eltern)
- [ ] **Primary Keyword** kommt in den ersten 100 Wörtern vor (natürlich, nicht gestopft)
- [ ] **Primary Keyword** taucht in mindestens einem H2 auf
- [ ] **Secondary Keywords** verteilt im Text (mindestens 1x pro Keyword)
- [ ] **Keyword-Density** unter 2.5% (über 3% wirkt gespammt)
- [ ] **Erste 100 Wörter** sind Hook + Promise (nicht Einleitungs-Floskel)

## Meta-Tags

- [ ] **Title-Tag** unter 60 Zeichen, Primary Keyword in ersten 40 Zeichen
- [ ] **Meta-Description** zwischen 140-160 Zeichen, mit CTA und Primary Keyword
- [ ] **Open Graph Title** definiert (kann länger als Title-Tag sein, bis 90 Zeichen)
- [ ] **Open Graph Description** definiert (2-4 Sätze)
- [ ] **Open Graph Image** definiert (1200x630px, unter 1MB)
- [ ] **Twitter Card** definiert (oder fällt auf Open Graph zurück — beides ok)

## URL & Canonical

- [ ] **URL-Slug** ist kurz, lesbar, enthält Primary Keyword
- [ ] **URL-Slug** verwendet Bindestriche, keine Unterstriche, keine Großbuchstaben
- [ ] **Canonical-Tag** zeigt auf die Master-Version (wichtig wenn mehrere Versionen existieren — Print, AMP, Sprachvarianten)
- [ ] **Hreflang** gesetzt wenn Multi-Language

## Bilder

- [ ] **Alt-Text** bei allen Bildern (beschreibend, nicht keyword-gestopft)
- [ ] **Bild-Dateinamen** sprechend (nicht "IMG_4823.jpg" — sondern "snack-meal-napoli-tomate-basilikum.jpg")
- [ ] **Bild-Größe** optimiert (WebP wenn möglich, sonst JPG, max 200KB pro Bild für Hero-Images)
- [ ] **Lazy-Loading** aktiviert für Below-the-Fold-Bilder
- [ ] **Aspect-Ratio** definiert (verhindert Layout-Shift / CLS)

## Internal Linking

- [ ] **3-5 interne Links** im Artikel verteilt
- [ ] **Anchor-Text** ist beschreibend (nicht "hier klicken", nicht nackte URL)
- [ ] Mindestens **1 Link zu einer Conversion-Seite** (Produkt, Bundle, Sign-up)
- [ ] Mindestens **1 Link zu verwandtem Content** (gleiches Thema, andere Stage)
- [ ] **Keine 404-Links** (testen)

## External Linking

- [ ] **2-3 externe Links** zu autoritativen Quellen (wenn Faktenbehauptungen gemacht werden)
- [ ] **rel="noopener"** bei target="_blank" Links (Sicherheit)
- [ ] **rel="nofollow"** bei werblichen / affiliate / kommerziellen Links

## Schema Markup

- [ ] **Organization Schema** auf Site-Level vorhanden
- [ ] **Article / BlogPosting Schema** für diesen Artikel (mit headline, datePublished, dateModified, author, image)
- [ ] **FAQ Schema** wenn Artikel FAQ-Sektion hat
- [ ] **BreadcrumbList Schema** automatisch aus CMS oder manuell ergänzt
- [ ] **Validation:** Google Rich Results Test ohne Fehler bestanden

## Performance

- [ ] **Largest Contentful Paint (LCP)** unter 2.5s (PageSpeed Insights testen)
- [ ] **Cumulative Layout Shift (CLS)** unter 0.1
- [ ] **First Input Delay (FID)** unter 100ms (oder INP unter 200ms)
- [ ] **Mobile Score** über 75 (PageSpeed Insights)

## Content-Qualität (Final-Check)

- [ ] **Substitution-Test bestanden** (siehe Framework Depth-Protocol)
- [ ] **Keine em-dashes** (wenn Brand sie verbietet)
- [ ] **Keine AI-Tell-Phrasen** ("In today's", "Let's dive in", etc.)
- [ ] **CTA** ist klar und passt zur Buyer-Journey-Stage
- [ ] **Author byline** mit Name, ggf. Foto, ggf. Kurzbio (E-E-A-T)
- [ ] **Datum sichtbar** (datePublished + dateModified)

## CMS-Spezifisches (Shopify)

- [ ] **Robots.txt** lässt Page zu (nicht versehentlich blockiert)
- [ ] **Theme Settings:** kein noindex auf Blog gesetzt
- [ ] **App-Conflicts:** SEO-App (Yoast / Rank Math / Plug In SEO) hat keine Warnings
- [ ] **301-Redirect** angelegt wenn URL geändert wurde

## CMS-Spezifisches (WordPress)

- [ ] **Yoast / Rank Math** Score grün (oder akzeptable Begründung warum nicht)
- [ ] **Permalinks** sind "Post Name" (nicht "?p=123")
- [ ] **Kategorie + Tag** vergeben (max 1 Kategorie, 3-5 Tags)
- [ ] **Featured Image** gesetzt

## Post-Publish (innerhalb 24h)

- [ ] **In Sitemap** (wird automatisch generiert von Yoast / Rank Math)
- [ ] **In Google Search Console** zur Indexierung eingereicht (URL Inspection → Request Indexing)
- [ ] **Internal Links AUF die neue Seite** von 1-2 bestehenden Hub-Seiten ergänzt
- [ ] **Social Share** mindestens 1 Plattform (LinkedIn / Instagram / Twitter)

## Post-Publish (Woche 1-4)

- [ ] **Tag 3:** GSC-Check — wird die Seite gecrawlt?
- [ ] **Tag 7:** GSC-Check — ist sie indexiert?
- [ ] **Tag 14:** GSC-Check — gibt es erste Impressions?
- [ ] **Tag 30:** GSC-Check — CTR über 2%? Position unter 30?

Wenn Position über 30 nach 30 Tagen: Content-Tiefe checken, mehr interne Links setzen.
Wenn CTR unter 2%: Title + Meta umschreiben (siehe Prompt 07).

## Wenn diese Checklist regelmäßig 80%+ grün ist

Du bist über dem Niveau von 90% der Brand-Sites. Was bedeutet: Du wirst rankings sehen, die deine Wettbewerber nicht haben. Nicht weil dein Content magisch ist, sondern weil deine Hygiene es nicht ist.
