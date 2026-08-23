/*
 * The hero loop comes in two cuts, one graded for each theme. Both are the same
 * 1872x1056 / 24fps / 5.17s clip, silent, with the moov atom up front so playback
 * can start before the file finishes downloading.
 */
export const HERO_MEDIA = {
  light: {
    video: "/assets/video/lofi-jaime-light.mp4",
    poster: "/assets/images/lofi-jaime-light-poster.webp",
  },
  dark: {
    video: "/assets/video/lofi-jaime.mp4",
    poster: "/assets/images/lofi-jaime-poster.webp",
  },
} as const;

/* next-themes' own default. Read directly because the preload pass below runs
 * before the provider exists to ask. */
const THEME_STORAGE_KEY = "theme";

/*
 * Which cut to fetch, answered synchronously — both callers need it before
 * useTheme() has a resolvedTheme to give.
 *
 * There is no blocking theme script in index.html, so <html> is unclassed until
 * ThemeProvider mounts. Two windows, in order:
 *
 *  1. Bootstrap, choosing what to preload. No class yet, so resolve it the way
 *     next-themes is about to: an explicit stored choice, else the OS.
 *  2. Render, once the provider has run. The class is authoritative by then, and
 *     is what keeps this in step after a toggle.
 *
 * Getting this wrong is not cosmetic — it costs a wasted fetch of a poster or a
 * 1.3MB video that this visit will never show.
 */
export function isDarkTheme() {
  if (typeof document === "undefined") return false;

  const root = document.documentElement;
  if (root.classList.contains("dark")) return true;
  if (root.classList.contains("light")) return false;

  let stored: string | null = null;
  try {
    stored = window.localStorage.getItem(THEME_STORAGE_KEY);
  } catch {
    /* Storage can be blocked outright; fall through to the OS preference. */
  }

  if (stored === "dark") return true;
  if (stored === "light") return false;

  /* Unset or "system". */
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
}

export function heroMedia(dark = isDarkTheme()) {
  return dark ? HERO_MEDIA.dark : HERO_MEDIA.light;
}
