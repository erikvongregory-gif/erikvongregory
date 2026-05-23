"use client";

import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import { LoadingScreen } from "@/components/LoadingScreen";
import { SiteHeader } from "@/components/SiteHeader";
import { LegalPageTheme } from "@/components/LegalPageTheme";
import { useLoading } from "@/context/LoadingContext";
import { SiteFooter } from "@/components/SiteFooter";

const CookieBanner = dynamic(() => import("@/components/CookieBanner").then((m) => m.CookieBanner), {
  ssr: false,
});
const ContactFunnel = dynamic(() => import("@/components/ContactFunnel").then((m) => m.ContactFunnel), {
  ssr: false,
});

type AppShellProps = {
  children: React.ReactNode;
};

export function AppShell({ children }: AppShellProps) {
  const pathname = usePathname();
  const { isLoadComplete } = useLoading();
  const isDashboardRoute = pathname?.startsWith("/dashboard") ?? false;
  const isAdminRoute = pathname?.startsWith("/admin") ?? false;
  const isAuthFlow = (() => {
    if (typeof window === "undefined") return false;
    const params = new URLSearchParams(window.location.search);
    const authQuery = params.get("auth");
    const noticeQuery = params.get("notice");
    return (
      authQuery === "signin" ||
      authQuery === "signup" ||
      noticeQuery === "admin_2fa_required" ||
      noticeQuery === "admin_2fa_resent"
    );
  })();

  const skipShell = isDashboardRoute || isAdminRoute;
  const showHeader = isAuthFlow || isLoadComplete;

  if (skipShell) {
    return <main id="main" className="relative min-h-[100dvh] bg-gray-50">{children}</main>;
  }

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-[#14532d] focus:px-4 focus:py-2 focus:text-white focus:outline-none focus:ring-2 focus:ring-white"
      >
        Zum Inhalt springen
      </a>
      {!isAuthFlow && !skipShell ? <LoadingScreen /> : null}
      <ContactFunnel />
      <CookieBanner />
      <LegalPageTheme />
      <div
        className={`transition-opacity duration-500 ease-out ${
          showHeader ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <SiteHeader />
      </div>
      <div>{children}</div>
      <SiteFooter className="app-shell-site-footer relative z-[70]" />
    </>
  );
}
