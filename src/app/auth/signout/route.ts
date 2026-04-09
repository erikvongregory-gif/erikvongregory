import { NextResponse } from "next/server";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { createClient } from "@/lib/supabase/server";
import { enforceSameOrigin } from "@/lib/security/requestGuards";

async function handleSignOut(request: Request) {
  const { origin } = new URL(request.url);
  if (!isSupabaseConfigured()) {
    const response = NextResponse.redirect(`${origin}/`, { status: 303 });
    response.headers.set("Cache-Control", "no-store, max-age=0");
    return response;
  }
  const supabase = await createClient();
  await supabase.auth.signOut();
  const response = NextResponse.redirect(`${origin}/`, { status: 303 });
  response.headers.set("Cache-Control", "no-store, max-age=0");
  return response;
}

export async function GET(request: Request) {
  return NextResponse.json({ error: "Methode nicht erlaubt." }, { status: 405 });
}

export async function POST(request: Request) {
  const originError = enforceSameOrigin(request);
  if (originError) return originError;
  return handleSignOut(request);
}
