"use client";

import { useEffect, useRef } from "react";
import { EASE, easeFn, useMotionTier } from "./motion-utils";

/**
 * ParloWaveCanvas (CTA-Strahlen) — gleiche Geometrie, plus:
 * Strahlen zeichnen sich beim ersten Sichtkontakt vom Horizont nach außen,
 * Schleife pausiert außerhalb des Viewports, Reduced Motion = stilles Bild.
 */

const INTRO_MS = 1200;
const TWO_PI = Math.PI * 2;
const easeIntro = easeFn(EASE.rise);

function mapRange(v: number, a: number, b: number, c: number, d: number) {
  return ((v - a) / (b - a)) * (d - c) + c;
}

function parseRgb(input: string) {
  const m = input.match(/rgba?\(([^)]+)\)/i);
  if (m) {
    const [r, g, b] = m[1].split(",").map((v) => parseInt(v.trim(), 10));
    return { r, g, b };
  }
  return { r: 190, g: 190, b: 190 };
}

export function MotionWaveCanvas({
  backgroundColor,
  lineColor,
  glow = 42,
  lineCount = 28,
  speed = 1.5,
  lineWidth = 1.5,
  onIntro,
}: {
  backgroundColor: string;
  lineColor: string;
  glow?: number;
  lineCount?: number;
  speed?: number;
  lineWidth?: number;
  onIntro?: () => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const tier = useMotionTier();
  const onIntroRef = useRef(onIntro);
  useEffect(() => {
    onIntroRef.current = onIntro;
  });

  useEffect(() => {
    if (!tier.ready) return;
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const rgb = parseRgb(lineColor);
    const st = { w: 0, h: 0, frame: 0, mouseY: 0, targetY: 0 };
    const dprCap = tier.mobile ? 1.5 : 2;

    const resize = () => {
      const dpr = Math.min(dprCap, window.devicePixelRatio || 1);
      const rect = container.getBoundingClientRect();
      st.w = rect.width;
      st.h = rect.height;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      st.targetY = rect.height / 2;
      st.mouseY = rect.height / 2;
    };

    const draw = (reveal: number) => {
      const { w, h } = st;
      st.mouseY += (st.targetY - st.mouseY) * 0.1;
      ctx.fillStyle = backgroundColor;
      ctx.fillRect(0, 0, w, h);
      ctx.save();
      const isMobile = w < 768;
      const cx = w / 2;
      const cy = h + (isMobile ? 60 : 40);
      if (reveal < 1) {
        ctx.beginPath();
        ctx.arc(cx, cy, Math.max(1, reveal * Math.hypot(cx, cy) * 1.05), 0, TWO_PI);
        ctx.clip();
      }
      ctx.lineWidth = lineWidth;
      ctx.shadowBlur = tier.lowPower ? 0 : glow;
      ctx.shadowColor = lineColor;
      ctx.translate(cx, cy);
      const mouseInfluence = mapRange(st.mouseY, 0, h, 1.2, -1.2);
      const timeScale =
        st.frame *
        (mapRange(Math.max(320, Math.min(1440, w)), 320, 1440, 0.002, 0.0005) * (speed / 5));
      const halfW = w / 2;
      const count = isMobile ? Math.round(0.6 * lineCount) : lineCount;
      const glowRange = 55000 / Math.max(1, glow);
      for (let i = 0; i < count; i++) {
        let angle = mapRange(i, 0, count, 0, Math.PI) + timeScale;
        angle %= Math.PI;
        const offset = (Math.tan(angle) - mouseInfluence) * h;
        const radius = Math.abs(offset) / 2;
        const ccy = -h / 2 + offset / 2;
        const alpha =
          Math.max(0, Math.min(255, mapRange(Math.abs(offset), 0, glowRange, -20, 255))) / 255;
        if (alpha <= 0) continue;
        ctx.strokeStyle = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${alpha})`;
        if (radius > 499999.5) {
          ctx.beginPath();
          ctx.moveTo(-halfW, -h / 2);
          ctx.lineTo(halfW, -h / 2);
          ctx.stroke();
          continue;
        }
        const acosArg = Math.acos(Math.min(1, (halfW + 50) / radius));
        const segments = Math.max(Math.ceil(radius / 120), 200);
        for (const [start, end] of [
          [acosArg, Math.PI - acosArg],
          [Math.PI + acosArg, TWO_PI - acosArg],
        ] as const) {
          const span = end - start;
          const steps = Math.max(Math.ceil((span / TWO_PI) * segments), 60);
          const step = span / steps;
          ctx.beginPath();
          for (let s = 0; s <= steps; s++) {
            const a = start + step * s;
            const x = Math.cos(a) * radius;
            const y = ccy + Math.sin(a) * radius;
            if (s === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          }
          ctx.stroke();
        }
      }
      ctx.restore();
    };

    resize();

    if (tier.reduced) {
      st.frame = 400;
      draw(1);
      onIntroRef.current?.();
      const ro = new ResizeObserver(() => {
        resize();
        draw(1);
      });
      ro.observe(container);
      return () => ro.disconnect();
    }

    draw(0);
    let raf = 0;
    let running = false;
    let inView = false;
    let pageVisible = document.visibilityState === "visible";
    let introStart = -1;

    const loop = (now: number) => {
      raf = requestAnimationFrame(loop);
      if (introStart < 0) {
        introStart = now;
        onIntroRef.current?.();
      }
      st.frame += 1;
      draw(easeIntro(Math.min(1, (now - introStart) / INTRO_MS)));
    };

    const sync = () => {
      const should = inView && pageVisible;
      if (should && !running) {
        running = true;
        raf = requestAnimationFrame(loop);
      } else if (!should && running) {
        running = false;
        cancelAnimationFrame(raf);
      }
    };

    const io = new IntersectionObserver(
      ([e]) => {
        inView = Boolean(e?.isIntersecting);
        sync();
      },
      { threshold: 0.15 },
    );
    io.observe(container);
    const onVis = () => {
      pageVisible = document.visibilityState === "visible";
      sync();
    };
    document.addEventListener("visibilitychange", onVis);

    let resizeTimer: ReturnType<typeof setTimeout>;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(resize, 100);
    };
    window.addEventListener("resize", onResize, { passive: true });

    const onMove = (e: MouseEvent) => {
      if (!inView) return;
      const rect = container.getBoundingClientRect();
      st.targetY = e.clientY - rect.top;
    };
    if (!tier.mobile) document.addEventListener("mousemove", onMove, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      clearTimeout(resizeTimer);
      document.removeEventListener("visibilitychange", onVis);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("mousemove", onMove);
    };
  }, [tier, backgroundColor, lineColor, glow, lineCount, speed, lineWidth]);

  return (
    <div ref={containerRef} aria-hidden className="relative h-full w-full overflow-hidden">
      <canvas ref={canvasRef} className="block size-full" />
    </div>
  );
}
