import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { getSupabaseAnonKey, getSupabaseUrl, isInviteOnlyEnabled } from "@/lib/supabase/env";

export async function updateSession(request: NextRequest) {
  const supabaseResponse = NextResponse.next({ request });

  const url = getSupabaseUrl();
  const key = getSupabaseAnonKey();
  if (!url || !key) {
    return supabaseResponse;
  }

  const supabase = createServerClient(url, key, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet, headers) {
        cookiesToSet.forEach(({ name, value, options }) => {
          supabaseResponse.cookies.set(name, value, options);
        });
        Object.entries(headers).forEach(([k, v]) => {
          if (k.toLowerCase() === "set-cookie") return;
          supabaseResponse.headers.set(k, v);
        });
      },
    },
  });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const pathname = request.nextUrl.pathname;

  if (user && (pathname === "/anmelden" || pathname === "/registrieren")) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  if (!user && pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/?auth=signin", request.url));
  }

  if (isInviteOnlyEnabled() && pathname === "/registrieren") {
    return NextResponse.redirect(new URL("/?auth=signin&error=invite_required", request.url));
  }

  return supabaseResponse;
}
