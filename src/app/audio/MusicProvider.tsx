import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
  type RefObject,
} from "react";
import { aiMusic, type AIWorkItem } from "../../data/aiWorkData";

/*
 * iPadOS 13+ reports itself as "Macintosh", so the UA string alone is not
 * enough — multi-touch separates an iPad from a desktop Mac.
 */
function isIOS() {
  if (typeof navigator === "undefined") return false;

  const ua = navigator.userAgent;
  const isIPadOS = /Macintosh/.test(ua) && navigator.maxTouchPoints > 1;
  return /iPad|iPhone|iPod/.test(ua) || isIPadOS;
}

interface MusicContextValue {
  tracks: AIWorkItem[];
  track: AIWorkItem | undefined;
  selectedId: string;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  isMuted: boolean;
  isReactive: boolean;
  analyserRef: RefObject<AnalyserNode | null>;
  toggle: () => void;
  playTrack: (id: string) => void;
  seek: (seconds: number) => void;
  changeVolume: (value: number) => void;
  toggleMute: () => void;
  setQueue: (ids: string[]) => void;
  /* False on iOS, where volume is hardware-only and the setter is ignored. */
  canControlVolume: boolean;
  /* Bumped when something asks the AI Work section to switch to the Music tab. */
  musicTabRequest: number;
  requestMusicTab: () => void;
}

const MusicContext = createContext<MusicContextValue | null>(null);

export function useMusic() {
  const value = useContext(MusicContext);
  if (!value) throw new Error("useMusic must be used inside <MusicProvider>");
  return value;
}

export function MusicProvider({ children }: { children: ReactNode }) {
  const tracks = aiMusic;

  const [selectedId, setSelectedId] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.35);
  const [isMuted, setIsMuted] = useState(false);
  const [isReactive, setIsReactive] = useState(false);
  const [musicTabRequest, setMusicTabRequest] = useState(0);
  const [canControlVolume, setCanControlVolume] = useState(true);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const shouldAutoPlayRef = useRef(false);
  const disarmGestureRef = useRef<(() => void) | null>(null);
  /* Auto-advance order. Defaults to everything; the player narrows it to the active filter. */
  const queueRef = useRef<string[]>(tracks.map((item) => item.id));

  const track = tracks.find((item) => item.id === selectedId) ?? tracks[0];

  /*
   * Built lazily and only from a real user gesture. An AudioContext created
   * without one starts suspended, and audio routed through a suspended context
   * is silent — so autoplay deliberately does not build the graph.
   * createMediaElementSource may only be called once per element.
   */
  const ensureAudioGraph = useCallback(() => {
    if (analyserRef.current || !audioRef.current) return;

    const Ctor: typeof AudioContext | undefined =
      window.AudioContext ??
      (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!Ctor) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    try {
      const context = new Ctor();
      const source = context.createMediaElementSource(audioRef.current);
      const analyser = context.createAnalyser();
      analyser.fftSize = 512;
      analyser.smoothingTimeConstant = 0.8;

      source.connect(analyser);
      analyser.connect(context.destination);

      audioCtxRef.current = context;
      analyserRef.current = analyser;
      setIsReactive(true);
    } catch {
      audioCtxRef.current = null;
      analyserRef.current = null;
      setIsReactive(false);
    }
  }, []);

  const resumeContext = useCallback(() => {
    void audioCtxRef.current?.resume().catch(() => undefined);
  }, []);

  /*
   * Starts playback on the first interaction anywhere, for when autoplay was
   * blocked. Stays armed until playback actually begins.
   */
  const armGestureStart = useCallback(() => {
    if (disarmGestureRef.current) return;

    /*
     * Capture phase: a handler calling stopPropagation — the mobile drawer
     * does — would otherwise stop the event before it reaches document.
     */
    const options = { capture: true } as const;

    const startOnGesture = (event: Event) => {
      /*
       * Clicks on a music control are handled by that control. Starting
       * playback here as well would let its own toggle immediately pause what
       * we just began — pointerdown always precedes click. Stay armed.
       */
      const target = event.target as HTMLElement | null;
      if (target?.closest?.("[data-music-control]")) return;

      disarm();
      ensureAudioGraph();
      resumeContext();
      void audioRef.current?.play().catch(() => undefined);
    };

    const disarm = () => {
      document.removeEventListener("pointerdown", startOnGesture, options);
      document.removeEventListener("keydown", startOnGesture, options);
      disarmGestureRef.current = null;
    };

    document.addEventListener("pointerdown", startOnGesture, options);
    document.addEventListener("keydown", startOnGesture, options);
    disarmGestureRef.current = disarm;
  }, [ensureAudioGraph, resumeContext]);

  /* Pick a random track from the whole library on first load and try to start it. */
  useEffect(() => {
    if (!tracks.length) return;

    const pick = tracks[Math.floor(Math.random() * tracks.length)];

    shouldAutoPlayRef.current = true;
    setSelectedId(pick.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !selectedId) return;

    audio.load();
    setCurrentTime(0);
    setDuration(0);

    if (!shouldAutoPlayRef.current) return;
    shouldAutoPlayRef.current = false;

    void audio.play().catch(() => {
      /* Browsers block audible autoplay without prior interaction. */
      setIsPlaying(false);
      armGestureStart();
    });
  }, [selectedId, armGestureStart]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = volume;
    audio.muted = isMuted;
  }, [volume, isMuted]);

  /*
   * iOS reserves audio volume for the hardware buttons. Assigning to
   * audio.volume is accepted and reads back unchanged, but has no effect on
   * output — so feature detection genuinely cannot see it. The platform check
   * is load-bearing here, not a shortcut: no API reports this.
   *
   * The probe stays as the feature-based half, for any other environment that
   * rejects volume writes, and reads back a frame later since a synchronous
   * read can report a value that was never applied.
   */
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isIOS()) {
      setCanControlVolume(false);
      return;
    }

    const probe = 0.123;
    const original = audio.volume;
    let frame = 0;

    try {
      audio.volume = probe;
      frame = requestAnimationFrame(() => {
        setCanControlVolume(Math.abs(audio.volume - probe) < 0.01);
        audio.volume = original;
      });
    } catch {
      setCanControlVolume(false);
    }

    return () => cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    return () => {
      disarmGestureRef.current?.();
      void audioCtxRef.current?.close().catch(() => undefined);
    };
  }, []);

  const toggle = useCallback(() => {
    const audio = audioRef.current;
    if (!audio || !track?.audioSrc) return;

    ensureAudioGraph();
    resumeContext();

    if (audio.paused) {
      void audio.play().catch(() => setIsPlaying(false));
    } else {
      audio.pause();
    }
  }, [track, ensureAudioGraph, resumeContext]);

  /*
   * Moves to a track without touching the audio graph. Auto-advance runs outside
   * a user gesture, and building a context there would create it suspended —
   * which silences everything routed through it.
   */
  const advanceTo = useCallback(
    (id: string) => {
      resumeContext();
      shouldAutoPlayRef.current = true;
      setSelectedId(id);
    },
    [resumeContext],
  );

  const playTrack = useCallback(
    (id: string) => {
      ensureAudioGraph();
      advanceTo(id);
    },
    [ensureAudioGraph, advanceTo],
  );

  const seek = useCallback((seconds: number) => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.currentTime = seconds;
    setCurrentTime(seconds);
  }, []);

  const changeVolume = useCallback((value: number) => {
    setVolume(value);
    setIsMuted(false);
  }, []);

  const toggleMute = useCallback(() => setIsMuted((muted) => !muted), []);

  const setQueue = useCallback((ids: string[]) => {
    queueRef.current = ids;
  }, []);

  const requestMusicTab = useCallback(() => setMusicTabRequest((count) => count + 1), []);

  const handleEnded = useCallback(() => {
    const queue = queueRef.current.length ? queueRef.current : tracks.map((item) => item.id);

    if (!queue.length) {
      setIsPlaying(false);
      setCurrentTime(0);
      return;
    }

    /* Wraps: finishing the last track returns to the first. */
    const index = queue.indexOf(selectedId);
    const nextId = queue[((index < 0 ? -1 : index) + 1) % queue.length];

    /*
     * A single-track queue lands back on itself, and setting the same id changes
     * no state — so nothing would reload. Restart the element directly.
     */
    if (nextId === selectedId) {
      const audio = audioRef.current;
      if (!audio) return;

      audio.currentTime = 0;
      void audio.play().catch(() => setIsPlaying(false));
      return;
    }

    advanceTo(nextId);
  }, [selectedId, tracks, advanceTo]);

  return (
    <MusicContext.Provider
      value={{
        tracks,
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
        musicTabRequest,
        requestMusicTab,
        canControlVolume,
      }}
    >
      {children}
      {/*
        Rendered once at the app root, outside the tab panels. Mounting it inside
        the Music tab would tear down playback whenever the tab changed.
      */}
      <audio
        ref={audioRef}
        /*
         * Held empty until a track is actually chosen. `track` falls back to
         * tracks[0] for the first render, and preload="metadata" would make the
         * browser start fetching that file before the random pick replaces it.
         */
        src={selectedId ? track?.audioSrc : undefined}
        preload="metadata"
        onPlay={() => {
          setIsPlaying(true);
          disarmGestureRef.current?.();
        }}
        onPause={() => setIsPlaying(false)}
        onEnded={handleEnded}
        onTimeUpdate={(event) => setCurrentTime(event.currentTarget.currentTime)}
        onLoadedMetadata={(event) => setDuration(event.currentTarget.duration)}
        onDurationChange={(event) => setDuration(event.currentTarget.duration)}
      />
    </MusicContext.Provider>
  );
}
