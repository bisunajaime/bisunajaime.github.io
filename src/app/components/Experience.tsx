import { Button } from "./shared/button";
import { ExternalLink } from "lucide-react";
import { portfolioData } from "../../data/portfolioData";
import { ImageWithFallback } from "./util/ImageWithFallback";

export function Experience() {
  return (
    <section id="experience" className="px-4 py-[var(--section-padding-y)] sm:px-6">
      <div className="mx-auto w-full max-w-[var(--page-max-width)]">
        <h2 className="text-center text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          Experience
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-center text-base text-muted-foreground sm:text-lg">
          My professional journey as a developer
        </p>

        <div className="relative mx-auto mt-10 max-w-4xl">
          <div className="absolute bottom-0 left-[0.95rem] top-0 w-px bg-border sm:left-[1.45rem]" />
          <div className="space-y-6">
            {portfolioData.experiences.map((exp, index) => (
              <article key={`${exp.name}-${index}`} className="relative pl-10 sm:pl-14">
                <span className="absolute left-[0.57rem] top-6 size-3 rounded-full bg-primary ring-4 ring-background sm:left-[1.08rem]" />
                <div className="rounded-2xl border border-border bg-card/90 p-5 shadow-[var(--shadow-subtle)] backdrop-blur-sm sm:p-6">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
                    <div className="h-14 w-24 overflow-hidden rounded-sm border border-border bg-secondary">
                      <ImageWithFallback
                        src={exp.cover_img}
                        alt={exp.name}
                        className="h-full w-full object-cover"
                      />
                    </div>

                    <div className="flex-1">
                      <h3 className="text-lg font-semibold tracking-tight text-foreground sm:text-xl">
                        {exp.name}
                      </h3>
                      <p className="mt-1 text-sm font-medium text-muted-foreground sm:text-base">
                        {exp.role}
                      </p>
                      <p className="mt-2 text-sm text-muted-foreground">
                        {exp.from} -{" "}
                        <span className={exp.to === "Present" ? "font-semibold text-primary" : ""}>
                          {exp.to}
                        </span>
                      </p>

                      {exp.website ? (
                        <Button size="sm" variant="outline" className="mt-4 gap-2" asChild>
                          <a href={exp.website} target="_blank" rel="noopener noreferrer">
                            Visit Company
                            <ExternalLink className="size-4" />
                          </a>
                        </Button>
                      ) : null}
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
