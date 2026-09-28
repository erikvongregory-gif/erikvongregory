"use client";

import { useCallback, useEffect, useRef } from "react";
import { useParloTheme } from "@/components/neu/parlo/ParloTheme";
import { cn } from "@/lib/utils";
import { EASE, clamp01, cssEase, easeFn, readForegroundRgb } from "./motion-utils";

/**
 * Verdichten statt Einblenden:
 * Format-Rahmen morpht → Punktraster verdichtet sich (Graustufen) → Farbe zuletzt.
 * Bei neuer `generation` löst sich das alte Motiv zuerst wieder ins Raster auf.
 */

const MORPH_MS = 550;
const DENSE_MS = 1000;
const SETTLE_MS = 400;
const COLOR_MS = 300;
const DISSOLVE_MS = 520;

const easeDense = easeFn(EASE.dense);

const BAYER4 = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5].map((v) => v / 16);

const wait = (ms: number) => new Promise<void>((r) => window.setTimeout(r, ms));

const imageCache = new Map<string, Promise<HTMLImageElement>>();
function loadImage(src: string) {
  let p = imageCache.get(src);
  if (!p) {
    p = new Promise<HTMLImageElement>((resolve, reject) => {
      const img = new Image();
      img.decoding = "async";
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = src;
    });
    imageCache.set(src, p);
  }
  return p;
}

type Grid = {
  cols: number;
  rows: number;
  cell: number;
  tone: Float32Array;
  thr: Float32Array;
};

export type DitherMotifProps = {
  src: string;
  /** Breite / Höhe des Zielformats */
  aspect: number;
  ratioLabel?: string;
  /** Sequenz starten (z. B. sobald sichtbar) */
  play: boolean;
  /** Erhöhen → neues Motiv generieren */
  generation: number;
  /** Endzustand sofort zeigen (Reduced Motion / bereits gespielt) */
  instant?: boolean;
  /** Zellgröße des Rasters in CSS-px */
  cell?: number;
  /** Innenabstand des Rahmens zur Box (unten zusätzlich Platz für Labels) */
  inset?: { top: number; right: number; bottom: number; left: number };
  onPhase?: (phase: "morph" | "dense" | "color" | "done") => void;
  className?: string;
  frameClassName?: string;
};

export function DitherMotif({
  src,
  aspect,
  ratioLabel,
  play,
  generation,
  instant = false,
  cell = 4,
  inset = { top: 8, right: 8, bottom: 8, left: 8 },
  onPhase,
  className,
  frameClassName,
}: DitherMotifProps) {
  const boxRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const aspectRef = useRef(1);
  const gridRef = useRef<Grid | null>(null);
  const shownRef = useRef(false);
  const runRef = useRef(0);
  const rafRef = useRef(0);
  const colorRef = useRef<[number, number, number]>([250, 250, 250]);
  const onPhaseRef = useRef(onPhase);
  onPhaseRef.current = onPhase;
  const insetRef = useRef(inset);
  insetRef.current = inset;
  const { theme } = useParloTheme();
  const themeRef = useRef(theme);
  themeRef.current = theme;

  /* Rahmengröße aus Box + Seitenverhältnis */
  const layoutFrame = useCallback((animate: boolean) => {
    const box = boxRef.current;
    const frame = frameRef.current;
    if (!box || !frame) return;
    const ins = insetRef.current;
    const bw = Math.max(1, box.clientWidth - ins.left - ins.right);
    const bh = Math.max(1, box.clientHeight - ins.top - ins.bottom);
    const a = aspectRef.current;
    let fw = bw;
    let fh = bw / a;
    if (fh > bh) {
      fh = bh;
      fw = bh * a;
    }
    frame.style.transition = animate
      ? `width ${MORPH_MS}ms ${cssEase(EASE.morph)}, height ${MORPH_MS}ms ${cssEase(EASE.morph)}, left ${MORPH_MS}ms ${cssEase(EASE.morph)}, top ${MORPH_MS}ms ${cssEase(EASE.morph)}`
      : "none";
    frame.style.width = `${Math.round(fw)}px`;
    frame.style.height = `${Math.round(fh)}px`;
    frame.style.left = `${Math.round(ins.left + (bw - fw) / 2)}px`;
    frame.style.top = `${Math.round(ins.top + (bh - fh) / 2)}px`;
  }, []);

  useEffect(() => {
    const box = boxRef.current;
    if (!box) return;
    layoutFrame(false);
    const ro = new ResizeObserver(() => layoutFrame(false));
    ro.observe(box);
    return () => ro.disconnect();
  }, [layoutFrame]);

  const buildGrid = useCallback(
    (img: HTMLImageElement) => {
      const frame = frameRef.current;
      const canvas = canvasRef.current;
      if (!frame || !canvas) return null;
      const fw = parseFloat(frame.style.width) || frame.clientWidth;
      const fh = parseFloat(frame.style.height) || frame.clientHeight;
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      canvas.width = Math.round(fw * dpr);
      canvas.height = Math.round(fh * dpr);
      canvas.style.width = `${fw}px`;
      canvas.style.height = `${fh}px`;
      const cols = Math.max(2, Math.floor(fw / cell));
      const rows = Math.max(2, Math.floor(fh / cell));
      const sample = document.createElement("canvas");
      sample.width = cols;
      sample.height = rows;
      const sc = sample.getContext("2d", { willReadFrequently: true });
      if (!sc) return null;
      /* object-cover wie das <img> */
      const ia = img.naturalWidth / Math.max(1, img.naturalHeight);
      const fa = fw / Math.max(1, fh);
      let sw = img.naturalWidth;
      let sh = img.naturalHeight;
      if (ia > fa) sw = sh * fa;
      else sh = sw / fa;
      const sx = (img.naturalWidth - sw) / 2;
      const sy = (img.naturalHeight - sh) / 2;
      sc.drawImage(img, sx, sy, sw, sh, 0, 0, cols, rows);
      const data = sc.getImageData(0, 0, cols, rows).data;
      const tone = new Float32Array(cols * rows);
      const thr = new Float32Array(cols * rows);
      const light = themeRef.current === "light";
      for (let j = 0; j < rows; j++) {
        for (let i = 0; i < cols; i++) {
          const k = j * cols + i;
          const l =
            (0.2126 * data[k * 4] + 0.7152 * data[k * 4 + 1] + 0.0722 * data[k * 4 + 2]) / 255;
          const v = light ? 1 - l : l;
          tone[k] = 0.22 + 0.78 * Math.pow(v, 0.85);
          thr[k] = BAYER4[(j % 4) * 4 + (i % 4)] * 0.7 + Math.random() * 0.3;
        }
      }
      return { cols, rows, cell: fw / cols, tone, thr } satisfies Grid;
    },
    [cell],
  );

  /** p: 0..1 Verdichtung, grow: 0..1 Übergang zur Fläche */
  const drawDots = useCallback((p: number, grow: number) => {
    const canvas = canvasRef.current;
    const g = gridRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !g || !ctx) return;
    const dpr = canvas.width / Math.max(1, parseFloat(canvas.style.width) || 1);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const [r, gg, b] = colorRef.current;
    ctx.fillStyle = `rgba(${r},${gg},${b},0.9)`;
    ctx.beginPath();
    const rMax = g.cell * 0.46 * (1 + 0.35 * grow);
    const reach = p * 1.3;
    for (let j = 0; j < g.rows; j++) {
      const cy = (j + 0.5) * g.cell;
      for (let i = 0; i < g.cols; i++) {
        const k = j * g.cols + i;
        const appear = clamp01((reach - g.thr[k]) / 0.3);
        if (appear <= 0) continue;
        const rad = appear * rMax * g.tone[k];
        if (rad < 0.25) continue;
        const cx = (i + 0.5) * g.cell;
        ctx.moveTo(cx + rad, cy);
        ctx.arc(cx, cy, rad, 0, Math.PI * 2);
      }
    }
    ctx.fill();
  }, []);

  const tween = useCallback(
    (ms: number, fn: (t: number) => void, alive: () => boolean) =>
      new Promise<void>((resolve) => {
        const t0 = performance.now();
        const tick = (now: number) => {
          if (!alive()) return resolve();
          const t = Math.min(1, (now - t0) / ms);
          fn(t);
          if (t < 1) rafRef.current = requestAnimationFrame(tick);
          else resolve();
        };
        rafRef.current = requestAnimationFrame(tick);
      }),
    [],
  );

  const setImg = (opacity: number, gray: number, ms: number, delay = 0) => {
    const img = imgRef.current;
    if (!img) return;
    img.style.transition =
      ms > 0
        ? `opacity ${ms}ms ${cssEase(EASE.micro)} ${delay}ms, filter ${ms}ms ${cssEase(EASE.micro)} ${delay}ms`
        : "none";
    img.style.opacity = String(opacity);
    img.style.filter = `grayscale(${gray})`;
  };
  const setCanvas = (opacity: number, ms: number) => {
    const c = canvasRef.current;
    if (!c) return;
    c.style.transition = ms > 0 ? `opacity ${ms}ms ${cssEase(EASE.micro)}` : "none";
    c.style.opacity = String(opacity);
  };
  const setLabel = (opacity: number) => {
    if (labelRef.current) labelRef.current.style.opacity = String(opacity);
  };

  useEffect(() => {
    if (!play) return;
    const token = ++runRef.current;
    const alive = () => runRef.current === token;
    cancelAnimationFrame(rafRef.current);

    const run = async () => {
      const img = imgRef.current;
      if (!img) return;
      colorRef.current = readForegroundRgb(img.closest(".parlo"));

      if (instant) {
        aspectRef.current = aspect;
        layoutFrame(false);
        img.src = src;
        setCanvas(0, 0);
        setImg(1, 0, 0);
        setLabel(0);
        shownRef.current = true;
        onPhaseRef.current?.("done");
        return;
      }

      const loading = loadImage(src);

      /* altes Motiv zurück ins Raster */
      if (shownRef.current && gridRef.current) {
        setImg(1, 1, 200);
        await wait(200);
        if (!alive()) return;
        drawDots(1, 0);
        setCanvas(1, 0);
        setImg(0, 1, 160);
        await tween(DISSOLVE_MS, (t) => drawDots(1 - easeDense(t), 0), alive);
        if (!alive()) return;
        shownRef.current = false;
      }

      /* Format-Rahmen morpht */
      onPhaseRef.current?.("morph");
      setLabel(1);
      const changed = Math.abs(aspectRef.current - aspect) > 0.01;
      aspectRef.current = aspect;
      layoutFrame(true);
      await wait(changed ? MORPH_MS + 20 : 120);
      if (!alive()) return;

      /* Verdichtung */
      let loaded: HTMLImageElement;
      try {
        loaded = await loading;
      } catch {
        return;
      }
      if (!alive()) return;
      gridRef.current = buildGrid(loaded);
      onPhaseRef.current?.("dense");
      setCanvas(1, 0);
      await tween(DENSE_MS, (t) => drawDots(easeDense(t), 0), alive);
      if (!alive()) return;

      /* Punkte werden Fläche, Graustufenbild übernimmt */
      img.src = src;
      setImg(0, 1, 0);
      void img.offsetWidth;
      setImg(1, 1, SETTLE_MS);
      setCanvas(0, SETTLE_MS);
      await tween(SETTLE_MS, (t) => drawDots(1, easeDense(t)), alive);
      if (!alive()) return;

      /* Farbe zuletzt */
      onPhaseRef.current?.("color");
      setImg(1, 0, COLOR_MS);
      setLabel(0);
      await wait(COLOR_MS);
      if (!alive()) return;
      shownRef.current = true;
      onPhaseRef.current?.("done");
    };
    void run();

    return () => {
      /* Lauf wird durch runRef-Token ungültig; RAF stoppen */
      cancelAnimationFrame(rafRef.current);
    };
    // generation steuert Neu-Generierung bewusst
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [play, generation, instant]);

  useEffect(() => () => {
    runRef.current++;
    cancelAnimationFrame(rafRef.current);
  }, []);

  return (
    <div ref={boxRef} className={cn("absolute inset-0", className)}>
      <div
        ref={frameRef}
        className={cn(
          "absolute overflow-hidden rounded-md border border-foreground/[0.14]",
          frameClassName,
        )}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          ref={imgRef}
          alt=""
          aria-hidden
          decoding="async"
          className="absolute inset-0 size-full object-cover"
          style={{ opacity: 0, filter: "grayscale(1)" }}
        />
        <canvas
          ref={canvasRef}
          className="absolute left-0 top-0"
          style={{ opacity: 0 }}
        />
        {ratioLabel ? (
          <span
            ref={labelRef}
            className="absolute left-1.5 top-1 font-mono text-[9px] tabular-nums text-muted-foreground transition-opacity duration-300"
            style={{ opacity: 0 }}
          >
            {ratioLabel}
          </span>
        ) : null}
      </div>
    </div>
  );
}
