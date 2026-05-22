"use client";

import { FAQ_GROUPS } from "@/content/desktop-home";
import { DesktopContainer } from "@/components/desktop/DesktopContainer";

export function DesktopFaq() {
  return (
    <section id="section-fragen" aria-labelledby="desktop-faq-heading" className="scroll-mt-24 border-t border-ink/10 bg-paper py-20 lg:py-[120px]">
      <div id="faq" className="scroll-mt-24" aria-hidden />
      <div id="fragen" className="scroll-mt-24" aria-hidden />
      <DesktopContainer>
        <div className="grid grid-cols-[1fr_1.6fr] items-start gap-24">
          <div className="sticky top-24">
            <p className="mb-4 font-mono-hero text-[11px] uppercase tracking-[1.4px] text-amber">FAQ · 06 Fragen</p>
            <h2 id="desktop-faq-heading" className="font-serif-hero text-[64px] font-normal leading-[0.98] tracking-[-1.8px] text-ink">
              Häufige <em className="italic text-amber">Fragen</em>.
              <br />
              Offene Antworten.
            </h2>
            <p className="mt-5 text-[15px] leading-[1.6] text-ink2">
              Kein Versteckspiel — die wichtigsten Punkte vor dem Start, während der Zusammenarbeit und zu den
              Ergebnissen.
            </p>
            <div className="mt-8 rounded-2xl border border-ink/10 bg-white p-7">
              <div className="mb-4 flex items-center gap-4">
                <span className="flex h-[52px] w-[52px] items-center justify-center rounded-full bg-gradient-to-br from-amber to-amber2 font-serif-hero text-2xl font-medium text-paper">
                  N
                </span>
                <div>
                  <p className="font-serif-hero text-xl font-medium text-ink">Noch eine Frage?</p>
                  <p className="font-mono-hero text-[10px] uppercase tracking-wider text-ink3">Antwort meist in 4h</p>
                </div>
              </div>
              <p className="mb-5 text-sm leading-relaxed text-ink2">
                Schreib mir direkt — ich antworte persönlich, ohne Ticket-Wüste.
              </p>
              <a
                href="#contact"
                className="inline-flex w-full items-center justify-center rounded-xl bg-amber px-4 py-3 font-sans-tight text-sm font-semibold text-[#15110C] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-amber"
              >
                Nachricht schreiben →
              </a>
            </div>
          </div>

          <div className="space-y-12">
            {FAQ_GROUPS.map((group) => (
              <article key={group.n}>
                <header className="mb-6 flex items-baseline gap-3.5 border-b border-ink/10 pb-4">
                  <span className="font-serif-hero text-[22px] italic text-amber">{group.n}</span>
                  <h3 className="font-serif-hero text-[22px] font-medium text-ink">{group.title}</h3>
                  <span className="flex-1" aria-hidden />
                  <span className="font-mono-hero text-[10px] uppercase tracking-wider text-ink3">{group.countLabel}</span>
                </header>
                <div className="space-y-8">
                  {group.items.map((item) => (
                    <dl key={item.q}>
                      <dt className="font-serif-hero text-2xl font-medium text-ink">{item.q}</dt>
                      <dd className="mt-2 max-w-[640px] font-sans-tight text-base leading-relaxed text-ink2">{item.a}</dd>
                    </dl>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </DesktopContainer>
    </section>
  );
}
