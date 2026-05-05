import { cn } from "@/lib/utils";

const W = 320;
const H = 427;
const IMAGE_ZOOM = 1.2;
const IMAGE_X = -18;
const IMAGE_Y = -10;
const NAME_FIRST = "Erik";
const NAME_LAST = "von Gregory";

/** Organische „Liquid“-Silhouette per SVG clipPath; Foto aus `/public/ueber-uns-hintergrund.png`. */
export function UeberUnsLiquidPortrait({ className }: { className?: string }) {
  const clipId = "ueber-uns-liquid-portrait-clip";
  const fadeId = "ueber-uns-liquid-portrait-name-fade";

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
        <linearGradient id={fadeId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(0,0,0,0)" />
          <stop offset="55%" stopColor="rgba(0,0,0,0.25)" />
          <stop offset="100%" stopColor="rgba(0,0,0,0.88)" />
        </linearGradient>
      </defs>
      <image
        href="/ueber-uns-hintergrund.png"
        x={IMAGE_X}
        y={IMAGE_Y}
        width={W * IMAGE_ZOOM}
        height={H * IMAGE_ZOOM}
        clipPath={`url(#${clipId})`}
        preserveAspectRatio="xMidYMid slice"
      />
      <rect x="0" y={H - 160} width={W} height="160" fill={`url(#${fadeId})`} />
      <text
        x="20"
        y={H - 52}
        fill="#e07a40"
        fontFamily="var(--font-main), var(--font-inter), Inter, sans-serif"
        fontSize="52"
        fontWeight="800"
        letterSpacing="-0.03em"
      >
        {NAME_FIRST}
      </text>
      <text
        x="20"
        y={H - 16}
        fill="#ffffff"
        fontFamily="var(--font-main), var(--font-inter), Inter, sans-serif"
        fontSize="46"
        fontWeight="800"
        letterSpacing="-0.03em"
      >
        {NAME_LAST}
      </text>
    </svg>
  );
}
