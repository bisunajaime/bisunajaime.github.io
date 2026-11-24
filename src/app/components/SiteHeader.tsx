const NAV = [
  { label: "Work", href: "#work" },
  // Four links don't fit beside the name at 390px; the mobile design keeps three.
  { label: "Experience", href: "#experience", className: "hidden sm:list-item" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export function SiteHeader() {
  return (
    <header id="top" className="page-gutter border-b border-border">
      <div className="mx-auto flex max-w-content items-center justify-between py-3 md:py-4">
        <a href="#top" className="text-label font-semibold text-fg">
          Jaime Bisuña
        </a>
        <nav aria-label="Primary">
          <ul className="flex gap-4 md:gap-8">
            {NAV.map((item) => (
              <li key={item.href} className={item.className}>
                <a href={item.href} className="block py-2 text-label text-fg hover:text-accent">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
