import { cn } from "@/lib/utils";

type Props = {
  className?: string;
  /** Sichtbarer Name fürs `alt` (z. B. neben Text). Standard: dekorativ leer. */
  title?: string;
};

/** BrewAI-Markenzeichen — Fallback für Legacy-Hugo-UI. */
export function HopfenHugoIcon({ className, title }: Props) {
  return (
    <img
      src="/brewai-mark-icon.png"
      alt={title ?? ""}
      width={256}
      height={256}
      decoding="async"
      className={cn("shrink-0 object-contain select-none", className)}
      aria-hidden={title ? undefined : true}
      title={title}
    />
  );
}
