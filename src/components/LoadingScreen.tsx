"use client";

import { useEffect, useState } from "react";

const DURATION_MS = 4800;
const FADE_OUT_MS = 500;

export function LoadingScreen() {
  const [phase, setPhase] = useState<"show" | "fade" | "done">("show");

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("fade"), DURATION_MS - FADE_OUT_MS);
    const t2 = setTimeout(() => setPhase("done"), DURATION_MS);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  if (phase === "done") return null;

  return (
    <div
      className={`loading-screen fixed inset-0 z-[9999] flex flex-col items-center justify-center gap-8 bg-black transition-opacity duration-500 ease-out ${
        phase === "fade" ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
    >
      <p className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
        Erik{" "}
        <span
          className="font-light italic"
          style={{
            fontFamily: "var(--font-austera)",
            textShadow: "0 0 20px rgba(34, 197, 94, 0.5), 0 0 40px rgba(34, 197, 94, 0.25)",
          }}
        >
          von Gregory
        </span>
      </p>
      <div className="loading-spinner h-1 w-24 overflow-hidden rounded-full bg-neutral-800">
        <div className="loading-spinner-bar h-full w-0 rounded-full bg-emerald-500" />
      </div>
    </div>
  );
}
