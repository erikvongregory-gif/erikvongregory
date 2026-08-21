"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { SiteHeader } from "@/components/SiteHeader";
import { LegalPageTheme } from "@/components/LegalPageTheme";
import { SiteFooter } from "@/components/SiteFooter";
import { FreeTrialDemoProvider } from "@/context/FreeTrialDemoContext";

const CookieBanner = dynamic(() => import("@/components/CookieBanner").then((m) => m.CookieBanner), {
  ssr: false,
});
const ContactFunnel = dynamic(() => import("@/components/ContactFunnel").then((m) => m.ContactFunnel), {
  ssr: false,
});

type AppShellProps = {
  children: React.ReactNode;
};

function useDeferNonCritical(ms = 1800) {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    let idleId: number | null = null;
    let timeoutId: ReturnType<typeof setTimeout> | null = null;
    const go = () => setReady(true);
    if ("requestIdleCallback" in window) {
      idleId = window.requestIdleCallback(go, { timeout: ms });
    } else {
      timeoutId = setTimeout(go, Math.min(ms, 1200));
    }
    return () => {
      if (idleId !== null) window.cancelIdleCallback?.(idleId);
      if (timeoutId !== null) clearTimeout(timeoutId);
    };
  }, [ms]);
  return ready;
}

export function AppShell({ children }: AppShellProps) {
  const pathname = usePathname();
  const deferChrome = useDeferNonCritical(2000);
  const isDashboardRoute = pathname?.startsWith("/dashboard") ?? false;
  const isAdminRoute = pathname?.startsWith("/admin") ?? false;
  const skipShell = isDashboardRoute || isAdminRoute;

  if (skipShell) {
    return <main id="main" className="relative min-h-[100dvh] bg-gray-50">{children}</main>;
  }

  return (
    <FreeTrialDemoProvider>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-[#14532d] focus:px-4 focus:py-2 focus:text-white focus:outline-none focus:ring-2 focus:ring-white"
      >
        Zum Inhalt springen
      </a>
      {deferChrome ? <ContactFunnel /> : null}
      {deferChrome ? <CookieBanner /> : null}
      <LegalPageTheme />
      <SiteHeader />
      <div>{children}</div>
      <SiteFooter className="app-shell-site-footer relative z-[70]" />
    </FreeTrialDemoProvider>
  );
}
