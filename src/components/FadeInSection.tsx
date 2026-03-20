"use client";

import { useEffect, useState, useRef } from "react";
import { ProblemItem } from "./ProblemItem";
import {
  SECTION2_FADE_START,
  SECTION2_FADE_END,
  SECTION2_ZOOM_START,
  SECTION2_ZOOM_END,
  smoothStep,
} from "@/lib/scrollConstants";
/** Section 2: blendet ein, zoomt aus beim Übergang zu Section 3 */
export function FadeInSection() {
  const [fadeInProgress, setFadeInProgress] = useState(0);
  const [zoomOutProgress, setZoomOutProgress] = useState(0);
  const [problemResetTrigger, setProblemResetTrigger] = useState(0);
  const wasVisibleRef = useRef(false);

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
          Math.min(1, (scrollY - SECTION2_FADE_START) / (SECTION2_FADE_END - SECTION2_FADE_START))
        );
        const zoomOut = Math.max(
          0,
          Math.min(1, (scrollY - SECTION2_ZOOM_START) / (SECTION2_ZOOM_END - SECTION2_ZOOM_START))
        );
        setFadeInProgress(smoothStep(fadeIn));
        setZoomOutProgress(smoothStep(zoomOut));
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  const baseOpacity = fadeInProgress * (1 - zoomOutProgress);
  const scale = 1 - zoomOutProgress * 0.25;
  const sectionInView = baseOpacity > 0.2;

  useEffect(() => {
    if (wasVisibleRef.current && !sectionInView) {
      wasVisibleRef.current = false;
      setProblemResetTrigger((t) => t + 1);
    } else if (sectionInView) {
      wasVisibleRef.current = true;
    }
  }, [sectionInView]);

  const h2Opacity = Math.max(0, Math.min(1, (fadeInProgress - 0.05) / 0.5));
  const h2Translate = (1 - h2Opacity) * 20;
  const p1Opacity = Math.max(0, Math.min(1, (fadeInProgress - 0.2) / 0.5));
  const p1Translate = (1 - p1Opacity) * 16;
  const p2Opacity = Math.max(0, Math.min(1, (fadeInProgress - 0.35) / 0.5));
  const p2Translate = (1 - p2Opacity) * 12;

  const pointerVisible = baseOpacity > 0.02;

  return (
    <section
      className="pointer-events-none fixed inset-0 top-0 z-20 flex min-h-screen items-center justify-center py-12 sm:py-16 md:py-24"
      style={{
        opacity: baseOpacity,
        pointerEvents: pointerVisible && zoomOutProgress < 0.98 ? "auto" : "none",
        transition: "opacity 0.033s cubic-bezier(0.33, 1, 0.68, 1)",
      }}
    >
      <div
        className="section2-card pointer-events-auto mx-auto w-full max-w-2xl text-left antialiased px-4 lg:px-6"
        style={{
          transform: `translateY(-5vh) scale(${scale})`,
          transition: "transform 0.033s cubic-bezier(0.33, 1, 0.68, 1)",
        }}
      >
        <h2
          className="text-2xl font-bold tracking-tight text-white drop-shadow-md sm:text-3xl md:text-4xl min-h-[1.2em]"
          style={{
            opacity: h2Opacity,
            transform: `translateY(${h2Translate}px)`,
          }}
        >
          Warum viele Brauereien{" "}
          <span className="font-light italic font-austera-green-fade">
            online unsichtbar
          </span>{" "}
          bleiben
        </h2>
        <p
          className="mt-5 text-base leading-relaxed text-white/90 sm:text-lg"
          style={{
            opacity: p1Opacity,
            transform: `translateY(${p1Translate}px)`,
          }}
        >
          Viele Brauereien haben ein großartiges Produkt – aber online findet sie kaum jemand.
        </p>
        <div
          className="relative z-10 mt-5 grid min-w-0 grid-cols-1 gap-2 sm:grid-cols-2"
          style={{
            opacity: p2Opacity,
            transform: `translateY(${p2Translate}px)`,
          }}
        >
          {[
            { problem: "Social Media wird selten gepflegt", solution: "Mit KI: Regelmäßiger Content – automatisiert & ohne teure Agentur" },
            { problem: "Werbung kostet viel und bringt wenig", solution: "Mit KI: Produktfotos & Werbevideos in Minuten statt Tagen" },
            { problem: "Content zu erstellen kostet Zeit", solution: "Mit KI: Content-Systeme, die für dich arbeiten" },
            { problem: "Websites sind veraltet", solution: "Mit KI: Moderne Websites mit starkem Storytelling" },
          ].map(({ problem, solution }, i) => (
            <ProblemItem key={problem} text={problem} solution={solution} index={i} showIcon resetTrigger={problemResetTrigger} />
          ))}
        </div>
        <p
          className="text-box-shine mt-5 rounded-xl border border-emerald-500/25 bg-emerald-500/10 px-4 py-3 text-base leading-relaxed text-white/95 sm:text-lg"
          style={{
            opacity: p2Opacity,
            transform: `translateY(${p2Translate}px)`,
          }}
        >
          <span className="font-bold italic">
            Währenddessen gewinnen moderne Marken täglich neue Kunden über TikTok, Instagram und Google.
          </span>
        </p>
      </div>
    </section>
  );
}
