"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { smoothStep } from "@/lib/scrollConstants";

/** Scroll-Distanz bis Header-Effekt vollständig */
const HEADER_TRANSITION_END = 80;

export function ScrollHeader() {
  const [progress, setProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    let rafId = 0;
    const onScroll = () => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        const raw = Math.min(1, scrollY / HEADER_TRANSITION_END);
        setProgress(smoothStep(raw));
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  // Interpolate values: progress 0 = top state, progress 1 = section 3 state
  // Auf Mobile: kleinere Werte, damit Logo & Nav sichtbar bleiben
  const headerPaddingTop = isMobile ? 16 : 24 - progress * 12;
  const innerGap = isMobile ? 16 : 48 - progress * 28;
  const innerPaddingV = isMobile ? 10 : 12 - progress * 4;
  const innerPaddingH = isMobile ? 16 : 32 - progress * 8;
  const innerPaddingLeft = isMobile ? 16 : 16 + progress * 8;
  const inwardShift = isMobile ? 0 : progress * 64;
  const barShrink = isMobile ? 0 : progress * 0.28;
  const borderOpacity = progress;
  const borderRadius = isMobile ? 9999 : 9999 - progress * (9999 - 16);
  const logoFontSize = isMobile ? 18 : 24 - progress * 4;
  const backdropBlur = progress * 8; // 0 → 8px

  return (
    <header
      className="premium-header premium-header-progress"
      style={{
        paddingTop: `${headerPaddingTop}px`,
      }}
    >
      <div className="premium-header-container">
        <div
          className="premium-header-inner"
          style={{
            gap: `${innerGap}px`,
            padding: `${innerPaddingV}px ${innerPaddingH + inwardShift}px`,
            paddingLeft: `${innerPaddingLeft + inwardShift}px`,
            width: `${(1 - barShrink) * 100}%`,
            marginLeft: "auto",
            marginRight: "auto",
            borderRadius: `${borderRadius}px`,
            borderColor: `rgba(255, 255, 255, ${0.35 * borderOpacity})`,
            boxShadow:
              progress > 0
                ? `0 0 0 1px rgba(255, 255, 255, ${0.12 * borderOpacity}), 0 0 24px rgba(255, 255, 255, ${0.04 * borderOpacity})`
                : "none",
            backdropFilter: `blur(${backdropBlur}px)`,
            WebkitBackdropFilter: `blur(${backdropBlur}px)`,
          }}
        >
          <Link
            href="/"
            className="premium-header-logo rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
            style={{ fontSize: `${logoFontSize}px` }}
          >
            Erik{" "}
            <span
              className="font-light italic"
              style={{
                fontFamily: "var(--font-austera)",
                textShadow: "0 0 20px rgba(34, 197, 94, 0.5), 0 0 40px rgba(34, 197, 94, 0.25)",
              }}
            >
              von Gregory
            </span>
          </Link>
          <nav className="premium-header-nav">
            <a
              href="#contact"
              className="premium-header-link rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
            >
              Kontakt
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
}
