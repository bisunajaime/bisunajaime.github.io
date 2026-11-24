import { about } from "../../data/homepage";
import { SkillGroup } from "./SkillGroup";

export function About() {
  return (
    <section id="about" aria-labelledby="about-heading" className="page-gutter section-y">
      <div className="mx-auto flex max-w-content flex-col gap-6 md:gap-8">
        <h2 id="about-heading" className="text-h2 text-fg">About</h2>
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-16">
          <div className="flex flex-col gap-6 lg:gap-8">
            <div className="flex max-w-text flex-col gap-4">
              {about.paragraphs.map((p) => (
                <p key={p} className="text-body text-fg-muted">{p}</p>
              ))}
            </div>
            {/* Decorative still life (generated), so it carries no alt text. */}
            <img
              src="/assets/images/home/about-desk-528.webp"
              srcSet="/assets/images/home/about-desk-528.webp 528w, /assets/images/home/about-desk-1056.webp 1056w"
              sizes="(min-width: 1024px) 528px, calc(100vw - 40px)"
              width={528}
              height={330}
              alt=""
              loading="lazy"
              decoding="async"
              className="aspect-[16/10] w-full max-w-text rounded-md bg-placeholder object-cover"
            />
          </div>
          <div className="flex flex-col gap-6 pt-2 lg:pt-0">
            {about.skills.map((group) => (
              <SkillGroup key={group.label} label={group.label} items={group.items} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
