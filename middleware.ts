import { NextResponse, type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

export async function middleware(request: NextRequest) {
  const host = request.nextUrl.hostname.toLowerCase();
  const isLegacyHost = host === "erikvongregory.com" || host === "www.erikvongregory.com";
  const isApexEvglab = host === "evglab.com";
  if (isLegacyHost || isApexEvglab) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.protocol = "https:";
    redirectUrl.hostname = "www.evglab.com";
    redirectUrl.port = "";
    return NextResponse.redirect(redirectUrl, 308);
  }

  const { pathname } = request.nextUrl;
  const authAppPaths =
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/admin") ||
    pathname.startsWith("/auth/") ||
    pathname === "/anmelden" ||
    pathname === "/registrieren";
  if (authAppPaths) {
    const appBase = process.env.NEXT_PUBLIC_APP_BASE_URL?.trim() || "https://app.evglab.com";
    try {
      const target = new URL(appBase);
      target.pathname = pathname;
      target.search = request.nextUrl.search;
      return NextResponse.redirect(target, 308);
    } catch {
      return NextResponse.redirect(new URL(`https://app.evglab.com${pathname}${request.nextUrl.search}`), 308);
    }
  }

  const needsAuthSession =
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/admin") ||
    pathname === "/anmelden" ||
    pathname === "/registrieren";

  if (!needsAuthSession) {
    return NextResponse.next();
  }

  return await updateSession(request);
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|mp4|webm|mov)$).*)",
  ],
};
