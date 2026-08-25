import { WERKSTATT_MAX_SAVINGS_PERCENT } from "@/lib/mobilePricingTiers";

export const FREE_TRIAL_DEMO_STORAGE_KEY = "evglab_demo_sessions";
export const FREE_TRIAL_DEMO_PROFILE_KEY = "evglab_demo_profile";
export const FREE_TRIAL_DEMO_MAX = 3;
/** Demo-Dauer — schnell wie im Handoff-Prototyp (echte App: ~40s) */
export const FREE_TRIAL_GENERATION_MS = 6_000;

/** Hinweis am Abo-CTA: Listenpreise sind bereits rabattiert, kein Extra-Rabatt beim Klick. */
export const DEMO_FUNNEL_SAVINGS_BADGE = `INKL. −${WERKSTATT_MAX_SAVINGS_PERCENT} %`;
export const DEMO_FUNNEL_SAVINGS_HINT = `Die angezeigten Preise enthalten bereits bis zu ${WERKSTATT_MAX_SAVINGS_PERCENT} % Ersparnis — kein zusätzlicher Rabatt nötig.`;

export const DEMO_FUNNEL_COLORS = {
  amber: "#D4A24C",
  orange: "#E5621E",
  bg: "#17160E",
  surface: "#1E1D12",
  surfaceHover: "#262518",
  text: "#F4F0E8",
  muted: "rgba(244,240,232,0.52)",
  dim: "rgba(244,240,232,0.26)",
  border: "rgba(244,240,232,0.08)",
  borderHover: "rgba(212,162,76,0.55)",
} as const;

export type DemoMotifId = "biergarten" | "produkt-studio" | "kampagne" | "wirtshaus";

export type DemoMotifIcon = "beer" | "studio" | "social" | "candle";

export type DemoBeerStyleId = "pils" | "helles" | "weizen" | "dunkles";

export type DemoBeerStyle = {
  id: DemoBeerStyleId;
  label: string;
};

export const DEMO_BEER_STYLES: readonly DemoBeerStyle[] = [
  { id: "pils", label: "Pils" },
  { id: "helles", label: "Helles" },
  { id: "weizen", label: "Weizen" },
  { id: "dunkles", label: "Dunkles" },
] as const;

export type DemoProfile = {
  breweryName: string;
  beerStyleId: DemoBeerStyleId;
};

export type DemoMotif = {
  id: DemoMotifId;
  tag: string;
  title: string;
  description: string;
  gradient: string;
  icon: DemoMotifIcon;
  resultImage: string;
  resultAlt: string;
};

export const DEMO_MOTIFS: readonly DemoMotif[] = [
  {
    id: "biergarten",
    tag: "Stimmung",
    title: "Biergarten · Goldene Stunde",
    description: "Warmes Abendlicht, Glas & Schaum",
    gradient: "linear-gradient(145deg,#3D1F00 0%,#7C4A10 40%,#C89228 70%,#6B3A0A 100%)",
    icon: "beer",
    resultImage: "/demo-funnel/biergarten.webp",
    resultAlt: "Biergarten-Motiv bei goldener Stunde mit Glas und Schaumkrone",
  },
  {
    id: "produkt-studio",
    tag: "Produktfoto",
    title: "Studio · Flasche & Glas",
    description: "Sauberer Studio-Look, weißer Hintergrund",
    gradient: "linear-gradient(145deg,#1A1A18 0%,#2E2D28 45%,#3C3A32 70%,#22211C 100%)",
    icon: "studio",
    resultImage: "/demo-funnel/studio.webp",
    resultAlt: "Produktfoto einer Bierflasche und einem Glas im Studio-Look",
  },
  {
    id: "kampagne",
    tag: "Kampagne",
    title: "Social-Post · Textfläche",
    description: "Motiv mit Freifläche für Instagram",
    gradient: "linear-gradient(145deg,#3D0E00 0%,#A03010 45%,#E5621E 75%,#7A2000 100%)",
    icon: "social",
    resultImage: "/demo-funnel/kampagne.webp",
    resultAlt: "Kampagnenmotiv am Hafen mit Freifläche für Social Media",
  },
  {
    id: "wirtshaus",
    tag: "Lifestyle",
    title: "Lifestyle · Sommergarten",
    description: "Leichtes Outdoor-Motiv für Social",
    gradient: "linear-gradient(145deg,#0D0805 0%,#2A1508 40%,#4A2810 65%,#180C04 100%)",
    icon: "candle",
    resultImage: "/demo-funnel/lifestyle.webp",
    resultAlt: "Lifestyle-Motiv im Biergarten bei Sonnenschein",
  },
] as const;

export type DemoSession = {
  motifId: DemoMotifId;
  timestamp: number;
};

export type DemoStorage = {
  sessions: DemoSession[];
};

export const GENERATION_STATUS_MESSAGES = [
  "Komposition wird aufgebaut …",
  "Licht & Schatten werden gesetzt …",
  "Bildstimmung wird kalibriert …",
  "Details werden verfeinert …",
  "Letzter Schliff …",
] as const;

function isDemoMotifId(value: string): value is DemoMotifId {
  return DEMO_MOTIFS.some((motif) => motif.id === value);
}

function isBeerStyleId(value: string): value is DemoBeerStyleId {
  return DEMO_BEER_STYLES.some((style) => style.id === value);
}

function parseStorage(raw: string | null): DemoStorage {
  if (!raw) return { sessions: [] };
  try {
    const parsed = JSON.parse(raw) as Partial<DemoStorage>;
    if (!Array.isArray(parsed.sessions)) return { sessions: [] };
    const sessions = parsed.sessions
      .filter(
        (entry): entry is DemoSession =>
          typeof entry === "object" &&
          entry !== null &&
          typeof entry.timestamp === "number" &&
          typeof entry.motifId === "string" &&
          isDemoMotifId(entry.motifId),
      )
      .slice(0, FREE_TRIAL_DEMO_MAX);
    return { sessions };
  } catch {
    return { sessions: [] };
  }
}

export function readDemoStorage(): DemoStorage {
  if (typeof window === "undefined") return { sessions: [] };
  return parseStorage(window.localStorage.getItem(FREE_TRIAL_DEMO_STORAGE_KEY));
}

export function getRemainingDemos(storage: DemoStorage = readDemoStorage()): number {
  return Math.max(0, FREE_TRIAL_DEMO_MAX - storage.sessions.length);
}

export function isDemoExhausted(storage: DemoStorage = readDemoStorage()): boolean {
  return getRemainingDemos(storage) <= 0;
}

export function getUsedMotifIds(storage: DemoStorage = readDemoStorage()): DemoMotifId[] {
  return storage.sessions.map((session) => session.motifId);
}

export function recordDemoSession(motifId: DemoMotifId): DemoStorage {
  const current = readDemoStorage();
  if (current.sessions.length >= FREE_TRIAL_DEMO_MAX) return current;

  const next: DemoStorage = {
    sessions: [...current.sessions, { motifId, timestamp: Date.now() }],
  };

  if (typeof window !== "undefined") {
    window.localStorage.setItem(FREE_TRIAL_DEMO_STORAGE_KEY, JSON.stringify(next));
    window.dispatchEvent(new CustomEvent("evglab-demo-sessions-changed"));
  }

  return next;
}

export function getDemoMotif(id: DemoMotifId): DemoMotif {
  const motif = DEMO_MOTIFS.find((entry) => entry.id === id);
  if (!motif) return DEMO_MOTIFS[0];
  return motif;
}

export function getBeerStyle(id: DemoBeerStyleId): DemoBeerStyle {
  return DEMO_BEER_STYLES.find((style) => style.id === id) ?? DEMO_BEER_STYLES[2];
}

export function normalizeBreweryName(value: string): string {
  return value.trim().replace(/\s+/g, " ").slice(0, 40);
}

export function readDemoProfile(): DemoProfile | null {
  if (typeof window === "undefined") return null;
  try {
    const parsed = JSON.parse(window.localStorage.getItem(FREE_TRIAL_DEMO_PROFILE_KEY) ?? "") as Partial<DemoProfile>;
    const breweryName = typeof parsed.breweryName === "string" ? normalizeBreweryName(parsed.breweryName) : "";
    if (breweryName.length < 2) return null;
    if (typeof parsed.beerStyleId !== "string" || !isBeerStyleId(parsed.beerStyleId)) return null;
    return { breweryName, beerStyleId: parsed.beerStyleId };
  } catch {
    return null;
  }
}

export function saveDemoProfile(profile: DemoProfile): DemoProfile {
  const next: DemoProfile = {
    breweryName: normalizeBreweryName(profile.breweryName),
    beerStyleId: isBeerStyleId(profile.beerStyleId) ? profile.beerStyleId : "weizen",
  };
  if (typeof window !== "undefined") {
    window.localStorage.setItem(FREE_TRIAL_DEMO_PROFILE_KEY, JSON.stringify(next));
  }
  return next;
}

export function buildDemoPrompt(profile: DemoProfile, motif: DemoMotif): string {
  const style = getBeerStyle(profile.beerStyleId);
  const scene = {
    biergarten: "golden hour beer garden, string lights, condensation",
    "produkt-studio": "clean studio product shot, marble, hops",
    kampagne: "cinematic campaign still, negative space, mountains",
    wirtshaus: "candlelit tavern, dark wood, warm amber light",
  }[motif.id];
  return `${scene}, ${style.label} by ${profile.breweryName}, 50mm, cinematic --ar 4:3`;
}

export function generationStatusFor(profile: DemoProfile, motif: DemoMotif): readonly string[] {
  const style = getBeerStyle(profile.beerStyleId);
  return [
    `Komposition für ${profile.breweryName} …`,
    `${style.label} · Licht & Schatten …`,
    `${motif.tag} wird kalibriert …`,
    "Details werden verfeinert …",
    "Letzter Schliff …",
  ];
}

export function demoVariantCode(profile: DemoProfile, motifId: DemoMotifId): string {
  const seed = `${profile.breweryName}:${profile.beerStyleId}:${motifId}`;
  let hash = 2166136261;
  for (let i = 0; i < seed.length; i += 1) {
    hash ^= seed.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return String(100000 + (hash >>> 0) % 900000);
}
