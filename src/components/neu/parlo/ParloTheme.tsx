"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

export type ParloThemeMode = "dark" | "light";

/** Nur gesetzt, wenn der User manuell umgeschaltet hat. Sonst folgt OS. */
const STORAGE_KEY = "brewai-color-scheme";

type ParloThemeContextValue = {
  theme: ParloThemeMode;
  setTheme: (theme: ParloThemeMode) => void;
  toggleTheme: () => void;
  ready: boolean;
};

const ParloThemeContext = createContext<ParloThemeContextValue | null>(null);

function systemTheme(): ParloThemeMode {
  if (typeof window === "undefined") return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function readStoredOverride(): ParloThemeMode | null {
  if (typeof window === "undefined") return null;
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === "light" || stored === "dark") return stored;
  } catch {
    /* ignore */
  }
  return null;
}

function writeStoredOverride(theme: ParloThemeMode) {
  try {
    window.localStorage.setItem(STORAGE_KEY, theme);
  } catch {
    /* ignore */
  }
}

export function ParloThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<ParloThemeMode>("light");
  const [userOverride, setUserOverride] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const stored = readStoredOverride();
    if (stored) {
      setThemeState(stored);
      setUserOverride(true);
    } else {
      setThemeState(systemTheme());
      setUserOverride(false);
    }
    setReady(true);
  }, []);

  // Ohne manuellen Override dem OS folgen
  useEffect(() => {
    if (!ready || userOverride) return;
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const sync = () => setThemeState(mq.matches ? "dark" : "light");
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, [ready, userOverride]);

  const setTheme = useCallback((next: ParloThemeMode) => {
    setThemeState(next);
    setUserOverride(true);
    writeStoredOverride(next);
  }, []);

  const toggleTheme = useCallback(() => {
    setThemeState((prev) => {
      const next = prev === "dark" ? "light" : "dark";
      writeStoredOverride(next);
      return next;
    });
    setUserOverride(true);
  }, []);

  const value = useMemo(
    () => ({ theme, setTheme, toggleTheme, ready }),
    [theme, setTheme, toggleTheme, ready],
  );

  return (
    <ParloThemeContext.Provider value={value}>
      <div
        className={`parlo min-h-screen antialiased ${theme === "dark" ? "dark" : "light"}`}
        suppressHydrationWarning
      >
        {children}
      </div>
    </ParloThemeContext.Provider>
  );
}

export function useParloTheme() {
  const ctx = useContext(ParloThemeContext);
  if (!ctx) {
    throw new Error("useParloTheme must be used within ParloThemeProvider");
  }
  return ctx;
}
