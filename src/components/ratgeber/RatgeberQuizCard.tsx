"use client";

import type { RatgeberQuestion } from "@/content/ratgeber";
import { RatgeberAnswerCard } from "@/components/ratgeber/RatgeberAnswerCard";
import { cn } from "@/lib/utils";

type RatgeberQuizCardProps = {
  current: RatgeberQuestion;
  idx: number;
  total: number;
  answeredCount: number;
  currentAnswer: "a" | "b" | "c" | null;
  canAdvance: boolean;
  onSelect: (id: "a" | "b" | "c") => void;
  onPrev: () => void;
  onNext: () => void;
  compact?: boolean;
};

function ChevronLeftIcon() {
  return (
    <svg width="12" height="10" viewBox="0 0 12 10" fill="none" aria-hidden>
      <path d="M11 5 H2 M5 1 L1 5 L5 9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ChevronRightIcon() {
  return (
    <svg width="12" height="10" viewBox="0 0 12 10" fill="none" aria-hidden>
      <path d="M1 5 H10 M7 1 L11 5 L7 9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function RatgeberQuizCard({
  current,
  idx,
  total,
  answeredCount,
  currentAnswer,
  canAdvance,
  onSelect,
  onPrev,
  onNext,
  compact,
}: RatgeberQuizCardProps) {
  const isLast = idx === total - 1;

  return (
    <div
      className={cn(
        "overflow-hidden rounded-[22px] border border-ink/10 bg-white shadow-[0_30px_60px_-30px_rgba(40,28,12,0.18),0_8px_20px_-10px_rgba(40,28,12,0.06)]",
        compact && "rounded-[18px] shadow-[0_20px_40px_-25px_rgba(40,28,12,0.18)]",
      )}
    >
      <div
        className={cn(
          "border-b border-ink/[0.06] bg-gradient-to-b from-amber3 to-white",
          compact ? "px-[18px] py-4" : "px-9 py-6",
        )}
      >
        <div className="mb-3 flex items-center justify-between gap-3">
          <p className="inline-flex items-center gap-2 font-mono-hero text-[10px] uppercase tracking-[1.3px] text-amber sm:text-[11px] sm:tracking-[1.4px]">
            <span className="h-1.5 w-1.5 rounded-full bg-amber" aria-hidden />
            {current.topic} · Frage {current.n}
          </p>
          <p className="font-mono-hero text-[10px] uppercase tracking-wide text-ink3">
            {answeredCount} / {total} beantwortet
          </p>
        </div>
        <div className="flex items-center gap-2">
          {Array.from({ length: total }).map((_, i) => {
            const isActive = i === idx;
            const isPast = i < idx;
            return (
              <div
                key={i}
                className={cn(
                  "relative h-1 flex-1 overflow-hidden rounded-sm",
                  isActive || isPast ? "bg-amber" : "bg-ink/10",
                )}
                aria-hidden
              >
                {isActive ? <div className="absolute inset-y-0 left-0 w-[45%] rounded-sm bg-amber" /> : null}
              </div>
            );
          })}
        </div>
      </div>

      <div key={current.n} className={cn("animate-[evgFadeUp_0.35s_ease-out]", compact ? "px-[18px] py-5" : "px-9 py-10")}>
        <h2
          className={cn(
            "font-serif-hero font-medium leading-[1.12] tracking-[-1px] text-ink",
            compact ? "text-[22px]" : "text-[36px]",
          )}
        >
          {current.title}
        </h2>
        <p className="mt-3 text-sm italic leading-relaxed text-ink3 sm:text-[14.5px]">{current.context}</p>
        <div className={cn("flex flex-col", compact ? "mt-5 gap-2.5" : "mt-8 gap-3")}>
          {current.answers.map((answer, i) => (
            <RatgeberAnswerCard
              key={answer.id}
              letter={String.fromCharCode(65 + i)}
              answer={answer}
              selected={currentAnswer === answer.id}
              onClick={() => onSelect(answer.id)}
              compact={compact}
            />
          ))}
        </div>
      </div>

      <div
        className={cn(
          "flex flex-col gap-3 border-t border-ink/[0.06] sm:flex-row sm:items-center sm:justify-between",
          compact ? "px-[18px] py-4" : "gap-4 px-9 py-6",
        )}
      >
        <button
          type="button"
          onClick={onPrev}
          disabled={idx === 0}
          className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-[10px] border border-ink/10 bg-transparent px-[18px] font-sans-tight text-sm font-medium text-ink transition hover:border-amber/30 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <ChevronLeftIcon />
          Zurück
        </button>
        <p className="text-center font-mono-hero text-[11px] uppercase tracking-[1.1px] text-ink2">
          {canAdvance ? `Frage ${idx + 1} von ${total}` : "Bitte eine Option wählen"}
        </p>
        <button
          type="button"
          onClick={onNext}
          disabled={!canAdvance}
          className={cn(
            "inline-flex min-h-[44px] items-center justify-center gap-2.5 rounded-[10px] px-[22px] font-sans-tight text-sm font-semibold text-[#15110C] transition disabled:cursor-not-allowed",
            canAdvance
              ? "bg-amber shadow-[inset_0_1px_0_rgba(255,255,255,0.18),0_8px_20px_-8px_rgba(199,105,30,0.4)] hover:brightness-105"
              : "bg-amber/55",
          )}
        >
          {isLast ? "Empfehlung sehen" : "Weiter"}
          <ChevronRightIcon />
        </button>
      </div>
    </div>
  );
}
