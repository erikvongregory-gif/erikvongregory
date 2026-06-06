"use client";

import { useState } from "react";
import styles from "@/components/free-trial-demo/free-trial-demo.module.css";
import { useFreeTrialDemo } from "@/context/FreeTrialDemoContext";
import { APP_REGISTER_URL } from "@/lib/appLoginUrl";
import { DEMO_FUNNEL_COLORS, DEMO_FUNNEL_SAVINGS_BADGE, DEMO_FUNNEL_SAVINGS_HINT } from "@/lib/freeTrialDemo";
import { navigateToPricingWerkstatt } from "@/lib/pricingDeepLink";

type PrimaryAboCtaProps = {
  label?: string;
  destination?: "register" | "pricing-werkstatt";
};

function leaveForRegister(close: () => void) {
  close();
  document.body.style.overflow = "";
  window.requestAnimationFrame(() => {
    window.location.assign(APP_REGISTER_URL);
  });
}

export function PrimaryAboCta({
  label = "Jetzt Abo abschließen",
  destination = "register",
}: PrimaryAboCtaProps) {
  const { close } = useFreeTrialDemo();
  const [hovered, setHovered] = useState(false);

  const handleClick = () => {
    if (destination === "pricing-werkstatt") {
      navigateToPricingWerkstatt(close);
      return;
    }
    leaveForRegister(close);
  };

  return (
    <button
      type="button"
      className={styles.primaryCta}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={handleClick}
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
        title={DEMO_FUNNEL_SAVINGS_HINT}
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
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          lineHeight: 1,
          boxShadow: "inset 0 1px 0 rgba(255,255,255,0.06)",
        }}
      >
        {DEMO_FUNNEL_SAVINGS_BADGE}
      </span>
    </button>
  );
}
