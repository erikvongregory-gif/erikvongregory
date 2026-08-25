"use client";

import { useState } from "react";
import { CloseBtn } from "@/components/free-trial-demo/CloseBtn";
import { MotifIcon } from "@/components/free-trial-demo/MotifIcon";
import styles from "@/components/free-trial-demo/free-trial-demo.module.css";
import { DEMO_FUNNEL_COLORS, DEMO_MOTIFS, type DemoMotif, type DemoMotifId } from "@/lib/freeTrialDemo";
import { SITE } from "@/lib/siteConfig";

type StepPickProps = {
  remaining: number;
  total: number;
  usedIds: readonly DemoMotifId[];
  breweryName: string;
  onSelect: (id: DemoMotifId) => void;
  onClose: () => void;
};

export function StepPick({ remaining, total, usedIds, breweryName, onSelect, onClose }: StepPickProps) {
  const [hoveredId, setHoveredId] = useState<DemoMotifId | null>(null);
  const used = total - remaining;

  return (
    <div className={styles.stepWrap}>
      <div style={{ padding: "26px 26px 0" }}>
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
              Motiv für {breweryName}
            </h2>
            <p style={{ fontSize: 14, color: DEMO_FUNNEL_COLORS.muted, lineHeight: 1.5 }}>
              Klick auf eine Szene — wir generieren sie in deinem Look.
            </p>
          </div>
          <CloseBtn onClick={onClose} />
        </div>

        <div style={{ display: "flex", gap: 5, marginBottom: 8 }}>
          {Array.from({ length: total }).map((_, index) => (
            <div
              key={index}
              style={{
                flex: 1,
                height: 3,
                borderRadius: 2,
                background: index < used ? DEMO_FUNNEL_COLORS.amber : "rgba(244,240,232,0.1)",
                transition: "background 0.5s ease",
              }}
            />
          ))}
        </div>
        <div style={{ fontSize: 11, color: DEMO_FUNNEL_COLORS.dim, marginBottom: 20 }}>
          Noch {remaining} von {total} kostenlosen Bildern
        </div>
      </div>

      <div
        style={{
          padding: "0 26px 26px",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 10,
        }}
      >
        {DEMO_MOTIFS.map((motif) => (
          <MotifCard
            key={motif.id}
            motif={motif}
            used={usedIds.includes(motif.id)}
            hovered={hoveredId === motif.id}
            onHover={setHoveredId}
            onSelect={onSelect}
          />
        ))}
      </div>
    </div>
  );
}

function MotifCard({
  motif,
  used,
  hovered,
  onHover,
  onSelect,
}: {
  motif: DemoMotif;
  used: boolean;
  hovered: boolean;
  onHover: (id: DemoMotifId | null) => void;
  onSelect: (id: DemoMotifId) => void;
}) {
  const lift = hovered && !used;
  return (
    <button
      type="button"
      disabled={used}
      onClick={() => {
        if (!used) onSelect(motif.id);
      }}
      onMouseEnter={() => onHover(motif.id)}
      onMouseLeave={() => onHover(null)}
      style={{
        background: lift ? DEMO_FUNNEL_COLORS.surfaceHover : DEMO_FUNNEL_COLORS.surface,
        border: `1px solid ${lift ? DEMO_FUNNEL_COLORS.borderHover : DEMO_FUNNEL_COLORS.border}`,
        borderRadius: 13,
        padding: 0,
        cursor: used ? "default" : "pointer",
        overflow: "hidden",
        textAlign: "left",
        opacity: used ? 0.48 : 1,
        transition:
          "transform 0.15s ease, border-color 0.15s ease, box-shadow 0.15s ease, background 0.15s ease",
        transform: lift ? "translateY(-3px)" : "none",
        boxShadow: lift ? "0 10px 28px rgba(0,0,0,0.45)" : "0 2px 6px rgba(0,0,0,0.2)",
        minHeight: 44,
      }}
    >
      <div
        style={{
          aspectRatio: "16/9",
          position: "relative",
          background: motif.gradient,
          overflow: "hidden",
        }}
      >
        <svg className={styles.grain} xmlns="http://www.w3.org/2000/svg" aria-hidden>
          <filter id={`grain-${motif.id}`}>
            <feTurbulence type="fractalNoise" baseFrequency="0.75" numOctaves={4} stitchTiles="stitch" />
          </filter>
          <rect width="100%" height="100%" filter={`url(#grain-${motif.id})`} />
        </svg>
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            opacity: 0.3,
            color: DEMO_FUNNEL_COLORS.text,
            transform: lift ? "scale(1.1)" : "scale(1)",
            transition: "transform 0.35s ease",
          }}
        >
          <MotifIcon icon={motif.icon} />
        </div>
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to top, rgba(0,0,0,0.45) 0%, transparent 55%)",
          }}
          aria-hidden
        />
        {used ? (
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "rgba(23,22,14,0.45)",
              fontSize: 10,
              fontWeight: 600,
              letterSpacing: "1.6px",
              textTransform: "uppercase",
              color: DEMO_FUNNEL_COLORS.amber,
            }}
          >
            Bereits generiert
          </div>
        ) : null}
      </div>

      <div style={{ padding: "11px 13px 14px" }}>
        <div
          style={{
            fontSize: 9,
            fontWeight: 600,
            letterSpacing: "1.8px",
            textTransform: "uppercase",
            color: DEMO_FUNNEL_COLORS.orange,
            marginBottom: 5,
          }}
        >
          {motif.tag}
        </div>
        <div
          className={styles.heading}
          style={{
            fontSize: 13,
            fontWeight: 700,
            color: DEMO_FUNNEL_COLORS.text,
            lineHeight: 1.25,
            marginBottom: 3,
          }}
        >
          {motif.title}
        </div>
        <div style={{ fontSize: 11, color: DEMO_FUNNEL_COLORS.muted, lineHeight: 1.35 }}>
          {motif.description}
        </div>
      </div>
    </button>
  );
}
