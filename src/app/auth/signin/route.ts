import { NextResponse } from "next/server";
import {
  buildPending2FAToken,
  createOneTimeCode,
  getPendingCookieName,
  sendAdmin2FACodeEmail,
} from "@/lib/admin/emailTwoFactor";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { createRouteHandlerClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  const { origin } = new URL(request.url);
  const secureCookies = process.env.NODE_ENV === "production";
  if (!isSupabaseConfigured()) {
    return NextResponse.redirect(`${origin}/?auth=signin&error=config`, 303);
  }

  const formData = await request.formData();
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const next = String(formData.get("next") ?? "/dashboard");

  if (!email || !password) {
    return NextResponse.redirect(`${origin}/?auth=signin&error=missing`, 303);
  }

  const safeNext = next.startsWith("/") ? next : "/dashboard";
  const redirectResponse = NextResponse.redirect(`${origin}${safeNext}`, 303);
  redirectResponse.headers.set("Cache-Control", "no-store, max-age=0");

  const supabase = createRouteHandlerClient(request, redirectResponse);
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) {
    return NextResponse.redirect(`${origin}/?auth=signin&error=auth`, 303);
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();
  const role =
    typeof user?.user_metadata?.role === "string"
      ? String(user.user_metadata.role).toLowerCase()
      : "";
  if (role === "admin" && user?.id && user.email) {
    const code = createOneTimeCode();
    try {
      await sendAdmin2FACodeEmail({ to: user.email, code });
    } catch (error) {
      const message = error instanceof Error ? error.message : "";
      const errorCode = message.includes("RESEND_API_KEY") || message.includes("ADMIN_2FA_FROM_EMAIL")
        ? "admin_2fa_email_config"
        : "admin_2fa_email_failed";
      return NextResponse.redirect(`${origin}/?auth=signin&error=${errorCode}`, 303);
    }
    const pendingToken = buildPending2FAToken({
      userId: user.id,
      email: user.email,
      code,
      ttlSeconds: 600,
    });
    const response = NextResponse.redirect(`${origin}/?auth=signin&notice=admin_2fa_required`, 303);
    response.cookies.set(getPendingCookieName(), pendingToken, {
      httpOnly: true,
      sameSite: "lax",
      secure: secureCookies,
      path: "/",
      maxAge: 60 * 10,
    });
    response.headers.set("Cache-Control", "no-store, max-age=0");
    return response;
  }

  return redirectResponse;
}
