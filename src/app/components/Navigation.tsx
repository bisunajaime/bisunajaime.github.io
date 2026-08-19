import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type RefObject,
} from "react";
import {
  ArrowUpRight,
  Menu,
  Moon,
  Pause,
  Play,
  SkipBack,
  SkipForward,
  SunMedium,
  Volume2,
  VolumeX,
  X,
} from "lucide-react";
import { useTheme } from "next-themes";
import { cn } from "./shared/utils";
import { useMusic } from "../audio/MusicProvider";
import { formatTime, labelColorFor, sliderFill } from "../audio/trackDisplay";
import { Vinyl } from "../audio/Vinyl";
import { Waveform } from "../audio/Waveform";

interface NavigationProps {
  activeSection: string;
  onNavigate: (section: string) => void;
}

const sections = [
  { id: "hero", label: "Home" },
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "wallpapers", label: "AI Work" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" },
];

function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted && resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="inline-flex size-11 items-center justify-center rounded-xl border border-border bg-background/75 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      {isDark ? <SunMedium className="size-4" /> : <Moon className="size-4" />}
    </button>
  );
}

/*
 * Live level, the same component the Music tab chip uses so the two read as one
 * system. Deliberately unboxed — no border or fill — so the bars sit directly in
 * the bar rather than in a chip. Motion is the play indicator: bars fall still
 * and dim while paused, which is why the transport needs no separate dot.
 *
 * progress is pinned at 100 so every bar renders at full strength. The Waveform
 * dims bars past the playhead to show progress, which is wanted in the player
 * but reads as half-broken at this size.
 */
function NavLevel({
  isPlaying,
  analyserRef,
  isReactive,
}: {
  isPlaying: boolean;
  analyserRef: RefObject<AnalyserNode | null>;
  isReactive: boolean;
}) {
  return (
    <Waveform
      isPlaying={isPlaying}
      progress={100}
      analyserRef={analyserRef}
      isReactive={isReactive}
      barCount={16}
      barClassName="w-[2px]"
      maxHeight={26}
      dim={isPlaying ? 1 : 0.45}
      className="pointer-events-none flex h-6 w-[3.5rem] items-center justify-center gap-[2px] overflow-hidden"
    />
  );
}

/* Bare hit area — the bars are the control, so nothing frames them. */
const TRANSPORT_CLASS =
  "inline-flex h-11 items-center justify-center rounded-lg px-1 opacity-80 transition-opacity hover:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";

function PlayPauseButton() {
  const { isPlaying, isReactive, analyserRef, track, toggle } = useMusic();
  const label = isPlaying ? "Pause music" : "Play music";

  return (
    <button
      type="button"
      onClick={toggle}
      data-music-control
      className={TRANSPORT_CLASS}
      aria-label={label}
      aria-pressed={isPlaying}
      title={track ? `${label} — ${track.name}` : label}
    >
      <NavLevel
        isPlaying={isPlaying}
        analyserRef={analyserRef}
        isReactive={isReactive}
      />
    </button>
  );
}

function MiniPlayer({ onOpenSection }: { onOpenSection: () => void }) {
  const {
    tracks,
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
    requestMusicTab,
    canControlVolume,
    isReactive,
    analyserRef,
  } = useMusic();

  const [isOpen, setIsOpen] = useState(false);
  /* Touch devices have no hover, so the panel needs a tap to open it. */
  const [isCoarsePointer, setIsCoarsePointer] = useState(false);
  const rootRef = useRef<HTMLDivElement | null>(null);

  /* Grace period so crossing the gap to the panel does not dismiss it. */
  const graceTimer = useRef<number | null>(null);

  const clearTimers = () => {
    if (graceTimer.current) window.clearTimeout(graceTimer.current);
    graceTimer.current = null;
  };

  const open = () => {
    clearTimers();
    setIsOpen(true);
  };

  const close = () => {
    clearTimers();
    setIsOpen(false);
  };

  const scheduleClose = () => {
    clearTimers();
    graceTimer.current = window.setTimeout(close, 160);
  };

  useEffect(() => clearTimers, []);

  useEffect(() => {
    const query = window.matchMedia("(hover: none)");
    const sync = () => setIsCoarsePointer(query.matches);

    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);

  /* Without hover there is no mouseleave, so a tap elsewhere has to dismiss it. */
  useEffect(() => {
    if (!isOpen || !isCoarsePointer) return;

    const handleOutside = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) close();
    };

    document.addEventListener("pointerdown", handleOutside);
    return () => document.removeEventListener("pointerdown", handleOutside);
  }, [isOpen, isCoarsePointer]);

  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen]);

  if (!track) return null;

  const index = tracks.findIndex((item) => item.id === selectedId);

  /* Wraps in both directions, matching the full player's transport. */
  const step = (delta: number) => {
    if (tracks.length < 2) return;

    const base = index < 0 ? 0 : index;
    const next = tracks[(base + delta + tracks.length) % tracks.length];
    if (next) playTrack(next.id);
  };
  const safeDuration = Number.isFinite(duration) && duration > 0 ? duration : 0;
  const seekValue = Math.min(currentTime, safeDuration);
  const progress = safeDuration > 0 ? (seekValue / safeDuration) * 100 : 0;
  const muteLabel = isMuted ? "Unmute music" : "Mute music";
  const transportLabel = isPlaying ? "Pause music" : "Play music";

  return (
    <div
      ref={rootRef}
      data-music-control
      className="relative"
      onMouseEnter={isCoarsePointer ? undefined : open}
      onMouseLeave={isCoarsePointer ? undefined : scheduleClose}
      onFocus={open}
      onBlur={isCoarsePointer ? undefined : scheduleClose}
      style={{ "--track-accent": labelColorFor(track.genre) } as CSSProperties}
    >
      <button
        type="button"
        onClick={() =>
          isCoarsePointer ? (isOpen ? close() : open()) : toggle()
        }
        className={TRANSPORT_CLASS}
        aria-label={
          isCoarsePointer ? `Music controls — ${track.name}` : transportLabel
        }
        aria-pressed={isCoarsePointer ? undefined : isPlaying}
        aria-expanded={isOpen}
        title={`${transportLabel} — ${track.name}`}
      >
        <NavLevel
          isPlaying={isPlaying}
          analyserRef={analyserRef}
          isReactive={isReactive}
        />
      </button>

      {isOpen ? (
        <div
          role="group"
          aria-label="Mini player"
          /* No gap to the trigger — the pointer must be able to reach the panel. */
          /* Anchored to the viewport on phones — 288px hanging off a mid-bar button overflows. */
          className="fixed inset-x-3 top-[4.75rem] z-50 pt-0 sm:absolute sm:inset-x-auto sm:right-0 sm:top-full sm:w-72 sm:pt-2"
        >
          <div className="mini-player-in rounded-2xl border border-border bg-popover p-3 shadow-[var(--shadow-soft)]">
            <div className="flex items-center gap-2.5">
              <span className="size-10 shrink-0" aria-hidden="true">
                <Vinyl
                  isSpinning={isPlaying && !isMuted}
                  labelColor={labelColorFor(track.genre)}
                  compact
                />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-sm font-semibold text-foreground">
                  {track.name}
                </span>
                <span className="block truncate text-xs text-muted-foreground">
                  {track.genre ?? track.artist}
                </span>
              </span>
            </div>

            <div className="mt-3 flex items-center gap-2">
              <span className="w-8 shrink-0 text-right text-[0.65rem] tabular-nums text-muted-foreground">
                {formatTime(currentTime)}
              </span>
              <input
                type="range"
                min={0}
                max={safeDuration}
                step={0.01}
                value={seekValue}
                disabled={safeDuration <= 0}
                onChange={(event) => seek(Number(event.target.value))}
                aria-label="Seek"
                className="media-slider"
                style={sliderFill(progress)}
              />
              <span className="w-8 shrink-0 text-[0.65rem] tabular-nums text-muted-foreground">
                {formatTime(safeDuration)}
              </span>
            </div>

            <div className="mt-2 flex items-center justify-between gap-2">
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => step(-1)}
                  disabled={tracks.length < 2}
                  aria-label="Previous track"
                  className="inline-flex size-9 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-40"
                >
                  <SkipBack className="size-3.5" />
                </button>
                <button
                  type="button"
                  onClick={toggle}
                  aria-label={isPlaying ? "Pause" : "Play"}
                  className="inline-flex size-9 items-center justify-center rounded-full bg-[var(--track-accent)] text-white transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  {isPlaying ? (
                    <Pause className="size-4" />
                  ) : (
                    <Play className="size-4 translate-x-px" />
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => step(1)}
                  disabled={tracks.length < 2}
                  aria-label="Next track"
                  className="inline-flex size-9 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-40"
                >
                  <SkipForward className="size-3.5" />
                </button>
              </div>

              <div className="flex min-w-0 flex-1 items-center gap-1.5">
                <button
                  type="button"
                  onClick={toggleMute}
                  aria-label={muteLabel}
                  className="inline-flex size-8 shrink-0 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  {isMuted || volume === 0 ? (
                    <VolumeX className="size-3.5" />
                  ) : (
                    <Volume2 className="size-3.5" />
                  )}
                </button>
                {canControlVolume ? (
                  <input
                    type="range"
                    min={0}
                    max={1}
                    step={0.01}
                    value={isMuted ? 0 : volume}
                    onChange={(event) =>
                      changeVolume(Number(event.target.value))
                    }
                    aria-label="Volume"
                    className="media-slider"
                    style={sliderFill((isMuted ? 0 : volume) * 100)}
                  />
                ) : null}
              </div>
            </div>

            <a
              href="#wallpapers"
              onClick={(event) => {
                event.preventDefault();
                requestMusicTab();
                onOpenSection();
                close();
              }}
              className="mt-3 flex items-center justify-between gap-2 rounded-xl border border-border px-3 py-2 text-xs font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              See more tracks
              <ArrowUpRight className="size-3.5" />
            </a>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export function Navigation({ activeSection, onNavigate }: NavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  const handleNavigate = (section: string) => {
    onNavigate(section);
    setIsMenuOpen(false);
  };

  return (
    <>
      <nav className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-6 sm:pt-4">
        <div className="mx-auto w-full max-w-[var(--page-max-width)]">
          <div className="glass-panel flex items-center justify-between rounded-2xl px-3 py-2 sm:px-4">
            <button
              type="button"
              onClick={() => handleNavigate("hero")}
              className="inline-flex h-11 items-center rounded-xl px-3 text-base font-semibold tracking-tight text-foreground transition-colors hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              aria-label="Go to home section"
            >
              Jaime
              <span className="ml-1 text-primary">Bisuña</span>
            </button>

            <div className="hidden items-center gap-1.5 md:flex">
              {sections.map((section) => (
                <button
                  type="button"
                  key={section.id}
                  onClick={() => handleNavigate(section.id)}
                  aria-current={
                    activeSection === section.id ? "page" : undefined
                  }
                  className={cn(
                    "inline-flex h-11 items-center rounded-xl px-4 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                    activeSection === section.id
                      ? "bg-primary/12 text-primary"
                      : "text-muted-foreground hover:bg-secondary hover:text-foreground",
                  )}
                >
                  {section.label}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <MiniPlayer onOpenSection={() => onNavigate("wallpapers")} />
              <ThemeToggle />
              <button
                type="button"
                onClick={() => setIsMenuOpen((prev) => !prev)}
                className="inline-flex size-11 items-center justify-center rounded-xl border border-border bg-background/75 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring md:hidden"
                aria-expanded={isMenuOpen}
                aria-controls="mobile-menu"
                aria-label={
                  isMenuOpen ? "Close navigation menu" : "Open navigation menu"
                }
              >
                {isMenuOpen ? (
                  <X className="size-5" />
                ) : (
                  <Menu className="size-5" />
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div
        className={cn(
          "fixed inset-0 z-50 bg-black/35 transition-opacity md:hidden",
          isMenuOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0",
        )}
        onClick={() => setIsMenuOpen(false)}
        aria-hidden={!isMenuOpen}
      >
        <div
          id="mobile-menu"
          className={cn(
            "glass-panel absolute right-0 top-0 flex h-full w-[min(20rem,84vw)] flex-col rounded-none border-l border-y-0 border-r-0 border-border px-5 pb-6 pt-20 transition-transform duration-300",
            isMenuOpen ? "translate-x-0" : "translate-x-full",
          )}
          onClick={(event) => event.stopPropagation()}
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
        >
          <div className="space-y-1">
            {sections.map((section) => (
              <button
                key={section.id}
                type="button"
                onClick={() => handleNavigate(section.id)}
                aria-current={activeSection === section.id ? "page" : undefined}
                className={cn(
                  "flex h-11 w-full items-center rounded-xl px-3 text-left text-base font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                  activeSection === section.id
                    ? "bg-primary/12 text-primary"
                    : "text-foreground hover:bg-secondary",
                )}
              >
                {section.label}
              </button>
            ))}
          </div>

          <p className="mt-6 px-1 text-xs uppercase tracking-[0.14em] text-muted-foreground">
            Theme &amp; sound
          </p>
          <div className="mt-2 flex items-center gap-2">
            <ThemeToggle />
            <PlayPauseButton />
          </div>
        </div>
      </div>
    </>
  );
}
