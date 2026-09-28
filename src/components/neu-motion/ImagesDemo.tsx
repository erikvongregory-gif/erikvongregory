"use client";

import { Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { DitherMotif } from "./DitherMotif";
import { EASE, cssEase, useInView, usePageVisible } from "./motion-utils";

/**
 * „Bilder erstellen“ als geführte Demo:
 * Prompt wird eingetippt → Fotostil „Reportage“ → „Hyperreal“ an → Generieren →
 * Motiv verdichtet sich im Hero-Bereich. Bedienelemente wie im echten Composer
 * (app.brewai.de: Fotostil-Segment + Hyperreal-Switch).
 * Stoppt bei der ersten eigenen Interaktion; danach ist alles manuell bedienbar.
 */

const PROMPT = "Luna Barrels wird von Kellnerin serviert";
const RESULT = { src: "/neu-motion/motifs/reportage-luna-barrels.webp", aspect: 4 / 5 };
const HOLD_MS = 6500;

type PhotoStyle = "reportage" | "premium" | "campaign";
const PHOTO_STYLES: { value: PhotoStyle; label: string }[] = [
  { value: "reportage", label: "Reportage" },
  { value: "premium", label: "Premium" },
  { value: "campaign", label: "Kampagne" },
];

type Phase = "idle" | "generating" | "done";

const sleep = (ms: number) => new Promise<void>((r) => window.setTimeout(r, ms));

export function ImagesDemo({
  reduced,
  mobile,
  onGenerated,
}: {
  reduced: boolean;
  mobile: boolean;
  onGenerated: () => void;
}) {
  const rootRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const styleRefs = useRef<Record<PhotoStyle, HTMLButtonElement | null>>({
    reportage: null,
    premium: null,
    campaign: null,
  });
  const hyperRef = useRef<HTMLButtonElement>(null);
  const genRef = useRef<HTMLButtonElement>(null);

  const visible = useInView(rootRef, { threshold: 0.4 });
  const pageVisible = usePageVisible();

  const [text, setText] = useState(reduced ? PROMPT : "");
  const [focused, setFocused] = useState(false);
  const [photoStyle, setPhotoStyle] = useState<PhotoStyle>(reduced ? "reportage" : "premium");
  const [hyperreal, setHyperreal] = useState(reduced);
  const [aspect, setAspect] = useState("4:5");
  const [phase, setPhase] = useState<Phase>(reduced ? "done" : "idle");
  const [run, setRun] = useState(reduced ? 1 : 0);
  const [pressed, setPressed] = useState<string | null>(null);
  const [cursor, setCursor] = useState({ x: 0, y: 0, on: false, down: false });
  const [manual, setManual] = useState(reduced);

  const tokenRef = useRef(0);
  const onGeneratedRef = useRef(onGenerated);
  useEffect(() => {
    onGeneratedRef.current = onGenerated;
  });

  /** Cursor auf die Mitte eines Elements setzen */
  const moveTo = useCallback((el: HTMLElement | null, dx = 0, dy = 0) => {
    const root = rootRef.current;
    if (!root || !el) return;
    const a = root.getBoundingClientRect();
    const b = el.getBoundingClientRect();
    setCursor((c) => ({
      ...c,
      on: true,
      x: b.left - a.left + b.width / 2 + dx,
      y: b.top - a.top + b.height / 2 + dy,
    }));
  }, []);

  const click = useCallback(async (id: string, alive: () => boolean) => {
    setCursor((c) => ({ ...c, down: true }));
    setPressed(id);
    await sleep(140);
    if (!alive()) return;
    setCursor((c) => ({ ...c, down: false }));
    setPressed(null);
  }, []);

  /* Geführte Demo — läuft in Schleife, solange sichtbar und niemand eingreift */
  useEffect(() => {
    if (reduced || manual || !visible || !pageVisible) return;
    const token = ++tokenRef.current;
    const alive = () => tokenRef.current === token;

    const play = async () => {
      while (alive()) {
        /* Ausgangslage */
        setPhase("idle");
        setText("");
        setFocused(false);
        setPhotoStyle("premium");
        setHyperreal(false);
        setAspect("4:5");
        const root = rootRef.current;
        if (root) {
          const r = root.getBoundingClientRect();
          setCursor({ x: r.width * 0.72, y: r.height * 0.55, on: false, down: false });
        }
        await sleep(500);
        if (!alive()) return;

        /* 1 · ins Prompt-Feld klicken und tippen */
        if (!mobile) moveTo(textRef.current, -60, 0);
        await sleep(mobile ? 200 : 700);
        if (!alive()) return;
        await click("text", alive);
        setFocused(true);
        await sleep(250);
        for (let i = 1; i <= PROMPT.length; i++) {
          if (!alive()) return;
          setText(PROMPT.slice(0, i));
          const ch = PROMPT[i - 1];
          await sleep(ch === " " ? 70 : 38 + Math.random() * 34);
        }
        await sleep(450);
        if (!alive()) return;

        /* 2 · Fotostil „Reportage“ */
        if (!mobile) moveTo(styleRefs.current.reportage);
        await sleep(mobile ? 250 : 650);
        if (!alive()) return;
        await click("reportage", alive);
        setPhotoStyle("reportage");
        await sleep(500);
        if (!alive()) return;

        /* 3 · Hyperreal an */
        if (!mobile) moveTo(hyperRef.current);
        await sleep(mobile ? 250 : 600);
        if (!alive()) return;
        await click("hyper", alive);
        setHyperreal(true);
        await sleep(550);
        if (!alive()) return;

        /* 4 · Generieren */
        if (!mobile) moveTo(genRef.current);
        await sleep(mobile ? 250 : 650);
        if (!alive()) return;
        await click("generate", alive);
        setFocused(false);
        setCursor((c) => ({ ...c, on: false }));
        setRun((n) => n + 1);
        setPhase("generating");

        /* Ergebnis verdichtet sich (DitherMotif meldet „done“) — dann halten */
        await sleep(2900 + HOLD_MS);
        if (!alive()) return;
      }
    };
    void play();
    return () => {
      tokenRef.current++;
    };
  }, [reduced, manual, visible, pageVisible, mobile, moveTo, click]);

  /* Eigene Interaktion → Demo stoppt, Bedienung wird manuell */
  const takeOver = () => {
    if (manual) return;
    tokenRef.current++;
    setManual(true);
    setCursor((c) => ({ ...c, on: false }));
    setPressed(null);
  };

  const generate = () => {
    setRun((n) => n + 1);
    setPhase("generating");
    setFocused(false);
  };

  const showResult = phase !== "idle";
  const snap = `200ms ${cssEase(EASE.snap)}`;

  return (
    <div
      ref={rootRef}
      className="relative flex h-full min-h-0 flex-col bg-background"
      onPointerDownCapture={takeOver}
    >
      {/* Hero ↔ Ergebnis */}
      <div className="relative flex min-h-0 flex-1 flex-col items-center justify-center px-4">
        <div
          className="flex flex-col items-center"
          style={{
            opacity: showResult ? 0 : 1,
            transform: showResult ? "translateY(-6px)" : "translateY(0)",
            transition: `opacity 300ms ${cssEase(EASE.micro)}, transform 300ms ${cssEase(EASE.micro)}`,
          }}
        >
          <h3 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            BrewAI
          </h3>
          <p className="mt-2 text-sm text-muted-foreground">Ideen brauen. Bilder zapfen.</p>
        </div>

        {run > 0 ? (
          <div
            className="absolute inset-0"
            style={{ opacity: showResult ? 1 : 0, transition: `opacity 300ms ${cssEase(EASE.micro)}` }}
          >
            <DitherMotif
              key={run}
              src={RESULT.src}
              aspect={RESULT.aspect}
              ratioLabel="4:5"
              play={showResult}
              generation={1}
              instant={reduced}
              cell={mobile ? 5 : 4}
              inset={{ top: 14, right: 16, bottom: 10, left: 16 }}
              onPhase={(p) => {
                if (p === "done") {
                  setPhase("done");
                  if (!reduced) onGeneratedRef.current();
                }
              }}
            />
          </div>
        ) : null}
      </div>

      <div className="shrink-0 px-3 pb-3 sm:px-4 sm:pb-4">
        <p
          className="mb-2 text-center text-[11px] text-muted-foreground"
          style={{ opacity: phase === "done" ? 1 : 0, transition: `opacity 300ms ${cssEase(EASE.micro)}` }}
        >
          Im Dashboard verbraucht das Tokens und speichert in der Mediathek.
        </p>
        <div className="relative mx-auto max-w-xl overflow-hidden rounded-2xl border border-border bg-surface shadow-sm">
          <div
            className="pointer-events-none absolute -inset-px rounded-2xl opacity-40"
            style={{
              background:
                "radial-gradient(60% 80% at 50% 0%, color-mix(in oklab, #C7691E 18%, transparent), transparent 70%)",
            }}
            aria-hidden
          />
          <div className="relative">
            {/* Prompt */}
            <div
              ref={textRef}
              className={cn(
                "min-h-[52px] px-4 py-3 text-sm transition-colors",
                text ? "text-foreground" : "text-muted-foreground",
              )}
            >
              {text || (focused ? "" : "Beschreibe dein Bild…")}
              {focused ? (
                <span
                  aria-hidden
                  className="nm-caret ml-px inline-block h-[1.05em] w-px translate-y-[2px] bg-foreground"
                />
              ) : null}
            </div>

            {/* Fotostil + Hyperreal — wie im echten Composer */}
            <div className="flex flex-col gap-2 border-t border-border/60 px-2.5 pt-2.5 sm:flex-row sm:items-center sm:justify-between">
              <div
                className="grid w-full grid-cols-3 gap-1 rounded-xl border border-border bg-muted/40 p-1 sm:w-[15.5rem]"
                role="radiogroup"
                aria-label="Fotostil"
              >
                {PHOTO_STYLES.map((o) => {
                  const on = photoStyle === o.value;
                  return (
                    <button
                      key={o.value}
                      ref={(el) => {
                        styleRefs.current[o.value] = el;
                      }}
                      type="button"
                      role="radio"
                      aria-checked={on}
                      onClick={() => setPhotoStyle(o.value)}
                      className={cn(
                        "relative rounded-lg px-1 py-1.5 text-[10px] font-semibold leading-tight sm:text-[11px]",
                        on ? "text-foreground" : "text-muted-foreground hover:text-foreground",
                      )}
                      style={{
                        transform: pressed === o.value ? "scale(0.96)" : "scale(1)",
                        transition: `transform ${snap}, color ${snap}`,
                      }}
                    >
                      {on ? (
                        <motion.span
                          layoutId="nm-photostyle"
                          className="absolute inset-0 rounded-lg bg-background shadow-sm dark:bg-white/10"
                          transition={{ duration: 0.3, ease: EASE.micro }}
                        />
                      ) : null}
                      <span className="relative">{o.label}</span>
                    </button>
                  );
                })}
              </div>

              <button
                ref={hyperRef}
                type="button"
                role="switch"
                aria-checked={hyperreal}
                onClick={() => setHyperreal((v) => !v)}
                className="flex shrink-0 items-center gap-2 self-start px-1 text-xs font-medium text-foreground sm:self-auto"
                style={{
                  transform: pressed === "hyper" ? "scale(0.96)" : "scale(1)",
                  transition: `transform ${snap}`,
                }}
              >
                <span
                  className={cn(
                    "relative inline-flex h-4 w-7 items-center rounded-full",
                    hyperreal ? "bg-emerald-600" : "bg-foreground/15",
                  )}
                  style={{ transition: `background-color ${snap}` }}
                >
                  <span
                    className="absolute left-0.5 size-3 rounded-full bg-white shadow-sm"
                    style={{
                      transform: hyperreal ? "translateX(12px)" : "translateX(0)",
                      transition: `transform 220ms ${cssEase(EASE.snap)}`,
                    }}
                  />
                </span>
                Hyperreal
              </button>
            </div>

            <div className="flex flex-col gap-2 p-2.5 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex min-w-0 items-center gap-0.5 overflow-x-auto parlo-hide-scrollbar">
                {[
                  { id: "sorte", label: "Sorte" },
                  { id: "char", label: "Charakter" },
                ].map((b) => (
                  <span
                    key={b.id}
                    className="inline-flex shrink-0 items-center gap-1 rounded-lg px-2 py-1.5 text-xs text-muted-foreground"
                  >
                    {b.label}
                  </span>
                ))}
                {["1:1", "4:5", "9:16", "16:9"].map((f) => (
                  <button
                    key={f}
                    type="button"
                    onClick={() => setAspect(f)}
                    className={cn(
                      "inline-flex shrink-0 rounded-lg px-2 py-1.5 text-xs tabular-nums transition-colors",
                      aspect === f
                        ? "bg-foreground/[0.08] font-medium text-foreground"
                        : "text-muted-foreground hover:bg-foreground/[0.04]",
                    )}
                  >
                    {f}
                  </button>
                ))}
                <span className="inline-flex shrink-0 rounded-lg px-2 py-1.5 text-xs text-muted-foreground">
                  1K
                </span>
              </div>
              <button
                ref={genRef}
                type="button"
                onClick={generate}
                disabled={phase === "generating"}
                className="inline-flex h-8 shrink-0 items-center justify-center gap-1.5 rounded-full bg-foreground px-4 text-xs font-medium text-background disabled:opacity-70"
                style={{
                  transform: pressed === "generate" ? "scale(0.95)" : "scale(1)",
                  transition: `transform ${snap}, opacity ${snap}`,
                }}
              >
                <Sparkles className="size-3.5" />
                {phase === "generating" ? "Generiert …" : "Generieren"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Demo-Cursor (nur Desktop, nur während der geführten Demo) */}
      {!mobile && !manual ? (
        <svg
          aria-hidden
          width="16"
          height="20"
          viewBox="0 0 16 20"
          className="pointer-events-none absolute left-0 top-0 z-20 text-foreground"
          style={{
            opacity: cursor.on ? 1 : 0,
            transform: `translate(${cursor.x - 2}px, ${cursor.y - 2}px) scale(${cursor.down ? 0.86 : 1})`,
            transformOrigin: "2px 2px",
            transition: `transform 620ms ${cssEase(EASE.draw)}, opacity 250ms ${cssEase(EASE.micro)}`,
          }}
        >
          <path
            d="M1.5 1.5v14.2l3.9-3.6 2.6 6 2.5-1.1-2.6-5.9h5.3z"
            fill="currentColor"
            stroke="var(--background)"
            strokeWidth="1.2"
            strokeLinejoin="round"
          />
        </svg>
      ) : null}
    </div>
  );
}
