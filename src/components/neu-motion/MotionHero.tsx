"use client";

import Link from "next/link";
import { useRef } from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { APP_URL } from "@/components/neu/parlo/data";
import { PerlageField } from "./PerlageField";

/**
 * ParloHero (/neu) unverändert — dahinter „Perlage im Raster“:
 * Perlenketten in drei Tiefenebenen über einem leisen Bernstein-Schimmer.
 * Die Schutzzone liegt um den Copy-Block.
 */
export function MotionHero() {
  const guardRef = useRef<HTMLDivElement>(null);
  const reveal = "motion-reduce:animate-none";

  return (
    <div className="relative isolate">
      {/* Bernstein-Schimmer von unten — wie Licht durch ein Glas Bier */}
      <div aria-hidden className="nm-underglow pointer-events-none absolute inset-0 -z-20" />
      <PerlageField variant="hero" guardRef={guardRef} className="-z-10" />

      <section className="relative mx-auto w-full max-w-5xl">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 isolate hidden overflow-hidden contain-strict lg:block"
        >
          <div className="absolute inset-0 -top-14 isolate -z-10 bg-[radial-gradient(35%_80%_at_49%_0%,--theme(--color-foreground/.08),transparent)] contain-strict" />
        </div>

        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 mx-auto hidden min-h-[70vh] w-full max-w-5xl lg:block"
        >
          <div className="mask-y-from-80% mask-y-to-100% absolute inset-y-0 left-0 z-10 h-full w-px bg-foreground/15" />
          <div className="mask-y-from-80% mask-y-to-100% absolute inset-y-0 right-0 z-10 h-full w-px bg-foreground/15" />
        </div>

        <div className="relative flex flex-col items-center justify-center gap-5 px-4 pb-16 pt-28 sm:pb-20 md:pt-32 lg:min-h-[min(90svh,880px)] lg:gap-6 lg:pb-24">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-[1] size-full overflow-hidden"
          >
            <div className="absolute inset-y-0 left-4 w-px bg-linear-to-b from-transparent via-border to-border md:left-8" />
            <div className="absolute inset-y-0 right-4 w-px bg-linear-to-b from-transparent via-border to-border md:right-8" />
            <div className="absolute inset-y-0 left-8 w-px bg-linear-to-b from-transparent via-border/50 to-border/50 md:left-12" />
            <div className="absolute inset-y-0 right-8 w-px bg-linear-to-b from-transparent via-border/50 to-border/50 md:right-12" />
          </div>

          <div ref={guardRef} className="flex flex-col items-center gap-5 lg:gap-6">
            <a
              className={cn(
                "group mx-auto flex w-fit items-center gap-3 rounded-full border border-border bg-card px-3 py-1 shadow-sm",
                "fade-in slide-in-from-bottom-10 animate-in fill-mode-backwards transition-all delay-500 duration-500 ease-out",
                reveal,
              )}
              href="#product"
            >
              <Sparkles className="size-3 text-muted-foreground" />
              <span className="text-xs text-foreground/90">
                Dashboard-Vorschau zum Durchklicken
              </span>
              <span className="block h-5 border-l border-border" />
              <ArrowRight className="size-3 text-muted-foreground duration-150 ease-out group-hover:translate-x-1" />
            </a>

            <h1
              className={cn(
                "text-balance text-center text-4xl font-medium tracking-tight text-foreground md:text-5xl lg:text-6xl xl:text-[4.5rem] xl:leading-[1.05]",
                "fade-in slide-in-from-bottom-10 animate-in fill-mode-backwards delay-100 duration-500 ease-out",
                "text-shadow-[0_0px_50px_theme(--color-foreground/.2)]",
                reveal,
              )}
            >
              Content, der nach Brauerei <br className="hidden sm:block" />
              aussieht — nicht nach Vorlage.
            </h1>

            <p
              className={cn(
                "mx-auto max-w-md text-center text-base tracking-wider text-foreground/80 sm:text-lg md:text-xl",
                "fade-in slide-in-from-bottom-10 animate-in fill-mode-backwards delay-200 duration-500 ease-out",
                reveal,
              )}
            >
              Markenprofil setzen, Motive erzeugen, freigeben —{" "}
              <br className="hidden sm:block" />
              das KI-System für Brauereien.
            </p>

            <div
              className={cn(
                "flex flex-row flex-wrap items-center justify-center gap-3 pt-2",
                "fade-in slide-in-from-bottom-10 animate-in fill-mode-backwards delay-300 duration-500 ease-out",
                reveal,
              )}
            >
              <Button className="rounded-full" size="lg" variant="secondary" asChild>
                <Link href="#product">Vorschau ansehen</Link>
              </Button>
              <Button className="rounded-full" size="lg" asChild>
                <a href={APP_URL}>
                  Dashboard öffnen
                  <ArrowRight className="size-4" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
