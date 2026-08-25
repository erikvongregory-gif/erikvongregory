"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { CloseBtn } from "@/components/free-trial-demo/CloseBtn";
import { PrimaryAboCta } from "@/components/free-trial-demo/PrimaryAboCta";
import styles from "@/components/free-trial-demo/free-trial-demo.module.css";
import { APP_LOGIN_URL } from "@/lib/appLoginUrl";
import {
  DEMO_FUNNEL_COLORS,
  demoVariantCode,
  getBeerStyle,
  type DemoMotif,
  type DemoProfile,
} from "@/lib/freeTrialDemo";

type StepResultProps = {
  motif: DemoMotif;
  profile: DemoProfile;
  remaining: number;
  onTryAgain: () => void;
  onClose: () => void;
};

export function StepResult({ motif, profile, remaining, onTryAgain, onClose }: StepResultProps) {
  const [revealed, setRevealed] = useState(false);
  const [secondaryHovered, setSecondaryHovered] = useState(false);
  const style = getBeerStyle(profile.beerStyleId);
  const variant = demoVariantCode(profile, motif.id);

  useEffect(() => {
    const timer = window.setTimeout(() => setRevealed(true), 80);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <div className={styles.stepWrap}>
      <div style={{ position: "relative", overflow: "hidden" }}>
        <Image
          src={motif.resultImage}
          alt={`${profile.breweryName} · ${motif.resultAlt}`}
          width={952}
          height={714}
          className={`${styles.resultImage} block h-auto w-full object-cover ${revealed ? styles.resultImageRevealed : ""}`}
          style={{ aspectRatio: "4/3" }}
          priority
        />

        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            background: "linear-gradient(to bottom, rgba(0,0,0,0.65) 0%, transparent 100%)",
            padding: "14px 16px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
            <div
              style={{
                width: 18,
                height: 18,
                borderRadius: "50%",
                background: DEMO_FUNNEL_COLORS.amber,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 9,
                color: "#0f0e09",
                fontWeight: 700,
              }}
            >
              ✓
            </div>
            <span
              style={{
                fontSize: 10,
                fontWeight: 600,
                letterSpacing: "2px",
                textTransform: "uppercase",
                color: DEMO_FUNNEL_COLORS.amber,
              }}
            >
              FERTIG
            </span>
          </div>
          <CloseBtn onClick={onClose} dark />
        </div>

        <div className={`${styles.resultBrand} ${revealed ? styles.resultBrandRevealed : ""}`}>
          <div className={styles.resultBrandKicker}>Erstellt für</div>
          <div className={`${styles.heading} ${styles.resultBrandName}`}>{profile.breweryName}</div>
          <div className={styles.resultBrandMeta}>
            {style.label} · {motif.tag} · Variante {variant}
          </div>
        </div>
      </div>

      <div style={{ padding: "22px 24px 26px" }}>
        <h2
          className={styles.heading}
          style={{
            fontWeight: 800,
            fontSize: 22,
            color: DEMO_FUNNEL_COLORS.text,
            marginBottom: 7,
          }}
        >
          {profile.breweryName} · {motif.title.split("·")[0].trim()}
        </h2>
        <p
          style={{
            fontSize: 14,
            color: DEMO_FUNNEL_COLORS.muted,
            lineHeight: 1.6,
            marginBottom: 22,
          }}
        >
          Dein {style.label}-Look auf diesem Motiv. Mit Markenprofil sitzt als Nächstes dein echtes
          Etikett auf der Flasche.
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <PrimaryAboCta />

          {remaining > 0 ? (
            <button
              type="button"
              onClick={onTryAgain}
              onMouseEnter={() => setSecondaryHovered(true)}
              onMouseLeave={() => setSecondaryHovered(false)}
              style={{
                background: secondaryHovered ? "rgba(244,240,232,0.09)" : "rgba(244,240,232,0.05)",
                border: `1px solid ${secondaryHovered ? "rgba(244,240,232,0.18)" : DEMO_FUNNEL_COLORS.border}`,
                color: DEMO_FUNNEL_COLORS.text,
                padding: "13px 24px",
                borderRadius: 11,
                fontSize: 14,
                fontWeight: 500,
                cursor: "pointer",
                transition: "all 0.15s ease",
                minHeight: 44,
              }}
            >
              Noch {remaining} Demo-Bild{remaining !== 1 ? "er" : ""} für {profile.breweryName} testen
            </button>
          ) : null}

          <a
            href={APP_LOGIN_URL}
            style={{
              background: "none",
              border: "none",
              color: DEMO_FUNNEL_COLORS.dim,
              fontSize: 13,
              cursor: "pointer",
              padding: "5px 0",
              transition: "color 0.15s ease",
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
    </div>
  );
}
