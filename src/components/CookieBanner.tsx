"use client";

import { useEffect, useState } from "react";
import { useLoading } from "@/context/LoadingContext";
import { COOKIE_CONSENT_KEY, parseStoredCookieConsent, type CookiePrefs } from "@/lib/cookieConsent";
import { CookiePanel } from "@/components/ui/cookie-banner-1";

export function CookieBanner() {
  const [isOpen, setIsOpen] = useState(false);
  const [forceOpenToken, setForceOpenToken] = useState(0);
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
  };

  useEffect(() => {
    const openSettings = () => {
      const parsed = parseStoredCookieConsent(localStorage.getItem(COOKIE_CONSENT_KEY));
      if (parsed) {
        setInitialPrefs((p) => ({ ...p, analytics: parsed.analytics, marketing: parsed.marketing }));
      }
      setIsOpen(true);
      setForceOpenToken((n) => n + 1);
    };
    window.addEventListener("evglab-open-cookie-settings", openSettings);
    return () => window.removeEventListener("evglab-open-cookie-settings", openSettings);
  }, []);

  return (
    <CookiePanel
      title="Diese Website verwendet Cookies"
      message="Wir verwenden Cookies, um dein Erlebnis auf unserer Website zu verbessern."
      acceptText="Alle akzeptieren"
      customizeText="Anpassen"
      icon="cookie"
      privacyHref="/datenschutz"
      termsHref="/agb"
      storageEnabled={false}
      initialOpen={isOpen}
      initialPrefs={initialPrefs}
      forceOpenToken={forceOpenToken}
      onClose={() => setIsOpen(false)}
      onAcceptAll={() => applyConsent({ analytics: true, marketing: true })}
      onSavePreferences={(prefs) => applyConsent({ analytics: prefs.analytics, marketing: prefs.marketing })}
      theme="dark"
    />
  );
}
