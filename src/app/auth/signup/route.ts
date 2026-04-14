import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { isInviteOnlyEnabled, isSupabaseConfigured } from "@/lib/supabase/env";
import { consumeInviteByToken } from "@/lib/invite/server";
import { enforceRateLimitPersistent, enforceSameOrigin } from "@/lib/security/requestGuards";

export async function POST(request: Request) {
  const { origin } = new URL(request.url);
  const originError = enforceSameOrigin(request);
  if (originError) return originError;
  const rateError = await enforceRateLimitPersistent(request, {
    keyPrefix: "auth-signup",
    limit: 6,
    windowMs: 60_000,
  });
  if (rateError) return rateError;
  if (!isSupabaseConfigured()) {
    return NextResponse.redirect(`${origin}/?auth=signup&error=config`, 303);
  }

  const formData = await request.formData();
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const breweryName = String(formData.get("brewery") ?? "").trim();
  const inviteToken = String(formData.get("inviteToken") ?? "").trim();
  const next = String(formData.get("next") ?? "/dashboard");
  const safeNext = next.startsWith("/") ? next : "/dashboard";

  if (!email || !password) {
    return NextResponse.redirect(`${origin}/?auth=signup&error=missing`, 303);
  }

  if (isInviteOnlyEnabled() && !inviteToken) {
    return NextResponse.redirect(`${origin}/?auth=signup&error=invite_required`, 303);
  }

  if (isInviteOnlyEnabled()) {
    const consumed = await consumeInviteByToken(inviteToken, email);
    if (!consumed.ok) {
      const reason =
        consumed.status === "expired"
          ? "invite_expired"
          : consumed.status === "used"
            ? "invite_used"
            : consumed.status === "email_mismatch"
              ? "invite_email_mismatch"
              : "invite_invalid";
      return NextResponse.redirect(`${origin}/?auth=signup&error=${reason}`, 303);
    }
  }

  const admin = createAdminClient();
  const { data, error } = await admin.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
    user_metadata: {
      brewery_name: breweryName || null,
      invited_account: isInviteOnlyEnabled(),
    },
  });

  if (error || !data.user) {
    return NextResponse.redirect(`${origin}/?auth=signup&error=auth`, 303);
  }

  if (isInviteOnlyEnabled()) {
    return NextResponse.redirect(`${origin}/?auth=signin&notice=invite_ready`, 303);
  }

  return NextResponse.redirect(`${origin}${safeNext}`, 303);
}
