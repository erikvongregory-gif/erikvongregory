"use client";

import { DesktopContainer } from "@/components/desktop/DesktopContainer";
import { RatgeberHero } from "@/components/ratgeber/RatgeberHero";
import { RatgeberQuizCard } from "@/components/ratgeber/RatgeberQuizCard";
import { RatgeberRecommendation } from "@/components/ratgeber/RatgeberRecommendation";
import type { useRatgeber } from "@/lib/useRatgeber";

type RatgeberDesktopProps = {
  ratgeber: ReturnType<typeof useRatgeber>;
};

export function RatgeberDesktop({ ratgeber: r }: RatgeberDesktopProps) {

  return (
    <div className="ratgeber-root bg-paper text-ink">
      <RatgeberHero done={r.done} total={r.total} />

      {r.done ? (
        <RatgeberRecommendation result={r.result} score={r.score} onRestart={r.restart} onPrev={r.prev} />
      ) : (
        <>
          <section className="pb-8" aria-label="Wissenscheck-Quiz">
            <DesktopContainer className="max-w-[860px]">
              <RatgeberQuizCard
                current={r.current}
                idx={r.idx}
                total={r.total}
                answeredCount={r.answeredCount}
                currentAnswer={r.currentAnswer}
                canAdvance={r.canAdvance}
                onSelect={r.select}
                onPrev={r.prev}
                onNext={r.next}
              />
            </DesktopContainer>
          </section>

          <div className="border-t border-ink/[0.06] py-6">
            <DesktopContainer className="flex items-center justify-between font-mono-hero text-[11px] uppercase tracking-[1.1px] text-ink3">
              <span>BrewAI · Ratgeber</span>
              <span>
                Frage {r.idx + 1} von {r.total}
              </span>
            </DesktopContainer>
          </div>
        </>
      )}
    </div>
  );
}
