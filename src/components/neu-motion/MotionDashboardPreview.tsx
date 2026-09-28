"use client";

/**
 * DashboardPreview (/neu) mit Motion-Schicht:
 * Rahmen zeichnet sich → Sidebar baut sich auf → KPIs zählen → „Letzte Motive“
 * verdichten sich; Tokens und Motiv-Zähler reagieren auf jede Generierung.
 * Alle übrigen Screens sind 1:1 aus DashboardPreview übernommen.
 */

import {
  Clapperboard,
  CreditCard,
  FolderOpen,
  ImagePlus,
  LayoutDashboard,
  type LucideIcon,
  MessageSquareText,
  Palette,
  Settings2,
  Sparkles,
  Users,
} from "lucide-react";
import NumberFlow from "@number-flow/react";
import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { SITE } from "@/lib/siteConfig";
import { cn } from "@/lib/utils";
import { CheckIcon, ParloStarButton } from "@/components/neu/parlo/ParloUi";
import { BrandProfileDemo } from "./BrandProfileDemo";
import { DitherMotif } from "./DitherMotif";
import { ImagesDemo } from "./ImagesDemo";
import { RECENT_SLOTS } from "./motifs";
import {
  EASE,
  cssEase,
  useInView,
  useInViewOnce,
  useMotionTier,
  usePageVisible,
  type MotionTier,
} from "./motion-utils";

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

/* ─── Laufendes System: geteilter Zustand ─── */

type SlotState = { poolIdx: number; gen: number };

type DashState = {
  tier: MotionTier;
  /** Rahmen + Sidebar fertig → KPIs dürfen zählen */
  live: boolean;
  tokens: number;
  motifs: number;
  slots: SlotState[];
  /** Erst-Sequenz bereits gespielt (für Remount nach Tab-Wechsel) */
  played: boolean;
  onGenerated: () => void;
  onSequenceDone: () => void;
  regenerate: (slot: number) => void;
};

const KPI_TIMING = {
  transformTiming: { duration: 900, easing: cssEase(EASE.count) },
  spinTiming: { duration: 1200, easing: cssEase(EASE.count) },
  opacityTiming: { duration: 350, easing: "ease-out" },
} as const;

function RecentCard({
  index,
  label,
  slot,
  play,
  instant,
  mobile,
  onGenerated,
}: {
  index: number;
  label: string;
  slot: SlotState;
  play: boolean;
  instant: boolean;
  mobile: boolean;
  onGenerated: () => void;
}) {
  const pool = RECENT_SLOTS[index].pool;
  const motif = pool[slot.poolIdx % pool.length];
  const [done, setDone] = useState(instant);

  return (
    <div className="parlo-grid-dots relative flex aspect-square items-end overflow-hidden rounded-lg border border-border bg-surface p-2">
      <DitherMotif
        src={motif.src}
        aspect={motif.aspect}
        ratioLabel={motif.ratio}
        play={play}
        generation={slot.gen}
        instant={instant}
        cell={mobile ? 5 : 4}
        inset={{ top: 8, right: 8, bottom: 26, left: 8 }}
        onPhase={(p) => {
          if (p === "morph") setDone(false);
          if (p === "done") {
            setDone(true);
            if (!instant) onGenerated();
          }
        }}
      />
      <span className="relative z-10 inline-flex min-w-0 max-w-full items-center gap-1 text-[10px] text-muted-foreground">
        <span className="truncate">{label}</span>
        <span
          className="inline-flex shrink-0"
          style={{
            opacity: done ? 1 : 0,
            transform: done ? "translateY(0)" : "translateY(2px)",
            transition: `opacity 220ms ${cssEase(EASE.snap)}, transform 220ms ${cssEase(EASE.snap)}`,
          }}
        >
          <CheckIcon className={cn("nm-check size-2.5 text-foreground/70", done && "is-on")} />
        </span>
      </span>
    </div>
  );
}

function ScreenDashboard({ dash }: { dash: DashState }) {
  const gridRef = useRef<HTMLDivElement>(null);
  const seen = useInViewOnce(gridRef, { threshold: 0.05 });
  const visible = useInView(gridRef);
  const pageVisible = usePageVisible();
  const { tier } = dash;
  const instantAll = tier.reduced;

  /* Beim Remount (nach Tab-Wechsel) vorhandene Motive sofort zeigen */
  const [mountGens] = useState<number[] | null>(() =>
    dash.played ? dash.slots.map((s) => s.gen) : null,
  );

  /* Erst-Sequenz: 300 ms nach Sichtbarkeit, 350 ms Versatz je Karte */
  const [started, setStarted] = useState<boolean[]>(() =>
    RECENT_SLOTS.map(() => dash.played || instantAll),
  );
  useEffect(() => {
    if (instantAll || !seen || !dash.live || dash.played) return;
    const timers = RECENT_SLOTS.map((_, i) =>
      window.setTimeout(() => {
        setStarted((s) => s.map((v, k) => (k === i ? true : v)));
      }, 300 + i * 350),
    );
    return () => timers.forEach(clearTimeout);
  }, [seen, dash.live, dash.played, instantAll]);

  /* Neu-Generierung: alle 8 s (Mobile 12 s) eine Karte — nur sichtbar */
  const nextSlot = useRef(0);
  const { played, regenerate } = dash;
  useEffect(() => {
    if (!played || instantAll || !visible || !pageVisible) return;
    const id = window.setInterval(
      () => {
        regenerate(nextSlot.current);
        nextSlot.current = (nextSlot.current + 1) % RECENT_SLOTS.length;
      },
      tier.mobile ? 12000 : 8000,
    );
    return () => clearInterval(id);
  }, [played, regenerate, instantAll, visible, pageVisible, tier.mobile]);

  const generatedCount = useRef(0);
  const handleGenerated = () => {
    dash.onGenerated();
    if (!dash.played) {
      generatedCount.current += 1;
      if (generatedCount.current >= RECENT_SLOTS.length) dash.onSequenceDone();
    }
  };

  return (
    <div className="space-y-4 p-4 sm:space-y-5 md:p-6">
      <div>
        <h3 className="text-lg font-medium text-foreground">Willkommen zurück</h3>
        <p className="mt-1 text-sm text-muted-foreground">
          Kurzüberblick für eure Brauerei — Vorschau ohne Login.
        </p>
      </div>
      <div className="grid grid-cols-3 gap-2 sm:gap-3">
        {[
          { label: "Tokens übrig", value: dash.tokens },
          { label: "Motive diesen Monat", value: dash.motifs },
          { label: "Team aktiv", value: 3 },
        ].map((c) => (
          <div
            key={c.label}
            className="rounded-xl border border-border bg-surface-elevated p-2.5 sm:p-4"
          >
            <p className="text-[10px] leading-tight text-muted-foreground sm:text-[11px]">{c.label}</p>
            <p className="mt-1 text-xl font-medium tracking-tight text-foreground sm:text-2xl">
              <NumberFlow
                value={dash.live ? c.value : 0}
                locales="de-DE"
                className="tabular-nums"
                {...KPI_TIMING}
              />
            </p>
          </div>
        ))}
      </div>
      <div>
        <p className="mb-2 text-xs font-medium text-muted-foreground">Letzte Motive</p>
        <div ref={gridRef} className="grid grid-cols-4 gap-1.5 sm:gap-2">
          {RECENT_SLOTS.map((s, i) => {
            const slot = dash.slots[i];
            const instant = instantAll || (mountGens !== null && slot.gen <= mountGens[i]);
            return (
              <RecentCard
                key={s.label}
                index={i}
                label={s.label}
                slot={slot}
                play={started[i] || instantAll}
                instant={instant}
                mobile={tier.mobile}
                onGenerated={handleGenerated}
              />
            );
          })}
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

function ActiveScreen({
  active,
  dash,
  onBrandSettled,
  brandInterrupt,
}: {
  active: NavKey;
  dash: DashState;
  onBrandSettled?: () => void;
  brandInterrupt: boolean;
}) {
  switch (active) {
    case "dashboard":
      return <ScreenDashboard dash={dash} />;
    case "brewai":
      return <ScreenBrewAI />;
    case "images":
      return (
        <ImagesDemo
          reduced={dash.tier.reduced}
          mobile={dash.tier.mobile}
          onGenerated={dash.onGenerated}
        />
      );
    case "videos":
      return <ScreenVideos />;
    case "library":
      return <ScreenLibrary />;
    case "brand":
      return (
        <BrandProfileDemo
          reduced={dash.tier.reduced}
          mobile={dash.tier.mobile}
          onSettled={onBrandSettled}
          allowInterrupt={brandInterrupt}
        />
      );
    case "team":
      return <ScreenTeam />;
    case "billing":
      return <ScreenBilling />;
    case "settings":
      return <ScreenSettings />;
    default:
      return <ScreenDashboard dash={dash} />;
  }
}

/* Aufbau-Stufen: 0 wartet · 1 Rahmen zeichnet · 2 Fläche steht · 3 Inhalt live */
type Stage = 0 | 1 | 2 | 3;

export function MotionDashboardPreview() {
  const [active, setActive] = useState<NavKey>("dashboard");
  const current = ALL_NAV.find((n) => n.key === active);
  const tier = useMotionTier();
  const rootRef = useRef<HTMLDivElement>(null);
  const seen = useInViewOnce(rootRef, { threshold: 0.2 });
  const [stage, setStage] = useState<Stage>(0);
  const [size, setSize] = useState({ w: 0, h: 0 });

  /* Laufendes System */
  const [tokens, setTokens] = useState(842);
  const [motifs, setMotifs] = useState(27);
  const [played, setPlayed] = useState(false);
  /** Nav + Demo erst bedienbar, wenn Markenprofil einmal durchgelaufen ist */
  const [flowDone, setFlowDone] = useState(false);
  const [slots, setSlots] = useState<SlotState[]>(() =>
    RECENT_SLOTS.map(() => ({ poolIdx: 0, gen: 1 })),
  );

  useEffect(() => {
    if (!tier.ready) return;
    if (tier.reduced) {
      setStage(3);
      setPlayed(true);
      setFlowDone(true);
      return;
    }
    if (!seen) return;
    setStage(1);
    const t1 = window.setTimeout(() => setStage(2), 820);
    const t2 = window.setTimeout(() => setStage(3), 1100);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [seen, tier.ready, tier.reduced]);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setSize({ w: el.offsetWidth, h: el.offsetHeight }));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  /* Auto-Tour: Dashboard → Markenprofil → Bilder —
     währenddessen Nav gesperrt, bis Markenprofil einmal fertig ist */
  const inView = useInView(rootRef, { threshold: 0.35 });
  const touchedRef = useRef(false);
  const brandTouredRef = useRef(false);
  const imagesTouredRef = useRef(false);
  const flowLocked = !flowDone;

  useEffect(() => {
    if (!played || tier.reduced || !inView || brandTouredRef.current || touchedRef.current) return;
    if (active !== "dashboard") return;
    const id = window.setTimeout(() => {
      if (touchedRef.current) return;
      brandTouredRef.current = true;
      setActive("brand");
    }, 2800);
    return () => clearTimeout(id);
  }, [played, tier.reduced, inView, active]);

  const onBrandSettled = useCallback(() => {
    setFlowDone(true);
    if (imagesTouredRef.current || touchedRef.current || tier.reduced) return;
    window.setTimeout(() => {
      if (touchedRef.current || imagesTouredRef.current) return;
      imagesTouredRef.current = true;
      setActive("images");
    }, 2200);
  }, [tier.reduced]);

  /* Fallback: falls die Demo nie settelt (Tab weg, Visibility), Nav nicht ewig sperren */
  useEffect(() => {
    if (!played || flowDone || tier.reduced) return;
    const id = window.setTimeout(() => setFlowDone(true), 40000);
    return () => clearTimeout(id);
  }, [played, flowDone, tier.reduced]);

  const selectNav = useCallback(
    (key: NavKey) => {
      if (flowLocked) return;
      touchedRef.current = true;
      setActive(key);
    },
    [flowLocked],
  );

  const onGenerated = useCallback(() => {
    setTokens((t) => Math.max(0, t - 1));
    setMotifs((m) => m + 1);
  }, []);
  const onSequenceDone = useCallback(() => setPlayed(true), []);
  const regenerate = useCallback((slot: number) => {
    setSlots((s) =>
      s.map((v, k) => (k === slot ? { poolIdx: v.poolIdx + 1, gen: v.gen + 1 } : v)),
    );
  }, []);

  const dash: DashState = {
    tier,
    live: stage >= 3,
    tokens,
    motifs,
    slots,
    played,
    onGenerated,
    onSequenceDone,
    regenerate,
  };

  const framed = stage >= 2;
  const live = stage >= 3;
  const riseStyle = (delay: number): React.CSSProperties => ({
    opacity: live ? 1 : 0,
    transform: live ? "translateY(0)" : "translateY(8px)",
    transition: `opacity 500ms ${cssEase(EASE.rise)} ${delay}ms, transform 700ms ${cssEase(EASE.rise)} ${delay}ms`,
  });

  let navIndex = 0;

  return (
    <div
      ref={rootRef}
      onPointerDownCapture={() => {
        if (flowLocked) return;
        touchedRef.current = true;
      }}
      className={cn(
        "relative overflow-hidden rounded-2xl border transition-[background-color,border-color,box-shadow] duration-500",
        framed
          ? "border-border bg-card shadow-2xl shadow-black/20 ring-1 ring-foreground/[0.06]"
          : "border-transparent bg-transparent",
      )}
    >
      {/* Linie vor Fläche: Rahmen zeichnet sich von oben links im Uhrzeigersinn */}
      {!tier.reduced && size.w > 0 ? (
        <svg
          aria-hidden
          className={cn(
            "nm-frame-draw pointer-events-none absolute inset-0 z-30 text-foreground transition-opacity duration-500",
            stage >= 1 && "is-on",
            framed && "opacity-0",
          )}
          width={size.w}
          height={size.h}
          viewBox={`0 0 ${size.w} ${size.h}`}
        >
          <rect
            x={0.5}
            y={0.5}
            width={Math.max(0, size.w - 1)}
            height={Math.max(0, size.h - 1)}
            rx={15.5}
            fill="none"
            stroke="currentColor"
            strokeOpacity={0.3}
            pathLength={1}
          />
        </svg>
      ) : null}

      {/* Browser chrome */}
      <div
        className="flex h-10 shrink-0 items-center gap-3 border-b border-border bg-surface px-3"
        style={riseStyle(0)}
      >
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
      <div
        className="flex h-11 shrink-0 gap-1.5 overflow-x-auto border-b border-border px-3 py-2 parlo-hide-scrollbar lg:hidden"
        style={riseStyle(80)}
      >
        {ALL_NAV.map((item) => {
          const on = item.key === active;
          return (
            <button
              key={item.key}
              type="button"
              disabled={flowLocked}
              aria-disabled={flowLocked}
              onClick={() => selectNav(item.key)}
              className={cn(
                "relative inline-flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5 text-xs transition-colors duration-200",
                on ? "text-background" : "border border-border bg-surface text-muted-foreground",
                item.badge === "soon" && !on && "opacity-60",
                flowLocked && "cursor-default opacity-70",
              )}
            >
              {on ? (
                <motion.span
                  layoutId="nm-chip-active"
                  className="absolute inset-0 rounded-full bg-foreground"
                  transition={{ duration: 0.3, ease: EASE.micro }}
                />
              ) : null}
              <item.icon className="relative size-3" strokeWidth={1.6} />
              <span className="relative">{item.label}</span>
              {item.badge === "soon" ? (
                <span className="relative text-[9px] uppercase opacity-70">bald</span>
              ) : null}
            </button>
          );
        })}
      </div>

      {/* Fixed app viewport */}
      <div className={cn("grid lg:grid-cols-[220px_minmax(0,1fr)]", VIEWPORT_H)}>
        <aside className="hidden h-full overflow-y-auto border-r border-border bg-surface p-2 lg:block">
          <div className="mb-2 flex items-center gap-2 px-2.5 py-2" style={riseStyle(60)}>
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
              <div
                className={cn("nm-line-x mx-2 my-1 h-px bg-foreground/[0.06]", live && "is-in")}
                style={{ ["--nm-delay" as string]: `${120 + gi * 160}ms` }}
              />
              {group.map((item) => {
                const on = item.key === active;
                const delay = 100 + navIndex++ * 40;
                return (
                  <button
                    key={item.key}
                    type="button"
                    disabled={flowLocked}
                    aria-disabled={flowLocked}
                    onClick={() => selectNav(item.key)}
                    style={riseStyle(delay)}
                    className={cn(
                      "relative flex h-8 w-full items-center gap-2.5 rounded-lg px-2.5 text-left transition-colors",
                      !on && !flowLocked && "hover:bg-foreground/[0.04]",
                      item.badge === "soon" && "opacity-55",
                      flowLocked && "cursor-default",
                    )}
                  >
                    {on ? (
                      <motion.span
                        layoutId="nm-nav-active"
                        className="absolute inset-0 rounded-lg bg-foreground/[0.08]"
                        transition={{ duration: 0.3, ease: EASE.micro }}
                      />
                    ) : null}
                    <item.icon
                      className={cn(
                        "relative size-3.5",
                        on ? "text-foreground/80" : "text-foreground/30",
                      )}
                      strokeWidth={1.5}
                    />
                    <span
                      className={cn(
                        "relative flex-1 text-[13px]",
                        on ? "text-foreground" : "text-foreground/60",
                      )}
                    >
                      {item.label}
                    </span>
                    {item.badge === "soon" ? (
                      <span className="relative rounded px-1 py-0.5 text-[9px] uppercase tracking-wider text-foreground/35 ring-1 ring-foreground/10">
                        bald
                      </span>
                    ) : null}
                  </button>
                );
              })}
            </div>
          ))}
        </aside>

        <div
          className="h-full min-h-0 overflow-y-auto overflow-x-hidden bg-background"
          style={riseStyle(260)}
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={active}
              className="h-full"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.22, ease: EASE.micro }}
            >
              <ActiveScreen
                active={active}
                dash={dash}
                onBrandSettled={onBrandSettled}
                brandInterrupt={flowDone}
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
