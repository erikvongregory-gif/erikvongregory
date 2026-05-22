"use client";

import { PROCESS_STEPS } from "@/content/desktop-home";
import { DesktopContainer } from "@/components/desktop/DesktopContainer";
import { DesktopRevealItem, DesktopRevealStagger } from "@/components/desktop/DesktopReveal";

function ClockIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden className="shrink-0">
      <circle cx="6" cy="6" r="4.5" stroke="currentColor" strokeWidth="1.2" />
      <path d="M6 3.5 V6 L8 7.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

export function DesktopProzess() {
  return (
    <section
      id="desktop-prozess"
      aria-labelledby="desktop-prozess-heading"
      className="relative scroll-mt-24 overflow-hidden bg-[#0F0C08] py-20 text-paper lg:py-[120px]"
    >
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center" aria-hidden>
        <div className="h-[60%] w-[60%] rounded-full bg-amber/5 blur-[100px]" />
      </div>

      <div id="prozess" className="scroll-mt-24" aria-hidden />
      <DesktopContainer>
        <DesktopRevealStagger className="flex items-end justify-between gap-16 border-b border-[rgba(244,239,230,0.08)] pb-16" softEntrance>
          <DesktopRevealItem>
            <div>
              <p className="mb-4 font-mono-hero text-[11px] uppercase tracking-[1.4px] text-amber2">
                So funktioniert&apos;s · 03 Schritte
              </p>
              <h2 id="desktop-prozess-heading" className="font-serif-hero text-[72px] font-normal leading-[0.98] tracking-[-2px] text-paper">
                Von der Idee
                <br />
                zum <em className="italic text-amber2">fertigen Motiv</em>.
              </h2>
            </div>
          </DesktopRevealItem>
          <DesktopRevealItem>
            <p className="max-w-[420px] text-[15px] leading-[1.6] text-[#C8BFAD]">
              Drei Schritte. Jeder mit klarem Output, definierter Dauer und einem{" "}
              <em className="italic text-[#E8DFCB]">echten Lieferschein</em> — kein „dann melden wir uns“.
            </p>
          </DesktopRevealItem>
        </DesktopRevealStagger>

        <div className="relative pt-24">
          <div
            className="pointer-events-none absolute left-[8.5%] right-[8.5%] top-[48px] h-px bg-gradient-to-r from-transparent via-amber2/40 to-transparent"
            aria-hidden
          />
          <DesktopRevealStagger className="grid grid-cols-3 gap-14" staggerMs={140}>
            {PROCESS_STEPS.map((step) => (
              <DesktopRevealItem key={step.n}>
              <article className="relative">
                <div
                  className="relative z-10 mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-full border border-amber2/35 bg-[#15110C] font-serif-hero text-[36px] font-light italic text-amber2 shadow-[0_0_0_8px_#0F0C08]"
                  aria-hidden
                >
                  {step.n}
                </div>
                <p className="mb-2 font-mono-hero text-[11px] uppercase tracking-wider text-[#8C7E68]">{step.kicker}</p>
                <h3 className="mb-3 font-serif-hero text-[32px] font-medium leading-tight text-paper">{step.head}</h3>
                <p className="mb-4 text-[15px] leading-[1.6] text-[#C8BFAD]">{step.body}</p>
                <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-amber2/22 bg-amber2/10 px-3 py-1.5 font-mono-hero text-[10px] uppercase tracking-wider text-amber2">
                  <ClockIcon />
                  {step.time}
                </span>
                <div className="rounded-xl border border-[#2C2519] bg-[#1A150E] p-4">
                  <div className="mb-3 flex items-baseline justify-between gap-2 border-b border-dashed border-[#2C2519] pb-3">
                    <span className="font-mono-hero text-[10px] uppercase tracking-wider text-[#8C7E68]">Lieferschein</span>
                    <span className="font-serif-hero text-sm italic text-[#E8DFCB]">{step.slipTitle}</span>
                  </div>
                  <dl className="space-y-2">
                    {step.slipLines.map(([key, val]) => (
                      <div key={key} className="grid grid-cols-[70px_1fr] gap-2 text-[12px]">
                        <dt className="font-mono-hero text-amber2">{key}</dt>
                        <dd className="font-mono-hero text-[#C8BFAD]">{val}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </article>
              </DesktopRevealItem>
            ))}
          </DesktopRevealStagger>
        </div>
      </DesktopContainer>
    </section>
  );
}
