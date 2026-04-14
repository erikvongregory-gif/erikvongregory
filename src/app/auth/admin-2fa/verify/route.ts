import { NextRequest, NextResponse } from "next/server";
import {
  buildPending2FAToken,
  buildVerified2FAToken,
  createOneTimeCode,
  getPendingCookieName,
  getVerifiedCookieName,
  sendAdmin2FACodeEmail,
  verifyPending2FACode,
} from "@/lib/admin/emailTwoFactor";
import { enforceRateLimitPersistent, enforceSameOrigin } from "@/lib/security/requestGuards";
import { createRouteHandlerClient } from "@/lib/supabase/server";

export async function POST(request: NextRequest) {
  const { origin, hostname } = new URL(request.url);
  const originError = enforceSameOrigin(request);
  if (originError) return originError;
  const secureCookies = process.env.NODE_ENV === "production";
  const cookieDomain =
    secureCookies && (hostname === "evglab.com" || hostname.endsWith(".evglab.com"))
      ? "evglab.com"
      : undefined;
  const formData = await request.formData();
  const action = String(formData.get("action") ?? "verify");
  const code = String(formData.get("code") ?? "").trim();

  const authResponse = NextResponse.next();
  const supabase = createRouteHandlerClient(request, authResponse);
  const withAuthCookies = (response: NextResponse) => {
    for (const cookie of authResponse.cookies.getAll()) {
      response.cookies.set(cookie.name, cookie.value, cookie);
    }
    return response;
  };
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const role =
    typeof user?.user_metadata?.role === "string"
      ? String(user.user_metadata.role).toLowerCase()
      : "";
  if (!user || role !== "admin" || !user.email) {
    return NextResponse.redirect(`${origin}/?auth=signin&error=auth`, 303);
  }
  const baseIdentifier = `admin2fa:${user.id}`;
  const baseRateError = await enforceRateLimitPersistent(request, {
    keyPrefix: "admin-2fa-verify-base",
    limit: 20,
    windowMs: 60_000,
  }, { identifier: baseIdentifier });
  if (baseRateError) return baseRateError;

  const pendingToken = request.cookies.get(getPendingCookieName())?.value ?? null;
  if (!pendingToken) {
    return NextResponse.redirect(`${origin}/?auth=signin&error=admin_2fa_session_expired`, 303);
  }

  if (action === "resend") {
    const resendRateError = await enforceRateLimitPersistent(
      request,
      { keyPrefix: "admin-2fa-resend", limit: 3, windowMs: 10 * 60_000 },
      { identifier: baseIdentifier },
    );
    if (resendRateError) return resendRateError;
    const newCode = createOneTimeCode();
    try {
      await sendAdmin2FACodeEmail({ to: user.email, code: newCode });
    } catch {
      return NextResponse.redirect(`${origin}/?auth=signin&notice=admin_2fa_required&error=email_failed`, 303);
    }
    const nextPending = buildPending2FAToken({
      userId: user.id,
      email: user.email,
      code: newCode,
      ttlSeconds: 600,
    });
    const resendResponse = NextResponse.redirect(`${origin}/?auth=signin&notice=admin_2fa_resent`, 303);
    resendResponse.cookies.set(getPendingCookieName(), nextPending, {
      httpOnly: true,
      sameSite: "lax",
      secure: secureCookies,
      ...(cookieDomain ? { domain: cookieDomain } : {}),
      path: "/",
      maxAge: 60 * 10,
    });
    return withAuthCookies(resendResponse);
  }

  if (!code) {
    return NextResponse.redirect(`${origin}/?auth=signin&notice=admin_2fa_required&error=missing_code`, 303);
  }
  const verifyRateError = await enforceRateLimitPersistent(
    request,
    { keyPrefix: "admin-2fa-code-verify", limit: 5, windowMs: 10 * 60_000 },
    { identifier: baseIdentifier },
  );
  if (verifyRateError) return verifyRateError;

  const result = verifyPending2FACode(pendingToken, {
    userId: user.id,
    code,
  });
  if (!result.ok) {
    return NextResponse.redirect(`${origin}/?auth=signin&notice=admin_2fa_required&error=admin_2fa_invalid`, 303);
  }

  const verifiedToken = buildVerified2FAToken({
    userId: user.id,
    ttlSeconds: 60 * 60 * 12,
  });
  const done = NextResponse.redirect(`${origin}/dashboard`, 303);
  done.cookies.set(getVerifiedCookieName(), verifiedToken, {
    httpOnly: true,
    sameSite: "lax",
    secure: secureCookies,
    ...(cookieDomain ? { domain: cookieDomain } : {}),
    path: "/",
    maxAge: 60 * 60 * 12,
  });
  done.cookies.set(getPendingCookieName(), "", {
    httpOnly: true,
    sameSite: "lax",
    secure: secureCookies,
    ...(cookieDomain ? { domain: cookieDomain } : {}),
    path: "/",
    maxAge: 0,
  });
  return withAuthCookies(done);
}
