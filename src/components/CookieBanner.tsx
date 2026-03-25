"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useLoading } from "@/context/LoadingContext";
import { COOKIE_CONSENT_KEY, parseStoredCookieConsent, type CookiePrefs } from "@/lib/cookieConsent";

function CookieToggle({
  enabled,
  onChange,
  id,
  labelId,
  disabled,
}: {
  enabled: boolean;
  onChange: (next: boolean) => void;
  id: string;
  labelId: string;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      id={id}
      role="switch"
      aria-checked={enabled}
      aria-labelledby={labelId}
      disabled={disabled}
      aria-disabled={disabled || undefined}
      onClick={() => !disabled && onChange(!enabled)}
      className={`relative h-7 w-12 shrink-0 rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0f14] disabled:cursor-not-allowed disabled:opacity-50 ${
        enabled ? "bg-[#c65a20]" : "bg-white/20"
      }`}
    >
      <span
        className={`absolute top-0.5 h-6 w-6 rounded-full bg-white shadow transition-transform ${
          enabled ? "translate-x-[1.375rem]" : "translate-x-0.5"
        }`}
        aria-hidden
      />
    </button>
  );
}

export function CookieBanner() {
  const [visible, setVisible] = useState(false);
  const [mode, setMode] = useState<"simple" | "settings">("simple");
  const [draft, setDraft] = useState<CookiePrefs>({ analytics: false, marketing: false });
  const { saveCookieConsent } = useLoading();

  useEffect(() => {
    if (parseStoredCookieConsent(localStorage.getItem(COOKIE_CONSENT_KEY)) != null) return;
    const id = setTimeout(() => setVisible(true), 0);
    return () => clearTimeout(id);
  }, []);

  const dismissWith = (prefs: CookiePrefs) => {
    saveCookieConsent(prefs);
    setVisible(false);
    setMode("simple");
  };

  const goToSettings = () => {
    const parsed = parseStoredCookieConsent(localStorage.getItem(COOKIE_CONSENT_KEY));
    setDraft(parsed ?? { analytics: false, marketing: false });
    setMode("settings");
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="cookie-banner-title"
      aria-describedby="cookie-banner-desc"
      className="cookie-banner fixed inset-0 z-[100] flex items-center justify-center p-4"
    >
      <div
        className="cookie-banner-backdrop absolute inset-0 bg-black/60 backdrop-blur-sm"
        aria-hidden="true"
      />
      <div className="cookie-banner-card relative mx-auto flex max-h-[min(90vh,32rem)] w-full max-w-md flex-col gap-5 overflow-y-auto rounded-2xl border border-orange-400/20 bg-[#0a0f14]/95 px-6 py-5 shadow-[0_0_0_1px_rgba(255,255,255,0.05)_inset,0_8px_32px_rgba(0,0,0,0.3),0_0_60px_rgba(224,122,64,0.12)] backdrop-blur-xl sm:max-w-lg">
        {mode === "simple" ? (
          <>
            <div>
              <h2 id="cookie-banner-title" className="text-base font-semibold text-white">
                Cookie-Einstellungen
              </h2>
              <p id="cookie-banner-desc" className="mt-2 text-sm leading-relaxed text-white/85">
                Wir nutzen Cookies und ähnliche Technologien. Notwendige sind für den Betrieb der
                Seite erforderlich. Weitere Kategorien nutzen wir nur mit Ihrer Einwilligung.{" "}
                <Link
                  href="/datenschutz"
                  className="underline decoration-orange-400/60 underline-offset-2 hover:text-orange-400"
                >
                  Datenschutzerklärung
                </Link>
              </p>
            </div>
            <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:justify-end">
              <button
                type="button"
                onClick={() => dismissWith({ analytics: false, marketing: false })}
                className="order-2 rounded-full border border-white/20 bg-white/5 px-4 py-2.5 text-sm font-medium text-white/90 transition-colors hover:bg-white/10 sm:order-1"
              >
                Nur notwendige
              </button>
              <button
                type="button"
                onClick={goToSettings}
                className="order-3 rounded-full border border-orange-400/40 bg-orange-500/10 px-4 py-2.5 text-sm font-medium text-orange-100 transition-colors hover:bg-orange-500/20 sm:order-2"
              >
                Einstellungen
              </button>
              <button
                type="button"
                onClick={() => dismissWith({ analytics: true, marketing: true })}
                className="order-1 rounded-full bg-[#c65a20] px-4 py-2.5 text-sm font-semibold text-white shadow-[0_0_20px_rgba(224,122,64,0.35)] transition-colors hover:bg-[#d46830] hover:shadow-[0_0_24px_rgba(224,122,64,0.45)] sm:order-3"
              >
                Alle akzeptieren
              </button>
            </div>
          </>
        ) : (
          <>
            <div>
              <h2 id="cookie-banner-title" className="text-base font-semibold text-white">
                Cookie-Einstellungen
              </h2>
              <p id="cookie-banner-desc" className="mt-2 text-sm leading-relaxed text-white/85">
                Wählen Sie, welche Datenverwendungen Sie zulassen möchten. Notwendige Cookies können
                nicht abgewählt werden.
              </p>
            </div>

            <ul className="flex flex-col gap-4 border-y border-white/10 py-4">
              <li className="flex gap-3 sm:gap-4">
                <div className="min-w-0 flex-1">
                  <p id="cookie-cat-necessary" className="text-sm font-medium text-white">
                    Notwendig
                  </p>
                  <p className="mt-1 text-xs leading-relaxed text-white/65">
                    Speicherung Ihrer Entscheidung (lokal), Sicherheit und grundlegende Funktionen
                    der Website.
                  </p>
                </div>
                <CookieToggle
                  id="cookie-toggle-necessary"
                  labelId="cookie-cat-necessary"
                  enabled
                  disabled
                  onChange={() => {}}
                />
              </li>
              <li className="flex gap-3 sm:gap-4">
                <div className="min-w-0 flex-1">
                  <p id="cookie-cat-stats" className="text-sm font-medium text-white">
                    Statistik
                  </p>
                  <p className="mt-1 text-xs leading-relaxed text-white/65">
                    Hilft zu verstehen, wie Besucher die Seite nutzen (z. B. anonyme
                    Reichweitenmessung), sofern eingesetzt.
                  </p>
                </div>
                <CookieToggle
                  id="cookie-toggle-stats"
                  labelId="cookie-cat-stats"
                  enabled={draft.analytics}
                  onChange={(next) => setDraft((d) => ({ ...d, analytics: next }))}
                />
              </li>
              <li className="flex gap-3 sm:gap-4">
                <div className="min-w-0 flex-1">
                  <p id="cookie-cat-mkt" className="text-sm font-medium text-white">
                    Marketing
                  </p>
                  <p className="mt-1 text-xs leading-relaxed text-white/65">
                    Für personalisierte Inhalte, Kampagnen oder Social-/Werbe-Cookies, sofern
                    eingesetzt.
                  </p>
                </div>
                <CookieToggle
                  id="cookie-toggle-mkt"
                  labelId="cookie-cat-mkt"
                  enabled={draft.marketing}
                  onChange={(next) => setDraft((d) => ({ ...d, marketing: next }))}
                />
              </li>
            </ul>

            <div className="flex flex-col gap-2 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() => setMode("simple")}
                className="rounded-full border border-white/20 bg-white/5 px-4 py-2.5 text-sm font-medium text-white/90 transition-colors hover:bg-white/10"
              >
                Zurück
              </button>
              <button
                type="button"
                onClick={() => dismissWith(draft)}
                className="rounded-full bg-[#c65a20] px-4 py-2.5 text-sm font-semibold text-white shadow-[0_0_20px_rgba(224,122,64,0.35)] transition-colors hover:bg-[#d46830]"
              >
                Auswahl speichern
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
