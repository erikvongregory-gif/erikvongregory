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
  const [mode, setMode] = useState<"signin">("signin");
  const [open, setOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [authNotice, setAuthNotice] = useState<string | null>(null);
  const lockedScrollYRef = useRef(0);
  const pathname = usePathname();
  const nextPath = pathname?.startsWith("/") ? pathname : "/";
  const idSuffix = variant === "desktop" ? "desktop" : "mobile";

  useEffect(() => {
    if (!isSupabaseConfigured()) {
      setIsAuthenticated(false);
      return;
    }

    const supabase = createSupabaseClient();
    let isActive = true;

    const syncAuthState = async () => {
      const { data: sessionData } = await supabase.auth.getSession();
      if (!isActive) return;
      if (!sessionData.session) {
        setIsAuthenticated(false);
        return;
      }
      const { data, error } = await supabase.auth.getUser();
      if (!isActive) return;
      if (error) {
        setIsAuthenticated(false);
        return;
      }
      setIsAuthenticated(Boolean(data.user));
    };

    void syncAuthState();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!isActive) return;
      setIsAuthenticated(Boolean(session?.user));
    });

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
      subscription.unsubscribe();
    };
  }, [pathname]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const url = new URL(window.location.href);
    const authAction = url.searchParams.get("auth");
    setAuthError(url.searchParams.get("error"));
    setAuthNotice(url.searchParams.get("notice"));

    if (isAuthenticated) return;
    if (authAction !== "signin" && authAction !== "signup") return;

    setMode("signin");
    setOpen(true);
    url.searchParams.delete("auth");
    window.history.replaceState({}, "", `${url.pathname}${url.search}${url.hash}`);
  }, [isAuthenticated, pathname]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const onOpenAuth = (event: Event) => {
      if (isAuthenticated) return;
      setMode("signin");
      setOpen(true);
    };
    window.addEventListener("evglab-open-auth-modal", onOpenAuth as EventListener);
    return () => {
      window.removeEventListener("evglab-open-auth-modal", onOpenAuth as EventListener);
    };
  }, [isAuthenticated]);

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
            Willkommen zurück
          </DialogTitle>
          <DialogDescription className="sm:text-center">
            Melde dich mit deinen Zugangsdaten in deinem Konto an.
          </DialogDescription>
        </DialogHeader>
      </div>

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

      {authError ? (
        <p className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
          {authError === "missing"
            ? "Bitte fülle alle Pflichtfelder aus."
            : authError === "signup_disabled"
              ? "Registrierung ist aktuell deaktiviert. Bitte nutze ein bestehendes Konto."
            : authError === "config"
              ? "Login ist aktuell nicht verfügbar. Bitte später erneut versuchen."
              : authError === "google"
                ? "Google-Anmeldung fehlgeschlagen. Bitte erneut versuchen."
                : "Anmeldung oder Registrierung fehlgeschlagen. Bitte prüfe deine Eingaben."}
        </p>
      ) : null}
      {authNotice === "confirm" ? (
        <p className="rounded-md border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-900">
          Bitte bestätige zuerst deine E-Mail und melde dich danach an.
        </p>
      ) : null}

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
        Registrierung ist aktuell deaktiviert.
      </p>
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
          {isAuthenticated ? (
            <>
              <Button
                asChild
                size="sm"
                variant="outline"
                className="h-9 rounded-full border border-black/10 bg-gradient-to-br from-black/5 to-black/0 px-4 text-zinc-900 shadow-[0_10px_22px_-18px_rgba(24,24,27,0.28)] backdrop-blur-[14px] transition duration-300 hover:-translate-y-0.5 hover:border-[#e07a40]/35 hover:shadow-[0_16px_34px_-20px_rgba(198,90,32,0.24)]"
              >
                <Link href="/dashboard">Zum Dashboard</Link>
              </Button>
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
                onClick={() => setMode("signin")}
                aria-label="Anmelden"
              >
                <span className="text-sm font-medium">LogIn</span>
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
        {isAuthenticated ? (
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
                setMode("signin");
              }}
              role="menuitem"
            >
              Anmelden
            </Button>
          </DialogTrigger>
        )}
        {loginDialog}
      </Dialog>
    </div>
  );
}
