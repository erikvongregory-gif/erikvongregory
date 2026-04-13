"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient as createSupabaseClient } from "@/lib/supabase/client";

type EnrollTotpResult = {
  id?: string;
  totp?: {
    qr_code?: string;
    secret?: string;
    uri?: string;
  };
  error?: { message?: string };
};

export function AdminTwoFactorSetup() {
  const router = useRouter();
  const [factorId, setFactorId] = useState<string | null>(null);
  const [qrCode, setQrCode] = useState("");
  const [secret, setSecret] = useState("");
  const [uri, setUri] = useState("");
  const [code, setCode] = useState("");
  const [booting, setBooting] = useState(true);
  const [saving, setSaving] = useState(false);
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
      if (!mfa || typeof mfa.listFactors !== "function" || typeof mfa.enroll !== "function") {
        setMessage("MFA ist für dieses Projekt noch nicht aktiviert.");
        setBooting(false);
        return;
      }

      const listResult = await (mfa.listFactors as () => Promise<{ data?: { totp?: Array<{ id?: string; status?: string }> } }>)();
      const verifiedTotp = (listResult.data?.totp ?? []).find((f) => f.status !== "unverified" && Boolean(f.id));
      if (verifiedTotp?.id) {
        router.replace("/admin/2fa");
        return;
      }

      const enrollResult = await (
        mfa.enroll as (args: { factorType: "totp"; friendlyName: string }) => Promise<{ data?: EnrollTotpResult; error?: { message?: string } }>
      )({
        factorType: "totp",
        friendlyName: "Admin Secure Access",
      });
      if (enrollResult.error || !enrollResult.data?.id) {
        setMessage(enrollResult.error?.message || "2FA-Setup konnte nicht gestartet werden.");
        setBooting(false);
        return;
      }

      if (alive) {
        setFactorId(enrollResult.data.id);
        setQrCode(enrollResult.data.totp?.qr_code ?? "");
        setSecret(enrollResult.data.totp?.secret ?? "");
        setUri(enrollResult.data.totp?.uri ?? "");
        setBooting(false);
      }
    };
    void boot();
    return () => {
      alive = false;
    };
  }, [router]);

  const activate2FA = async () => {
    if (!factorId || code.length < 6) return;
    setSaving(true);
    setMessage("");
    const supabase = createSupabaseClient();
    const mfa = (supabase.auth as unknown as { mfa?: Record<string, unknown> }).mfa as Record<string, unknown> | undefined;
    if (!mfa) {
      setMessage("MFA ist nicht verfügbar.");
      setSaving(false);
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
      setMessage(error instanceof Error ? error.message : "2FA konnte nicht aktiviert werden.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <section className="mx-auto mt-16 w-full max-w-md rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
      <h1 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Admin-2FA einrichten</h1>
      <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
        Scanne den QR-Code mit Google Authenticator, 1Password oder einer anderen TOTP-App.
      </p>

      <div className="mt-4 rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-950">
        {qrCode ? (
          <div className="mx-auto w-[180px] overflow-hidden rounded bg-white p-2" dangerouslySetInnerHTML={{ __html: qrCode }} />
        ) : (
          <p className="text-sm text-gray-500 dark:text-gray-400">{booting ? "QR wird geladen..." : "QR-Code nicht verfügbar."}</p>
        )}
      </div>

      {secret ? (
        <p className="mt-3 text-xs text-gray-600 dark:text-gray-400">
          Backup-Key: <span className="font-mono">{secret}</span>
        </p>
      ) : null}
      {uri ? (
        <p className="mt-1 break-all text-[11px] text-gray-500 dark:text-gray-400">
          URI: {uri}
        </p>
      ) : null}

      <label className="mt-5 block text-sm font-medium text-gray-700 dark:text-gray-300">
        6-stelliger Code aus der App
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
          void activate2FA();
        }}
        disabled={saving || booting || !factorId}
        className="mt-4 inline-flex h-11 w-full items-center justify-center rounded-md bg-[#c65a20] px-4 text-sm font-medium text-white transition hover:bg-[#b14f1c] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {saving ? "Aktiviere..." : "2FA aktivieren"}
      </button>

      {message ? (
        <p className="mt-3 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700 dark:border-red-900/50 dark:bg-red-900/20 dark:text-red-300">
          {message}
        </p>
      ) : null}
    </section>
  );
}
