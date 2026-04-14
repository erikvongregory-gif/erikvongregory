# Performance Optimization Report

## Scope
- No intentional UI/behavior change.
- Initial JS and hydration weight reduction.
- Dead-code and unused dependency cleanup.

## Implemented
- Responsive home layout switched to single-branch rendering:
  - `src/app/page.tsx`
  - `src/components/ResponsiveHomeLayout.tsx`
- Deferred loading for non-critical shell components:
  - `src/components/AppShell.tsx` (`ContactFunnel`, `CookieBanner` via dynamic import)
  - `src/components/ScrollHeader.tsx` (`HeaderLogin` via dynamic import)
- Dead code/assets removed:
  - `src/components/ui/demo.tsx`
  - `src/components/ui/loading-button-demo.tsx`
  - `src/components/ui/demo-cookie-panel.tsx`
  - `public/hero-portrait-new.png`
- Unused dependency removed:
  - `embla-carousel-react`

## Verification
- `npm run build` succeeded (Next.js production build).
- Affected routes still generated successfully.
- Lint run on modified files completed with no new errors.

## Next Measurement Step
- Capture before/after Lighthouse mobile (3 runs) for:
  - LCP
  - INP
  - CLS
  - TBT
- Compare bundle output size for `/` and dashboard routes in CI artifact.
