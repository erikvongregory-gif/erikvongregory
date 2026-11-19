"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  UMFRAGE_CONSENT_TEXT,
  UMFRAGE_FINAL_NOTE,
  UMFRAGE_INTRO_STEPS,
  UMFRAGE_META,
  UMFRAGE_PART_COUNT,
  UMFRAGE_PARTS,
  UMFRAGE_QUESTIONS,
  UMFRAGE_VARIANTS,
  type UmfrageOption,
  type UmfrageQuestion,
} from "@/content/umfrage";
import { CheckIcon } from "@/components/neu/parlo/ParloUi";
import { EASE } from "@/components/neu-motion/motion-utils";
import { cn } from "@/lib/utils";

type AnswerValue = string | string[] | Record<string, string>;
type Answers = Record<string, AnswerValue>;
type Phase = "intro" | "questions" | "contact" | "done";

const slide = {
  enter: (dir: number) => ({ x: dir > 0 ? 36 : -36, opacity: 0, filter: "blur(8px)" }),
  center: { x: 0, opacity: 1, filter: "blur(0px)" },
  exit: (dir: number) => ({ x: dir > 0 ? -24 : 24, opacity: 0, filter: "blur(6px)" }),
};

function isVisible(q: UmfrageQuestion, answers: Answers): boolean {
  if (!q.showIf) return true;
  const current = answers[q.showIf.questionId];
  if (typeof current === "string") return q.showIf.values.includes(current);
  if (Array.isArray(current)) return current.some((v) => q.showIf!.values.includes(v));
  return false;
}

function getVisibleQuestions(answers: Answers) {
  return UMFRAGE_QUESTIONS.filter((q) => isVisible(q, answers));
}

function isAnswered(q: UmfrageQuestion, answers: Answers): boolean {
  const value = answers[q.id];
  if (q.type === "info") return true;
  if (q.type === "text") {
    if (!q.required) return true;
    return typeof value === "string" && value.trim().length > 0;
  }
  if (!q.required) return true;
  if (q.type === "single") return typeof value === "string" && value.length > 0;
  if (q.type === "multi" || q.type === "rank") return Array.isArray(value) && value.length > 0;
  if (q.type === "groups") {
    if (!value || typeof value !== "object" || Array.isArray(value)) return false;
    return (q.groups ?? []).every((g) => Boolean((value as Record<string, string>)[g.id]));
  }
  return false;
}

const isEmail = (s: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);

function OptionButton({
  selected,
  onClick,
  children,
  badge,
}: {
  selected: boolean;
  onClick: () => void;
  children: React.ReactNode;
  badge?: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={cn(
        "flex w-full items-center gap-3 rounded-2xl border px-4 py-3.5 text-left text-[15px] transition-colors duration-200",
        selected
          ? "border-foreground bg-foreground text-background"
          : "border-border bg-card/70 text-foreground/80 hover:border-foreground/25 hover:bg-card hover:text-foreground",
      )}
    >
      <span
        className={cn(
          "nm-check inline-flex size-5 shrink-0 items-center justify-center rounded-full border font-mono text-[11px]",
          selected ? "is-on border-background/40 bg-background/15" : "border-foreground/20",
        )}
        aria-hidden
      >
        {badge ?? (selected ? <CheckIcon className="size-3" /> : null)}
      </span>
      <span className="min-w-0 flex-1">{children}</span>
    </button>
  );
}

function ChipButton({
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
      aria-pressed={selected}
      className={cn(
        "rounded-full border px-3.5 py-2 text-[14px] transition-colors duration-200",
        selected
          ? "border-foreground bg-foreground text-background"
          : "border-border bg-card/70 text-foreground/80 hover:border-foreground/25 hover:text-foreground",
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
        "inline-flex h-11 w-full items-center justify-center rounded-full bg-foreground px-5 text-sm font-medium text-background transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40",
        className,
      )}
    >
      {children}
    </button>
  );
}

function BackButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="rounded-xl px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
    >
      Zurück
    </button>
  );
}

const fieldClass =
  "w-full rounded-2xl border border-border bg-card/70 px-4 py-3.5 text-[15px] text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-foreground/30";

const eyebrowClass = "font-mono text-[11px] uppercase tracking-[1.3px] text-muted-foreground";
const questionTitleClass =
  "mt-3 text-[1.45rem] font-medium leading-[1.15] tracking-tight text-foreground sm:text-[1.85rem]";

export function UmfragePage() {
  const [phase, setPhase] = useState<Phase>("intro");
  const [introStep, setIntroStep] = useState(0);
  const [step, setStep] = useState(0);
  const [contactStep, setContactStep] = useState(0);
  const [dir, setDir] = useState(1);
  const [answers, setAnswers] = useState<Answers>({});
  /** Freitexte zu Optionen („Sonstiges:“) und Zusatzfelder, Schlüssel = Antwort-Key. */
  const [texts, setTexts] = useState<Record<string, string>>({});
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [contact, setContact] = useState("");
  const [consent, setConsent] = useState(false);
  const [finalNote, setFinalNote] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const autoAdvanceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const visible = useMemo(() => getVisibleQuestions(answers), [answers]);
  const current = visible[step];

  const totalFunnel = UMFRAGE_INTRO_STEPS.length + visible.length + 2;
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

  const setSingle = (q: UmfrageQuestion, opt: UmfrageOption) => {
    setAnswers((prev) => ({ ...prev, [q.id]: opt.id }));
    if (!opt.allowText && !q.extra) scheduleAdvance();
  };

  const toggleMulti = (q: UmfrageQuestion, opt: UmfrageOption) => {
    setAnswers((prev) => {
      const raw = prev[q.id];
      let existing = Array.isArray(raw) ? [...raw] : [];
      const idx = existing.indexOf(opt.id);
      if (idx >= 0) {
        existing.splice(idx, 1);
      } else if (opt.exclusive) {
        existing = [opt.id];
      } else {
        const exclusiveIds = new Set(
          (q.options ?? []).filter((o) => o.exclusive).map((o) => o.id),
        );
        existing = existing.filter((id) => !exclusiveIds.has(id));
        if (q.maxSelect && existing.length >= q.maxSelect) return prev;
        existing.push(opt.id);
      }
      return { ...prev, [q.id]: existing };
    });
  };

  const setGroup = (q: UmfrageQuestion, groupId: string, optionId: string) => {
    setAnswers((prev) => {
      const raw = prev[q.id];
      const base =
        raw && typeof raw === "object" && !Array.isArray(raw) ? { ...raw } : {};
      base[groupId] = optionId;
      return { ...prev, [q.id]: base };
    });
  };

  const setText = (key: string, value: string, max = 2000) =>
    setTexts((prev) => ({ ...prev, [key]: value.slice(0, max) }));

  const canAdvance = current ? isAnswered(current, answers) : false;
  const selectedSingleNeedsText =
    current?.type === "single" &&
    typeof answers[current.id] === "string" &&
    Boolean(current.options?.find((o) => o.id === answers[current.id])?.allowText);
  const showNextButton =
    current?.type !== "single" || selectedSingleNeedsText || Boolean(current?.extra);

  const isSelected = (q: UmfrageQuestion, optId: string) => {
    const v = answers[q.id];
    if (q.type === "single") return v === optId;
    return Array.isArray(v) && v.includes(optId);
  };

  const buildPayloadAnswers = () => {
    const out: Record<string, unknown> = {};
    for (const q of visible) {
      if (q.type === "info") continue;
      const value = answers[q.id];
      if (q.type === "text") {
        const t = typeof value === "string" ? value.trim() : "";
        if (t) out[q.id] = t;
        continue;
      }
      if (value === undefined) continue;
      out[q.id] = value;

      const selectedOpts = (q.options ?? []).filter((o) => isSelected(q, o.id));
      if (selectedOpts.some((o) => o.allowText)) {
        const t = (texts[`${q.id}_sonstiges`] ?? "").trim();
        if (t) out[`${q.id}_sonstiges`] = t;
      }
      if (q.extra) {
        const key = `${q.id}_${q.extra.id}`;
        const t = (texts[key] ?? "").trim();
        if (t) out[key] = t;
      }
    }
    const note = finalNote.trim();
    if (note) out[UMFRAGE_FINAL_NOTE.id] = note;
    return out;
  };

  const contactFilled = Boolean(name.trim() || company.trim() || contact.trim());
  const contactInvalid =
    contact.trim().includes("@") && !isEmail(contact.trim());
  const contactRequested =
    answers.beispielmotiv === "ja" ||
    answers.beispielmotiv === "vielleicht" ||
    answers.gespraech === "ja";

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    try {
      const withContact = contactFilled && consent;
      const res = await fetch("/api/umfrage", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          answers: buildPayloadAnswers(),
          ...(withContact
            ? {
                name: name.trim(),
                company: company.trim(),
                contact: contact.trim(),
                consent: true,
              }
            : {}),
        }),
      });
      const data = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) throw new Error(data.error || "Senden fehlgeschlagen");

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

  // Lange Fragen: bei jedem Schrittwechsel wieder oben anfangen.
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [animKey]);

  const intro = UMFRAGE_INTRO_STEPS[introStep];
  const part = current ? UMFRAGE_PARTS[current.part] : undefined;
  const isFirstInPart = current ? visible[step - 1]?.part !== current.part : false;

  return (
    <main id="main" className="relative z-20 min-h-[100dvh] overflow-hidden pt-20">
      <div className="relative mx-auto flex min-h-[calc(100dvh-5rem)] max-w-xl flex-col px-5 pb-16 pt-8 sm:px-6 sm:pt-12">
        <header className="mb-6 shrink-0">
          <div className="flex items-center justify-between gap-3">
            <p className="font-mono text-[10px] uppercase tracking-[1.5px] text-muted-foreground sm:text-[11px]">
              {phase === "questions" && part
                ? `Teil ${current!.part} von ${UMFRAGE_PART_COUNT} · ${part.title}`
                : "Brauerei-Umfrage 2026"}
            </p>
            {phase !== "done" ? (
              <p className="font-mono text-[10px] uppercase tracking-wide text-muted-foreground">
                {Math.round(progress * 100)}%
              </p>
            ) : null}
          </div>
          {phase !== "done" ? (
            <div className="mt-3 h-px overflow-hidden bg-border" aria-hidden>
              <motion.div
                className="h-px origin-left bg-foreground"
                animate={{ scaleX: Math.max(0.06, progress) }}
                transition={{ duration: 0.7, ease: EASE.draw }}
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
              transition={{ duration: 0.5, ease: EASE.rise }}
              className="w-full"
            >
              {phase === "intro" && intro ? (
                <section>
                  <p className="font-mono text-[11px] uppercase tracking-[1.4px] text-muted-foreground">
                    {intro.eyebrow}
                  </p>
                  <h1 className="mt-4 text-[2.15rem] font-medium leading-[1.08] tracking-tight text-foreground sm:text-[2.75rem]">
                    {intro.title}
                  </h1>
                  <p className="mt-5 max-w-md text-[16px] leading-relaxed text-foreground/80 sm:text-[17px]">
                    {intro.body}
                  </p>
                  {intro.chips.length ? (
                    <ul className="mt-6 flex flex-wrap gap-2">
                      {intro.chips.map((chip) => (
                        <li
                          key={chip}
                          className="rounded-full border border-border bg-card/70 px-3 py-1.5 text-[13px] text-foreground/80"
                        >
                          {chip}
                        </li>
                      ))}
                    </ul>
                  ) : null}
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
                        className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                      >
                        Zurück
                      </button>
                    ) : null}
                  </div>
                </section>
              ) : null}

              {phase === "questions" && current ? (
                <section>
                  {isFirstInPart && part ? (
                    <p className="mb-4 text-sm italic text-muted-foreground">{part.subtitle}</p>
                  ) : null}

                  {current.type === "info" ? (
                    <>
                      <h2 className={questionTitleClass}>{current.title}</h2>
                      {current.hint ? (
                        <p className="mt-2 text-[15px] leading-relaxed text-foreground/80">
                          {current.hint}
                        </p>
                      ) : null}
                      <div className="mt-6 grid gap-3">
                        {UMFRAGE_VARIANTS.map((v) => (
                          <article
                            key={v.key}
                            className="rounded-2xl border border-border bg-card/70 px-4 py-4"
                          >
                            <p className="font-mono text-[10px] uppercase tracking-[1.4px] text-muted-foreground">
                              {v.eyebrow}
                            </p>
                            <h3 className="mt-1 text-[17px] font-medium text-foreground">
                              {v.title}
                            </h3>
                            <ul className="mt-3 space-y-1.5 text-[14px] leading-snug text-foreground/80">
                              {v.points.map((p) => (
                                <li key={p} className="flex gap-2">
                                  <span aria-hidden className="mt-[7px] size-1 shrink-0 rounded-full bg-foreground/50" />
                                  <span>{p}</span>
                                </li>
                              ))}
                            </ul>
                          </article>
                        ))}
                      </div>
                    </>
                  ) : (
                    <>
                      <p className={eyebrowClass}>Frage {current.n}</p>
                      <h2 className={questionTitleClass}>{current.title}</h2>
                      {current.hint ? (
                        <p className="mt-2 text-sm text-muted-foreground">{current.hint}</p>
                      ) : null}
                    </>
                  )}

                  <div className="mt-7 space-y-2.5">
                    {current.type === "single" || current.type === "multi"
                      ? current.options?.map((opt) => {
                          const selected = isSelected(current, opt.id);
                          return (
                            <div key={opt.id}>
                              <OptionButton
                                selected={selected}
                                onClick={() =>
                                  current.type === "single"
                                    ? setSingle(current, opt)
                                    : toggleMulti(current, opt)
                                }
                              >
                                {opt.label}
                              </OptionButton>
                              {opt.allowText && selected ? (
                                <input
                                  type="text"
                                  autoFocus
                                  value={texts[`${current.id}_sonstiges`] || ""}
                                  onChange={(e) =>
                                    setText(`${current.id}_sonstiges`, e.target.value, 500)
                                  }
                                  placeholder="Bitte kurz ergänzen …"
                                  className={cn(fieldClass, "mt-2")}
                                />
                              ) : null}
                            </div>
                          );
                        })
                      : null}

                    {current.type === "rank"
                      ? current.options?.map((opt) => {
                          const order = Array.isArray(answers[current.id])
                            ? (answers[current.id] as string[])
                            : [];
                          const pos = order.indexOf(opt.id);
                          return (
                            <OptionButton
                              key={opt.id}
                              selected={pos >= 0}
                              onClick={() => toggleMulti(current, opt)}
                              badge={pos >= 0 && !opt.exclusive ? pos + 1 : undefined}
                            >
                              {opt.label}
                            </OptionButton>
                          );
                        })
                      : null}

                    {current.type === "groups"
                      ? current.groups?.map((g) => {
                          const value = answers[current.id];
                          const chosen =
                            value && typeof value === "object" && !Array.isArray(value)
                              ? (value as Record<string, string>)[g.id]
                              : undefined;
                          return (
                            <div
                              key={g.id}
                              className="rounded-2xl border border-border bg-card/40 px-4 py-3.5"
                            >
                              <p className="text-sm font-medium text-foreground">{g.label}</p>
                              <div className="mt-2.5 flex flex-wrap gap-2">
                                {g.options.map((opt) => (
                                  <ChipButton
                                    key={opt.id}
                                    selected={chosen === opt.id}
                                    onClick={() => setGroup(current, g.id, opt.id)}
                                  >
                                    {opt.label}
                                  </ChipButton>
                                ))}
                              </div>
                            </div>
                          );
                        })
                      : null}

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
                        className={fieldClass}
                      />
                    ) : null}

                    {current.extra ? (
                      <label className="block pt-3">
                        <span className="mb-1.5 block text-sm text-muted-foreground">
                          {current.extra.label}
                        </span>
                        {current.extra.multiline ? (
                          <textarea
                            rows={3}
                            value={texts[`${current.id}_${current.extra.id}`] || ""}
                            onChange={(e) =>
                              setText(`${current.id}_${current.extra!.id}`, e.target.value)
                            }
                            placeholder={current.extra.placeholder}
                            className={fieldClass}
                          />
                        ) : (
                          <span className="flex items-center gap-3">
                            <input
                              type="text"
                              inputMode={current.extra.inputMode}
                              value={texts[`${current.id}_${current.extra.id}`] || ""}
                              onChange={(e) =>
                                setText(`${current.id}_${current.extra!.id}`, e.target.value, 40)
                              }
                              placeholder={current.extra.placeholder}
                              className={cn(fieldClass, "max-w-[180px]")}
                            />
                            {current.extra.suffix ? (
                              <span className="text-sm text-muted-foreground">
                                {current.extra.suffix}
                              </span>
                            ) : null}
                          </span>
                        )}
                      </label>
                    ) : null}
                  </div>

                  <div className="mt-8 flex items-center justify-between gap-3">
                    <BackButton onClick={goPrevQuestion} />
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
                      <p className="text-xs text-muted-foreground">Antwort tippen, geht automatisch weiter</p>
                    )}
                  </div>
                </section>
              ) : null}

              {phase === "contact" && contactStep === 0 ? (
                <section>
                  <p className={eyebrowClass}>Kontakt · freiwillig</p>
                  <h2 className="mt-3 text-[1.7rem] font-medium leading-[1.1] tracking-tight text-foreground sm:text-[2.1rem]">
                    {contactRequested ? "Wie erreiche ich Sie?" : "Möchten Sie Kontakt hinterlassen?"}
                  </h2>
                  <p className="mt-3 text-[15px] leading-relaxed text-foreground/80">
                    {contactRequested
                      ? "Damit ich Ihnen das Beispielmotiv schicken oder mich für das Gespräch melden kann."
                      : "Nur wenn Sie möchten. Ohne Angaben bleibt die Umfrage komplett anonym."}
                  </p>

                  <div className="mt-6 space-y-3">
                    <input
                      type="text"
                      autoComplete="name"
                      value={name}
                      onChange={(e) => setName(e.target.value.slice(0, 120))}
                      className={fieldClass}
                      placeholder="Name"
                    />
                    <input
                      type="text"
                      autoComplete="organization"
                      value={company}
                      onChange={(e) => setCompany(e.target.value.slice(0, 200))}
                      className={fieldClass}
                      placeholder="Brauerei"
                    />
                    <input
                      type="text"
                      autoComplete="email"
                      value={contact}
                      onChange={(e) => setContact(e.target.value.slice(0, 254))}
                      className={fieldClass}
                      placeholder="Telefon oder E-Mail"
                    />
                    {contactInvalid ? (
                      <p className="text-sm text-destructive">Bitte eine gültige E-Mail-Adresse angeben.</p>
                    ) : null}
                    {contactFilled ? (
                      <label className="flex cursor-pointer items-start gap-3 pt-1 text-sm leading-relaxed text-foreground/80">
                        <input
                          type="checkbox"
                          checked={consent}
                          onChange={(e) => setConsent(e.target.checked)}
                          className="mt-1 size-4 shrink-0 accent-current"
                        />
                        <span>{UMFRAGE_CONSENT_TEXT}</span>
                      </label>
                    ) : null}
                  </div>

                  <div className="mt-8 flex items-center justify-between gap-3">
                    <BackButton
                      onClick={() =>
                        go(() => {
                          setPhase("questions");
                          setStep(visible.length - 1);
                        }, -1)
                      }
                    />
                    <PrimaryButton
                      className="w-auto min-w-[140px] px-6"
                      disabled={contactFilled && (!consent || contactInvalid)}
                      onClick={() => go(() => setContactStep(1), 1)}
                    >
                      {contactFilled ? "Weiter" : "Überspringen"}
                    </PrimaryButton>
                  </div>
                </section>
              ) : null}

              {phase === "contact" && contactStep === 1 ? (
                <section>
                  <p className={eyebrowClass}>Zum Schluss · optional</p>
                  <h2 className="mt-3 text-[1.7rem] font-medium leading-[1.1] tracking-tight text-foreground sm:text-[2.1rem]">
                    {UMFRAGE_FINAL_NOTE.title}
                  </h2>
                  <p className="mt-3 text-[15px] leading-relaxed text-foreground/80">
                    {UMFRAGE_FINAL_NOTE.hint}
                  </p>

                  <textarea
                    value={finalNote}
                    onChange={(e) => setFinalNote(e.target.value.slice(0, 3000))}
                    rows={5}
                    placeholder="Ihre Gedanken …"
                    className={cn(fieldClass, "mt-6")}
                  />

                  {error ? <p className="mt-4 text-sm text-destructive">{error}</p> : null}

                  <div className="mt-8 flex items-center justify-between gap-3">
                    <BackButton onClick={() => go(() => setContactStep(0), -1)} />
                    <PrimaryButton
                      className="w-auto min-w-[160px] px-6"
                      disabled={loading}
                      onClick={handleSubmit}
                    >
                      {loading ? "Einen Moment …" : "Absenden"}
                    </PrimaryButton>
                  </div>
                </section>
              ) : null}

              {phase === "done" ? (
                <section>
                  <p className="font-mono text-[11px] uppercase tracking-[1.4px] text-muted-foreground">
                    Danke
                  </p>
                  <h1 className="mt-4 text-[2.2rem] font-medium leading-[1.08] tracking-tight text-foreground sm:text-[2.6rem]">
                    Prost und vielen Dank!
                  </h1>
                  <p className="mt-5 max-w-md text-[16px] leading-relaxed text-foreground/80">
                    {contactFilled && consent && contactRequested
                      ? "Ich melde mich bei Ihnen, wie gewünscht."
                      : "Ihre Antworten helfen mir sehr."}
                  </p>
                  <p className="mt-3 max-w-md text-sm text-muted-foreground">
                    {UMFRAGE_META.privacyNote}
                  </p>
                  <p className="mt-6 text-sm text-foreground/80">{UMFRAGE_META.author}</p>
                  <div className="mt-10 sm:max-w-xs">
                    <Link
                      href="/"
                      className="inline-flex h-11 w-full items-center justify-center rounded-full bg-foreground px-5 text-sm font-medium text-background transition-opacity hover:opacity-90"
                    >
                      Zur Startseite
                    </Link>
                  </div>
                </section>
              ) : null}
            </motion.div>
          </AnimatePresence>
        </div>

        {phase === "intro" ? (
          <p className="mt-8 text-center font-mono text-[10px] uppercase tracking-[1.2px] text-muted-foreground">
            {UMFRAGE_META.reportName}
          </p>
        ) : null}
      </div>
    </main>
  );
}
