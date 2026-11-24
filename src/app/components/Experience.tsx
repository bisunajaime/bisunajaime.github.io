import { portfolioData } from "../../data/portfolioData";
import { experienceImpact } from "../../data/homepage";
import { ExperienceItem } from "./ExperienceItem";

// "August 2024" → "Aug 2024"; anything else ("Present") is left alone.
const shortMonth = (date: string) => date.replace(/^([A-Z][a-z]{2})[a-z]*(?= \d{4}$)/, "$1");
// "Maliksi Creative Technologies, Inc." → "Maliksi Creative Technologies"
const companyLabel = (name: string) => name.replace(/,?\s+Inc\.?$/, "");

export function Experience() {
  return (
    <section id="experience" aria-labelledby="experience-heading" className="page-gutter section-y">
      <div className="mx-auto flex max-w-content flex-col gap-6 md:gap-8">
        <h2 id="experience-heading" className="text-h2 text-fg">Experience</h2>
        <ol className="border-b border-border">
          {portfolioData.experiences.map((job) => (
            <ExperienceItem
              key={job.name}
              role={job.role}
              company={companyLabel(job.name)}
              website={job.website}
              dates={`${shortMonth(job.from)} – ${shortMonth(job.to)}`}
              impact={experienceImpact[job.name]}
            />
          ))}
        </ol>
      </div>
    </section>
  );
}
