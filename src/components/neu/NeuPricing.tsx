"use client";

import PricingSection3 from "@/components/ui/pricing-section-3";
import { NeuHlsVideo } from "@/components/neu/NeuHlsVideo";
import { useNeuTheme } from "@/components/neu/NeuTheme";

/** Gleicher Statement-Stream wie „Dein Marketing-Cockpit“ */
const STATEMENT_HLS =
  "https://stream.mux.com/9njY8qDfS02Uvbll018C8CK39p5EksK7mn02DDC1zYvppI.m3u8";

/** Pricing — Video nur im Dark Mode, sonst helles Surface. */
export function NeuPricing() {
  const { theme } = useNeuTheme();
  const isLight = theme === "light";

  return (
    <section
      id="preise"
      className={
        isLight
          ? "neu-bg relative scroll-mt-24 overflow-hidden px-2 py-16 md:px-6 md:py-24"
          : "neu-on-media relative scroll-mt-24 overflow-hidden bg-black px-2 py-16 md:px-6 md:py-24"
      }
    >
      {!isLight ? <NeuHlsVideo src={STATEMENT_HLS} /> : null}
      <div className="relative z-10">
        <PricingSection3 />
      </div>
    </section>
  );
}
