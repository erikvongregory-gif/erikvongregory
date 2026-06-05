"use client";

import { CloseBtn } from "@/components/free-trial-demo/CloseBtn";
import { PrimaryAboCta } from "@/components/free-trial-demo/PrimaryAboCta";
import styles from "@/components/free-trial-demo/free-trial-demo.module.css";
import { APP_LOGIN_URL } from "@/lib/appLoginUrl";
import { DEMO_FUNNEL_COLORS } from "@/lib/freeTrialDemo";

type StepExhaustedProps = {
  onClose: () => void;
};

export function StepExhausted({ onClose }: StepExhaustedProps) {
  return (
    <div className={styles.stepWrap} style={{ padding: "26px 26px 30px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: 18,
        }}
      >
        <div>
          <div
            style={{
              fontSize: 10,
              fontWeight: 600,
              letterSpacing: "2.2px",
              textTransform: "uppercase",
              color: DEMO_FUNNEL_COLORS.orange,
              marginBottom: 10,
            }}
          >
            DEMO ABGESCHLOSSEN
          </div>
          <h2
            className={styles.heading}
            style={{
              fontWeight: 800,
              fontSize: 26,
              color: DEMO_FUNNEL_COLORS.text,
              lineHeight: 1.1,
              marginBottom: 8,
            }}
          >
            Alle Demo-Bilder genutzt
          </h2>
          <p style={{ fontSize: 14, color: DEMO_FUNNEL_COLORS.muted, lineHeight: 1.6 }}>
            Du hast alle drei Demo-Motive gesehen. Mit einem Abo generierst du unbegrenzt eigene Motive — in
            deinem Markenlook.
          </p>
        </div>
        <CloseBtn onClick={onClose} />
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 24 }}>
        <PrimaryAboCta label="Abo ansehen" />
        <a
          href="/#preise"
          onClick={onClose}
          style={{
            background: "rgba(244,240,232,0.05)",
            border: `1px solid ${DEMO_FUNNEL_COLORS.border}`,
            color: DEMO_FUNNEL_COLORS.text,
            padding: "13px 24px",
            borderRadius: 11,
            fontSize: 14,
            fontWeight: 500,
            textAlign: "center",
            textDecoration: "none",
            minHeight: 44,
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          Preise auf der Website
        </a>
        <a
          href={APP_LOGIN_URL}
          style={{
            color: DEMO_FUNNEL_COLORS.dim,
            fontSize: 13,
            textAlign: "center",
            textDecoration: "none",
            minHeight: 44,
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          Später — zur App
        </a>
      </div>
    </div>
  );
}
