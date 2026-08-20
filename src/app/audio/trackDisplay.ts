import type { CSSProperties } from "react";

/*
 * Shared between the full player and the nav mini player, so the two can't
 * drift apart on colour or time formatting.
 */

/*
 * Accent colour per genre — vinyl label, transport, sliders, selected row.
 * Hues are spread far enough apart to stay tellable at label size, and each one
 * clears 3:1 against both white icons and the dark background.
 */
export const GENRE_LABEL_COLORS: Record<string, string> = {
  Jazz: "#b87d16",            // amber
  "Lo-fi Hip-Hop": "#c0512f", // rust
  Chillwave: "#d6479a",       // magenta
  Downtempo: "#5566d0",       // indigo
  Ambient: "#2f9e8f",         // teal
  Synthwave: "#8250d8",       // violet
  "Lo-fi Rap": "#4e8f3a",     // green
  Soul: "#c2453f",            // red
  Acoustic: "#2f89a8",        // cyan
};

export function labelColorFor(genre?: string) {
  return (genre && GENRE_LABEL_COLORS[genre]) || "var(--primary)";
}

export function formatTime(seconds: number) {
  if (!Number.isFinite(seconds) || seconds < 0) return "0:00";

  const total = Math.floor(seconds);
  const minutes = Math.floor(total / 60);
  return `${minutes}:${String(total % 60).padStart(2, "0")}`;
}

/* Percentage fill for .media-slider, consumed by its track pseudo-element. */
export function sliderFill(percent: number) {
  return { "--slider-pct": `${percent}%` } as CSSProperties;
}
