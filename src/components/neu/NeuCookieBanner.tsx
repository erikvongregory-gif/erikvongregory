"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useLoading } from "@/context/LoadingContext";
import {
  COOKIE_CONSENT_KEY,
  COOKIE_SETTINGS_EVENT,
  openCookieSettings,
  parseStoredCookieConsent,
  type CookiePrefs,
} from "@/lib/cookieConsent";
import { cn } from "@/lib/utils";

type Prefs = {
  necessary: true;
  analytics: boolean;
  marketing: boolean;
};

/**
 * Cookie-Banner im Velorah-Look (dark, liquid-glass).
 * Nutzt dieselbe Consent-Logik wie der Live-Banner.
 */
export function NeuCookieBanner() {
  const [open, setOpen] = useState(false);
  const [customize, setCustomize] = useState(false);
  const [prefs, setPrefs] = useState<Prefs>({
    necessary: true,
    analytics: false,
    marketing: false,
  });
  const { saveCookieConsent } = useLoading();

  useEffect(() => {
    const parsed = parseStoredCookieConsent(localStorage.getItem(COOKIE_CONSENT_KEY));
    if (!parsed) {
      const id = window.setTimeout(() => setOpen(true), 400);
      return () => window.clearTimeout(id);
    }
    setPrefs((p) => ({
      ...p,
      analytics: parsed.analytics,
      marketing: parsed.marketing,
    }));
    setOpen(false);
  }, []);

  useEffect(() => {
    const openSettings = () => {
      const parsed = parseStoredCookieConsent(localStorage.getItem(COOKIE_CONSENT_KEY));
      if (parsed) {
        setPrefs((p) => ({
          ...p,
          analytics: parsed.analytics,
          marketing: parsed.marketing,
        }));
      }
      setCustomize(true);
      setOpen(true);
    };
    window.addEventListener(COOKIE_SETTINGS_EVENT, openSettings);
    return () => window.removeEventListener(COOKIE_SETTINGS_EVENT, openSettings);
  }, []);

  const apply = (next: CookiePrefs) => {
    saveCookieConsent(next);
    setOpen(false);
    setCustomize(false);
  };

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-labelledby="neu-cookie-title"
      aria-modal="false"
      className="fixed inset-x-0 bottom-0 z-[90] p-4 md:p-6"
    >
      <div
        className="neu-cookie mx-auto max-w-3xl overflow-hidden rounded-2xl border border-[color:var(--neu-border)] shadow-[0_20px_60px_rgba(0,0,0,0.2)] backdrop-blur-xl"
        style={{ backgroundColor: "var(--neu-cookie-bg)", color: "var(--neu-fg)" }}
      >
        <div className="p-5 sm:p-7">
          <p className="neu-faint text-[11px] uppercase tracking-[0.28em]">Cookies</p>
          <h2
            id="neu-cookie-title"
            className="neu-fg mt-2 text-2xl leading-tight tracking-[-0.5px] sm:text-3xl"
            style={{ fontFamily: "var(--font-velorah-serif), ui-serif, Georgia, serif" }}
          >
            Wir respektieren deine Wahl.
          </h2>
          <p className="neu-muted mt-3 max-w-xl text-sm leading-relaxed">
            Notwendige Cookies bleiben an. Analyse und Marketing sind optional. Mehr in unserer{" "}
            <Link
              href="/datenschutz"
              className="neu-fg underline underline-offset-2 hover:opacity-80"
            >
              Datenschutzerklärung
            </Link>
            .
          </p>

          {customize ? (
            <div className="mt-5 space-y-3 border-t border-[color:var(--neu-border)] pt-5">
              <ToggleRow
                title="Notwendig"
                description="Grundfunktionen der Website."
                checked
                locked
              />
              <ToggleRow
                title="Analyse"
                description="Hilft uns, die Seite zu verbessern."
                checked={prefs.analytics}
                onChange={(v) => setPrefs((p) => ({ ...p, analytics: v }))}
              />
              <ToggleRow
                title="Marketing"
                description="Personalisierte Inhalte und Werbung."
                checked={prefs.marketing}
                onChange={(v) => setPrefs((p) => ({ ...p, marketing: v }))}
              />
            </div>
          ) : null}

          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
            <button
              type="button"
              onClick={() => apply({ analytics: true, marketing: true })}
              className="neu-liquid-glass rounded-full px-8 py-3 text-sm transition-transform hover:scale-[1.03]"
            >
              Alle akzeptieren
            </button>
            {customize ? (
              <button
                type="button"
                onClick={() =>
                  apply({ analytics: prefs.analytics, marketing: prefs.marketing })
                }
                className="neu-muted rounded-full border border-[color:var(--neu-border-strong)] px-8 py-3 text-sm transition-colors hover:text-[color:var(--neu-fg)]"
              >
                Auswahl speichern
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setCustomize(true)}
                className="neu-muted rounded-full border border-[color:var(--neu-border-strong)] px-8 py-3 text-sm transition-colors hover:text-[color:var(--neu-fg)]"
              >
                Anpassen
              </button>
            )}
            <button
              type="button"
              onClick={() => apply({ analytics: false, marketing: false })}
              className="neu-faint rounded-full px-4 py-3 text-sm transition-colors hover:text-[color:var(--neu-muted)] sm:ml-auto"
            >
              Nur notwendige
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function ToggleRow({
  title,
  description,
  checked,
  locked,
  onChange,
}: {
  title: string;
  description: string;
  checked: boolean;
  locked?: boolean;
  onChange?: (value: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-xl border border-[color:var(--neu-border)] bg-[color:var(--neu-card)] px-4 py-3">
      <div>
        <p className="neu-fg text-sm">{title}</p>
        <p className="neu-faint text-xs">{description}</p>
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-disabled={locked}
        disabled={locked}
        onClick={() => onChange?.(!checked)}
        className={cn(
          "relative h-7 w-12 shrink-0 rounded-full transition-colors",
          checked ? "bg-[var(--neu-fg)]" : "bg-[var(--neu-border-strong)]",
          locked && "opacity-60",
        )}
      >
        <span
          className={cn(
            "absolute top-0.5 left-0.5 h-6 w-6 rounded-full transition-transform",
            checked
              ? "translate-x-5 bg-[var(--neu-bg)]"
              : "translate-x-0 bg-[var(--neu-fg)]",
          )}
        />
      </button>
    </div>
  );
}

/** Footer-Trigger für Cookie-Einstellungen (Velorah-Shell). */
export function NeuCookieSettingsButton({
  className,
}: {
  className?: string;
}) {
  return (
    <button type="button" onClick={() => openCookieSettings()} className={className}>
      Cookies
    </button>
  );
}
