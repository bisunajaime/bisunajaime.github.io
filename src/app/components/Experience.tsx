import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { ExternalLink } from "lucide-react";
import { portfolioData } from "../../data/portfolioData";
import { ImageWithFallback } from "./figma/ImageWithFallback";

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

export function Experience() {
  return (
    <section id="experience" className="min-h-screen px-4 py-20 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-center mb-4">
          <h2 className="text-4xl md:text-5xl text-center">Experience</h2>
        </div>
        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          My professional journey as a developer
        </p>
        
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500" />
            
            {/* Experience items */}
            <div className="space-y-8">
              {portfolioData.experiences.map((exp, index) => {
                const visitColor = exp.color || "#3b82f6";
                const visitTextColor = getContrastTextColor(visitColor);

                return (
                  <div
                    key={index}
                    className={`relative flex items-center ${
                      index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                    } flex-col md:gap-8`}
                  >
                    {/* Timeline dot */}
                    <div className="absolute left-8 md:left-1/2 w-4 h-4 bg-blue-600 rounded-full border-4 border-background shadow-lg transform -translate-x-1/2 z-10" />

                    {/* Content */}
                    <div className={`w-full md:w-[calc(50%-2rem)] ${
                      index % 2 === 0 ? 'md:text-right md:pr-8' : 'md:text-left md:pl-8'
                    } pl-20 md:pl-0`}>
                      <Card className="hover:shadow-lg transition-shadow">
                        <div className="flex flex-col md:flex-row items-start gap-4 p-6">
                          <div className="flex-shrink-0 w-24 h-14 bg-gradient-to-br from-blue-100/80 to-purple-100/80 dark:from-blue-500/20 dark:to-purple-500/20 rounded-lg overflow-hidden">
                            <ImageWithFallback
                              src={exp.cover_img}
                              alt={exp.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1 text-left">
                            <CardTitle className="text-xl mb-1">{exp.name}</CardTitle>
                            <CardDescription className="text-base mb-2">
                              {exp.role}
                            </CardDescription>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <span>{exp.from}</span>
                              <span>-</span>
                              <span className={exp.to === "Present" ? "text-blue-600 font-medium" : ""}>
                                {exp.to}
                              </span>
                            </div>
                            {exp.website ? (
                              <Button
                                size="sm"
                                className="mt-3 gap-2 border-0 font-semibold shadow-sm transition-all hover:brightness-110"
                                style={{
                                  backgroundColor: visitColor,
                                  color: visitTextColor,
                                }}
                                asChild
                              >
                                <a href={exp.website} target="_blank" rel="noopener noreferrer">
                                  Visit
                                  <ExternalLink className="size-4" />
                                </a>
                              </Button>
                            ) : null}
                          </div>
                        </div>
                      </Card>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
