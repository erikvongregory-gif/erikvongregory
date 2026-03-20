"use client";

import { useEffect, useState } from "react";

function useHasHover() {
  const [hasHover, setHasHover] = useState(true);
  useEffect(() => {
    const mq = window.matchMedia("(hover: hover)");
    const id = setTimeout(() => setHasHover(mq.matches), 0);
    const handler = () => setHasHover(mq.matches);
    mq.addEventListener("change", handler);
    return () => {
      clearTimeout(id);
      mq.removeEventListener("change", handler);
    };
  }, []);
  return hasHover;
}

/** Statische Section 4 – Meine 5 Lösungen */
export function DesktopSection4() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [flippedIndex, setFlippedIndex] = useState<number | null>(null);
  const hasHover = useHasHover();

  const handleCardInteraction = (index: number) => {
    setFlippedIndex((prev: number | null) => (prev === index ? null : index));
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
    <section className="relative z-20 flex min-h-screen items-center justify-center overflow-x-hidden py-12 sm:py-16 md:py-24">
      <div className="mx-auto w-full max-w-6xl overflow-visible px-4 lg:px-6">
        <h2 className="mb-6 text-center text-xl font-bold tracking-tight text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.3)] sm:mb-8 sm:text-3xl md:text-4xl">
          Meine 5{" "}
          <span className="font-light italic font-austera-green-fade">
            Lösungen
          </span>
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-5 auto-rows-fr px-3 py-4 overflow-visible sm:px-4 sm:py-6">
          {items.map((item, i) => {
            const isFlipped = flippedIndex === i;
            return (
              <div
                key={item.title}
                role="button"
                tabIndex={0}
                onClick={() => handleCardInteraction(i)}
                onKeyDown={(e) => e.key === "Enter" && handleCardInteraction(i)}
                aria-pressed={isFlipped}
                className={`flip-card text-white min-h-[300px] sm:min-h-[340px] lg:min-h-[380px] transition-transform duration-200 ${isFlipped ? "flip-card-flipped" : ""} ${
                  hasHover && hoveredIndex === i ? "scale-[1.08]" : hasHover && hoveredIndex !== null ? "scale-[0.92]" : ""
                }`}
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
                aria-label={isFlipped ? `${item.title} – Zum Schließen erneut tippen` : `${item.title} – Tippen für Details`}
              >
                <div className="flip-card-inner">
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
