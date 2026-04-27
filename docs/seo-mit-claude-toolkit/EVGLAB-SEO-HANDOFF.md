# EVGLAB SEO Handoff (manuell durchzufuehren)

Diese Punkte kann ich nicht vollautomatisch im Code fuer dich erledigen. Bitte in dieser Reihenfolge abarbeiten.

## 1) Google Search Console (Pflicht)

- Property fuer `https://evglab.com` anlegen (URL-Prefix oder Domain Property).
- Verifizierung setzen:
  - Entweder DNS-TXT in deinem Domain-Provider, oder
  - HTML-Tag in `SITE.googleSiteVerification` eintragen.
- `https://evglab.com/sitemap.xml` in GSC einreichen.
- Indexierung fuer diese Seiten manuell anstossen:
  - `/`
  - `/loesungen/saisonkampagne-brauerei`
  - `/loesungen/biergarten-event-marketing`
  - `/loesungen/haendler-gastro-promotion`
  - `/impressum`, `/datenschutz`, `/agb`

## 2) Rich Results und Social Validatoren

- Google Rich Results Test fuer Startseite + 3 Loesungsseiten laufen lassen.
- Search Console Bereich "Verbesserungen" auf neue Schema-Fehler pruefen.
- Open Graph checken:
  - LinkedIn Post Inspector
  - Facebook Sharing Debugger

## 3) PageSpeed / Core Web Vitals (extern)

- PageSpeed Insights auf Mobile und Desktop fuer die 4 Hauptseiten pruefen.
- Zielwerte:
  - LCP < 2.5s
  - CLS < 0.1
  - INP < 200ms
- Falls rot/gelb: Screenshot oder Bericht exportieren, dann kann ich die Performance-Fixes direkt einbauen.

## 4) CTR-Optimierung nach 2-4 Wochen

- In GSC "Suchergebnisse" nach Seiten filtern.
- Wenn CTR < 2% bei Impressionen > 100:
  - Title und Meta Description variieren (A/B in Zeitfenstern).
- Ich kann dir dann datenbasiert neue Meta-Sets pro Seite schreiben.

## 5) Assets und Medien (optional, hoher Hebel)

- Eigene OG-Bilder pro Landingpage erstellen (1200x630, <1 MB).
- Dateinamen sprechend halten (z. B. `ki-saisonkampagne-brauerei-evglab.png`).
- Danach koennen wir pro Seite dedizierte OG-Images statt globalem Default setzen.
