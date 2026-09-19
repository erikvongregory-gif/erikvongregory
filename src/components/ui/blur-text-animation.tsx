"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export interface BlurTextWordData {
  text: string;
  duration: number;
  delay: number;
  blur: number;
  scale?: number;
  wordClassName?: string;
}

type Tone = "onDark" | "onLight";

/** Gesamt tempo für Blur-/Staffel-Animation (niedriger = schneller). */
const WORD_DURATION_BASE = 0.42;
const WORD_DURATION_JITTER = 0.1;
const STAGGER_PER_WORD = 0.02;
const STAGGER_EXP_WEIGHT = 0.16;
const STAGGER_MICRO = 0.004;

/** SSR und Browser können bei sin/cos minimal abweichen — runden für identische style-Strings. */
function stableFloat(n: number, decimals = 4): number {
  const p = 10 ** decimals;
  return Math.round(n * p) / p;
}

function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => {
      queueMicrotask(() => setReduced(mq.matches));
    };
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);
  return reduced;
}

function buildWordsFromText(text: string, startIndex: number, tone: Tone): BlurTextWordData[] {
  // Nur normale Spaces — NBSP hält Wortpaare zusammen (z. B. „jedes Bild.“)
  const splitWords = text.trim().split(/ +/).filter(Boolean);
  const estimatedTotal = startIndex + splitWords.length;

  return splitWords.map((word, localIndex) => {
    const index = startIndex + localIndex;
    const progress = index / Math.max(estimatedTotal, 1);
    const exponentialDelay = Math.pow(Math.min(progress, 1), 0.8) * STAGGER_EXP_WEIGHT;
    const baseDelay = localIndex * STAGGER_PER_WORD;
    const microVariation = (((index * 17) % 11) - 5) * STAGGER_MICRO;

    const blurAmount = tone === "onDark" ? 12 + (index * 5) % 8 : 8 + (index * 3) % 6;

    return {
      text: word,
      duration: stableFloat(WORD_DURATION_BASE + Math.cos(index * 0.35) * WORD_DURATION_JITTER),
      delay: stableFloat(baseDelay + exponentialDelay + microVariation),
      blur: blurAmount,
      scale: stableFloat(0.9 + Math.sin(index * 0.2) * 0.05),
    };
  });
}

function buildWordsFromParts(parts: Array<{ text: string; className?: string }>, tone: Tone): BlurTextWordData[] {
  const flat: BlurTextWordData[] = [];
  let globalIndex = 0;
  const totalWords = parts.reduce((acc, p) => acc + p.text.trim().split(/ +/).filter(Boolean).length, 0);

  for (const part of parts) {
    const splitWords = part.text.trim().split(/ +/).filter(Boolean);
    for (let i = 0; i < splitWords.length; i++) {
      const index = globalIndex++;
      const progress = index / Math.max(totalWords, 1);
      const exponentialDelay = Math.pow(progress, 0.8) * STAGGER_EXP_WEIGHT;
      const baseDelay = index * (STAGGER_PER_WORD * 0.85);
      const microVariation = (((index * 17) % 11) - 5) * STAGGER_MICRO;
      const blurAmount = tone === "onDark" ? 12 + (index * 5) % 8 : 8 + (index * 3) % 6;

      flat.push({
        text: splitWords[i]!,
        duration: stableFloat(WORD_DURATION_BASE + Math.cos(index * 0.35) * WORD_DURATION_JITTER),
        delay: stableFloat(baseDelay + exponentialDelay + microVariation),
        blur: blurAmount,
        scale: stableFloat(0.9 + Math.sin(index * 0.2) * 0.05),
        wordClassName: part.className,
      });
    }
  }
  return flat;
}

export type BlurTextProps = {
  /** Ein zusammenhängender Text (ohne inneres Markup). */
  text?: string;
  /** Mehrere Textteile mit eigenen Klassen (z. B. Betonung); hat Vorrang vor `text`. */
  parts?: Array<{ text: string; className?: string }>;
  className?: string;
  /** Text auf hellem Seitenhintergrund vs. auf dunklem Hero-Bereich */
  tone?: Tone;
  /** Start der Wort-Staffelung bei zusammengesetzten Überschriften (zweites `BlurText` im gleichen Satz) */
  wordOffset?: number;
  /** Animation erst starten, wenn das Element ins Sichtfeld kommt (Standard). */
  animateWhenInView?: boolean;
  rootMargin?: string;
};

/**
 * Wortweiser Blur-Einstieg, einmalig — Text bleibt danach sichtbar. Kein zusätzlicher Vollflächen-Hintergrund.
 */
export function BlurText({
  text = "",
  parts,
  className,
  tone = "onLight",
  wordOffset = 0,
  animateWhenInView = true,
  rootMargin = "0px 0px -8% 0px",
}: BlurTextProps) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [inView, setInView] = useState(!animateWhenInView);
  const [revealed, setRevealed] = useState(false);
  const rootRef = useRef<HTMLElement | null>(null);

  const textWords = useMemo(() => {
    if (parts?.length) return buildWordsFromParts(parts, tone);
    return buildWordsFromText(text, wordOffset, tone);
  }, [text, parts, tone, wordOffset]);

  useEffect(() => {
    if (!animateWhenInView) {
      return;
    }
    const el = rootRef.current;
    if (!el) return;
    let cancelled = false;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || cancelled) return;
        io.disconnect();
        requestAnimationFrame(() => {
          if (!cancelled) setInView(true);
        });
      },
      { threshold: 0.08, rootMargin },
    );
    io.observe(el);
    return () => {
      cancelled = true;
      io.disconnect();
    };
  }, [animateWhenInView, rootMargin]);

  useEffect(() => {
    let cancelled = false;
    if (prefersReducedMotion) {
      queueMicrotask(() => {
        if (!cancelled) setRevealed(true);
      });
      return () => {
        cancelled = true;
      };
    }
    if (!inView) return;
    const t = window.setTimeout(() => {
      if (!cancelled) setRevealed(true);
    }, 40);
    return () => {
      cancelled = true;
      clearTimeout(t);
    };
  }, [inView, prefersReducedMotion]);

  if (prefersReducedMotion) {
    const plain = parts?.length ? parts.map((p) => p.text).join(" ") : text;
    return (
      <span ref={rootRef} className={cn("blur-text inline", className)}>
        {plain}
      </span>
    );
  }

  return (
    <span ref={rootRef} className={cn("blur-text inline leading-[inherit]", className)}>
      {textWords.map((word, index) => (
        <span
          key={`${word.text}-${index}`}
          className={cn(
            "inline-block align-baseline transition-[opacity,filter,transform]",
            revealed ? "opacity-100" : "opacity-0",
            word.wordClassName,
          )}
          style={{
            transitionDuration: `${stableFloat(word.duration, 3)}s`,
            transitionDelay: `${stableFloat(word.delay, 3)}s`,
            transitionTimingFunction: "cubic-bezier(0.2, 0.85, 0.3, 1)",
            filter: revealed ? "blur(0px)" : `blur(${word.blur}px)`,
            transform: revealed ? "translate3d(0,0,0)" : "translate3d(0,0.4em,0)",
            marginRight: index === textWords.length - 1 ? 0 : "0.28em",
            lineHeight: "inherit",
          }}
        >
          {word.text}
        </span>
      ))}
    </span>
  );
}

export default BlurText;
