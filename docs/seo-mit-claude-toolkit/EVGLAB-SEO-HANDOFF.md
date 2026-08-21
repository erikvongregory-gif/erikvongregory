# BrewAI SEO Handoff (manuell nach Deploy)

Technisches SEO ist im Code auf **https://brewai.de** vorbereitet.
Diese Schritte musst du einmalig in den Webmaster-Tools erledigen.

## 1) Google Search Console (Pflicht)

1. Eigentum hinzufügen:
   - **Domain-Property** `brewai.de` (empfohlen, deckt www + Apex ab), oder
   - **URL-Präfix** `https://brewai.de`
2. Verifizierung:
   - DNS-TXT beim Domain-Provider, **oder**
   - HTML-Tag → Wert in `src/lib/siteConfig.ts` bei `googleSiteVerification` eintragen → Redeploy
3. Sitemap einreichen: `https://brewai.de/sitemap.xml`
4. Alte Property (`ki.evglab.com` / `erikvongregory.com`) in GSC:
   - Adresseänderung / Umzug nutzen, falls angeboten
   - Sonst Sitemap der alten Domain entfernen; 308-Redirects greifen über Middleware
5. Indexierung anstoßen (URL-Prüfung):
   - `https://brewai.de/`
   - `https://brewai.de/loesungen`
   - `https://brewai.de/ratgeber`
   - `https://brewai.de/ueber-uns`
6. **Nicht** indexieren (bereits noindex im Code): `/vergleich/*`, `/preise/vergleich`, App-Pfade

## 2) Bing Webmaster Tools (empfohlen)

1. `https://www.bing.com/webmasters` → Site `https://brewai.de`
2. Sitemap: `https://brewai.de/sitemap.xml`
3. Optional: `bingSiteVerification` in `siteConfig.ts` setzen

## 3) Live-Checks nach Deploy

| URL | Erwartung |
|-----|-----------|
| https://brewai.de/robots.txt | Allow `/`, Disallow App/Auth, Sitemap + Host `brewai.de` |
| https://brewai.de/sitemap.xml | 7 Canonical-URLs unter brewai.de |
| https://brewai.de/llms.txt | Marke BrewAI, Canonical-Links |

Validatoren:

- [Google Rich Results Test](https://search.google.com/test/rich-results) — Start, `/loesungen`, `/ratgeber`
- [Google Mobile-Friendly](https://search.google.com/test/mobile-friendly)
- LinkedIn Post Inspector / Facebook Sharing Debugger — OG-Bild

## 4) Core Web Vitals

PageSpeed Insights für die 4 Hauptseiten (Mobile + Desktop).

Ziele: LCP &lt; 2.5s · CLS &lt; 0.1 · INP &lt; 200ms

## 5) CTR nach 2–4 Wochen

In GSC „Suchergebnisse“: bei CTR &lt; 2% und Impressionen &gt; 100 Title/Description anpassen.

## Code-Referenzen

- Canonical / Meta: `src/lib/siteConfig.ts`, `src/app/layout.tsx`
- robots: `src/app/robots.ts`
- sitemap: `src/app/sitemap.ts`
- llms.txt: `src/app/llms.txt/route.ts`
- JSON-LD: `src/components/JsonLd.tsx`
- Legacy-Hosts → brewai.de: `middleware.ts` + `SITE.legacyHosts`
