import { useState, useEffect, useRef } from "react";
import { Navigation } from "./components/Navigation";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { Experience } from "./components/Experience";
import { Projects } from "./components/Projects";
import { TechStack } from "./components/TechStack";
import { Wallpapers } from "./components/Wallpapers";
import { Footer } from "./components/Footer";

export default function App() {
  const [activeSection, setActiveSection] = useState("hero");
  const scrollTargetRef = useRef<string | null>(null);
  const scrollEndTimeoutRef = useRef<number | null>(null);
  const sections = ["hero", "about", "experience", "projects", "skills", "wallpapers", "contact"];

  const updateActiveSection = () => {
    const scrollPosition = window.scrollY + 140;

    for (const sectionId of sections) {
      const element = document.getElementById(sectionId);
      if (element) {
        const { offsetTop, offsetHeight } = element;
        if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
          setActiveSection(sectionId);
          break;
        }
      }
    }
  };

  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    scrollTargetRef.current = sectionId;
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 96;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    } else {
      scrollTargetRef.current = null;
    }
  };

  // Update active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (scrollTargetRef.current) {
        if (scrollEndTimeoutRef.current) {
          window.clearTimeout(scrollEndTimeoutRef.current);
        }
        scrollEndTimeoutRef.current = window.setTimeout(() => {
          scrollTargetRef.current = null;
          scrollEndTimeoutRef.current = null;
          updateActiveSection();
        }, 150);
        return;
      }

      updateActiveSection();
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollEndTimeoutRef.current) {
        window.clearTimeout(scrollEndTimeoutRef.current);
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation activeSection={activeSection} onNavigate={handleNavigate} />

      <main className="pb-2">
        <Hero />
        <About />
        <Experience />
        <Projects />
        <TechStack />
        <Wallpapers />
      </main>

      <Footer />
    </div>
  );
}
