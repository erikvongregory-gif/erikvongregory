"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef } from "react";
import createGlobe from "cobe";
import { projectMarkerOnCanvas } from "@/lib/cobeMarkerProjection";
import { cn } from "@/lib/utils";

export interface PolaroidMarker {
  id: string;
  location: [number, number];
  image: string;
  caption: string;
  rotate: number;
}

export interface GlobePolaroidsProps {
  markers?: PolaroidMarker[];
  className?: string;
  speed?: number;
}

const MARKER_ELEVATION = 0.01;

/**
 * Polaroid-Breite ~88px, Kugel-Box oft ~400px → Mittelpunkte brauchen grob ≥0,22 Abstand,
 * sonst wirken zwei Karten wie eine. Projektion liefert oft kleinere Distanzen (DACH).
 */
const OVERLAP_MIN_DIST = 0.32;
const FAN_STEP_X_MIN = 0.12;
/** Vertikaler Versatz zwischen Nachbarn (z. B. CH vs. AT trotz ähnlichem x) */
const FAN_STEP_Y = 0.038;
const FAN_Y_BOW = 0.012;

type PolaroidPlacement = {
  id: string;
  el: HTMLDivElement;
  x: number;
  y: number;
  rz: number;
  opacity: number;
  rotate: number;
  lng: number;
};

function clampPolaroidNorm(v: number, lo = 0.06, hi = 0.94) {
  return Math.min(hi, Math.max(lo, v));
}

function minPairwiseDist(points: { x: number; y: number }[]): number {
  let minD = Infinity;
  for (let i = 0; i < points.length; i++) {
    for (let j = i + 1; j < points.length; j++) {
      const d = Math.hypot(points[i].x - points[j].x, points[i].y - points[j].y);
      minD = Math.min(minD, d);
    }
  }
  return minD;
}

/**
 * Auffächern, wenn die Projektion zu dicht ist; sonst wirken benachbarte Länder wie eine Karte.
 * Horizontal nach Längengrad + vertikaler Staffel, dynamischer Schritt bei wenigen Karten.
 */
function layoutPolaroidsAvoidOverlap(placements: PolaroidPlacement[]) {
  const active = placements.filter((p) => p.opacity > 0.06);
  const inactive = placements.filter((p) => p.opacity <= 0.06);

  const apply = (p: PolaroidPlacement, x: number, y: number) => {
    const xc = clampPolaroidNorm(x);
    const yc = clampPolaroidNorm(y);
    p.el.style.left = `${xc * 100}%`;
    p.el.style.top = `${yc * 100}%`;
    p.el.style.opacity = String(p.opacity);
    p.el.style.zIndex = String(100 + Math.round(p.rz * 80));
    p.el.style.transform = `translate(-50%, calc(-100% - 14px)) rotate(${p.rotate}deg)`;
  };

  for (const p of inactive) apply(p, p.x, p.y);

  if (active.length < 2) {
    for (const p of active) apply(p, p.x, p.y);
    return;
  }

  const raw = active.map((p) => ({ x: p.x, y: p.y }));
  const crowded = minPairwiseDist(raw) < OVERLAP_MIN_DIST;

  if (!crowded) {
    for (const p of active) apply(p, p.x, p.y);
    return;
  }

  const sorted = [...active].sort((a, b) => a.lng - b.lng);
  const cx = sorted.reduce((s, p) => s + p.x, 0) / sorted.length;
  const cy = sorted.reduce((s, p) => s + p.y, 0) / sorted.length;
  const n = sorted.length;
  const half = (n - 1) / 2;
  /** Zwei Karten: ein großer Schritt; drei: etwas kleiner pro Slot, aber weiter als vorher. */
  const stepX =
    n <= 2
      ? Math.max(FAN_STEP_X_MIN, 0.3)
      : Math.max(FAN_STEP_X_MIN, 0.24);

  sorted.forEach((p, i) => {
    const dx = (i - half) * stepX;
    const dy = (i - half) * FAN_STEP_Y;
    const t = half === 0 ? 0 : Math.abs(i - half) / half;
    const yBow = -FAN_Y_BOW * (1 - t * t);
    apply(p, cx + dx, cy + dy + yBow);
  });
}

/** DACH — Koordinaten [lat, lng] */
export const DACH_GLOBE_MARKERS: PolaroidMarker[] = [
  {
    id: "de-berlin",
    location: [52.52, 13.405],
    image: "/ki-beispiel-hafen.webp",
    caption: "Deutschland",
    rotate: -5,
  },
  {
    id: "at-wien",
    location: [48.2082, 16.3738],
    image: "/ki-beispiel-biergarten.webp",
    caption: "Österreich",
    rotate: 4,
  },
  {
    id: "ch-zuerich",
    location: [47.3769, 8.5417],
    image: "/ki-beispiel-strand.webp",
    caption: "Schweiz",
    rotate: -3,
  },
];

/**
 * cobe-Globus mit Polaroids über den Markern (gleiche Projektion wie cobe).
 * Standard-Drehung bewusst langsam.
 */
export function GlobePolaroids({
  markers = DACH_GLOBE_MARKERS,
  className,
  speed = 0.00085,
}: GlobePolaroidsProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const polaroidRefs = useRef<Map<string, HTMLDivElement>>(new Map());
  const pointerInteracting = useRef<{ x: number; y: number } | null>(null);
  const dragOffset = useRef({ phi: 0, theta: 0 });
  const phiOffsetRef = useRef(0);
  const thetaOffsetRef = useRef(0);
  const isPausedRef = useRef(false);

  const handlePointerDown = useCallback((e: React.PointerEvent<HTMLCanvasElement>) => {
    pointerInteracting.current = { x: e.clientX, y: e.clientY };
    if (canvasRef.current) canvasRef.current.style.cursor = "grabbing";
    isPausedRef.current = true;
  }, []);

  const handlePointerUp = useCallback(() => {
    if (pointerInteracting.current !== null) {
      phiOffsetRef.current += dragOffset.current.phi;
      thetaOffsetRef.current += dragOffset.current.theta;
      dragOffset.current = { phi: 0, theta: 0 };
    }
    pointerInteracting.current = null;
    if (canvasRef.current) canvasRef.current.style.cursor = "grab";
    isPausedRef.current = false;
  }, []);

  useEffect(() => {
    const handlePointerMove = (e: PointerEvent) => {
      if (pointerInteracting.current !== null) {
        dragOffset.current = {
          phi: (e.clientX - pointerInteracting.current.x) / 300,
          theta: (e.clientY - pointerInteracting.current.y) / 1000,
        };
      }
    };
    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerup", handlePointerUp, { passive: true });
    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
    };
  }, [handlePointerUp]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let globeInst: ReturnType<typeof createGlobe> | null = null;
    let rafId = 0;
    let phi = 0;
    const dpr = () => Math.min(window.devicePixelRatio || 1, 2);

    const tick = () => {
      if (!globeInst) return;
      if (!isPausedRef.current) phi += speed;

      const totalPhi = phi + phiOffsetRef.current + dragOffset.current.phi;
      const totalTheta = 0.2 + thetaOffsetRef.current + dragOffset.current.theta;

      globeInst.update({
        phi: totalPhi,
        theta: totalTheta,
      });

      const c = canvasRef.current;
      if (c && c.width > 0 && c.height > 0) {
        const dp = dpr();
        const placements: PolaroidPlacement[] = [];

        for (const m of markers) {
          const el = polaroidRefs.current.get(m.id);
          if (!el) continue;
          if (!el.dataset.polaroidInit) {
            el.dataset.polaroidInit = "1";
            el.style.position = "absolute";
            el.style.width = "88px";
            el.style.pointerEvents = "none";
            el.style.willChange = "left, top, opacity";
            el.style.boxShadow =
              "0 10px 28px rgba(0,0,0,0.18), 0 2px 8px rgba(0,0,0,0.08)";
            el.style.transition = "opacity 0.22s ease-out, left 0.18s ease-out, top 0.18s ease-out";
          }
          const { x, y, rz, inFront } = projectMarkerOnCanvas(
            c,
            dp,
            totalPhi,
            totalTheta,
            1,
            [0, 0],
            MARKER_ELEVATION,
            m.location,
          );
          const fade = Math.min(1, Math.max(0, (rz + 0.04) / 0.1));
          const opacity = inFront ? fade : 0;
          placements.push({
            id: m.id,
            el,
            x,
            y,
            rz,
            opacity,
            rotate: m.rotate,
            lng: m.location[1],
          });
        }

        layoutPolaroidsAvoidOverlap(placements);
      }

      rafId = requestAnimationFrame(tick);
    };

    const start = () => {
      const width = canvas.offsetWidth;
      if (width === 0 || globeInst) return;

      globeInst = createGlobe(canvas, {
        devicePixelRatio: dpr(),
        width,
        height: width,
        phi: 0,
        theta: 0.2,
        dark: 0,
        diffuse: 1.45,
        mapSamples: 16000,
        mapBrightness: 8,
        baseColor: [1, 1, 1],
        markerColor: [0.38, 0.55, 0.92],
        glowColor: [0.96, 0.94, 0.9],
        markerElevation: MARKER_ELEVATION,
        markers: markers.map((m) => ({ location: m.location, size: 0.035, id: m.id })),
        arcs: [],
        arcColor: [0.5, 0.65, 0.95],
        arcWidth: 0.45,
        arcHeight: 0.22,
        opacity: 0.92,
      });

      rafId = requestAnimationFrame(tick);
      requestAnimationFrame(() => {
        canvas.style.opacity = "1";
      });
    };

    const ro = new ResizeObserver(() => {
      if (canvas.offsetWidth > 0 && !globeInst) {
        start();
        ro.disconnect();
      }
    });
    ro.observe(canvas);
    if (canvas.offsetWidth > 0) start();
    if (globeInst) ro.disconnect();

    return () => {
      ro.disconnect();
      cancelAnimationFrame(rafId);
      globeInst?.destroy();
      globeInst = null;
      canvas.style.opacity = "0";
      for (const el of polaroidRefs.current.values()) {
        if (el) el.style.opacity = "0";
      }
    };
  }, [markers, speed]);

  return (
    <div className={cn("relative w-full select-none", className)}>
      <div className="relative mx-auto aspect-square max-w-[min(100%,520px)] overflow-visible">
        <canvas
          ref={canvasRef}
          onPointerDown={handlePointerDown}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerUp}
          className="relative z-0 h-full w-full touch-none"
          style={{
            cursor: "grab",
            opacity: 0,
            transition: "opacity 1s ease",
            borderRadius: "50%",
          }}
        />

        {markers.map((m) => (
          <div
            key={m.id}
            ref={(el) => {
              if (el) polaroidRefs.current.set(m.id, el);
              else polaroidRefs.current.delete(m.id);
            }}
            className="z-10"
          >
            <div className="rounded-[2px] border border-zinc-200/95 bg-white p-[5px] pb-7">
              <Image
                src={m.image}
                alt={m.caption}
                width={78}
                height={78}
                className="block h-[72px] w-[72px] rounded-[1px] object-cover"
              />
              <span className="absolute bottom-1.5 left-0 right-0 text-center font-sans text-[0.58rem] font-medium tracking-[0.04em] text-zinc-700">
                {m.caption}
              </span>
            </div>
          </div>
        ))}
      </div>

      <p className="mt-3 text-center text-xs text-zinc-500 sm:text-right">Zum Drehen: Kugel mit Maus ziehen</p>
    </div>
  );
}
