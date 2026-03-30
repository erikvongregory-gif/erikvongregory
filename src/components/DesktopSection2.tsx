"use client";

import { useState } from "react";
import { ProblemItem } from "./ProblemItem";
import { AppleStyleButton } from "./AppleStyleButton";

const EXPERTISE_ITEMS = [
  "wie Bier verkauft wird",
  "wie Brauereien Marketing betreiben",
  "wie man Bier digital inszeniert",
];

/** Section 2+6 – Warum unsichtbar + Von der Brauerei, nebeneinander */
export function DesktopSection2() {
  const [problemResetTrigger, setProblemResetTrigger] = useState(0);

  return (
    <section id="section-2" className="relative z-20 flex w-full min-h-0 items-center justify-center py-12 sm:py-16 md:py-24">
      <div className="section2-boxes-grid mx-auto grid w-full max-w-7xl grid-cols-1 gap-6 px-4 lg:grid-cols-2 lg:gap-10 lg:px-6">
        {/* Links: Warum viele Brauereien online unsichtbar bleiben */}
        <div
          className="section2-box-slide section2-box-left"
        >
        <div
          className="section2-card pointer-events-auto rounded-2xl px-5 py-5 text-left antialiased lg:px-6 lg:py-6"
          onMouseLeave={() => setProblemResetTrigger((t) => t + 1)}
        >
          <h2 className="text-2xl font-bold tracking-tight text-neutral-900 drop-shadow-sm sm:text-3xl md:text-4xl min-h-[1.2em]">
            Warum viele Brauereien{" "}
            <span className="font-light italic font-austera-green-fade">
              online unsichtbar
            </span>{" "}
            bleiben
          </h2>
          <p className="mt-4 text-base leading-relaxed text-neutral-800 sm:text-lg">
            Viele Brauereien haben ein großartiges Produkt – aber online findet sie kaum jemand. Während der deutsche Biermarkt{" "}
            <span className="font-semibold text-neutral-900">um 6 % einbricht</span>, gewinnen sichtbare Marken täglich neue Kunden.
          </p>
          <div className="relative z-10 mt-4 grid min-w-0 grid-cols-1 gap-2 sm:grid-cols-2">
            {[
              { problem: "Social Media wird selten gepflegt", solution: "Mit KI: Regelmäßiger Content – automatisiert & ohne teure Agentur" },
              { problem: "Werbung kostet viel und bringt wenig", solution: "Mit KI: Produktfotos & Werbevideos in Minuten statt Tagen" },
              { problem: "Content zu erstellen kostet Zeit", solution: "Mit KI: Content-Systeme, die für dich arbeiten" },
              { problem: "Websites sind veraltet", solution: "Mit KI: Moderne Websites mit starkem Storytelling" },
            ].map(({ problem, solution }, i) => (
              <ProblemItem key={problem} text={problem} solution={solution} index={i} showIcon resetTrigger={problemResetTrigger} />
            ))}
          </div>
          <p className="text-box-shine mt-4 rounded-xl border border-orange-400/30 bg-orange-50/80 px-4 py-3 text-base leading-relaxed text-neutral-800 sm:text-lg">
            <span className="font-bold italic">
              Währenddessen gewinnen moderne Marken täglich neue Kunden über TikTok, Instagram und Google.
            </span>
          </p>
        </div>
        </div>

        {/* Rechts: Von der Brauerei – für die Brauerei */}
        <div className="section2-box-slide section2-box-right">
        <div className="section2-card flex flex-col rounded-2xl px-5 py-5 text-center sm:px-6 sm:py-6 lg:px-6 lg:py-6">
          <div className="mb-4 inline-flex items-center justify-center gap-2 rounded-full border border-orange-400/30 bg-orange-50/80 px-4 py-1.5 text-sm font-medium text-orange-600">
            <span aria-hidden>✦</span>
            Aus der Praxis
          </div>
          <h2 className="mb-3 text-2xl font-bold tracking-tight text-neutral-900 drop-shadow-sm sm:text-3xl md:text-4xl">
            Von der Brauerei –{" "}
            <span className="font-light italic font-austera-green-fade">
              für die Brauerei
            </span>
          </h2>
          <p className="mb-5 text-base leading-relaxed text-neutral-800 sm:text-lg">
            Ich arbeite selbst in einer Brauerei und kenne die Branche aus erster Hand.
          </p>
          <div className="mb-5 space-y-3">
            {EXPERTISE_ITEMS.map((text) => (
              <div
                key={text}
                className="section6-expertise-item flex items-center justify-center gap-3 rounded-xl border border-neutral-200 bg-white/90 px-4 py-2.5 text-center"
              >
                <span className="text-base font-medium text-neutral-800 sm:text-lg">{text}</span>
              </div>
            ))}
          </div>
          <p className="mb-5 text-center text-base font-medium leading-relaxed text-neutral-800 sm:text-lg">
            Brauereiwissen + moderne KI = Marketing, das funktioniert.
          </p>
          <div className="mb-5 flex flex-wrap items-center justify-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-neutral-200 bg-white/80 px-3 py-1 text-xs font-medium text-neutral-600">
              🔒 DSGVO-konform
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-neutral-200 bg-white/80 px-3 py-1 text-xs font-medium text-neutral-600">
              🇩🇪 Hosting in Deutschland
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-neutral-200 bg-white/80 px-3 py-1 text-xs font-medium text-neutral-600">
              ✓ KI als Werkzeug – Seele bleibt deine
            </span>
          </div>
          <div className="mt-auto flex justify-center">
            <AppleStyleButton href="#contact" className="cta-orange">Kostenloses Erstgespraech starten</AppleStyleButton>
          </div>
        </div>
        </div>
      </div>
    </section>
  );
}
