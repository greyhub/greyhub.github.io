# greyhub.github.io

Personal site of **Grey (Luong Nguyen Van / Nguyễn Văn Lương)**: data & AI, data consulting, data
training and creative landing pages. Published at <https://greyhub.github.io/>.

Built with React 19, TypeScript and Vite. The hero is an interactive 3D scene (Three.js via React
Three Fiber, drei and postprocessing). The site is bilingual (English by default, Vietnamese).

## Develop

```bash
npm ci
npm run dev        # local dev server
npm run lint       # ESLint
npm run typecheck  # TypeScript
npm run build      # type check + production build into dist/
npm run preview    # serve the production build
```

Requires Node.js 20.19+ (CI uses Node 22).

`npm run build:single` produces one self-contained HTML file in `dist-single/` (used for previews
outside GitHub Pages).

## Editing content

All copy (both languages), links and optional sections live in `src/content/content.ts`. The
content plan behind it is `docs/kich-ban.md`.

| What | Where in `content.ts` |
| --- | --- |
| Name, email, LinkedIn, GitHub, city, DGNA website | `profile` |
| Hero headline, roles, buttons | `hero` |
| Floating 3D panels | `panels` |
| Point of view, four-step approach | `pov`, `approach` |
| Services and contact chips | `services`, `contact` |
| Principles | `principles` |
| Career milestones | `journey.milestones` |
| Case studies, articles and talks | `work.items`, `writing.items` |

- Only add verified information. Empty fields are hidden: a milestone without `role` shows just the
  year and organisation; `work` and `writing` sections (and their nav links) appear only when their
  lists have items.
- The static fallback / loading image is `src/assets/hero-poster.jpg`, a render of the 3D scene.
- Link-preview metadata (title, description, Open Graph, Twitter card) is in `index.html`; the
  preview image is `public/og-image.png` (1200×630).

## Structure

```
src/
  content/      content.ts: single source of truth for copy, links and optional sections
  components/   Nav, Hero (3D canvas, loader, fallback, panels), Sections
  scene/        3D hero: City, Sky, Terrace, Executive (procedural figure), Dust, HeroCanvas,
                camera framing and panel layout
  hooks/        language, scrolling, contact intent, glass pointer effects
  styles/       global.css (tokens and all styles)
public/         favicon, apple-touch-icon, og-image, robots.txt, sitemap.xml, .nojekyll
docs/           kich-ban.md: content script (Vietnamese)
```

## Deployment

`.github/workflows/deploy.yml` builds on every push and pull request to `main` (lint, type check,
build) and deploys `dist/` to GitHub Pages on pushes to `main`. Pull requests only build.

Vite `base` is `'./'` (relative asset URLs), which works for this user site at the domain root and
would also work from a sub-folder.

One-time setup: **Settings → Pages → Build and deployment → Source: GitHub Actions**.

## Known limitations

- The 3D figure is procedural (built from primitive geometry), stylised and not a likeness of Grey.
- WebGL rendering was verified in headless Chromium with software rendering, not on real GPUs,
  Safari or Firefox. Without WebGL the hero shows the static render.
