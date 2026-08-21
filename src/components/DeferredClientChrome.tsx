"use client";

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

/** Client-only Chrome — `ssr: false` darf nicht in Server Components (layout.tsx). */
export function DeferredClientChrome() {
  return (
    <>
      <FaviconReminder />
      <Analytics />
      <SpeedInsights />
    </>
  );
}
