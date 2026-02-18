import { useEffect, useState, type MouseEvent } from "react";
import { FileText, FolderKanban, Github, Linkedin } from "lucide-react";
import { topWallpapers } from "../../data/wallpaperData";

const LINKS = {
  github: "https://github.com/bisunajaime",
  linkedin: "https://www.linkedin.com/in/jose-jaime-bisuna",
  resume: "/files/ResumeJaimeBisuña.pdf",
  email: "mailto:jaimebisuna@gmail.com",
};

const normalizeHexColor = (hex: string) => {
  const trimmed = hex.trim().replace("#", "");
  if (trimmed.length === 3 || trimmed.length === 4) {
    return `${trimmed[0]}${trimmed[0]}${trimmed[1]}${trimmed[1]}${trimmed[2]}${trimmed[2]}`;
  }
  if (trimmed.length === 6 || trimmed.length === 8) {
    return trimmed.slice(0, 6);
  }
  return null;
};

const getContrastTextColor = (hex: string) => {
  const normalized = normalizeHexColor(hex);
  if (!normalized) {
    return "#000000";
  }

  const r = parseInt(normalized.slice(0, 2), 16);
  const g = parseInt(normalized.slice(2, 4), 16);
  const b = parseInt(normalized.slice(4, 6), 16);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

  return luminance > 0.62 ? "#000000" : "#ffffff";
};

export function Hero() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeWallpaper = topWallpapers[activeIndex] ?? topWallpapers[0];
  const accentColor = activeWallpaper?.accentColor ?? "#9f89ff";
  const ctaTextColor = getContrastTextColor(accentColor);

  useEffect(() => {
    if (topWallpapers.length <= 1) {
      return;
    }

    const interval = window.setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % topWallpapers.length);
    }, 30000);

    return () => {
      window.clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty("--hero-accent", accentColor);
    root.style.setProperty("--hero-accent-foreground", ctaTextColor);
  }, [accentColor, ctaTextColor]);

  const handleProjectsClick = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    const element = document.getElementById("projects");
    if (!element) {
      return;
    }

    const offset = 80;
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - offset;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });
  };

  return (
    <section className="relative isolate min-h-screen overflow-hidden bg-black px-6 py-20 text-white md:px-10">
      <div className="absolute inset-0">
        <div
          className="absolute inset-[-10%] scale-110 bg-cover bg-center blur-3xl transition-all duration-1000"
          style={{
            backgroundImage: activeWallpaper
              ? `url(${activeWallpaper.url})`
              : undefined,
          }}
        />
        <div className="absolute inset-0 bg-black/72" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_36%_26%,rgba(113,92,255,0.44),transparent_42%),radial-gradient(circle_at_67%_68%,rgba(0,170,255,0.26),transparent_38%),radial-gradient(circle_at_26%_76%,rgba(255,71,56,0.25),transparent_40%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/20 to-black/65" />
      </div>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-44 bg-gradient-to-b from-transparent via-background/70 to-background" />

      <div className="relative z-10 mx-auto flex min-h-[calc(100vh-8rem)] w-full max-w-4xl items-center justify-center">
        <div className="w-full text-center">
          <div className="mb-8">
            <h1 className="hero-title text-[clamp(2.7rem,7.8vw,5.3rem)] leading-[0.92] tracking-tight">
              Hey, I&apos;m <span style={{ color: accentColor }}>Jaime</span>
              <br />
              A{" "}
              <span className="bg-gradient-to-r from-[#f2ebff] via-[#b9a4ff] to-[#6a9cff] bg-clip-text text-transparent">
                Software Developer
              </span>
            </h1>
          </div>

          <p className="mx-auto max-w-3xl text-base leading-relaxed text-white/88 md:text-[1.95rem]">
            A <strong style={{ color: accentColor }}>fullstack developer</strong> passionate in building mobile/web apps and believe that time is something that must not be wasted, but must be used wisely.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-3 md:gap-4">
            <a
              href={LINKS.resume}
              className="inline-flex items-center gap-2 rounded-md px-4 py-2.5 text-sm font-black shadow-[0_10px_30px_-12px_rgba(0,0,0,0.45)] transition-all hover:brightness-110"
              style={{
                backgroundColor: accentColor,
                borderColor: accentColor,
                color: ctaTextColor,
              }}
            >
              <FileText className="size-4" />
              Resume
            </a>

            <a
              href={LINKS.github}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-2 rounded-md border border-white/28 bg-black/38 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-black/58"
            >
              <Github className="size-4" />
              GitHub
            </a>
            <a
              href={LINKS.linkedin}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-2 rounded-md border border-white/28 bg-black/38 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-black/58"
            >
              <Linkedin className="size-4" />
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
