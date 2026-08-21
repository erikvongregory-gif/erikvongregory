"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import {
  BARCODE_BAR_HEIGHTS,
  formatStepTimeTag,
  getCalendarWeek,
  PROCESS_STEPS,
} from "@/lib/processDeliverySlipData";
import { scrollToSection } from "@/lib/scrollToSection";
import { cn } from "@/lib/utils";

function OutputArrowIcon() {
  return (
    <svg width="10" height="7" viewBox="0 0 10 7" fill="none" aria-hidden className="shrink-0">
      <path
        d="M1 3.5 H8 M5.5 1 L8.5 3.5 L5.5 6"
        stroke="#C7691E"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SignatureIcon({ animate }: { animate: boolean }) {
  return (
    <svg width="60" height="22" viewBox="0 0 60 22" fill="none" aria-hidden className="ml-auto opacity-85">
      <path
        d="M2 14 Q 8 4, 14 14 T 28 14 Q 36 6, 44 16 T 58 12"
        pathLength={1}
        stroke="#C7691E"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
        className={cn(animate && "process-delivery-signature-path--animate")}
      />
    </svg>
  );
}

function CtaArrowIcon() {
  return (
    <svg width="16" height="10" viewBox="0 0 16 10" fill="none" aria-hidden className="shrink-0">
      <path
        d="M1 5 H14 M10 1 L14 5 L10 9"
        stroke="#E89259"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const PERFORATION_POSITIONS = ["6%", "50%", "94%"] as const;

export function ProcessDeliverySlipSection() {
  const cardRef = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const weekOfYear = getCalendarWeek();

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReducedMotion(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  useEffect(() => {
    if (reducedMotion) {
      setInView(true);
      return;
    }
    const el = cardRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [reducedMotion]);

  return (
    <section
      id="section-3"
      aria-labelledby="prozess-heading"
      className="process-delivery-slip w-full bg-paper pb-9 font-sans-tight text-ink"
    >
      <div className="px-5 pt-10">
        <div className="mb-3.5 flex items-center gap-2.5">
          <span className="h-px w-7 shrink-0 bg-amber" aria-hidden />
          <p className="m-0 font-mono-hero text-[11px] uppercase tracking-[1.4px] text-amber">
            SO FUNKTIONIERT&apos;S
          </p>
        </div>
        <h2
          id="prozess-heading"
          className="m-0 font-serif-hero text-[36px] font-normal leading-[1.03] tracking-[-1px] text-ink"
        >
          Vom Briefing
          <br />
          zum <em className="font-medium italic text-amber">Wochenplan</em>.
        </h2>
      </div>

      <div className="px-5 pt-6">
        <article
          ref={cardRef}
          aria-label="Prozess-Übersicht: 3 Schritte in 6 Tagen"
          className={cn(
            "process-delivery-slip-card relative overflow-hidden rounded-md bg-white px-5 pt-[18px] pb-[22px]",
            "shadow-[0_1px_2px_rgba(40,28,12,0.06),0_12px_30px_-16px_rgba(40,28,12,0.20)]",
            !reducedMotion && "transition-[opacity,transform] duration-[600ms] ease-out",
            inView ? "translate-y-0 opacity-100" : !reducedMotion && "translate-y-2 opacity-0",
          )}
        >
          {PERFORATION_POSITIONS.map((top) => (
            <span
              key={`l-${top}`}
              className="absolute left-[-7px] h-3.5 w-3.5 rounded-full bg-paper"
              style={{ top }}
              aria-hidden
            />
          ))}
          {PERFORATION_POSITIONS.map((top) => (
            <span
              key={`r-${top}`}
              className="absolute right-[-7px] h-3.5 w-3.5 rounded-full bg-paper"
              style={{ top }}
              aria-hidden
            />
          ))}

          <header className="flex items-baseline justify-between border-b-[1.5px] border-ink pb-3">
            <div>
              <p className="mb-0.5 font-mono-hero text-[9px] uppercase tracking-[1.4px] text-ink3">LIEFERSCHEIN</p>
              <p className="m-0 font-serif-hero text-[22px] font-medium tracking-[-0.5px] text-ink">
                BrewAI · KW {weekOfYear}
              </p>
            </div>
            <div className="text-right">
              <p className="m-0 font-mono-hero text-[9px] uppercase tracking-[1.2px] text-ink3">LAUFZEIT</p>
              <p className="m-0 font-serif-hero text-[18px] font-medium text-amber">~ 6 Tage</p>
            </div>
          </header>

          <div role="list" className="pt-1">
            {PROCESS_STEPS.map((step, index) => (
              <div
                key={step.n}
                role="listitem"
                className={cn(
                  "py-4",
                  index < PROCESS_STEPS.length - 1 && "border-b border-dashed border-ink/15",
                )}
              >
                <div className="mb-1 flex items-baseline justify-between">
                  <div className="flex items-baseline gap-2">
                    <span className="font-serif-hero text-[22px] font-normal italic leading-none text-amber">
                      {step.n}
                    </span>
                    <span className="font-serif-hero text-[17px] font-medium tracking-[-0.2px] text-ink">
                      {step.head}
                    </span>
                  </div>
                  <span className="font-mono-hero text-[9.5px] uppercase tracking-[1px] text-ink3">
                    {formatStepTimeTag(step.time)}
                  </span>
                </div>
                <div className="pl-7">
                  <p className="mb-1.5 font-sans-tight text-[13px] leading-[1.45] text-ink2">{step.detail}</p>
                  <p className="m-0 inline-flex items-center gap-1.5 font-mono-hero text-[10px] uppercase tracking-[0.4px] text-ink">
                    <OutputArrowIcon />
                    {step.out.toUpperCase()}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <footer
            className={cn(
              "mt-2.5 flex items-center justify-between border-t border-ink/15 pt-3.5",
              !reducedMotion && "transition-opacity duration-[600ms] ease-out",
              inView ? "opacity-100" : !reducedMotion && "opacity-0",
              !reducedMotion && inView && "delay-200",
            )}
          >
            <div className="flex h-[22px] items-end gap-0.5" aria-hidden>
              {BARCODE_BAR_HEIGHTS.map((height, i) => (
                <span
                  key={i}
                  className={cn(
                    "w-0.5 bg-ink opacity-85",
                    inView && !reducedMotion && "process-delivery-barcode-bar--animate",
                  )}
                  style={
                    inView && !reducedMotion
                      ? ({
                          height,
                          ["--barcode-delay" as string]: `${i * 0.065}s`,
                          ["--barcode-duration" as string]: `${0.95 + (i % 5) * 0.14}s`,
                        } as CSSProperties)
                      : { height }
                  }
                />
              ))}
            </div>
            <div className="text-right">
              <p className="m-0 font-mono-hero text-[9px] uppercase tracking-[0.8px] text-ink3">GENEHMIGT</p>
              <SignatureIcon animate={inView && !reducedMotion} />
            </div>
          </footer>
        </article>
      </div>

      <div className="px-5 pt-6">
        <button
          type="button"
          onClick={() => scrollToSection("#contact")}
          className="flex min-h-12 w-full items-center justify-between rounded-full border-0 bg-ink px-[18px] py-3.5 font-sans-tight text-[15px] font-semibold text-paper transition-colors hover:bg-[#28221b] active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber focus-visible:ring-offset-2 focus-visible:ring-offset-paper"
        >
          <span>Briefing-Termin reservieren</span>
          <CtaArrowIcon />
        </button>
      </div>
    </section>
  );
}
