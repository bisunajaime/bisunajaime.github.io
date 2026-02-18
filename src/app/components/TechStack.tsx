import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { portfolioData } from "../../data/portfolioData";

export function TechStack() {
  const stacks = [
    { key: "frontend", title: "Frontend", data: portfolioData.techstacks.frontend },
    { key: "backend", title: "Backend", data: portfolioData.techstacks.backend },
    { key: "tools", title: "Tools & Frameworks", data: portfolioData.techstacks.tools },
    { key: "ui", title: "UI/UX Design", data: portfolioData.techstacks.ui }
  ];

  return (
    <section id="techstack" className="px-4 py-20 bg-background">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl text-center mb-4">Tech Stack</h2>
        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          Technologies and tools I work with
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {stacks.map((stack) => (
            <Card key={stack.key} className="overflow-hidden">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="text-2xl">{stack.data.emoji}</span>
                  {stack.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {stack.data.stacks.map((tech, i) => (
                    <Badge key={i} variant="outline">
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
