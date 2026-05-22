"use client";

import { useMemo, useState } from "react";
import {
  RATGEBER_QUESTIONS,
  pickRatgeberResult,
  type RatgeberQuestion,
  type RatgeberResult,
  type RatgeberScore,
} from "@/content/ratgeber";

export type RatgeberAnswers = Record<string, "a" | "b" | "c">;

export function useRatgeber() {
  const total = RATGEBER_QUESTIONS.length;
  const [idx, setIdx] = useState(0);
  const [answers, setAnswers] = useState<RatgeberAnswers>({});
  const [done, setDone] = useState(false);

  const current: RatgeberQuestion = RATGEBER_QUESTIONS[idx]!;
  const currentAnswer = answers[current.n] ?? null;
  const canAdvance = Boolean(currentAnswer);
  const answeredCount = Object.keys(answers).length;

  const score = useMemo(() => {
    const counts: Record<RatgeberScore, number> = { dash: 0, mixed: 0, prem: 0 };
    for (const [qn, aid] of Object.entries(answers)) {
      const q = RATGEBER_QUESTIONS.find((item) => item.n === qn);
      const a = q?.answers.find((item) => item.id === aid);
      if (a) counts[a.score]++;
    }
    return counts;
  }, [answers]);

  const result: RatgeberResult = useMemo(() => pickRatgeberResult(score), [score]);

  const select = (aid: "a" | "b" | "c") => {
    setAnswers((prev) => ({ ...prev, [current.n]: aid }));
  };

  const next = () => {
    if (idx < total - 1) setIdx((i) => i + 1);
    else setDone(true);
  };

  const prev = () => {
    if (done) {
      setDone(false);
      return;
    }
    if (idx > 0) setIdx((i) => i - 1);
  };

  const restart = () => {
    setIdx(0);
    setAnswers({});
    setDone(false);
  };

  return {
    idx,
    total,
    current,
    answers,
    answeredCount,
    currentAnswer,
    select,
    next,
    prev,
    canAdvance,
    restart,
    done,
    result,
    score,
  };
}
