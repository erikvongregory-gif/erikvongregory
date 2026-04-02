"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import {
  COOKIE_CONSENT_KEY,
  type CookiePrefs,
  parseStoredCookieConsent,
  serializeCookieConsent,
} from "@/lib/cookieConsent";

type LoadingContextValue = {
  isLoadComplete: boolean;
  /** Gespeicherte Kategorien, sobald der Nutzer entschieden hat (sonst `null`). */
  cookiePreferences: CookiePrefs | null;
  heroReady: boolean;
  setLoadComplete: () => void;
  saveCookieConsent: (prefs: CookiePrefs) => void;
};

const LoadingContext = createContext<LoadingContextValue | null>(null);

export function LoadingProvider({ children }: { children: React.ReactNode }) {
  const [isLoadComplete, setIsLoadComplete] = useState(false);
  const [cookiePreferences, setCookiePreferences] = useState<CookiePrefs | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const raw = localStorage.getItem(COOKIE_CONSENT_KEY);
    const parsed = parseStoredCookieConsent(raw);
    if (parsed) setCookiePreferences(parsed);
    else if (raw) localStorage.removeItem(COOKIE_CONSENT_KEY);
  }, []);

  const setLoadComplete = useCallback(() => setIsLoadComplete(true), []);

  const saveCookieConsent = useCallback((prefs: CookiePrefs) => {
    localStorage.setItem(COOKIE_CONSENT_KEY, serializeCookieConsent(prefs));
    setCookiePreferences(prefs);
  }, []);

  /** Nur LoadingScreen – nicht an Cookie-Banner koppeln, sonst bleibt der Mobile-Hero-CTA unsichtbar. */
  const heroReady = isLoadComplete;

  return (
    <LoadingContext.Provider
      value={{
        isLoadComplete,
        cookiePreferences,
        heroReady,
        setLoadComplete,
        saveCookieConsent,
      }}
    >
      {children}
    </LoadingContext.Provider>
  );
}

export function useLoading() {
  const ctx = useContext(LoadingContext);
  return (
    ctx ?? {
      isLoadComplete: true,
      cookiePreferences: { analytics: false, marketing: false },
      heroReady: true,
      setLoadComplete: () => {},
      saveCookieConsent: () => {},
    }
  );
}
