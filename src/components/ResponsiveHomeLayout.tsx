"use client";

import { useSyncExternalStore } from "react";
import dynamic from "next/dynamic";
import { Hero } from "@/components/ui/animated-hero";
import { useLoading } from "@/context/LoadingContext";
import { importWithRetry } from "@/lib/importWithRetry";

const DesktopLayout = dynamic(
  importWithRetry(
    () => import(/* webpackPrefetch: true */ "@/components/DesktopLayout").then((m) => m.DesktopLayout),
    "DesktopLayout",
  ),
  { ssr: false },
);
const MobileLayout = dynamic(
  importWithRetry(
    () => import(/* webpackPrefetch: true */ "@/components/MobileLayout").then((m) => m.MobileLayout),
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
  const { heroReady } = useLoading();
  const isDesktop = useSyncExternalStore(
    subscribeDesktopMq,
    getDesktopMqSnapshot,
    getDesktopMqServerSnapshot,
  );

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
            className={`section1-wrapper relative mx-auto w-full max-w-screen-2xl section1-wrapper--mobile-gallery ${heroReady ? "section1-ready" : ""}`}
          >
            <Hero />
          </div>
        ) : null}

        {isDesktop ? (
          <div id="desktop-content" className="desktop-root flex w-full flex-col">
            <DesktopLayout />
          </div>
        ) : null}

        {!isDesktop ? (
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
