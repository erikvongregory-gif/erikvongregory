"use client";

type TypingEffectProps = {
  text: string;
  /** Scroll-Progress 0–1: bei 0 nichts, bei 1 vollständiger Text */
  progress: number;
  className?: string;
};

export function TypingEffect({ text, progress, className = "" }: TypingEffectProps) {
  const charCount = Math.floor(progress * text.length);
  const displayed = text.slice(0, charCount);
  const isComplete = charCount >= text.length;

  return (
    <span className={className}>
      {displayed}
      {!isComplete && (
        <span
          className="animate-typing-cursor inline-block w-0.5 translate-y-0.5 bg-current align-baseline"
          aria-hidden
        />
      )}
    </span>
  );
}
