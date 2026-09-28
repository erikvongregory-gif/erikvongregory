"use client";

import { useState } from "react";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { APP_URL, LOGO_SRC, NAV_LINKS } from "./data";
import { ParloPillButton, ParloStarButton } from "./ParloUi";
import { ParloThemeToggle } from "./ParloThemeToggle";

export function ParloNavbar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <nav className="fixed inset-x-0 top-0 z-50 bg-transparent">
        <div className="mx-[30px] flex h-14 items-center justify-between border-x border-transparent px-4 md:px-6">
          <a href="/" aria-label="BrewAI" className="relative z-10 shrink-0">
            <Image
              src={LOGO_SRC}
              alt="BrewAI"
              width={120}
              height={126}
              className="h-9 w-auto brightness-0 dark:brightness-100"
              priority
            />
          </a>

          <div className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 lg:flex">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="rounded-full px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="hidden items-center gap-2 lg:flex">
            <ParloThemeToggle />
            <ParloPillButton
              href={APP_URL}
              variant="solid"
              className="h-[34px] w-auto min-w-[90px] bg-foreground px-3 text-[0.8rem] text-background shadow-sm ring-1 ring-border hover:opacity-90"
            >
              Anmelden
            </ParloPillButton>
            <ParloStarButton href={APP_URL} className="h-[34px]">
              Dashboard
            </ParloStarButton>
          </div>

          <div className="flex items-center gap-2 lg:hidden">
            <ParloThemeToggle />
            <button
              type="button"
              className="inline-flex size-9 items-center justify-center rounded-full border border-border text-foreground"
              aria-label={open ? "Menü schließen" : "Menü öffnen"}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X className="size-4" /> : <Menu className="size-4" />}
            </button>
          </div>
        </div>
      </nav>

      {open && (
        <div className="fixed inset-0 z-40 bg-background pt-14 lg:hidden">
          <div className="mx-[30px] flex h-full flex-col border-x border-border px-6 py-8">
            <div className="flex flex-col gap-1">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="rounded-lg px-2 py-3 text-2xl font-medium tracking-tight text-foreground"
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </a>
              ))}
            </div>
            <div className="mt-auto flex flex-col gap-3 pb-8">
              <ParloPillButton href={APP_URL} variant="solid" className="h-11 w-full">
                Anmelden
              </ParloPillButton>
              <ParloStarButton href={APP_URL} fullWidth>
                Dashboard öffnen
              </ParloStarButton>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
