"use client";

import { useState } from "react";
import { DEMO_FUNNEL_COLORS } from "@/lib/freeTrialDemo";

type CloseBtnProps = {
  onClick: () => void;
  dark?: boolean;
};

export function CloseBtn({ onClick, dark = false }: CloseBtnProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <button
      type="button"
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      aria-label="Schließen"
      style={{
        background: dark
          ? hovered
            ? "rgba(0,0,0,0.55)"
            : "rgba(0,0,0,0.35)"
          : hovered
            ? "rgba(244,240,232,0.12)"
            : "rgba(244,240,232,0.06)",
        border: dark ? "1px solid rgba(255,255,255,0.18)" : `1px solid ${DEMO_FUNNEL_COLORS.border}`,
        color: dark ? "rgba(255,255,255,0.75)" : DEMO_FUNNEL_COLORS.dim,
        width: 30,
        height: 30,
        borderRadius: 8,
        cursor: "pointer",
        fontSize: 18,
        lineHeight: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
        transition: "background 0.15s ease",
      }}
    >
      ×
    </button>
  );
}
