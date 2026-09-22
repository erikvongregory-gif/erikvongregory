import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SITE } from "@/lib/siteConfig";

export function Neuv2Hero() {
  return (
    <section className="nv-section nv-fade-bottom overflow-hidden !pb-0 sm:!pb-0 md:!pb-0">
      <div className="nv-container flex flex-col gap-12 pt-12 sm:gap-24 sm:pt-16">
        <div className="flex flex-col items-center gap-6 text-center sm:gap-12">
          <div className="nv-appear inline-flex items-center gap-2 rounded-full border border-[color-mix(in_oklch,var(--border)_15%,transparent)] px-3 py-1 text-sm text-[var(--muted-foreground)]">
            KI-Content für Brauereien
            <a href="#pricing" className="inline-flex items-center gap-1 font-medium text-[var(--foreground)]">
              Ab 79 € <ArrowRight className="size-3" />
            </a>
          </div>

          <h1 className="nv-appear-d1 relative z-10 max-w-5xl bg-gradient-to-r from-[var(--foreground)] to-[var(--muted-foreground)] bg-clip-text text-4xl font-semibold leading-[1.1] text-transparent drop-shadow-2xl sm:text-6xl sm:leading-[1.1] md:text-8xl md:leading-[1.05]">
            Content, der nach Brauerei aussieht — nicht nach Vorlage.
          </h1>

          <p className="nv-appear-d2 relative z-10 max-w-[740px] text-base font-medium text-balance text-[var(--muted-foreground)] sm:text-xl">
            Planbare Produktbilder, Social Posts und Bewertungsantworten in deinem Markenstil.
            Ein Dashboard — weniger Aufwand, mehr Sichtbarkeit.
          </p>

          <div className="nv-appear-d3 relative z-10 flex flex-wrap justify-center gap-3">
            <Link href={SITE.appBaseUrl} className="nv-btn nv-btn-primary !h-10 !px-5">
              3 Bilder kostenlos generieren
            </Link>
            <a href="#features" className="nv-btn nv-btn-glow !h-10 !px-5">
              Funktionen ansehen
            </a>
          </div>

          <div className="relative w-full pt-12">
            <div className="nv-appear-d3 relative z-10 overflow-hidden rounded-2xl bg-[color-mix(in_oklch,var(--border)_10%,transparent)] p-2 sm:p-4">
              <div className="overflow-hidden rounded-md border border-[color-mix(in_oklch,var(--border)_15%,transparent)] bg-[color-mix(in_oklch,var(--background)_90%,transparent)] shadow-[0_25px_50px_-12px_var(--shadow-strong)]">
                <img
                  src="/neu/dashboard/dashboard-full.webp"
                  alt="BrewAI Dashboard"
                  width={1920}
                  height={1279}
                  className="h-auto w-full"
                />
              </div>
            </div>
            <div
              aria-hidden
              className="nv-appear-zoom pointer-events-none absolute top-0 left-1/2 h-64 w-[60%] -translate-x-1/2 scale-[2.5] rounded-[50%] opacity-100 sm:h-[512px]"
              style={{
                background:
                  "radial-gradient(circle, color-mix(in oklch, var(--brand-foreground) 50%, transparent) 10%, transparent 60%)",
              }}
            />
            <div
              aria-hidden
              className="pointer-events-none absolute top-0 left-1/2 h-32 w-[40%] -translate-x-1/2 scale-[2] rounded-[50%] opacity-100 sm:h-64"
              style={{
                background:
                  "radial-gradient(circle, color-mix(in oklch, var(--brand) 30%, transparent) 10%, transparent 60%)",
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
