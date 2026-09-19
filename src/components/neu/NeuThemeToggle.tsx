"use client";

import { motion, AnimatePresence } from "motion/react";
import { useNeuTheme } from "@/components/neu/NeuTheme";
import { cn } from "@/lib/utils";

/** Hell/Dunkel-Umschalter mit gleitendem Thumb + Icon-Morph. */
export function NeuThemeToggle({ className }: { className?: string }) {
  const { theme, toggleTheme } = useNeuTheme();
  const isLight = theme === "light";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isLight ? "Dunkelmodus aktivieren" : "Hellmodus aktivieren"}
      title={isLight ? "Dunkel" : "Hell"}
      aria-pressed={isLight}
      className={cn(
        "group relative inline-flex h-9 w-[3.75rem] shrink-0 items-center rounded-full border p-1",
        "border-[color:var(--neu-border-strong)] bg-[color:var(--neu-card)]",
        "transition-[border-color,background-color,box-shadow] duration-300",
        "hover:border-[color:var(--neu-fg)]/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--neu-fg)]/30",
        "active:scale-[0.97]",
        className,
      )}
    >
      <span
        className="pointer-events-none absolute inset-0 flex items-center justify-between px-2.5 text-[color:var(--neu-muted)]"
        aria-hidden
      >
        <SunIcon
          className={cn(
            "h-3 w-3 transition-all duration-300",
            isLight ? "scale-90 opacity-35" : "scale-100 opacity-90",
          )}
        />
        <MoonIcon
          className={cn(
            "h-3 w-3 transition-all duration-300",
            isLight ? "scale-100 opacity-90" : "scale-90 opacity-35",
          )}
        />
      </span>

      <motion.span
        aria-hidden
        className="neu-theme-thumb relative z-10 flex h-7 w-7 items-center justify-center rounded-full bg-[var(--neu-fg)] text-[var(--neu-bg)] shadow-[0_2px_8px_rgba(0,0,0,0.25)]"
        animate={{ x: isLight ? 30 : 0 }}
        transition={{ type: "spring", stiffness: 480, damping: 28, mass: 0.65 }}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={theme}
            initial={{ rotate: isLight ? -100 : 100, opacity: 0, scale: 0.4 }}
            animate={{ rotate: 0, opacity: 1, scale: 1 }}
            exit={{ rotate: isLight ? 100 : -100, opacity: 0, scale: 0.4 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center justify-center"
          >
            {isLight ? <SunIcon className="h-3.5 w-3.5" /> : <MoonIcon className="h-3.5 w-3.5" />}
          </motion.span>
        </AnimatePresence>
      </motion.span>
    </button>
  );
}

function SunIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <circle cx="12" cy="12" r="4" fill="currentColor" />
      <g stroke="currentColor" strokeWidth="1.75" strokeLinecap="round">
        <path d="M12 2v2.5M12 19.5V22M2 12h2.5M19.5 12H22M4.93 4.93l1.77 1.77M17.3 17.3l1.77 1.77M4.93 19.07l1.77-1.77M17.3 6.7l1.77-1.77" />
      </g>
    </svg>
  );
}

function MoonIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M20.2 14.3A8.5 8.5 0 0 1 9.7 3.8a8.5 8.5 0 1 0 10.5 10.5Z" />
    </svg>
  );
}
