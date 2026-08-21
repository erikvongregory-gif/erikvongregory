"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import dynamic from "next/dynamic";
import { getRemainingDemos, isDemoExhausted, readDemoStorage } from "@/lib/freeTrialDemo";

const FreeTrialDemoModal = dynamic(
  () =>
    import("@/components/free-trial-demo/FreeTrialDemoModal").then((m) => m.FreeTrialDemoModal),
  { ssr: false },
);

type FreeTrialDemoContextValue = {
  open: () => void;
  close: () => void;
  isOpen: boolean;
  remaining: number;
  isExhausted: boolean;
};

const FreeTrialDemoContext = createContext<FreeTrialDemoContextValue | null>(null);

export function FreeTrialDemoProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [remaining, setRemaining] = useState(FREE_TRIAL_DEMO_MAX_FALLBACK);
  const [isExhausted, setIsExhausted] = useState(false);

  const refresh = useCallback(() => {
    const storage = readDemoStorage();
    setRemaining(getRemainingDemos(storage));
    setIsExhausted(isDemoExhausted(storage));
  }, []);

  useEffect(() => {
    refresh();
    const onStorage = (event: StorageEvent) => {
      if (event.key === null || event.key === "evglab_demo_sessions") refresh();
    };
    const onCustom = () => refresh();
    window.addEventListener("storage", onStorage);
    window.addEventListener("evglab-demo-sessions-changed", onCustom);
    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("evglab-demo-sessions-changed", onCustom);
    };
  }, [refresh]);

  /** Nach Browser-Zurück aus externer App (bfcache): Modal schließen, Scroll lock lösen. */
  useEffect(() => {
    const resetShell = () => {
      setIsOpen(false);
      document.body.style.overflow = "";
    };

    const onPageShow = (event: PageTransitionEvent) => {
      if (!event.persisted) return;
      resetShell();

      requestAnimationFrame(() => {
        if (window.location.pathname !== "/") return;
        const isDesktop = window.matchMedia("(min-width: 1024px)").matches;
        const slot = document.getElementById(isDesktop ? "desktop-content" : "mobile-content");
        if (slot && slot.childElementCount === 0) {
          window.location.reload();
        }
      });
    };

    const onPageHide = () => {
      document.body.style.overflow = "";
    };

    window.addEventListener("pageshow", onPageShow);
    window.addEventListener("pagehide", onPageHide);
    return () => {
      window.removeEventListener("pageshow", onPageShow);
      window.removeEventListener("pagehide", onPageHide);
    };
  }, []);

  const open = useCallback(() => {
    refresh();
    setIsOpen(true);
  }, [refresh]);

  const close = useCallback(() => {
    setIsOpen(false);
  }, []);

  const value = useMemo(
    () => ({ open, close, isOpen, remaining, isExhausted }),
    [open, close, isOpen, remaining, isExhausted],
  );

  return (
    <FreeTrialDemoContext.Provider value={value}>
      {children}
      {isOpen ? (
        <FreeTrialDemoModal
          isOpen={isOpen}
          onClose={close}
          remaining={remaining}
          isExhausted={isExhausted}
          onSessionRecorded={refresh}
        />
      ) : null}
    </FreeTrialDemoContext.Provider>
  );
}

const FREE_TRIAL_DEMO_MAX_FALLBACK = 3;

export function useFreeTrialDemo(): FreeTrialDemoContextValue {
  const context = useContext(FreeTrialDemoContext);
  if (!context) {
    throw new Error("useFreeTrialDemo must be used within FreeTrialDemoProvider");
  }
  return context;
}
