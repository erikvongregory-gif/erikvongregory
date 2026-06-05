"use client";

import styles from "@/components/free-trial-demo/free-trial-demo.module.css";
import { DEMO_FUNNEL_COLORS, GENERATION_STATUS_MESSAGES, type DemoMotif } from "@/lib/freeTrialDemo";

type StepLoadingProps = {
  progress: number;
  statusIndex: number;
  motif: DemoMotif;
};

export function StepLoading({ progress, statusIndex, motif }: StepLoadingProps) {
  const pct = Math.round(progress);
  const message = GENERATION_STATUS_MESSAGES[statusIndex % GENERATION_STATUS_MESSAGES.length];

  return (
    <div
      className={styles.stepWrap}
      style={{
        padding: "50px 32px 40px",
        minHeight: 380,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 32,
        textAlign: "center",
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
            marginBottom: 14,
          }}
        >
          GENERIERUNG LÄUFT
        </div>
        <div
          className={styles.heading}
          style={{
            fontWeight: 800,
            fontSize: 27,
            color: DEMO_FUNNEL_COLORS.text,
            marginBottom: 10,
          }}
        >
          Dein Motiv entsteht
        </div>
        <div
          className={styles.statusText}
          style={{ fontSize: 14, color: DEMO_FUNNEL_COLORS.muted, minHeight: 22 }}
        >
          {message}
        </div>
      </div>

      <div className={styles.heading} style={{ fontWeight: 800, lineHeight: 1 }}>
        <span style={{ fontSize: 72, color: DEMO_FUNNEL_COLORS.text }}>{pct}</span>
        <span style={{ fontSize: 26, color: DEMO_FUNNEL_COLORS.muted, fontWeight: 700 }}>%</span>
      </div>

      <div style={{ width: "100%" }}>
        <div
          style={{
            height: 2,
            background: "rgba(244,240,232,0.1)",
            borderRadius: 2,
            overflow: "hidden",
            marginBottom: 10,
          }}
        >
          <div
            className={styles.progressFill}
            role="progressbar"
            aria-valuenow={pct}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label="Generierungsfortschritt"
            style={{
              height: "100%",
              width: `${progress}%`,
              borderRadius: 2,
              transition: "width 0.06s linear",
            }}
          />
        </div>
        <div style={{ fontSize: 12, color: DEMO_FUNNEL_COLORS.dim }}>
          {motif.tag} · {motif.title}
        </div>
      </div>

      <div
        style={{
          fontSize: 12,
          color: "rgba(244,240,232,0.3)",
          lineHeight: 1.7,
          padding: "14px 20px",
          background: "rgba(244,240,232,0.04)",
          borderRadius: 10,
          border: `1px solid ${DEMO_FUNNEL_COLORS.border}`,
          width: "100%",
        }}
      >
        In der echten App dauert das rund 40 Sekunden —
        <br />
        genauso realistisch wie eine echte Generierung.
      </div>
    </div>
  );
}
