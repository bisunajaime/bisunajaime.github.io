# AGENTS.md — Portfolio Site

> This file is for AI coding agents. It describes the project structure, conventions, and things you need to know before making changes.

---

## Project Overview

This is a **single-page personal portfolio website** for Jaime Bisuña, a Full-Stack Developer based in the Philippines. The site is a static React application that showcases professional experience, projects, skills/tech stack, and a curated wallpaper gallery.

The design language is **Apple-inspired**: clean monochrome palettes with a single blue accent, generous whitespace, rounded corners, glass-morphism panels (`glass-panel`), and subtle radial-gradient backgrounds.

---

## Technology Stack

| Layer | Tech |
|-------|------|
| Framework | React 18.3.1 (peer dependency) |
| Language | TypeScript (ES modules, `.tsx` / `.ts`) |
| Build Tool | Vite 6.3.5 |
| Styling | Tailwind CSS v4.1.12 (`@tailwindcss/vite` plugin) |
| CSS Features | CSS custom properties, `@theme inline`, `@layer base/utilities`, `color-mix()` |
| Theming | `next-themes` (light / dark / system) |
| Icons | `lucide-react` |
| Carousels | `swiper` (Swiper React) |
| UI Primitives | Hand-rolled shadcn/ui-style components using `@radix-ui/react-slot`, `class-variance-authority` |
| Class Utils | `clsx` + `tailwind-merge` (see `cn()` helper) |

**No testing framework is installed.** There are no unit tests, integration tests, or E2E tests in the project.

---

## Project Structure

```
/
├── index.html                 # SPA entry HTML
├── vite.config.ts             # Vite config (React + Tailwind plugins, @/ alias)
├── postcss.config.mjs         # Empty — Tailwind v4 handles PostCSS automatically
├── package.json               # Scripts: dev, build, deploy
├── deploy.yml                 # GitHub Actions workflow for GitHub Pages
├── public/                    # Static assets served at root
│   ├── assets/images/         # Portfolio images, project screenshots, wallpapers
│   └── files/                 # Resume PDF
├── src/
│   ├── main.tsx               # Bootstrap: asset preload + ThemeProvider + mount App
│   ├── styles/
│   │   ├── index.css          # Imports fonts.css, tailwind.css, theme.css
│   │   ├── fonts.css          # Font stack (--font-display)
│   │   ├── tailwind.css       # Tailwind v4 directives (@import tailwindcss, @source)
│   │   └── theme.css          # CSS custom properties for light/dark themes
│   ├── app/
│   │   ├── App.tsx            # Root component: scroll-spy + section routing
│   │   ├── components/
│   │   │   ├── Navigation.tsx # Fixed glass nav + mobile drawer + theme toggle
│   │   │   ├── Hero.tsx       # Profile intro / CTA links
│   │   │   ├── About.tsx      # Bio + quick-info card
│   │   │   ├── Experience.tsx # Timeline of jobs
│   │   │   ├── Projects.tsx   # Project grid with expandable Swiper galleries
│   │   │   ├── TechStack.tsx  # Skills cards
│   │   │   ├── Wallpapers.tsx # Wallpaper gallery with categories + keyboard nav
│   │   │   ├── Footer.tsx     # Contact / email / social links
│   │   │   ├── shared/        # UI primitives (button, card, badge, utils.ts)
│   │   │   └── util/          # One-off helpers (ImageWithFallback)
│   │   └── utils/
│   │       └── preloadAssets.ts # Image preloader + asset URL collector
│   └── data/
│       ├── portfolioData.ts   # Experiences, projects, tech stacks (static data)
│       └── wallpaperData.ts   # Wallpaper metadata + categories
```

---

## Build, Dev & Deploy Commands

```bash
# Start the Vite dev server
npm run dev

# Production build (outputs to dist/)
npm run build

# Build + push dist/ to gh-pages branch via gh-pages CLI
npm run deploy
```

**Deployment:**
- A GitHub Actions workflow (`deploy.yml`) automatically builds and deploys to GitHub Pages on every push to `main`.
- The manual `npm run deploy` script uses the `gh-pages` CLI (this is defined in `package.json` but the package is not listed in `devDependencies`; it may be installed globally).

---

## Code Style & Conventions

### Components
- Use **functional components** with **named exports**.
- Props are typed with `React.ComponentProps<"element">` (e.g., `React.ComponentProps<"div">`).
- shadcn/ui-style primitives live in `src/app/components/shared/` and follow a `data-slot` attribute convention.

### Class Name Composition
- Always use the `cn()` utility when composing Tailwind classes:
  ```ts
  import { cn } from "./shared/utils";
  ```
- `cn()` merges `clsx` (conditional classes) with `tailwind-merge` (deduplication).

### Styling Patterns
- Layout containers follow this repeating pattern:
  ```tsx
  <section className="px-4 py-[var(--section-padding-y)] sm:px-6">
    <div className="mx-auto w-full max-w-[var(--page-max-width)]">
      ...
    </div>
  </section>
  ```
- Glass panels use the `.glass-panel` utility class (backdrop blur + translucent background + border + subtle shadow).
- Buttons and interactive elements use `focus-visible:ring-2 focus-visible:ring-ring` for accessibility.

### Path Alias
- `@/` resolves to `./src/` (configured in `vite.config.ts`).

### Asset Imports
- `vite.config.ts` supports raw imports for `.svg` and `.csv` only.
- **Never** add `.css`, `.tsx`, or `.ts` to `assetsInclude`.
- Images referenced in data files use absolute public paths (e.g., `/assets/images/...`).

---

## Theming

- Themes are controlled by `next-themes` with `attribute="class"`.
- The `.dark` class on `<html>` toggles the dark palette.
- All colors are CSS custom properties defined in `src/styles/theme.css`.
- Both light and dark modes share the same design tokens (`--background`, `--foreground`, `--primary`, `--muted`, `--border`, etc.).
- **Do not** use hardcoded hex colors in components; always use the semantic CSS custom properties or Tailwind theme mappings (e.g., `bg-background`, `text-foreground`, `text-primary`).

---

## Data Architecture

All content is **static data** — there is no API, no database, and no state management library.

- `src/data/portfolioData.ts` — experiences, projects, and tech stack definitions.
- `src/data/wallpaperData.ts` — wallpaper metadata, categories, and featured/top lists.

To add a new project, experience, or wallpaper, edit the corresponding data file. Images should be placed in `public/assets/images/` and referenced with an absolute path.

---

## Asset Preloading Strategy

`src/main.tsx` bootstraps the app with an asset-preloading flow:

1. Collects critical images (hero wallpaper, top projects) from data files.
2. Renders a loading screen while critical assets preload.
3. Mounts `<App />` once preloading completes.
4. Non-critical (background) assets are prefetched afterward.

If you add new images that are needed for the initial viewport, update `collectAssetUrls()` in `src/app/utils/preloadAssets.ts` so they are included in the critical set.

---

## Accessibility Notes

- Navigation supports `aria-current="page"` for active sections.
- Mobile menu is a dialog with `role="dialog"`, `aria-modal="true"`, and Escape-to-close.
- Theme toggle has descriptive `aria-label`.
- All interactive elements have `focus-visible` ring styles.
- Wallpaper gallery supports **keyboard arrow navigation** when the section is visible.
- Project cards with galleries have an overlaid "View UI" button with `aria-label`.

---

## Testing

There is **no testing infrastructure** in this project. If you add tests, you will need to install and configure a test runner (e.g., Vitest, Jest, or Playwright) from scratch.

---

## Security Considerations

- This is a **static site** with no server-side runtime or API.
- All external links use `rel="noreferrer noopener"` and `target="_blank"` where appropriate.
- The resume PDF is served from `/files/ResumeJaimeBisuna.pdf`.
- No secrets, environment variables, or auth mechanisms are present.

---

## Common Pitfalls for Agents

1. **Do not remove the Tailwind or React Vite plugins** — the build will break. The comment in `vite.config.ts` explicitly warns about this.
2. **Do not add `.css`, `.tsx`, or `.ts` to `assetsInclude`** in `vite.config.ts`.
3. **Do not use Tailwind v3 syntax** (e.g., `tailwind.config.js`). This project uses Tailwind v4 with CSS-based configuration (`@theme inline`).
4. When adding new images that appear above the fold, register them in `preloadAssets.ts` for the loading screen.
5. Keep the Apple-inspired design language: rounded corners, subtle shadows, glass panels, and restrained use of the primary blue accent.
