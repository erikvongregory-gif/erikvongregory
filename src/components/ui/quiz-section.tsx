"use client";

import { useMemo, useState, type ReactNode } from "react";
import {
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Gift,
  Star,
  Trophy,
  XCircle,
} from "lucide-react";

import { cn } from "@/lib/utils";

export interface QuizSectionQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
}

/** Standard: BrewAI-Brauerei-Wissen (DACH). Über `questions` überschreibbar. */
export const DEFAULT_BREWERY_QUIZ_DATA: QuizSectionQuestion[] = [
  {
    id: 1,
    question: "Welches Modell passt typischerweise, wenn intern kaum Zeit für Prompts und Varianten bleibt?",
    options: [
      "Premium-Paket mit definierter Lieferung",
      "Ausschließlich kostenlose Stockfotos ohne Markenprofil",
      "Nur Print-Flyer ohne digitale Kanäle",
      "Einmalige Domain-Registrierung",
    ],
    correctAnswer: 0,
  },
  {
    id: 2,
    question: "Wofür stehen „Tokens“ im BrewAI-Dashboard?",
    options: [
      "Kontingent für KI-Bildgenerierung im Monat",
      "Zahl der Google-Business-Profile",
      "Lagerbestände an Rohstoffen",
      "Anzahl der Domain-E-Mails",
    ],
    correctAnswer: 0,
  },
  {
    id: 3,
    question: "Welche Zielgruppe beschreibt BrewAI am treffendsten?",
    options: [
      "Brauereien und Getränkemarken in DACH",
      "Internationale Rohstoffbörsen",
      "Universelle SaaS für jede Branche gleichermaßen",
      "Nur Gastronomie ohne Produzenten",
    ],
    correctAnswer: 0,
  },
  {
    id: 4,
    question: "Was gehört sinnvollerweise zu einem soliden Markenprofil für KI-Content?",
    options: [
      "Logo, Tonalität, No-Gos und Beispielmotive",
      "Ausschließlich der Instagram-Handle",
      "Zufällige Filter pro Post",
      "Nur die Posting-Uhrzeit",
    ],
    correctAnswer: 0,
  },
  {
    id: 5,
    question: "Wo findest du Pakete, Abo-Pläne und Beispiel-Motive am schnellsten gebündelt?",
    options: [
      "Auf der Startseite in den Abschnitten Pakete und Beispiele",
      "Nur im Ratgeber-Quiz",
      "Ausschließlich in der robots.txt",
      "Nur über einen direkten Deep-Link von Suchmaschinen",
    ],
    correctAnswer: 0,
  },
];

export type QuizSectionProps = {
  /**
   * Eigene Fragen; Standard ist `DEFAULT_BREWERY_QUIZ_DATA`.
   * Wechselt das Fragen-Set zur Laufzeit, am Parent einen neuen `key` setzen, damit der State zurückgesetzt wird.
   */
  questions?: QuizSectionQuestion[];
  /** Auf Unterseiten ohne Vollbild-Höhe einbetten (z. B. Ratgeber). */
  embedded?: boolean;
  className?: string;
};

function calculateScore(answers: (number | null)[], data: QuizSectionQuestion[]) {
  return answers.reduce<number>((total, answer, index) => {
    if (answer === data[index]?.correctAnswer) return total + 1;
    return total;
  }, 0);
}

function getScoreMessage(finalScore: number, total: number) {
  const percentage = (finalScore / total) * 100;
  if (percentage >= 80) return "Sehr stark — du hast das Angebot gut im Blick!";
  if (percentage >= 60) return "Gut gemacht — solides Verständnis für den Ablauf.";
  if (percentage >= 40) return "Solide Basis — auf der Startseite siehst du Pakete und Beispiele im Überblick.";
  return "Kein Problem — die Startseite fasst Angebot und Beispiele zusammen, das Quiz kannst du jederzeit wiederholen.";
}

export function QuizSection({ questions, embedded = false, className }: QuizSectionProps) {
  const data = useMemo(() => questions ?? DEFAULT_BREWERY_QUIZ_DATA, [questions]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [answers, setAnswers] = useState<(number | null)[]>(() => Array(data.length).fill(null));

  const selectedAnswer = answers[currentQuestion];
  const showFeedback = selectedAnswer !== null;

  const handleAnswerSelect = (answerIndex: number) => {
    if (answers[currentQuestion] !== null) return;
    setAnswers((prev) => {
      const next = [...prev];
      next[currentQuestion] = answerIndex;
      return next;
    });
  };

  const handleNext = () => {
    if (currentQuestion < data.length - 1) {
      setCurrentQuestion((q) => q + 1);
    } else {
      setQuizCompleted(true);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((q) => q - 1);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setQuizCompleted(false);
    setAnswers(Array(data.length).fill(null));
  };

  const finalScore = calculateScore(answers, data);
  const answeredCount = answers.filter((a) => a !== null).length;
  const current = data[currentQuestion];
  const optionsList = current?.options ?? [];

  const shell = embedded
    ? "w-full"
    : "min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-blue-50/80 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 p-4";

  if (quizCompleted) {
    return (
      <div className={cn(shell, className)}>
        <div
          className={cn(
            "w-full max-w-3xl mx-auto shadow-2xl bg-white/95 dark:bg-slate-800/90 backdrop-blur-sm rounded-xl border border-slate-200 dark:border-slate-700",
            embedded && "shadow-lg",
          )}
        >
          <div className="text-center pb-8 p-6">
            <div className="relative mb-6">
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-200/20 via-violet-200/20 to-blue-200/20 blur-xl dark:from-blue-400/30 dark:via-violet-400/30 dark:to-blue-400/30" />
              <div className="relative flex justify-center">
                <div className="motion-reduce:animate-none animate-bounce">
                  <Trophy className="h-20 w-20 text-blue-500 drop-shadow-lg dark:text-blue-400" aria-hidden />
                </div>
              </div>
            </div>
            <h2 className="mb-4 bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-3xl font-bold text-transparent sm:text-4xl dark:from-blue-400 dark:to-violet-400">
              Quiz geschafft
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-300">
              Kurzer Wissenscheck zu BrewAI, Paketen und Dashboard — ausgewertet.
            </p>
          </div>
          <div className="space-y-8 p-6">
            <div className="relative">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-100/10 via-violet-100/10 to-blue-100/10 blur-sm dark:from-blue-400/20 dark:via-violet-400/20 dark:to-blue-400/20" />
              <div className="relative rounded-2xl border border-blue-200/30 bg-gradient-to-br from-white to-blue-50/40 p-8 dark:border-blue-400/30 dark:from-slate-800 dark:to-blue-950/20">
                <div className="space-y-4 text-center">
                  <div className="bg-gradient-to-r from-blue-500 to-violet-600 bg-clip-text text-6xl font-bold text-transparent sm:text-7xl dark:from-blue-400 dark:to-violet-400">
                    {finalScore}/{data.length}
                  </div>
                  <div className="text-2xl font-medium text-slate-600 dark:text-slate-300">
                    {Math.round((finalScore / data.length) * 100)}% richtig
                  </div>
                  <div className="mt-6 flex justify-center gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={cn(
                          "h-9 w-9 sm:h-10 sm:w-10",
                          i < Math.ceil((finalScore / data.length) * 5)
                            ? "text-amber-400 motion-reduce:animate-none animate-pulse"
                            : "text-slate-300/40 dark:text-slate-600/30",
                        )}
                        style={{ animationDelay: `${i * 100}ms` }}
                        aria-hidden
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center">
              <div className="inline-block rounded-full border border-blue-200/30 bg-gradient-to-r from-blue-50/80 to-violet-50/80 px-6 py-3 dark:border-blue-400/30 dark:from-blue-950/40 dark:to-violet-950/40">
                <span className="text-lg font-medium text-slate-900 dark:text-slate-100">
                  {getScoreMessage(finalScore, data.length)}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-5 gap-2 sm:gap-3">
              {data.map((q, index) => (
                <div key={q.id} className="text-center">
                  <div
                    className={cn(
                      "mx-auto mb-2 flex h-11 w-11 items-center justify-center rounded-full border-2 transition-all sm:h-12 sm:w-12",
                      answers[index] === q.correctAnswer
                        ? "border-green-500 bg-green-100/30 text-green-600 dark:bg-green-400/25 dark:text-green-400"
                        : "border-red-300 bg-red-100/20 text-red-600 dark:border-red-400/50 dark:bg-red-400/15 dark:text-red-400",
                    )}
                  >
                    {answers[index] === q.correctAnswer ? (
                      <CheckCircle2 className="h-6 w-6" aria-hidden />
                    ) : (
                      <XCircle className="h-6 w-6" aria-hidden />
                    )}
                  </div>
                  <span className="text-xs text-slate-600 dark:text-slate-400">F{index + 1}</span>
                </div>
              ))}
            </div>

            <div className="pt-4 text-center">
              <button
                type="button"
                onClick={resetQuiz}
                className="rounded-lg bg-gradient-to-r from-blue-600 to-violet-600 px-8 py-3 text-lg font-medium text-white shadow-lg transition hover:from-blue-700 hover:to-violet-700 active:scale-[0.98] dark:from-blue-500 dark:to-violet-500 dark:hover:from-blue-600 dark:hover:to-violet-600"
              >
                Noch einmal
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(shell, className)}
      id={embedded ? "ratgeber-wissenscheck" : undefined}
    >
      <div
        className={cn(
          "mx-auto w-full max-w-3xl rounded-xl border bg-white text-zinc-900 shadow-xl dark:border-slate-700/50 dark:bg-slate-800/95 dark:text-slate-100 dark:shadow-2xl",
          embedded ? "border-[#c65a20]/35 shadow-md ring-1 ring-[#c65a20]/25" : "border-slate-200",
        )}
      >
        {embedded ? (
          <div className="border-b border-zinc-200/90 bg-gradient-to-r from-[#fff7ed] via-white to-[#fffbeb] px-4 py-3 sm:px-6">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#b45309]">Wissenscheck</p>
            <div className="mt-2 flex flex-wrap items-center justify-between gap-2 text-sm font-medium text-zinc-700">
              <span>
                Frage {currentQuestion + 1} / {data.length}
              </span>
              <span className="tabular-nums text-zinc-600">
                Punkte {calculateScore(answers, data)}
                {answeredCount > 0 ? ` / ${answeredCount}` : ""}
              </span>
            </div>
            <div className="mt-3 flex justify-center gap-2" aria-hidden>
              {data.map((q, index) => (
                <span
                  key={q.id}
                  className={cn(
                    "h-2.5 w-2.5 rounded-full transition-colors",
                    index === currentQuestion
                      ? "bg-[#c65a20] ring-2 ring-[#c65a20]/30"
                      : answers[index] !== null
                        ? answers[index] === q.correctAnswer
                          ? "bg-emerald-500"
                          : "bg-red-400"
                        : "bg-zinc-300",
                  )}
                />
              ))}
            </div>
            <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-zinc-200">
              <div
                className="h-2 rounded-full bg-gradient-to-r from-[#c2410c] to-[#c65a20] transition-all duration-500 ease-out"
                style={{
                  width: `${((currentQuestion + (showFeedback ? 1 : 0)) / data.length) * 100}%`,
                }}
              />
            </div>
          </div>
        ) : (
          <div className="p-6">
            <div className="mb-6 flex justify-between text-sm font-medium text-slate-600 dark:text-slate-400">
              <span>
                Frage {currentQuestion + 1} von {data.length}
              </span>
              <span>
                Punkte: {calculateScore(answers, data)}/{answeredCount || 0}
              </span>
            </div>

            <div className="mb-8">
              <div className="mb-4 flex justify-between gap-1">
                {data.map((q, index) => (
                  <div key={q.id} className="flex flex-col items-center gap-2">
                    <div
                      className={cn(
                        "relative transition-all motion-reduce:animate-none",
                        index <= currentQuestion && "animate-bounce",
                      )}
                    >
                      <Gift
                        className={cn(
                          "h-7 w-7 transition-all sm:h-8 sm:w-8",
                          answers[index] !== null
                            ? answers[index] === q.correctAnswer
                              ? "text-green-500"
                              : "text-red-500"
                            : index === currentQuestion
                              ? "animate-pulse text-blue-600 dark:text-blue-400"
                              : "text-slate-400/50 dark:text-slate-600/40",
                        )}
                        aria-hidden
                      />
                      {answers[index] !== null ? (
                        <div className="absolute -right-1 -top-1 rounded-full bg-white dark:bg-slate-800">
                          {answers[index] === q.correctAnswer ? (
                            <CheckCircle2 className="h-4 w-4 text-green-500" aria-hidden />
                          ) : (
                            <XCircle className="h-4 w-4 text-red-500" aria-hidden />
                          )}
                        </div>
                      ) : null}
                    </div>
                    <div className="text-xs text-slate-600 dark:text-slate-400">{index + 1}</div>
                  </div>
                ))}
              </div>

              <div className="h-3 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700/50">
                <div
                  className="h-3 rounded-full bg-gradient-to-r from-blue-600 to-violet-600 shadow-sm transition-all duration-700 ease-out dark:from-blue-500 dark:to-violet-500"
                  style={{
                    width: `${((currentQuestion + (showFeedback ? 1 : 0)) / data.length) * 100}%`,
                  }}
                />
              </div>
            </div>

            <h2 className="mb-6 text-balance text-xl font-bold leading-tight text-slate-900 dark:text-slate-100 sm:text-2xl">
              {current?.question}
            </h2>
          </div>
        )}

        <div className={cn(embedded ? "space-y-5 p-4 sm:p-6" : "space-y-0 p-6 pt-0")}>
          {embedded ? (
            <h2 className="text-balance font-display text-lg font-semibold leading-snug text-zinc-900 sm:text-xl">
              {current?.question}
            </h2>
          ) : null}

          <div className="space-y-3">
            {optionsList.map((option, index) => {
              let buttonClass = embedded
                ? "w-full rounded-xl border-2 border-zinc-200 bg-zinc-50/90 px-4 py-3.5 text-left text-sm font-medium text-zinc-900 shadow-sm transition hover:border-[#c65a20]/45 hover:bg-amber-50/50 active:scale-[0.99] disabled:cursor-not-allowed sm:text-base"
                : "w-full rounded-lg border-2 p-4 text-left transition-all duration-300 hover:scale-[1.01] active:scale-[0.99] cursor-pointer disabled:cursor-not-allowed";
              let icon: ReactNode = null;
              if (!current) return null;
              const wrongPick = index === selectedAnswer && selectedAnswer !== current.correctAnswer;
              const isCorrectOption = index === current.correctAnswer;

              if (showFeedback) {
                if (isCorrectOption) {
                  buttonClass +=
                    " border-green-500 bg-green-100/20 text-green-700 shadow-md dark:bg-green-400/20 dark:text-green-300";
                  icon = <CheckCircle2 className="ml-2 h-5 w-5 shrink-0" aria-hidden />;
                } else if (wrongPick) {
                  buttonClass += " border-red-500 bg-red-100/15 text-red-700 dark:bg-red-400/15 dark:text-red-300";
                  icon = <XCircle className="ml-2 h-5 w-5 shrink-0" aria-hidden />;
                } else {
                  buttonClass += " opacity-50 dark:opacity-45";
                }
              } else if (index === selectedAnswer) {
                buttonClass += embedded
                  ? " border-[#c65a20] bg-amber-50/90 ring-1 ring-[#c65a20]/20"
                  : " border-blue-500 bg-blue-100/20 dark:bg-blue-500/20";
              } else {
                buttonClass +=
                  " border-slate-200 hover:border-blue-400/60 hover:bg-slate-50/80 dark:border-slate-600/50 dark:hover:border-blue-500/50 dark:hover:bg-slate-700/30";
              }

              return (
                <button
                  key={index}
                  type="button"
                  className={buttonClass}
                  onClick={() => handleAnswerSelect(index)}
                  disabled={showFeedback}
                >
                  <div className="flex w-full items-center justify-between gap-2">
                    <span
                      className={cn(
                        "font-medium",
                        embedded ? "text-[15px] text-zinc-900 sm:text-base" : "text-base",
                      )}
                    >
                      {option}
                    </span>
                    {icon}
                  </div>
                </button>
              );
            })}
          </div>

          {showFeedback && current ? (
            <div
              className={cn(
                "rounded-lg border p-4",
                embedded
                  ? "border-zinc-200 bg-amber-50/60 text-zinc-800"
                  : "mb-6 border-slate-200/80 bg-gradient-to-r from-slate-100/60 to-slate-50/40 dark:border-slate-600/40 dark:from-slate-700/35 dark:to-slate-800/25",
              )}
            >
              <div className="text-center">
                {selectedAnswer === current.correctAnswer ? (
                  <div className="flex items-center justify-center gap-2 font-medium text-green-700 dark:text-green-400">
                    <CheckCircle2 className="h-5 w-5 shrink-0" aria-hidden />
                    <span>Richtig — passt!</span>
                  </div>
                ) : (
                  <div className={cn(embedded ? "text-zinc-700" : "text-slate-600 dark:text-slate-400")}>
                    Die richtige Antwort ist:{" "}
                    <span className="font-medium text-zinc-900 dark:text-slate-100">
                      {current.options[current.correctAnswer]}
                    </span>
                  </div>
                )}
              </div>
            </div>
          ) : null}

          <div
            className={cn(
              "flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between",
              embedded && "border-t border-zinc-100 pt-4 dark:border-zinc-700/50",
            )}
          >
            <button
              type="button"
              onClick={handlePrevious}
              disabled={currentQuestion === 0}
              className={cn(
                "inline-flex min-h-[2.75rem] items-center justify-center gap-2 rounded-lg border px-4 py-2 transition disabled:opacity-50",
                embedded
                  ? "border-zinc-300 bg-white text-zinc-900 hover:border-[#c65a20]/40 hover:bg-amber-50/80"
                  : "border-slate-200 hover:bg-slate-100/80 dark:border-slate-600 dark:hover:bg-slate-700/40",
              )}
            >
              <ChevronLeft className="h-4 w-4" aria-hidden />
              <span>Zurück</span>
            </button>

            <p
              className={cn(
                "text-center text-sm sm:flex-1",
                embedded ? "text-zinc-600" : "text-slate-600 dark:text-slate-400",
              )}
            >
              {selectedAnswer !== null ? "Antwort gewählt" : "Bitte eine Option wählen"}
            </p>

            <button
              type="button"
              onClick={handleNext}
              disabled={selectedAnswer === null}
              className={cn(
                "inline-flex min-h-[2.75rem] items-center justify-center gap-2 rounded-lg px-4 py-2 font-medium text-white transition disabled:opacity-50",
                embedded
                  ? "bg-[#c65a20] hover:bg-[#d46830]"
                  : "bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600",
              )}
            >
              <span>{currentQuestion === data.length - 1 ? "Auswertung" : "Weiter"}</span>
              <ChevronRight className="h-4 w-4" aria-hidden />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/** Kompatibel mit dem import-Namen aus dem Prompt-Beispiel. */
export const Component = QuizSection;
