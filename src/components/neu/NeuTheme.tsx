"use client";

import * as React from "react";

export type NeuTheme = "dark" | "light";

const STORAGE_KEY = "neu-theme";

type NeuThemeContextValue = {
  theme: NeuTheme;
  setTheme: (theme: NeuTheme) => void;
  toggleTheme: () => void;
};

const NeuThemeContext = React.createContext<NeuThemeContextValue | null>(null);

function readStoredTheme(): NeuTheme {
  if (typeof window === "undefined") return "dark";
  const stored = window.localStorage.getItem(STORAGE_KEY);
  return stored === "light" ? "light" : "dark";
}

export function NeuThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = React.useState<NeuTheme>("dark");
  const [ready, setReady] = React.useState(false);

  React.useEffect(() => {
    setThemeState(readStoredTheme());
    setReady(true);
  }, []);

  const setTheme = React.useCallback((next: NeuTheme) => {
    setThemeState(next);
    window.localStorage.setItem(STORAGE_KEY, next);
  }, []);

  const toggleTheme = React.useCallback(() => {
    setThemeState((prev) => {
      const next = prev === "dark" ? "light" : "dark";
      window.localStorage.setItem(STORAGE_KEY, next);
      return next;
    });
  }, []);

  const value = React.useMemo(
    () => ({ theme, setTheme, toggleTheme }),
    [theme, setTheme, toggleTheme],
  );

  return (
    <NeuThemeContext.Provider value={value}>
      <div data-neu-theme={theme} className={ready ? undefined : "neu-theme-pending"}>
        {children}
      </div>
    </NeuThemeContext.Provider>
  );
}

export function useNeuTheme() {
  const ctx = React.useContext(NeuThemeContext);
  if (!ctx) {
    throw new Error("useNeuTheme must be used within NeuThemeProvider");
  }
  return ctx;
}
