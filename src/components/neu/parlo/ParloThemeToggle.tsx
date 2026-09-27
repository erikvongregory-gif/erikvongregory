"use client";

import { Moon, Sun } from "lucide-react";
import { useParloTheme } from "./ParloTheme";

export function ParloThemeToggle({ className = "" }: { className?: string }) {
  const { theme, toggleTheme, ready } = useParloTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={theme === "dark" ? "Hellmodus" : "Dunkelmodus"}
      title={theme === "dark" ? "Hellmodus" : "Dunkelmodus"}
      className={[
        "inline-flex size-[34px] items-center justify-center rounded-full border border-border bg-card text-foreground transition-colors hover:bg-muted",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      style={{ opacity: ready ? 1 : 0 }}
    >
      {theme === "dark" ? (
        <Sun className="size-4" strokeWidth={1.6} />
      ) : (
        <Moon className="size-4" strokeWidth={1.6} />
      )}
    </button>
  );
}
