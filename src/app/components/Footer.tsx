export function Footer() {
  const links = [
    { label: "GitHub", href: "https://github.com/bisunajaime" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/jose-jaime-bisuna" },
    { label: "Resume", href: "/files/ResumeJaimeBisuna.pdf" },
  ];

  return (
    <footer id="contact" className="px-4 pb-8 pt-4 sm:px-6 sm:pb-10">
      <div className="mx-auto w-full max-w-[var(--page-max-width)]">
        <div className="glass-panel rounded-[1.5rem] px-6 py-8 text-center sm:px-10 sm:py-10">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
            Contact
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Let&apos;s build something useful.
          </h2>
          <a
            href="mailto:jaimebisuna@gmail.com"
            className="mt-4 inline-flex h-11 items-center rounded-full border border-border bg-background px-5 text-base font-medium text-foreground transition-colors hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            bisunajaime@gmail.com
          </a>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel={link.href.startsWith("http") ? "noreferrer noopener" : undefined}
                className="inline-flex h-11 items-center rounded-full px-4 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                {link.label}
              </a>
            ))}
          </div>

          <p className="mt-6 text-xs text-muted-foreground">
            © {new Date().getFullYear()} Jaime Bisuña. Built with React, TypeScript, and Tailwind CSS.
          </p>
        </div>
      </div>
    </footer>
  );
}
