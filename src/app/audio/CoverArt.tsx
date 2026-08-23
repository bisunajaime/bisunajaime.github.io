import { useState } from "react";
import type { CSSProperties } from "react";
import { Vinyl } from "./Vinyl";
import { labelColorFor } from "./trackDisplay";
import type { AIWorkItem } from "../../data/aiWorkData";

/*
 * Cover art with the record as its fallback.
 *
 * Not every track is guaranteed to have art — a new track lands in the data file
 * before its cover is generated — so every surface that shows a cover has to be able
 * to show a Vinyl instead. Keeping that decision here means the call sites never
 * branch on it.
 *
 * `alt` is always empty: on every surface the title sits next to the image as real
 * text, so a described cover makes a screen reader announce each track twice.
 */

/* The accent shows through until the image decodes, so covers fade up from their own
 * genre colour rather than from an empty grey hole. */
function accentTint(track: AIWorkItem): CSSProperties {
  return {
    backgroundColor: `color-mix(in srgb, ${labelColorFor(track.genre)} 22%, var(--secondary))`,
  };
}

export function CoverArt({
  track,
  size,
  className = "",
  eager = false,
}: {
  track: AIWorkItem;
  /** Which derivative to pull. "sm" is the 128px file, for anything under ~64px. */
  size: "sm" | "full";
  className?: string;
  eager?: boolean;
}) {
  const [failed, setFailed] = useState(false);
  const src = size === "sm" ? track.thumbnailSmall ?? track.thumbnail : track.thumbnail;

  if (!src || failed) {
    return (
      <span className={`block ${className}`} aria-hidden="true">
        <Vinyl isSpinning={false} labelColor={labelColorFor(track.genre)} compact={size === "sm"} />
      </span>
    );
  }

  return (
    <img
      src={src}
      alt=""
      width={size === "sm" ? 128 : 640}
      height={size === "sm" ? 128 : 640}
      loading={eager ? "eager" : "lazy"}
      decoding="async"
      /* Covers are square and the boxes are square, but a bad file should crop, not stretch. */
      className={`block size-full object-cover ${className}`}
      style={accentTint(track)}
      onError={() => setFailed(true)}
    />
  );
}
