"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { Send, X } from "lucide-react";

import { HopfenHugoAvatar } from "@/components/HopfenHugoAvatar";
import { HopfenHugoIcon } from "@/components/HopfenHugoIcon";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const SUGGESTIONS = [
  "Wie spare ich Tokens bei vielen Bildvarianten?",
  "Was bringt mir der Brand-Lock fürs Bild?",
  "Wie schreibe ich einen guten Prompt für ein Garten-Motiv?",
] as const;

type ChatMsg = {
  id: string;
  role: "user" | "assistant";
  text: string;
  variant?: "error";
};

function nextId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

const WELCOME_TEXT =
  "Hallo, ich bin Hopfen Hugo. Ich helfe nur bei KI-Bildern in EvGlab: Prompts, Stil, Markenlook, Formate, Mediathek und Token fürs Generieren. Fragt mich hier testweise zu eurem nächsten Motiv — Rezepte oder allgemeines Brauwissen gehören nicht dazu.";

export function HopfenHugoDemoAsk({ className }: { className?: string }) {
  const titleId = useId();
  const logId = useId();
  const inputId = useId();
  const endRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const launcherRef = useRef<HTMLButtonElement>(null);
  const wasOpenRef = useRef(false);

  const [open, setOpen] = useState(false);
  const [openEntered, setOpenEntered] = useState(false);
  const [messages, setMessages] = useState<ChatMsg[]>([
    { id: "welcome", role: "assistant", text: WELCOME_TEXT },
  ]);
  const [draft, setDraft] = useState("");
  const [loading, setLoading] = useState(false);

  const scrollToBottom = useCallback(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading, scrollToBottom]);

  useEffect(() => {
    if (open) {
      wasOpenRef.current = true;
      const id = requestAnimationFrame(() => textareaRef.current?.focus());
      return () => cancelAnimationFrame(id);
    }
    if (wasOpenRef.current) {
      launcherRef.current?.focus();
    }
    wasOpenRef.current = false;
  }, [open]);

  useEffect(() => {
    if (!open) {
      setOpenEntered(false);
      return;
    }
    const id = requestAnimationFrame(() => setOpenEntered(true));
    return () => cancelAnimationFrame(id);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  const sendText = useCallback(async (raw: string) => {
    const text = raw.trim();
    if (!text || loading) return;

    const userMsg: ChatMsg = { id: nextId(), role: "user", text };
    setMessages((prev) => [...prev, userMsg]);
    setDraft("");
    setLoading(true);

    try {
      const res = await fetch("/api/claude/brauerei-assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question: text,
          currentTab: "Über uns (Demo-Chat)",
          assistantPersona: "hopfen-hugo",
        }),
      });
      const data = (await res.json().catch(() => ({}))) as { answer?: string; error?: string };

      if (!res.ok) {
        const errText =
          data.error ?? "Hopfen Hugo konnte gerade nicht antworten. Bitte später noch einmal versuchen.";
        setMessages((prev) => [
          ...prev,
          { id: nextId(), role: "assistant", text: errText, variant: "error" },
        ]);
        return;
      }
      const answer = data.answer;
      if (typeof answer === "string" && answer.trim()) {
        setMessages((prev) => [...prev, { id: nextId(), role: "assistant", text: answer.trim() }]);
        return;
      }
      setMessages((prev) => [
        ...prev,
        {
          id: nextId(),
          role: "assistant",
          text: "Leider kam keine Antwort zurück.",
          variant: "error",
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: nextId(),
          role: "assistant",
          text: "Netzwerkfehler — bitte Verbindung prüfen und erneut versuchen.",
          variant: "error",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }, [loading]);

  const shellClass =
    "relative w-full max-w-md justify-self-center lg:max-w-none lg:justify-self-end";

  if (!open) {
    return (
      <div className={cn(shellClass, className)}>
        <div className="flex flex-col overflow-hidden rounded-2xl border border-zinc-200/90 bg-white/95 p-6 shadow-[0_16px_40px_-28px_rgba(15,23,42,0.14)] ring-1 ring-zinc-950/[0.04] backdrop-blur-sm sm:p-7">
          <div className="flex items-start gap-4">
            <HopfenHugoIcon className="h-12 w-12 shrink-0 drop-shadow-[0_6px_14px_rgba(15,23,42,0.1)]" />
            <div className="min-w-0 flex-1">
              <h3 className="font-display text-lg font-semibold tracking-tight text-zinc-900">Demo-Chat</h3>
              <p className="mt-2 text-pretty text-sm leading-relaxed text-zinc-600">
                Wie im Dashboard: erst öffnen, dann mit Hopfen Hugo zu Prompts und Bild-Setup schreiben — hier im Browser
                testweise.
              </p>
            </div>
          </div>
          <Button
            ref={launcherRef}
            type="button"
            className="mt-6 h-11 w-full rounded-xl border-lime-900/20 bg-[#ecfccb] text-base font-semibold text-lime-950 shadow-sm hover:bg-[#d9f99d]"
            onClick={() => setOpen(true)}
          >
            <HopfenHugoIcon className="mr-2 h-4 w-4" />
            Chat mit Hopfen Hugo öffnen
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className={cn(shellClass, className)}>
      <aside
        className={cn(
          "absolute left-0 top-0 z-20 flex h-[min(32rem,72dvh)] w-full flex-col overflow-hidden rounded-2xl border border-zinc-200/90 bg-white shadow-[0_16px_40px_-28px_rgba(15,23,42,0.18)] ring-1 ring-zinc-950/[0.04] sm:h-[min(28rem,65dvh)]",
          "origin-top transition-[opacity,transform] duration-300 ease-out motion-reduce:transition-none",
          openEntered ? "translate-y-0 scale-y-100 opacity-100" : "-translate-y-1 scale-y-95 opacity-0",
        )}
        aria-labelledby={titleId}
      >
      {/* Kopf */}
      <div className="shrink-0 border-b border-zinc-200/80 bg-gradient-to-r from-zinc-50/95 to-white px-3 py-3 sm:px-4">
        <div className="flex items-center gap-2">
          <div className="flex min-w-0 flex-1 items-center gap-3">
            {loading ? (
              <HopfenHugoAvatar
                thinking
                size={44}
                className="drop-shadow-[0_4px_12px_rgba(15,23,42,0.1)]"
              />
            ) : (
              <HopfenHugoIcon className="h-11 w-11 shrink-0 drop-shadow-[0_4px_12px_rgba(15,23,42,0.1)]" />
            )}
            <div className="min-w-0">
              <h3 id={titleId} className="truncate font-semibold tracking-tight text-zinc-900">
                Hopfen Hugo
              </h3>
              <p className="truncate text-xs text-zinc-500">Demo · nur Bildgenerierung</p>
            </div>
          </div>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="h-10 w-10 shrink-0 rounded-xl text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900"
            aria-label="Chat schließen"
            onClick={() => setOpen(false)}
          >
            <X className="h-5 w-5" aria-hidden />
          </Button>
        </div>
      </div>

      {/* Vorschläge */}
      <div className="shrink-0 border-b border-zinc-100 bg-zinc-50/40 px-3 py-2">
        <p className="mb-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-zinc-400">Vorschläge</p>
        <div className="flex flex-wrap gap-1.5">
          {SUGGESTIONS.map((s) => (
            <button
              key={s}
              type="button"
              className="rounded-full border border-zinc-200/90 bg-white px-2.5 py-1 text-left text-[11px] font-medium leading-tight text-zinc-700 shadow-sm transition hover:border-[#c65a20]/35 hover:text-zinc-900"
              disabled={loading}
              onClick={() => void sendText(s)}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Nachrichten */}
      <div
        id={logId}
        role="log"
        aria-relevant="additions"
        aria-live="polite"
        className="min-h-0 flex-1 overflow-y-auto overscroll-contain bg-zinc-50/60 px-3 py-3"
      >
        <div className="flex flex-col gap-3">
          {messages.map((m) => (
            <div
              key={m.id}
              className={cn("flex w-full", m.role === "user" ? "justify-end" : "justify-start")}
            >
              <div
                className={cn(
                  "max-w-[min(100%,20rem)] text-pretty text-sm leading-relaxed shadow-sm",
                  m.role === "user"
                    ? "rounded-2xl rounded-tr-md bg-zinc-800 px-3.5 py-2.5 text-white"
                    : m.variant === "error"
                      ? "rounded-2xl rounded-tl-md border border-red-200/90 bg-red-50/95 px-3.5 py-2.5 text-red-950"
                      : "rounded-2xl rounded-tl-md border border-zinc-200/90 bg-white px-3.5 py-2.5 text-zinc-800",
                )}
              >
                {m.role === "assistant" && m.variant !== "error" ? (
                  <p className="mb-1 text-[10px] font-semibold uppercase tracking-wide text-[#b45309]/90">
                    Hopfen Hugo
                  </p>
                ) : null}
                <p className="whitespace-pre-wrap">{m.text}</p>
              </div>
            </div>
          ))}

          {loading ? (
            <div className="flex justify-start">
              <div className="flex items-center gap-2.5 rounded-2xl rounded-tl-md border border-zinc-200/90 bg-white px-3.5 py-2.5 text-sm text-zinc-500 shadow-sm">
                <HopfenHugoAvatar thinking size={36} className="shrink-0" />
                <span>Denkt kurz nach …</span>
              </div>
            </div>
          ) : null}
          <div ref={endRef} className="h-px shrink-0" aria-hidden />
        </div>
      </div>

      {/* Eingabe */}
      <form
        className="shrink-0 border-t border-zinc-200/80 bg-white p-3"
        onSubmit={(e) => {
          e.preventDefault();
          void sendText(draft);
        }}
      >
        <label htmlFor={inputId} className="sr-only">
          Nachricht an Hopfen Hugo
        </label>
        <div className="flex items-end gap-2">
          <textarea
            ref={textareaRef}
            id={inputId}
            name="hopfen-hugo-chat"
            rows={1}
            maxLength={1200}
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                void sendText(draft);
              }
            }}
            placeholder="Frage zu Prompt, Motiv oder Bild-Setup …"
            disabled={loading}
            className="max-h-28 min-h-[2.5rem] w-full resize-none rounded-xl border border-zinc-200 bg-zinc-50/80 px-3 py-2 text-sm text-zinc-900 shadow-inner outline-none transition placeholder:text-zinc-400 focus:border-[#c65a20]/45 focus:bg-white focus:ring-2 focus:ring-[#c65a20]/12 disabled:opacity-60"
          />
          <Button
            type="submit"
            variant="outline"
            size="icon"
            className="h-10 w-10 shrink-0 rounded-xl border-lime-900/25 bg-[#ecfccb] text-lime-950 shadow-sm hover:bg-[#d9f99d]"
            disabled={loading || !draft.trim()}
            aria-label="Senden"
          >
            <Send className="h-4 w-4" aria-hidden />
          </Button>
        </div>
        <p className="mt-2 text-center text-[10px] text-zinc-400">Enter sendet · Shift+Enter neue Zeile · max. 1200 Zeichen</p>
      </form>
      </aside>
    </div>
  );
}
