"use client";

import { useState } from "react";

import { CONTAINED_SHADER_BG, ShaderCanvas } from "@/components/ui/animated-glassy-pricing";

/** Statische Section 4 – Meine 5 Lösungen */
export function DesktopSection4() {
  const [flippedIndex, setFlippedIndex] = useState<number | null>(null);

  const handleCardInteraction = (index: number) => {
    setFlippedIndex((prev: number | null) => (prev === index ? null : index));
  };

  const iconClass = "w-7 h-7 shrink-0";
  const items: Array<{ icon: React.ReactNode; title: string; text: string; iconType: string }> = [
    {
      iconType: "camera",
      icon: (
        <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="23 7 16 12 23 17 23 7" />
          <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
        </svg>
      ),
      title: "KI-Bildkampagnen für Social Media",
      text: "Hochwertige KI-Bildkampagnen für Instagram und Ads – schnell produziert und auf Reichweite optimiert.",
    },
    {
      iconType: "chart",
      icon: (
        <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
          <line x1="18" y1="20" x2="18" y2="10" />
          <line x1="12" y1="20" x2="12" y2="4" />
          <line x1="6" y1="20" x2="6" y2="14" />
        </svg>
      ),
      title: "Automatisiertes Social Media Marketing",
      text: "Ein System, das regelmäßig Content für deine Brauerei veröffentlicht – mehr Sichtbarkeit bei weniger Aufwand.",
    },
    {
      iconType: "camera",
      icon: (
        <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
          <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
          <circle cx="12" cy="13" r="4" />
        </svg>
      ),
      title: "KI-Produktfotos für Bier & Getränke",
      text: "Hochwertige KI-Produktfotos für Flaschen, Dosen und Gläser – ideal für Website, Shop und Social Media.",
    },
    {
      iconType: "globe",
      icon: (
        <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <line x1="2" y1="12" x2="22" y2="12" />
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </svg>
      ),
      title: "Moderne Websites mit Storytelling",
      text: "Moderne Websites mit klarer Story, starkem Design und Fokus auf Anfragen statt nur Klicks.",
    },
    {
      iconType: "sparkle",
      icon: (
        <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
          <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
        </svg>
      ),
      title: "KI-Content für Instagram & Ads",
      text: "Regelmäßiger KI-Content für Posts und Ads – speziell für Brauereien.",
    },
  ];

  return (
    <section
      id="section-4"
      className="insurance-card-theme relative z-20 flex w-full min-h-screen items-center justify-center overflow-x-hidden py-12 sm:py-16 md:py-24"
    >
      {/*
        WebGL wie früher. 3D nur auf .flip-card-inner (siehe globals), damit Chromium den Canvas nicht über die Karten legt.
      */}
      <div className="section4-loop-stack-root relative isolate z-0 mx-auto w-full max-w-6xl overflow-visible px-4 lg:px-6">
        <div
          className="section4-loop-shader-backdrop pointer-events-none absolute inset-x-0 -inset-y-12 -z-10 overflow-hidden rounded-[1.75rem] sm:-inset-y-16 sm:rounded-3xl lg:-inset-y-24"
          aria-hidden
        >
          <ShaderCanvas
            mode="contained"
            shape="loop"
            backgroundRgb={CONTAINED_SHADER_BG.desktopLight}
          />
        </div>
        <div className="section4-loop-content-stack relative z-20 min-w-0 transform-gpu pb-20 lg:pb-28">
          <h2 className="mb-6 text-center text-xl font-bold tracking-tight text-zinc-900 drop-shadow-sm sm:mb-8 sm:text-3xl md:text-4xl">
          Meine 5{" "}
          <span className="font-light italic font-austera-green-fade">
            Lösungen
          </span>
        </h2>
          <p className="-mt-4 mb-8 text-center text-sm text-zinc-600 sm:text-base">
            Klar strukturiert, praxisnah und sofort umsetzbar für Brauereien.
          </p>
          <div className="section4-flip-cards-grid section4-arc-layout grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-5 auto-rows-fr px-3 py-4 overflow-visible sm:px-4 sm:py-6">
            {items.map((item, i) => {
            const isFlipped = flippedIndex === i;
            const numberPosClass = i <= 1 ? "left-3" : i >= 3 ? "right-3" : "left-3";
              return (
                <div
                  key={item.title}
                  role="button"
                  tabIndex={0}
                  onClick={() => handleCardInteraction(i)}
                  onKeyDown={(e) => e.key === "Enter" && handleCardInteraction(i)}
                  aria-pressed={isFlipped}
                  className={`section4-flip-card-slide section4-arc-card section4-arc-card-${i} flip-card text-neutral-900 min-h-[360px] sm:min-h-[420px] lg:min-h-[520px] ${isFlipped ? "flip-card-flipped" : ""}`}
                  aria-label={isFlipped ? `${item.title} – Zum Schließen erneut tippen` : `${item.title} – Tippen für Details`}
                >
                  <div className="flip-card-inner">
                    <div className="flip-card-front relative">
                      <span
                        className={`section4-flip-num absolute ${numberPosClass} top-3 inline-flex h-7 w-7 items-center justify-center rounded-full text-xs font-semibold`}
                      >
                        {i + 1}
                      </span>
                      <div className={`flip-card-front-icon icon-anim icon-anim-${item.iconType}`} data-icon={item.iconType}>{item.icon}</div>
                      <h3 className="flip-card-front-title">{item.title}</h3>
                      <p className="flip-card-front-hint">
                        <span className="sm:hidden">Tippen für Details</span>
                        <span className="hidden sm:inline">Hover für Details</span>
                        <svg className="flip-card-front-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                          <path d="M7 17L17 7M17 7H7M17 7v10" />
                        </svg>
                      </p>
                    </div>
                    <div className="flip-card-back relative">
                      <span
                        className={`section4-flip-num absolute ${numberPosClass} top-3 z-10 inline-flex h-7 w-7 items-center justify-center rounded-full text-xs font-semibold`}
                      >
                        {i + 1}
                      </span>
                      <div className="flip-card-back-content">
                        <div className={`flip-card-icon-wrap mb-4 icon-anim icon-anim-${item.iconType}`} data-icon={item.iconType}>{item.icon}</div>
                        <h3 className="text-base font-semibold tracking-tight text-zinc-900 sm:text-lg">{item.title}</h3>
                        <p className="mt-2 text-sm leading-relaxed text-zinc-600 sm:text-base">{item.text}</p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
