"use client";

import NumberFlow from "@number-flow/react";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  ALERT_CARDS,
  DASHBOARD_MODULES,
  WORKFLOW_STEPS,
} from "@/components/neu/parlo/data";
import { CheckIcon } from "@/components/neu/parlo/ParloUi";
import { cn } from "@/lib/utils";
import {
  EASE,
  cssEase,
  useAutoDemo,
  useInView,
  useInViewOnce,
  useMotionTier,
  usePageVisible,
} from "./motion-utils";

/*
 * Eine Sequenz statt vier Einzeleffekte:
 * Stepper-Linie → Status rastet ein → Module erscheinen → Linien zur BrewAI-Karte.
 * Danach wandert nur noch der Schritt (Stepper + „Vom Profil zum Post“ gekoppelt).
 */
const T_STATUS = 600;
const T_STATUS_STEP = 350;
const T_CHIPS = 1750;
const T_CHIP_STEP = 60;
const T_LINES = T_CHIPS + DASHBOARD_MODULES.length * T_CHIP_STEP + 250;
const STEP_MS = 2500;

const NUM_TIMING = {
  spinTiming: { duration: 700, easing: cssEase(EASE.count) },
  transformTiming: { duration: 500, easing: cssEase(EASE.count) },
} as const;

function useSequenceClock(run: boolean, instant: boolean) {
  const [t, setT] = useState(-1);
  useEffect(() => {
    if (instant || !run) return;
    const marks = [0, T_STATUS, T_STATUS + T_STATUS_STEP, T_STATUS + 2 * T_STATUS_STEP, T_CHIPS, T_LINES];
    for (let i = 0; i < DASHBOARD_MODULES.length; i++) marks.push(T_CHIPS + i * T_CHIP_STEP);
    const timers = [...new Set(marks)].map((m) => window.setTimeout(() => setT((p) => Math.max(p, m)), m));
    return () => timers.forEach(clearTimeout);
  }, [run, instant]);
  return instant ? Infinity : t;
}

/** Haarlinien von den Modul-Chips zur zentralen BrewAI-Karte */
function ModuleLines({
  cardRef,
  chipRefs,
  targetRef,
  on,
}: {
  cardRef: React.RefObject<HTMLDivElement | null>;
  chipRefs: React.RefObject<(HTMLDivElement | null)[]>;
  targetRef: React.RefObject<HTMLDivElement | null>;
  on: boolean;
}) {
  const [geo, setGeo] = useState<{ w: number; h: number; d: string[] }>({ w: 0, h: 0, d: [] });

  useLayoutEffect(() => {
    const card = cardRef.current;
    if (!card) return;
    const measure = () => {
      const base = card.getBoundingClientRect();
      const target = targetRef.current?.getBoundingClientRect();
      if (!target) return;
      const tx = target.left - base.left + target.width / 2;
      const ty = target.top - base.top;
      const d = (chipRefs.current ?? []).flatMap((chip) => {
        if (!chip) return [];
        const r = chip.getBoundingClientRect();
        const x = r.left - base.left + r.width / 2;
        const y = r.bottom - base.top;
        const mid = (ty - y) * 0.55;
        return [`M ${x} ${y} C ${x} ${y + mid}, ${tx} ${ty - mid}, ${tx} ${ty}`];
      });
      setGeo({ w: base.width, h: base.height, d });
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(card);
    return () => ro.disconnect();
  }, [cardRef, chipRefs, targetRef]);

  if (!geo.w) return null;
  return (
    <svg
      aria-hidden
      className="pointer-events-none absolute inset-0 z-[1] text-foreground"
      width={geo.w}
      height={geo.h}
      viewBox={`0 0 ${geo.w} ${geo.h}`}
    >
      {geo.d.map((d, i) => (
        <path
          key={i}
          d={d}
          fill="none"
          stroke="currentColor"
          strokeOpacity={0.12}
          strokeWidth={1}
          pathLength={1}
          style={{
            strokeDasharray: 1,
            strokeDashoffset: on ? 0 : 1,
            transition: `stroke-dashoffset 700ms ${cssEase(EASE.draw)} ${i * 40}ms`,
          }}
        />
      ))}
    </svg>
  );
}

export function MotionFeatures() {
  const tier = useMotionTier();
  const gridRef = useRef<HTMLDivElement>(null);
  const seen = useInViewOnce(gridRef, { threshold: 0.25 });
  const visible = useInView(gridRef, { threshold: 0.15 });
  const pageVisible = usePageVisible();
  const t = useSequenceClock(seen, tier.reduced);
  const [active, setActive] = useState(tier.reduced ? 1 : 0);

  const demo = useAutoDemo(seen && visible && pageVisible && !tier.reduced, STEP_MS, () =>
    setActive((a) => (a + 1) % WORKFLOW_STEPS.length),
  );

  const moduleCardRef = useRef<HTMLDivElement>(null);
  const chipRefs = useRef<(HTMLDivElement | null)[]>([]);
  const targetRef = useRef<HTMLDivElement>(null);

  const statusShown = t >= T_STATUS ? Math.min(3, Math.floor((t - T_STATUS) / T_STATUS_STEP) + 1) : 0;
  const stepperOn = t >= 0;
  const step = WORKFLOW_STEPS[active];
  const snap = `220ms ${cssEase(EASE.snap)}`;

  return (
    <section id="features" className="scroll-mt-24">
      <div className="mx-[30px] border-x border-border py-16 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: EASE.rise }}
          className="mx-auto max-w-3xl px-6 text-center"
        >
          <h2 className="text-balance text-3xl font-medium tracking-tight text-foreground md:text-5xl">
            Alles für euren Content-Alltag.
          </h2>
          <p className="mt-3 text-lg text-muted-foreground">
            Module wie im Dashboard — ohne Inbox- oder Support-Agent-Versprechen.
          </p>
        </motion.div>

        <div ref={gridRef}>
          <div className="mx-auto mt-14 grid max-w-6xl gap-8 px-6 lg:grid-cols-2 lg:items-start">
            <div
              role="listbox"
              aria-label="Workflow"
              className="relative space-y-2 rounded-2xl border border-border bg-surface p-3"
            >
              {/* Haarlinie verbindet die Schritte bis zum aktiven */}
              <span aria-hidden className="absolute bottom-5 left-[6px] top-5 w-px bg-foreground/[0.06]" />
              <span
                aria-hidden
                className="absolute bottom-5 left-[6px] top-5 w-px origin-top bg-foreground/35"
                style={{
                  transform: `scaleY(${stepperOn ? (active + 1) / WORKFLOW_STEPS.length : 0})`,
                  transition: `transform 600ms ${cssEase(EASE.draw)}`,
                }}
              />
              {WORKFLOW_STEPS.map((s, i) => {
                const selected = i === active;
                return (
                  <button
                    key={s.title}
                    type="button"
                    role="option"
                    aria-selected={selected}
                    onClick={() => {
                      demo.stop();
                      setActive(i);
                    }}
                    className={cn(
                      "w-full rounded-xl border px-4 text-left transition-[padding,background-color,border-color] duration-300",
                      selected
                        ? "border-border bg-surface-elevated py-5"
                        : "border-transparent bg-transparent py-3 hover:bg-foreground/[0.03]",
                    )}
                  >
                    <div className="flex items-baseline gap-3">
                      <span className="font-mono text-[11px] text-muted-foreground">{s.time}</span>
                      <span className="text-sm font-medium text-foreground">{s.title}</span>
                    </div>
                    <AnimatePresence initial={false}>
                      {selected && (
                        <motion.p
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: EASE.micro }}
                          className="overflow-hidden"
                        >
                          <span className="block pt-2 text-sm leading-relaxed text-muted-foreground">
                            {s.description}
                          </span>
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </button>
                );
              })}
            </div>

            <div className="rounded-2xl border border-border bg-surface p-6">
              <p className="text-lg font-medium tracking-tight text-foreground">Vom Profil zum Post.</p>
              <p className="mt-2 text-sm text-muted-foreground">
                Derselbe Ablauf wie im Dashboard — ohne Tool-Wechsel.
              </p>
              <div className="mt-6 rounded-xl border border-border bg-surface-elevated p-4">
                <p className="font-mono text-[11px] text-muted-foreground">
                  <NumberFlow
                    value={active + 1}
                    format={{ minimumIntegerDigits: 2 }}
                    className="font-mono"
                    {...NUM_TIMING}
                  />
                </p>
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={step.title}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.28, ease: EASE.micro }}
                  >
                    <p className="mt-2 text-base font-medium text-foreground">{step.title}</p>
                    <p className="mt-2 text-sm text-muted-foreground">{step.description}</p>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>

          <div className="mx-auto mt-8 grid max-w-6xl gap-8 px-6 lg:grid-cols-2">
            <div className="rounded-2xl border border-border bg-surface p-6">
              <div className="mb-4 flex items-center justify-between">
                <p className="text-xs text-muted-foreground">
                  <span className="mr-2 text-foreground">
                    <NumberFlow value={statusShown} {...NUM_TIMING} />
                  </span>
                  Status
                </p>
              </div>
              <div className="space-y-2">
                {ALERT_CARDS.map((card, i) => {
                  const on = statusShown > i;
                  return (
                    <div
                      key={card.title}
                      className="rounded-xl border border-border/70 bg-surface-elevated p-3"
                      style={{ opacity: on ? 1 : 0.5, transition: `opacity ${snap}` }}
                    >
                      <div className="flex items-start gap-3">
                        <span className="relative mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-foreground/10 text-[10px] font-medium">
                          <span
                            style={{
                              opacity: on ? 0 : 1,
                              transition: `opacity 160ms ${cssEase(EASE.snap)}`,
                            }}
                          >
                            {i + 1}
                          </span>
                          <CheckIcon
                            className={cn(
                              "nm-check absolute size-3 text-foreground",
                              on && "is-on",
                            )}
                          />
                        </span>
                        <div>
                          <p className="text-sm font-medium text-foreground">{card.title}</p>
                          <p className="mt-0.5 text-[11px] text-muted-foreground">{card.meta}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              <p className="mt-5 text-lg font-medium tracking-tight text-foreground">
                Überblick behalten.
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                Markenprofil, Mediathek und Tokens bleiben sichtbar.
              </p>
            </div>

            <div ref={moduleCardRef} className="relative rounded-2xl border border-border bg-surface p-6">
              <ModuleLines
                cardRef={moduleCardRef}
                chipRefs={chipRefs}
                targetRef={targetRef}
                on={t >= T_LINES}
              />
              <div className="relative flex flex-wrap gap-2">
                {DASHBOARD_MODULES.map((m, i) => {
                  const on = t >= T_CHIPS + i * T_CHIP_STEP;
                  return (
                    <div
                      key={m.name}
                      ref={(el) => {
                        chipRefs.current[i] = el;
                      }}
                      className="inline-flex items-center gap-2 rounded-full border border-border bg-surface-elevated px-3 py-1.5"
                      style={{
                        opacity: on ? 1 : 0,
                        transform: on ? "translateY(0)" : "translateY(6px)",
                        transition: `opacity 400ms ${cssEase(EASE.rise)}, transform 600ms ${cssEase(EASE.rise)}`,
                      }}
                    >
                      <span className="text-xs text-foreground">{m.name}</span>
                    </div>
                  );
                })}
              </div>
              <div className="parlo-grid-dots mt-6 flex min-h-[140px] items-center justify-center rounded-xl border border-border bg-surface">
                <div
                  ref={targetRef}
                  className="relative z-[2] rounded-2xl border border-border bg-surface-elevated px-4 py-3 shadow-lg"
                >
                  <span className="text-sm font-medium text-foreground">BrewAI</span>
                  <p className="mt-1 text-xs text-muted-foreground">Prompts · Stil · Tokens</p>
                </div>
              </div>
              <p className="relative mt-5 text-lg font-medium tracking-tight text-foreground">
                Module wie in der App.
              </p>
              <p className="relative mt-2 text-sm text-muted-foreground">
                Bilder, Markenprofil, Mediathek, Team, Abo — Videos folgen.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
