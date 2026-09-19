"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NeuCookieSettingsButton } from "@/components/neu/NeuCookieBanner";
import { NeuFooter } from "@/components/neu/NeuFooter";
import { NeuThemeToggle } from "@/components/neu/NeuThemeToggle";
import { SITE } from "@/lib/siteConfig";

const NeuCookieBanner = dynamic(
  () => import("@/components/neu/NeuCookieBanner").then((m) => m.NeuCookieBanner),
  { ssr: false },
);

const NAV = [
  { href: "/#funktionen", label: "Funktionen" },
  { href: "/#dashboard", label: "Dashboard" },
  { href: "/#marke", label: "Marke" },
  { href: "/#preise", label: "Preise" },
] as const;

const LEGAL = [
  { href: "/impressum", label: "Impressum" },
  { href: "/datenschutz", label: "Datenschutz" },
  { href: "/agb", label: "AGB" },
  { href: "/widerruf", label: "Widerruf" },
] as const;

function isMainNeuPath(pathname: string | null): boolean {
  if (!pathname) return false;
  return (
    pathname === "/" ||
    pathname === "/neu" ||
    pathname === "/neu/impressum" ||
    pathname === "/neu/datenschutz" ||
    pathname === "/neu/agb"
  );
}

export function NeuShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isHome = pathname === "/" || pathname === "/neu";
  const isMain = isMainNeuPath(pathname);

  return (
    <div className={`min-h-[100dvh] ${isMain ? "neu-bg" : "bg-[#f6f3ee] text-neutral-900"}`}>
      {!isHome && isMain ? (
        <header
          className="sticky top-0 z-40 border-b border-[color:var(--neu-border)] backdrop-blur"
          style={{ backgroundColor: "var(--neu-header-bg)" }}
        >
          <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-5 md:px-8">
            <Link href="/" className="flex items-center gap-2.5 tracking-tight">
              <img
                src={SITE.brandLogoPath}
                alt=""
                width={28}
                height={28}
                className="h-7 w-7 shrink-0"
              />
              <span
                className="neu-fg text-2xl tracking-tight"
                style={{ fontFamily: "var(--font-velorah-serif), ui-serif, Georgia, serif" }}
              >
                {SITE.name}
              </span>
            </Link>
            <div className="flex items-center gap-3">
              <NeuThemeToggle />
              <Link
                href={SITE.appBaseUrl}
                className="neu-liquid-glass rounded-full px-5 py-2 text-sm transition-transform hover:scale-[1.03]"
              >
                Reise starten
              </Link>
            </div>
          </div>
        </header>
      ) : null}

      {!isMain ? (
        <header className="sticky top-0 z-40 border-b border-neutral-900/10 bg-[#f6f3ee]/95 backdrop-blur">
          <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
            <Link href="/" className="flex items-center gap-2 font-medium tracking-tight">
              <img src={SITE.brandLogoPath} alt={SITE.brandLogoAlt} width={28} height={28} />
              <span>{SITE.name}</span>
            </Link>
            <nav className="hidden items-center gap-5 text-sm md:flex" aria-label="Neu-Navigation">
              {NAV.map((item) => (
                <Link key={item.href} href={item.href} className="hover:opacity-70">
                  {item.label}
                </Link>
              ))}
            </nav>
            <Link
              href={SITE.appBaseUrl}
              className="rounded-full bg-neutral-900 px-3 py-1.5 text-sm text-white hover:bg-neutral-800"
            >
              Dashboard
            </Link>
          </div>
        </header>
      ) : null}

      <main id="main">{children}</main>

      {isMain ? (
        <NeuFooter />
      ) : (
        <footer className="mt-24 border-t border-neutral-900/10">
          <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-10 text-sm text-neutral-600 md:flex-row md:justify-between">
            <div>
              <p className="font-medium text-neutral-900">{SITE.name} · Preview</p>
              <p className="mt-1 max-w-sm">Marketing-Redesign in Arbeit. Legal-Seiten bleiben live.</p>
            </div>
            <nav className="flex flex-wrap gap-x-4 gap-y-2" aria-label="Legal">
              {LEGAL.map((item) => (
                <Link key={item.href} href={item.href} className="hover:text-neutral-900">
                  {item.label}
                </Link>
              ))}
              <NeuCookieSettingsButton className="hover:text-neutral-900" />
            </nav>
          </div>
        </footer>
      )}

      <NeuCookieBanner />
    </div>
  );
}
