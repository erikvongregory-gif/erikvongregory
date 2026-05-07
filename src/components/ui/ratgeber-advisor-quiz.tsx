"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { buildAppLoginUrl } from "@/lib/appLoginUrl";
import { cn } from "@/lib/utils";

type AdvisorOption = {
  label: string;
  dashboard: number;
  doneForYou: number;
};

type AdvisorQuestion = {
  id: string;
  question: string;
  options: AdvisorOption[];
};

const QUESTIONS: AdvisorQuestion[] = [
  {
    id: "zeit",
    question: "Wie viel Zeit kann dein Team pro Woche realistisch in Content stecken?",
    options: [
      { label: "30-90 Minuten sind drin, wenn es strukturiert ist.", dashboard: 3, doneForYou: 0 },
      { label: "Eher unregelmässig, wir brauchen viel Entlastung.", dashboard: 1, doneForYou: 2 },
      { label: "Quasi keine Zeit, wir wollen alles komplett abgeben.", dashboard: 0, doneForYou: 3 },
    ],
  },
  {
    id: "tempo",
    question: "Wie schnell brauchst du neue Motive und Varianten?",
    options: [
      { label: "Laufend und flexibel je nach Aktion/Saison.", dashboard: 3, doneForYou: 0 },
      { label: "Regelmässig, aber nicht täglich.", dashboard: 2, doneForYou: 1 },
      { label: "In klaren Kampagnen-Blöcken, eher punktuell.", dashboard: 0, doneForYou: 2 },
    ],
  },
  {
    id: "kontrolle",
    question: "Wie wichtig ist euch direkte Kontrolle über Prompt, Stil und Varianten?",
    options: [
      { label: "Sehr wichtig, wir wollen selbst feinsteuern.", dashboard: 3, doneForYou: 0 },
      { label: "Mittel, Hauptsache Ergebnis passt am Ende.", dashboard: 2, doneForYou: 1 },
      { label: "Wenig wichtig, wir wollen fertige Assets erhalten.", dashboard: 0, doneForYou: 3 },
    ],
  },
  {
    id: "workflow",
    question: "Was passt besser zu eurem Arbeitsalltag?",
    options: [
      { label: "Self-Service mit klaren Vorlagen und schnellem Output.", dashboard: 3, doneForYou: 0 },
      { label: "Mischung aus eigener Arbeit und externer Unterstützung.", dashboard: 2, doneForYou: 1 },
      { label: "Komplett extern umgesetzt, intern nur Freigabe.", dashboard: 0, doneForYou: 3 },
    ],
  },
  {
    id: "ziel",
    question: "Was ist euer Hauptziel in den nächsten 3 Monaten?",
    options: [
      { label: "Mehr Content-Frequenz und schnelle Tests.", dashboard: 3, doneForYou: 0 },
      { label: "Stabile Markenwirkung mit wenig internem Aufwand.", dashboard: 1, doneForYou: 2 },
      { label: "Kampagnen-Endergebnisse ohne Tool-Bedienung.", dashboard: 0, doneForYou: 3 },
    ],
  },
];

export function RatgeberAdvisorQuiz({ className }: { className?: string }) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(() => Array(QUESTIONS.length).fill(null));
  const [showResult, setShowResult] = useState(false);

  const current = QUESTIONS[step];
  const isLast = step === QUESTIONS.length - 1;
  const completed = showResult && answers.every((a) => a !== null);

  const result = useMemo(() => {
    const totals = answers.reduce(
      (acc, answerIndex, index) => {
        if (answerIndex == null) return acc;
        const option = QUESTIONS[index]?.options[answerIndex];
        if (!option) return acc;
        acc.dashboard += option.dashboard;
        acc.doneForYou += option.doneForYou;
        return acc;
      },
      { dashboard: 0, doneForYou: 0 },
    );

    const recommendation = totals.dashboard >= totals.doneForYou ? "dashboard" : "doneForYou";
    return { ...totals, recommendation };
  }, [answers]);

  const select = (optionIndex: number) => {
    setAnswers((prev) => {
      const next = [...prev];
      next[step] = optionIndex;
      return next;
    });
  };

  const next = () => {
    if (step < QUESTIONS.length - 1) setStep((s) => s + 1);
  };

  const prev = () => {
    if (step > 0) setStep((s) => s - 1);
  };

  const reset = () => {
    setStep(0);
    setAnswers(Array(QUESTIONS.length).fill(null));
    setShowResult(false);
  };

  if (completed) {
    const dashboardWins = result.recommendation === "dashboard";
    return (
      <section
        className={cn(
          "rounded-2xl border border-[#c65a20]/30 bg-white p-5 shadow-md ring-1 ring-[#c65a20]/15 sm:p-7",
          className,
        )}
        aria-live="polite"
      >
        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#b45309]">Auswertung</p>
        <h2 className="mt-3 text-2xl font-bold tracking-tight text-zinc-900 sm:text-3xl">
          {dashboardWins ? "Empfehlung: Dashboard" : "Empfehlung: Premium-Umsetzung"}
        </h2>
        <p className="mt-4 text-zinc-700">
          {dashboardWins
            ? "Deine Antworten sprechen für einen flexiblen Self-Service-Workflow mit schneller Umsetzung und direkter Steuerung."
            : "Deine Antworten sprechen eher für maximale Entlastung mit klaren Lieferobjekten aus der Premium-Umsetzung."}
        </p>

        <div className="mt-5 grid gap-3 rounded-xl border border-zinc-200 bg-zinc-50 p-4 sm:grid-cols-2">
          <p className="text-sm text-zinc-700">
            Dashboard-Score: <strong className="text-zinc-900">{result.dashboard}</strong>
          </p>
          <p className="text-sm text-zinc-700">
            Premium-Score: <strong className="text-zinc-900">{result.doneForYou}</strong>
          </p>
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          {dashboardWins ? (
            <a
              href={buildAppLoginUrl({ plan: "dashboard" })}
              className="inline-flex min-h-[2.75rem] items-center justify-center rounded-xl bg-[#c65a20] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#d46830]"
            >
              Dashboard starten
            </a>
          ) : (
            <Link
              href="/#contact"
              className="inline-flex min-h-[2.75rem] items-center justify-center rounded-xl bg-[#c65a20] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#d46830]"
            >
              Premium-Beratung anfragen
            </Link>
          )}
          <Link
            href="/vergleich/premium-vs-dashboard-abo-brauerei"
            className="inline-flex min-h-[2.75rem] items-center justify-center rounded-xl border border-zinc-300 bg-white px-5 py-2.5 text-sm font-semibold text-zinc-900 transition hover:border-[#c65a20]/45 hover:bg-amber-50/60"
          >
            Modelle im Vergleich
          </Link>
          <button
            type="button"
            onClick={reset}
            className="inline-flex min-h-[2.75rem] items-center justify-center rounded-xl border border-zinc-300 bg-white px-5 py-2.5 text-sm font-semibold text-zinc-900 transition hover:bg-zinc-50"
          >
            Neu starten
          </button>
        </div>
      </section>
    );
  }

  return (
    <section
      className={cn(
        "rounded-2xl border border-[#c65a20]/30 bg-white shadow-md ring-1 ring-[#c65a20]/15",
        className,
      )}
    >
      <div className="border-b border-zinc-200/90 bg-gradient-to-r from-[#fff7ed] via-white to-[#fffbeb] px-4 py-3 sm:px-6">
        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#b45309]">Ratgeber-Quiz</p>
        <div className="mt-2 flex items-center justify-between gap-2 text-sm font-medium text-zinc-700">
          <span>
            Frage {step + 1} / {QUESTIONS.length}
          </span>
          <span className="text-zinc-600">{answers.filter((a) => a !== null).length} beantwortet</span>
        </div>
        <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-zinc-200">
          <div
            className="h-2 rounded-full bg-gradient-to-r from-[#c2410c] to-[#c65a20] transition-all duration-300"
            style={{ width: `${((step + 1) / QUESTIONS.length) * 100}%` }}
          />
        </div>
      </div>

      <div className="space-y-5 p-4 sm:p-6">
        <div
          style={{
            color: "#111827",
            fontSize: "1.15rem",
            fontWeight: 700,
            lineHeight: 1.35,
          }}
        >
          {current?.question ?? "Frage wird geladen ..."}
        </div>

        {current ? (
          <div className="space-y-3">
            {current.options.map((option, index) => {
              const selected = answers[step] === index;
              return (
                <button
                  key={option.label}
                  type="button"
                  onClick={() => select(index)}
                  style={{
                    width: "100%",
                    textAlign: "left",
                    borderRadius: 12,
                    border: selected ? "2px solid #c65a20" : "1px solid #d4d4d8",
                    background: selected ? "#fff3e8" : "#f9fafb",
                    color: "#111827",
                    padding: "12px 14px",
                    fontSize: 16,
                    fontWeight: 500,
                    cursor: "pointer",
                  }}
                >
                  {option.label}
                </button>
              );
            })}
          </div>
        ) : (
          <p className="rounded-xl border border-zinc-200 bg-zinc-50 p-4 text-sm text-zinc-700">
            Fragen konnten nicht geladen werden. Bitte Seite neu laden.
          </p>
        )}

        <div className="flex flex-col gap-3 border-t border-zinc-100 pt-4 sm:flex-row sm:items-center sm:justify-between">
          <button
            type="button"
            onClick={prev}
            disabled={step === 0}
            className="inline-flex min-h-[2.75rem] items-center justify-center gap-2 rounded-lg border border-zinc-300 bg-white px-4 py-2 text-zinc-900 transition hover:border-[#c65a20]/40 hover:bg-amber-50/80 disabled:opacity-50"
          >
            <ChevronLeft className="h-4 w-4" aria-hidden />
            <span>Zurück</span>
          </button>

          <p className="text-center text-sm text-zinc-600 sm:flex-1">
            {answers[step] !== null ? "Antwort gewählt" : "Bitte eine Option wählen"}
          </p>

          <button
            type="button"
            onClick={next}
            disabled={answers[step] === null || isLast || !current}
            className="inline-flex min-h-[2.75rem] items-center justify-center gap-2 rounded-lg bg-[#c65a20] px-4 py-2 font-medium text-white transition hover:bg-[#d46830] disabled:opacity-50"
          >
            <span>Weiter</span>
            <ChevronRight className="h-4 w-4" aria-hidden />
          </button>
        </div>

        {isLast ? (
          <button
            type="button"
            onClick={() => setShowResult(true)}
            disabled={answers[step] === null || !current}
            className="inline-flex min-h-[2.75rem] w-full items-center justify-center rounded-xl bg-[#9a3412] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#b45309] disabled:opacity-50"
          >
            Ergebnis anzeigen
          </button>
        ) : null}
      </div>
    </section>
  );
}
