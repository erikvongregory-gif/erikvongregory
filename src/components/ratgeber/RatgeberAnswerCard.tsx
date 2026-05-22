"use client";

import type { RatgeberAnswer } from "@/content/ratgeber";
import { cn } from "@/lib/utils";

type RatgeberAnswerCardProps = {
  letter: string;
  answer: RatgeberAnswer;
  selected: boolean;
  onClick: () => void;
  compact?: boolean;
};

export function RatgeberAnswerCard({ letter, answer, selected, onClick, compact }: RatgeberAnswerCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "w-full rounded-[14px] border text-left transition-[background-color,border-color,transform,box-shadow] duration-150",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-amber",
        compact
          ? "grid grid-cols-[44px_1fr_auto] items-center gap-3 p-4"
          : "grid grid-cols-[52px_1fr_auto] items-center gap-4 p-[18px_22px] hover:-translate-y-px hover:border-amber/25 hover:bg-[#FAF6EE]",
        selected
          ? "border-amber bg-amber3 shadow-[inset_0_0_0_1px_#C7691E,0_6px_16px_-8px_rgba(199,105,30,0.25)]"
          : "border-ink/10 bg-white",
      )}
    >
      <span
        className={cn(
          "inline-flex items-center justify-center rounded-[10px] font-serif-hero text-[22px] font-medium italic transition-colors",
          compact ? "h-9 w-9 text-lg" : "h-10 w-10",
          selected ? "bg-amber text-[#15110C]" : "bg-amber/15 text-amber",
        )}
      >
        {letter}
      </span>
      <span className="min-w-0">
        <span className={cn("block font-serif-hero font-medium leading-snug text-ink", compact ? "text-[17px]" : "text-[19px] tracking-[-0.3px]")}>
          {answer.text}
        </span>
        <span className={cn("mt-1 block font-mono-hero text-[10.5px] uppercase tracking-[1.1px]", selected ? "text-amber" : "text-ink3")}>
          {answer.hint}
        </span>
      </span>
      <span
        className={cn(
          "inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full border transition-colors",
          selected ? "border-amber bg-amber text-[#15110C]" : "border-ink/12 bg-transparent text-ink3",
        )}
        aria-hidden
      >
        {selected ? (
          <svg width="14" height="10" viewBox="0 0 14 10" fill="none">
            <path d="M1 5 L5 9 L13 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        ) : (
          <span className="h-2 w-2 rounded-full bg-ink/12" />
        )}
      </span>
    </button>
  );
}
