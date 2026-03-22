"use client";

import Image from "next/image";
import { useRef, useEffect, useState } from "react";
import { ScatterTextOnScroll } from "./ScatterTextOnScroll";
import { AppleStyleButton } from "./AppleStyleButton";
import { HERO_END, SECTION2_FADE_END, smoothStep } from "@/lib/scrollConstants";

export function HeroWithScatter() {
  const heroRef = useRef<HTMLElement>(null);
  const [raw, setRaw] = useState(1);

  const [portraitZoomProgress, setPortraitZoomProgress] = useState(0);
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
        setRaw(Math.max(0, 1 - scrollY / HERO_END));
        const zoomRaw = Math.max(0, Math.min(1, (scrollY - HERO_END * 0.5) / (SECTION2_FADE_END - HERO_END * 0.5)));
        setPortraitZoomProgress(smoothStep(zoomRaw));
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  const fade = smoothStep(raw);
  const getFade = (i: number) => {
    const threshold = 1 - i * 0.12;
    const f = raw >= threshold ? 1 : Math.max(0, raw / threshold);
    return smoothStep(f);
  };

  const heroItems = [
    { fade: getFade(0), el: (
      <p className="hero-slide-in hero-slide-in-delay-1 mb-2 text-sm font-normal uppercase tracking-widest text-white/95">
        KI für Brauereien & Gastronomie
      </p>
    )},
    { fade: getFade(1), el: (
      <ScatterTextOnScroll
        text={"Die erste KI\u2011Marketinglösung\nspeziell für Brauereien."}
        as="h1"
        italicWords={["erste"]}
        fadeWords={["speziell", "für", "Brauereien"]}
        fadeFontFamily="var(--font-playfair)"
        scrollAnchorRef={heroRef}
        shimmer
        className="hero-slide-in hero-slide-in-delay-2 block text-[2rem] font-extrabold leading-[1.25] tracking-tight drop-shadow-md sm:text-4xl md:text-[2.75rem] lg:text-5xl xl:text-[3.25rem]"
      />
    )},
    { fade: getFade(2), el: (
      <p className="hero-slide-in hero-slide-in-delay-3 mt-3 max-w-3xl text-base leading-relaxed text-white/95 sm:text-lg">
        Nutze moderne KI, um deine Brauerei digital sichtbar zu machen.
        <br />
        Mehr Reichweite, mehr Aufmerksamkeit für deine Marke und mehr Umsatz – ohne klassische Marketingagentur.
      </p>
    )},
    { fade: getFade(3), el: (
      <p className="hero-slide-in hero-slide-in-delay-4 mt-1.5 max-w-3xl text-[15px] leading-relaxed text-white/80 sm:text-base">
        Ich helfe Brauereien, Gastronomen und Getränkeherstellern dabei, KI-gestützte
        Content-Systeme, Werbevideos und automatisiertes Marketing aufzubauen.
      </p>
    )},
    { fade: getFade(4), el: (
      <div className="hero-slide-in hero-slide-in-delay-5 mt-4 flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-3 pointer-events-auto">
        <AppleStyleButton href="#contact">
          Kostenlose KI-Strategie für Brauereien sichern
        </AppleStyleButton>
        <div className="flex flex-wrap gap-2">
          {[
            {
              label: "KI-Produktfotos",
              icon: (
                <svg className="h-3.5 w-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                  <circle cx="8.5" cy="8.5" r="1.5" />
                  <polyline points="21 15 16 10 5 21" />
                </svg>
              ),
            },
            {
              label: "Werbevideos",
              icon: (
                <svg className="h-3.5 w-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="23 7 16 12 23 17 23 7" />
                  <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
                </svg>
              ),
            },
            {
              label: "Social Media",
              icon: (
                <svg className="h-3.5 w-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="20" x2="18" y2="10" />
                  <line x1="12" y1="20" x2="12" y2="4" />
                  <line x1="6" y1="20" x2="6" y2="14" />
                </svg>
              ),
            },
            {
              label: "Automatisiert",
              icon: (
                <svg className="h-3.5 w-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                </svg>
              ),
            },
          ].map(({ label, icon }) => (
            <span
              key={label}
              className="hero-highlight-pill inline-flex items-center gap-1.5 rounded-full border border-white/25 bg-white/10 px-3 py-1.5 text-xs font-medium text-white/95 backdrop-blur-sm transition-colors hover:border-emerald-400/40 hover:bg-white/15"
            >
              <span className="text-emerald-300/90" aria-hidden>
                {icon}
              </span>
              {label}
            </span>
          ))}
        </div>
      </div>
    )},
    { fade: getFade(5), el: (
      <p className="hero-slide-in hero-slide-in-delay-6 mt-4 text-sm text-white/70">
        Speziell für Brauereien, Getränkehersteller & Gastronomie – individuell auf deine
        Branche zugeschnitten.
      </p>
    )},
    {
      fade: getFade(6),
      el: (
        <div className="hero-portrait-slide-up flex shrink-0 items-center justify-center" style={{ marginBottom: "-16px" }}>
          <div
            className="hero-portrait-float relative h-[260px] w-[180px] origin-bottom sm:h-[380px] sm:w-[260px] md:h-[450px] md:w-[300px] lg:h-[800px] lg:w-[640px]"
            style={{
              transform: `scale(${1 + portraitZoomProgress * 0.35})`,
              transition: "transform 0.033s cubic-bezier(0.33, 1, 0.68, 1)",
            }}
          >
            <Image
              src="/hero-portrait.svg"
              alt="EvGlabs"
              width={640}
              height={800}
              priority
              className="hero-portrait-blend h-full w-full object-contain object-bottom"
            />
          </div>
        </div>
      ),
    },
  ];

  const anyVisible = fade > 0.02;

  return (
    <section
      ref={heroRef}
      className="pointer-events-none fixed inset-0 top-0 z-20 flex min-h-screen flex-col items-center justify-center px-4 pb-8 pt-40 sm:px-6 sm:pb-12 sm:pt-32 md:pt-28"
      style={{ pointerEvents: anyVisible ? "auto" : "none" }}
    >
      <div
        className="mx-auto flex w-full max-w-6xl flex-1 flex-col items-start justify-center gap-6 px-2 sm:gap-8 sm:px-4 lg:flex-row lg:items-end lg:justify-center lg:gap-12"
        style={{ transform: "translateY(-4vh)" }}
      >
        {/* Portrait: auf Mobile zuerst, auf Desktop rechts */}
        <div
          className="order-first flex w-full justify-center lg:order-last lg:w-auto"
          style={{
            opacity: heroItems[6].fade,
            transform: `translateY(${(1 - heroItems[6].fade) * -40}px)`,
          }}
        >
          {heroItems[6].el}
        </div>
        <div className="order-last w-full max-w-4xl text-left lg:order-first">
          {heroItems.slice(0, 6).map(({ fade: itemFade, el }, i) => (
            <div
              key={i}
              style={{
                opacity: itemFade,
                transform: `translateY(${(1 - itemFade) * -40}px)`,
              }}
            >
              {el}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
