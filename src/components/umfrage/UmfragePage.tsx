"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import {
  UMFRAGE_INTRO_STEPS,
  UMFRAGE_META,
  UMFRAGE_QUESTIONS,
  type UmfrageQuestion,
} from "@/content/umfrage";
import { cn } from "@/lib/utils";

type AnswerValue = string | string[] | number;
type Answers = Record<string, AnswerValue>;
type Phase = "intro" | "questions" | "contact" | "done";

const slide = {
  enter: (dir: number) => ({ x: dir > 0 ? 28 : -28, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir > 0 ? -20 : 20, opacity: 0 }),
};

function isVisible(q: UmfrageQuestion, answers: Answers): boolean {
  if (!q.showIf) return true;
  const current = answers[q.showIf.questionId];
  if (typeof current !== "string") return false;
  return q.showIf.values.includes(current);
}

function getVisibleQuestions(answers: Answers) {
  return UMFRAGE_QUESTIONS.filter((q) => isVisible(q, answers));
}

function isAnswered(q: UmfrageQuestion, answers: Answers): boolean {
  const value = answers[q.id];
  if (q.type === "single") return typeof value === "string" && value.length > 0;
  if (q.type === "multi") return Array.isArray(value) && value.length > 0;
  if (q.type === "scale") return typeof value === "number";
  if (q.type === "text") {
    if (!q.required) return true;
    return typeof value === "string" && value.trim().length > 0;
  }
  return false;
}

function OptionButton({
  selected,
  onClick,
  children,
}: {
  selected: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "w-full rounded-2xl border px-4 py-3.5 text-left text-[15px] transition-all duration-200",
        selected
          ? "border-amber bg-amber3/70 text-ink scale-[1.01] shadow-[0_10px_28px_-18px_rgba(198,105,30,0.65)]"
          : "border-ink/10 bg-white/80 text-ink2 hover:border-ink/20 hover:bg-white hover:text-ink",
      )}
    >
      {children}
    </button>
  );
}

function PrimaryButton({
  children,
  onClick,
  disabled,
  className,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "w-full rounded-2xl bg-[#c65a20] px-5 py-3.5 text-sm font-semibold text-white transition-all duration-200 hover:bg-[#d46830] hover:shadow-[0_12px_32px_-12px_rgba(224,122,64,0.55)] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-[#c65a20] disabled:hover:shadow-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e07a40]/55",
        className,
      )}
    >
      {children}
    </button>
  );
}

export function UmfragePage() {
  const [phase, setPhase] = useState<Phase>("intro");
  const [introStep, setIntroStep] = useState(0);
  const [step, setStep] = useState(0);
  const [contactStep, setContactStep] = useState(0);
  const [dir, setDir] = useState(1);
  const [answers, setAnswers] = useState<Answers>({});
  const [otherTexts, setOtherTexts] = useState<Record<string, string>>({});
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [wantsResults, setWantsResults] = useState(true);
  const [personalAnalysis, setPersonalAnalysis] = useState<"ja" | "spaeter" | "nein" | "">("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const autoAdvanceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const visible = useMemo(() => getVisibleQuestions(answers), [answers]);
  const current = visible[step];

  const totalFunnel =
    UMFRAGE_INTRO_STEPS.length + visible.length + 2; /* contact + done placeholder */
  const funnelIndex =
    phase === "intro"
      ? introStep
      : phase === "questions"
        ? UMFRAGE_INTRO_STEPS.length + step
        : phase === "contact"
          ? UMFRAGE_INTRO_STEPS.length + visible.length + contactStep
          : totalFunnel - 1;
  const progress = Math.min(0.98, (funnelIndex + 1) / totalFunnel);

  useEffect(() => {
    if (step >= visible.length) setStep(Math.max(0, visible.length - 1));
  }, [visible.length, step]);

  useEffect(() => {
    return () => {
      if (autoAdvanceRef.current) clearTimeout(autoAdvanceRef.current);
    };
  }, []);

  const go = (next: () => void, direction = 1) => {
    setDir(direction);
    next();
  };

  const goNextQuestion = () => {
    go(() => {
      if (step < visible.length - 1) setStep((s) => s + 1);
      else {
        setContactStep(0);
        setPhase("contact");
      }
    }, 1);
  };

  const goPrevQuestion = () => {
    go(() => {
      if (step > 0) setStep((s) => s - 1);
      else {
        setIntroStep(UMFRAGE_INTRO_STEPS.length - 1);
        setPhase("intro");
      }
    }, -1);
  };

  const scheduleAdvance = () => {
    if (autoAdvanceRef.current) clearTimeout(autoAdvanceRef.current);
    autoAdvanceRef.current = setTimeout(() => goNextQuestion(), 280);
  };

  const setSingle = (qid: string, optionId: string, auto = true) => {
    setAnswers((prev) => ({ ...prev, [qid]: optionId }));
    if (auto) scheduleAdvance();
  };

  const setScale = (qid: string, n: number) => {
    setAnswers((prev) => ({ ...prev, [qid]: n }));
    scheduleAdvance();
  };

  const toggleMulti = (q: UmfrageQuestion, optionId: string) => {
    setAnswers((prev) => {
      const raw = prev[q.id];
      const existing = Array.isArray(raw) ? [...raw] : [];
      const idx = existing.indexOf(optionId);
      if (idx >= 0) existing.splice(idx, 1);
      else {
        if (q.maxSelect && existing.length >= q.maxSelect) return prev;
        existing.push(optionId);
      }
      return { ...prev, [q.id]: existing };
    });
  };

  const canAdvance = current ? isAnswered(current, answers) : false;
  const selectedIsOther =
    current?.type === "single" &&
    typeof answers[current.id] === "string" &&
    Boolean(current.options?.find((o) => o.id === answers[current.id])?.allowText);
  const showNextButton =
    current?.type === "multi" || current?.type === "text" || selectedIsOther;

  const buildPayloadAnswers = () => {
    const out: Record<string, unknown> = { ...answers };
    for (const [qid, text] of Object.entries(otherTexts)) {
      const trimmed = text.trim();
      if (!trimmed) continue;
      out[`${qid}_sonstiges`] = trimmed;
    }
    return out;
  };

  const notifyInbox = async (payload: {
    answers: Record<string, unknown>;
    email: string;
    company: string;
    wantsResults: boolean;
    wantsPersonalAnalysis: string;
  }) => {
    const subjectParts = ["Umfrage: Brauerei-Marketing-Barometer 2026"];
    if (payload.company) subjectParts.push(payload.company);
    if (payload.wantsPersonalAnalysis === "ja") subjectParts.push("Analyse-Interesse");

    const answersText = Object.entries(payload.answers)
      .map(([key, value]) => {
        const rendered =
          typeof value === "string"
            ? value
            : Array.isArray(value)
              ? value.join(", ")
              : JSON.stringify(value);
        return `${key}: ${rendered}`;
      })
      .join("\n");

    // Parallel an Gmail – FormSubmit schickt einmaligen Aktivierungslink an dieses Postfach.
    const res = await fetch("https://formsubmit.co/ajax/erikvongregory@gmail.com", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        name: payload.company || "Brauerei-Umfrage",
        email: payload.email || "noreply@brewai.de",
        _replyto: payload.email || undefined,
        _subject: subjectParts.join(" – "),
        _template: "table",
        _captcha: "false",
        company: payload.company || "(keine Angabe)",
        wants_results: payload.wantsResults ? "ja" : "nein",
        wants_personal_analysis: payload.wantsPersonalAnalysis || "(keine Angabe)",
        message: answersText,
      }),
    });
    const data = (await res.json().catch(() => ({}))) as {
      success?: string | boolean;
      message?: string;
    };
    if (!res.ok || data.success === "false" || data.success === false) {
      throw new Error(data.message || "FormSubmit failed");
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    try {
      const payloadAnswers = buildPayloadAnswers();
      const payloadEmail = email.trim();
      const payloadCompany = company.trim();
      const payloadWantsResults = wantsResults && Boolean(payloadEmail);
      const payloadAnalysis = personalAnalysis || "";

      const res = await fetch("/api/umfrage", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          answers: payloadAnswers,
          email: payloadEmail,
          company: payloadCompany,
          wantsResults: payloadWantsResults,
          wantsPersonalAnalysis: personalAnalysis || undefined,
        }),
      });
      const data = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) throw new Error(data.error || "Senden fehlgeschlagen");

      try {
        await notifyInbox({
          answers: payloadAnswers,
          email: payloadEmail,
          company: payloadCompany,
          wantsResults: payloadWantsResults,
          wantsPersonalAnalysis: payloadAnalysis,
        });
      } catch (notifyErr) {
        console.error("[umfrage] inbox notify failed", notifyErr);
      }

      go(() => setPhase("done"), 1);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Senden fehlgeschlagen");
    } finally {
      setLoading(false);
    }
  };

  const animKey =
    phase === "intro"
      ? `intro-${introStep}`
      : phase === "questions"
        ? `q-${current?.id ?? step}`
        : phase === "contact"
          ? `contact-${contactStep}`
          : "done";

  const intro = UMFRAGE_INTRO_STEPS[introStep];

  return (
    <main
      id="main"
      className="relative z-20 min-h-[100dvh] overflow-hidden bg-paper text-ink pt-[var(--mobile-top-header-offset)] lg:pt-[var(--site-header-offset)]"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(198,105,30,0.08),_transparent_55%)]"
        aria-hidden
      />

      <div className="relative mx-auto flex min-h-[calc(100dvh-var(--mobile-top-header-offset))] max-w-xl flex-col px-5 pb-10 pt-8 sm:min-h-[calc(100dvh-var(--site-header-offset))] sm:px-6 sm:pt-12 lg:min-h-[calc(100dvh-var(--site-header-offset))]">
        <header className="mb-6 shrink-0">
          <div className="flex items-center justify-between gap-3">
            <p className="font-mono-hero text-[10px] uppercase tracking-[1.5px] text-amber sm:text-[11px]">
              BrewAI
            </p>
            {phase !== "done" ? (
              <p className="font-mono-hero text-[10px] uppercase tracking-wide text-ink3">
                {Math.round(progress * 100)}%
              </p>
            ) : null}
          </div>
          {phase !== "done" ? (
            <div className="mt-3 h-1 overflow-hidden rounded-full bg-ink/10" aria-hidden>
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-[#c65a20] to-[#e07a40]"
                animate={{ width: `${Math.max(6, progress * 100)}%` }}
                transition={{ type: "spring", stiffness: 120, damping: 20 }}
              />
            </div>
          ) : null}
        </header>

        <div className="relative flex flex-1 flex-col justify-center">
          <AnimatePresence mode="wait" custom={dir} initial={false}>
            <motion.div
              key={animKey}
              custom={dir}
              variants={slide}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
              className="w-full"
            >
              {phase === "intro" && intro ? (
                <section className="text-center sm:text-left">
                  <p className="font-mono-hero text-[11px] uppercase tracking-[1.4px] text-amber">
                    {intro.eyebrow}
                  </p>
                  <h1 className="mt-4 font-serif-hero text-[2.15rem] font-medium leading-[1.08] tracking-[-0.045em] text-ink sm:text-[2.75rem]">
                    {intro.title}
                  </h1>
                  <p className="mx-auto mt-5 max-w-md text-[16px] leading-relaxed text-ink2 sm:mx-0 sm:text-[17px]">
                    {intro.body}
                  </p>
                  <div className="mt-10 flex flex-col gap-3 sm:max-w-xs">
                    <PrimaryButton
                      onClick={() =>
                        go(() => {
                          if (introStep < UMFRAGE_INTRO_STEPS.length - 1) {
                            setIntroStep((s) => s + 1);
                          } else {
                            setStep(0);
                            setPhase("questions");
                          }
                        }, 1)
                      }
                    >
                      {intro.cta}
                    </PrimaryButton>
                    {introStep > 0 ? (
                      <button
                        type="button"
                        onClick={() => go(() => setIntroStep((s) => s - 1), -1)}
                        className="text-sm font-medium text-ink3 transition-colors hover:text-ink"
                      >
                        Zurück
                      </button>
                    ) : null}
                  </div>
                </section>
              ) : null}

              {phase === "questions" && current ? (
                <section>
                  <p className="font-mono-hero text-[11px] uppercase tracking-[1.3px] text-amber">
                    Frage {step + 1} von {visible.length}
                  </p>
                  <h2 className="mt-3 font-serif-hero text-[1.55rem] font-medium leading-[1.12] tracking-[-0.035em] text-ink sm:text-[1.95rem]">
                    {current.title}
                  </h2>
                  {current.hint ? (
                    <p className="mt-2 text-sm text-ink3">{current.hint}</p>
                  ) : null}

                  <div className="mt-7 space-y-2.5">
                    {current.type === "single" || current.type === "multi"
                      ? current.options?.map((opt) => {
                          const selected =
                            current.type === "single"
                              ? answers[current.id] === opt.id
                              : Array.isArray(answers[current.id]) &&
                                (answers[current.id] as string[]).includes(opt.id);
                          return (
                            <div key={opt.id}>
                              <OptionButton
                                selected={Boolean(selected)}
                                onClick={() =>
                                  current.type === "single"
                                    ? setSingle(
                                        current.id,
                                        opt.id,
                                        !opt.allowText,
                                      )
                                    : toggleMulti(current, opt.id)
                                }
                              >
                                {opt.label}
                              </OptionButton>
                              {opt.allowText && selected ? (
                                <input
                                  type="text"
                                  autoFocus
                                  value={otherTexts[current.id] || ""}
                                  onChange={(e) =>
                                    setOtherTexts((prev) => ({
                                      ...prev,
                                      [current.id]: e.target.value,
                                    }))
                                  }
                                  placeholder="Bitte kurz ergänzen …"
                                  className="mt-2 w-full rounded-2xl border border-ink/10 bg-white/70 px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-amber"
                                />
                              ) : null}
                            </div>
                          );
                        })
                      : null}

                    {current.type === "scale" && current.scaleMin && current.scaleMax ? (
                      <div className="grid gap-2">
                        {Array.from(
                          { length: current.scaleMax - current.scaleMin + 1 },
                          (_, i) => current.scaleMin! + i,
                        ).map((n) => (
                          <OptionButton
                            key={n}
                            selected={answers[current.id] === n}
                            onClick={() => setScale(current.id, n)}
                          >
                            <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-ink/[0.06] text-sm font-semibold text-ink">
                              {n}
                            </span>
                            <span className="ml-3 text-ink2">
                              {current.scaleLabels?.[n] ?? ""}
                            </span>
                          </OptionButton>
                        ))}
                      </div>
                    ) : null}

                    {current.type === "text" ? (
                      <textarea
                        value={
                          typeof answers[current.id] === "string"
                            ? (answers[current.id] as string)
                            : ""
                        }
                        onChange={(e) =>
                          setAnswers((prev) => ({
                            ...prev,
                            [current.id]: e.target.value.slice(0, 2000),
                          }))
                        }
                        rows={4}
                        placeholder={current.placeholder}
                        className="w-full rounded-2xl border border-ink/10 bg-white/70 px-4 py-3 text-[15px] text-ink outline-none transition-colors focus:border-amber"
                      />
                    ) : null}
                  </div>

                  <div className="mt-8 flex items-center justify-between gap-3">
                    <button
                      type="button"
                      onClick={goPrevQuestion}
                      className="rounded-xl px-3 py-2.5 text-sm font-medium text-ink3 transition-colors hover:text-ink"
                    >
                      Zurück
                    </button>
                    {showNextButton ? (
                      <PrimaryButton
                        className="w-auto min-w-[140px] px-6"
                        disabled={!canAdvance}
                        onClick={goNextQuestion}
                      >
                        {current.type === "text" &&
                        !(typeof answers[current.id] === "string" && (answers[current.id] as string).trim())
                          ? "Überspringen"
                          : "Weiter"}
                      </PrimaryButton>
                    ) : (
                      <p className="text-xs text-ink3">Antwort tippen — geht automatisch weiter</p>
                    )}
                  </div>
                </section>
              ) : null}

              {phase === "contact" && contactStep === 0 ? (
                <section>
                  <p className="font-mono-hero text-[11px] uppercase tracking-[1.4px] text-amber">
                    Fast geschafft
                  </p>
                  <h2 className="mt-3 font-serif-hero text-[1.7rem] font-medium leading-[1.1] tracking-[-0.035em] text-ink sm:text-[2.1rem]">
                    Möchten Sie die Auswertung erhalten?
                  </h2>
                  <p className="mt-3 text-[15px] leading-relaxed text-ink2">
                    Kostenlos, anonymisiert, nach Abschluss der Befragung.
                  </p>

                  <div className="mt-7 space-y-2.5">
                    <OptionButton
                      selected={wantsResults}
                      onClick={() => setWantsResults(true)}
                    >
                      Ja, Auswertung bitte zusenden
                    </OptionButton>
                    <OptionButton
                      selected={!wantsResults}
                      onClick={() => setWantsResults(false)}
                    >
                      Nein, nur teilnehmen
                    </OptionButton>
                  </div>

                  {wantsResults ? (
                    <div className="mt-6 space-y-3">
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full rounded-2xl border border-ink/10 bg-white/70 px-4 py-3.5 text-[15px] outline-none focus:border-amber"
                        placeholder="Ihre E-Mail"
                      />
                      <input
                        type="text"
                        value={company}
                        onChange={(e) => setCompany(e.target.value.slice(0, 200))}
                        className="w-full rounded-2xl border border-ink/10 bg-white/70 px-4 py-3.5 text-[15px] outline-none focus:border-amber"
                        placeholder="Brauerei (optional)"
                      />
                    </div>
                  ) : null}

                  <div className="mt-8 flex items-center justify-between gap-3">
                    <button
                      type="button"
                      onClick={() =>
                        go(() => {
                          setPhase("questions");
                          setStep(visible.length - 1);
                        }, -1)
                      }
                      className="rounded-xl px-3 py-2.5 text-sm font-medium text-ink3 hover:text-ink"
                    >
                      Zurück
                    </button>
                    <PrimaryButton
                      className="w-auto min-w-[140px] px-6"
                      disabled={
                        wantsResults && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
                      }
                      onClick={() => go(() => setContactStep(1), 1)}
                    >
                      Weiter
                    </PrimaryButton>
                  </div>
                </section>
              ) : null}

              {phase === "contact" && contactStep === 1 ? (
                <section>
                  <p className="font-mono-hero text-[11px] uppercase tracking-[1.4px] text-amber">
                    Optional
                  </p>
                  <h2 className="mt-3 font-serif-hero text-[1.7rem] font-medium leading-[1.1] tracking-[-0.035em] text-ink sm:text-[2.1rem]">
                    Persönliche Einschätzung?
                  </h2>
                  <p className="mt-3 text-[15px] leading-relaxed text-ink2">
                    Welche Marketingprozesse sich bei Ihnen schon heute vereinfachen lassen.
                  </p>

                  <div className="mt-7 space-y-2.5">
                    {(
                      [
                        ["ja", "Ja, gerne"],
                        ["spaeter", "Vielleicht später"],
                        ["nein", "Nein, danke"],
                      ] as const
                    ).map(([id, label]) => (
                      <OptionButton
                        key={id}
                        selected={personalAnalysis === id}
                        onClick={() => setPersonalAnalysis(id)}
                      >
                        {label}
                      </OptionButton>
                    ))}
                  </div>

                  {error ? <p className="mt-4 text-sm text-red-700">{error}</p> : null}

                  <div className="mt-8 flex items-center justify-between gap-3">
                    <button
                      type="button"
                      onClick={() => go(() => setContactStep(0), -1)}
                      className="rounded-xl px-3 py-2.5 text-sm font-medium text-ink3 hover:text-ink"
                    >
                      Zurück
                    </button>
                    <PrimaryButton
                      className="w-auto min-w-[160px] px-6"
                      disabled={loading || !personalAnalysis}
                      onClick={handleSubmit}
                    >
                      {loading ? "Einen Moment …" : "Absenden"}
                    </PrimaryButton>
                  </div>
                </section>
              ) : null}

              {phase === "done" ? (
                <section className="text-center sm:text-left">
                  <p className="font-mono-hero text-[11px] uppercase tracking-[1.4px] text-amber">
                    Danke
                  </p>
                  <h1 className="mt-4 font-serif-hero text-[2.2rem] font-medium leading-[1.08] tracking-[-0.045em] text-ink sm:text-[2.6rem]">
                    Ihre Stimme zählt.
                  </h1>
                  <p className="mt-5 max-w-md text-[16px] leading-relaxed text-ink2">
                    Die Antworten fließen in den Branchenreport und in BrewAI – die
                    Marketingplattform speziell für Brauereien.
                  </p>
                  {email.trim() ? (
                    <p className="mt-3 max-w-md text-sm text-ink3">
                      Die Auswertung kommt per E-Mail, sobald genug Brauereien teilgenommen haben.
                    </p>
                  ) : null}
                  <div className="mt-10 sm:max-w-xs">
                    <Link
                      href="/"
                      className="inline-flex w-full items-center justify-center rounded-2xl bg-[#c65a20] px-5 py-3.5 text-sm font-semibold text-white transition-all hover:bg-[#d46830] hover:shadow-[0_12px_32px_-12px_rgba(224,122,64,0.55)]"
                    >
                      Mehr über BrewAI
                    </Link>
                  </div>
                </section>
              ) : null}
            </motion.div>
          </AnimatePresence>
        </div>

        {phase === "intro" ? (
          <p className="mt-8 text-center font-mono-hero text-[10px] uppercase tracking-[1.2px] text-ink3">
            {UMFRAGE_META.title}
          </p>
        ) : null}
      </div>
    </main>
  );
}
