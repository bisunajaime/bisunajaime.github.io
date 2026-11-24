import { useRef, useState } from "react";
import { portfolioData } from "../../data/portfolioData";
import { earlierCopy, projectCopy, resultPlaceholder, work } from "../../data/homepage";
import { ProjectCard } from "./ProjectCard";
import { EarlierWorkRow } from "./EarlierWorkRow";
import { SecondaryButton } from "./ui/SecondaryButton";

type Project = (typeof portfolioData.projects)[number] & { short_description?: string };

const all = portfolioData.projects as Project[];
const pinned = work.pinned.flatMap((name) => all.filter((p) => p.name === name));
const projects = [...pinned, ...all.filter((p) => !pinned.includes(p))];
const featured = projects.slice(0, work.featuredCount);

// Older projects collapse to one line each; entries sharing a label (the two NeedL apps) become one row.
const earlier = projects.slice(work.featuredCount).reduce<{ name: string; line: string }[]>((rows, p) => {
  const copy = earlierCopy[p.name] ?? { label: p.name, line: p.short_description ?? p.description };
  if (!rows.some((r) => r.name === copy.label)) rows.push({ name: copy.label, line: copy.line });
  return rows;
}, []);

export function Work() {
  const [expanded, setExpanded] = useState(false);
  const firstRevealedRef = useRef<HTMLLIElement>(null);
  const moreCount = featured.length - work.initialCount;

  const toggle = () => {
    const opening = !expanded;
    setExpanded(opening);
    // Keyboard users land on the first newly shown card instead of having to tab back to it.
    if (opening) requestAnimationFrame(() => firstRevealedRef.current?.focus());
  };

  return (
    <section id="work" aria-labelledby="work-heading" className="page-gutter section-y">
      <div className="mx-auto flex max-w-content flex-col gap-8 md:gap-12">
        <div className="flex flex-col gap-2 md:gap-3">
          <h2 id="work-heading" className="text-h2 text-fg">Selected work</h2>
          <p className="max-w-text text-body text-fg-muted">{work.intro}</p>
        </div>

        <div className="flex flex-col gap-6 md:gap-8">
          <ul id="work-projects" className="grid gap-6 md:grid-cols-2 md:gap-8">
            {featured.map((p, i) => {
              const copy = projectCopy[p.name];
              return (
                <li
                  key={p.name}
                  // Hidden cards stay out of the layout and their lazy images don't load until shown.
                  hidden={!expanded && i >= work.initialCount}
                  ref={i === work.initialCount ? firstRevealedRef : undefined}
                  tabIndex={i === work.initialCount ? -1 : undefined}
                  className="rounded-md"
                >
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
          {moreCount > 0 && (
            <SecondaryButton
              aria-expanded={expanded}
              aria-controls="work-projects"
              onClick={toggle}
              className="w-full self-start md:w-auto"
            >
              {expanded ? "Show fewer projects" : `Show ${moreCount} more projects`}
            </SecondaryButton>
          )}
        </div>

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
