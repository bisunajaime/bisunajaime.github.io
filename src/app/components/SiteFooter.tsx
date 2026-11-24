import { footer } from "../../data/homepage";

export function SiteFooter() {
  return (
    <footer className="page-gutter border-t border-border bg-surface py-6">
      <div className="mx-auto flex max-w-content flex-col gap-1 text-small text-fg-subtle md:flex-row md:justify-between">
        {/* Year is baked in at build time; a deploy in a new year updates it. */}
        <p suppressHydrationWarning>© {new Date().getFullYear()} Jaime Bisuña</p>
        <p>{footer.location}</p>
      </div>
    </footer>
  );
}
