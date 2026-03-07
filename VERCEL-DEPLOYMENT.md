# Anleitung: Website mit Vercel deployen + Domain (Cloudflare)

Diese Anleitung zeigt, wie du die Website auf Vercel hostest und deine bei Cloudflare gekaufte Domain **erikvongregory.com** daran anschließt.

---

## Teil 1: Website auf Vercel deployen

### Schritt 1: Vercel-Account erstellen
1. Öffne **https://vercel.com**
2. Klicke auf **Sign Up**
3. Melde dich mit **GitHub** an (empfohlen, da dein Code dort liegt)

### Schritt 2: Projekt erstellen
1. Nach dem Login: **Add New** → **Project**
2. Wähle dein Repository **erikvongregory-gif/erikvongregory**
3. Falls das Repo nicht erscheint: **Adjust GitHub App Permissions** und gib Vercel Zugriff auf die benötigten Repos

### Schritt 3: Build-Konfiguration (Vercel erkennt Next.js automatisch)
- **Framework Preset:** Next.js (sollte automatisch erkannt werden)
- **Root Directory:** leer lassen
- **Build Command:** `npm run build` (Standard)
- **Output Directory:** `out` (wichtig für Static Export!)
- **Install Command:** `npm install`

> ⚠️ **Wichtig:** Da du `output: 'export'` in next.config.ts hast, muss Vercel das wissen. Bei Static Export setze **Output Directory** auf `out`.

### Schritt 4: Deploy starten
1. Klicke auf **Deploy**
2. Warte 1–2 Minuten – der Build läuft durch
3. Danach bekommst du eine URL wie `erikvongregory-xxx.vercel.app`

---

## Teil 2: Eigene Domain verbinden

### Schritt 5: Domain in Vercel hinzufügen
1. In Vercel: Dein Projekt öffnen
2. **Settings** → **Domains**
3. Klicke auf **Add**
4. Gib ein: `erikvongregory.com`
5. Klicke **Add**
6. Wieder **Add** → `www.erikvongregory.com` eingeben → **Add**

Vercel zeigt dir nun die benötigten DNS-Einträge an.

---

## Teil 3: DNS bei Cloudflare einrichten

### Schritt 6: Cloudflare Dashboard öffnen
1. Gehe zu **https://dash.cloudflare.com**
2. Wähle deine Domain **erikvongregory.com**

### Schritt 7: DNS-Records anlegen
1. Klicke links auf **DNS** → **Records**
2. Lösche ggf. bestehende A- oder CNAME-Records für `@` und `www` (falls sie auf etwas anderes zeigen)
3. Füge zwei neue Records hinzu:

**Record 1 – Root-Domain:**
- **Type:** CNAME
- **Name:** `@`
- **Target:** `cname.vercel-dns.com`
- **Proxy status:** Proxied (Orange Cloud) oder DNS only (Grau) – beides funktioniert

**Record 2 – www:**
- **Type:** CNAME  
- **Name:** `www`
- **Target:** `cname.vercel-dns.com`
- **Proxy status:** Proxied (Orange) oder DNS only

4. **Save** klicken

### Schritt 8: SSL prüfen
- Unter **SSL/TLS** → **Overview** sollte **Full** oder **Full (strict)** eingestellt sein

---

## Teil 4: Verbindung prüfen

- DNS-Änderungen können 5–60 Minuten dauern
- In Vercel unter **Domains** siehst du den Status (z.B. „Valid Configuration“)
- Öffne **https://erikvongregory.com** – die Website sollte laden

---

## Troubleshooting

| Problem | Lösung |
|---------|--------|
| Domain nicht erreichbar | 5–60 Min. warten, Browser-Cache leeren, Incognito testen |
| „Invalid Configuration“ in Vercel | DNS-Einträge prüfen, Target muss exakt `cname.vercel-dns.com` sein |
| Build schlägt fehl | In Vercel: Settings → General → Output Directory auf `out` setzen |
| 404 auf Unterseiten | Static Export sollte /impressum und /datenschutz mitliefern – prüfen ob diese Routes existieren |

---

## Kurz-Übersicht

1. **Vercel:** Repo verbinden → Deploy
2. **Vercel:** Domains `erikvongregory.com` und `www.erikvongregory.com` hinzufügen
3. **Cloudflare:** CNAME `@` und `www` → `cname.vercel-dns.com`
4. Warten, testen, fertig.
