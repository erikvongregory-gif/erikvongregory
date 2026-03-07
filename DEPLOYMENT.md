# Cloudflare Pages – Deployment

Diese App nutzt **Next.js Static Export** (kein Server, nur statische Dateien).

## Build-Konfiguration in Cloudflare

Im Cloudflare Dashboard → **Workers & Pages** → dein Projekt → **Settings** → **Builds & deployments**:

| Einstellung | Wert |
|-------------|------|
| **Framework preset** | `Next.js (Static HTML Export)` |
| **Build command** | `npm run build` |
| **Build output directory** | `out` |
| **Deploy command** | *leer lassen* (kein `npx wrangler deploy`) |

## Wichtig

- **Kein** Custom Deploy Command – Cloudflare Pages deployed automatisch nach dem Build
- **Nicht** „Next.js (OpenNext)“ oder „Workers“ verwenden – das erwartet einen Node-Server

## Neues Pages-Projekt anlegen (falls nötig)

1. **Workers & Pages** → **Create** → **Pages** → **Connect to Git**
2. Repo auswählen
3. Framework: **Next.js (Static HTML Export)**
4. Branch: `main`
5. **Save and Deploy**
