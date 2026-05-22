import type { User } from "@supabase/supabase-js";
import { cookies } from "next/headers";
import { createClient } from "@/lib/supabase/server";
import {
  getPendingCookieName,
  getVerifiedCookieName,
  hasValidPending2FAForUser,
  isVerified2FAForUser,
} from "@/lib/admin/emailTwoFactor";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { getOrCreateRequestId } from "@/lib/security/authObservability";
import { withRequestIdJson } from "@/lib/security/authResponses";

export async function GET(request: Request) {
  const requestId = getOrCreateRequestId(request);
  if (!isSupabaseConfigured()) {
    return withRequestIdJson({ authenticated: false, admin: false }, requestId, { status: 200 });
  }

  let user: User | null = null;
  try {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.getUser();
    if (error) {
      return withRequestIdJson(
        { authenticated: false, admin: false, admin2faRequired: false },
        requestId,
        { status: 200 },
      );
    }
    user = data.user;
  } catch {
    return withRequestIdJson(
      { authenticated: false, admin: false, admin2faRequired: false },
      requestId,
      { status: 200 },
    );
  }

  if (!user) {
    return withRequestIdJson(
      { authenticated: false, admin: false, admin2faRequired: false },
      requestId,
      { status: 200 },
    );
  }

  const role =
    typeof user.user_metadata?.role === "string"
      ? String(user.user_metadata.role).toLowerCase()
      : "";

  const isAdmin = role === "admin";
  let admin2faRequired = false;

  if (isAdmin) {
    const cookieStore = await cookies();
    const pending = cookieStore.get(getPendingCookieName())?.value ?? null;
    const verified = cookieStore.get(getVerifiedCookieName())?.value ?? null;
    const hasPending = hasValidPending2FAForUser(pending, user.id);
    const isVerified = isVerified2FAForUser(verified, user.id);
    admin2faRequired = hasPending && !isVerified;
  }

  return withRequestIdJson(
    {
      authenticated: true,
      admin: isAdmin,
      admin2faRequired,
    },
    requestId,
  );
}
