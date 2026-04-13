import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/env";

export type AdminSession = {
  userId: string;
  email: string | null;
  role: string | null;
};

function decodeJwtPayload(token?: string | null): Record<string, unknown> | null {
  if (!token) return null;
  const parts = token.split(".");
  if (parts.length < 2) return null;
  try {
    const payload = JSON.parse(Buffer.from(parts[1], "base64url").toString("utf8")) as Record<string, unknown>;
    return payload;
  } catch {
    return null;
  }
}

function getSessionAal(accessToken?: string | null): string | null {
  const payload = decodeJwtPayload(accessToken);
  const aal = payload?.aal;
  return typeof aal === "string" ? aal : null;
}

function hasVerifiedTotpFactor(user: { factors?: unknown[] } | null | undefined): boolean {
  const factors = Array.isArray(user?.factors) ? user.factors : [];
  return factors.some((factor) => {
    if (!factor || typeof factor !== "object") return false;
    const rec = factor as Record<string, unknown>;
    const factorType = rec.factor_type ?? rec.factorType ?? rec.type;
    const status = rec.status;
    return factorType === "totp" && status !== "unverified";
  });
}

export async function getAdminSession(): Promise<AdminSession | null> {
  if (!isSupabaseConfigured()) return null;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;
  const {
    data: { session },
  } = await supabase.auth.getSession();
  const role =
    typeof user.user_metadata?.role === "string"
      ? String(user.user_metadata.role).toLowerCase()
      : null;
  if (role !== "admin") return null;
  const hasTotp = hasVerifiedTotpFactor(user);
  const aal = getSessionAal(session?.access_token ?? null);
  if (!hasTotp || aal !== "aal2") return null;
  return { userId: user.id, email: user.email ?? null, role };
}

export async function requireAdminPageAccess(options?: { allowWithout2FA?: boolean }) {
  if (!isSupabaseConfigured()) redirect("/?auth=signin&error=config");
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/?auth=signin");
  const {
    data: { session },
  } = await supabase.auth.getSession();
  const role =
    typeof user.user_metadata?.role === "string"
      ? String(user.user_metadata.role).toLowerCase()
      : null;
  if (role !== "admin") redirect("/dashboard");
  if (!options?.allowWithout2FA) {
    const hasTotp = hasVerifiedTotpFactor(user);
    const aal = getSessionAal(session?.access_token ?? null);
    if (!hasTotp) redirect("/admin/2fa/setup");
    if (aal !== "aal2") redirect("/admin/2fa");
  }
  return {
    userId: user.id,
    email: user.email ?? null,
    role,
  };
}
