import { NextResponse } from "next/server";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { enforceRateLimit, enforceSameOrigin } from "@/lib/security/requestGuards";
import { getDashboardMetadata, mergeDashboardMetadata } from "@/lib/dashboard/metadata";

const settingsSchema = z.object({
  profileName: z.string().max(120),
  breweryName: z.string().max(120),
  profilePhone: z.string().max(60),
  emailNotifications: z.boolean(),
  weeklySummary: z.boolean(),
});

export async function GET() {
  if (!isSupabaseConfigured()) {
    return NextResponse.json({ error: "Supabase ist nicht konfiguriert." }, { status: 500 });
  }
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Nicht angemeldet." }, { status: 401 });

  const dashboard = getDashboardMetadata(user.user_metadata);
  const settings = dashboard.settings ?? {};
  return NextResponse.json({
    settings: {
      profileName: typeof settings.profileName === "string" ? settings.profileName : "",
      breweryName:
        typeof settings.breweryName === "string"
          ? settings.breweryName
          : typeof user.user_metadata?.brewery === "string"
            ? user.user_metadata.brewery
            : "",
      profilePhone:
        typeof settings.profilePhone === "string"
          ? settings.profilePhone
          : typeof user.user_metadata?.phone === "string"
            ? user.user_metadata.phone
            : "",
      emailNotifications:
        typeof settings.emailNotifications === "boolean" ? settings.emailNotifications : true,
      weeklySummary: typeof settings.weeklySummary === "boolean" ? settings.weeklySummary : true,
    },
  });
}

export async function PUT(req: Request) {
  const rateError = enforceRateLimit(req, { keyPrefix: "dashboard-settings", limit: 25, windowMs: 60_000 });
  if (rateError) return rateError;
  const originError = enforceSameOrigin(req);
  if (originError) return originError;

  if (!isSupabaseConfigured()) {
    return NextResponse.json({ error: "Supabase ist nicht konfiguriert." }, { status: 500 });
  }

  const parsed = settingsSchema.safeParse(await req.json());
  if (!parsed.success) {
    return NextResponse.json({ error: "Ungültige Einstellungen." }, { status: 400 });
  }
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Nicht angemeldet." }, { status: 401 });

  const payload = parsed.data;
  const merged = mergeDashboardMetadata(user.user_metadata, { settings: payload });
  const { error } = await supabase.auth.updateUser({
    data: {
      ...merged,
      full_name: payload.profileName || null,
      brewery: payload.breweryName || null,
      phone: payload.profilePhone || null,
    },
  });
  if (error) {
    return NextResponse.json({ error: "Einstellungen konnten nicht gespeichert werden." }, { status: 500 });
  }
  return NextResponse.json({ ok: true, settings: payload });
}
