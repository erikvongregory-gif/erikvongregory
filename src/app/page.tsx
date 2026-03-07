import { DesktopLayout } from "@/components/DesktopLayout";
import { MobileLayout } from "@/components/MobileLayout";

export default function Home() {
  return (
    <>
      {/* Mobile: reines CSS (unter 768px) – portrait oben */}
      <div className="block md:hidden">
        <main id="main" className="relative min-h-screen overflow-x-hidden pt-14 sm:pt-16">
          <MobileLayout />
        </main>
      </div>
      {/* Desktop/Tablet: ab 768px */}
      <div className="hidden md:block">
        <DesktopLayout />
      </div>
    </>
  );
}
