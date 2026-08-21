"use client";

import Image from "next/image";
import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { MOBILE_EDITORIAL_PX } from "@/lib/mobileEditorial";
import { scheduleAfterPaint } from "@/lib/scheduleAfterPaint";
import { cn } from "@/lib/utils";
import {
  getDailyCategoryStats,
  getDailyMotifCount,
  MOBILE_HERO_POLAROIDS,
  type MobileHeroPolaroid,
} from "@/lib/mobileHeroConfig";

type PolaroidSlot = "front" | "backLeft" | "backRight";

const SLOT_LAYOUT: Record<
  PolaroidSlot,
  {
    className: string;
    shadow: string;
    z: number;
  }
> = {
  backLeft: {
    className: "top-2.5 left-6 h-[200px] w-[150px] -rotate-[7deg]",
    shadow: "0 12px 24px -10px rgba(40,28,12,0.25)",
    z: 1,
  },
  backRight: {
    className: "top-[26px] right-4 h-[220px] w-[160px] rotate-[5deg]",
    shadow: "0 18px 30px -12px rgba(40,28,12,0.22)",
    z: 2,
  },
  front: {
    className: "top-14 left-1/2 h-[230px] w-[180px] -translate-x-1/2 -rotate-[2deg]",
    shadow: "0 24px 40px -14px rgba(40,28,12,0.32)",
    z: 3,
  },
};

function slotForIndex(index: number, activeIndex: number): PolaroidSlot {
  if (index === activeIndex) return "front";
  const order = MOBILE_HERO_POLAROIDS.map((_, i) => i);
  const others = order.filter((i) => i !== activeIndex);
  if (index === others[0]) return "backLeft";
  return "backRight";
}

const PLACEHOLDER_BG =
  "repeating-linear-gradient(135deg, #EAE3D5 0 10px, #D8CFBC 10px 11px)";

/** Polaroid ~150–180px breit — sizes für Retina; Qualität bewusst niedrig für LCP. */
const POLAROID_IMAGE_QUALITY = 75;
const POLAROID_IMAGE_SIZES_FULL = "(max-width: 768px) 240px, 280px";
const POLAROID_IMAGE_SIZES_HALF = "(max-width: 768px) 160px, 200px";

function PolaroidMedia({
  card,
  reducedMotion = false,
  isFront = false,
}: {
  card: MobileHeroPolaroid;
  reducedMotion?: boolean;
  isFront?: boolean;
}) {
  const hasMedia = Boolean(card.videoSrc || card.imageSrc || card.imageSrcs?.length);
  const alt = card.imageAlt ?? card.placeholderCaption;
  const [videoReady, setVideoReady] = useState(false);
  const [videoPlaying, setVideoPlaying] = useState(false);
  const mediaRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  /**
   * Video nur im Front-Polaroid. Start verzögert, damit Poster/Produkt-LCP zuerst zählt.
   */
  useEffect(() => {
    if (!card.videoSrc || reducedMotion || !isFront) {
      setVideoReady(false);
      setVideoPlaying(false);
      return;
    }

    let cancelled = false;
    const timeoutId = setTimeout(() => {
      if (!cancelled) setVideoReady(true);
    }, 200);

    return () => {
      cancelled = true;
      clearTimeout(timeoutId);
    };
  }, [card.videoSrc, isFront, reducedMotion]);

  useEffect(() => {
    if (!videoReady) return;
    const v = videoRef.current;
    if (!v) return;
    const onPlaying = () => setVideoPlaying(true);
    v.addEventListener("playing", onPlaying);
    v.muted = true;
    void v.play().catch(() => {});
    return () => v.removeEventListener("playing", onPlaying);
  }, [videoReady]);

  return (
    <div
      ref={mediaRef}
      className="relative flex h-[calc(100%-22px)] w-full flex-col items-center justify-center overflow-hidden rounded-[2px] bg-paper2"
      style={hasMedia ? undefined : { background: PLACEHOLDER_BG }}
    >
      {card.videoSrc ? (
        <>
          {card.videoPoster ? (
            <Image
              src={card.videoPoster}
              alt=""
              fill
              sizes={POLAROID_IMAGE_SIZES_FULL}
              quality={POLAROID_IMAGE_QUALITY}
              className={cn(
                "polaroid-media__img object-cover object-center transition-opacity duration-500",
                videoPlaying ? "opacity-0" : "opacity-100",
              )}
              aria-hidden
              priority={isFront}
              loading={isFront ? "eager" : "lazy"}
            />
          ) : null}
          {videoReady ? (
            <video
              ref={videoRef}
              className={cn(
                "polaroid-media__video absolute inset-0 h-full w-full object-cover object-center transition-opacity duration-500",
                videoPlaying ? "opacity-100" : "opacity-0",
              )}
              src={card.videoSrc}
              muted
              loop
              playsInline
              autoPlay
              preload="metadata"
              aria-label={alt}
            />
          ) : null}
        </>
      ) : null}
      {!card.videoSrc && card.imageSrcs ? (
        <div className="absolute inset-0 grid grid-cols-2 gap-px">
          {card.imageSrcs.map((src, i) => (
            <div key={src} className="relative min-h-0 min-w-0">
              <Image
                src={src}
                alt={i === 0 ? alt : `${alt} (Motiv ${i + 1})`}
                fill
                className="polaroid-media__img object-cover"
                sizes={POLAROID_IMAGE_SIZES_HALF}
                quality={POLAROID_IMAGE_QUALITY}
                priority={isFront}
                loading={isFront ? "eager" : "lazy"}
              />
            </div>
          ))}
        </div>
      ) : null}
      {!card.videoSrc && !card.imageSrcs && card.imageSrc ? (
        <Image
          src={card.imageSrc}
          alt={alt}
          fill
          className="polaroid-media__img object-cover"
          sizes={POLAROID_IMAGE_SIZES_FULL}
          quality={POLAROID_IMAGE_QUALITY}
          priority={isFront}
          loading={isFront ? "eager" : "lazy"}
        />
      ) : null}
      {!hasMedia ? (
        <span className="px-2 text-center font-mono-hero text-[9px] uppercase tracking-[0.5px] text-ink3">
          {card.placeholderCaption}
        </span>
      ) : null}
    </div>
  );
}

function WavyUnderline() {
  return (
    <svg
      className="mobile-hero-wavy-underline pointer-events-none absolute -bottom-1.5 left-0 h-2.5 w-[60px]"
      viewBox="0 0 60 10"
      fill="none"
      aria-hidden
    >
      <path
        className="mobile-hero-wavy-underline__path"
        pathLength={1}
        d="M2 6 C 15 1, 30 9, 45 4 S 58 6, 58 6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

type MobileGalleryHeroProps = {
  primaryCtaLabel: string;
  onPrimaryCtaClick: () => void;
  ctaPending?: boolean;
  onGalleryOpen: () => void;
};

export function MobileGalleryHero({
  primaryCtaLabel,
  onPrimaryCtaClick,
  ctaPending = false,
  onGalleryOpen,
}: MobileGalleryHeroProps) {
  const productIndex = MOBILE_HERO_POLAROIDS.findIndex((p) => p.id === "product");
  /** Produkt vorne = LCP. Video nur bei Tap aufs Reel-Polaroid (kein Lab-Netzwerk). */
  const [activeIndex, setActiveIndex] = useState(productIndex >= 0 ? productIndex : 0);
  const [reducedMotion, setReducedMotion] = useState(false);
  /** Gestaffelte Einblendung — nach Layout/Paint, sonst kein Transition-Start bei Hydration. */
  const [revealReady, setRevealReady] = useState(false);

  const { motifLabel, categoryStats } = useMemo(() => {
    const today = new Date();
    return {
      motifLabel: getDailyMotifCount(today).toLocaleString("de-DE"),
      categoryStats: getDailyCategoryStats(today),
    };
  }, []);
  const ctaTitle = primaryCtaLabel.replace(/^3\s+/, "").trim() || primaryCtaLabel;

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReducedMotion(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  useLayoutEffect(() => {
    if (reducedMotion) {
      setRevealReady(true);
      return;
    }
    setRevealReady(false);
    return scheduleAfterPaint(() => setRevealReady(true));
  }, [reducedMotion]);

  const bringToFront = useCallback((index: number) => {
    setActiveIndex(index);
  }, []);

  return (
    <section
      className={cn(
        "mobile-gallery-hero relative w-full min-w-0 bg-paper text-ink pb-0",
        revealReady && "mobile-gallery-hero--ready",
      )}
      aria-labelledby="mobile-gallery-hero-heading"
    >
      <p
        className={cn(
          "mobile-hero-fade mobile-hero-fade-0 flex items-center gap-2 pt-2 font-mono-hero text-[11px] uppercase tracking-[1.2px] text-ink3",
          MOBILE_EDITORIAL_PX,
        )}
      >
        <span className="mobile-hero-eyebrow-dot h-1.5 w-1.5 shrink-0 rounded-full bg-amber" aria-hidden />
        Heute generiert · {motifLabel} Motive
      </p>

      <h1
        id="mobile-gallery-hero-heading"
        className={cn(
          "mobile-hero-fade mobile-hero-fade-1 m-0 pt-3 font-serif-hero text-[40px] font-normal leading-[1.03] tracking-[-1px] [font-variation-settings:'opsz'_48]",
          MOBILE_EDITORIAL_PX,
        )}
      >
        So sieht dein{" "}
        <span className="block">
          <em className="relative inline-block not-italic font-medium text-amber">
            Bier
            <WavyUnderline />
          </em>{" "}
          draußen aus.
        </span>
      </h1>

      <div className={cn("mobile-hero-fade mobile-hero-fade-2 relative mb-2 h-[280px] shrink-0", MOBILE_EDITORIAL_PX)}>
        {MOBILE_HERO_POLAROIDS.map((card, index) => {
          const slot = slotForIndex(index, activeIndex);
          const layout = SLOT_LAYOUT[slot];
          const isFront = slot === "front";

          return (
            <button
              key={card.id}
              type="button"
              aria-label={`Beispielmotiv: ${card.placeholderCaption}`}
              aria-pressed={isFront}
              onClick={() => bringToFront(index)}
              className={cn(
                "absolute bg-white p-2 pb-[30px] text-left rounded-[4px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber/50 focus-visible:ring-offset-2 focus-visible:ring-offset-paper",
                layout.className,
                !reducedMotion && "transition-[transform,box-shadow] duration-300 ease-out",
              )}
              style={{
                zIndex: layout.z,
                boxShadow: layout.shadow,
              }}
            >
              <PolaroidMedia card={card} reducedMotion={reducedMotion} isFront={isFront} />
              <span
                className={cn(
                  "mt-1.5 block text-center font-mono-hero text-[9px] uppercase tracking-[0.6px] text-ink3",
                  card.stampClassName,
                )}
              >
                {card.stamp}
              </span>
            </button>
          );
        })}
      </div>

      <p className={cn("mobile-hero-fade mobile-hero-fade-3 mb-4 mt-1 font-sans-tight text-sm leading-[1.5] text-ink2", MOBILE_EDITORIAL_PX)}>
        Produktfotos, Kampagnen&shy;motive und Social-Content — jedes Motiv konsistent zu deinem
        Markenstil, ohne Studio.
      </p>

      <div className={cn("mobile-hero-fade mobile-hero-fade-4", MOBILE_EDITORIAL_PX)}>
        <div className="mobile-hero-primary-cta flex w-full flex-col items-center">
          <span
            className="mobile-hero-primary-cta__hook pointer-events-none relative z-[2] -mb-3 whitespace-nowrap rounded-full border border-amber/25 bg-paper px-3 py-1 text-center font-mono-hero text-[9.5px] font-semibold uppercase tracking-[0.08em] text-amber shadow-[0_4px_14px_-8px_rgba(199,105,30,0.45)]"
            aria-hidden
          >
            Kostenlos · Keine Kreditkarte
          </span>
          <button
            type="button"
            disabled={ctaPending}
            onClick={onPrimaryCtaClick}
            className="hero-cta-btn mobile-cta-animate mobile-hero-primary-cta__btn relative z-[1] flex min-h-[58px] w-full items-center gap-3 rounded-2xl px-3.5 py-3.5 text-paper transition active:scale-[0.98] disabled:opacity-80"
          >
            <span
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/20 bg-white/12 font-serif-hero text-[26px] font-medium leading-none tracking-[-0.5px] shadow-[inset_0_1px_0_rgba(255,255,255,0.18)]"
              aria-hidden
            >
              3
            </span>
            <span className="flex min-w-0 flex-1 flex-col items-start gap-0.5 text-left">
              <span className="font-sans-tight text-[15px] font-semibold leading-[1.15] tracking-[-0.2px]">
                {ctaPending ? "Demo startet …" : ctaTitle}
              </span>
              <span className="font-mono-hero text-[10px] font-medium uppercase tracking-[0.06em] text-white/75">
                {ctaPending ? "Einen Moment" : "Sofort testen · ~6 Sek."}
              </span>
            </span>
            <span
              className="mobile-hero-primary-cta__arrow flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/14 text-lg font-semibold leading-none"
              aria-hidden
            >
              →
            </span>
          </button>
        </div>
      </div>

      <p className={cn("mobile-hero-fade mobile-hero-fade-5 mt-3 flex items-center justify-center gap-2 font-mono-hero text-[10.5px] tracking-[0.6px] text-ink3", MOBILE_EDITORIAL_PX)}>
        <span>oder</span>
        <button
          type="button"
          onClick={onGalleryOpen}
          className="border-b border-ink/20 font-semibold text-ink no-underline"
        >
          Galerie öffnen ↗
        </button>
      </p>

      <ul className={cn("mobile-hero-fade mobile-hero-fade-6 mt-auto flex gap-2 pb-5 pt-3", MOBILE_EDITORIAL_PX)}>
        {categoryStats.map(({ value, label }) => (
          <li key={label} className="min-w-0 flex-1">
            <div className="rounded-[10px] border border-ink/10 bg-white px-2.5 py-2.5">
              <p className="font-serif-hero text-lg leading-none tracking-[-0.3px] text-ink">{value}</p>
              <p className="mt-1 font-mono-hero text-[9px] uppercase tracking-[0.4px] text-ink3">{label}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
