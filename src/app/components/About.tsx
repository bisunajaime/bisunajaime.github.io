export function About() {
  return (
    <section id="about" className="px-4 py-[var(--section-padding-y)] sm:px-6">
      <div className="mx-auto w-full max-w-[var(--page-max-width)]">
        <div className="overflow-hidden rounded-[1.5rem] p-6 sm:p-8 lg:p-10">
          <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
                About
              </p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                Building practical products with calm, usable interfaces.
              </h2>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                I am an AI full-stack developer based in the Philippines with hands-on
                experience in web and mobile products. I focus on dependable
                architecture, accessible UI, and shipping features that solve real
                user problems.
              </p>
            </div>

            <div className="rounded-2xl border border-border bg-card/90 p-5 shadow-[var(--shadow-subtle)] sm:p-6">
              <h3 className="text-lg font-semibold tracking-tight text-foreground">
                Quick Snapshot
              </h3>
              <dl className="mt-4 space-y-4 text-sm text-muted-foreground">
                <div className="flex items-center justify-between gap-3">
                  <dt>Role</dt>
                  <dd className="font-medium text-foreground">AI Full-Stack Developer</dd>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <dt>Experience</dt>
                  <dd className="font-medium text-foreground">5+ years</dd>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <dt>Focus</dt>
                  <dd className="font-medium text-foreground">React, TypeScript, .NET/C#, APIs</dd>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <dt>Location</dt>
                  <dd className="font-medium text-foreground">Metro Manila, PH</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
