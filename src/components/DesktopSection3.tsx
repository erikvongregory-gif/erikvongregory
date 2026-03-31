"use client";

import { AppleStyleButton } from "./AppleStyleButton";
import { Section3TextReveal } from "./Section3TextReveal";

/** Statische Section 3 – Bist du bereit? */
export function DesktopSection3() {
  return (
    <section id="section-3" className="section3-desktop relative z-20 flex w-full min-h-screen items-center justify-center py-12 sm:py-16 md:py-24">
      <div className="section3-card section3-card-desktop mx-auto max-w-3xl px-4 text-center antialiased lg:px-8 lg:py-12">
        <Section3TextReveal
          eyebrow={
            <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-orange-500">
              Dein nächster Schritt
            </p>
          }
          body={
            <>
              <h2 className="text-3xl font-extrabold tracking-tight text-neutral-900 drop-shadow-sm sm:text-5xl md:text-6xl">
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
              <p className="mt-5 text-base text-neutral-600 sm:text-lg max-w-xl mx-auto">
                Sprich mit mir über deine Brauerei – unverbindlich & direkt. In 15 Minuten weißt du, wie KI dein
                Marketing transformiert.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                <AppleStyleButton
                  href="#contact"
                  className="cta-orange px-8 py-3 text-base shadow-lg shadow-orange-900/20 hover:shadow-orange-900/30"
                >
                  Kostenloses Erstgespräch sichern
                </AppleStyleButton>
                <p className="text-sm text-neutral-500 flex items-center gap-1.5">
                  <span aria-hidden>✓</span> Kein Pitch, keine Verkaufsmasche
                </p>
              </div>
            </>
          }
        />
      </div>
    </section>
  );
}
