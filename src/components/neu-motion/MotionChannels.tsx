"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useRef, useState } from "react";
import {
  APP_URL,
  FORMAT_CAPABILITIES,
  FORMAT_COUNTS,
  FORMAT_ITEMS,
} from "@/components/neu/parlo/data";
import { ParloPillButton } from "@/components/neu/parlo/ParloUi";
import { cn } from "@/lib/utils";
import { DitherMotif } from "./DitherMotif";
import { LIBRARY_KIND, LIBRARY_MOTIFS, TAG_TO_CHIP } from "./motifs";
import {
  EASE,
  cssEase,
  useAutoDemo,
  useInView,
  useInViewOnce,
  useMotionTier,
  usePageVisible,
} from "./motion-utils";

const DEMO_MS = 4000;

function priorityClass(tag: string) {
  if (tag === "Produkt" || tag === "Serie") return "parlo-priority-high";
  if (tag === "Feed" || tag === "Event") return "parlo-priority-medium";
  return "parlo-priority-low";
}

function FormatsMock() {
  const tier = useMotionTier();
  const rootRef = useRef<HTMLDivElement>(null);
  const seen = useInViewOnce(rootRef, { threshold: 0.3 });
  const visible = useInView(rootRef, { threshold: 0.2 });
  const pageVisible = usePageVisible();
  const [sel, setSel] = useState(0);
  const [gen, setGen] = useState(1);
  const hoverTimer = useRef<number | null>(null);

  const selected = FORMAT_ITEMS[sel];
  const motif = LIBRARY_MOTIFS[sel];
  const activeChip = TAG_TO_CHIP[selected.tag];

  const choose = (i: number) => {
    if (i === sel) return;
    setSel(i);
    setGen((g) => g + 1);
  };

  const demo = useAutoDemo(seen && visible && pageVisible && !tier.reduced, DEMO_MS, () =>
    choose((sel + 1) % FORMAT_ITEMS.length),
  );

  const pick = (i: number) => {
    demo.stop();
    choose(i);
  };

  const rowsIn = seen || tier.reduced;
  const snap = `220ms ${cssEase(EASE.snap)}`;

  return (
    <div
      ref={rootRef}
      className="overflow-hidden rounded-2xl border border-border bg-surface shadow-2xl"
    >
      <div className="flex items-center justify-between border-b border-border px-4 py-3">
        <div className="flex items-center gap-2">
          <p className="text-sm font-medium text-foreground">Mediathek</p>
          <span className="rounded-full bg-foreground/10 px-2 py-0.5 text-[11px] text-muted-foreground">
            {FORMAT_ITEMS.length}
          </span>
        </div>
        <div className="hidden flex-wrap gap-1.5 sm:flex">
          {FORMAT_COUNTS.map((ch) => {
            const on = ch.name === activeChip;
            return (
              <span
                key={ch.name}
                className={cn(
                  "inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px]",
                  on
                    ? "border-foreground bg-foreground text-background"
                    : "border-border bg-surface text-muted-foreground",
                )}
                style={{
                  transition: `background-color ${snap}, color ${snap}, border-color ${snap}`,
                }}
              >
                {ch.name} · {ch.count}
              </span>
            );
          })}
        </div>
      </div>

      <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)]">
        <div className="border-b border-border lg:border-b-0 lg:border-r">
          <div className="border-b border-border px-3 py-2.5">
            <span className="text-xs text-muted-foreground">Motive durchsuchen</span>
          </div>
          <div className="parlo-hide-scrollbar max-h-[420px] overflow-y-auto">
            {FORMAT_ITEMS.map((c, i) => {
              const on = i === sel;
              return (
                <button
                  key={c.name}
                  type="button"
                  onClick={() => pick(i)}
                  onMouseEnter={() => {
                    if (tier.mobile) return;
                    hoverTimer.current = window.setTimeout(() => pick(i), 160);
                  }}
                  onMouseLeave={() => {
                    if (hoverTimer.current) window.clearTimeout(hoverTimer.current);
                  }}
                  aria-pressed={on}
                  className={cn(
                    "relative flex w-full gap-3 px-3 py-3 text-left",
                    !on && "hover:bg-foreground/[0.02]",
                  )}
                  style={{
                    opacity: rowsIn ? 1 : 0,
                    transform: rowsIn ? "translateY(0)" : "translateY(12px)",
                    transition: `opacity 500ms ${cssEase(EASE.rise)} ${i * 50}ms, transform 700ms ${cssEase(EASE.rise)} ${i * 50}ms`,
                  }}
                >
                  {/* Trennlinie zeichnet sich von links */}
                  {i > 0 ? (
                    <span
                      aria-hidden
                      className={cn(
                        "nm-line-x absolute inset-x-0 top-0 h-px bg-border opacity-50",
                        rowsIn && "is-in",
                      )}
                      style={{ ["--nm-delay" as string]: `${120 + i * 50}ms` }}
                    />
                  ) : null}
                  {on ? (
                    <motion.span
                      layoutId="nm-lib-row"
                      className="absolute inset-0 bg-foreground/[0.04]"
                      transition={{ duration: 0.3, ease: EASE.micro }}
                    />
                  ) : null}
                  <div className="relative flex size-8 shrink-0 items-center justify-center rounded-full bg-muted text-[10px] font-medium">
                    {c.initials}
                  </div>
                  <div className="relative min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <p className="truncate text-sm font-medium text-foreground">{c.name}</p>
                      <span
                        className={`shrink-0 rounded-full px-1.5 py-0.5 text-[9px] font-medium ${priorityClass(c.tag)}`}
                      >
                        {c.tag}
                      </span>
                      <span className="ml-auto shrink-0 text-[10px] text-muted-foreground">
                        {c.time}
                      </span>
                    </div>
                    <p className="mt-0.5 truncate text-xs text-muted-foreground">{c.preview}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex min-h-[420px] flex-col">
          <div className="flex items-center justify-between border-b border-border px-4 py-3">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={selected.initials}
                className="flex items-center gap-2"
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.2, ease: EASE.micro }}
              >
                <div className="flex size-8 items-center justify-center rounded-full bg-muted text-[10px] font-medium">
                  {selected.initials}
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">{selected.name}</p>
                  <p className="text-[11px] text-muted-foreground">Markenprofil · 4K</p>
                </div>
              </motion.div>
            </AnimatePresence>
            <ParloPillButton href={APP_URL} variant="ghost" className="h-8 px-3 text-xs">
              Öffnen
            </ParloPillButton>
          </div>

          <div className="flex-1 space-y-4 overflow-y-auto p-4">
            <div className="parlo-grid-dots relative h-[232px] overflow-hidden rounded-xl border border-border bg-surface-elevated sm:h-[260px]">
              <DitherMotif
                src={motif.src}
                aspect={motif.aspect}
                play={seen || tier.reduced}
                generation={gen}
                instant={tier.reduced}
                cell={tier.mobile ? 5 : 4}
                inset={{ top: 14, right: 14, bottom: 58, left: 14 }}
              />
              <div className="absolute inset-x-0 bottom-0 px-4 pb-3 text-center">
                <p className="text-sm font-medium text-foreground">
                  {LIBRARY_KIND[selected.tag] ?? "Motiv"}
                </p>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  <span className="font-mono tabular-nums">{motif.ratio}</span> · Markenlook aktiv
                </p>
              </div>
            </div>
            <div className="rounded-xl bg-surface-elevated p-3">
              <p className="text-xs leading-5 text-muted-foreground">
                Generiert über Markenprofil — Farben und Ton der Brauerei. Bereit für Download
                oder Team-Freigabe in der Mediathek.
              </p>
              <p className="mt-3 text-[11px] text-muted-foreground">Tokens verbraucht · gespeichert</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function MotionChannels() {
  return (
    <section id="formats" className="scroll-mt-24">
      <div className="mx-[30px] border-x border-border py-16 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: EASE.rise }}
          className="mx-auto max-w-3xl px-6 text-center"
        >
          <h2 className="text-balance text-3xl font-medium tracking-tight text-foreground md:text-5xl">
            Ein Dashboard — viele Motive.
          </h2>
          <p className="mt-3 text-lg text-muted-foreground">
            Produkt, Feed, Story, Saison, Event und Händler — aus demselben Markenprofil.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.8, ease: EASE.rise }}
          className="mx-auto mt-12 max-w-6xl px-4 md:px-6"
        >
          <FormatsMock />
        </motion.div>

        <div className="mx-auto mt-12 grid max-w-6xl gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
          {FORMAT_CAPABILITIES.map((c, i) => (
            <motion.div
              key={c.title}
              className="bg-background p-6"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, ease: EASE.rise, delay: 0.08 * i }}
            >
              <motion.div
                initial={{ y: 12 }}
                whileInView={{ y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.8, ease: EASE.rise, delay: 0.08 * i }}
              >
                <h3 className="text-base font-medium text-foreground">{c.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{c.body}</p>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
