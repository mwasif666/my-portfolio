import { useEffect, useState } from "react";

const projects = [
  {
    number: "01",
    title: "E-commerce",
    label: "E-COMMERCE",
    preview:
      "https://www.pinnacledesignagency.com/assets/images/portfolio/ecommerce/img1.jpg",
    detailImage:
      "https://www.pinnacledesignagency.com/assets/images/portfolio/expertise/ecommerce/img1.jpg",
    description:
      "E-commerce gives customers the flexibility to browse a store at any time and from anywhere. The source content focuses on useful online-retail features and on using design and development to help businesses maintain and grow their brand presence in a competitive market.",
    focus: [
      "Anytime storefront access",
      "Online retail experience",
      "Brand-focused presentation",
    ],
  },
  {
    number: "02",
    title: "B2B & B2C Portals",
    label: "BUSINESS PORTALS",
    preview:
      "https://www.pinnacledesignagency.com/assets/images/portfolio/b2b/img2.png",
    detailImage:
      "https://www.pinnacledesignagency.com/assets/images/portfolio/expertise/ecommerce/img2.png",
    description:
      "The B2B and B2C portal offering is described around a user-friendly content management system and SEO-friendly structure, with support for backend inventory, order fulfilment and accounting-system features.",
    focus: [
      "User-friendly CMS",
      "SEO-ready structure",
      "Inventory & fulfilment workflows",
    ],
  },
  {
    number: "03",
    title: "Web Applications",
    label: "WEB APPLICATIONS",
    preview:
      "https://www.pinnacledesignagency.com/assets/images/portfolio/web-app/img3.png",
    detailImage:
      "https://www.pinnacledesignagency.com/assets/images/portfolio/expertise/ecommerce/img3.png",
    description:
      "The source describes a web application as a browser-based program built to perform a particular function. These applications can serve organisations or individuals and can be created for a wide range of practical uses.",
    focus: [
      "Browser-based delivery",
      "Purpose-built functionality",
      "Organisation & individual use",
    ],
  },
  {
    number: "04",
    title: "CMS Websites",
    label: "CONTENT MANAGEMENT",
    preview:
      "https://www.pinnacledesignagency.com/assets/images/portfolio/cms/img4.png",
    detailImage:
      "https://www.pinnacledesignagency.com/assets/images/portfolio/expertise/ecommerce/img4.png",
    description:
      "The CMS website service is centred on giving site owners control over their own content. The source highlights the ability to manage and change a website, including text and images, without needing a developer for every update.",
    focus: [
      "Editable site content",
      "Text & image management",
      "Less developer dependency",
    ],
  },
  {
    number: "05",
    title: "Responsive Websites",
    label: "RESPONSIVE DESIGN",
    preview:
      "https://www.pinnacledesignagency.com/assets/images/portfolio/responsive/img5.png",
    detailImage:
      "https://www.pinnacledesignagency.com/assets/images/portfolio/expertise/ecommerce/img5.png",
    description:
      "Responsive website design is described through media queries, flexible layouts and adaptable graphics. The goal is a more usable and dynamic experience across different device types without layout or media problems.",
    focus: [
      "Media-query driven layouts",
      "Flexible page structure",
      "Multi-device usability",
    ],
  },
];

export default function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    if (!selectedProject) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event) => {
      if (event.key === "Escape") setSelectedProject(null);
    };

    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [selectedProject]);

  const openCaseStudy = (project) => setSelectedProject(project);

  const exploreProjects = () => {
    document
      .getElementById("projects-list")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
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
              Website work selected from the InnovationPixel portfolio — shown
              here with the same starting visuals and service context.
            </p>
          </div>

          <div className="projects-intro__footer">
            <span>FULL-STACK WEB DEVELOPMENT</span>
            <button
              className="projects-intro__more"
              type="button"
              onClick={exploreProjects}
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
            onClick={() => openCaseStudy(project)}
          >
            <div className="project-row__preview" aria-hidden="true">
              <div className="project-row__preview-frame">
                <img src={project.preview} alt="" loading="lazy" />
              </div>
            </div>

            <div className="project-row__header">
              <span className="project-row__number">({project.number})</span>

              <button
                className="project-row__title-link"
                type="button"
                onClick={() => openCaseStudy(project)}
                aria-haspopup="dialog"
              >
                <span className="project-row__title">{project.title}</span>
                <span className="project-row__draw-arrow" aria-hidden="true" />
              </button>

              <span className="project-row__label">({project.label})</span>
            </div>

            <button
              className="project-row__cta"
              type="button"
              onClick={() => openCaseStudy(project)}
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
          <article className="project-case__panel">
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

            <div className="project-case__layout">
              <div className="project-case__media">
                <div className="project-case__hero-image">
                  <img src={selectedProject.preview} alt="" />
                </div>
                <div className="project-case__support-image">
                  <img src={selectedProject.detailImage} alt="" />
                </div>
              </div>

              <div className="project-case__content">
                <span className="project-case__eyebrow">INNOVATIONPIXEL / WEB</span>
                <h3 id="project-case-title">{selectedProject.title}</h3>
                <p>{selectedProject.description}</p>

                <div className="project-case__focus">
                  <span>FOCUS</span>
                  <ul>
                    {selectedProject.focus.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>

                <p className="project-case__source">
                  Content is based on the website-development material and
                  portfolio categories available in the InnovationPixel source.
                </p>
              </div>
            </div>
          </article>
        </div>
      ) : null}
    </section>
  );
}
