"use client";

import { useState, useEffect } from "react";

type ProblemItemProps = {
  text: string;
  /** Lösung, die beim Klick angezeigt wird (zeigt wie KI hilft) */
  solution?: string;
  index: number;
  /** Mit X-/Check-Icon */
  showIcon?: boolean;
  /** Zentrierter Text (Mobile) */
  centered?: boolean;
  /** Zusätzliche CSS-Klassen */
  className?: string;
  /** Ändert sich bei Section-Exit → Reset auf Anfangszustand */
  resetTrigger?: number;
};

export function ProblemItem({ text, solution, index, showIcon = true, centered = false, className = "", resetTrigger = 0 }: ProblemItemProps) {
  const [revealed, setRevealed] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    setRevealed(false);
    setIsClosing(false);
  }, [resetTrigger]);

  const handleClick = () => {
    if (revealed) {
      setIsClosing(true);
      setIsClicking(true);
      setTimeout(() => {
        setRevealed(false);
        setIsClosing(false);
        setIsClicking(false);
      }, 280);
    } else {
      setIsClicking(true);
      setRevealed(true);
      setTimeout(() => setIsClicking(false), 350);
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`section2-problem-item problem-item-tappable group relative flex w-full min-w-0 flex-col items-stretch gap-2 overflow-hidden rounded-xl border px-4 py-3 text-left backdrop-blur-sm transition-all duration-300 ${
        centered ? "text-center" : ""
      } ${
        revealed
          ? "border-emerald-500/40 bg-emerald-500/15 shadow-[0_0_24px_rgba(34,197,94,0.2)]"
          : "border-red-500/20 bg-white/5 hover:border-red-500/30 hover:bg-white/8"
      } ${!revealed ? "problem-item-hint-pulse" : ""} ${isClicking ? (revealed ? "problem-item-close-bounce" : "problem-item-click-bounce") : ""} ${className}`}
      aria-pressed={revealed}
      aria-label={revealed ? `${text} – antippen zum Schließen` : `${text} – antippen um Lösung anzuzeigen`}
    >
      {/* Ripple-Burst beim Klick */}
      {revealed && (
        <span
          className="problem-item-burst absolute inset-0 rounded-xl"
          aria-hidden
        />
      )}

      <div className={`relative z-10 flex min-w-0 items-center gap-3 ${centered ? "justify-center" : ""}`}>
        {showIcon && (
          <span
            className={`problem-item-icon grid h-8 w-8 shrink-0 place-items-center rounded-full transition-all duration-400 ${
              revealed
                ? "scale-110 bg-emerald-500/40 text-emerald-300"
                : `problem-x-icon problem-x-icon-delay-${index} bg-red-500/25 text-red-300`
            }`}
          >
            {revealed ? (
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
          className={`min-w-0 flex-1 text-sm transition-all duration-300 sm:text-base ${
            revealed ? "text-white/85" : "text-white/90"
          }`}
        >
          {text}
        </span>
        {!revealed && (
          <span className="shrink-0 text-xs font-medium text-white/50 transition-opacity group-hover:text-white/70">
            Tippen
          </span>
        )}
      </div>

      {(revealed || isClosing) && solution && (
        <p
          className={`relative z-10 ml-11 text-sm font-medium text-emerald-300/95 sm:text-base transition-all duration-250 ease-out ${
            isClosing ? "problem-solution-out" : "problem-solution-in problem-solution-in-delayed"
          }`}
        >
          → {solution}
        </p>
      )}
    </button>
  );
}
