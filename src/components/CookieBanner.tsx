"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const COOKIE_CONSENT_KEY = "cookie-consent";

export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (!consent) {
      const id = setTimeout(() => setVisible(true), 0);
      return () => clearTimeout(id);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, "accepted");
    setVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, "declined");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-labelledby="cookie-banner-title"
      aria-describedby="cookie-banner-desc"
      className="cookie-banner fixed inset-0 z-[100] flex items-center justify-center p-4"
    >
      <div
        className="cookie-banner-backdrop absolute inset-0 bg-black/60 backdrop-blur-sm"
        aria-hidden="true"
      />
      <div className="cookie-banner-card relative mx-auto flex max-w-md flex-col gap-5 rounded-2xl border border-white/12 bg-white/[0.06] px-6 py-5 shadow-[0_0_0_1px_rgba(255,255,255,0.05)_inset,0_8px_32px_rgba(0,0,0,0.3),0_0_60px_rgba(34,197,94,0.08)] backdrop-blur-xl sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:max-w-lg">
        <div className="flex-1">
          <h2 id="cookie-banner-title" className="text-base font-semibold text-white">
            Cookie-Einstellungen
          </h2>
          <p id="cookie-banner-desc" className="mt-2 text-sm leading-relaxed text-white/85">
            Wir verwenden Cookies, um die Seite optimal zu gestalten und die Nutzung zu verbessern.{" "}
            <Link
              href="/datenschutz"
              className="underline decoration-emerald-400/60 underline-offset-2 hover:text-emerald-400"
            >
              Mehr erfahren
            </Link>
          </p>
        </div>
        <div className="flex shrink-0 gap-3">
          <button
            onClick={handleDecline}
            className="rounded-full border border-white/20 bg-white/5 px-5 py-2.5 text-sm font-medium text-white/90 transition-colors hover:bg-white/10"
          >
            Nur notwendige
          </button>
          <button
            onClick={handleAccept}
            className="rounded-full bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white shadow-[0_0_20px_rgba(34,197,94,0.3)] transition-colors hover:bg-emerald-500 hover:shadow-[0_0_24px_rgba(34,197,94,0.4)]"
          >
            Alle akzeptieren
          </button>
        </div>
      </div>
    </div>
  );
}
