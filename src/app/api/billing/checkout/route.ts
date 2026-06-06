import { NextResponse } from "next/server";
import Stripe from "stripe";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { ensureBillingRow, getBillingRow, setStripeCustomerId } from "@/lib/billing/store";
import { getStripePriceIdForPlan } from "@/lib/billing/stripePrices";
import { type SubscriptionPlanKey } from "@/lib/billing/tokenState";
import { enforceRateLimitPersistent, enforceSameOrigin } from "@/lib/security/requestGuards";

const checkoutSchema = z.object({
  plan: z.enum(["start", "growth", "pro"]),
  interval: z.enum(["month", "year"]).default("year"),
});

function getStripeClient() {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) throw new Error("STRIPE_SECRET_KEY fehlt.");
  return new Stripe(key);
}

export async function POST(req: Request) {
  try {
    const rateError = await enforceRateLimitPersistent(req, {
      keyPrefix: "billing-checkout",
      limit: 10,
      windowMs: 60_000,
    });
    if (rateError) return rateError;
    const originError = enforceSameOrigin(req);
    if (originError) return originError;

    const parsed = checkoutSchema.safeParse(await req.json());
    if (!parsed.success) {
      return NextResponse.json({ error: "Ungültige Anfrage." }, { status: 400 });
    }
    const plan: SubscriptionPlanKey = parsed.data.plan;
    const interval = parsed.data.interval;

    const stripe = getStripeClient();
    let userId: string | null = null;
    let userEmail: string | null = null;
    let customerId: string | null = null;

    if (isSupabaseConfigured()) {
      const supabase = await createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        userId = user.id;
        userEmail = user.email ?? null;
        await ensureBillingRow(user.id);
        const billing = await getBillingRow(user.id);
        customerId = billing?.stripe_customer_id ?? null;
        if (!customerId) {
          const customer = await stripe.customers.create({
            email: user.email ?? undefined,
            metadata: { user_id: user.id },
          });
          customerId = customer.id;
          await setStripeCustomerId(user.id, customer.id);
        }
      }
    }

    const priceId = getStripePriceIdForPlan(plan, interval);
    const { origin } = new URL(req.url);
    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      ...(customerId ? { customer: customerId } : {}),
      ...(customerId || !userEmail ? {} : { customer_email: userEmail }),
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${origin}/?checkout=success&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/?checkout=cancel`,
      metadata: {
        ...(userId ? { user_id: userId } : {}),
        plan,
        billing_interval: interval,
      },
      subscription_data: {
        metadata: {
          ...(userId ? { user_id: userId } : {}),
          plan,
          billing_interval: interval,
        },
      },
    });

    return NextResponse.json({ url: session.url });
  } catch {
    return NextResponse.json({ error: "Checkout konnte nicht gestartet werden." }, { status: 500 });
  }
}

