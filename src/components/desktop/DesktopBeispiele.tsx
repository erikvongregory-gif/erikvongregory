"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { BEISPIELE_IMAGES, BEISPIELE_VIDEOS, type Beispiel } from "@/lib/mobileBeispiele";
import { navigateToAppDashboard } from "@/lib/appLoginUrl";
import { DesktopContainer } from "@/components/desktop/DesktopContainer";
import { PlaceholderMedia } from "@/components/desktop/PlaceholderMedia";
import { cn } from "@/lib/utils";

type BeispielMode = "photos" | "reels" | "wide";

const MODE_OPTIONS: { key: BeispielMode; label: string }[] = [
  { key: "photos", label: "Bilder" },
  { key: "reels", label: "Reels · 9:16" },
  { key: "wide", label: "Querformat · 16:9" },
];

function itemsForMode(mode: BeispielMode): Beispiel[] {
  if (mode === "photos") return BEISPIELE_IMAGES;
  if (mode === "reels") return BEISPIELE_VIDEOS.filter((v) => v.format === "9:16");
  return BEISPIELE_VIDEOS.filter((v) => v.format === "16:9");
}

function featuredHeight(mode: BeispielMode) {
  if (mode === "reels") return "h-[720px]";
  if (mode === "wide") return "h-[480px]";
  return "h-[600px]";
}

function PlayTriangle({ className }: { className?: string }) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden className={className}>
      <path d="M7 5 L15 10 L7 15 Z" fill="currentColor" />
    </svg>
  );
}

function MuteIcon({ muted }: { muted: boolean }) {
  if (muted) {
    return (
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
        <path d="M3 5 H6 L9 2 V12 L6 9 H3 Z" fill="currentColor" />
        <path d="M11.5 4.5 L11.5 9.5 M13 3 L13 11" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      </svg>
    );
  }
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
      <path d="M3 5 H6 L9 2 V12 L6 9 H3 Z" fill="currentColor" />
      <path d="M11 4.5 Q12 7 11 9.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" fill="none" />
      <path d="M12.5 3.5 Q14 7 12.5 10.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" fill="none" />
    </svg>
  );
}

function DesktopFeaturedVideo({ item }: { item: Beispiel }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);
  const [showPlayOverlay, setShowPlayOverlay] = useState(true);

  useEffect(() => {
    setMuted(true);
    setShowPlayOverlay(true);
    const video = videoRef.current;
    if (!video) return;
    video.pause();
    video.load();
  }, [item.id]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const onPlaying = () => setShowPlayOverlay(false);
    const onPause = () => setShowPlayOverlay(true);

    video.addEventListener("playing", onPlaying);
    video.addEventListener("pause", onPause);
    return () => {
      video.removeEventListener("playing", onPlaying);
      video.removeEventListener("pause", onPause);
    };
  }, [item.id]);

  const togglePlay = async () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      try {
        await video.play();
        setShowPlayOverlay(false);
      } catch {
        setShowPlayOverlay(true);
      }
    } else {
      video.pause();
      setShowPlayOverlay(true);
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    const video = videoRef.current;
    if (!video) return;
    const next = !video.muted;
    video.muted = next;
    setMuted(next);
  };

  const openFullscreen = (e: React.MouseEvent) => {
    e.stopPropagation();
    const video = videoRef.current;
    if (!video) return;
    void video.play().catch(() => undefined);
    if (video.requestFullscreen) {
      void video.requestFullscreen();
    }
  };

  return (
    <>
      <video
        ref={videoRef}
        key={item.id}
        className="absolute inset-0 z-0 h-full w-full cursor-pointer object-cover"
        muted={muted}
        loop
        playsInline
        preload="metadata"
        poster={item.poster}
        aria-label={item.alt}
        onClick={togglePlay}
      >
        <source src={item.src} type="video/mp4" />
      </video>

      <button
        type="button"
        onClick={toggleMute}
        aria-label={muted ? "Ton einschalten" : "Ton stummschalten"}
        className="absolute top-4 left-4 z-20 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-paper/20 bg-[#15110C]/55 text-paper backdrop-blur-md transition hover:bg-[#15110C]/75 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-amber"
      >
        <MuteIcon muted={muted} />
      </button>

      {showPlayOverlay ? (
        <button
          type="button"
          onClick={togglePlay}
          aria-label={`${item.title} abspielen`}
          className="absolute top-1/2 left-1/2 z-20 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-paper/30 bg-[#15110C]/55 text-paper backdrop-blur-md transition hover:scale-105 hover:bg-[#15110C]/70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-amber"
        >
          <PlayTriangle className="ml-0.5 h-5 w-5" />
        </button>
      ) : null}

      <button
        type="button"
        onClick={openFullscreen}
        className="absolute right-6 bottom-24 z-20 shrink-0 cursor-pointer rounded-lg border border-[rgba(244,239,230,0.25)] bg-[#15110C]/55 px-4 py-2 font-mono-hero text-[10px] uppercase tracking-wider text-paper backdrop-blur transition hover:bg-paper/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-amber"
      >
        Vollbild ansehen ↗
      </button>
    </>
  );
}

export function DesktopBeispiele() {
  const [mode, setMode] = useState<BeispielMode>("photos");
  const items = useMemo(() => itemsForMode(mode), [mode]);
  const [featuredIndex, setFeaturedIndex] = useState(0);
  const featured = items[featuredIndex] ?? items[0];
  const thumbs = items.filter((_, i) => i !== featuredIndex).slice(0, 4);

  return (
    <section
      id="section-7"
      aria-labelledby="desktop-beispiele-heading"
      className="scroll-mt-24 bg-[#15110C] py-20 text-paper lg:py-[120px]"
    >
      <div id="desktop-beispiele" aria-hidden />
      <div id="beispiele" className="scroll-mt-24" aria-hidden />
      <DesktopContainer>
        <div className="grid grid-cols-2 items-end gap-12 border-b border-[rgba(244,239,230,0.08)] pb-12">
          <div>
            <p className="mb-4 font-mono-hero text-[11px] uppercase tracking-[1.4px] text-amber2">
              Aus der Praxis · 12 Brauereien
            </p>
            <h2 id="desktop-beispiele-heading" className="font-serif-hero text-[72px] font-normal leading-[0.98] tracking-[-2px]">
              Echte <em className="italic text-amber2">Beispiele</em>,
              <br />
              kein Demo-Theater.
            </h2>
          </div>
          <div className="flex flex-col items-end gap-6">
            <p className="max-w-[400px] text-right text-[15px] leading-[1.6] text-[#C8BFAD]">
              Motive aus echten Brauerei-Projekten — konsistent im Markenstil, ohne Stockfoto-Look.
            </p>
            <div className="flex rounded-full border border-[rgba(244,239,230,0.12)] bg-[#1F1A13] p-1">
              {MODE_OPTIONS.map((opt) => (
                <button
                  key={opt.key}
                  type="button"
                  aria-pressed={mode === opt.key}
                  onClick={() => {
                    setMode(opt.key);
                    setFeaturedIndex(0);
                  }}
                  className={cn(
                    "rounded-full px-4 py-2 font-mono-hero text-[10px] uppercase tracking-wider transition duration-200",
                    mode === opt.key ? "bg-amber text-[#15110C]" : "text-[#8C7E68] hover:text-paper",
                  )}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {featured ? (
          <div className="grid grid-cols-[1.6fr_1fr] gap-8 pt-4">
            <FeaturedPanel item={featured} mode={mode} heightClass={featuredHeight(mode)} />
            <div>
              <div className="mb-4 flex items-baseline justify-between font-mono-hero text-[10px] uppercase tracking-wider text-[#8C7E68]">
                <span>Weitere Motive · {thumbs.length}</span>
                <span className="text-amber2">KI · 42s</span>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {thumbs.map((item) => (
                  <ThumbCard key={item.id} item={item} mode={mode} onSelect={() => setFeaturedIndex(items.indexOf(item))} />
                ))}
              </div>
              <button
                type="button"
                className="mt-4 w-full rounded-xl border border-[rgba(244,239,230,0.12)] py-4 font-mono-hero text-[11px] uppercase tracking-wider text-[#C8BFAD] transition hover:border-amber2/40 hover:text-paper"
              >
                Alle 240+ Motive in der Galerie
              </button>
            </div>
          </div>
        ) : null}

        <div className="mt-16 flex items-center justify-between gap-8 border-t border-[rgba(244,239,230,0.08)] pt-8">
          <p className="max-w-[640px] font-serif-hero text-[22px] italic leading-snug text-[#E8DFCB]">
            Bilder, die nach Brauerei aussehen — nicht nach Stockfoto. Und das alles, ohne dass jemand das Studio
            verlässt.
          </p>
          <button
            type="button"
            onClick={() => navigateToAppDashboard()}
            className="inline-flex items-center gap-3 rounded-xl bg-amber px-6 py-4 font-sans-tight text-[15px] font-bold text-[#15110C] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-amber"
          >
            Eigene Motive starten
            <span className="rounded-md bg-[#15110C]/15 px-2 py-0.5 font-mono-hero text-[10px] uppercase">FREE · 3/3</span>
          </button>
        </div>
      </DesktopContainer>
    </section>
  );
}

function FeaturedPanel({ item, mode, heightClass }: { item: Beispiel; mode: BeispielMode; heightClass: string }) {
  const isVideo = mode !== "photos";

  return (
    <article className={cn("relative overflow-hidden rounded-2xl border border-[rgba(244,239,230,0.08)] shadow-2xl", heightClass)}>
      {isVideo ? (
        <DesktopFeaturedVideo item={item} />
      ) : (
        <Image src={item.src} alt={item.alt} fill className="object-cover" sizes="800px" />
      )}
      <span className="pointer-events-none absolute top-4 right-4 z-10 rounded-lg bg-[#15110C]/65 px-2.5 py-1 font-mono-hero text-[10px] uppercase tracking-wider text-paper backdrop-blur">
        KI · 42s
      </span>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 flex items-end justify-between gap-4 bg-gradient-to-t from-[#15110C]/90 to-transparent p-6 pt-16">
        <div>
          <p className="mb-1 font-mono-hero text-[10px] uppercase tracking-wider text-amber2">
            Featured · {mode === "photos" ? "Bilder" : mode === "reels" ? "Reels" : "Querformat"}
          </p>
          <h3 className="font-serif-hero text-[28px] font-medium">{item.title}</h3>
          <p className="mt-1 font-mono-hero text-[10px] text-[#8C7E68]">
            {item.duration ?? "—"} · {item.format} · {item.id.toUpperCase()}
          </p>
        </div>
        {isVideo ? (
          <span className="invisible shrink-0 px-4 py-2 font-mono-hero text-[10px] uppercase" aria-hidden>
            Vollbild ansehen ↗
          </span>
        ) : null}
      </div>
    </article>
  );
}

function ThumbCard({ item, mode, onSelect }: { item: Beispiel; mode: BeispielMode; onSelect: () => void }) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className="group relative h-[140px] overflow-hidden rounded-xl border border-[rgba(244,239,230,0.08)] text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-amber"
    >
      {mode === "photos" ? (
        <Image src={item.src} alt={item.alt} fill className="object-cover transition group-hover:scale-[1.02]" sizes="200px" />
      ) : item.poster ? (
        <Image src={item.poster} alt={item.alt} fill className="object-cover" sizes="200px" />
      ) : (
        <PlaceholderMedia label={item.title} className="h-full w-full" />
      )}
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#15110C]/85 to-transparent p-3 pt-8">
        <p className="font-mono-hero text-[9px] uppercase text-[#C8BFAD]">{item.occasion}</p>
        <p className="font-mono-hero text-[9px] text-amber2">{item.format}</p>
      </div>
    </button>
  );
}
