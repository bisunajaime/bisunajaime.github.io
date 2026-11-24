import { TextLink } from "./ui/TextLink";

type ExperienceItemProps = {
  role: string;
  company: string;
  website: string;
  dates: string;
  impact: string;
  /** Placeholder copy renders in the subtle colour so it reads as unfinished. */
  isPlaceholder?: boolean;
};

/** Figma "Experience / Item". Dates render first visually but come after the role in reading order. */
export function ExperienceItem({ role, company, website, dates, impact, isPlaceholder = false }: ExperienceItemProps) {
  return (
    <li className="flex flex-col gap-2 border-t border-border py-6 md:flex-row md:items-baseline md:gap-8 md:py-8">
      <div className="flex flex-col gap-2 md:flex-1">
        <h3 className="text-h3 text-fg">{role}</h3>
        <TextLink href={website} external className="w-fit">
          {company}
        </TextLink>
        <p className={`max-w-text text-body ${isPlaceholder ? "text-fg-subtle" : "text-fg-muted"}`}>{impact}</p>
      </div>
      <p className="order-first text-small text-fg-subtle md:w-60 md:shrink-0">{dates}</p>
    </li>
  );
}
