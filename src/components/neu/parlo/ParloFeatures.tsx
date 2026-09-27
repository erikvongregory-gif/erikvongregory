"use client";

import { useState } from "react";
import { ALERT_CARDS, DASHBOARD_MODULES, WORKFLOW_STEPS } from "./data";
import { cn } from "@/lib/utils";

export function ParloFeatures() {
  const [active, setActive] = useState(1);

  return (
    <section id="features" className="scroll-mt-24">
      <div className="mx-[30px] border-x border-border py-16 md:py-24">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="text-balance text-3xl font-medium tracking-tight text-foreground md:text-5xl">
            Alles für euren Content-Alltag.
          </h2>
          <p className="mt-3 text-lg text-muted-foreground">
            Module wie im Dashboard — ohne Inbox- oder Support-Agent-Versprechen.
          </p>
        </div>

        <div className="mx-auto mt-14 grid max-w-6xl gap-8 px-6 lg:grid-cols-2 lg:items-start">
          <div
            role="listbox"
            aria-label="Workflow"
            className="space-y-2 rounded-2xl border border-border bg-surface p-3"
          >
            {WORKFLOW_STEPS.map((step, i) => {
              const selected = i === active;
              return (
                <button
                  key={step.title}
                  type="button"
                  role="option"
                  aria-selected={selected}
                  onClick={() => setActive(i)}
                  className={cn(
                    "w-full rounded-xl border px-4 text-left transition-all",
                    selected
                      ? "border-border bg-surface-elevated py-5"
                      : "border-transparent bg-transparent py-3 hover:bg-foreground/[0.03]",
                  )}
                >
                  <div className="flex items-baseline gap-3">
                    <span className="font-mono text-[11px] text-muted-foreground">
                      {step.time}
                    </span>
                    <span className="text-sm font-medium text-foreground">{step.title}</span>
                  </div>
                  {selected && (
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {step.description}
                    </p>
                  )}
                </button>
              );
            })}
          </div>

          <div className="rounded-2xl border border-border bg-surface p-6">
            <p className="text-lg font-medium tracking-tight text-foreground">
              Vom Profil zum Post.
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              Derselbe Ablauf wie im Dashboard — ohne Tool-Wechsel.
            </p>
            <div className="mt-6 rounded-xl border border-border bg-surface-elevated p-4">
              <p className="font-mono text-[11px] text-muted-foreground">
                {WORKFLOW_STEPS[active].time}
              </p>
              <p className="mt-2 text-base font-medium text-foreground">
                {WORKFLOW_STEPS[active].title}
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                {WORKFLOW_STEPS[active].description}
              </p>
            </div>
          </div>
        </div>

        <div className="mx-auto mt-8 grid max-w-6xl gap-8 px-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-border bg-surface p-6">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-xs text-muted-foreground">
                <span className="mr-2 text-foreground">3</span> Status
              </p>
            </div>
            <div className="space-y-2">
              {ALERT_CARDS.map((card, i) => (
                <div
                  key={card.title}
                  className="rounded-xl border border-border/70 bg-surface-elevated p-3"
                >
                  <div className="flex items-start gap-3">
                    <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-foreground/10 text-[10px] font-medium">
                      {i + 1}
                    </span>
                    <div>
                      <p className="text-sm font-medium text-foreground">{card.title}</p>
                      <p className="mt-0.5 text-[11px] text-muted-foreground">{card.meta}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-5 text-lg font-medium tracking-tight text-foreground">
              Überblick behalten.
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              Markenprofil, Mediathek und Tokens bleiben sichtbar.
            </p>
          </div>

          <div className="rounded-2xl border border-border bg-surface p-6">
            <div className="flex flex-wrap gap-2">
              {DASHBOARD_MODULES.map((m) => (
                <div
                  key={m.name}
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-surface-elevated px-3 py-1.5"
                >
                  <span className="text-xs text-foreground">{m.name}</span>
                </div>
              ))}
            </div>
            <div className="parlo-grid-dots mt-6 flex min-h-[140px] items-center justify-center rounded-xl border border-border bg-surface">
              <div className="rounded-2xl border border-border bg-surface-elevated px-4 py-3 shadow-lg">
                <span className="text-sm font-medium text-foreground">BrewAI</span>
                <p className="mt-1 text-xs text-muted-foreground">Prompts · Stil · Tokens</p>
              </div>
            </div>
            <p className="mt-5 text-lg font-medium tracking-tight text-foreground">
              Module wie in der App.
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              Bilder, Markenprofil, Mediathek, Team, Abo — Videos folgen.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
