import type { MouseEvent } from "react";
import { ArrowRight, FileText, Github, Linkedin, Mail } from "lucide-react";

const LINKS = {
  github: "https://github.com/bisunajaime",
  linkedin: "https://www.linkedin.com/in/jose-jaime-bisuna",
  resume: "/files/JaimeBisunaResume.pdf",
};

export function Hero() {
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
    <section id="hero" className="px-4 pb-12 pt-24 sm:px-6 sm:pt-28">
      <div className="mx-auto w-full max-w-[var(--page-max-width)]">
        <div className="glass-panel rounded-[1.75rem] p-6 sm:p-8 lg:p-10">
          <div className="grid items-center gap-8 lg:grid-cols-[auto_1fr]">
            <div className="mx-auto lg:mx-0">
              <div className="relative">
                <img
                  src="/logo512.webp"
                  alt="Jaime Bisuna profile"
                  className="h-28 w-28 rounded-full border border-border/80 object-cover shadow-[var(--shadow-subtle)] sm:h-36 sm:w-36"
                />
                <span className="absolute -bottom-2 -right-2 inline-flex h-9 min-w-9 items-center justify-center rounded-full border border-background bg-primary px-2 text-[0.62rem] font-semibold uppercase tracking-[0.12em] text-primary-foreground">
                  Open
                </span>
              </div>
            </div>

            <div className="text-center lg:text-left">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
                Full-Stack Developer
              </p>
              <h1 className="mt-3 text-[clamp(2.25rem,8vw,4.75rem)] font-semibold leading-[0.95] tracking-tight text-foreground">
                Jose Jaime Bisuña
              </h1>
              <p className="mx-auto mt-4 max-w-1xl text-base leading-relaxed text-muted-foreground sm:text-lg lg:mx-0">
                I build web and mobile experiences that are performant,
                accessible, and intentionally simple. My work focuses on clean UI
                systems, reliable APIs, and shipping product features that solve
                real problems.
              </p>

              <div className="mt-8 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
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

              <div className="mt-5 flex flex-wrap items-center justify-center gap-2.5 lg:justify-start">
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
      </div>
    </section>
  );
}
