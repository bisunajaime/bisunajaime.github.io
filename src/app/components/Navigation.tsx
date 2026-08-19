import { useEffect, useRef, useState, type CSSProperties } from "react";
import { ArrowUpRight, Menu, Moon, Pause, Play, SkipBack, SkipForward, SunMedium, Volume2, VolumeX, X } from "lucide-react";
import { useTheme } from "next-themes";
import { cn } from "./shared/utils";
import { useMusic } from "../audio/MusicProvider";
import { formatTime, labelColorFor } from "../audio/trackDisplay";
import { Vinyl } from "../audio/Vinyl";

const MINI_SLIDER_CLASS =
  "h-1 w-full cursor-pointer appearance-none rounded-full bg-border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring " +
  "[&::-webkit-slider-thumb]:size-3 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[var(--track-accent)] " +
  "[&::-moz-range-thumb]:size-3 [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:bg-[var(--track-accent)]";

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
  } = useMusic();

  const [isOpen, setIsOpen] = useState(false);

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

  return (
    <div
      className="relative"
      onMouseEnter={open}
      onMouseLeave={scheduleClose}
      onFocus={open}
      onBlur={scheduleClose}
      style={{ "--track-accent": labelColorFor(track.genre) } as CSSProperties}
    >
      <button
        type="button"
        onClick={toggleMute}
        className="relative inline-flex size-11 items-center justify-center rounded-xl border border-border bg-background/75 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        aria-label={muteLabel}
        aria-pressed={isMuted}
        aria-expanded={isOpen}
        title={`${muteLabel} — ${track.name}`}
      >
        {isMuted ? <VolumeX className="size-4" /> : <Volume2 className="size-4" />}
        {/* Quiet cue that something is playing, so a muted tab is not a mystery. */}
        {isPlaying && !isMuted ? (
          <span className="absolute right-1.5 top-1.5 size-1.5 rounded-full bg-[var(--track-accent)]" />
        ) : null}
      </button>

      {isOpen ? (
        <div
          role="group"
          aria-label="Mini player"
          /* No gap to the trigger — the pointer must be able to reach the panel. */
          className="absolute right-0 top-full z-50 w-72 pt-2"
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
                className={MINI_SLIDER_CLASS}
                style={{
                  background: `linear-gradient(to right, var(--track-accent) ${progress}%, var(--border) ${progress}%)`,
                }}
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
                <input
                  type="range"
                  min={0}
                  max={1}
                  step={0.01}
                  value={isMuted ? 0 : volume}
                  onChange={(event) => changeVolume(Number(event.target.value))}
                  aria-label="Volume"
                  className={MINI_SLIDER_CLASS}
                  style={{
                    background: `linear-gradient(to right, var(--track-accent) ${(isMuted ? 0 : volume) * 100}%, var(--border) ${(isMuted ? 0 : volume) * 100}%)`,
                  }}
                />
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
                  aria-current={activeSection === section.id ? "page" : undefined}
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
                aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              >
                {isMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div
        className={cn(
          "fixed inset-0 z-50 bg-black/35 transition-opacity md:hidden",
          isMenuOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0",
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
            <MiniPlayer
              onOpenSection={() => {
                setIsMenuOpen(false);
                onNavigate("wallpapers");
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
}
