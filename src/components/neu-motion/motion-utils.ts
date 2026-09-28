"use client";

import { useEffect, useRef, useState, type RefObject } from "react";

/* ─── Easing (Konzept §7) ─── */

export const EASE = {
  micro: [0.2, 0, 0, 1],
  snap: [0.3, 0, 0, 1],
  rise: [0.16, 1, 0.3, 1],
  draw: [0.65, 0, 0.35, 1],
  morph: [0.76, 0, 0.24, 1],
  count: [0.25, 1, 0.5, 1],
  dense: [0.45, 0, 0.2, 1],
  wave: [0.22, 1, 0.36, 1],
} as const;

export const cssEase = (e: readonly number[]) => `cubic-bezier(${e.join(",")})`;

export function cubicBezier(x1: number, y1: number, x2: number, y2: number) {
  const ax = 3 * x1;
  const bx = 3 * (x2 - x1) - ax;
  const cx = 1 - ax - bx;
  const ay = 3 * y1;
  const by = 3 * (y2 - y1) - ay;
  const cy = 1 - ay - by;
  const sampleX = (t: number) => ((cx * t + bx) * t + ax) * t;
  const sampleDX = (t: number) => (3 * cx * t + 2 * bx) * t + ax;
  const sampleY = (t: number) => ((cy * t + by) * t + ay) * t;
  return (t: number) => {
    if (t <= 0) return 0;
    if (t >= 1) return 1;
    let guess = t;
    for (let i = 0; i < 8; i++) {
      const err = sampleX(guess) - t;
      const d = sampleDX(guess);
      if (Math.abs(err) < 1e-5 || d === 0) break;
      guess -= err / d;
    }
    return sampleY(guess);
  };
}

export const easeFn = (e: readonly number[]) => cubicBezier(e[0], e[1], e[2], e[3]);

export const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);

export const smoothstep = (a: number, b: number, v: number) => {
  const t = clamp01((v - a) / (b - a));
  return t * t * (3 - 2 * t);
};

/* ─── Geräteklasse ─── */

export type MotionTier = {
  /** prefers-reduced-motion: reduce */
  reduced: boolean;
  /** < 1024px oder Touch-Pointer */
  mobile: boolean;
  /** wenige Kerne / Datensparmodus */
  lowPower: boolean;
  /** true sobald clientseitig ausgewertet */
  ready: boolean;
};

const SSR_TIER: MotionTier = { reduced: false, mobile: false, lowPower: false, ready: false };

function readTier(): MotionTier {
  const mm = (q: string) => window.matchMedia(q).matches;
  const nav = navigator as Navigator & {
    connection?: { saveData?: boolean };
    deviceMemory?: number;
  };
  const cores = nav.hardwareConcurrency ?? 8;
  return {
    reduced: mm("(prefers-reduced-motion: reduce)"),
    mobile: mm("(max-width: 1023px)") || mm("(pointer: coarse)"),
    lowPower:
      cores <= 4 ||
      Boolean(nav.connection?.saveData) ||
      (nav.deviceMemory !== undefined && nav.deviceMemory <= 2),
    ready: true,
  };
}

export function useMotionTier(): MotionTier {
  const [tier, setTier] = useState<MotionTier>(SSR_TIER);
  useEffect(() => {
    const update = () => setTier(readTier());
    update();
    const queries = [
      "(prefers-reduced-motion: reduce)",
      "(max-width: 1023px)",
      "(pointer: coarse)",
    ].map((q) => window.matchMedia(q));
    queries.forEach((q) => q.addEventListener("change", update));
    return () => queries.forEach((q) => q.removeEventListener("change", update));
  }, []);
  return tier;
}

/* ─── Sichtbarkeit ─── */

/** Einmalig true, sobald das Element (anteilig) im Viewport war. */
export function useInViewOnce<T extends Element>(
  ref: RefObject<T | null>,
  { threshold = 0.2, rootMargin = "0px" }: { threshold?: number; rootMargin?: string } = {},
) {
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || seen) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setSeen(true);
          io.disconnect();
        }
      },
      { threshold, rootMargin },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [ref, seen, threshold, rootMargin]);
  return seen;
}

/** Laufend: ist das Element gerade sichtbar? (für Pausieren von Loops) */
export function useInView<T extends Element>(
  ref: RefObject<T | null>,
  { threshold = 0, rootMargin = "0px" }: { threshold?: number; rootMargin?: string } = {},
) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setVisible(Boolean(entry?.isIntersecting)),
      { threshold, rootMargin },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [ref, threshold, rootMargin]);
  return visible;
}

/** Tab im Hintergrund? */
export function usePageVisible() {
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    const update = () => setVisible(document.visibilityState === "visible");
    update();
    document.addEventListener("visibilitychange", update);
    return () => document.removeEventListener("visibilitychange", update);
  }, []);
  return visible;
}

/**
 * Auto-Demo, die bei der ersten Nutzerinteraktion dauerhaft stoppt.
 * Läuft nur, solange `running` true ist (sichtbar, kein Reduced Motion).
 */
export function useAutoDemo(
  running: boolean,
  intervalMs: number,
  onTick: () => void,
) {
  const [stopped, setStopped] = useState(false);
  const tickRef = useRef(onTick);
  useEffect(() => {
    tickRef.current = onTick;
  });
  const [cycle, setCycle] = useState(0);

  useEffect(() => {
    if (!running || stopped) return;
    const id = window.setTimeout(() => {
      tickRef.current();
      setCycle((c) => c + 1);
    }, intervalMs);
    return () => window.clearTimeout(id);
  }, [running, stopped, intervalMs, cycle]);

  return {
    active: running && !stopped,
    /** ändert sich pro Intervall — nutzbar als key für Fortschrittsanzeigen */
    cycle,
    stop: () => setStopped(true),
  };
}

/** RGB der aktuellen Vordergrundfarbe (aus den Parlo-Tokens). */
export function readForegroundRgb(el: Element | null): [number, number, number] {
  if (!el) return [250, 250, 250];
  const v = getComputedStyle(el).getPropertyValue("--foreground").trim();
  const hex = v.replace("#", "");
  if (/^[0-9a-f]{6}/i.test(hex)) {
    return [
      parseInt(hex.slice(0, 2), 16),
      parseInt(hex.slice(2, 4), 16),
      parseInt(hex.slice(4, 6), 16),
    ];
  }
  return [250, 250, 250];
}
