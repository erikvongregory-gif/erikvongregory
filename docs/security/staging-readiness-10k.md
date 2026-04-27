# Staging Readiness fuer 10k Concurrent Users

## Ziel
Vor dem Lasttest sicherstellen, dass Auth stabil, messbar und kontrolliert degradierbar bleibt.

## 1) Vercel Konfiguration
- Produktionsnahe Staging-Umgebung nutzen (eigene Domain, TLS, gleiche Runtime wie Prod).
- Region moeglichst nah an Supabase-Region waehlen (niedrige RTT fuer Auth-Calls).
- Gleiche Build- und Runtime-Settings wie Produktion (keine Sonderflags nur fuer Staging).
- Request-Timeouts und Error-Budgets dokumentieren.

## 2) Supabase Konfiguration
- Staging-Projekt mit realistischen Datenmengen (User, Team, Dashboard-Metadaten).
- Auth-Provider (E-Mail/OAuth) produktionsnah konfiguriert.
- `NEXT_PUBLIC_SUPABASE_URL` und `NEXT_PUBLIC_SUPABASE_ANON_KEY` korrekt gesetzt.
- Service-Role-Key nur serverseitig verwenden, niemals im Client exponieren.

## 3) Rate Limit Backend
- `UPSTASH_REDIS_REST_URL` und `UPSTASH_REDIS_REST_TOKEN` gesetzt.
- Redis/KV Latenz monitoren; Ziel: p95 klein genug, dass Login-Pfad nicht blockiert.
- Fallback-Verhalten pruefen (bei Upstash-Stoerung weiterhin kontrollierte lokale Limits).

## 4) Security Header und Session
- Cookies im Staging mit `HttpOnly`, `Secure`, `SameSite=Lax` validieren.
- Login/Logout/2FA-Flows auf konsistente `Cache-Control: no-store` Header pruefen.
- `x-request-id` End-to-End nachvollziehen (Edge -> API -> Logs).

## 5) Monitoring und Alerts (Mindestset)
- Auth Success Rate (5m): Alarm bei < 99.0%, Warnung bei < 99.5%.
- Auth Fehlerquote (5m): Alarm bei > 2%.
- Auth p95 Latenz (5m): Warnung > 600 ms, Alarm > 800 ms.
- Auth p99 Latenz (5m): Alarm > 1500 ms.
- 429-Rate: Warnung bei > 3x Baseline, Alarm bei > 10x Baseline.
- 5xx auf Auth-Routen: Alarm sobald > 0.5% fuer 5 Minuten.

## 6) Testreihenfolge (empfohlen)
1. Security-Regression:
   - `BASE_URL=<staging-url> npm run test:auth:security`
2. Baseline Last:
   - `BASE_URL=<staging-url> npm run test:auth:load`
3. Burst-Validierung:
   - Wiederholung bei hoeheren Arrival Rates bis zum Zielprofil.
4. Degradation-Test:
   - Kontrollierte Erhoehung von Supabase- oder Redis-Latenz und Verhalten bewerten.

## 7) Go/No-Go Kriterien
- Go:
  - Keine kritischen Security-Regressionen.
  - Auth Success Rate >= 99.9% im Zielprofil.
  - p95 im Zielbereich, keine unkontrollierten Error-Spikes.
- No-Go:
  - Wiederholbare 5xx-Spitzen im Login-Pfad.
  - Instabile Session-/Cookie-Semantik.
  - Fehlende Korrelation in Logs (`x-request-id` nicht durchgaengig).

## 8) Rollback / Mitigation
- Bei Login-Incident sofort Rate-Limits verschaerfen.
- Optionale, nichtkritische Features temporar deaktivieren (Graceful Degradation).
- Falls Regressionsverdacht: letzter stabiler Deploy-Stand wiederherstellen.
- Schritte und Learnings im Runbook pflegen:
  - `docs/security/auth-incident-runbook.md`
