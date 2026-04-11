import { NextResponse } from "next/server";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { createRouteHandlerClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  const { origin } = new URL(request.url);
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

  return redirectResponse;
}
