"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const COOKIE_CONSENT_KEY = "cookie-consent";

export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (!consent) {
      setVisible(true);
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
      className="cookie-banner fixed bottom-0 left-0 right-0 z-[100] px-4 py-4 sm:px-6"
    >
      <div className="mx-auto flex max-w-4xl flex-col gap-4 rounded-2xl border border-white/20 bg-white/95 px-5 py-4 shadow-xl backdrop-blur-xl sm:flex-row sm:items-center sm:justify-between sm:gap-6">
        <div className="flex-1">
          <h2 id="cookie-banner-title" className="text-sm font-semibold text-neutral-900">
            Cookie-Einstellungen
          </h2>
          <p id="cookie-banner-desc" className="mt-1 text-sm text-neutral-600">
            Wir verwenden Cookies, um die Seite optimal zu gestalten und die Nutzung zu verbessern.{" "}
            <Link
              href="/datenschutz"
              className="underline decoration-neutral-400 underline-offset-2 hover:text-[#14532d]"
            >
              Mehr erfahren
            </Link>
          </p>
        </div>
        <div className="flex shrink-0 gap-3">
          <button
            onClick={handleDecline}
            className="rounded-full border border-neutral-300 bg-white px-5 py-2 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-50"
          >
            Nur notwendige
          </button>
          <button
            onClick={handleAccept}
            className="rounded-full bg-[#14532d] px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#166534]"
          >
            Alle akzeptieren
          </button>
        </div>
      </div>
    </div>
  );
}
