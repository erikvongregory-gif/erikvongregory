"use client";

import { useState } from "react";
import { CloseBtn } from "@/components/free-trial-demo/CloseBtn";
import styles from "@/components/free-trial-demo/free-trial-demo.module.css";
import { SITE } from "@/lib/siteConfig";
import {
  DEMO_BEER_STYLES,
  DEMO_FUNNEL_COLORS,
  normalizeBreweryName,
  type DemoBeerStyleId,
  type DemoProfile,
} from "@/lib/freeTrialDemo";

type StepProfileProps = {
  initial: DemoProfile | null;
  onSubmit: (profile: DemoProfile) => void;
  onClose: () => void;
};

export function StepProfile({ initial, onSubmit, onClose }: StepProfileProps) {
  const [name, setName] = useState(initial?.breweryName ?? "");
  const [styleId, setStyleId] = useState<DemoBeerStyleId>(initial?.beerStyleId ?? "weizen");
  const ready = normalizeBreweryName(name).length >= 2;

  return (
    <form
      className={styles.stepWrap}
      onSubmit={(event) => {
        event.preventDefault();
        if (!ready) return;
        onSubmit({ breweryName: normalizeBreweryName(name), beerStyleId: styleId });
      }}
      style={{ padding: "26px 26px 26px" }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: 22,
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
            {SITE.name.toUpperCase()} · DEMO
          </div>
          <h2
            id="free-trial-demo-title"
            className={styles.heading}
            style={{
              fontWeight: 800,
              fontSize: 26,
              color: DEMO_FUNNEL_COLORS.text,
              lineHeight: 1.1,
              marginBottom: 8,
            }}
          >
            Für welche Brauerei?
          </h2>
          <p style={{ fontSize: 14, color: DEMO_FUNNEL_COLORS.muted, lineHeight: 1.5 }}>
            Zwei Angaben — dann stimmen wir Motiv und Look auf dich ab.
          </p>
        </div>
        <CloseBtn onClick={onClose} />
      </div>

      <label
        htmlFor="demo-brewery-name"
        style={{
          display: "block",
          fontSize: 11,
          fontWeight: 600,
          letterSpacing: "1.4px",
          textTransform: "uppercase",
          color: DEMO_FUNNEL_COLORS.dim,
          marginBottom: 8,
        }}
      >
        Name deiner Brauerei
      </label>
      <input
        id="demo-brewery-name"
        type="text"
        autoComplete="organization"
        autoFocus
        maxLength={40}
        value={name}
        onChange={(event) => setName(event.target.value)}
        placeholder="z. B. Hopfenbräu"
        style={{
          width: "100%",
          minHeight: 48,
          borderRadius: 11,
          border: `1px solid ${DEMO_FUNNEL_COLORS.border}`,
          background: "rgba(244,240,232,0.05)",
          color: DEMO_FUNNEL_COLORS.text,
          fontSize: 16,
          padding: "12px 14px",
          outline: "none",
          marginBottom: 22,
        }}
      />

      <div
        style={{
          fontSize: 11,
          fontWeight: 600,
          letterSpacing: "1.4px",
          textTransform: "uppercase",
          color: DEMO_FUNNEL_COLORS.dim,
          marginBottom: 8,
        }}
      >
        Biersorte
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 8,
          marginBottom: 24,
        }}
      >
        {DEMO_BEER_STYLES.map((style) => {
          const active = style.id === styleId;
          return (
            <button
              key={style.id}
              type="button"
              onClick={() => setStyleId(style.id)}
              style={{
                minHeight: 44,
                borderRadius: 11,
                border: `1px solid ${active ? DEMO_FUNNEL_COLORS.borderHover : DEMO_FUNNEL_COLORS.border}`,
                background: active ? "rgba(212,162,76,0.14)" : "rgba(244,240,232,0.04)",
                color: active ? DEMO_FUNNEL_COLORS.amber : DEMO_FUNNEL_COLORS.text,
                fontSize: 14,
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              {style.label}
            </button>
          );
        })}
      </div>

      <button
        type="submit"
        disabled={!ready}
        className={ready ? styles.primaryCta : undefined}
        style={{
          width: "100%",
          minHeight: 48,
          border: "none",
          borderRadius: 11,
          background: ready ? DEMO_FUNNEL_COLORS.orange : "rgba(244,240,232,0.08)",
          color: ready ? "#fff" : DEMO_FUNNEL_COLORS.dim,
          fontSize: 15,
          fontWeight: 600,
          cursor: ready ? "pointer" : "not-allowed",
        }}
      >
        Motiv wählen →
      </button>
    </form>
  );
}
