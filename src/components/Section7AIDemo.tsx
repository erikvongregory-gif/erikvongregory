"use client";

import { KI_CAROUSEL } from "@/lib/kiBeispiele";
import { HeroSection } from "@/components/ui/feature-carousel";

export function Section7AIDemo() {
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
      </div>
    </section>
  );
}
