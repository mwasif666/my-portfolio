import { useEffect, useState } from "react";

const screenshot = (url) =>
  `https://s.wordpress.com/mshots/v1/${encodeURIComponent(url)}?w=1600`;

const projects = [
  {
    number: "01",
    title: "George Will Buy It",
    label: "WEB DEVELOPMENT",
    subtitle: "Nationwide Car Buying Platform for CyberKing George Saliba",
    preview: screenshot("https://georgewillbuyit.com/"),
    client: "George Saliba",
    services: ["Web Development", "UX Strategy", "Lead Generation"],
    challenge:
      "Selling a vehicle is usually slow, stressful and fragmented across dealerships, marketplaces and faceless online forms. The experience needed to make a nationwide sale feel fast, transparent and human.",
    solution:
      "A focused car-buying experience was built around a simple offer flow: customers submit their vehicle, receive a real offer quickly, confirm condition with photos or video, agree on price, and arrange pickup and payment without the usual dealership friction.",
    results: [
      { value: "< 2 min", label: "Real offer flow" },
      { value: "Nationwide", label: "Car buying coverage" },
      { value: "1M+", label: "Social audience" },
      { value: "1.2B", label: "Views and counting" },
    ],
  },
  {
    number: "02",
    title: "CloverWoo",
    label: "SAAS DEVELOPMENT",
    subtitle: "Clover POS to WooCommerce Integration Plugin",
    preview: screenshot("https://cloverwoo.com/"),
    client: "CloverWoo",
    year: "2025",
    duration: "8 Months",
    services: ["SaaS Development", "Plugin Development", "UI/UX Design"],
    challenge:
      "Retailers and restaurants using Clover POS did not have a dependable way to keep their physical point-of-sale and WooCommerce store in sync. Existing tools handled only pieces of the workflow and often required separate payment solutions.",
    solution:
      "CloverWoo was built as one WordPress plugin for bidirectional products, orders, inventory, customers and payments, with a PCI-compliant Clover gateway, webhook-driven inventory updates, kitchen auto-print and multi-region support.",
    results: [
      { value: "All-in-One", label: "Sync + payments" },
      { value: "Real-Time", label: "Inventory sync" },
      { value: "$60/mo", label: "Flat rate" },
      { value: "< 10 min", label: "Setup time" },
    ],
  },
  {
    number: "03",
    title: "Claivra",
    label: "SAAS DEVELOPMENT",
    subtitle: "AI-Powered Ad Creative Generator",
    preview: screenshot("https://claivra.com/"),
    client: "Claivra",
    year: "2026",
    duration: "4 Months",
    services: ["SaaS Development", "AI & Automation", "UI/UX Design"],
    challenge:
      "Marketers and small businesses were spending heavily on agencies or freelancers and waiting days for a handful of ad concepts. They needed a much faster way to create high-quality campaign creative without the traditional production overhead.",
    solution:
      "Claivra turns a website URL into production-ready ad concepts in under two minutes. It researches the brand, audience and competitors, then generates multiple concepts with images, headlines and CTAs, supported by brand kits and revision workflows.",
    results: [
      { value: "< 2 min", label: "URL to ads" },
      { value: "17%", label: "Lower CPA" },
      { value: "27%", label: "Conversion lift" },
      { value: "$8–20K", label: "Annual savings" },
    ],
  },
  {
    number: "04",
    title: "StackSerp",
    label: "SAAS DEVELOPMENT",
    subtitle: "AI SEO Auto-Blogging & Content Generation Platform",
    preview: screenshot("https://stackserp.com/"),
    client: "StackSerp",
    year: "2025",
    duration: "6 Months",
    services: ["SaaS Development", "AI & Automation", "UI/UX Design", "SEO"],
    challenge:
      "Content teams and agencies were spending many hours on keyword research, writing, optimization and publishing for every article. Producing consistent SEO content at scale was too slow and expensive for small teams.",
    solution:
      "StackSerp automates the content pipeline from research and outlining through writing, SEO optimization, image generation and CMS publishing. One dashboard manages multiple sites, brand voices, internal linking, topic clusters and analytics.",
    results: [
      { value: "10,000+", label: "Articles generated" },
      { value: "500+", label: "Active users" },
      { value: "~3 min", label: "Time to publish" },
      { value: "4 Plans", label: "Pricing tiers" },
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
              Four selected builds from Innovation With Pixels — web products,
              SaaS platforms and conversion-focused digital experiences.
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
            tabIndex={0}
            role="button"
            aria-label={`Open ${project.title} case study`}
            onClick={() => openCaseStudy(project)}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                openCaseStudy(project);
              }
            }}
          >
            <div className="project-row__preview" aria-hidden="true">
              <div className="project-row__preview-frame">
                <img src={project.preview} alt="" loading="lazy" />
              </div>
            </div>

            <div className="project-row__header">
              <span className="project-row__number">({project.number})</span>

              <div className="project-row__title-link">
                <span className="project-row__title">{project.title}</span>
                <span className="project-row__draw-arrow" aria-hidden="true" />
              </div>

              <span className="project-row__label">({project.label})</span>
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

            <div className="project-case__hero">
              <div className="project-case__hero-copy">
                <span>{selectedProject.label}</span>
                <h3 id="project-case-title">{selectedProject.title}</h3>
                <p>{selectedProject.subtitle}</p>
              </div>

              <div className="project-case__hero-image">
                <img src={selectedProject.preview} alt="" />
              </div>
            </div>

            <div className="project-case__meta">
              <div>
                <span>CLIENT</span>
                <strong>{selectedProject.client}</strong>
              </div>
              {selectedProject.year ? (
                <div>
                  <span>YEAR</span>
                  <strong>{selectedProject.year}</strong>
                </div>
              ) : null}
              {selectedProject.duration ? (
                <div>
                  <span>DURATION</span>
                  <strong>{selectedProject.duration}</strong>
                </div>
              ) : null}
              <div className="project-case__meta-services">
                <span>SERVICES</span>
                <strong>{selectedProject.services.join(" · ")}</strong>
              </div>
            </div>

            <div className="project-case__story">
              <section>
                <span className="project-case__section-label">THE CHALLENGE</span>
                <h4>What we were solving</h4>
                <p>{selectedProject.challenge}</p>
              </section>

              <section>
                <span className="project-case__section-label">OUR SOLUTION</span>
                <h4>How we solved it</h4>
                <p>{selectedProject.solution}</p>
              </section>
            </div>

            <div className="project-case__results">
              <div className="project-case__results-heading">
                <span>THE RESULTS</span>
                <h4>Impact delivered</h4>
              </div>
              <div className="project-case__results-grid">
                {selectedProject.results.map((result) => (
                  <div key={`${result.value}-${result.label}`}>
                    <strong>{result.value}</strong>
                    <span>{result.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </article>
        </div>
      ) : null}
    </section>
  );
}
