import { cn } from "@/lib/utils";

type PlaceholderMediaProps = {
  label?: string;
  className?: string;
};

export function PlaceholderMedia({ label = "Beispiel", className }: PlaceholderMediaProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden bg-[#EAE3D5]",
        "bg-[repeating-linear-gradient(135deg,#EAE3D5_0px,#EAE3D5_8px,#F4EFE6_8px,#F4EFE6_16px)]",
        className,
      )}
      aria-hidden={!label}
    >
      {label ? (
        <span className="absolute bottom-2 left-2 font-mono-hero text-[10px] uppercase tracking-wider text-ink3">
          {label}
        </span>
      ) : null}
    </div>
  );
}
