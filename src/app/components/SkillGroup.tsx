/** Figma "Skills / Group". Items are kept whole (non-breaking spaces) and each "·" sticks to the item before it. */
export function SkillGroup({ label, items }: { label: string; items: string[] }) {
  const text = items.map((item) => item.replace(/ /g, " ")).join(" · ");
  return (
    <div className="flex flex-col gap-1">
      <h3 className="text-label text-fg">{label}</h3>
      <p className="text-body text-fg-muted">{text}</p>
    </div>
  );
}
