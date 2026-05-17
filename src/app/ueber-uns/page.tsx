import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { HopfenHugoDemoAsk } from "@/components/HopfenHugoDemoAsk";
import { HopfenHugoIcon } from "@/components/HopfenHugoIcon";
import { ScrollReveal } from "@/components/ScrollReveal";
import { HintergrundPortraitEntrance } from "./HintergrundPortraitEntrance";
import { UeberUnsMountScroll } from "./UeberUnsMountScroll";
import { GlobePolaroids } from "@/components/ui/cobe-globe-polaroids";
import { ConnectWithUs } from "@/components/ui/connect-with-us";
import { FeaturePillars } from "@/components/ui/feature-card";
import { HoverPreview } from "@/components/ui/hover-preview";
import { BlurText } from "@/components/ui/blur-text-animation";
import { UeberUnsLiquidPortrait } from "@/components/UeberUnsLiquidPortrait";
import { SITE } from "@/lib/siteConfig";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Über EvGlab — KI-Marketing für Brauereien in DACH",
  description:
    "Wer wir sind, für wen EvGlab da ist: KI-Werbebilder, Social-Content und Bewertungen für Brauereien und Getränkemarken in Deutschland, Österreich und der Schweiz.",
  alternates: { canonical: `${SITE.baseUrl}/ueber-uns` },
  openGraph: {
    title: "Über EvGlab | KI-Marketing für Brauereien",
    description:
      "Team, Ausrichtung und Kontakt — EvGlab richtet sich an Brauereien und Getränkemarken in DACH.",
    url: `${SITE.baseUrl}/ueber-uns`,
    type: "website",
    locale: "de_DE",
    images: SITE.ogImage ? [{ url: SITE.ogImage, width: 1200, height: 630, alt: "EvGlab Über uns" }] : undefined,
  },
};

const aboutJsonLd = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  name: "Über EvGlab",
  description:
    "EvGlab bietet KI-Marketing für Brauereien und Getränkemarken in Deutschland, Österreich und der Schweiz.",
  url: `${SITE.baseUrl}/ueber-uns`,
  isPartOf: { "@type": "WebSite", name: "EvGlab", url: SITE.baseUrl },
};

const kicker =
  "text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500 sm:text-xs";

const sectionShell = "mx-auto max-w-6xl px-4 sm:px-6";

function SectionDivider() {
  return (
    <div
      className="mx-auto mt-16 h-px max-w-[min(100%,20rem)] bg-gradient-to-r from-transparent via-zinc-300/90 to-transparent sm:mt-20"
      aria-hidden
    />
  );
}

export default function UeberUnsPage() {
  return (
    <main className="ueber-uns-page relative z-20 overflow-hidden bg-gradient-to-b from-white via-zinc-50/85 to-zinc-100/95 text-zinc-900">
      <UeberUnsMountScroll />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[min(70vh,520px)] bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(198,90,32,0.09),transparent_55%)]"
        aria-hidden
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutJsonLd) }} />

      {/** Kein ScrollReveal um #ueber-intro: sonst startet der Block unsichtbar (opacity-0) und Hash-/Anker-Scroll landet optisch bei „Hintergrund“. */}
      <header className={cn(sectionShell, "relative pb-20 pt-28 text-center sm:pb-24 sm:pt-32")}>
        <div id="ueber-intro" className="scroll-mt-28 sm:scroll-mt-32 mx-auto flex max-w-6xl flex-col items-center">
          <p className={kicker}>
            <BlurText text="Geschichte" tone="onLight" animateWhenInView={false} />
          </p>
          <span className="section7-badge section7-badge-pulse mt-5 inline-flex items-center gap-2 rounded-full border border-[rgba(224,122,64,0.35)] bg-[rgba(224,122,64,0.1)] px-4 py-1.5 text-sm font-medium text-[#b45309]">
            <span aria-hidden>✦</span>
            <BlurText text="Marke & Team" tone="onLight" animateWhenInView={false} />
          </span>

          <div
            id="ueber-geschichte-hero"
            className="relative mt-8 w-full max-w-5xl xl:max-w-6xl"
          >
            <div className="ueber-geschichte-hero-card-entrance relative overflow-hidden rounded-[1.75rem] border border-zinc-200/80 bg-zinc-100 shadow-[0_28px_70px_-48px_rgba(15,23,42,0.35)] ring-1 ring-zinc-950/[0.05] sm:rounded-[2rem]">
              <div className="relative aspect-[16/11] w-full sm:aspect-[21/10] md:aspect-[2/1]">
                <Image
                  src="/ueber-uns-geschichte-hero.png"
                  alt="Arbeitsplatz mit Laptop — EvGlab KI-Marketing"
                  fill
                  priority
                  sizes="(max-width: 1280px) 100vw, 1152px"
                  className="object-cover object-[center_42%]"
                />
                <div
                  className="pointer-events-none absolute inset-x-0 bottom-0 h-[62%] bg-gradient-to-t from-black/88 via-black/45 to-transparent sm:h-[58%]"
                  aria-hidden
                />
                <div className="absolute inset-x-0 bottom-0 flex flex-col items-center px-4 pb-8 pt-20 text-center sm:pb-10 sm:pt-24 md:pb-12 md:pt-28">
                  <h1 className="max-w-[18ch] font-sans text-[1.65rem] font-semibold leading-[1.12] tracking-tight text-white drop-shadow-[0_2px_24px_rgba(0,0,0,0.45)] sm:max-w-[20ch] sm:text-4xl md:max-w-[22ch] md:text-[2.65rem] md:leading-[1.06]">
                    <BlurText
                      tone="onDark"
                      text="Wer wir sind — und"
                      animateWhenInView={false}
                      className="text-inherit"
                    />{" "}
                    <BlurText
                      tone="onDark"
                      text="wofür EvGlab steht"
                      wordOffset={5}
                      className="text-inherit text-[#ff9a3c] drop-shadow-[0_1px_12px_rgba(0,0,0,0.35)]"
                    />
                  </h1>
                </div>
              </div>
            </div>
          </div>

          <p className="mx-auto mt-10 max-w-2xl text-pretty text-lg leading-[1.65] text-zinc-600 sm:mt-12 sm:text-xl sm:leading-relaxed">
            <BlurText
              tone="onLight"
              animateWhenInView={false}
              parts={[
                { text: "KI-Marketing mit Substanz für" },
                { text: "Brauereien und Getränkemarken", className: "font-medium text-[#b45309]" },
                { text: "in" },
                { text: "Deutschland, Österreich und der Schweiz.", className: "font-medium text-[#b45309]" },
                {
                  text: "Kein Agentur-Baukasten — sondern klare Lieferobjekte und ein Setup, das zu eurem Tempo passt.",
                },
              ]}
              className="text-inherit leading-[inherit]"
            />
          </p>

          <ul className="mt-11 flex flex-wrap items-center justify-center gap-2.5">
            {["KI-Werbebilder", "Video & Clips", "Premium & Abo", "DACH", "Markenlook"].map((label) => (
              <li key={label}>
                <span className="inline-flex rounded-full border border-zinc-200/90 bg-white/90 px-3.5 py-1.5 text-sm text-zinc-700 shadow-[0_1px_0_rgba(255,255,255,0.9)_inset,0_2px_8px_-4px_rgba(15,23,42,0.08)] ring-1 ring-zinc-950/[0.04] transition hover:border-[#c65a20]/35 hover:ring-[#c65a20]/12">
                  <BlurText text={label} tone="onLight" animateWhenInView={false} className="text-inherit" />
                </span>
              </li>
            ))}
          </ul>
        </div>

        <SectionDivider />
      </header>

      <ScrollReveal softEntrance className="w-full">
        <section
          className="relative border-t border-zinc-200/50 bg-white/50 py-16 sm:py-20"
          aria-labelledby="ueber-story-heading"
        >
        <div className={cn(sectionShell, "mx-auto max-w-6xl")}>
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,17rem)] lg:items-start lg:gap-14 xl:grid-cols-[minmax(0,1.05fr)_minmax(0,19rem)]">
            <div className="min-w-0 max-w-2xl">
              <p className={kicker}>
                <BlurText text="Hintergrund" tone="onLight" />
              </p>
              <h2
                id="ueber-story-heading"
                className="font-display mt-3 text-2xl font-semibold tracking-tight text-zinc-900 sm:text-[1.75rem] sm:leading-snug"
              >
                <BlurText text="Was steckt hinter EvGlab?" tone="onLight" className="text-inherit" />
              </h2>
              <div className="relative mt-10 space-y-7 pl-5 text-pretty text-base leading-[1.7] text-zinc-600 sm:text-lg sm:leading-relaxed before:absolute before:left-0 before:top-1 before:h-[calc(100%-0.25rem)] before:w-px before:bg-gradient-to-b before:from-[#c65a20]/50 before:via-zinc-300/80 before:to-transparent">
                <p>
                  <BlurText
                    tone="onLight"
                    parts={[
                      { text: "Angefangen hat es mit einer einfachen Frage: Wie bekommen Brauereien" },
                      { text: "schneller gute Werbemotive", className: "font-medium text-[#b45309]" },
                      {
                        text: ", ohne dass jedes Bild Wochen an interner Kapazität frisst? KI ist dafür das Werkzeug — aber nur, wenn Briefing, Markenprofil und Freigaben sauber sitzen.",
                      },
                    ]}
                    className="text-inherit leading-[inherit]"
                  />
                </p>
                <p>
                  <BlurText
                    tone="onLight"
                    parts={[
                      { text: "Heute bündeln wir genau das:" },
                      { text: "fertige Assets", className: "font-medium text-[#b45309]" },
                      {
                        text: ", nachvollziehbare Pakete und — für Teams mit laufendem Bedarf — ein Dashboard mit Token-Abo. Immer mit dem Ziel, dass ihr",
                      },
                      { text: "sichtbar bleibt", className: "font-medium text-[#b45309]" },
                      { text: ", wo Flasche, Gastro und Saison zählen." },
                    ]}
                    className="text-inherit leading-[inherit]"
                  />
                </p>
              </div>
              <p className="mt-9 pl-5 text-sm text-zinc-600 sm:text-base">
                <BlurText
                  text="Erik Freiherr von Gregory"
                  tone="onLight"
                  className="font-medium text-zinc-800"
                />
              </p>
            </div>

            <div className="mx-auto flex w-full max-w-[17.5rem] justify-center lg:mx-0 lg:max-w-none lg:justify-end xl:max-w-[19rem]">
              <HintergrundPortraitEntrance
                className={cn(
                  "evg-clean-hover relative w-full overflow-hidden rounded-tl-[2.35rem] rounded-tr-[1.65rem] rounded-br-[2.45rem] rounded-bl-[1.55rem] border border-black/10 bg-gradient-to-br from-black/5 to-black/0 p-2 sm:p-2.5",
                  "shadow-[0_14px_30px_-20px_rgba(24,24,27,0.28)] backdrop-blur-[14px] ring-1 ring-black/[0.04]",
                  "transition-[border-color,box-shadow,ring-color] duration-200 hover:border-[#e07a40]/35 hover:shadow-[0_16px_34px_-20px_rgba(198,90,32,0.24)]",
                )}
              >
                <UeberUnsLiquidPortrait className="relative z-0" />
              </HintergrundPortraitEntrance>
            </div>
          </div>
        </div>
        </section>
      </ScrollReveal>

      <ScrollReveal softEntrance className="w-full">
        <section
          className="border-t border-zinc-200/50 bg-gradient-to-b from-zinc-50/90 to-white/80 py-16 sm:py-20"
          aria-labelledby="hopfen-hugo-heading"
        >
        <div className={cn(sectionShell, "mx-auto max-w-6xl")}>
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,22rem)] lg:items-start lg:gap-14 xl:grid-cols-[minmax(0,1fr)_minmax(0,26rem)]">
            <div className="flex flex-col items-center gap-8 text-center lg:flex-row lg:items-start lg:gap-10 lg:text-left">
              <div className="flex shrink-0 justify-center lg:justify-start">
                <HopfenHugoIcon className="h-[5.25rem] w-[5.25rem] drop-shadow-[0_8px_20px_rgba(15,23,42,0.12)]" />
              </div>
              <div className="min-w-0">
                <p className={kicker}>
                  <BlurText text="Dashboard" tone="onLight" />
                </p>
                <h2
                  id="hopfen-hugo-heading"
                  className="font-display mt-3 text-2xl font-semibold tracking-tight text-zinc-900 sm:text-[1.75rem] sm:leading-snug"
                >
                  <BlurText text="Hopfen Hugo" tone="onLight" className="text-inherit" />
                </h2>
                <p className="mx-auto mt-6 max-w-xl text-pretty text-base leading-[1.7] text-zinc-600 sm:text-lg sm:leading-relaxed lg:mx-0">
                  <BlurText
                    tone="onLight"
                    parts={[
                      { text: "Hopfen Hugo", className: "font-medium text-[#b45309]" },
                      {
                        text: "ist euer Chat-Assistent im EvGlab-Dashboard — speziell für",
                      },
                      { text: "KI-Bildgenerierung", className: "font-medium text-[#b45309]" },
                      {
                        text: "und alles, was dazu im Tool gehört: Prompts, Motive, Stil und Markenlook, Varianten, Formate, Mediathek sowie Token und Bedienung der Bild-Funktionen.",
                      },
                    ]}
                    className="text-inherit leading-[inherit]"
                  />
                </p>
                <p className="mx-auto mt-5 max-w-xl text-pretty text-base leading-[1.7] text-zinc-600 sm:text-lg sm:leading-relaxed lg:mx-0">
                  <BlurText
                    tone="onLight"
                    parts={[
                      { text: "Keine Rezepte, kein Sudhaus-Wissen: Wenn es nichts mit" },
                      { text: "Werbebildern und Bild-Workflows", className: "font-medium text-[#b45309]" },
                      { text: "zu tun hat, verweist er euch klar darauf. So bleibt der Fokus auf dem, was EvGlab liefert —" },
                      { text: "schnell nutzbare Bilder", className: "font-medium text-[#b45309]" },
                      { text: "für Social, Kampagne und Außenauftritt." },
                    ]}
                    className="text-inherit leading-[inherit]"
                  />
                </p>
              </div>
            </div>
            <HopfenHugoDemoAsk />
          </div>
        </div>
        </section>
      </ScrollReveal>

      <ScrollReveal softEntrance className="w-full">
        <section className={cn(sectionShell, "py-16 sm:py-20")} aria-labelledby="ueber-kapitel-heading">
          <h2 id="ueber-kapitel-heading" className="sr-only">
            Drei Prinzipien
          </h2>
          <FeaturePillars />
        </section>
      </ScrollReveal>

      <ScrollReveal softEntrance className="w-full">
        <section
          className="border-y border-zinc-200/55 bg-gradient-to-b from-zinc-100/40 via-white/80 to-zinc-50/50 py-16 sm:py-20"
          aria-labelledby="ueber-marke-heading"
        >
        <div className={cn(sectionShell, "max-w-2xl text-center")}>
          <p className={kicker}>
            <BlurText text="Marke" tone="onLight" />
          </p>
          <h2
            id="ueber-marke-heading"
            className="font-display mt-3 text-2xl font-semibold tracking-tight text-zinc-900 sm:text-[1.75rem]"
          >
            <BlurText text="EvGlab in einem Satz" tone="onLight" className="text-inherit" />
          </h2>
          <p className="mx-auto mt-7 max-w-xl text-pretty text-base leading-[1.65] text-zinc-600 sm:text-lg">
            <BlurText
              tone="onLight"
              parts={[
                { text: "Wir übersetzen eure Marke in" },
                { text: "Bilder, Texte und Videos", className: "font-medium text-[#b45309]" },
                {
                  text: ", die im Alltag funktionieren — schnell genug für Social, stark genug für Kampagnen und Clips.",
                },
              ]}
              className="text-inherit leading-[inherit]"
            />
          </p>
          <p className="mx-auto mt-4 max-w-xl text-pretty text-sm leading-relaxed text-zinc-500 sm:text-base">
            <BlurText
              tone="onLight"
              parts={[
                {
                  text: "Was uns wichtig ist: dass ihr euch verstanden fühlt und am Ende Assets habt, die",
                },
                { text: "wirklich einsetzbar", className: "font-medium text-[#b45309]" },
                {
                  text: "sind — ob Motiv, Post oder Werbevideo — nicht nur „nice“ aussehen.",
                },
              ]}
              className="text-inherit leading-[inherit]"
            />
          </p>
          <ul className="mt-11 flex flex-wrap items-center justify-center gap-2">
            {["Briefing-first", "DACH-fokussiert", "Lieferobjekte statt Endlos-Schleife", "Tokens planbar"].map((t) => (
              <li key={t}>
                <span className="inline-flex rounded-full border border-zinc-200/90 bg-white/90 px-3 py-1.5 text-xs font-medium text-zinc-600 shadow-sm ring-1 ring-zinc-950/[0.03] sm:text-sm">
                  <BlurText text={t} tone="onLight" className="text-inherit" />
                </span>
              </li>
            ))}
          </ul>
        </div>
        </section>
      </ScrollReveal>

      <ScrollReveal softEntrance className="w-full">
        <section className={cn(sectionShell, "py-16 sm:py-20")} aria-labelledby="ueber-interaktiv-heading">
        <div className="mx-auto max-w-2xl text-center">
          <p className={kicker}>
            <BlurText text="Angebot & Region" tone="onLight" />
          </p>
          <h2
            id="ueber-interaktiv-heading"
            className="font-display mt-3 text-2xl font-semibold tracking-tight text-zinc-900 sm:text-[1.75rem]"
          >
            <BlurText text="So erklären wir's — einmal mit Bild" tone="onLight" className="text-inherit" />
          </h2>
          <p className="mt-6 text-pretty text-sm leading-relaxed text-zinc-600 sm:text-base">
            <BlurText
              tone="onLight"
              parts={[
                { text: "Tipp:", className: "font-medium text-[#b45309]" },
                { text: "Mit der Maus über die" },
                { text: "orangefarbenen Begriffe", className: "font-medium text-[#b45309]" },
                {
                  text: "im Text fahren — dann erscheint jeweils eine Vorschau. Auf dem Touchscreen stehen die Infos direkt im Fließtext.",
                },
              ]}
              className="text-inherit leading-[inherit]"
            />
          </p>
        </div>

        <div
          className={cn(
            "evg-clean-hover relative mt-14 overflow-hidden rounded-[1.75rem] border border-black/10 bg-gradient-to-br from-black/5 to-black/0 p-6 shadow-[0_14px_30px_-20px_rgba(24,24,27,0.26)] backdrop-blur-[14px] ring-1 ring-black/[0.04]",
            "transition-[border-color,box-shadow,ring-color] duration-200 hover:border-[#e07a40]/35 hover:shadow-[0_16px_34px_-20px_rgba(198,90,32,0.24)]",
            "sm:mt-16 sm:p-9 lg:p-10",
          )}
        >
          <div
            className="pointer-events-none absolute inset-0 rounded-[1.75rem] bg-[radial-gradient(ellipse_70%_50%_at_50%_0%,rgba(198,90,32,0.06),transparent_62%)]"
            aria-hidden
          />
          <div className="relative text-left">
            <div className="mx-auto grid max-w-5xl gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(280px,min(46vw,520px))] lg:items-center lg:gap-14">
              <div className="min-w-0">
                <HoverPreview compact contentAlign="start" plain theme="light" />
              </div>
              <div className="mx-auto flex w-full justify-center lg:mx-0 lg:max-w-none">
                <GlobePolaroids className="w-full max-w-[min(100%,520px)]" />
              </div>
            </div>
          </div>
        </div>
        </section>
      </ScrollReveal>

      <ScrollReveal softEntrance className="w-full">
        <section
          className="border-t border-zinc-200/70 bg-white/75 py-14 sm:py-16"
          aria-labelledby="ueber-cta-heading"
        >
        <div className={cn(sectionShell, "max-w-2xl text-center")}>
          <h2 id="ueber-cta-heading" className="font-display text-xl font-semibold tracking-tight text-zinc-900 sm:text-2xl">
            <BlurText text="Genug gelesen?" tone="onLight" className="text-inherit" />
          </h2>
          <p className="mt-5 text-pretty text-base leading-relaxed text-zinc-600">
            <BlurText text="Wenn du tiefer einsteigen willst:" tone="onLight" className="text-inherit" />{" "}
            <Link
              href="/ratgeber"
              className="font-semibold text-[#b45309] underline decoration-[#c65a20]/35 underline-offset-2 transition hover:text-[#9a3412] hover:decoration-[#c65a20]/55"
            >
              <BlurText text="Ratgeber-Quiz" tone="onLight" className="text-inherit font-semibold underline" />
            </Link>
            <BlurText
              text=". Sonst schreib uns — wir melden uns pragmatisch zurück."
              tone="onLight"
              wordOffset={6}
              className="text-inherit"
            />
          </p>
          <p className="mt-8">
            <a
              href="mailto:kontakt@evglab.com"
              className="inline-flex min-h-[2.75rem] items-center justify-center rounded-full border border-[rgba(224,122,64,0.5)] bg-gradient-to-b from-[rgba(255,245,235,0.95)] to-[rgba(254,231,210,0.75)] px-8 py-2.5 text-sm font-semibold text-[#9a3412] shadow-[var(--ui-shadow-accent)] transition-[transform,box-shadow] duration-200 hover:shadow-[var(--ui-shadow-accent-hover)] active:scale-[0.98]"
            >
              <BlurText text="Jetzt Kontakt aufnehmen" tone="onLight" className="text-inherit" />
            </a>
          </p>
        </div>
        </section>
      </ScrollReveal>

      <ScrollReveal softEntrance className="w-full">
        <section className="border-t border-zinc-200/80 bg-white/95 py-14 sm:py-16" aria-labelledby="ueber-kontakt-heading">
        <div className={cn(sectionShell, "max-w-3xl text-center")}>
          <p className={kicker}>
            <BlurText text="Kontakt" tone="onLight" />
          </p>
          <h2 id="ueber-kontakt-heading" className="font-display mt-3 text-xl font-semibold text-zinc-900 sm:text-2xl">
            <BlurText text="Direkt loslegen" tone="onLight" className="text-inherit" />
          </h2>
          <p className="mt-5 text-pretty text-base leading-relaxed text-zinc-600">
            <BlurText
              text="Fragen zu Paketen, Abos oder Zeitplan? Schreib uns an"
              tone="onLight"
              className="text-inherit"
            />{" "}
            <a href="mailto:kontakt@evglab.com" className="font-semibold text-[#b45309] underline-offset-2 hover:underline">
              <BlurText text="kontakt@evglab.com" tone="onLight" className="text-inherit font-semibold" />
            </a>{" "}
            <BlurText
              text="oder nutze die Kanäle hier:"
              tone="onLight"
              wordOffset={10}
              className="text-inherit"
            />
          </p>
          <div className="mt-10">
            <ConnectWithUs plain />
          </div>
        </div>
        </section>
      </ScrollReveal>
    </main>
  );
}
