import { NextResponse, type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";
import { SITE } from "@/lib/siteConfig";

const DIRECT_CANONICAL_REDIRECTS: Record<string, string> = {
  "/loesungen/saisonkampagne-brauerei": "/loesungen",
  "/loesungen/biergarten-event-marketing": "/loesungen",
  "/loesungen/haendler-gastro-promotion": "/loesungen",
};

export async function middleware(request: NextRequest) {
  const host = request.nextUrl.hostname.toLowerCase();
  const { pathname } = request.nextUrl;
  const canonicalTarget = DIRECT_CANONICAL_REDIRECTS[pathname];

  if (canonicalTarget) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.protocol = "https:";
    redirectUrl.hostname = SITE.marketingHost;
    redirectUrl.port = "";
    redirectUrl.pathname = canonicalTarget;
    redirectUrl.search = "";
    return NextResponse.redirect(redirectUrl, 308);
  }

  const isLegacyHost = SITE.legacyHosts.includes(host);
  if (isLegacyHost) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.protocol = "https:";
    redirectUrl.hostname = SITE.marketingHost;
    redirectUrl.port = "";
    return NextResponse.redirect(redirectUrl, 308);
  }

  const authAppPaths =
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/admin") ||
    pathname.startsWith("/auth/") ||
    pathname === "/anmelden" ||
    pathname === "/registrieren";
  if (authAppPaths) {
    try {
      const target = new URL(SITE.appBaseUrl);
      target.pathname = pathname;
      target.search = request.nextUrl.search;
      return NextResponse.redirect(target, 308);
    } catch {
      return NextResponse.redirect(
        new URL(`${SITE.appBaseUrl}${pathname}${request.nextUrl.search}`),
        308,
      );
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
