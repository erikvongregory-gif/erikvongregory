import { CookiePanel } from "@/components/ui/cookie-banner-1";

export default function DemoCookiePanel() {
  return (
    <main className="grid min-h-screen place-items-center bg-background p-8 text-foreground">
      <div className="m-auto max-w-xl text-center">
        <h1 className="mb-2 text-2xl font-semibold">Cookie Panel - Toast with Preferences</h1>
        <p className="mb-8 text-muted-foreground">
          This demo shows the compact, bottom-right floating cookie banner. Click <strong>Customize</strong>{" "}
          to expand and adjust your cookie preferences inline - no modal needed.
        </p>
      </div>

      <CookiePanel />
    </main>
  );
}
