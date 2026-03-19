"use client";

import { useState } from "react";
import { ProblemItem } from "./ProblemItem";

/** Statische Section 2 – Warum Brauereien online unsichtbar bleiben */
export function DesktopSection2() {
  const [problemResetTrigger, setProblemResetTrigger] = useState(0);

  return (
    <section className="relative z-20 flex min-h-screen items-center justify-center py-12 sm:py-16 md:py-24">
      <div
        className="section2-card pointer-events-auto mx-auto w-full max-w-2xl rounded-2xl px-4 text-left antialiased lg:px-6"
        onMouseLeave={() => setProblemResetTrigger((t) => t + 1)}
      >
        <h2 className="text-2xl font-bold tracking-tight text-white drop-shadow-md sm:text-3xl md:text-4xl min-h-[1.2em]">
          Warum viele Brauereien{" "}
          <span
            className="font-light italic"
            style={{
              fontFamily: "var(--font-austera)",
              textShadow: "0 0 20px rgba(34, 197, 94, 0.5), 0 0 40px rgba(34, 197, 94, 0.25)",
            }}
          >
            online unsichtbar
          </span>{" "}
          bleiben
        </h2>
        <p className="mt-5 text-base leading-relaxed text-white/90 sm:text-lg">
          Viele Brauereien haben ein großartiges Produkt – aber online findet sie kaum jemand.
        </p>
        <div className="relative z-10 mt-5 grid min-w-0 grid-cols-1 gap-2 sm:grid-cols-2">
          {[
            { problem: "Social Media wird selten gepflegt", solution: "Mit KI: Regelmäßiger Content – automatisiert & ohne teure Agentur" },
            { problem: "Werbung kostet viel und bringt wenig", solution: "Mit KI: Produktfotos & Werbevideos in Minuten statt Tagen" },
            { problem: "Content zu erstellen kostet Zeit", solution: "Mit KI: Content-Systeme, die für dich arbeiten" },
            { problem: "Websites sind veraltet", solution: "Mit KI: Moderne Websites mit starkem Storytelling" },
          ].map(({ problem, solution }, i) => (
            <ProblemItem key={problem} text={problem} solution={solution} index={i} showIcon resetTrigger={problemResetTrigger} />
          ))}
        </div>
        <p className="text-box-shine mt-5 rounded-xl border border-emerald-500/25 bg-emerald-500/10 px-4 py-3 text-base leading-relaxed text-white/95 sm:text-lg">
          <span className="font-bold italic">
            Währenddessen gewinnen moderne Marken täglich neue Kunden über TikTok, Instagram und Google.
          </span>
        </p>
      </div>
    </section>
  );
}
