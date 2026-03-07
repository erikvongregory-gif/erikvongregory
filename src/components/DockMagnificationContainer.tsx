"use client";

import { useRef, useCallback } from "react";

const MAX_SCALE = 1.12; /* dezenter Effekt */
const DOCK_BUTTON_SELECTOR = "[data-dock-button]";

type DockMagnificationContainerProps = {
  children: React.ReactNode;
  className?: string;
};

export function DockMagnificationContainer({
  children,
  className = "",
}: DockMagnificationContainerProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const applyScale = useCallback(
    (clientX: number, clientY: number, useTransition: boolean) => {
      const container = containerRef.current;
      if (!container) return;

      const buttons = container.querySelectorAll<HTMLElement>(DOCK_BUTTON_SELECTOR);
      buttons.forEach((btn) => {
        btn.style.transition = useTransition
          ? "transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)"
          : "none";

        if (!useTransition) {
          const rect = btn.getBoundingClientRect();
          const isOver = clientX >= rect.left && clientX <= rect.right && clientY >= rect.top && clientY <= rect.bottom;
          btn.style.transform = isOver ? `scale(${MAX_SCALE})` : "scale(1)";
        } else {
          btn.style.transform = "scale(1)";
        }
      });
    },
    []
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      applyScale(e.clientX, e.clientY, false);
    },
    [applyScale]
  );

  const handleMouseLeave = useCallback(() => {
    applyScale(0, 0, true);
  }, [applyScale]);

  return (
    <div
      ref={containerRef}
      className={`inline-flex items-end justify-center gap-2 ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </div>
  );
}
