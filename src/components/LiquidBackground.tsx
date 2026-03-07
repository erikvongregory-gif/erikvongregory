"use client";

import { useEffect, useState } from "react";

export function LiquidBackground() {
  const [scroll, setScroll] = useState({ dx: 0, dy: 0, rotation: 0 });

  useEffect(() => {
    let rafId = 0;
    const onScroll = () => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        const t = scrollY * 0.002;
        setScroll({
          dx: Math.sin(t) * 80,
          dy: Math.cos(t * 0.85) * 50,
          rotation: scrollY * 0.08,
        });
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  const { dx, dy, rotation } = scroll;

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
        className="absolute inset-0"
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
            transform: `translate(${dx * 0.8}px, ${dy * 0.6}px)`,
            transition: "transform 0.08s cubic-bezier(0.33, 1, 0.68, 1)",
          }}
        />
        <div
          className="liquid-blob liquid-blob-2 absolute h-[60vh] w-[60vh] -right-[10%] bottom-[5%]"
          style={{
            background:
              "linear-gradient(225deg, #4c1d95 0%, rgba(34, 197, 94, 0.12) 50%, #312e81 100%)",
            transform: `translate(${-dx * 0.6}px, ${-dy * 0.5}px)`,
            transition: "transform 0.08s cubic-bezier(0.33, 1, 0.68, 1)",
          }}
        />
        <div
          className="liquid-blob liquid-blob-3 absolute h-[50vh] w-[50vh] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{
            background:
              "linear-gradient(180deg, #0e4d6b 0%, #312e81 45%, rgba(34, 197, 94, 0.1) 100%)",
            transform: `translate(calc(-50% + ${dx}px), calc(-50% + ${dy * 0.7}px))`,
            transition: "transform 0.08s cubic-bezier(0.33, 1, 0.68, 1)",
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
