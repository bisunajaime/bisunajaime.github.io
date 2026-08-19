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

/* Pool the first-load random pick is drawn from. */
const LOFI_GENRE = "Lo-fi Hip-Hop";

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

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const shouldAutoPlayRef = useRef(false);
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

  /* Pick a random lo-fi track on first load and try to start it. */
  useEffect(() => {
    if (!tracks.length) return;

    const lofi = tracks.filter((item) => item.genre === LOFI_GENRE);
    const pool = lofi.length ? lofi : tracks;
    const pick = pool[Math.floor(Math.random() * pool.length)];

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
      /*
       * Browsers block audible autoplay without prior interaction. Rather than
       * fail silently, arm a one-shot listener so the first click or keypress
       * anywhere starts it.
       */
      setIsPlaying(false);

      const startOnGesture = () => {
        document.removeEventListener("pointerdown", startOnGesture);
        document.removeEventListener("keydown", startOnGesture);
        ensureAudioGraph();
        resumeContext();
        void audioRef.current?.play().catch(() => undefined);
      };

      document.addEventListener("pointerdown", startOnGesture);
      document.addEventListener("keydown", startOnGesture);
    });
  }, [selectedId, ensureAudioGraph, resumeContext]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = volume;
    audio.muted = isMuted;
  }, [volume, isMuted]);

  useEffect(() => {
    return () => {
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
      }}
    >
      {children}
      {/*
        Rendered once at the app root, outside the tab panels. Mounting it inside
        the Music tab would tear down playback whenever the tab changed.
      */}
      <audio
        ref={audioRef}
        src={track?.audioSrc}
        preload="metadata"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onEnded={handleEnded}
        onTimeUpdate={(event) => setCurrentTime(event.currentTarget.currentTime)}
        onLoadedMetadata={(event) => setDuration(event.currentTarget.duration)}
        onDurationChange={(event) => setDuration(event.currentTarget.duration)}
      />
    </MusicContext.Provider>
  );
}
