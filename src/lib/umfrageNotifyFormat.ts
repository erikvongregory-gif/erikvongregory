import { UMFRAGE_META, UMFRAGE_QUESTIONS, type UmfrageQuestion } from "@/content/umfrage";
import { SITE } from "@/lib/siteConfig";

const LEAD_LABELS: Record<string, string> = {
  ja: "Ja – Interesse an persönlicher Auswertung",
  spaeter: "Später",
  nein: "Nein",
};

function questionById(id: string): UmfrageQuestion | undefined {
  return UMFRAGE_QUESTIONS.find((q) => q.id === id);
}

function optionLabel(q: UmfrageQuestion | undefined, optionId: string): string {
  return q?.options?.find((o) => o.id === optionId)?.label ?? optionId;
}

function formatValue(q: UmfrageQuestion | undefined, value: unknown): string {
  if (value == null) return "—";
  if (q?.type === "scale" && typeof value === "number") {
    const label = q.scaleLabels?.[value];
    return label ? `${value}/5 – ${label}` : `${value}/5`;
  }
  if (Array.isArray(value)) {
    return value.map((v) => optionLabel(q, String(v))).join(", ");
  }
  if (typeof value === "string") {
    if (q?.type === "text") return value;
    if (q?.options) return optionLabel(q, value);
    return value;
  }
  return String(value);
}

function answerRows(answers: Record<string, unknown>) {
  const rows: { n: string; title: string; value: string }[] = [];
  const seen = new Set<string>();

  for (const q of UMFRAGE_QUESTIONS) {
    if (!(q.id in answers)) continue;
    seen.add(q.id);
    rows.push({
      n: q.n,
      title: q.title,
      value: formatValue(q, answers[q.id]),
    });
    const otherKey = `${q.id}_sonstiges`;
    if (otherKey in answers) {
      seen.add(otherKey);
      rows.push({
        n: q.n,
        title: `${q.title} – Sonstiges`,
        value: String(answers[otherKey] ?? ""),
      });
    }
  }

  for (const [key, value] of Object.entries(answers)) {
    if (seen.has(key)) continue;
    const baseId = key.replace(/_sonstiges$/, "");
    const q = questionById(baseId);
    rows.push({
      n: q?.n ?? "–",
      title: key.endsWith("_sonstiges")
        ? `${q?.title ?? baseId} – Sonstiges`
        : (q?.title ?? key),
      value: formatValue(q, value),
    });
  }

  return rows;
}

export function formatUmfrageNotifyText(input: {
  company?: string;
  email?: string;
  wantsResults: boolean;
  wantsPersonalAnalysis?: string;
  answers: Record<string, unknown>;
}): string {
  const rows = answerRows(input.answers);
  const analysis =
    LEAD_LABELS[input.wantsPersonalAnalysis ?? ""] ??
    input.wantsPersonalAnalysis ??
    "(keine Angabe)";

  return [
    "Neue Umfrage-Antwort – Brauerei-Marketing-Barometer 2026",
    "",
    `Brauerei: ${input.company || "(keine Angabe)"}`,
    `E-Mail: ${input.email || "(keine Angabe)"}`,
    `Auswertung gewünscht: ${input.wantsResults ? "Ja" : "Nein"}`,
    `Persönliche Analyse: ${analysis}`,
    "",
    `Auswertungsseite: ${SITE.baseUrl}${UMFRAGE_META.resultsPath}`,
    "",
    "──── Antworten ────",
    ...rows.map((r) => `\n${r.n}. ${r.title}\n→ ${r.value}`),
  ].join("\n");
}

export function formatUmfrageNotifyHtml(input: {
  company?: string;
  email?: string;
  wantsResults: boolean;
  wantsPersonalAnalysis?: string;
  answers: Record<string, unknown>;
}): string {
  const rows = answerRows(input.answers);
  const analysis =
    LEAD_LABELS[input.wantsPersonalAnalysis ?? ""] ??
    input.wantsPersonalAnalysis ??
    "(keine Angabe)";
  const company = escapeHtml(input.company || "(keine Angabe)");
  const email = escapeHtml(input.email || "(keine Angabe)");

  const answerBlocks = rows
    .map(
      (r) => `
      <tr>
        <td style="padding:14px 0;border-bottom:1px solid #e8e2d8;">
          <div style="font-size:11px;letter-spacing:0.08em;text-transform:uppercase;color:#c65a20;font-weight:600;margin-bottom:4px;">Frage ${escapeHtml(r.n)}</div>
          <div style="font-size:14px;color:#57534e;margin-bottom:6px;line-height:1.4;">${escapeHtml(r.title)}</div>
          <div style="font-size:16px;color:#1c1917;font-weight:600;line-height:1.45;">${escapeHtml(r.value)}</div>
        </td>
      </tr>`,
    )
    .join("");

  const leadBadge =
    input.wantsPersonalAnalysis === "ja"
      ? `<span style="display:inline-block;background:#c65a20;color:#fff;font-size:12px;font-weight:700;padding:4px 10px;border-radius:999px;">Hot Lead</span>`
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
            <div style="font-size:20px;color:#fff;font-weight:700;margin-top:6px;line-height:1.3;">Brauerei-Marketing-Barometer 2026</div>
            ${leadBadge ? `<div style="margin-top:12px;">${leadBadge}</div>` : ""}
          </td>
        </tr>
        <tr>
          <td style="padding:20px 24px;background:#faf7f2;border-bottom:1px solid #e8e2d8;">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td style="padding:4px 0;font-size:13px;color:#78716c;width:140px;">Brauerei</td>
                <td style="padding:4px 0;font-size:14px;color:#1c1917;font-weight:600;">${company}</td>
              </tr>
              <tr>
                <td style="padding:4px 0;font-size:13px;color:#78716c;">E-Mail</td>
                <td style="padding:4px 0;font-size:14px;color:#1c1917;font-weight:600;">${
                  input.email
                    ? `<a href="mailto:${email}" style="color:#c65a20;text-decoration:none;">${email}</a>`
                    : email
                }</td>
              </tr>
              <tr>
                <td style="padding:4px 0;font-size:13px;color:#78716c;">Auswertung</td>
                <td style="padding:4px 0;font-size:14px;color:#1c1917;font-weight:600;">${
                  input.wantsResults ? "Ja, bitte zusenden" : "Nein"
                }</td>
              </tr>
              <tr>
                <td style="padding:4px 0;font-size:13px;color:#78716c;">Persönl. Analyse</td>
                <td style="padding:4px 0;font-size:14px;color:#1c1917;font-weight:600;">${escapeHtml(analysis)}</td>
              </tr>
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
