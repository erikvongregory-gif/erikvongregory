import { DesktopLayout } from "@/components/DesktopLayout";
import { MobileLayout } from "@/components/MobileLayout";
import { MobileStickyCTA } from "@/components/MobileStickyCTA";
import { PricingSection } from "@/components/PricingSection";
import { Section7AIDemo } from "@/components/Section7AIDemo";

export default function Home() {
  return (
    <>
      {/* Mobile: reines CSS (unter 768px) – portrait oben */}
      <div className="block md:hidden">
        <main id="main" className="relative min-h-screen overflow-x-hidden pt-14 sm:pt-16">
          <MobileLayout />
        </main>
        <MobileStickyCTA />
      </div>
      {/* Desktop/Tablet: ab 768px */}
      <div className="hidden md:block">
        <DesktopLayout />
      </div>
      <PricingSection />
      <Section7AIDemo />
    </>
  );
}
