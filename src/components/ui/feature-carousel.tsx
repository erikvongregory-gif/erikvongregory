"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface HeroSectionImage {
  src: string;
  alt: string;
}

export interface HeroSectionProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  title: React.ReactNode;
  subtitle: string;
  images: readonly HeroSectionImage[];
  /** z. B. `section7-headline` für globale Section-7-Typo */
  headingClassName?: string;
  /** z. B. `section7-desc` für Unterzeile-Farbe ab md */
  subtitleClassName?: string;
}

export const HeroSection = React.forwardRef<HTMLDivElement, HeroSectionProps>(
  (
    { title, subtitle, images, className, headingClassName, subtitleClassName, ...props },
    ref,
  ) => {
    const [currentIndex, setCurrentIndex] = React.useState(() =>
      Math.floor(images.length / 2),
    );

    const handleNext = React.useCallback(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, [images.length]);

    const handlePrev = React.useCallback(() => {
      setCurrentIndex(
        (prev) => (prev - 1 + images.length) % images.length,
      );
    }, [images.length]);

    React.useEffect(() => {
      if (images.length === 0) return;
      const timer = window.setInterval(handleNext, 4000);
      return () => window.clearInterval(timer);
    }, [handleNext, images.length]);

    if (images.length === 0) {
      return null;
    }

    return (
      <div
        ref={ref}
        className={cn(
          "relative flex w-full min-w-0 max-w-full flex-col items-center justify-center p-4 md:p-6",
          className,
        )}
        {...props}
      >
        <div className="z-10 flex w-full max-w-5xl flex-col items-center space-y-8 text-center md:space-y-10">
          <div className="space-y-3 md:space-y-4">
            <h2
              className={cn(
                "max-w-4xl text-3xl font-bold tracking-tight text-zinc-800 sm:text-4xl md:text-5xl",
                headingClassName,
              )}
            >
              {title}
            </h2>
            <p
              className={cn(
                "mx-auto max-w-2xl text-base text-zinc-600 md:text-lg",
                subtitleClassName,
              )}
            >
              {subtitle}
            </p>
          </div>

          <div className="relative flex w-full max-w-4xl items-center justify-center pb-8 pt-2 min-h-[340px] h-[340px] sm:min-h-[400px] sm:h-[400px] md:min-h-[520px] md:h-[520px] md:pb-10 md:pt-4">
            <div
              className="relative flex h-full w-full items-center justify-center [perspective:1000px]"
              style={{ transformStyle: "preserve-3d" }}
            >
              {images.map((image, index) => {
                const offset = index - currentIndex;
                const total = images.length;
                let pos = (offset + total) % total;
                if (pos > Math.floor(total / 2)) {
                  pos -= total;
                }

                const isCenter = pos === 0;
                const isAdjacent = Math.abs(pos) === 1;

                return (
                  <div
                    key={`${image.src}-${index}`}
                    className={cn(
                      "absolute flex h-80 w-44 items-center justify-center transition-all duration-500 ease-in-out sm:h-[22rem] sm:w-52 md:h-[450px] md:w-64",
                    )}
                    style={{
                      transform: `
                        translateX(${pos * 45}%)
                        scale(${isCenter ? 1 : isAdjacent ? 0.85 : 0.7})
                        rotateY(${pos * -10}deg)
                      `,
                      zIndex: isCenter ? 10 : isAdjacent ? 5 : 1,
                      opacity: isCenter ? 1 : isAdjacent ? 0.4 : 0,
                      visibility: Math.abs(pos) > 1 ? "hidden" : "visible",
                    }}
                  >
                    {/* Schatten auf äußerem Wrapper ohne overflow-hidden, damit er nicht abgeschnitten wird */}
                    <div
                      className="h-full w-full rounded-3xl"
                    >
                      <div className="h-full w-full overflow-hidden rounded-3xl">
                        {/* eslint-disable-next-line @next/next/no-img-element -- 3D-Carousel mit dynamischem transform */}
                        <img
                          src={image.src}
                          alt={image.alt}
                          className="h-full w-full object-cover transition-[filter,transform] duration-500 ease-in-out"
                          style={
                            isCenter
                              ? { transform: "scale(1.01)" }
                              : { filter: "blur(3px)", WebkitFilter: "blur(3px)", transform: "scale(1.04)" }
                          }
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <Button
              type="button"
              variant="outline"
              size="icon"
              className="absolute left-0 top-1/2 z-20 h-10 w-10 -translate-y-1/2 rounded-full border-white/25 bg-black/30 text-white backdrop-blur-sm hover:bg-black/45 md:left-2 md:border-zinc-300 md:bg-white/85 md:text-zinc-800 md:hover:bg-white"
              onClick={handlePrev}
              aria-label="Vorheriges Bild"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button
              type="button"
              variant="outline"
              size="icon"
              className="absolute right-0 top-1/2 z-20 h-10 w-10 -translate-y-1/2 rounded-full border-white/25 bg-black/30 text-white backdrop-blur-sm hover:bg-black/45 md:right-2 md:border-zinc-300 md:bg-white/85 md:text-zinc-800 md:hover:bg-white"
              onClick={handleNext}
              aria-label="Nächstes Bild"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    );
  },
);

HeroSection.displayName = "HeroSection";
