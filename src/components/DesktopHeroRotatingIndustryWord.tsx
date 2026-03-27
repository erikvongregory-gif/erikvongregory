"use client";

import { useEffect, useState, type CSSProperties } from "react";

const WORDS = ["Brauereien", "Gastronomie", "Getränkehersteller"] as const;
const INTERVAL_MS = 5000;

type Props = {
  className?: string;
  style?: CSSProperties;
};

/** Wortwechsel mit Slide nach oben – nur sichtbar/aktiv ab ≥768px (Desktop-Hero). */
export function DesktopHeroRotatingIndustryWord({ className = "", style }: Props) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % WORDS.length);
    }, INTERVAL_MS);
    return () => window.clearInterval(id);
  }, []);

  return (
    <span className={`inline-block ${className}`} style={style} aria-live="polite">
      <span
        className="hero-brauereien-highlight block overflow-hidden"
        style={{
          height: "1.1em",
          lineHeight: 1.1,
        }}
      >
        <span
          className="block will-change-transform transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
          style={{
            transform: `translateY(calc(-${index} * 1.1em))`,
          }}
        >
          {WORDS.map((word) => (
            <span
              key={word}
              className="flex h-[1.1em] items-end whitespace-nowrap font-light italic leading-none"
            >
              {word}
            </span>
          ))}
        </span>
      </span>
    </span>
  );
}
