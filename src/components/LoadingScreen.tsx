"use client";

import { useEffect, useState } from "react";
import { useLoading } from "@/context/LoadingContext";

const FADE_OUT_MS = 400;
const DURATION_DESKTOP = 2200;
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
      className={`loading-screen fixed inset-0 z-[9999] flex flex-col items-center justify-center gap-8 bg-black transition-opacity duration-500 ease-out ${
        phase === "fade" ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
    >
      <p
        className="loading-name-text-shimmer animate-loading-shimmer-text text-2xl font-bold tracking-tight sm:text-3xl"
        style={{
          fontFamily: "var(--font-main)",
          background: "linear-gradient(90deg, #ffffff 0%, #ffffff 25%, #a7f3d0 50%, #ffffff 75%, #ffffff 100%)",
          backgroundSize: "200% 100%",
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
          color: "transparent",
          textShadow: "0 0 20px rgba(34, 197, 94, 0.5), 0 0 40px rgba(34, 197, 94, 0.25)",
        }}
      >
        Erik von Gregory
      </p>
      <div className="loading-spinner h-1 w-24 overflow-hidden rounded-full bg-neutral-800">
        <div className="loading-spinner-bar h-full w-0 rounded-full bg-emerald-500" />
      </div>
    </div>
  );
}
