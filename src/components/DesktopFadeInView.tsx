"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

type DesktopFadeInViewProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  rootMargin?: string;
  /** Bei true: sichtbar zurücksetzen wenn aus dem Viewport – Animation spielt beim erneuten Einblenden wieder */
  resetOnExit?: boolean;
};

/** Blendet Kinder ein, sobald sie in den Viewport kommen (nur Desktop) */
export function DesktopFadeInView({
  children,
  className = "",
  delay = 0,
  rootMargin = "0px 0px -80px 0px",
  resetOnExit = false,
}: DesktopFadeInViewProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const isDesktop = () => window.innerWidth >= 768;
    if (!isDesktop()) {
      setVisible(true);
      return;
    }

    let timeoutId = 0;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          timeoutId = window.setTimeout(() => {
            setVisible(true);
            if (!resetOnExit) obs.disconnect();
          }, delay);
        } else if (resetOnExit) {
          if (timeoutId) clearTimeout(timeoutId);
          setVisible(false);
        }
      },
      { threshold: 0.08, rootMargin }
    );
    obs.observe(el);
    return () => {
      obs.disconnect();
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [delay, rootMargin, resetOnExit]);

  return (
    <div
      ref={ref}
      className={`desktop-fade-in-view ${visible ? "desktop-fade-in-view--visible" : ""} ${className}`}
    >
      {children}
    </div>
  );
}
