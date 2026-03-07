"use client";

import { useEffect, useState } from "react";
import { LiquidBackground } from "@/components/LiquidBackground";
import { FadeInSection } from "@/components/FadeInSection";
import { HeroWithScatter } from "@/components/HeroWithScatter";
import { Section4Boxes } from "@/components/Section4Boxes";
import { Section6Glaubwuerdigkeit } from "@/components/Section6Glaubwuerdigkeit";
import { ZoomSection3 } from "@/components/ZoomSection3";
import { MobileLayout } from "./MobileLayout";

export function HomeContent() {
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    const id = setTimeout(() => setIsMobile(mq.matches), 0);
    const handler = () => setIsMobile(mq.matches);
    mq.addEventListener("change", handler);
    return () => {
      clearTimeout(id);
      mq.removeEventListener("change", handler);
    };
  }, []);

  if (isMobile) {
    return (
      <main id="main" className="relative min-h-screen overflow-x-hidden pt-14 sm:pt-16">
        <MobileLayout />
      </main>
    );
  }

  return (
    <main id="main" className="relative min-h-screen overflow-x-hidden pt-14 sm:pt-16">
      <LiquidBackground />
      <div className="relative h-[600vh] lg:h-[850vh]" aria-hidden />
      <HeroWithScatter />
      <FadeInSection />
      <ZoomSection3 />
      <Section4Boxes />
      <Section6Glaubwuerdigkeit />
    </main>
  );
}
