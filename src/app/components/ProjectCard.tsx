import { missingDemoPlaceholder } from "../../data/homepage";
import { Tag } from "./ui/Tag";
import { TextLink } from "./ui/TextLink";

export type ProjectCardProps = {
  name: string;
  summary: string;
  result: string;
  tags: string[];
  cover: string;
  /** Optional 800w copy of the cover for phones and 1x screens. */
  coverSmall?: string;
  demoUrl?: string;
  codeUrl?: string;
};

/** Figma "Projects / Card". */
export function ProjectCard({ name, summary, result, tags, cover, coverSmall, demoUrl, codeUrl }: ProjectCardProps) {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-md border border-border bg-surface">
      <img
        src={cover}
        srcSet={coverSmall ? `${coverSmall} 800w, ${cover} 1600w` : undefined}
        sizes={coverSmall ? "(min-width: 1120px) 544px, (min-width: 768px) 50vw, 100vw" : undefined}
        alt={`Screenshot of ${name}`}
        width={1600}
        height={1000}
        loading="lazy"
        decoding="async"
        className="aspect-[16/10] w-full bg-placeholder object-cover object-top"
      />
      <div className="flex flex-col gap-4 p-6 lg:p-8">
        <h3 className="text-h3 text-fg">{name}</h3>
        <p className="text-body text-fg-muted">{summary}</p>
        <p className="text-small text-fg-subtle">{result}</p>
        <ul aria-label={`${name} is built with`} className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </ul>
        <div className="flex gap-6 pt-2">
          {demoUrl ? (
            <TextLink href={demoUrl} external>
              Live demo<span className="sr-only"> of {name}</span>
            </TextLink>
          ) : (
            <span className="text-label text-fg-subtle">{missingDemoPlaceholder}</span>
          )}
          {codeUrl && (
            <TextLink href={codeUrl} external>
              Code<span className="sr-only"> for {name}</span>
            </TextLink>
          )}
        </div>
      </div>
    </article>
  );
}
