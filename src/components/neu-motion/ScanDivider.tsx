"use client";

import { useEffect, useRef } from "react";
import { useParloTheme } from "@/components/neu/parlo/ParloTheme";
import { EASE, easeFn, readForegroundRgb, useMotionTier } from "./motion-utils";

const SCAN_MS = 900;
const easeScan = easeFn(EASE.draw);

/**
 * Rasterstreifen wie ParloSnakeDivider — plus einmaliger Scan:
 * kreuzt der Streifen die Viewport-Mitte, läuft ein schmales Lichtband
 * einmal über die Punkte. Neu scharf geschaltet erst, wenn er den Viewport verlässt.
 */
export function ScanDivider({
  boardColor = "rgba(128,128,128,0.14)",
  cellSize = 5,
  gap = 1,
  rounded = 20,
}: {
  boardColor?: string;
  cellSize?: number;
  gap?: number;
  rounded?: number;
} = {}) {
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
    const [fr, fg, fb] = readForegroundRgb(wrap.closest(".parlo"));
    const stride = cellSize + gap;
    const board = document.createElement("canvas");

    let w = 0;
    let h = 0;
    let dpr = 1;
    let cols = 0;
    let rows = 0;
    let cw = 0;
    let ch = 0;
    let radius = 0;

    const cellPath = (c: CanvasRenderingContext2D, col: number, row: number) => {
      const x = col * (cw + gap);
      const y = row * (ch + gap);
      if (typeof c.roundRect === "function") c.roundRect(x, y, cw, ch, radius);
      else c.rect(x, y, cw, ch);
    };

    const draw = (scanX: number | null) => {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);
      ctx.drawImage(board, 0, 0, w, h);
      if (scanX === null) return;
      const band = Math.max(90, w * 0.07);
      const c0 = Math.max(0, Math.floor((scanX - band) / (cw + gap)));
      const c1 = Math.min(cols - 1, Math.ceil((scanX + band) / (cw + gap)));
      for (let col = c0; col <= c1; col++) {
        const cx = col * (cw + gap) + cw / 2;
        const t = (cx - scanX) / band;
        const g = Math.exp(-t * t * 3.2);
        if (g < 0.03) continue;
        ctx.fillStyle = `rgba(${fr},${fg},${fb},${(theme === "light" ? 0.28 : 0.22) * g})`;
        ctx.beginPath();
        for (let row = 0; row < rows; row++) cellPath(ctx, col, row);
        ctx.fill();
      }
    };

    const build = () => {
      dpr = Math.min(tier.mobile ? 1.5 : 2, window.devicePixelRatio || 1);
      w = Math.max(1, Math.round(canvas.clientWidth));
      h = Math.max(1, Math.round(canvas.clientHeight));
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      cols = Math.max(4, Math.floor((w + gap) / stride));
      rows = Math.max(4, Math.floor((h + gap) / stride));
      cw = Math.max(1, (w - gap * (cols - 1)) / cols);
      ch = Math.max(1, (h - gap * (rows - 1)) / rows);
      radius = (Math.min(cw, ch) / 2) * (Math.min(20, Math.max(0, rounded)) / 20);
      board.width = canvas.width;
      board.height = canvas.height;
      const bc = board.getContext("2d");
      if (!bc) return;
      bc.setTransform(dpr, 0, 0, dpr, 0, 0);
      bc.clearRect(0, 0, w, h);
      bc.beginPath();
      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) cellPath(bc, col, row);
      }
      bc.fillStyle = boardColor;
      bc.fill();
      draw(null);
    };

    build();
    const ro = new ResizeObserver(build);
    ro.observe(canvas);
    if (tier.reduced) return () => ro.disconnect();

    let armed = true;
    let raf = 0;
    const scan = () => {
      armed = false;
      const t0 = performance.now();
      const tick = (now: number) => {
        const p = Math.min(1, (now - t0) / SCAN_MS);
        const band = Math.max(90, w * 0.07);
        draw(-band + easeScan(p) * (w + band * 2));
        if (p < 1) raf = requestAnimationFrame(tick);
        else draw(null);
      };
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(tick);
    };

    /* Mitte des Viewports gekreuzt → Scan */
    const center = new IntersectionObserver(
      ([e]) => {
        if (e?.isIntersecting && armed) scan();
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
    );
    /* komplett raus → wieder scharf */
    const outside = new IntersectionObserver(
      ([e]) => {
        if (e && !e.isIntersecting) armed = true;
      },
      { threshold: 0 },
    );
    center.observe(wrap);
    outside.observe(wrap);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      center.disconnect();
      outside.disconnect();
    };
  }, [tier, theme, boardColor, cellSize, gap, rounded]);

  return (
    <div
      ref={wrapRef}
      aria-hidden
      className="h-[50px] overflow-hidden border-y border-border bg-background"
    >
      <div className="relative size-full overflow-hidden">
        <canvas ref={canvasRef} className="block size-full" />
      </div>
    </div>
  );
}
