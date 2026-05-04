import type { Metadata } from "next";
import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { HopfenHugoDemoAsk } from "@/components/HopfenHugoDemoAsk";
import { ScrollReveal } from "@/components/ScrollReveal";
import { UeberUnsMountScroll } from "./UeberUnsMountScroll";
import { GlobePolaroids } from "@/components/ui/cobe-globe-polaroids";
import { ConnectWithUs } from "@/components/ui/connect-with-us";
import { FeaturePillars } from "@/components/ui/feature-card";
import { HoverPreview } from "@/components/ui/hover-preview";
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
    <main className="relative z-20 overflow-hidden bg-gradient-to-b from-white via-zinc-50/85 to-zinc-100/95 text-zinc-900">
      <UeberUnsMountScroll />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[min(70vh,520px)] bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(198,90,32,0.09),transparent_55%)]"
        aria-hidden
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutJsonLd) }} />

      <header
        id="ueber-intro"
        className={cn(
          sectionShell,
          "relative max-w-4xl scroll-mt-28 pb-20 pt-28 text-center sm:scroll-mt-32 sm:pb-24 sm:pt-32",
        )}
      >
        <ScrollReveal softEntrance className="w-full">
          <p className={kicker}>Geschichte</p>
          <span className="section7-badge section7-badge-pulse mt-5 inline-flex items-center gap-2 rounded-full border border-[rgba(224,122,64,0.35)] bg-[rgba(224,122,64,0.1)] px-4 py-1.5 text-sm font-medium text-[#b45309]">
            <span aria-hidden>✦</span>
            Marke &amp; Team
          </span>

          <h1 className="mx-auto mt-10 max-w-[22ch] font-sans text-4xl font-semibold leading-[1.06] tracking-tight text-zinc-900 sm:text-5xl md:text-[3.35rem] md:leading-[1.05]">
            Wer wir sind — und{" "}
            <span className="bg-gradient-to-r from-[#c2410c] via-[#c65a20] to-[#d97706] bg-clip-text text-transparent">
              wofür EvGlab steht
            </span>
          </h1>

          <p className="mx-auto mt-8 max-w-2xl text-pretty text-lg leading-[1.65] text-zinc-600 sm:text-xl sm:leading-relaxed">
            KI-Marketing mit Substanz für{" "}
            <strong className="font-medium text-zinc-900">Brauereien und Getränkemarken</strong> in{" "}
            <strong className="font-medium text-zinc-900">Deutschland, Österreich und der Schweiz</strong>. Kein
            Agentur-Baukasten — sondern klare Lieferobjekte und ein Setup, das zu eurem Tempo passt.
          </p>

          <ul className="mt-11 flex flex-wrap items-center justify-center gap-2.5">
            {["KI-Werbebilder", "Premium & Abo", "DACH", "Markenlook"].map((label) => (
              <li key={label}>
                <span className="inline-flex rounded-full border border-zinc-200/90 bg-white/90 px-3.5 py-1.5 text-sm text-zinc-700 shadow-[0_1px_0_rgba(255,255,255,0.9)_inset,0_2px_8px_-4px_rgba(15,23,42,0.08)] ring-1 ring-zinc-950/[0.04] transition hover:border-[#c65a20]/35 hover:ring-[#c65a20]/12">
                  {label}
                </span>
              </li>
            ))}
          </ul>

          <SectionDivider />
        </ScrollReveal>
      </header>

      <ScrollReveal softEntrance className="w-full">
        <section
          className="relative border-t border-zinc-200/50 bg-white/50 py-16 sm:py-20"
          aria-labelledby="ueber-story-heading"
        >
        <div className={cn(sectionShell, "max-w-2xl")}>
          <p className={kicker}>Hintergrund</p>
          <h2
            id="ueber-story-heading"
            className="font-display mt-3 text-2xl font-semibold tracking-tight text-zinc-900 sm:text-[1.75rem] sm:leading-snug"
          >
            Was steckt hinter EvGlab?
          </h2>
          <div className="relative mt-10 space-y-7 pl-5 text-pretty text-base leading-[1.7] text-zinc-600 sm:text-lg sm:leading-relaxed before:absolute before:left-0 before:top-1 before:h-[calc(100%-0.25rem)] before:w-px before:bg-gradient-to-b before:from-[#c65a20]/50 before:via-zinc-300/80 before:to-transparent">
            <p>
              Angefangen hat es mit einer einfachen Frage: Wie bekommen Brauereien{" "}
              <strong className="font-medium text-zinc-800">schneller gute Werbemotive</strong>, ohne dass jedes Bild
              Wochen an interner Kapazität frisst? KI ist dafür das Werkzeug — aber nur, wenn Briefing, Markenprofil
              und Freigaben sauber sitzen.
            </p>
            <p>
              Heute bündeln wir genau das:{" "}
              <strong className="font-medium text-zinc-800">fertige Assets</strong>, nachvollziehbare Pakete und — für
              Teams mit laufendem Bedarf — ein Dashboard mit Token-Abo. Immer mit dem Ziel, dass ihr{" "}
              <strong className="font-medium text-zinc-800">sichtbar bleibt</strong>, wo Flasche, Gastro und Saison
              zählen.
            </p>
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
                <div
                  className="flex h-[5.25rem] w-[5.25rem] items-center justify-center rounded-2xl border border-lime-900/10 bg-[#d9ff6a]/35 shadow-[0_12px_28px_-18px_rgba(63,98,18,0.35)] ring-1 ring-lime-400/25"
                  aria-hidden
                >
                  <MessageCircle className="h-9 w-9 text-lime-950/85" strokeWidth={1.75} />
                </div>
              </div>
              <div className="min-w-0">
                <p className={kicker}>Dashboard</p>
                <h2
                  id="hopfen-hugo-heading"
                  className="font-display mt-3 text-2xl font-semibold tracking-tight text-zinc-900 sm:text-[1.75rem] sm:leading-snug"
                >
                  Hopfen Hugo
                </h2>
                <p className="mx-auto mt-6 max-w-xl text-pretty text-base leading-[1.7] text-zinc-600 sm:text-lg sm:leading-relaxed lg:mx-0">
                  <strong className="font-medium text-zinc-900">Hopfen Hugo</strong> ist euer Chat-Assistent im
                  EvGlab-Dashboard — speziell für{" "}
                  <strong className="font-medium text-zinc-900">KI-Bildgenerierung</strong> und alles, was dazu im
                  Tool gehört: Prompts, Motive, Stil und Markenlook, Varianten, Formate, Mediathek sowie Token und
                  Bedienung der Bild-Funktionen.
                </p>
                <p className="mx-auto mt-5 max-w-xl text-pretty text-base leading-[1.7] text-zinc-600 sm:text-lg sm:leading-relaxed lg:mx-0">
                  Keine Rezepte, kein Sudhaus-Wissen: Wenn es nichts mit{" "}
                  <strong className="font-medium text-zinc-900">Werbebildern und Bild-Workflows</strong> zu tun hat,
                  verweist er euch klar darauf. So bleibt der Fokus auf dem, was EvGlab liefert —{" "}
                  <strong className="font-medium text-zinc-900">schnell nutzbare Bilder</strong> für Social, Kampagne
                  und Außenauftritt.
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
          <p className={kicker}>Marke</p>
          <h2
            id="ueber-marke-heading"
            className="font-display mt-3 text-2xl font-semibold tracking-tight text-zinc-900 sm:text-[1.75rem]"
          >
            EvGlab in einem Satz
          </h2>
          <p className="mx-auto mt-7 max-w-xl text-pretty text-base leading-[1.65] text-zinc-600 sm:text-lg">
            Wir übersetzen eure Marke in{" "}
            <strong className="font-medium text-zinc-900">Bilder und Texte</strong>, die im Alltag funktionieren —
            schnell genug für Social, stark genug für Kampagnen.
          </p>
          <p className="mx-auto mt-4 max-w-xl text-pretty text-sm leading-relaxed text-zinc-500 sm:text-base">
            Was uns wichtig ist: dass ihr euch verstanden fühlt und am Ende Assets habt, die{" "}
            <strong className="font-medium text-zinc-700">wirklich einsetzbar</strong> sind — nicht nur „nice“
            aussehen.
          </p>
          <ul className="mt-11 flex flex-wrap items-center justify-center gap-2">
            {["Briefing-first", "DACH-fokussiert", "Lieferobjekte statt Endlos-Schleife", "Tokens planbar"].map((t) => (
              <li key={t}>
                <span className="inline-flex rounded-full border border-zinc-200/90 bg-white/90 px-3 py-1.5 text-xs font-medium text-zinc-600 shadow-sm ring-1 ring-zinc-950/[0.03] sm:text-sm">
                  {t}
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
          <p className={kicker}>Angebot &amp; Region</p>
          <h2
            id="ueber-interaktiv-heading"
            className="font-display mt-3 text-2xl font-semibold tracking-tight text-zinc-900 sm:text-[1.75rem]"
          >
            So erklären wir&apos;s — einmal mit Bild
          </h2>
          <p className="mt-6 text-pretty text-sm leading-relaxed text-zinc-600 sm:text-base">
            <strong className="font-medium text-zinc-800">Tipp:</strong> Mit der Maus über die{" "}
            <strong className="font-medium text-[#b45309]">orangefarbenen Begriffe</strong> im Text fahren — dann
            erscheint jeweils eine Vorschau. Auf dem Touchscreen stehen die Infos direkt im Fließtext.
          </p>
        </div>

        <div className="relative mt-14 rounded-[1.75rem] bg-gradient-to-b from-zinc-50/95 to-white p-6 ring-1 ring-zinc-200/60 sm:mt-16 sm:p-9 lg:p-10">
          <div
            className="pointer-events-none absolute inset-0 rounded-[1.75rem] bg-[radial-gradient(ellipse_70%_50%_at_50%_0%,rgba(198,90,32,0.04),transparent_65%)]"
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
            Genug gelesen?
          </h2>
          <p className="mt-5 text-pretty text-base leading-relaxed text-zinc-600">
            Wenn du tiefer einsteigen willst:{" "}
            <Link
              href="/ratgeber"
              className="font-semibold text-[#b45309] underline decoration-[#c65a20]/35 underline-offset-2 transition hover:text-[#9a3412] hover:decoration-[#c65a20]/55"
            >
              Ratgeber-Quiz
            </Link>
            . Sonst schreib uns — wir melden uns pragmatisch zurück.
          </p>
          <p className="mt-8">
            <a
              href="mailto:kontakt@evglab.com"
              className="inline-flex min-h-[2.75rem] items-center justify-center rounded-full border border-[rgba(224,122,64,0.5)] bg-gradient-to-b from-[rgba(255,245,235,0.95)] to-[rgba(254,231,210,0.75)] px-8 py-2.5 text-sm font-semibold text-[#9a3412] shadow-[var(--ui-shadow-accent)] transition-[transform,box-shadow] duration-200 hover:shadow-[var(--ui-shadow-accent-hover)] active:scale-[0.98]"
            >
              Jetzt Kontakt aufnehmen
            </a>
          </p>
        </div>
        </section>
      </ScrollReveal>

      <ScrollReveal softEntrance className="w-full">
        <section className="border-t border-zinc-200/80 bg-white/95 py-14 sm:py-16" aria-labelledby="ueber-kontakt-heading">
        <div className={cn(sectionShell, "max-w-3xl text-center")}>
          <p className={kicker}>Kontakt</p>
          <h2 id="ueber-kontakt-heading" className="font-display mt-3 text-xl font-semibold text-zinc-900 sm:text-2xl">
            Direkt loslegen
          </h2>
          <p className="mt-5 text-pretty text-base leading-relaxed text-zinc-600">
            Fragen zu Paketen, Abos oder Zeitplan? Schreib uns an{" "}
            <a href="mailto:kontakt@evglab.com" className="font-semibold text-[#b45309] underline-offset-2 hover:underline">
              kontakt@evglab.com
            </a>{" "}
            oder nutze die Kanäle hier:
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
