import { NextResponse } from "next/server";
import { getPendingCookieName, getVerifiedCookieName } from "@/lib/admin/emailTwoFactor";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { createClient } from "@/lib/supabase/server";
import { enforceSameOrigin } from "@/lib/security/requestGuards";

async function handleSignOut(request: Request) {
  const { origin, hostname } = new URL(request.url);
  const secureCookies = process.env.NODE_ENV === "production";
  const cookieDomain =
    secureCookies && (hostname === "evglab.com" || hostname.endsWith(".evglab.com"))
      ? "evglab.com"
      : undefined;
  const clearAdmin2FACookies = (response: NextResponse) => {
    response.cookies.set(getPendingCookieName(), "", {
      httpOnly: true,
      sameSite: "lax",
      secure: secureCookies,
      ...(cookieDomain ? { domain: cookieDomain } : {}),
      path: "/",
      maxAge: 0,
    });
    response.cookies.set(getVerifiedCookieName(), "", {
      httpOnly: true,
      sameSite: "lax",
      secure: secureCookies,
      ...(cookieDomain ? { domain: cookieDomain } : {}),
      path: "/",
      maxAge: 0,
    });
    return response;
  };
  if (!isSupabaseConfigured()) {
    const response = NextResponse.redirect(`${origin}/`, { status: 303 });
    response.headers.set("Cache-Control", "no-store, max-age=0");
    return clearAdmin2FACookies(response);
  }
  const supabase = await createClient();
  await supabase.auth.signOut();
  const response = NextResponse.redirect(`${origin}/`, { status: 303 });
  response.headers.set("Cache-Control", "no-store, max-age=0");
  return clearAdmin2FACookies(response);
}

export async function GET(request: Request) {
  return NextResponse.json({ error: "Methode nicht erlaubt." }, { status: 405 });
}

export async function POST(request: Request) {
  const originError = enforceSameOrigin(request);
  if (originError) return originError;
  return handleSignOut(request);
}
