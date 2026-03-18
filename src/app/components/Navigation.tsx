import { useEffect, useState } from "react";
import { Menu, Moon, SunMedium, X } from "lucide-react";
import { useTheme } from "next-themes";
import { cn } from "./shared/utils";

interface NavigationProps {
  activeSection: string;
  onNavigate: (section: string) => void;
}

const sections = [
  { id: "hero", label: "Home" },
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "wallpapers", label: "Wallpapers" },
  { id: "contact", label: "Contact" },
];

function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted && resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="inline-flex size-11 items-center justify-center rounded-xl border border-border bg-background/75 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      {isDark ? <SunMedium className="size-4" /> : <Moon className="size-4" />}
    </button>
  );
}

export function Navigation({ activeSection, onNavigate }: NavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  const handleNavigate = (section: string) => {
    onNavigate(section);
    setIsMenuOpen(false);
  };

  return (
    <>
      <nav className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-6 sm:pt-4">
        <div className="mx-auto w-full max-w-[var(--page-max-width)]">
          <div className="glass-panel flex items-center justify-between rounded-2xl px-3 py-2 sm:px-4">
            <button
              type="button"
              onClick={() => handleNavigate("hero")}
              className="inline-flex h-11 items-center rounded-xl px-3 text-base font-semibold tracking-tight text-foreground transition-colors hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              aria-label="Go to home section"
            >
              Jaime
              <span className="ml-1 text-primary">Bisuña</span>
            </button>

            <div className="hidden items-center gap-1.5 md:flex">
              {sections.map((section) => (
                <button
                  type="button"
                  key={section.id}
                  onClick={() => handleNavigate(section.id)}
                  aria-current={activeSection === section.id ? "page" : undefined}
                  className={cn(
                    "inline-flex h-11 items-center rounded-xl px-4 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                    activeSection === section.id
                      ? "bg-primary/12 text-primary"
                      : "text-muted-foreground hover:bg-secondary hover:text-foreground",
                  )}
                >
                  {section.label}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <ThemeToggle />
              <button
                type="button"
                onClick={() => setIsMenuOpen((prev) => !prev)}
                className="inline-flex size-11 items-center justify-center rounded-xl border border-border bg-background/75 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring md:hidden"
                aria-expanded={isMenuOpen}
                aria-controls="mobile-menu"
                aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              >
                {isMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div
        className={cn(
          "fixed inset-0 z-50 bg-black/35 transition-opacity md:hidden",
          isMenuOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0",
        )}
        onClick={() => setIsMenuOpen(false)}
        aria-hidden={!isMenuOpen}
      >
        <div
          id="mobile-menu"
          className={cn(
            "glass-panel absolute right-0 top-0 flex h-full w-[min(20rem,84vw)] flex-col rounded-none border-l border-y-0 border-r-0 border-border px-5 pb-6 pt-20 transition-transform duration-300",
            isMenuOpen ? "translate-x-0" : "translate-x-full",
          )}
          onClick={(event) => event.stopPropagation()}
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
        >
          <div className="space-y-1">
            {sections.map((section) => (
              <button
                key={section.id}
                type="button"
                onClick={() => handleNavigate(section.id)}
                aria-current={activeSection === section.id ? "page" : undefined}
                className={cn(
                  "flex h-11 w-full items-center rounded-xl px-3 text-left text-base font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                  activeSection === section.id
                    ? "bg-primary/12 text-primary"
                    : "text-foreground hover:bg-secondary",
                )}
              >
                {section.label}
              </button>
            ))}
          </div>

          <p className="mt-6 px-1 text-xs uppercase tracking-[0.14em] text-muted-foreground">
            Theme
          </p>
          <div className="mt-2 flex items-center">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </>
  );
}
