import { useEffect, useRef, useState } from "react";
import { useScroll } from "../contexts/ScrollContext";
import "./ProjectsPreview.module.css";

const websiteShot = (url, height = 900) =>
  `https://s.wordpress.com/mshots/v1/${encodeURIComponent(url)}?w=1600&h=${height}`;

const projectWithShots = (project) => ({
  ...project,
  preview: websiteShot(project.site, 900),
  scrollPreview: websiteShot(project.site, 5600),
});

const projects = [
  {
    number: "01",
    title: "Vampire Tools",
    label: "WEB DEVELOPMENT",
    brief: "E-commerce tool store developed using WordPress and WooCommerce.",
    site: "https://vampiretools.com/",
    platform: ["WordPress", "WooCommerce", "Responsive Development"],
  },
  {
    number: "02",
    title: "Bridge Precision Tools",
    label: "WEB DEVELOPMENT",
    brief: "Industrial tools company website built with WordPress.",
    site: "https://bridgeprecisiontools.com/",
    platform: ["WordPress", "Web Development", "Responsive Development"],
  },
  {
    number: "03",
    title: "Roots BMD",
    label: "WEB DEVELOPMENT",
    brief: "Healthcare and supplements company website built with WordPress.",
    site: "https://rootsbmd.com/",
    platform: ["WordPress", "Web Development", "Responsive Development"],
  },
  {
    number: "04",
    title: "Secure Surve",
    label: "WEB DEVELOPMENT",
    brief: "Security and surveillance company website.",
    site: "https://secure-surve.com/",
    platform: ["WordPress", "Web Development", "Responsive Development"],
  },
  {
    number: "05",
    title: "Park Point 24",
    label: "WEB DEVELOPMENT",
    brief: "Real estate and parking management website built with WordPress.",
    site: "https://www.parkpoint24.de/",
    platform: ["WordPress", "Web Development", "Responsive Development"],
  },
  {
    number: "06",
    title: "Tooth Shine",
    label: "WEB DEVELOPMENT",
    brief: "Dental clinic website built with WordPress.",
    site: "https://toothshine.pk/",
    platform: ["WordPress", "Web Development", "Responsive Development"],
  },
].map(projectWithShots);

export default function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState(null);
  const casePanelRef = useRef(null);
  const { stopScroll, startScroll, scrollToId } = useScroll();

  useEffect(() => {
    if (!selectedProject) return undefined;

    stopScroll();

    const resetCaseScroll = () => {
      casePanelRef.current?.scrollTo({ top: 0, left: 0, behavior: "auto" });
    };

    resetCaseScroll();
    const frame = requestAnimationFrame(resetCaseScroll);

    const onKeyDown = (event) => {
      if (event.key === "Escape") setSelectedProject(null);
    };

    document.addEventListener("keydown", onKeyDown);

    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener("keydown", onKeyDown);
      startScroll();
    };
  }, [selectedProject, startScroll, stopScroll]);

  const openCaseStudy = (project) => setSelectedProject(project);

  const handleRowKeyDown = (event, project) => {
    if (event.key !== "Enter" && event.key !== " ") return;
    event.preventDefault();
    openCaseStudy(project);
  };

  return (
    <section className="projects-section" id="projects" aria-labelledby="projects-title">
      <aside className="projects-intro">
        <div className="projects-intro__inner">
          <span className="projects-intro__eyebrow">SELECTED WORK</span>

          <div>
            <h2 id="projects-title" className="projects-intro__title">
              Selected
              <br />
              <em>projects.</em>
            </h2>
            <p className="projects-intro__copy">
              WordPress builds, e-commerce experiences and business websites
              selected from recent development work.
            </p>
          </div>

          <div className="projects-intro__footer">
            <span>FULL-STACK WEB DEVELOPMENT</span>
            <button
              className="projects-intro__more"
              type="button"
              onClick={() => scrollToId("projects-list")}
            >
              <span>Explore projects</span>
              <span className="projects-intro__more-arrow" aria-hidden="true">
                ↓
              </span>
            </button>
          </div>
        </div>
      </aside>

      <div className="projects-list" id="projects-list">
        {projects.map((project) => (
          <article
            className="project-row"
            key={project.number}
            tabIndex={0}
            role="button"
            aria-label={`Open ${project.title} case study`}
            onClick={() => openCaseStudy(project)}
            onKeyDown={(event) => handleRowKeyDown(event, project)}
          >
            <div className="project-row__header">
              <span className="project-row__number">({project.number})</span>

              <div className="project-row__title-link">
                <span className="project-row__title">{project.title}</span>
                <span className="project-row__draw-arrow" aria-hidden="true" />
              </div>

              <span className="project-row__label">({project.label})</span>
            </div>

            <div className="project-row__preview" aria-hidden="true">
              <div className="project-row__preview-frame">
                <img
                  src={project.scrollPreview}
                  alt=""
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </div>

            <button
              className="project-row__cta"
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                openCaseStudy(project);
              }}
              aria-haspopup="dialog"
            >
              View case study <span aria-hidden="true">↗</span>
            </button>

            <span className="project-row__index" aria-hidden="true">
              {project.number} / {String(projects.length).padStart(2, "0")}
            </span>
          </article>
        ))}
      </div>

      {selectedProject ? (
        <div
          className="project-case"
          role="dialog"
          aria-modal="true"
          aria-labelledby="project-case-title"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setSelectedProject(null);
          }}
        >
          <article
            className="project-case__panel"
            ref={casePanelRef}
            data-lenis-prevent
          >
            <header className="project-case__topbar">
              <span>
                CASE STUDY / {selectedProject.number} / {selectedProject.label}
              </span>
              <button
                className="project-case__close"
                type="button"
                onClick={() => setSelectedProject(null)}
                aria-label="Close case study"
                autoFocus
              >
                Close <span aria-hidden="true">×</span>
              </button>
            </header>

            <div className="project-case__hero">
              <img src={selectedProject.preview} alt={`${selectedProject.title} website`} />
            </div>

            <div className="project-case__content">
              <div className="project-case__heading">
                <span className="project-case__eyebrow">WEB DEVELOPMENT</span>
                <h3 id="project-case-title">{selectedProject.title}</h3>
              </div>

              <div className="project-case__details">
                <div>
                  <span className="project-case__label">PROJECT BRIEF</span>
                  <p>{selectedProject.brief}</p>
                </div>

                <div>
                  <span className="project-case__label">BUILD</span>
                  <ul className="project-case__tags">
                    {selectedProject.platform.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <span className="project-case__label">DELIVERY</span>
                  <p>
                    The case study stays inside this portfolio. The project
                    preview, title and brief above match the selected work card.
                  </p>
                </div>
              </div>
            </div>
          </article>
        </div>
      ) : null}
    </section>
  );
}
