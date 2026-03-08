"use client";

import Image from "next/image";
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
              className="mobile-hero-portrait-reveal hero-portrait-blend h-[320px] w-[219px] object-contain object-top"
            />
          </div>
          <p className="mobile-slide-in mobile-slide-in-1 mb-3 text-sm font-medium uppercase tracking-widest text-emerald-300/95">
            KI für Brauereien & Gastronomie
          </p>
          <h1 className="mobile-slide-in mobile-slide-in-2 mb-3 block text-2xl font-extrabold leading-tight tracking-tight text-white" style={{ textShadow: "0 2px 20px rgba(0,0,0,0.3), 0 0 40px rgba(34, 197, 94, 0.15)" }}>
            KI für Brauereien –{" "}
            <span
              className="font-light italic text-emerald-200"
              style={{ fontFamily: "var(--font-austera)", textShadow: "0 0 24px rgba(34, 197, 94, 0.5), 0 0 48px rgba(34, 197, 94, 0.2)" }}
            >
              Automatisierte
            </span>{" "}
            Marketing, Content & Verkauf
          </h1>
          <p className="mobile-slide-in mobile-slide-in-3 mx-auto max-w-lg text-base leading-relaxed text-white/95">
            <span className="font-semibold text-white">Mehr Reichweite, mehr Aufmerksamkeit</span> – nutze moderne KI, um deine Brauerei digital sichtbar zu machen. Ohne klassische Marketingagentur.
          </p>
          <p className="mobile-slide-in mobile-slide-in-4 mx-auto mt-2 max-w-lg text-[15px] leading-relaxed text-white/85">
            Content-Systeme, Werbevideos & automatisiertes Marketing – speziell für Brauereien, Gastronomen und Getränkehersteller.
          </p>
          <div className="mobile-slide-in mobile-slide-in-5 mt-6 flex flex-col items-center gap-3">
            <AppleStyleButton href="#contact" className="mobile-cta-animate">
              Kostenlose KI-Strategie für Brauereien sichern
            </AppleStyleButton>
          </div>
        </section>

        {/* Section 2 */}
        <section className="relative px-4 py-16">
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
                "Social Media wird selten gepflegt",
                "Werbung kostet viel und bringt wenig",
                "Content zu erstellen kostet Zeit",
                "Websites sind veraltet",
              ].map((text, i) => (
                <ProblemItem key={text} text={text} index={i} showIcon />
              ))}
            </div>
            <p className="mt-5 rounded-xl border border-emerald-500/25 bg-emerald-500/10 px-4 py-3 text-base text-white/95">
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
          <div className="mx-auto max-w-2xl space-y-4">
            {SECTION4_ITEMS.map((item) => (
              <div
                key={item.title}
                className="section2-card rounded-xl border border-white/15 bg-white/5 px-5 py-4 text-center"
              >
                <h3 className="text-base font-semibold text-white">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/85">{item.text}</p>
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
