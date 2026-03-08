# So wirst du bei Google gefunden

Die technische SEO ist bereits eingebaut. Damit Google deine Seite indexiert und anzeigt, musst du diese Schritte erledigen:

---

## 1. Website online stellen

Die Seite muss im Internet erreichbar sein – z.B. auf:

- **Vercel** (empfohlen, kostenlos): [vercel.com](https://vercel.com) → Repo verbinden → Deploy
- **Netlify**, **GitHub Pages** oder dein eigener Server

Wichtig: Die Domain muss auf die richtige Adresse zeigen (z.B. `erikvongregory.de`).

---

## 2. Google Search Console einrichten

1. Gehe zu **[search.google.com/search-console](https://search.google.com/search-console)**
2. Klicke auf **„Eigentum hinzufügen“**
3. Wähle **„URL-Präfix“** und gib deine Domain ein (z.B. `https://erikvongregory.de`)
4. **Verifizierung**: Wähle **„HTML-Tag“**
5. Kopiere den Wert aus `content="..."`, z.B. `abc123xyz456`
6. Trage ihn ein in **`src/lib/siteConfig.ts`** bei `googleSiteVerification`:
   ```ts
   googleSiteVerification: "abc123xyz456",
   ```
7. Website neu bauen und deployen
8. In der Search Console auf **„Bestätigen“** klicken

---

## 3. Sitemap einreichen

1. In der Google Search Console: links **„Sitemaps“** wählen
2. Bei **„Neue Sitemap hinzufügen“** eintragen: `sitemap.xml`
3. **„Senden“** klicken

Damit kennt Google alle deine Seiten.

---

## 4. URL zur Indexierung vorschlagen (optional)

1. In der Search Console oben die URL-Leiste nutzen
2. Deine Startseite eingeben: `https://erikvongregory.de`
3. Auf **„URL prüfen“** klicken
4. Anschließend **„Indexierung beantragen“** auswählen

---

## 5. Geduld

Die Aufnahme in den Google-Index dauert meist **1–2 Wochen**. Danach solltest du bei Suchanfragen wie „KI Brauerei“ oder „Erik von Gregory“ gefunden werden.
