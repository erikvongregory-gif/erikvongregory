import {
  APP_URL,
  FORMAT_CAPABILITIES,
  FORMAT_COUNTS,
  FORMAT_ITEMS,
} from "./data";
import { ParloPillButton } from "./ParloUi";

function priorityClass(tag: string) {
  if (tag === "Produkt" || tag === "Serie") return "parlo-priority-high";
  if (tag === "Feed" || tag === "Event") return "parlo-priority-medium";
  return "parlo-priority-low";
}

function FormatsMock() {
  const selected = FORMAT_ITEMS[0];
  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-surface shadow-2xl">
      <div className="flex items-center justify-between border-b border-border px-4 py-3">
        <div className="flex items-center gap-2">
          <p className="text-sm font-medium text-foreground">Mediathek</p>
          <span className="rounded-full bg-foreground/10 px-2 py-0.5 text-[11px] text-muted-foreground">
            {FORMAT_ITEMS.length}
          </span>
        </div>
        <div className="hidden flex-wrap gap-1.5 sm:flex">
          {FORMAT_COUNTS.map((ch) => (
            <span
              key={ch.name}
              className="inline-flex items-center gap-1 rounded-full border border-border bg-surface px-2 py-0.5 text-[10px] text-muted-foreground"
            >
              {ch.name} · {ch.count}
            </span>
          ))}
        </div>
      </div>

      <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)]">
        <div className="border-b border-border lg:border-b-0 lg:border-r">
          <div className="border-b border-border px-3 py-2.5">
            <span className="text-xs text-muted-foreground">Motive durchsuchen</span>
          </div>
          <div className="parlo-hide-scrollbar max-h-[420px] overflow-y-auto divide-y divide-border/50">
            {FORMAT_ITEMS.map((c, i) => (
              <div
                key={c.name}
                className={`flex gap-3 px-3 py-3 ${i === 0 ? "bg-foreground/[0.04]" : "hover:bg-foreground/[0.02]"}`}
              >
                <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-muted text-[10px] font-medium">
                  {c.initials}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <p className="truncate text-sm font-medium text-foreground">{c.name}</p>
                    <span
                      className={`shrink-0 rounded-full px-1.5 py-0.5 text-[9px] font-medium ${priorityClass(c.tag)}`}
                    >
                      {c.tag}
                    </span>
                    <span className="ml-auto shrink-0 text-[10px] text-muted-foreground">
                      {c.time}
                    </span>
                  </div>
                  <p className="mt-0.5 truncate text-xs text-muted-foreground">{c.preview}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex min-h-[420px] flex-col">
          <div className="flex items-center justify-between border-b border-border px-4 py-3">
            <div className="flex items-center gap-2">
              <div className="flex size-8 items-center justify-center rounded-full bg-muted text-[10px] font-medium">
                {selected.initials}
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">{selected.name}</p>
                <p className="text-[11px] text-muted-foreground">Markenprofil · 4K</p>
              </div>
            </div>
            <ParloPillButton href={APP_URL} variant="ghost" className="h-8 px-3 text-xs">
              Öffnen
            </ParloPillButton>
          </div>

          <div className="flex-1 space-y-4 overflow-y-auto p-4">
            <div className="parlo-grid-dots flex min-h-[180px] items-center justify-center rounded-xl border border-border bg-surface-elevated">
              <div className="text-center">
                <p className="text-sm font-medium text-foreground">Produktshot</p>
                <p className="mt-1 text-xs text-muted-foreground">1:1 · Markenlook aktiv</p>
              </div>
            </div>
            <div className="rounded-xl bg-surface-elevated p-3">
              <p className="text-xs leading-5 text-muted-foreground">
                Generiert über Markenprofil — Farben und Ton der Brauerei. Bereit für Download
                oder Team-Freigabe in der Mediathek.
              </p>
              <p className="mt-3 text-[11px] text-muted-foreground">Tokens verbraucht · gespeichert</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ParloChannels() {
  return (
    <section id="formats" className="scroll-mt-24">
      <div className="md:mx-[30px] md:border-x border-border py-16 md:py-24">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="text-balance text-3xl font-medium tracking-tight text-foreground md:text-5xl">
            Ein Dashboard — viele Motive.
          </h2>
          <p className="mt-3 text-lg text-muted-foreground">
            Produkt, Feed, Story, Saison, Event und Händler — aus demselben Markenprofil.
          </p>
        </div>

        <div className="mx-auto mt-12 max-w-6xl px-4 md:px-6">
          <FormatsMock />
        </div>

        <div className="mx-auto mt-12 grid max-w-6xl gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
          {FORMAT_CAPABILITIES.map((c) => (
            <div key={c.title} className="bg-background p-6">
              <h3 className="text-base font-medium text-foreground">{c.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{c.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
