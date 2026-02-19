import { useState, useEffect, useRef } from "react";
import { Navigation } from "./components/Navigation";
import { Hero } from "./components/Hero";
import { Experience } from "./components/Experience";
import { Projects } from "./components/Projects";
import { TechStack } from "./components/TechStack";


import { Wallpapers } from "./components/Wallpapers";
import { Footer } from "./components/Footer";

export default function App() {
  const [activeSection, setActiveSection] = useState("hero");
  const scrollTargetRef = useRef<string | null>(null);
  const scrollEndTimeoutRef = useRef<number | null>(null);

  const updateActiveSection = () => {
    const sections = ["hero", "experience", "projects", "techstack", "events", "organizations", "wallpapers"];
    const scrollPosition = window.scrollY + 100;

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
      const offset = 80; // Account for fixed navigation
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

      <main className="pt-20 pb-28 md:pt-16 md:pb-0">
        <div id="hero">
          <Hero />
        </div>
        <div id="experience">
          <Experience />
        </div>
        <div id="projects">
          <Projects />
        </div>
        <div id="techstack">
          <TechStack />
        </div>
        {/* <div id="events">
          <Events />
        </div>
        <div id="organizations">
          <Organizations />
        </div> */}
        <div id="wallpapers">
          <Wallpapers />
        </div>
      </main>

      <Footer />
    </div>
  );
}
