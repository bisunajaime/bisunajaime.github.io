/** Figma "Projects / Earlier Row". Render inside a <ul>. */
export function EarlierWorkRow({ name, line }: { name: string; line: string }) {
  return (
    <li className="flex flex-col gap-1 border-t border-border py-4 md:flex-row md:items-baseline md:gap-8">
      <span className="text-label text-fg md:w-60 md:shrink-0">{name}</span>
      <span className="max-w-text text-body text-fg-muted">{line}</span>
    </li>
  );
}
