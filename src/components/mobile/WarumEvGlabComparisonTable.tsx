import { cn } from "@/lib/utils";
import { WARUM_COMPARISON_ROWS } from "@/lib/warumComparisonRows";

type WarumEvGlabComparisonTableProps = {
  className?: string;
};

export function WarumEvGlabComparisonTable({ className }: WarumEvGlabComparisonTableProps) {
  const rows = WARUM_COMPARISON_ROWS;

  return (
    <div className={cn("min-w-0", className)}>
      <div
        className="grid grid-cols-[76px_1fr_1fr] gap-3 border-b border-ink/10 pb-3"
        aria-hidden
      >
        <div />
        <p className="m-0 font-mono-hero text-[10px] uppercase tracking-[1.2px] text-ink3">Ohne</p>
        <p className="m-0 flex items-center gap-1.5 font-mono-hero text-[10px] uppercase tracking-[1.2px] text-amber">
          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-amber" aria-hidden />
          Mit EvGlab
        </p>
      </div>

      <ul role="list" className="m-0 list-none p-0">
        {rows.map((row, index) => (
          <li
            key={row.topic}
            role="listitem"
            className={cn(
              "grid grid-cols-[76px_1fr_1fr] gap-3 py-4",
              index < rows.length - 1 && "border-b border-ink/[0.06]",
            )}
          >
            <p className="m-0 font-serif-hero text-[17px] italic tracking-[-0.2px] text-ink">{row.topic}</p>
            <p className="m-0 font-sans-tight text-[13px] leading-[1.4] text-[#6B6253] line-through decoration-[#6B6253]/40">
              <span className="sr-only">Vorher: </span>
              {row.without}
            </p>
            <p className="m-0 font-sans-tight text-[13.5px] font-medium leading-[1.4] text-ink">
              <span className="sr-only">Mit EvGlab: </span>
              {row.withEvGlab}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
