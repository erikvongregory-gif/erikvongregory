"use client";

export function AiLoader() {
  const letters = ["G", "e", "n", "e", "r", "a", "t", "i", "n", "g"];

  return (
    <div className="ai-loader-wrapper" aria-live="polite" aria-label="Bild wird generiert">
      {letters.map((letter, index) => (
        <span
          key={`${letter}-${index}`}
          className="ai-loader-letter"
          style={{ animationDelay: `${index * 0.08}s` }}
        >
          {letter}
        </span>
      ))}
      <div className="ai-loader-ring" />
    </div>
  );
}

