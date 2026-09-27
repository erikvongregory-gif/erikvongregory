"use client";

import {
  useCallback,
  useEffect,
  useRef,
  type CSSProperties,
} from "react";

/* ─── Pixel shimmer ─── */

class Pixel {
  ctx: CanvasRenderingContext2D;
  x: number;
  y: number;
  color: string;
  speed: number;
  size = 0;
  minSize: number;
  maxSizeInteger: number;
  maxSize: number;
  delay: number;
  counter = 0;
  counterStep: number;
  isIdle = false;
  isReverse = false;
  isShimmer = false;
  growStart: number | null = null;
  shrinkStart: number | null = null;
  shrinkFrom = 0;

  constructor(
    canvas: HTMLCanvasElement,
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    color: string,
    speed: number,
    delay: number,
    pixelSize: number,
  ) {
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.color = color;
    this.speed = this.rand(0.1, 0.9) * speed;
    const half = pixelSize / 2;
    this.minSize = 0.5 * half;
    this.maxSizeInteger = pixelSize;
    this.maxSize = this.rand(this.minSize, pixelSize);
    this.delay = delay;
    this.counterStep = 4 * Math.random() + (canvas.width + canvas.height) * 0.01;
  }

  rand(min: number, max: number) {
    return Math.random() * (max - min) + min;
  }

  draw() {
    const offset = 0.5 * this.maxSizeInteger - 0.5 * this.size;
    this.ctx.fillStyle = this.color;
    this.ctx.fillRect(this.x + offset, this.y + offset, this.size, this.size);
  }

  appear(now: number, duration: number, ease: (t: number) => number) {
    this.isIdle = false;
    this.shrinkStart = null;
    if (this.counter <= this.delay) {
      this.counter += this.counterStep;
      return;
    }
    if (!this.isShimmer) {
      if (this.growStart === null) this.growStart = now;
      const t = duration > 0 ? Math.min(1, (now - this.growStart) / duration) : 1;
      this.size = ease(t) * this.maxSize;
      if (t >= 1) this.isShimmer = true;
    }
    if (this.isShimmer) this.shimmer();
    this.draw();
  }

  disappear(now: number, duration: number, ease: (t: number) => number) {
    this.isShimmer = false;
    this.counter = 0;
    this.growStart = null;
    if (this.size <= 0) {
      this.isIdle = true;
      this.shrinkStart = null;
      return;
    }
    if (this.shrinkStart === null) {
      this.shrinkStart = now;
      this.shrinkFrom = this.size;
    }
    const t = duration > 0 ? Math.min(1, (now - this.shrinkStart) / duration) : 1;
    this.size = this.shrinkFrom * (1 - ease(t));
    if (t >= 1) this.size = 0;
    this.draw();
  }

  shimmer() {
    if (this.size >= this.maxSize) this.isReverse = true;
    else if (this.size <= this.minSize) this.isReverse = false;
    if (this.isReverse) this.size -= this.speed;
    else this.size += this.speed;
  }
}

function cubicBezier(x1: number, y1: number, x2: number, y2: number) {
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

const easeOut = cubicBezier(0, 0, 0.58, 1);

const DEFAULT_PIXEL_COLORS = ["#ffffff", "#FFFFFFCC", "#FFFFFF99", "#A3A3A3"];

export type ParloPixelCanvasProps = {
  colors?: string[];
  gap?: number;
  pixelSize?: number;
  speed?: number;
  appearFrom?: "top" | "bottom" | "left" | "right" | "middle" | "hover";
  className?: string;
  style?: CSSProperties;
  canvasStyle?: CSSProperties;
  trigger?: "auto" | "hover";
  /** When set, drives appear/disappear from a parent hover container */
  active?: boolean;
};

export function ParloPixelCanvas({
  colors = DEFAULT_PIXEL_COLORS,
  gap = 8,
  pixelSize = 3,
  speed = 70,
  appearFrom = "top",
  className = "",
  style,
  canvasStyle,
  trigger = "auto",
  active,
}: ParloPixelCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pixelsRef = useRef<Pixel[]>([]);
  const rafRef = useRef<number | null>(null);
  const appearedRef = useRef(false);
  const lastFrameRef = useRef(0);
  const reducedMotion = useRef(false);

  useEffect(() => {
    reducedMotion.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
  }, []);

  const build = useCallback(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;
    const w = Math.floor(
      container.clientWidth || container.getBoundingClientRect().width || 0,
    );
    const h = Math.floor(
      container.clientHeight || container.getBoundingClientRect().height || 0,
    );
    if (w < 1 || h < 1) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    canvas.width = w;
    canvas.height = h;
    const step = Math.max(1, Math.round(Number(gap)) || 1);
    const palette = colors.length > 0 ? colors : DEFAULT_PIXEL_COLORS;
    const spd =
      speed <= 0 || reducedMotion.current
        ? 0
        : speed >= 100
          ? 0.2
          : 0.002 * speed;
    const from = appearFrom === "hover" ? "middle" : appearFrom;
    const list: Pixel[] = [];
    let i = 0;
    for (let x = 0; x < w; x += step) {
      for (let y = 0; y < h; y += step) {
        let delay: number;
        if (reducedMotion.current) delay = 0;
        else if (from === "top") delay = y;
        else if (from === "bottom") delay = h - y;
        else if (from === "left") delay = x;
        else if (from === "right") delay = w - x;
        else {
          const dx = x - w / 2;
          const dy = y - h / 2;
          delay = Math.sqrt(dx * dx + dy * dy);
        }
        list.push(
          new Pixel(
            canvas,
            ctx,
            x,
            y,
            palette[i % palette.length],
            spd,
            delay,
            Math.max(0.1, pixelSize),
          ),
        );
        i++;
      }
    }
    pixelsRef.current = list;
  }, [appearFrom, colors, gap, pixelSize, speed]);

  const animate = useCallback((mode: "appear" | "disappear") => {
    if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    const duration = 800;
    const tick = () => {
      rafRef.current = requestAnimationFrame(tick);
      const now = performance.now();
      const dt = now - lastFrameRef.current;
      if (dt < 1000 / 60) return;
      lastFrameRef.current = now - (dt % (1000 / 60));
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext("2d");
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      let allIdle = true;
      for (const p of pixelsRef.current) {
        p[mode](now, duration, easeOut);
        if (!p.isIdle) allIdle = false;
      }
      if (allIdle && mode === "disappear") {
        cancelAnimationFrame(rafRef.current!);
        rafRef.current = null;
      }
    };
    rafRef.current = requestAnimationFrame(tick);
  }, []);

  const start = useCallback(
    (mode: "appear" | "disappear") => {
      if (mode === "appear") appearedRef.current = true;
      animate(mode);
    },
    [animate],
  );

  useEffect(() => {
    appearedRef.current = false;
    build();
    if (trigger === "auto" && active === undefined) start("appear");
    const ro = new ResizeObserver(() => {
      const was = appearedRef.current;
      build();
      if ((trigger === "auto" && active === undefined) || was) {
        if (active === undefined || active) start("appear");
      }
    });
    if (containerRef.current) ro.observe(containerRef.current);
    return () => {
      ro.disconnect();
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [build, start, trigger, active]);

  useEffect(() => {
    if (active === undefined) return;
    start(active ? "appear" : "disappear");
  }, [active, start]);

  const hover = trigger === "hover" && active === undefined;

  return (
    <div
      ref={containerRef}
      className={`relative h-full w-full overflow-hidden ${className}`}
      style={{ minWidth: 0, minHeight: 0, isolation: "auto", ...style }}
      onMouseEnter={hover ? () => start("appear") : undefined}
      onMouseLeave={hover ? () => start("disappear") : undefined}
      tabIndex={-1}
    >
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          display: "block",
          ...canvasStyle,
        }}
      />
    </div>
  );
}

/* ─── Snake divider (static board) ─── */

function parseColor(input: string): [number, number, number, number] {
  const t = (input ?? "").trim();
  const hex = t.replace("#", "");
  if (/^[0-9a-f]{6}$/i.test(hex)) {
    return [
      parseInt(hex.slice(0, 2), 16),
      parseInt(hex.slice(2, 4), 16),
      parseInt(hex.slice(4, 6), 16),
      1,
    ];
  }
  const m = t.match(/rgba?\(([^)]+)\)/i);
  if (m) {
    const parts = m[1].split(",").map((v) => parseFloat(v));
    return [parts[0] || 0, parts[1] || 0, parts[2] || 0, parts[3] ?? 1];
  }
  return [128, 128, 128, 0.14];
}

export function ParloSnakeDivider({
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
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const rgba = parseColor(boardColor);
    const fill = `rgba(${rgba[0]}, ${rgba[1]}, ${rgba[2]}, ${rgba[3]})`;
    const stride = cellSize + gap;

    const draw = () => {
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      const w = Math.max(1, Math.round(canvas.clientWidth));
      const h = Math.max(1, Math.round(canvas.clientHeight));
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);

      const cols = Math.max(4, Math.floor((w + gap) / stride));
      const rows = Math.max(4, Math.floor((h + gap) / stride));
      const cw = Math.max(1, (w - gap * (cols - 1)) / cols);
      const ch = Math.max(1, (h - gap * (rows - 1)) / rows);
      const radius =
        (Math.min(cw, ch) / 2) * (Math.min(20, Math.max(0, rounded)) / 20);

      ctx.beginPath();
      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const x = col * (cw + gap);
          const y = row * (ch + gap);
          if (typeof ctx.roundRect === "function") {
            ctx.roundRect(x, y, cw, ch, radius);
          } else {
            ctx.rect(x, y, cw, ch);
          }
        }
      }
      ctx.fillStyle = fill;
      ctx.fill();
    };

    draw();
    const ro = new ResizeObserver(draw);
    ro.observe(canvas);
    return () => ro.disconnect();
  }, [boardColor, cellSize, gap, rounded]);

  return (
    <div
      aria-hidden
      className="h-[50px] overflow-hidden border-y border-border bg-background"
    >
      <div
        style={{
          position: "relative",
          overflow: "hidden",
          width: "100%",
          height: "100%",
          boxSizing: "border-box",
        }}
      >
        <canvas
          ref={canvasRef}
          style={{ width: "100%", height: "100%", display: "block" }}
        />
      </div>
    </div>
  );
}

/* ─── Wave canvas ─── */

function mapRange(
  value: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number,
) {
  return ((value - inMin) / (inMax - inMin)) * (outMax - outMin) + outMin;
}

function parseRgb(input: string) {
  const m = input.match(/rgba?\(([^)]+)\)/i);
  if (m) {
    const [r, g, b] = m[1].split(",").map((v) => parseInt(v.trim(), 10));
    return { r, g, b };
  }
  const hex = input.replace(/^#/, "");
  if (hex.length >= 6) {
    return {
      r: parseInt(hex.slice(0, 2), 16),
      g: parseInt(hex.slice(2, 4), 16),
      b: parseInt(hex.slice(4, 6), 16),
    };
  }
  return { r: 190, g: 190, b: 190 };
}

const TWO_PI = Math.PI * 2;

export type ParloWaveCanvasProps = {
  backgroundColor?: string;
  glow?: number;
  lineColor?: string;
  lineCount?: number;
  speed?: number;
  lineWidth?: number;
  interactive?: boolean;
  className?: string;
  style?: CSSProperties;
};

export function ParloWaveCanvas({
  backgroundColor = "#0a0a0a",
  glow = 42,
  lineColor = "rgb(190,190,190)",
  lineCount = 28,
  speed = 1.5,
  lineWidth = 1.5,
  interactive = true,
  className = "",
  style,
}: ParloWaveCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ y: 0, targetY: 0 });
  const stateRef = useRef({
    width: 0,
    height: 0,
    dpr: 1,
    frameCount: 0,
    animationId: 0,
    isVisible: true,
  });

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const state = stateRef.current;
    const rgb = parseRgb(lineColor);

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = container.getBoundingClientRect();
      state.width = rect.width;
      state.height = rect.height;
      state.dpr = dpr;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      mouseRef.current.targetY = rect.height / 2;
      mouseRef.current.y = rect.height / 2;
    };

    const draw = () => {
      state.frameCount += 1;
      const { width: w, height: h, frameCount } = state;
      const mouse = mouseRef.current;
      mouse.y = mouse.y + (mouse.targetY - mouse.y) * 0.1;

      ctx.fillStyle = backgroundColor;
      ctx.fillRect(0, 0, w, h);
      ctx.save();
      ctx.lineWidth = lineWidth;
      ctx.shadowBlur = glow;
      ctx.shadowColor = lineColor;
      const isMobile = w < 768;
      ctx.translate(w / 2, h + (isMobile ? 60 : 40));

      const mouseInfluence = interactive
        ? mapRange(mouse.y, 0, h, 1.2, -1.2)
        : 0;
      const timeScale =
        frameCount *
        (mapRange(Math.max(320, Math.min(1440, w)), 320, 1440, 0.002, 0.0005) *
          (speed / 5));
      const halfW = w / 2;
      const count = isMobile ? Math.round(0.6 * lineCount) : lineCount;
      const glowRange = 55000 / Math.max(1, glow);

      for (let i = 0; i < count; i++) {
        let angle = mapRange(i, 0, count, 0, Math.PI) + timeScale;
        angle %= Math.PI;
        const offset = (Math.tan(angle) - mouseInfluence) * h;
        const radius = Math.abs(offset) / 2;
        const cy = -h / 2 + offset / 2;
        const alpha =
          Math.max(
            0,
            Math.min(255, mapRange(Math.abs(offset), 0, glowRange, -20, 255)),
          ) / 255;
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
            const y = cy + Math.sin(a) * radius;
            if (s === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          }
          ctx.stroke();
        }
      }
      ctx.restore();
      state.animationId = requestAnimationFrame(draw);
    };

    resize();
    state.animationId = requestAnimationFrame(draw);

    let resizeTimer: ReturnType<typeof setTimeout>;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(resize, 100);
    };
    window.addEventListener("resize", onResize, { passive: true });

    const io = new IntersectionObserver(
      ([entry]) => {
        state.isVisible = entry?.isIntersecting ?? true;
      },
      { threshold: 0 },
    );
    io.observe(container);

    return () => {
      cancelAnimationFrame(state.animationId);
      clearTimeout(resizeTimer);
      window.removeEventListener("resize", onResize);
      io.disconnect();
    };
  }, [
    backgroundColor,
    glow,
    interactive,
    lineColor,
    lineCount,
    lineWidth,
    speed,
  ]);

  useEffect(() => {
    if (!interactive) return;
    const container = containerRef.current;
    if (!container) return;
    let rect = container.getBoundingClientRect();
    const onMove = (e: MouseEvent) => {
      if (!stateRef.current.isVisible) return;
      mouseRef.current.targetY = e.clientY - rect.top;
    };
    let scrollRaf = 0;
    const onScroll = () => {
      if (scrollRaf) return;
      scrollRaf = requestAnimationFrame(() => {
        rect = container.getBoundingClientRect();
        scrollRaf = 0;
      });
    };
    document.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      document.removeEventListener("mousemove", onMove);
      window.removeEventListener("scroll", onScroll);
      if (scrollRaf) cancelAnimationFrame(scrollRaf);
    };
  }, [interactive]);

  return (
    <div
      ref={containerRef}
      aria-hidden
      className={`relative h-full w-full overflow-hidden ${className}`}
      style={style}
    >
      <canvas
        ref={canvasRef}
        style={{ width: "100%", height: "100%", display: "block" }}
      />
    </div>
  );
}
