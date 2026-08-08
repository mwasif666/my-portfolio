const projects = [
  {
    number: "01",
    title: "Petrocore",
    label: "SELECTED WEB DEVELOPMENT BUILD",
    href: "https://github.com/mwasif666/Petrocore",
    preview: "https://opengraph.githubassets.com/portfolio-petrocore/mwasif666/Petrocore",
  },
  {
    number: "02",
    title: "InnovationPixel",
    label: "SELECTED WEB DEVELOPMENT BUILD",
    href: "https://github.com/mwasif666/innovationpixel",
    preview: "https://opengraph.githubassets.com/portfolio-innovation/mwasif666/innovationpixel",
  },
  {
    number: "03",
    title: "Caralif",
    label: "SELECTED WEB DEVELOPMENT BUILD",
    href: "https://github.com/mwasif666/caralif",
    preview: "https://opengraph.githubassets.com/portfolio-caralif/mwasif666/caralif",
  },
  {
    number: "04",
    title: "Vera",
    label: "SELECTED WEB DEVELOPMENT BUILD",
    href: "https://github.com/mwasif666/Vera2",
    preview: "https://opengraph.githubassets.com/portfolio-vera/mwasif666/Vera2",
  },
  {
    number: "05",
    title: "SuperNova",
    label: "SELECTED WEB DEVELOPMENT BUILD",
    href: "https://github.com/mwasif666/SuperNova",
    preview: "https://opengraph.githubassets.com/portfolio-supernova/mwasif666/SuperNova",
  },
  {
    number: "06",
    title: "Himalayan",
    label: "SELECTED WEB DEVELOPMENT BUILD",
    href: "https://github.com/mwasif666/himalayan",
    preview: "https://opengraph.githubassets.com/portfolio-himalayan/mwasif666/himalayan",
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
              Interfaces, products and web systems built from front end to
              production.
            </p>
          </div>

          <div className="projects-intro__footer" aria-hidden="true">
            <span>FULL-STACK WEB DEVELOPMENT</span>
            <span>SCROLL ↓</span>
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
              View repository <span aria-hidden="true">↗</span>
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
