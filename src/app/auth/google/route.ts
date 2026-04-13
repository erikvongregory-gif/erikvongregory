import { NextResponse } from "next/server";
import { isInviteOnlyEnabled, isSupabaseConfigured } from "@/lib/supabase/env";
import { createRouteHandlerClient } from "@/lib/supabase/server";

export async function GET(request: Request) {
  const { origin, searchParams } = new URL(request.url);
  const next = searchParams.get("next") ?? "/dashboard";
  const safeNext = next.startsWith("/") ? next : "/dashboard";

  if (!isSupabaseConfigured()) {
    return NextResponse.redirect(`${origin}/?auth=signin&error=config`, 303);
  }
  if (isInviteOnlyEnabled()) {
    return NextResponse.redirect(`${origin}/?auth=signin&error=invite_only`, 303);
  }

  const cookieCarrier = NextResponse.next();
  const supabase = createRouteHandlerClient(request, cookieCarrier);
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${origin}/auth/callback?next=${encodeURIComponent(safeNext)}`,
      queryParams: {
        access_type: "offline",
        prompt: "consent",
      },
    },
  });

  if (error || !data.url) {
    return NextResponse.redirect(`${origin}/?auth=signin&error=google`, 303);
  }

  const redirect = NextResponse.redirect(data.url, 303);
  redirect.headers.set("Cache-Control", "no-store, max-age=0");
  for (const line of cookieCarrier.headers.getSetCookie()) {
    redirect.headers.append("Set-Cookie", line);
  }
  return redirect;
}
