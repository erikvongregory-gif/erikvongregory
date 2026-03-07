"use client";

import { useEffect, useState } from "react";

function useHasHover() {
  const [hasHover, setHasHover] = useState(true);
  useEffect(() => {
    const mq = window.matchMedia("(hover: hover)");
    setHasHover(mq.matches);
    const handler = () => setHasHover(mq.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return hasHover;
}
import {
  SECTION4_FADE_START,
  SECTION4_FADE_END,
  SECTION4_HOLD,
  SECTION4_FADE_OUT_DURATION,
  SECTION5_FADE_START,
  smoothStep,
} from "@/lib/scrollConstants";

export function Section4Boxes() {
  const [progress, setProgress] = useState(0);
  const [fadeOut, setFadeOut] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [flippedIndex, setFlippedIndex] = useState<number | null>(null);
  const hasHover = useHasHover();

  const handleCardInteraction = (index: number) => {
    setFlippedIndex((prev: number | null) => (prev === index ? null : index));
  };

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
        const raw = Math.max(
          0,
          Math.min(1, (scrollY - SECTION4_FADE_START) / (SECTION4_FADE_END - SECTION4_FADE_START))
        );
        const fadeOutStart = SECTION4_FADE_END + SECTION4_HOLD;
        const rawOut = Math.max(
          0,
          Math.min(1, (scrollY - fadeOutStart) / SECTION4_FADE_OUT_DURATION)
        );
        setProgress(smoothStep(raw));
        setFadeOut(smoothStep(rawOut));
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  const opacity = progress * (1 - fadeOut);
  const isVisible = opacity > 0.02;
  const translate = (1 - progress) * 180;
  const scale = 0.98 + progress * 0.02;

  /** Box-Einblendung: jede Box slide-t nacheinander nach oben (gestaffelt bei Scroll) */
  const getBoxProgress = (index: number) => {
    const start = index * 0.18;
    const raw = Math.max(0, Math.min(1, (progress - start) / 0.22));
    return smoothStep(raw);
  };

  const iconClass = "w-6 h-6 shrink-0";
  const items: Array<{ icon: React.ReactNode; title: string; text: string; iconType: string }> = [
    {
      iconType: "camera",
      icon: (
        <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
          <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
          <circle cx="12" cy="13" r="4" />
        </svg>
      ),
      title: "KI-Produktfotos für Bier & Getränke",
      text: "Hochwertige Produktbilder für Flaschen, Dosen und Gläser – erstellt mit moderner KI. Perfekt für Website, Online-Shop, Werbung und Social Media, ohne teure Fotoshootings.",
    },
    {
      iconType: "video",
      icon: (
        <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="23 7 16 12 23 17 23 7" />
          <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
        </svg>
      ),
      title: "KI-Werbevideos für Social Media",
      text: "Cinematische Werbevideos für Bier, Brauereien und Getränke – produziert mit KI. Ideal für TikTok, Instagram und Ads, um Aufmerksamkeit zu erzeugen und neue Kunden zu erreichen.",
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
      text: "Wir entwickeln ein System, das regelmäßig Content für deine Brauerei veröffentlicht. Mehr Reichweite, mehr Sichtbarkeit und weniger Aufwand für dein Team.",
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
      text: "Websites, die deine Brauerei perfekt präsentieren und Besucher zu Kunden machen. Modernes Design, starke Bilder und eine klare Story rund um deine Marke.",
    },
    {
      iconType: "sparkle",
      icon: (
        <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
          <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
        </svg>
      ),
      title: "KI-Content für Instagram, TikTok & Ads",
      text: "Regelmäßiger Content speziell für Brauereien und Getränkemarken. Posts, Videos und Kampagnen, die Reichweite aufbauen und deine Marke sichtbar machen.",
    },
  ];

  return (
    <section
      className="pointer-events-none fixed inset-0 top-0 z-40 flex min-h-screen items-center justify-center overflow-y-auto overflow-x-hidden py-12 sm:py-16 md:py-24"
      style={{
        opacity,
        pointerEvents: isVisible ? "auto" : "none",
        transition: "opacity 0.1s cubic-bezier(0.33, 1, 0.68, 1)",
      }}
    >
      <div
        className="mx-auto w-full max-w-6xl overflow-visible px-4 lg:px-6"
        style={{
          transform: `translateY(${translate}px) scale(${scale})`,
          transition: "transform 0.22s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        <h2 className="mb-6 text-center text-xl font-bold tracking-tight text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.3)] sm:mb-8 sm:text-3xl md:text-4xl">
          Meine 5{" "}
          <span
            className="font-light italic"
            style={{
              fontFamily: "var(--font-austera)",
              textShadow: "0 0 20px rgba(34, 197, 94, 0.5), 0 0 40px rgba(34, 197, 94, 0.25)",
            }}
          >
            Lösungen
          </span>
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-5 auto-rows-fr px-3 py-4 overflow-visible sm:px-4 sm:py-6">
          {items.map((item, i) => {
            const boxProg = getBoxProgress(i);
            const slideUp = (1 - boxProg) * 80;
            const isFlipped = flippedIndex === i;
            return (
            <div
              key={item.title}
              role="button"
              tabIndex={0}
              onClick={() => handleCardInteraction(i)}
              onKeyDown={(e) => e.key === "Enter" && handleCardInteraction(i)}
              aria-pressed={isFlipped}
              className={`flip-card text-white min-h-[300px] sm:min-h-[340px] lg:min-h-[380px] ${isFlipped ? "flip-card-flipped" : ""}`}
              style={{
                opacity: boxProg,
                transform:
                  hasHover && hoveredIndex === i
                    ? `translateY(${slideUp}px) scale(1.08)`
                    : hasHover && hoveredIndex !== null
                      ? `translateY(${slideUp}px) scale(0.92)`
                      : `translateY(${slideUp}px)`,
                transition: "transform 0.2s cubic-bezier(0.33, 1, 0.68, 1), opacity 0.2s cubic-bezier(0.33, 1, 0.68, 1)",
              }}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
              aria-label={isFlipped ? `${item.title} – Zum Schließen erneut tippen` : `${item.title} – Tippen für Details`}
            >
              <div className="flip-card-inner">
                {/* Front: Icon, Titel, Hover-Hinweis */}
                <div className="flip-card-front">
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
                {/* Back: full content, same typography as original */}
                <div className="flip-card-back">
                  <div className="flip-card-back-content">
                    <div className={`flip-card-icon-wrap mb-4 icon-anim icon-anim-${item.iconType}`} data-icon={item.iconType}>{item.icon}</div>
                    <h3 className="text-sm font-semibold tracking-tight text-white sm:text-base">{item.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-white/85">{item.text}</p>
                  </div>
                </div>
              </div>
            </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

