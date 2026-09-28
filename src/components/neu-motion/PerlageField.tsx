"use client";

import { useEffect, useRef, type RefObject } from "react";
import { useParloTheme } from "@/components/neu/parlo/ParloTheme";
import {
  EASE,
  easeFn,
  readForegroundRgb,
  smoothstep,
  useMotionTier,
} from "./motion-utils";

/**
 * „Perlage im Raster“ — Kohlensäure wie im Glas: Bläschen steigen in feinen
 * Perlenketten von festen Keimstellen auf, wachsen beim Steigen und werden
 * schneller. Drei Tiefenebenen (hinten weich, Mitte Ringe, vorne Ringe mit
 * Glanzpunkt) plus wenige unscharfe Bokeh-Perlen ganz vorn. Passierte
 * Rasterpunkte leuchten kurz auf.
 *
 * hero: Anstich-Welle legt Raster und Ketten frei.
 * cta:  weniger Ketten, Perlen kommen unter der Headline zur Ruhe.
 */

type Variant = "hero" | "cta";
type Layer = 0 | 1 | 2; // 0 hinten · 1 Mitte · 2 vorne

type Chain = {
  layer: Layer;
  /** Anteil der Breite (0..1) */
  fx: number;
  /** Start-Höhe als Anteil (1 = Unterkante) */
  fy: number;
  speed: number;
  spacing: number;
  r0: number;
  r1: number;
  alpha: number;
  phase: number;
  sway: number;
  /** Weg seit letzter Perle */
  acc: number;
  next: number;
};

type Bubble = { chain: number; y: number; jitter: number };

type Bokeh = { fx: number; y: number; r: number; alpha: number; speed: number; phase: number };

const LAYER = {
  0: { speed: [22, 34], spacing: [10, 16], r0: [0.6, 0.8], r1: [1.1, 1.6], alpha: [0.14, 0.2], sway: 1.2, par: 2 },
  1: { speed: [34, 52], spacing: [14, 22], r0: [0.9, 1.2], r1: [2, 2.6], alpha: [0.3, 0.4], sway: 1.6, par: 4 },
  2: { speed: [60, 85], spacing: [22, 32], r0: [1.6, 2], r1: [4, 5], alpha: [0.5, 0.62], sway: 2, par: 8 },
} as const;

const WAVE_START = 150;
const WAVE_DUR = 1500;
const LIT_DECAY_MS = 650;
const easeWave = easeFn(EASE.wave);

/** Deterministischer Zufall → gleiche Komposition bei jedem Laden */
function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function PerlageField({
  variant,
  guardRef,
  restRef,
  raster = true,
  className = "",
}: {
  variant: Variant;
  /** Box der Schutzzone (Headline + Subline + CTAs) */
  guardRef: RefObject<HTMLElement | null>;
  /** nur cta: Perlen kommen unterhalb dieses Elements zur Ruhe */
  restRef?: RefObject<HTMLElement | null>;
  /** false: nur Perlen, kein Punktraster */
  raster?: boolean;
  className?: string;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const tier = useMotionTier();
  const { theme } = useParloTheme();

  useEffect(() => {
    if (!tier.ready) return;
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const { reduced, mobile, lowPower } = tier;
    const light = theme === "light";
    const [fr, fg, fb] = readForegroundRgb(wrap.closest(".parlo"));
    const rgb = (a: number) => `rgba(${fr},${fg},${fb},${a})`;
    const hero = variant === "hero";

    /* Ketten je Geräteklasse */
    const chainCount: Record<Layer, number> = hero
      ? lowPower
        ? { 0: 0, 1: 5, 2: 1 }
        : mobile
          ? { 0: 7, 1: 5, 2: 2 }
          : { 0: 14, 1: 9, 2: 4 }
      : lowPower
        ? { 0: 0, 1: 3, 2: 0 }
        : mobile
          ? { 0: 4, 1: 3, 2: 1 }
          : { 0: 8, 1: 5, 2: 2 };
    const bokehCount = hero && !mobile && !lowPower ? 4 : 0;
    const litEnabled = raster && !lowPower;
    const parallax = !mobile && !reduced;
    const dprCap = mobile ? 1.5 : 2;
    const spacingGrid = mobile ? 22 : 24;
    const baseAlpha = light ? 0.1 : 0.075;
    const litAlpha = 0.26;
    const alphaScale = light ? 1.1 : 1;

    /* ─── Geometrie ─── */
    let w = 0;
    let h = 0;
    let dpr = 1;
    let cols = 0;
    let rows = 0;
    let ox = 0;
    let oy = 0;
    let lit = new Float32Array(0);
    let litFlag = new Uint8Array(0);
    let active: number[] = [];
    let waveDist = new Float32Array(0);
    const rasterCanvas = document.createElement("canvas");
    const sprite = document.createElement("canvas");
    const guard = { cx: 0, cy: 0, rx: 1, ry: 1 };
    let restY = -Infinity;
    let origin = { x: 0, y: 0 };
    let maxR = 1;

    const zone = (x: number, y: number) => {
      const nx = (x - guard.cx) / guard.rx;
      const ny = (y - guard.cy) / guard.ry;
      return Math.sqrt(nx * nx + ny * ny);
    };
    /** Deckkraft in der Schutzzone: 25 % innen, 100 % außen */
    const zoneMult = (d: number) => 0.25 + 0.75 * smoothstep(0.75, 1.25, d);

    const measureGuard = () => {
      const base = wrap.getBoundingClientRect();
      const g = guardRef.current?.getBoundingClientRect();
      if (g) {
        guard.cx = g.left - base.left + g.width / 2;
        guard.cy = g.top - base.top + g.height / 2;
        guard.rx = (g.width / 2) * 1.12 + 40;
        guard.ry = (g.height / 2) * 1.2 + 28;
      } else {
        guard.cx = w / 2;
        guard.cy = h / 2;
        guard.rx = w * 0.3;
        guard.ry = h * 0.25;
      }
      const r = restRef?.current?.getBoundingClientRect();
      restY = r ? r.bottom - base.top + 6 : -Infinity;
    };

    const buildRaster = () => {
      rasterCanvas.width = Math.round(w * dpr);
      rasterCanvas.height = Math.round(h * dpr);
      const rc = rasterCanvas.getContext("2d");
      if (!rc) return;
      rc.setTransform(dpr, 0, 0, dpr, 0, 0);
      rc.clearRect(0, 0, w, h);
      rc.fillStyle = rgb(baseAlpha);
      for (let j = 0; j < rows; j++) {
        for (let i = 0; i < cols; i++) {
          rc.fillRect(ox + i * spacingGrid - 0.5, oy + j * spacingGrid - 0.5, 1, 1);
        }
      }
    };

    const buildSprite = () => {
      const s = 64;
      sprite.width = s;
      sprite.height = s;
      const sc = sprite.getContext("2d");
      if (!sc) return;
      const g = sc.createRadialGradient(s / 2, s / 2, 0, s / 2, s / 2, s / 2);
      g.addColorStop(0, rgb(1));
      g.addColorStop(0.4, rgb(0.6));
      g.addColorStop(1, rgb(0));
      sc.fillStyle = g;
      sc.fillRect(0, 0, s, s);
    };

    const resize = () => {
      const rect = wrap.getBoundingClientRect();
      w = Math.max(1, rect.width);
      h = Math.max(1, rect.height);
      dpr = Math.min(dprCap, window.devicePixelRatio || 1);
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cols = Math.floor(w / spacingGrid) + 1;
      rows = Math.floor(h / spacingGrid) + 1;
      ox = (w - (cols - 1) * spacingGrid) / 2;
      oy = (h - (rows - 1) * spacingGrid) / 2;
      lit = new Float32Array(cols * rows);
      litFlag = new Uint8Array(cols * rows);
      active = [];
      origin = { x: w / 2, y: h * 0.86 };
      maxR = Math.hypot(Math.max(origin.x, w - origin.x), origin.y) + 60;
      waveDist = new Float32Array(cols * rows);
      for (let j = 0; j < rows; j++) {
        for (let i = 0; i < cols; i++) {
          waveDist[j * cols + i] = Math.hypot(ox + i * spacingGrid - origin.x, oy + j * spacingGrid - origin.y);
        }
      }
      measureGuard();
      buildRaster();
    };

    /* ─── Ketten + Perlen ─── */
    const chains: Chain[] = [];
    const bubbles: Bubble[] = [];
    const bokeh: Bokeh[] = [];

    const seedScene = () => {
      const rnd = mulberry32(hero ? 1307 : 4211);
      const pick = (a: readonly number[]) => a[0] + rnd() * (a[1] - a[0]);
      chains.length = 0;
      bubbles.length = 0;
      bokeh.length = 0;
      ([0, 1, 2] as Layer[]).forEach((layer) => {
        const L = LAYER[layer];
        for (let k = 0; k < chainCount[layer]; k++) {
          /* hintere Ketten überall, vordere eher an den Seiten; Seiten abwechselnd,
             Mindestabstand zu vorhandenen Ketten (keine Doppelketten) */
          const side = k % 2 === 0 ? -1 : 1;
          const inner = layer === 2 ? 0.34 : layer === 1 ? 0.12 : 0.02;
          let fx = 0.5;
          for (let tries = 0; tries < 12; tries++) {
            fx = 0.5 + side * (inner + rnd() * (0.47 - inner));
            const minGap = layer === 2 ? 0.05 : 0.022;
            if (chains.every((c) => Math.abs(c.fx - fx) > minGap)) break;
          }
          const fromWall = rnd() < 0.3;
          chains.push({
            layer,
            fx,
            fy: fromWall ? 0.55 + rnd() * 0.35 : 1.02,
            speed: pick(L.speed),
            spacing: pick(L.spacing),
            r0: pick(L.r0),
            r1: pick(L.r1),
            alpha: pick(L.alpha) * alphaScale,
            phase: rnd() * Math.PI * 2,
            sway: L.sway * (0.6 + rnd() * 0.8),
            acc: 0,
            next: 0,
          });
        }
      });
      for (let k = 0; k < bokehCount; k++) {
        const side = k % 2 === 0 ? -1 : 1;
        bokeh.push({
          fx: 0.5 + side * (0.3 + rnd() * 0.17),
          y: rnd() * h,
          r: 14 + rnd() * 16,
          alpha: (0.035 + rnd() * 0.03) * (light ? 0.8 : 1),
          speed: 6 + rnd() * 6,
          phase: rnd() * Math.PI * 2,
        });
      }
      /* Vorlauf: Ketten sind schon „gezapft“ — die Welle legt sie frei */
      chains.forEach((c, ci) => {
        let y = c.fy * h;
        while (y > -20) {
          const prog = Math.max(0, 1 - y / h);
          bubbles.push({ chain: ci, y, jitter: (Math.random() - 0.5) * 0.8 });
          y -= c.spacing * (0.85 + Math.random() * 0.3) * (0.75 + 0.5 * prog);
        }
        c.next = c.spacing * (0.85 + Math.random() * 0.3);
      });
    };

    const lightCell = (idx: number, gain: number) => {
      if (gain <= lit[idx]) return;
      lit[idx] = gain;
      if (!litFlag[idx]) {
        litFlag[idx] = 1;
        active.push(idx);
      }
    };

    const lightAround = (x: number, y: number, strength: number) => {
      const R = 18;
      const ci = Math.round((x - ox) / spacingGrid);
      const cj = Math.round((y - oy) / spacingGrid);
      for (let dj = -1; dj <= 1; dj++) {
        const j = cj + dj;
        if (j < 0 || j >= rows) continue;
        for (let di = -1; di <= 1; di++) {
          const i = ci + di;
          if (i < 0 || i >= cols) continue;
          const px = ox + i * spacingGrid;
          const py = oy + j * spacingGrid;
          const d = Math.hypot(px - x, py - y);
          if (d >= R) continue;
          const zg = smoothstep(0.95, 1.25, zone(px, py));
          if (zg <= 0) continue;
          lightCell(j * cols + i, (1 - d / R) * strength * zg);
        }
      }
    };

    /* ─── Zeichnen ─── */
    const par = { x: 0, y: 0, tx: 0, ty: 0 };
    let scrollFactor = 1;
    let scrollTarget = 1;

    const drawFrame = (t: number, dt: number) => {
      ctx.clearRect(0, 0, w, h);

      const waveOn = hero && !reduced && t < WAVE_START + WAVE_DUR;
      const waveP = waveOn ? Math.max(0, (t - WAVE_START) / WAVE_DUR) : 1;
      const waveR = waveOn ? easeWave(waveP) * maxR : Infinity;
      /** Sichtbarkeit relativ zur Welle: dahinter frei, davor verborgen */
      const reveal = (x: number, y: number) => {
        if (!waveOn) return 1;
        const d = Math.hypot(x - origin.x, y - origin.y);
        return Math.max(0, Math.min(1, (waveR - d) / 110));
      };

      /* Raster */
      if (raster) {
        if (waveOn) {
          if (waveR > 0) {
            ctx.save();
            ctx.beginPath();
            ctx.arc(origin.x, origin.y, waveR, 0, Math.PI * 2);
            ctx.clip();
            ctx.drawImage(rasterCanvas, 0, 0, w, h);
            ctx.restore();
          }
          const band = 44;
          const fade = 1 - waveP * 0.5;
          for (let idx = 0; idx < waveDist.length; idx++) {
            const dd = waveR - waveDist[idx];
            if (dd < 0 || dd > band) continue;
            const i = idx % cols;
            const j = (idx - i) / cols;
            const zm = zoneMult(zone(ox + i * spacingGrid, oy + j * spacingGrid));
            lightCell(idx, (1 - dd / band) * 0.9 * fade * zm);
          }
        } else {
          ctx.drawImage(rasterCanvas, 0, 0, w, h);
        }

        if (active.length) {
          const decay = dt / LIT_DECAY_MS;
          let write = 0;
          for (let k = 0; k < active.length; k++) {
            const idx = active[k];
            const v = reduced ? lit[idx] : lit[idx] - decay;
            if (v <= 0.01) {
              lit[idx] = 0;
              litFlag[idx] = 0;
              continue;
            }
            lit[idx] = v;
            active[write++] = idx;
            const i = idx % cols;
            const j = (idx - i) / cols;
            ctx.fillStyle = rgb(litAlpha * v);
            const s = 1 + v * 0.7;
            ctx.fillRect(ox + i * spacingGrid - s / 2, oy + j * spacingGrid - s / 2, s, s);
          }
          active.length = write;
        }
      }

      /* Bokeh ganz vorn (unscharf, sehr leise) */
      for (const b of bokeh) {
        const x = b.fx * w + Math.sin(t * 0.00025 + b.phase) * 6 + par.x * 12;
        const y = b.y + par.y * 10;
        const a = b.alpha * reveal(x, y) * smoothstep(0, h * 0.25, y) * zoneMult(zone(x, y));
        if (a <= 0.003) continue;
        const s = b.r * 2;
        ctx.globalAlpha = a;
        ctx.drawImage(sprite, x - s / 2, y - s / 2, s, s);
      }
      ctx.globalAlpha = 1;

      /* Perlenketten */
      const topFadeEnd = h * 0.24;
      for (const b of bubbles) {
        const c = chains[b.chain];
        if (c.alpha <= 0) continue;
        const L = LAYER[c.layer];
        const startY = c.fy * h;
        const prog = Math.max(0, Math.min(1, (startY - b.y) / Math.max(1, startY)));
        const x =
          c.fx * w +
          (reduced ? 0 : Math.sin(t * 0.0007 + c.phase + b.y * 0.012) * c.sway) +
          b.jitter +
          par.x * L.par;
        const y = b.y + par.y * L.par;
        const d = zone(x, y);
        let rest = 1;
        if (restY > -Infinity) rest = smoothstep(restY - 10, restY + 120, y);
        const born = smoothstep(startY, startY - 26, b.y);
        const a =
          c.alpha *
          zoneMult(d) *
          smoothstep(0, topFadeEnd, y) *
          (1 - smoothstep(h * 0.94, h + 12, y)) *
          born *
          rest *
          reveal(x, y);
        if (a <= 0.004) continue;
        const r = c.r0 + (c.r1 - c.r0) * Math.pow(prog, 0.8);

        if (c.layer === 0) {
          const s = r * 3.2;
          ctx.globalAlpha = a;
          ctx.drawImage(sprite, x - s / 2, y - s / 2, s, s);
          ctx.globalAlpha = 1;
        } else {
          ctx.strokeStyle = rgb(a);
          ctx.lineWidth = c.layer === 2 ? 1.1 : 0.9;
          ctx.beginPath();
          ctx.arc(x, y, r, 0, Math.PI * 2);
          ctx.stroke();
          ctx.fillStyle = rgb(a * 0.18);
          ctx.fill();
          if (c.layer === 2) {
            /* Glanzpunkt oben links */
            ctx.fillStyle = rgb(Math.min(1, a * 1.4));
            ctx.beginPath();
            ctx.arc(x - r * 0.38, y - r * 0.38, Math.max(0.6, r * 0.24), 0, Math.PI * 2);
            ctx.fill();
          }
          if (litEnabled && d > 0.95) lightAround(x, y, c.layer === 2 ? 1 : 0.7);
        }
      }
    };

    const step = (dt: number) => {
      const sec = dt / 1000;
      scrollFactor += (scrollTarget - scrollFactor) * 0.08;
      scrollTarget += (1 - scrollTarget) * 0.04;
      par.x += (par.tx - par.x) * 0.06;
      par.y += (par.ty - par.y) * 0.06;

      /* Perlen steigen und werden oben schneller */
      let write = 0;
      for (let k = 0; k < bubbles.length; k++) {
        const b = bubbles[k];
        const c = chains[b.chain];
        const prog = Math.max(0, 1 - b.y / h);
        let v = c.speed * (0.75 + 0.5 * prog) * scrollFactor;
        if (restY > -Infinity) v *= 0.12 + 0.88 * smoothstep(restY - 10, restY + 170, b.y);
        b.y -= v * sec;
        const gone = b.y < -24 || (restY > -Infinity && b.y < restY + 2);
        if (!gone) bubbles[write++] = b;
      }
      bubbles.length = write;

      /* Keimstellen geben neue Perlen ab */
      chains.forEach((c, ci) => {
        c.acc += c.speed * 0.75 * scrollFactor * sec;
        if (c.acc >= c.next) {
          c.acc = 0;
          c.next = c.spacing * (0.85 + Math.random() * 0.3);
          bubbles.push({ chain: ci, y: c.fy * h, jitter: (Math.random() - 0.5) * 0.8 });
        }
      });

      for (const b of bokeh) {
        b.y -= b.speed * sec;
        if (b.y < -40) b.y = h + 40;
      }
    };

    /* ─── Start ─── */
    resize();
    buildSprite();
    seedScene();

    if (reduced) {
      /* stilles Bild: vorgezapfte Ketten, dezent erleuchtetes Raster */
      drawFrame(0, 0);
      drawFrame(0, 0);
      const ro = new ResizeObserver(() => {
        resize();
        seedScene();
        drawFrame(0, 0);
        drawFrame(0, 0);
      });
      ro.observe(wrap);
      return () => ro.disconnect();
    }

    let raf = 0;
    let running = false;
    let inView = false;
    let pageVisible = document.visibilityState === "visible";
    let last = -1;
    let elapsed = 0;
    let slowFrames = 0;
    let degraded = false;

    const loop = (now: number) => {
      raf = requestAnimationFrame(loop);
      if (last < 0) last = now;
      const dt = Math.min(64, now - last);
      last = now;
      elapsed += dt;
      /* adaptive Qualität: dauerhaft > 24 ms/Frame → hintere Ketten ausdünnen */
      if (!degraded && elapsed > 3000) {
        slowFrames = dt > 24 ? slowFrames + 1 : Math.max(0, slowFrames - 1);
        if (slowFrames > 90) {
          degraded = true;
          chains.forEach((c, ci) => {
            if (c.layer === 0 && ci % 2 === 0) c.alpha = 0;
          });
          bokeh.length = 0;
        }
      }
      step(dt);
      drawFrame(elapsed, dt);
    };

    const sync = () => {
      const should = inView && pageVisible;
      if (should && !running) {
        running = true;
        last = -1;
        raf = requestAnimationFrame(loop);
      } else if (!should && running) {
        running = false;
        cancelAnimationFrame(raf);
      }
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        inView = Boolean(entry?.isIntersecting);
        sync();
      },
      { threshold: 0 },
    );
    io.observe(wrap);

    const onVis = () => {
      pageVisible = document.visibilityState === "visible";
      sync();
    };
    document.addEventListener("visibilitychange", onVis);

    const ro = new ResizeObserver(() => {
      const oldH = h;
      resize();
      if (oldH > 0 && Math.abs(oldH - h) > 1) {
        for (const b of bubbles) b.y = (b.y / oldH) * h;
      }
    });
    ro.observe(wrap);

    let lastScrollY = window.scrollY;
    let lastScrollT = performance.now();
    const onScroll = () => {
      const now = performance.now();
      const dy = Math.abs(window.scrollY - lastScrollY);
      const dtS = Math.max(16, now - lastScrollT);
      lastScrollY = window.scrollY;
      lastScrollT = now;
      scrollTarget = Math.max(scrollTarget, 1 + Math.min(0.4, ((dy / dtS) * 1000) / 2500));
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    const onMove = (e: PointerEvent) => {
      if (!parallax || e.pointerType !== "mouse" || !inView) return;
      par.tx = (e.clientX / window.innerWidth - 0.5) * 2;
      par.ty = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("pointermove", onMove, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      document.removeEventListener("visibilitychange", onVis);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("pointermove", onMove);
    };
  }, [tier, theme, variant, guardRef, restRef, raster]);

  return (
    <div
      ref={wrapRef}
      aria-hidden
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      <canvas ref={canvasRef} className="nm-perlage-canvas block size-full" />
    </div>
  );
}
