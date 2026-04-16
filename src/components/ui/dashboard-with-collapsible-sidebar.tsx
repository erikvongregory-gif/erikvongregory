"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  Beer,
  Bell,
  Check,
  ChevronDown,
  ChevronsRight,
  Crown,
  CreditCard,
  FileText,
  Gem,
  HelpCircle,
  Home,
  Image,
  LogOut,
  Menu,
  RotateCcw,
  Settings,
  Sparkles,
  Users,
  User,
  Wand2,
  type LucideIcon,
} from "lucide-react";
import { AdminDashboard } from "@/components/admin/AdminDashboard";
import {
  BrewerySubscriptionPlans,
  type SubscriptionPlanKey,
} from "@/components/dashboard/BrewerySubscriptionPlans";
import { OnboardingDialog, type OnboardingStep } from "@/components/ui/onboarding-dialog";
import { PromptInputBox } from "@/components/ui/ai-prompt-box";
import { cn } from "@/lib/utils";

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
  | "Prompt-Erstellung"
  | "Inhalte erstellen"
  | "Mediathek"
  | "Abo & Tokens"
  | "Team"
  | "Admin Center"
  | "Einstellungen"
  | "Hilfe & Support";

type ToggleCloseProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

type ExampleContentProps = {
  userEmail?: string;
  userName?: string;
  selectedTab: DashboardTab;
  setSelectedTab: React.Dispatch<React.SetStateAction<DashboardTab>>;
  isAdmin?: boolean;
};

type ActivityItem = {
  id: string;
  type: "media" | "team" | "billing";
  title: string;
  desc: string;
  time: string; // ISO
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
  model?: string;
  referenceImageUrl?: string;
};

type HybridAnswer = {
  question: string;
  answer: string;
};

const PLAN_LABELS: Record<SubscriptionPlanKey, string> = {
  start: "Brauerei Start",
  growth: "Brauerei Wachstum",
  pro: "Brauerei Pro",
};

const BILLING_CHECKOUT_ENABLED = false;

function getActivityIcon(type: ActivityItem["type"]): LucideIcon {
  if (type === "media") return Image;
  if (type === "team") return Users;
  return CreditCard;
}

function formatRelativeTime(isoDate: string): string {
  const diffMs = Date.now() - new Date(isoDate).getTime();
  if (!Number.isFinite(diffMs) || diffMs < 0) return "gerade eben";
  const mins = Math.floor(diffMs / 60_000);
  if (mins < 1) return "gerade eben";
  if (mins < 60) return `vor ${mins} Min.`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `vor ${hours} Std.`;
  const days = Math.floor(hours / 24);
  if (days === 1) return "gestern";
  return `vor ${days} Tagen`;
}

type TeamMember = {
  id: string;
  email: string;
  name: string;
  role: "owner" | "admin" | "editor" | "viewer";
  status: "active" | "invited";
  invitedAt: string;
};

type DashboardSummary = {
  tokens: { monthly: number; used: number; remaining: number };
  postsThisMonth: number;
  activeCampaigns: number;
  teamMembers: number;
  openInvites: number;
  billingStatus: string;
  plan: SubscriptionPlanKey | null;
  degradedBilling?: boolean;
};

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

const DASHBOARD_ONBOARDING_STEPS: OnboardingStep[] = [
  {
    id: "dashboard-overview",
    tab: "Dashboard",
    targetSelector: '[data-onboarding="dashboard-overview"]',
    title: "Dein Dashboard auf einen Blick",
    description: "Hier siehst du direkt Tokens, Posts, Kampagnen und Team-Status in deinem neuen Design.",
  },
  {
    id: "nav-expand",
    tab: "Dashboard",
    targetSelector: '[data-onboarding-nav-toggle="main"]',
    title: "Navigation aufklappen",
    description: "Mit dem Pfeil links neben Pakete blendest du alle Menüpunkte oben ein.",
  },
  {
    id: "prompt",
    tab: "Prompt-Erstellung",
    targetSelector: '[data-onboarding-nav="prompt"]',
    title: "Prompt-Erstellung",
    description: "Hier formulierst du deine Bildidee strukturiert, bevor du generierst.",
  },
  {
    id: "content",
    tab: "Inhalte erstellen",
    targetSelector: '[data-onboarding-nav="content"]',
    title: "Inhalte erstellen",
    description: "Hier startest du neue Bildideen und erzeugst Motive für Kampagnen und Social.",
  },
  {
    id: "library",
    tab: "Mediathek",
    targetSelector: '[data-onboarding-nav="library"]',
    title: "Mediathek",
    description: "Alle generierten Bilder landen hier und sind direkt downloadbar.",
  },
  {
    id: "team",
    tab: "Team",
    targetSelector: '[data-onboarding-nav="team"]',
    title: "Team",
    description: "Lade Teammitglieder ein, weise Rollen zu und verwalte Zugriffe zentral.",
  },
  {
    id: "settings",
    tab: "Einstellungen",
    targetSelector: '[data-onboarding-nav="settings"]',
    title: "Einstellungen",
    description: "Passe Profil, Kontodaten und Benachrichtigungen an.",
  },
  {
    id: "support",
    tab: "Hilfe & Support",
    targetSelector: '[data-onboarding-nav="support"]',
    title: "Hilfe & Support",
    description: "Hier findest du Hilfe und kannst direkt den Support kontaktieren.",
  },
  {
    id: "billing",
    tab: "Abo & Tokens",
    targetSelector: '[data-onboarding-nav="billing"]',
    title: "Pakete & Credits",
    description: "Über Pakete verwaltest du Abo, Token-Verbrauch und Zukäufe.",
  },
];

const CONTENT_CREATION_TOUR_STEPS: OnboardingStep[] = [
  {
    id: "content-tour-workflow",
    tab: "Inhalte erstellen",
    targetSelector: '[data-onboarding="content-workflow"]',
    title: "Kreativbereich",
    description: "Hier startest du deinen Content-Flow und definierst die Bildidee.",
  },
  {
    id: "content-tour-brief",
    tab: "Inhalte erstellen",
    targetSelector: '[data-onboarding="content-brief"]',
    title: "Prompt eingeben",
    description: "Beschreibe Szene, Stil und Ziel. Je klarer der Prompt, desto besser das Ergebnis.",
  },
  {
    id: "content-tour-generate",
    tab: "Inhalte erstellen",
    targetSelector: '[data-onboarding="content-brief"]',
    title: "Generierung starten",
    description: "Wähle Varianten, Format und Auflösung und starte die Bildgenerierung.",
  },
  {
    id: "content-tour-preflight",
    tab: "Inhalte erstellen",
    targetSelector: '[data-onboarding="content-preflight"]',
    title: "Einstellungen prüfen",
    description: "Kontrolliere die Optionen vor dem finalen Render, damit die Ausgabe passt.",
  },
  {
    id: "content-tour-result",
    tab: "Inhalte erstellen",
    targetSelector: '[data-onboarding="content-result"]',
    title: "Ergebnis & Download",
    description: "Deine fertigen Bilder erscheinen hier und lassen sich direkt herunterladen.",
  },
];

type ExampleProps = {
  userEmail?: string;
  userName?: string;
  isAdmin?: boolean;
};

export const Example = ({ userEmail, userName, isAdmin = false }: ExampleProps) => {
  const [selectedTab, setSelectedTab] = useState<DashboardTab>("Dashboard");
  const isDark = true;

  useEffect(() => {
    if (typeof window === "undefined") return;
    const root = document.documentElement;
    root.classList.add("dark");
    root.style.colorScheme = "dark";
    window.localStorage.setItem("evglab-dashboard-theme", "dark");
  }, []);

  return (
    <div className={`flex min-h-screen w-full ${isDark ? "dark" : ""}`}>
      <div className="relative flex w-full flex-col overflow-hidden bg-gray-50 text-gray-100 dark:bg-gray-950">
        <div className="relative z-10">
          <ExampleContent
            userEmail={userEmail}
            userName={userName}
            selectedTab={selectedTab}
            setSelectedTab={setSelectedTab}
            isAdmin={isAdmin}
          />
        </div>
      </div>
    </div>
  );
};

const Sidebar = ({
  selected,
  setSelected,
  userEmail,
  isAdmin = false,
}: {
  selected: DashboardTab;
  setSelected: React.Dispatch<React.SetStateAction<DashboardTab>>;
  userEmail?: string;
  isAdmin?: boolean;
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
        <Option Icon={Sparkles} title="Prompt-Erstellung" selected={selected} setSelected={setSelected} open={open} />
        <Option Icon={Wand2} title="Inhalte erstellen" selected={selected} setSelected={setSelected} open={open} />
        <Option Icon={Image} title="Mediathek" selected={selected} setSelected={setSelected} open={open} />
        <Option Icon={Users} title="Team" selected={selected} setSelected={setSelected} open={open} notifs={1} />
        {isAdmin ? <Option Icon={Settings} title="Admin Center" selected={selected} setSelected={setSelected} open={open} /> : null}
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
  isAdmin = false,
  onRestartOnboarding,
}: {
  selected: DashboardTab;
  setSelected: React.Dispatch<React.SetStateAction<DashboardTab>>;
  isAdmin?: boolean;
  onRestartOnboarding?: () => void;
}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const tabs: Array<{ title: DashboardTab; Icon: LucideIcon }> = [
    { title: "Dashboard", Icon: Home },
    { title: "Prompt-Erstellung", Icon: Sparkles },
    { title: "Inhalte erstellen", Icon: Wand2 },
    { title: "Mediathek", Icon: Image },
    { title: "Team", Icon: Users },
    { title: "Einstellungen", Icon: Settings },
    { title: "Hilfe & Support", Icon: HelpCircle },
  ];
  if (isAdmin) {
    tabs.splice(5, 0, { title: "Admin Center", Icon: Settings });
  }

  return (
    <div className="-mx-4 mb-4 bg-transparent px-4 py-3 sm:-mx-6 sm:px-6 lg:hidden">
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={() => {
            if (typeof window === "undefined") return;
            window.location.assign("/");
          }}
          className="inline-flex h-10 items-center gap-2 rounded-md border border-gray-200 bg-white px-3 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200 dark:hover:bg-gray-800"
          aria-label="Zur Startseite"
        >
          <Home className="h-4 w-4" />
          Startseite
        </button>
        <button
          type="button"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label={menuOpen ? "Menü schließen" : "Menü öffnen"}
          className="inline-flex h-10 w-10 items-center justify-center rounded-md bg-transparent text-gray-800 transition-colors hover:bg-black/5 dark:text-gray-100 dark:hover:bg-white/10"
        >
          <Menu className="h-5 w-5" />
        </button>
      </div>

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
          <button
            type="button"
            onClick={() => {
              onRestartOnboarding?.();
              setMenuOpen(false);
            }}
            className="mt-1 flex w-full items-center justify-between rounded-md px-3 py-2 text-left text-sm text-gray-700 transition hover:bg-gray-50 dark:text-gray-200 dark:hover:bg-gray-800"
          >
            <span className="inline-flex items-center gap-2">
              <RotateCcw className="h-4 w-4" />
              Onboarding neu starten
            </span>
          </button>
        </div>
      )}
    </div>
  );
};

const Option = ({ Icon, title, selected, setSelected, open, notifs }: OptionProps) => {
  const isSelected = selected === title;
  const onboardingKey: Record<DashboardTab, string> = {
    Dashboard: "dashboard",
    "Prompt-Erstellung": "prompt",
    "Inhalte erstellen": "content",
    Mediathek: "library",
    "Abo & Tokens": "billing",
    Team: "team",
    "Admin Center": "settings",
    Einstellungen: "settings",
    "Hilfe & Support": "support",
  };

  return (
    <button
      onClick={() => setSelected(title)}
      data-onboarding-nav={onboardingKey[title]}
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

      {open ? (
        <div
          className={`mt-2 origin-top overflow-hidden rounded-md border border-gray-200 bg-white p-1 shadow-sm transition-all duration-150 ease-[cubic-bezier(0.2,0.8,0.2,1)] dark:border-gray-700 dark:bg-gray-900 ${
            menuOpen
              ? "max-h-28 translate-y-0 scale-100 opacity-100"
              : "pointer-events-none max-h-0 -translate-y-1 scale-[0.98] opacity-0"
          }`}
          aria-hidden={!menuOpen}
        >
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

const ExampleContent = ({ userEmail, userName, selectedTab, setSelectedTab, isAdmin = false }: ExampleContentProps) => {
  const [mediaItems, setMediaItems] = useState<MediaLibraryItem[]>([]);
  const [expandedPromptId, setExpandedPromptId] = useState<string | null>(null);
  const [downloadingMediaId, setDownloadingMediaId] = useState<string | null>(null);
  const [downloadErrorMessage, setDownloadErrorMessage] = useState("");
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [showContentTour, setShowContentTour] = useState(false);
  const [showCreditsOffer, setShowCreditsOffer] = useState(false);
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
  const [dashboardSummary, setDashboardSummary] = useState<DashboardSummary | null>(null);
  const [activityItems, setActivityItems] = useState<ActivityItem[]>([]);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [teamInviteEmail, setTeamInviteEmail] = useState("");
  const [teamInviteName, setTeamInviteName] = useState("");
  const [teamInviteRole, setTeamInviteRole] = useState<"admin" | "editor" | "viewer">("editor");
  const [teamMessage, setTeamMessage] = useState("");
  const [teamSaving, setTeamSaving] = useState(false);
  const [supportSubject, setSupportSubject] = useState("");
  const [supportMessage, setSupportMessage] = useState("");
  const [supportInfoMessage, setSupportInfoMessage] = useState("");
  const [mediaSearch, setMediaSearch] = useState("");
  const [mediaShowFavoritesOnly, setMediaShowFavoritesOnly] = useState(false);
  const [mediaFavoriteIds, setMediaFavoriteIds] = useState<string[]>([]);
  const [selectedMediaItem, setSelectedMediaItem] = useState<MediaLibraryItem | null>(null);
  const [mediaCommentsById, setMediaCommentsById] = useState<Record<string, string[]>>({});
  const [mediaCommentInput, setMediaCommentInput] = useState("");
  const [mediaImageDimensions, setMediaImageDimensions] = useState<Record<string, string>>({});
  const [globalErrorMessage, setGlobalErrorMessage] = useState("");
  const [topNavMenuOpen, setTopNavMenuOpen] = useState(false);
  const [bellMenuOpen, setBellMenuOpen] = useState(false);
  const [bellReadIds, setBellReadIds] = useState<string[]>([]);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [hybridInitialInput, setHybridInitialInput] = useState("");
  const [hybridInputValue, setHybridInputValue] = useState("");
  const [hybridAnswers, setHybridAnswers] = useState<HybridAnswer[]>([]);
  const [hybridCurrentQuestion, setHybridCurrentQuestion] = useState<string | null>(null);
  const [hybridFinalPrompt, setHybridFinalPrompt] = useState("");
  const [hybridIsLoading, setHybridIsLoading] = useState(false);
  const [hybridError, setHybridError] = useState("");
  const [hybridCopied, setHybridCopied] = useState(false);
  const [contentDraftPrompt, setContentDraftPrompt] = useState("");
  const [contentIsGenerating, setContentIsGenerating] = useState(false);
  const [contentGenerationProgress, setContentGenerationProgress] = useState(0);
  const [contentGeneratedPreviewUrls, setContentGeneratedPreviewUrls] = useState<string[]>([]);
  const [contentGenerationError, setContentGenerationError] = useState("");
  const [contentVariantCount, setContentVariantCount] = useState<1 | 2 | 3>(1);
  const [contentUsePerspectiveSet, setContentUsePerspectiveSet] = useState(true);
  const [contentAspectRatio, setContentAspectRatio] = useState<"1:1" | "3:4" | "4:5" | "16:9" | "9:16">("3:4");
  const [contentResolution, setContentResolution] = useState<"1K" | "2K" | "4K">("1K");
  const bellMenuRef = useRef<HTMLDivElement | null>(null);
  const profileMenuRef = useRef<HTMLDivElement | null>(null);
  const sessionExpiredHandledRef = useRef(false);
  const displayName = breweryName || profileName || "deine Brauerei";
  const tabTitle = selectedTab;
  const isCreationTab = selectedTab === "Inhalte erstellen" || selectedTab === "Prompt-Erstellung";
  const topTabs: Array<{ title: DashboardTab; Icon: LucideIcon; notifs?: number }> = [
    { title: "Dashboard", Icon: Home },
    { title: "Prompt-Erstellung", Icon: Sparkles },
    { title: "Inhalte erstellen", Icon: Wand2 },
    { title: "Mediathek", Icon: Image },
    { title: "Team", Icon: Users, notifs: 1 },
    { title: "Einstellungen", Icon: Settings },
    { title: "Hilfe & Support", Icon: HelpCircle },
  ];
  if (isAdmin) {
    topTabs.splice(6, 0, { title: "Admin Center", Icon: Settings });
  }

  const tabIconClassByTitle: Record<DashboardTab, string> = {
    Dashboard: "text-sky-300",
    "Prompt-Erstellung": "text-violet-300",
    "Inhalte erstellen": "text-emerald-300",
    Mediathek: "text-[#7cff66]",
    Team: "text-cyan-300",
    "Admin Center": "text-amber-300",
    Einstellungen: "text-zinc-300",
    "Hilfe & Support": "text-orange-300",
    "Abo & Tokens": "text-fuchsia-300",
  };

  const submitHybridInput = useCallback(
    async (message: string) => {
      const trimmed = message.trim();
      if (!trimmed || hybridIsLoading) return;

      setHybridError("");
      setHybridIsLoading(true);
      if (!hybridCurrentQuestion) {
        setHybridAnswers([]);
        setHybridFinalPrompt("");
        setHybridCopied(false);
      }

      const nextAnswers = hybridCurrentQuestion
        ? [...hybridAnswers, { question: hybridCurrentQuestion, answer: trimmed }]
        : hybridAnswers;
      const effectiveInitialInput = hybridCurrentQuestion ? hybridInitialInput : trimmed;

      try {
        const res = await fetch("/api/claude/hybrid-prompt", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            initialInput: effectiveInitialInput,
            history: nextAnswers,
            questionCount: nextAnswers.length,
          }),
        });
        const data = (await res.json()) as { status?: "follow_up" | "complete"; question?: string; prompt?: string; error?: string };
        if (!res.ok) throw new Error(data.error ?? "Analyse fehlgeschlagen.");

        setHybridAnswers(nextAnswers);
        if (!hybridCurrentQuestion) {
          setHybridInitialInput(trimmed);
        }
        if (data.status === "follow_up" && data.question) {
          setHybridCurrentQuestion(data.question);
          setHybridFinalPrompt("");
        } else {
          setHybridCurrentQuestion(null);
          setHybridFinalPrompt((data.prompt ?? "").trim());
        }
        setHybridInputValue("");
      } catch (error) {
        setHybridError(error instanceof Error ? error.message : "Analyse fehlgeschlagen.");
      } finally {
        setHybridIsLoading(false);
      }
    },
    [hybridAnswers, hybridCurrentQuestion, hybridIsLoading],
  );

  const onboardingStorageKey =
    typeof window !== "undefined"
      ? `evglab-dashboard-onboarding-v1:${userEmail ?? "default"}`
      : "evglab-dashboard-onboarding-v1:default";

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
    const loadDashboardData = async () => {
      try {
        const [mediaRes, settingsRes, summaryRes, teamRes] = await Promise.all([
          fetch("/api/dashboard/media", { cache: "no-store" }),
          fetch("/api/dashboard/settings", { cache: "no-store" }),
          fetch("/api/dashboard/summary", { cache: "no-store" }),
          fetch("/api/dashboard/team", { cache: "no-store" }),
        ]);

        if (!ignore && mediaRes.ok) {
          const mediaData = (await mediaRes.json()) as { items?: MediaLibraryItem[] };
          if (Array.isArray(mediaData.items)) {
            setMediaItems(mediaData.items);
          }
        }
        if (!ignore && settingsRes.ok) {
          const settingsData = (await settingsRes.json()) as {
            settings?: {
              profileName?: string;
              breweryName?: string;
              profilePhone?: string;
              emailNotifications?: boolean;
              weeklySummary?: boolean;
            };
          };
          const settings = settingsData.settings;
          if (settings) {
            if (typeof settings.profileName === "string") setProfileName(settings.profileName);
            if (typeof settings.breweryName === "string") setBreweryName(settings.breweryName);
            if (typeof settings.profilePhone === "string") setProfilePhone(settings.profilePhone);
            if (typeof settings.emailNotifications === "boolean") setEmailNotifications(settings.emailNotifications);
            if (typeof settings.weeklySummary === "boolean") setWeeklySummary(settings.weeklySummary);
          }
        }
        if (!ignore && summaryRes.ok) {
          const summaryData = (await summaryRes.json()) as {
            summary?: DashboardSummary;
            activities?: ActivityItem[];
          };
          if (summaryData.summary) setDashboardSummary(summaryData.summary);
          if (Array.isArray(summaryData.activities)) setActivityItems(summaryData.activities);
        }
        if (!ignore && teamRes.ok) {
          const teamData = (await teamRes.json()) as { members?: TeamMember[] };
          if (Array.isArray(teamData.members)) setTeamMembers(teamData.members);
        }
      } catch {
        if (!ignore) {
          setGlobalErrorMessage("Einige Dashboard-Daten konnten nicht geladen werden.");
        }
      }
    };
    void loadDashboardData();
    return () => {
      ignore = true;
    };
  }, []);

  useEffect(() => {
    if (!profileMenuOpen && !bellMenuOpen) return;
    const onPointerDown = (event: MouseEvent) => {
      const target = event.target as Node | null;
      if (bellMenuRef.current && target && !bellMenuRef.current.contains(target)) {
        setBellMenuOpen(false);
      }
      if (profileMenuRef.current && target && !profileMenuRef.current.contains(target)) {
        setProfileMenuOpen(false);
      }
    };
    const onEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setTopNavMenuOpen(false);
        setBellMenuOpen(false);
        setProfileMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", onPointerDown);
    window.addEventListener("keydown", onEscape);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      window.removeEventListener("keydown", onEscape);
    };
  }, [profileMenuOpen, bellMenuOpen]);

  useEffect(() => {
    let cancelled = false;

    const verifySessionHealth = async () => {
      try {
        const res = await fetch("/api/auth/status", {
          method: "GET",
          cache: "no-store",
          credentials: "include",
        });
        if (!res.ok) return;
        const data = (await res.json()) as { authenticated?: boolean };
        if (cancelled) return;
        if (data.authenticated) {
          sessionExpiredHandledRef.current = false;
          setGlobalErrorMessage((prev) => (prev.includes("Session") ? "" : prev));
          return;
        }
        if (!sessionExpiredHandledRef.current) {
          sessionExpiredHandledRef.current = true;
          setGlobalErrorMessage("Session abgelaufen. Bitte neu anmelden.");
          if (typeof window !== "undefined") {
            window.dispatchEvent(new CustomEvent("evglab-open-auth-modal", { detail: { mode: "signin" } }));
          }
        }
      } catch {
        // ignore short-lived network errors
      }
    };

    const intervalId = globalThis.setInterval(() => {
      void verifySessionHealth();
    }, 60_000);

    const onFocus = () => {
      void verifySessionHealth();
    };
    const onVisibility = () => {
      if (document.visibilityState === "visible") {
        void verifySessionHealth();
      }
    };

    window.addEventListener("focus", onFocus);
    document.addEventListener("visibilitychange", onVisibility);
    void verifySessionHealth();

    return () => {
      cancelled = true;
      globalThis.clearInterval(intervalId);
      window.removeEventListener("focus", onFocus);
      document.removeEventListener("visibilitychange", onVisibility);
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
    setSelectedTab("Dashboard");
    const hasActivePlan = Boolean(activeSubscription) && billingStatus !== "none" && billingStatus !== "canceled";
    if (!hasActivePlan) {
      setShowCreditsOffer(true);
    }
    if (typeof window === "undefined") return;
    try {
      window.localStorage.setItem(onboardingStorageKey, "seen");
    } catch {
      // ignore localStorage errors
    }
  };

  const handleRestartOnboardingGlobal = () => {
    if (typeof window === "undefined") return;
    try {
      window.localStorage.removeItem(onboardingStorageKey);
    } catch {
      // ignore localStorage errors
    }
    setShowOnboarding(true);
    window.dispatchEvent(new CustomEvent("evglab-restart-onboarding"));
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

  const getMediaAssetUrl = (item: MediaLibraryItem): string => {
    // Keep already-proxied URLs unchanged; proxy direct provider URLs through our API.
    if (item.imageUrl.startsWith("/api/kie/download?")) return item.imageUrl;
    return `/api/kie/download?url=${encodeURIComponent(item.imageUrl)}&format=${item.outputFormat}&taskId=${encodeURIComponent(item.id)}`;
  };

  const downloadGeneratedPreview = async (url: string, index: number) => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        setGlobalErrorMessage("Download des generierten Bildes fehlgeschlagen.");
        return;
      }
      const blob = await response.blob();
      const objectUrl = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = objectUrl;
      a.download = `evglab-generiert-${index + 1}.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(objectUrl);
    } catch {
      setGlobalErrorMessage("Download des generierten Bildes fehlgeschlagen.");
    }
  };

  const removeMediaItem = async (id: string) => {
    const previousItems = mediaItems;
    setMediaItems((prev) => prev.filter((item) => item.id !== id));
    try {
      const res = await fetch(`/api/dashboard/media?id=${encodeURIComponent(id)}`, { method: "DELETE" });
      if (!res.ok) {
        setMediaItems(previousItems);
        setGlobalErrorMessage("Mediathek-Eintrag konnte nicht gelöscht werden.");
        return;
      }
      await refreshSummary();
    } catch {
      setMediaItems(previousItems);
      setGlobalErrorMessage("Mediathek-Eintrag konnte nicht gelöscht werden.");
    }
  };

  const tabDescriptions: Record<DashboardTab, string> = {
    Dashboard: "Hier siehst du alle wichtigen Zahlen für dein Content- und Abo-Management.",
    "Prompt-Erstellung": "Baue deinen Prompt sauber auf, bevor du Bilder generierst.",
    "Inhalte erstellen": "Plane und erstelle neue Inhalte für Social Media, Events und Kampagnen.",
    Mediathek: "Verwalte deine Bilder, Vorlagen und exportierten Assets zentral an einem Ort.",
    "Abo & Tokens": "Behalte deinen Tarif, Verbrauch und kommende Aufladungen im Blick.",
    Team: "Lade Kolleginnen und Kollegen ein und verwalte Rollen im Team.",
    "Admin Center": "Als Admin verwaltest du hier Nutzer, Rollen, Billing, Team und Inhalte zentral.",
    Einstellungen: "Passe Konto, Branding und Standard-Einstellungen für Inhalte an.",
    "Hilfe & Support": "Finde Antworten und kontaktiere bei Bedarf direkt den Support.",
  };
  const remainingTokens = Math.max(monthlyTokens - usedTokens, 0);
  const hasActiveBilling = Boolean(activeSubscription) && billingStatus !== "none" && billingStatus !== "canceled";
  const creditFillPercent =
    hasActiveBilling && monthlyTokens > 0
      ? Math.max(0, Math.min((remainingTokens / monthlyTokens) * 100, 100))
      : 0;
  const bellNotifications = [
    {
      id: "generation-finished",
      title: "Bildgenerierung abgeschlossen",
      description: contentGeneratedPreviewUrls.length > 0 ? `${contentGeneratedPreviewUrls.length} Bild(er) bereit.` : "Neue Ergebnisse warten in der Mediathek.",
      actionLabel: "Zur Mediathek",
      onAction: () => setSelectedTab("Mediathek"),
      tone: "success" as const,
      visible: contentGeneratedPreviewUrls.length > 0,
    },
    {
      id: "credits-low",
      title: "Credits werden knapp",
      description: `${remainingTokens.toLocaleString("de-DE")} Credits verfügbar.`,
      actionLabel: "Zu Pakete",
      onAction: () => setSelectedTab("Abo & Tokens"),
      tone: "warning" as const,
      visible: hasActiveBilling && creditFillPercent <= 25,
    },
    {
      id: "team-invites",
      title: "Team-Updates",
      description: `${teamMembers.filter((member) => member.status === "invited").length} offene Einladung(en).`,
      actionLabel: "Zum Team",
      onAction: () => setSelectedTab("Team"),
      tone: "info" as const,
      visible: teamMembers.some((member) => member.status === "invited"),
    },
    {
      id: "onboarding",
      title: "Onboarding neu starten",
      description: "Du kannst den gefuhrten Rundgang jederzeit erneut starten.",
      actionLabel: "Jetzt starten",
      onAction: () => handleRestartOnboardingGlobal(),
      tone: "neutral" as const,
      visible: true,
    },
  ].filter((item) => item.visible);
  const bellUnreadCount = bellNotifications.filter((item) => !bellReadIds.includes(item.id)).length;
  const hasFreeTrialAvailable = !freeTrialImageUsed;
  const activePlanLabel = activeSubscription ? PLAN_LABELS[activeSubscription] : "Kein aktives Abo";

  const handleSelectPlan = async (plan: SubscriptionPlanKey) => {
    try {
      setGlobalErrorMessage("");
      setLoadingPlan(plan);
      setCheckoutMessage("Sandbox wird geöffnet...");
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
        const payload = (await res.json().catch(() => ({}))) as { error?: string };
        setGlobalErrorMessage(payload.error ?? "Checkout konnte nicht gestartet werden.");
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
    } catch (error) {
      setGlobalErrorMessage(error instanceof Error ? error.message : "Checkout fehlgeschlagen.");
      setIsCheckoutLoading(false);
      setLoadingPlan(null);
    }
  };

  const handleClaimCredits = async () => {
    if (!BILLING_CHECKOUT_ENABLED) {
      try {
        setGlobalErrorMessage("");
        const res = await fetch("/api/billing/onboarding-bonus", { method: "POST" });
        if (!res.ok) {
          const payload = (await res.json().catch(() => ({}))) as { error?: string };
          setGlobalErrorMessage(payload.error ?? "Bonus-Credits konnten nicht freigeschaltet werden.");
          return;
        }
        const data = (await res.json()) as {
          state?: {
            plan: SubscriptionPlanKey | null;
            monthlyTokens: number;
            usedTokens: number;
            status?: string;
          };
        };
        if (data.state) {
          setActiveSubscription(data.state.plan);
          setMonthlyTokens(data.state.monthlyTokens);
          setUsedTokens(data.state.usedTokens);
          setBillingStatus(data.state.status ?? "active");
          if (typeof window !== "undefined") {
            window.dispatchEvent(new CustomEvent("evglab-billing-updated"));
          }
        }
        setShowCreditsOffer(false);
        setSelectedTab("Inhalte erstellen");
      } catch (error) {
        setGlobalErrorMessage(error instanceof Error ? error.message : "Bonus-Credits konnten nicht freigeschaltet werden.");
      }
      return;
    }
    await handleSelectPlan("start");
  };

  const handleOpenBillingPortal = async () => {
    try {
      setGlobalErrorMessage("");
      setCheckoutMessage("Abo-Verwaltung wird geöffnet...");
      setIsCheckoutLoading(true);
      const res = await fetch("/api/billing/portal", { method: "POST" });
      if (!res.ok) {
        const payload = (await res.json().catch(() => ({}))) as { error?: string };
        setGlobalErrorMessage(payload.error ?? "Billing-Portal konnte nicht geöffnet werden.");
        setIsCheckoutLoading(false);
        return;
      }
      const data = (await res.json()) as { url?: string };
      if (data.url) {
        window.location.href = data.url;
        return;
      }
      setIsCheckoutLoading(false);
    } catch (error) {
      setGlobalErrorMessage(error instanceof Error ? error.message : "Billing-Portal fehlgeschlagen.");
      setIsCheckoutLoading(false);
    }
  };

  const handleBuyTokenPack = async (pack: "tokens_500" | "tokens_2000") => {
    try {
      setGlobalErrorMessage("");
      setCheckoutMessage("Token-Kauf wird vorbereitet...");
      setIsCheckoutLoading(true);
      const res = await fetch("/api/billing/buy-tokens", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pack }),
      });
      if (!res.ok) {
        const payload = (await res.json().catch(() => ({}))) as { error?: string };
        setGlobalErrorMessage(payload.error ?? "Token-Kauf konnte nicht gestartet werden.");
        setIsCheckoutLoading(false);
        return;
      }
      const data = (await res.json()) as { url?: string };
      if (data.url) {
        window.location.href = data.url;
        return;
      }
      setIsCheckoutLoading(false);
    } catch (error) {
      setGlobalErrorMessage(error instanceof Error ? error.message : "Token-Kauf fehlgeschlagen.");
      setIsCheckoutLoading(false);
    }
  };

  const consumeTokens = (amount: number) => {
    if (!amount || amount < 0) return;
    setUsedTokens((prev) => Math.min(prev + amount, monthlyTokens));
  };

  const applyBillingUpdateFromGeneration = (billing: {
    monthlyTokens?: number;
    usedTokens?: number;
    remainingTokens?: number;
    consumed?: number;
    freeTrial?: boolean;
  }) => {
    if (typeof billing.monthlyTokens === "number") setMonthlyTokens(billing.monthlyTokens);
    if (typeof billing.usedTokens === "number") setUsedTokens(billing.usedTokens);
    if (billing.freeTrial) setFreeTrialImageUsed(true);
  };

  const saveProfileSettings = async () => {
    setSavingProfile(true);
    setProfileSaveMessage("");
    try {
      const payload = { profileName, breweryName, profilePhone, emailNotifications, weeklySummary };
      const res = await fetch("/api/dashboard/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const data = (await res.json()) as { error?: string };
        throw new Error(data.error ?? "Einstellungen konnten nicht gespeichert werden.");
      }
      setProfileSaveMessage("Einstellungen gespeichert.");
    } catch (error) {
      setProfileSaveMessage(error instanceof Error ? error.message : "Speichern fehlgeschlagen.");
    } finally {
      setSavingProfile(false);
    }
  };

  const refreshSummary = async () => {
    try {
      const res = await fetch("/api/dashboard/summary", { cache: "no-store" });
      if (!res.ok) return;
      const data = (await res.json()) as { summary?: DashboardSummary; activities?: ActivityItem[] };
      if (data.summary) setDashboardSummary(data.summary);
      if (Array.isArray(data.activities)) setActivityItems(data.activities);
    } catch {
      // ignore
    }
  };

  const fileToDataUrl = (file: File) =>
    new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(String(reader.result ?? ""));
      reader.onerror = () => reject(new Error("Referenzbild konnte nicht gelesen werden."));
      reader.readAsDataURL(file);
    });

  const generateContentWithKie = useCallback(
    async (prompt: string, files?: File[]) => {
      const finalPrompt = prompt.trim();
      if (!finalPrompt) return;
      const peopleRealismLock = [
        "Human realism lock (MANDATORY): render all people as hyper-realistic adult humans with natural anatomy and true-to-life proportions.",
        "Faces must be photorealistic: realistic skin texture and pores, natural eyes/eyelids, accurate teeth, believable lips and ears.",
        "No AI artifacts: no wax/plastic skin, no distorted fingers, no asymmetric eyes, no warped mouth, no duplicate limbs, no uncanny expressions.",
        "Lighting and skin interaction must be physically plausible with natural shadows, subtle micro-contrast and true optical depth.",
      ].join(" ");
      const environmentRealismLock = [
        "Environment realism lock (MANDATORY): avoid generic stock-like water and background.",
        "Water must look physically correct with natural wave patterns, depth gradient, local reflections, micro-ripples around the body, and realistic refraction around submerged skin.",
        "Background must include concrete environmental detail layers (foreground water texture, midground shoreline cues, distant mountain structure) with natural atmospheric perspective.",
        "No flat or overly smooth water surfaces, no artificial blur blobs, no synthetic CGI-style landscape textures.",
        "Keep scene-specific cues grounded: weather-consistent light direction, plausible haze, and coherent color temperature across subject, water, and background.",
      ].join(" ");
      const liquidContinuityLock = [
        "Liquid continuity lock (MANDATORY): bottle fill level and poured volume must be physically consistent with glass fill level.",
        "If the glass is near full, the bottle must visibly show significant volume loss; never show a near-full bottle while the glass is already almost full.",
        "Respect realistic pouring sequence: plausible stream thickness, foam build-up timing, carbonation, and liquid level progression.",
        "Do not violate conservation logic between source bottle and target glass.",
      ].join(" ");
      const finalPromptWithRealismLock = `${peopleRealismLock}\n\n${environmentRealismLock}\n\n${liquidContinuityLock}\n\n${finalPrompt}`;

      setContentIsGenerating(true);
      setContentGenerationProgress(6);
      setContentGenerationError("");
      setContentGeneratedPreviewUrls([]);
      setContentDraftPrompt(finalPromptWithRealismLock);

      try {
        const referenceImageUrls = files?.length
          ? await Promise.all(files.slice(0, 2).map((file) => fileToDataUrl(file)))
          : undefined;

        const perspectivePrompts = [
          "Camera angle lock: strict eye-level shot, 50mm natural perspective, centered torso framing, horizon at chest level.",
          "Camera angle lock: strict low-angle shot from just above water surface, 35mm lens look, upward perspective with clear foreground depth.",
          "Camera angle lock: strict high-angle / slight top-down shot (~35-45 degrees from above), visible top planes and downward perspective cues.",
        ];
        const identityContinuityLock =
          "Identity continuity lock (MANDATORY for multi-variant set): keep the exact same person identity, same face geometry, same hair color/style, same outfit, same body proportions, same bottle and glass branding. Only camera angle and composition may change between variants.";

        const previews: string[] = [];
        const createdItems: MediaLibraryItem[] = [];

        for (let variantIdx = 0; variantIdx < contentVariantCount; variantIdx += 1) {
          setContentGenerationProgress((prev) => Math.max(prev, 8 + variantIdx * 18));
          const variantPrompt =
            contentUsePerspectiveSet && contentVariantCount > 1
              ? `${finalPromptWithRealismLock}\n\n${identityContinuityLock}\n\n${perspectivePrompts[variantIdx % perspectivePrompts.length]}`
              : finalPromptWithRealismLock;

          const createRes = await fetch("/api/kie/nano-banana/create-task", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              prompt: variantPrompt,
              aspectRatio: contentAspectRatio,
              resolution: contentResolution,
              outputFormat: "png",
              referenceImageUrls,
            }),
          });

          const createData = (await createRes.json()) as {
            taskId?: string;
            error?: string;
          };
          if (!createRes.ok || !createData.taskId) {
            throw new Error(createData.error ?? "Kie Task konnte nicht erstellt werden.");
          }

          const taskId = createData.taskId;
          let imageUrl: string | null = null;
          let doneWithoutImageChecks = 0;

          for (let i = 0; i < 180; i += 1) {
            const dynamicDelay = i < 25 ? 2000 : i < 80 ? 2600 : 3200;
            await new Promise((resolve) => setTimeout(resolve, dynamicDelay));
            const overallProgressBase = 18 + variantIdx * (62 / Math.max(contentVariantCount, 1));
            const overallProgressStep = Math.min(20, Math.floor((i / 180) * 20));
            setContentGenerationProgress((prev) => Math.max(prev, Math.min(94, Math.floor(overallProgressBase + overallProgressStep))));
            const statusRes = await fetch(`/api/kie/nano-banana/task-status?taskId=${encodeURIComponent(taskId)}`);
            const statusData = (await statusRes.json()) as {
              state?: string;
              imageUrl?: string | null;
              error?: string;
            };
            if (!statusRes.ok) {
              throw new Error(statusData.error ?? "Kie Statusabfrage fehlgeschlagen.");
            }
            if (statusData.imageUrl) {
              imageUrl = statusData.imageUrl;
              break;
            }
            const state = String(statusData.state ?? "").toLowerCase();
            if (["success", "succeeded", "done", "finished", "complete", "completed"].includes(state)) {
              doneWithoutImageChecks += 1;
              if (doneWithoutImageChecks >= 35) {
                throw new Error("KIE meldet fertig, liefert das Bild aber verzögert. Bitte erneut prüfen.");
              }
              continue;
            }
            if (["failed", "error", "cancelled", "canceled"].includes(state)) {
              throw new Error("Kie konnte das Bild nicht generieren.");
            }
          }

          if (!imageUrl) {
            throw new Error("Generierung dauert länger als erwartet. Bitte erneut versuchen.");
          }

          previews.push(`/api/kie/download?url=${encodeURIComponent(imageUrl)}&format=png&taskId=${encodeURIComponent(taskId)}`);
          createdItems.push({
            id: taskId,
            imageUrl,
            prompt: variantPrompt.slice(0, 240),
            createdAt: new Date().toISOString(),
            aspectRatio: contentAspectRatio,
            resolution: contentResolution,
            outputFormat: "png",
            model: "Nano Banana Pro",
            referenceImageUrl: referenceImageUrls?.[0],
          });
          setContentGenerationProgress((prev) => Math.max(prev, 35 + Math.floor(((variantIdx + 1) / contentVariantCount) * 55)));
        }

        setContentGeneratedPreviewUrls(previews);
        setContentGenerationProgress(100);
        setMediaItems((prev) => [...createdItems, ...prev.filter((entry) => !createdItems.some((it) => it.id === entry.id))].slice(0, 12));
        void Promise.all(
          createdItems.map((item) =>
            fetch("/api/dashboard/media", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(item),
            }),
          ),
        )
          .then(() => refreshSummary())
          .catch(() => {
            setGlobalErrorMessage("Mindestens ein Bild wurde erstellt, konnte aber nicht vollständig in der Mediathek gespeichert werden.");
          });
      } catch (error) {
        setContentGenerationError(error instanceof Error ? error.message : "Bildgenerierung fehlgeschlagen.");
      } finally {
        setContentIsGenerating(false);
        setContentGenerationProgress(0);
      }
    },
    [contentAspectRatio, contentResolution, contentUsePerspectiveSet, contentVariantCount, refreshSummary],
  );

  const inviteTeamMember = async () => {
    setTeamMessage("");
    setTeamSaving(true);
    try {
      const res = await fetch("/api/dashboard/team", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: teamInviteEmail, name: teamInviteName, role: teamInviteRole }),
      });
      const data = (await res.json()) as { error?: string; members?: TeamMember[] };
      if (!res.ok) throw new Error(data.error ?? "Einladung fehlgeschlagen.");
      setTeamMembers(data.members ?? []);
      setTeamInviteEmail("");
      setTeamInviteName("");
      setTeamMessage("Einladung wurde per E-Mail versendet.");
      await refreshSummary();
    } catch (error) {
      setTeamMessage(error instanceof Error ? error.message : "Einladung fehlgeschlagen.");
    } finally {
      setTeamSaving(false);
    }
  };

  const updateTeamRole = async (memberId: string, role: "admin" | "editor" | "viewer") => {
    const res = await fetch("/api/dashboard/team", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ memberId, role }),
    });
    const data = (await res.json()) as { error?: string; members?: TeamMember[] };
    if (!res.ok) {
      setTeamMessage(data.error ?? "Rolle konnte nicht aktualisiert werden.");
      return;
    }
    setTeamMembers(data.members ?? []);
  };

  const removeTeamMember = async (memberId: string) => {
    const res = await fetch(`/api/dashboard/team?memberId=${encodeURIComponent(memberId)}`, { method: "DELETE" });
    const data = (await res.json()) as { error?: string; members?: TeamMember[] };
    if (!res.ok) {
      setTeamMessage(data.error ?? "Mitglied konnte nicht entfernt werden.");
      return;
    }
    setTeamMembers(data.members ?? []);
    await refreshSummary();
  };

  const renderTabPanel = () => {
    if (selectedTab === "Dashboard") {
      return (
        <>
          <div data-onboarding="dashboard-overview" className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-xl border border-white/12 bg-[linear-gradient(180deg,#1a1f2a_0%,#161b24_100%)] p-6 shadow-[0_14px_34px_-24px_rgba(0,0,0,0.95)] transition duration-200 hover:-translate-y-0.5 hover:border-[#c8ff26]/25 hover:bg-[linear-gradient(180deg,#1d2430_0%,#181f2a_100%)]">
              <div className="mb-4 flex items-center justify-between">
                <div className="rounded-lg border border-orange-400/20 bg-orange-500/10 p-2">
                  <Sparkles className="h-5 w-5 text-orange-300" />
                </div>
                <span className="text-xs font-medium text-emerald-300">+180</span>
              </div>
              <h3 className="mb-1 text-sm font-medium text-zinc-400">Verfügbare Tokens</h3>
              <p className="text-3xl font-bold text-white">
                {(dashboardSummary?.tokens.remaining ?? remainingTokens).toLocaleString("de-DE")}
              </p>
              <p className="mt-1 text-sm text-emerald-300">
                {hasActiveBilling ? `${usedTokens.toLocaleString("de-DE")} verbraucht` : "kein Abo aktiv"}
              </p>
            </div>

            <div className="rounded-xl border border-white/12 bg-[linear-gradient(180deg,#1a1f2a_0%,#161b24_100%)] p-6 shadow-[0_14px_34px_-24px_rgba(0,0,0,0.95)] transition duration-200 hover:-translate-y-0.5 hover:border-[#c8ff26]/25 hover:bg-[linear-gradient(180deg,#1d2430_0%,#181f2a_100%)]">
              <div className="mb-4 flex items-center justify-between">
                <div className="rounded-lg border border-emerald-400/20 bg-emerald-500/10 p-2">
                  <FileText className="h-5 w-5 text-emerald-300" />
                </div>
                <span className="text-xs font-medium text-emerald-300">+12%</span>
              </div>
              <h3 className="mb-1 text-sm font-medium text-zinc-400">Posts im April</h3>
              <p className="text-3xl font-bold text-white">{dashboardSummary?.postsThisMonth ?? 0}</p>
              <p className="mt-1 text-sm text-emerald-300">aus deiner Mediathek berechnet</p>
            </div>

            <div className="rounded-xl border border-white/12 bg-[linear-gradient(180deg,#1a1f2a_0%,#161b24_100%)] p-6 shadow-[0_14px_34px_-24px_rgba(0,0,0,0.95)] transition duration-200 hover:-translate-y-0.5 hover:border-[#c8ff26]/25 hover:bg-[linear-gradient(180deg,#1d2430_0%,#181f2a_100%)]">
              <div className="mb-4 flex items-center justify-between">
                <div className="rounded-lg border border-violet-400/20 bg-violet-500/10 p-2">
                  <Beer className="h-5 w-5 text-violet-300" />
                </div>
                <span className="text-xs font-medium text-violet-300">Saisonaktion</span>
              </div>
              <h3 className="mb-1 text-sm font-medium text-zinc-400">Kampagnen aktiv</h3>
              <p className="text-3xl font-bold text-white">{dashboardSummary?.activeCampaigns ?? 0}</p>
              <p className="mt-1 text-sm text-violet-300">automatisch aus Aktivität abgeleitet</p>
            </div>

            <div className="rounded-xl border border-white/12 bg-[linear-gradient(180deg,#1a1f2a_0%,#161b24_100%)] p-6 shadow-[0_14px_34px_-24px_rgba(0,0,0,0.95)] transition duration-200 hover:-translate-y-0.5 hover:border-[#c8ff26]/25 hover:bg-[linear-gradient(180deg,#1d2430_0%,#181f2a_100%)]">
              <div className="mb-4 flex items-center justify-between">
                <div className="rounded-lg border border-orange-400/20 bg-orange-500/10 p-2">
                  <Users className="h-5 w-5 text-orange-300" />
                </div>
                <span className="text-xs font-medium text-orange-300">+1</span>
              </div>
              <h3 className="mb-1 text-sm font-medium text-zinc-400">Teammitglieder</h3>
              <p className="text-3xl font-bold text-white">{dashboardSummary?.teamMembers ?? teamMembers.length}</p>
              <p className="mt-1 text-sm text-orange-300">
                {dashboardSummary?.openInvites ?? teamMembers.filter((member) => member.status === "invited").length} Einladung(en) offen
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <div className="rounded-xl border border-white/10 bg-[#171a20] p-6 shadow-sm">
                <div className="mb-6 flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Letzte Aktivitäten</h3>
                  <button className="text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300">
                    Alle anzeigen
                  </button>
                </div>
                <div className="space-y-4">
                  {activityItems.map((activity) => {
                    const ActivityIcon = getActivityIcon(activity.type);
                    return (
                    <div key={activity.id} className="flex cursor-pointer items-center space-x-4 rounded-lg p-3 transition-colors hover:bg-gray-50 dark:hover:bg-gray-800">
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
                        <ActivityIcon
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
                      <div className="text-xs text-gray-400 dark:text-gray-500">{formatRelativeTime(activity.time)}</div>
                    </div>
                  );
                  })}
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="rounded-xl border border-white/10 bg-[#171a20] p-6 shadow-sm">
                <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-gray-100">Schnellaktionen</h3>
                <div className="space-y-4">
                  <button
                    onClick={() => setSelectedTab("Inhalte erstellen")}
                    className="flex w-full items-center justify-between rounded-lg border border-white/10 bg-[#171a20] px-3 py-2 text-left text-sm transition-colors hover:bg-[#1e232b]"
                  >
                    <span>Neuen Social-Post erstellen</span>
                    <Wand2 className="h-4 w-4 text-gray-500" />
                  </button>
                  <button
                    onClick={() => setSelectedTab("Inhalte erstellen")}
                    className="flex w-full items-center justify-between rounded-lg border border-white/10 bg-[#171a20] px-3 py-2 text-left text-sm transition-colors hover:bg-[#1e232b]"
                  >
                    <span>Bild für Event generieren</span>
                    <Image className="h-4 w-4 text-gray-500" />
                  </button>
                  <button
                    onClick={() => setSelectedTab("Team")}
                    className="flex w-full items-center justify-between rounded-lg border border-white/10 bg-[#171a20] px-3 py-2 text-left text-sm transition-colors hover:bg-[#1e232b]"
                  >
                    <span>Teammitglied einladen</span>
                    <Users className="h-4 w-4 text-gray-500" />
                  </button>
                </div>
              </div>

              <div className="rounded-xl border border-white/10 bg-[#171a20] p-6 shadow-sm">
                <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-gray-100">Aktiver Tarif</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Du nutzt aktuell den Plan</p>
                <p className="mt-1 text-xl font-semibold text-gray-900 dark:text-gray-100">{activePlanLabel}</p>
                <p className="mt-2 text-sm text-emerald-600 dark:text-emerald-400">
                  {hasActiveBilling ? `${monthlyTokens.toLocaleString("de-DE")} Tokens / Monat` : "Bitte wähle einen Plan"}
                </p>
              </div>
            </div>
          </div>

        </>
      );
    }

    if (selectedTab === "Inhalte erstellen") {
      return (
        <section className="relative isolate min-h-[calc(100vh-5.5rem)] overflow-hidden bg-transparent">
          {contentIsGenerating ? (
            <div className="absolute inset-0 z-20 flex items-center justify-center bg-[#070b13]/70 backdrop-blur-[2px]">
              <div className="w-full max-w-sm rounded-2xl border border-white/15 bg-[#111827]/90 p-5 shadow-2xl">
                <div className="mb-3 flex items-center gap-3">
                  <div className="h-5 w-5 animate-spin rounded-full border-2 border-white/35 border-t-[#c8ff26]" />
                  <p className="text-sm font-semibold text-white">Bilder werden erstellt ...</p>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-white/10">
                  <div
                    className="h-full rounded-full bg-[#c8ff26] transition-all duration-300"
                    style={{ width: `${Math.max(6, Math.min(100, contentGenerationProgress))}%` }}
                  />
                </div>
                <p className="mt-2 text-xs text-zinc-300">
                  Das kann je nach Queue und Auflösung etwas dauern. Bitte kurz warten.
                </p>
              </div>
            </div>
          ) : null}
          <div data-onboarding="content-workflow" className="relative mx-auto flex min-h-[calc(100dvh-4.75rem)] max-w-5xl flex-col items-center justify-start px-4 pb-32 pt-2 text-center sm:min-h-[calc(100vh-5.5rem)] sm:justify-center sm:px-10 sm:pb-36 sm:pt-8">
              {contentGeneratedPreviewUrls.length > 0 ? (
                <div data-onboarding="content-result" className="mb-6 w-full max-w-5xl rounded-2xl border border-white/15 bg-black/20 p-3 shadow-[0_18px_44px_-28px_rgba(0,0,0,0.85)]">
                  <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    {contentGeneratedPreviewUrls.map((url, idx) => (
                      <div key={url} className="overflow-hidden rounded-xl border border-white/10 bg-[#111827]/80">
                        <img src={url} alt={`Generiertes Ergebnis ${idx + 1}`} className="h-auto w-full object-cover" />
                        <div className="border-t border-white/10 p-2">
                          <button
                            type="button"
                            onClick={() => {
                              void downloadGeneratedPreview(url, idx);
                            }}
                            className="inline-flex h-8 items-center rounded-md border border-white/15 bg-white/5 px-2.5 text-xs font-medium text-white transition hover:bg-white/10"
                          >
                            Herunterladen
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-3 border-t border-white/10 px-1 pt-3 text-left">
                    <p className="text-xs font-semibold uppercase tracking-wide text-[#c8ff26]">Letzter Prompt</p>
                    <p className="mt-1 line-clamp-2 text-xs text-zinc-300">{contentDraftPrompt}</p>
                  </div>
                </div>
              ) : null}
              <div className="mb-5 flex -space-x-3">
                {["/ki-beispiel-hafen.webp", "/ki-beispiel-strand.webp", "/ki-beispiel-biergarten.webp"].map((src, i) => (
                  <div
                    key={src}
                    className={`h-20 w-20 overflow-hidden rounded-xl border border-white/20 shadow-[0_12px_28px_-18px_rgba(70,120,255,0.9)] sm:h-24 sm:w-24 ${
                      i === 1 ? "translate-y-1 rotate-0" : i === 0 ? "-rotate-12" : "rotate-12"
                    }`}
                  >
                    <img src={src} alt="" className="h-full w-full object-cover" />
                  </div>
                ))}
              </div>
              <h2 className="text-3xl font-extrabold uppercase tracking-tight text-white sm:text-4xl">
                Inhalte erstellen mit
                <span className="mt-1 block normal-case text-[#c8ff26]" style={{ fontFamily: "var(--font-playfair)" }}>
                  deinem KI-Studio.
                </span>
              </h2>
              <p className="mt-3 max-w-xl text-sm text-zinc-300 sm:text-base">
                Beschreibe Szene, Stimmung und Stil - wir generieren daraus starke Motive für deine Brauerei.
              </p>
            </div>
          <div data-onboarding="content-brief" className="absolute right-4 bottom-6 left-4 z-10 mx-auto w-auto max-w-5xl sm:right-6 sm:left-6">
            <PromptInputBox
              value={contentDraftPrompt}
              onValueChange={setContentDraftPrompt}
              aspectRatio={contentAspectRatio}
              onAspectRatioChange={setContentAspectRatio}
              resolution={contentResolution}
              onResolutionChange={setContentResolution}
              placeholder="Füge den Prompt ein, den wir zusammen erstellt haben, damit du das beste Ergebnis bekommst."
              className="border-white/10 bg-[#131926]/80"
              isLoading={contentIsGenerating}
              clearOnSend={false}
              onSend={(message, files) => {
                void generateContentWithKie(message, files);
              }}
            />
            <div data-onboarding="content-preflight" className="mt-2 flex flex-wrap items-center gap-2 text-xs text-zinc-300">
              <span className="rounded-full border border-white/10 bg-black/20 px-2 py-1">Varianten:</span>
              {[1, 2, 3].map((count) => (
                <button
                  key={count}
                  type="button"
                  onClick={() => setContentVariantCount(count as 1 | 2 | 3)}
                  className={cn(
                    "min-h-8 rounded-full border px-3 py-1.5 text-xs font-medium transition",
                    contentVariantCount === count
                      ? "border-[#c8ff26]/40 bg-[#c8ff26]/15 text-[#c8ff26]"
                      : "border-white/10 bg-black/20 text-zinc-300 hover:bg-white/10",
                  )}
                >
                  {count} Bild{count > 1 ? "er" : ""}
                </button>
              ))}
              <button
                type="button"
                onClick={() => setContentUsePerspectiveSet((prev) => !prev)}
                className={cn(
                  "min-h-8 rounded-full border px-3 py-1.5 text-xs font-medium transition",
                  contentUsePerspectiveSet
                    ? "border-[#c8ff26]/40 bg-[#c8ff26]/15 text-[#c8ff26]"
                    : "border-white/10 bg-black/20 text-zinc-300 hover:bg-white/10",
                )}
              >
                Perspektiven variieren
              </button>
            </div>
            {contentGenerationError ? (
              <p className="mt-2 text-sm text-red-300">{contentGenerationError}</p>
            ) : null}
          </div>
        </section>
      );
    }

    if (selectedTab === "Prompt-Erstellung") {
      return (
        <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
          <div className="mb-4 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-orange-50 text-[#c65a20] dark:bg-orange-900/30 dark:text-orange-300">
                <Wand2 className="h-4 w-4" />
              </span>
              <div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Prompt-Erstellung</h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Erstelle zuerst deinen Prompt, bevor du in die Bild-Generierung gehst.
                </p>
              </div>
            </div>
            <span className="rounded-full bg-orange-50 px-3 py-1 text-xs font-medium text-[#c65a20] dark:bg-orange-900/30 dark:text-orange-300">
              Schritt 1 von 3
            </span>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <label className="space-y-1.5">
              <span className="text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400">Ziel / Kampagne</span>
              <input
                type="text"
                placeholder="z. B. Frühlingsaktion im Biergarten"
                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-900 outline-none transition focus:border-[#c65a20]/50 focus:ring-2 focus:ring-[#c65a20]/20 dark:border-gray-700 dark:bg-gray-950/70 dark:text-gray-100"
              />
            </label>
            <label className="space-y-1.5">
              <span className="text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400">Bildstil</span>
              <input
                type="text"
                placeholder="z. B. cinematic, warmes Abendlicht, editorial"
                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-900 outline-none transition focus:border-[#c65a20]/50 focus:ring-2 focus:ring-[#c65a20]/20 dark:border-gray-700 dark:bg-gray-950/70 dark:text-gray-100"
              />
            </label>
            <label className="space-y-1.5 md:col-span-2">
              <span className="text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400">Prompt-Entwurf</span>
              <textarea
                rows={4}
                placeholder="Beschreibe Motiv, Perspektive, Setting, Licht, Stil und Markenwirkung..."
                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-900 outline-none transition focus:border-[#c65a20]/50 focus:ring-2 focus:ring-[#c65a20]/20 dark:border-gray-700 dark:bg-gray-950/70 dark:text-gray-100"
              />
            </label>
          </div>
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <span className="rounded-full border border-gray-200 bg-gray-50 px-2.5 py-1 text-xs text-gray-600 dark:border-gray-700 dark:bg-gray-950/70 dark:text-gray-300">
              Produktfokus
            </span>
            <span className="rounded-full border border-gray-200 bg-gray-50 px-2.5 py-1 text-xs text-gray-600 dark:border-gray-700 dark:bg-gray-950/70 dark:text-gray-300">
              Markenfarben
            </span>
            <span className="rounded-full border border-gray-200 bg-gray-50 px-2.5 py-1 text-xs text-gray-600 dark:border-gray-700 dark:bg-gray-950/70 dark:text-gray-300">
              Social-Ready
            </span>
          </div>
        </section>
      );
    }

    if (selectedTab === "Abo & Tokens") {
      return (
        <div className="space-y-6">
          <BrewerySubscriptionPlans
            activePlan={activeSubscription}
            onSelectPlan={BILLING_CHECKOUT_ENABLED ? handleSelectPlan : undefined}
            loadingPlan={loadingPlan}
            isLoading={BILLING_CHECKOUT_ENABLED ? isCheckoutLoading : false}
            checkoutEnabled={BILLING_CHECKOUT_ENABLED}
          />
          <section data-onboarding="billing-overview" className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Abo & Tokens</h2>
              <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300">
                {hasActiveBilling ? `${activeSubscription?.toUpperCase()} aktiv` : "Kein Abo aktiv"}
              </span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Verwalte deinen Tarif, sehe den aktuellen Verbrauch und wähle bei Bedarf einen neuen Plan.
            </p>
            {!BILLING_CHECKOUT_ENABLED ? (
              <div className="mt-3 rounded-lg border border-amber-300 bg-amber-50 p-3 text-xs text-amber-900 dark:border-amber-800 dark:bg-amber-900/30 dark:text-amber-200">
                Testmodus aktiv: Abo-Abschlüsse und Token-Käufe sind aktuell deaktiviert.
              </div>
            ) : null}
            <div className="mt-3 rounded-lg border border-gray-200 bg-gray-50 p-3 text-xs text-gray-700 dark:border-gray-700 dark:bg-gray-950 dark:text-gray-300">
              <p>Monatliche Tokens: {monthlyTokens.toLocaleString("de-DE")}</p>
              <p>Verbraucht: {usedTokens.toLocaleString("de-DE")}</p>
              <p className="font-semibold">Verfügbar: {remainingTokens.toLocaleString("de-DE")}</p>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => {
                  void handleOpenBillingPortal();
                }}
                disabled={!hasActiveBilling || !BILLING_CHECKOUT_ENABLED}
                className="inline-flex h-9 items-center rounded-md border border-gray-300 px-3 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800"
              >
                Abo verwalten / kündigen
              </button>
              <button
                type="button"
                onClick={() => {
                  void handleBuyTokenPack("tokens_500");
                }}
                disabled={!hasActiveBilling || !BILLING_CHECKOUT_ENABLED}
                className="inline-flex h-9 items-center rounded-md bg-[#c65a20] px-3 text-sm font-medium text-white transition hover:bg-[#b14f1c] disabled:cursor-not-allowed disabled:opacity-50"
              >
                +500 Tokens kaufen
              </button>
              <button
                type="button"
                onClick={() => {
                  void handleBuyTokenPack("tokens_2000");
                }}
                disabled={!hasActiveBilling || !BILLING_CHECKOUT_ENABLED}
                className="inline-flex h-9 items-center rounded-md bg-[#7b4bf9] px-3 text-sm font-medium text-white transition hover:bg-[#6a3ee3] disabled:cursor-not-allowed disabled:opacity-50"
              >
                +2.000 Tokens kaufen
              </button>
            </div>
          </section>
        </div>
      );
    }

    if (selectedTab === "Mediathek") {
      const normalizedSearch = mediaSearch.trim().toLowerCase();
      const visibleMediaItems = mediaItems.filter((item) => {
        const matchesSearch =
          normalizedSearch.length === 0 ||
          item.prompt.toLowerCase().includes(normalizedSearch) ||
          item.aspectRatio.toLowerCase().includes(normalizedSearch) ||
          item.resolution.toLowerCase().includes(normalizedSearch);
        const matchesFavorites = !mediaShowFavoritesOnly || mediaFavoriteIds.includes(item.id);
        return matchesSearch && matchesFavorites;
      });

      return (
        <section data-onboarding="media-library" className="overflow-hidden rounded-2xl border border-white/10 bg-[#0f1218] shadow-sm">
          <div className="grid min-h-[560px] grid-cols-1 lg:grid-cols-[240px_1fr]">
            <aside className="border-r border-white/10 bg-[#0c1016] p-4">
              <div className="mb-4">
                <div className="flex items-center gap-2 rounded-lg border border-white/10 bg-[#121824] px-3 py-2">
                  <span className="text-xs text-zinc-400">🔎</span>
                  <input
                    value={mediaSearch}
                    onChange={(e) => setMediaSearch(e.target.value)}
                    placeholder="Search"
                    className="w-full bg-transparent text-xs text-zinc-100 outline-none placeholder:text-zinc-500"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <button
                  type="button"
                  onClick={() => setMediaShowFavoritesOnly(false)}
                  className={cn(
                    "flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-xs font-medium transition",
                    !mediaShowFavoritesOnly
                      ? "border border-white/15 bg-white/10 text-white"
                      : "text-zinc-300 hover:bg-white/5",
                  )}
                >
                  <span>Alle Medien</span>
                  <span className="rounded-full bg-white/10 px-1.5 py-0.5 text-[10px]">{mediaItems.length}</span>
                </button>
                <button
                  type="button"
                  onClick={() => setMediaShowFavoritesOnly(true)}
                  className={cn(
                    "flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-xs font-medium transition",
                    mediaShowFavoritesOnly
                      ? "border border-white/15 bg-white/10 text-white"
                      : "text-zinc-300 hover:bg-white/5",
                  )}
                >
                  <span>Favoriten</span>
                  <span className="rounded-full bg-white/10 px-1.5 py-0.5 text-[10px]">{mediaFavoriteIds.length}</span>
                </button>
              </div>
              <div className="mt-6 border-t border-white/10 pt-4">
                <p className="mb-2 px-1 text-[10px] font-semibold uppercase tracking-wide text-zinc-500">Tools</p>
                <button
                  type="button"
                  className="flex w-full items-center justify-between rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-left text-xs font-medium text-zinc-100"
                >
                  <span>Bilder</span>
                  <span className="text-[10px] text-zinc-400">{mediaItems.length}</span>
                </button>
              </div>
            </aside>
            <div className="p-5">
              <div className="mb-5 flex items-center justify-between">
                <h2 className="text-xl font-semibold text-zinc-100">Alle Medien</h2>
                <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-zinc-300">
                  {visibleMediaItems.length} Bilder
                </span>
              </div>
              {downloadErrorMessage ? (
                <p className="mb-3 rounded-lg border border-red-500/40 bg-red-500/10 px-3 py-2 text-xs text-red-200">
                  {downloadErrorMessage}
                </p>
              ) : null}
              {visibleMediaItems.length === 0 ? (
                <div className="rounded-lg border border-dashed border-white/15 bg-white/5 p-4 text-sm text-zinc-400">
                  Keine Bilder gefunden.
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                  {visibleMediaItems.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => {
                        setSelectedMediaItem(item);
                        const img = new window.Image();
                        img.onload = () =>
                          setMediaImageDimensions((prev) => ({
                            ...prev,
                            [item.id]: `${img.naturalWidth}x${img.naturalHeight}`,
                          }));
                        img.src = getMediaAssetUrl(item);
                      }}
                      className="group relative overflow-hidden rounded-xl border border-white/10 bg-[#121827] shadow-sm transition hover:scale-[1.01]"
                    >
                      <img src={getMediaAssetUrl(item)} alt="Mediathek Bild" className="h-48 w-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
          {selectedMediaItem ? (
            <div className="fixed inset-0 z-[110] bg-black/70 backdrop-blur-sm">
              <div className="relative mx-auto flex h-full w-full max-w-[1300px] items-center gap-6 px-6 py-6">
                <button
                  type="button"
                  onClick={() => setSelectedMediaItem(null)}
                  className="absolute right-4 top-4 rounded-full border border-white/20 bg-black/35 px-2.5 py-1 text-xs text-white"
                >
                  Schließen
                </button>
                <div className="flex-1 rounded-2xl border border-white/15 bg-black/20 p-4">
                  <img src={getMediaAssetUrl(selectedMediaItem)} alt="Asset Vorschau" className="mx-auto max-h-[84vh] w-auto rounded-xl object-contain" />
                </div>
                <aside className="w-[320px] rounded-2xl border border-white/10 bg-[#12151b] p-4 text-white">
                  <div className="mb-4 flex items-center justify-between">
                    <p className="text-sm font-semibold">{displayName}</p>
                    <button
                      type="button"
                      onClick={() => setSelectedMediaItem(null)}
                      className="text-xs text-zinc-400 hover:text-white"
                    >
                      ✕
                    </button>
                  </div>
                  <div className="mb-4 rounded-xl border border-white/10 bg-white/5 p-3">
                    <p className="mb-1 text-[10px] font-semibold uppercase tracking-wide text-zinc-400">Prompt</p>
                    <p className="text-xs text-zinc-200">{selectedMediaItem.prompt}</p>
                  </div>
                  <div className="mb-4 rounded-xl border border-white/10 bg-white/5 p-3">
                    <p className="mb-2 text-[10px] font-semibold uppercase tracking-wide text-zinc-400">Information</p>
                    <div className="space-y-2 text-xs text-zinc-300">
                      <div className="flex items-center justify-between"><span>Modell</span><span>{selectedMediaItem.model ?? "Nano Banana Pro"}</span></div>
                      <div className="flex items-center justify-between"><span>Qualität</span><span>{selectedMediaItem.resolution}</span></div>
                      <div className="flex items-center justify-between"><span>Größe</span><span>{mediaImageDimensions[selectedMediaItem.id] ?? "Lädt..."}</span></div>
                    </div>
                  </div>
                  <div className="mb-4 rounded-xl border border-white/10 bg-white/5 p-3">
                    <p className="mb-2 text-[10px] font-semibold uppercase tracking-wide text-zinc-400">Referenzbild</p>
                    {selectedMediaItem.referenceImageUrl ? (
                      <img src={selectedMediaItem.referenceImageUrl} alt="Referenzbild" className="h-24 w-24 rounded-lg object-cover" />
                    ) : (
                      <p className="text-xs text-zinc-500">Kein Referenzbild hinterlegt.</p>
                    )}
                  </div>
                  <div className="mb-4 rounded-xl border border-white/10 bg-white/5 p-3">
                    <p className="mb-2 text-[10px] font-semibold uppercase tracking-wide text-zinc-400">Kommentare</p>
                    <div className="mb-2 max-h-24 space-y-1 overflow-auto">
                      {(mediaCommentsById[selectedMediaItem.id] ?? []).length === 0 ? (
                        <p className="text-xs text-zinc-500">Noch keine Kommentare.</p>
                      ) : (
                        (mediaCommentsById[selectedMediaItem.id] ?? []).map((comment, idx) => (
                          <p key={`${selectedMediaItem.id}-comment-${idx}`} className="text-xs text-zinc-300">
                            - {comment}
                          </p>
                        ))
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <input
                        value={mediaCommentInput}
                        onChange={(e) => setMediaCommentInput(e.target.value)}
                        placeholder="Kommentar hinzufügen..."
                        className="h-8 w-full rounded-md border border-white/10 bg-[#0f141e] px-2 text-xs text-zinc-100 outline-none"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          const value = mediaCommentInput.trim();
                          if (!value) return;
                          setMediaCommentsById((prev) => ({
                            ...prev,
                            [selectedMediaItem.id]: [...(prev[selectedMediaItem.id] ?? []), value],
                          }));
                          setMediaCommentInput("");
                        }}
                        className="h-8 rounded-md border border-white/15 px-2 text-xs"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      void downloadMediaItem(selectedMediaItem);
                    }}
                    className="h-9 w-full rounded-lg border border-white/15 text-xs text-zinc-200"
                  >
                    Download
                  </button>
                </aside>
              </div>
            </div>
          ) : null}
        </section>
      );
    }

    if (selectedTab === "Einstellungen") {
      return (
        <section data-onboarding="team-overview" className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Profil-Einstellungen</h2>
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

    if (selectedTab === "Team") {
      return (
        <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Team verwalten</h2>
            <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700 dark:bg-gray-800 dark:text-gray-300">
              {teamMembers.length} Mitglieder
            </span>
          </div>
          <div className="grid gap-3 md:grid-cols-4">
            <input
              value={teamInviteEmail}
              onChange={(e) => setTeamInviteEmail(e.target.value)}
              placeholder="E-Mail"
              className="h-10 rounded-md border border-gray-300 px-3 text-sm dark:border-gray-700 dark:bg-gray-950"
            />
            <input
              value={teamInviteName}
              onChange={(e) => setTeamInviteName(e.target.value)}
              placeholder="Name (optional)"
              className="h-10 rounded-md border border-gray-300 px-3 text-sm dark:border-gray-700 dark:bg-gray-950"
            />
            <select
              value={teamInviteRole}
              onChange={(e) => setTeamInviteRole(e.target.value as "admin" | "editor" | "viewer")}
              className="h-10 rounded-md border border-gray-300 px-3 text-sm dark:border-gray-700 dark:bg-gray-950"
            >
              <option value="admin">Admin</option>
              <option value="editor">Editor</option>
              <option value="viewer">Viewer</option>
            </select>
            <button
              type="button"
              disabled={teamSaving || !teamInviteEmail}
              onClick={() => {
                void inviteTeamMember();
              }}
              className="h-10 rounded-md bg-[#c65a20] px-4 text-sm font-medium text-white hover:bg-[#b14f1c] disabled:opacity-50"
            >
              {teamSaving ? "Einladen..." : "Einladung senden"}
            </button>
          </div>
          {teamMessage ? <p className="mt-3 text-sm text-gray-600 dark:text-gray-300">{teamMessage}</p> : null}
          <div className="mt-6 space-y-3">
            {teamMembers.map((member) => (
              <article key={member.id} className="rounded-lg border border-gray-200 p-3 dark:border-gray-700">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{member.name}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{member.email}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {member.status === "invited" ? "Einladung offen" : "Aktiv"} • {formatRelativeTime(member.invitedAt)}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <select
                      disabled={member.role === "owner"}
                      value={member.role}
                      onChange={(e) => {
                        void updateTeamRole(member.id, e.target.value as "admin" | "editor" | "viewer");
                      }}
                      className="h-8 rounded-md border border-gray-300 px-2 text-xs dark:border-gray-700 dark:bg-gray-950"
                    >
                      <option value="owner">Owner</option>
                      <option value="admin">Admin</option>
                      <option value="editor">Editor</option>
                      <option value="viewer">Viewer</option>
                    </select>
                    {member.role !== "owner" ? (
                      <button
                        type="button"
                        onClick={() => {
                          void removeTeamMember(member.id);
                        }}
                        className="h-8 rounded-md border border-red-200 px-2 text-xs text-red-600 hover:bg-red-50 dark:border-red-900/50 dark:text-red-300"
                      >
                        Entfernen
                      </button>
                    ) : null}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      );
    }

    if (selectedTab === "Admin Center" && isAdmin) {
      return (
        <section className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-800 dark:bg-gray-900">
          <AdminDashboard />
        </section>
      );
    }

    if (selectedTab === "Hilfe & Support") {
      return (
        <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
          <h2 className="mb-2 text-xl font-semibold text-gray-900 dark:text-gray-100">Hilfe & Support</h2>
          <p className="mb-6 text-sm text-gray-600 dark:text-gray-400">
            Erreiche den Support direkt oder nutze die Schnellhilfe für typische Fragen.
          </p>
          <div className="grid gap-3 md:grid-cols-2">
            <a href="mailto:support@evglab.ai" className="rounded-lg border border-gray-200 p-4 text-sm hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800">
              <p className="font-semibold text-gray-900 dark:text-gray-100">E-Mail Support</p>
              <p className="mt-1 text-gray-600 dark:text-gray-400">support@evglab.ai</p>
            </a>
            <a href="/impressum" className="rounded-lg border border-gray-200 p-4 text-sm hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800">
              <p className="font-semibold text-gray-900 dark:text-gray-100">Kontakt & Impressum</p>
              <p className="mt-1 text-gray-600 dark:text-gray-400">Direkte Kontaktwege und Unternehmensdaten.</p>
            </a>
          </div>
          <div className="mt-6 rounded-xl border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-950">
            <p className="mb-2 text-sm font-semibold text-gray-900 dark:text-gray-100">Support-Nachricht senden</p>
            <input
              value={supportSubject}
              onChange={(e) => setSupportSubject(e.target.value)}
              placeholder="Betreff"
              className="mb-2 h-10 w-full rounded-md border border-gray-300 bg-white px-3 text-sm dark:border-gray-700 dark:bg-gray-900"
            />
            <textarea
              value={supportMessage}
              onChange={(e) => setSupportMessage(e.target.value)}
              placeholder="Beschreibe kurz dein Anliegen..."
              className="h-28 w-full rounded-md border border-gray-300 bg-white p-3 text-sm dark:border-gray-700 dark:bg-gray-900"
            />
            <div className="mt-3 flex items-center gap-3">
              <button
                type="button"
                onClick={() => {
                  if (!supportSubject || !supportMessage) {
                    setSupportInfoMessage("Bitte Betreff und Nachricht ausfüllen.");
                    return;
                  }
                  const mailto = `mailto:support@evglab.ai?subject=${encodeURIComponent(supportSubject)}&body=${encodeURIComponent(supportMessage)}`;
                  window.location.href = mailto;
                  setSupportInfoMessage("Mail-App wurde geöffnet.");
                }}
                className="h-9 rounded-md bg-[#c65a20] px-4 text-sm font-medium text-white hover:bg-[#b14f1c]"
              >
                Support kontaktieren
              </button>
              {supportInfoMessage ? <p className="text-xs text-gray-600 dark:text-gray-300">{supportInfoMessage}</p> : null}
            </div>
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
            <p className="text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400">Priorität</p>
            <p className="mt-2 text-sm font-semibold text-gray-900 dark:text-gray-100">Heute weiterarbeiten</p>
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">3 Aufgaben warten auf dich</p>
          </div>
          <div className="rounded-xl border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-950/60">
            <p className="text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400">Status</p>
            <p className="mt-2 text-sm font-semibold text-gray-900 dark:text-gray-100">Alles synchron</p>
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">Letztes Update vor 2 Minuten</p>
          </div>
          <div className="rounded-xl border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-950/60">
            <p className="text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400">Nächster Schritt</p>
            <p className="mt-2 text-sm font-semibold text-gray-900 dark:text-gray-100">Bereich konfigurieren</p>
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">Design bleibt konsistent zum Dashboard</p>
          </div>
        </div>
      </section>
    );
  };

  return (
    <div
      className={cn(
        "relative flex-1 overflow-auto px-3 pb-[calc(5.75rem+env(safe-area-inset-bottom))] pt-3 sm:p-6",
        isCreationTab ? "bg-[#070b13]" : "bg-gray-50 dark:bg-gray-950",
      )}
    >
      {isCreationTab ? (
        <>
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_8%,rgba(112,78,255,0.30),transparent_48%),radial-gradient(90%_60%_at_50%_38%,rgba(44,108,255,0.16),transparent_55%),radial-gradient(90%_120%_at_50%_100%,rgba(98,56,196,0.2),transparent_62%)]" />
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.16),rgba(0,0,0,0.45))]" />
        </>
      ) : null}
      {isCheckoutLoading ? (
        <div className="fixed inset-0 z-[120] flex items-center justify-center bg-black/55 px-4">
          <div className="w-full max-w-sm rounded-2xl border border-white/20 bg-gray-950/95 p-6 text-white shadow-2xl">
            <div className="mb-4 flex items-center gap-3">
              <div className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
              <p className="text-sm font-semibold">{checkoutMessage}</p>
            </div>
            <p className="text-xs text-gray-200">Bitte kurz warten. Stripe wird in einem Moment geöffnet.</p>
          </div>
        </div>
      ) : null}
      {showCreditsOffer ? (
        <div className="fixed inset-0 z-[125] flex items-center justify-center bg-black/60 px-4">
          <div className="w-full max-w-md rounded-2xl border border-orange-200 bg-white p-6 shadow-2xl dark:border-orange-900/40 dark:bg-gray-900">
            <div className="mb-3 inline-flex items-center rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-orange-700 dark:bg-orange-900/30 dark:text-orange-300">
              Willkommen-Bonus
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Du bekommst 300 freie Credits</h3>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
              Klicke auf den Button, um deine Credits freizuschalten. Die Freischaltung erfolgt im Abo-Checkout.
            </p>
            <button
              type="button"
              onClick={() => {
                void handleClaimCredits();
              }}
              className="mt-5 inline-flex h-11 w-full items-center justify-center rounded-md bg-[#c65a20] px-4 text-sm font-semibold text-white transition hover:bg-[#b14f1c]"
            >
              300 Credits sichern und Abo starten
            </button>
          </div>
        </div>
      ) : null}
      <OnboardingDialog
        open={showOnboarding}
        onClose={closeOnboarding}
        steps={DASHBOARD_ONBOARDING_STEPS}
        onStepChange={(step) => {
          const navStep = step.targetSelector.includes('data-onboarding-nav="');
          if (navStep) {
            setTopNavMenuOpen(true);
          } else if (step.targetSelector.includes('data-onboarding-nav-toggle="main"')) {
            setTopNavMenuOpen(false);
          }
          if (step.tab) {
            window.requestAnimationFrame(() => {
              setSelectedTab(step.tab as DashboardTab);
            });
          }
        }}
      />
      <OnboardingDialog
        open={showContentTour}
        onClose={() => setShowContentTour(false)}
        steps={CONTENT_CREATION_TOUR_STEPS}
        onStepChange={(step) => {
          setTopNavMenuOpen(false);
          if (step.tab) {
            window.requestAnimationFrame(() => {
              setSelectedTab(step.tab as DashboardTab);
            });
          }
        }}
      />
      {globalErrorMessage ? (
        <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700 dark:border-red-900/40 dark:bg-red-900/20 dark:text-red-300">
          {globalErrorMessage}
        </div>
      ) : null}
      <div
        className={cn(
          "mb-4 sticky top-0 z-40 flex w-full items-center justify-between gap-3 rounded-2xl px-3 pb-3 pt-[max(0.65rem,env(safe-area-inset-top))] sm:-mx-6 sm:mb-6 sm:rounded-none sm:px-6 sm:py-3",
          isCreationTab
            ? "bg-transparent"
            : "border-b border-gray-200/80 bg-gray-50/95 backdrop-blur dark:border-gray-800/80 dark:bg-gray-950/90",
        )}
      >
        <div className="flex min-w-0 items-center gap-2 whitespace-nowrap">
          <button
            type="button"
            onClick={() => {
              if (typeof window === "undefined") return;
              window.location.assign("/");
            }}
            className="inline-flex h-10 shrink-0 items-center gap-2 rounded-xl border border-white/10 bg-[#171a20] px-2.5 text-sm font-medium text-white shadow-[0_8px_20px_-14px_rgba(0,0,0,0.7)] transition hover:bg-[#1e232b]"
            title="Zur Startseite"
          >
            <span className="font-semibold tracking-tight text-white">EvGLab</span>
            <span className="hidden text-xs text-zinc-300 sm:inline">Startseite</span>
          </button>
          <div
            className={cn(
              "hidden md:flex items-center gap-2 overflow-hidden transition-all duration-300 ease-[cubic-bezier(0.2,0.8,0.2,1)]",
              topNavMenuOpen ? "max-w-[1200px] translate-x-0 opacity-100" : "pointer-events-none max-w-0 -translate-x-2 opacity-0",
            )}
          >
            {topTabs.map(({ title, Icon, notifs }) => {
              const isActive = selectedTab === title;
              return (
                <button
                  key={title}
                  type="button"
                  onClick={() => setSelectedTab(title)}
                  data-onboarding-nav={
                    title === "Dashboard"
                      ? "dashboard"
                      : title === "Prompt-Erstellung"
                        ? "prompt"
                      : title === "Inhalte erstellen"
                        ? "content"
                        : title === "Mediathek"
                          ? "library"
                          : title === "Abo & Tokens"
                            ? "billing"
                            : title === "Team"
                              ? "team"
                              : title === "Einstellungen" || title === "Admin Center"
                                ? "settings"
                                : "support"
                  }
                  className={cn(
                    "relative inline-flex h-10 shrink-0 items-center gap-2 rounded-xl border px-3 text-sm font-medium leading-none whitespace-nowrap shadow-[0_8px_20px_-14px_rgba(0,0,0,0.7)] transition",
                    isActive
                      ? "border-[#2f66ff]/40 bg-[#1d2f6f] text-white"
                      : "border-white/10 bg-[#171a20] text-zinc-100 hover:bg-[#1e232b]",
                  )}
                >
                  <Icon className={cn("h-4 w-4", tabIconClassByTitle[title])} />
                  {title}
                  {notifs ? (
                    <span className="ml-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-[#2f66ff] px-1.5 text-[10px] font-semibold text-white">
                      {notifs}
                    </span>
                  ) : null}
                </button>
              );
            })}
          </div>
          <div
            className={cn(
              "hidden md:block overflow-hidden transition-all duration-300 ease-[cubic-bezier(0.2,0.8,0.2,1)]",
              topNavMenuOpen ? "pointer-events-none max-w-0 opacity-0" : "max-w-[320px] opacity-100",
            )}
          >
            {(() => {
              const activeTab = topTabs.find((tab) => tab.title === selectedTab);
              const ActiveIcon = activeTab?.Icon ?? Home;
              return (
                <button
                  type="button"
                  className="relative inline-flex h-10 shrink-0 items-center gap-2 rounded-xl border border-[#2f66ff]/40 bg-[#1d2f6f] px-3 text-sm font-medium leading-none text-white shadow-[0_8px_20px_-14px_rgba(0,0,0,0.7)]"
                >
                  <ActiveIcon className={cn("h-4 w-4", tabIconClassByTitle[selectedTab])} />
                  {selectedTab}
                </button>
              );
            })()}
          </div>
        </div>
        <div className="flex h-10 shrink-0 items-center gap-2">
          <button
            type="button"
            onClick={() => setTopNavMenuOpen((prev) => !prev)}
            data-onboarding-nav-toggle="main"
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-[#171a20] text-white shadow-[0_8px_20px_-14px_rgba(0,0,0,0.7)] transition hover:bg-[#1e232b]"
            aria-label="Navigation ein-/ausklappen"
            aria-expanded={topNavMenuOpen}
          >
            <ChevronDown className={cn("h-4 w-4 transition-transform duration-300 md:hidden", topNavMenuOpen ? "rotate-180" : "rotate-0")} />
            <ChevronsRight className={cn("hidden h-4 w-4 transition-transform duration-300 md:block", topNavMenuOpen ? "rotate-180" : "rotate-0")} />
          </button>
          <button
            type="button"
            onClick={() => setSelectedTab("Abo & Tokens")}
            data-onboarding-nav="billing"
            className="relative inline-flex h-10 items-center gap-1.5 rounded-xl border border-white/10 bg-[#171a20] px-3 text-sm font-medium leading-none text-white shadow-[0_8px_20px_-14px_rgba(0,0,0,0.7)] transition hover:bg-[#1e232b]"
          >
            <Gem className="h-3.5 w-3.5" />
            Pakete
          </button>
          <div className="relative" ref={bellMenuRef}>
            <button
              type="button"
              onClick={() => {
                setBellMenuOpen((prev) => !prev);
                setProfileMenuOpen(false);
              }}
              className="relative inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-[#171a20] leading-none text-white shadow-[0_8px_20px_-14px_rgba(0,0,0,0.7)] transition hover:bg-[#1e232b]"
              aria-label="Benachrichtigungen"
              aria-expanded={bellMenuOpen}
              aria-haspopup="menu"
            >
              <Bell className="h-4 w-4" />
              {bellUnreadCount > 0 ? (
                <span className="absolute -right-1 -top-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-[#c8ff26] px-1 text-[10px] font-bold text-black">
                  {bellUnreadCount}
                </span>
              ) : null}
            </button>
            {bellMenuOpen ? (
              <div className="absolute right-0 top-[calc(100%+0.5rem)] z-50 w-80 overflow-hidden rounded-2xl border border-white/10 bg-[#12151b] text-white shadow-[0_24px_40px_-24px_rgba(0,0,0,0.9)]">
                <div className="flex items-center justify-between border-b border-white/10 px-3 py-2">
                  <p className="text-sm font-semibold">Updates</p>
                  <button
                    type="button"
                    onClick={() => setBellReadIds(bellNotifications.map((item) => item.id))}
                    className="text-xs font-medium text-zinc-300 transition hover:text-white"
                  >
                    Alle gelesen
                  </button>
                </div>
                <div className="max-h-80 overflow-auto p-2">
                  {bellNotifications.length === 0 ? (
                    <p className="rounded-lg bg-white/5 px-3 py-2 text-xs text-zinc-300">Keine neuen Updates.</p>
                  ) : (
                    bellNotifications.map((item) => (
                      <div key={item.id} className="mb-2 rounded-xl border border-white/10 bg-white/5 p-3 last:mb-0">
                        <div className="mb-1 flex items-center justify-between gap-2">
                          <p className="text-sm font-semibold text-white">{item.title}</p>
                          {!bellReadIds.includes(item.id) ? (
                            <span
                              className={cn(
                                "inline-flex h-2.5 w-2.5 rounded-full",
                                item.tone === "warning"
                                  ? "bg-amber-300"
                                  : item.tone === "success"
                                    ? "bg-emerald-300"
                                    : item.tone === "info"
                                      ? "bg-sky-300"
                                      : "bg-zinc-300",
                              )}
                            />
                          ) : null}
                        </div>
                        <p className="text-xs text-zinc-300">{item.description}</p>
                        <button
                          type="button"
                          onClick={() => {
                            item.onAction();
                            setBellReadIds((prev) => (prev.includes(item.id) ? prev : [...prev, item.id]));
                            setBellMenuOpen(false);
                          }}
                          className="mt-2 inline-flex h-7 items-center rounded-md border border-white/15 bg-white/5 px-2.5 text-xs font-medium text-white transition hover:bg-white/10"
                        >
                          {item.actionLabel}
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </div>
            ) : null}
          </div>
          <button
            type="button"
            onClick={() => setProfileMenuOpen((prev) => !prev)}
            className="relative inline-flex h-10 w-10 items-center justify-center rounded-full p-[2px] leading-none transition hover:scale-[1.02]"
            style={{
              background: `conic-gradient(#c8ff26 0% ${creditFillPercent}%, rgba(255,255,255,0.16) ${creditFillPercent}% 100%)`,
              boxShadow:
                creditFillPercent > 0
                  ? "0 0 0 1px rgba(192,255,0,0.75), 0 0 14px rgba(192,255,0,0.45)"
                  : "0 0 0 1px rgba(255,255,255,0.18)",
            }}
            title="Profil-Menü öffnen"
            aria-expanded={profileMenuOpen}
            aria-haspopup="menu"
          >
            <span className="h-full w-full rounded-full border border-black/40 bg-[#d4ff37]" />
          </button>
        </div>
      </div>
      <div
        className={cn(
          "mb-4 overflow-hidden rounded-xl border border-white/10 bg-[#111827] md:hidden transition-all duration-300",
          topNavMenuOpen ? "max-h-[460px] p-2 opacity-100" : "pointer-events-none max-h-0 p-0 opacity-0 border-transparent",
        )}
      >
        <div className="grid grid-cols-1 gap-2">
          {topTabs.map(({ title, Icon, notifs }) => {
            const isActive = selectedTab === title;
            return (
              <button
                key={`mobile-${title}`}
                type="button"
                data-onboarding-nav={
                  title === "Dashboard"
                    ? "dashboard"
                    : title === "Prompt-Erstellung"
                      ? "prompt"
                      : title === "Inhalte erstellen"
                        ? "content"
                        : title === "Mediathek"
                          ? "library"
                          : title === "Abo & Tokens"
                            ? "billing"
                            : title === "Team"
                              ? "team"
                              : title === "Einstellungen" || title === "Admin Center"
                                ? "settings"
                                : "support"
                }
                onClick={() => {
                  setSelectedTab(title);
                  setTopNavMenuOpen(false);
                }}
                className={cn(
                  "flex h-10 items-center justify-between rounded-lg border px-3 text-left text-sm font-medium transition",
                  isActive
                    ? "border-[#2f66ff]/40 bg-[#1d2f6f] text-white"
                    : "border-white/10 bg-[#171a20] text-zinc-100 hover:bg-[#1e232b]",
                )}
              >
                <span className="inline-flex items-center gap-2">
                  <Icon className={cn("h-4 w-4", tabIconClassByTitle[title])} />
                  {title}
                </span>
                {notifs ? (
                  <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-[#2f66ff] px-1.5 text-[10px] font-semibold text-white">
                    {notifs}
                  </span>
                ) : null}
              </button>
            );
          })}
        </div>
      </div>
      <div
        className={cn(
          "mb-6 flex flex-col gap-4 sm:mb-8 sm:flex-row sm:items-start sm:justify-between",
          selectedTab !== "Inhalte erstellen" && selectedTab !== "Prompt-Erstellung" && selectedTab !== "Abo & Tokens"
            ? ""
            : "justify-end",
        )}
      >
        {selectedTab !== "Inhalte erstellen" && selectedTab !== "Prompt-Erstellung" && selectedTab !== "Abo & Tokens" ? (
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 sm:text-3xl">{tabTitle}</h1>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400 sm:text-base">{tabDescriptions[selectedTab]}</p>
          {isAdmin ? (
            <p className="mt-1 inline-flex rounded-full bg-orange-50 px-2 py-0.5 text-xs font-medium text-[#c65a20] dark:bg-orange-900/30 dark:text-orange-300">
              Admin-Modus aktiv
            </p>
          ) : null}
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Angemeldet als {displayName}</p>
          {userEmail ? <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{userEmail}</p> : null}
        </div>
        ) : null}
        <div className="relative" ref={profileMenuRef}>
          {profileMenuOpen ? (
            <div className="fixed right-3 top-[calc(env(safe-area-inset-top)+3.75rem)] z-[130] w-[min(84vw,20rem)] overflow-hidden rounded-2xl border border-white/10 bg-[#12151b] text-white shadow-[0_24px_40px_-24px_rgba(0,0,0,0.9)] sm:absolute sm:right-0 sm:top-1 sm:w-64">
                <div className="border-b border-white/5 px-4 py-3">
                  <p className="truncate text-sm font-semibold text-white">{displayName}</p>
                  <p className="text-xs text-zinc-400">Free Plan</p>
                </div>
                <div className="border-b border-white/5 px-4 py-3">
                  <div className="mb-2 flex items-center justify-between text-sm font-semibold text-white">
                    <span>{remainingTokens.toLocaleString("de-DE")} credits available</span>
                    <ChevronDown className="-rotate-90 h-3.5 w-3.5 text-zinc-500" />
                  </div>
                  <div className="h-2 rounded-full bg-white/10">
                    <div className="h-full rounded-full bg-[#c8ff26] transition-[width] duration-300" style={{ width: `${creditFillPercent}%` }} />
                  </div>
                </div>
                <div className="px-3 py-2">
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedTab("Abo & Tokens");
                      setProfileMenuOpen(false);
                    }}
                    className="flex w-full items-center justify-between rounded-xl border border-white/10 bg-white/5 px-3 py-2 transition hover:bg-white/10"
                  >
                    <span className="inline-flex items-center gap-2 text-sm font-semibold text-white">
                      <Crown className="h-4 w-4 text-[#c8ff26]" />
                      Go Premium
                    </span>
                    <span className="rounded-full bg-[#c8ff26] px-2 py-1 text-xs font-semibold text-black">Upgrade</span>
                  </button>
                </div>
                <div className="px-2 pb-2">
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedTab("Einstellungen");
                      setProfileMenuOpen(false);
                    }}
                    className="flex w-full items-center gap-2 rounded-lg px-2 py-2 text-left text-sm font-medium text-zinc-100 transition hover:bg-white/10"
                  >
                    <User className="h-4 w-4 text-zinc-300" />
                    View profile
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedTab("Einstellungen");
                      setProfileMenuOpen(false);
                    }}
                    className="flex w-full items-center gap-2 rounded-lg px-2 py-2 text-left text-sm font-medium text-zinc-100 transition hover:bg-white/10"
                  >
                    <Settings className="h-4 w-4 text-zinc-300" />
                    Manage account
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setProfileMenuOpen(false);
                      handleRestartOnboardingGlobal();
                    }}
                    className="flex w-full items-center gap-2 rounded-lg px-2 py-2 text-left text-sm font-medium text-zinc-100 transition hover:bg-white/10"
                  >
                    <RotateCcw className="h-4 w-4 text-zinc-300" />
                    Onboarding neu starten
                  </button>
                  <div className="my-1 border-t border-white/10" />
                  <button
                    type="button"
                    onClick={() => {
                      setProfileMenuOpen(false);
                      window.location.href = "/auth/signout";
                    }}
                    className="flex w-full items-center gap-2 rounded-lg px-2 py-2 text-left text-sm font-semibold text-white transition hover:bg-white/10"
                  >
                    <LogOut className="h-4 w-4 text-zinc-300" />
                    Sign out
                  </button>
                </div>
            </div>
          ) : null}
        </div>
      </div>

      <div className={selectedTab === "Prompt-Erstellung" ? "block" : "hidden"} aria-hidden={selectedTab !== "Prompt-Erstellung"}>
        <div className="relative isolate min-h-[calc(100vh-5.5rem)] overflow-hidden bg-transparent px-4 py-6 sm:px-6 sm:py-8">
          <div className="relative mx-auto flex min-h-[calc(100vh-8.5rem)] w-full max-w-5xl flex-col justify-center gap-3">
            <PromptInputBox
              value={hybridInputValue}
              onValueChange={setHybridInputValue}
              modelLabel="Claude"
              modelBadgeText="C"
              showAspectRatioBadge={false}
              showResolutionBadge={false}
              showImageUpload={false}
              placeholder={
                hybridCurrentQuestion
                  ? "Antworte kurz und konkret..."
                  : "Beschreibe dein Wunschbild. Wir analysieren alles und bauen den finalen Prompt für dich."
              }
              className="border-white/10 bg-[#0f1420]/90"
              isLoading={hybridIsLoading}
              enableTypingPlaceholder={!hybridCurrentQuestion}
              typingPhrases={[
                "Erstelle mir einen Prompt für ein Weizenbier mit goldener Abendstimmung im Biergarten.",
                "Ich brauche ein heroisches Produktbild für ein Pils mit Flasche und Glas im Studio.",
                "Schreibe einen Kampagnen-Prompt für ein Sommermotiv mit frischen, natürlichen Farben.",
              ]}
              onSend={(message) => {
                void submitHybridInput(message);
              }}
            />
            {hybridCurrentQuestion ? (
              <div className="rounded-xl border border-white/10 bg-[#121827]/80 p-4 text-sm text-zinc-100">
                <p className="text-xs font-semibold uppercase tracking-wide text-[#c8ff26]">Follow-up</p>
                <p className="mt-1">{hybridCurrentQuestion}</p>
              </div>
            ) : null}
            {hybridFinalPrompt ? (
              <div className="rounded-xl border border-[#c8ff26]/35 bg-[#10181f]/90 p-4">
                <div className="mb-2 flex items-center justify-between gap-2">
                  <p className="text-sm font-semibold text-[#c8ff26]">Finaler Prompt</p>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setContentDraftPrompt(hybridFinalPrompt);
                        setSelectedTab("Inhalte erstellen");
                      }}
                      className="inline-flex h-8 items-center rounded-lg bg-[#c8ff26] px-3 text-xs font-semibold text-black transition hover:bg-[#d7ff56]"
                    >
                      In Inhalte erstellen
                    </button>
                    <button
                      type="button"
                      onClick={async () => {
                        await navigator.clipboard.writeText(hybridFinalPrompt);
                        setHybridCopied(true);
                        window.setTimeout(() => setHybridCopied(false), 1400);
                      }}
                      className="inline-flex h-8 items-center rounded-lg border border-white/15 bg-white/5 px-3 text-xs font-semibold text-zinc-100 transition hover:bg-white/10"
                    >
                      {hybridCopied ? "Kopiert" : "Kopieren"}
                    </button>
                  </div>
                </div>
                <pre className="max-h-52 overflow-auto whitespace-pre-wrap text-xs text-zinc-200">{hybridFinalPrompt}</pre>
              </div>
            ) : null}
            {hybridError ? (
              <div className="rounded-xl border border-red-400/30 bg-red-500/10 px-3 py-2 text-sm text-red-200">{hybridError}</div>
            ) : null}
          </div>
        </div>
      </div>
      {selectedTab !== "Prompt-Erstellung" ? renderTabPanel() : null}
      <nav
        className="fixed inset-x-3 bottom-[max(0.6rem,env(safe-area-inset-bottom))] z-[95] rounded-2xl border border-white/10 bg-[#10141d]/95 p-2 shadow-[0_20px_44px_-24px_rgba(0,0,0,0.9)] backdrop-blur md:hidden"
        aria-label="Mobile Dashboard Navigation"
      >
        <div className="grid grid-cols-4 items-end gap-1">
          <button
            type="button"
            onClick={() => {
              setSelectedTab("Dashboard");
              setTopNavMenuOpen(false);
              setProfileMenuOpen(false);
            }}
            className={cn(
              "inline-flex min-h-12 flex-col items-center justify-center gap-1 rounded-xl px-2 text-[11px] font-medium transition",
              selectedTab === "Dashboard" ? "bg-white/10 text-white" : "text-zinc-400 hover:text-zinc-200",
            )}
          >
            <Home className="h-4 w-4" />
            Dashboard
          </button>
          <button
            type="button"
            onClick={() => {
              setSelectedTab("Prompt-Erstellung");
              setTopNavMenuOpen(false);
              setProfileMenuOpen(false);
            }}
            className="inline-flex min-h-12 flex-col items-center justify-center gap-1 rounded-xl px-2 text-[11px] font-medium text-zinc-300 transition hover:text-zinc-100"
          >
            <Wand2 className="h-4 w-4" />
            Generieren
          </button>
          <button
            type="button"
            onClick={() => {
              setSelectedTab("Mediathek");
              setTopNavMenuOpen(false);
              setProfileMenuOpen(false);
            }}
            className={cn(
              "inline-flex min-h-12 flex-col items-center justify-center gap-1 rounded-xl px-2 text-[11px] font-medium transition",
              selectedTab === "Mediathek" ? "bg-white/10 text-white" : "text-zinc-400 hover:text-zinc-200",
            )}
          >
            <Image className="h-4 w-4" />
            Mediathek
          </button>
          <button
            type="button"
            onClick={() => {
              setProfileMenuOpen((prev) => !prev);
              setTopNavMenuOpen(false);
            }}
            className={cn(
              "inline-flex min-h-12 flex-col items-center justify-center gap-1 rounded-xl px-2 text-[11px] font-medium transition",
              profileMenuOpen ? "bg-white/10 text-white" : "text-zinc-400 hover:text-zinc-200",
            )}
          >
            <User className="h-4 w-4" />
            Profil
          </button>
        </div>
        <button
          type="button"
          onClick={() => {
            setSelectedTab("Inhalte erstellen");
            setTopNavMenuOpen(false);
            setProfileMenuOpen(false);
          }}
          className="pointer-events-auto absolute left-1/2 top-0 inline-flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-2xl bg-[#c8ff26] text-black shadow-[0_12px_30px_-16px_rgba(200,255,38,0.9)] transition hover:scale-[1.03]"
          aria-label="Direkt zu Inhalte erstellen"
        >
          <Sparkles className="h-5 w-5" />
        </button>
      </nav>
    </div>
  );
};

export default Example;
