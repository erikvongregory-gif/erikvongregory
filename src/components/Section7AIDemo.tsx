"use client";

import Image from "next/image";
import { useRef, useEffect, useState } from "react";
import { createPortal } from "react-dom";

const KI_BEISPIELE = [
  { src: "/ki-beispiel-1.svg", alt: "KI-Werbebild Beispiel 1 – Lünebräu" },
  { src: "/ki-beispiel-2.svg", alt: "KI-Werbebild Beispiel 2 – Lünebräu" },
  { src: "/ki-beispiel-3.svg", alt: "KI-Werbebild Beispiel 3 – Lünebräu" },
  { src: "/ki-beispiel-4.svg", alt: "KI-Werbebild Beispiel 4 – Lünebräu" },
];

export function Section7AIDemo() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const scrollYRef = useRef(0);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === "Escape") setLightboxIndex(null);
      if (e.key === "ArrowLeft") setLightboxIndex((i) => (i === null ? null : (i - 1 + KI_BEISPIELE.length) % KI_BEISPIELE.length));
      if (e.key === "ArrowRight") setLightboxIndex((i) => (i === null ? null : (i + 1) % KI_BEISPIELE.length));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightboxIndex]);

  /* Scroll sperren nur beim Öffnen/Schließen – nicht beim Bildwechsel, sonst springt Mobile zu Section 1 */
  const isOpen = lightboxIndex !== null;
  useEffect(() => {
    if (!isOpen) return;
    scrollYRef.current = window.scrollY;
    const prev = {
      overflow: document.body.style.overflow,
      position: document.body.style.position,
      top: document.body.style.top,
      left: document.body.style.left,
      right: document.body.style.right,
      width: document.body.style.width,
    };
    document.body.style.overflow = "hidden";
    document.body.style.position = "fixed";
      document.body.style.top = `-${scrollYRef.current}px`;
    document.body.style.left = "0";
    document.body.style.right = "0";
    document.body.style.width = "100%";
    return () => {
      document.body.style.overflow = prev.overflow;
      document.body.style.position = prev.position;
      document.body.style.top = prev.top;
      document.body.style.left = prev.left;
      document.body.style.right = prev.right;
      document.body.style.width = prev.width;
      window.scrollTo(0, scrollYRef.current);
    };
  }, [isOpen]);

  return (
    <section
      id="section-7"
      ref={sectionRef}
      className="relative z-[70] border-t-0 px-4 py-16 sm:py-20 md:border-t md:border-neutral-300/40 md:py-24"
    >
      <div className="section7-inner mx-auto max-w-4xl">
        <div className="mb-8 text-center">
          <span className="section7-badge section7-badge-pulse inline-flex items-center gap-2 rounded-full border border-orange-400/30 bg-orange-400/10 px-4 py-1.5 text-sm font-medium text-orange-300">
            <span aria-hidden>✦</span>
            KI-Demo
          </span>
          <h2 className="section7-headline mt-4 text-2xl font-bold tracking-tight text-white sm:text-3xl md:text-4xl">
            Echte Beispiele{" "}
            <span className="font-light italic font-austera-green-fade">
              aus der Praxis
            </span>
          </h2>
          <p className="section7-desc mx-auto mt-3 max-w-2xl text-base leading-relaxed text-white/90 sm:text-lg">
            Produktvisualisierungen und Werbebilder wie diese – mit KI in Minuten erstellt statt in Tagen.
            Klicke dich durch die Beispiele und überzeuge dich selbst von der Qualität.
          </p>
        </div>

        <div className="section2-card overflow-hidden rounded-2xl border border-white/15 p-4 sm:p-6">
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            {KI_BEISPIELE.map((img, i) => (
              <button
                key={img.src}
                type="button"
                onClick={() => setLightboxIndex(i)}
                className="group relative aspect-[4/3] overflow-hidden rounded-xl border border-white/10 bg-black/30 transition-all duration-200 hover:border-emerald-400/40 hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0f14] md:bg-[#070d12] md:focus-visible:ring-offset-[#cbcbcb]"
                aria-label={`${img.alt} – zum Vergrößern klicken`}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-contain transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 640px) 50vw, 400px"
                />
                <div className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/10" aria-hidden />
              </button>
            ))}
          </div>

          <p className="section7-hint mt-4 text-center text-sm text-white/70 sm:mt-6 sm:text-base">
            Bild anklicken zum Vergrößern – links/rechts tippen oder Pfeiltasten zum Durchblättern.
          </p>
        </div>

        {/* KI-Video: Aus solchen Bildern können solche Videos entstehen – ohne dass die Person existiert */}
        <div className="section2-card mt-6 overflow-hidden rounded-2xl border border-white/15 p-4 sm:p-6">
          <div className="aspect-video mx-auto w-full max-w-2xl overflow-hidden rounded-xl bg-black/40">
            <video
              src="/ki-beispiel-video-v2.mp4"
              controls
              playsInline
              loop
              className="h-full w-full object-contain"
              aria-label="KI-Beispielvideo – zeigt, wie aus Bildern Videos entstehen können"
            >
              Dein Browser unterstützt das Video-Format nicht.
            </video>
          </div>
          <p className="section7-hint mt-4 text-center text-sm text-white/70 sm:text-base">
            Aus solchen Bildern können solche Videos entstehen – ohne dass die Person tatsächlich existiert.
            KI bringt statische Motive zum Sprechen und Erzählen.
          </p>
        </div>

        <p className="section7-footer mt-6 text-center text-base font-medium text-white/90 sm:text-lg">
          So kann auch deine Brauerei mit professionellen Bildern und Werbematerial überzeugen – schnell, günstig und ohne Grafikdesigner.
        </p>
      </div>

      {/* Lightbox – Portal in body, damit fixed immer relativ zum Viewport ist (auch bei Scroll) */}
      {lightboxIndex !== null &&
        typeof document !== "undefined" &&
        createPortal(
          <div
            className="fixed inset-0 z-[9999] flex min-h-[100dvh] min-h-screen cursor-default touch-none items-center justify-center bg-black/90 p-4"
            role="dialog"
            aria-modal="true"
            aria-label="Bild vergrößert anzeigen"
            onClick={() => setLightboxIndex(null)}
          >
            <button
              type="button"
              onClick={() => setLightboxIndex(null)}
              className="absolute right-4 top-4 z-10 rounded-full bg-white/10 p-2 text-white transition hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              aria-label="Schließen"
            >
              <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
            <div
              className="relative mx-auto flex h-full max-h-[85vh] w-full max-w-4xl cursor-default items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setLightboxIndex((i) => (i! - 1 + KI_BEISPIELE.length) % KI_BEISPIELE.length);
                }}
                className="absolute left-0 top-0 z-10 h-full w-1/3 min-w-[80px] cursor-pointer touch-manipulation sm:w-1/4"
                aria-label="Vorheriges Bild"
              />
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setLightboxIndex((i) => (i! + 1) % KI_BEISPIELE.length);
                }}
                className="absolute right-0 top-0 z-10 h-full w-1/3 min-w-[80px] cursor-pointer touch-manipulation sm:w-1/4"
                aria-label="Nächstes Bild"
              />
              <button
                type="button"
                onClick={() => setLightboxIndex((i) => (i! - 1 + KI_BEISPIELE.length) % KI_BEISPIELE.length)}
                className="absolute left-2 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/10 p-2 text-white transition hover:bg-white/20 sm:left-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white pointer-events-auto"
                aria-label="Vorheriges Bild"
              >
                <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </button>
              <button
                type="button"
                onClick={() => setLightboxIndex((i) => (i! + 1) % KI_BEISPIELE.length)}
                className="absolute right-2 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/10 p-2 text-white transition hover:bg-white/20 sm:right-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white pointer-events-auto"
                aria-label="Nächstes Bild"
              >
                <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </button>
              <div className="relative z-0 h-full w-full pointer-events-none">
                <Image
                  src={KI_BEISPIELE[lightboxIndex].src}
                  alt={KI_BEISPIELE[lightboxIndex].alt}
                  fill
                  className="object-contain object-center"
                  sizes="100vw"
                />
              </div>
              <p className="absolute bottom-4 left-1/2 -translate-x-1/2 text-sm text-white/70">
                {lightboxIndex + 1} / {KI_BEISPIELE.length}
              </p>
            </div>
          </div>,
          document.body
        )}
    </section>
  );
}
