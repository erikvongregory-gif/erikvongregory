"use client";

import { useLoading } from "@/context/LoadingContext";
import { AnimatedHero } from "@/components/ui/animated-hero";
import { HeroDigitalSerenityEffect } from "@/components/HeroDigitalSerenityEffect";
import { ScrollReveal } from "./ScrollReveal";
import { Section2BreweryCards } from "@/components/Section2BreweryCards";
import { CONTAINED_SHADER_BG, ShaderCanvas } from "@/components/ui/animated-glassy-pricing";

const SECTION4_ITEMS = [
  {
    title: "KI-Produktfotos für Bier & Getränke",
    text: "Hochwertige Produktbilder für Flaschen, Dosen und Gläser – erstellt mit moderner KI.",
    icon: "camera",
  },
  {
    title: "KI-Werbevideos für Social Media",
    text: "Cinematische Werbevideos für Bier, Brauereien und Getränke – produziert mit KI.",
    icon: "video",
  },
  {
    title: "Automatisiertes Social Media Marketing",
    text: "Wir entwickeln ein System, das regelmäßig Content für deine Brauerei veröffentlicht.",
    icon: "chart",
  },
  {
    title: "Moderne Websites mit Storytelling",
    text: "Websites, die deine Brauerei perfekt präsentieren und Besucher zu Kunden machen.",
    icon: "globe",
  },
  {
    title: "KI-Content für Instagram, TikTok & Ads",
    text: "Regelmäßiger Content speziell für Brauereien und Getränkemarken.",
    icon: "sparkle",
  },
];

export function MobileLayout() {
  const { heroReady } = useLoading();

  return (
    <>
      <div className="relative z-10 flex flex-col">
        {/* Hero: gleicher Aufbau wie Desktop (Parallax, TextRotate, CTAs), für Mobile skaliert */}
        <div
          className={`section1-wrapper relative mx-auto w-full max-w-screen-2xl ${heroReady ? "section1-ready" : ""}`}
        >
          <HeroDigitalSerenityEffect mode="mobile" />
          <div className="min-w-0">
            <AnimatedHero />
          </div>
        </div>

        {/* Section 2 – Karten wie Desktop */}
        <section
          id="section-2"
          className="insurance-card-theme relative z-30 px-4 pt-10 pb-16 sm:pt-14 md:pt-24"
        >
          <ScrollReveal>
            <Section2BreweryCards layout="stack" />
          </ScrollReveal>
        </section>

        {/* Section 4 */}
        <section id="section-4" className="insurance-card-theme relative z-30 px-4 py-16">
          <div className="relative isolate mx-auto max-w-2xl">
            <div
              className="pointer-events-none absolute -inset-x-2 -inset-y-12 z-0 overflow-hidden rounded-3xl sm:-inset-x-3 sm:-inset-y-14"
              aria-hidden
            >
              <ShaderCanvas
                mode="contained"
                shape="loop"
                backgroundRgb={CONTAINED_SHADER_BG.mobileDark}
              />
            </div>
            <div className="relative z-20 transform-gpu">
          <ScrollReveal>
          <div className="mb-6 inline-flex w-full justify-center">
            <span className="section4-badge-pulse inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-zinc-100 px-4 py-1.5 text-sm font-medium text-zinc-700">
              <span aria-hidden>✦</span>
              Meine Angebote
            </span>
          </div>
          <h2 className="mb-6 text-center text-xl font-bold tracking-tight text-zinc-900 drop-shadow-sm">
            Meine 5{" "}
            <span className="font-light italic font-austera-green-fade">
              Lösungen
            </span>
          </h2>
          <div className="mx-auto max-w-2xl space-y-4">
            {SECTION4_ITEMS.map((item, i) => (
              <div
                key={item.title}
                className="section4-mobile-card group flex items-start gap-5 rounded-2xl px-5 py-5 transition-all duration-300 active:scale-[0.98]"
              >
                <span
                  className={`section4-icon-wrap flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-zinc-600 transition-colors section4-icon-${item.icon}`}
                  aria-hidden
                >
                  {item.icon === "camera" && (
                    <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                      <circle cx="12" cy="13" r="4" />
                    </svg>
                  )}
                  {item.icon === "video" && (
                    <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polygon points="23 7 16 12 23 17 23 7" />
                      <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
                    </svg>
                  )}
                  {item.icon === "chart" && (
                    <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="18" y1="20" x2="18" y2="10" />
                      <line x1="12" y1="20" x2="12" y2="4" />
                      <line x1="6" y1="20" x2="6" y2="14" />
                    </svg>
                  )}
                  {item.icon === "globe" && (
                    <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10" />
                      <line x1="2" y1="12" x2="22" y2="12" />
                      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                    </svg>
                  )}
                  {item.icon === "sparkle" && (
                    <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
                    </svg>
                  )}
                </span>
                <div className="min-w-0 flex-1 text-left">
                  <h3 className="text-lg font-semibold text-zinc-900">{item.title}</h3>
                  <p className="mt-2 text-base leading-relaxed text-zinc-600">{item.text}</p>
                </div>
              </div>
            ))}
          </div>
          </ScrollReveal>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
