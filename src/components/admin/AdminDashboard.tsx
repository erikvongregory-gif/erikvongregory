"use client";

import { useEffect, useState } from "react";

type AdminTab = "users" | "billing" | "team" | "content";

type AdminUser = {
  id: string;
  email: string;
  role: string;
  brewery: string;
  createdAt: string;
  lastSignInAt: string | null;
};

export function AdminDashboard() {
  const [tab, setTab] = useState<AdminTab>("users");
  const [q, setQ] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [billingRows, setBillingRows] = useState<Array<Record<string, unknown>>>([]);
  const [teamRows, setTeamRows] = useState<Array<Record<string, unknown>>>([]);
  const [contentRows, setContentRows] = useState<Array<Record<string, unknown>>>([]);

  const loadUsers = async () => {
    const res = await fetch(`/api/admin/users?q=${encodeURIComponent(q)}`, { cache: "no-store" });
    const data = (await res.json()) as { error?: string; users?: AdminUser[] };
    if (!res.ok) throw new Error(data.error ?? "Nutzer konnten nicht geladen werden.");
    setUsers(data.users ?? []);
  };

  const loadBilling = async () => {
    const res = await fetch("/api/admin/billing", { cache: "no-store" });
    const data = (await res.json()) as { error?: string; rows?: Array<Record<string, unknown>> };
    if (!res.ok) throw new Error(data.error ?? "Billing konnte nicht geladen werden.");
    setBillingRows(data.rows ?? []);
  };

  const loadTeam = async () => {
    const res = await fetch("/api/admin/team", { cache: "no-store" });
    const data = (await res.json()) as { error?: string; rows?: Array<Record<string, unknown>> };
    if (!res.ok) throw new Error(data.error ?? "Teamdaten konnten nicht geladen werden.");
    setTeamRows(data.rows ?? []);
  };

  const loadContent = async () => {
    const res = await fetch("/api/admin/content", { cache: "no-store" });
    const data = (await res.json()) as { error?: string; rows?: Array<Record<string, unknown>> };
    if (!res.ok) throw new Error(data.error ?? "Inhalte konnten nicht geladen werden.");
    setContentRows(data.rows ?? []);
  };

  const loadActiveTab = async () => {
    setLoading(true);
    setError("");
    try {
      if (tab === "users") await loadUsers();
      else if (tab === "billing") await loadBilling();
      else if (tab === "team") await loadTeam();
      else await loadContent();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Laden fehlgeschlagen.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadActiveTab();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tab]);

  useEffect(() => {
    if (tab !== "users") return;
    const id = window.setTimeout(() => {
      void loadUsers().catch((e) => setError(e instanceof Error ? e.message : "Suche fehlgeschlagen."));
    }, 250);
    return () => window.clearTimeout(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [q, tab]);

  const tabButton = (value: AdminTab, label: string) => (
    <button
      type="button"
      onClick={() => setTab(value)}
      className={`rounded-md px-3 py-2 text-sm font-medium transition ${
        tab === value
          ? "bg-[#c65a20] text-white"
          : "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200 dark:hover:bg-gray-800"
      }`}
    >
      {label}
    </button>
  );

  const usersView = (
    <div className="space-y-3">
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Suche nach E-Mail, Rolle, Brauerei..."
        className="h-10 w-full rounded-md border border-gray-300 bg-white px-3 text-sm dark:border-gray-700 dark:bg-gray-900"
      />
      <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-50 text-left dark:bg-gray-900">
            <tr>
              <th className="px-3 py-2">E-Mail</th>
              <th className="px-3 py-2">Rolle</th>
              <th className="px-3 py-2">Brauerei</th>
              <th className="px-3 py-2">Aktion</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-t border-gray-100 dark:border-gray-800">
                <td className="px-3 py-2">{user.email}</td>
                <td className="px-3 py-2">{user.role}</td>
                <td className="px-3 py-2">{user.brewery || "-"}</td>
                <td className="px-3 py-2">
                  <button
                    type="button"
                    onClick={async () => {
                      const nextRole = user.role === "admin" ? "user" : "admin";
                      const res = await fetch("/api/admin/users", {
                        method: "PATCH",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ userId: user.id, role: nextRole }),
                      });
                      const data = (await res.json()) as { error?: string };
                      if (!res.ok) {
                        setError(data.error ?? "Rolle konnte nicht geändert werden.");
                        return;
                      }
                      await loadUsers();
                    }}
                    className="rounded-md border border-gray-300 px-2 py-1 text-xs hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800"
                  >
                    {user.role === "admin" ? "Admin entfernen" : "Zu Admin machen"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const genericTable = (rows: Array<Record<string, unknown>>) => (
    <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700">
      <pre className="max-h-[60vh] overflow-auto p-3 text-xs">{JSON.stringify(rows, null, 2)}</pre>
    </div>
  );

  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
      <div className="mb-4 flex flex-wrap gap-2">
        {tabButton("users", "Nutzer")}
        {tabButton("billing", "Billing")}
        {tabButton("team", "Team/Invites")}
        {tabButton("content", "Inhalte")}
      </div>
      {loading ? <p className="text-sm text-gray-500">Lade Daten…</p> : null}
      {error ? (
        <p className="mb-3 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>
      ) : null}
      {!loading && tab === "users" ? usersView : null}
      {!loading && tab === "billing" ? genericTable(billingRows) : null}
      {!loading && tab === "team" ? genericTable(teamRows) : null}
      {!loading && tab === "content" ? (
        <div className="space-y-3">
          {contentRows.length > 0 ? (
            <button
              type="button"
              className="rounded-md border border-gray-300 px-3 py-2 text-xs hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800"
              onClick={async () => {
                const first = contentRows[0] as { ownerUserId?: string; id?: string };
                if (!first?.ownerUserId || !first?.id) return;
                const res = await fetch("/api/admin/content", {
                  method: "DELETE",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ ownerUserId: first.ownerUserId, mediaId: first.id }),
                });
                const data = (await res.json()) as { error?: string };
                if (!res.ok) {
                  setError(data.error ?? "Inhalt konnte nicht gelöscht werden.");
                  return;
                }
                await loadContent();
              }}
            >
              Erstes Element entfernen (MVP-Aktion)
            </button>
          ) : null}
          {genericTable(contentRows)}
        </div>
      ) : null}
    </section>
  );
}
