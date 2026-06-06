"use client";

import { WERKSTATT_YEARLY_ACTIVE_BADGE, WERKSTATT_YEARLY_TOGGLE_HINT, WERKSTATT_YEARLY_TOGGLE_LABEL } from "@/lib/werkstattBilling";
import { cn } from "@/lib/utils";

type WerkstattYearlyBillingToggleProps = {
  active: boolean;
  onChange: (active: boolean) => void;
  className?: string;
  /** Hell (Marketing) oder dunkel (Tablet-Glasbereich). */
  variant?: "light" | "dark";
};

export function WerkstattYearlyBillingToggle({
  active,
  onChange,
  className,
  variant = "light",
}: WerkstattYearlyBillingToggleProps) {
  const isDark = variant === "dark";

  return (
    <div
      className={cn(
        "flex items-center justify-between gap-4 rounded-[14px] border px-4 py-3.5 transition-[border-color,box-shadow] duration-200 sm:px-5",
        isDark
          ? active
            ? "border-emerald-500/45 bg-[#0f1a14] text-paper shadow-[0_0_0_1px_rgba(52,211,153,0.08)]"
            : "border-emerald-900/35 bg-[#0f1a14] text-paper"
          : active
            ? "border-emerald-600/35 bg-white shadow-[0_6px_18px_-14px_rgba(16,120,72,0.16)]"
            : "border-ink/12 bg-white shadow-[0_6px_18px_-14px_rgba(24,20,15,0.18)]",
        className,
      )}
    >
      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-2">
          <p className={cn("m-0 font-sans-tight text-[15px] font-semibold", isDark ? "text-paper" : "text-ink")}>
            {WERKSTATT_YEARLY_TOGGLE_LABEL}
          </p>
          {active ? (
            <span
              className={cn(
                "rounded-full px-2 py-0.5 font-mono-hero text-[10px] font-bold uppercase tracking-[0.06em]",
                isDark ? "bg-emerald-300/90 text-[#0f1a14]" : "bg-emerald-100 text-emerald-800",
              )}
            >
              {WERKSTATT_YEARLY_ACTIVE_BADGE}
            </span>
          ) : null}
        </div>
        <p
          className={cn(
            "m-0 mt-1 text-[12px] leading-[1.45]",
            isDark ? (active ? "text-emerald-100/65" : "text-emerald-100/45") : "text-ink3",
          )}
        >
          {WERKSTATT_YEARLY_TOGGLE_HINT}
        </p>
      </div>

      <button
        type="button"
        role="switch"
        aria-checked={active}
        aria-label={`${WERKSTATT_YEARLY_TOGGLE_LABEL} ${active ? "aktiv" : "deaktiviert"}`}
        onClick={() => onChange(!active)}
        className={cn(
          "relative h-7 w-[46px] shrink-0 rounded-full transition-colors duration-200",
          "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2",
          active
            ? "bg-emerald-500 focus-visible:outline-emerald-500"
            : isDark
              ? "bg-emerald-950/70 focus-visible:outline-emerald-700"
              : "bg-ink/15 focus-visible:outline-ink/30",
        )}
      >
        <span
          className={cn(
            "absolute top-0.5 left-0.5 h-6 w-6 rounded-full bg-white shadow-sm transition-transform duration-200",
            active ? "translate-x-[18px]" : "translate-x-0",
          )}
          aria-hidden
        />
      </button>
    </div>
  );
}
