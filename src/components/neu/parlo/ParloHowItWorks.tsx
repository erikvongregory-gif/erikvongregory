"use client";

import { useState } from "react";
import Image from "next/image";
import { HOW_TABS } from "./data";
import { cn } from "@/lib/utils";

function HowMock({
  mock,
}: {
  mock: (typeof HOW_TABS)[number]["mock"];
}) {
  return (
    <div className="rounded-2xl border border-border bg-surface p-4 shadow-2xl">
      <div className="mb-3 flex items-center justify-between">
        <div>
          <p className="text-xs text-muted-foreground">Dashboard</p>
          <p className="text-sm font-medium text-foreground">{mock.title}</p>
        </div>
        <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 text-[10px] font-medium text-emerald-700 dark:text-emerald-300">
          {mock.status}
        </span>
      </div>
      <div className="mt-3 grid gap-2">
        {mock.rows.map((row) => (
          <div
            key={row.title}
            className="flex items-center justify-between rounded-xl border border-border/60 bg-surface-elevated px-3 py-2.5"
          >
            <span className="text-xs font-medium text-foreground">{row.title}</span>
            <span className="text-[11px] text-muted-foreground">{row.meta}</span>
          </div>
        ))}
      </div>
      <div className="mt-3 flex items-center justify-between rounded-xl bg-emerald-500/10 px-3 py-2">
        <span className="text-xs text-emerald-700 dark:text-emerald-300">{mock.footer}</span>
        <span className="text-[11px] font-medium text-emerald-700 dark:text-emerald-200">OK</span>
      </div>
    </div>
  );
}

export function ParloHowItWorks() {
  const [active, setActive] = useState(0);
  const tab = HOW_TABS[active];

  return (
    <section id="how-it-works" className="scroll-mt-24">
      <div className="md:mx-[30px] md:border-x border-border py-16 md:py-24">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 text-xs text-muted-foreground">
            <Image
              src="/brewai-mark-icon.png"
              alt=""
              width={14}
              height={14}
              className="size-3.5 object-contain brightness-0 dark:brightness-100"
            />
            BrewAI Dashboard
          </span>
          <h2 className="mt-6 text-balance text-3xl font-medium tracking-tight text-foreground md:text-5xl">
            Marke einmal setzen. Motive in Minuten.
          </h2>
        </div>

        <div className="mx-auto mt-10 flex max-w-3xl flex-wrap justify-center gap-2 px-6">
          {HOW_TABS.map((t, i) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setActive(i)}
              className={cn(
                "rounded-full px-4 py-2 text-sm transition-colors",
                i === active
                  ? "bg-foreground text-background"
                  : "border border-border bg-surface text-muted-foreground hover:text-foreground",
              )}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className="mx-auto mt-12 grid max-w-6xl gap-8 px-6 lg:grid-cols-2 lg:items-center lg:gap-12">
          <div>
            <p className="text-sm font-medium text-foreground">{tab.label}</p>
            <h3 className="mt-2 text-2xl font-medium tracking-tight text-foreground md:text-3xl">
              {tab.eyebrow}
            </h3>
            <p className="mt-3 text-base leading-relaxed text-muted-foreground">
              {tab.description}
            </p>
            <ul className="mt-6 space-y-3">
              {tab.bullets.map((b) => (
                <li key={b} className="flex items-center gap-3 text-sm text-muted-foreground">
                  <span className="size-1.5 shrink-0 rounded-full bg-foreground/60" />
                  {b}
                </li>
              ))}
            </ul>
          </div>
          <div className="parlo-grid-dots rounded-3xl border border-border bg-surface p-4 md:p-6">
            <HowMock mock={tab.mock} />
          </div>
        </div>
      </div>
    </section>
  );
}
