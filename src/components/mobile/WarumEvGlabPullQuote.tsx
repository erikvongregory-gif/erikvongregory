import { WARUM_VALUE_PILLARS } from "@/lib/warumComparisonRows";
import { cn } from "@/lib/utils";

type WarumEvGlabPullQuoteProps = {
  className?: string;
};

export function WarumEvGlabPullQuote({ className }: WarumEvGlabPullQuoteProps) {
  return (
    <div
      className={cn(
        "mt-8 w-full rounded-[12px] border border-ink/10 bg-white px-4 py-4",
        className,
      )}
      aria-label="Wofür EvGlab steht: Klarheit, Qualität, Umsetzung"
    >
      <p className="m-0 mb-3 font-mono-hero text-[10px] uppercase tracking-[1px] text-ink3">Wofür ich stehe</p>
      <ul role="list" className="m-0 flex list-none flex-wrap gap-2 p-0">
        {WARUM_VALUE_PILLARS.map(({ label, icon: Icon }) => (
          <li
            key={label}
            role="listitem"
            className="inline-flex items-center gap-2 rounded-full border border-amber/25 bg-amber/8 py-2 pr-3.5 pl-2.5"
          >
            <span
              className="flex h-7 w-7 items-center justify-center rounded-full bg-white shadow-[0_1px_0_rgba(255,255,255,0.8)_inset]"
              aria-hidden
            >
              <Icon className="h-3.5 w-3.5 text-amber" strokeWidth={2} />
            </span>
            <span className="font-sans-tight text-[13px] font-semibold text-ink">{label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
