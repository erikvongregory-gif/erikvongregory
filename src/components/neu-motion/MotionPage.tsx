"use client";

import { MotionConfig } from "framer-motion";
import { ParloNavbar } from "@/components/neu/parlo/ParloNavbar";
import { ParloFooter } from "@/components/neu/parlo/ParloFooter";
import { MotionHero } from "./MotionHero";
import { MotionProduct } from "./MotionProduct";
import { MotionHowItWorks } from "./MotionHowItWorks";
import { MotionChannels } from "./MotionChannels";
import { MotionFeatures } from "./MotionFeatures";
import { MotionPricing } from "./MotionPricing";
import { MotionFaq } from "./MotionFaq";
import { MotionCta } from "./MotionCta";
import { ScanDivider } from "./ScanDivider";

/** Gleicher Aufbau wie die neue Startseite — Sections mit Motion-Schicht. */
export function MotionPage() {
  return (
    <MotionConfig reducedMotion="user">
      <div className="neu-motion relative min-h-screen">
        <div className="parlo-frame-line left-[22px]" aria-hidden />
        <div className="parlo-frame-line left-[30px]" aria-hidden />
        <div className="parlo-frame-line right-[22px]" aria-hidden />
        <div className="parlo-frame-line right-[30px]" aria-hidden />

        <ParloNavbar />
        <main>
          <MotionHero />
          <ScanDivider />
          <MotionProduct />
          <ScanDivider />
          <MotionHowItWorks />
          <ScanDivider />
          <MotionChannels />
          <ScanDivider />
          <MotionFeatures />
          <ScanDivider />
          <MotionPricing />
          <ScanDivider />
          <MotionFaq />
          <MotionCta />
        </main>
        <ParloFooter />
      </div>
    </MotionConfig>
  );
}
