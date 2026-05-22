"use client";

import Image from "next/image";
import { useInViewReveal } from "@/hooks/useInViewReveal";
import type { HugoMessage } from "@/content/about";
import { FOUNDER } from "@/content/about";
import { APP_DISPLAY_HOST } from "@/lib/appLoginUrl";
import { cn } from "@/lib/utils";

export function DarkGlowBg() {
  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden>
      <div className="absolute -right-[20%] -top-[30%] h-[70%] w-[70%] rounded-full bg-amber/10 blur-[120px]" />
      <div className="absolute -bottom-[25%] -left-[15%] h-[55%] w-[55%] rounded-full bg-amber2/8 blur-[100px]" />
    </div>
  );
}

export function StripePortrait({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative overflow-hidden bg-[#2A2418]",
        "bg-[repeating-linear-gradient(135deg,#2A2418_0px,#2A2418_12px,#221D13_12px,#221D13_13px)]",
        className,
      )}
      aria-hidden
    />
  );
}

export function FounderPortraitCard({ compact }: { compact?: boolean }) {
  return (
    <div className="relative">
      <div className="rounded-[18px] border border-[#2C2519] bg-gradient-to-b from-[#1F1A13] to-[#1A1610] p-[18px] shadow-[0_30px_80px_-30px_rgba(0,0,0,0.7),0_14px_40px_-20px_rgba(199,105,30,0.18)] md:p-[22px]">
        <div className="mb-3 flex items-center justify-between gap-2 border-b border-[#2C2519] pb-3 font-mono-hero text-[10px] text-[#8C7E68] md:text-[11px]">
          <span className="flex gap-1.5" aria-hidden>
            <span className="h-2.5 w-2.5 rounded-full bg-[#3A3327]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#3A3327]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#3A3327]" />
          </span>
          <span className="flex-1 text-center">{APP_DISPLAY_HOST} / team / erik</span>
          <span className="text-[10px] uppercase text-amber2">● Gründer</span>
        </div>
        <div className="relative aspect-[4/5] overflow-hidden rounded-[12px]">
          <Image
            src={FOUNDER.portraitSrc}
            alt={FOUNDER.portraitAlt}
            fill
            className="object-cover object-[center_20%]"
            sizes={compact ? "280px" : "420px"}
            priority
          />
          <div
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_30%,rgba(232,146,89,0.18)_0%,rgba(21,17,12,0)_60%)]"
            aria-hidden
          />
          <span className="absolute left-3 top-3 rounded-lg bg-[rgba(21,17,12,0.6)] px-2 py-1 font-mono-hero text-[9px] uppercase tracking-wider text-paper backdrop-blur">
            Sitz · DE
          </span>
          <div className="absolute inset-x-0 bottom-0 flex justify-between gap-3 bg-gradient-to-t from-[#15110C]/90 to-transparent p-4 pt-12">
            <div>
              <p className="font-mono-hero text-[9px] uppercase tracking-wider text-amber2">Gründer · Inhaber</p>
              <p
                className={cn(
                  "font-serif-hero font-medium text-paper",
                  compact ? "text-[22px] leading-tight" : "text-[32px] leading-tight",
                )}
              >
                Erik <em className="font-normal italic">Freiherr</em> von Gregory
              </p>
            </div>
            <span className="self-end font-mono-hero text-[9px] uppercase text-[#8C7E68]">Porträt · 4:5</span>
          </div>
        </div>
        <div className="mt-4 grid grid-cols-3 gap-3 border-t border-[#2C2519] pt-4">
          {(
            [
              ["Rolle", FOUNDER.rolle],
              ["Fokus", FOUNDER.fokus],
              ["Seit", FOUNDER.seit],
            ] as const
          ).map(([k, v]) => (
            <div key={k}>
              <p className="font-mono-hero text-[10px] uppercase text-[#8C7E68]">{k}</p>
              <p className="mt-0.5 font-sans-tight text-sm font-medium text-paper">{v}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="absolute -bottom-6 -left-6 hidden rotate-[-2.5deg] items-center gap-3 rounded-[14px] bg-paper p-[14px_18px] text-ink shadow-2xl md:flex">
        <div className="h-9 w-9 shrink-0 rounded-lg bg-gradient-to-br from-amber to-amber2" aria-hidden />
        <div>
          <p className="font-mono-hero text-[9px] uppercase tracking-wider text-ink3">Schreibt · liefert</p>
          <p className="font-serif-hero text-lg font-medium">{FOUNDER.shortName}</p>
        </div>
      </div>
    </div>
  );
}

export function DachMapSvg({
  cities,
  className,
}: {
  cities: readonly { name: string; x: number; y: number }[];
  className?: string;
}) {
  const { ref, isVisible } = useInViewReveal({ rootMargin: "0px 0px -10% 0px", threshold: 0.12 });

  return (
    <svg
      ref={ref}
      viewBox="0 0 480 300"
      className={cn("dach-map h-full w-full", isVisible && "dach-map--in-view", className)}
      role="img"
      aria-labelledby="dach-map-title"
    >
      <title id="dach-map-title">Region DACH mit aktiven Brauerei-Standorten</title>
      <path d="M80 80 L220 40 L320 70 L340 140 L280 220 L120 200 Z" stroke="rgba(24,20,15,0.18)" strokeWidth="1.4" fill="none" />
      <path d="M300 120 L380 100 L420 180 L360 240 L300 200 Z" stroke="rgba(24,20,15,0.18)" strokeWidth="1.4" fill="none" />
      <path d="M160 200 L240 180 L280 260 L200 270 Z" stroke="rgba(24,20,15,0.18)" strokeWidth="1.4" fill="none" />
      <text x="155" y="115" className="fill-ink3 font-mono text-[12px]" style={{ fontFamily: "var(--font-jetbrains)" }}>
        DE
      </text>
      <text x="330" y="175" className="fill-ink3 font-mono text-[12px]" style={{ fontFamily: "var(--font-jetbrains)" }}>
        AT
      </text>
      <text x="215" y="255" className="fill-ink3 font-mono text-[14px]" style={{ fontFamily: "var(--font-jetbrains)" }}>
        CH
      </text>
      {cities.map((c, i) => (
        <g
          key={c.name}
          className="dach-map-pin"
          style={{ ["--dach-pin-delay" as string]: `${i * 0.28}s` }}
        >
          <g transform={`translate(${c.x} ${c.y})`}>
            <circle className="dach-map-pin__ripple" cx={0} cy={0} r={5} fill="#C7691E" aria-hidden />
            <circle
              className="dach-map-pin__ring"
              cx={0}
              cy={0}
              r={11}
              fill="none"
              stroke="#C7691E"
              strokeOpacity={0.4}
              strokeWidth={1.5}
              aria-hidden
            />
            <circle className="dach-map-pin__dot" cx={0} cy={0} r={5} fill="#C7691E" aria-hidden />
            <text
              x={14}
              y={5}
              className="dach-map-pin__label fill-ink font-serif text-[13px]"
              style={{ fontFamily: "var(--font-newsreader)" }}
            >
              {c.name}
            </text>
          </g>
        </g>
      ))}
    </svg>
  );
}

export function HugoChatMockup({
  messages,
  compact,
}: {
  messages: HugoMessage[];
  compact?: boolean;
}) {
  return (
    <div
      className="overflow-hidden rounded-[18px] border border-[#2C2519] bg-gradient-to-b from-[#1F1A13] to-[#1A1610] shadow-[0_30px_80px_-30px_rgba(0,0,0,0.7),0_14px_40px_-20px_rgba(199,105,30,0.18)]"
      aria-label="Beispiel-Konversation mit Hopfen Hugo"
    >
      <div className="flex items-center justify-between gap-3 border-b border-[#2C2519] bg-[#15110C] p-[14px_18px]">
        <div className="flex items-center gap-3">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-amber to-amber2 font-serif-hero text-lg italic text-[#15110C] md:h-8 md:w-8">
            H
          </span>
          <div>
            <p className={cn("font-serif-hero font-medium text-paper", compact ? "text-sm" : "text-base")}>
              Hopfen Hugo
            </p>
            <p className="font-mono-hero text-[9px] text-[#8C7E68]">Demo · {APP_DISPLAY_HOST}/chat</p>
          </div>
        </div>
        <span className="flex items-center gap-1.5 font-mono-hero text-[10px] text-amber2">
          <span className="evg-live-dot h-1.5 w-1.5 rounded-full bg-amber2" aria-hidden />
          Online · v2.4
        </span>
      </div>
      <ul
        role="list"
        className={cn(
          "flex max-h-[540px] flex-col gap-3.5 overflow-y-auto p-[24px_22px]",
          compact && "max-h-[380px] p-4",
        )}
      >
        {messages.map((m, i) => (
          <li
            key={i}
            role="listitem"
            className={cn("flex flex-col", m.who === "user" ? "items-end" : "items-start")}
          >
            {m.who === "hugo" && m.meta ? (
              <span
                className={cn(
                  "mb-1 font-mono-hero text-[9.5px]",
                  m.offTopic ? "text-[#8C7E68]" : "text-amber2",
                )}
              >
                Hopfen Hugo · {m.meta}
              </span>
            ) : null}
            <p
              className={cn(
                "max-w-[82%] rounded-[14px] p-[12px_16px] text-[14.5px] leading-[1.5]",
                m.who === "user"
                  ? "rounded-tr-[4px] border border-[#2C2519] bg-[#2A2418] text-[#E8DFCB]"
                  : m.offTopic
                    ? "rounded-tl-[4px] border border-dashed border-[#3A3327] bg-[#1A150E] text-[#C8BFAD]"
                    : "rounded-tl-[4px] border border-[#2C2519] bg-[#15110C] text-paper",
                compact && "text-[13px]",
              )}
            >
              {m.text}
            </p>
          </li>
        ))}
        <li className="flex items-center gap-2">
          <span className="evg-live-dot h-1.5 w-1.5 rounded-full bg-amber2" aria-hidden />
          <span className="font-mono-hero text-[10px] text-[#8C7E68]">Hugo schreibt…</span>
        </li>
      </ul>
      <div className="flex gap-2.5 border-t border-[#2C2519] bg-[#15110C] p-[14px_18px]">
        <div className="flex-1 rounded-[10px] border border-[#2C2519] bg-[#1A150E] p-[12px_14px] font-sans-tight text-sm text-[#8C7E68]">
          Frage Hugo zu Prompts, Motiven, Formaten…
        </div>
        <span className="flex items-center justify-center rounded-[10px] bg-amber px-4 font-mono-hero text-sm font-semibold text-[#15110C]">
          ↵
        </span>
      </div>
    </div>
  );
}
