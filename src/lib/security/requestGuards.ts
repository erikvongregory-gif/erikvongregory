import { NextResponse } from "next/server";

type RateLimitRule = {
  keyPrefix: string;
  limit: number;
  windowMs: number;
};

type RateLimitBucket = {
  count: number;
  resetAt: number;
};

const rateBuckets = new Map<string, RateLimitBucket>();

function getClientIdentifier(req: Request): string {
  const forwardedFor = req.headers.get("x-forwarded-for");
  if (forwardedFor) {
    const firstIp = forwardedFor.split(",")[0]?.trim();
    if (firstIp) return firstIp;
  }
  return req.headers.get("x-real-ip") || "unknown-client";
}

export function enforceRateLimit(req: Request, rule: RateLimitRule): NextResponse | null {
  const now = Date.now();
  const key = `${rule.keyPrefix}:${getClientIdentifier(req)}`;
  const entry = rateBuckets.get(key);
  if (!entry || entry.resetAt <= now) {
    rateBuckets.set(key, { count: 1, resetAt: now + rule.windowMs });
    return null;
  }
  if (entry.count >= rule.limit) {
    const retryAfter = Math.max(1, Math.ceil((entry.resetAt - now) / 1000));
    return NextResponse.json(
      { error: "Zu viele Anfragen. Bitte kurz warten." },
      {
        status: 429,
        headers: { "Retry-After": String(retryAfter) },
      },
    );
  }
  entry.count += 1;
  rateBuckets.set(key, entry);
  return null;
}

export function sanitizeTaskId(taskId: string): string {
  const cleaned = taskId.replace(/[^a-zA-Z0-9_-]/g, "").slice(0, 80);
  return cleaned || `${Date.now()}`;
}

export function enforceSameOrigin(req: Request): NextResponse | null {
  const requestOrigin = req.headers.get("origin");
  if (!requestOrigin) {
    return NextResponse.json({ error: "Origin-Header fehlt." }, { status: 403 });
  }
  const targetOrigin = new URL(req.url).origin;
  if (requestOrigin !== targetOrigin) {
    return NextResponse.json({ error: "Ungültige Herkunft." }, { status: 403 });
  }
  return null;
}
