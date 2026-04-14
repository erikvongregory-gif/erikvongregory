import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createClient } from "@/lib/supabase/server";
import {
  getPendingCookieName,
  getVerifiedCookieName,
  hasValidPending2FAForUser,
  isVerified2FAForUser,
} from "@/lib/admin/emailTwoFactor";
import { isSupabaseConfigured } from "@/lib/supabase/env";

export async function GET() {
  if (!isSupabaseConfigured()) {
    return NextResponse.json({ authenticated: false, admin: false }, { status: 200 });
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ authenticated: false, admin: false, admin2faRequired: false }, { status: 200 });
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

  return NextResponse.json({
    authenticated: true,
    admin: isAdmin,
    admin2faRequired,
  });
}
