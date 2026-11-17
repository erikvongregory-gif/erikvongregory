import {
  UMFRAGE_FINAL_NOTE,
  UMFRAGE_META,
  UMFRAGE_QUESTIONS,
  type UmfrageQuestion,
} from "@/content/umfrage";

export type UmfrageNotifyInput = {
  name?: string;
  company?: string;
  /** Telefon oder E-Mail, wie eingegeben. */
  contact?: string;
  /** Gesetzt, wenn contact eine E-Mail ist (für reply_to). */
  email?: string;
  answers: Record<string, unknown>;
};

function optionLabel(q: UmfrageQuestion, optionId: string, groupId?: string): string {
  if (groupId) {
    const g = q.groups?.find((x) => x.id === groupId);
    return g?.options.find((o) => o.id === optionId)?.label ?? optionId;
  }
  return q.options?.find((o) => o.id === optionId)?.label ?? optionId;
}

function formatValue(q: UmfrageQuestion, value: unknown): string {
  if (value == null) return "—";
  if (q.type === "rank" && Array.isArray(value)) {
    return value.map((v, i) => `${i + 1}. ${optionLabel(q, String(v))}`).join("  ");
  }
  if (Array.isArray(value)) {
    return value.map((v) => optionLabel(q, String(v))).join(", ");
  }
  if (q.type === "groups" && typeof value === "object") {
    return (q.groups ?? [])
      .map((g) => {
        const v = (value as Record<string, unknown>)[g.id];
        return `${g.label}: ${v ? optionLabel(q, String(v), g.id) : "—"}`;
      })
      .join(" · ");
  }
  if (typeof value === "string") {
    if (q.type === "text") return value;
    return optionLabel(q, value);
  }
  return String(value);
}

function answerRows(answers: Record<string, unknown>) {
  const rows: { n: string; title: string; value: string }[] = [];

  for (const q of UMFRAGE_QUESTIONS) {
    if (q.type === "info" || !(q.id in answers)) continue;
    rows.push({ n: q.n, title: q.title, value: formatValue(q, answers[q.id]) });

    const otherKey = `${q.id}_sonstiges`;
    if (otherKey in answers) {
      rows.push({ n: q.n, title: "↳ Ergänzung", value: String(answers[otherKey] ?? "") });
    }
    if (q.extra) {
      const extraKey = `${q.id}_${q.extra.id}`;
      if (extraKey in answers) {
        const suffix = q.extra.suffix ? ` ${q.extra.suffix}` : "";
        rows.push({
          n: q.n,
          title: `↳ ${q.extra.label}`,
          value: `${String(answers[extraKey] ?? "")}${suffix}`,
        });
      }
    }
  }

  const note = answers[UMFRAGE_FINAL_NOTE.id];
  if (typeof note === "string" && note) {
    rows.push({ n: "+", title: UMFRAGE_FINAL_NOTE.title, value: note });
  }

  return rows;
}

function headerRows(input: UmfrageNotifyInput) {
  const a = input.answers;
  const label = (qid: string) => {
    const q = UMFRAGE_QUESTIONS.find((x) => x.id === qid);
    return q && typeof a[qid] === "string" ? optionLabel(q, a[qid] as string) : "(keine Angabe)";
  };
  return [
    ["Name", input.name || "(keine Angabe)"],
    ["Brauerei", input.company || "(keine Angabe)"],
    ["Telefon/E-Mail", input.contact || "(keine Angabe)"],
    ["Beispielmotiv", label("beispielmotiv")],
    ["Gespräch", label("gespraech")],
    ["Test für 79 €", label("test_79")],
  ] as const;
}

export function formatUmfrageNotifyText(input: UmfrageNotifyInput): string {
  const rows = answerRows(input.answers);
  return [
    `Neue Umfrage-Antwort – ${UMFRAGE_META.title}`,
    "",
    ...headerRows(input).map(([k, v]) => `${k}: ${v}`),
    "",
    "──── Antworten ────",
    ...rows.map((r) => `\n${r.n ? `${r.n}. ` : ""}${r.title}\n→ ${r.value}`),
  ].join("\n");
}

export function formatUmfrageNotifyHtml(input: UmfrageNotifyInput): string {
  const rows = answerRows(input.answers);

  const answerBlocks = rows
    .map(
      (r) => `
      <tr>
        <td style="padding:14px 0;border-bottom:1px solid #e8e2d8;">
          ${r.title.startsWith("↳") ? "" : `<div style="font-size:11px;letter-spacing:0.08em;text-transform:uppercase;color:#c65a20;font-weight:600;margin-bottom:4px;">Frage ${escapeHtml(r.n)}</div>`}
          <div style="font-size:14px;color:#57534e;margin-bottom:6px;line-height:1.4;">${escapeHtml(r.title)}</div>
          <div style="font-size:16px;color:#1c1917;font-weight:600;line-height:1.45;white-space:pre-wrap;">${escapeHtml(r.value)}</div>
        </td>
      </tr>`,
    )
    .join("");

  const header = headerRows(input)
    .map(([k, v]) => {
      const isMail = k === "Telefon/E-Mail" && input.email;
      const value = isMail
        ? `<a href="mailto:${escapeHtml(input.email!)}" style="color:#c65a20;text-decoration:none;">${escapeHtml(v)}</a>`
        : escapeHtml(v);
      return `
              <tr>
                <td style="padding:4px 0;font-size:13px;color:#78716c;width:140px;">${escapeHtml(k)}</td>
                <td style="padding:4px 0;font-size:14px;color:#1c1917;font-weight:600;">${value}</td>
              </tr>`;
    })
    .join("");

  const hot = input.contact && input.answers.gespraech === "ja";
  const leadBadge = hot
    ? `<span style="display:inline-block;background:#c65a20;color:#fff;font-size:12px;font-weight:700;padding:4px 10px;border-radius:999px;">Gespräch gewünscht</span>`
    : "";

  return `<!DOCTYPE html>
<html lang="de">
<body style="margin:0;padding:0;background:#f4efe6;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f4efe6;padding:24px 12px;">
    <tr><td align="center">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#ffffff;border-radius:16px;overflow:hidden;border:1px solid #e7e0d4;">
        <tr>
          <td style="padding:22px 24px;background:#0a0f14;">
            <div style="font-size:12px;letter-spacing:0.14em;text-transform:uppercase;color:#e07a40;font-weight:600;">BrewAI Umfrage</div>
            <div style="font-size:20px;color:#fff;font-weight:700;margin-top:6px;line-height:1.3;">${escapeHtml(UMFRAGE_META.title)}</div>
            ${leadBadge ? `<div style="margin-top:12px;">${leadBadge}</div>` : ""}
          </td>
        </tr>
        <tr>
          <td style="padding:20px 24px;background:#faf7f2;border-bottom:1px solid #e8e2d8;">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0">${header}
            </table>
          </td>
        </tr>
        <tr>
          <td style="padding:8px 24px 20px;">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
              ${answerBlocks}
            </table>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
