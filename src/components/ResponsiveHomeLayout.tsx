"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import dynamic from "next/dynamic";
import { MobileHomeEntry } from "@/components/MobileHomeEntry";
import { importWithRetry } from "@/lib/importWithRetry";

const DesktopLayout = dynamic(
  importWithRetry(
    () => import("@/components/DesktopLayout").then((m) => m.DesktopLayout),
    "DesktopLayout",
  ),
  { ssr: false },
);
const MobileLayout = dynamic(
  importWithRetry(
    () => import("@/components/MobileLayout").then((m) => m.MobileLayout),
    "MobileLayout",
  ),
  { ssr: false },
);

const DESKTOP_MIN = "(min-width: 1024px)";

function subscribeDesktopMq(onStoreChange: () => void) {
  const mq = window.matchMedia(DESKTOP_MIN);
  mq.addEventListener("change", onStoreChange);
  return () => mq.removeEventListener("change", onStoreChange);
}

function getDesktopMqSnapshot() {
  return window.matchMedia(DESKTOP_MIN).matches;
}

/** Mobile-first – muss mit SSR übereinstimmen, sonst Hydration-Mismatch */
function getDesktopMqServerSnapshot() {
  return false;
}

export function ResponsiveHomeLayout() {
  const isDesktop = useSyncExternalStore(
    subscribeDesktopMq,
    getDesktopMqSnapshot,
    getDesktopMqServerSnapshot,
  );
  const [loadBelowFold, setLoadBelowFold] = useState(false);

  useEffect(() => {
    if (isDesktop) {
      setLoadBelowFold(true);
      return;
    }
    let cancelled = false;
    let idleId: number | null = null;
    let timeoutId: ReturnType<typeof setTimeout> | null = null;
    const go = () => {
      if (!cancelled) setLoadBelowFold(true);
    };
    /* Below-fold erst nach Hero/LCP — Lab misst sonst TBT durch Warum/Prozess-Chunks */
    if ("requestIdleCallback" in window) {
      idleId = window.requestIdleCallback(go, { timeout: 4500 });
    } else {
      timeoutId = setTimeout(go, 3000);
    }
    const onScroll = () => go();
    window.addEventListener("scroll", onScroll, { passive: true, once: true });
    return () => {
      cancelled = true;
      if (idleId !== null) window.cancelIdleCallback?.(idleId);
      if (timeoutId !== null) clearTimeout(timeoutId);
      window.removeEventListener("scroll", onScroll);
    };
  }, [isDesktop]);

  return (
    <div
      className={`block min-h-[100dvh] w-full min-w-0 ${isDesktop ? "desktop-root" : "mobile-root mobile-root-home"}`}
    >
      <main
        id="main"
        className="relative min-h-[100dvh] overflow-x-hidden bg-paper pt-[var(--mobile-top-header-offset)] lg:pt-[var(--site-header-offset)]"
      >
        {!isDesktop ? (
          <div
            id="start"
            className="section1-wrapper relative mx-auto w-full max-w-screen-2xl section1-wrapper--mobile-gallery"
          >
            <MobileHomeEntry />
          </div>
        ) : null}

        {isDesktop ? (
          <div id="desktop-content" className="desktop-root flex w-full flex-col">
            <DesktopLayout />
          </div>
        ) : null}

        {!isDesktop && loadBelowFold ? (
          <div
            id="mobile-content"
            className="mobile-root mobile-root-home flex w-full flex-col overflow-x-hidden bg-paper text-ink"
          >
            <MobileLayout />
          </div>
        ) : null}
      </main>
    </div>
  );
}
