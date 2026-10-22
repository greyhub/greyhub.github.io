# greyhub.github.io

Personal portfolio of **Luong Nguyen Van (Grey)**, CEO & Founder of DGNA. It is published at
<https://greyhub.github.io/>.

Built with React, TypeScript and Vite. The site is bilingual (Vietnamese/English) and supports light, dark and system themes.

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

## Editing content

| What | Where |
| --- | --- |
| Name, title, email, LinkedIn, site URL, defaults | `src/data/siteConfig.ts` |
| Hero headline, services, partners, biography, case studies | `src/data/siteConfig.ts` |
| Navigation, buttons, section titles, About, Approach, a11y labels, metadata | `src/i18n/translations.ts` |
| Colours, spacing, typography tokens | `src/styles/tokens.css` |

- `biography` and `caseStudies` in `siteConfig.ts` start empty. Add verified content there. The
  Projects section appears automatically when `caseStudies` has entries.
- To remove the Partners section, empty the `partners` array.
- Static metadata in `index.html` (title, description, canonical, Open Graph) is filled from the
  same config at build time by a small plugin in `vite.config.ts`.

## Structure

```
src/
  components/   Header, Footer, HeroVisual, shared UI
  sections/     Hero, About, Services, Approach, Projects, Partners, Contact
  data/         siteConfig.ts: the single source of truth for content
  i18n/         translations + language context
  theme/        theme context (light / dark / system)
  styles/       tokens, base, layout, sections, hero visual
public/         favicon, social preview image, robots.txt, sitemap.xml
legacy/         previous static site (kept for reference, not deployed)
```

## Deployment

`.github/workflows/deploy.yml` builds on every push and pull request to `main` and deploys `dist/`
to GitHub Pages on pushes to `main`. This is a **user site**, so Vite `base` is `/`.

One-time setup: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
