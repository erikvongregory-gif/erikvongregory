"use client";

import Image from "next/image";
import { AppleStyleButton } from "./AppleStyleButton";

/** Statischer Desktop-Hero ohne Scroll-Effekte */
export function DesktopHero() {
  return (
    <section className="relative z-20 flex min-h-screen flex-col items-center justify-start px-4 pb-8 pt-16 sm:px-6 sm:pb-12 sm:pt-16">
      <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col items-start justify-center gap-6 px-2 sm:gap-8 sm:px-4 lg:flex-row lg:items-center lg:justify-center lg:gap-12">
        <div className="order-first flex w-full justify-center lg:order-last lg:w-auto">
          <div
            className="hero-portrait-float relative flex shrink-0 items-center justify-center"
            style={{ marginBottom: "-16px" }}
          >
            <div className="relative h-[260px] w-[180px] origin-bottom sm:h-[380px] sm:w-[260px] md:h-[450px] md:w-[300px] lg:h-[800px] lg:w-[640px]">
              <Image
                src="/hero-portrait.svg"
                alt="Erik von Gregory"
                width={640}
                height={800}
                priority
                className="hero-portrait-blend h-full w-full object-contain object-bottom"
              />
            </div>
          </div>
        </div>
        <div className="order-last w-full max-w-4xl text-left lg:order-first">
          <p className="mb-3 text-xl font-light italic text-white/95" style={{ fontFamily: "var(--font-austera)" }}>
            KI für Brauereien & Gastronomie
          </p>
          <h1 className="block leading-tight tracking-tight">
            <span className="block text-xl font-extrabold text-white drop-shadow-md sm:text-2xl md:text-3xl lg:text-4xl">
              die erste KI‑Marketinglösung
            </span>
            <span
              className="block text-4xl font-light italic sm:text-5xl md:text-5xl lg:text-6xl"
              style={{
                fontFamily: "var(--font-austera)",
                background: "linear-gradient(90deg, #ffffff 0%, #a7f3d0 50%, #ffffff 100%)",
                backgroundSize: "200% 100%",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
                filter: "drop-shadow(0 0 10px rgba(34, 197, 94, 0.45))",
              }}
            >
              speziell für Brauereien
            </span>
          </h1>
          <p className="mt-3 max-w-3xl text-base leading-relaxed text-white/95 sm:text-lg">
            Nutze moderne KI, um deine Brauerei digital sichtbar zu machen.
            <br />
            Mehr Reichweite, mehr Aufmerksamkeit für deine Marke und mehr Umsatz – ohne klassische Marketingagentur.
          </p>
          <p className="mt-1.5 max-w-3xl text-[15px] leading-relaxed text-white/80 sm:text-base">
            Ich helfe Brauereien, Gastronomen und Getränkeherstellern dabei, KI-gestützte
            Content-Systeme, Werbevideos und automatisiertes Marketing aufzubauen.
          </p>
          <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center pointer-events-auto">
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
                  <span className="hero-pill-icon-anim text-emerald-300/90" aria-hidden>
                    {icon}
                  </span>
                  {label}
                </span>
              ))}
            </div>
          </div>
          <p className="mt-4 text-sm text-white/70">
            Speziell für Brauereien, Getränkehersteller & Gastronomie – individuell auf deine
            Branche zugeschnitten.
          </p>
        </div>
      </div>
    </section>
  );
}
