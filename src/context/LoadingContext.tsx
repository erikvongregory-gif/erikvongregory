"use client";

import { createContext, useCallback, useContext, useState } from "react";

type LoadingContextValue = {
  isLoadComplete: boolean;
  setLoadComplete: () => void;
};

const LoadingContext = createContext<LoadingContextValue | null>(null);

export function LoadingProvider({ children }: { children: React.ReactNode }) {
  const [isLoadComplete, setIsLoadComplete] = useState(false);

  const setLoadComplete = useCallback(() => {
    setIsLoadComplete(true);
  }, []);

  return (
    <LoadingContext.Provider value={{ isLoadComplete, setLoadComplete }}>
      {children}
    </LoadingContext.Provider>
  );
}

export function useLoading() {
  const ctx = useContext(LoadingContext);
  return ctx ?? { isLoadComplete: true, setLoadComplete: () => {} };
}
