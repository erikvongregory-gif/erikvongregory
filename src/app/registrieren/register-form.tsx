"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export function RegisterForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [breweryName, setBreweryName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setInfo(null);
    setLoading(true);
    try {
      const supabase = createClient();
      const origin = window.location.origin;
      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${origin}/auth/callback?next=/dashboard`,
          data: {
            brewery_name: breweryName.trim() || null,
          },
        },
      });
      if (signUpError) {
        setError(signUpError.message);
        setLoading(false);
        return;
      }
      if (data.user && !data.session) {
        setInfo(
          "Bitte prüfe dein Postfach und bestätige deine E-Mail. Danach kannst du dich anmelden.",
        );
        setLoading(false);
        return;
      }
      router.push("/dashboard");
      router.refresh();
    } catch {
      setError("Unerwarteter Fehler. Bitte später erneut versuchen.");
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-5">
      <div>
        <label htmlFor="reg-brewery" className="text-sm font-medium text-zinc-800">
          Brauerei / Betriebsname <span className="font-normal text-zinc-500">(optional)</span>
        </label>
        <input
          id="reg-brewery"
          name="brewery"
          type="text"
          autoComplete="organization"
          value={breweryName}
          onChange={(e) => setBreweryName(e.target.value)}
          className="mt-1 w-full rounded-lg border border-zinc-300 bg-white px-3 py-2.5 text-zinc-900 shadow-sm placeholder:text-zinc-400 focus:border-[#c65a20]/60 focus:outline-none focus:ring-2 focus:ring-[#c65a20]/25"
          placeholder="z. B. Schalander Brauerei"
        />
      </div>
      <div>
        <label htmlFor="reg-email" className="text-sm font-medium text-zinc-800">
          E-Mail
        </label>
        <input
          id="reg-email"
          name="email"
          type="email"
          autoComplete="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-1 w-full rounded-lg border border-zinc-300 bg-white px-3 py-2.5 text-zinc-900 shadow-sm placeholder:text-zinc-400 focus:border-[#c65a20]/60 focus:outline-none focus:ring-2 focus:ring-[#c65a20]/25"
        />
      </div>
      <div>
        <label htmlFor="reg-password" className="text-sm font-medium text-zinc-800">
          Passwort
        </label>
        <input
          id="reg-password"
          name="password"
          type="password"
          autoComplete="new-password"
          required
          minLength={6}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mt-1 w-full rounded-lg border border-zinc-300 bg-white px-3 py-2.5 text-zinc-900 shadow-sm placeholder:text-zinc-400 focus:border-[#c65a20]/60 focus:outline-none focus:ring-2 focus:ring-[#c65a20]/25"
        />
        <p className="mt-1 text-xs text-zinc-500">Mindestens 6 Zeichen (einstellbar in Supabase).</p>
      </div>
      {error ? (
        <p className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-800" role="alert">
          {error}
        </p>
      ) : null}
      {info ? (
        <p className="rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-900" role="status">
          {info}
        </p>
      ) : null}
      <button
        type="submit"
        disabled={loading}
        className="inline-flex w-full items-center justify-center rounded-lg bg-gradient-to-br from-[#d46830] to-[#b84d15] px-4 py-2.5 text-sm font-semibold text-white shadow-md transition hover:brightness-105 disabled:opacity-60"
      >
        {loading ? "Wird registriert …" : "Konto anlegen"}
      </button>
      <p className="text-center text-sm text-zinc-600">
        Schon registriert?{" "}
        <Link href="/anmelden" className="font-medium text-[#c65a20] hover:underline">
          Anmelden
        </Link>
      </p>
    </form>
  );
}
