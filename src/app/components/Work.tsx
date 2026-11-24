import { portfolioData } from "../../data/portfolioData";
import { earlierCopy, projectCopy, resultPlaceholder, work } from "../../data/homepage";
import { ProjectCard } from "./ProjectCard";
import { EarlierWorkRow } from "./EarlierWorkRow";

type Project = (typeof portfolioData.projects)[number] & { short_description?: string };

const projects = portfolioData.projects as Project[];
const featured = projects.slice(0, work.featuredCount);

// Older projects collapse to one line each; entries sharing a label (the two NeedL apps) become one row.
const earlier = projects.slice(work.featuredCount).reduce<{ name: string; line: string }[]>((rows, p) => {
  const copy = earlierCopy[p.name] ?? { label: p.name, line: p.short_description ?? p.description };
  if (!rows.some((r) => r.name === copy.label)) rows.push({ name: copy.label, line: copy.line });
  return rows;
}, []);

export function Work() {
  return (
    <section id="work" aria-labelledby="work-heading" className="page-gutter section-y">
      <div className="mx-auto flex max-w-content flex-col gap-8 md:gap-12">
        <div className="flex flex-col gap-2 md:gap-3">
          <h2 id="work-heading" className="text-h2 text-fg">Selected work</h2>
          <p className="max-w-text text-body text-fg-muted">{work.intro}</p>
        </div>

        <ul className="grid gap-6 md:grid-cols-2 md:gap-8">
          {featured.map((p) => {
            const copy = projectCopy[p.name];
            return (
              <li key={p.name}>
                <ProjectCard
                  name={p.name}
                  summary={copy?.summary ?? p.short_description ?? p.description}
                  result={copy?.result ?? resultPlaceholder}
                  tags={copy?.tags ?? p.stack.slice(0, 4)}
                  cover={p.cover_img}
                  coverSmall={copy?.coverSmall}
                  demoUrl={p.demo_url || undefined}
                  codeUrl={p.git_url || undefined}
                />
              </li>
            );
          })}
        </ul>

        <div className="flex flex-col gap-3 pt-4 md:gap-4">
          <h3 className="text-h3 text-fg">Earlier work</h3>
          <ul>
            {earlier.map((row) => (
              <EarlierWorkRow key={row.name} name={row.name} line={row.line} />
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
