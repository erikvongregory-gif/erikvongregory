# Auth Incident Runbook

## Ziel
Schnelle Stabilisierung bei Login-Stoerungen, ohne unkontrollierte Folgeschaeden.

## SLOs und Alarme
- Login Success Rate >= 99.9% (5-Minuten-Fenster).
- Auth-5xx-Rate < 0.5%.
- P95 Login-Latenz < 400 ms (ohne externe OAuth-Provider-Latenz).
- Alarm, wenn:
  - Login-Fehlerquote > 2% fuer 5 Minuten.
  - P95 > 800 ms fuer 10 Minuten.
  - 429-Rate ploetzlich > 10x Baseline.

## Sofortcheck (erste 10 Minuten)
1. Vercel Functions: 5xx, Timeouts, Cold-Start-Trend pruefen.
2. Supabase Auth Health und Latenz pruefen.
3. Letzte Deployments, Feature-Flags und Environment-Aenderungen pruefen.
4. Strukturierte Auth-Logs nach `requestId`, `event`, `status` und `durationMs` filtern.

## Sofortmassnahmen
- Bei Credential-Stuffing/Bot-Wellen:
  - Rate-Limits fuer `auth-signin` und `auth-signup` kurzfristig verschaerfen.
  - CAPTCHA/WAF-Challenge vor Login aktivieren.
- Bei Upstream-Latenz:
  - Nichtkritische Auth-Nebenpfade deaktivieren (z. B. optionale Enrichment-Calls).
  - Read-only Degradation fuer nichtkritische Dashboard-Features aktivieren.
- Bei Regressionsverdacht:
  - Sofortiger Rollback auf letzte stabile Version.

## Kommunikation
- Interne Status-Updates alle 15 Minuten mit:
  - Nutzerwirkung
  - aktueller Fehlerquote
  - getroffenen Mitigations
  - ETA bis Stabilisierung

## Postmortem-Template
- Ausloeser
- Impact (Zeitfenster, betroffene Nutzer)
- Warum Alerting gegriffen/nicht gegriffen hat
- Konkrete Preventive Actions mit Owner und Due Date
