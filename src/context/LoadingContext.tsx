"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";

const COOKIE_CONSENT_KEY = "cookie-consent";

type LoadingContextValue = {
  isLoadComplete: boolean;
  cookieConsentGiven: boolean;
  heroReady: boolean;
  setLoadComplete: () => void;
  setCookieConsentGiven: () => void;
};

const LoadingContext = createContext<LoadingContextValue | null>(null);

export function LoadingProvider({ children }: { children: React.ReactNode }) {
  const [isLoadComplete, setIsLoadComplete] = useState(false);
  const [cookieConsentGiven, setCookieConsentGivenState] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined" && localStorage.getItem(COOKIE_CONSENT_KEY)) {
      setCookieConsentGivenState(true);
    }
  }, []);

  const setLoadComplete = useCallback(() => setIsLoadComplete(true), []);

  const setCookieConsentGiven = useCallback(() => setCookieConsentGivenState(true), []);

  /* Hero zeigt sich, sobald Lade-Screen fertig ist (unabhängig von Cookie-Consent) */
  const heroReady = isLoadComplete;

  return (
    <LoadingContext.Provider
      value={{
        isLoadComplete,
        cookieConsentGiven,
        heroReady,
        setLoadComplete,
        setCookieConsentGiven,
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
      cookieConsentGiven: true,
      heroReady: true,
      setLoadComplete: () => {},
      setCookieConsentGiven: () => {},
    }
  );
}
