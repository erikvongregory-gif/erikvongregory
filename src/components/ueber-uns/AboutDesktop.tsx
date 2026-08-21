"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import {
  DELIVERY_ROWS,
  DACH_MAP_CITIES_DESKTOP,
  DACH_FOCUS_ROWS,
  HERO_STATS,
  HERO_TAGS,
  HUGO_HELPS,
  HUGO_MESSAGES_DESKTOP,
  HUGO_REFERS,
  KAPITEL,
  KONTAKT_KANAALE,
  SATZ_TAGS,
  type Kapitel,
} from "@/content/about";
import { DarkGlowBg, DachMapSvg, FounderPortraitCard, HugoChatMockup } from "@/components/ueber-uns/AboutShared";
import { DesktopContainer } from "@/components/desktop/DesktopContainer";
import { DesktopRevealItem, DesktopRevealStagger, useDesktopHeroReady } from "@/components/desktop/DesktopReveal";
import { useFreeTrialDemo } from "@/context/FreeTrialDemoContext";
import { SITE } from "@/lib/siteConfig";
import { cn } from "@/lib/utils";

function SectionEyebrow({ children, dark }: { children: ReactNode; dark?: boolean }) {
  return (
    <p className="mb-4 flex items-center gap-3 font-mono-hero text-[11px] uppercase tracking-[1.4px] text-amber">
      <span className={cn("h-px w-7 shrink-0", dark ? "bg-amber2/50" : "bg-amber")} aria-hidden />
      {children}
    </p>
  );
}

function KapitelCard({ ch }: { ch: Kapitel }) {
  return (
    <article>
      <div className="mb-6 flex items-baseline gap-[18px]">
        <span className="font-serif-hero text-[88px] font-light italic leading-[0.85] tracking-[-2px] text-amber">
          {ch.n}
        </span>
        <span className="flex-1 border-b border-ink/12 pb-2 font-mono-hero text-[11px] uppercase tracking-[1.3px] text-ink3">
          {ch.kicker}
        </span>
      </div>
      <h3 className="font-serif-hero text-[36px] font-medium leading-[1.05] tracking-[-1px] text-ink">
        {ch.head}
        <br />
        <span className="font-normal italic text-ink3">{ch.headItalic}</span>
      </h3>
      <p className="mb-6 mt-4 text-[15.5px] leading-[1.6] text-ink2">{ch.body}</p>
      {ch.proof.kind === "pillars" && (
        <div className="rounded-xl border border-ink/10 bg-white p-4">
          <p className="mb-3 font-mono-hero text-[10px] uppercase tracking-wider text-ink3">{ch.proof.title}</p>
          <ul className="space-y-2.5">
            {ch.proof.items.map(([label, meta]) => (
              <li key={label} className="flex justify-between gap-4">
                <span className="font-serif-hero text-[17px] text-ink">{label}</span>
                <span className="font-mono-hero text-[10.5px] text-ink3">{meta}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
      {ch.proof.kind === "list" && (
        <ul className="space-y-2">
          {ch.proof.items.map((item) => (
            <li key={item} className="grid grid-cols-[20px_1fr] gap-2 text-[15px] text-ink2">
              <span className="font-mono-hero text-amber">→</span>
              {item}
            </li>
          ))}
        </ul>
      )}
      {ch.proof.kind === "stat" && (
        <div className="inline-flex items-baseline gap-4 rounded-xl border border-ink/10 bg-white px-[22px] py-[14px]">
          <span className="font-serif-hero text-[56px] font-medium tracking-[-1.4px] text-amber">{ch.proof.value}</span>
          <span className="max-w-[140px] font-mono-hero text-[10.5px] uppercase leading-snug tracking-wider text-ink3">
            {ch.proof.label}
          </span>
        </div>
      )}
    </article>
  );
}

export function AboutDesktop() {
  const heroReady = useDesktopHeroReady();
  const { open: openFreeTrialDemo } = useFreeTrialDemo();

  return (
    <div className="about-root bg-paper text-ink">
      <main className="pt-[68px]">
        <section
          id="about-hero"
          aria-labelledby="about-hero-h1"
          className={cn(
            "relative overflow-hidden bg-[#15110C] text-paper",
            heroReady && "desktop-hero--ready",
          )}
        >
          <div id="ueber-intro" className="scroll-mt-28" aria-hidden />
          <DarkGlowBg />
          <DesktopContainer>
            <DesktopRevealItem delay={0}>
              <div className="grid grid-cols-3 gap-4 border-b border-[rgba(244,239,230,0.08)] py-6 pb-14 font-mono-hero text-[11px] uppercase tracking-[1.4px] text-[#8C7E68]">
                <span>BrewAI · Über uns · №07</span>
                <span className="text-center">Brauereien · Gastro · Getränke · DACH</span>
                <span className="flex items-center justify-end gap-2">
                  <span className="evg-live-dot h-1.5 w-1.5 rounded-full bg-amber2" aria-hidden />
                  Marke & Team · Mai 26
                </span>
              </div>
            </DesktopRevealItem>
            <div className="grid grid-cols-[1.05fr_1fr] items-start gap-[72px] pb-[100px] pt-20">
              <div>
                <DesktopRevealItem delay={90}>
                  <p className="mb-7 flex items-center gap-2.5 font-mono-hero text-[11px] uppercase tracking-[1.2px] text-[#8C7E68]">
                    <span className="h-1.5 w-1.5 rounded-full bg-amber" aria-hidden />
                    Marke & Team · Geschichte
                  </p>
                </DesktopRevealItem>
                <DesktopRevealItem delay={180}>
                  <h1 id="about-hero-h1" className="font-serif-hero text-[96px] font-normal leading-[0.98] tracking-[-3.6px]">
                    KI-Marketing
                    <br />
                    mit{" "}
                    <em className="border-b-[3px] border-amber pb-[2px] font-medium italic text-amber2">Substanz</em>.
                    <br />
                    Für Brauereien.
                  </h1>
                </DesktopRevealItem>
                <DesktopRevealItem delay={280}>
                  <p className="mt-9 max-w-[480px] font-sans-tight text-[19px] leading-[1.55] text-[#C8BFAD]">
                    Kein Agentur-Baukasten — sondern klare Lieferobjekte und ein Setup, das zu{" "}
                    <em className="italic text-[#E8DFCB]">eurem Tempo</em> passt. In Deutschland, Österreich und der
                    Schweiz.
                  </p>
                </DesktopRevealItem>
                <DesktopRevealItem delay={380}>
                  <ul className="mt-9 flex flex-wrap gap-2">
                    {HERO_TAGS.map((tag) => (
                      <li
                        key={tag}
                        className="rounded-full border border-[rgba(244,239,230,0.18)] px-3.5 py-2 font-mono-hero text-[11.5px] uppercase tracking-[0.8px] text-[#C8BFAD]"
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>
                </DesktopRevealItem>
                <div className="mt-16 grid grid-cols-4 gap-6 border-t border-[rgba(244,239,230,0.08)] pt-7">
                  {HERO_STATS.map(([v, l], i) => (
                    <DesktopRevealItem key={l} delay={480 + i * 75}>
                      <div>
                        <p className="font-serif-hero text-[30px] font-medium tracking-[-0.7px]">{v}</p>
                        <p className="mt-1 font-mono-hero text-[10.5px] uppercase tracking-[1.1px] text-[#8C7E68]">{l}</p>
                      </div>
                    </DesktopRevealItem>
                  ))}
                </div>
              </div>
              <DesktopRevealItem delay={320} from="right">
                <FounderPortraitCard />
              </DesktopRevealItem>
            </div>
          </DesktopContainer>
        </section>

        <section id="hintergrund" aria-labelledby="about-hintergrund-h2" className="scroll-mt-24 py-[120px]">
          <DesktopContainer>
            <DesktopRevealStagger className="grid grid-cols-[1fr_1.4fr] items-end gap-16 border-b border-ink/10 pb-14" softEntrance>
              <DesktopRevealItem>
                <div>
                  <SectionEyebrow>Hintergrund · Wie alles anfing</SectionEyebrow>
                  <h2 id="about-hintergrund-h2" className="font-serif-hero text-[80px] font-normal leading-[0.98] tracking-[-2.4px]">
                    Was steckt
                    <br />
                    hinter <em className="italic text-amber">BrewAI</em>?
                  </h2>
                </div>
              </DesktopRevealItem>
              <DesktopRevealItem>
                <p className="max-w-[540px] justify-self-end text-[19px] leading-[1.55] text-ink2">
                  Eine Frage am Anfang — und ein konsequenter Aufbau drumherum. Heute: fertige Assets, nachvollziehbare
                  Pakete und ein Dashboard mit Token-Abo für Teams mit laufendem Bedarf.
                </p>
              </DesktopRevealItem>
            </DesktopRevealStagger>
            <DesktopRevealStagger className="grid grid-cols-[1fr_1.4fr] items-start gap-16 pt-[72px]" staggerMs={100}>
              <DesktopRevealItem>
                <div>
                  <p className="mb-4 font-mono-hero text-[11px] uppercase tracking-wider text-ink3">Die Ursprungsfrage</p>
                  <blockquote className="font-serif-hero text-[36px] font-normal italic leading-[1.12] tracking-[-0.9px] text-ink">
                    Wie bekommen Brauereien schneller <span className="text-amber">gute Werbemotive</span> — ohne dass
                    jedes Bild Wochen an interner Kapazität frisst?
                  </blockquote>
                </div>
              </DesktopRevealItem>
              <DesktopRevealItem>
                <div>
                  <p className="text-[16.5px] leading-[1.65] text-ink2">
                    KI ist dafür das Werkzeug — aber nur, wenn Briefing, Markenprofil und Freigaben sauber sitzen. Daraus
                    entstand BrewAI: kein generischer KI-Wrapper, kein Agentur-Baukasten.
                  </p>
                  <p className="mt-5 text-[16.5px] leading-[1.65] text-ink2">
                    Heute bündeln wir genau das: fertige Assets, nachvollziehbare Pakete — und für Teams mit laufendem
                    Bedarf ein Dashboard mit Token-Abo. Immer mit dem Ziel, dass ihr sichtbar bleibt, wo Flasche, Gastro
                    und Saison zählen.
                  </p>
                  <div className="mt-8 rounded-[14px] border border-ink/10 bg-white p-[20px_22px]">
                    <p className="mb-4 font-mono-hero text-[10px] uppercase tracking-wider text-ink3">
                      Wie BrewAI heute liefert
                    </p>
                    <ul className="space-y-3">
                      {DELIVERY_ROWS.map(([k, v]) => (
                        <li key={k} className="grid grid-cols-[90px_1fr_8px] items-center gap-2">
                          <span className="font-mono-hero text-[11px] text-amber">{k}</span>
                          <span className="font-serif-hero text-[17px] text-ink">{v}</span>
                          <span className="h-1.5 w-1.5 justify-self-end rounded-full bg-amber" aria-hidden />
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </DesktopRevealItem>
            </DesktopRevealStagger>
          </DesktopContainer>
        </section>

        <section aria-labelledby="about-kapitel-h2" className="border-t border-ink/10 py-[140px]">
          <DesktopContainer>
            <DesktopRevealStagger className="grid grid-cols-[1fr_1.4fr] items-end gap-16 border-b border-ink/10 pb-14" softEntrance>
              <DesktopRevealItem>
                <div>
                  <SectionEyebrow>Drei Kapitel · 03 Punkte</SectionEyebrow>
                  <h2 id="about-kapitel-h2" className="font-serif-hero text-[72px] font-normal leading-[0.98] tracking-[-2px]">
                    Was uns trägt —
                    <br />
                    in drei <em className="italic text-amber">Sätzen</em>.
                  </h2>
                </div>
              </DesktopRevealItem>
              <DesktopRevealItem>
                <p className="max-w-[520px] text-[17px] leading-[1.55] text-ink2">
                  Haltung, Klientel, Richtung — ohne Marketing-Lyrik. Wer das liest, soll in 90 Sekunden wissen, ob BrewAI
                  zur eigenen Brauerei passt.
                </p>
              </DesktopRevealItem>
            </DesktopRevealStagger>
            <DesktopRevealStagger className="grid grid-cols-3 gap-12 pt-[72px]" staggerMs={120}>
              {KAPITEL.map((ch) => (
                <DesktopRevealItem key={ch.n}>
                  <KapitelCard ch={ch} />
                </DesktopRevealItem>
              ))}
            </DesktopRevealStagger>
          </DesktopContainer>
        </section>

        <section id="about-hugo" aria-labelledby="about-hugo-h2" className="relative overflow-hidden bg-[#0F0C08] py-[120px] text-paper">
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center" aria-hidden>
            <div className="h-[50%] w-[50%] rounded-full bg-amber/5 blur-[100px]" />
          </div>
          <DesktopContainer className="relative">
            <DesktopRevealStagger className="flex items-end justify-between gap-16 border-b border-[rgba(244,239,230,0.08)] pb-16" softEntrance>
              <DesktopRevealItem>
                <div>
                  <SectionEyebrow dark>Dashboard · Hopfen Hugo</SectionEyebrow>
                  <h2 id="about-hugo-h2" className="font-serif-hero text-[72px] font-normal leading-[0.98] tracking-[-2px]">
                    Hopfen Hugo —
                    <br />
                    euer <em className="italic text-amber2">Chat-Assistent</em>
                    <br />
                    für KI-Bilder.
                  </h2>
                </div>
              </DesktopRevealItem>
              <DesktopRevealItem>
                <p className="max-w-[420px] text-[15px] leading-[1.6] text-[#C8BFAD]">
                  Speziell für KI-Bildgenerierung im BrewAI-Dashboard — Prompts, Motive, Stil, Varianten, Formate und
                  Tokens. Keine Rezepte, kein Sudhaus-Wissen.{" "}
                  <em className="italic text-[#E8DFCB]">Bleibt fokussiert</em> auf das, was wir liefern.
                </p>
              </DesktopRevealItem>
            </DesktopRevealStagger>
            <DesktopRevealStagger className="grid grid-cols-[1fr_1.05fr] items-start gap-[72px] pt-[72px]" staggerMs={110}>
              <DesktopRevealItem>
                <div>
                <p className="mb-[18px] font-mono-hero text-[10px] uppercase tracking-wider text-[#8C7E68]">
                  Wofür Hugo da ist · Wofür nicht
                </p>
                <div className="overflow-hidden rounded-2xl border border-[#2C2519] bg-[#1A150E]">
                  <div className="p-[22px_24px]">
                    <p className="mb-4 flex items-center gap-2 font-mono-hero text-[10px] uppercase text-amber2">
                      <span className="h-1.5 w-1.5 rounded-full bg-amber2" aria-hidden />
                      Hilft bei
                    </p>
                    <ul className="space-y-2">
                      {HUGO_HELPS.map((item) => (
                        <li key={item} className="grid grid-cols-[20px_1fr] gap-2 text-[15px] text-[#E8DFCB]">
                          <span className="font-mono-hero text-amber2">→</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="h-px bg-[#2C2519]" />
                  <div className="p-[22px_24px]">
                    <p className="mb-4 flex items-center gap-2 font-mono-hero text-[10px] uppercase text-[#8C7E68]">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#5E5443]" aria-hidden />
                      Verweist dich klar weiter bei
                    </p>
                    <ul className="space-y-2">
                      {HUGO_REFERS.map((item) => (
                        <li
                          key={item}
                          className="grid grid-cols-[20px_1fr] gap-2 text-[15px] text-[#8C7E68] line-through decoration-[#5E5443]"
                        >
                          <span>→</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <p className="mt-6 text-[15.5px] leading-[1.6] text-[#C8BFAD]">
                  So bleibt der Fokus auf dem, was BrewAI liefert — schnell nutzbare Bilder für Social, Kampagne und
                  Außenauftritt.
                </p>
                <button
                  type="button"
                  onClick={() => openFreeTrialDemo()}
                  className="mt-7 inline-flex items-center gap-2 rounded-xl bg-amber px-6 py-3.5 font-sans-tight text-sm font-semibold text-[#15110C] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-amber"
                >
                  Chat mit Hopfen Hugo öffnen →
                </button>
                </div>
              </DesktopRevealItem>
              <DesktopRevealItem from="right">
                <HugoChatMockup messages={HUGO_MESSAGES_DESKTOP} />
              </DesktopRevealItem>
            </DesktopRevealStagger>
          </DesktopContainer>
        </section>

        <section aria-labelledby="about-satz-h2" className="py-[140px]">
          <DesktopContainer className="max-w-[1080px]">
            <DesktopRevealStagger className="text-center" softEntrance staggerMs={90}>
              <DesktopRevealItem>
                <p className="mb-8 flex items-center justify-center gap-3.5 font-mono-hero text-[11px] uppercase tracking-[1.4px] text-amber">
                  <span className="h-px w-12 bg-amber/40" aria-hidden />
                  BrewAI in einem Satz
                  <span className="h-px w-12 bg-amber/40" aria-hidden />
                </p>
              </DesktopRevealItem>
              <DesktopRevealItem>
                <blockquote
                  id="about-satz-h2"
                  className="text-center font-serif-hero text-[60px] font-normal leading-[1.06] tracking-[-1.6px]"
                >
                  Wir übersetzen eure Marke
                  <br />
                  in <em className="font-medium italic text-amber">Bilder, Texte und Videos</em>,
                  <br />
                  die im Alltag funktionieren.
                </blockquote>
              </DesktopRevealItem>
              <DesktopRevealItem>
                <p className="mx-auto mt-9 max-w-[640px] text-center text-[17.5px] leading-[1.55] text-ink2">
                  Schnell genug für Social, stark genug für Kampagnen und Clips. Was uns wichtig ist: dass ihr euch
                  verstanden fühlt und am Ende Assets habt, die wirklich einsetzbar sind — nicht nur „nice" aussehen.
                </p>
              </DesktopRevealItem>
              <DesktopRevealItem>
                <ul className="mt-12 flex flex-wrap justify-center gap-2.5">
                  {SATZ_TAGS.map((t) => (
                    <li
                      key={t}
                      className="rounded-full border border-ink/14 bg-white px-[18px] py-2.5 font-mono-hero text-[12px] uppercase text-ink2"
                    >
                      {t}
                    </li>
                  ))}
                </ul>
              </DesktopRevealItem>
            </DesktopRevealStagger>
          </DesktopContainer>
        </section>

        <section aria-labelledby="about-region-h2" className="border-t border-ink/10 bg-paper2 py-[140px]">
          <DesktopContainer>
            <DesktopRevealStagger className="grid grid-cols-[1fr_1.4fr] items-end gap-16 border-b border-ink/10 pb-14" softEntrance>
              <DesktopRevealItem>
                <div>
                  <SectionEyebrow>Angebot & Region · DACH</SectionEyebrow>
                  <h2 id="about-region-h2" className="font-serif-hero text-[72px] font-normal leading-[0.98] tracking-[-2px]">
                    Drei Länder.
                    <br />
                    <em className="italic text-amber">Eine</em> Sprache
                    <br />
                    fürs Bier.
                  </h2>
                </div>
              </DesktopRevealItem>
              <DesktopRevealItem>
                <p className="text-[17px] leading-[1.55] text-ink2">
                  BrewAI unterstützt Brauereien und Getränkemarken in Deutschland, Österreich und der Schweiz — mit
                  KI-Werbebildern, die zu Flasche, Gastro und Saison passen.
                </p>
              </DesktopRevealItem>
            </DesktopRevealStagger>
            <div className="grid grid-cols-2 gap-14 pt-[72px]">
              <DesktopRevealStagger className="space-y-[18px]" staggerMs={100}>
                {[
                  {
                    kicker: "Premium-Pakete",
                    title: "Der ruhige Weg.",
                    body: "Wenig interne Zeit, klare Lieferobjekte — Briefing, Umsetzung, fertige Assets.",
                    meta: "Briefing → Lieferung · einmalig oder im Quartal",
                  },
                  {
                    kicker: "Dashboard · Token-Abo",
                    title: "Für regelmäßigen Output.",
                    body: "Teams mit laufendem Bedarf steigen ins Dashboard ein — schnell, planbar, mit Markenprofil im Hintergrund.",
                    meta: "Tokens / Monat · monatlich kündbar",
                  },
                ].map((card) => (
                  <DesktopRevealItem key={card.kicker}>
                    <div className="rounded-2xl border border-ink/10 bg-white p-[24px_26px]">
                      <p className="font-mono-hero text-[11px] uppercase tracking-wider text-amber">{card.kicker}</p>
                      <h3 className="mt-2 font-serif-hero text-[28px] font-medium text-ink">{card.title}</h3>
                      <p className="mt-3 text-[15px] leading-relaxed text-ink2">{card.body}</p>
                      <p className="mt-4 border-t border-ink/10 pt-4 font-mono-hero text-[10px] uppercase tracking-wider text-ink3">
                        {card.meta}
                      </p>
                    </div>
                  </DesktopRevealItem>
                ))}
              </DesktopRevealStagger>
              <DesktopRevealStagger staggerMs={110}>
                <DesktopRevealItem>
                <div className="rounded-2xl border border-ink/10 bg-white p-[22px]">
                  <div className="mb-4 flex justify-between font-mono-hero text-[10px] uppercase tracking-wider text-ink3">
                    <span>Fokus · DACH</span>
                    <span className="text-amber">Pilotphase · Q2 26</span>
                  </div>
                  <div className="relative aspect-[16/10] overflow-hidden rounded-[10px] bg-[repeating-linear-gradient(45deg,#F4EFE6_0_8px,#EAE3D5_8px_9px)]">
                    <DachMapSvg cities={DACH_MAP_CITIES_DESKTOP} />
                  </div>
                  <div className="mt-4 flex justify-between font-mono-hero text-[10.5px] uppercase text-ink3">
                    <span className="flex items-center gap-1.5">
                      <span className="h-1.5 w-1.5 rounded-full bg-amber" aria-hidden />
                      Beispiel · Fokusstadt
                    </span>
                    <span>Keine Kundenliste</span>
                  </div>
                </div>
                <div className="mt-[18px] overflow-hidden rounded-2xl border border-ink/10 bg-white">
                  <div className="grid grid-cols-[38px_1fr_1fr_120px] gap-3 border-b border-ink/[0.06] bg-paper/60 px-[18px] py-2.5 font-mono-hero text-[9px] uppercase tracking-wider text-ink3">
                    <span>Land</span>
                    <span>Beispielstadt</span>
                    <span>Region</span>
                    <span className="text-right">Typisch</span>
                  </div>
                  {DACH_FOCUS_ROWS.map((row, i) => (
                    <div
                      key={row.stadt}
                      className={cn(
                        "grid grid-cols-[38px_1fr_1fr_120px] gap-3 px-[18px] py-3 text-sm",
                        i > 0 && "border-t border-ink/[0.04]",
                      )}
                    >
                      <span className="font-mono-hero text-[11px] text-ink3">{row.cc}</span>
                      <span className="font-serif-hero text-[17px] text-ink">{row.stadt}</span>
                      <span className="font-sans-tight text-[13.5px] text-ink3">{row.region}</span>
                      <span
                        className={cn(
                          "text-right font-mono-hero text-[10px] uppercase leading-snug",
                          row.angebot === "Premium" ? "text-amber" : "text-ink3",
                        )}
                      >
                        {row.angebot === "Premium" ? "Premium · Briefing" : "Dashboard · Abo"}
                      </span>
                    </div>
                  ))}
                  <p className="border-t border-ink/[0.06] px-[18px] py-3 font-sans-tight text-[12px] leading-relaxed text-ink3">
                    Orientierung, welches Modell in welcher Region meist passt — noch ohne öffentliche Referenzkunden.
                  </p>
                </div>
                </DesktopRevealItem>
              </DesktopRevealStagger>
            </div>
          </DesktopContainer>
        </section>

        <section id="about-closing" aria-labelledby="about-closing-h2" className="bg-[#15110C] py-[120px] text-paper">
          <div id="contact" className="scroll-mt-24" aria-hidden />
          <DesktopContainer>
            <DesktopRevealStagger className="grid grid-cols-[1.4fr_1fr] gap-16 border-b border-[rgba(244,239,230,0.08)] pb-16" softEntrance staggerMs={100}>
              <DesktopRevealItem>
                <div>
                  <p className="mb-6 flex items-center gap-3 font-mono-hero text-[11px] uppercase tracking-[1.4px] text-amber2">
                    <span className="h-px w-8 bg-amber2/50" aria-hidden />
                    Genug gelesen?
                  </p>
                  <h2 id="about-closing-h2" className="font-serif-hero text-[56px] font-normal leading-[0.98] tracking-[-1.6px]">
                    Tiefer einsteigen oder direkt <em className="italic text-amber2">schreiben</em>?
                  </h2>
                  <p className="mt-6 max-w-[560px] text-[15px] leading-[1.6] text-[#C8BFAD]">
                    Wenn du sortieren willst, was zu deiner Brauerei passt: Ratgeber-Quiz. Sonst schreib uns — wir melden
                    uns pragmatisch zurück.
                  </p>
                  <div className="mt-8 flex flex-wrap gap-3">
                    <Link
                      href="/ratgeber"
                      className="inline-flex items-center rounded-xl bg-amber px-6 py-3.5 font-sans-tight text-sm font-semibold text-[#15110C] shadow-[inset_0_1px_0_rgba(255,255,255,0.18),0_12px_28px_-10px_rgba(199,105,30,0.4)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-amber"
                    >
                      Ratgeber-Quiz starten →
                    </Link>
                    <a
                      href={SITE.contactMailto}
                      className="inline-flex items-center rounded-xl border border-[rgba(244,239,230,0.18)] px-6 py-3.5 font-sans-tight text-sm font-medium text-paper focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-amber"
                    >
                      Kontakt aufnehmen
                    </a>
                  </div>
                </div>
              </DesktopRevealItem>
              <DesktopRevealItem>
                <div>
                  <p className="mb-4 font-mono-hero text-[10px] uppercase tracking-wider text-[#8C7E68]">Direkt schreiben</p>
                  <div className="space-y-2">
                    {KONTAKT_KANAALE.map((k) => (
                      <a
                        key={k.kanal}
                        href={k.href}
                        aria-label={k.ariaLabel}
                        className="grid grid-cols-[110px_1fr_auto] items-center gap-3 rounded-xl border border-[#2C2519] bg-[#1A150E] p-[16px_18px] transition-[background-color,border-color] duration-150 hover:border-[#3A3327] hover:bg-[#1F1A13] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-amber"
                      >
                        <span className="font-mono-hero text-[11px] text-amber2">{k.kanal}</span>
                        <span className="font-serif-hero text-[19px]">{k.wert}</span>
                        <span className="font-mono-hero text-[10.5px] uppercase text-[#8C7E68]">{k.meta}</span>
                      </a>
                    ))}
                  </div>
                </div>
              </DesktopRevealItem>
            </DesktopRevealStagger>
            <DesktopRevealStagger className="flex justify-between pt-8 font-mono-hero text-[11px] uppercase tracking-wider text-[#8C7E68]" staggerMs={70}>
              <DesktopRevealItem>
                <span className="text-[#C8BFAD]">BrewAI · KI-Marketing für Brauereien · Hosting · DE</span>
              </DesktopRevealItem>
              <DesktopRevealItem>
                <span>© 2026 · Alle Rechte vorbehalten</span>
              </DesktopRevealItem>
            </DesktopRevealStagger>
          </DesktopContainer>
        </section>
      </main>
    </div>
  );
}
