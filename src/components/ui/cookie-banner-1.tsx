"use client";

import { useEffect, useRef, useState } from "react";
import { Cookie, Shield, Info, X, ChevronDown, ChevronUp, Check } from "lucide-react";
import { cn } from "@/lib/utils";

export type CookieBannerPrefs = {
  necessary: boolean;
  functional: boolean;
  analytics: boolean;
  marketing: boolean;
};

interface CookiePanelProps {
  title?: string;
  message?: string;
  acceptText?: string;
  customizeText?: string;
  icon?: "cookie" | "shield" | "info";
  className?: string;
  privacyHref?: string;
  termsHref?: string;
  storageEnabled?: boolean;
  initialOpen?: boolean;
  initialPrefs?: Partial<CookieBannerPrefs>;
  forceOpenToken?: number;
  onAcceptAll?: () => void;
  onSavePreferences?: (prefs: CookieBannerPrefs) => void;
  onClose?: () => void;
  theme?: "default" | "dark";
  privacyText?: string;
  termsText?: string;
  andText?: string;
  seeOurText?: string;
  requiredText?: string;
  necessaryTitle?: string;
  necessaryDesc?: string;
  functionalTitle?: string;
  functionalDesc?: string;
  analyticsTitle?: string;
  analyticsDesc?: string;
  marketingTitle?: string;
  marketingDesc?: string;
  cancelText?: string;
  savePreferencesText?: string;
}

const DEFAULT_PREFS: CookieBannerPrefs = {
  necessary: true,
  functional: false,
  analytics: false,
  marketing: false,
};

const CookiePanel = (props: CookiePanelProps) => {
  const {
    title = "This site uses cookies",
    message = "We use cookies to enhance your experience.",
    acceptText = "Accept all",
    customizeText = "Customize",
    icon = "cookie",
    className,
    privacyHref = "/privacy",
    termsHref = "/terms",
    storageEnabled = true,
    initialOpen = false,
    initialPrefs,
    forceOpenToken,
    onAcceptAll,
    onSavePreferences,
    onClose,
    theme = "default",
    privacyText = "Datenschutzerklärung",
    termsText = "AGB",
    andText = "und",
    seeOurText = "Mehr in unserer",
    requiredText = "erforderlich",
    necessaryTitle = "Notwendige",
    necessaryDesc = "Erforderlich für die Grundfunktionen der Website.",
    functionalTitle = "Funktional",
    functionalDesc = "Speichert deine Präferenzen.",
    analyticsTitle = "Analyse",
    analyticsDesc = "Hilft uns, die Website zu verbessern.",
    marketingTitle = "Marketing",
    marketingDesc = "Personalisierte Inhalte und Werbung.",
    cancelText = "Abbrechen",
    savePreferencesText = "Auswahl speichern",
  } = props;
  const isDark = theme === "dark";

  const [visible, setVisible] = useState(false);
  const [render, setRender] = useState(false);
  const [showPrefs, setShowPrefs] = useState(false);
  const [prefs, setPrefs] = useState<CookieBannerPrefs>({
    ...DEFAULT_PREFS,
    ...initialPrefs,
    necessary: true,
  });

  const prefsRef = useRef<HTMLDivElement | null>(null);
  const [prefsHeight, setPrefsHeight] = useState<number>(0);

  useEffect(() => {
    if (initialPrefs) {
      setPrefs((current) => ({ ...current, ...initialPrefs, necessary: true }));
    }
  }, [initialPrefs]);

  useEffect(() => {
    if (!storageEnabled) {
      if (initialOpen) {
        setRender(true);
        requestAnimationFrame(() => setVisible(true));
      }
      return;
    }

    const stored = typeof window !== "undefined" ? localStorage.getItem("cookie-consent") : null;
    if (!stored) {
      setRender(true);
      requestAnimationFrame(() => setVisible(true));
    }

    const storedPrefs = localStorage.getItem("cookie-preferences");
    if (storedPrefs) {
      try {
        const parsed = JSON.parse(storedPrefs) as CookieBannerPrefs;
        setPrefs({ ...DEFAULT_PREFS, ...parsed, necessary: true });
      } catch {
        // ignore invalid stored preferences
      }
    }
  }, [initialOpen, storageEnabled]);

  useEffect(() => {
    if (forceOpenToken == null || forceOpenToken <= 0) return;
    setRender(true);
    setShowPrefs(true);
    requestAnimationFrame(() => setVisible(true));
  }, [forceOpenToken]);

  useEffect(() => {
    if (showPrefs && prefsRef.current) {
      const h = prefsRef.current.scrollHeight;
      setPrefsHeight(h);
    } else {
      setPrefsHeight(0);
    }
  }, [showPrefs, prefs]);

  const closeWithExit = (val?: "true" | "false") => {
    if (storageEnabled && val) localStorage.setItem("cookie-consent", val);
    setVisible(false);
    onClose?.();
    setTimeout(() => setRender(false), 300);
  };

  const savePreferences = () => {
    if (storageEnabled) {
      localStorage.setItem("cookie-preferences", JSON.stringify(prefs));
      localStorage.setItem("cookie-consent", "true");
    }

    onSavePreferences?.(prefs);
    setShowPrefs(false);
    setVisible(false);
    setTimeout(() => setRender(false), 300);
  };

  if (!render) return null;

  const IconEl = icon === "shield" ? Shield : icon === "info" ? Info : Cookie;

  const PrefRow = ({
    title: rowTitle,
    desc,
    field,
    locked,
  }: {
    title: string;
    desc: string;
    field: keyof CookieBannerPrefs;
    locked?: boolean;
  }) => (
    <div
      className={cn(
        "flex items-start gap-2 rounded-lg border p-2",
        isDark ? "border-white/15 bg-white/[0.02]" : "border-border",
      )}
    >
      <button
        type="button"
        disabled={locked}
        onClick={() => !locked && setPrefs((p) => ({ ...p, [field]: !p[field] }))}
        className={cn(
          "mt-0.5 inline-flex size-5 items-center justify-center rounded border",
          locked
            ? isDark
              ? "cursor-not-allowed border-white/15 bg-white/10 text-white/50"
              : "cursor-not-allowed border-border bg-muted text-muted-foreground"
            : isDark
              ? "cursor-pointer border-white/20 bg-transparent text-white hover:bg-white/10"
              : "cursor-pointer border-border bg-background hover:bg-accent",
        )}
        aria-pressed={prefs[field]}
        aria-label={`${rowTitle} cookie preference`}
      >
        {prefs[field] && <Check className="size-4" />}
      </button>

      <div className="flex-1">
        <div className={cn("text-xs font-medium", isDark && "text-white")}>
          {rowTitle} {locked && <span className={cn("text-[10px]", isDark ? "text-white/55" : "text-muted-foreground")}>({requiredText})</span>}
        </div>
        <p className={cn("mt-0.5 text-[10px]", isDark ? "text-white/60" : "text-muted-foreground")}>{desc}</p>
      </div>
    </div>
  );

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Cookie consent"
      className={cn("fixed right-4 bottom-4 z-50 w-[360px] max-w-[90vw] md:right-6 md:bottom-6")}
    >
      <div
        className={cn(
          "relative flex flex-col gap-3 rounded-xl border p-4 shadow-xl backdrop-blur",
          isDark
            ? "border-white/20 bg-[#0a0f14]/95 text-white"
            : "border-border/70 bg-card/95 text-card-foreground",
          visible ? cn("animate-in", "fade-in", "slide-in-from-bottom-8") : cn("animate-out", "fade-out", "slide-out-to-bottom-8"),
          "duration-300 ease-out",
          className,
        )}
      >
        <div className="flex items-center gap-3">
          <span
            className={cn(
              "inline-flex size-9 items-center justify-center rounded-lg ring-1",
              isDark ? "bg-white/10 text-white ring-white/20" : "bg-primary/10 text-primary ring-primary/20",
            )}
          >
            <IconEl className="size-5" aria-hidden="true" />
          </span>

          <h2 className="text-sm font-semibold leading-5">{title}</h2>

          <button
            type="button"
            onClick={() => closeWithExit()}
            className={cn(
              "ml-auto inline-flex size-8 cursor-pointer items-center justify-center rounded-md",
              isDark ? "hover:bg-white/10" : "hover:bg-foreground/5",
            )}
            aria-label="Close cookie banner"
          >
            <X className={cn("size-4", isDark ? "text-white/70" : "text-muted-foreground")} />
          </button>
        </div>

        <p className={cn("text-xs leading-5", isDark ? "text-white/75" : "text-muted-foreground")}>
          {message} {seeOurText}{" "}
          <a
            href={privacyHref}
            className={cn(
              "cursor-pointer underline underline-offset-4",
              isDark ? "hover:text-white" : "hover:text-foreground",
            )}
          >
            {privacyText}
          </a>{" "}
          {andText}{" "}
          <a
            href={termsHref}
            className={cn(
              "cursor-pointer underline underline-offset-4",
              isDark ? "hover:text-white" : "hover:text-foreground",
            )}
          >
            {termsText}
          </a>
          .
        </p>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setShowPrefs((p) => !p)}
            className={cn(
              "flex items-center gap-1 rounded-md border px-3 py-1.5 text-xs transition-colors",
              isDark
                ? "border-white/25 bg-white/10 text-white hover:bg-white/15"
                : "border-border/70 bg-muted text-muted-foreground hover:bg-muted/80",
              "cursor-pointer",
            )}
            aria-expanded={showPrefs}
            aria-controls="cookie-preferences-inline"
          >
            {customizeText}
            {showPrefs ? <ChevronUp className="size-3" /> : <ChevronDown className="size-3" />}
          </button>

          <button
            type="button"
            onClick={() => {
              onAcceptAll?.();
              closeWithExit("true");
            }}
            className={cn(
              "cursor-pointer rounded-md px-3 py-1.5 text-xs transition-colors",
              isDark
                ? "bg-[#c65a20] text-white hover:bg-[#d46830]"
                : "bg-primary text-primary-foreground hover:bg-primary/90",
            )}
          >
            {acceptText}
          </button>
        </div>

        <div
          id="cookie-preferences-inline"
          ref={prefsRef}
          style={{ height: prefsHeight ? `${prefsHeight}px` : 0 }}
          className="overflow-hidden transition-[height] duration-300 ease-out will-change-[height]"
        >
          {showPrefs && (
            <div className="mt-2 flex flex-col gap-2 animate-in fade-in slide-in-from-bottom-2 duration-200">
              <PrefRow title={necessaryTitle} desc={necessaryDesc} field="necessary" locked />
              <PrefRow title={functionalTitle} desc={functionalDesc} field="functional" />
              <PrefRow title={analyticsTitle} desc={analyticsDesc} field="analytics" />
              <PrefRow title={marketingTitle} desc={marketingDesc} field="marketing" />

              <div className="mt-1 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowPrefs(false)}
                  className={cn(
                    "cursor-pointer rounded-md border px-2.5 py-1 text-xs",
                    isDark
                      ? "border-white/25 bg-white/10 text-white hover:bg-white/15"
                      : "border-border bg-muted text-muted-foreground hover:bg-muted/80",
                  )}
                >
                  {cancelText}
                </button>

                <button
                  type="button"
                  onClick={savePreferences}
                  className={cn(
                    "cursor-pointer rounded-md px-2.5 py-1 text-xs",
                    isDark
                      ? "bg-[#c65a20] text-white hover:bg-[#d46830]"
                      : "bg-primary text-primary-foreground hover:bg-primary/90",
                  )}
                >
                  {savePreferencesText}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export { CookiePanel };
