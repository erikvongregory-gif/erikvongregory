"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

const HERO_WEBM = "/neu/hero.webm";
const HERO_MP4 = "/neu/hero.mp4";
const HERO_POSTER = "/neu/hero-poster.webp";

/**
 * Poster-first Hero: LCP = Poster, Video erst nach Idle.
 * `preload="none"` — kein Bandbreiten-Kampf mit dem First Paint.
 */
export function NeuLoopVideo({ onFailed }: { onFailed?: () => void }) {
  const ref = React.useRef<HTMLVideoElement>(null);
  const [reduceMotion, setReduceMotion] = React.useState(false);
  const [shouldLoad, setShouldLoad] = React.useState(false);
  const [playing, setPlaying] = React.useState(false);

  React.useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(mq.matches);
    const onChange = () => setReduceMotion(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  React.useEffect(() => {
    if (reduceMotion) return;
    const start = () => setShouldLoad(true);
    if (typeof window.requestIdleCallback === "function") {
      const id = window.requestIdleCallback(start, { timeout: 1200 });
      return () => window.cancelIdleCallback(id);
    }
    const t = window.setTimeout(start, 300);
    return () => window.clearTimeout(t);
  }, [reduceMotion]);

  React.useEffect(() => {
    if (!shouldLoad || reduceMotion) return;
    const v = ref.current;
    if (!v) return;

    const play = () => {
      const p = v.play();
      if (p) {
        p.then(() => setPlaying(true)).catch(() => {});
      }
    };

    v.addEventListener("canplay", play);
    v.addEventListener("playing", () => setPlaying(true));
    // Quellen sind gemountet → Laden anstoßen
    v.load();
    play();

    return () => {
      v.removeEventListener("canplay", play);
    };
  }, [shouldLoad, reduceMotion]);

  return (
    <>
      {/* LCP-Kandidat — bleibt bis Video sichtbar */}
      <img
        src={HERO_POSTER}
        alt=""
        width={1600}
        height={900}
        decoding="async"
        fetchPriority="high"
        aria-hidden
        className={cn(
          "absolute inset-0 z-0 h-full w-full object-cover transition-opacity duration-700",
          playing && "opacity-0",
        )}
      />

      {shouldLoad && !reduceMotion ? (
        <video
          ref={ref}
          className={cn(
            "absolute inset-0 z-0 h-full w-full object-cover transition-opacity duration-700",
            playing ? "opacity-100" : "opacity-0",
          )}
          autoPlay
          loop
          muted
          playsInline
          preload="none"
          aria-hidden
          tabIndex={-1}
          onError={() => onFailed?.()}
        >
          <source src={HERO_WEBM} type="video/webm" />
          <source src={HERO_MP4} type="video/mp4" />
        </video>
      ) : null}
    </>
  );
}
