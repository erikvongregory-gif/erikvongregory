"use client";

import { useEffect, useState } from "react";
import {
  SECTION3_FADE_START,
  SECTION3_FADE_END,
  SECTION4_FADE_START,
  SECTION3_FADE_OUT_DURATION,
  smoothStep,
} from "@/lib/scrollConstants";

/** Section 3: blendet mit Zoom-in ein, während Section 2 zoomt aus */
export function ZoomSection3() {
  const [progress, setProgress] = useState({ in: 0, out: 0 });

  useEffect(() => {
    let rafId = 0;
    let lastTick = 0;
    const isMobile = () => window.innerWidth <= 768;
    const onScroll = () => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame((now) => {
        if (isMobile() && now - lastTick < 32) return;
        lastTick = now;
        const scrollY = window.scrollY;
        const fadeIn = Math.max(
          0,
          Math.min(1, (scrollY - SECTION3_FADE_START) / (SECTION3_FADE_END - SECTION3_FADE_START))
        );
        // Section 3 blendet schnell aus, BEVOR Section 4 voll sichtbar wird
        const fadeOut = Math.max(
          0,
          Math.min(1, (scrollY - SECTION4_FADE_START) / SECTION3_FADE_OUT_DURATION)
        );
        setProgress({ in: smoothStep(fadeIn), out: smoothStep(fadeOut) });
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  const pushY = progress.out * 220;
  const scale = 0.88 + 0.12 * progress.in - progress.out * 0.04;
  const opacity = progress.in * (1 - progress.out);

  return (
    <section
      className="pointer-events-none fixed inset-0 top-0 z-30 flex min-h-screen items-center justify-center py-12 sm:py-16 md:py-24"
      style={{
        opacity,
        pointerEvents: progress.in > 0.02 && progress.out < 0.98 ? "auto" : "none",
        transition: "opacity 0.033s cubic-bezier(0.33, 1, 0.68, 1)",
      }}
    >
      <div
        className="section3-card mx-auto max-w-3xl text-center antialiased px-4 lg:px-6"
        style={{
          transform: `translateY(calc(-5vh - ${pushY}px)) scale(${scale})`,
          transition: "transform 0.033s cubic-bezier(0.33, 1, 0.68, 1)",
        }}
      >
        <p
          className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-emerald-400/90"
          style={{ opacity: progress.in }}
        >
          Dein nächster Schritt
        </p>
        <h2 className="text-3xl font-extrabold tracking-tight text-white drop-shadow-md sm:text-5xl md:text-6xl">
          Bist du{" "}
          <a
            href="#contact"
            className="section3-cta-link pointer-events-auto relative inline-block transition-all duration-300 hover:scale-105"
          >
            <span
              className="section3-bereit-glow relative z-10"
              style={{
                fontFamily: "var(--font-austera)",
                fontStyle: "italic",
                fontWeight: 300,
              }}
            >
              bereit
            </span>
          </a>
          ?
        </h2>
        <p className="mt-4 text-base text-white/70 sm:text-lg" style={{ opacity: progress.in * 0.9 }}>
          Sprich mit mir über deine Brauerei – unverbindlich & direkt.
        </p>
      </div>
    </section>
  );
}
