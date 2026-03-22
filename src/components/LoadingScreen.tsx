"use client";

import { useEffect, useState } from "react";
import { useLoading } from "@/context/LoadingContext";

const FADE_OUT_MS = 400;
const DURATION_DESKTOP = 1400;
const DURATION_MOBILE = 1200;

export function LoadingScreen() {
  const { setLoadComplete } = useLoading();
  const [phase, setPhase] = useState<"show" | "fade" | "done">("show");
  const [duration, setDuration] = useState(DURATION_DESKTOP);

  useEffect(() => {
    const id = setTimeout(() => {
      setDuration(window.matchMedia("(max-width: 768px)").matches ? DURATION_MOBILE : DURATION_DESKTOP);
    }, 0);
    return () => clearTimeout(id);
  }, []);

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("fade"), duration - FADE_OUT_MS);
    const t2 = setTimeout(() => {
      setLoadComplete();
      setPhase("done");
    }, duration);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [duration, setLoadComplete]);

  if (phase === "done") return null;

  return (
    <div
      className={`loading-screen fixed inset-0 z-[9999] flex flex-col items-center justify-center gap-8 bg-white transition-opacity duration-500 ease-out ${
        phase === "fade" ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
    >
      <p
        className="loading-name-text-shimmer flex items-center justify-center gap-0 text-2xl font-light tracking-tight sm:text-3xl"
        style={{
          fontFamily: "var(--font-austera)",
          fontStyle: "italic",
          fontWeight: 300,
        }}
      >
        <span className="text-black font-extrabold">EvG</span>
        <span
          className="animate-loading-shimmer-text font-light italic"
          style={{
            background: "linear-gradient(90deg, #d46830 0%, #ffc090 25%, #e07a40 50%, #ffc090 75%, #d46830 100%)",
            backgroundSize: "200% 100%",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            color: "transparent",
          }}
        >
          labs
        </span>
      </p>
      <div className="loading-spinner h-1 w-24 overflow-hidden rounded-full bg-neutral-200">
        <div className="loading-spinner-bar h-full w-0 rounded-full bg-emerald-500" />
      </div>
    </div>
  );
}
