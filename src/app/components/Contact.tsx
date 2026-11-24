import { contact, links } from "../../data/homepage";
import { TextLink } from "./ui/TextLink";

export function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-heading" className="page-gutter section-y border-t border-border bg-surface">
      <div className="mx-auto flex max-w-content flex-col gap-4 md:gap-6">
        <h2 id="contact-heading" className="text-h2 text-fg">{contact.heading}</h2>
        <p className="max-w-text text-body text-fg-muted">{contact.body}</p>
        <a
          href={`mailto:${links.email}`}
          className="w-fit text-h3 text-accent underline decoration-1 underline-offset-4 hover:text-accent-hover hover:decoration-2"
        >
          {links.email}
        </a>
        <ul className="flex gap-6 pt-2 md:pt-0">
          <li><TextLink href={links.resume} external>Resume</TextLink></li>
          <li><TextLink href={links.github} external>GitHub</TextLink></li>
          <li><TextLink href={links.linkedin} external>LinkedIn</TextLink></li>
        </ul>
      </div>
    </section>
  );
}
