"use client";

import { useState } from "react";
import { LOESUNGEN } from "@/content/desktop-home";
import { DesktopContainer } from "@/components/desktop/DesktopContainer";
import { scrollToContactPaket } from "@/lib/contactPaket";
import { cn } from "@/lib/utils";

function RowArrow() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
      <path d="M3 7 H11 M7.5 3.5 L11 7 L7.5 10.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function DesktopLoesungen() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section id="section-4" aria-labelledby="desktop-loesungen-heading" className="scroll-mt-24 bg-paper py-20 lg:py-[120px]">
      <div id="loesungen" className="scroll-mt-24" aria-hidden />
      <DesktopContainer>
        <div className="grid grid-cols-[1fr_1.4fr] items-end gap-16 border-b border-ink/10 pb-20">
          <div>
            <p className="mb-4 font-mono-hero text-[11px] uppercase tracking-[1.4px] text-ink3">Meine Leistungen · 05 Lösungen</p>
            <h2 id="desktop-loesungen-heading" className="font-serif-hero text-[80px] font-normal leading-[0.98] tracking-[-2.4px] text-ink">
              Was ich für
              <br />
              dich <em className="italic text-amber">baue</em>.
            </h2>
          </div>
          <p className="text-lg leading-[1.55] text-ink2">
            Fünf Bausteine, einzeln buchbar oder als Jahresplan kombiniert. Alle in{" "}
            <em className="italic">deinem</em> Markenstil, alle praxisnah, alle sofort einsetzbar.
          </p>
        </div>

        <ul className="border-t border-ink/10">
          {LOESUNGEN.map((item, i) => {
            const isHover = hovered === i;
            return (
              <li key={item.n}>
                <button
                  type="button"
                  className={cn(
                    "grid w-full grid-cols-[90px_1fr_380px_120px] items-center gap-8 border-b border-ink/10 py-10 text-left transition-colors duration-200",
                    isHover && "bg-amber/[0.04]",
                  )}
                  onMouseEnter={() => setHovered(i)}
                  onMouseLeave={() => setHovered(null)}
                  onFocus={() => setHovered(i)}
                  onBlur={() => setHovered(null)}
                >
                  <span
                    className={cn(
                      "font-serif-hero text-[64px] font-light italic leading-none transition-colors",
                      isHover ? "text-amber" : "text-ink3",
                    )}
                  >
                    {item.n}
                  </span>
                  <div>
                    <p className="mb-1 font-mono-hero text-[11px] uppercase tracking-wider text-amber">{item.kicker}</p>
                    <h3 className="font-serif-hero text-[32px] font-medium leading-tight text-ink">{item.headline}</h3>
                  </div>
                  <div>
                    <p className="text-[15.5px] leading-[1.55] text-ink2">{item.body}</p>
                    <p className="mt-2 font-mono-hero text-[10px] uppercase tracking-wider text-ink3">{item.delivery}</p>
                  </div>
                  <div className="flex items-center justify-end gap-3">
                    <div className="flex flex-wrap justify-end gap-1">
                      {item.formats.map((f) => (
                        <span key={f} className="rounded border border-ink/14 bg-white px-2 py-1 font-mono-hero text-[10.5px] text-ink2">
                          {f}
                        </span>
                      ))}
                    </div>
                    <span
                      className={cn(
                        "flex h-10 w-10 items-center justify-center rounded-full border transition-all duration-200",
                        isHover
                          ? "translate-x-1.5 border-ink bg-ink text-paper"
                          : "border-ink/14 bg-white text-ink",
                      )}
                    >
                      <RowArrow />
                    </span>
                  </div>
                </button>
              </li>
            );
          })}
        </ul>

        <div className="mt-12 flex items-center justify-between rounded-[18px] border border-ink/10 bg-white p-8 px-10">
          <div>
            <p className="mb-2 font-mono-hero text-[11px] uppercase tracking-wider text-amber">Jahresplan · Empfohlen</p>
            <h3 className="font-serif-hero text-[30px] font-medium text-ink">Alle fünf zusammen, einmal im Quartal abgestimmt.</h3>
          </div>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => scrollToContactPaket("Jahresplan")}
              className="rounded-xl border border-ink/14 px-5 py-3 font-sans-tight text-sm font-medium text-ink transition hover:bg-ink/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-amber"
            >
              Jahresplan ansehen
            </button>
            <button
              type="button"
              onClick={() => scrollToContactPaket("Gespräch")}
              className="inline-flex items-center gap-2 rounded-xl bg-amber px-5 py-3 font-sans-tight text-sm font-semibold text-[#15110C] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-amber"
            >
              Gespräch buchen →
            </button>
          </div>
        </div>
      </DesktopContainer>
    </section>
  );
}
