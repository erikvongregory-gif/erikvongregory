"use client";

import { useEffect, useState } from "react";
import { useLoading } from "@/context/LoadingContext";
import { Hero } from "@/components/ui/animated-hero";
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
    title: "KI-Bildkampagnen für Social Media",
    text: "Starke Bildkampagnen für Bier, Brauereien und Getränke – produziert mit KI.",
    icon: "camera",
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
    title: "KI-Content für Instagram & Ads",
    text: "Regelmäßiger Bild-Content speziell für Brauereien und Getränkemarken.",
    icon: "sparkle",
  },
];

export function MobileLayout() {
  const { heroReady } = useLoading();
  const [openSolutionIndex, setOpenSolutionIndex] = useState<number>(0);
  const [showSection4Shader, setShowSection4Shader] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    if ("requestIdleCallback" in window) {
      const idleId = (window as Window & { requestIdleCallback: (cb: IdleRequestCallback) => number }).requestIdleCallback(
        () => setShowSection4Shader(true),
      );
      return () => {
        (window as Window & { cancelIdleCallback?: (id: number) => void }).cancelIdleCallback?.(idleId);
      };
    }

    const timeoutId = globalThis.setTimeout(() => setShowSection4Shader(true), 900);
    return () => globalThis.clearTimeout(timeoutId);
  }, []);

  const renderSection4Icon = (icon: string) => {
    if (icon === "camera") {
      return (
        <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
          <circle cx="12" cy="13" r="4" />
        </svg>
      );
    }
    if (icon === "chart") {
      return (
        <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="18" y1="20" x2="18" y2="10" />
          <line x1="12" y1="20" x2="12" y2="4" />
          <line x1="6" y1="20" x2="6" y2="14" />
        </svg>
      );
    }
    if (icon === "globe") {
      return (
        <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <line x1="2" y1="12" x2="22" y2="12" />
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </svg>
      );
    }
    return (
      <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
      </svg>
    );
  };

  return (
    <>
      <div className="relative z-10 flex flex-col">
        {/* Hero: exakt wie Desktop */}
        <div
          className={`section1-wrapper relative mx-auto w-full max-w-screen-2xl ${heroReady ? "section1-ready" : ""}`}
        >
          <div className="min-w-0">
            <Hero />
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
          <div className="section4-loop-stack-root section4-mobile-ring-unclipped relative isolate z-0 mx-auto max-w-2xl">
            {showSection4Shader ? (
              <div
                className="section4-loop-shader-backdrop pointer-events-none absolute left-1/2 top-12 h-[560px] w-[132%] -translate-x-1/2 -z-10 overflow-visible sm:top-14 sm:h-[620px]"
                aria-hidden
              >
                <ShaderCanvas
                  mode="contained"
                  shape="ring"
                  backgroundRgb={CONTAINED_SHADER_BG.mobileDark}
                />
              </div>
            ) : null}
            <div className="section4-loop-content-stack relative z-20 transform-gpu">
          <ScrollReveal>
          <div className="mb-6 inline-flex w-full justify-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-[rgba(224,122,64,0.35)] bg-[rgba(224,122,64,0.14)] px-4 py-1.5 text-sm font-medium text-[#c65a20]">
              <span aria-hidden>✦</span>
              Meine Angebote
            </span>
          </div>
          <h2 className="mb-6 text-center text-2xl font-bold tracking-tight text-zinc-900 drop-shadow-sm sm:text-3xl">
            Meine 5{" "}
            <span
              className="font-light italic text-[#c65a20]"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Lösungen
            </span>
          </h2>
          <div className="mx-auto max-w-2xl space-y-3">
            {SECTION4_ITEMS.map((item, i) => (
              <ScrollReveal key={item.title} delay={i * 90}>
                <div className="section4-mobile-card group rounded-2xl px-4 py-3 transition-all duration-300">
                  <button
                    type="button"
                    onClick={() => setOpenSolutionIndex((prev) => (prev === i ? -1 : i))}
                    aria-expanded={openSolutionIndex === i}
                    className="flex w-full items-center gap-4 rounded-xl px-1 py-1 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400/70 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
                  >
                    <span
                      className={`section4-icon-wrap flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-zinc-600 transition-colors section4-icon-${item.icon}`}
                      aria-hidden
                    >
                      {renderSection4Icon(item.icon)}
                    </span>
                    <div className="min-w-0 flex-1">
                      <h3 className="text-base font-semibold leading-tight text-zinc-900">{item.title}</h3>
                    </div>
                    <span
                      className={`text-[#c65a20] transition-transform duration-300 ${openSolutionIndex === i ? "rotate-180" : ""}`}
                      aria-hidden
                    >
                      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="m6 9 6 6 6-6" />
                      </svg>
                    </span>
                  </button>
                  <div
                    className={`grid transition-all duration-300 ease-out ${openSolutionIndex === i ? "grid-rows-[1fr] pt-2" : "grid-rows-[0fr] pt-0"}`}
                  >
                    <div className="overflow-hidden">
                      <p className="pl-[3.6rem] pr-1 text-sm leading-relaxed text-zinc-600">
                        {item.text}
                      </p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
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
