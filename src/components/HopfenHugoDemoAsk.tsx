"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { Loader2, Send } from "lucide-react";

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
      if (typeof data.answer === "string" && data.answer.trim()) {
        setMessages((prev) => [...prev, { id: nextId(), role: "assistant", text: data.answer.trim() }]);
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

  return (
    <aside
      className={cn(
        "relative flex h-[min(32rem,72dvh)] w-full max-w-md flex-col justify-self-center overflow-hidden rounded-2xl border border-zinc-200/90 bg-white shadow-[0_16px_40px_-28px_rgba(15,23,42,0.18)] ring-1 ring-zinc-950/[0.04] sm:h-[min(28rem,65dvh)] lg:max-w-none lg:justify-self-end",
        className,
      )}
      aria-labelledby={titleId}
    >
      {/* Kopf */}
      <div className="shrink-0 border-b border-zinc-200/80 bg-gradient-to-r from-zinc-50/95 to-white px-4 py-3">
        <div className="flex items-center gap-3">
          <div
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-lime-900/15 bg-[#d9ff6a]/50 shadow-sm"
            aria-hidden
          >
            <span className="text-lg" aria-hidden>
              🍺
            </span>
          </div>
          <div className="min-w-0">
            <h3 id={titleId} className="truncate font-semibold tracking-tight text-zinc-900">
              Hopfen Hugo
            </h3>
            <p className="truncate text-xs text-zinc-500">Demo · nur Bildgenerierung</p>
          </div>
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
              <div className="flex items-center gap-2 rounded-2xl rounded-tl-md border border-zinc-200/90 bg-white px-3.5 py-2.5 text-sm text-zinc-500 shadow-sm">
                <Loader2 className="h-4 w-4 shrink-0 animate-spin text-[#c65a20]" aria-hidden />
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
  );
}
