"use client";

import { useEffect, useState } from "react";

/** Desktop: keine Transition für 60fps direkte Scroll-Reaktion */
const DESKTOP_TRANSITION = "none";
const MOBILE_TRANSITION = "transform 0.08s cubic-bezier(0.33, 1, 0.68, 1)";

export function LiquidBackground() {
  const [scroll, setScroll] = useState({ dx: 0, dy: 0, rotation: 0 });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const id = setTimeout(() => setIsMobile(window.matchMedia("(max-width: 768px)").matches), 0);
    return () => clearTimeout(id);
  }, []);

  useEffect(() => {
    let rafId = 0;
    let lastRun = 0;
    const onScroll = () => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame((now) => {
        if (isMobile && now - lastRun < 32) return;
        lastRun = now;
        const scrollY = window.scrollY;
        const t = scrollY * (isMobile ? 0.001 : 0.002);
        const mult = isMobile ? 0.4 : 1;
        setScroll({
          dx: Math.sin(t) * 80 * mult,
          dy: Math.cos(t * 0.85) * 50 * mult,
          rotation: scrollY * 0.08 * mult,
        });
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [isMobile]);

  const { dx, dy, rotation } = scroll;
  const blobTransition = isMobile ? MOBILE_TRANSITION : DESKTOP_TRANSITION;

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Basis: tiefer Farbverlauf mit Emerald-Anklang */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(165deg, #0a0f14 0%, #0f172a 35%, #0c1222 70%, #05100d 100%)",
        }}
      />
      <div
        className="absolute inset-0 liquid-scroll-layer"
        style={{
          transform: `scale(1.5) rotate(${rotation}deg)`,
          transformOrigin: "center center",
        }}
      >
        <div
          className="liquid-blob liquid-blob-1 absolute h-[70vh] w-[70vh] -left-[15%] top-[10%]"
          style={{
            background:
              "linear-gradient(135deg, rgba(34, 197, 94, 0.18) 0%, #312e81 40%, #1e3a5f 100%)",
            transform: `translate3d(${dx * 0.8}px, ${dy * 0.6}px, 0)`,
            transition: blobTransition,
          }}
        />
        <div
          className="liquid-blob liquid-blob-2 absolute h-[60vh] w-[60vh] -right-[10%] bottom-[5%]"
          style={{
            background:
              "linear-gradient(225deg, #4c1d95 0%, rgba(34, 197, 94, 0.12) 50%, #312e81 100%)",
            transform: `translate3d(${-dx * 0.6}px, ${-dy * 0.5}px, 0)`,
            transition: blobTransition,
          }}
        />
        <div
          className="liquid-blob liquid-blob-3 absolute h-[50vh] w-[50vh] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{
            background:
              "linear-gradient(180deg, #0e4d6b 0%, #312e81 45%, rgba(34, 197, 94, 0.1) 100%)",
            transform: `translate3d(calc(-50% + ${dx}px), calc(-50% + ${dy * 0.7}px), 0)`,
            transition: blobTransition,
          }}
        />
      </div>
      {/* Vignette + dezenter Glow */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 70% at 50% 40%, transparent 25%, rgba(0,0,0,0.25) 70%, rgba(0,0,0,0.6) 100%)",
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 50% 40% at 30% 30%, rgba(34, 197, 94, 0.03) 0%, transparent 60%)",
        }}
      />
    </div>
  );
}
