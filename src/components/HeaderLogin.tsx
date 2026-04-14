"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { LogIn } from "lucide-react";
import { cn } from "@/lib/utils";
import { createClient as createSupabaseClient } from "@/lib/supabase/client";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type HeaderLoginProps = {
  variant: "desktop" | "mobile";
  className?: string;
};

export function HeaderLogin({ variant, className }: HeaderLoginProps) {
  const [mode, setMode] = useState<"signin" | "code">("signin");
  const [open, setOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [twoFARequired, setTwoFARequired] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [authNotice, setAuthNotice] = useState<string | null>(null);
  const [isResendingCode, setIsResendingCode] = useState(false);
  const lockedScrollYRef = useRef(0);
  const pathname = usePathname();
  const idSuffix = variant === "desktop" ? "desktop" : "mobile";

  const handleResendTwoFactorCode = async () => {
    if (isResendingCode) return;
    setIsResendingCode(true);
    setAuthError(null);
    try {
      const body = new URLSearchParams();
      body.set("action", "resend");
      const res = await fetch("/auth/admin-2fa/verify", {
        method: "POST",
        body,
        credentials: "include",
      });
      if (!res.ok) {
        throw new Error("Code konnte nicht erneut gesendet werden.");
      }
      setMode("code");
      setOpen(true);
      setAuthNotice("admin_2fa_resent");
    } catch {
      setAuthError("email_failed");
    } finally {
      setIsResendingCode(false);
    }
  };

  useEffect(() => {
    let isActive = true;

    const syncFromServer = async () => {
      try {
        const res = await fetch("/api/auth/status", {
          method: "GET",
          cache: "no-store",
          credentials: "include",
        });
        if (!isActive) return;
        if (!res.ok) {
          setIsAuthenticated(false);
          setIsAdmin(false);
          return;
        }
        const payload = (await res.json()) as { authenticated?: boolean; admin?: boolean; admin2faRequired?: boolean };
        setIsAuthenticated(Boolean(payload.authenticated));
        setIsAdmin(Boolean(payload.admin));
        setTwoFARequired(Boolean(payload.admin2faRequired));
      } catch {
        if (!isActive) return;
        setIsAuthenticated(false);
        setIsAdmin(false);
        setTwoFARequired(false);
      }
    };

    const syncAuthState = async () => {
      if (!isSupabaseConfigured()) {
        await syncFromServer();
        return;
      }

      const supabase = createSupabaseClient();
      const { data: sessionData } = await supabase.auth.getSession();
      if (!isActive) return;
      if (!sessionData.session) {
        await syncFromServer();
        return;
      }
      const { data, error } = await supabase.auth.getUser();
      if (!isActive) return;
      if (error) {
        await syncFromServer();
        return;
      }
      setIsAuthenticated(Boolean(data.user));
      const role =
        typeof data.user?.user_metadata?.role === "string"
          ? String(data.user.user_metadata.role).toLowerCase()
          : "";
      setIsAdmin(role === "admin");
    };

    void syncAuthState();

    const supabase = isSupabaseConfigured() ? createSupabaseClient() : null;
    const subscription = supabase
      ? supabase.auth.onAuthStateChange((_event, session) => {
          if (!isActive) return;
          setIsAuthenticated(Boolean(session?.user));
          const role =
            typeof session?.user?.user_metadata?.role === "string"
              ? String(session.user.user_metadata.role).toLowerCase()
              : "";
          setIsAdmin(role === "admin");
          void syncFromServer();
        }).data.subscription
      : null;

    const onFocus = () => {
      void syncAuthState();
    };
    const onVisibility = () => {
      if (document.visibilityState === "visible") {
        void syncAuthState();
      }
    };

    window.addEventListener("focus", onFocus);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      isActive = false;
      window.removeEventListener("focus", onFocus);
      document.removeEventListener("visibilitychange", onVisibility);
      subscription?.unsubscribe();
    };
  }, [pathname]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const url = new URL(window.location.href);
    const authAction = url.searchParams.get("auth");
    const nextError = url.searchParams.get("error");
    const nextNotice = url.searchParams.get("notice");
    queueMicrotask(() => {
      setAuthError(nextError);
      setAuthNotice(nextNotice);
    });

    const needs2FAFlow =
      nextNotice === "admin_2fa_required" || nextNotice === "admin_2fa_resent";

    if (!needs2FAFlow && isAuthenticated) return;
    if (!needs2FAFlow && authAction !== "signin" && authAction !== "signup") return;

    queueMicrotask(() => {
      setMode(needs2FAFlow ? "code" : "signin");
      setOpen(true);
    });
    url.searchParams.delete("auth");
    window.history.replaceState({}, "", `${url.pathname}${url.search}${url.hash}`);
  }, [isAuthenticated, pathname]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const onOpenAuth = () => {
      if (isAuthenticated && !twoFARequired) return;
      setMode(twoFARequired ? "code" : "signin");
      setOpen(true);
    };
    window.addEventListener("evglab-open-auth-modal", onOpenAuth as EventListener);
    return () => {
      window.removeEventListener("evglab-open-auth-modal", onOpenAuth as EventListener);
    };
  }, [isAuthenticated, twoFARequired]);

  useEffect(() => {
    if (!twoFARequired) return;
    setMode("code");
    setOpen(true);
  }, [twoFARequired]);

  useEffect(() => {
    if (!open) return undefined;

    const body = document.body;
    const html = document.documentElement;
    const previousBody = {
      overflow: body.style.overflow,
      position: body.style.position,
      top: body.style.top,
      left: body.style.left,
      right: body.style.right,
      width: body.style.width,
    };
    const previousHtmlOverflow = html.style.overflow;

    lockedScrollYRef.current = window.scrollY;
    body.style.overflow = "hidden";
    body.style.position = "fixed";
    body.style.top = `-${lockedScrollYRef.current}px`;
    body.style.left = "0";
    body.style.right = "0";
    body.style.width = "100%";
    html.style.overflow = "hidden";

    return () => {
      body.style.overflow = previousBody.overflow;
      body.style.position = previousBody.position;
      body.style.top = previousBody.top;
      body.style.left = previousBody.left;
      body.style.right = previousBody.right;
      body.style.width = previousBody.width;
      html.style.overflow = previousHtmlOverflow;
      window.scrollTo(0, lockedScrollYRef.current);
    };
  }, [open]);

  useEffect(() => {
    if (variant !== "mobile") return;
    window.dispatchEvent(
      new CustomEvent("evglab-mobile-auth-dialog-open-change", {
        detail: { open },
      }),
    );
    return () => {
      window.dispatchEvent(
        new CustomEvent("evglab-mobile-auth-dialog-open-change", {
          detail: { open: false },
        }),
      );
    };
  }, [open, variant]);

  const loginDialog = (
    <DialogContent className="w-[min(92vw,30rem)] max-w-[30rem] overflow-x-hidden">
      <div className="flex flex-col items-center gap-2">
        <div
          className="flex size-11 shrink-0 items-center justify-center rounded-full border border-border"
          aria-hidden="true"
        >
          <svg
            className="stroke-zinc-800"
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 32 32"
            aria-hidden="true"
          >
            <circle cx="16" cy="16" r="12" fill="none" strokeWidth="8" />
            <circle cx="16" cy="16" r="5" fill="#1f2937" />
          </svg>
        </div>
        <DialogHeader>
          <DialogTitle className="sm:text-center">
            {mode === "code" ? "Sicherheitscode eingeben" : "Willkommen zurück"}
          </DialogTitle>
          <DialogDescription className="sm:text-center">
            {mode === "code"
              ? "Bitte gib den 6-stelligen Code aus deiner E-Mail ein."
              : "Melde dich mit deinen Zugangsdaten in deinem Konto an."}
          </DialogDescription>
        </DialogHeader>
      </div>

      {mode === "signin" ? (
        <form action="/auth/signin" method="post" className="space-y-5">
          <input type="hidden" name="next" value="/dashboard" />
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor={`header-login-email-${idSuffix}`}>Email</Label>
              <Input
                id={`header-login-email-${idSuffix}`}
                name="email"
                placeholder="hi@yourcompany.com"
                type="email"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor={`header-login-password-${idSuffix}`}>Passwort</Label>
              <Input
                id={`header-login-password-${idSuffix}`}
                name="password"
                placeholder="Passwort eingeben"
                type="password"
                required
              />
            </div>
          </div>
          <Button type="submit" className="w-full">
            Anmelden
          </Button>
        </form>
      ) : (
        <div className="space-y-3">
          <form action="/auth/admin-2fa/verify" method="post" className="space-y-3">
            <div className="space-y-2">
              <Label htmlFor={`header-login-code-${idSuffix}`}>E-Mail-Code</Label>
              <Input
                id={`header-login-code-${idSuffix}`}
                name="code"
                inputMode="numeric"
                autoComplete="one-time-code"
                placeholder="123456"
                required
              />
            </div>
            <Button type="submit" className="w-full">
              Dashboard freigeben
            </Button>
          </form>
          <Button
            type="button"
            variant="outline"
            className="w-full"
            onClick={() => {
              void handleResendTwoFactorCode();
            }}
            disabled={isResendingCode}
          >
            {isResendingCode ? "Sende neuen Code..." : "Neuen Code senden"}
          </Button>
          <Button
            type="button"
            variant="ghost"
            className="w-full"
            onClick={() => {
              setMode("signin");
              setTwoFARequired(false);
            }}
          >
            Mit anderem Konto anmelden
          </Button>
        </div>
      )}

      {authError ? (
        <p className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
          {authError === "missing"
            ? "Bitte fülle alle Pflichtfelder aus."
            : authError === "signup_disabled"
              ? "Registrierung ist aktuell deaktiviert. Bitte nutze ein bestehendes Konto."
            : authError === "invite_only"
              ? "Google-Login ist im Invite-Only-Modus deaktiviert."
            : authError === "invite_required"
              ? "Registrierung ist nur mit gültiger Einladung möglich."
            : authError === "invite_invalid"
              ? "Einladung ist ungültig. Bitte prüfe den Link."
            : authError === "invite_expired"
              ? "Diese Einladung ist abgelaufen. Bitte fordere eine neue Einladung an."
            : authError === "invite_used"
              ? "Diese Einladung wurde bereits verwendet."
            : authError === "invite_email_mismatch"
              ? "Diese Einladung gilt für eine andere E-Mail-Adresse."
            : authError === "config"
              ? "Login ist aktuell nicht verfügbar. Bitte später erneut versuchen."
            : authError === "admin_2fa_email_failed"
              ? "Admin-2FA-Code konnte nicht per E-Mail gesendet werden. Bitte erneut versuchen."
            : authError === "admin_2fa_email_config"
              ? "Admin-2FA ist nicht vollständig konfiguriert (RESEND_API_KEY / ADMIN_2FA_FROM_EMAIL fehlt)."
            : authError === "admin_2fa_session_expired"
              ? "Admin-2FA-Session ist abgelaufen. Bitte neu anmelden."
            : authError === "admin_2fa_invalid"
              ? "Code ist ungültig oder abgelaufen. Bitte erneut versuchen."
            : authError === "email_failed"
              ? "Code konnte nicht erneut gesendet werden."
              : authError === "google"
                ? "Google-Anmeldung fehlgeschlagen. Bitte erneut versuchen."
              : authError === "auth"
                ? "E-Mail oder Passwort ist falsch, oder die E-Mail wurde noch nicht bestätigt."
                : "Anmeldung oder Registrierung fehlgeschlagen. Bitte prüfe deine Eingaben."}
        </p>
      ) : null}
      {authNotice === "confirm" ? (
        <p className="rounded-md border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-900">
          Bitte bestätige zuerst deine E-Mail und melde dich danach an.
        </p>
      ) : authNotice === "invite_ready" ? (
        <p className="rounded-md border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-900">
          Einladung angenommen. Bitte melde dich jetzt mit deinem neuen Passwort an.
        </p>
      ) : authNotice === "admin_2fa_required" ? (
        <p className="rounded-md border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-900">
          Code wurde gesendet. Bitte eingeben, um den Admin-Bereich zu öffnen.
        </p>
      ) : authNotice === "admin_2fa_resent" ? (
        <p className="rounded-md border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-900">
          Neuer Admin-Code wurde gesendet.
        </p>
      ) : null}
      {mode === "signin" ? (
        <>
          <div className="flex items-center gap-3 before:h-px before:flex-1 before:bg-border after:h-px after:flex-1 after:bg-border">
            <span className="text-xs text-muted-foreground">Oder</span>
          </div>

          <button
            type="button"
            disabled
            aria-disabled="true"
            className="inline-flex h-9 w-full cursor-not-allowed items-center justify-center gap-2 rounded-lg border border-input bg-background px-4 py-2 text-xs font-medium text-foreground/60 opacity-70 shadow-sm shadow-black/5 transition-colors sm:text-sm"
          >
            <FcGoogle className="size-4" />
            Login mit Google (deaktiviert)
          </button>

          <p className="text-center text-sm text-muted-foreground">
            Registrierung ist nur per Einladung möglich.
          </p>
        </>
      ) : null}
    </DialogContent>
  );

  if (variant === "desktop") {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <div
          className={cn(
            "flex min-w-0 shrink-0 items-center gap-1.5 border-l border-black/10 pl-2.5 sm:gap-2 sm:pl-3",
            className,
          )}
        >
          {isAuthenticated && !twoFARequired ? (
            <>
              <Button
                asChild
                size="sm"
                variant="outline"
                className="h-9 rounded-full border border-black/10 bg-gradient-to-br from-black/5 to-black/0 px-4 text-zinc-900 shadow-[0_10px_22px_-18px_rgba(24,24,27,0.28)] backdrop-blur-[14px] transition duration-300 hover:-translate-y-0.5 hover:border-[#e07a40]/35 hover:shadow-[0_16px_34px_-20px_rgba(198,90,32,0.24)]"
              >
                <Link href="/dashboard">Zum Dashboard</Link>
              </Button>
              {isAdmin ? (
                <Button
                  asChild
                  size="sm"
                  variant="outline"
                  className="h-9 rounded-full border border-black/10 bg-gradient-to-br from-black/5 to-black/0 px-4 text-zinc-900 shadow-[0_10px_22px_-18px_rgba(24,24,27,0.28)] backdrop-blur-[14px] transition duration-300 hover:-translate-y-0.5 hover:border-[#e07a40]/35 hover:shadow-[0_16px_34px_-20px_rgba(198,90,32,0.24)]"
                >
                  <Link href="/dashboard">Admin Center</Link>
                </Button>
              ) : null}
              <form action="/auth/signout" method="post">
                <Button
                  type="submit"
                  size="sm"
                  variant="outline"
                  className="h-9 rounded-full border border-black/10 bg-gradient-to-br from-black/5 to-black/0 px-4 text-zinc-900 shadow-[0_10px_22px_-18px_rgba(24,24,27,0.28)] backdrop-blur-[14px] transition duration-300 hover:-translate-y-0.5 hover:border-[#e07a40]/35 hover:shadow-[0_16px_34px_-20px_rgba(198,90,32,0.24)]"
                >
                  Abmelden
                </Button>
              </form>
            </>
          ) : (
            <DialogTrigger asChild>
              <Button
                type="button"
                size="sm"
                variant="ghost"
                className="h-9 rounded-full border-0 bg-transparent px-2 text-zinc-900 shadow-none hover:bg-transparent hover:text-zinc-700"
                onClick={() => setMode(twoFARequired ? "code" : "signin")}
                aria-label={twoFARequired ? "Sicherheitscode eingeben" : "Anmelden"}
              >
                <span className="text-sm font-medium">{twoFARequired ? "2FA Code" : "LogIn"}</span>
                <LogIn className="h-4 w-4" aria-hidden />
              </Button>
            </DialogTrigger>
          )}
        </div>
        {loginDialog}
      </Dialog>
    );
  }

  return (
    <div
      className={cn("flex flex-col gap-2 border-t border-zinc-100 bg-zinc-50/50 px-4 py-3", className)}
    >
      <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-neutral-500">
        Brauerei-Bereich
      </p>
      <Dialog open={open} onOpenChange={setOpen}>
        {isAuthenticated && !twoFARequired ? (
          <div className="flex w-full flex-col gap-2">
            <Button
              asChild
              size="sm"
              variant="outline"
              className="h-10 w-full rounded-full border border-black/10 bg-gradient-to-br from-black/5 to-black/0 px-4 text-zinc-900 shadow-[0_10px_22px_-18px_rgba(24,24,27,0.28)] backdrop-blur-[14px] transition duration-300 hover:-translate-y-0.5 hover:border-[#e07a40]/35 hover:shadow-[0_16px_34px_-20px_rgba(198,90,32,0.24)]"
              role="menuitem"
            >
              <Link href="/dashboard">Zum Dashboard</Link>
            </Button>
            {isAdmin ? (
              <Button
                asChild
                size="sm"
                variant="outline"
                className="h-10 w-full rounded-full border border-black/10 bg-gradient-to-br from-black/5 to-black/0 px-4 text-zinc-900 shadow-[0_10px_22px_-18px_rgba(24,24,27,0.28)] backdrop-blur-[14px] transition duration-300 hover:-translate-y-0.5 hover:border-[#e07a40]/35 hover:shadow-[0_16px_34px_-20px_rgba(198,90,32,0.24)]"
                role="menuitem"
              >
                <Link href="/dashboard">Admin Center</Link>
              </Button>
            ) : null}
            <form action="/auth/signout" method="post" className="w-full">
              <Button
                type="submit"
                size="sm"
                variant="outline"
                className="h-10 w-full rounded-full border border-black/10 bg-gradient-to-br from-black/5 to-black/0 px-4 text-zinc-900 shadow-[0_10px_22px_-18px_rgba(24,24,27,0.28)] backdrop-blur-[14px] transition duration-300 hover:-translate-y-0.5 hover:border-[#e07a40]/35 hover:shadow-[0_16px_34px_-20px_rgba(198,90,32,0.24)]"
                role="menuitem"
              >
                Abmelden
              </Button>
            </form>
          </div>
        ) : (
          <DialogTrigger asChild>
            <Button
              type="button"
              size="sm"
              variant="outline"
              className="h-10 w-full rounded-full border-zinc-300 bg-white px-4 text-zinc-900 shadow-sm hover:bg-zinc-100"
              onClick={() => {
                setMode(twoFARequired ? "code" : "signin");
              }}
              role="menuitem"
            >
              {twoFARequired ? "2FA Code eingeben" : "Anmelden"}
            </Button>
          </DialogTrigger>
        )}
        {loginDialog}
      </Dialog>
    </div>
  );
}
