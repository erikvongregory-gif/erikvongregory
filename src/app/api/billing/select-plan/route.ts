import { NextResponse } from "next/server";
import { z } from "zod";
import {
  getCookieName,
  serializeBillingState,
  SUBSCRIPTION_PLAN_TOKENS,
  type SubscriptionPlanKey,
} from "@/lib/billing/tokenState";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { enforceRateLimit, enforceSameOrigin } from "@/lib/security/requestGuards";

type SelectPlanBody = {
  plan?: SubscriptionPlanKey;
};

export async function POST(req: Request) {
  try {
    const rateError = enforceRateLimit(req, {
      keyPrefix: "billing-select-plan",
      limit: 20,
      windowMs: 60_000,
    });
    if (rateError) return rateError;
    const originError = enforceSameOrigin(req);
    if (originError) return originError;

    if (isSupabaseConfigured()) {
      const supabase = await createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        return NextResponse.json({ error: "Nicht angemeldet." }, { status: 401 });
      }
    }

    const body = z.object({ plan: z.enum(["start", "growth", "pro"]) }).safeParse(await req.json());
    if (!body.success) {
      return NextResponse.json({ error: "Ungueltiger Plan." }, { status: 400 });
    }
    const plan = body.data.plan as SelectPlanBody["plan"];

    const state = {
      plan,
      monthlyTokens: SUBSCRIPTION_PLAN_TOKENS[plan],
      usedTokens: 0,
    };

    const response = NextResponse.json({ state });
    response.cookies.set(getCookieName(), serializeBillingState(state), {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 30,
    });
    return response;
  } catch {
    return NextResponse.json({ error: "Plan konnte nicht gesetzt werden." }, { status: 500 });
  }
}

