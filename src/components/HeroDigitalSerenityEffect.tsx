"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type Mode = "desktop" | "mobile";

/**
 * DigitalSerenity - Hero Einblendungs-/Ambient-Effekt
 * - Grid / Corner Elements / Floating Dots (CSS-Animation)
 * - Mouse-Radial-Licht (fixed) + Click-Ripples
 * - Optional Word Reveal via `.word-animate` (wenn vorhanden)
 *
 * Wichtig: Event-Listener laufen nur im passenden Breakpoint, damit
 * mobile/desktop sich nicht gegenseitig stören.
 */
export function HeroDigitalSerenityEffect({
  mode,
  className,
}: {
  mode: Mode;
  className?: string;
}) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mouseGradientRef = useRef<HTMLDivElement | null>(null);

  const [active, setActive] = useState(false);

  const mediaQuery = useMemo(() => {
    // Mobile: < 768px, Desktop: >= 768px
    return mode === "desktop" ? "(min-width: 768px)" : "(max-width: 767px)";
  }, [mode]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mql = window.matchMedia(mediaQuery);
    const update = () => setActive(mql.matches);
    update();
    mql.addEventListener?.("change", update);
    return () => mql.removeEventListener?.("change", update);
  }, [mediaQuery]);

  useEffect(() => {
    if (!active) return;

    // Auf Mobile wirkt der "Digital Serenity"-Look schnell störend, weil
    // das Snippet u. a. Mouse-Radial + Floating Dots per JS startet.
    // Mobile lassen wir daher nur die statische SVG-/Overlay-Optik laufen.
    if (mode === "mobile") return;

    let rafId: number | null = null;
    let lastLeft = 0;
    let lastTop = 0;
    let lastOpacity = 0;

    const applyMouseStyles = () => {
      rafId = null;
      const el = mouseGradientRef.current;
      if (!el) return;
      el.style.left = `${lastLeft}px`;
      el.style.top = `${lastTop}px`;
      el.style.opacity = String(lastOpacity);
    };

    const schedule = () => {
      if (rafId != null) return;
      rafId = window.requestAnimationFrame(applyMouseStyles);
    };

    const onMouseMove = (e: MouseEvent) => {
      lastLeft = e.clientX;
      lastTop = e.clientY;
      lastOpacity = 1;
      schedule();
    };

    const onMouseLeave = () => {
      lastOpacity = 0;
      schedule();
    };

    document.addEventListener("mousemove", onMouseMove, { passive: true });
    document.addEventListener("mouseleave", onMouseLeave);

    const onClick = (e: MouseEvent) => {
      // Ripple DOM-only, keine React-Re-Renders für Performance.
      const ripple = document.createElement("div");
      ripple.className = "ripple-effect";
      ripple.style.left = `${e.clientX}px`;
      ripple.style.top = `${e.clientY}px`;
      document.body.appendChild(ripple);
      window.setTimeout(() => {
        ripple.remove();
      }, 1000);
    };

    document.addEventListener("click", onClick);

    // Optional: Word Reveal nur wenn vorhanden (keine DOM-Elemente -> kein Aufwand)
    const wordElements = Array.from(document.querySelectorAll<HTMLElement>(".word-animate"));
    if (wordElements.length > 0) {
      window.setTimeout(() => {
        wordElements.forEach((word) => {
          const delay = Number.parseInt(word.getAttribute("data-delay") || "0", 10) || 0;
          window.setTimeout(() => {
            word.style.animation = "word-appear 0.8s ease-out forwards";
          }, delay);
        });
      }, 500);

      const handleEnter = (e: Event) => {
        const target = e.target as HTMLElement | null;
        if (!target) return;
        target.style.textShadow = "0 0 20px rgba(203, 213, 225, 0.5)";
      };
      const handleLeave = (e: Event) => {
        const target = e.target as HTMLElement | null;
        if (!target) return;
        target.style.textShadow = "none";
      };

      wordElements.forEach((w) => {
        w.addEventListener("mouseenter", handleEnter);
        w.addEventListener("mouseleave", handleLeave);
      });

      return () => {
        document.removeEventListener("mousemove", onMouseMove);
        document.removeEventListener("mouseleave", onMouseLeave);
        document.removeEventListener("click", onClick);
        if (rafId != null) window.cancelAnimationFrame(rafId);
        wordElements.forEach((w) => {
          w.removeEventListener("mouseenter", handleEnter);
          w.removeEventListener("mouseleave", handleLeave);
        });
      };
    }

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("click", onClick);
      if (rafId != null) window.cancelAnimationFrame(rafId);
    };
  }, [active]);

  useEffect(() => {
    if (!active) return;

    // Floating Dots erst ab Desktop animieren.
    if (mode === "mobile") return;

    const floatingElements = Array.from(
      document.querySelectorAll<HTMLElement>(".floating-element-animate")
    );
    if (floatingElements.length === 0) return;

    let started = false;

    const handleScroll = () => {
      if (started) return;
      started = true;
      floatingElements.forEach((el, index) => {
        const raw = el.style.animationDelay || "0s";
        const seconds = Number.parseFloat(raw.replace("s", "")) || 0;
        window.setTimeout(() => {
          el.style.animationPlayState = "running";
          el.style.opacity = "";
        }, seconds * 1000 + index * 100);
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [active]);

  const styles = useMemo(
    () => `
      #mouse-gradient-react {
        position: fixed;
        pointer-events: none;
        border-radius: 9999px;
        background-image: radial-gradient(circle, rgba(156, 163, 175, 0.05), rgba(107, 114, 128, 0.05), transparent 70%);
        transform: translate(-50%, -50%);
        will-change: left, top, opacity;
        transition: left 70ms linear, top 70ms linear, opacity 300ms ease-out;
      }
      @keyframes word-appear {
        0% { opacity: 0; transform: translateY(30px) scale(0.8); filter: blur(10px); }
        50% { opacity: 0.8; transform: translateY(10px) scale(0.95); filter: blur(2px); }
        100% { opacity: 1; transform: translateY(0) scale(1); filter: blur(0); }
      }
      @keyframes grid-draw {
        0% { stroke-dashoffset: 1000; opacity: 0; }
        50% { opacity: 0.3; }
        100% { stroke-dashoffset: 0; opacity: 0.15; }
      }
      @keyframes pulse-glow {
        0%, 100% { opacity: 0.1; transform: scale(1); }
        50% { opacity: 0.3; transform: scale(1.1); }
      }
      .word-animate { display: inline-block; opacity: 0; margin: 0 0.1em; transition: color 0.3s ease, transform 0.3s ease; }
      .word-animate:hover { color: #cbd5e1; transform: translateY(-2px); }
      .grid-line { stroke: #94a3b8; stroke-width: 0.5; opacity: 0; stroke-dasharray: 5 5; stroke-dashoffset: 1000; animation: grid-draw 2s ease-out forwards; }
      .detail-dot { fill: #cbd5e1; opacity: 0; animation: pulse-glow 3s ease-in-out infinite; }
      .corner-element-animate {
        position: absolute;
        width: 40px;
        height: 40px;
        border: 1px solid rgba(203, 213, 225, 0.2);
        opacity: 0;
        animation: word-appear 1s ease-out forwards;
      }
      .floating-element-animate {
        position: absolute;
        width: 2px;
        height: 2px;
        background: #cbd5e1;
        border-radius: 50%;
        opacity: 0;
        animation: float 4s ease-in-out infinite;
        animation-play-state: paused;
      }
      @keyframes float {
        0%, 100% { transform: translateY(0) translateX(0); opacity: 0.2; }
        25% { transform: translateY(-10px) translateX(5px); opacity: 0.6; }
        50% { transform: translateY(-5px) translateX(-3px); opacity: 0.4; }
        75% { transform: translateY(-15px) translateX(7px); opacity: 0.8; }
      }
      .ripple-effect {
        position: fixed;
        width: 4px;
        height: 4px;
        background: rgba(203, 213, 225, 0.6);
        border-radius: 50%;
        transform: translate(-50%, -50%);
        pointer-events: none;
        animation: pulse-glow 1s ease-out forwards;
        z-index: 9999;
      }
    `,
    []
  );

  return (
    <>
      <style>{styles}</style>
      <div
        ref={containerRef}
        data-hero-mode={mode}
        aria-hidden
        className={cn("absolute inset-0 overflow-hidden pointer-events-none", className)}
      >
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <defs>
            <pattern id="gridReactDarkResponsiveHero" width="60" height="60" patternUnits="userSpaceOnUse">
              <path
                d="M 60 0 L 0 0 0 60"
                fill="none"
                stroke="rgba(100, 116, 139, 0.1)"
                strokeWidth="0.5"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#gridReactDarkResponsiveHero)" />

          {/* Zusätzliche Linien: erscheinen wie im Snippet */}
          <line x1="0" y1="20%" x2="100%" y2="20%" className="grid-line" style={{ animationDelay: "0.5s" }} />
          <line x1="0" y1="80%" x2="100%" y2="80%" className="grid-line" style={{ animationDelay: "1s" }} />
          <line x1="20%" y1="0" x2="20%" y2="100%" className="grid-line" style={{ animationDelay: "1.5s" }} />
          <line x1="80%" y1="0" x2="80%" y2="100%" className="grid-line" style={{ animationDelay: "2s" }} />
          <line x1="50%" y1="0" x2="50%" y2="100%" className="grid-line" style={{ animationDelay: "2.5s", opacity: "0.05" }} />
          <line x1="0" y1="50%" x2="100%" y2="50%" className="grid-line" style={{ animationDelay: "3s", opacity: "0.05" }} />

          <circle cx="20%" cy="20%" r="2" className="detail-dot" style={{ animationDelay: "3s" }} />
          <circle cx="80%" cy="20%" r="2" className="detail-dot" style={{ animationDelay: "3.2s" }} />
          <circle cx="20%" cy="80%" r="2" className="detail-dot" style={{ animationDelay: "3.4s" }} />
          <circle cx="80%" cy="80%" r="2" className="detail-dot" style={{ animationDelay: "3.6s" }} />
          <circle cx="50%" cy="50%" r="1.5" className="detail-dot" style={{ animationDelay: "4s" }} />
        </svg>

        {/* Corner Elemente */}
        <div className="corner-element-animate top-4 left-4" style={{ animationDelay: "4s" }}>
          <div className="absolute top-0 left-0 w-2 h-2 bg-slate-300 opacity-30 rounded-full" />
        </div>
        <div className="corner-element-animate top-4 right-4" style={{ animationDelay: "4.2s" }}>
          <div className="absolute top-0 right-0 w-2 h-2 bg-slate-300 opacity-30 rounded-full" />
        </div>
        <div className="corner-element-animate bottom-4 left-4" style={{ animationDelay: "4.4s" }}>
          <div className="absolute bottom-0 left-0 w-2 h-2 bg-slate-300 opacity-30 rounded-full" />
        </div>
        <div className="corner-element-animate bottom-4 right-4" style={{ animationDelay: "4.6s" }}>
          <div className="absolute bottom-0 right-0 w-2 h-2 bg-slate-300 opacity-30 rounded-full" />
        </div>

        {/* Floating Dots (starten erst nach erstem Scroll) */}
        <div className="floating-element-animate" style={{ top: "25%", left: "15%", animationDelay: "0.5s" }} />
        <div className="floating-element-animate" style={{ top: "60%", left: "85%", animationDelay: "1s" }} />
        <div className="floating-element-animate" style={{ top: "40%", left: "10%", animationDelay: "1.5s" }} />
        <div className="floating-element-animate" style={{ top: "75%", left: "90%", animationDelay: "2s" }} />

        {/* Mouse Gradient (opacity bleibt zunächst 0, wird per Events gesteuert) */}
        <div
          ref={mouseGradientRef}
          id="mouse-gradient-react"
          className={cn("w-60 h-60 blur-xl", mode === "desktop" ? "sm:w-80 sm:h-80 sm:blur-2xl md:w-96 md:h-96 md:blur-3xl" : "sm:w-80 sm:h-80 sm:blur-2xl")}
          style={{ left: "0px", top: "0px", opacity: 0 }}
        />
      </div>
    </>
  );
}

