"use client";

import { useEffect, useState } from "react";
import { useLoading } from "@/context/LoadingContext";
import {
  COOKIE_CONSENT_KEY,
  COOKIE_SETTINGS_EVENT,
  parseStoredCookieConsent,
  type CookiePrefs,
} from "@/lib/cookieConsent";
import { CookiePanel } from "@/components/ui/cookie-banner-1";

export function CookieBanner() {
  const [isOpen, setIsOpen] = useState(false);
  const [forceOpenToken, setForceOpenToken] = useState(0);
  const [settingsMode, setSettingsMode] = useState(false);
  const [initialPrefs, setInitialPrefs] = useState({ necessary: true, functional: false, analytics: false, marketing: false });
  const { saveCookieConsent } = useLoading();

  useEffect(() => {
    const parsed = parseStoredCookieConsent(localStorage.getItem(COOKIE_CONSENT_KEY));
    if (!parsed) {
      const id = setTimeout(() => setIsOpen(true), 0);
      return () => clearTimeout(id);
    }
    setInitialPrefs((p) => ({ ...p, analytics: parsed.analytics, marketing: parsed.marketing }));
    setIsOpen(false);
    return;
  }, []);

  const applyConsent = (prefs: CookiePrefs) => {
    saveCookieConsent(prefs);
    setIsOpen(false);
    setSettingsMode(false);
  };

  useEffect(() => {
    const openSettings = () => {
      const parsed = parseStoredCookieConsent(localStorage.getItem(COOKIE_CONSENT_KEY));
      if (parsed) {
        setInitialPrefs((p) => ({ ...p, analytics: parsed.analytics, marketing: parsed.marketing }));
      }
      setSettingsMode(true);
      setIsOpen(true);
      setForceOpenToken((n) => n + 1);
    };
    window.addEventListener(COOKIE_SETTINGS_EVENT, openSettings);
    return () => window.removeEventListener(COOKIE_SETTINGS_EVENT, openSettings);
  }, []);

  return (
    <CookiePanel
      storageEnabled={false}
      initialOpen={isOpen}
      initialPrefs={initialPrefs}
      forceOpenToken={forceOpenToken}
      settingsMode={settingsMode}
      onClose={() => {
        setIsOpen(false);
        setSettingsMode(false);
      }}
      onAcceptAll={() => applyConsent({ analytics: true, marketing: true })}
      onSavePreferences={(prefs) => applyConsent({ analytics: prefs.analytics, marketing: prefs.marketing })}
    />
  );
}
