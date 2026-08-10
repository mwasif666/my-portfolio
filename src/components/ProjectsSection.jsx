import { useEffect, useRef, useState } from "react";
import { useScroll } from "../contexts/ScrollContext";
import "./ProjectsPreview.module.css";

const projects = [
  {
    number: "01",
    title: "Offplan DXB",
    label: "WEB DEVELOPMENT",
    brief: "Dubai real estate platform built with Laravel.",
    detail:
      "Offplan DXB is a real estate listing portal built in Laravel, offering property search, inquiry management, and agent dashboards. With SEO optimization for real estate keywords and smooth UX, the site serves as a robust platform for Dubai’s property market.",
    site: "https://offplandxb.ae/",
    image:
      "https://res.cloudinary.com/dsjxs1umc/image/upload/v1760475443/wnmkvdi1ij9ga9gyyb6b.png",
    platform: ["Laravel"],
    client: "Offplan DXB",
    startDate: "May 2023",
    endDate: "July 2023",
  },
  {
    number: "02",
    title: "Petroc Energy",
    label: "CORPORATE WEBSITE",
    brief: "Energy sector website developed with HTML, CSS, and Bootstrap.",
    detail:
      "Petroc Energy’s website is a corporate digital presence built using HTML, CSS, and Bootstrap. Designed for the energy industry, it provides optimized navigation, cross-browser compatibility, and responsive performance. The lightweight code ensures fast loading times and improved SEO rankings for business visibility.",
    site: "https://petrocenergy.com/",
    image:
      "https://res.cloudinary.com/dsjxs1umc/image/upload/v1760479830/gqv6hejxtb69zpzga5c3.png",
    platform: ["HTML", "CSS", "Bootstrap"],
    client: "Petroc Energy",
    startDate: "April 2023",
    endDate: "May 2023",
  },
  {
    number: "03",
    title: "Pinnacle Design Agency",
    label: "WEB APPLICATION",
    brief: "Design agency website developed using PHP.",
    detail:
      "Pinnacle Design Agency is a creative web design company website developed with PHP and Bootstrap. The platform focuses on visual appeal, performance, and SEO optimization. It delivers high-quality user experiences that align with the agency’s design-first philosophy and branding goals.",
    site: "https://www.pinnacledesignagency.com/",
    image:
      "https://res.cloudinary.com/dsjxs1umc/image/upload/v1760479676/hrui65r8hmzdoheegqgw.png",
    platform: ["PHP", "Bootstrap"],
    client: "Pinnacle Design Agency",
    startDate: "September 2023",
    endDate: "November 2023",
  },
  {
    number: "04",
    title: "ABET Global",
    label: "CORPORATE WEBSITE",
    brief: "Corporate business website developed in Laravel.",
    detail:
      "ABET Global is a Laravel-based corporate platform showcasing the company’s services and client network. The site features content modularity for easy CMS management and follows SEO best practices for indexing across multiple global regions.",
    site: "https://abetglobal.com/",
    image:
      "https://res.cloudinary.com/dsjxs1umc/image/upload/v1760477365/fxoqhkisj6eemx0a8vxy.png",
    platform: ["Laravel"],
    client: "ABET Global",
    startDate: "September 2023",
    endDate: "November 2023",
  },
  {
    number: "05",
    title: "Vampire Tools",
    label: "WEB DEVELOPMENT",
    brief: "E-commerce tool store developed using WordPress and WooCommerce.",
    detail:
      "Vampire Tools is a WooCommerce-powered online store developed with WordPress. It features a secure payment gateway, product filtering, and an optimized shopping experience for B2B and retail buyers. The site’s SEO structure and product schema enhance discoverability on Google, while its responsive design ensures seamless performance across devices.",
    site: "https://vampiretools.com/",
    image:
      "https://res.cloudinary.com/dsjxs1umc/image/upload/v1760473074/ihvkr9eublhgfwxbksqy.png",
    platform: ["WordPress", "WooCommerce"],
    client: "Vampire Tools Inc.",
    startDate: "October 2024",
    endDate: "November 2024",
  },
];

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
              Laravel, PHP, WordPress and responsive frontend work selected from
              production projects across real estate, energy, design and commerce.
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
                  src={project.image}
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
              <img src={selectedProject.image} alt={`${selectedProject.title} website`} />
            </div>

            <div className="project-case__content">
              <div className="project-case__heading">
                <span className="project-case__eyebrow">{selectedProject.label}</span>
                <h3 id="project-case-title">{selectedProject.title}</h3>
              </div>

              <div className="project-case__details">
                <div>
                  <span className="project-case__label">PROJECT OVERVIEW</span>
                  <p>{selectedProject.detail}</p>
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
                  <span className="project-case__label">CLIENT & TIMELINE</span>
                  <p>
                    {selectedProject.client}<br />
                    {selectedProject.startDate} — {selectedProject.endDate}
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
