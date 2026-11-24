import type { ReactNode } from "react";

/** Figma "Tag". Render inside a <ul>. */
export function Tag({ children }: { children: ReactNode }) {
  return (
    <li className="rounded-full border border-border bg-bg px-3 py-1 text-tag text-fg-muted">{children}</li>
  );
}
