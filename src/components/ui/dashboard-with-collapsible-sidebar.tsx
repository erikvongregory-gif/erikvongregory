"use client";

import React, { useCallback, useEffect, useState } from "react";
import {
  Beer,
  Bell,
  Check,
  ChevronDown,
  ChevronsRight,
  CreditCard,
  FileText,
  HelpCircle,
  Home,
  Image,
  Moon,
  Menu,
  Settings,
  Sparkles,
  Sun,
  Users,
  User,
  Wand2,
  type LucideIcon,
} from "lucide-react";
import {
  BrewerySubscriptionPlans,
  type SubscriptionPlanKey,
} from "@/components/dashboard/BrewerySubscriptionPlans";
import { ImagePromptWorkflow } from "@/components/dashboard/ImagePromptWorkflow";
import { OnboardingDialog } from "@/components/ui/onboarding-dialog";
import { createClient as createSupabaseClient } from "@/lib/supabase/client";
import { isSupabaseConfigured } from "@/lib/supabase/env";

type OptionProps = {
  Icon: LucideIcon;
  title: DashboardTab;
  selected: DashboardTab;
  setSelected: React.Dispatch<React.SetStateAction<DashboardTab>>;
  open: boolean;
  notifs?: number;
};

type DashboardTab =
  | "Dashboard"
  | "Inhalte erstellen"
  | "Mediathek"
  | "Abo & Tokens"
  | "Team"
  | "Einstellungen"
  | "Hilfe & Support";

type ToggleCloseProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

type ExampleContentProps = {
  isDark: boolean;
  setIsDark: React.Dispatch<React.SetStateAction<boolean>>;
  applyTheme: (nextDark: boolean) => void;
  userEmail?: string;
  userName?: string;
  selectedTab: DashboardTab;
  setSelectedTab: React.Dispatch<React.SetStateAction<DashboardTab>>;
};

type ActivityItem = {
  icon: LucideIcon;
  title: string;
  desc: string;
  time: string;
  color: "orange" | "blue" | "purple" | "green";
};

type MediaLibraryItem = {
  id: string;
  imageUrl: string;
  prompt: string;
  createdAt: string;
  aspectRatio: string;
  resolution: "1K" | "2K" | "4K";
  outputFormat: "png" | "jpg";
};

const PLAN_LABELS: Record<SubscriptionPlanKey, string> = {
  start: "Brauerei Start",
  growth: "Brauerei Wachstum",
  pro: "Brauerei Pro",
};

const activityItems: ActivityItem[] = [
  { icon: Wand2, title: "Neuer Beitrag erstellt", desc: "Fruehlingsbier-Post wurde vorbereitet", time: "vor 12 Min.", color: "orange" },
  { icon: Image, title: "Bild exportiert", desc: "Plakatmotiv in hoher Aufloesung gespeichert", time: "vor 34 Min.", color: "blue" },
  { icon: Users, title: "Teammitglied eingeladen", desc: "marketing@deinebrauerei.de hinzugefuegt", time: "vor 2 Std.", color: "purple" },
  { icon: CreditCard, title: "Abo erfolgreich verlaengert", desc: "Plan Brauerei Wachstum bis Mai aktiv", time: "gestern", color: "green" },
];

const USE_CASE_FLOWS = [
  {
    title: "Saisonbier-Launch",
    steps: ["Prompt-Briefing ausfüllen", "2 Hero-Motive generieren", "Instagram + Story exportieren"],
  },
  {
    title: "Event-Promotion",
    steps: ["Eventdaten im Prompt setzen", "Promo-Bildserie rendern", "Reminder-Visuals veröffentlichen"],
  },
  {
    title: "Gastro-Partner-Content",
    steps: ["Produkt + Zielgruppe wählen", "Co-Branding-Bilder erzeugen", "Pakete an Partner senden"],
  },
] as const;

type ExampleProps = {
  userEmail?: string;
  userName?: string;
};

export const Example = ({ userEmail, userName }: ExampleProps) => {
  const [isDark, setIsDark] = useState(false);
  const [selectedTab, setSelectedTab] = useState<DashboardTab>("Dashboard");

  const applyTheme = useCallback((nextDark: boolean) => {
    if (typeof window === "undefined") return;
    const root = document.documentElement;
    root.classList.toggle("dark", nextDark);
    root.style.colorScheme = nextDark ? "dark" : "light";
    window.localStorage.setItem("evglab-dashboard-theme", nextDark ? "dark" : "light");
    setIsDark(nextDark);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const saved = window.localStorage.getItem("evglab-dashboard-theme");
    if (saved === "dark" || saved === "light") {
      applyTheme(saved === "dark");
      return;
    }
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    applyTheme(prefersDark);
  }, [applyTheme]);

  return (
    <div className={`flex min-h-screen w-full ${isDark ? "dark" : ""}`}>
      <div className="flex w-full flex-col bg-gray-50 text-gray-900 dark:bg-gray-950 dark:text-gray-100 lg:flex-row">
        <Sidebar selected={selectedTab} setSelected={setSelectedTab} userEmail={userEmail} />
        <ExampleContent
          isDark={isDark}
          setIsDark={setIsDark}
          applyTheme={applyTheme}
          userEmail={userEmail}
          userName={userName}
          selectedTab={selectedTab}
          setSelectedTab={setSelectedTab}
        />
      </div>
    </div>
  );
};

const Sidebar = ({
  selected,
  setSelected,
  userEmail,
}: {
  selected: DashboardTab;
  setSelected: React.Dispatch<React.SetStateAction<DashboardTab>>;
  userEmail?: string;
}) => {
  const [open, setOpen] = useState(true);
  const [activeSubscription, setActiveSubscription] = useState<SubscriptionPlanKey | null>(null);
  const [billingStatus, setBillingStatus] = useState<string>("none");

  useEffect(() => {
    let ignore = false;
    const loadBilling = async () => {
      try {
        const res = await fetch("/api/billing/state", { cache: "no-store" });
        if (!res.ok) return;
        const data = (await res.json()) as {
          state?: {
            plan: SubscriptionPlanKey | null;
            status?: string;
          };
        };
        if (!ignore && data.state) {
          setActiveSubscription(data.state.plan);
          setBillingStatus(data.state.status ?? "none");
        }
      } catch {
        // ignore network errors
      }
    };
    void loadBilling();
    const onBillingUpdated = () => {
      void loadBilling();
    };
    window.addEventListener("evglab-billing-updated", onBillingUpdated as EventListener);
    return () => {
      ignore = true;
      window.removeEventListener("evglab-billing-updated", onBillingUpdated as EventListener);
    };
  }, []);

  const hasActiveBilling = Boolean(activeSubscription) && billingStatus !== "none" && billingStatus !== "canceled";
  const currentPlanLabel = hasActiveBilling && activeSubscription ? PLAN_LABELS[activeSubscription] : "Kein aktives Abo";

  return (
    <nav
      className={`sticky top-0 h-screen shrink-0 border-r transition-all duration-300 ease-in-out ${
        open ? "w-64" : "w-16"
      } hidden border-gray-200 bg-white p-2 shadow-sm dark:border-gray-800 dark:bg-gray-900 lg:block`}
    >
      <TitleSection open={open} userEmail={userEmail} planLabel={currentPlanLabel} />

      <div className="mb-8 space-y-1">
        <Option Icon={Home} title="Dashboard" selected={selected} setSelected={setSelected} open={open} />
        <Option Icon={Wand2} title="Inhalte erstellen" selected={selected} setSelected={setSelected} open={open} />
        <Option Icon={Image} title="Mediathek" selected={selected} setSelected={setSelected} open={open} />
        <Option Icon={CreditCard} title="Abo & Tokens" selected={selected} setSelected={setSelected} open={open} />
        <Option Icon={Users} title="Team" selected={selected} setSelected={setSelected} open={open} notifs={1} />
      </div>

      {open && (
        <div className="space-y-1 border-t border-gray-200 pt-4 dark:border-gray-800">
          <div className="px-3 py-2 text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400">Konto</div>
          <Option Icon={Settings} title="Einstellungen" selected={selected} setSelected={setSelected} open={open} />
          <Option Icon={HelpCircle} title="Hilfe & Support" selected={selected} setSelected={setSelected} open={open} />
        </div>
      )}

      <ToggleClose open={open} setOpen={setOpen} />
    </nav>
  );
};

const MobileTabBar = ({
  selected,
  setSelected,
}: {
  selected: DashboardTab;
  setSelected: React.Dispatch<React.SetStateAction<DashboardTab>>;
}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const tabs: Array<{ title: DashboardTab; Icon: LucideIcon }> = [
    { title: "Dashboard", Icon: Home },
    { title: "Inhalte erstellen", Icon: Wand2 },
    { title: "Mediathek", Icon: Image },
    { title: "Abo & Tokens", Icon: CreditCard },
    { title: "Team", Icon: Users },
    { title: "Einstellungen", Icon: Settings },
    { title: "Hilfe & Support", Icon: HelpCircle },
  ];

  const activeTab = tabs.find((tab) => tab.title === selected) ?? tabs[0];

  return (
    <div className="-mx-4 mb-4 border-y border-gray-200 bg-white px-4 py-3 dark:border-gray-800 dark:bg-gray-900 sm:-mx-6 sm:px-6 lg:hidden">
      <button
        type="button"
        onClick={() => setMenuOpen((prev) => !prev)}
        className="flex w-full items-center justify-between rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-700 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200"
      >
        <span className="inline-flex items-center gap-2">
          <activeTab.Icon className="h-4 w-4" />
          {activeTab.title}
        </span>
        <span className="inline-flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
          Menü
          <Menu className="h-4 w-4" />
        </span>
      </button>

      {menuOpen && (
        <div className="mt-2 rounded-lg border border-gray-200 bg-white p-1 shadow-sm dark:border-gray-700 dark:bg-gray-900">
          {tabs.map(({ title, Icon }) => {
            const isSelected = selected === title;
            return (
              <button
                key={title}
                onClick={() => {
                  setSelected(title);
                  setMenuOpen(false);
                }}
                className={`flex w-full items-center justify-between rounded-md px-3 py-2 text-left text-sm transition ${
                  isSelected
                    ? "bg-blue-50 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300"
                    : "text-gray-700 hover:bg-gray-50 dark:text-gray-200 dark:hover:bg-gray-800"
                }`}
              >
                <span className="inline-flex items-center gap-2">
                  <Icon className="h-4 w-4" />
                  {title}
                </span>
                {isSelected ? <Check className="h-4 w-4" /> : null}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

const Option = ({ Icon, title, selected, setSelected, open, notifs }: OptionProps) => {
  const isSelected = selected === title;

  return (
    <button
      onClick={() => setSelected(title)}
      className={`relative flex h-11 w-full items-center rounded-md transition-all duration-200 ${
        isSelected
          ? "border-l-2 border-blue-500 bg-blue-50 text-blue-700 shadow-sm dark:bg-blue-900/50 dark:text-blue-300"
          : "text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-200"
      }`}
    >
      <div className="grid h-full w-12 place-content-center">
        <Icon className="h-4 w-4" />
      </div>

      {open && (
        <span className={`text-sm font-medium transition-opacity duration-200 ${open ? "opacity-100" : "opacity-0"}`}>{title}</span>
      )}

      {notifs && open && (
        <span className="absolute right-3 flex h-5 w-5 items-center justify-center rounded-full bg-blue-500 text-xs font-medium text-white dark:bg-blue-600">
          {notifs}
        </span>
      )}
    </button>
  );
};

const TitleSection = ({ open, userEmail, planLabel }: { open: boolean; userEmail?: string; planLabel: string }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleBackToHomepage = () => {
    if (typeof window === "undefined") return;
    window.location.assign("/");
  };

  const handleRestartOnboarding = () => {
    if (typeof window === "undefined") return;
    const onboardingStorageKey = `evglab-dashboard-onboarding-v1:${userEmail ?? "default"}`;
    try {
      window.localStorage.removeItem(onboardingStorageKey);
    } catch {
      // ignore localStorage errors
    }
    window.dispatchEvent(new CustomEvent("evglab-restart-onboarding"));
    setMenuOpen(false);
  };

  return (
    <div className="mb-6 border-b border-gray-200 pb-4 dark:border-gray-800">
      <button
        type="button"
        onClick={() => setMenuOpen((prev) => !prev)}
        className="flex w-full cursor-pointer items-center justify-between rounded-md p-2 text-left transition-colors hover:bg-gray-50 dark:hover:bg-gray-800"
      >
        <div className="flex items-center gap-3">
          <Logo />
          {open && (
            <div className={`transition-opacity duration-200 ${open ? "opacity-100" : "opacity-0"}`}>
              <div className="flex items-center gap-2">
                <div>
                  <span className="block text-sm font-semibold text-gray-900 dark:text-gray-100">Brauerei Dashboard</span>
                  <span className="block text-xs text-gray-500 dark:text-gray-400">{planLabel}</span>
                </div>
              </div>
            </div>
          )}
        </div>
        {open && <ChevronDown className={`h-4 w-4 text-gray-400 transition-transform dark:text-gray-500 ${menuOpen ? "rotate-180" : ""}`} />}
      </button>

      {open && menuOpen ? (
        <div className="mt-2 space-y-1 rounded-md border border-gray-200 bg-white p-1 shadow-sm dark:border-gray-700 dark:bg-gray-900">
          <button
            type="button"
            onClick={handleBackToHomepage}
            className="flex w-full items-center rounded-md px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50 dark:text-gray-200 dark:hover:bg-gray-800"
          >
            Zur Startseite
          </button>
          <button
            type="button"
            onClick={handleRestartOnboarding}
            className="flex w-full items-center rounded-md px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50 dark:text-gray-200 dark:hover:bg-gray-800"
          >
            Onboarding neu starten
          </button>
        </div>
      ) : null}
    </div>
  );
};

const Logo = () => {
  return (
    <div className="grid size-10 shrink-0 place-content-center rounded-lg bg-gradient-to-br from-[#d46830] to-[#b84d15] shadow-sm">
      <svg width="20" height="auto" viewBox="0 0 50 39" fill="none" xmlns="http://www.w3.org/2000/svg" className="fill-white">
        <path d="M16.4992 2H37.5808L22.0816 24.9729H1L16.4992 2Z" />
        <path d="M17.4224 27.102L11.4192 36H33.5008L49 13.0271H32.7024L23.2064 27.102H17.4224Z" />
      </svg>
    </div>
  );
};

const ToggleClose = ({ open, setOpen }: ToggleCloseProps) => {
  return (
    <button
      onClick={() => setOpen(!open)}
      className="absolute bottom-0 left-0 right-0 border-t border-gray-200 transition-colors hover:bg-gray-50 dark:border-gray-800 dark:hover:bg-gray-800"
    >
      <div className="flex items-center p-3">
        <div className="grid size-10 place-content-center">
          <ChevronsRight className={`h-4 w-4 text-gray-500 transition-transform duration-300 dark:text-gray-400 ${open ? "rotate-180" : ""}`} />
        </div>
        {open && <span className={`text-sm font-medium text-gray-600 transition-opacity duration-200 dark:text-gray-300 ${open ? "opacity-100" : "opacity-0"}`}>Ausblenden</span>}
      </div>
    </button>
  );
};

const ExampleContent = ({ isDark, setIsDark, applyTheme, userEmail, userName, selectedTab, setSelectedTab }: ExampleContentProps) => {
  const [mediaItems, setMediaItems] = useState<MediaLibraryItem[]>([]);
  const [expandedPromptId, setExpandedPromptId] = useState<string | null>(null);
  const [downloadingMediaId, setDownloadingMediaId] = useState<string | null>(null);
  const [downloadErrorMessage, setDownloadErrorMessage] = useState("");
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [activeSubscription, setActiveSubscription] = useState<SubscriptionPlanKey | null>(null);
  const [monthlyTokens, setMonthlyTokens] = useState(0);
  const [usedTokens, setUsedTokens] = useState(0);
  const [billingStatus, setBillingStatus] = useState<string>("none");
  const [freeTrialImageUsed, setFreeTrialImageUsed] = useState(false);
  const [isCheckoutLoading, setIsCheckoutLoading] = useState(false);
  const [loadingPlan, setLoadingPlan] = useState<SubscriptionPlanKey | null>(null);
  const [checkoutMessage, setCheckoutMessage] = useState("Weiterleitung zu Stripe...");
  const [profileName, setProfileName] = useState(userName ?? "");
  const [breweryName, setBreweryName] = useState(userName ?? "");
  const [profilePhone, setProfilePhone] = useState("");
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [weeklySummary, setWeeklySummary] = useState(true);
  const [savingProfile, setSavingProfile] = useState(false);
  const [profileSaveMessage, setProfileSaveMessage] = useState("");
  const displayName = breweryName || profileName || "deine Brauerei";
  const tabTitle = selectedTab;

  const onboardingStorageKey =
    typeof window !== "undefined"
      ? `evglab-dashboard-onboarding-v1:${userEmail ?? "default"}`
      : "evglab-dashboard-onboarding-v1:default";
  const mediaLibraryStorageKey =
    typeof window !== "undefined"
      ? `evglab-media-library-v2:${userEmail ?? "default"}`
      : "evglab-media-library-v2:default";
  const profileSettingsStorageKey =
    typeof window !== "undefined"
      ? `evglab-profile-settings-v1:${userEmail ?? "default"}`
      : "evglab-profile-settings-v1:default";

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const raw = window.localStorage.getItem(mediaLibraryStorageKey);
      if (!raw) return;
      const parsed = JSON.parse(raw) as MediaLibraryItem[];
      if (Array.isArray(parsed)) {
        setMediaItems(parsed.slice(0, 100));
      }
    } catch {
      // ignore parse/localStorage errors
    }
  }, [mediaLibraryStorageKey]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const raw = window.localStorage.getItem(profileSettingsStorageKey);
      if (!raw) return;
      const parsed = JSON.parse(raw) as {
        profileName?: string;
        breweryName?: string;
        profilePhone?: string;
        emailNotifications?: boolean;
        weeklySummary?: boolean;
      };
      if (typeof parsed.profileName === "string") setProfileName(parsed.profileName);
      if (typeof parsed.breweryName === "string") setBreweryName(parsed.breweryName);
      if (typeof parsed.profilePhone === "string") setProfilePhone(parsed.profilePhone);
      if (typeof parsed.emailNotifications === "boolean") setEmailNotifications(parsed.emailNotifications);
      if (typeof parsed.weeklySummary === "boolean") setWeeklySummary(parsed.weeklySummary);
    } catch {
      // ignore parse/localStorage errors
    }
  }, [profileSettingsStorageKey]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const hasSeenOnboarding = window.localStorage.getItem(onboardingStorageKey);
      if (!hasSeenOnboarding) {
        setShowOnboarding(true);
      }
    } catch {
      setShowOnboarding(true);
    }
  }, [onboardingStorageKey]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const onRestart = () => setShowOnboarding(true);
    window.addEventListener("evglab-restart-onboarding", onRestart as EventListener);
    return () => {
      window.removeEventListener("evglab-restart-onboarding", onRestart as EventListener);
    };
  }, []);

  useEffect(() => {
    let ignore = false;
    const refreshBillingState = async () => {
      try {
        const res = await fetch("/api/billing/state");
        if (!res.ok) return null;
        const data = (await res.json()) as {
          state?: {
            plan: SubscriptionPlanKey | null;
            monthlyTokens: number;
            usedTokens: number;
            remainingTokens?: number;
            status?: string;
            freeTrialImageUsed?: boolean;
          };
        };
        if (!ignore && data.state) {
          setActiveSubscription(data.state.plan);
          setMonthlyTokens(data.state.monthlyTokens);
          setUsedTokens(data.state.usedTokens);
          setBillingStatus(data.state.status ?? "none");
          setFreeTrialImageUsed(Boolean(data.state.freeTrialImageUsed));
          if (typeof window !== "undefined") {
            window.dispatchEvent(new CustomEvent("evglab-billing-updated"));
          }
        }
        return data.state ?? null;
      } catch {
        // ignore network errors
        return null;
      }
    };

    const waitForActiveBilling = async () => {
      for (let i = 0; i < 8; i += 1) {
        const state = await refreshBillingState();
        if (state?.plan && state.status !== "none" && state.status !== "canceled") {
          return;
        }
        if (i === 3 || i === 6) {
          try {
            await fetch("/api/billing/sync", { method: "POST", cache: "no-store" });
          } catch {
            // ignore network errors
          }
        }
        await new Promise((resolve) => setTimeout(resolve, 1200));
      }
    };

    void (async () => {
      if (typeof window !== "undefined") {
        const params = new URLSearchParams(window.location.search);
        const billing = params.get("billing");
        const sessionId = params.get("session_id");
        if (billing === "success" && sessionId) {
          try {
            await fetch("/api/billing/confirm-session", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ sessionId }),
            });
          } catch {
            // no-op, fallback is webhook
          }
          await waitForActiveBilling();
          const cleaned = new URL(window.location.href);
          cleaned.searchParams.delete("billing");
          cleaned.searchParams.delete("session_id");
          window.history.replaceState({}, "", cleaned.toString());
        }
        if (billing === "success_tokens" || billing === "cancel_tokens") {
          const cleaned = new URL(window.location.href);
          cleaned.searchParams.delete("billing");
          window.history.replaceState({}, "", cleaned.toString());
        }
      }
      const state = await refreshBillingState();
      if (!state?.plan || state.status === "none" || state.status === "canceled") {
        try {
          await fetch("/api/billing/sync", { method: "POST", cache: "no-store" });
        } catch {
          // ignore network errors
        }
        await refreshBillingState();
      }
    })();
    return () => {
      ignore = true;
    };
  }, []);

  const closeOnboarding = () => {
    setShowOnboarding(false);
    if (typeof window === "undefined") return;
    try {
      window.localStorage.setItem(onboardingStorageKey, "seen");
    } catch {
      // ignore localStorage errors
    }
  };

  const downloadMediaItem = async (item: MediaLibraryItem) => {
    setDownloadingMediaId(item.id);
    setDownloadErrorMessage("");
    try {
      const response = await fetch(
        `/api/kie/download?url=${encodeURIComponent(item.imageUrl)}&format=${item.outputFormat}&taskId=${encodeURIComponent(item.id)}`,
      );
      if (!response.ok) {
        let message = "Download fehlgeschlagen.";
        try {
          const payload = (await response.json()) as { error?: string };
          if (payload?.error) message = payload.error;
        } catch {
          // ignore parse errors and keep fallback message
        }
        setDownloadErrorMessage(message);
        return;
      }
      const blob = await response.blob();
      const objectUrl = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = objectUrl;
      a.download = `evglab-${item.id}.${item.outputFormat}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(objectUrl);
    } finally {
      setDownloadingMediaId(null);
    }
  };

  const tabDescriptions: Record<DashboardTab, string> = {
    Dashboard: "Hier siehst du alle wichtigen Zahlen fuer dein Content- und Abo-Management.",
    "Inhalte erstellen": "Plane und erstelle neue Inhalte fuer Social Media, Events und Kampagnen.",
    Mediathek: "Verwalte deine Bilder, Vorlagen und exportierten Assets zentral an einem Ort.",
    "Abo & Tokens": "Behalte deinen Tarif, Verbrauch und kommende Aufladungen im Blick.",
    Team: "Lade Kolleginnen und Kollegen ein und verwalte Rollen im Team.",
    Einstellungen: "Passe Konto, Branding und Standard-Einstellungen fuer Inhalte an.",
    "Hilfe & Support": "Finde Antworten und kontaktiere bei Bedarf direkt den Support.",
  };
  const remainingTokens = Math.max(monthlyTokens - usedTokens, 0);
  const hasActiveBilling = Boolean(activeSubscription) && billingStatus !== "none" && billingStatus !== "canceled";
  const hasFreeTrialAvailable = !freeTrialImageUsed;
  const activePlanLabel = activeSubscription ? PLAN_LABELS[activeSubscription] : "Kein aktives Abo";

  const handleSelectPlan = async (plan: SubscriptionPlanKey) => {
    try {
      setLoadingPlan(plan);
      setCheckoutMessage("Sandbox wird geoeffnet...");
      setIsCheckoutLoading(true);
      const res = await fetch("/api/billing/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan }),
      });
      if (res.status === 401) {
        window.location.href = "/?auth=signin";
        return;
      }
      if (!res.ok) {
        setIsCheckoutLoading(false);
        setLoadingPlan(null);
        return;
      }
      const data = (await res.json()) as { url?: string };
      if (data.url) {
        window.location.href = data.url;
        return;
      }
      setIsCheckoutLoading(false);
      setLoadingPlan(null);
    } catch {
      // ignore network errors
      setIsCheckoutLoading(false);
      setLoadingPlan(null);
    }
  };

  const handleOpenBillingPortal = async () => {
    try {
      setCheckoutMessage("Abo-Verwaltung wird geoeffnet...");
      setIsCheckoutLoading(true);
      const res = await fetch("/api/billing/portal", { method: "POST" });
      if (!res.ok) {
        setIsCheckoutLoading(false);
        return;
      }
      const data = (await res.json()) as { url?: string };
      if (data.url) {
        window.location.href = data.url;
        return;
      }
      setIsCheckoutLoading(false);
    } catch {
      // ignore network errors
      setIsCheckoutLoading(false);
    }
  };

  const handleBuyTokenPack = async (pack: "tokens_500" | "tokens_2000") => {
    try {
      setCheckoutMessage("Token-Kauf wird vorbereitet...");
      setIsCheckoutLoading(true);
      const res = await fetch("/api/billing/buy-tokens", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pack }),
      });
      if (!res.ok) {
        setIsCheckoutLoading(false);
        return;
      }
      const data = (await res.json()) as { url?: string };
      if (data.url) {
        window.location.href = data.url;
        return;
      }
      setIsCheckoutLoading(false);
    } catch {
      // ignore network errors
      setIsCheckoutLoading(false);
    }
  };

  const consumeTokens = (amount: number) => {
    if (!amount || amount < 0) return;
    setUsedTokens((prev) => Math.min(prev + amount, monthlyTokens));
  };

  const toggleTheme = () => applyTheme(!isDark);

  const saveProfileSettings = async () => {
    setSavingProfile(true);
    setProfileSaveMessage("");
    try {
      if (typeof window !== "undefined") {
        const payload = {
          profileName,
          breweryName,
          profilePhone,
          emailNotifications,
          weeklySummary,
        };
        window.localStorage.setItem(profileSettingsStorageKey, JSON.stringify(payload));
      }

      if (isSupabaseConfigured()) {
        const supabase = createSupabaseClient();
        await supabase.auth.updateUser({
          data: {
            full_name: profileName || null,
            brewery: breweryName || null,
            phone: profilePhone || null,
          },
        });
      }
      setProfileSaveMessage("Einstellungen gespeichert.");
    } catch {
      setProfileSaveMessage("Speichern fehlgeschlagen. Bitte erneut versuchen.");
    } finally {
      setSavingProfile(false);
    }
  };

  const renderTabPanel = () => {
    if (selectedTab === "Dashboard") {
      return (
        <>
          <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md dark:border-gray-800 dark:bg-gray-900">
              <div className="mb-4 flex items-center justify-between">
                <div className="rounded-lg bg-orange-50 p-2 dark:bg-orange-900/20">
                  <Sparkles className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                </div>
                <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400">+180</span>
              </div>
              <h3 className="mb-1 font-medium text-gray-600 dark:text-gray-400">Verfuegbare Tokens</h3>
              <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{remainingTokens.toLocaleString("de-DE")}</p>
              <p className="mt-1 text-sm text-emerald-600 dark:text-emerald-400">
                {hasActiveBilling ? `${usedTokens.toLocaleString("de-DE")} verbraucht` : "kein Abo aktiv"}
              </p>
            </div>

            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md dark:border-gray-800 dark:bg-gray-900">
              <div className="mb-4 flex items-center justify-between">
                <div className="rounded-lg bg-green-50 p-2 dark:bg-green-900/20">
                  <FileText className="h-5 w-5 text-green-600 dark:text-green-400" />
                </div>
                <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400">+12%</span>
              </div>
              <h3 className="mb-1 font-medium text-gray-600 dark:text-gray-400">Posts im April</h3>
              <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">18</p>
              <p className="mt-1 text-sm text-emerald-600 dark:text-emerald-400">4 davon als Bildserie</p>
            </div>

            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md dark:border-gray-800 dark:bg-gray-900">
              <div className="mb-4 flex items-center justify-between">
                <div className="rounded-lg bg-purple-50 p-2 dark:bg-purple-900/20">
                  <Beer className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                </div>
                <span className="text-xs font-medium text-violet-600 dark:text-violet-400">Saisonaktion</span>
              </div>
              <h3 className="mb-1 font-medium text-gray-600 dark:text-gray-400">Kampagnen aktiv</h3>
              <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">3</p>
              <p className="mt-1 text-sm text-violet-600 dark:text-violet-400">Fruehling, Tour, Neuheiten</p>
            </div>

            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md dark:border-gray-800 dark:bg-gray-900">
              <div className="mb-4 flex items-center justify-between">
                <div className="rounded-lg bg-orange-50 p-2 dark:bg-orange-900/20">
                  <Users className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                </div>
                <span className="text-xs font-medium text-orange-600 dark:text-orange-400">+1</span>
              </div>
              <h3 className="mb-1 font-medium text-gray-600 dark:text-gray-400">Teammitglieder</h3>
              <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">4</p>
              <p className="mt-1 text-sm text-orange-600 dark:text-orange-400">1 Einladung offen</p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
                <div className="mb-6 flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Letzte Aktivitaeten</h3>
                  <button className="text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300">
                    Alle anzeigen
                  </button>
                </div>
                <div className="space-y-4">
                  {activityItems.map((activity, i) => (
                    <div key={i} className="flex cursor-pointer items-center space-x-4 rounded-lg p-3 transition-colors hover:bg-gray-50 dark:hover:bg-gray-800">
                      <div
                        className={`rounded-lg p-2 ${
                          activity.color === "green"
                            ? "bg-green-50 dark:bg-green-900/20"
                            : activity.color === "blue"
                              ? "bg-blue-50 dark:bg-blue-900/20"
                              : activity.color === "purple"
                                ? "bg-purple-50 dark:bg-purple-900/20"
                                : "bg-orange-50 dark:bg-orange-900/20"
                        }`}
                      >
                        <activity.icon
                          className={`h-4 w-4 ${
                            activity.color === "green"
                              ? "text-green-600 dark:text-green-400"
                              : activity.color === "blue"
                                ? "text-blue-600 dark:text-blue-400"
                                : activity.color === "purple"
                                  ? "text-purple-600 dark:text-purple-400"
                                  : "text-orange-600 dark:text-orange-400"
                          }`}
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium text-gray-900 dark:text-gray-100">{activity.title}</p>
                        <p className="truncate text-xs text-gray-500 dark:text-gray-400">{activity.desc}</p>
                      </div>
                      <div className="text-xs text-gray-400 dark:text-gray-500">{activity.time}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
                <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-gray-100">Schnellaktionen</h3>
                <div className="space-y-4">
                  <button className="flex w-full items-center justify-between rounded-lg border border-gray-200 px-3 py-2 text-left text-sm transition-colors hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800">
                    <span>Neuen Social-Post erstellen</span>
                    <Wand2 className="h-4 w-4 text-gray-500" />
                  </button>
                  <button className="flex w-full items-center justify-between rounded-lg border border-gray-200 px-3 py-2 text-left text-sm transition-colors hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800">
                    <span>Bild fuer Event generieren</span>
                    <Image className="h-4 w-4 text-gray-500" />
                  </button>
                  <button className="flex w-full items-center justify-between rounded-lg border border-gray-200 px-3 py-2 text-left text-sm transition-colors hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800">
                    <span>Teammitglied einladen</span>
                    <Users className="h-4 w-4 text-gray-500" />
                  </button>
                </div>
              </div>

              <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
                <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-gray-100">Aktiver Tarif</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Du nutzt aktuell den Plan</p>
                <p className="mt-1 text-xl font-semibold text-gray-900 dark:text-gray-100">{activePlanLabel}</p>
                <p className="mt-2 text-sm text-emerald-600 dark:text-emerald-400">
                  {hasActiveBilling ? `${monthlyTokens.toLocaleString("de-DE")} Tokens / Monat` : "Bitte waehle einen Plan"}
                </p>
              </div>
            </div>
          </div>

        </>
      );
    }

    if (selectedTab === "Abo & Tokens") {
      return (
        <div className="space-y-6">
          <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Abo & Tokens</h2>
              <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300">
                {hasActiveBilling ? `${activeSubscription?.toUpperCase()} aktiv` : "Kein Abo aktiv"}
              </span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Verwalte deinen Tarif, sehe den aktuellen Verbrauch und waehle bei Bedarf einen neuen Plan.
            </p>
            <div className="mt-3 rounded-lg border border-gray-200 bg-gray-50 p-3 text-xs text-gray-700 dark:border-gray-700 dark:bg-gray-950 dark:text-gray-300">
              <p>Monatliche Tokens: {monthlyTokens.toLocaleString("de-DE")}</p>
              <p>Verbraucht: {usedTokens.toLocaleString("de-DE")}</p>
              <p className="font-semibold">Verfuegbar: {remainingTokens.toLocaleString("de-DE")}</p>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => {
                  void handleOpenBillingPortal();
                }}
                disabled={!hasActiveBilling}
                className="inline-flex h-9 items-center rounded-md border border-gray-300 px-3 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800"
              >
                Abo verwalten / kuendigen
              </button>
              <button
                type="button"
                onClick={() => {
                  void handleBuyTokenPack("tokens_500");
                }}
                disabled={!hasActiveBilling}
                className="inline-flex h-9 items-center rounded-md bg-[#c65a20] px-3 text-sm font-medium text-white transition hover:bg-[#b14f1c] disabled:cursor-not-allowed disabled:opacity-50"
              >
                +500 Tokens kaufen
              </button>
              <button
                type="button"
                onClick={() => {
                  void handleBuyTokenPack("tokens_2000");
                }}
                disabled={!hasActiveBilling}
                className="inline-flex h-9 items-center rounded-md bg-[#7b4bf9] px-3 text-sm font-medium text-white transition hover:bg-[#6a3ee3] disabled:cursor-not-allowed disabled:opacity-50"
              >
                +2.000 Tokens kaufen
              </button>
            </div>
          </section>
          <BrewerySubscriptionPlans
            activePlan={activeSubscription}
            onSelectPlan={handleSelectPlan}
            loadingPlan={loadingPlan}
            isLoading={isCheckoutLoading}
          />
        </div>
      );
    }

    if (selectedTab === "Mediathek") {
      return (
        <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Mediathek</h2>
            <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
              {mediaItems.length} Bilder
            </span>
          </div>
          {mediaItems.length === 0 ? (
            <div className="rounded-lg border border-dashed border-gray-300 bg-gray-50 p-4 text-sm text-gray-500 dark:border-gray-700 dark:bg-gray-950 dark:text-gray-400">
              Noch keine generierten Bilder vorhanden.
            </div>
          ) : (
            <>
              {downloadErrorMessage ? (
                <p className="mb-3 rounded-lg border border-red-300 bg-red-50 px-3 py-2 text-xs text-red-700 dark:border-red-800 dark:bg-red-900/30 dark:text-red-300">
                  {downloadErrorMessage}
                </p>
              ) : null}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {mediaItems.map((item) => (
                <article
                  key={item.id}
                  className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-950"
                >
                  <img src={item.imageUrl} alt="Mediathek Bild" className="h-44 w-full object-cover" />
                  <div className="space-y-2 p-3">
                    <p
                      className={`text-xs text-gray-600 dark:text-gray-300 ${
                        expandedPromptId === item.id ? "" : "line-clamp-2"
                      }`}
                    >
                      {item.prompt}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {item.aspectRatio} | {item.resolution} | {item.outputFormat.toUpperCase()}
                    </p>
                    <p className="text-[11px] text-gray-400 dark:text-gray-500">
                      {new Date(item.createdAt).toLocaleString("de-DE")}
                    </p>
                    <div className="flex flex-wrap items-center gap-2 pt-1">
                      <button
                        type="button"
                        onClick={() => {
                          setExpandedPromptId((prev) => (prev === item.id ? null : item.id));
                        }}
                        className="inline-flex h-8 items-center rounded-md border border-gray-300 px-2.5 text-xs font-medium text-gray-700 transition hover:bg-gray-50 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800"
                      >
                        {expandedPromptId === item.id ? "Prompt ausblenden" : "Prompt anzeigen"}
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          void downloadMediaItem(item);
                        }}
                        disabled={downloadingMediaId === item.id}
                        className="inline-flex h-8 items-center rounded-md bg-[#c65a20] px-2.5 text-xs font-medium text-white transition hover:bg-[#b14f1c] disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        {downloadingMediaId === item.id ? "Download..." : "Herunterladen"}
                      </button>
                    </div>
                  </div>
                </article>
                ))}
              </div>
            </>
          )}
        </section>
      );
    }

    if (selectedTab === "Einstellungen") {
      return (
        <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Profil-Einstellungen</h2>
            <button
              type="button"
              onClick={toggleTheme}
              className="inline-flex h-9 items-center gap-2 rounded-md border border-gray-300 px-3 text-sm font-medium text-gray-700 transition hover:bg-gray-50 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800"
            >
              {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              {isDark ? "Tagmodus aktivieren" : "Nachtmodus aktivieren"}
            </button>
          </div>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <label className="space-y-1 text-sm">
              <span className="text-gray-700 dark:text-gray-300">Anzeigename</span>
              <input
                value={profileName}
                onChange={(e) => setProfileName(e.target.value)}
                className="h-10 w-full rounded-md border border-gray-300 bg-white px-3 text-gray-900 focus:border-[#c65a20] focus:outline-none dark:border-gray-700 dark:bg-gray-950 dark:text-gray-100"
                placeholder="z. B. Max Mustermann"
              />
            </label>
            <label className="space-y-1 text-sm">
              <span className="text-gray-700 dark:text-gray-300">Brauerei</span>
              <input
                value={breweryName}
                onChange={(e) => setBreweryName(e.target.value)}
                className="h-10 w-full rounded-md border border-gray-300 bg-white px-3 text-gray-900 focus:border-[#c65a20] focus:outline-none dark:border-gray-700 dark:bg-gray-950 dark:text-gray-100"
                placeholder="z. B. Brauerei Adler"
              />
            </label>
            <label className="space-y-1 text-sm">
              <span className="text-gray-700 dark:text-gray-300">E-Mail</span>
              <input
                value={userEmail ?? ""}
                readOnly
                className="h-10 w-full rounded-md border border-gray-200 bg-gray-50 px-3 text-gray-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300"
              />
            </label>
            <label className="space-y-1 text-sm">
              <span className="text-gray-700 dark:text-gray-300">Telefon (optional)</span>
              <input
                value={profilePhone}
                onChange={(e) => setProfilePhone(e.target.value)}
                className="h-10 w-full rounded-md border border-gray-300 bg-white px-3 text-gray-900 focus:border-[#c65a20] focus:outline-none dark:border-gray-700 dark:bg-gray-950 dark:text-gray-100"
                placeholder="+49 ..."
              />
            </label>
          </div>
          <div className="mt-6 space-y-3 rounded-xl border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-950">
            <label className="flex items-center justify-between gap-3 text-sm">
              <span className="text-gray-700 dark:text-gray-300">E-Mail-Benachrichtigungen</span>
              <input
                type="checkbox"
                checked={emailNotifications}
                onChange={(e) => setEmailNotifications(e.target.checked)}
                className="h-4 w-4 accent-[#c65a20]"
              />
            </label>
            <label className="flex items-center justify-between gap-3 text-sm">
              <span className="text-gray-700 dark:text-gray-300">Wöchentliche Zusammenfassung</span>
              <input
                type="checkbox"
                checked={weeklySummary}
                onChange={(e) => setWeeklySummary(e.target.checked)}
                className="h-4 w-4 accent-[#c65a20]"
              />
            </label>
          </div>
          <div className="mt-5 flex items-center gap-3">
            <button
              type="button"
              onClick={() => {
                void saveProfileSettings();
              }}
              disabled={savingProfile}
              className="inline-flex h-10 items-center rounded-md bg-[#c65a20] px-4 text-sm font-medium text-white transition hover:bg-[#b14f1c] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {savingProfile ? "Speichert..." : "Einstellungen speichern"}
            </button>
            {profileSaveMessage ? (
              <span className="text-sm text-gray-600 dark:text-gray-300">{profileSaveMessage}</span>
            ) : null}
          </div>
        </section>
      );
    }

    return (
      <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">{selectedTab}</h2>
          <span className="rounded-full bg-orange-50 px-3 py-1 text-xs font-medium text-[#c65a20] dark:bg-orange-900/30 dark:text-orange-300">
            Neuer Bereich
          </span>
        </div>
        <p className="mb-6 max-w-3xl text-sm text-gray-600 dark:text-gray-400">{tabDescriptions[selectedTab]}</p>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="rounded-xl border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-950/60">
            <p className="text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400">Prioritaet</p>
            <p className="mt-2 text-sm font-semibold text-gray-900 dark:text-gray-100">Heute weiterarbeiten</p>
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">3 Aufgaben warten auf dich</p>
          </div>
          <div className="rounded-xl border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-950/60">
            <p className="text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400">Status</p>
            <p className="mt-2 text-sm font-semibold text-gray-900 dark:text-gray-100">Alles synchron</p>
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">Letztes Update vor 2 Minuten</p>
          </div>
          <div className="rounded-xl border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-950/60">
            <p className="text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400">Naechster Schritt</p>
            <p className="mt-2 text-sm font-semibold text-gray-900 dark:text-gray-100">Bereich konfigurieren</p>
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">Design bleibt konsistent zum Dashboard</p>
          </div>
        </div>
      </section>
    );
  };

  return (
    <div className="flex-1 overflow-auto bg-gray-50 p-4 dark:bg-gray-950 sm:p-6">
      {isCheckoutLoading ? (
        <div className="fixed inset-0 z-[120] flex items-center justify-center bg-black/55 px-4">
          <div className="w-full max-w-sm rounded-2xl border border-white/20 bg-gray-950/95 p-6 text-white shadow-2xl">
            <div className="mb-4 flex items-center gap-3">
              <div className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
              <p className="text-sm font-semibold">{checkoutMessage}</p>
            </div>
            <p className="text-xs text-gray-200">Bitte kurz warten. Stripe wird in einem Moment geoeffnet.</p>
          </div>
        </div>
      ) : null}
      <OnboardingDialog open={showOnboarding} onClose={closeOnboarding} />
      <MobileTabBar selected={selectedTab} setSelected={setSelectedTab} />
      <div className="mb-6 flex flex-col gap-4 sm:mb-8 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 sm:text-3xl">{tabTitle}</h1>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400 sm:text-base">{tabDescriptions[selectedTab]}</p>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Angemeldet als {displayName}</p>
          {userEmail ? <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{userEmail}</p> : null}
        </div>
        <div className="flex items-center gap-2 self-start sm:gap-4">
          <button className="relative rounded-lg border border-gray-200 bg-white p-2 text-gray-600 transition-colors hover:text-gray-900 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-400 dark:hover:text-gray-100">
            <Bell className="h-5 w-5" />
            <span className="absolute -right-1 -top-1 h-3 w-3 rounded-full bg-red-500" />
          </button>
          <button
            type="button"
            onClick={toggleTheme}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-600 transition-colors hover:bg-gray-50 hover:text-gray-900 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-100"
          >
            {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
          <button
            onClick={() => setSelectedTab("Einstellungen")}
            className="rounded-lg border border-gray-200 bg-white p-2 text-gray-600 transition-colors hover:text-gray-900 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
            title="Profil-Einstellungen"
          >
            <User className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div className={selectedTab === "Inhalte erstellen" ? "block" : "hidden"} aria-hidden={selectedTab !== "Inhalte erstellen"}>
        <div className="space-y-6">
          <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
            <div className="mb-4 flex items-center justify-between gap-3">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Produkt-Workflow</h2>
              <span className="rounded-full bg-orange-50 px-3 py-1 text-xs font-medium text-[#c65a20] dark:bg-orange-900/30 dark:text-orange-300">
                Prompt → Bild → Veröffentlichung
              </span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Nutze einen der typischen Brauerei-Use-Cases und arbeite ihn in 3 klaren Schritten durch.
            </p>
            <div className="mt-4 grid gap-3 md:grid-cols-3">
              {USE_CASE_FLOWS.map((flow) => (
                <article key={flow.title} className="rounded-xl border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-950/70">
                  <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">{flow.title}</p>
                  <ul className="mt-2 space-y-1.5 text-xs text-gray-600 dark:text-gray-400">
                    {flow.steps.map((step) => (
                      <li key={step}>• {step}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </section>
          <ImagePromptWorkflow
            hasActiveSubscription={hasActiveBilling}
            hasFreeTrialAvailable={hasFreeTrialAvailable}
            remainingTokens={remainingTokens}
            onConsumeTokens={consumeTokens}
            onFreeTrialConsumed={() => setFreeTrialImageUsed(true)}
            onRequireSubscription={() => setSelectedTab("Abo & Tokens")}
            onImageGenerated={(item) => {
              setMediaItems((prev) => {
                const next = [item, ...prev.filter((entry) => entry.id !== item.id)].slice(0, 100);
                if (typeof window !== "undefined") {
                  window.localStorage.setItem(mediaLibraryStorageKey, JSON.stringify(next));
                }
                return next;
              });
            }}
          />
        </div>
      </div>
      {selectedTab !== "Inhalte erstellen" ? renderTabPanel() : null}
    </div>
  );
};

export default Example;
