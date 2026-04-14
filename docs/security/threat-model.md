# Threat Model

## Scope
- Web app: Landing, Auth, Dashboard, Admin.
- API routes under `src/app/api/**`.
- Auth routes under `src/app/auth/**`.
- Integrations: Supabase, Stripe, Anthropic, Kie, Resend.

## Critical Assets
- User sessions and auth cookies.
- Admin access and 2FA state.
- Billing state, tokens, subscription status.
- Invite tokens and onboarding metadata.
- Service credentials and API keys.

## Trust Boundaries
- Browser -> Next.js route handlers.
- Next.js -> Supabase (anon vs service role).
- Next.js -> third-party APIs (Stripe/Kie/Anthropic/Resend).
- Admin-only operations vs authenticated user operations.

## Primary Threats
- Credential stuffing and account takeover.
- 2FA brute-force and session replay.
- CSRF/origin bypass on mutating endpoints.
- Privilege escalation to admin endpoints.
- Prompt/API-cost abuse via authenticated misuse.
- SSRF and remote file abuse in download paths.
- Sensitive error leakage and over-verbose logging.

## Existing Controls
- Input validation (zod) on major JSON routes.
- Same-origin guard on many mutating routes.
- Rate limiting on key endpoints.
- Supabase auth checks and role gating.

## Required Controls
- Persistent rate limit backend (Redis/KV).
- Hard secret requirements (no insecure fallback).
- Route-by-route CSRF/origin consistency.
- Admin 2FA retry limits and lockout.
- Sanitized error responses and redacted logs.
- CSP hardening plan to reduce inline/eval exposure.

## Abuse Cases To Validate
- Repeated invalid 2FA verify attempts.
- Cross-origin POST to auth/admin routes.
- Non-authenticated prompt generation attempt.
- High-frequency prompt generation from one account.
- Forged admin patch requests.
- Malformed payload flooding on public endpoints.
