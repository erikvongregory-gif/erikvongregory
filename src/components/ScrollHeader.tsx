"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { smoothStep } from "@/lib/scrollConstants";

/** Scroll-Distanz bis Header-Effekt vollständig */
const HEADER_TRANSITION_END = 80;
const PROGRESS_STEP = 0.04; /* Nur State-Update wenn Progress sich merklich ändert – flüssigeres Scroll */

export function ScrollHeader() {
  const [progress, setProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const lastProgressRef = useRef(0);

  useEffect(() => {
    const check = () => {
      setIsMobile(window.innerWidth < 640);
      setIsDesktop(window.innerWidth >= 768);
    };
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    let rafId = 0;
    const onScroll = () => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        const raw = Math.min(1, scrollY / HEADER_TRANSITION_END);
        const p = smoothStep(raw);
        if (Math.abs(p - lastProgressRef.current) >= PROGRESS_STEP) {
          lastProgressRef.current = p;
          setProgress(p);
        }
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

  return (
    <header
      className={`premium-header premium-header-progress ${isDesktop ? "header-light-theme" : ""}`}
      style={{
        paddingTop: `${headerPaddingTop}px`,
      }}
    >
      <div className="premium-header-container">
        <div
          className="premium-header-inner"
          style={{
            gap: `${innerGap}px`,
            paddingTop: `${innerPaddingV}px`,
            paddingRight: `${innerPaddingH + inwardShift}px`,
            paddingBottom: `${innerPaddingV}px`,
            paddingLeft: `${innerPaddingLeft + inwardShift}px`,
            width: `${(1 - barShrink) * 100}%`,
            marginLeft: "auto",
            marginRight: "auto",
            borderRadius: `${borderRadius}px`,
            borderColor: "transparent",
            backgroundColor: progress > 0
              ? (isDesktop ? "rgba(255, 255, 255, 0.65)" : "rgba(10, 15, 20, 0.7)")
              : "transparent",
            backdropFilter: progress > 0 ? "blur(12px)" : "none",
            WebkitBackdropFilter: progress > 0 ? "blur(12px)" : "none",
            boxShadow: "none",
          }}
        >
          <div className="flex flex-col items-start gap-px">
            <Link
              href="/"
              className="premium-header-logo rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
              style={{ fontSize: `${logoFontSize}px` }}
            >
              EvG<span className="font-light italic font-austera-green-fade">labs</span>
            </Link>
            {isMobile && (
              <span
                className="text-[10px] font-medium leading-none tracking-wider text-orange-500"
                style={{
                  textShadow: "0 0 8px rgba(224, 122, 64, 0.3)",
                }}
              >
                KI für Brauereien
              </span>
            )}
          </div>
          <nav className="premium-header-nav">
            <a
              href="#contact"
              className="premium-header-link flex items-center gap-1.5 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
            >
              {isMobile && (
                <svg
                  className="h-3.5 w-3.5 shrink-0 text-white/70"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden
                >
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
              )}
              Kontakt
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
}
