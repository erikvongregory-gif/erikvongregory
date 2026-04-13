import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { isInviteOnlyEnabled, isSupabaseConfigured } from "@/lib/supabase/env";
import { createRouteHandlerClient } from "@/lib/supabase/server";
import { consumeInviteByToken } from "@/lib/invite/server";

export async function POST(request: Request) {
  const { origin } = new URL(request.url);
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

  const redirectResponse = NextResponse.redirect(`${origin}${safeNext}`, 303);
  redirectResponse.headers.set("Cache-Control", "no-store, max-age=0");
  const supabase = createRouteHandlerClient(request, redirectResponse);
  const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });
  if (signInError) {
    return NextResponse.redirect(`${origin}/?auth=signin&error=auth`, 303);
  }

  return redirectResponse;
}
