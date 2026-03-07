"use client";

import { useRef, useEffect, useState } from "react";

/** Auf Mobile: Scatter-Effekt deaktivieren für flüssigeres Scrollen */
const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    setIsMobile(mq.matches);
    const handler = () => setIsMobile(mq.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return isMobile;
};

type ScatterTextOnScrollProps = {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "p" | "span";
  italicWords?: string[];
  scrollAnchorRef?: React.RefObject<HTMLElement | null>;
};

/** Zerstreut die Wörter beim Rausscrollen der Hero-Section */
export function ScatterTextOnScroll({
  text,
  className = "",
  as: Tag = "h1",
  italicWords = [],
  scrollAnchorRef,
}: ScatterTextOnScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scatter, setScatter] = useState(0);
  const isMobile = useIsMobile();

  const words = text.split(/\s+/);
  const effectiveScatter = isMobile ? 0 : scatter;

  useEffect(() => {
    const anchor = scrollAnchorRef?.current ?? containerRef.current?.closest("section");
    if (!anchor) return;

    const updateScatter = () => {
      const rect = anchor.getBoundingClientRect();
      if (rect.top >= 0) {
        setScatter(0);
      } else {
        setScatter(Math.min(1, -rect.top / 350));
      }
    };

    const t = setTimeout(updateScatter, 150);

    window.addEventListener("scroll", updateScatter, { passive: true });
    return () => {
      clearTimeout(t);
      window.removeEventListener("scroll", updateScatter);
    };
  }, [scrollAnchorRef]);

  const getOffset = (i: number) => {
    const seed = (i * 17 + 13) % 100;
    const angle = (seed / 100) * Math.PI * 2;
    const dist = 30 + (seed % 40);
    return {
      x: Math.cos(angle) * dist,
      y: Math.sin(angle) * dist * 0.6,
      r: (seed % 20) - 10,
    };
  };

  return (
    <div ref={containerRef} className="inline">
      <Tag className={className} style={{ overflow: "visible" }}>
        {words.map((word, i) => {
          const { x, y, r } = getOffset(i);
          const isItalic = italicWords.includes(word);
          const content = isItalic ? (
            <span
              className="font-light italic"
              style={{
                fontFamily: "var(--font-austera)",
                textShadow: "0 0 20px rgba(34, 197, 94, 0.35), 0 0 40px rgba(34, 197, 94, 0.2), 0 0 60px rgba(34, 197, 94, 0.1)",
              }}
            >
              {word}
            </span>
          ) : (
            word
          );
          return (
            <span
              key={`${word}-${i}`}
              className="inline-block align-baseline transition-transform duration-300 ease-out"
              style={{
                transform: `translate(${x * effectiveScatter}px, ${y * effectiveScatter}px) rotate(${r * effectiveScatter}deg)`,
                opacity: 1 - effectiveScatter * 0.4,
              }}
            >
              {content}
              {i < words.length - 1 ? "\u00A0" : ""}
            </span>
          );
        })}
      </Tag>
    </div>
  );
}
