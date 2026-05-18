"use client";

import Image from "next/image";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent,
} from "react";
import { trackEvent } from "@/lib/analytics";
import { navigateToAppDashboard } from "@/lib/appLoginUrl";
import {
  BEISPIELE_IMAGES,
  BEISPIELE_MODE_OPTIONS,
  BEISPIELE_VIDEOS,
  aspectClassForFormat,
  durationToSeconds,
  type Beispiel,
  type BeispielFormat,
} from "@/lib/mobileBeispiele";
import { cn } from "@/lib/utils";

type BeispielMode = "images" | "videos";

function CtaArrowIcon() {
  return (
    <svg width="14" height="10" viewBox="0 0 14 10" fill="none" aria-hidden className="shrink-0">
      <path
        d="M1 5 H12 M8 1 L12 5 L8 9"
        stroke="#E89259"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function MuteIcon({ muted }: { muted: boolean }) {
  if (muted) {
    return (
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
        <path d="M3 5 H6 L9 2 V12 L6 9 H3 Z" fill="#fff" />
        <path d="M11.5 4.5 L11.5 9.5 M13 3 L13 11" stroke="#fff" strokeWidth="1.4" strokeLinecap="round" />
      </svg>
    );
  }
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
      <path d="M3 5 H6 L9 2 V12 L6 9 H3 Z" fill="#fff" />
      <path d="M11 4.5 Q12 7 11 9.5" stroke="#fff" strokeWidth="1.2" strokeLinecap="round" fill="none" />
      <path d="M12.5 3.5 Q14 7 12.5 10.5" stroke="#fff" strokeWidth="1.2" strokeLinecap="round" fill="none" />
    </svg>
  );
}

function PlayTriangle({ className }: { className?: string }) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden className={className}>
      <path d="M7 5 L15 10 L7 15 Z" fill="currentColor" />
    </svg>
  );
}

function FeaturedVideo({
  item,
  inView,
  reducedMotion,
}: {
  item: Beispiel;
  inView: boolean;
  reducedMotion: boolean;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);
  const [showPlayHint, setShowPlayHint] = useState(true);
  const loopSeconds = durationToSeconds(item.duration);

  useEffect(() => {
    setMuted(true);
    setShowPlayHint(true);
  }, [item.id]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (!inView) {
      video.pause();
      return;
    }
    void video.play().catch(() => setShowPlayHint(true));
  }, [inView, item.id]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const onPlaying = () => {
      window.setTimeout(() => setShowPlayHint(false), reducedMotion ? 0 : 1500);
    };
    const onPause = () => setShowPlayHint(true);

    video.addEventListener("playing", onPlaying);
    video.addEventListener("pause", onPause);
    return () => {
      video.removeEventListener("playing", onPlaying);
      video.removeEventListener("pause", onPause);
    };
  }, [item.id, reducedMotion]);

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    const next = !video.muted;
    video.muted = next;
    setMuted(next);
    trackEvent("beispiele_mute_toggled", { id: item.id, muted: next });
  };

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) void video.play();
    else video.pause();
  };

  return (
    <>
      <video
        ref={videoRef}
        key={item.id}
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster={item.poster}
        aria-label={item.alt}
      >
        <source src={item.src} type="video/mp4" />
      </video>

      <button
        type="button"
        onClick={toggleMute}
        aria-label={muted ? "Audio einschalten" : "Audio stummschalten"}
        className="absolute top-3 left-3 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border-0 bg-black/45 text-white backdrop-blur-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber"
      >
        <MuteIcon muted={muted} />
      </button>

      {showPlayHint ? (
        <button
          type="button"
          onClick={togglePlay}
          aria-hidden
          tabIndex={-1}
          className="mobile-beispiele-play-hint absolute top-1/2 left-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border-[1.5px] border-white/40 bg-white/[0.18] text-white backdrop-blur-lg"
        >
          <PlayTriangle />
        </button>
      ) : null}

      <div className="absolute right-3 bottom-3 left-3 h-0.5 overflow-hidden rounded-[1px] bg-white/25" aria-hidden>
        <span
          className={cn(
            "mobile-beispiele-progress-bar block h-full rounded-[1px] bg-amber2",
            !reducedMotion && "mobile-beispiele-progress-bar--animate",
          )}
          style={
            !reducedMotion
              ? ({ animationDuration: `${loopSeconds}s` } as CSSProperties)
              : { width: "35%" }
          }
        />
      </div>
    </>
  );
}

function FeaturedImage({ item }: { item: Beispiel }) {
  return (
    <Image
      src={item.src}
      alt={item.alt}
      fill
      sizes="(max-width: 767px) 100vw, 50vw"
      className="object-cover"
      priority={item.id === BEISPIELE_IMAGES[0]!.id}
    />
  );
}

function ThumbnailButton({
  item,
  mode,
  isActive,
  onSelect,
  onKeyNav,
}: {
  item: Beispiel;
  mode: BeispielMode;
  isActive: boolean;
  onSelect: () => void;
  onKeyNav: (e: KeyboardEvent<HTMLButtonElement>) => void;
}) {
  const isVideo = mode === "videos";

  return (
    <button
      type="button"
      onClick={onSelect}
      onKeyDown={onKeyNav}
      aria-label={`Wechsle zu: ${item.title}`}
      aria-current={isActive ? "true" : undefined}
      className={cn(
        "relative aspect-square cursor-pointer overflow-hidden rounded-[8px] bg-white p-0 transition-[border-color] duration-150",
        isActive ? "border-[1.5px] border-amber" : "border border-ink/[0.08]",
      )}
    >
      {isVideo && item.poster ? (
        <Image src={item.poster} alt="" fill sizes="80px" className="object-cover" aria-hidden />
      ) : (
        <Image src={item.src} alt="" fill sizes="80px" className="object-cover" aria-hidden />
      )}
      {isVideo ? (
        <span
          className="absolute top-1/2 left-1/2 flex h-[22px] w-[22px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/85 text-ink"
          aria-hidden
        >
          <PlayTriangle className="h-2.5 w-2.5" />
        </span>
      ) : null}
      <span
        className="absolute bottom-1 left-1 rounded-sm bg-white/85 px-1.5 py-0.5 font-mono-hero text-[8px] font-medium tracking-[0.6px] text-ink uppercase"
        aria-hidden
      >
        {item.format}
      </span>
    </button>
  );
}

export function MobileBeispieleSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const thumbRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [mode, setMode] = useState<BeispielMode>("images");
  const [activeIdx, setActiveIdx] = useState(0);
  const [inView, setInView] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [sectionViewed, setSectionViewed] = useState(false);

  const items = mode === "images" ? BEISPIELE_IMAGES : BEISPIELE_VIDEOS;
  const active = items[activeIdx] ?? items[0]!;

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReducedMotion(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(Boolean(entry?.isIntersecting));
        if (entry?.isIntersecting && !sectionViewed) {
          setSectionViewed(true);
          trackEvent("beispiele_section_viewed", { mode });
        }
      },
      { threshold: 0.15, rootMargin: "-10% 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [mode, sectionViewed]);

  const switchMode = useCallback((next: BeispielMode) => {
    setMode((prev) => {
      if (prev === next) return prev;
      trackEvent("beispiele_mode_toggled", { from: prev, to: next });
      return next;
    });
    setActiveIdx(0);
  }, []);

  const selectItem = useCallback(
    (index: number) => {
      setActiveIdx(index);
      const item = items[index];
      if (item) trackEvent("beispiele_item_selected", { mode, id: item.id });
    },
    [items, mode],
  );

  const handleTabKeyDown = (index: number, e: KeyboardEvent<HTMLButtonElement>) => {
    if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
    e.preventDefault();
    const next =
      e.key === "ArrowRight"
        ? (index + 1) % BEISPIELE_MODE_OPTIONS.length
        : (index - 1 + BEISPIELE_MODE_OPTIONS.length) % BEISPIELE_MODE_OPTIONS.length;
    switchMode(BEISPIELE_MODE_OPTIONS[next]!.key);
    tabRefs.current[next]?.focus();
  };

  const handleThumbKeyDown = (index: number, e: KeyboardEvent<HTMLButtonElement>) => {
    if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
    e.preventDefault();
    const next = e.key === "ArrowRight" ? Math.min(index + 1, items.length - 1) : Math.max(index - 1, 0);
    selectItem(next);
    thumbRefs.current[next]?.focus();
  };

  const handleCta = () => {
    trackEvent("beispiele_cta_clicked", { mode, id: active.id });
    navigateToAppDashboard();
  };

  if (!active) return null;

  return (
    <section
      ref={sectionRef}
      id="section-7"
      aria-labelledby="beispiele-heading"
      className="mobile-beispiele-section relative z-[80] w-full min-h-full bg-paper pt-10 pb-9 font-sans-tight text-ink"
    >
      <div id="beispiele" className="scroll-mt-24" aria-hidden />
      <div id="echte-beispiele-aus-der-praxis" className="scroll-mt-24" aria-hidden />
      <div id="beispiele-videos" className="scroll-mt-24" aria-hidden />

      <div className="px-5">
        <div className="mb-3.5 flex items-center gap-2.5">
          <span className="h-px w-7 shrink-0 bg-amber" aria-hidden />
          <p className="m-0 font-mono-hero text-[11px] tracking-[1.4px] text-amber uppercase">
            ECHTE KUNDEN-BEISPIELE · 08 MOTIVE
          </p>
        </div>
        <h2
          id="beispiele-heading"
          className="m-0 font-serif-hero text-[36px] leading-[1.02] font-normal tracking-[-1px] text-ink"
        >
          Aus der <em className="font-medium text-amber italic">Praxis</em>.
          <br />
          Nicht aus dem Stock-Archiv.
        </h2>
        <p className="mt-4 mb-0 max-w-[340px] font-sans-tight text-sm leading-[1.5] text-ink2">
          Diese Motive entstanden für echte deutsche Brauereien. Deins kann nächste Woche fertig sein.
        </p>
      </div>

      <div className="px-5 pt-6 pb-5">
        <div
          role="tablist"
          aria-label="Beispiel-Format wählen"
          className="grid grid-cols-2 gap-0 rounded-full border border-ink/10 bg-ink/5 p-1"
        >
          {BEISPIELE_MODE_OPTIONS.map((opt, index) => {
            const isActive = mode === opt.key;
            return (
              <button
                key={opt.key}
                ref={(el) => {
                  tabRefs.current[index] = el;
                }}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-controls="beispiele-active"
                id={`beispiele-tab-${opt.key}`}
                onClick={() => switchMode(opt.key)}
                onKeyDown={(e) => handleTabKeyDown(index, e)}
                className={cn(
                  "flex min-h-12 cursor-pointer flex-col items-center rounded-full border-0 px-3.5 py-2.5 transition-colors duration-200",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber focus-visible:ring-offset-2 focus-visible:ring-offset-paper",
                  isActive ? "bg-ink text-paper" : "bg-transparent text-ink2",
                )}
              >
                <span className="font-sans-tight text-[13px] font-semibold">{opt.label}</span>
                <span
                  className={cn(
                    "mt-0.5 font-mono-hero text-[9px] font-normal tracking-[0.8px] uppercase",
                    isActive ? "text-amber2" : "text-ink3",
                  )}
                >
                  {opt.sublabel}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div
        id="beispiele-active"
        role="tabpanel"
        aria-labelledby={`beispiele-tab-${mode}`}
        className="px-4"
      >
        <div
          className={cn(
            "relative w-full overflow-hidden rounded-[14px] border border-ink/10 bg-white",
            "shadow-[0_1px_0_#fff_inset,_0_14px_30px_-16px_rgba(40,28,12,0.16)]",
            aspectClassForFormat(active.format),
            !reducedMotion && "mobile-beispiele-featured--fade",
          )}
          key={active.id}
        >
          <div className="absolute inset-0">
            {mode === "videos" ? (
              <FeaturedVideo item={active} inView={inView} reducedMotion={reducedMotion} />
            ) : (
              <FeaturedImage item={active} />
            )}
          </div>

          <span
            className="absolute top-3 right-3 rounded-sm bg-white/90 px-2 py-1 font-mono-hero text-[10px] font-medium tracking-[1px] text-ink uppercase backdrop-blur-md"
            aria-hidden
          >
            {active.format}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-1.5 px-4 pt-3">
        {items.map((item, index) => (
          <ThumbnailButton
            key={item.id}
            item={item}
            mode={mode}
            isActive={index === activeIdx}
            onSelect={() => selectItem(index)}
            onKeyNav={(e) => {
              handleThumbKeyDown(index, e);
            }}
          />
        ))}
      </div>

      <div className="px-5 pt-5" aria-describedby="beispiele-caption-desc">
        <div className="flex items-baseline gap-3">
          <h3 className="m-0 flex-1 font-serif-hero text-[22px] leading-[1.15] font-medium tracking-[-0.4px] text-ink">
            {active.title}
          </h3>
          <p className="m-0 shrink-0 font-mono-hero text-[10px] tracking-[1.2px] text-ink3 uppercase">
            {active.format}
          </p>
        </div>
        <p id="beispiele-caption-desc" className="mt-1.5 mb-0 font-sans-tight text-[13.5px] leading-[1.5] text-ink2">
          {active.occasion}
          {mode === "videos" && active.duration ? ` · ${active.duration}` : null}
        </p>
      </div>

      <div className="px-5 pt-8">
        <button
          type="button"
          onClick={handleCta}
          className="flex w-full cursor-pointer items-center justify-between rounded-full border-0 bg-ink px-[18px] py-3.5 font-sans-tight text-sm font-semibold text-paper transition-colors duration-150 hover:bg-[#28221b] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber focus-visible:ring-offset-2 focus-visible:ring-offset-paper"
        >
          <span>Beispiele für meine Brauerei sehen</span>
          <CtaArrowIcon />
        </button>
        <p className="m-0 mt-2.5 text-center font-mono-hero text-[10px] tracking-[0.6px] text-ink3 uppercase">
          · Kostenloses Sample · keine Anmeldung
        </p>
      </div>
    </section>
  );
}
