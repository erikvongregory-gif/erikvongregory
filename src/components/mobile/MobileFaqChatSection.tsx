"use client";

import { FormEvent, useEffect, useId, useRef, useState, type CSSProperties } from "react";
import { trackEvent } from "@/lib/analytics";
import { scrollToSection } from "@/lib/scrollToSection";
import { TRESENGESPRAECH_FAQS } from "@/lib/tresengespraechFaqs";
import { cn } from "@/lib/utils";

type ChatEntry =
  | { id: string; kind: "user"; text: string }
  | { id: string; kind: "assistant"; text: string; suggestContact?: boolean }
  | { id: string; kind: "typing" };

function SendArrowIcon() {
  return (
    <svg width="14" height="12" viewBox="0 0 14 12" fill="none" aria-hidden>
      <path
        d="M1 6 H12 M8 2 L12 6 L8 10"
        stroke="#E89259"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function TypingBubble() {
  return (
    <div className="flex justify-end" aria-hidden>
      <span className="mobile-faq-typing-bubble flex max-w-[85%] items-center gap-1 rounded-[12px] rounded-br-[3px] bg-amber px-4 py-3 shadow-[0_1px_0_rgba(255,255,255,0.15)_inset]">
        <span className="mobile-faq-typing-dot h-1.5 w-1.5 rounded-full bg-paper/90" />
        <span className="mobile-faq-typing-dot h-1.5 w-1.5 rounded-full bg-paper/90" />
        <span className="mobile-faq-typing-dot h-1.5 w-1.5 rounded-full bg-paper/90" />
      </span>
    </div>
  );
}

function createBubbleReveal(inView: boolean, reducedMotion: boolean) {
  let step = 0;
  return (): { className?: string; style?: CSSProperties } => {
    const index = step++;
    if (!inView || reducedMotion) return {};
    return {
      className: "mobile-faq-bubble--enter",
      style: { animationDelay: `${index * 80}ms` },
    };
  };
}

function newId() {
  return `faq-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export function MobileFaqChatSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const inputId = useId();
  const [inView, setInView] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [draft, setDraft] = useState("");
  const [liveEntries, setLiveEntries] = useState<ChatEntry[]>([]);
  const [isAsking, setIsAsking] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReducedMotion(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  useEffect(() => {
    if (reducedMotion) {
      setInView(true);
      return;
    }
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [reducedMotion]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth", block: "nearest" });
  }, [liveEntries, reducedMotion]);

  const askQuestion = async (rawQuestion: string) => {
    const question = rawQuestion.trim();
    if (!question || isAsking) return;

    setIsAsking(true);
    const userId = newId();
    const typingId = newId();

    setLiveEntries((prev) => [
      ...prev,
      { id: userId, kind: "user", text: question },
      { id: typingId, kind: "typing" },
    ]);
    setDraft("");

    trackEvent("faq_question_asked", { source: "mobile_tresengespraech" });

    try {
      const res = await fetch("/api/faq-ask", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ question }),
      });
      const payload = (await res.json().catch(() => null)) as {
        answer?: string;
        suggestContact?: boolean;
        confidence?: number;
        error?: string;
      } | null;

      const answer =
        payload?.answer?.trim() ||
        "Das beantworte ich dir am besten direkt — schreib mir kurz im Kontaktformular.";

      setLiveEntries((prev) => {
        const withoutTyping = prev.filter((e) => e.id !== typingId);
        return [
          ...withoutTyping,
          {
            id: newId(),
            kind: "assistant",
            text: answer,
            suggestContact: Boolean(payload?.suggestContact) || res.status === 429,
          },
        ];
      });

      trackEvent("faq_answer_received", {
        source: "mobile_tresengespraech",
        status: res.status,
        confidence: payload?.confidence ?? null,
        suggestContact: Boolean(payload?.suggestContact),
      });
    } catch {
      setLiveEntries((prev) => {
        const withoutTyping = prev.filter((e) => e.id !== typingId);
        return [
          ...withoutTyping,
          {
            id: newId(),
            kind: "assistant",
            text: "Gerade gibt es ein technisches Problem — schreib mir kurz im Kontaktformular, dann melde ich mich persönlich.",
            suggestContact: true,
          },
        ];
      });
    } finally {
      setIsAsking(false);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    void askQuestion(draft);
  };

  const anim = createBubbleReveal(inView, reducedMotion);
  const headerAnim = anim();
  const bodyAnim = anim();
  const sepAnim = anim();

  return (
    <section
      ref={sectionRef}
      id="section-fragen"
      aria-labelledby="faq-heading"
      className="mobile-faq-chat w-full min-h-full bg-paper pt-10 pb-9 font-sans-tight text-ink"
    >
      <div id="faq" className="scroll-mt-24" aria-hidden />
      <div className="px-5">
        <div className="mb-3.5 flex items-center gap-2.5">
          <span className="h-px w-7 shrink-0 bg-amber" aria-hidden />
          <p className="m-0 font-mono-hero text-[11px] tracking-[1.4px] text-amber uppercase">
            TRESENGESPRÄCH · 05 ANTWORTEN
          </p>
        </div>
        <h2
          id="faq-heading"
          className="m-0 font-serif-hero text-[36px] leading-[1.02] font-normal tracking-[-1px] text-ink"
        >
          Was Brauer
          <br />
          mich <em className="font-medium text-amber italic">fragen</em>.
        </h2>
      </div>

      <div className="mt-8">
        <header
          className={cn(
            headerAnim.className,
            "mx-4 flex items-center gap-2.5 rounded-t-[14px] border border-ink/10 border-b-0 bg-white px-4 py-3",
          )}
          style={headerAnim.style}
        >
          <span
            role="img"
            aria-label="Profilbild des Inhabers Erik"
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-malt font-serif-hero text-[15px] font-medium text-amber2 italic"
          >
            E
          </span>
          <div className="min-w-0 flex-1">
            <p className="m-0 font-sans-tight text-[13.5px] font-semibold text-ink">BrewAI</p>
            <p className="m-0 flex items-center gap-1.5 font-mono-hero text-[9.5px] tracking-[0.8px] text-ink3">
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#4CAF50]" aria-hidden />
              Online · antwortet meist in 24 h
            </p>
          </div>
        </header>

        <div
          className={cn(
            bodyAnim.className,
            "mx-4 rounded-b-[14px] border border-ink/10 border-t-0 bg-white px-3.5 pt-4 pb-4",
          )}
          style={bodyAnim.style}
        >
          <dl aria-label="Fünf häufige Fragen mit Antworten">
            <p
              className={cn(
                sepAnim.className,
                "mt-1 mb-3.5 text-center font-mono-hero text-[9px] tracking-[1px] text-ink3 uppercase",
              )}
              style={sepAnim.style}
              aria-hidden
            >
              — Häufig gestellt —
            </p>

            {TRESENGESPRAECH_FAQS.map((faq, i) => {
              const qAnim = anim();
              const aAnim = anim();
              const isLast = i === TRESENGESPRAECH_FAQS.length - 1;

              return (
                <div key={faq.q} className={cn(!isLast && "mb-[18px]")}>
                  <dt
                    className={cn(qAnim.className, "m-0 mb-1.5 flex justify-start")}
                    style={qAnim.style}
                  >
                    <span className="max-w-[82%] rounded-[12px] rounded-bl-[3px] bg-bubble px-3.5 py-[9px] pb-2.5 font-sans-tight text-[13.5px] leading-[1.4] text-ink">
                      {faq.q}
                    </span>
                  </dt>
                  <dd className={cn(aAnim.className, "m-0 flex flex-col items-end")} style={aAnim.style}>
                    <span className="max-w-[85%] rounded-[12px] rounded-br-[3px] bg-amber px-3.5 py-2.5 pb-3 font-sans-tight text-[13.5px] leading-[1.45] text-white shadow-[0_1px_0_rgba(255,255,255,0.15)_inset]">
                      {faq.a}
                    </span>
                    <p className="mt-[3px] text-right font-mono-hero text-[9px] tracking-[0.4px] text-ink3" aria-hidden>
                      meist binnen 24 h{" "}
                      <span aria-hidden>✓✓</span>
                    </p>
                  </dd>
                </div>
              );
            })}
          </dl>

          {liveEntries.length > 0 ? (
            <div
              className="mt-4 border-t border-dashed border-ink/10 pt-4"
              role="log"
              aria-live="polite"
              aria-relevant="additions"
              aria-label="Dein Chat-Verlauf"
            >
              {liveEntries.map((entry) => {
                if (entry.kind === "user") {
                  return (
                    <div key={entry.id} className="mb-1.5 flex justify-start">
                      <p className="m-0 max-w-[82%] rounded-[12px] rounded-bl-[3px] bg-bubble px-3.5 py-[9px] pb-2.5 font-sans-tight text-[13.5px] leading-[1.4] text-ink">
                        {entry.text}
                      </p>
                    </div>
                  );
                }
                if (entry.kind === "typing") {
                  return (
                    <div key={entry.id} className="mb-1.5" aria-busy="true" aria-label="BrewAI schreibt">
                      <TypingBubble />
                    </div>
                  );
                }
                return (
                  <div key={entry.id} className="mb-[18px] last:mb-0">
                    <div className="flex flex-col items-end">
                      <p className="m-0 max-w-[85%] rounded-[12px] rounded-br-[3px] bg-amber px-3.5 py-2.5 pb-3 font-sans-tight text-[13.5px] leading-[1.45] text-white shadow-[0_1px_0_rgba(255,255,255,0.15)_inset]">
                        {entry.text}
                      </p>
                      <p className="mt-[3px] text-right font-mono-hero text-[9px] tracking-[0.4px] text-ink3" aria-hidden>
                        meist binnen 24 h{" "}
                        <span aria-hidden>✓✓</span>
                      </p>
                      {entry.suggestContact ? (
                        <button
                          type="button"
                          onClick={() => {
                            trackEvent("faq_chat_cta_clicked", { source: "answer_fallback" });
                            scrollToSection("#contact");
                          }}
                          className="mt-2 border-0 bg-transparent p-0 font-sans-tight text-[12px] font-semibold text-amber underline-offset-2 hover:underline"
                        >
                          Zum Kontaktformular →
                        </button>
                      ) : null}
                    </div>
                  </div>
                );
              })}
              <div ref={chatEndRef} className="h-px" aria-hidden />
            </div>
          ) : null}
        </div>

        <form
          onSubmit={handleSubmit}
          className="mx-4 mt-3.5 flex items-center gap-2 rounded-full border border-ink/10 bg-white py-2 pr-2 pl-4"
        >
          <label htmlFor={inputId} className="sr-only">
            Deine Frage
          </label>
          <input
            ref={inputRef}
            id={inputId}
            type="text"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder="Schreib mir deine Frage…"
            disabled={isAsking}
            maxLength={500}
            autoComplete="off"
            enterKeyHint="send"
            className="min-w-0 flex-1 border-0 bg-transparent font-sans-tight text-[13.5px] text-ink outline-none placeholder:text-ink3 disabled:opacity-60"
          />
          <button
            type="submit"
            disabled={isAsking || draft.trim().length < 2}
            aria-label="Frage absenden"
            className="flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-full border-0 bg-ink text-paper transition-colors hover:bg-[#28221b] disabled:cursor-not-allowed disabled:opacity-45"
          >
            <SendArrowIcon />
          </button>
        </form>
      </div>
    </section>
  );
}
