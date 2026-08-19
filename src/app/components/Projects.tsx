import { useEffect, useRef, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./shared/card";
import { Badge } from "./shared/badge";
import { Button } from "./shared/button";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperClass } from "swiper";

import { ExternalLink, Github, Video, Loader2, Sparkles } from "lucide-react";
import { portfolioData } from "../../data/portfolioData";
import { ImageWithFallback } from "./util/ImageWithFallback";
import "swiper/css";
import "swiper/css/free-mode";

function isTypingTarget(target: EventTarget | null) {
  if (!(target instanceof HTMLElement)) return false;
  return (
    target.tagName === "INPUT" ||
    target.tagName === "TEXTAREA" ||
    target.tagName === "SELECT" ||
    target.isContentEditable
  );
}

const INITIAL_PROJECTS = 6;

/*
 * Height of the fixed nav plus a little air. scrollIntoView({block: "start"})
 * parks the target at viewport 0, which is behind the bar — so scroll by hand.
 */
const NAV_OFFSET = 96;

function scrollToElement(element: HTMLElement | null) {
  if (!element) return;

  window.scrollTo({
    top: element.getBoundingClientRect().top + window.pageYOffset - NAV_OFFSET,
    behavior: "smooth",
  });
}

/*
 * Only some projects carry the flag, so the array's element type is a union that
 * lacks the key on most members. Reading it through an optional-prop parameter
 * keeps that union assignable instead of forcing a cast.
 *
 * Wording is deliberate: "AI-assisted" describes how the project was built.
 * Several of these also ship AI features, and "AI-powered" would blur the two.
 */
const isAiAssisted = (project: { ai_assisted?: boolean }) =>
  project.ai_assisted === true;

export function Projects() {
  const [showAll, setShowAll] = useState(false);
  const [activeProject, setActiveProject] = useState<
    (typeof portfolioData.projects)[number] | null
  >(null);
  const [carouselReady, setCarouselReady] = useState(false);
  /* Bumped by every "View UI" press so a repeat press still scrolls. */
  const [viewRequest, setViewRequest] = useState(0);
  const sectionRef = useRef<HTMLElement | null>(null);
  const carouselSectionRef = useRef<HTMLDivElement | null>(null);
  const swiperRef = useRef<SwiperClass | null>(null);
  const hasMounted = useRef(false);
  const visibleProjects = showAll
    ? portfolioData.projects
    : portfolioData.projects.slice(0, INITIAL_PROJECTS);

  useEffect(() => {
    if (!hasMounted.current) {
      hasMounted.current = true;
      return;
    }
    if (!showAll) {
      scrollToElement(sectionRef.current);
    }
  }, [showAll]);

  /*
   * Keyed on the click counter, not the project: pressing "View UI" on the card
   * that is already open leaves activeProject untouched, and the viewer still
   * expects to be taken back up to the panel.
   */
  useEffect(() => {
    if (!activeProject || !viewRequest) return;
    scrollToElement(carouselSectionRef.current);
  }, [activeProject, viewRequest]);

  useEffect(() => {
    if (!activeProject?.sample_ui?.length) {
      setCarouselReady(false);
      return;
    }

    setCarouselReady(false);

    const preloadPromises = activeProject.sample_ui.map((src) => {
      return new Promise<void>((resolve) => {
        const img = new Image();
        img.onload = () => resolve();
        img.onerror = () => resolve();
        img.src = src;
      });
    });

    Promise.all(preloadPromises).then(() => {
      setCarouselReady(true);
      requestAnimationFrame(() => {
        swiperRef.current?.update();
        swiperRef.current?.loopDestroy?.();
        swiperRef.current?.loopCreate?.();
      });
    });
  }, [activeProject]);

  useEffect(() => {
    if (!activeProject) return;

    const handleArrowNavigation = (event: KeyboardEvent) => {
      if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;
      if (isTypingTarget(event.target)) return;

      event.preventDefault();
      if (event.key === "ArrowRight") {
        swiperRef.current?.slideNext();
      } else {
        swiperRef.current?.slidePrev();
      }
    };

    window.addEventListener("keydown", handleArrowNavigation);
    return () => window.removeEventListener("keydown", handleArrowNavigation);
  }, [activeProject]);

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="px-4 py-[var(--section-padding-y)] sm:px-6"
    >
      <div className="mx-auto w-full max-w-[var(--page-max-width)]">
        <h2 className="text-center text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          Projects
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-center text-base text-muted-foreground sm:text-lg mb-4 pb-4">
          A collection of mobile and web applications I've built over the years
        </p>

        {activeProject?.sample_ui?.length ? (
          <div ref={carouselSectionRef} className="mt-10 mb-12 space-y-4">
            <div className="glass-panel rounded-3xl p-4 sm:p-5">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h3 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
                    Project UI
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Drag to browse the interface screens.
                  </p>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setActiveProject(null)}
                >
                  Close
                </Button>
              </div>
            </div>

            <div className="relative left-1/2 w-screen -translate-x-1/2 overflow-hidden">
              <div className="py-4 md:py-6">
                {!carouselReady ? (
                  <div className="flex h-[40vh] items-center justify-center">
                    <Loader2 className="size-8 animate-spin text-muted-foreground" />
                  </div>
                ) : (
                  <Swiper
                    key={activeProject.name}
                    onSwiper={(swiper) => {
                      swiperRef.current = swiper;
                    }}
                    grabCursor
                    centeredSlides
                    spaceBetween={16}
                    slidesPerView="auto"
                    className="pb-2"
                  >
                    {activeProject.sample_ui.map((src, idx) => (
                      <SwiperSlide key={`${src}-${idx}`} className="!w-auto">
                        <div className="w-auto overflow-hidden rounded-2xl">
                          <ImageWithFallback
                            src={src}
                            alt={`${activeProject.name} UI ${idx + 1}`}
                            className="max-h-[60vh] w-auto max-w-[85vw] sm:max-w-[70vw] md:max-w-[55vw] lg:max-w-[45vw] object-contain"
                          />
                        </div>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                )}
              </div>
            </div>

            <div className="glass-panel rounded-3xl p-4 sm:p-5">
              <h4 className="text-lg font-semibold tracking-tight text-foreground">
                {activeProject.name}
              </h4>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {activeProject.short_description || activeProject.description}
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {activeProject.stack.map((tech, i) => (
                  <Badge
                    key={i}
                    variant="secondary"
                    className="bg-secondary text-secondary-foreground"
                  >
                    {tech}
                  </Badge>
                ))}
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {activeProject.demo_url && (
                  <Button size="sm" variant="default" className="gap-2" asChild>
                    <a
                      href={activeProject.demo_url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink className="size-4" />
                      Demo
                    </a>
                  </Button>
                )}
                {activeProject.git_url && (
                  <Button size="sm" variant="default" className="gap-2" asChild>
                    <a
                      href={activeProject.git_url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Github className="size-4" />
                      Code
                    </a>
                  </Button>
                )}
                {activeProject.demo_video && (
                  <Button size="sm" variant="default" className="gap-2" asChild>
                    <a
                      href={activeProject.demo_video}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Video className="size-4" />
                      Video
                    </a>
                  </Button>
                )}
              </div>
            </div>
          </div>
        ) : null}

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {visibleProjects.map((project, index) => (
            <Card
              key={index}
              className="group h-full overflow-hidden border-border/90 bg-card/92 shadow-[var(--shadow-subtle)] transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/45 hover:shadow-[var(--shadow-soft)]"
            >
              <div className="group relative aspect-[4/3] overflow-hidden border-b border-border bg-secondary">
                {project.cover_img && (
                  <ImageWithFallback
                    src={project.cover_img}
                    alt={project.name}
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                  />
                )}
                {project.sample_ui?.length ? (
                  <button
                    type="button"
                    onClick={() => {
                      setActiveProject(project);
                      setViewRequest((count) => count + 1);
                    }}
                    className="absolute inset-0 flex cursor-pointer items-center justify-center bg-black/32 opacity-100 transition-opacity duration-300 sm:opacity-0 sm:pointer-events-none sm:group-hover:opacity-100 sm:group-hover:pointer-events-auto"
                    aria-label={`View ${project.name} UI`}
                  >
                    <span className="rounded-full border border-white/50 bg-black/45 px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-white backdrop-blur-sm sm:text-sm">
                      View UI
                    </span>
                  </button>
                ) : null}
              </div>
              <CardHeader className="gap-2 px-4 pb-0 pt-4 sm:px-5">
                {isAiAssisted(project) ? (
                  <p
                    className="inline-flex items-center gap-1.5 text-[0.62rem] font-semibold uppercase tracking-[0.12em] text-muted-foreground"
                    title="Built with AI assistance"
                  >
                    <Sparkles
                      className="size-3 text-primary"
                      aria-hidden="true"
                    />
                    AI-assisted
                  </p>
                ) : null}
                <CardTitle className="text-base leading-tight tracking-tight sm:text-lg">
                  {project.name}
                </CardTitle>
                <CardDescription className="line-clamp-4 text-xs leading-relaxed sm:text-sm">
                  {project.short_description || project.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="px-4 pb-4 pt-0 sm:px-5 sm:pb-5">
                <div className="mb-4 flex flex-wrap gap-1.5 sm:gap-2">
                  {project.stack.map((tech, i) => (
                    <Badge
                      key={i}
                      variant="outline"
                      className="border-border/80 bg-secondary/70 text-[0.68rem] text-secondary-foreground sm:text-xs"
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>
                <div className="mt-auto flex flex-wrap gap-2">
                  {project.demo_url && (
                    <Button
                      size="sm"
                      variant="default"
                      className="gap-2"
                      asChild
                    >
                      <a
                        href={project.demo_url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink className="size-4" />
                        Demo
                      </a>
                    </Button>
                  )}
                  {project.git_url && (
                    <Button
                      size="sm"
                      variant="default"
                      className="gap-2"
                      asChild
                    >
                      <a
                        href={project.git_url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Github className="size-4" />
                        Code
                      </a>
                    </Button>
                  )}
                  {project.demo_video && (
                    <Button
                      size="sm"
                      variant="default"
                      className="gap-2"
                      asChild
                    >
                      <a
                        href={project.demo_video}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Video className="size-4" />
                        Video
                      </a>
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        {portfolioData.projects.length > INITIAL_PROJECTS && (
          <div className="mt-10 flex justify-center">
            <Button
              size="lg"
              variant="default"
              className="gap-2"
              onClick={() => setShowAll((prev) => !prev)}
            >
              {showAll ? "Show less" : "Show more"}
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
