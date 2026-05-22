"use client";

import { RatgeberHero } from "@/components/ratgeber/RatgeberHero";
import { RatgeberQuizCard } from "@/components/ratgeber/RatgeberQuizCard";
import { RatgeberRecommendation } from "@/components/ratgeber/RatgeberRecommendation";
import type { useRatgeber } from "@/lib/useRatgeber";

type RatgeberMobileProps = {
  ratgeber: ReturnType<typeof useRatgeber>;
};

export function RatgeberMobile({ ratgeber: r }: RatgeberMobileProps) {

  return (
    <div className="ratgeber-root mobile-root bg-paper pb-10 text-ink">
      <RatgeberHero done={r.done} total={r.total} compact />

      {r.done ? (
        <RatgeberRecommendation result={r.result} score={r.score} onRestart={r.restart} onPrev={r.prev} compact />
      ) : (
        <section className="px-4" aria-label="Wissenscheck-Quiz">
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
            compact
          />
        </section>
      )}
    </div>
  );
}
