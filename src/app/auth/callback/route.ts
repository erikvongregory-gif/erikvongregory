import { NextResponse } from "next/server";
import type { EmailOtpType } from "@supabase/supabase-js";
import { isInviteOnlyEnabled, isSupabaseConfigured } from "@/lib/supabase/env";
import { createRouteHandlerClient } from "@/lib/supabase/server";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const tokenHash = searchParams.get("token_hash");
  const type = searchParams.get("type") as EmailOtpType | null;
  const next = searchParams.get("next") ?? "/dashboard";
  const safeNext = next.startsWith("/") ? next : "/dashboard";

  if (!isSupabaseConfigured()) {
    return NextResponse.redirect(`${origin}/?auth=signin&error=config`, 303);
  }
  if (isInviteOnlyEnabled() && type === "signup") {
    return NextResponse.redirect(`${origin}/?auth=signin&error=invite_required`, 303);
  }

  if (tokenHash && type) {
    const redirectResponse = NextResponse.redirect(`${origin}${safeNext}`, 303);
    redirectResponse.headers.set("Cache-Control", "no-store, max-age=0");
    const supabase = createRouteHandlerClient(request, redirectResponse);
    const { error } = await supabase.auth.verifyOtp({ type, token_hash: tokenHash });
    if (!error) return redirectResponse;
  }

  if (code) {
    const redirectResponse = NextResponse.redirect(`${origin}${safeNext}`, 303);
    redirectResponse.headers.set("Cache-Control", "no-store, max-age=0");
    const supabase = createRouteHandlerClient(request, redirectResponse);
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) return redirectResponse;
  }

  return NextResponse.redirect(`${origin}/?auth=signin&error=auth`, 303);
}
