# So wirst du bei Google gefunden (BrewAI)

Die technische SEO ist eingebaut und auf **https://brewai.de** ausgelegt.
Damit Google indexiert, erledigst du diese Schritte:

---

## 1. Website online

- Domain **brewai.de** zeigt auf Vercel (bereits eingerichtet)
- Canonical im Code: `SITE.baseUrl` → `https://brewai.de`
- Alte Domains (`ki.evglab.com`, `erikvongregory.com`, `www.brewai.de`) leiten per 308 um

---

## 2. Google Search Console

1. [search.google.com/search-console](https://search.google.com/search-console)
2. Eigentum: Domain `brewai.de` **oder** URL-Präfix `https://brewai.de`
3. Verifizierung (DNS oder HTML-Tag)
4. Bei HTML-Tag: Wert in `src/lib/siteConfig.ts` → `googleSiteVerification` → Redeploy → Bestätigen

---

## 3. Sitemap einreichen

In GSC → **Sitemaps** → eintragen:

```text
https://brewai.de/sitemap.xml
```

Enthalten: Start, Lösungen, Über uns, Ratgeber, Impressum, Datenschutz, AGB.

---

## 4. Indexierung anstoßen

URL-Prüfung für:

- `https://brewai.de/`
- `https://brewai.de/loesungen`
- `https://brewai.de/ratgeber`
- `https://brewai.de/ueber-uns`

Dann **Indexierung beantragen**.

---

## 5. Kurz prüfen

- `https://brewai.de/robots.txt`
- `https://brewai.de/llms.txt`

Detaillierte Checkliste: `docs/seo-mit-claude-toolkit/EVGLAB-SEO-HANDOFF.md`

---

## 6. Geduld

Erste Indexierung oft **einige Tage bis 2 Wochen**. Danach Suchanfragen wie „KI Marketing Brauerei“ / „BrewAI“.
