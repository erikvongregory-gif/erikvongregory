"use client";

import type { FormEvent } from "react";
import Link from "next/link";
import { Beer } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Login1Props {
  heading?: string;
  logo?: {
    url: string;
    src: string;
    alt: string;
    title?: string;
  };
  buttonText?: string;
  signupText?: string;
  signupUrl?: string;
  email: string;
  password: string;
  onEmailChange: (value: string) => void;
  onPasswordChange: (value: string) => void;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  loading?: boolean;
  error?: string | null;
}

const Login1 = ({
  heading,
  logo = {
    url: "https://erikvongregory.com",
    src: "https://images.unsplash.com/photo-1470337458703-46ad1756a187?auto=format&fit=crop&w=160&q=80",
    alt: "Brauerei",
    title: "EvG Lab",
  },
  buttonText = "Anmelden",
  signupText = "Noch kein Konto?",
  signupUrl = "/registrieren",
  email,
  password,
  onEmailChange,
  onPasswordChange,
  onSubmit,
  loading = false,
  error,
}: Login1Props) => {
  return (
    <section className="bg-background min-h-screen py-12">
      <div className="flex h-full items-center justify-center px-4">
        <div className="border-muted bg-background flex w-full max-w-sm flex-col items-center gap-y-8 rounded-md border px-6 py-12 shadow-md">
          <div className="flex flex-col items-center gap-y-2">
            <div className="flex items-center gap-2 lg:justify-start">
              <Beer className="size-5 text-[#c65a20]" aria-hidden />
              <a href={logo.url} className="inline-flex items-center gap-2">
                <img src={logo.src} alt={logo.alt} title={logo.title} className="h-10 w-10 rounded-full object-cover" />
                <span className="text-sm font-semibold text-zinc-900">EvG Lab</span>
              </a>
            </div>
            {heading && <h1 className="text-3xl font-semibold text-zinc-900">{heading}</h1>}
          </div>

          <form onSubmit={onSubmit} className="flex w-full flex-col gap-8">
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <Input
                  type="email"
                  placeholder="Email"
                  required
                  value={email}
                  onChange={(e) => onEmailChange(e.target.value)}
                  className="border-zinc-300 bg-white text-zinc-900 placeholder:text-zinc-400"
                />
              </div>
              <div className="flex flex-col gap-2">
                <Input
                  type="password"
                  placeholder="Password"
                  required
                  value={password}
                  onChange={(e) => onPasswordChange(e.target.value)}
                  className="border-zinc-300 bg-white text-zinc-900 placeholder:text-zinc-400"
                />
              </div>

              {error ? (
                <p className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700" role="alert">
                  {error}
                </p>
              ) : null}

              <div className="flex flex-col gap-4">
                <Button type="submit" className="mt-2 w-full" disabled={loading}>
                  {loading ? "Wird angemeldet..." : buttonText}
                </Button>
              </div>
            </div>
          </form>

          <div className="text-muted-foreground flex justify-center gap-1 text-sm">
            <p>{signupText}</p>
            <Link href={signupUrl} className="text-primary font-medium hover:underline">
              Registrieren
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Login1 };
