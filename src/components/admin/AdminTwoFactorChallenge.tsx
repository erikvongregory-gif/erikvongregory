"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient as createSupabaseClient } from "@/lib/supabase/client";

export function AdminTwoFactorChallenge() {
  const router = useRouter();
  const [code, setCode] = useState("");
  const [factorId, setFactorId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [booting, setBooting] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    let alive = true;
    const boot = async () => {
      const supabase = createSupabaseClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();
      const role = typeof user?.user_metadata?.role === "string" ? String(user.user_metadata.role).toLowerCase() : "";
      if (!user || role !== "admin") {
        router.replace("/dashboard");
        return;
      }

      const mfa = (supabase.auth as unknown as { mfa?: Record<string, unknown> }).mfa as Record<string, unknown> | undefined;
      if (!mfa || typeof mfa.listFactors !== "function") {
        setMessage("MFA ist für dieses Projekt noch nicht aktiviert.");
        setBooting(false);
        return;
      }

      const listResult = await (mfa.listFactors as () => Promise<{ data?: { totp?: Array<{ id?: string; status?: string }> } }>)();
      const verifiedTotp = (listResult.data?.totp ?? []).find((f) => f.status !== "unverified" && Boolean(f.id));
      if (!verifiedTotp?.id) {
        router.replace("/admin/2fa/setup");
        return;
      }

      if (typeof mfa.getAuthenticatorAssuranceLevel === "function") {
        const aalResult = await (mfa.getAuthenticatorAssuranceLevel as () => Promise<{ data?: { currentLevel?: string } }>)();
        if (aalResult.data?.currentLevel === "aal2") {
          router.replace("/admin");
          return;
        }
      }

      if (alive) {
        setFactorId(verifiedTotp.id);
        setBooting(false);
      }
    };
    void boot();
    return () => {
      alive = false;
    };
  }, [router]);

  const verifyCode = async () => {
    if (!factorId || code.length < 6) return;
    setLoading(true);
    setMessage("");
    const supabase = createSupabaseClient();
    const mfa = (supabase.auth as unknown as { mfa?: Record<string, unknown> }).mfa as Record<string, unknown> | undefined;
    if (!mfa) {
      setMessage("MFA ist nicht verfügbar.");
      setLoading(false);
      return;
    }
    try {
      if (typeof mfa.challengeAndVerify === "function") {
        const result = await (
          mfa.challengeAndVerify as (args: { factorId: string; code: string }) => Promise<{ error?: { message?: string } }>
        )({ factorId, code: code.trim() });
        if (result.error) throw new Error(result.error.message || "Code ungültig.");
      } else if (typeof mfa.challenge === "function" && typeof mfa.verify === "function") {
        const challengeResult = await (
          mfa.challenge as (args: { factorId: string }) => Promise<{ data?: { id?: string }; error?: { message?: string } }>
        )({ factorId });
        if (challengeResult.error || !challengeResult.data?.id) {
          throw new Error(challengeResult.error?.message || "Challenge konnte nicht erstellt werden.");
        }
        const verifyResult = await (
          mfa.verify as (args: { factorId: string; challengeId: string; code: string }) => Promise<{ error?: { message?: string } }>
        )({ factorId, challengeId: challengeResult.data.id, code: code.trim() });
        if (verifyResult.error) throw new Error(verifyResult.error.message || "Code ungültig.");
      } else {
        throw new Error("MFA-Methoden werden von deinem Supabase SDK nicht unterstützt.");
      }
      router.replace("/admin");
      router.refresh();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "2FA-Verifizierung fehlgeschlagen.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="mx-auto mt-16 w-full max-w-md rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
      <h1 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Admin-2FA bestätigen</h1>
      <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
        Gib den 6-stelligen Code aus deiner Authenticator-App ein, um auf den Admin-Bereich zuzugreifen.
      </p>
      <label className="mt-5 block text-sm font-medium text-gray-700 dark:text-gray-300">
        2FA-Code
        <input
          value={code}
          onChange={(event) => setCode(event.target.value.replace(/\s+/g, ""))}
          inputMode="numeric"
          autoComplete="one-time-code"
          placeholder="123456"
          className="mt-2 h-11 w-full rounded-md border border-gray-300 bg-white px-3 text-gray-900 dark:border-gray-700 dark:bg-gray-950 dark:text-gray-100"
        />
      </label>
      <button
        type="button"
        onClick={() => {
          void verifyCode();
        }}
        disabled={loading || booting || !factorId}
        className="mt-4 inline-flex h-11 w-full items-center justify-center rounded-md bg-[#c65a20] px-4 text-sm font-medium text-white transition hover:bg-[#b14f1c] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? "Prüfe..." : "Admin-Zugang freigeben"}
      </button>
      {message ? (
        <p className="mt-3 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700 dark:border-red-900/50 dark:bg-red-900/20 dark:text-red-300">
          {message}
        </p>
      ) : null}
    </section>
  );
}
