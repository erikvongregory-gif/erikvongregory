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
    if (!isMobile) return;
    let rafId = 0;
    let lastRun = 0;
    const onScroll = () => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame((now) => {
        if (now - lastRun < 32) return;
        lastRun = now;
        const scrollY = window.scrollY;
        const t = scrollY * 0.001;
        setScroll({
          dx: Math.sin(t) * 32,
          dy: Math.cos(t * 0.85) * 20,
          rotation: scrollY * 0.032,
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
    <div className="fixed inset-0 z-0 overflow-hidden" aria-hidden>
      {/* Basis: sauber hell wie Referenz */}
      <div
        className="absolute inset-0"
        style={{
          background: "#cbcbcb",
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
              "linear-gradient(135deg, rgba(255, 220, 190, 0.15) 0%, rgba(255, 235, 205, 0.08) 40%, transparent 100%)",
            transform: `translate3d(${dx * 0.8}px, ${dy * 0.6}px, 0)`,
            transition: blobTransition,
          }}
        />
        <div
          className="liquid-blob liquid-blob-2 absolute h-[60vh] w-[60vh] -right-[10%] bottom-[5%]"
          style={{
            background:
              "linear-gradient(225deg, rgba(255, 220, 190, 0.1) 0%, rgba(255, 235, 205, 0.06) 50%, transparent 100%)",
            transform: `translate3d(${-dx * 0.6}px, ${-dy * 0.5}px, 0)`,
            transition: blobTransition,
          }}
        />
        <div
          className="liquid-blob liquid-blob-3 absolute h-[50vh] w-[50vh] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{
            background:
              "linear-gradient(180deg, rgba(255, 235, 205, 0.06) 0%, transparent 50%)",
            transform: `translate3d(calc(-50% + ${dx}px), calc(-50% + ${dy * 0.7}px), 0)`,
            transition: blobTransition,
          }}
        />
      </div>
      {/* Vignette – auf hellem Desktop dezent */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 70% at 50% 40%, transparent 40%, rgba(0,0,0,0.03) 100%)",
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 180% 220% at 85% 30%, rgba(255, 200, 160, 0.25) 0%, rgba(255, 220, 190, 0.08) 6%, rgba(255, 235, 205, 0.02) 14%, transparent 22%)",
        }}
      />
    </div>
  );
}
