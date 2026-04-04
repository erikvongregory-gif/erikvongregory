/** Desktop-Windows im typischen Browser-UA (Windows 10/11 → meist „Windows NT 10.0“). */
export function isWindowsNtUserAgent(userAgent: string | null | undefined): boolean {
  if (!userAgent) return false;
  return /\bWindows NT\b/i.test(userAgent);
}
