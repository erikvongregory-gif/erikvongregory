"use client";

import * as React from "react";
import { AnimatePresence, motion } from "motion/react";

export type OnboardingStep = {
  id: string;
  title: string;
  description: string;
  targetSelector: string;
  tab?: string;
};

type OnboardingDialogProps = {
  open: boolean;
  onClose: () => void;
  steps: OnboardingStep[];
  onStepChange?: (step: OnboardingStep, index: number) => void;
};

const HIGHLIGHT_PADDING = 10;

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

export function OnboardingDialog({ open, onClose, steps, onStepChange }: OnboardingDialogProps) {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [targetRect, setTargetRect] = React.useState<DOMRect | null>(null);
  const [viewport, setViewport] = React.useState({ width: 1280, height: 720 });
  const [contentDirection, setContentDirection] = React.useState<1 | -1>(1);

  React.useEffect(() => {
    if (typeof window === "undefined") return;
    const update = () => {
      setViewport({ width: window.innerWidth, height: window.innerHeight });
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  React.useEffect(() => {
    if (!open) return;
    setActiveIndex(0);
  }, [open]);

  React.useEffect(() => {
    if (!open) return;
    const step = steps[activeIndex];
    if (!step) return;
    onStepChange?.(step, activeIndex);
  }, [activeIndex, onStepChange, open, steps]);

  React.useEffect(() => {
    if (!open) return;
    const step = steps[activeIndex];
    if (!step) return;

    let frame = 0;
    let timeout = 0;
    const updateRect = () => {
      const el = document.querySelector(step.targetSelector);
      if (!el) {
        setTargetRect(null);
        return;
      }
      setTargetRect(el.getBoundingClientRect());
    };

    const delayedUpdate = () => {
      frame = window.requestAnimationFrame(updateRect);
    };

    delayedUpdate();
    timeout = window.setTimeout(delayedUpdate, 120);
    window.addEventListener("resize", delayedUpdate);
    window.addEventListener("scroll", delayedUpdate, true);
    return () => {
      window.cancelAnimationFrame(frame);
      window.clearTimeout(timeout);
      window.removeEventListener("resize", delayedUpdate);
      window.removeEventListener("scroll", delayedUpdate, true);
    };
  }, [activeIndex, open, steps]);

  const isFirstSlide = activeIndex === 0;
  const isLastSlide = activeIndex === steps.length - 1;
  const currentStep = steps[activeIndex];
  if (!currentStep) return null;

  const rect = targetRect
    ? {
        left: Math.max(0, targetRect.left - HIGHLIGHT_PADDING),
        top: Math.max(0, targetRect.top - HIGHLIGHT_PADDING),
        width: Math.min(viewport.width, targetRect.width + HIGHLIGHT_PADDING * 2),
        height: Math.min(viewport.height, targetRect.height + HIGHLIGHT_PADDING * 2),
      }
    : null;

  const handleNext = () => {
    if (isLastSlide) {
      onClose();
      return;
    }
    setContentDirection(1);
    setActiveIndex((prev) => Math.min(prev + 1, steps.length - 1));
  };

  const handlePrevious = () => {
    setContentDirection(-1);
    setActiveIndex((prev) => Math.max(prev - 1, 0));
  };

  const handleSkip = () => onClose();

  const tooltipWidth = 360;
  const fallbackTop = viewport.height / 2 - 110;
  const tooltipLeft = rect
    ? clamp(rect.left + rect.width / 2 - tooltipWidth / 2, 16, viewport.width - tooltipWidth - 16)
    : clamp(viewport.width / 2 - tooltipWidth / 2, 16, viewport.width - tooltipWidth - 16);
  const tooltipTop = rect
    ? clamp(rect.top + rect.height + 16, 16, viewport.height - 230)
    : clamp(fallbackTop, 16, viewport.height - 230);

  const overlayClipPath = rect
    ? `polygon(
      0% 0%,
      0% 100%,
      ${rect.left}px 100%,
      ${rect.left}px ${rect.top}px,
      ${rect.left + rect.width}px ${rect.top}px,
      ${rect.left + rect.width}px ${rect.top + rect.height}px,
      ${rect.left}px ${rect.top + rect.height}px,
      ${rect.left}px 100%,
      100% 100%,
      100% 0%
    )`
    : undefined;

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-[130]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <button
            type="button"
            className="absolute inset-0"
            onClick={handleSkip}
            aria-label="Onboarding überspringen"
          />
          <div
            className="pointer-events-none absolute inset-0 bg-black/55 backdrop-blur-[3px]"
            style={overlayClipPath ? { clipPath: overlayClipPath } : undefined}
          />
          {rect ? (
            <motion.div
              className="pointer-events-none fixed rounded-xl border-2 border-[#f2a36f] shadow-[0_0_0_1px_rgba(255,255,255,0.5),0_0_0_9999px_rgba(0,0,0,0)]"
              animate={{
                left: rect.left,
                top: rect.top,
                width: rect.width,
                height: rect.height,
              }}
              transition={{ duration: 0.24, ease: "easeOut" }}
            />
          ) : null}

          <motion.div
            className="fixed w-[min(92vw,360px)] rounded-xl border border-gray-200 bg-white p-4 shadow-2xl dark:border-gray-700 dark:bg-gray-900"
            animate={{ left: tooltipLeft, top: tooltipTop, opacity: 1 }}
            initial={{ opacity: 0, y: 8 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
          >
            <div className="mb-3 flex items-center justify-between gap-3">
              <p className="text-xs font-medium uppercase tracking-wide text-[#c65a20]">
                Onboarding {activeIndex + 1}/{steps.length}
              </p>
              <button
                type="button"
                onClick={handleSkip}
                className="rounded-md px-2 py-1 text-xs text-gray-500 transition hover:bg-gray-100 hover:text-gray-800 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-200"
              >
                Überspringen
              </button>
            </div>

            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={currentStep.id}
                initial={{ opacity: 0, x: contentDirection * 14 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: contentDirection * -14 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
              >
                <h2 className="text-base font-semibold text-gray-900 dark:text-gray-100">
                  {currentStep.title}
                </h2>
                <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
                  {currentStep.description}
                </p>
              </motion.div>
            </AnimatePresence>

            <div className="mt-4 flex items-center justify-between">
              <div>
                {!isFirstSlide ? (
                  <button
                    type="button"
                    onClick={handlePrevious}
                    className="rounded-md px-3 py-1.5 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-gray-100"
                  >
                    Zurück
                  </button>
                ) : null}
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleNext}
                  className="rounded-md bg-[#c65a20] px-4 py-1.5 text-sm font-medium text-white transition-colors hover:bg-[#b14f1c]"
                >
                  {isLastSlide ? "Fertig" : "Weiter"}
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
