import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type RefObject,
} from "react";
import { useMusic } from "../audio/MusicProvider";
import { formatTime, labelColorFor, sliderFill } from "../audio/trackDisplay";
import { CoverArt } from "../audio/CoverArt";
import { Vinyl } from "../audio/Vinyl";
import {
  ChevronDown,
  Disc3,
  Image as ImageIcon,
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
  { id: "covers", label: "Covers" },
  { id: "lyrics", label: "Lyrics" },
] as const;

type Panel = (typeof PANELS)[number]["id"];

/*
 * Two ways to look at the same track. "record" is the turntable: the disc is the
 * subject and everything stacks beneath it. "cover" makes the artwork the subject —
 * centred in whatever space the panel has — and drops the whole control stack to the
 * bottom edge, so the eye lands on the image first and the chrome stays out of its way.
 */
const LAYOUTS = [
  { id: "record", label: "Record", icon: Disc3 },
  { id: "cover", label: "Cover art", icon: ImageIcon },
] as const;

type Layout = (typeof LAYOUTS)[number]["id"];

const LAYOUT_KEY = "music-player-layout";

/* Which view you prefer is a lasting preference, not a per-visit one. Storage can
 * throw outright in a locked-down browser, so it is best-effort in both directions
 * and the default survives failure. */
function readLayout(): Layout {
  if (typeof window === "undefined") return "record";

  try {
    const saved = window.localStorage.getItem(LAYOUT_KEY);
    return saved === "cover" || saved === "record" ? saved : "record";
  } catch {
    return "record";
  }
}

function LayoutToggle({
  layout,
  onChange,
}: {
  layout: Layout;
  onChange: (next: Layout) => void;
}) {
  return (
    <div
      role="group"
      aria-label="Player layout"
      /* Its own translucent chip: the panel behind it is cover art, and bare icons on
       * an uncontrolled photo have no contrast guarantee. */
      className="absolute right-3 top-3 z-10 flex gap-0.5 rounded-full border border-border/60 bg-background/70 p-0.5 backdrop-blur sm:right-4 sm:top-4"
    >
      {LAYOUTS.map(({ id, label, icon: Icon }) => {
        const isActive = layout === id;

        return (
          <button
            key={id}
            type="button"
            onClick={() => onChange(id)}
            aria-pressed={isActive}
            /* Icon-only, so the name has to come from the label. */
            aria-label={`${label} layout`}
            title={`${label} layout`}
            className={`inline-flex size-7 items-center justify-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
              isActive
                ? "bg-secondary text-foreground shadow-[var(--shadow-subtle)]"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Icon className="size-3.5" />
          </button>
        );
      })}
    </div>
  );
}

/* Four animated bars — the one place motion is worth spending, because it answers
 * "which of these is playing" without the user reading any text. */
function PlayingBars() {
  return (
    <span aria-hidden="true" className="flex h-3 items-end gap-[2px]">
      {[0, 1, 2, 3].map((bar) => (
        <span
          key={bar}
          className="playing-bar w-[2px] rounded-full bg-current"
          style={{ animationDelay: `${bar * 0.15}s` }}
        />
      ))}
    </span>
  );
}

/*
 * The whole collection at once. A cover seen one at a time is decoration; forty-two
 * of them in a wall is a discography, and because the art was generated per track the
 * grid is the only place that reads as a body of work.
 *
 * Grouped by genre when nothing is filtered — the headings give the scroll a rhythm
 * and turn an undifferentiated 42-tile wall into nine legible runs.
 */
function CoversView({
  tracks,
  selectedId,
  isPlaying,
  onSelect,
  grouped,
  containerRef,
}: {
  tracks: AIWorkItem[];
  selectedId: string | null;
  isPlaying: boolean;
  onSelect: (id: string) => void;
  grouped: boolean;
  containerRef: RefObject<HTMLDivElement | null>;
}) {
  if (!tracks.length) {
    return (
      <div className="flex flex-1 items-center justify-center px-6 py-12">
        <p className="text-sm text-muted-foreground">No covers to show.</p>
      </div>
    );
  }

  const groups = grouped
    ? Array.from(
        tracks.reduce((map, item) => {
          const key = item.genre ?? "Other";
          map.set(key, [...(map.get(key) ?? []), item]);
          return map;
        }, new Map<string, AIWorkItem[]>()),
      )
    : [["", tracks] as const];

  return (
    <div
      ref={containerRef}
      className="max-h-[20rem] flex-1 overflow-y-auto px-3 pb-3 lg:max-h-none"
    >
      {groups.map(([heading, items]) => (
        <section key={heading || "all"} className="mb-4 last:mb-0">
          {heading ? (
            /* Sticky so the run you are scrolling through stays named. */
            <h4 className="sticky top-0 z-10 -mx-3 bg-background/95 px-3 pb-1.5 pt-3 text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-muted-foreground backdrop-blur">
              {heading}
              <span className="ml-1.5 tabular-nums opacity-60">
                {items.length}
              </span>
            </h4>
          ) : null}
          <ul
            className={`grid grid-cols-2 gap-2.5 sm:grid-cols-3 ${
              heading ? "mt-1.5" : "mt-3"
            }`}
          >
            {items.map((item) => {
              const isSelected = item.id === selectedId;

              return (
                <li key={item.id} data-id={item.id}>
                  <button
                    type="button"
                    onClick={() => onSelect(item.id)}
                    aria-current={isSelected ? "true" : undefined}
                    aria-label={
                      isSelected && isPlaying
                        ? `Pause ${item.name}`
                        : `Play ${item.name}`
                    }
                    className="group/tile w-full text-left focus-visible:outline-none"
                  >
                    <span
                      style={{ borderColor: labelColorFor(item.genre) }}
                      className={`relative block aspect-square overflow-hidden transition-transform group-hover/tile:-translate-y-0.5 group-focus-visible/tile:ring-2 group-focus-visible/tile:ring-ring ${
                        isSelected ? "border-2" : "border-0"
                      }`}
                    >
                      <CoverArt track={item} size="full" />
                      <span
                        className={`absolute inset-0 flex items-center justify-center bg-black/45 text-white transition-opacity ${
                          isSelected
                            ? "opacity-100"
                            : "opacity-0 group-hover/tile:opacity-100 group-focus-visible/tile:opacity-100"
                        }`}
                      >
                        {isSelected && isPlaying ? (
                          <Pause className="size-6" />
                        ) : (
                          <Play className="size-6 translate-x-px" />
                        )}
                      </span>
                      {isSelected && isPlaying ? (
                        <span className="absolute bottom-1.5 right-1.5 inline-flex items-center rounded-md bg-black/60 px-1.5 py-1 text-white">
                          <PlayingBars />
                        </span>
                      ) : null}
                    </span>
                    <span className="mt-1.5 block truncate text-xs font-semibold text-foreground">
                      {item.name}
                    </span>
                    <span className="block text-[0.68rem] tabular-nums text-muted-foreground">
                      {item.durationSeconds
                        ? formatTime(item.durationSeconds)
                        : null}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </section>
      ))}
    </div>
  );
}

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
    toggle,
    playTrack,
    seek,
    changeVolume,
    toggleMute,
    setQueue,
    canControlVolume,
  } = useMusic();

  const [genre, setGenre] = useState(ALL_GENRES);
  const [panel, setPanel] = useState<Panel>("tracks");
  const [layout, setLayout] = useState<Layout>(readLayout);
  const listRef = useRef<HTMLUListElement | null>(null);
  const coversRef = useRef<HTMLDivElement | null>(null);
  /* Tracks and Covers are two views of the same list, so both take the genre filter. */
  const isListPanel = panel === "tracks" || panel === "covers";
  const isCoverLayout = layout === "cover";

  useEffect(() => {
    try {
      window.localStorage.setItem(LAYOUT_KEY, layout);
    } catch {
      /* A remembered layout is a nicety; losing it is not worth handling. */
    }
  }, [layout]);

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

    const list = panel === "covers" ? coversRef.current : listRef.current;
    const row = list?.querySelector<HTMLElement>(`[data-id="${selectedId}"]`);
    if (!list || !row) return;

    const listBounds = list.getBoundingClientRect();
    const rowBounds = row.getBoundingClientRect();

    if (rowBounds.top < listBounds.top) {
      list.scrollTop -= listBounds.top - rowBounds.top;
    } else if (rowBounds.bottom > listBounds.bottom) {
      list.scrollTop += rowBounds.bottom - listBounds.bottom;
    }
  }, [selectedId, genre, panel]);

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
      <div
        /*
         * The grid stretches this panel to the track list's height, so the record
         * stack has slack under it and would otherwise sit top-aligned in a tall box.
         * `safe center` rather than plain centring: if the content ever outgrows the
         * panel, safe falls back to flex-start instead of centring the overflow and
         * clipping the top off against overflow-hidden. Cover layout centres itself —
         * its hero takes the slack as flex-1 and the controls pin to the bottom.
         */
        className={`glass-panel relative isolate flex flex-col items-center overflow-hidden rounded-[1.5rem] p-6 text-center sm:p-8 lg:max-h-[38rem] ${
          isCoverLayout ? "min-h-[26rem]" : "[justify-content:safe_center]"
        }`}
      >
        <LayoutToggle layout={layout} onChange={setLayout} />

        {/*
         * The cover as the room the player sits in. Only lightly blurred, so the photo
         * still reads as a photo, then covered by a vertical ramp to the panel
         * background — the top keeps the image, everything from the title down sits on
         * solid ground so no control ever competes with it.
         *
         * Scaled up rather than fitted: several covers have a sleeve border baked into
         * the art, and at 1:1 that border reads as a stray frame around the panel. The
         * zoom crops it off, and takes some of the corner lettering with it.
         * `isolate` on the panel is what lets a -z-10 child paint above .glass-panel's
         * own background instead of disappearing behind it.
         */}
        {track.thumbnail ? (
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
            <img
              src={track.thumbnail}
              alt=""
              className="size-full scale-125 object-cover object-center blur-[3px]"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-background/75 to-background" />
          </div>
        ) : null}

        <div
          className={
            isCoverLayout
              ? "flex w-full flex-1 items-center justify-center py-4"
              : "contents"
          }
        >
          <button
            type="button"
            onClick={toggle}
            disabled={!canPlay}
            aria-label={isPlaying ? `Pause ${track.name}` : `Play ${track.name}`}
            className={`group relative aspect-square w-full shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed ${
              isCoverLayout
                ? "max-w-[15rem] shadow-[var(--shadow-soft)]"
                : "max-w-[11.5rem] rounded-full"
            }`}
          >
            {isCoverLayout ? (
              <CoverArt track={track} size="full" eager />
            ) : (
              <Vinyl
                isSpinning={isPlaying}
                labelColor={labelColorFor(track.genre)}
              />
            )}
            {/* On cover art the scrim earns its keep — a pale photo would swallow a
              * bare glyph. The record already supplies its own dark ground. */}
            <span
              className={`absolute inset-0 flex items-center justify-center transition-colors ${
                isCoverLayout
                  ? "group-hover:bg-black/35 group-focus-visible:bg-black/35"
                  : ""
              }`}
            >
              <span className="inline-flex size-14 items-center justify-center rounded-full bg-background/85 text-foreground opacity-0 shadow-[var(--shadow-subtle)] transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
                {isPlaying ? (
                  <Pause className="size-5" />
                ) : (
                  <Play className="size-5 translate-x-px" />
                )}
              </span>
            </span>
          </button>
        </div>

        {/* Title through waveform. In cover layout this whole stack is pinned to the
          * bottom edge; in record layout the wrapper dissolves and nothing moves. */}
        <div
          className={
            isCoverLayout
              ? "mt-auto flex w-full shrink-0 flex-col items-center"
              : "contents"
          }
        >
        <h3
          className={`text-xl font-semibold tracking-tight text-foreground ${
            isCoverLayout ? "" : "mt-6"
          }`}
        >
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
        </div>
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
              {isListPanel
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
            hidden={!isListPanel}
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

        {panel === "covers" ? (
          <CoversView
            tracks={visibleTracks}
            selectedId={selectedId}
            isPlaying={isPlaying}
            onSelect={handleSelect}
            /* Only group when the user has not already narrowed to one genre. */
            grouped={genre === ALL_GENRES}
            containerRef={coversRef}
          />
        ) : null}

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
                  className={`group/row flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                    isSelected ? "" : "hover:bg-secondary"
                  }`}
                >
                  {/*
                   * Cover art is uncontrolled, so the icon rides a scrim rather than
                   * sitting bare on the image — a white glyph on a pale cover fails
                   * contrast. The scrim is always on for the selected row and appears
                   * on hover or keyboard focus for the rest.
                   */}
                  <span className="relative size-10 shrink-0 overflow-hidden">
                    <CoverArt track={item} size="sm" />
                    <span
                      className={`absolute inset-0 flex items-center justify-center bg-black/45 text-white transition-opacity ${
                        isSelected
                          ? "opacity-100"
                          : "opacity-0 group-hover/row:opacity-100 group-focus-visible/row:opacity-100"
                      }`}
                    >
                      {isSelected && isPlaying ? (
                        <Pause className="size-4" />
                      ) : (
                        <Play className="size-4 translate-x-px" />
                      )}
                    </span>
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
