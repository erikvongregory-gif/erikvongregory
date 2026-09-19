"use client";

import Link from "next/link";
import { SITE } from "@/lib/siteConfig";
import { NeuHlsVideo } from "@/components/neu/NeuHlsVideo";
import { NeuRevealText } from "@/components/neu/NeuRevealText";

/** Gleicher Statement-Stream wie im Velorah-Template */
const STATEMENT_HLS =
  "https://stream.mux.com/9njY8qDfS02Uvbll018C8CK39p5EksK7mn02DDC1zYvppI.m3u8";

const STATS = [
  { value: "KI", label: "Bilder & Texte" },
  { value: "1", label: "Dashboard für alles" },
  { value: "24/7", label: "Content bereit" },
  { value: "DE", label: "Hosting & DSGVO" },
] as const;

export function NeuStatement() {
  return (
    <section className="neu-on-media relative flex min-h-[90vh] flex-col items-center justify-center overflow-hidden bg-black px-6">
      <NeuHlsVideo src={STATEMENT_HLS} />

      <div className="relative z-10 flex max-w-5xl flex-col items-center text-center">
        <p className="mb-6 text-xs uppercase tracking-[0.3em] text-white/50 sm:text-sm">
          <NeuRevealText tone="onDark" text="Dein Marketing-Cockpit" />
        </p>

        <h2
          className="text-4xl leading-[1.05] tracking-[-1.5px] text-white sm:text-6xl md:text-7xl"
          style={{ fontFamily: "var(--font-velorah-serif), ui-serif, Georgia, serif" }}
        >
          <NeuRevealText
            tone="onDark"
            wordOffset={3}
            text="Brauerei inspiriert. Dashboard gesteuert."
          />
        </h2>

        <p className="mt-8 max-w-2xl text-base leading-relaxed text-white/60 sm:text-lg">
          <NeuRevealText
            tone="onDark"
            wordOffset={8}
            text="Ein Ort für Motive, Posts und Bewertungen. Plane Kampagnen, halte deine Marke scharf und lass BrewAI die Routine übernehmen — damit du wieder am Sudhaus bist, nicht im Tool-Chaos."
          />
        </p>

        <div className="mt-14 grid grid-cols-2 gap-8 sm:grid-cols-4 sm:gap-12">
          {STATS.map((stat) => (
            <div key={stat.label}>
              <div
                className="text-3xl font-light text-white sm:text-4xl"
                style={{ fontFamily: "var(--font-velorah-serif), ui-serif, Georgia, serif" }}
              >
                {stat.value}
              </div>
              <div className="text-xs text-white/50 sm:text-sm">{stat.label}</div>
            </div>
          ))}
        </div>

        <Link
          href={SITE.appBaseUrl}
          className="neu-liquid-glass mt-12 rounded-full px-10 py-4 text-sm transition-transform hover:scale-[1.03]"
        >
          Dashboard entdecken
        </Link>
      </div>
    </section>
  );
}
