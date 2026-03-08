"use client";

import { useEffect, useState } from "react";
import { LEGAL } from "@/lib/legal";
import { SITE } from "@/lib/siteConfig";

const STEPS = [
  { id: "name", label: "Dein Name", placeholder: "z.B. Max Mustermann" },
  { id: "email", label: "Deine E-Mail", placeholder: "deine@email.de" },
  { id: "message", label: "Nachricht (optional)", placeholder: "Worum geht es?" },
] as const;

export function ContactFunnel() {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [data, setData] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [submittedViaFormspree, setSubmittedViaFormspree] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Alle #contact Klicks abfangen → Funnel öffnen
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest('a[href="#contact"]');
      if (link) {
        e.preventDefault();
        setIsOpen(true);
      }
    };
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  // Body-Scroll sperren wenn offen
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // ESC schließt
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    setTimeout(() => {
      setStep(0);
      setData({ name: "", email: "", message: "" });
      setSubmitted(false);
      setSubmittedViaFormspree(false);
      setError(null);
    }, 300);
  };

  const handleNext = () => {
    if (step < STEPS.length - 1) setStep(step + 1);
    else handleSubmit();
  };

  const handleBack = () => {
    if (step > 0) setStep(step - 1);
  };

  const handleSubmit = async () => {
    const name = data.name.trim().slice(0, 100);
    const email = data.email.trim().slice(0, 254);
    const message = data.message.trim().slice(0, 2000);
    const formId = SITE.formspreeFormId?.trim();

    if (formId) {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`https://formspree.io/f/${formId}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name,
            email,
            message: message || "(keine Nachricht)",
            _subject: `Kontaktanfrage von ${name}`,
          }),
        });
        if (!res.ok) throw new Error("Fehler beim Senden");
        setSubmittedViaFormspree(true);
        setSubmitted(true);
      } catch {
        setError("Die Nachricht konnte nicht gesendet werden. Bitte versuche es später erneut oder schreibe direkt an die E-Mail im Impressum.");
      } finally {
        setLoading(false);
      }
    } else {
      const subject = encodeURIComponent(`Kontaktanfrage von ${name}`);
      const body = encodeURIComponent(
        `Name: ${name}\nE-Mail: ${email}\n\nNachricht:\n${message}`
      );
      window.location.href = `mailto:${LEGAL.email}?subject=${subject}&body=${body}`;
      setSubmitted(true);
    }
  };

  const canProceed = () => {
    if (step === 0) return data.name.trim().length >= 2 && data.name.trim().length <= 100;
    if (step === 1) return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim()) && data.email.trim().length <= 254;
    return true;
  };

  if (!isOpen) return null;

  return (
    <div
      className="contact-funnel-backdrop fixed inset-0 z-[9998] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm animate-contact-funnel-in"
      onClick={(e) => e.target === e.currentTarget && handleClose()}
      role="dialog"
      aria-modal="true"
      aria-labelledby="contact-funnel-title"
    >
      <div
        className="contact-funnel-card relative w-full max-w-md overflow-hidden rounded-2xl border border-white/20 bg-[#0a0f14]/95 shadow-[0_0_60px_rgba(0,0,0,0.5),0_0_0_1px_rgba(255,255,255,0.08),0_0_40px_rgba(34,197,94,0.08)] backdrop-blur-xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Schließen */}
        <button
          type="button"
          onClick={handleClose}
          className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full text-white/60 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
          aria-label="Schließen"
        >
          <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        {/* Fortschritt */}
        <div className="flex gap-2 px-6 pt-6">
          {STEPS.map((_, i) => (
            <div
              key={i}
              className={`h-1 flex-1 rounded-full transition-colors duration-300 ${
                i <= step ? "bg-emerald-500" : "bg-white/15"
              }`}
            />
          ))}
        </div>

        <div className="px-6 pb-8 pt-6">
          {submitted ? (
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400">
                <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h2 id="contact-funnel-title" className="text-xl font-bold text-white">
                Vielen Dank!
              </h2>
              <p className="mt-2 text-white/70">
                {submittedViaFormspree
                  ? "Deine Nachricht wurde gesendet. Ich melde mich bald bei dir."
                  : "Dein E-Mail-Programm öffnet sich – sende die Nachricht ab und ich melde mich bald."}
              </p>
              <button
                type="button"
                onClick={handleClose}
                className="mt-6 rounded-xl bg-[#14532d] px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-[#166534] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
              >
                Schließen
              </button>
            </div>
          ) : (
            <>
              <h2
                id="contact-funnel-title"
                className="text-xl font-light italic text-white sm:text-2xl"
                style={{
                  fontFamily: "var(--font-austera)",
                  textShadow: "0 0 20px rgba(34, 197, 94, 0.3)",
                }}
              >
                Kostenloses Erstgespräch
              </h2>
              <p className="mt-1 text-sm text-white/60">Unverbindlich & direkt.</p>

              {error && (
                <p className="mt-4 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
                  {error}
                </p>
              )}
              <div className="relative mt-6 min-h-[140px]">
                {STEPS.map((s, i) => (
                  <div
                    key={s.id}
                    className={`transition-all duration-300 ${
                      i === step
                        ? "relative opacity-100"
                        : "pointer-events-none absolute inset-0 opacity-0"
                    }`}
                  >
                    <label htmlFor={`funnel-${s.id}`} className="mb-1.5 block text-sm font-medium text-white/90">
                      {s.label}
                    </label>
                    {s.id === "message" ? (
                      <textarea
                        id={`funnel-${s.id}`}
                        value={data[s.id]}
                        onChange={(e) => setData((d) => ({ ...d, [s.id]: e.target.value.slice(0, 2000) }))}
                        placeholder={s.placeholder}
                        rows={3}
                        maxLength={2000}
                        className="contact-funnel-input w-full resize-none rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-white placeholder:text-white/40 focus:border-emerald-500/50 focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
                      />
                    ) : (
                      <input
                        id={`funnel-${s.id}`}
                        type={s.id === "email" ? "email" : "text"}
                        value={data[s.id]}
                        onChange={(e) =>
                          setData((d) => ({
                            ...d,
                            [s.id]: e.target.value.slice(0, s.id === "email" ? 254 : 100),
                          }))
                        }
                        placeholder={s.placeholder}
                        autoComplete={s.id === "email" ? "email" : "name"}
                        maxLength={s.id === "email" ? 254 : 100}
                        className="contact-funnel-input w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-white placeholder:text-white/40 focus:border-emerald-500/50 focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
                      />
                    )}
                  </div>
                ))}
              </div>

              <div className="mt-8 flex gap-3">
                {step > 0 ? (
                  <button
                    type="button"
                    onClick={handleBack}
                    className="rounded-xl border border-white/20 px-5 py-3 text-sm font-medium text-white/90 transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
                  >
                    Zurück
                  </button>
                ) : null}
                <button
                  type="button"
                  onClick={handleNext}
                  disabled={!canProceed() || loading}
                  className="flex-1 rounded-xl bg-[#14532d] px-5 py-3 text-sm font-medium text-white transition-all hover:bg-[#166534] disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
                >
                  {loading
                    ? "Wird gesendet…"
                    : step < STEPS.length - 1
                      ? "Weiter"
                      : "Nachricht senden"}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
