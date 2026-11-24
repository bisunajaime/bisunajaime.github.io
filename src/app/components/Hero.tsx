import { hero, links } from "../../data/homepage";
import { ButtonLink } from "./ui/ButtonLink";
import { TextLink } from "./ui/TextLink";

export function Hero() {
  return (
    <section aria-labelledby="hero-heading" className="page-gutter relative isolate overflow-hidden bg-bg pt-16 pb-16 md:pt-32 md:pb-24">
      {/* Decorative wall-and-leaf-shadow background (generated). At 40% over the page colour every
          line of hero text stays above 4.5:1; see assets/generated/manifest.json. */}
      <picture>
        <source
          media="(min-width: 768px)"
          srcSet="/assets/images/home/hero-desktop-1440.webp 1440w, /assets/images/home/hero-desktop-2880.webp 2880w"
          sizes="100vw"
          width={1440}
          height={670}
        />
        <img
          src="/assets/images/home/hero-mobile-390.webp"
          srcSet="/assets/images/home/hero-mobile-390.webp 390w, /assets/images/home/hero-mobile-780.webp 780w"
          sizes="100vw"
          width={390}
          height={654}
          alt=""
          fetchPriority="high"
          decoding="async"
          className="absolute inset-0 -z-10 size-full object-cover object-top opacity-40 md:object-left"
        />
      </picture>

      <div className="mx-auto flex max-w-content flex-col gap-6">
        <h1 id="hero-heading" className="max-w-headline text-display text-fg">
          {hero.headline}
        </h1>
        <p className="max-w-text text-lead text-fg-muted">{hero.lead}</p>
        <div className="flex flex-col gap-4 pt-3 md:flex-row md:items-center md:gap-8 md:pt-4">
          <ButtonLink href={`mailto:${links.email}`} className="w-full md:w-auto">
            Email me
          </ButtonLink>
          <ul className="flex gap-6">
            <li><TextLink href={links.resume} external>Resume</TextLink></li>
            <li><TextLink href={links.github} external>GitHub</TextLink></li>
            <li><TextLink href={links.linkedin} external>LinkedIn</TextLink></li>
          </ul>
        </div>
      </div>
    </section>
  );
}
