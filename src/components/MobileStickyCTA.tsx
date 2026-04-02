"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/neon-button";

/** Sticky Bottom CTA – erscheint beim Scrollen, blendet aus bei Pakete & Preise, Section 7 und Footer. Nur Mobile. */
export function MobileStickyCTA() {
  const [visible, setVisible] = useState(false);
  const [hideNearFooter, setHideNearFooter] = useState(false);
  const [mounted, setMounted] = useState(false);
  const inViewRef = useRef<Set<Element>>(new Set());

  useEffect(() => {
    const id = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(id);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const isMobile = () => window.innerWidth < 768;
    if (!isMobile()) return;

    let rafId = 0;
    const onScroll = () => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        setVisible(window.scrollY > 280);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [mounted]);

  useEffect(() => {
    if (!mounted) return;
    const pricing = document.getElementById("pakete-preise");
    const section7 = document.getElementById("section-7");
    const footer = document.getElementById("contact");
    const sections = [pricing, section7, footer].filter(Boolean);
    if (sections.length === 0) return;
    const checkHide = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((e) => {
        if (e.intersectionRatio > 0) inViewRef.current.add(e.target);
        else inViewRef.current.delete(e.target);
      });
      setHideNearFooter(inViewRef.current.size > 0);
    };
    const obs = new IntersectionObserver(checkHide, {
      threshold: [0, 0.01, 0.1],
      rootMargin: "0px 0px 80px 0px",
    });
    sections.forEach((el) => el && obs.observe(el));
    return () => obs.disconnect();
  }, [mounted]);

  const show = visible && !hideNearFooter;

  if (!mounted) return null;

  return (
    <div
      className="mobile-sticky-cta fixed bottom-0 left-0 right-0 z-[65] px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 md:hidden"
      style={{
        opacity: show ? 1 : 0,
        pointerEvents: show ? "auto" : "none",
        transform: show ? "translateY(0)" : "translateY(100%)",
        transition: "opacity 0.4s cubic-bezier(0.22, 1, 0.36, 1), transform 0.4s cubic-bezier(0.22, 1, 0.36, 1)",
      }}
    >
      <Button
        href="#contact"
        variant="solid"
        size="lg"
        className="mobile-sticky-cta-btn mx-0 flex w-full max-w-none items-center justify-between gap-3 rounded-2xl px-5 py-4 text-left shadow-lg"
      >
        <div className="relative z-[1] flex flex-col gap-0.5 text-left">
          <span className="text-base font-bold text-white">
            Kostenloses Erstgespräch sichern
          </span>
          <span className="text-xs font-medium text-white/80">
            Unverbindlich · Direkt · Für Brauereien
          </span>
        </div>
        <span className="relative z-[1] flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/20 text-lg">
          →
        </span>
      </Button>
    </div>
  );
}
