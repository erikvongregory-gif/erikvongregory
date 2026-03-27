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
  const [animate, setAnimate] = useState(true);
  const [isDesktopWide, setIsDesktopWide] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const sync = () => setIsDesktopWide(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (!isDesktopWide) {
      setIndex(0);
      setAnimate(true);
      return;
    }
    const id = window.setInterval(() => {
      setIndex((i) => i + 1);
    }, INTERVAL_MS);
    return () => window.clearInterval(id);
  }, [isDesktopWide]);

  useEffect(() => {
    if (index < WORDS.length) return;
    /* Nach dem letzten (duplizierten) Eintrag ohne Animation auf Start zurücksetzen,
       damit der Zyklus visuell immer nur nach oben läuft. */
    const t = window.setTimeout(() => {
      setAnimate(false);
      setIndex(0);
      requestAnimationFrame(() => setAnimate(true));
    }, 520);
    return () => window.clearTimeout(t);
  }, [index]);

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
          className={`block will-change-transform ease-[cubic-bezier(0.22,1,0.36,1)] ${animate ? "transition-transform duration-500" : ""}`}
          style={{
            transform: `translateY(-${index * 100}%)`,
          }}
        >
          {[...WORDS, WORDS[0]].map((word, i) => (
            <span
              key={`${word}-${i}`}
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
