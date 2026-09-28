"use client";

import Image from "next/image";
import { FOOTER_COLUMNS, LOGO_SRC } from "./data";
import { openCookieSettings } from "@/lib/cookieConsent";
import { SITE } from "@/lib/siteConfig";

export function ParloFooter() {
  return (
    <footer className="border-t border-border">
      <div className="mx-[30px] border-x border-border">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 md:grid-cols-[1.2fr_2fr]">
          <div>
            <Image
              src={LOGO_SRC}
              alt="BrewAI"
              width={140}
              height={148}
              className="h-10 w-auto brightness-0 dark:brightness-100"
            />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              Das KI-Content-System für Brauereien — Markenprofil, Motive und Tokens
              in einem Dashboard.
            </p>
            <div className="mt-6 flex gap-3">
              <a
                href={SITE.linkedinUrl}
                className="text-xs text-muted-foreground transition hover:text-foreground"
              >
                LinkedIn
              </a>
              <a
                href={SITE.contactMailto}
                className="text-xs text-muted-foreground transition hover:text-foreground"
              >
                Kontakt
              </a>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {FOOTER_COLUMNS.map((col) => (
              <div key={col.title}>
                <p className="text-sm font-medium text-foreground">{col.title}</p>
                <ul className="mt-4 space-y-2.5">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="text-sm text-muted-foreground transition hover:text-foreground"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-3 border-t border-border px-6 py-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {SITE.name}. Alle Rechte vorbehalten.</p>
          <div className="flex flex-wrap gap-4">
            <a href="/datenschutz" className="hover:text-foreground">
              Datenschutz
            </a>
            <a href="/agb" className="hover:text-foreground">
              AGB
            </a>
            <a href="/impressum" className="hover:text-foreground">
              Impressum
            </a>
            <a href="/widerruf" className="hover:text-foreground">
              Widerruf
            </a>
            <button type="button" onClick={() => openCookieSettings()} className="hover:text-foreground">
              Cookies
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
