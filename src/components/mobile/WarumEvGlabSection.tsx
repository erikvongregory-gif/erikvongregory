import { WarumEvGlabComparisonTable } from "@/components/mobile/WarumEvGlabComparisonTable";
import { WarumEvGlabPullQuote } from "@/components/mobile/WarumEvGlabPullQuote";

const PULL_QUOTE =
  "Klarheit vor Komplexität. Qualität vor Hype. Umsetzung vor Theorie.";

export function WarumEvGlabSection() {
  return (
    <section
      className="bg-paper px-[22px] pt-10 pb-9 text-ink"
      aria-labelledby="warum-headline"
    >
      <div className="mb-3.5 flex items-center gap-2.5">
        <span className="h-px w-7 shrink-0 bg-amber" aria-hidden />
        <p className="m-0 font-mono-hero text-[11px] uppercase tracking-[1.4px] text-amber">
          Warum EvGlab
        </p>
      </div>

      <h2
        id="warum-headline"
        className="m-0 mt-0 font-serif-hero text-4xl font-normal leading-[1.03] tracking-[-1px]"
      >
        Der Unterschied,
        <br />
        <em className="font-medium italic text-amber">Zeile für Zeile</em>.
      </h2>

      <p className="mt-3.5 max-w-[320px] font-sans-tight text-sm leading-[1.5] text-ink2">
        Was die meisten Brauereien machen — und was sich mit EvGlab ändert.
      </p>

      <WarumEvGlabComparisonTable className="mt-[22px]" />

      <WarumEvGlabPullQuote
        quote={PULL_QUOTE}
        caption="Wofür ich stehe"
        className="mx-5"
      />
    </section>
  );
}
