"use client";

import styles from "@/components/free-trial-demo/free-trial-demo.module.css";
import {
  DEMO_FUNNEL_COLORS,
  buildDemoPrompt,
  generationStatusFor,
  getBeerStyle,
  type DemoMotif,
  type DemoProfile,
} from "@/lib/freeTrialDemo";

type StepLoadingProps = {
  progress: number;
  statusIndex: number;
  motif: DemoMotif;
  profile: DemoProfile;
};

export function StepLoading({ progress, statusIndex, motif, profile }: StepLoadingProps) {
  const pct = Math.round(progress);
  const messages = generationStatusFor(profile, motif);
  const message = messages[statusIndex % messages.length];
  const prompt = buildDemoPrompt(profile, motif);
  const typed = prompt.slice(0, Math.max(1, Math.floor((progress / 100) * prompt.length)));
  const style = getBeerStyle(profile.beerStyleId);

  return (
    <div
      className={styles.stepWrap}
      style={{
        padding: "44px 28px 36px",
        minHeight: 380,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 26,
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
          GENERIERUNG FÜR {profile.breweryName.toUpperCase()}
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
        <div style={{ fontSize: 12, color: DEMO_FUNNEL_COLORS.dim, marginBottom: 14 }}>
          {style.label} · {motif.title}
        </div>
        <div className={styles.promptBox}>
          <div className={styles.promptLabel}>Prompt</div>
          <div className={styles.promptText}>
            {typed}
            <span className={styles.promptCaret} aria-hidden>
              |
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
