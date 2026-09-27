import { ParloNavbar } from "./ParloNavbar";
import { ParloHero } from "./ParloHero";
import { ParloProduct } from "./ParloProduct";
import { ParloHowItWorks } from "./ParloHowItWorks";
import { ParloChannels } from "./ParloChannels";
import { ParloFeatures } from "./ParloFeatures";
import { ParloPricing } from "./ParloPricing";
import { ParloFaq } from "./ParloFaq";
import { ParloCta } from "./ParloCta";
import { ParloFooter } from "./ParloFooter";
import { ParloSnakeDivider } from "./ParloEffects";

export function ParloPage() {
  return (
    <div className="relative min-h-screen">
      {/* Fixed page frame lines */}
      <div className="parlo-frame-line left-[22px]" aria-hidden />
      <div className="parlo-frame-line left-[30px]" aria-hidden />
      <div className="parlo-frame-line right-[22px]" aria-hidden />
      <div className="parlo-frame-line right-[30px]" aria-hidden />

      <ParloNavbar />
      <main>
        <ParloHero />
        <ParloSnakeDivider />
        <ParloProduct />
        <ParloSnakeDivider />
        <ParloHowItWorks />
        <ParloSnakeDivider />
        <ParloChannels />
        <ParloSnakeDivider />
        <ParloFeatures />
        <ParloSnakeDivider />
        <ParloPricing />
        <ParloSnakeDivider />
        <ParloFaq />
        <ParloCta />
      </main>
      <ParloFooter />
    </div>
  );
}
