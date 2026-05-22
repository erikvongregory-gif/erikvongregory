"use client";

import Link from "next/link";
import type { RatgeberResult, RatgeberScore } from "@/content/ratgeber";
import { buildAppLoginUrl, navigateToAppDashboard } from "@/lib/appLoginUrl";
import { cn } from "@/lib/utils";

type RatgeberRecommendationProps = {
  result: RatgeberResult;
  score: Record<RatgeberScore, number>;
  onRestart: () => void;
  onPrev: () => void;
  compact?: boolean;
};

export function RatgeberRecommendation({ result, score, onRestart, onPrev, compact }: RatgeberRecommendationProps) {
  const primaryIsDashboard = result.key === "dash";

  const handlePrimary = () => {
    if (primaryIsDashboard) {
      navigateToAppDashboard();
      return;
    }
    window.location.href = "/#contact";
  };

  const handleSecondary = () => {
    if (result.key === "mixed" && result.secondaryHref === "/dashboard") {
      navigateToAppDashboard();
      return;
    }
    if (result.secondaryHref.startsWith("/#")) {
      window.location.href = result.secondaryHref;
      return;
    }
    window.location.assign(result.secondaryHref);
  };

  return (
    <section
      id="ratgeber-recommendation"
      aria-labelledby="ratgeber-result-h2"
      className={cn(
        "relative overflow-hidden bg-[#15110C] text-paper",
        compact ? "px-4 py-10 sm:px-5" : "px-6 py-12 sm:px-12 lg:py-16",
      )}
    >
      <div
        className="pointer-events-none absolute left-1/2 top-[-120px] h-[600px] w-[min(900px,100%)] -translate-x-1/2 bg-[radial-gradient(ellipse,rgba(232,146,89,0.18)_0%,rgba(232,146,89,0)_65%)]"
        aria-hidden
      />
      <div className={cn("relative mx-auto", compact ? "max-w-none" : "max-w-[980px]")}>
        <p className="mb-4 inline-flex items-center gap-2.5 font-mono-hero text-[10px] uppercase tracking-[1.2px] text-amber2 sm:text-[11px]">
          <span className="h-px w-7 bg-amber2/50" aria-hidden />
          {result.badge}
        </p>
        <p className="font-mono-hero text-[11px] uppercase tracking-[1.1px] text-[#A89B83]">{result.eyebrow}</p>
        <h2 id="ratgeber-result-h2" className="mt-3 font-serif-hero text-[clamp(2rem,7vw,3.25rem)] font-normal leading-[0.98] tracking-[-0.04em] text-paper lg:text-[52px]">
          {result.head}
          <br />
          <em className="italic text-amber2">{result.headItalic}</em>
        </h2>
        <p className="mt-5 max-w-[640px] text-[15px] leading-[1.6] text-[#C8BFAD]">{result.body}</p>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1.15fr_0.85fr] lg:gap-10">
          <div className="rounded-2xl border border-[#2C2519] bg-[#1A150E] p-5 sm:p-6">
            <p className="font-mono-hero text-[10px] uppercase tracking-wider text-[#8C7E68]">{result.plan}</p>
            <p className="mt-2 font-serif-hero text-[40px] font-medium tracking-[-1px] text-paper sm:text-[48px]">
              {result.price}
              <span className="ml-2 font-mono-hero text-sm font-normal text-[#8C7E68]">{result.priceMeta}</span>
            </p>
            <ul className="mt-6 space-y-2.5 border-t border-[rgba(244,239,230,0.08)] pt-5">
              {result.details.map(([label, value]) => (
                <li key={label} className="flex justify-between gap-4 text-[13px]">
                  <span className="font-mono-hero text-[#8C7E68]">{label}</span>
                  <span className="text-right text-[#E8DFCB]">{value}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col justify-between gap-5">
            <div className="grid grid-cols-3 gap-2 rounded-xl border border-[#2C2519] bg-[#1A150E] p-4 font-mono-hero text-[10px] uppercase tracking-wide text-[#8C7E68]">
              {(
                [
                  ["Dashboard", "dash", score.dash],
                  ["Mixed", "mixed", score.mixed],
                  ["Premium", "prem", score.prem],
                ] as const
              ).map(([label, key, value]) => (
                <div
                  key={key}
                  className={cn(
                    "rounded-lg px-2 py-2 text-center",
                    result.key === key ? "bg-amber/20 text-amber2" : "text-[#8C7E68]",
                  )}
                >
                  <div className="text-lg font-medium text-paper">{value}</div>
                  {label}
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-3">
              <button
                type="button"
                onClick={handlePrimary}
                className="inline-flex w-full items-center justify-center rounded-xl bg-amber px-6 py-3.5 font-sans-tight text-sm font-semibold text-[#15110C] shadow-[inset_0_1px_0_rgba(255,255,255,0.18),0_12px_28px_-10px_rgba(199,105,30,0.4)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-amber"
              >
                {result.cta}
              </button>
              <p className="text-center font-mono-hero text-[10px] uppercase tracking-wide text-[#8C7E68]">{result.ctaMeta}</p>
              <button
                type="button"
                onClick={handleSecondary}
                className="inline-flex w-full items-center justify-center rounded-xl border border-[rgba(244,239,230,0.18)] px-6 py-3 font-sans-tight text-sm font-medium text-paper transition hover:bg-[rgba(244,239,230,0.06)]"
              >
                {result.secondary}
              </button>
              <Link
                href="/vergleich/premium-vs-dashboard-abo-brauerei"
                className="text-center font-sans-tight text-sm text-[#A89B83] underline-offset-2 hover:text-amber2 hover:underline"
              >
                Modelle im Vergleich
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-3 border-t border-[rgba(244,239,230,0.08)] pt-6">
          <button
            type="button"
            onClick={onPrev}
            className="inline-flex items-center gap-2 rounded-[10px] border border-[rgba(244,239,230,0.18)] px-4 py-2.5 font-sans-tight text-sm text-paper transition hover:bg-[rgba(244,239,230,0.06)]"
          >
            Zurück zum Quiz
          </button>
          <button
            type="button"
            onClick={onRestart}
            className="inline-flex items-center rounded-[10px] border border-[rgba(244,239,230,0.18)] px-4 py-2.5 font-sans-tight text-sm text-[#C8BFAD] transition hover:text-paper"
          >
            Neu starten
          </button>
          {primaryIsDashboard ? (
            <a
              href={buildAppLoginUrl({ plan: "dashboard" })}
              className="sr-only"
              tabIndex={-1}
            >
              Dashboard Login
            </a>
          ) : null}
        </div>
      </div>
    </section>
  );
}
