"use client";

import Link from "next/link";
import { SITE } from "@/lib/siteConfig";
import { Safari } from "@/components/ui/safari";
import { NeuRevealText } from "@/components/neu/NeuRevealText";

const STEPS = [
  { n: "01", label: "Website einlesen" },
  { n: "02", label: "Marke erkennen" },
  { n: "03", label: "Fertig nutzen" },
] as const;

/**
 * Markenprofil — Theme über neu-Tokens.
 */
export function NeuMarkenprofil() {
  return (
    <section
      id="marke"
      className="neu-bg-elevated scroll-mt-24 px-6 pb-24 pt-16 md:px-12 md:pb-32 md:pt-24"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <p className="neu-faint text-xs uppercase tracking-[0.3em]">
            <NeuRevealText text="Markenprofil" />
          </p>
          <h2
            className="neu-fg mt-3 text-3xl leading-tight tracking-[-1px] sm:text-5xl md:text-6xl"
            style={{ fontFamily: "var(--font-velorah-serif), ui-serif, Georgia, serif" }}
          >
            <NeuRevealText wordOffset={1} text="Website einlesen. Marke steht." />
          </h2>
          <p className="neu-muted mt-6 text-base leading-relaxed sm:text-lg">
            <NeuRevealText
              wordOffset={5}
              text="BrewAI liest Farben, Tonalität und Bildregeln von deiner Brauerei-Website — einmal prüfen, danach fließt das Profil in jedes Motiv. So einfach bedient sich das Dashboard."
            />
          </p>
        </div>

        <ol className="neu-subtle mx-auto mt-12 flex max-w-2xl flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm">
          {STEPS.map((step, i) => (
            <li key={step.n} className="flex items-center gap-3">
              <span className="neu-fg font-medium opacity-80">{step.n}</span>
              <span>{step.label}</span>
              {i < STEPS.length - 1 ? (
                <span className="neu-faint hidden opacity-50 sm:inline" aria-hidden>
                  →
                </span>
              ) : null}
            </li>
          ))}
        </ol>

        <div className="mt-14 grid gap-6 md:grid-cols-2 md:gap-8">
          <figure>
            <Safari
              url="app.brewai.de/markenprofil"
              src="/neu/dashboard/markenprofil-empty.png"
              className="h-auto w-full drop-shadow-2xl"
            />
            <figcaption className="neu-faint mt-4 text-center text-sm">
              URL eingeben — fertig zum Einlesen
            </figcaption>
          </figure>
          <figure>
            <Safari
              url="app.brewai.de/markenprofil"
              src="/neu/dashboard/markenprofil.png"
              className="h-auto w-full drop-shadow-2xl"
            />
            <figcaption className="neu-faint mt-4 text-center text-sm">
              Profil aktiv — fließt in jede Generierung
            </figcaption>
          </figure>
        </div>

        <div className="mt-12 flex justify-center">
          <Link
            href={SITE.appBaseUrl}
            className="neu-liquid-glass rounded-full px-10 py-4 text-sm transition-transform hover:scale-[1.03]"
          >
            Markenprofil starten
          </Link>
        </div>
      </div>
    </section>
  );
}
