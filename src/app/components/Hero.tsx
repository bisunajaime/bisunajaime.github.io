import { useEffect, useRef, type CSSProperties, type MouseEvent } from "react";
import { ArrowRight, FileText, Github, Linkedin, Mail } from "lucide-react";

/*
 * The video reaches under the frost rather than stopping at it, so there is
 * something for the glass to actually diffuse; only the far left dissolves.
 */
const FADE_LEFT =
  "linear-gradient(to right, transparent 0%, rgba(0,0,0,0.45) 16%, #000 42%)";

/*
 * Frost ramp, crisp on the right and fully frosted over the copy. Radii
 * compound because each layer frosts the output of the one beneath it, so the
 * effective blur at the far left lands well past the nav's 20px.
 */
const FROST_LAYERS = [
  { blur: 3, stop: 82 },
  { blur: 6, stop: 66 },
  { blur: 12, stop: 50 },
  { blur: 20, stop: 34 },
];

const frostMask = (stop: number) =>
  `linear-gradient(to right, #000 0%, #000 ${Math.round(stop * 0.35)}%, transparent ${stop}%)`;

/* Translucent surface of the frost — the same tint the nav floats on. */
const TINT_MASK =
  "linear-gradient(to right, #000 0%, #000 26%, rgba(0,0,0,0.35) 48%, transparent 66%)";
/* Vertical sheen sits where the frost thins out, fading at top and bottom. */
const SPECULAR_MASK =
  "linear-gradient(to bottom, transparent, #000 22%, #000 78%, transparent)";

const LINKS = {
  github: "https://github.com/bisunajaime",
  linkedin: "https://www.linkedin.com/in/jose-jaime-bisuna",
  resume: "/files/JaimeBisunaResume.pdf",
};

export function Hero() {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  /*
   * React drops the `muted` attribute on hydration often enough that iOS/Safari
   * refuses inline autoplay, so pin it on the element itself. Reduced-motion
   * users keep the poster frame instead of the loop.
   */
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    video.defaultMuted = true;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      video.pause();
      return;
    }

    void video.play().catch(() => undefined);
  }, []);

  const handleProjectsClick = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    const element = document.getElementById("projects");
    if (!element) {
      return;
    }

    const offset = 92;
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - offset;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });
  };

  const handleContactClick = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    const element = document.getElementById("contact");
    if (!element) {
      return;
    }

    const offset = 92;
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - offset;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });
  };

  return (
    <section
      id="hero"
      className="relative isolate flex min-h-[max(38rem,80svh)] items-center overflow-hidden pb-20 pt-28 sm:pt-32"
    >
      {/*
       * Full-bleed video: anchored to the right edge, cropped by the viewport.
       * Sharp on the right, then a frost ramp, glass tint, edge sheen, and a
       * background scrim — each masked so the frame reads as frosted glass
       * sliding over the video before it reaches the copy.
       */}
      <div className="pointer-events-none absolute inset-y-0 right-0 -z-10 w-full sm:w-[78%] lg:w-[62%]">
        <video
          ref={videoRef}
          className="block h-full w-full object-cover"
          style={{
            maskImage: FADE_LEFT,
            WebkitMaskImage: FADE_LEFT,
          }}
          src="/assets/video/lofi-jaime.mp4"
          poster="/assets/images/lofi-jaime-poster.webp"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          disablePictureInPicture
          aria-hidden="true"
          tabIndex={-1}
        />
        {FROST_LAYERS.map((layer) => (
          <div
            key={layer.blur}
            className="frost-layer"
            style={
              {
                "--frost-blur": `${layer.blur}px`,
                "--frost-mask": frostMask(layer.stop),
              } as CSSProperties
            }
          />
        ))}
        <div
          className="absolute inset-0 bg-[var(--surface-glass)]"
          style={{ maskImage: TINT_MASK, WebkitMaskImage: TINT_MASK }}
        />
        {/*
         * Phones have no horizontal room for the ramp — the copy sits directly
         * over the frame — so the frost covers the whole thing there instead.
         */}
        <div className="absolute inset-0 bg-[var(--surface-glass)] backdrop-blur-md sm:hidden" />
        <div
          className="absolute inset-y-0 left-[38%] w-40 bg-gradient-to-r from-transparent via-[var(--glass-specular)] to-transparent opacity-70 max-sm:hidden"
          style={{ maskImage: SPECULAR_MASK, WebkitMaskImage: SPECULAR_MASK }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/45 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-background" />
      </div>

      <div className="relative mx-auto w-full max-w-[var(--page-max-width)] px-4 sm:px-6">
        <div className="max-w-2xl">
          <div className="text-center sm:text-left">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
              AI Full-Stack Developer
            </p>
            <h1 className="mt-3 text-[clamp(2.25rem,8vw,4.75rem)] font-semibold leading-[0.95] tracking-tight text-foreground">
              Jose Jaime Bisuña
            </h1>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
              I build web and mobile experiences that are performant,
              accessible, and intentionally simple. My work focuses on clean UI
              systems, reliable APIs, and shipping product features that solve
              real problems.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:justify-start">
              <a
                href="#projects"
                onClick={handleProjectsClick}
                className="inline-flex h-11 items-center gap-2 rounded-full bg-primary px-5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                View Projects
                <ArrowRight className="size-4" />
              </a>
              <a
                href={LINKS.resume}
                className="inline-flex h-11 items-center gap-2 rounded-full border border-border bg-background/80 px-5 text-sm font-semibold text-foreground transition-colors hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <FileText className="size-4" />
                Resume
              </a>
              <a
                href="#contact"
                onClick={handleContactClick}
                className="inline-flex h-11 items-center gap-2 rounded-full border border-border bg-background/80 px-5 text-sm font-semibold text-foreground transition-colors hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <Mail className="size-4" />
                Contact
              </a>
            </div>

            <div className="mt-5 flex flex-wrap items-center justify-center gap-2.5 sm:justify-start">
              <a
                href={LINKS.github}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex h-11 items-center gap-2 rounded-full border border-transparent px-4 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <Github className="size-4" />
                GitHub
              </a>
              <a
                href={LINKS.linkedin}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex h-11 items-center gap-2 rounded-full border border-transparent px-4 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <Linkedin className="size-4" />
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
