# Auth Validation (Load + Security)

## Voraussetzungen
- Staging-URL in `BASE_URL` setzen.
- Fuer Lasttest lokal `k6` installiert.

## Security Regression
```bash
BASE_URL=https://staging.example.com npm run test:auth:security
```

Prueft aktuell:
- Cross-Origin Signin wird mit `403` blockiert.
- `/api/auth/status` ist erreichbar und liefert `x-request-id`.

## Load Baseline (k6)
```bash
BASE_URL=https://staging.example.com npm run test:auth:load
```

Erwartete Mindestwerte:
- `http_req_failed < 1%`
- `p95 < 400 ms`
- `p99 < 1200 ms`

## Erweiterungsempfehlung
- Realistische Login-Journeys mit Testkonten in separater Lasttest-Umgebung.
- Burst-Szenario fuer OAuth-Callback (`/auth/callback`) separat messen.
- Rate-Limit-Trigger als eigene Checks (429 + Retry-After) aufnehmen.
