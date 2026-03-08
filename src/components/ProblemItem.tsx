"use client";

import { useState } from "react";

type ProblemItemProps = {
  text: string;
  index: number;
  /** Mit X-/Check-Icon */
  showIcon?: boolean;
  /** Zentrierter Text (Mobile) */
  centered?: boolean;
  /** Zusätzliche CSS-Klassen */
  className?: string;
};

export function ProblemItem({ text, index, showIcon = true, centered = false, className = "" }: ProblemItemProps) {
  const [acknowledged, setAcknowledged] = useState(false);

  const handleClick = () => {
    if (acknowledged) return;
    setAcknowledged(true);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`section2-problem-item problem-item-tappable group relative flex w-full min-w-0 items-center gap-3 overflow-hidden rounded-xl border px-4 py-3 backdrop-blur-sm transition-all duration-300 ${
        centered ? "justify-center text-center" : "text-left"
      } ${
        acknowledged
          ? "border-emerald-500/40 bg-emerald-500/15 shadow-[0_0_24px_rgba(34,197,94,0.2)]"
          : "border-red-500/20 bg-white/5 hover:border-red-500/30 hover:bg-white/8"
      } ${className}`}
      aria-pressed={acknowledged}
      aria-label={acknowledged ? `${text} – erledigt` : `${text} – antippen zum Bestätigen`}
    >
      {/* Ripple-Burst beim Klick */}
      {acknowledged && (
        <span
          className="problem-item-burst absolute inset-0 rounded-xl"
          aria-hidden
        />
      )}

      {showIcon && (
        <span
          className={`problem-item-icon relative z-10 grid h-8 w-8 shrink-0 place-items-center rounded-full transition-all duration-400 ${
            acknowledged
              ? "scale-110 bg-emerald-500/40 text-emerald-300"
              : `problem-x-icon problem-x-icon-delay-${index} bg-red-500/25 text-red-300`
          }`}
        >
          {acknowledged ? (
            <svg
              className="problem-check-icon block h-5 w-5 shrink-0"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
          ) : (
            <svg
              className="block h-4 w-4 shrink-0"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          )}
        </span>
      )}

      <span
        className={`relative z-10 text-sm transition-all duration-300 sm:text-base ${
          acknowledged ? "text-white/70" : "text-white/90"
        }`}
      >
        <span className={acknowledged ? "problem-item-strikethrough" : ""}>
          {text}
        </span>
      </span>
    </button>
  );
}
