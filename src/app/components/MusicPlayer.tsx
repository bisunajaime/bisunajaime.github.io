import { useEffect, useRef, useState, type CSSProperties } from "react";
import { useMusic } from "../audio/MusicProvider";
import { formatTime, labelColorFor, sliderFill } from "../audio/trackDisplay";
import { Vinyl } from "../audio/Vinyl";
import { Waveform } from "../audio/Waveform";
import {
  ChevronDown,
  ListFilter,
  Pause,
  Play,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
  X,
} from "lucide-react";
import type { AIWorkItem } from "../../data/aiWorkData";

function formatTotal(seconds: number) {
  const minutes = Math.round(seconds / 60);
  if (minutes < 60) return `${minutes} min`;

  const hours = Math.floor(minutes / 60);
  const rest = minutes % 60;
  return rest ? `${hours} hr ${rest} min` : `${hours} hr`;
}

const ALL_GENRES = "All";

const PANELS = [
  { id: "tracks", label: "Tracks" },
  { id: "lyrics", label: "Lyrics" },
] as const;

/*
 * Lyrics arrive as the generator received them: [Section] markers on their own
 * lines, then the lines belonging to that section. Split into blocks so the
 * markers can be styled as structure instead of printed as literal brackets.
 * Sections with no lines (Intro, Instrumental, Outro) are kept — they are how a
 * reader knows the vocal drops out — but rendered as a lone marker.
 */
type LyricBlock = { section: string; lines: string[] };

function parseLyrics(lyrics: string): LyricBlock[] {
  const blocks: LyricBlock[] = [];

  for (const raw of lyrics.split("\n")) {
    const line = raw.trim();
    if (!line) continue;

    const marker = line.match(/^\[(.+)\]$/);
    if (marker) {
      blocks.push({ section: marker[1], lines: [] });
      continue;
    }

    if (!blocks.length) blocks.push({ section: "", lines: [] });
    blocks[blocks.length - 1].lines.push(line);
  }

  return blocks;
}

/* A chorus repeats, so it earns the accent rail that marks it on sight. */
const isChorus = (section: string) => /chorus/i.test(section);

function LyricsView({ track }: { track: AIWorkItem }) {
  if (!track.lyrics) {
    return (
      <div className="flex flex-1 items-center justify-center px-6 py-12 text-center">
        <p className="text-sm text-muted-foreground">
          <span className="block font-semibold text-foreground">
            Instrumental
          </span>
          No lyrics were written for this track.
        </p>
      </div>
    );
  }

  return (
    <div className="max-h-[20rem] flex-1 overflow-y-auto px-4 py-4 lg:max-h-none">
      <div className="space-y-5">
        {parseLyrics(track.lyrics).map((block, index) => (
          <div
            key={`${block.section}-${index}`}
            className={
              isChorus(block.section)
                ? "border-l-2 border-[var(--track-accent)] pl-3"
                : undefined
            }
          >
            {block.section ? (
              <p className="text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-muted-foreground/70">
                {block.section}
              </p>
            ) : null}
            {block.lines.length ? (
              <p className="mt-1.5 whitespace-pre-line text-sm leading-relaxed text-foreground">
                {block.lines.join("\n")}
              </p>
            ) : null}
          </div>
        ))}
      </div>
      <p className="mt-6 border-t border-border pt-3 text-xs text-muted-foreground">
        Lyrics written for the generation prompt
        {track.madeWith ? ` · ${track.madeWith}` : ""}
      </p>
    </div>
  );
}

export function MusicPlayer({ tracks }: { tracks: AIWorkItem[] }) {
  const {
    track,
    selectedId,
    isPlaying,
    currentTime,
    duration,
    volume,
    isMuted,
    isReactive,
    analyserRef,
    toggle,
    playTrack,
    seek,
    changeVolume,
    toggleMute,
    setQueue,
    canControlVolume,
  } = useMusic();

  const [genre, setGenre] = useState(ALL_GENRES);
  const [panel, setPanel] = useState<"tracks" | "lyrics">("tracks");
  const listRef = useRef<HTMLUListElement | null>(null);

  const genres = [
    ALL_GENRES,
    ...Array.from(
      new Set(
        tracks
          .map((item) => item.genre)
          .filter((value): value is string => Boolean(value)),
      ),
    ),
  ];
  const countFor = (value: string) =>
    value === ALL_GENRES
      ? tracks.length
      : tracks.filter((item) => item.genre === value).length;

  const visibleTracks =
    genre === ALL_GENRES
      ? tracks
      : tracks.filter((item) => item.genre === genre);
  const visibleRuntime = visibleTracks.reduce(
    (total, item) => total + (item.durationSeconds ?? 0),
    0,
  );

  const canPlay = Boolean(track?.audioSrc);
  /* VBR MP3s can report Infinity or NaN until fully buffered — never feed that to the range. */
  const safeDuration = Number.isFinite(duration) && duration > 0 ? duration : 0;
  const seekValue = Math.min(currentTime, safeDuration);
  const progress = safeDuration > 0 ? (seekValue / safeDuration) * 100 : 0;

  /* Position within what the user can currently see, which is what prev/next should walk. */
  const visibleIndex = visibleTracks.findIndex(
    (item) => item.id === selectedId,
  );
  /* Transport wraps, so it is only dead when there is nowhere else to go. */
  const canStep = visibleTracks.length > 1;

  /* Auto-advance should follow the filter the user is actually looking at. */
  const visibleIds = visibleTracks.map((item) => item.id).join(",");
  useEffect(() => {
    setQueue(visibleIds ? visibleIds.split(",") : []);
  }, [visibleIds, setQueue]);

  /*
   * Keep the active row visible when prev/next, auto-advance, or a filter change
   * moves it — but scroll ONLY the list. scrollIntoView walks every scrollable
   * ancestor, so it also drags the page down to this section.
   */
  const hasMountedRef = useRef(false);
  useEffect(() => {
    if (!hasMountedRef.current) {
      /* Nothing to reveal on first render, and the initial track is picked at random. */
      hasMountedRef.current = true;
      return;
    }

    const list = listRef.current;
    const row = list?.querySelector<HTMLElement>(`[data-id="${selectedId}"]`);
    if (!list || !row) return;

    const listBounds = list.getBoundingClientRect();
    const rowBounds = row.getBoundingClientRect();

    if (rowBounds.top < listBounds.top) {
      list.scrollTop -= listBounds.top - rowBounds.top;
    } else if (rowBounds.bottom > listBounds.bottom) {
      list.scrollTop += rowBounds.bottom - listBounds.bottom;
    }
  }, [selectedId, genre]);

  const step = (delta: number) => {
    if (!visibleTracks.length) return;

    /* If the playing track was filtered out, step onto the visible list rather than nowhere. */
    const base = visibleIndex < 0 ? 0 : visibleIndex;
    /* Wraps in both directions: forward past the last track returns to the first. */
    const nextIndex =
      (base + delta + visibleTracks.length) % visibleTracks.length;
    const next = visibleTracks[nextIndex];
    if (next) playTrack(next.id);
  };

  const handleSelect = (id: string) => {
    if (id === selectedId) {
      toggle();
      return;
    }

    playTrack(id);
  };

  if (!track) return null;

  return (
    <div
      data-music-control
      className="mt-8 grid gap-6 lg:grid-cols-2 lg:items-stretch"
      style={{ "--track-accent": labelColorFor(track.genre) } as CSSProperties}
    >
      {/* Now playing */}
      <div className="glass-panel flex flex-col items-center rounded-[1.5rem] p-6 text-center sm:p-8 lg:max-h-[38rem]">
        <button
          type="button"
          onClick={toggle}
          disabled={!canPlay}
          aria-label={isPlaying ? `Pause ${track.name}` : `Play ${track.name}`}
          className="group relative aspect-square w-full max-w-[11.5rem] shrink-0 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed"
        >
          <Vinyl
            isSpinning={isPlaying}
            labelColor={labelColorFor(track.genre)}
          />
          <span className="absolute inset-0 flex items-center justify-center">
            <span className="inline-flex size-14 items-center justify-center rounded-full bg-background/85 text-foreground opacity-0 shadow-[var(--shadow-subtle)] transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
              {isPlaying ? (
                <Pause className="size-5" />
              ) : (
                <Play className="size-5 translate-x-px" />
              )}
            </span>
          </span>
        </button>

        <h3 className="mt-6 text-xl font-semibold tracking-tight text-foreground">
          {track.name}
        </h3>
        {track.artist ? (
          <p className="mt-1 text-sm text-muted-foreground">{track.artist}</p>
        ) : null}
        {track.description ? (
          <p className="mt-1 text-xs text-muted-foreground">
            {track.description}
          </p>
        ) : null}
        {!canPlay ? (
          <p className="mt-3 text-xs text-muted-foreground">
            No audio file attached yet.
          </p>
        ) : null}

        {/* Seek */}
        <div className="mt-6 flex w-full shrink-0 items-center gap-3">
          <span className="w-10 shrink-0 text-right text-xs tabular-nums text-muted-foreground">
            {formatTime(currentTime)}
          </span>
          <input
            type="range"
            min={0}
            max={safeDuration}
            step={0.01}
            value={seekValue}
            disabled={!canPlay || safeDuration <= 0}
            onChange={(event) => seek(Number(event.target.value))}
            aria-label="Seek"
            className="media-slider"
            style={sliderFill(progress)}
          />
          <span className="w-10 shrink-0 text-xs tabular-nums text-muted-foreground">
            {formatTime(safeDuration)}
          </span>
        </div>

        {/* Transport */}
        <div className="mt-4 flex w-full shrink-0 items-center justify-center gap-2">
          <button
            type="button"
            onClick={() => step(-1)}
            disabled={!canStep}
            aria-label="Previous track"
            className="inline-flex size-11 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-40"
          >
            <SkipBack className="size-4" />
          </button>
          <button
            type="button"
            onClick={toggle}
            disabled={!canPlay}
            aria-label={isPlaying ? "Pause" : "Play"}
            className="inline-flex size-12 items-center justify-center rounded-full bg-[var(--track-accent)] text-white transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-40"
          >
            {isPlaying ? (
              <Pause className="size-5" />
            ) : (
              <Play className="size-5 translate-x-px" />
            )}
          </button>
          <button
            type="button"
            onClick={() => step(1)}
            disabled={!canStep}
            aria-label="Next track"
            className="inline-flex size-11 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-40"
          >
            <SkipForward className="size-4" />
          </button>
        </div>

        {/* Volume */}
        <div className="mt-4 flex w-full max-w-[12rem] shrink-0 items-center gap-2">
          <button
            type="button"
            onClick={toggleMute}
            aria-label={isMuted ? "Unmute" : "Mute"}
            className="inline-flex size-9 shrink-0 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            {isMuted || volume === 0 ? (
              <VolumeX className="size-4" />
            ) : (
              <Volume2 className="size-4" />
            )}
          </button>
          {canControlVolume ? (
            <input
              type="range"
              min={0}
              max={1}
              step={0.01}
              value={isMuted ? 0 : volume}
              onChange={(event) => changeVolume(Number(event.target.value))}
              aria-label="Volume"
              className="media-slider"
              style={sliderFill((isMuted ? 0 : volume) * 100)}
            />
          ) : (
            <span className="text-xs text-muted-foreground">
              Use device volume
            </span>
          )}
        </div>

        <Waveform
          isPlaying={isPlaying}
          progress={progress}
          analyserRef={analyserRef}
          isReactive={isReactive}
        />
      </div>

      {/* Track list */}
      <div className="flex flex-col overflow-hidden rounded-[1.5rem] border border-border lg:max-h-[38rem]">
        <div className="shrink-0 border-b border-border px-4 py-3">
          <div className="flex items-center justify-between gap-3">
            <div
              role="tablist"
              aria-label="Track panel"
              className="flex gap-1 rounded-full bg-secondary/70 p-1"
            >
              {PANELS.map((item) => {
                const isActive = panel === item.id;

                return (
                  <button
                    key={item.id}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setPanel(item.id)}
                    className={`inline-flex h-7 items-center rounded-full px-3 text-xs font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                      isActive
                        ? "bg-background text-foreground shadow-[var(--shadow-subtle)]"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}
            </div>
            <span className="shrink-0 text-xs tabular-nums text-muted-foreground">
              {panel === "tracks"
                ? `${visibleTracks.length} of ${tracks.length} · ${formatTotal(visibleRuntime)}`
                : track.name}
            </span>
          </div>

          {/*
           * A native select, not a hand-rolled listbox: keyboard navigation,
           * type-ahead, and the iOS wheel picker come for free, and there is no
           * Radix select in this project to lean on. The chevron is decorative,
           * so the select keeps appearance-none and paints its own.
           */}
          <div
            hidden={panel !== "tracks"}
            className="mt-3 flex items-center gap-2"
          >
            <div className="relative min-w-0 flex-1">
              <ListFilter className="pointer-events-none absolute left-3 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground" />
              <select
                value={genre}
                onChange={(event) => setGenre(event.target.value)}
                aria-label="Filter tracks by genre"
                className="h-9 w-full cursor-pointer appearance-none truncate rounded-xl border border-border bg-background pl-9 pr-9 text-xs font-medium text-foreground transition-colors hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                {genres.map((value) => (
                  <option key={value} value={value}>
                    {value === ALL_GENRES ? "All genres" : value} (
                    {countFor(value)})
                  </option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-3 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground" />
            </div>
            {/* Escape hatch — a filtered list with the active track hidden is easy to get stuck in. */}
            {genre !== ALL_GENRES ? (
              <button
                type="button"
                onClick={() => setGenre(ALL_GENRES)}
                className="inline-flex h-9 shrink-0 items-center gap-1 rounded-xl px-2.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <X className="size-3.5" />
                Clear
              </button>
            ) : null}
          </div>
        </div>

        {panel === "lyrics" ? <LyricsView track={track} /> : null}

        <ul
          ref={listRef}
          hidden={panel !== "tracks"}
          className="max-h-[20rem] flex-1 overflow-y-auto p-2 lg:max-h-none"
        >
          {!visibleTracks.length ? (
            <li className="px-3 py-8 text-center text-sm text-muted-foreground">
              No {genre} tracks.
            </li>
          ) : null}
          {visibleTracks.map((item) => {
            const isSelected = item.id === selectedId;

            return (
              <li key={item.id} data-id={item.id}>
                <button
                  type="button"
                  onClick={() => handleSelect(item.id)}
                  aria-current={isSelected ? "true" : undefined}
                  style={
                    isSelected
                      ? {
                          backgroundColor:
                            "color-mix(in srgb, var(--track-accent) 14%, transparent)",
                        }
                      : undefined
                  }
                  className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                    isSelected ? "" : "hover:bg-secondary"
                  }`}
                >
                  <span
                    className={`inline-flex size-9 shrink-0 items-center justify-center rounded-full ${
                      isSelected
                        ? "bg-[var(--track-accent)] text-white"
                        : "bg-secondary text-muted-foreground"
                    }`}
                  >
                    {isSelected && isPlaying ? (
                      <Pause className="size-4" />
                    ) : (
                      <Play className="size-4 translate-x-px" />
                    )}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-semibold text-foreground">
                      {item.name}
                    </span>
                    {item.description ? (
                      <span className="block truncate text-xs text-muted-foreground">
                        {item.description}
                      </span>
                    ) : null}
                  </span>
                  {item.lyrics ? (
                    <span
                      title="Has lyrics"
                      className="shrink-0 rounded-full border border-border px-1.5 py-0.5 text-[0.58rem] font-semibold uppercase tracking-[0.1em] text-muted-foreground"
                    >
                      Lyrics
                    </span>
                  ) : null}
                  {item.durationSeconds ? (
                    <span className="shrink-0 text-xs tabular-nums text-muted-foreground">
                      {formatTime(item.durationSeconds)}
                    </span>
                  ) : null}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
