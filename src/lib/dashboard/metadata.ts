export type DashboardMediaItem = {
  id: string;
  imageUrl: string;
  prompt: string;
  createdAt: string;
  aspectRatio: string;
  resolution: "1K" | "2K" | "4K";
  outputFormat: "png" | "jpg";
};

export type DashboardTeamRole = "owner" | "admin" | "editor" | "viewer";

export type DashboardTeamMember = {
  id: string;
  email: string;
  name: string;
  role: DashboardTeamRole;
  status: "active" | "invited";
  invitedAt: string;
};

export type DashboardSettings = {
  profileName: string;
  breweryName: string;
  profilePhone: string;
  emailNotifications: boolean;
  weeklySummary: boolean;
};

export type DashboardMetadata = {
  mediaLibrary?: DashboardMediaItem[];
  teamMembers?: DashboardTeamMember[];
  settings?: DashboardSettings;
};

function asObj(value: unknown): Record<string, unknown> {
  return typeof value === "object" && value !== null ? (value as Record<string, unknown>) : {};
}

export function getDashboardMetadata(userMetadata: unknown): DashboardMetadata {
  const base = asObj(userMetadata);
  const dashboard = asObj(base.dashboard);

  return {
    mediaLibrary: Array.isArray(dashboard.mediaLibrary)
      ? (dashboard.mediaLibrary as DashboardMediaItem[]).slice(0, 150)
      : [],
    teamMembers: Array.isArray(dashboard.teamMembers)
      ? (dashboard.teamMembers as DashboardTeamMember[]).slice(0, 50)
      : [],
    settings: asObj(dashboard.settings) as DashboardSettings,
  };
}

export function mergeDashboardMetadata(
  userMetadata: unknown,
  patch: Partial<DashboardMetadata>,
): Record<string, unknown> {
  const base = asObj(userMetadata);
  const dashboard = asObj(base.dashboard);
  return {
    ...base,
    dashboard: {
      ...dashboard,
      ...patch,
    },
  };
}
