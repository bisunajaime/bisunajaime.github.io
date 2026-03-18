import { Card, CardContent, CardHeader, CardTitle } from "./shared/card";
import { Badge } from "./shared/badge";
import { portfolioData } from "../../data/portfolioData";

export function TechStack() {
  const stacks = [
    { key: "frontend", title: "Frontend", data: portfolioData.techstacks.frontend },
    { key: "backend", title: "Backend", data: portfolioData.techstacks.backend },
    { key: "tools", title: "Tools & Frameworks", data: portfolioData.techstacks.tools },
    { key: "ui", title: "UI/UX Design", data: portfolioData.techstacks.ui }
  ];

  return (
    <section id="skills" className="px-4 py-[var(--section-padding-y)] sm:px-6">
      <div className="mx-auto w-full max-w-[var(--page-max-width)]">
        <h2 className="text-center text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          Skills & Tools
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-center text-base text-muted-foreground sm:text-lg">
          Technologies and tools I work with
        </p>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:gap-5 lg:grid-cols-2 lg:gap-6">
          {stacks.map((stack) => (
            <Card
              key={stack.key}
              className="overflow-hidden border-border bg-card/92 shadow-[var(--shadow-subtle)]"
            >
              <CardHeader className="px-5 pb-3 pt-5 sm:px-6">
                <CardTitle className="flex items-center gap-2 text-lg font-semibold tracking-tight text-foreground sm:text-xl">
                  <span aria-hidden="true">{stack.data.emoji}</span>
                  <span>{stack.title}</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="px-5 pb-5 sm:px-6 sm:pb-6">
                <div className="flex flex-wrap gap-2">
                  {stack.data.stacks.map((tech, i) => (
                    <Badge
                      key={i}
                      variant="outline"
                      className="border-border/85 bg-secondary/72 text-secondary-foreground"
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
