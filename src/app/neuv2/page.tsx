import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Neuv2Navbar } from "@/components/neuv2/Neuv2Navbar";
import { Neuv2Hero } from "@/components/neuv2/Neuv2Hero";
import { Neuv2Features } from "@/components/neuv2/Neuv2Features";
import { Neuv2Stats } from "@/components/neuv2/Neuv2Stats";
import { Neuv2Pricing } from "@/components/neuv2/Neuv2Pricing";
import { Neuv2Faq } from "@/components/neuv2/Neuv2Faq";
import { Neuv2Cta } from "@/components/neuv2/Neuv2Cta";
import { Neuv2Footer } from "@/components/neuv2/Neuv2Footer";
import { NEUV2_CSS } from "@/components/neuv2/styles";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-neuv2-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Neu v2 · Launch UI Preview",
  description:
    "BrewAI-Landing im Launch-UI-Stil (21st.dev / MIT). Internes Preview — nicht indexiert.",
  robots: { index: false, follow: false },
};

/**
 * /neuv2 — Launch UI dark aesthetic (MIT), BrewAI content.
 */
export default function Neuv2Page() {
  return (
    <div className={`neuv2 relative min-h-[100dvh] ${inter.variable}`}>
      <style dangerouslySetInnerHTML={{ __html: NEUV2_CSS }} />
      <div className="nv-lines" aria-hidden>
        <div />
      </div>
      <div className="relative z-10">
        <Neuv2Navbar />
        <main>
          <Neuv2Hero />
          <Neuv2Features />
          <Neuv2Stats />
          <Neuv2Pricing />
          <Neuv2Faq />
          <Neuv2Cta />
        </main>
        <Neuv2Footer />
      </div>
    </div>
  );
}
