import { useEffect, useRef, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper/modules";
import { ExternalLink, Github, Video } from "lucide-react";
import { portfolioData } from "../../data/portfolioData";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import "swiper/css";
import "swiper/css/free-mode";

export function Projects() {
  const [showAll, setShowAll] = useState(false);
  const [activeProject, setActiveProject] = useState<(typeof portfolioData.projects)[number] | null>(null);
  const sectionRef = useRef<HTMLElement | null>(null);
  const carouselSectionRef = useRef<HTMLDivElement | null>(null);
  const hasMounted = useRef(false);
  const visibleProjects = showAll
    ? portfolioData.projects
    : portfolioData.projects.slice(0, 3);

  useEffect(() => {
    if (!hasMounted.current) {
      hasMounted.current = true;
      return;
    }
    if (!showAll) {
      sectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [showAll]);

  useEffect(() => {
    if (activeProject && carouselSectionRef.current) {
      carouselSectionRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [activeProject]);

  return (
    <section ref={sectionRef} id="projects" className="px-4 py-20">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl text-center mb-4">Projects</h2>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          A collection of mobile and web applications I've built over the years
        </p>

        {activeProject?.sample_ui?.length ? (
          <div ref={carouselSectionRef} className="mb-12 space-y-4">
            <div className="rounded-3xl border border-border bg-background/80 p-4 shadow-sm backdrop-blur-md">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h3 className="text-xl md:text-2xl font-semibold text-foreground">
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

            <div
              className="relative left-1/2 w-screen -translate-x-1/2 overflow-hidden"
              style={{ backgroundColor: activeProject.color || undefined }}
            >
              <div className="py-4 md:py-6">
                <Swiper
                  key={activeProject.name}
                  // freeMode
                  // modules={[FreeMode]}
                  keyboard={{ enabled: true }}
                  grabCursor
                  spaceBetween={16}
                  slidesPerView="auto"
                  className="pb-2"
                >
                  {activeProject.sample_ui.map((src, idx) => (
                    <SwiperSlide
                      key={`${src}-${idx}`}
                      className="!w-auto"
                    >
                      <div className="w-auto overflow-hidden rounded-xl">
                        <ImageWithFallback
                          src={src}
                          alt={`${activeProject.name} UI ${idx + 1}`}
                          className="max-h-[60vh] w-auto max-w-[85vw] sm:max-w-[70vw] md:max-w-[55vw] lg:max-w-[45vw] object-contain"
                        />
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </div>

            <div className="rounded-3xl border border-border bg-background/80 p-4 shadow-sm backdrop-blur-md">
              <h4 className="text-lg font-semibold text-foreground">
                {activeProject.name}
              </h4>
              <p className="mt-1 text-sm text-muted-foreground">
                {activeProject.short_description || activeProject.description}
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {activeProject.stack.map((tech, i) => (
                  <Badge key={i} variant="secondary">
                    {tech}
                  </Badge>
                ))}
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {activeProject.demo_url && (
                  <Button size="sm" variant="outline" className="gap-2" asChild>
                    <a href={activeProject.demo_url} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="size-4" />
                      Demo
                    </a>
                  </Button>
                )}
                {activeProject.git_url && (
                  <Button size="sm" variant="outline" className="gap-2" asChild>
                    <a href={activeProject.git_url} target="_blank" rel="noopener noreferrer">
                      <Github className="size-4" />
                      Code
                    </a>
                  </Button>
                )}
                {activeProject.demo_video && (
                  <Button size="sm" variant="outline" className="gap-2" asChild>
                    <a href={activeProject.demo_video} target="_blank" rel="noopener noreferrer">
                      <Video className="size-4" />
                      Video
                    </a>
                  </Button>
                )}
              </div>
            </div>
          </div>
        ) : null}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {visibleProjects.map((project, index) => (
            <Card
              key={index}
              className="hover:shadow-lg transition-shadow overflow-hidden"
              style={{ borderTop: `4px solid ${project.color}` }}
            >
              <div
                className="group relative h-60 overflow-hidden rounded-t-lg"
                style={{
                  backgroundColor: project.color || undefined
                }}
              >
                {project.cover_img && (
                  <ImageWithFallback
                    src={project.cover_img}
                    alt={project.name}
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                )}
                {project.sample_ui?.length ? (
                  <button
                    type="button"
                    onClick={() => setActiveProject(project)}
                    className="absolute inset-0 flex cursor-pointer items-center justify-center bg-black/45 opacity-100 transition-opacity duration-300 sm:opacity-0 sm:pointer-events-none sm:group-hover:opacity-100 sm:group-hover:pointer-events-auto"
                    aria-label={`View ${project.name} UI`}
                  >
                    <span className="rounded-full border border-white/60 bg-white/10 px-4 py-2 text-sm font-semibold text-white backdrop-blur-sm">
                      View UI
                    </span>
                  </button>
                ) : null}
              </div>
              <CardHeader className="pb-0 pt-0">
                <CardTitle>{project.name}</CardTitle>
                <CardDescription className="line-clamp-2">
                  {project.short_description || project.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.stack.map((tech, i) => (
                    <Badge key={i} variant="secondary">
                      {tech}
                    </Badge>
                  ))}
                </div>
                <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                  {project.learnings}
                </p>
                <div className="flex gap-2 flex-wrap">
                  {project.demo_url && (
                    <Button size="sm" variant="outline" className="gap-2" asChild>
                      <a href={project.demo_url} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="size-4" />
                        Demo
                      </a>
                    </Button>
                  )}
                  {project.git_url && (
                    <Button size="sm" variant="outline" className="gap-2" asChild>
                      <a href={project.git_url} target="_blank" rel="noopener noreferrer">
                        <Github className="size-4" />
                        Code
                      </a>
                    </Button>
                  )}
                  {project.demo_video && (
                    <Button size="sm" variant="outline" className="gap-2" asChild>
                      <a href={project.demo_video} target="_blank" rel="noopener noreferrer">
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
        {portfolioData.projects.length > 3 && (
          <div className="mt-10 flex justify-center">
            <Button
              size="lg"
              variant="outline"
              className="gap-2 bg-black text-white hover:bg-black/90 hover:text-white"
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
