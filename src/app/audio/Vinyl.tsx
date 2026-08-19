import { useId } from "react";

/*
 * A record reads as black on any background, so the disc keeps fixed colours
 * while the centre hole pulls from the theme and the label follows the genre.
 *
 * `compact` trades groove count for stroke weight: at ~36px a 1-unit stroke in
 * a 200-unit viewBox renders thinner than a pixel and vanishes.
 */
export function Vinyl({
  isSpinning,
  labelColor,
  compact = false,
}: {
  isSpinning: boolean;
  labelColor: string;
  compact?: boolean;
}) {
  /* Unique per instance — a shared gradient id would break when one unmounts. */
  const sheenId = useId();
  const grooves = compact ? [84, 68, 52] : [88, 80, 72, 64, 56, 48];

  return (
    <svg
      viewBox="0 0 200 200"
      role="presentation"
      className={`h-full w-full vinyl-spin ${isSpinning ? "" : "vinyl-paused"}`}
    >
      <defs>
        <radialGradient id={sheenId} cx="35%" cy="28%" r="72%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.22" />
          <stop offset="45%" stopColor="#ffffff" stopOpacity="0.04" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </radialGradient>
      </defs>

      <circle cx="100" cy="100" r="98" fill="#141416" />
      <circle cx="100" cy="100" r="98" fill={`url(#${sheenId})`} />

      {grooves.map((radius) => (
        <circle
          key={radius}
          cx="100"
          cy="100"
          r={radius}
          fill="none"
          stroke="#ffffff"
          strokeOpacity={compact ? 0.12 : 0.07}
          strokeWidth={compact ? 4 : 1}
        />
      ))}

      <circle
        cx="100"
        cy="100"
        r={compact ? 40 : 34}
        fill={labelColor}
        className="motion-safe:transition-[fill] motion-safe:duration-300"
      />
      <circle
        cx="100"
        cy="100"
        r={compact ? 40 : 34}
        fill="none"
        stroke="#000000"
        strokeOpacity="0.25"
        strokeWidth="1"
      />
      <circle cx="100" cy="100" r={compact ? 9 : 6} fill="var(--background)" />
    </svg>
  );
}
