"use client";

import * as React from "react";
import Link from "next/link";
import { SITE } from "@/lib/siteConfig";
import { NeuLoopVideo } from "@/components/neu/NeuLoopVideo";
import { NeuThemeToggle } from "@/components/neu/NeuThemeToggle";
import { NeuRevealText } from "@/components/neu/NeuRevealText";
import { useNeuTheme } from "@/components/neu/NeuTheme";
import { cn } from "@/lib/utils";

const HERO_POSTER = "/neu/hero-poster.webp";

const NAV = [
  { href: "#funktionen", label: "Funktionen" },
  { href: "#dashboard", label: "Dashboard" },
  { href: "#marke", label: "Marke" },
  { href: "#preise", label: "Preise" },
] as const;

export function NeuHero() {
  const [videoFailed, setVideoFailed] = React.useState(false);
  const { theme } = useNeuTheme();
  const isLight = theme === "light";

  return (
    <section className="neu-on-media relative min-h-screen overflow-hidden bg-black text-white">
      {videoFailed ? (
        <div
          aria-hidden
          className="absolute inset-0 z-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${HERO_POSTER})` }}
        />
      ) : (
        <NeuLoopVideo onFailed={() => setVideoFailed(true)} />
      )}

      <div
        aria-hidden
        className={cn(
          "absolute inset-x-0 bottom-0 z-[1] h-[40%] bg-gradient-to-t to-transparent",
          isLight ? "from-white via-white/70" : "from-black via-black/60",
        )}
      />

      <nav className="relative z-10 mx-auto flex max-w-7xl items-center justify-between px-6 py-6 md:px-8">
        <Link href="/" className="flex items-center gap-2.5 tracking-tight">
          <img
            src={SITE.brandLogoPath}
            alt=""
            width={32}
            height={32}
            className="h-8 w-8 shrink-0"
          />
          <span
            className="text-3xl tracking-tight"
            style={{ fontFamily: "var(--font-velorah-serif), ui-serif, Georgia, serif" }}
          >
            {SITE.name}
          </span>
        </Link>

        <div className="hidden items-center gap-8 text-sm text-white md:flex">
          {NAV.map((link) => (
            <a key={link.href} href={link.href} className="transition-colors hover:text-white/80">
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <NeuThemeToggle className="border-white/30 bg-white/10 text-white shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08)] backdrop-blur-md [&_.neu-theme-thumb]:bg-white [&_.neu-theme-thumb]:text-black" />
          <Link
            href={SITE.appBaseUrl}
            className="neu-liquid-glass rounded-full px-6 py-2.5 text-sm transition-transform hover:scale-[1.03]"
          >
            Reise starten
          </Link>
        </div>
      </nav>

      <div className="relative z-10 flex flex-col items-center justify-center px-6 pb-40 pt-[28px] text-center">
        <h1
          className="whitespace-nowrap text-center text-[clamp(1.65rem,5.2vw,6rem)] font-normal leading-none tracking-[-0.04em] text-white"
          style={{ fontFamily: "var(--font-velorah-serif), ui-serif, Georgia, serif" }}
        >
          <NeuRevealText
            tone="onDark"
            animateWhenInView={false}
            parts={[
              { text: "Wo" },
              { text: "Brauereien", className: "not-italic text-white" },
              { text: "wachsen" },
              { text: "durch jedes Bild.", className: "not-italic text-white" },
            ]}
          />
        </h1>

        <p className="mt-8 max-w-2xl text-base leading-relaxed text-white sm:text-lg">
          <NeuRevealText
            tone="onDark"
            animateWhenInView={false}
            wordOffset={6}
            text="Planbare Produktbilder und Social-Content aus dem Dashboard — mehr Sichtbarkeit, klare Marke, weniger Aufwand."
          />
        </p>

        <Link
          href={SITE.appBaseUrl}
          className="neu-fade-rise-delay-2 neu-liquid-glass mt-12 rounded-full px-14 py-5 text-base transition-transform hover:scale-[1.03]"
        >
          Reise starten
        </Link>
      </div>
    </section>
  );
}
