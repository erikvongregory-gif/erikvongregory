"use client";

import { DesktopHero } from "@/components/desktop/DesktopHero";
import { DesktopWarum } from "@/components/desktop/DesktopWarum";
import { DesktopProzess } from "@/components/desktop/DesktopProzess";
import { DesktopLoesungen } from "@/components/desktop/DesktopLoesungen";
import { DesktopPreise } from "@/components/desktop/DesktopPreise";
import { DesktopBeispiele } from "@/components/desktop/DesktopBeispiele";
import { DesktopFaq } from "@/components/desktop/DesktopFaq";
import { DesktopFooter } from "@/components/desktop/DesktopFooter";

export function DesktopLayout() {
  return (
    <>
      <div id="start" className="scroll-mt-24" aria-hidden />
      <DesktopHero />
      <DesktopWarum />
      <DesktopProzess />
      <DesktopLoesungen />
      <DesktopPreise />
      <DesktopBeispiele />
      <DesktopFaq />
      <DesktopFooter />
    </>
  );
}
