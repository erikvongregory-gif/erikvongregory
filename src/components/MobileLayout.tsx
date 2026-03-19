"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useLoading } from "@/context/LoadingContext";
import { AppleStyleButton } from "./AppleStyleButton";
import { ProblemItem } from "./ProblemItem";
import { ScrollReveal } from "./ScrollReveal";

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
  const { isLoadComplete } = useLoading();
  const section2Ref = useRef<HTMLElement>(null);
  const [problemResetTrigger, setProblemResetTrigger] = useState(0);
  const wasVisibleRef = useRef(false);

  useEffect(() => {
    const el = section2Ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        const visible = e.intersectionRatio > 0.15;
        if (wasVisibleRef.current && !visible) {
          wasVisibleRef.current = false;
          setProblemResetTrigger((t) => t + 1);
        } else if (visible) {
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
      <div
        className="fixed inset-0 -z-10"
        style={{
          background: "linear-gradient(165deg, #0a0f14 0%, #0f172a 35%, #0c1222 70%, #05100d 100%)",
        }}
      />
      <div className="relative flex flex-col">
        {/* Hero – gestaffelte Slide-Ins nach LoadingScreen */}
        <section
          className={`mobile-hero-synced relative flex min-h-screen flex-col items-center justify-start px-4 pb-12 pt-2 text-center ${isLoadComplete ? "hero-ready" : ""}`}
        >
          <div className="mb-3 flex shrink-0 justify-center -mt-2">
            <Image
              src="/hero-portrait.svg"
              alt="Erik von Gregory"
              width={219}
              height={320}
              priority
              className="mobile-hero-portrait-reveal hero-portrait-blend h-[320px] w-[219px] object-contain object-top"
            />
          </div>
          <h1 className="-mt-2 mb-8 block leading-none tracking-tight">
            <div className="block text-xl font-extrabold">
              {"die erste KI‑Marketinglösung".split("").map((char, i) => (
                <span
                  key={i}
                  className="mobile-word-blur-in inline-block"
                  style={{
                    background: "linear-gradient(90deg, #ffffff 0%, #ffffff 25%, #a7f3d0 50%, #ffffff 75%, #ffffff 100%)",
                    backgroundSize: "200% 100%",
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    color: "transparent",
                    ["--char-delay" as string]: `${i * 0.02}s`,
                    whiteSpace: "pre",
                  }}
                >
                  {char}
                </span>
              ))}
            </div>
            <div className="block -mt-2 text-4xl font-light italic">
              {"speziell für Brauereien".split("").map((char, i) => (
                <span
                  key={i}
                  className="mobile-word-blur-in inline-block"
                  style={{
                    fontFamily: "var(--font-austera)",
                    background: "linear-gradient(90deg, #ffffff 0%, #a7f3d0 50%, #ffffff 100%)",
                    backgroundSize: "200% 100%",
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    color: "transparent",
                    ["--char-delay" as string]: `${("die erste KI‑Marketinglösung".length * 0.02) + i * 0.02}s`,
                    whiteSpace: "pre",
                  }}
                >
                  {char}
                </span>
              ))}
            </div>
          </h1>
          <p className="mobile-slide-up-in mobile-slide-up-in-0 mb-0 text-xl font-light italic text-white/95" style={{ fontFamily: "var(--font-austera)" }}>
            KI für Brauereien & Gastronomie
          </p>
          <p className="mobile-slide-up-in mobile-slide-up-in-1 mx-auto max-w-lg text-base leading-relaxed text-white/95">
            <span className="font-semibold text-white">Mehr Reichweite, mehr Aufmerksamkeit</span> – nutze moderne KI, um deine Brauerei digital sichtbar zu machen. Ohne klassische Marketingagentur.
          </p>
          <p className="mobile-slide-up-in mobile-slide-up-in-2 mx-auto mt-2 max-w-lg text-[15px] leading-relaxed text-white/85">
            Content-Systeme, Werbevideos & automatisiertes Marketing – speziell für Brauereien, Gastronomen und Getränkehersteller.
          </p>
          <div className="mobile-slide-up-in mobile-slide-up-in-3 mt-6 flex flex-col items-center gap-3">
            <AppleStyleButton href="#contact" className="mobile-cta-animate">
              Kostenlose KI-Strategie für Brauereien sichern
            </AppleStyleButton>
          </div>
        </section>

        {/* Section 2 */}
        <section ref={section2Ref} className="relative px-4 py-16">
          <ScrollReveal>
            <div className="section2-card mx-auto max-w-2xl rounded-2xl px-6 py-8 text-center">
            <h2 className="text-2xl font-bold tracking-tight text-white drop-shadow-md">
              Warum viele Brauereien{" "}
              <span
                className="font-light italic"
                style={{
                  fontFamily: "var(--font-austera)",
                  textShadow: "0 0 20px rgba(34, 197, 94, 0.5)",
                }}
              >
                online unsichtbar
              </span>{" "}
              bleiben
            </h2>
            <p className="mt-5 text-base leading-relaxed text-white/90">
              Viele Brauereien haben ein großartiges Produkt – aber online findet sie kaum jemand.
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
            <p className="text-box-shine mt-5 rounded-xl border border-emerald-500/25 bg-emerald-500/10 px-4 py-3 text-base text-white/95">
              <span className="font-bold italic">
                Währenddessen gewinnen moderne Marken täglich neue Kunden über TikTok, Instagram und Google.
              </span>
            </p>
          </div>
          </ScrollReveal>
        </section>

        {/* Section 3 */}
        <section className="relative px-4 py-16">
          <ScrollReveal>
          <div className="section3-card mx-auto max-w-2xl rounded-2xl px-6 py-10 text-center">
            <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-emerald-400/90">
              Dein nächster Schritt
            </p>
            <h2 className="text-3xl font-extrabold tracking-tight text-white drop-shadow-md">
              Bist du{" "}
              <a href="#contact" className="section3-cta-link">
                <span
                  style={{
                    fontFamily: "var(--font-austera)",
                    fontStyle: "italic",
                    fontWeight: 300,
                  }}
                >
                  bereit
                </span>
              </a>
              ?
            </h2>
            <p className="mt-4 text-base text-white/70">
              Sprich mit mir über deine Brauerei – unverbindlich & direkt.
            </p>
          </div>
          </ScrollReveal>
        </section>

        {/* Section 4 */}
        <section className="relative px-4 py-16">
          <ScrollReveal>
          <div className="mb-6 inline-flex w-full justify-center">
            <span className="section4-badge-pulse inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-4 py-1.5 text-sm font-medium text-emerald-300">
              <span aria-hidden>✦</span>
              Meine Angebote
            </span>
          </div>
          <h2 className="mb-6 text-center text-xl font-bold tracking-tight text-white drop-shadow-md">
            Meine 5{" "}
            <span
              className="font-light italic"
              style={{
                fontFamily: "var(--font-austera)",
                textShadow: "0 0 20px rgba(34, 197, 94, 0.5)",
              }}
            >
              Lösungen
            </span>
          </h2>
          <div className="mx-auto max-w-2xl space-y-3">
            {SECTION4_ITEMS.map((item, i) => (
              <div
                key={item.title}
                className="section4-mobile-card group flex items-start gap-4 rounded-xl border border-white/15 bg-white/5 px-4 py-4 transition-all duration-300 active:scale-[0.98]"
              >
                <span
                  className={`section4-icon-wrap flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-500/15 text-emerald-400 ring-1 ring-emerald-400/20 transition-colors group-active:bg-emerald-500/25 section4-icon-${item.icon}`}
                  aria-hidden
                >
                  {item.icon === "camera" && (
                    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                      <circle cx="12" cy="13" r="4" />
                    </svg>
                  )}
                  {item.icon === "video" && (
                    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polygon points="23 7 16 12 23 17 23 7" />
                      <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
                    </svg>
                  )}
                  {item.icon === "chart" && (
                    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="18" y1="20" x2="18" y2="10" />
                      <line x1="12" y1="20" x2="12" y2="4" />
                      <line x1="6" y1="20" x2="6" y2="14" />
                    </svg>
                  )}
                  {item.icon === "globe" && (
                    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10" />
                      <line x1="2" y1="12" x2="22" y2="12" />
                      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                    </svg>
                  )}
                  {item.icon === "sparkle" && (
                    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
                    </svg>
                  )}
                </span>
                <div className="min-w-0 flex-1 text-left">
                  <h3 className="text-base font-semibold text-white">{item.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-white/80">{item.text}</p>
                </div>
                <span className="mt-1 shrink-0 text-emerald-400/60" aria-hidden>
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 18l6-6-6-6" />
                  </svg>
                </span>
              </div>
            ))}
          </div>
          </ScrollReveal>
        </section>

        {/* Section 6 */}
        <section className="relative px-4 py-16">
          <ScrollReveal>
            <div className="section2-card mx-auto max-w-2xl rounded-2xl px-6 py-8 text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-4 py-1.5 text-sm font-medium text-emerald-300">
              <span aria-hidden>✦</span>
              Aus der Praxis
            </div>
            <h2 className="mb-4 text-2xl font-bold tracking-tight text-white drop-shadow-md">
              Von der Brauerei –{" "}
              <span
                className="font-light italic"
                style={{
                  fontFamily: "var(--font-austera)",
                  textShadow: "0 0 20px rgba(34, 197, 94, 0.5)",
                }}
              >
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
