const portfolioUrl = "https://innovationpixel.com/portfolio.htm";

const projects = [
  {
    number: "01",
    title: "E-commerce",
    label: "E-COMMERCE WEBSITE EXPERIENCE",
    href: portfolioUrl,
    preview:
      "https://www.pinnacledesignagency.com/assets/images/portfolio/ecommerce/img1.jpg",
  },
  {
    number: "02",
    title: "B2B / B2C Portal",
    label: "BUSINESS PORTAL DESIGN & DEVELOPMENT",
    href: portfolioUrl,
    preview:
      "https://www.pinnacledesignagency.com/assets/images/portfolio/b2b/img1.png",
  },
  {
    number: "03",
    title: "Web Application",
    label: "CUSTOM WEB APPLICATION EXPERIENCE",
    href: portfolioUrl,
    preview:
      "https://www.pinnacledesignagency.com/assets/images/portfolio/web-app/img1.png",
  },
  {
    number: "04",
    title: "CMS Website",
    label: "CONTENT-DRIVEN WEBSITE BUILD",
    href: portfolioUrl,
    preview:
      "https://www.pinnacledesignagency.com/assets/images/portfolio/cms/img1.png",
  },
  {
    number: "05",
    title: "Responsive Website",
    label: "RESPONSIVE WEBSITE DESIGN & DEVELOPMENT",
    href: portfolioUrl,
    preview:
      "https://www.pinnacledesignagency.com/assets/images/portfolio/responsive/img1.png",
  },
];

export default function ProjectsSection() {
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
              A selection of websites, portals and web applications shaped
              around clear interfaces, responsive systems and production-ready
              development.
            </p>
          </div>

          <div className="projects-intro__footer">
            <span>FULL-STACK WEB DEVELOPMENT</span>
            <a
              className="projects-intro__more"
              href={portfolioUrl}
              target="_blank"
              rel="noreferrer"
            >
              <span>View all work</span>
              <span className="projects-intro__more-arrow" aria-hidden="true">
                ↗
              </span>
            </a>
          </div>
        </div>
      </aside>

      <div className="projects-list">
        {projects.map((project) => (
          <article className="project-row" key={project.number}>
            <div className="project-row__preview" aria-hidden="true">
              <img src={project.preview} alt="" loading="lazy" />
              <div className="project-row__wash" />
            </div>

            <div className="project-row__header">
              <span className="project-row__number">({project.number})</span>

              <a
                className="project-row__title-link"
                href={project.href}
                target="_blank"
                rel="noreferrer"
              >
                <span className="project-row__title">{project.title}</span>
                <span className="project-row__draw-arrow" aria-hidden="true" />
              </a>

              <span className="project-row__label">({project.label})</span>
            </div>

            <a
              className="project-row__cta"
              href={project.href}
              target="_blank"
              rel="noreferrer"
            >
              View case study <span aria-hidden="true">↗</span>
            </a>

            <span className="project-row__index" aria-hidden="true">
              {project.number} / {String(projects.length).padStart(2, "0")}
            </span>
          </article>
        ))}
      </div>
    </section>
  );
}
