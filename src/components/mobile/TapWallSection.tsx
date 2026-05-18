"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { TAPS } from "@/lib/tapWallData";
import { cn } from "@/lib/utils";

const PAPER_GRAIN_URI =
  'url("data:image/svg+xml,' +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200"><filter id="n"><feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" stitchTiles="stitch"/><feColorMatrix values="0 0 0 0 0.55  0 0 0 0 0.5  0 0 0 0 0.42  0 0 0 0 0.18 0"/></filter><rect width="100%" height="100%" filter="url(#n)"/></svg>',
  ) +
  '")';

const BUBBLE_SIZES = [5, 6, 4, 7, 5] as const;
const BUBBLE_LEFTS = ["20%", "36%", "52%", "68%", "84%"] as const;

const AUTO_ROTATE_MS = 4500;
const PAUSE_AFTER_TAP_MS = 8000;

function formatDeliv(deliv: string) {
  return `\u00B7 ${deliv.toUpperCase()}`;
}

type TapButtonProps = {
  index: number;
  tap: (typeof TAPS)[number];
  isActive: boolean;
  reducedMotion: boolean;
  pourKey: number;
  onSelect: (index: number) => void;
};

function TapButton({ index, tap, isActive, reducedMotion, pourKey, onSelect }: TapButtonProps) {
  return (
    <button
      type="button"
      onClick={() => {
        // TODO: Asset von Nutzer — optionaler Sound-Effekt beim Zapfen (nur bei User-Tap, nicht Autoplay)
        onSelect(index);
      }}
      aria-pressed={isActive}
      aria-label={`${tap.label} — ${tap.title}`}
      className={cn(
        "tap-wall-tap flex flex-1 cursor-pointer flex-col items-center border-none bg-transparent p-0",
        "transition-transform duration-[350ms] ease-[cubic-bezier(0.4,1.4,0.6,1)]",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber focus-visible:ring-offset-2 focus-visible:ring-offset-paper",
        isActive && !reducedMotion && "-translate-y-1 will-change-transform",
        !isActive && "translate-y-0",
      )}
    >
      <span
        className={cn(
          "relative h-[110px] w-[22px] rounded-t-[12px] rounded-b-[6px] transition-[background,box-shadow] duration-[350ms] ease-in-out",
          isActive ? "tap-wall-handle-active" : "tap-wall-handle-inactive",
        )}
      >
        <span
          className={cn(
            "absolute -left-2.5 -right-2.5 top-6 flex h-[26px] items-center justify-center rounded-[2px] shadow-[0_1px_0_rgba(58,30,8,0.18)]",
            isActive ? "bg-white" : "bg-paper",
          )}
        >
          <span
            className={cn(
              "font-serif-hero text-sm font-medium italic leading-none",
              isActive ? "text-amber" : "text-ink2",
            )}
          >
            {tap.n}
          </span>
        </span>
      </span>

      <span className="tap-wall-brass-mount -mt-px h-[14px] w-[30px] shrink-0 rounded-t rounded-b-[2px]" aria-hidden />

      <span className="tap-wall-spout relative -mt-px h-[26px] w-[10px] shrink-0 rounded-b-[4px]" aria-hidden>
        {isActive ? (
          <span key={pourKey} className="tap-wall-pour absolute left-[3px] top-6 w-1" aria-hidden />
        ) : null}
      </span>

      <span
        className={cn(
          "mt-2 font-mono-hero text-[8.5px] uppercase tracking-[0.8px] transition-colors duration-[350ms] ease-in-out",
          isActive ? "text-amber" : "text-[#3E2A14]",
        )}
      >
        {tap.shortLabel}
      </span>
    </button>
  );
}

type BeerGlassProps = {
  pourKey: number;
};

function BeerGlass({ pourKey }: BeerGlassProps) {
  return (
    <div className="relative mt-[18px] flex justify-center">
      <div className="tap-wall-glass relative h-[200px] w-[156px] overflow-hidden">
        <div key={`beer-${pourKey}`} className="tap-wall-beer-fill absolute inset-x-0 bottom-0 will-change-[height]" aria-hidden />
        <div key={`foam-${pourKey}`} className="tap-wall-foam absolute inset-x-0 top-[32%] h-[22px]" aria-hidden />
        {BUBBLE_SIZES.map((size, i) => (
          <span
            key={`bubble-${pourKey}-${i}`}
            className={cn("tap-wall-bubble absolute rounded-full bg-foam/90 will-change-transform", `tap-wall-bubble-${i}`)}
            style={{
              width: size,
              height: size,
              left: BUBBLE_LEFTS[i],
              bottom: "20%",
            }}
            aria-hidden
          />
        ))}
        <span
          className="pointer-events-none absolute bottom-7 left-2 top-3 w-1 rounded-[2px] bg-gradient-to-b from-white/60 to-white/15"
          aria-hidden
        />
      </div>
    </div>
  );
}

export function TapWallSection() {
  const [active, setActive] = useState(0);
  const [pourCounter, setPourCounter] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);
  const pauseUntilRef = useRef(0);
  const prevActiveRef = useRef(active);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReducedMotion(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  useEffect(() => {
    if (prevActiveRef.current === active) return;
    prevActiveRef.current = active;
    setPourCounter((c) => c + 1);
  }, [active]);

  const handleSelect = useCallback((index: number) => {
    pauseUntilRef.current = Date.now() + PAUSE_AFTER_TAP_MS;
    setActive(index);
  }, []);

  useEffect(() => {
    if (reducedMotion) return;
    const id = window.setInterval(() => {
      if (Date.now() < pauseUntilRef.current) return;
      setActive((a) => (a + 1) % TAPS.length);
    }, AUTO_ROTATE_MS);
    return () => window.clearInterval(id);
  }, [reducedMotion]);

  const current = TAPS[active]!;

  return (
    <section
      id="section-4"
      aria-labelledby="loesungen-heading"
      className="tap-wall-section relative overflow-hidden bg-paper pt-9 pb-9"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-35 mix-blend-multiply"
        style={{ backgroundImage: PAPER_GRAIN_URI }}
        aria-hidden
      />

      <div className="relative px-5 mb-8">
        <div className="mb-3.5 flex items-center gap-2.5">
          <span className="h-px w-6 shrink-0 bg-amber" aria-hidden />
          <p className="m-0 font-mono-hero text-[10.5px] uppercase tracking-[1.6px] text-amber">
            THE TAP WALL · 05 LEISTUNGEN
          </p>
        </div>
        <h2
          id="loesungen-heading"
          className="m-0 font-serif-hero text-[36px] font-normal leading-[0.98] tracking-[-1.2px] text-ink"
        >
          Wähl deinen{" "}
          <em className="font-medium italic text-amber">Hahn</em>.
        </h2>
      </div>

      <div className="tap-wall-rail relative mx-3.5 mt-[34px] rounded-t-lg rounded-b-sm px-3 pt-3">
        {/* TODO: Asset von Nutzer — optionales Brewery-Logo-Imprint auf der Holzschiene */}
        <div className="tap-wall-rail-grain pointer-events-none absolute inset-0 rounded-t-lg rounded-b-sm" aria-hidden />
        <div className="relative flex h-[168px] items-end justify-between gap-1">
          {TAPS.map((tap, i) => (
            <TapButton
              key={tap.n}
              index={i}
              tap={tap}
              isActive={active === i}
              reducedMotion={reducedMotion}
              pourKey={pourCounter}
              onSelect={handleSelect}
            />
          ))}
        </div>
      </div>

      <BeerGlass pourKey={pourCounter} />

      <div key={active} className="tap-wall-info-fade relative px-6 pt-6 text-center" role="region" aria-live="polite">
        <p className="m-0 mb-2.5 font-mono-hero text-[10px] uppercase tracking-[1.4px] text-amber">
          {formatDeliv(current.deliv)}
        </p>
        <h3 className="m-0 mb-2.5 font-serif-hero text-[22px] font-medium leading-[1.15] tracking-[-0.4px] text-ink">
          {current.title}
        </h3>
        <p className="mx-auto m-0 max-w-[320px] font-sans-tight text-[13.5px] leading-[1.5] text-ink2">
          {current.body}
        </p>
      </div>
    </section>
  );
}
