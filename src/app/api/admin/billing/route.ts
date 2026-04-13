import { NextResponse } from "next/server";
import { enforceRateLimit } from "@/lib/security/requestGuards";
import { createAdminClient } from "@/lib/supabase/admin";
import { getAdminSession } from "@/lib/admin/auth";

export async function GET(req: Request) {
  const rateError = enforceRateLimit(req, { keyPrefix: "admin-billing-get", limit: 60, windowMs: 60_000 });
  if (rateError) return rateError;
  const admin = await getAdminSession();
  if (!admin) return NextResponse.json({ error: "Kein Admin-Zugriff." }, { status: 403 });

  const client = createAdminClient();
  const { data: userList, error: userListError } = await client.auth.admin.listUsers({ page: 1, perPage: 1000 });
  if (userListError) return NextResponse.json({ error: userListError.message }, { status: 500 });
  const emailByUserId = new Map((userList.users ?? []).map((u) => [u.id, u.email ?? ""]));

  const { data, error } = await client
    .from("billing_subscriptions")
    .select("user_id, plan, monthly_tokens, used_tokens, subscription_status, current_period_end, stripe_customer_id")
    .order("user_id", { ascending: true });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  const rows = await Promise.all(
    (data ?? []).map(async (row) => {
      let email = emailByUserId.get(row.user_id) ?? "";
      if (!email) {
        const { data: userById } = await client.auth.admin.getUserById(row.user_id);
        email = userById.user?.email ?? "";
      }
      return {
        userId: row.user_id,
        email,
        plan: row.plan,
        monthlyTokens: row.monthly_tokens,
        usedTokens: row.used_tokens,
        remainingTokens: Math.max((row.monthly_tokens ?? 0) - (row.used_tokens ?? 0), 0),
        status: row.subscription_status,
        currentPeriodEnd: row.current_period_end,
        hasStripeCustomer: Boolean(row.stripe_customer_id),
      };
    }),
  );

  const summary = {
    total: rows.length,
    active: rows.filter((row) => row.status === "active" || row.status === "trialing").length,
    withPlan: rows.filter((row) => Boolean(row.plan)).length,
    tokensConsumed: rows.reduce((sum, row) => sum + (row.usedTokens ?? 0), 0),
  };

  return NextResponse.json({ summary, rows });
}
