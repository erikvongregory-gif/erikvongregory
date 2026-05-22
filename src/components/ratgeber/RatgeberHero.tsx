"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";

type RatgeberHeroProps = {
  done: boolean;
  total: number;
  compact?: boolean;
};

export function RatgeberHero({ done, total, compact }: RatgeberHeroProps) {
  return (
    <header className={cn(compact ? "px-4 pb-2 pt-6" : "px-6 pb-6 pt-14 sm:px-12 sm:pt-16 lg:px-12 lg:pt-20")}>
      <div className={cn(compact ? "max-w-none" : "mx-auto max-w-[980px]")}>
        <nav
          className="mb-6 flex items-center gap-3 font-mono-hero text-[11px] uppercase tracking-[1.2px] text-ink3 sm:mb-9"
          aria-label="Brotkrumen"
        >
          <Link href="/" className="text-amber transition hover:text-amber2">
            Start
          </Link>
          <span className="opacity-40" aria-hidden>
            /
          </span>
          <span className="text-ink2">Ratgeber</span>
          <span className="ml-auto hidden h-px flex-1 max-w-[120px] bg-ink/10 sm:block" aria-hidden />
          <span className="hidden text-ink3 sm:inline">
            Wissenscheck · {total} Fragen
          </span>
        </nav>

        <p className="mb-4 inline-flex items-center gap-2.5 font-mono-hero text-[11px] uppercase tracking-[1.4px] text-amber">
          <span className="h-px w-7 bg-amber" aria-hidden />
          Ratgeber · Wissenscheck
        </p>

        <h1
          className={cn(
            "max-w-[880px] font-serif-hero font-normal leading-[0.98] tracking-[-0.04em] text-ink",
            compact ? "text-[32px] tracking-[-0.03em]" : "text-[clamp(2.5rem,6vw,4.5rem)] lg:text-[72px] lg:tracking-[-2.2px]",
          )}
        >
          {done ? (
            <>
              Dein Wissenscheck
              <br />
              ist <em className="font-medium italic text-amber">fertig</em>.
            </>
          ) : (
            <>
              Fünf Fragen.
              <br />
              <em className="font-medium italic text-amber">Eine</em> klare Empfehlung.
            </>
          )}
        </h1>

        <p
          className={cn(
            "mt-5 max-w-[680px] text-ink2",
            compact ? "text-[14.5px] leading-relaxed" : "text-lg leading-[1.5] sm:text-[19px]",
          )}
        >
          Beantworte fünf kurze Fragen zu <strong className="font-semibold text-ink">Zeit</strong>,{" "}
          <strong className="font-semibold text-ink">Workflow</strong> und{" "}
          <strong className="font-semibold text-ink">Zielbild</strong> — am Ende sagen wir dir, ob das{" "}
          <em>Dashboard</em> oder eine <em>Premium-Umsetzung</em> besser passt.
        </p>
      </div>
    </header>
  );
}
