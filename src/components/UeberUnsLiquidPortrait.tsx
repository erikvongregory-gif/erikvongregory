import { cn } from "@/lib/utils";

const W = 320;
const H = 427;

/** Organische „Liquid“-Silhouette per SVG clipPath; Foto aus `/public/ueber-uns-hintergrund.png`. */
export function UeberUnsLiquidPortrait({ className }: { className?: string }) {
  const clipId = "ueber-uns-liquid-portrait-clip";

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className={cn("h-auto w-full max-w-full", className)}
      role="img"
      aria-labelledby="ueber-uns-portrait-svg-title"
    >
      <title id="ueber-uns-portrait-svg-title">Portrait – Gespräch und Einordnung zu EvGlab</title>
      <defs>
        <clipPath id={clipId} clipPathUnits="userSpaceOnUse">
          <path
            fill="white"
            d="M 26 38 C 98 6 222 4 294 44 C 318 118 312 268 288 372 C 248 418 118 424 36 378 C 4 292 8 128 26 38 Z"
          />
        </clipPath>
      </defs>
      <image
        href="/ueber-uns-hintergrund.png"
        x={0}
        y={0}
        width={W}
        height={H}
        clipPath={`url(#${clipId})`}
        preserveAspectRatio="xMidYMid slice"
      />
    </svg>
  );
}
