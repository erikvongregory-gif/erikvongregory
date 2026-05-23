"use client";

import {
  createContext,
  useCallback,
  useContext,
  useLayoutEffect,
  useState,
} from "react";
import {
  COOKIE_CONSENT_KEY,
  type CookiePrefs,
  parseStoredCookieConsent,
  serializeCookieConsent,
} from "@/lib/cookieConsent";
import { scheduleAfterPaint } from "@/lib/scheduleAfterPaint";

type LoadingContextValue = {
  isLoadComplete: boolean;
  /** Gespeicherte Kategorien, sobald der Nutzer entschieden hat (sonst `null`). */
  cookiePreferences: CookiePrefs | null;
  heroReady: boolean;
  setLoadComplete: () => void;
  saveCookieConsent: (prefs: CookiePrefs) => void;
};

const LoadingContext = createContext<LoadingContextValue | null>(null);

/** Einmal pro Browser (localStorage): Intro-Splash nur beim ersten Aufruf der Site, nicht bei interner Navigation oder neuem Tab. */
export const EVGLAB_SPLASH_SEEN_KEY = "evglab_splash_seen";

export function isSplashAlreadySeen(): boolean {
  try {
    return (
      localStorage.getItem(EVGLAB_SPLASH_SEEN_KEY) === "1" ||
      sessionStorage.getItem(EVGLAB_SPLASH_SEEN_KEY) === "1"
    );
  } catch {
    return false;
  }
}

export function LoadingProvider({ children }: { children: React.ReactNode }) {
  const [isLoadComplete, setIsLoadComplete] = useState(false);
  const [cookiePreferences, setCookiePreferences] = useState<CookiePrefs | null>(() => {
    if (typeof window === "undefined") return null;
    const raw = localStorage.getItem(COOKIE_CONSENT_KEY);
    const parsed = parseStoredCookieConsent(raw);
    if (!parsed && raw) {
      localStorage.removeItem(COOKIE_CONSENT_KEY);
    }
    return parsed;
  });

  const setLoadComplete = useCallback(() => {
    setIsLoadComplete(true);
    try {
      localStorage.setItem(EVGLAB_SPLASH_SEEN_KEY, "1");
    } catch {
      /* private mode */
    }
  }, []);

  /** Wiederkehrender Besuch: Hero-Einblendungen erst nach Paint, nicht während Hydration. */
  useLayoutEffect(() => {
    if (!isSplashAlreadySeen()) return;
    return scheduleAfterPaint(() => setIsLoadComplete(true));
  }, []);

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
      isLoadComplete: false,
      cookiePreferences: { analytics: false, marketing: false },
      heroReady: false,
      setLoadComplete: () => {},
      saveCookieConsent: () => {},
    }
  );
}
