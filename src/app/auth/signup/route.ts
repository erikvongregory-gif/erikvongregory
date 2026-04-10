import { NextResponse } from "next/server";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  const { origin } = new URL(request.url);
  return NextResponse.redirect(`${origin}/?auth=signin&error=signup_disabled`, 303);

  // Registrierungen sind aktuell bewusst deaktiviert.
  // Den bestehenden Code behalten wir darunter, um ihn später schnell reaktivieren zu können.
  /*
  if (!isSupabaseConfigured()) {
    return NextResponse.redirect(`${origin}/?auth=signup&error=config`, 303);
  }

  const formData = await request.formData();
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const breweryName = String(formData.get("brewery") ?? "").trim();

  if (!email || !password) {
    return NextResponse.redirect(`${origin}/?auth=signup&error=missing`, 303);
  }

  const supabase = await createClient();
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${origin}/auth/callback?next=/dashboard`,
      data: { brewery_name: breweryName || null },
    },
  });

  if (error) {
    return NextResponse.redirect(`${origin}/?auth=signup&error=auth&reason=${encodeURIComponent(error.message)}`, 303);
  }

  if (data.user && !data.session) {
    return NextResponse.redirect(`${origin}/?auth=signin&notice=confirm`, 303);
  }

  return NextResponse.redirect(`${origin}/dashboard`, 303);
  */
}
