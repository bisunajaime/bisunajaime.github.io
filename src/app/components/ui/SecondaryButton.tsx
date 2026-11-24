import type { ComponentProps } from "react";

/** Outlined button for secondary actions, so the accent "Email me" stays the page's only primary action. */
export function SecondaryButton({ className = "", type = "button", ...props }: ComponentProps<"button">) {
  return (
    <button
      type={type}
      className={`inline-flex cursor-pointer items-center justify-center rounded-sm border border-border bg-surface px-6 py-3 text-label text-fg hover:border-fg-subtle ${className}`}
      {...props}
    />
  );
}
