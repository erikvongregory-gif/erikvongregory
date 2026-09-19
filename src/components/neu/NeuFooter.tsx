"use client";

import Link from "next/link";
import { NeuCookieSettingsButton } from "@/components/neu/NeuCookieBanner";
import { NeuThemeToggle } from "@/components/neu/NeuThemeToggle";
import { NeuRevealText } from "@/components/neu/NeuRevealText";
import { SITE } from "@/lib/siteConfig";

const FOOTER_LINKS = [
  { href: "/#funktionen", label: "Funktionen" },
  { href: "/#dashboard", label: "Dashboard" },
  { href: "/#marke", label: "Marke" },
  { href: "/#preise", label: "Preise" },
  { href: "/#steig-ein", label: "Steig ein" },
  { href: SITE.appBaseUrl, label: "App" },
] as const;

const LEGAL = [
  { href: "/impressum", label: "Impressum" },
  { href: "/datenschutz", label: "Datenschutz" },
  { href: "/agb", label: "AGB" },
] as const;

/**
 * Footer wie Velorah: Tagline · Nav · Subscribe · Wordmark + Legal.
 */
export function NeuFooter() {
  return (
    <footer className="neu-bg mx-auto max-w-7xl border-t border-[color:var(--neu-border)] px-6 py-16 md:px-12">
      <div className="mb-16 grid grid-cols-1 gap-12 md:grid-cols-3">
        <h2
          className="neu-fg text-2xl leading-tight sm:text-3xl"
          style={{ fontFamily: "var(--font-velorah-serif), ui-serif, Georgia, serif" }}
        >
          <NeuRevealText text="Damit Brauereien" />
          <br />
          <NeuRevealText wordOffset={2} text="im Feed wachsen." />
        </h2>

        <nav className="flex flex-col items-start gap-3" aria-label="Footer">
          {FOOTER_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="neu-muted text-sm transition-colors hover:text-[color:var(--neu-fg)]"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div>
          <p className="neu-muted mb-4 text-sm">
            Neuigkeiten zu BrewAI
            <br />
            direkt in dein Postfach.
          </p>
          <a
            href={SITE.contactMailto}
            className="neu-liquid-glass inline-block rounded-full px-6 py-2.5 text-sm transition-transform hover:scale-[1.03]"
          >
            Kontakt
          </a>
        </div>
      </div>

      <div className="flex flex-col items-center justify-between gap-4 border-t border-[color:var(--neu-border)] pt-8 text-xs md:flex-row">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2.5">
            <img
              src={SITE.brandLogoPath}
              alt=""
              width={28}
              height={28}
              className="h-7 w-7 shrink-0"
            />
            <span
              className="neu-fg text-xl tracking-tight"
              style={{ fontFamily: "var(--font-velorah-serif), ui-serif, Georgia, serif" }}
            >
              {SITE.name}
            </span>
          </Link>
          <NeuThemeToggle />
        </div>
        <div className="neu-muted flex flex-wrap items-center justify-center gap-6">
          {LEGAL.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="transition-colors hover:text-[color:var(--neu-fg)]"
            >
              {item.label}
            </Link>
          ))}
          <NeuCookieSettingsButton className="transition-colors hover:text-[color:var(--neu-fg)]" />
        </div>
      </div>
    </footer>
  );
}
