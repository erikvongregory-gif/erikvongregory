"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useLoading } from "@/context/LoadingContext";
import { MOBILE_EDITORIAL_PX } from "@/lib/mobileEditorial";
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

function PolaroidMedia({
  card,
  reducedMotion = false,
}: {
  card: MobileHeroPolaroid;
  reducedMotion?: boolean;
}) {
  const hasMedia = Boolean(card.videoSrc || card.imageSrc || card.imageSrcs?.length);
  const alt = card.imageAlt ?? card.placeholderCaption;

  return (
    <div
      className="relative flex h-[calc(100%-22px)] w-full flex-col items-center justify-center overflow-hidden rounded-[2px] bg-paper2"
      style={hasMedia ? undefined : { background: PLACEHOLDER_BG }}
    >
      {card.videoSrc ? (
        <video
          className="absolute inset-0 h-full w-full object-cover object-center"
          src={card.videoSrc}
          poster={card.videoPoster}
          autoPlay={!reducedMotion}
          muted
          loop={!reducedMotion}
          playsInline
          preload="metadata"
          aria-label={alt}
        />
      ) : null}
      {!card.videoSrc && card.imageSrcs ? (
        <div className="absolute inset-0 grid grid-cols-2 gap-px">
          {card.imageSrcs.map((src, i) => (
            <div key={src} className="relative min-h-0 min-w-0">
              <Image
                src={src}
                alt={i === 0 ? alt : `${alt} (Motiv ${i + 1})`}
                fill
                className="object-cover"
                sizes="90px"
                priority={i === 0}
              />
            </div>
          ))}
        </div>
      ) : null}
      {!card.videoSrc && !card.imageSrcs && card.imageSrc ? (
        <Image src={card.imageSrc} alt={alt} fill className="object-cover" sizes="180px" priority />
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
  const { heroReady } = useLoading();
  const defaultActive = MOBILE_HERO_POLAROIDS.findIndex((p) => p.id === "product");
  const [activeIndex, setActiveIndex] = useState(defaultActive >= 0 ? defaultActive : 0);
  const [reducedMotion, setReducedMotion] = useState(false);

  const { motifLabel, categoryStats } = useMemo(() => {
    const today = new Date();
    return {
      motifLabel: getDailyMotifCount(today).toLocaleString("de-DE"),
      categoryStats: getDailyCategoryStats(today),
    };
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReducedMotion(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  const bringToFront = useCallback((index: number) => {
    setActiveIndex(index);
  }, []);

  return (
    <section
      className={cn(
        "mobile-gallery-hero relative w-full min-w-0 bg-paper text-ink pb-0",
        heroReady && "mobile-gallery-hero--ready",
      )}
      aria-labelledby="mobile-gallery-hero-heading"
    >
      <p
        className={cn(
          "mobile-hero-fade mobile-hero-fade-0 flex items-center gap-2 pt-1 font-mono-hero text-[11px] uppercase tracking-[1.2px] text-ink3",
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
                !reducedMotion && "transition-[transform,box-shadow,top,left,right] duration-300 ease-out",
              )}
              style={{
                zIndex: layout.z,
                boxShadow: layout.shadow,
              }}
            >
              <PolaroidMedia card={card} reducedMotion={reducedMotion} />
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
        <button
          type="button"
          disabled={ctaPending}
          onClick={onPrimaryCtaClick}
          className="flex min-h-12 w-full items-center justify-center rounded-full bg-amber px-5 py-4 text-[15px] font-semibold text-paper transition active:scale-[0.99] hover:bg-[#B65A12] disabled:opacity-80"
        >
          {ctaPending ? "Generiere …" : primaryCtaLabel}
        </button>
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
