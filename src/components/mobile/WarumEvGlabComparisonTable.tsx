import { Check, X } from "lucide-react";
import { WARUM_COMPARISON_ROWS } from "@/lib/warumComparisonRows";
import { cn } from "@/lib/utils";

type WarumEvGlabComparisonTableProps = {
  className?: string;
};

export function WarumEvGlabComparisonTable({ className }: WarumEvGlabComparisonTableProps) {
  return (
    <div className={cn("min-w-0", className)}>
      <ul role="list" className="m-0 flex list-none flex-col gap-0 p-0">
        {WARUM_COMPARISON_ROWS.map((row, index) => {
          const Icon = row.icon;
          return (
            <li
              key={row.topic}
              role="listitem"
              className={cn(
                "flex gap-3.5 py-4",
                index < WARUM_COMPARISON_ROWS.length - 1 && "border-b border-ink/[0.06]",
              )}
            >
              <div
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-amber/20 bg-amber/10"
                aria-hidden
              >
                <Icon className="h-[19px] w-[19px] stroke-[1.75] text-amber" />
              </div>

              <div className="min-w-0 flex-1 pt-0.5">
                <p className="m-0 font-mono-hero text-[10px] uppercase tracking-[1.2px] text-ink3">{row.topic}</p>

                <div className="mt-2 flex items-start gap-2">
                  <X className="mt-0.5 h-3.5 w-3.5 shrink-0 text-ink3/80" strokeWidth={2.5} aria-hidden />
                  <p className="m-0 font-sans-tight text-[13px] leading-[1.35] text-ink3 line-through decoration-ink3/35">
                    <span className="sr-only">Ohne EvGlab: </span>
                    {row.withoutShort}
                  </p>
                </div>

                <div className="mt-1.5 flex items-start gap-2">
                  <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-amber" strokeWidth={2.5} aria-hidden />
                  <p className="m-0 font-sans-tight text-[13.5px] font-medium leading-[1.35] text-ink">
                    <span className="sr-only">Mit EvGlab: </span>
                    {row.withEvGlabShort}
                  </p>
                </div>

                <p className="sr-only">
                  {row.without} — Mit EvGlab: {row.withEvGlab}
                </p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
