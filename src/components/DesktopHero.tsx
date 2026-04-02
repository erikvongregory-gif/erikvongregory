"use client";

import Link from "next/link";
import { DesktopHeroRotatingIndustryWord } from "@/components/DesktopHeroRotatingIndustryWord";
import { WaveTextHover } from "@/components/ui/wave-text-hover";

/** Hero Section 1 – Text links, Portrait+Glow kommt aus StickyPortraitWithGlow im Layout */
export function DesktopHero() {
  return (
    <section className="relative z-20 flex min-h-[600px] h-screen max-h-[960px] flex-col items-center justify-center px-4 pb-8 pt-16 sm:px-6 sm:pb-12 sm:pt-16 lg:items-start lg:justify-center">
      {/* Text links */}
      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-1 flex-col items-start justify-center gap-6 px-2 sm:gap-8 sm:px-4 lg:ml-8 lg:mr-auto">
        <div className="w-full max-w-2xl text-left">
          {/* Headline: Wie Referenz – bold Sans + light Serif italic */}
          <h1 className="section1-fade section1-fade-0 block leading-tight tracking-tight" style={{ fontFamily: "'Montserrat', sans-serif" }}>
            <span className="block whitespace-nowrap text-3xl font-semibold text-neutral-900 sm:text-4xl md:text-5xl lg:text-[3rem] xl:text-[3.5rem]">
              <WaveTextHover
                text={"Die erste KI‑Marketinglösung"}
                className="whitespace-nowrap"
              />
            </span>
            <span className="mt-2 flex flex-nowrap items-baseline gap-x-3 text-4xl sm:text-5xl md:gap-x-5 md:text-6xl lg:gap-x-6 lg:text-[3.5rem] xl:text-[4rem]">
              <span className="shrink-0 font-medium text-neutral-900">speziell für</span>
              <DesktopHeroRotatingIndustryWord
                className="text-4xl sm:text-5xl md:text-[2.35rem] lg:text-[2.5rem] xl:text-[2.8rem] 2xl:text-[3.05rem]"
                style={{ fontFamily: "'Playfair Display', serif" }}
              />
            </span>
          </h1>

          {/* Absätze wie im Beispiel – mehrere Blöcke mit Abstand */}
          <div className="section1-fade section1-fade-1 mt-8 max-w-xl space-y-5" style={{ fontFamily: "'Montserrat', sans-serif" }}>
            <p className="text-base leading-[1.7] text-neutral-600 sm:text-lg lg:text-xl">
              Nutze moderne KI, um deine Brauerei digital sichtbar zu machen.
            </p>
            <p className="text-base leading-[1.7] text-neutral-600 sm:text-lg lg:text-xl">
              Mehr Reichweite, mehr Aufmerksamkeit für deine Marke und mehr Umsatz – ohne klassische Marketingagentur.
            </p>
          </div>

          {/* CTAs: Schwarzer Primary-Button + Secondary mit Play */}
          <div className="section1-fade section1-fade-2 mt-8 flex flex-wrap items-center gap-4">
            <a
              href="#contact"
              className="inline-flex items-center justify-center rounded-full bg-neutral-900 px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-neutral-900/20 transition-all hover:bg-neutral-800 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              <span className="inline-flex items-center gap-2">
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
                </svg>
                Kostenloses Erstgespräch sichern
              </span>
            </a>
            <Link
              href="#echte-beispiele-aus-der-praxis"
              className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium text-neutral-900 transition-opacity hover:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2"
              style={{ fontFamily: "'Montserrat', sans-serif", borderColor: "rgb(255, 200, 160)" }}
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-neutral-100">
                <svg className="ml-0.5 h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M8 5v14l11-7z" />
                </svg>
              </span>
              So funktioniert&apos;s
            </Link>
          </div>

          {/* Trust-Bar: KI-Produktfotos, Werbevideos, Social Media, Automatisiert mit Icons */}
          <div className="section1-fade section1-fade-3 hero-trust-pills mt-12 flex flex-wrap items-center gap-3">
            {[
              {
                label: "KI-Produktfotos",
                icon: (
                  <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="3" width="18" height="18" rx="2" />
                    <circle cx="8.5" cy="8.5" r="1.5" />
                  </svg>
                ),
              },
              {
                label: "Werbevideos",
                icon: (
                  <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="23 7 16 12 23 17 23 7" />
                    <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
                  </svg>
                ),
              },
              {
                label: "Social Media",
                icon: (
                  <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                  </svg>
                ),
              },
              {
                label: "Automatisiert",
                icon: (
                  <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                    <path d="M3 3v5h5" />
                    <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" />
                    <path d="M16 21h5v-5" />
                  </svg>
                ),
              },
            ].map((item, i) => (
              <span
                key={item.label}
                className={`hero-trust-pill hero-trust-pill-${i + 1} inline-flex items-center gap-2 rounded-full border border-neutral-300 bg-neutral-100/80 px-4 py-2 text-sm font-medium text-neutral-700 transition-colors hover:border-orange-300 hover:bg-orange-50/80`}
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                <span className="hero-trust-pill-icon text-neutral-600">{item.icon}</span>
                {item.label}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
