"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

/** Sticky Portrait + Glow: bleibt beim Scrollen sichtbar, Glow rotiert mit Scroll */
const ROTATION_STEP = 3; /* Nur State-Update wenn sich Rotation um mind. 3° ändert – weniger Re-Renders = flüssigeres Scroll */

export function StickyPortraitWithGlow() {
  const [scrollRotation, setScrollRotation] = useState(0);
  const lastRotationRef = useRef(0);

  useEffect(() => {
    let rafId = 0;
    const onScroll = () => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const rot = window.scrollY * 0.08;
        if (Math.abs(rot - lastRotationRef.current) >= ROTATION_STEP) {
          lastRotationRef.current = rot;
          setScrollRotation(rot);
        }
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div className="sticky-portrait-col relative z-20 hidden lg:block lg:sticky lg:top-20 lg:self-start">
      <div className="relative flex shrink-0 items-start justify-end lg:-translate-y-[180px]">
        {/* Glow: rotiert mit Scroll */}
        <div
          className="pointer-events-none absolute -inset-[40%] -z-10"
          style={{
            background:
              "radial-gradient(ellipse 200% 250% at 50% 30%, rgba(255, 200, 160, 0.4) 0%, rgba(255, 220, 190, 0.15) 8%, rgba(255, 235, 205, 0.04) 18%, transparent 28%)",
            transform: `rotate(${scrollRotation}deg)`,
            transformOrigin: "50% 30%",
          }}
        />
        <div
          className="relative h-[500px] w-[340px] origin-top xl:h-[600px] xl:w-[400px] 2xl:h-[800px] 2xl:w-[640px]"
          style={{
            maskImage: "linear-gradient(to bottom, black 70%, transparent 100%)",
            WebkitMaskImage: "linear-gradient(to bottom, black 70%, transparent 100%)",
          }}
        >
          <Image
            src="/hero-portrait.svg"
            alt="EvGlab"
            width={640}
            height={800}
            priority
            className="hero-portrait-blend h-full w-full object-contain object-top"
          />
        </div>
      </div>
    </div>
  );
}
