import { SiteHeader } from "./components/SiteHeader";
import { Hero } from "./components/Hero";
import { Work } from "./components/Work";
import { Experience } from "./components/Experience";
import { About } from "./components/About";
import { Contact } from "./components/Contact";
import { SiteFooter } from "./components/SiteFooter";

export default function App() {
  return (
    <>
      <a
        href="#main"
        className="sr-only z-10 rounded-sm bg-accent px-4 py-2 text-label text-on-accent focus:not-sr-only focus:absolute focus:top-3 focus:left-3"
      >
        Skip to content
      </a>
      <SiteHeader />
      <main id="main">
        <Hero />
        <Work />
        <Experience />
        <About />
        <Contact />
      </main>
      <SiteFooter />
    </>
  );
}
