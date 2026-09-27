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

const STORAGE_KEY = "parlo-neu-theme";

type ParloThemeContextValue = {
  theme: ParloThemeMode;
  setTheme: (theme: ParloThemeMode) => void;
  toggleTheme: () => void;
  ready: boolean;
};

const ParloThemeContext = createContext<ParloThemeContextValue | null>(null);

function readStored(): ParloThemeMode {
  if (typeof window === "undefined") return "dark";
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === "light" || stored === "dark") return stored;
  } catch {
    /* ignore */
  }
  return "dark";
}

export function ParloThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<ParloThemeMode>("dark");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setThemeState(readStored());
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, theme);
    } catch {
      /* ignore */
    }
  }, [theme, ready]);

  const setTheme = useCallback((next: ParloThemeMode) => {
    setThemeState(next);
  }, []);

  const toggleTheme = useCallback(() => {
    setThemeState((prev) => (prev === "dark" ? "light" : "dark"));
  }, []);

  const value = useMemo(
    () => ({ theme, setTheme, toggleTheme, ready }),
    [theme, setTheme, toggleTheme, ready],
  );

  return (
    <ParloThemeContext.Provider value={value}>
      <div className={`parlo min-h-screen antialiased ${theme === "dark" ? "dark" : "light"}`}>
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
