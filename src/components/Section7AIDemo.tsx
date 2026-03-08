"use client";

import Image from "next/image";
import { useRef, useEffect, useState } from "react";

export function Section7AIDemo() {
  const [isUnlocking, setIsUnlocking] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [fadeIn, setFadeIn] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        const e = entries[0];
        if (!e) return;
        const ratio = Math.min(1, Math.max(0, (e.intersectionRatio - 0.15) / 0.5));
        setFadeIn(ratio);
        // Beim We scrollen weg: wieder sperren
        if (e.intersectionRatio < 0.1) {
          setIsUnlocked(false);
          setIsUnlocking(false);
        }
      },
      { threshold: [0, 0.05, 0.1, 0.15, 0.3, 0.5, 0.7, 1], rootMargin: "0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const handleUnlock = () => {
    if (isUnlocked || isUnlocking) return;
    setIsUnlocking(true);
    setTimeout(() => {
      setIsUnlocked(true);
      setIsUnlocking(false);
    }, 550);
  };

  return (
    <section
      id="section-7"
      ref={sectionRef}
      className="relative z-[70] border-t border-white/10 bg-transparent px-4 py-16 sm:py-20 md:py-24"
      style={{
        opacity: fadeIn,
        transform: `translateY(${(1 - fadeIn) * 24}px)`,
        transition: "opacity 0.5s cubic-bezier(0.22, 1, 0.36, 1), transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)",
      }}
    >
      <div className="mx-auto max-w-4xl">
        <div className="mb-8 text-center">
          <span className="section7-badge-pulse inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-4 py-1.5 text-sm font-medium text-emerald-300">
            <span aria-hidden>✦</span>
            KI-Demo
          </span>
          <h2 className="mt-4 text-2xl font-bold tracking-tight text-white drop-shadow-md sm:text-3xl md:text-4xl">
            Erkennst du{" "}
            <span
              className="font-light italic"
              style={{
                fontFamily: "var(--font-austera)",
                textShadow: "0 0 20px rgba(34, 197, 94, 0.5), 0 0 40px rgba(34, 197, 94, 0.25)",
              }}
            >
              den Unterschied
            </span>
            ?
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-base leading-relaxed text-white/90 sm:text-lg">
            Dieses Werbebild – früher hätte ein Grafikdesigner Stunden bis Tage dafür gebraucht.
            Heute entsteht so etwas mit KI in Minuten – und ist dadurch deutlich günstiger.
          </p>
        </div>

        <div className="section2-card overflow-hidden rounded-2xl border border-white/15 p-4 sm:p-6">
          <button
            type="button"
            onClick={handleUnlock}
            disabled={isUnlocked}
            className={`group relative block w-full ${!isUnlocked ? "cursor-pointer" : "cursor-default"}`}
            aria-expanded={isUnlocked}
            aria-label={isUnlocked ? "Bild angezeigt" : "Klicken zum Entsperren und Anzeigen des Bildes"}
          >
            <div
              className={`relative aspect-[4/3] w-full overflow-hidden rounded-xl sm:aspect-video transition-[filter] duration-500 ease-out ${
                isUnlocked ? "blur-0" : "blur-xl"
              }`}
            >
              <Image
                src="/ai-beispiel-sunburst.png"
                alt="KI-generiertes Werbebild: SUNBURST CITRUS Saft – Beispiel für professionelle Marketing-Grafik"
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, 896px"
              />
            </div>

            {(!isUnlocked || isUnlocking) && (
              <div
                className={`absolute inset-0 flex flex-col items-center justify-center rounded-xl bg-black/40 transition-opacity duration-300 ${
                  isUnlocking ? "section7-lock-overlay-exit" : "group-hover:bg-black/30"
                }`}
                aria-hidden
              >
                {isUnlocking && (
                  <div className="section7-green-burst absolute inset-0 rounded-xl" aria-hidden />
                )}
                <div
                  className={`relative flex h-16 w-16 items-center justify-center rounded-full border-2 ${
                    isUnlocking
                      ? "section7-lock-open border-emerald-400/60 bg-emerald-500/20"
                      : "border-red-500/70 bg-red-500/15 transition-transform duration-300 group-hover:scale-110"
                  }`}
                >
                  <svg
                    className={`h-8 w-8 ${
                      isUnlocking ? "text-emerald-400" : "text-red-400"
                    } ${isUnlocking ? "" : "transition-transform duration-300 group-hover:scale-110"}`}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden
                  >
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                </div>
                <p className="relative mt-4 text-sm font-medium text-white/95">
                  {isUnlocking ? "Entsperrt …" : "Klicken zum Entsperren"}
                </p>
              </div>
            )}
          </button>

          <p className="mt-4 text-center text-sm text-white/70 sm:mt-6 sm:text-base">
            {isUnlocked
              ? "Könntest du erkennen, dass das durch KI erstellt wurde?"
              : "Klicke auf das Schloss, um das Bild anzuzeigen."}
          </p>
        </div>

        <p className="mt-6 text-center text-base font-medium text-white/90 sm:text-lg">
          Moderne KI macht professionelles Marketing für Brauereien und Gastronomie zugänglich – schnell, günstig, überzeugend.
        </p>
      </div>
    </section>
  );
}
