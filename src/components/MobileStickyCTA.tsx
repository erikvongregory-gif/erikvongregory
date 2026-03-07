"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

/** Sticky Bottom CTA – erscheint beim Scrollen, bleibt sichtbar. Nur Mobile. */
export function MobileStickyCTA() {
  const [visible, setVisible] = useState(false);
  const [mounted, setMounted] = useState(false);

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
        const show = window.scrollY > 280;
        setVisible(show);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [mounted]);

  if (!mounted) return null;

  return (
    <div
      className="mobile-sticky-cta fixed bottom-0 left-0 right-0 z-50 px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 md:hidden"
      style={{
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? "auto" : "none",
        transform: visible ? "translateY(0)" : "translateY(100%)",
        transition: "opacity 0.4s cubic-bezier(0.22, 1, 0.36, 1), transform 0.4s cubic-bezier(0.22, 1, 0.36, 1)",
      }}
    >
      <Link
        href="#contact"
        className="mobile-sticky-cta-btn flex w-full items-center justify-between gap-3 rounded-2xl px-5 py-4 text-left shadow-lg"
      >
        <div className="flex flex-col gap-0.5">
          <span className="text-base font-bold text-white">
            Kostenloses Erstgespräch sichern
          </span>
          <span className="text-xs font-medium text-white/80">
            Unverbindlich · Direkt · Für Brauereien
          </span>
        </div>
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/20 text-lg">
          →
        </span>
      </Link>
    </div>
  );
}
