"use client";

import Link from "next/link";
import { SITE } from "@/lib/siteConfig";
import { NEU_STUDIO_PLANS } from "@/lib/neu/studioPlans";
import { NeuRevealText } from "@/components/neu/NeuRevealText";

/** Gleicher CTA-Hintergrund wie im Velorah-Template */
const CTA_VIDEO =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260306_074215_04640ca7-042c-45d6-bb56-58b1e8a42489.mp4";

const startPrice = NEU_STUDIO_PLANS[0]?.monthly ?? 79;

/**
 * Abschluss-CTA — Video bleibt, Text immer hell lesbar (neu-on-media).
 */
export function NeuCta() {
  return (
    <section
      id="steig-ein"
      className="neu-on-media relative flex min-h-[90vh] scroll-mt-24 flex-col items-center justify-center overflow-hidden bg-black px-6 text-center"
    >
      <video
        className="absolute inset-0 z-0 h-full w-full object-cover"
        src={CTA_VIDEO}
        autoPlay
        loop
        muted
        playsInline
        aria-hidden
        tabIndex={-1}
      />

      <div className="relative z-10 flex max-w-4xl flex-col items-center">
        <p className="mb-4 text-xs uppercase tracking-[0.3em] text-white/50 sm:text-sm">
          <NeuRevealText tone="onDark" text={`Ab ${startPrice} € / Monat`} />
        </p>

        <h2
          className="text-5xl leading-[0.95] tracking-[-2px] text-white sm:text-7xl md:text-8xl"
          style={{ fontFamily: "var(--font-velorah-serif), ui-serif, Georgia, serif" }}
        >
          <NeuRevealText tone="onDark" wordOffset={4} text="Steig ein." />
        </h2>

        <p className="mt-6 max-w-xl text-base leading-relaxed text-white/55 sm:text-lg">
          <NeuRevealText
            tone="onDark"
            wordOffset={6}
            text="Starte mit BrewAI — planbare Motive und Social-Content ab dem ersten Tag. Marke einmal setzen, danach wächst der Feed mit."
          />
        </p>

        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
          <Link
            href={SITE.appBaseUrl}
            className="neu-liquid-glass rounded-full px-10 py-4 text-sm transition-transform hover:scale-[1.03]"
          >
            Reise starten
          </Link>
          <a
            href="#preise"
            className="rounded-full border border-white/20 px-10 py-4 text-sm text-white/60 transition-colors hover:border-white/40 hover:text-white"
          >
            Pläne ansehen
          </a>
        </div>
      </div>
    </section>
  );
}
