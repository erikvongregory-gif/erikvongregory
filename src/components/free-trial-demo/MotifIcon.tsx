import type { DemoMotifIcon } from "@/lib/freeTrialDemo";

type MotifIconProps = {
  icon: DemoMotifIcon;
  className?: string;
};

export function MotifIcon({ icon, className }: MotifIconProps) {
  const shared = {
    width: 28,
    height: 28,
    viewBox: "0 0 24 24",
    fill: "none",
    className,
    "aria-hidden": true as const,
  };

  switch (icon) {
    case "beer":
      return (
        <svg {...shared}>
          <path
            d="M8 4h8l-1 10H9L8 4z M6 4h12 M10 9h4"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M14 4c0-1.1.9-2 2-2s2 .9 2 2"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      );
    case "studio":
      return (
        <svg {...shared}>
          <rect x="3" y="6" width="18" height="13" rx="2" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5" />
          <path d="M8 6V5a1 1 0 011-1h6a1 1 0 011 1v1" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      );
    case "social":
      return (
        <svg {...shared}>
          <rect x="7" y="2" width="10" height="20" rx="2" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="12" cy="18" r="1" fill="currentColor" />
        </svg>
      );
    case "candle":
      return (
        <svg {...shared}>
          <path
            d="M12 3c0 0-3 3-3 6a3 3 0 006 0c0-3-3-6-3-6z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          <line x1="12" y1="12" x2="12" y2="21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="9" y1="21" x2="15" y2="21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );
  }
}
