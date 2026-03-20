"use client";

import { useEffect, useState } from "react";
import {
  SECTION5_FADE_END,
  SECTION6_FADE_END,
  SECTION6_SLIDE_UP_DURATION,
  SECTION6_SLIDE_UP_START,
  smoothStep,
} from "@/lib/scrollConstants";
import { AppleStyleButton } from "./AppleStyleButton";

const expertiseItems = [
  {
    icon: (
      <svg className="h-5 w-5 section6-icon-anim section6-icon-calendar" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z" />
        <path d="M12 14v4M10 16h4" />
      </svg>
    ),
    text: "wie Bier verkauft wird",
  },
  {
    icon: (
      <svg className="h-5 w-5 section6-icon-anim section6-icon-chart" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="20" x2="18" y2="10" />
        <line x1="12" y1="20" x2="12" y2="4" />
        <line x1="6" y1="20" x2="6" y2="14" />
      </svg>
    ),
    text: "wie Brauereien Marketing betreiben",
  },
  {
    icon: (
      <svg className="h-5 w-5 section6-icon-anim section6-icon-image" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
        <circle cx="8.5" cy="8.5" r="1.5" />
        <polyline points="21 15 16 10 5 21" />
      </svg>
    ),
    text: "wie man Bier digital inszeniert",
  },
];

export function Section6Glaubwuerdigkeit() {
  const [progress, setProgress] = useState({ in: 0, slideUp: 0 });

  useEffect(() => {
    let rafId = 0;
    let lastTick = 0;
    const isMobile = () => window.innerWidth <= 768;
    const onScroll = () => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame((now) => {
        if (isMobile() && now - lastTick < 32) return;
        lastTick = now;
        const scrollY = window.scrollY;
        const raw6 = Math.max(
          0,
          Math.min(1, (scrollY - SECTION5_FADE_END) / (SECTION6_FADE_END - SECTION5_FADE_END))
        );
        const rawSlide = Math.max(
          0,
          Math.min(1, (scrollY - SECTION6_SLIDE_UP_START) / SECTION6_SLIDE_UP_DURATION)
        );
        setProgress({ in: smoothStep(raw6), slideUp: smoothStep(rawSlide) });
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  const opacity = progress.slideUp > 0 ? 0 : progress.in;
  const isVisible = opacity > 0.02;
  const hasSlidUp = progress.slideUp > 0.9; // Klicks durchlassen, wenn Box nach oben weg ist
  const translateIn = (1 - progress.in) * 50;
  const translateUp = progress.slideUp * -1100; // px – Box schiebt nach oben aus dem Bild
  const translate = translateIn + translateUp;
  const scale = 0.98 + progress.in * 0.02 - progress.slideUp * 0.02;

  const getItemProgress = (index: number) => {
    const start = index * 0.2;
    const raw = Math.max(0, Math.min(1, (progress.in - start) / 0.3));
    return smoothStep(raw);
  };

  return (
    <section
      className="pointer-events-none fixed inset-0 top-0 z-[60] flex min-h-screen items-center justify-center overflow-y-auto py-12 sm:py-16 md:py-24"
      style={{
        opacity,
        pointerEvents: isVisible && !hasSlidUp ? "auto" : "none",
        transition: "opacity 0.033s cubic-bezier(0.33, 1, 0.68, 1)",
      }}
    >
      <div
        className="mx-auto w-full max-w-4xl px-4 py-4 sm:py-6 lg:px-6"
        style={{
          transform: `translateY(${translate}px) scale(${scale})`,
          transition: "transform 0.033s cubic-bezier(0.33, 1, 0.68, 1)",
        }}
      >
        <div className="section2-card mx-auto max-w-2xl rounded-2xl px-6 py-8 sm:px-8 sm:py-10">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-4 py-1.5 text-sm font-medium text-emerald-300">
            <span aria-hidden>✦</span>
            Aus der Praxis
          </div>
          <h2 className="mb-4 text-2xl font-bold tracking-tight text-white drop-shadow-md sm:text-3xl md:text-4xl">
            Von der Brauerei –{" "}
            <span className="font-light italic font-austera-green-fade">
              für die Brauerei
            </span>
          </h2>
          <p className="mb-8 text-base leading-relaxed text-white/90 sm:text-lg">
            Ich arbeite selbst in einer Brauerei und kenne die Branche aus erster Hand.
          </p>
          <div className="mb-8 space-y-4">
            {expertiseItems.map((item, i) => {
              const itemProg = getItemProgress(i);
              return (
                <div
                  key={item.text}
                  className="section6-expertise-item flex items-center gap-4 rounded-xl border border-white/15 bg-white/5 px-4 py-3 backdrop-blur-sm transition-all duration-300"
                  style={{
                    opacity: itemProg,
                    transform: `translateX(${(1 - itemProg) * -20}px)`,
                  }}
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-400/20 text-emerald-300">
                    {item.icon}
                  </span>
                  <span className="text-base font-medium text-white/95 sm:text-lg">{item.text}</span>
                </div>
              );
            })}
          </div>
          <p className="mb-6 text-center text-base font-medium leading-relaxed text-white/95 sm:text-lg">
            Brauereiwissen + moderne KI = Marketing, das funktioniert.
          </p>
          <div className="mt-8 flex justify-center">
            <AppleStyleButton href="#contact">Kostenloses Erstgespräch starten</AppleStyleButton>
          </div>
        </div>
      </div>
    </section>
  );
}
