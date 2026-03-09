"use client";

import { useRef, useEffect, useState } from "react";

/** Auf Mobile: Scatter-Effekt deaktivieren für flüssigeres Scrollen */
const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    const id = setTimeout(() => setIsMobile(mq.matches), 0);
    const handler = () => setIsMobile(mq.matches);
    mq.addEventListener("change", handler);
    return () => {
      clearTimeout(id);
      mq.removeEventListener("change", handler);
    };
  }, []);
  return isMobile;
};

const SHIMMER_STYLE = {
  background: "linear-gradient(90deg, #ffffff 0%, #ffffff 25%, #a7f3d0 50%, #ffffff 75%, #ffffff 100%)",
  backgroundSize: "200% 100%",
  WebkitBackgroundClip: "text" as const,
  backgroundClip: "text" as const,
  color: "transparent",
  /* Dezenter Glow – weniger Blur = schärferer Text auf Desktop */
  textShadow: "0 0 8px rgba(34, 197, 94, 0.4), 0 0 16px rgba(34, 197, 94, 0.2)",
  WebkitFontSmoothing: "subpixel-antialiased" as const,
  textRendering: "geometricPrecision" as const,
};

type ScatterTextOnScrollProps = {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "p" | "span";
  italicWords?: string[];
  scrollAnchorRef?: React.RefObject<HTMLElement | null>;
  /** Shimmer/Lighting-Effekt wie im Loading-Screen */
  shimmer?: boolean;
};

/** Zerstreut die Wörter beim Rausscrollen der Hero-Section */
export function ScatterTextOnScroll({
  text,
  className = "",
  as: Tag = "h1",
  italicWords = [],
  scrollAnchorRef,
  shimmer = false,
}: ScatterTextOnScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scatter, setScatter] = useState(0);
  const isMobile = useIsMobile();

  const lines = text.split("\n");
  const effectiveScatter = isMobile ? 0 : scatter;

  useEffect(() => {
    const anchor = scrollAnchorRef?.current ?? containerRef.current?.closest("section");
    if (!anchor) return;

    let rafId = 0;
    const updateScatter = () => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const rect = anchor.getBoundingClientRect();
        if (rect.top >= 0) {
          setScatter(0);
        } else {
          setScatter(Math.min(1, -rect.top / 350));
        }
      });
    };

    const t = setTimeout(updateScatter, 150);

    window.addEventListener("scroll", updateScatter, { passive: true });
    return () => {
      clearTimeout(t);
      window.removeEventListener("scroll", updateScatter);
      if (rafId) cancelAnimationFrame(rafId);
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

  let wordIndex = 0;
  return (
    <div ref={containerRef} className="block w-full">
      <Tag
        className={`${className} ${shimmer ? "hero-headline-shimmer" : ""}`}
        style={{ overflow: "visible", ...(shimmer ? SHIMMER_STYLE : {}) }}
      >
        {lines.map((line, lineIdx) => {
          const words = line.trim().split(/\s+/).filter(Boolean);
          return (
            <span key={lineIdx} className="block">
              {words.map((word, i) => {
                const idx = wordIndex++;
                const { x, y, r } = getOffset(idx);
                const isItalic = italicWords.includes(word);
                const content = isItalic ? (
                  <span
                    className="font-light italic"
                    style={{
                      fontFamily: "var(--font-austera)",
                      textShadow: "0 0 8px rgba(34, 197, 94, 0.3), 0 0 16px rgba(34, 197, 94, 0.15)",
                    }}
                  >
                    {word}
                  </span>
                ) : (
                  word
                );
                return (
                  <span
                    key={`${word}-${idx}`}
                    className="inline-block align-baseline transition-transform duration-75 ease-out"
                    style={{
                      transform:
                        effectiveScatter > 0
                          ? `translate(${Math.round(x * effectiveScatter)}px, ${Math.round(y * effectiveScatter)}px) rotate(${r * effectiveScatter}deg)`
                          : "none",
                      opacity: 1 - effectiveScatter * 0.4,
                    }}
                  >
                    {content}
                    {i < words.length - 1 ? "\u00A0" : ""}
                  </span>
                );
              })}
              {lineIdx < lines.length - 1 ? <br /> : null}
            </span>
          );
        })}
      </Tag>
    </div>
  );
}
