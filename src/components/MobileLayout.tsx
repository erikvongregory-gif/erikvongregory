"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useLoading } from "@/context/LoadingContext";
import { AppleStyleButton } from "./AppleStyleButton";
import { ProblemItem } from "./ProblemItem";
import { Section3TextReveal } from "./Section3TextReveal";
import { ScrollReveal } from "./ScrollReveal";
import { LiquidBackground } from "./LiquidBackground";

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

const EXPERTISE_ITEMS = [
  "wie Bier verkauft wird",
  "wie Brauereien Marketing betreiben",
  "wie man Bier digital inszeniert",
];

export function MobileLayout() {
  const { heroReady } = useLoading();
  const section2Ref = useRef<HTMLElement>(null);
  const [problemResetTrigger, setProblemResetTrigger] = useState(0);
  const wasVisibleRef = useRef(false);

  useEffect(() => {
    const el = section2Ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        const visible = e.intersectionRatio > 0.15;
        if (visible) {
          wasVisibleRef.current = true;
        }
      },
      { threshold: [0, 0.1, 0.15, 0.2] }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <>
      <LiquidBackground />
      <div className="relative z-10 flex flex-col">
        {/* Hero – gestaffelte Slide-Ins nach LoadingScreen */}
        <section
          className={`mobile-hero-synced relative flex min-h-screen flex-col items-center justify-start px-4 pb-12 pt-2 text-center ${heroReady ? "hero-ready" : ""}`}
        >
          <div className="mb-3 flex shrink-0 justify-center -mt-2">
            <Image
              src="/hero-portrait.svg"
              alt="EvGlab"
              width={219}
              height={320}
              priority
              className="mobile-hero-portrait-reveal hero-portrait-blend h-[320px] w-[219px] object-contain object-top"
              style={{ opacity: heroReady ? undefined : 0 }}
            />
          </div>
          <h1 className="mobile-slide-up-in -mt-2 mb-8 block leading-none tracking-tight" style={{ fontFamily: "'Montserrat', sans-serif" }}>
            <div className="mobile-hero-line1 block text-[1.35rem] font-extrabold leading-snug sm:text-xl">
              {"Die erste KI‑Marketinglösung".split("").map((char, i) => (
                <span
                  key={i}
                  className="mobile-word-blur-in mobile-word-blur-in-hero-line1 inline-block"
                  style={{
                    background:
                      "linear-gradient(90deg, #ffffff 0%, #ffffff 32%, #ffe8d0 50%, #ffffff 68%, #ffffff 100%)",
                    backgroundSize: "200% 100%",
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    color: "transparent",
                    WebkitTextFillColor: "transparent",
                    ["--char-delay" as string]: `${i * 0.02}s`,
                    whiteSpace: "pre",
                  }}
                >
                  {char}
                </span>
              ))}
            </div>
            <div className="block -mt-2 text-[2rem] font-light italic sm:text-[2.15rem]" style={{ fontFamily: "var(--font-playfair)" }}>
              {(() => {
                const len = "speziell für Brauereien".length;
                const lerp = (c1: string, c2: string, t: number) => {
                  const [r1, g1, b1] = [parseInt(c1.slice(1, 3), 16), parseInt(c1.slice(3, 5), 16), parseInt(c1.slice(5, 7), 16)];
                  const [r2, g2, b2] = [parseInt(c2.slice(1, 3), 16), parseInt(c2.slice(3, 5), 16), parseInt(c2.slice(5, 7), 16)];
                  const r = Math.round(r1 + (r2 - r1) * t);
                  const g = Math.round(g1 + (g2 - g1) * t);
                  const b = Math.round(b1 + (b2 - b1) * t);
                  return `rgb(${r},${g},${b})`;
                };
                return "speziell für Brauereien".split("").map((char, i) => {
                  const t = i / (len - 1 || 1);
                  const color = lerp("#ffc090", "#d46830", t);
                  return (
                    <span
                      key={i}
                      className="mobile-word-blur-in inline-block"
                      style={{
                        color,
                        ["--char-delay" as string]: `${("Die erste KI‑Marketinglösung".length * 0.02) + i * 0.02}s`,
                        whiteSpace: "pre",
                      }}
                    >
                      {char}
                    </span>
                  );
                });
              })()}
            </div>
          </h1>
          <p className="mobile-slide-up-in mobile-slide-up-in-0 mb-0 text-xl font-light italic text-white/90" style={{ fontFamily: "'Montserrat', sans-serif" }}>
            KI für Brauereien & Gastronomie
          </p>
          <p className="mobile-slide-up-in mobile-slide-up-in-1 mx-auto max-w-lg text-base leading-relaxed text-white/90">
            <span className="font-semibold text-white">Mehr Reichweite, mehr Aufmerksamkeit</span> – nutze moderne KI, um deine Brauerei digital sichtbar zu machen. Ohne klassische Marketingagentur.
          </p>
          <p className="mobile-slide-up-in mobile-slide-up-in-2 mx-auto mt-2 max-w-lg text-[15px] leading-relaxed text-white/80">
            Content-Systeme, Werbevideos & automatisiertes Marketing – speziell für Brauereien, Gastronomen und Getränkehersteller.
          </p>
          <div className="mobile-slide-up-from-bottom mt-6 flex flex-col items-center gap-3">
            <AppleStyleButton href="#contact" className="mobile-cta-animate">
              <span className="inline-flex items-center gap-2">
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
                </svg>
                Kostenloses Erstgespräch sichern
              </span>
            </AppleStyleButton>
          </div>
        </section>

        {/* Section 2 */}
        <section id="section-2" ref={section2Ref} className="relative px-4 py-16">
          <ScrollReveal>
            <div className="section2-card mx-auto max-w-2xl rounded-2xl px-6 py-8 text-center">
            <h2 className="text-2xl font-bold tracking-tight text-white drop-shadow-md">
              Warum viele Brauereien{" "}
              <span className="font-light italic font-austera-green-fade">
                online unsichtbar
              </span>{" "}
              bleiben
            </h2>
            <p className="mt-5 text-base leading-relaxed text-white/90">
              Viele Brauereien haben ein großartiges Produkt – aber online findet sie kaum jemand. Während der deutsche Biermarkt{" "}
              <span className="font-semibold text-white">um 6 % einbricht</span>, gewinnen sichtbare Marken täglich neue Kunden.
            </p>
            <div className="mx-auto mt-5 flex w-full max-w-sm flex-col gap-2">
              {[
                { problem: "Social Media wird selten gepflegt", solution: "Mit KI: Regelmäßiger Content – automatisiert & ohne teure Agentur" },
                { problem: "Werbung kostet viel und bringt wenig", solution: "Mit KI: Produktfotos & Werbevideos in Minuten statt Tagen" },
                { problem: "Content zu erstellen kostet Zeit", solution: "Mit KI: Content-Systeme, die für dich arbeiten" },
                { problem: "Websites sind veraltet", solution: "Mit KI: Moderne Websites mit starkem Storytelling" },
              ].map(({ problem, solution }, i) => (
                <ProblemItem key={problem} text={problem} solution={solution} index={i} showIcon resetTrigger={problemResetTrigger} />
              ))}
            </div>
            <p className="text-box-shine mt-5 rounded-xl border border-orange-400/30 bg-orange-500/10 px-4 py-3 text-base text-white/95">
              <span className="font-bold italic">
                Währenddessen gewinnen moderne Marken täglich neue Kunden über TikTok, Instagram und Google.
              </span>
            </p>
          </div>
          </ScrollReveal>
        </section>

        {/* Section 3 */}
        <section id="section-3" className="relative px-4 py-16">
          <div className="section3-card mx-auto max-w-2xl rounded-2xl px-6 py-10 text-center">
            <Section3TextReveal
              eyebrow={
                <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-orange-400/90">
                  Dein nächster Schritt
                </p>
              }
              body={
                <>
                  <h2 className="text-3xl font-extrabold tracking-tight text-white drop-shadow-md">
                    Bist du{" "}
                    <a
                      href="#contact"
                      className="section3-cta-link pointer-events-auto relative inline-block transition-all duration-300 hover:scale-105"
                    >
                      <span className="font-austera-green-fade section3-bereit-glow relative z-10">
                        bereit
                      </span>
                    </a>
                    ?
                  </h2>
                  <p className="mt-4 text-base text-white/70">
                    Sprich mit mir über deine Brauerei – unverbindlich & direkt. In 15 Minuten weißt du, wie KI dein
                    Marketing transformiert.
                  </p>
                  <div className="mt-8 flex flex-col items-center justify-center gap-3">
                    <AppleStyleButton
                      href="#contact"
                      className="cta-orange px-8 py-3 text-base shadow-lg shadow-orange-900/20 hover:shadow-orange-900/30"
                    >
                      Kostenloses Erstgespräch sichern
                    </AppleStyleButton>
                    <p className="text-sm text-white/55 flex items-center gap-1.5">
                      <span aria-hidden>✓</span> Kein Pitch, keine Verkaufsmasche
                    </p>
                  </div>
                </>
              }
            />
          </div>
        </section>

        {/* Section 4 */}
        <section id="section-4" className="relative px-4 py-16">
          <ScrollReveal>
          <div className="mb-6 inline-flex w-full justify-center">
            <span className="section4-badge-pulse inline-flex items-center gap-2 rounded-full border border-orange-400/30 bg-orange-400/10 px-4 py-1.5 text-sm font-medium text-orange-300">
              <span aria-hidden>✦</span>
              Meine Angebote
            </span>
          </div>
          <h2 className="mb-6 text-center text-xl font-bold tracking-tight text-white drop-shadow-md">
            Meine 5{" "}
            <span className="font-light italic font-austera-green-fade">
              Lösungen
            </span>
          </h2>
          <div className="mx-auto max-w-2xl space-y-4">
            {SECTION4_ITEMS.map((item, i) => (
              <div
                key={item.title}
                className="section4-mobile-card group flex items-start gap-5 rounded-xl border border-white/15 bg-white/5 px-5 py-5 transition-all duration-300 active:scale-[0.98]"
              >
                <span
                  className={`section4-icon-wrap flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-orange-500/15 text-orange-400 ring-1 ring-orange-400/20 transition-colors group-active:bg-orange-500/25 section4-icon-${item.icon}`}
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
                  <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                  <p className="mt-2 text-base leading-relaxed text-white/80">{item.text}</p>
                </div>
              </div>
            ))}
          </div>
          </ScrollReveal>
        </section>

        {/* Section 6 */}
        <section id="section-6" className="relative px-4 py-16">
          <ScrollReveal>
            <div className="section2-card mx-auto max-w-2xl rounded-2xl px-6 py-8 text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-orange-400/30 bg-orange-400/10 px-4 py-1.5 text-sm font-medium text-orange-300">
              <span aria-hidden>✦</span>
              Aus der Praxis
            </div>
            <h2 className="mb-4 text-2xl font-bold tracking-tight text-white drop-shadow-md">
              Von der Brauerei –{" "}
              <span className="font-light italic font-austera-green-fade">
                für die Brauerei
              </span>
            </h2>
            <p className="mb-8 text-base leading-relaxed text-white/90">
              Ich arbeite selbst in einer Brauerei und kenne die Branche aus erster Hand.
            </p>
            <div className="mb-8 space-y-4">
              {EXPERTISE_ITEMS.map((text) => (
                <div
                  key={text}
                  className="section6-expertise-item flex items-center justify-center gap-3 rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-center"
                >
                  <span className="text-base font-medium text-white/95">{text}</span>
                </div>
              ))}
            </div>
            <p className="mb-6 text-center text-base font-medium text-white/95">
              Brauereiwissen + moderne KI = Marketing, das funktioniert.
            </p>
            <div className="flex justify-center">
              <AppleStyleButton href="#contact" className="mobile-cta-animate">Kostenloses Erstgespräch starten</AppleStyleButton>
            </div>
          </div>
          </ScrollReveal>
        </section>
      </div>
    </>
  );
}
