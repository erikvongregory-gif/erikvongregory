"use client";

import { useEffect, useId, useRef } from "react";
import { cn } from "@/lib/utils";
import { useParloTheme } from "./ParloTheme";
import { STARFIELD_DOT, STARFIELD_STARS } from "./starfieldPaths";

/** Original BadtzUI / Parlo starfield — evenodd mask with star cutouts */
function StarField({ color = "currentColor" }: { color?: string }) {
  const clipId = useId().replace(/:/g, "");
  return (
    <svg
      width="100%"
      height="100%"
      preserveAspectRatio="none"
      viewBox="0 0 100 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <g clipPath={`url(#${clipId})`}>
        <path d={STARFIELD_DOT} fill="black" />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d={STARFIELD_STARS}
          fill={color}
        />
      </g>
      <defs>
        <clipPath id={clipId}>
          <rect width="100" height="40" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}

const DOUBLE_ARROW = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    className="text-black dark:text-white"
    strokeWidth="1.8"
    stroke="currentColor"
    aria-hidden
  >
    <path
      d="M12.5 18C12.5 18 18.5 13.5811 18.5 12C18.5 10.4188 12.5 6 12.5 6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M5.50005 18C5.50005 18 11.5 13.5811 11.5 12C11.5 10.4188 5.5 6 5.5 6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

type StarProps = {
  children: React.ReactNode;
  className?: string;
  href?: string;
  onClick?: () => void;
  fullWidth?: boolean;
  lightWidth?: number;
  duration?: number;
  lightColor?: string;
  backgroundColor?: string;
  borderWidth?: number;
  "aria-label"?: string;
};

export function ParloStarButton({
  children,
  className = "",
  href = "#",
  onClick,
  fullWidth,
  lightWidth = 110,
  duration = 3,
  lightColor,
  backgroundColor = "currentColor",
  borderWidth = 2,
  "aria-label": ariaLabel,
}: StarProps) {
  const ref = useRef<HTMLElement>(null);
  const { theme } = useParloTheme();
  const resolvedLight = lightColor ?? (theme === "dark" ? "#FAFAFA" : "#FF2056");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const setPath = () => {
      el.style.setProperty(
        "--path",
        `path('M 0 0 H ${el.offsetWidth} V ${el.offsetHeight} H 0 V 0')`,
      );
    };
    setPath();
    const ro = new ResizeObserver(setPath);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const style = {
    ["--duration" as string]: duration,
    ["--light-width" as string]: `${lightWidth}px`,
    ["--light-color" as string]: resolvedLight,
    ["--border-width" as string]: `${borderWidth}px`,
    isolation: "isolate" as const,
  };

  const classes = cn(
    "group/star-button relative z-[3] inline-flex h-10 items-center justify-center gap-2 overflow-hidden rounded-3xl px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors disabled:pointer-events-none disabled:opacity-50",
    fullWidth && "w-full",
    className,
  );

  const inner = (
    <>
      {/* Light orbit — shines through star cutouts */}
      <div
        className="absolute inset-0 aspect-square animate-star-btn bg-[radial-gradient(ellipse_at_center,var(--light-color),transparent,transparent)]"
        style={{
          offsetPath: "var(--path)",
          offsetDistance: "0%",
          width: "var(--light-width)",
        }}
        aria-hidden
      />
      {/* Mask: light=white / dark=black fill with evenodd star holes */}
      <div
        className="absolute inset-0 z-[4] overflow-hidden rounded-[inherit] border-black/10 text-white dark:border-white/15 dark:text-black"
        style={{ borderWidth: "var(--border-width)" }}
        aria-hidden
      >
        <StarField color={backgroundColor} />
      </div>
      <span className="relative z-10 inline-flex items-center gap-1.5">
        <span className="bg-gradient-to-t from-black to-neutral-400 bg-clip-text text-transparent dark:from-white dark:to-neutral-500">
          {children}
        </span>
        {DOUBLE_ARROW}
      </span>
    </>
  );

  if (onClick) {
    return (
      <button
        type="button"
        ref={ref as React.RefObject<HTMLButtonElement>}
        className={classes}
        style={style}
        onClick={onClick}
        aria-label={ariaLabel}
      >
        {inner}
      </button>
    );
  }

  return (
    <a
      ref={ref as React.RefObject<HTMLAnchorElement>}
      href={href}
      className={classes}
      style={style}
      aria-label={ariaLabel}
    >
      {inner}
    </a>
  );
}

/** Soft pill button (Sign in / secondary) */
export function ParloPillButton({
  children,
  href = "#",
  variant = "solid",
  className = "",
}: {
  children: React.ReactNode;
  href?: string;
  variant?: "solid" | "ghost" | "outline" | "noise";
  className?: string;
}) {
  const base =
    "inline-flex h-9 items-center justify-center gap-2 whitespace-nowrap rounded-full px-4 text-sm font-medium transition-colors";
  const variants = {
    solid: "bg-foreground text-background hover:opacity-90",
    ghost:
      "bg-foreground/5 text-foreground shadow-sm shadow-black/10 ring-1 ring-foreground/10 hover:bg-muted/50",
    outline:
      "border border-border bg-transparent text-foreground hover:bg-muted/40",
    noise:
      "relative overflow-hidden rounded-[32px] px-5 py-[10px] text-white shadow-[0_4px_2px_0_rgba(0,0,0,0.25),0_-1.2px_0.5px_0_rgba(255,255,255,0.4),0_11px_11px_0_rgba(0,0,0,0.09),0_3px_6px_0_rgba(0,0,0,0.1)]",
  };

  if (variant === "noise") {
    return (
      <a href={href} className={`${base} ${variants.noise} ${className}`}>
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[32px]"
          style={{
            backgroundImage:
              "linear-gradient(77.36deg, #18181b 13.89%, #3f3f46 28%, #71717a 43%, #a1a1aa 52.9%, #52525b 70%, #18181b 114.64%)",
          }}
        />
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[32px] bg-[url('/neu/parlo/originkit/hero-10/textures-btn-noise.png')] bg-[length:100px_100px] bg-left-top opacity-60"
        />
        <span className="relative z-[1] whitespace-nowrap">{children}</span>
      </a>
    );
  }

  return (
    <a href={href} className={`${base} ${variants[variant]} ${className}`}>
      {children}
    </a>
  );
}

/** Digup primary noise button alias */
export function ParloNoiseButton({
  children,
  href = "#",
  className = "",
}: {
  children: React.ReactNode;
  href?: string;
  className?: string;
}) {
  return (
    <ParloPillButton href={href} variant="noise" className={className}>
      {children}
    </ParloPillButton>
  );
}

export function CheckIcon({ className = "size-3" }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}
