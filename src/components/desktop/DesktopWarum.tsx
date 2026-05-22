"use client";

import { WARUM_CHAPTERS, WARUM_PULL_QUOTE } from "@/content/desktop-home";
import type { WarumChapter, WarumProof } from "@/content/desktop-home";
import { DesktopContainer } from "@/components/desktop/DesktopContainer";
import { DesktopRevealItem, DesktopRevealStagger } from "@/components/desktop/DesktopReveal";

function ProofBlock({ proof }: { proof: WarumProof }) {
  if (proof.kind === "stat") {
    return (
      <div className="inline-flex items-baseline gap-3.5 rounded-xl border border-ink/10 bg-white px-5 py-3.5">
        <span className="font-serif-hero text-[52px] font-medium leading-none text-amber">{proof.value}</span>
        <span className="font-mono-hero text-[11px] uppercase tracking-wider text-ink3">{proof.label}</span>
      </div>
    );
  }
  if (proof.kind === "calendar") {
    return (
      <div className="rounded-xl border border-ink/10 bg-white p-4">
        <div className="mb-3 flex items-center justify-between font-mono-hero text-[10px] uppercase tracking-wider text-ink3">
          <span>{proof.header}</span>
          {proof.live ? <span className="text-amber">● LIVE</span> : null}
        </div>
        <ul className="space-y-2">
          {proof.items.map(([day, text]) => (
            <li key={day} className="grid grid-cols-[36px_1fr_8px] items-center gap-2 text-[14px]">
              <span className="font-mono-hero text-[11px] text-ink3">{day}</span>
              <span className="font-serif-hero text-ink">{text}</span>
              <span className="h-1.5 w-1.5 justify-self-end rounded-full bg-amber" aria-hidden />
            </li>
          ))}
        </ul>
      </div>
    );
  }
  return (
    <ul className="space-y-2.5">
      {proof.items.map((item) => (
        <li key={item} className="grid grid-cols-[20px_1fr] gap-2 text-[15px] text-ink2">
          <span className="font-mono-hero text-amber">→</span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function Chapter({ chapter }: { chapter: WarumChapter }) {
  return (
    <DesktopRevealItem>
    <article>
      <div className="mb-6 flex items-end gap-4">
        <span className="font-serif-hero text-[88px] font-light italic leading-[0.85] tracking-[-2px] text-amber">
          {chapter.n}
        </span>
        <span className="mb-3 flex-1 border-b border-ink/10 pb-2 font-mono-hero text-[11px] uppercase tracking-wider text-ink3">
          {chapter.kicker}
        </span>
      </div>
      <h3 className="font-serif-hero text-[38px] font-medium leading-[1.05] tracking-[-1px] text-ink">
        {chapter.head}
        <br />
        <span className="font-normal italic text-ink3">{chapter.headItalic}</span>
      </h3>
      <p className="mb-7 mt-4 text-[15.5px] leading-[1.6] text-ink2">{chapter.body}</p>
      <ProofBlock proof={chapter.proof} />
    </article>
    </DesktopRevealItem>
  );
}

export function DesktopWarum() {
  const parts = WARUM_PULL_QUOTE.split(". ");
  const highlight = "Qualität vor Hype";

  return (
    <section id="section-2" aria-labelledby="desktop-warum-heading" className="scroll-mt-24 bg-paper py-20 lg:py-[120px]">
      <div id="warum" className="scroll-mt-24" aria-hidden />
      <DesktopContainer>
        <DesktopRevealStagger className="grid grid-cols-2 items-end gap-16 border-b border-ink/10 pb-20" softEntrance>
          <DesktopRevealItem>
            <div>
              <p className="mb-4 font-mono-hero text-[11px] uppercase tracking-[1.4px] text-ink3">Warum EvGlab · 03 Punkte</p>
              <h2 id="desktop-warum-heading" className="font-serif-hero text-[80px] font-normal leading-[0.98] tracking-[-2.4px] text-ink">
                Drei Sachen
                <br />
                mach ich <em className="italic text-amber">anders</em>.
              </h2>
            </div>
          </DesktopRevealItem>
          <DesktopRevealItem>
            <p className="justify-self-end text-lg leading-[1.55] text-ink2 max-w-[520px]">
              Kein „auch noch“. Keine Disziplin-Mischung. Eine Klientel, eine Methode, ein Ergebnis — und drei klare
              Versprechen, die jedes Mal eingelöst werden.
            </p>
          </DesktopRevealItem>
        </DesktopRevealStagger>

        <DesktopRevealStagger className="grid grid-cols-3 gap-12 pt-[72px]" staggerMs={120}>
          {WARUM_CHAPTERS.map((ch) => (
            <Chapter key={ch.n} chapter={ch} />
          ))}
        </DesktopRevealStagger>

        <DesktopRevealStagger className="mt-24 grid grid-cols-[1fr_2fr] gap-12 border-t border-ink/10 pt-14" softEntrance>
          <DesktopRevealItem>
            <p className="font-mono-hero text-[11px] uppercase tracking-wider text-ink3">Wofür ich stehe</p>
          </DesktopRevealItem>
          <DesktopRevealItem>
            <blockquote className="font-serif-hero text-[40px] font-normal italic leading-[1.15] tracking-[-0.9px] text-ink">
              {parts[0]}.{" "}
              <span className="text-amber">{highlight}</span>. {parts[2]}.
            </blockquote>
          </DesktopRevealItem>
        </DesktopRevealStagger>
      </DesktopContainer>
    </section>
  );
}
