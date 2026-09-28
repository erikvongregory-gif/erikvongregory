"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { HOW_TABS } from "@/components/neu/parlo/data";
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

const DEMO_MS = 6000;
const ROW_START = 260;
const ROW_STEP = 180;

/**
 * HowMock (/neu) — Zeilen rasten nacheinander ein, „Bereit“-Leiste
 * füllt sich mit Raster, dann rastet „OK“ ein. Status-Badge leuchtet einmal.
 */
function HowMock({
  mock,
  armed,
  instant,
}: {
  mock: (typeof HOW_TABS)[number]["mock"];
  armed: boolean;
  instant: boolean;
}) {
  const [step, setStep] = useState(instant ? 99 : 0);

  useEffect(() => {
    if (instant) {
      setStep(99);
      return;
    }
    if (!armed) return;
    setStep(0);
    const n = mock.rows.length;
    const timers: number[] = [];
    for (let i = 1; i <= n; i++) {
      timers.push(window.setTimeout(() => setStep(i), ROW_START + (i - 1) * ROW_STEP));
    }
    /* Leiste füllt sich, danach OK + Badge */
    timers.push(window.setTimeout(() => setStep(n + 1), ROW_START + n * ROW_STEP + 80));
    timers.push(window.setTimeout(() => setStep(n + 2), ROW_START + n * ROW_STEP + 700));
    return () => timers.forEach(clearTimeout);
  }, [mock, armed, instant]);

  const n = mock.rows.length;
  const snap = `220ms ${cssEase(EASE.snap)}`;

  return (
    <div className="rounded-2xl border border-border bg-surface p-4 shadow-2xl">
      <div className="mb-3 flex items-center justify-between">
        <div>
          <p className="text-xs text-muted-foreground">Dashboard</p>
          <p className="text-sm font-medium text-foreground">{mock.title}</p>
        </div>
        <span
          className="rounded-full bg-emerald-500/20 px-2 py-0.5 text-[10px] font-medium text-emerald-700 dark:text-emerald-300"
          style={{
            opacity: step >= n + 2 ? 1 : 0.45,
            transition: `opacity 400ms ${cssEase(EASE.micro)}`,
          }}
        >
          {mock.status}
        </span>
      </div>
      <div className="mt-3 grid gap-2">
        {mock.rows.map((row, i) => {
          const on = step > i;
          return (
            <div
              key={row.title}
              className={cn(
                "flex items-center justify-between rounded-xl border bg-surface-elevated px-3 py-2.5",
                on ? "border-solid border-border/60" : "border-dashed border-border",
              )}
              style={{ opacity: on ? 1 : 0.5, transition: `opacity ${snap}` }}
            >
              <span className="text-xs font-medium text-foreground">{row.title}</span>
              <span
                className="inline-flex items-center gap-1.5 text-[11px] text-muted-foreground"
                style={{
                  opacity: on ? 1 : 0,
                  transform: on ? "translateY(0)" : "translateY(2px)",
                  transition: `opacity ${snap}, transform ${snap}`,
                }}
              >
                <CheckIcon className={cn("nm-check size-3 text-muted-foreground", on && "is-on")} />
                {row.meta}
              </span>
            </div>
          );
        })}
      </div>
      <div className="relative mt-3 flex items-center justify-between overflow-hidden rounded-xl bg-emerald-500/10 px-3 py-2">
        {/* Raster verdichtet sich von links nach rechts */}
        <span
          aria-hidden
          className="parlo-grid-dots pointer-events-none absolute inset-0"
          style={{
            backgroundSize: "6px 6px",
            transform: step >= n + 1 ? "scaleX(1)" : "scaleX(0)",
            transformOrigin: "left center",
            opacity: step >= n + 2 ? 0 : 1,
            transition: `transform 600ms ${cssEase(EASE.draw)}, opacity 400ms ${cssEase(EASE.micro)}`,
          }}
        />
        <span className="relative text-xs text-emerald-700 dark:text-emerald-300">{mock.footer}</span>
        <span
          className="relative text-[11px] font-medium text-emerald-700 dark:text-emerald-200"
          style={{
            opacity: step >= n + 2 ? 1 : 0,
            transform: step >= n + 2 ? "translateY(0)" : "translateY(2px)",
            transition: `opacity ${snap}, transform ${snap}`,
          }}
        >
          OK
        </span>
      </div>
    </div>
  );
}

export function MotionHowItWorks() {
  const [active, setActive] = useState(0);
  const tab = HOW_TABS[active];
  const tier = useMotionTier();
  const sectionRef = useRef<HTMLElement>(null);
  const mockRef = useRef<HTMLDivElement>(null);
  const visible = useInView(sectionRef, { threshold: 0.35 });
  const mockSeen = useInViewOnce(mockRef, { threshold: 0.4 });
  const pageVisible = usePageVisible();

  const demo = useAutoDemo(visible && pageVisible && !tier.reduced, DEMO_MS, () =>
    setActive((a) => (a + 1) % HOW_TABS.length),
  );

  const select = (i: number) => {
    demo.stop();
    setActive(i);
  };

  return (
    <section id="how-it-works" ref={sectionRef} className="scroll-mt-24">
      <div className="md:mx-[30px] md:border-x border-border py-16 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: EASE.rise }}
          className="mx-auto max-w-3xl px-6 text-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 text-xs text-muted-foreground">
            <Image
              src="/brewai-mark-icon.png"
              alt=""
              width={14}
              height={14}
              className="size-3.5 object-contain brightness-0 dark:brightness-100"
            />
            BrewAI Dashboard
          </span>
          <h2 className="mt-6 text-balance text-3xl font-medium tracking-tight text-foreground md:text-5xl">
            Marke einmal setzen. Motive in Minuten.
          </h2>
        </motion.div>

        <div
          className="mx-auto mt-10 flex max-w-3xl flex-wrap justify-center gap-2 px-6"
          role="tablist"
          onPointerDown={demo.stop}
          onKeyDown={demo.stop}
        >
          {HOW_TABS.map((t, i) => {
            const on = i === active;
            return (
              <div key={t.id} className="relative">
                <button
                  type="button"
                  role="tab"
                  aria-selected={on}
                  onClick={() => select(i)}
                  className={cn(
                    "relative rounded-full border px-4 py-2 text-sm transition-colors duration-200",
                    on
                      ? "border-transparent text-background"
                      : "border-border bg-surface text-muted-foreground hover:text-foreground",
                  )}
                >
                  {on ? (
                    <motion.span
                      layoutId="nm-how-pill"
                      className="absolute inset-[-1px] rounded-full bg-foreground"
                      transition={{ duration: 0.35, ease: EASE.micro }}
                    />
                  ) : null}
                  <span className="relative">{t.label}</span>
                </button>
                {/* Auto-Demo-Fortschritt: Haarlinie unter der aktiven Pill */}
                {on && demo.active ? (
                  <span
                    key={demo.cycle}
                    aria-hidden
                    className="nm-progress absolute inset-x-3 -bottom-2 h-px bg-foreground/40"
                    style={{ ["--nm-progress-ms" as string]: `${DEMO_MS}ms` }}
                  />
                ) : null}
              </div>
            );
          })}
        </div>

        <div
          className="mx-auto mt-12 grid max-w-6xl gap-8 px-6 lg:grid-cols-2 lg:items-center lg:gap-12"
          onPointerDown={demo.stop}
        >
          <div className="min-h-[260px]">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={tab.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.3, ease: EASE.micro }}
              >
                <p className="text-sm font-medium text-foreground">{tab.label}</p>
                <h3 className="mt-2 text-2xl font-medium tracking-tight text-foreground md:text-3xl">
                  {tab.eyebrow}
                </h3>
                <p className="mt-3 text-base leading-relaxed text-muted-foreground">
                  {tab.description}
                </p>
                <ul className="mt-6 space-y-3">
                  {tab.bullets.map((b, i) => (
                    <motion.li
                      key={b}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.35, ease: EASE.rise, delay: 0.08 + i * 0.06 }}
                      className="flex items-center gap-3 text-sm text-muted-foreground"
                    >
                      <span className="size-1.5 shrink-0 rounded-full bg-foreground/60" />
                      {b}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </AnimatePresence>
          </div>
          <div ref={mockRef} className="parlo-grid-dots rounded-3xl border border-border bg-surface p-4 md:p-6">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={tab.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.3, ease: EASE.micro }}
              >
                <HowMock mock={tab.mock} armed={mockSeen} instant={tier.reduced} />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
