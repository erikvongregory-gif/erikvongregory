import Link from "next/link";
import { SITE } from "@/lib/siteConfig";

export function Neuv2Cta() {
  return (
    <section className="nv-section group relative overflow-hidden">
      <div className="nv-container relative z-10 flex flex-col items-center gap-6 text-center sm:gap-8">
        <h2 className="max-w-[640px] text-3xl leading-tight font-semibold sm:text-5xl sm:leading-tight">
          Bereit für Content, der wirkt?
        </h2>
        <Link href={SITE.appBaseUrl} className="nv-btn nv-btn-primary !h-10 !px-5">
          3 Bilder kostenlos generieren
        </Link>
      </div>
      <div className="absolute inset-0 translate-y-4 opacity-80 transition-all duration-500 ease-in-out group-hover:translate-y-[-0.5rem] group-hover:opacity-100">
        <div
          aria-hidden
          className="absolute bottom-0 left-1/2 h-64 w-[60%] -translate-x-1/2 scale-[2.5] rounded-[50%] sm:h-[512px]"
          style={{
            background:
              "radial-gradient(circle, color-mix(in oklch, var(--brand-foreground) 50%, transparent) 10%, transparent 60%)",
          }}
        />
      </div>
    </section>
  );
}
