"use client";

import { Moon, Sun } from "lucide-react";
import { useParloTheme } from "./ParloTheme";

export function ParloThemeToggle({ className = "" }: { className?: string }) {
  const { theme, toggleTheme, ready } = useParloTheme();
  const label = theme === "dark" ? "Hellmodus" : "Dunkelmodus";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={ready ? label : "Farbschema"}
      title={ready ? label : undefined}
      className={[
        "inline-flex size-[34px] items-center justify-center rounded-full border border-border bg-card text-foreground transition-colors hover:bg-muted",
        ready ? "opacity-100" : "opacity-0",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      suppressHydrationWarning
    >
      {theme === "dark" ? (
        <Sun className="size-4" strokeWidth={1.6} />
      ) : (
        <Moon className="size-4" strokeWidth={1.6} />
      )}
    </button>
  );
}
