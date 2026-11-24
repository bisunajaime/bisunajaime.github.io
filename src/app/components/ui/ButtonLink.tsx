import type { ComponentProps } from "react";

/** Figma "Button / Primary": the page's one call to action, rendered as a link. */
export function ButtonLink({ className = "", ...props }: ComponentProps<"a">) {
  return (
    <a
      className={`inline-flex items-center justify-center rounded-sm bg-accent px-6 py-3 text-label text-on-accent hover:bg-accent-hover ${className}`}
      {...props}
    />
  );
}
