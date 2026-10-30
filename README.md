# Priyansh Choudhary - Portfolio

A responsive, single-page React portfolio built with Vite. Existing career and project records are retained; factual content updates are a separate step.

## Local development

Use Node 22.22.2+ (22.x) or Node 24.15+; CI uses Node 24.

```powershell
npm ci
npm run dev
```

The local hot-reload preview is at `http://127.0.0.1:5173`. It binds only to localhost. To explicitly allow a phone on your local network, run `npm run dev -- --host 0.0.0.0` and use the computer's LAN address; do not expose this development server to the public internet.

## Checks and production preview

```powershell
npm run lint
npm test
npm run build
npx playwright install chromium firefox webkit
npm run test:e2e
npm run serve:static
```

The strict static preview is at `http://127.0.0.1:4173`. Unlike an SPA dev server, it returns real 404s for missing paths. Browser tests start and stop their own instance; stop any manual static preview before running them.

Browser checks cover Chromium desktop/Android layouts, Firefox, and an iPhone-sized WebKit browser. These are emulations, not a substitute for checking physical devices.

To use an already installed Microsoft Edge for the Chromium checks on Windows (Firefox and WebKit still need their Playwright binaries):

```powershell
$env:PLAYWRIGHT_CHANNEL = 'msedge'
npm run test:e2e
```

Generated media, test reports, and `dist` are ignored. `predev` and `prebuild` generate responsive WebP images and a social preview using Sharp. Original media is retained; unused background videos are not part of the production artifact.

## Content and components

| Location | Purpose |
| --- | --- |
| `src\App.jsx` | Single-page sections and progressive disclosure |
| `src\styles.css` | Responsive layouts and light/dark design tokens |
| `src\components` | Navigation, project dialog, rich text, optional 3D |
| `src\Pages\*Data.js` | Existing factual records, preserved from the previous site |
| `src\stringConst.js` | Existing introduction and contact links |
| `src\data\portfolio.js` | Stable project IDs, presentation, featured entries, capability cards |
| `src\data\certificates.js` | Named certificate records with direct asset references |
| `scripts\optimize-images.mjs` | Responsive image and social-preview generation |
| `scripts\build-aliases.mjs` | Static legacy entry points and 404 document |

Capability cards draw from the existing skills, career, and project records. They do not assume expertise from the visual reference. Update these sources together when refreshing the content. Repository-owned HTML descriptions are rendered as rich text; do not pass visitor input into that component.

Project details are shareable through `/#project-<id>`. Native dialogs handle keyboard containment, Escape, and focus restoration. Longer collections use native disclosures.

## Motion and accessibility

The hero's Three.js scene loads separately after the content. It is decorative, limited to fine-pointer desktop layouts, and never required to navigate. Reduced motion, data-saving preferences where available, unavailable WebGL, and sustained poor rendering performance use a static SVG. Users can pause motion; the choice persists when storage is available. The scene stops when offscreen or the document is hidden.

Light/dark appearance initially follows the system and can be overridden. Navigation, project details, downloads, and content expansion work with keyboard and touch.

## URLs and deployment

The canonical site is the custom-domain root. Section URLs use native anchors such as `/#projects`, `/#skills`, and `/#experience`; no server-side router or SPA rewrite is required.

The production build includes physical redirect documents for `/portfolio/`, known previous page paths, and their `/portfolio/` equivalents. Old hash-router URLs such as `/portfolio/#/projects` map to `/#projects`. These are client-side compatibility redirects, not HTTP 301s. Unknown paths retain a genuine 404.

The GitHub Actions workflow validates both `v2-vite` and `main`. **Only pushes to `main` deploy to GitHub Pages.** Development on `v2-vite` does not publish or alter the custom domain. The artifact includes `public\CNAME`; Vite uses the root asset base.

Merge only after visual review and the separate content-refresh pass. To roll back a published release, revert the release change through a reviewed commit on `main` and let the workflow redeploy.
