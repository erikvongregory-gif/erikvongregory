"use client";

import { KI_BEISPIEL_VIDEO_16X9, KI_BEISPIEL_VIDEOS_9X16, KI_CAROUSEL } from "@/lib/kiBeispiele";
import { cn } from "@/lib/utils";
import { HeroSection } from "@/components/ui/feature-carousel";
import { LiquidMetalButton } from "@/components/ui/liquid-metal-button";

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
    <>
      <div id="beispiele" className="scroll-mt-24" aria-hidden />
      <section
        id="section-7"
        className="relative z-20 border-t-0 px-4 pb-10 pt-16 sm:pb-12 sm:pt-20 md:border-t md:border-neutral-300/40 md:pb-14 md:pt-24"
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

        <div
          id="beispiele-videos"
          className="mt-16 scroll-mt-24 border-t border-neutral-200/70 pt-14 sm:mt-20 sm:pt-16 md:mt-20 md:pt-16"
        >
          <div className="mb-8 text-center md:mb-10">
            <span className="section7-badge inline-flex items-center gap-2 rounded-full border border-[rgba(224,122,64,0.35)] bg-[rgba(224,122,64,0.12)] px-4 py-1.5 text-sm font-medium text-[#c65a20]">
              <span aria-hidden>▶</span>
              Video-Formate
            </span>
            <h3 className="section7-headline mt-4 text-2xl font-semibold tracking-tight text-zinc-900 sm:text-3xl">
              Auch in Bewegung —{" "}
              <span className="font-light italic font-austera-green-fade">Reels &amp; Querformat</span>
            </h3>
            <p className="section7-desc mx-auto mt-3 max-w-2xl text-pretty text-sm leading-relaxed text-zinc-600 sm:text-base">
              Mehrere echte <strong className="font-medium text-zinc-800">9:16</strong>-Clips (Reels, Stories) — darunter
              ein <strong className="font-medium text-zinc-800">16:9</strong>-Beispiel für Web und YouTube.
            </p>
          </div>

          <div className="mx-auto flex min-h-0 max-w-6xl flex-col gap-8 lg:gap-10">
            <div className="grid min-h-0 grid-cols-1 gap-10 md:grid-cols-3 md:gap-3 lg:gap-4">
              {KI_BEISPIEL_VIDEOS_9X16.map((v) => (
                <figure
                  key={v.src}
                  className="flex min-h-0 min-w-0 flex-col items-center gap-3 md:items-stretch"
                >
                  <div
                    className={cn(
                      "relative aspect-[9/16] w-full overflow-hidden rounded-2xl border border-neutral-200/80 bg-neutral-950 shadow-[0_20px_50px_-28px_rgba(15,23,42,0.2)] ring-1 ring-black/[0.04]",
                      "mx-auto max-w-[min(280px,88vw)] md:mx-0 md:max-w-none",
                    )}
                  >
                    <video
                      className="absolute inset-0 h-full w-full object-cover object-center"
                      controls
                      playsInline
                      preload="metadata"
                      poster={v.poster}
                      aria-label={v.title}
                    >
                      <source src={v.src} type="video/mp4" />
                      Dein Browser unterstützt das Video-Tag nicht —{" "}
                      <a href={v.src} className="font-medium text-[#c65a20] underline">
                        Datei öffnen
                      </a>
                      .
                    </video>
                  </div>
                  <figcaption className="text-center md:text-left md:pt-3">
                    <p className="text-sm font-semibold text-zinc-900">{v.title}</p>
                    <p className="mt-1 text-pretty text-xs leading-relaxed text-zinc-600 sm:text-sm">{v.caption}</p>
                  </figcaption>
                </figure>
              ))}
            </div>

            <figure className="flex min-h-0 min-w-0 w-full flex-col gap-3">
              <div
                className={cn(
                  "relative w-full overflow-hidden rounded-2xl border border-neutral-200/80 bg-black shadow-[0_20px_50px_-28px_rgba(15,23,42,0.2)] ring-1 ring-black/[0.04]",
                  "pb-[56.25%]",
                )}
              >
                <video
                  className="absolute inset-0 z-0 h-full w-full object-cover object-center"
                  controls
                  playsInline
                  preload="auto"
                  poster={KI_BEISPIEL_VIDEO_16X9.poster}
                  aria-label={KI_BEISPIEL_VIDEO_16X9.title}
                >
                  <source src={KI_BEISPIEL_VIDEO_16X9.src} type="video/mp4" />
                  Dein Browser unterstützt das Video-Tag nicht —{" "}
                  <a href={KI_BEISPIEL_VIDEO_16X9.src} className="font-medium text-[#c65a20] underline">
                    Datei öffnen
                  </a>
                  .
                </video>
              </div>
              <figcaption className="text-center sm:text-left">
                <p className="text-sm font-semibold text-zinc-900">{KI_BEISPIEL_VIDEO_16X9.title}</p>
                <p className="mt-1 text-pretty text-xs leading-relaxed text-zinc-600 sm:text-sm">
                  {KI_BEISPIEL_VIDEO_16X9.caption}
                </p>
              </figcaption>
            </figure>
          </div>
        </div>

        <p className="section7-footer mt-8 text-center text-base font-medium sm:mt-10 sm:text-lg">
          So kann auch deine Brauerei mit professionellen Bildern und Werbematerial überzeugen –
          schnell, günstig und ohne Grafikdesigner.
        </p>
        <div className="mt-5 flex justify-center sm:mt-6">
          <LiquidMetalButton
            label="3 Bilder kostenlos generieren"
            onClick={openSignup}
            size="large"
            widthPx={300}
          />
        </div>
        </div>
      </section>
    </>
  );
}
