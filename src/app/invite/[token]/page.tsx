import Link from "next/link";
import type { Metadata } from "next";
import { APP_LOGIN_URL } from "@/lib/appLoginUrl";
import { evaluateInvite, getInviteByToken } from "@/lib/invite/server";
import { isInviteOnlyEnabled } from "@/lib/supabase/env";

type InvitePageProps = {
  params: Promise<{ token: string }>;
  searchParams: Promise<{ error?: string }>;
};

function statusMessage(status: string) {
  if (status === "expired") return "Diese Einladung ist abgelaufen.";
  if (status === "used") return "Diese Einladung wurde bereits verwendet.";
  return "Der Einladungslink ist ungueltig.";
}

function oauthErrorMessage(error: string | undefined) {
  if (!error) return null;
  if (error === "invite_expired") return "Die Einladung ist abgelaufen. Bitte fordere eine neue Einladung an.";
  if (error === "invite_used") return "Diese Einladung wurde bereits verwendet.";
  if (error === "invite_email_mismatch") {
    return "Bitte melde dich mit dem Google-Konto der eingeladenen E-Mail-Adresse an.";
  }
  if (error === "google") return "Google-Anmeldung fehlgeschlagen. Bitte versuche es erneut.";
  return "Anmeldung fehlgeschlagen. Bitte versuche es erneut.";
}

export const metadata: Metadata = {
  title: {
    absolute: "BrewAI - Einladung",
  },
  robots: {
    index: false,
    follow: false,
    googleBot: { index: false, follow: false },
  },
};

export default async function InviteTokenPage({ params, searchParams }: InvitePageProps) {
  const { token } = await params;
  const { error } = await searchParams;
  const inviteOnly = isInviteOnlyEnabled();
  const invite = inviteOnly ? await getInviteByToken(token).catch(() => null) : null;
  const status = inviteOnly ? evaluateInvite(invite) : "valid";
  const oauthError = oauthErrorMessage(error);

  return (
    <main className="mx-auto my-10 w-full max-w-md px-4">
      <section className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
        <h1 className="text-xl font-semibold text-zinc-900">Einladung zum Dashboard</h1>
        <p className="mt-2 text-sm text-zinc-600">
          Registriere dich mit deiner eingeladenen E-Mail-Adresse, um Zugang zum Dashboard zu erhalten.
        </p>
        {oauthError ? (
          <div className="mt-4 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-900">
            {oauthError}
          </div>
        ) : null}

        {!inviteOnly || status === "valid" ? (
          <>
            <Link
              href={`/auth/google?next=${encodeURIComponent("/dashboard")}&inviteToken=${encodeURIComponent(token)}`}
              className="mt-5 inline-flex w-full items-center justify-center rounded-lg border border-zinc-300 bg-white px-4 py-2.5 text-sm font-semibold text-zinc-900 hover:bg-zinc-50"
            >
              Mit Google registrieren
            </Link>
            <div className="mt-4 flex items-center gap-3 text-xs uppercase tracking-wide text-zinc-400">
              <span className="h-px flex-1 bg-zinc-200" aria-hidden />
              oder mit Passwort
              <span className="h-px flex-1 bg-zinc-200" aria-hidden />
            </div>
            <form action="/auth/signup" method="post" className="mt-4 space-y-4">
              <input type="hidden" name="inviteToken" value={token} />
              <input type="hidden" name="next" value="/dashboard" />
              <div>
                <label htmlFor="invite-email" className="text-sm font-medium text-zinc-800">
                  E-Mail
                </label>
                <input
                  id="invite-email"
                  name="email"
                  type="email"
                  required
                  defaultValue={invite?.email ?? ""}
                  className="mt-1 w-full rounded-lg border border-zinc-300 px-3 py-2.5"
                />
              </div>
              <div>
                <label htmlFor="invite-brewery" className="text-sm font-medium text-zinc-800">
                  Brauerei / Betriebsname (optional)
                </label>
                <input
                  id="invite-brewery"
                  name="brewery"
                  type="text"
                  className="mt-1 w-full rounded-lg border border-zinc-300 px-3 py-2.5"
                />
              </div>
              <div>
                <label htmlFor="invite-password" className="text-sm font-medium text-zinc-800">
                  Passwort
                </label>
                <input
                  id="invite-password"
                  name="password"
                  type="password"
                  minLength={6}
                  required
                  className="mt-1 w-full rounded-lg border border-zinc-300 px-3 py-2.5"
                />
              </div>
              <button
                type="submit"
                className="inline-flex w-full items-center justify-center rounded-lg bg-[#c65a20] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#b14f1c]"
              >
                Einladung annehmen und Konto erstellen
              </button>
            </form>
          </>
        ) : (
          <div className="mt-5 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-900">
            {statusMessage(status)}
          </div>
        )}

        <p className="mt-4 text-sm text-zinc-600">
          Du hast schon ein Konto?{" "}
          <a href={APP_LOGIN_URL} className="font-medium text-[#c65a20] hover:underline">
            Jetzt anmelden
          </a>
        </p>
      </section>
    </main>
  );
}
