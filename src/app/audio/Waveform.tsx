import { useEffect, useMemo, useRef, type CSSProperties, type RefObject } from "react";

/*
 * Fallback silhouette, used when the Web Audio graph is unavailable or the
 * viewer prefers reduced motion. Deterministic on purpose: a random shape
 * would reshuffle on every render.
 */
const DEFAULT_BAR_COUNT = 56;

function silhouette(count: number) {
  return Array.from({ length: count }, (_, index) => {
    const shape =
      Math.sin(index * 0.7) * 0.5 +
      Math.sin(index * 0.23) * 0.3 +
      Math.sin(index * 1.9) * 0.2;

    return Math.round((0.28 + Math.abs(shape) * 0.72) * 100) / 100;
  });
}

/* Skip the top bins — they carry almost no energy in this material and would render as dead bars. */
const USABLE_BIN_RATIO = 0.62;
/* >1 biases buckets toward the low end, where the detail actually is. */
const BIN_CURVE = 1.7;

/* Hue span across the bar row, and how fast the whole ramp drifts per frame. */
const HUE_SPREAD = 300;
const HUE_DRIFT = 0.4;

/* Played bars sit at full strength; the rest stay dim, so progress survives the rainbow. */
function barColor(hue: number, isPlayed: boolean, dim: number) {
  const alpha = (isPlayed ? 0.95 : 0.25) * dim;
  return `hsl(${hue.toFixed(1)} 85% 60% / ${alpha.toFixed(3)})`;
}

export function Waveform({
  isPlaying,
  progress,
  analyserRef,
  isReactive,
  barCount = DEFAULT_BAR_COUNT,
  className = "mt-6 flex h-10 w-full shrink-0 items-center justify-center gap-[2px] overflow-hidden",
  barClassName = "w-[3px]",
  maxHeight = 40,
  dim = 1,
  style,
}: {
  isPlaying: boolean;
  progress: number;
  analyserRef: RefObject<AnalyserNode | null>;
  isReactive: boolean;
  barCount?: number;
  className?: string;
  barClassName?: string;
  maxHeight?: number;
  /** Multiplies bar alpha — drop it well below 1 for background use. */
  dim?: number;
  style?: CSSProperties;
}) {
  const bars = useMemo(() => silhouette(barCount), [barCount]);
  const barsRef = useRef<Array<HTMLSpanElement | null>>([]);
  /* Read inside the rAF loop without making progress a dependency that restarts it. */
  const progressRef = useRef(progress);
  progressRef.current = progress;

  useEffect(() => {
    if (!isReactive || !isPlaying) return;

    const analyser = analyserRef.current;
    if (!analyser) return;

    const data = new Uint8Array(analyser.frequencyBinCount);
    const usableBins = Math.floor(analyser.frequencyBinCount * USABLE_BIN_RATIO);
    /* Carry level between frames so bars ease instead of strobing. */
    const smoothed = new Float32Array(barCount).fill(0.12);
    let frame = 0;
    let hueOffset = 0;

    const render = () => {
      analyser.getByteFrequencyData(data);
      hueOffset = (hueOffset + HUE_DRIFT) % 360;

      for (let i = 0; i < barCount; i += 1) {
        const from = Math.floor((i / barCount) ** BIN_CURVE * usableBins);
        const to = Math.max(
          from + 1,
          Math.floor(((i + 1) / barCount) ** BIN_CURVE * usableBins),
        );

        let sum = 0;
        for (let bin = from; bin < to; bin += 1) sum += data[bin];

        const average = sum / (to - from) / 255;
        const target = Math.max(0.06, Math.min(1, average * 1.7));
        smoothed[i] += (target - smoothed[i]) * 0.3;

        const bar = barsRef.current[i];
        if (!bar) continue;

        bar.style.transform = `scaleY(${smoothed[i].toFixed(3)})`;
        const isPlayed = (i / barCount) * 100 <= progressRef.current;
        bar.style.backgroundColor = barColor(
          (hueOffset + (i / barCount) * HUE_SPREAD) % 360,
          isPlayed,
          dim,
        );
      }

      frame = requestAnimationFrame(render);
    };

    frame = requestAnimationFrame(render);
    return () => cancelAnimationFrame(frame);
  }, [isReactive, isPlaying, analyserRef, barCount, dim]);

  return (
    <div aria-hidden="true" className={className} style={style}>
      {bars.map((height, index) => {
        const isPlayed = (index / barCount) * 100 <= progress;

        return (
          <span
            key={index}
            ref={(node) => {
              barsRef.current[index] = node;
            }}
            className={`${barClassName} shrink-0 origin-center rounded-full ${isReactive ? "h-full" : `waveform-bar transition-colors ${isPlaying ? "" : "waveform-paused"}`
              }`}
            style={
              isReactive
                ? {
                  transform: "scaleY(0.12)",
                  backgroundColor: barColor((index / barCount) * HUE_SPREAD, isPlayed, dim),
                }
                : {
                  /* px, not %: a percentage height needs a definite parent and silently collapses if flex shrinks it. */
                  height: `${Math.max(3, Math.round(height * maxHeight))}px`,
                  animationDelay: `${(index % 12) * 0.11}s`,
                  backgroundColor: barColor((index / barCount) * HUE_SPREAD, isPlayed, dim),
                }
            }
          />
        );
      })}
    </div>
  );
}
