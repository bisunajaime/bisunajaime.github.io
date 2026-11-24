import type { ComponentProps } from "react";
import { ArrowUpRight } from "lucide-react";

type TextLinkProps = ComponentProps<"a"> & {
  /** Opens in a new tab and shows the ↗ arrow. */
  external?: boolean;
};

/** Figma "Link": accent, underlined so it never relies on colour alone. */
export function TextLink({ external = false, className = "", children, ...props }: TextLinkProps) {
  return (
    <a
      className={`inline-flex items-center gap-1 text-label text-accent underline decoration-1 underline-offset-4 hover:text-accent-hover hover:decoration-2 ${className}`}
      {...(external ? { target: "_blank", rel: "noreferrer noopener" } : {})}
      {...props}
    >
      {children}
      {external && (
        <>
          {/* Inter's Latin subset has no ↗ glyph, so the arrow is an icon. */}
          <ArrowUpRight aria-hidden="true" className="size-4 shrink-0" strokeWidth={2} />
          <span className="sr-only"> (opens in a new tab)</span>
        </>
      )}
    </a>
  );
}
