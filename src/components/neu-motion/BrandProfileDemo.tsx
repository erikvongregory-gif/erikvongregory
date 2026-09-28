"use client";

import { Check, Globe, Pencil, Upload } from "lucide-react";
import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
import { cn } from "@/lib/utils";
import { EASE, cssEase, useInView, usePageVisible } from "./motion-utils";

/**
 * „Markenprofil“ als geführte Demo:
 * Website tippen → Analysieren → Findings (inkl. Biersorten) → Profil baut sich auf.
 * Stoppt bei der ersten eigenen Interaktion.
 */

const URL = "testbrauerei.de";
const COLORS = ["C7691E", "1A1208", "F4EFE6", "1F3D2B"] as const;
const TONES = ["handwerklich", "warm", "modern", "regional"] as const;
const BEERS = ["Pils", "Helles", "Weizen"] as const;
const HOLD_MS = 5500;

type Phase = "input" | "analyzing" | "building" | "done";

type Finding = {
  id: string;
  label: string;
  detail: string;
  beers?: boolean;
};

const FINDINGS: Finding[] = [
  { id: "site", label: "Website gelesen", detail: "testbrauerei.de · Startseite & Sortiment" },
  { id: "colors", label: "Farben erkannt", detail: "Bernstein · Dunkel · Creme · Grün" },
  { id: "beers", label: "Biersorten", detail: "Aus dem Sortiment abgeleitet", beers: true },
  { id: "tone", label: "Tonalität", detail: "handwerklich · warm · modern · regional" },
];

const sleep = (ms: number) => new Promise<void>((r) => window.setTimeout(r, ms));

export function BrandProfileDemo({
  reduced,
  mobile,
  onSettled,
  allowInterrupt = true,
}: {
  reduced: boolean;
  mobile: boolean;
  /** Einmal nach dem ersten fertigen Profil — für die Auto-Tour */
  onSettled?: () => void;
  /** false = Flow läuft ununterbrochen bis zum ersten „done“ */
  allowInterrupt?: boolean;
}) {
  const rootRef = useRef<HTMLDivElement>(null);
  const fieldRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);

  const visible = useInView(rootRef, { threshold: 0.35 });
  const pageVisible = usePageVisible();

  const [text, setText] = useState(reduced ? URL : "");
  const [focused, setFocused] = useState(false);
  const [phase, setPhase] = useState<Phase>(reduced ? "done" : "input");
  const [findingIdx, setFindingIdx] = useState(reduced ? FINDINGS.length : 0);
  const [buildStep, setBuildStep] = useState(reduced ? 4 : 0);
  const [progress, setProgress] = useState(reduced ? 100 : 0);
  const [pressed, setPressed] = useState<string | null>(null);
  const [cursor, setCursor] = useState({ x: 0, y: 0, on: false, down: false });
  const [manual, setManual] = useState(reduced);

  const tokenRef = useRef(0);
  const settledRef = useRef(false);
  const onSettledRef = useRef(onSettled);
  useEffect(() => {
    onSettledRef.current = onSettled;
  });

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

  const markSettled = useCallback(() => {
    if (settledRef.current) return;
    settledRef.current = true;
    onSettledRef.current?.();
  }, []);

  /* Geführte Demo — Loop, solange sichtbar und niemand eingreift */
  useEffect(() => {
    if (reduced || manual || !visible || !pageVisible) return;
    const token = ++tokenRef.current;
    const alive = () => tokenRef.current === token;

    const play = async () => {
      while (alive()) {
        setPhase("input");
        setText("");
        setFocused(false);
        setFindingIdx(0);
        setBuildStep(0);
        setProgress(0);
        const root = rootRef.current;
        if (root) {
          const r = root.getBoundingClientRect();
          setCursor({ x: r.width * 0.55, y: r.height * 0.35, on: false, down: false });
        }
        await sleep(450);
        if (!alive()) return;

        /* 1 · Feld fokussieren und tippen */
        if (!mobile) moveTo(fieldRef.current, -40, 0);
        await sleep(mobile ? 180 : 650);
        if (!alive()) return;
        await click("field", alive);
        setFocused(true);
        await sleep(220);
        for (let i = 1; i <= URL.length; i++) {
          if (!alive()) return;
          setText(URL.slice(0, i));
          const ch = URL[i - 1];
          await sleep(ch === "." ? 90 : 36 + Math.random() * 32);
        }
        await sleep(400);
        if (!alive()) return;

        /* 2 · Analysieren */
        if (!mobile) moveTo(btnRef.current);
        await sleep(mobile ? 220 : 600);
        if (!alive()) return;
        await click("analyze", alive);
        setFocused(false);
        setCursor((c) => ({ ...c, on: false }));
        setPhase("analyzing");
        setProgress(0);

        /* Findings + Fortschritt */
        for (let i = 0; i < FINDINGS.length; i++) {
          if (!alive()) return;
          await sleep(i === 0 ? 380 : 720);
          if (!alive()) return;
          setFindingIdx(i + 1);
          setProgress(Math.round(((i + 1) / FINDINGS.length) * 100));
        }
        await sleep(500);
        if (!alive()) return;

        /* 3 · Profil aufbauen */
        setPhase("building");
        for (let s = 1; s <= 4; s++) {
          if (!alive()) return;
          setBuildStep(s);
          await sleep(380);
        }
        if (!alive()) return;
        setPhase("done");
        markSettled();

        await sleep(HOLD_MS);
        if (!alive()) return;
      }
    };
    void play();
    return () => {
      tokenRef.current++;
    };
  }, [reduced, manual, visible, pageVisible, mobile, moveTo, click, markSettled]);

  useEffect(() => {
    if (reduced) markSettled();
  }, [reduced, markSettled]);

  const takeOver = () => {
    if (!allowInterrupt || manual) return;
    tokenRef.current++;
    setManual(true);
    setCursor((c) => ({ ...c, on: false }));
    setPressed(null);
    if (phase === "input" && !text) {
      setText(URL);
    }
    if (phase === "input" || phase === "analyzing") {
      setFindingIdx(FINDINGS.length);
      setProgress(100);
      setBuildStep(4);
      setPhase("done");
    } else if (phase === "building") {
      setBuildStep(4);
      setPhase("done");
    }
    markSettled();
  };

  const startAnalyze = () => {
    if (!allowInterrupt && !manual) return;
    if (!manual) {
      tokenRef.current++;
      setManual(true);
      setCursor((c) => ({ ...c, on: false }));
    }
    const token = ++tokenRef.current;
    const alive = () => tokenRef.current === token;
    if (!text.trim()) setText(URL);
    setFocused(false);
    setPhase("analyzing");
    setFindingIdx(0);
    setProgress(0);
    setBuildStep(0);
    void (async () => {
      for (let i = 0; i < FINDINGS.length; i++) {
        await sleep(500);
        if (!alive()) return;
        setFindingIdx(i + 1);
        setProgress(Math.round(((i + 1) / FINDINGS.length) * 100));
      }
      await sleep(300);
      if (!alive()) return;
      setPhase("building");
      for (let s = 1; s <= 4; s++) {
        setBuildStep(s);
        await sleep(280);
        if (!alive()) return;
      }
      setPhase("done");
      markSettled();
    })();
  };

  const showProfile = phase === "building" || phase === "done";
  const showSetup = phase === "input" || phase === "analyzing";
  const snap = `200ms ${cssEase(EASE.snap)}`;
  const rise = cssEase(EASE.rise);

  return (
    <div
      ref={rootRef}
      className="relative flex h-full min-h-0 flex-col overflow-hidden bg-background"
      onPointerDownCapture={allowInterrupt ? takeOver : undefined}
    >
      {/* Setup: URL + Analyse */}
      <div
        className="absolute inset-0 flex flex-col overflow-y-auto p-4 md:p-6"
        style={{
          opacity: showSetup ? 1 : 0,
          pointerEvents: showSetup && manual && allowInterrupt ? "auto" : "none",
          transform: showSetup ? "translateY(0)" : "translateY(-8px)",
          transition: `opacity 400ms ${rise}, transform 400ms ${rise}`,
        }}
        aria-hidden={!showSetup}
      >
        <div>
          <p className="text-[11px] font-medium uppercase tracking-[0.08em] text-muted-foreground">
            Markenprofil · einrichten
          </p>
          <h3 className="mt-1 text-xl font-semibold tracking-tight text-foreground">
            Website einlesen
          </h3>
          <p className="mt-1 text-sm text-muted-foreground">
            BrewAI erkennt Farben, Ton und Sortiment — daraus entsteht euer Profil.
          </p>
        </div>

        <div className="mt-5 rounded-2xl border border-border bg-surface p-3 shadow-sm sm:p-4">
          <label className="text-[11px] font-medium uppercase tracking-[0.08em] text-muted-foreground">
            Website oder Brauereiname
          </label>
          <div
            ref={fieldRef}
            className={cn(
              "mt-2 flex min-h-[44px] items-center gap-2 rounded-xl border bg-background px-3 text-sm transition-colors",
              focused ? "border-foreground/30" : "border-border",
              text ? "text-foreground" : "text-muted-foreground",
            )}
          >
            <Globe className="size-3.5 shrink-0 text-muted-foreground" strokeWidth={1.75} />
            <span className="min-w-0 flex-1 truncate">
              {text || (focused ? "" : "z. B. testbrauerei.de")}
              {focused ? (
                <span
                  aria-hidden
                  className="nm-caret ml-px inline-block h-[1.05em] w-px translate-y-[2px] bg-foreground"
                />
              ) : null}
            </span>
          </div>
          <button
            ref={btnRef}
            type="button"
            disabled={phase === "analyzing"}
            onClick={startAnalyze}
            className="mt-3 inline-flex h-9 w-full items-center justify-center rounded-full bg-foreground px-4 text-xs font-medium text-background disabled:opacity-70 sm:w-auto"
            style={{
              transform: pressed === "analyze" ? "scale(0.96)" : "scale(1)",
              transition: `transform ${snap}, opacity ${snap}`,
            }}
          >
            {phase === "analyzing" ? "Analysiert …" : "Analysieren"}
          </button>
        </div>

        {/* Analyse-Findings */}
        <div
          className="mt-4 space-y-2"
          style={{
            opacity: phase === "analyzing" || findingIdx > 0 ? 1 : 0,
            transition: `opacity 300ms ${cssEase(EASE.micro)}`,
          }}
        >
          <div className="flex items-center justify-between text-[11px] text-muted-foreground">
            <span>Website wird analysiert</span>
            <span className="tabular-nums">{progress}%</span>
          </div>
          <div className="h-1.5 overflow-hidden rounded-full bg-muted">
            <div
              className="h-full rounded-full bg-foreground/70"
              style={{
                width: `${progress}%`,
                transition: `width 500ms ${cssEase(EASE.draw)}`,
              }}
            />
          </div>

          <ul className="mt-3 space-y-2">
            {FINDINGS.map((f, i) => {
              const on = i < findingIdx;
              return (
                <li
                  key={f.id}
                  className="rounded-xl border border-border bg-surface px-3 py-2.5"
                  style={{
                    opacity: on ? 1 : 0,
                    transform: on ? "translateY(0)" : "translateY(6px)",
                    transition: `opacity 400ms ${rise}, transform 500ms ${rise}`,
                  }}
                >
                  <div className="flex items-start gap-2.5">
                    <span className="mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
                      <Check className="size-2.5" strokeWidth={3} />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-medium text-foreground">{f.label}</p>
                      <p className="mt-0.5 text-[11px] text-muted-foreground">{f.detail}</p>
                      {f.beers ? (
                        <div className="mt-2 flex flex-wrap gap-1.5">
                          {BEERS.map((b) => (
                            <span
                              key={b}
                              className="rounded-full border border-foreground/15 bg-foreground/[0.06] px-2.5 py-0.5 text-[11px] text-foreground"
                            >
                              {b}
                            </span>
                          ))}
                        </div>
                      ) : null}
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      {/* Fertiges Profil */}
      <div
        className="absolute inset-0 overflow-y-auto"
        style={{
          opacity: showProfile ? 1 : 0,
          pointerEvents: showProfile ? "auto" : "none",
          transform: showProfile ? "translateY(0)" : "translateY(10px)",
          transition: `opacity 450ms ${rise}, transform 500ms ${rise}`,
        }}
        aria-hidden={!showProfile}
      >
        <ProfileBuilt step={buildStep} done={phase === "done"} />
      </div>

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

function ProfileBuilt({ step, done }: { step: number; done: boolean }) {
  const rise = cssEase(EASE.rise);
  const block = (n: number): CSSProperties => ({
    opacity: step >= n ? 1 : 0,
    transform: step >= n ? "translateY(0)" : "translateY(8px)",
    transition: `opacity 420ms ${rise}, transform 520ms ${rise}`,
  });

  return (
    <div className="space-y-6 p-4 md:p-6">
      <div style={block(1)} className="flex items-start justify-between gap-3">
        <div>
          <p className="text-[11px] font-medium uppercase tracking-[0.08em] text-muted-foreground">
            Markenprofil · aktiv
          </p>
          <h3 className="mt-1 text-xl font-semibold tracking-tight text-foreground">
            Testbrauerei
          </h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Diese Vorgaben fließen automatisch in jede Generierung ein.
          </p>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {BEERS.map((b) => (
              <span
                key={b}
                className="rounded-full border border-foreground/15 bg-foreground/[0.06] px-2.5 py-0.5 text-[10px] text-foreground"
              >
                {b}
              </span>
            ))}
          </div>
        </div>
        <span className="inline-flex shrink-0 items-center gap-1 rounded-lg border border-border px-2.5 py-1.5 text-[11px] text-muted-foreground">
          <Pencil className="size-3" />
          Neu einlesen
        </span>
      </div>

      <div style={block(2)} className="grid gap-4 md:grid-cols-2">
        <div className="overflow-hidden rounded-xl bg-[#1c1c1c] p-5 text-white shadow-sm">
          <p className="text-[10px] font-medium uppercase tracking-wider text-white/40">
            Branding
          </p>
          <p className="mt-1 text-sm text-white/70">Typography</p>
          <p className="mt-4 text-4xl font-semibold tracking-tight">
            Aa<span className="text-white/40">Bb</span>
          </p>
          <p className="mt-2 text-xs text-white/45">Work Sans</p>
        </div>

        <div className="flex min-h-[140px] flex-col overflow-hidden rounded-xl border border-border bg-surface shadow-sm">
          <div className="flex min-h-0 flex-1">
            {COLORS.map((c) => (
              <div
                key={c}
                className="flex flex-1 items-end justify-center pb-2"
                style={{ backgroundColor: `#${c}` }}
              >
                <span
                  className={cn(
                    "text-[9px] font-medium tracking-wider opacity-0 md:opacity-70",
                    c === "F4EFE6" ? "text-neutral-800" : "text-white",
                  )}
                >
                  {c}
                </span>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-between gap-2 px-3 py-2.5 text-[11px] text-muted-foreground">
            <span className="truncate">testbrauerei.de · Zuletzt analysiert · gerade eben</span>
            <span className="shrink-0 text-[10px] font-medium uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
              Verbunden
            </span>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border bg-surface px-4 py-6 text-center md:col-span-2 md:col-start-1 md:row-start-2 md:max-w-[calc(50%-0.5rem)]">
          <Upload className="size-5 text-muted-foreground" strokeWidth={1.5} />
          <p className="mt-2 text-sm font-medium text-foreground">Schrift hochladen</p>
          <p className="mt-1 text-[11px] text-muted-foreground">
            .woff2, .woff, .ttf, .otf · max. 2 MB
          </p>
        </div>
      </div>

      <div style={block(3)} className="max-w-md space-y-2">
        <div className="flex items-center justify-between text-xs">
          <span className="rounded-full bg-emerald-500/15 px-2 py-0.5 font-medium text-emerald-700 dark:text-emerald-400">
            Sehr stark
          </span>
          <span className="tabular-nums text-muted-foreground">94%</span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-muted">
          <div
            className="h-full rounded-full bg-emerald-500"
            style={{
              width: step >= 3 ? "94%" : "0%",
              transition: `width 700ms ${cssEase(EASE.count)}`,
            }}
          />
        </div>
      </div>

      <div style={block(4)} className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_220px]">
        <div className="rounded-2xl border border-border bg-surface p-4 shadow-sm sm:p-5">
          <p className="text-[11px] font-medium uppercase tracking-[0.08em] text-muted-foreground">
            Tonalität
          </p>
          <p className="mt-1 text-sm text-foreground">Stimme der Marke</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {TONES.map((t) => (
              <span
                key={t}
                className="rounded-full border border-foreground/15 bg-foreground/[0.06] px-3 py-1 text-xs text-foreground"
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        <aside className="rounded-2xl border border-border bg-surface p-4 shadow-sm">
          <p className="text-sm font-medium text-foreground">Brand-Lock</p>
          <p className="mt-1 text-[11px] leading-relaxed text-muted-foreground">
            Wie streng BrewAI sich an dein Markenprofil hält.
          </p>
          <div className="mt-3 space-y-2">
            {[
              { id: "strict", label: "Strict", sub: "Maximale Markenbindung", on: true },
              { id: "balanced", label: "Balanced", sub: "Stil + kreativer Spielraum", on: false },
              { id: "loose", label: "Frei", sub: "Profil als lose Inspiration", on: false },
            ].map((opt) => (
              <div
                key={opt.id}
                className={cn(
                  "rounded-xl bg-muted/50 p-2.5",
                  opt.on && "ring-1 ring-foreground/20",
                )}
              >
                <div className="flex items-center gap-2">
                  <span
                    className={cn(
                      "size-3.5 rounded-full border",
                      opt.on
                        ? "border-foreground bg-foreground"
                        : "border-muted-foreground/40",
                    )}
                  />
                  <span className="text-xs font-medium text-foreground">{opt.label}</span>
                </div>
                <p className="mt-0.5 pl-5 text-[10px] text-muted-foreground">{opt.sub}</p>
              </div>
            ))}
          </div>
        </aside>
      </div>

      <p
        className="rounded-lg border border-dashed border-border bg-muted/40 px-3 py-2 text-[11px] text-muted-foreground"
        style={{
          opacity: done ? 1 : 0,
          transition: `opacity 400ms ${cssEase(EASE.micro)}`,
        }}
      >
        Readonly-Vorschau — bearbeiten geht nur eingeloggt im Dashboard.
      </p>
    </div>
  );
}
