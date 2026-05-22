"use client";

import Link from "next/link";
import {
  DELIVERY_ROWS,
  DACH_MAP_CITIES_MOBILE,
  HERO_STATS,
  HERO_TAGS,
  HUGO_HELPS,
  HUGO_MESSAGES_MOBILE,
  HUGO_REFERS,
  KAPITEL,
  KONTAKT_KANAALE,
  SATZ_TAGS,
} from "@/content/about";
import { ScrollRevealStagger } from "@/components/ScrollRevealStagger";
import { DarkGlowBg, DachMapSvg, FounderPortraitCard, HugoChatMockup } from "@/components/ueber-uns/AboutShared";
import { navigateToAppDashboard } from "@/lib/appLoginUrl";
import { cn } from "@/lib/utils";

function MobileEyebrow({ children }: { children: string }) {
  return (
    <p className="mb-3 flex items-center gap-2 font-mono-hero text-[10px] uppercase tracking-[1.3px] text-amber">
      <span className="h-px w-5 bg-amber" aria-hidden />
      {children}
    </p>
  );
}

export function AboutMobile() {
  return (
    <div className="about-root mobile-root bg-paper text-ink">
        <section id="about-hero" className="relative overflow-hidden bg-[#15110C] pb-10 pt-20 text-paper">
          <div id="ueber-intro" className="scroll-mt-24" aria-hidden />
          <DarkGlowBg />
          <ScrollRevealStagger className="relative px-[22px] pt-4" softEntrance staggerMs={75}>
            <div className="mobile-scroll-reveal-item border-b border-[rgba(244,239,230,0.08)] pb-6 font-mono-hero text-[9.5px] uppercase tracking-[1.2px] text-[#8C7E68]">
              <p>EvGlab · Über uns · №07</p>
              <p className="mt-1">Brauereien · DACH · Mai 26</p>
            </div>
            <p className="mobile-scroll-reveal-item mt-6 flex items-center gap-2 font-mono-hero text-[10px] uppercase text-[#8C7E68]">
              <span className="h-1 w-1 rounded-full bg-amber" aria-hidden />
              Marke & Team
            </p>
            <h1 className="mobile-scroll-reveal-item mt-4 font-serif-hero text-[44px] font-normal leading-[0.98] tracking-[-1.6px]">
              KI-Marketing
              <br />
              mit <em className="border-b-[3px] border-amber pb-0.5 font-medium italic text-amber2">Substanz</em>.
              <br />
              Für Brauereien.
            </h1>
            <p className="mobile-scroll-reveal-item mt-5 text-[15.5px] leading-[1.55] text-[#C8BFAD]">
              Kein Agentur-Baukasten — klare Lieferobjekte und ein Setup, das zu{" "}
              <em className="italic text-[#E8DFCB]">eurem Tempo</em> passt.
            </p>
            <ul className="mobile-scroll-reveal-item mt-6 flex flex-wrap gap-1.5">
              {HERO_TAGS.map((t) => (
                <li
                  key={t}
                  className="rounded-full border border-[rgba(244,239,230,0.18)] px-2.5 py-1.5 font-mono-hero text-[10px] uppercase text-[#C8BFAD]"
                >
                  {t}
                </li>
              ))}
            </ul>
            <div className="mobile-scroll-reveal-item mt-8">
              <FounderPortraitCard compact />
            </div>
            <div className="mobile-scroll-reveal-item mt-10 grid grid-cols-2 gap-4 border-t border-[rgba(244,239,230,0.08)] pt-6">
              {HERO_STATS.map(([v, l]) => (
                <div key={l}>
                  <p className="font-serif-hero text-2xl font-medium">{v}</p>
                  <p className="mt-0.5 font-mono-hero text-[9px] uppercase text-[#8C7E68]">{l}</p>
                </div>
              ))}
            </div>
          </ScrollRevealStagger>
        </section>

        <section id="hintergrund" className="scroll-mt-24 px-[22px] py-10">
          <ScrollRevealStagger softEntrance staggerMs={80}>
            <div className="mobile-scroll-reveal-item">
              <MobileEyebrow>Hintergrund</MobileEyebrow>
              <h2 className="font-serif-hero text-[36px] leading-[0.98] tracking-[-1px]">
                Was steckt hinter <em className="italic text-amber">EvGlab</em>?
              </h2>
            </div>
            <blockquote className="mobile-scroll-reveal-item mt-6 border-l-[3px] border-amber pl-4 font-serif-hero text-[21px] italic leading-snug text-ink">
              Wie bekommen Brauereien schneller <span className="text-amber">gute Werbemotive</span> — ohne Wochen
              interner Kapazität?
            </blockquote>
            <p className="mobile-scroll-reveal-item mt-5 text-[14.5px] leading-[1.65] text-ink2">
              KI ist das Werkzeug — wenn Briefing, Markenprofil und Freigaben sitzen. Daraus entstand EvGlab.
            </p>
            <p className="mobile-scroll-reveal-item mt-4 text-[14.5px] leading-[1.65] text-ink2">
              Heute: fertige Assets, Pakete und ein Dashboard mit Token-Abo für laufenden Bedarf.
            </p>
            <div className="mobile-scroll-reveal-item mt-6 rounded-[14px] border border-ink/10 bg-white p-4">
              <p className="mb-3 font-mono-hero text-[9px] uppercase text-ink3">Wie EvGlab heute liefert</p>
              <ul className="space-y-2">
                {DELIVERY_ROWS.map(([k, v]) => (
                  <li key={k} className="flex justify-between gap-2 text-sm">
                    <span className="font-mono-hero text-[10px] text-amber">{k}</span>
                    <span className="font-serif-hero text-[15px]">{v}</span>
                  </li>
                ))}
              </ul>
            </div>
          </ScrollRevealStagger>
        </section>

        <section className="border-t border-ink/10 px-[22px] py-10">
          <ScrollRevealStagger softEntrance staggerMs={75}>
            <div className="mobile-scroll-reveal-item">
              <MobileEyebrow>Drei Kapitel</MobileEyebrow>
              <h2 className="font-serif-hero text-[34px] leading-tight">
                Was uns trägt — in drei <em className="italic text-amber">Sätzen</em>.
              </h2>
            </div>
          </ScrollRevealStagger>
          <ScrollRevealStagger className="mt-8 space-y-7" staggerMs={90}>
            {KAPITEL.map((ch) => (
              <article key={ch.n} className="mobile-scroll-reveal-item">
                <div className="mb-2.5 flex items-baseline gap-3">
                  <span className="font-serif-hero text-[44px] font-light italic text-amber">{ch.n}</span>
                  <span className="flex-1 border-b border-ink/12 pb-1 font-mono-hero text-[10px] uppercase text-ink3">
                    {ch.kicker}
                  </span>
                </div>
                <h3 className="font-serif-hero text-[26px] font-medium leading-tight">
                  {ch.head} <span className="italic font-normal text-ink3">{ch.headItalic}</span>
                </h3>
                <p className="mt-3 text-[14.5px] leading-relaxed text-ink2">{ch.body}</p>
                {ch.proof.kind === "pillars" && (
                  <div className="mt-4 rounded-xl border border-ink/10 bg-white p-3">
                    <p className="mb-2 font-mono-hero text-[9px] uppercase text-ink3">{ch.proof.title}</p>
                    {ch.proof.items.map(([a, b]) => (
                      <p key={a} className="flex justify-between text-sm">
                        <span className="font-serif-hero">{a}</span>
                        <span className="font-mono-hero text-[9px] text-ink3">{b}</span>
                      </p>
                    ))}
                  </div>
                )}
                {ch.proof.kind === "list" && (
                  <ul className="mt-4 space-y-1 text-sm text-ink2">
                    {ch.proof.items.map((item) => (
                      <li key={item} className="grid grid-cols-[16px_1fr] gap-1">
                        <span className="text-amber">→</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
                {ch.proof.kind === "stat" && (
                  <div className="mt-4 inline-flex items-baseline gap-3 rounded-xl border border-ink/10 bg-white px-4 py-3">
                    <span className="font-serif-hero text-4xl font-medium text-amber">{ch.proof.value}</span>
                    <span className="font-mono-hero text-[9px] uppercase text-ink3">{ch.proof.label}</span>
                  </div>
                )}
              </article>
            ))}
          </ScrollRevealStagger>
        </section>

        <section id="about-hugo" className="bg-[#0F0C08] px-[22px] py-10 text-paper">
          <ScrollRevealStagger softEntrance staggerMs={80}>
            <div className="mobile-scroll-reveal-item">
              <MobileEyebrow>Hopfen Hugo</MobileEyebrow>
              <h2 className="font-serif-hero text-[36px] leading-tight">
                Euer <em className="italic text-amber2">Chat-Assistent</em> für KI-Bilder.
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-[#C8BFAD]">
                Prompts, Motive, Formate, Tokens — kein Sudhaus-Wissen.
              </p>
            </div>
            <div className="mobile-scroll-reveal-item mt-6 space-y-3 rounded-2xl border border-[#2C2519] bg-[#1A150E] p-4">
              <p className="font-mono-hero text-[9px] uppercase text-amber2">Hilft bei</p>
              <ul className="space-y-1.5 text-sm text-[#E8DFCB]">
                {HUGO_HELPS.slice(0, 4).map((x) => (
                  <li key={x}>→ {x}</li>
                ))}
              </ul>
              <p className="pt-2 font-mono-hero text-[9px] uppercase text-[#8C7E68]">Verweist weiter bei</p>
              <ul className="space-y-1 text-sm text-[#8C7E68] line-through">
                {HUGO_REFERS.map((x) => (
                  <li key={x}>→ {x}</li>
                ))}
              </ul>
            </div>
            <div className="mobile-scroll-reveal-item mt-6">
              <HugoChatMockup messages={HUGO_MESSAGES_MOBILE} compact />
            </div>
            <button
              type="button"
              onClick={() => navigateToAppDashboard()}
              className="mobile-scroll-reveal-item mt-6 w-full rounded-xl bg-amber py-3.5 font-sans-tight text-sm font-semibold text-[#15110C]"
            >
              Chat mit Hopfen Hugo öffnen →
            </button>
          </ScrollRevealStagger>
        </section>

        <section className="px-[22px] py-10 text-center">
          <ScrollRevealStagger softEntrance staggerMs={85}>
            <p className="mobile-scroll-reveal-item font-mono-hero text-[10px] uppercase tracking-wider text-amber">
              EvGlab in einem Satz
            </p>
            <blockquote className="mobile-scroll-reveal-item mt-5 font-serif-hero text-[30px] leading-snug tracking-tight">
              Wir übersetzen eure Marke in{" "}
              <em className="font-medium italic text-amber">Bilder, Texte und Videos</em>, die im Alltag funktionieren.
            </blockquote>
            <ul className="mobile-scroll-reveal-item mt-8 flex flex-wrap justify-center gap-2">
              {SATZ_TAGS.map((t) => (
                <li key={t} className="rounded-full border border-ink/14 bg-white px-3 py-1.5 font-mono-hero text-[10.5px] uppercase text-ink2">
                  {t}
                </li>
              ))}
            </ul>
          </ScrollRevealStagger>
        </section>

        <section className="bg-paper2 px-[22px] py-10">
          <ScrollRevealStagger softEntrance staggerMs={80}>
            <div className="mobile-scroll-reveal-item">
              <MobileEyebrow>Angebot & Region</MobileEyebrow>
              <h2 className="font-serif-hero text-[34px] leading-tight">
                Drei Länder. <em className="italic text-amber">Eine</em> Sprache fürs Bier.
              </h2>
            </div>
            <div className="mobile-scroll-reveal-item mt-6 rounded-2xl border border-ink/10 bg-white p-4">
              <p className="mb-3 flex justify-between font-mono-hero text-[9px] uppercase tracking-wider text-ink3">
                <span>Fokus · DACH</span>
                <span className="text-amber">Pilotphase</span>
              </p>
              <div className="relative aspect-[16/10] overflow-hidden rounded-lg bg-[repeating-linear-gradient(45deg,#F4EFE6_0_8px,#EAE3D5_8px_9px)]">
                <DachMapSvg cities={DACH_MAP_CITIES_MOBILE} />
              </div>
              <p className="mt-3 font-sans-tight text-[12px] leading-relaxed text-ink3">
                Beispiel-Fokusstädte — keine Kundenliste. Pins zeigen, wo wir starten.
              </p>
            </div>
          </ScrollRevealStagger>
          <ScrollRevealStagger className="mt-4 space-y-3" staggerMs={90}>
            {[
              ["Premium-Pakete", "Der ruhige Weg.", "Briefing → Lieferung"],
              ["Dashboard · Abo", "Für regelmäßigen Output.", "Tokens / Monat"],
            ].map(([k, t, m]) => (
              <div key={k} className="mobile-scroll-reveal-item rounded-xl border border-ink/10 bg-white p-4">
                <p className="font-mono-hero text-[10px] uppercase text-amber">{k}</p>
                <p className="mt-1 font-serif-hero text-xl font-medium">{t}</p>
                <p className="mt-2 font-mono-hero text-[9px] uppercase text-ink3">{m}</p>
              </div>
            ))}
          </ScrollRevealStagger>
        </section>

        <section id="about-closing" className="bg-[#15110C] px-[22px] py-10 text-paper">
          <div id="contact" className="scroll-mt-24" aria-hidden />
          <ScrollRevealStagger softEntrance staggerMs={80}>
            <p className="mobile-scroll-reveal-item font-mono-hero text-[10px] uppercase text-amber2">Genug gelesen?</p>
            <h2 className="mobile-scroll-reveal-item mt-3 font-serif-hero text-[32px] leading-tight">
              Tiefer einsteigen oder <em className="italic text-amber2">schreiben</em>?
            </h2>
            <div className="mobile-scroll-reveal-item mt-6 flex flex-col gap-2">
              <Link href="/ratgeber" className="w-full rounded-xl bg-amber py-3.5 text-center text-sm font-semibold text-[#15110C]">
                Ratgeber-Quiz →
              </Link>
              <a
                href="mailto:kontakt@evglab.com"
                className="w-full rounded-xl border border-[rgba(244,239,230,0.18)] py-3.5 text-center text-sm text-paper"
              >
                Kontakt
              </a>
            </div>
          </ScrollRevealStagger>
          <ScrollRevealStagger className="mt-8 space-y-2" staggerMs={70}>
            {KONTAKT_KANAALE.map((k) => (
              <a
                key={k.kanal}
                href={k.href}
                aria-label={k.ariaLabel}
                className="mobile-scroll-reveal-item block rounded-xl border border-[#2C2519] bg-[#1A150E] p-4"
              >
                <p className="font-mono-hero text-[10px] text-amber2">{k.kanal}</p>
                <p className="font-serif-hero text-lg">{k.wert}</p>
                <p className="font-mono-hero text-[9px] text-[#8C7E68]">{k.meta}</p>
              </a>
            ))}
          </ScrollRevealStagger>
          <p className="mt-8 text-center font-mono-hero text-[10px] uppercase text-[#8C7E68]">
            © 2026 EvGlab · Hosting · DE
          </p>
        </section>
    </div>
  );
}
