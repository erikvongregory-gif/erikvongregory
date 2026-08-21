"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const Analytics = dynamic(
  () => import("@vercel/analytics/react").then((m) => m.Analytics),
  { ssr: false },
);
const SpeedInsights = dynamic(
  () => import("@vercel/speed-insights/next").then((m) => m.SpeedInsights),
  { ssr: false },
);
const FaviconReminder = dynamic(
  () => import("@/components/FaviconReminder").then((m) => m.FaviconReminder),
  { ssr: false },
);

/** Client-only Chrome — erst nach Idle, nicht im First Paint. */
export function DeferredClientChrome() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let idleId: number | null = null;
    let timeoutId: ReturnType<typeof setTimeout> | null = null;
    const go = () => setReady(true);
    if ("requestIdleCallback" in window) {
      idleId = window.requestIdleCallback(go, { timeout: 4000 });
    } else {
      timeoutId = setTimeout(go, 3500);
    }
    return () => {
      if (idleId !== null) window.cancelIdleCallback?.(idleId);
      if (timeoutId !== null) clearTimeout(timeoutId);
    };
  }, []);

  if (!ready) return null;

  return (
    <>
      <FaviconReminder />
      <Analytics />
      <SpeedInsights />
    </>
  );
}
