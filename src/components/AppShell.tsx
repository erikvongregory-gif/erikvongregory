"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { ScrollHeader } from "@/components/ScrollHeader";
import { CookieBanner } from "@/components/CookieBanner";
import { ContactFunnel } from "@/components/ContactFunnel";
import { LoadingScreen } from "@/components/LoadingScreen";
import { LegalPageTheme } from "@/components/LegalPageTheme";
import { SiteGradientBackdrop } from "@/components/ui/gradient-backgrounds";
import { useLoading } from "@/context/LoadingContext";
import { SITE } from "@/lib/siteConfig";

type AppShellProps = {
  children: React.ReactNode;
};

export function AppShell({ children }: AppShellProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { isLoadComplete } = useLoading();
  const isDashboardRoute = pathname?.startsWith("/dashboard") ?? false;
  const isAdminRoute = pathname?.startsWith("/admin") ?? false;
  const authQuery = searchParams?.get("auth");
  const noticeQuery = searchParams?.get("notice");
  const isAuthFlow =
    authQuery === "signin" ||
    authQuery === "signup" ||
    noticeQuery === "admin_2fa_required" ||
    noticeQuery === "admin_2fa_resent";
  const skipLoadingScreen = isDashboardRoute || isAdminRoute || isAuthFlow;

  if (skipLoadingScreen) {
    return <main id="main" className="relative min-h-[100dvh] bg-gray-50">{children}</main>;
  }

  return (
    <>
      <SiteGradientBackdrop />
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-[#14532d] focus:px-4 focus:py-2 focus:text-white focus:outline-none focus:ring-2 focus:ring-white"
      >
        Zum Inhalt springen
      </a>
      <LoadingScreen />
      <ContactFunnel />
      <CookieBanner />
      <LegalPageTheme />
      <div
        className={`transition-opacity duration-500 ease-out ${
          isLoadComplete ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <ScrollHeader />
      </div>
      {children}
      <footer id="contact" className="relative z-[70] border-t border-zinc-200/80 bg-transparent py-12 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid gap-8 sm:gap-12 md:grid-cols-2 lg:grid-cols-4">
            <div>
              <p className="font-bold text-zinc-900">{SITE.name}</p>
              <p className="mt-1 text-sm font-medium text-[#b45309]">
                KI fuer Brauereien & Gastronomie
              </p>
              <p className="mt-4 text-sm leading-relaxed text-zinc-600">
                Buendig. Direkt. Fokussiert auf Automatisierung von Marketing, Content und Verkauf.
              </p>
            </div>
            <div>
              <p className="text-sm font-semibold text-zinc-800">Social</p>
              <div className="mt-2 flex gap-4">
                <a
                  href="https://www.linkedin.com/in/erik-freiherr-von-gregory-22852b329"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-[#b45309] transition-colors hover:text-[#c65a20] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent rounded"
                >
                  LinkedIn
                </a>
                <a
                  href="https://wa.me/4915565602176"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-[#b45309] transition-colors hover:text-[#c65a20] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent rounded"
                >
                  WhatsApp
                </a>
              </div>
            </div>
            <div>
              <p className="text-sm font-semibold text-zinc-800">Kontakt</p>
              <p className="mt-2 text-sm text-zinc-600">
                Kontaktieren - direkt und unkompliziert.
              </p>
              <a
                href="mailto:kontakt@evglab.com"
                className="mt-3 inline-flex items-center gap-2 rounded-lg bg-[#c65a20] px-4 py-2.5 text-sm font-medium text-white transition-all duration-200 hover:bg-[#d46830] hover:scale-[1.02] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent rounded"
              >
                E-Mail schreiben
              </a>
              <a
                href="mailto:kontakt@evglab.com"
                className="mt-2 block text-sm text-[#b45309] transition-colors hover:text-[#c65a20] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent rounded"
              >
                kontakt@evglab.com
              </a>
            </div>
            <div>
              <a
                href="/impressum"
                className="text-sm text-[#b45309] transition-colors hover:text-[#c65a20] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent rounded"
              >
                Impressum
              </a>
              <span className="mx-2 text-zinc-300" aria-hidden>
                ·
              </span>
              <a
                href="/datenschutz"
                className="text-sm text-[#b45309] transition-colors hover:text-[#c65a20] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent rounded"
              >
                Datenschutz
              </a>
              <span className="mx-2 text-zinc-300" aria-hidden>
                ·
              </span>
              <a
                href="/agb"
                className="text-sm text-[#b45309] transition-colors hover:text-[#c65a20] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent rounded"
              >
                AGB
              </a>
              <span className="mx-2 text-zinc-300" aria-hidden>
                ·
              </span>
              <button
                type="button"
                onClick={() => {
                  window.dispatchEvent(new CustomEvent("evglab-open-cookie-settings"));
                }}
                className="text-sm text-[#b45309] transition-colors hover:text-[#c65a20] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent rounded"
              >
                Cookie-Einstellungen
              </button>
            </div>
          </div>
          <p className="mt-8 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-center text-sm text-zinc-500 sm:mt-12">
            <span>
              © {new Date().getFullYear()} {SITE.name}
            </span>
            <span className="text-zinc-300" aria-hidden>
              ·
            </span>
            <span>Alle Rechte vorbehalten.</span>
            <span className="text-zinc-300" aria-hidden>
              ·
            </span>
            <span className="max-w-[min(100%,42rem)] text-zinc-500">
              Texte, Bilder und sonstige Inhalte dieser Website unterliegen dem Urheberrecht;
              Vervielfaeltigung nur mit Zustimmung.
            </span>
          </p>
        </div>
      </footer>
    </>
  );
}
