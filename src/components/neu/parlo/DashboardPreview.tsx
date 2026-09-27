"use client";

import {
  Clapperboard,
  CreditCard,
  FolderOpen,
  ImagePlus,
  LayoutDashboard,
  type LucideIcon,
  MessageSquareText,
  Palette,
  Pencil,
  Settings2,
  Sparkles,
  Upload,
  Users,
} from "lucide-react";
import { useState } from "react";
import { SITE } from "@/lib/siteConfig";
import { cn } from "@/lib/utils";
import { ParloStarButton } from "./ParloUi";

type NavKey =
  | "dashboard"
  | "brewai"
  | "images"
  | "videos"
  | "library"
  | "brand"
  | "team"
  | "billing"
  | "settings";

type NavItem = {
  key: NavKey;
  label: string;
  icon: LucideIcon;
  badge?: "soon";
};

const NAV_GROUPS: NavItem[][] = [
  [
    { key: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { key: "brewai", label: "BrewAI", icon: MessageSquareText },
    { key: "images", label: "Bilder erstellen", icon: ImagePlus },
    { key: "videos", label: "Videos erstellen", icon: Clapperboard, badge: "soon" },
    { key: "library", label: "Mediathek", icon: FolderOpen },
  ],
  [
    { key: "brand", label: "Markenprofil", icon: Palette },
    { key: "team", label: "Team", icon: Users },
  ],
  [
    { key: "billing", label: "Abonnement", icon: CreditCard },
    { key: "settings", label: "Einstellungen", icon: Settings2 },
  ],
];

const ALL_NAV = NAV_GROUPS.flat();

/** Feste Preview-Höhe — wechselt nicht mit dem Screen */
const VIEWPORT_H =
  "h-[480px] sm:h-[520px] lg:h-[560px]";

function PreviewHint({ children }: { children: React.ReactNode }) {
  return (
    <p className="rounded-lg border border-dashed border-border bg-muted/40 px-3 py-2 text-[11px] text-muted-foreground">
      {children}
    </p>
  );
}

function ScreenDashboard() {
  return (
    <div className="space-y-5 p-4 md:p-6">
      <div>
        <h3 className="text-lg font-medium text-foreground">Willkommen zurück</h3>
        <p className="mt-1 text-sm text-muted-foreground">
          Kurzüberblick für eure Brauerei — Vorschau ohne Login.
        </p>
      </div>
      <div className="grid gap-3 sm:grid-cols-3">
        {[
          { label: "Tokens übrig", value: "842" },
          { label: "Motive diesen Monat", value: "27" },
          { label: "Team aktiv", value: "3" },
        ].map((c) => (
          <div
            key={c.label}
            className="rounded-xl border border-border bg-surface-elevated p-4"
          >
            <p className="text-[11px] text-muted-foreground">{c.label}</p>
            <p className="mt-1 text-2xl font-medium tracking-tight text-foreground">
              {c.value}
            </p>
          </div>
        ))}
      </div>
      <div>
        <p className="mb-2 text-xs font-medium text-muted-foreground">Letzte Motive</p>
        <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
          {["Produkt", "Feed", "Story", "Event"].map((t) => (
            <div
              key={t}
              className="parlo-grid-dots flex aspect-square items-end rounded-lg border border-border bg-surface p-2"
            >
              <span className="text-[10px] text-muted-foreground">{t}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/** BrewAI-Chat — Layout wie HopfenHugo / echte Assistenten-Seite */
function ScreenBrewAI() {
  return (
    <div className="flex h-full min-h-0 flex-col">
      <header className="flex shrink-0 items-center gap-3 border-b border-border px-4 py-3">
        <div className="relative size-9 shrink-0 overflow-hidden rounded-full bg-gradient-to-t from-[#C7691E]/10 to-card shadow-sm ring-1 ring-border">
          <img
            src="/brewai-mark-icon.png"
            alt=""
            width={36}
            height={36}
            className="size-full object-contain p-1.5 brightness-0 dark:brightness-100"
          />
          <span className="absolute bottom-0 right-0 size-2.5 rounded-full border-2 border-card bg-emerald-500" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-medium text-foreground">BrewAI</p>
          <p className="text-[11px] text-muted-foreground">KI-Assistent · Studio</p>
        </div>
        <div className="flex shrink-0 gap-1.5">
          <span className="rounded-lg border border-border px-2.5 py-1 text-[11px] text-muted-foreground">
            Verläufe
          </span>
          <span className="rounded-lg border border-border px-2.5 py-1 text-[11px] text-muted-foreground opacity-50">
            Neuer Chat
          </span>
        </div>
      </header>

      <div className="flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto px-4 py-4">
        <div className="flex max-w-[92%] gap-2.5">
          <span className="mt-0.5 flex size-7 shrink-0 items-center justify-center overflow-hidden rounded-full bg-card ring-1 ring-border">
            <img
              src="/brewai-mark-icon.png"
              alt=""
              width={20}
              height={20}
              className="size-4 object-contain brightness-0 dark:brightness-100"
            />
          </span>
          <div className="rounded-2xl rounded-tl-md border border-border bg-surface px-3.5 py-2.5 text-[13px] leading-relaxed text-foreground">
            <span className="mb-1 block text-[11px] font-medium tracking-wide text-[#C7691E]">
              BrewAI
            </span>
            Hallo — ich helfe bei KI-Bildern: Prompt, Markenlook, Format. Was soll als
            Nächstes entstehen?
          </div>
        </div>

        <div className="ml-auto max-w-[85%] rounded-2xl rounded-tr-md bg-foreground/[0.07] px-3.5 py-2.5 text-[13px] leading-relaxed text-foreground">
          Sommerbier-Feed 4:5, warmes Abendlicht, Flasche im Fokus
        </div>

        <div className="flex max-w-[92%] gap-2.5">
          <span className="mt-0.5 flex size-7 shrink-0 items-center justify-center overflow-hidden rounded-full bg-card ring-1 ring-border">
            <img
              src="/brewai-mark-icon.png"
              alt=""
              width={20}
              height={20}
              className="size-4 object-contain brightness-0 dark:brightness-100"
            />
          </span>
          <div className="rounded-2xl rounded-tl-md border border-border bg-surface px-3.5 py-2.5 text-[13px] leading-relaxed text-foreground">
            <span className="mb-1 block text-[11px] font-medium tracking-wide text-[#C7691E]">
              BrewAI
            </span>
            Gut. Nenn Glas oder Etikett kurz — dann formuliere ich einen Prompt mit eurem
            Markenprofil.
          </div>
        </div>

        <div className="flex flex-wrap gap-2 pt-1">
          {["Kampagnen-Idee", "Bild-Prompt", "Marketing-Tipp"].map((chip) => (
            <span
              key={chip}
              className="rounded-full border border-border bg-surface px-3 py-1.5 text-[11px] text-muted-foreground"
            >
              {chip}
            </span>
          ))}
        </div>
      </div>

      <footer className="shrink-0 border-t border-border px-4 pb-3 pt-2">
        <div className="relative overflow-hidden rounded-2xl border border-border bg-surface p-1 shadow-sm">
          <div
            className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-[#C7691E]/50 to-transparent"
            aria-hidden
          />
          <div className="flex items-end gap-2 px-2 py-2">
            <div className="min-h-[40px] flex-1 px-2 py-2 text-[13px] text-muted-foreground">
              Frag BrewAI zu allem …
            </div>
            <span className="mb-0.5 inline-flex size-8 items-center justify-center rounded-full bg-foreground text-background opacity-40">
              <Sparkles className="size-3.5" />
            </span>
          </div>
        </div>
        <p className="mt-2 text-center text-[10px] text-muted-foreground">
          Demo-Chat — live antwortet BrewAI im Dashboard.
        </p>
      </footer>
    </div>
  );
}

/** Bilder erstellen — Moon-Chat: zentrierter Hero + Composer-Dock */
function ScreenImages() {
  const [toast, setToast] = useState(false);
  const [aspect, setAspect] = useState("4:5");

  return (
    <div className="relative flex h-full min-h-0 flex-col bg-background">
      <div className="flex min-h-0 flex-1 flex-col items-center justify-center px-4">
        <h3 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          BrewAI
        </h3>
        <p className="mt-2 text-sm text-muted-foreground">Ideen brauen. Bilder zapfen.</p>
      </div>

      <div className="shrink-0 px-3 pb-3 sm:px-4 sm:pb-4">
        {toast ? (
          <p className="mb-2 text-center text-[11px] text-muted-foreground">
            Im Dashboard verbraucht das Tokens und speichert in der Mediathek.
          </p>
        ) : null}
        <div className="relative mx-auto max-w-xl overflow-hidden rounded-2xl border border-border bg-surface shadow-sm">
          <div
            className="pointer-events-none absolute -inset-px rounded-2xl opacity-40"
            style={{
              background:
                "radial-gradient(60% 80% at 50% 0%, color-mix(in oklab, #C7691E 18%, transparent), transparent 70%)",
            }}
            aria-hidden
          />
          <div className="relative">
            <div className="min-h-[52px] px-4 py-3 text-sm text-muted-foreground">
              Beschreibe dein Bild…
            </div>
            <div className="flex flex-col gap-2 border-t border-border/60 p-2.5 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex min-w-0 items-center gap-0.5 overflow-x-auto parlo-hide-scrollbar">
                {[
                  { id: "sorte", label: "Sorte" },
                  { id: "char", label: "Charakter" },
                ].map((b) => (
                  <span
                    key={b.id}
                    className="inline-flex shrink-0 items-center gap-1 rounded-lg px-2 py-1.5 text-xs text-muted-foreground"
                  >
                    {b.label}
                  </span>
                ))}
                {["1:1", "4:5", "9:16", "16:9"].map((f) => (
                  <button
                    key={f}
                    type="button"
                    onClick={() => setAspect(f)}
                    className={cn(
                      "inline-flex shrink-0 rounded-lg px-2 py-1.5 text-xs tabular-nums transition-colors",
                      aspect === f
                        ? "bg-foreground/[0.08] font-medium text-foreground"
                        : "text-muted-foreground hover:bg-foreground/[0.04]",
                    )}
                  >
                    {f}
                  </button>
                ))}
                <span className="inline-flex shrink-0 rounded-lg px-2 py-1.5 text-xs text-muted-foreground">
                  1K
                </span>
              </div>
              <button
                type="button"
                onClick={() => {
                  setToast(true);
                  window.setTimeout(() => setToast(false), 2200);
                }}
                className="inline-flex h-8 shrink-0 items-center justify-center gap-1.5 rounded-full bg-foreground px-4 text-xs font-medium text-background"
              >
                <Sparkles className="size-3.5" />
                Generieren
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ScreenVideos() {
  return (
    <div className="flex h-full flex-col items-center justify-center px-6 text-center opacity-60">
      <Clapperboard className="size-8 text-muted-foreground" strokeWidth={1.25} />
      <h3 className="mt-4 text-lg font-medium text-foreground">Videos erstellen</h3>
      <p className="mt-2 max-w-sm text-sm text-muted-foreground">
        Bald im Dashboard — Seedance ist in den Plänen vorgesehen, der Einstieg folgt.
      </p>
      <span className="mt-4 rounded-full border border-border px-3 py-1 text-[11px] uppercase tracking-wider text-muted-foreground">
        bald
      </span>
    </div>
  );
}

function ScreenLibrary() {
  const items = [
    "Sommerkampagne",
    "Flaschen-Shot",
    "Story Event",
    "Händler-Kit",
    "Festzelt",
    "Saisonbier",
  ];
  return (
    <div className="space-y-4 p-4 md:p-6">
      <div className="flex items-end justify-between gap-3">
        <div>
          <h3 className="text-lg font-medium text-foreground">Mediathek</h3>
          <p className="text-sm text-muted-foreground">Alle Generierungen an einem Ort</p>
        </div>
        <span className="text-xs text-muted-foreground">{items.length} Motive</span>
      </div>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
        {items.map((name) => (
          <button
            key={name}
            type="button"
            className="group overflow-hidden rounded-xl border border-border bg-surface text-left transition hover:border-foreground/20"
          >
            <div className="parlo-grid-dots aspect-[4/3] border-b border-border" />
            <div className="px-2.5 py-2">
              <p className="truncate text-xs font-medium text-foreground">{name}</p>
              <p className="text-[10px] text-muted-foreground">PNG · Markenprofil</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

/** Markenprofil — Struktur wie BrandProfileView */
function ScreenBrand() {
  const colors = ["C7691E", "1A1208", "F4EFE6", "1F3D2B"];
  const tones = ["handwerklich", "warm", "modern", "regional"];

  return (
    <div className="space-y-6 p-4 md:p-6">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-[11px] font-medium uppercase tracking-[0.08em] text-muted-foreground">
            Markenprofil · aktiv
          </p>
          <h3 className="mt-1 text-xl font-semibold tracking-tight text-foreground">
            Testbrauerei
          </h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Diese Vorgaben fließen automatisch in jede Generierung ein.
          </p>
        </div>
        <span className="inline-flex shrink-0 items-center gap-1 rounded-lg border border-border px-2.5 py-1.5 text-[11px] text-muted-foreground">
          <Pencil className="size-3" />
          Neu einlesen
        </span>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="overflow-hidden rounded-xl bg-[#1c1c1c] p-5 text-white shadow-sm">
          <p className="text-[10px] font-medium uppercase tracking-wider text-white/40">
            Branding
          </p>
          <p className="mt-1 text-sm text-white/70">Typography</p>
          <p className="mt-4 text-4xl font-semibold tracking-tight">
            Aa<span className="text-white/40">Bb</span>
          </p>
          <p className="mt-2 text-xs text-white/45">Work Sans</p>
        </div>

        <div className="flex min-h-[140px] flex-col overflow-hidden rounded-xl border border-border bg-surface shadow-sm">
          <div className="flex min-h-0 flex-1">
            {colors.map((c) => (
              <div
                key={c}
                className="flex flex-1 items-end justify-center pb-2"
                style={{ backgroundColor: `#${c}` }}
              >
                <span
                  className={cn(
                    "text-[9px] font-medium tracking-wider opacity-0 md:opacity-70",
                    c === "F4EFE6" ? "text-neutral-800" : "text-white",
                  )}
                >
                  {c}
                </span>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-between gap-2 px-3 py-2.5 text-[11px] text-muted-foreground">
            <span className="truncate">testbrauerei.de · Zuletzt analysiert · gerade eben</span>
            <span className="shrink-0 text-[10px] font-medium uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
              Verbunden
            </span>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border bg-surface px-4 py-6 text-center md:col-span-2 md:col-start-1 md:row-start-2 md:max-w-[calc(50%-0.5rem)]">
          <Upload className="size-5 text-muted-foreground" strokeWidth={1.5} />
          <p className="mt-2 text-sm font-medium text-foreground">Schrift hochladen</p>
          <p className="mt-1 text-[11px] text-muted-foreground">
            .woff2, .woff, .ttf, .otf · max. 2 MB
          </p>
        </div>
      </div>

      <div className="max-w-md space-y-2">
        <div className="flex items-center justify-between text-xs">
          <span className="rounded-full bg-emerald-500/15 px-2 py-0.5 font-medium text-emerald-700 dark:text-emerald-400">
            Sehr stark
          </span>
          <span className="tabular-nums text-muted-foreground">94%</span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-muted">
          <div className="h-full w-[94%] rounded-full bg-emerald-500" />
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_220px]">
        <div className="rounded-2xl border border-border bg-surface p-4 shadow-sm sm:p-5">
          <p className="text-[11px] font-medium uppercase tracking-[0.08em] text-muted-foreground">
            Tonalität
          </p>
          <p className="mt-1 text-sm text-foreground">Stimme der Marke</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {tones.map((t) => (
              <span
                key={t}
                className="rounded-full border border-foreground/15 bg-foreground/[0.06] px-3 py-1 text-xs text-foreground"
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        <aside className="rounded-2xl border border-border bg-surface p-4 shadow-sm">
          <p className="text-sm font-medium text-foreground">Brand-Lock</p>
          <p className="mt-1 text-[11px] leading-relaxed text-muted-foreground">
            Wie streng BrewAI sich an dein Markenprofil hält.
          </p>
          <div className="mt-3 space-y-2">
            {[
              { id: "strict", label: "Strict", sub: "Maximale Markenbindung", on: true },
              { id: "balanced", label: "Balanced", sub: "Stil + kreativer Spielraum", on: false },
              { id: "loose", label: "Frei", sub: "Profil als lose Inspiration", on: false },
            ].map((opt) => (
              <div
                key={opt.id}
                className={cn(
                  "rounded-xl bg-muted/50 p-2.5",
                  opt.on && "ring-1 ring-foreground/20",
                )}
              >
                <div className="flex items-center gap-2">
                  <span
                    className={cn(
                      "size-3.5 rounded-full border",
                      opt.on
                        ? "border-foreground bg-foreground"
                        : "border-muted-foreground/40",
                    )}
                  />
                  <span className="text-xs font-medium text-foreground">{opt.label}</span>
                </div>
                <p className="mt-0.5 pl-5 text-[10px] text-muted-foreground">{opt.sub}</p>
              </div>
            ))}
          </div>
        </aside>
      </div>

      <PreviewHint>Readonly-Vorschau — bearbeiten geht nur eingeloggt im Dashboard.</PreviewHint>
    </div>
  );
}

function ScreenTeam() {
  return (
    <div className="space-y-4 p-4 md:p-6">
      <div>
        <h3 className="text-lg font-medium text-foreground">Team</h3>
        <p className="text-sm text-muted-foreground">Rollen und Einladungen</p>
      </div>
      <div className="divide-y divide-border overflow-hidden rounded-xl border border-border">
        {[
          { name: "Erik", role: "Inhaber", initials: "E" },
          { name: "Lea", role: "Editor", initials: "L" },
          { name: "Tom", role: "Viewer", initials: "T" },
        ].map((m) => (
          <div key={m.name} className="flex items-center gap-3 bg-surface px-3 py-2.5">
            <span className="flex size-8 items-center justify-center rounded-full bg-muted text-xs font-medium">
              {m.initials}
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-foreground">{m.name}</p>
              <p className="text-[11px] text-muted-foreground">{m.role}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ScreenBilling() {
  return (
    <div className="space-y-4 p-4 md:p-6">
      <div>
        <h3 className="text-lg font-medium text-foreground">Abonnement</h3>
        <p className="text-sm text-muted-foreground">Aktueller Plan und Tokens</p>
      </div>
      <div className="rounded-xl border border-border bg-surface p-4">
        <p className="text-xs text-muted-foreground">Aktueller Plan</p>
        <p className="mt-1 text-xl font-medium text-foreground">Brauerei Wachstum</p>
        <p className="mt-1 text-sm text-muted-foreground">3.000 Tokens / Monat · 3 Teamplätze</p>
        <div className="mt-4 h-2 overflow-hidden rounded-full bg-muted">
          <div className="h-full w-[28%] rounded-full bg-foreground/70" />
        </div>
        <p className="mt-2 text-[11px] text-muted-foreground">842 von 3.000 Tokens übrig</p>
      </div>
      <ParloStarButton href={SITE.appBaseUrl} className="h-9">
        Plan im Dashboard wählen
      </ParloStarButton>
    </div>
  );
}

function ScreenSettings() {
  return (
    <div className="space-y-4 p-4 md:p-6">
      <div>
        <h3 className="text-lg font-medium text-foreground">Einstellungen</h3>
        <p className="text-sm text-muted-foreground">Konto und Workspace</p>
      </div>
      <div className="space-y-2">
        {["Profil", "Benachrichtigungen", "Workspace", "Abmelden"].map((row) => (
          <div
            key={row}
            className="flex items-center justify-between rounded-xl border border-border bg-surface px-3 py-2.5 text-sm text-foreground"
          >
            {row}
            <span className="text-muted-foreground">›</span>
          </div>
        ))}
      </div>
      <PreviewHint>Einstellungen sind nur in der echten App aktiv.</PreviewHint>
    </div>
  );
}

function ActiveScreen({ active }: { active: NavKey }) {
  switch (active) {
    case "dashboard":
      return <ScreenDashboard />;
    case "brewai":
      return <ScreenBrewAI />;
    case "images":
      return <ScreenImages />;
    case "videos":
      return <ScreenVideos />;
    case "library":
      return <ScreenLibrary />;
    case "brand":
      return <ScreenBrand />;
    case "team":
      return <ScreenTeam />;
    case "billing":
      return <ScreenBilling />;
    case "settings":
      return <ScreenSettings />;
    default:
      return <ScreenDashboard />;
  }
}

export function DashboardPreview() {
  const [active, setActive] = useState<NavKey>("dashboard");
  const current = ALL_NAV.find((n) => n.key === active);

  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-2xl shadow-black/20 ring-1 ring-foreground/[0.06]">
      {/* Browser chrome */}
      <div className="flex h-10 shrink-0 items-center gap-3 border-b border-border bg-surface px-3">
        <div className="flex gap-1.5" aria-hidden>
          <span className="size-2.5 rounded-full bg-foreground/15" />
          <span className="size-2.5 rounded-full bg-foreground/15" />
          <span className="size-2.5 rounded-full bg-foreground/15" />
        </div>
        <div className="flex min-w-0 flex-1 items-center justify-center rounded-md border border-border bg-background px-3 py-1">
          <span className="truncate font-mono text-[11px] text-muted-foreground">
            {SITE.appHost}
            {current ? ` · ${current.label}` : ""}
          </span>
        </div>
        <a
          href={SITE.appBaseUrl}
          className="hidden shrink-0 text-[11px] font-medium text-foreground underline-offset-2 hover:underline sm:inline"
        >
          Echte App →
        </a>
      </div>

      {/* Mobile chip nav — fixed height row */}
      <div className="flex h-11 shrink-0 gap-1.5 overflow-x-auto border-b border-border px-3 py-2 parlo-hide-scrollbar lg:hidden">
        {ALL_NAV.map((item) => {
          const on = item.key === active;
          return (
            <button
              key={item.key}
              type="button"
              onClick={() => setActive(item.key)}
              className={cn(
                "inline-flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5 text-xs transition-colors",
                on
                  ? "bg-foreground text-background"
                  : "border border-border bg-surface text-muted-foreground",
                item.badge === "soon" && !on && "opacity-60",
              )}
            >
              <item.icon className="size-3" strokeWidth={1.6} />
              {item.label}
              {item.badge === "soon" ? (
                <span className="text-[9px] uppercase opacity-70">bald</span>
              ) : null}
            </button>
          );
        })}
      </div>

      {/* Fixed app viewport */}
      <div className={cn("grid lg:grid-cols-[220px_minmax(0,1fr)]", VIEWPORT_H)}>
        <aside className="hidden h-full overflow-y-auto border-r border-border bg-surface p-2 lg:block">
          <div className="mb-2 flex items-center gap-2 px-2.5 py-2">
            <img
              src="/brewai-mark-icon.png"
              alt=""
              width={20}
              height={20}
              className="size-5 shrink-0 object-contain brightness-0 dark:brightness-100"
            />
            <span className="text-[13px] font-medium text-foreground">{SITE.name}</span>
          </div>
          {NAV_GROUPS.map((group, gi) => (
            <div key={gi}>
              <div className="mx-2 my-1 h-px bg-foreground/[0.06]" />
              {group.map((item) => {
                const on = item.key === active;
                return (
                  <button
                    key={item.key}
                    type="button"
                    onClick={() => setActive(item.key)}
                    className={cn(
                      "flex h-8 w-full items-center gap-2.5 rounded-lg px-2.5 text-left transition-colors",
                      on ? "bg-foreground/[0.08]" : "hover:bg-foreground/[0.04]",
                      item.badge === "soon" && "opacity-55",
                    )}
                  >
                    <item.icon
                      className={cn(
                        "size-3.5",
                        on ? "text-foreground/80" : "text-foreground/30",
                      )}
                      strokeWidth={1.5}
                    />
                    <span
                      className={cn(
                        "flex-1 text-[13px]",
                        on ? "text-foreground" : "text-foreground/60",
                      )}
                    >
                      {item.label}
                    </span>
                    {item.badge === "soon" ? (
                      <span className="rounded px-1 py-0.5 text-[9px] uppercase tracking-wider text-foreground/35 ring-1 ring-foreground/10">
                        bald
                      </span>
                    ) : null}
                  </button>
                );
              })}
            </div>
          ))}
        </aside>

        <div className="h-full min-h-0 overflow-y-auto overflow-x-hidden bg-background">
          <ActiveScreen active={active} />
        </div>
      </div>
    </div>
  );
}
