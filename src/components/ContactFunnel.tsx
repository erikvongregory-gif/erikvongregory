"use client";

import { useEffect, useState } from "react";
import confetti from "canvas-confetti";
import { Check, X } from "lucide-react";
import { LEGAL } from "@/lib/legal";
import { RippleButton } from "@/components/ui/multi-type-ripple-buttons";

const fireConfetti = () => {
  const count = 80;
  const defaults = {
    origin: { y: 0.6 },
    colors: ["#e07a40", "#c65a20", "#ffd4a8", "#d46830", "#ffffff"],
  };
  confetti({ ...defaults, particleCount: count * 0.5, spread: 60 });
  confetti({ ...defaults, particleCount: count * 0.4, spread: 100, scalar: 0.9 });
  confetti({ ...defaults, particleCount: count * 0.3, spread: 120, scalar: 0.8 });
};

const STEPS = [
  { id: "name", label: "Dein Name", placeholder: "z.B. Max Mustermann" },
  { id: "email", label: "Deine E-Mail", placeholder: "deine@email.de" },
  { id: "message", label: "Nachricht (optional)", placeholder: "Worum geht es?" },
] as const;

const primaryRippleBtn =
  "w-full rounded-xl border-none bg-[#c65a20] px-5 py-3 text-sm font-semibold text-white shadow-none transition-all hover:bg-[#d46830] hover:shadow-[0_8px_28px_rgba(224,122,64,0.38)] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-[#c65a20] disabled:hover:shadow-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e07a40]/55 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent";

export function ContactFunnel() {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [data, setData] = useState({ name: "", email: "", message: "" });
  const [selectedOffer, setSelectedOffer] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Alle #contact Klicks abfangen → Funnel öffnen, Angebot aus data-paket übernehmen
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest('a[href="#contact"]');
      if (link) {
        e.preventDefault();
        const paket = link.getAttribute("data-paket");
        setSelectedOffer(paket || null);
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
      setSelectedOffer(null);
      setSubmitted(false);
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

    setLoading(true);
    setError(null);
    try {
      const subject = selectedOffer
        ? `Anfrage: ${selectedOffer} – von ${name}`
        : `Kontaktanfrage von ${name}`;
      const res = await fetch(`https://formsubmit.co/ajax/${LEGAL.email}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name,
          email,
          message: message || "(keine Nachricht)",
          gewünschtes_angebot: selectedOffer || "(nicht angegeben)",
          _subject: subject,
          _replyto: email,
        }),
      });
      if (!res.ok) throw new Error("Fehler beim Senden");
      fireConfetti();
      setSubmitted(true);
    } catch {
      setError(
        "Die Nachricht konnte nicht gesendet werden. Bitte versuche es später erneut oder schreibe direkt an die E-Mail im Impressum."
      );
    } finally {
      setLoading(false);
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
      className="contact-funnel-backdrop fixed inset-0 z-[9998] flex items-center justify-center bg-[#0a0f14]/72 p-4 backdrop-blur-md animate-contact-funnel-in"
      onClick={(e) => e.target === e.currentTarget && handleClose()}
      role="dialog"
      aria-modal="true"
      aria-labelledby="contact-funnel-title"
    >
      <div
        className="contact-funnel-card contact-funnel-glass-panel relative z-0 w-full max-w-md overflow-hidden rounded-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="pointer-events-none absolute inset-x-0 top-0 z-0 h-px bg-gradient-to-r from-transparent via-[#e07a40]/55 to-transparent"
          aria-hidden
        />

        <button
          type="button"
          onClick={handleClose}
          className="absolute right-3 top-3 z-20 flex h-10 w-10 items-center justify-center rounded-full text-white/55 transition-colors hover:bg-white/[0.08] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e07a40]/45"
          aria-label="Schließen"
        >
          <X className="h-5 w-5" strokeWidth={2} aria-hidden />
        </button>

        {!submitted ? (
          <div className="relative z-10 flex gap-2 px-6 pt-7">
            {STEPS.map((_, i) => (
              <div
                key={i}
                className={`h-1 flex-1 rounded-full transition-colors duration-300 ${
                  i <= step
                    ? "bg-gradient-to-r from-[#c65a20] to-[#e07a40] shadow-[0_0_12px_rgba(224,122,64,0.35)]"
                    : "bg-white/12"
                }`}
              />
            ))}
          </div>
        ) : (
          <div className="pt-7" aria-hidden />
        )}

        <div
          className="relative z-10 px-6 pb-8 pt-5"
          style={{ fontFamily: "var(--font-main), ui-sans-serif, system-ui, sans-serif" }}
        >
          {submitted ? (
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border border-[#e07a40]/25 bg-[#e07a40]/12 text-[#f4a574]">
                <Check className="h-7 w-7" strokeWidth={2.25} aria-hidden />
              </div>
              <h2 id="contact-funnel-title" className="font-austera-green-fade text-2xl font-light italic sm:text-[1.65rem]">
                Vielen Dank!
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-white/70">
                Deine Nachricht wurde gesendet. Ich melde mich bald bei dir.
              </p>
              <RippleButton
                rippleColor="rgba(255, 236, 210, 0.35)"
                className={primaryRippleBtn + " mt-7"}
                onClick={handleClose}
              >
                Schließen
              </RippleButton>
            </div>
          ) : (
            <>
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#e07a40]/85">
                EvGlab · Kontakt
              </p>
              <h2
                id="contact-funnel-title"
                className="mt-1 text-xl font-light italic font-austera-green-fade sm:text-2xl"
              >
                Kostenloses Erstgespräch
              </h2>
              <p className="mt-1.5 text-sm text-white/60">
                {selectedOffer ? (
                  <>
                    Anfrage für:{" "}
                    <span className="font-medium text-[#f4a574]">{selectedOffer}</span>
                  </>
                ) : (
                  "Unverbindlich & direkt."
                )}
              </p>

              {error && (
                <p className="mt-4 rounded-xl border border-red-500/35 bg-red-500/10 px-4 py-3 text-sm text-red-200/95">
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
                    <label htmlFor={`funnel-${s.id}`} className="mb-1.5 block text-sm font-medium text-white/88">
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
                        className="contact-funnel-input w-full resize-none rounded-xl border border-white/12 bg-white/[0.06] px-4 py-3 text-[15px] text-white"
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
                        className="contact-funnel-input w-full rounded-xl border border-white/12 bg-white/[0.06] px-4 py-3 text-[15px] text-white"
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
                    className="shrink-0 rounded-xl border border-white/18 bg-white/[0.04] px-5 py-3 text-sm font-medium text-white/90 backdrop-blur-sm transition-colors hover:border-white/25 hover:bg-white/[0.08] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e07a40]/45"
                  >
                    Zurück
                  </button>
                ) : null}
                <RippleButton
                  rippleColor="rgba(255, 236, 210, 0.35)"
                  className={`${primaryRippleBtn} flex-1`}
                  disabled={!canProceed() || loading}
                  onClick={handleNext}
                >
                  {loading
                    ? "Wird gesendet…"
                    : step < STEPS.length - 1
                      ? "Weiter"
                      : "Nachricht senden"}
                </RippleButton>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
