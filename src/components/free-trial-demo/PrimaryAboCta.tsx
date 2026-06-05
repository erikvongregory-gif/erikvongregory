"use client";

import { useState } from "react";
import styles from "@/components/free-trial-demo/free-trial-demo.module.css";
import { useFreeTrialDemo } from "@/context/FreeTrialDemoContext";
import { APP_REGISTER_URL } from "@/lib/appLoginUrl";
import { DEMO_FUNNEL_COLORS } from "@/lib/freeTrialDemo";

type PrimaryAboCtaProps = {
  label?: string;
};

function leaveForRegister(close: () => void) {
  close();
  document.body.style.overflow = "";
  window.requestAnimationFrame(() => {
    window.location.assign(APP_REGISTER_URL);
  });
}

export function PrimaryAboCta({ label = "Jetzt Abo abschließen" }: PrimaryAboCtaProps) {
  const { close } = useFreeTrialDemo();
  const [hovered, setHovered] = useState(false);

  return (
    <button
      type="button"
      className={styles.primaryCta}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => leaveForRegister(close)}
      style={{
        background: DEMO_FUNNEL_COLORS.orange,
        border: "none",
        color: "#fff",
        padding: "15px 20px",
        borderRadius: 11,
        fontSize: 15,
        fontWeight: 600,
        cursor: "pointer",
        letterSpacing: "0.15px",
        transform: hovered ? "translateY(-1px)" : "none",
        transition: "transform 0.12s ease",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
        minHeight: 44,
        width: "100%",
      }}
    >
      <span>{label}</span>
      <span style={{ fontSize: 16, opacity: 0.85, lineHeight: 1 }} aria-hidden>
        →
      </span>
      <span
        style={{
          display: "inline-flex",
          alignItems: "center",
          padding: "4px 9px",
          borderRadius: 6,
          background: "rgba(15,14,9,0.42)",
          border: `1px solid rgba(212,162,76,0.45)`,
          color: DEMO_FUNNEL_COLORS.amber,
          fontSize: 10,
          fontWeight: 700,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          lineHeight: 1,
          boxShadow: "inset 0 1px 0 rgba(255,255,255,0.06)",
        }}
      >
        30&nbsp;% OFF
      </span>
    </button>
  );
}
