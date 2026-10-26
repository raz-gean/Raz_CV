import { HighlightObserver, SectionNav } from "@/components/client";
import Projects from "@/components/Projects";
import {
  About,
  Achievements,
  Contact,
  Cover,
  Education,
  Experience,
  Footer,
  GitHub,
  RailDetails,
  Section,
  Skills,
} from "@/components/sections";
import { projects } from "@/data/cv";

const nav = [
  { id: "profile", label: "Profile" },
  { id: "about", label: "Basic info" },
  { id: "education", label: "Education" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "github", label: "GitHub" },
  { id: "experience", label: "Experience" },
  { id: "achievements", label: "Achievements" },
  { id: "contact", label: "Contact" },
];

export default function Home() {
  return (
    <>
      <a
        href="#main"
        className="sr-only z-50 rounded bg-ink px-4 py-2 text-paper focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
      >
        Skip to content
      </a>

      <Cover />

      <div className="mx-auto max-w-300 px-4 sm:px-8 lg:grid lg:grid-cols-[13rem_1fr] lg:gap-16">
        <aside className="no-print sticky top-0 z-20 -mx-4 self-start border-y border-rule bg-paper/90 px-4 py-2 backdrop-blur-md sm:-mx-8 sm:px-8 lg:top-0 lg:mx-0 lg:border-0 lg:bg-transparent lg:px-0 lg:py-14 lg:backdrop-blur-none">
          <SectionNav items={nav} />
          <RailDetails />
        </aside>

        <main id="main" className="min-w-0">
          <About />
          <Education />
          <Skills />
          <Section
            id="projects"
            title="Projects"
            lede="Completed and in-progress work, from my capstone to coursework and personal builds."
          >
            <Projects projects={projects} />
          </Section>
          <GitHub />
          <Experience />
          <Achievements />
          <Contact />
        </main>
      </div>

      <Footer />
      <HighlightObserver />
    </>
  );
}
