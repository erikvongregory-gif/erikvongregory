"use client";

import Link from "next/link";
import { Menu } from "lucide-react";
import { useState } from "react";
import { SITE } from "@/lib/siteConfig";

const LINKS = [
  { href: "#features", label: "Funktionen" },
  { href: "#pricing", label: "Preise" },
  { href: "#faq", label: "FAQ" },
] as const;

export function Neuv2Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 -mb-4 px-4 pb-4">
      <div className="absolute inset-x-0 top-0 h-24 bg-[color-mix(in_oklch,var(--background)_15%,transparent)] backdrop-blur-lg" />
      <div className="nv-container relative">
        <div className="flex h-14 items-center justify-between gap-4">
          <Link href="/neuv2" className="relative z-10 flex items-center gap-2 text-xl font-bold">
            <img src={SITE.brandLogoPath} alt="" width={28} height={28} className="h-7 w-7" />
            {SITE.name}
          </Link>

          <nav className="relative z-10 hidden items-center gap-6 text-sm text-[var(--muted-foreground)] md:flex">
            {LINKS.map((l) => (
              <a key={l.href} href={l.href} className="transition-colors hover:text-[var(--foreground)]">
                {l.label}
              </a>
            ))}
          </nav>

          <div className="relative z-10 flex items-center gap-3">
            <Link
              href={SITE.appBaseUrl}
              className="hidden text-sm text-[var(--muted-foreground)] hover:text-[var(--foreground)] md:inline"
            >
              Anmelden
            </Link>
            <Link href={SITE.appBaseUrl} className="nv-btn nv-btn-primary">
              Kostenlos starten
            </Link>
            <button
              type="button"
              className="inline-flex size-9 items-center justify-center rounded-md md:hidden"
              aria-label="Menü"
              onClick={() => setOpen((v) => !v)}
            >
              <Menu className="size-5" />
            </button>
          </div>
        </div>

        {open ? (
          <nav className="relative z-10 mt-2 flex flex-col gap-3 rounded-xl border border-[color-mix(in_oklch,var(--border)_15%,transparent)] bg-[var(--background)] p-4 md:hidden">
            {LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-[var(--muted-foreground)]"
                onClick={() => setOpen(false)}
              >
                {l.label}
              </a>
            ))}
          </nav>
        ) : null}
      </div>
    </header>
  );
}
