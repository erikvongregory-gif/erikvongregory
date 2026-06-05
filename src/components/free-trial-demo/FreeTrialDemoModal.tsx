"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { demoFontClassName } from "@/components/free-trial-demo/fonts";
import styles from "@/components/free-trial-demo/free-trial-demo.module.css";
import { StepExhausted } from "@/components/free-trial-demo/StepExhausted";
import { StepLoading } from "@/components/free-trial-demo/StepLoading";
import { StepPick } from "@/components/free-trial-demo/StepPick";
import { StepResult } from "@/components/free-trial-demo/StepResult";
import {
  DEMO_FUNNEL_COLORS,
  FREE_TRIAL_DEMO_MAX,
  FREE_TRIAL_GENERATION_MS,
  GENERATION_STATUS_MESSAGES,
  getDemoMotif,
  getRemainingDemos,
  readDemoStorage,
  recordDemoSession,
  type DemoMotifId,
} from "@/lib/freeTrialDemo";

type DemoPhase = "selection" | "generating" | "result" | "exhausted";

type FreeTrialDemoModalProps = {
  isOpen: boolean;
  onClose: () => void;
  remaining: number;
  isExhausted: boolean;
  onSessionRecorded: () => void;
};

export function FreeTrialDemoModal({
  isOpen,
  onClose,
  remaining,
  isExhausted,
  onSessionRecorded,
}: FreeTrialDemoModalProps) {
  const [phase, setPhase] = useState<DemoPhase>("selection");
  const [selectedMotifId, setSelectedMotifId] = useState<DemoMotifId | null>(null);
  const [progress, setProgress] = useState(0);
  const [statusIndex, setStatusIndex] = useState(0);
  const [sessionRecorded, setSessionRecorded] = useState(false);
  const generationStartRef = useRef<number | null>(null);
  const rafRef = useRef<number | null>(null);
  const wasOpenRef = useRef(false);

  const resetState = useCallback(() => {
    setPhase("selection");
    setSelectedMotifId(null);
    setProgress(0);
    setStatusIndex(0);
    setSessionRecorded(false);
    generationStartRef.current = null;
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
  }, []);

  useEffect(() => {
    if (isOpen && !wasOpenRef.current) {
      setPhase(isExhausted ? "exhausted" : "selection");
      setSelectedMotifId(null);
      setProgress(0);
      setStatusIndex(0);
      setSessionRecorded(false);
      generationStartRef.current = null;
    }

    if (!isOpen && wasOpenRef.current) {
      const timeout = window.setTimeout(resetState, 280);
      wasOpenRef.current = isOpen;
      return () => window.clearTimeout(timeout);
    }

    wasOpenRef.current = isOpen;
  }, [isOpen, isExhausted, resetState]);

  const closable = phase !== "generating";

  useEffect(() => {
    if (!isOpen) {
      document.body.style.overflow = "";
      return;
    }
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen || !closable) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen, closable, onClose]);

  useEffect(() => {
    if (phase !== "generating") return;

    generationStartRef.current = performance.now();
    setProgress(0);
    setStatusIndex(0);

    const tick = (now: number) => {
      const start = generationStartRef.current ?? now;
      const elapsed = now - start;
      const nextProgress = Math.min(100, (elapsed / FREE_TRIAL_GENERATION_MS) * 100);
      setProgress(nextProgress);
      setStatusIndex(
        Math.min(
          GENERATION_STATUS_MESSAGES.length - 1,
          Math.floor((elapsed / FREE_TRIAL_GENERATION_MS) * GENERATION_STATUS_MESSAGES.length),
        ),
      );

      if (elapsed >= FREE_TRIAL_GENERATION_MS) {
        if (selectedMotifId && !sessionRecorded) {
          recordDemoSession(selectedMotifId);
          setSessionRecorded(true);
          onSessionRecorded();
        }
        window.setTimeout(() => setPhase("result"), 400);
        return;
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [phase, selectedMotifId, sessionRecorded, onSessionRecorded]);

  const handleSelectMotif = (motifId: DemoMotifId) => {
    if (isExhausted) return;
    setSelectedMotifId(motifId);
    window.setTimeout(() => setPhase("generating"), 60);
  };

  const handleTryAnother = () => {
    const remainingAfter = getRemainingDemos(readDemoStorage());
    if (remainingAfter <= 0) {
      setPhase("exhausted");
      return;
    }
    setPhase("selection");
    setSelectedMotifId(null);
    setProgress(0);
    setStatusIndex(0);
    setSessionRecorded(false);
  };

  const selectedMotif = selectedMotifId ? getDemoMotif(selectedMotifId) : null;
  const remainingAfterResult = getRemainingDemos(readDemoStorage());

  if (!isOpen) return null;

  return (
    <div
      className={`${styles.root} ${demoFontClassName}`}
      onClick={(event) => {
        if (closable && event.target === event.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="free-trial-demo-title"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background: "rgba(0,0,0,0.72)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 16,
      }}
    >
      <div
        onClick={(event) => event.stopPropagation()}
        style={{
          background: DEMO_FUNNEL_COLORS.bg,
          borderRadius: 20,
          width: "100%",
          maxWidth: 476,
          maxHeight: "90vh",
          overflowY: "auto",
          border: `1px solid ${DEMO_FUNNEL_COLORS.border}`,
          boxShadow: "0 36px 80px rgba(0,0,0,0.75), 0 0 0 1px rgba(244,240,232,0.03)",
        }}
      >
        {phase === "selection" ? (
          <StepPick
            remaining={remaining}
            total={FREE_TRIAL_DEMO_MAX}
            onSelect={handleSelectMotif}
            onClose={onClose}
          />
        ) : null}

        {phase === "generating" && selectedMotif ? (
          <StepLoading progress={progress} statusIndex={statusIndex} motif={selectedMotif} />
        ) : null}

        {phase === "result" && selectedMotif ? (
          <StepResult
            motif={selectedMotif}
            remaining={remainingAfterResult}
            onTryAgain={handleTryAnother}
            onClose={onClose}
          />
        ) : null}

        {phase === "exhausted" ? <StepExhausted onClose={onClose} /> : null}
      </div>
    </div>
  );
}
