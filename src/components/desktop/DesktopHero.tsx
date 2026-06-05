"use client";



import Image from "next/image";

import { APP_DISPLAY_HOST } from "@/lib/appLoginUrl";
import { useFreeTrialDemo } from "@/context/FreeTrialDemoContext";

import { scrollToSection } from "@/lib/scrollToSection";

import { KI_HERO_MOCKUP_THUMBS } from "@/lib/kiBeispiele";

import { DesktopContainer } from "@/components/desktop/DesktopContainer";

import { DesktopRevealItem, useDesktopHeroReady } from "@/components/desktop/DesktopReveal";

import { cn } from "@/lib/utils";



function PlayTriangle() {

  return (

    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden className="shrink-0">

      <path d="M3 2 L10 6 L3 10 Z" fill="currentColor" />

    </svg>

  );

}



const TRUST_STATS = [

  { value: "Ø 42s", label: "pro Motiv" },

  { value: "12+", label: "Brauereien" },

  { value: "100%", label: "Brauerei-Fokus" },

  { value: "DSGVO", label: "Hosting · DE" },

] as const;



export function DesktopHero() {

  const heroReady = useDesktopHeroReady();
  const { open: openFreeTrialDemo } = useFreeTrialDemo();



  return (

    <section

      id="desktop-hero"

      aria-labelledby="desktop-hero-heading"

      data-section="start"

      className={cn("relative overflow-hidden bg-[#15110C] text-paper", heroReady && "desktop-hero--ready")}

    >

      <div className="pointer-events-none absolute inset-0" aria-hidden>

        <div className="absolute -right-[20%] -top-[30%] h-[70%] w-[70%] rounded-full bg-amber/10 blur-[120px]" />

        <div className="absolute -bottom-[25%] -left-[15%] h-[55%] w-[55%] rounded-full bg-amber2/8 blur-[100px]" />

      </div>



      <DesktopContainer>

        <DesktopRevealItem delay={0}>

          <div className="grid grid-cols-3 gap-4 border-b border-[rgba(244,239,230,0.08)] py-6 pb-14 font-mono-hero text-[11px] uppercase tracking-[1.4px] text-[#8C7E68]">

            <span>EvGlab · Ausgabe №07</span>

            <span className="text-center">Für Brauereien · Gastro · Getränke · Mai 26</span>

            <span className="flex items-center justify-end gap-2">

              <span className="evg-live-dot h-1.5 w-1.5 rounded-full bg-amber" aria-hidden />

              Live · v2.4

            </span>

          </div>

        </DesktopRevealItem>



        <div className="grid grid-cols-[1.05fr_1fr] items-start gap-[72px] pt-[72px] pb-[100px]">

          <div>

            <DesktopRevealItem delay={90}>

              <p className="mb-7 flex items-center gap-2.5 font-mono-hero text-[11px] uppercase tracking-[1.2px] text-[#8C7E68]">

                <span className="h-1.5 w-1.5 rounded-full bg-amber" aria-hidden />

                KI-Content · Live demo · Probier&apos;s selbst

              </p>

            </DesktopRevealItem>



            <DesktopRevealItem delay={180}>

              <h1

                id="desktop-hero-heading"

                className="font-serif-hero text-[96px] font-normal leading-[0.98] tracking-[-3.6px] text-paper"

              >

                Beschreib

                <br />

                dein{" "}

                <span className="border-b-[3px] border-amber pb-1">Bier</span>.

                <br />

                <em className="font-medium italic text-amber2">Bekomm</em> drei Motive.

              </h1>

            </DesktopRevealItem>



            <DesktopRevealItem delay={280}>

              <p className="mt-9 max-w-[460px] font-sans-tight text-lg leading-[1.5] text-[#C8BFAD]">

                Produktfotos, Kampagnenmotive und Social-Content — generiert in{" "}

                <em className="italic text-[#E8DFCB]">deinem</em> Markenstil. Kein Studio, keine Wartezeit, kein

                Grafikdesigner.

              </p>

            </DesktopRevealItem>



            <DesktopRevealItem delay={380}>

              <div className="mt-9 flex flex-wrap items-center gap-3">

                <button

                  type="button"

                  onClick={() => openFreeTrialDemo()}

                  className="inline-flex items-center gap-3 rounded-xl bg-amber px-6 py-[17px] text-[15.5px] font-bold text-[#15110C] shadow-[inset_0_1px_0_rgba(255,255,255,0.18),0_12px_28px_-10px_rgba(199,105,30,0.4)] transition hover:brightness-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-amber focus-visible:rounded"

                >

                  3 Bilder kostenlos generieren

                  <span className="rounded-md bg-[#15110C]/15 px-2 py-0.5 font-mono-hero text-[10px] font-medium uppercase tracking-wider">

                    FREE · 3/3

                  </span>

                </button>

                <button

                  type="button"

                  onClick={() => scrollToSection("#beispiele")}

                  className="inline-flex items-center gap-2.5 rounded-xl border border-[rgba(244,239,230,0.18)] px-5 py-[17px] font-sans-tight text-[15px] font-medium text-paper transition hover:bg-[rgba(244,239,230,0.06)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-amber"

                >

                  <PlayTriangle />

                  Beispiele aus Brauereien

                </button>

              </div>

            </DesktopRevealItem>



            <DesktopRevealItem delay={460}>

              <p className="mt-5 font-mono-hero text-[11px] text-[#6F6552]">

                Keine Kreditkarte · 100% in deinem Markenstil · Hosting in DE

              </p>

            </DesktopRevealItem>



            <div className="mt-16 grid grid-cols-4 gap-6 border-t border-[rgba(244,239,230,0.08)] pt-7">
              {TRUST_STATS.map((s, i) => (
                <DesktopRevealItem key={s.label} delay={520 + i * 75}>
                  <div>
                    <p className="font-serif-hero text-[30px] font-medium tracking-[-0.7px] text-paper">{s.value}</p>
                    <p className="mt-1 font-mono-hero text-[10.5px] uppercase tracking-wider text-[#8C7E68]">{s.label}</p>
                  </div>
                </DesktopRevealItem>
              ))}
            </div>

          </div>



          <DesktopRevealItem delay={320} from="right">

            <div className="relative">

              <GeneratorMockup />

            </div>

          </DesktopRevealItem>

        </div>

      </DesktopContainer>

    </section>

  );

}



function GeneratorMockup() {

  const thumbs = [...KI_HERO_MOCKUP_THUMBS];



  return (

    <div className="relative">

      <div className="rounded-[18px] border border-[#2C2519] bg-gradient-to-b from-[#1F1A13] to-[#1A1610] p-[18px] shadow-[0_30px_80px_-30px_rgba(0,0,0,0.7),0_14px_40px_-20px_rgba(199,105,30,0.18)]">

        <div className="mb-3 flex items-center justify-between gap-3 font-mono-hero text-[10px] text-[#8C7E68]">

          <span className="flex gap-1.5" aria-hidden>

            <span className="h-2.5 w-2.5 rounded-full bg-[#3d3428]" />

            <span className="h-2.5 w-2.5 rounded-full bg-[#3d3428]" />

            <span className="h-2.5 w-2.5 rounded-full bg-[#3d3428]" />

          </span>

          <span className="flex-1 text-center">{APP_DISPLAY_HOST}</span>

          <span className="text-[#A89B83]">Marke: Lüne Bräu · 330ml long Neck</span>

        </div>



        <div className="rounded-xl border border-[#2C2519] bg-[#15110C] p-4">

          <div className="mb-2 flex items-center justify-between font-mono-hero text-[10px] uppercase tracking-wider text-[#8C7E68]">

            <span>PROMPT · 01</span>

            <span>EN ↔ DE</span>

          </div>

          <p className="font-sans-tight text-[15px] leading-[1.5] text-[#E8DFCB]">

            Zwei 9:16-Varianten <em className="italic text-amber2">330ml long Neck</em>: Mann mit Flasche am Strand, warmes

            Abendlicht · Produktfoto mit Zitrone, Hopfen und leichten Kondenstropfen, neutraler Hintergrund

            <span className="evg-cursor ml-0.5 inline-block h-[1.1em] w-[2px] translate-y-0.5 bg-amber align-middle" aria-hidden />

          </p>

          <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-[#2C2519] pt-3">

            <div className="flex flex-wrap gap-1.5">

              {["9:16", "4:5", "1:1", "16:9"].map((f) => (

                <span

                  key={f}

                  className={cn(

                    "rounded-md px-2 py-1 font-mono-hero text-[10px]",

                    f === "9:16" ? "bg-amber text-[#15110C]" : "bg-[#2A2418] text-[#8C7E68]",

                  )}

                >

                  {f}

                </span>

              ))}

            </div>

            <div className="flex items-center gap-2">

              <span className="font-mono-hero text-[10px] text-[#8C7E68]">~42s</span>

              <span className="rounded-lg bg-amber px-3.5 py-2 font-sans-tight text-xs font-semibold text-[#15110C]">

                Generieren ↵

              </span>

            </div>

          </div>

        </div>



        <div className="mt-2.5 grid grid-cols-3 gap-2.5">

          {thumbs.map((img) => (

            <div key={img.src} className="relative h-[190px] overflow-hidden rounded-lg border border-[#2C2519]">

              <Image src={img.src} alt={img.alt} fill className="object-cover" sizes="200px" />

              <span className="absolute left-2 top-2 rounded bg-[#15110C]/80 px-1.5 py-0.5 font-mono-hero text-[9px] text-amber2">

                ✓ Fertig

              </span>

              <span className="absolute bottom-2 left-2 right-2 flex justify-between font-mono-hero text-[9px] text-[#8C7E68]">

                <span>42s · 1024×1820</span>

                <span className="text-amber2">Wählen</span>

              </span>

            </div>

          ))}

          <div className="relative flex h-[190px] flex-col items-center justify-center rounded-lg border border-dashed border-amber2/35 bg-[#15110C]/50">

            <span className="evg-spin mb-2 h-8 w-8 rounded-full border-2 border-amber2/30 border-t-amber2" aria-hidden />

            <span className="font-mono-hero text-[10px] uppercase text-[#8C7E68]">rendering</span>

            <span className="font-serif-hero text-3xl font-medium text-amber2">76%</span>

          </div>

        </div>



        <div className="mt-3 flex items-center justify-between font-mono-hero text-[10px] text-[#8C7E68]">

          <span>● Produktfoto · Kampagne · Social · Reels</span>

          <span>Tokens 47/100</span>

        </div>

      </div>



      <div className="absolute -bottom-7 -left-7 rotate-[-2.5deg]">
        <DesktopRevealItem delay={580} from="right">
          <div className="rounded-[14px] bg-paper p-[14px_18px] text-ink shadow-2xl">
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 shrink-0 rounded-lg bg-gradient-to-br from-amber to-amber2" aria-hidden />
              <div>
                <p className="font-mono-hero text-[9px] uppercase tracking-wider text-ink3">Markenstil aktiv</p>
                <p className="font-serif-hero text-base font-medium">Lüne Bräu</p>
              </div>
            </div>
          </div>
        </DesktopRevealItem>
      </div>

    </div>

  );

}


