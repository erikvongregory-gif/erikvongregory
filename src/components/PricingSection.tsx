import { PricingBoxes } from "./PricingBoxes";

export function PricingSection() {
  return (
    <section className="relative z-[80] px-4 py-14 sm:py-16 md:py-20">
      <div className="mx-auto max-w-6xl">
        <PricingBoxes />
      </div>
    </section>
  );
}
