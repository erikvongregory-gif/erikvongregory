import { cn } from "@/lib/utils";

type WarumBrewAIPullQuoteProps = {
  quote: string;
  caption: string;
  className?: string;
};

export function WarumBrewAIPullQuote({ quote, caption, className }: WarumBrewAIPullQuoteProps) {
  return (
    <blockquote
      className={cn(
        "mt-8 w-full rounded-r-[10px] border-l-[3px] border-amber bg-white p-5 pl-[22px]",
        className,
      )}
    >
      <p className="m-0 font-serif-hero text-[19px] italic leading-[1.35] tracking-[-0.3px] text-ink">
        {quote}
      </p>
      <cite className="mt-3 block font-mono-hero text-[10.5px] not-italic uppercase tracking-[1px] text-ink3">
        {caption}
      </cite>
    </blockquote>
  );
}
