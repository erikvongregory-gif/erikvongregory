"use client";

import { KI_CAROUSEL } from "@/lib/kiBeispiele";
import { HeroSection } from "@/components/ui/feature-carousel";

export function Section7AIDemo() {
  const openSignup = () => {
    if (typeof window === "undefined") return;
    window.dispatchEvent(
      new CustomEvent("evglab-open-auth-modal", {
        detail: { mode: "signup" },
      }),
    );
  };

  return (
    <section
      id="section-7"
      className="relative z-[70] border-t-0 px-4 py-16 sm:py-20 md:border-t md:border-neutral-300/40 md:py-24"
    >
      <div className="section7-inner mx-auto max-w-6xl">
        <div className="mb-6 text-center md:mb-8">
          <span className="section7-badge section7-badge-pulse inline-flex items-center gap-2 rounded-full border border-[rgba(224,122,64,0.35)] bg-[rgba(224,122,64,0.15)] px-4 py-1.5 text-sm font-medium text-[#c65a20]">
            <span aria-hidden>✦</span>
            KI-Demo
          </span>
        </div>

        <div
          id="echte-beispiele-aus-der-praxis"
          className="section7-slide-into scroll-mt-24"
        >
          <HeroSection
            className="min-h-0"
            headingClassName="section7-headline"
            subtitleClassName="section7-desc"
            title={
              <>
                Echte Beispiele{" "}
                <span className="font-light italic font-austera-green-fade">
                  aus der Praxis
                </span>
              </>
            }
            subtitle="Produktvisualisierungen und Werbebilder wie diese – mit KI in Minuten statt in Tagen. Wische oder nutze die Pfeile – alle paar Sekunden wechselt die Ansicht automatisch."
            images={KI_CAROUSEL}
          />
        </div>

        <p className="section7-footer mt-10 text-center text-base font-medium sm:mt-12 sm:text-lg">
          So kann auch deine Brauerei mit professionellen Bildern und Werbematerial überzeugen –
          schnell, günstig und ohne Grafikdesigner.
        </p>
        <div className="mt-5 flex justify-center sm:mt-6">
          <button
            type="button"
            onClick={openSignup}
            className="group relative inline-flex items-center justify-center overflow-hidden rounded-full border border-[#e07a40]/45 bg-[linear-gradient(135deg,#d46830_0%,#c65a20_45%,#b84d15_100%)] px-6 py-3 text-sm font-semibold text-white shadow-[0_16px_34px_-20px_rgba(198,90,32,0.55)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_22px_42px_-20px_rgba(198,90,32,0.7)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e07a40]/70 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent sm:px-7 sm:text-base"
          >
            <span className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.35),transparent_45%)] opacity-70 transition-opacity duration-300 group-hover:opacity-100" />
            <span className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_120%,rgba(255,210,165,0.35),transparent_52%)]" />
            <span className="relative inline-flex items-center gap-2">
              <span aria-hidden>✦</span>
              3 Bilder kostenlos generieren
              <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-0.5">
                →
              </span>
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}
