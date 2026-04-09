"use client";

import { MeshGradient } from "@paper-design/shaders-react";
import { useEffect, useState } from "react";

interface HeroSectionProps {
  title?: string;
  highlightText?: string;
  description?: string;
  buttonText?: string;
  onButtonClick?: () => void;
  colors?: string[];
  distortion?: number;
  swirl?: number;
  speed?: number;
  offsetX?: number;
  className?: string;
  titleClassName?: string;
  descriptionClassName?: string;
  buttonClassName?: string;
  maxWidth?: string;
  veilOpacity?: string;
  fontFamily?: string;
  fontWeight?: number;
}

export function HeroSection({
  title = "KI-Marketing fuer",
  highlightText = "Brauereien",
  description = "Produktfotos, Bildkampagnen und Social-Content mit KI - schnell umgesetzt, klar auf deine Marke abgestimmt und bereit fuer mehr Sichtbarkeit.",
  buttonText = "Meine Angebote ansehen",
  onButtonClick,
  colors = ["#72b9bb", "#b5d9d9", "#ffd1bd", "#ffebe0", "#8cc5b8", "#dbf4a4"],
  distortion = 1.05,
  swirl = 0.7,
  speed = 0.6,
  offsetX = 0.08,
  className = "",
  titleClassName = "",
  descriptionClassName = "",
  buttonClassName = "",
  maxWidth = "max-w-6xl",
  veilOpacity = "bg-white/35",
  fontFamily = "var(--font-main), ui-sans-serif, system-ui, sans-serif",
  fontWeight = 700,
}: HeroSectionProps) {
  const [dimensions, setDimensions] = useState({ width: 1920, height: 1080 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const update = () =>
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return (
    <section
      className={`relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-background ${className}`}
    >
      <div className="absolute inset-0 h-full w-full">
        {mounted && (
          <>
            <MeshGradient
              width={dimensions.width}
              height={dimensions.height}
              colors={colors}
              distortion={distortion}
              swirl={swirl}
              grainMixer={0}
              grainOverlay={0}
              speed={speed}
              offsetX={offsetX}
            />
            <div className={`pointer-events-none absolute inset-0 ${veilOpacity}`} />
          </>
        )}
      </div>

      <div className={`relative z-10 mx-auto w-full px-6 ${maxWidth}`}>
        <div className="text-center">
          <h1
            className={`mb-6 text-balance text-4xl leading-tight font-bold text-foreground sm:text-5xl md:text-6xl lg:text-7xl xl:text-[80px] xl:leading-[1.1] ${titleClassName}`}
            style={{ fontFamily, fontWeight }}
          >
            {title} <span className="text-[#c65a20]">{highlightText}</span>
          </h1>
          <p
            className={`mx-auto mb-10 max-w-3xl px-4 text-pretty text-lg leading-relaxed text-zinc-800 sm:text-xl ${descriptionClassName}`}
          >
            {description}
          </p>
          <button
            onClick={onButtonClick}
            className={`rounded-full border-2 border-zinc-900/20 bg-zinc-900 px-6 py-4 text-sm text-white transition-colors hover:bg-zinc-800 sm:px-8 sm:py-5 sm:text-base ${buttonClassName}`}
          >
            {buttonText}
          </button>
        </div>
      </div>
    </section>
  );
}
