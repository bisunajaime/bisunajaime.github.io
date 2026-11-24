# AGENTS.md — Portfolio Site

> This file is for AI coding agents. It describes the project structure, conventions, and things you need to know before making changes.

---

## Project Overview

A **single-page personal portfolio** for Jaime Bisuña, a full-stack developer in Metro Manila, Philippines. Static React app; sections in order: Header → Hero → Selected work → Experience → About (+ skills) → Contact → Footer.

The design comes from the Figma file **"Portfolio - Redesign"** (page `bisunajaime.dev`, frames "Home (Desktop)" 1440 and "Home (Mobile)" 390). Its language is deliberately **plain**: one warm-neutral base + one forest-green accent, one typeface (Inter), a 4px spacing scale, 1px borders, no shadows, gradients, glass effects or animations. Keep it that way — readability first (body 16–18px, line length ≤ ~70 characters, WCAG AA contrast).

---

## Technology Stack

| Layer | Tech |
|-------|------|
| Framework | React 18.3.1 |
| Language | TypeScript (`.tsx` / `.ts`) — **no `tsconfig.json`**, `vite build` does not type-check |
| Build Tool | Vite 6.3.5 |
| Styling | Tailwind CSS v4.1.12 (`@tailwindcss/vite`), CSS-based config via `@theme` |
| Font | Inter variable (400–600, Latin subset), self-hosted at `public/fonts/` |
| Icons | `lucide-react` (only `ArrowUpRight` for external links) |
| Hosting | Vercel. `gh-pages` only hosts a redirect — never run the disabled deploy script |

**No testing framework is installed.**

---

## Project Structure

```
/
├── index.html                    # SPA entry: meta/OG tags, font + hero-image preloads, JSON-LD
├── vite.config.ts                # React + Tailwind plugins, @/ alias
├── public/
│   ├── fonts/                    # inter-var-latin.woff2 (+ OFL license)
│   ├── og-image.jpg              # 1200×630 social preview (exported from the Figma OG frame)
│   ├── assets/images/home/       # Hero + About images (WebP, 1× and 2×)
│   ├── assets/images/<slug>/     # Project covers (cover.webp, optional cover-800.webp)
│   └── files/                    # Resume PDF
├── assets/generated/             # Prompts, manifest, workflows for the generated images (raw renders git-ignored)
└── src/
    ├── main.tsx                  # Mounts <App />
    ├── styles/
    │   ├── index.css             # Imports fonts.css, tailwind.css, theme.css
    │   ├── fonts.css             # @font-face (font-display: swap)
    │   ├── tailwind.css          # @import "tailwindcss"
    │   └── theme.css             # Design tokens (@theme) + base styles + page-gutter / section-y utilities
    ├── app/
    │   ├── App.tsx               # Skip link + header + sections + footer
    │   └── components/
    │       ├── ui/               # ButtonLink, TextLink, Tag  (Figma: Button / Primary, Link, Tag)
    │       ├── SiteHeader.tsx    # Name + anchor nav
    │       ├── Hero.tsx
    │       ├── Work.tsx          # ProjectCard + EarlierWorkRow
    │       ├── Experience.tsx    # ExperienceItem
    │       ├── About.tsx         # SkillGroup
    │       ├── Contact.tsx
    │       └── SiteFooter.tsx
    └── data/
        ├── portfolioData.ts      # Facts: experiences, projects (links, covers, stack)
        ├── homepage.ts           # Homepage copy: hero, card summaries/tags, earlier-work lines, skills, [placeholders]
        ├── aiWorkData.ts         # Not used by the homepage (kept for the CMS branches)
        └── wallpaperData.ts      # Not used by the homepage (kept for the CMS branches)
```

---

## Commands

```bash
npm run dev        # Vite dev server
npm run build      # Production build → dist/
npx vite preview   # Serve dist/ locally
```

Type-check ad hoc (there is no tsconfig or script). `@types/react-dom` isn't installed, so expect one error about `react-dom/client`; everything else should be clean:

```bash
npx -p typescript@5 tsc --noEmit --strict --skipLibCheck --target es2022 \
  --lib es2022,dom,dom.iterable --module esnext --moduleResolution bundler \
  --jsx react-jsx --allowSyntheticDefaultImports src/main.tsx
```

---

## Design Tokens (src/styles/theme.css)

Tokens mirror the Figma variables and text styles. Tailwind's default colour palette and radii are **cleared** (`--color-*: initial`, `--radius-*: initial`), so only these exist:

- **Colour:** `bg`, `surface`, `border`, `placeholder`, `fg`, `fg-muted`, `fg-subtle`, `accent`, `accent-hover`, `on-accent` → `bg-surface`, `text-fg-muted`, `border-border`, …
- **Type:** `text-display`, `text-h2`, `text-h3`, `text-lead`, `text-body`, `text-small`, `text-label`, `text-tag`. Each sets size, line height, tracking and weight; the large ones scale fluidly from their 390px value to their 1440px value.
- **Spacing:** Tailwind's default 4px scale (`p-6` = 24, `py-24` = 96) — matches Figma `space/*`.
- **Layout:** `max-w-content` (1120), `max-w-headline` (880), `max-w-text` (640); `page-gutter` (20px → 32px side padding) and `section-y` (64px → 96px) utilities.
- **Radius:** `rounded-sm` (6), `rounded-md` (12), `rounded-full`.

Rules:
- **Never hardcode** hex colours, font sizes or arbitrary pixel values in components — use the tokens. If something new is needed, add a token to `theme.css` (and to Figma).
- Don't use `tailwind-merge`/`cn()` with these classes: it treats `text-label` (size) and `text-accent` (colour) as conflicts and drops one. Plain template strings are fine.
- Keep body copy inside `max-w-text`.

---

## Content

- **Facts** (projects, links, covers, stack, experience) come from `portfolioData.ts`. Projects named in `work.pinned` (homepage.ts) come first, then the rest in data order; the first `work.featuredCount` (6) are cards and the rest become one-line "Earlier work" rows.
- **Wording** for the homepage lives in `homepage.ts`. A project without an entry in `projectCopy` falls back to its `short_description`, the first four `stack` items and the result placeholder, so newly added projects still render.
- Text in `[square brackets]` is a placeholder Jaime still has to fill — keep it as-is unless told otherwise.

---

## Images

- Above the fold: only the hero background (`<picture>`, decorative, `alt=""`, preloaded in `index.html`).
- Everything else: `loading="lazy"`, explicit `width`/`height`, WebP.
- Meaningful images get real alt text; decorative ones get `alt=""`.
- Generated images (hero, About, OG) come from `assets/generated/`; see its `manifest.json` and `PLAYBOOK.md` before regenerating.

---

## Accessibility

- Landmarks: `header` / `nav` / `main` / `section[aria-labelledby]` / `footer`; exactly one `h1`; h2 per section, h3 inside.
- Skip link to `#main`; global `:focus-visible` outline in the accent colour.
- External links open in a new tab and announce it (`sr-only` text); links are underlined, never colour-only.
- Smooth scrolling only under `prefers-reduced-motion: no-preference`. No other motion.

---

## Common Pitfalls for Agents

1. **Do not remove the Tailwind or React Vite plugins** — the build breaks.
2. **Do not add `.css`, `.tsx`, or `.ts` to `assetsInclude`** in `vite.config.ts`.
3. **Do not use Tailwind v3 syntax** (`tailwind.config.js`); config lives in `theme.css`.
4. Inter's Latin subset has no `↗` glyph — use `TextLink external` (it renders the `ArrowUpRight` icon).
5. A green `vite build` does not mean the types are sound — run the ad-hoc type-check above.
