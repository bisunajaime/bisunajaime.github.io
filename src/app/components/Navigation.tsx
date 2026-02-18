import { Button } from "./ui/button";

interface NavigationProps {
  activeSection: string;
  onNavigate: (section: string) => void;
}

export function Navigation({ activeSection, onNavigate }: NavigationProps) {
  const sections = [
    { id: "hero", label: "Home", mobileLabel: "Home" },
    { id: "experience", label: "Experience", mobileLabel: "Exp" },
    { id: "projects", label: "Projects", mobileLabel: "Projects" },
    { id: "techstack", label: "Tech Stack", mobileLabel: "Tech" },
    // { id: "events", label: "Events" },
    // { id: "organizations", label: "Organizations" },
    { id: "wallpapers", label: "Wallpapers", mobileLabel: "Wallpapers" }
  ];
  const activeTabStyle = {
    backgroundColor: "var(--hero-accent, #a78bfa)",
    color: "var(--hero-accent-foreground, #0b0f1a)",
  };
  const brandAccentStyle = {
    color: "var(--hero-accent, #a78bfa)",
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 py-5 md:py-4">
          <div className="flex items-center justify-center md:justify-between">
            <button
              onClick={() => onNavigate("hero")}
              className="text-xl font-medium"
            >
              <span className="teko-title md:hidden">
                Jaime{" "}
                <span style={brandAccentStyle}>
                  Bisuña
                </span>
              </span>
              <span className="teko-title hidden md:inline">
                J
                <span style={brandAccentStyle}>
                  B
                </span>
              </span>
            </button>
            <div className="hidden md:flex gap-2">
              {sections.map((section) => (
                <Button
                  key={section.id}
                  variant="ghost"
                  onClick={() => onNavigate(section.id)}
                  style={activeSection === section.id ? activeTabStyle : undefined}
                  className={activeSection === section.id ? "hover:brightness-105" : ""}
                >
                  {section.label}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      <div
        className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-background/90 backdrop-blur-md md:hidden"
        style={{ paddingBottom: "calc(env(safe-area-inset-bottom) + 0.9rem)" }}
      >
        <div className="mx-auto grid max-w-7xl grid-cols-5 gap-2 px-3 pt-3">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => onNavigate(section.id)}
              className={`rounded-md px-2.5 py-3 text-xs font-semibold transition-colors ${
                activeSection === section.id
                  ? "shadow-sm hover:brightness-105"
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              }`}
              style={activeSection === section.id ? activeTabStyle : undefined}
            >
              {section.mobileLabel}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
