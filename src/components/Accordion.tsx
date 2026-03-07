"use client";

import { useState } from "react";

type AccordionItemProps = {
  title: string;
  label: string;
  intro: string;
  items: string[];
  result: string;
};

export function AccordionItem({
  title,
  label,
  intro,
  items,
  result,
}: AccordionItemProps) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="border-b border-neutral-200 last:border-b-0"
      onClick={() => setOpen(!open)}
    >
      <button
        type="button"
        className="flex w-full items-center justify-between gap-4 py-6 text-left transition hover:bg-neutral-50"
        aria-expanded={open}
      >
        <div className="flex items-baseline gap-4">
          <span className="text-xs font-medium uppercase tracking-wider text-[#14532d]">
            {label}
          </span>
          <h3 className="text-lg font-semibold text-neutral-900">{title}</h3>
        </div>
        <span
          className={`text-2xl text-[#14532d] transition-transform ${open ? "rotate-45" : ""}`}
        >
          +
        </span>
      </button>
      {open && (
        <div className="pb-8">
          <p className="text-neutral-600">{intro}</p>
          <p className="mt-4 font-medium text-neutral-800">Du lernst:</p>
          <ul className="mt-2 space-y-1 text-neutral-600">
            {items.map((item) => (
              <li key={item}>• {item}</li>
            ))}
          </ul>
          <p className="mt-4 font-medium text-[#14532d]">Ergebnis:</p>
          <p className="mt-1 text-neutral-600">{result}</p>
        </div>
      )}
    </div>
  );
}
