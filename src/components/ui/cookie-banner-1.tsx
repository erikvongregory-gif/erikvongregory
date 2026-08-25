"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Check, ChevronDown, ChevronUp, X } from "lucide-react";
import { SITE } from "@/lib/siteConfig";
import { cn } from "@/lib/utils";
import styles from "./cookie-banner-v2.module.css";

export type CookieBannerPrefs = {
  necessary: boolean;
  functional: boolean;
  analytics: boolean;
  marketing: boolean;
};

interface CookiePanelProps {
  acceptText?: string;
  customizeText?: string;
  className?: string;
  privacyHref?: string;
  termsHref?: string;
  storageEnabled?: boolean;
  initialOpen?: boolean;
  initialPrefs?: Partial<CookieBannerPrefs>;
  forceOpenToken?: number;
  /** Footer „Cookies“: kompakte Einstellungsansicht (v. a. Mobile). */
  settingsMode?: boolean;
  onAcceptAll?: () => void;
  onSavePreferences?: (prefs: CookieBannerPrefs) => void;
  onClose?: () => void;
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
    acceptText = "Alle akzeptieren",
    customizeText = "Anpassen",
    className,
    privacyHref = "/datenschutz",
    termsHref = "/agb",
    storageEnabled = true,
    initialOpen = false,
    initialPrefs,
    forceOpenToken,
    settingsMode = false,
    onAcceptAll,
    onSavePreferences,
    onClose,
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

  const [visible, setVisible] = useState(false);
  const [exiting, setExiting] = useState(false);
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
      setPrefsHeight(prefsRef.current.scrollHeight);
    } else {
      setPrefsHeight(0);
    }
  }, [showPrefs, prefs]);

  const closeWithExit = (val?: "true" | "false") => {
    if (storageEnabled && val) localStorage.setItem("cookie-consent", val);
    setExiting(true);
    setVisible(false);
    onClose?.();
    setTimeout(() => {
      setRender(false);
      setExiting(false);
    }, 300);
  };

  const savePreferences = () => {
    if (storageEnabled) {
      localStorage.setItem("cookie-preferences", JSON.stringify(prefs));
      localStorage.setItem("cookie-consent", "true");
    }

    onSavePreferences?.(prefs);
    setShowPrefs(false);
    setExiting(true);
    setVisible(false);
    setTimeout(() => {
      setRender(false);
      setExiting(false);
    }, 300);
  };

  if (!render) return null;

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
    <div className={styles.prefRow}>
      <button
        type="button"
        disabled={locked}
        onClick={() => !locked && setPrefs((p) => ({ ...p, [field]: !p[field] }))}
        className={cn(styles.prefToggle, prefs[field] && styles.prefToggleOn)}
        aria-pressed={prefs[field]}
        aria-label={`${rowTitle} cookie preference`}
      >
        {prefs[field] && <Check className="size-3" aria-hidden="true" />}
      </button>
      <div>
        <div className={styles.prefTitle}>
          {rowTitle}{" "}
          {locked && <span className={styles.requiredTag}>({requiredText})</span>}
        </div>
        <p className={styles.prefDesc}>{desc}</p>
      </div>
    </div>
  );

  const dialogLabel = settingsMode ? "Cookie-Einstellungen" : "Cookie consent";

  return (
    <div
      className={cn(styles.viewport, visible && styles.viewportOpen)}
      aria-hidden={!visible}
    >
      <button
        type="button"
        className={styles.backdrop}
        tabIndex={visible ? 0 : -1}
        aria-label="Cookie-Dialog schließen"
        onClick={() => closeWithExit()}
      />
      <div
        role="dialog"
        aria-live="polite"
        aria-label={dialogLabel}
        className={cn(styles.root, settingsMode && styles.rootSettings, className)}
      >
        <div
          className={cn(
            styles.banner,
            visible && !exiting ? styles.bannerEnter : exiting ? styles.bannerExit : undefined,
          )}
        >
        <div className={styles.ticker}>
          <span className={styles.tickerLeft}>{SITE.name.toUpperCase()} · DATENSCHUTZ</span>
          <span className={styles.tickerRight}>
            <span className={styles.liveDot} aria-hidden="true" />
            DSGVO · DE
          </span>
        </div>

        <div className={styles.body}>
          <button
            type="button"
            onClick={() => closeWithExit()}
            className={styles.closeBtn}
            aria-label="Cookie-Banner schließen"
          >
            <X size={15} aria-hidden="true" />
          </button>

          {settingsMode ? (
            <h3 className={styles.titleSettings}>Cookie-Einstellungen</h3>
          ) : (
            <h3 className={styles.title}>
              Diese Website
              <br />
              verwendet <em>Cookies.</em>
            </h3>
          )}

          {!settingsMode && (
            <p className={styles.copy}>
              Wir verwenden Cookies, um dein Erlebnis auf unserer Website zu verbessern. {seeOurText}{" "}
              <Link href={privacyHref}>{privacyText}</Link> {andText}{" "}
              <Link href={termsHref}>{termsText}</Link>.
            </p>
          )}

          {settingsMode && (
            <p className={styles.copy}>
              Passe deine Auswahl an. Details in der{" "}
              <Link href={privacyHref}>{privacyText}</Link>.
            </p>
          )}

          <div
            id="cookie-preferences-inline"
            ref={prefsRef}
            className={styles.prefsWrap}
            style={{ height: prefsHeight ? `${prefsHeight}px` : 0 }}
          >
            {showPrefs && (
              <div className={styles.prefsInner}>
                <PrefRow title={necessaryTitle} desc={necessaryDesc} field="necessary" locked />
                <PrefRow title={functionalTitle} desc={functionalDesc} field="functional" />
                <PrefRow title={analyticsTitle} desc={analyticsDesc} field="analytics" />
                <PrefRow title={marketingTitle} desc={marketingDesc} field="marketing" />
                <div className={styles.prefsActions}>
                  <button
                    type="button"
                    onClick={() => (settingsMode ? closeWithExit() : setShowPrefs(false))}
                    className={styles.btnGhost}
                  >
                    {settingsMode ? "Schließen" : cancelText}
                  </button>
                  <button type="button" onClick={savePreferences} className={styles.btnSave}>
                    {savePreferencesText}
                  </button>
                </div>
              </div>
            )}
          </div>

          {!(settingsMode && showPrefs) && (
            <div className={styles.btns}>
              <button
                type="button"
                onClick={() => setShowPrefs((p) => !p)}
                className={styles.btnSecondary}
                aria-expanded={showPrefs}
                aria-controls="cookie-preferences-inline"
              >
                {customizeText}
                {showPrefs ? (
                  <ChevronUp size={12} aria-hidden="true" />
                ) : (
                  <ChevronDown size={12} aria-hidden="true" />
                )}
              </button>

              <button
                type="button"
                onClick={() => {
                  onAcceptAll?.();
                  closeWithExit("true");
                }}
                className={styles.btnPrimary}
              >
                {acceptText}
              </button>
            </div>
          )}
        </div>

        {!settingsMode && (
          <div className={styles.bannerFooter}>
            <div className={styles.brandMark}>{SITE.name}</div>
            <div className={styles.dsgvoTag}>Hosting · DE · V2.4</div>
          </div>
        )}
        </div>
      </div>
    </div>
  );
};

export { CookiePanel };
