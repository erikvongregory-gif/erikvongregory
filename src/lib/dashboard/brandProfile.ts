import { getDashboardMetadata } from "@/lib/dashboard/metadata";

export type BrandProfile = {
  breweryName: string;
  brandTone: string;
  brandColors: string;
  brandDos: string;
  brandDonts: string;
  brandReferenceImageUrls: string[];
};

function asString(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function asStringArray(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value
    .map((item) => (typeof item === "string" ? item.trim() : ""))
    .filter(Boolean)
    .slice(0, 10);
}

export function getBrandProfileFromMetadata(userMetadata: unknown): BrandProfile {
  const dashboard = getDashboardMetadata(userMetadata);
  const settings = dashboard.settings as Record<string, unknown> | undefined;
  return {
    breweryName: asString(settings?.breweryName),
    brandTone: asString(settings?.brandTone),
    brandColors: asString(settings?.brandColors),
    brandDos: asString(settings?.brandDos),
    brandDonts: asString(settings?.brandDonts),
    brandReferenceImageUrls: asStringArray(settings?.brandReferenceImageUrls),
  };
}

export function isBrandProfileComplete(profile: BrandProfile): boolean {
  return Boolean(
    profile.breweryName &&
      profile.brandTone &&
      profile.brandColors &&
      profile.brandDos &&
      profile.brandDonts &&
      profile.brandReferenceImageUrls.length >= 1,
  );
}

export function buildBrandProfilePromptContext(profile: BrandProfile): string {
  return [
    "Brand profile lock (MANDATORY):",
    `- Brand/Brewery: ${profile.breweryName}`,
    `- Brand tone: ${profile.brandTone}`,
    `- Brand colors/style cues: ${profile.brandColors}`,
    `- Must include style rules: ${profile.brandDos}`,
    `- Must avoid style rules: ${profile.brandDonts}`,
    `- Reference image URLs available: ${profile.brandReferenceImageUrls.join(", ")}`,
    "- Keep all generated outputs aligned with this brand profile unless the user explicitly overrides it.",
  ].join("\n");
}
