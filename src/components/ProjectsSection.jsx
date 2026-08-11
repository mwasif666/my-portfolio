import { useState } from "react";
import styles from "./ProjectsShowcase.module.css";

const projects = [
  {
    name: "Offplan DXB",
    url: "https://offplandxb.ae/",
    image:
      "https://res.cloudinary.com/dsjxs1umc/image/upload/v1760475443/wnmkvdi1ij9ga9gyyb6b.png",
    services: ["Laravel Development", "Property Search", "Inquiry Management", "Responsive Frontend", "SEO Structure"],
    source: "InnovationPixel portfolio record",
  },
  {
    name: "Petroc Energy",
    url: "https://petrocenergy.com/",
    image:
      "https://res.cloudinary.com/dsjxs1umc/image/upload/v1760479830/gqv6hejxtb69zpzga5c3.png",
    services: ["Corporate Website", "HTML / CSS", "Bootstrap", "Responsive Development", "Performance"],
    source: "InnovationPixel portfolio record",
  },
  {
    name: "Pinnacle Design Agency",
    url: "https://www.pinnacledesignagency.com/",
    image:
      "https://res.cloudinary.com/dsjxs1umc/image/upload/v1760479676/hrui65r8hmzdoheegqgw.png",
    services: ["PHP Development", "Agency Website", "Bootstrap", "Responsive UI", "SEO"],
    source: "InnovationPixel portfolio record",
  },
  {
    name: "ABET Global",
    url: "https://abetglobal.com/",
    image:
      "https://res.cloudinary.com/dsjxs1umc/image/upload/v1760477365/fxoqhkisj6eemx0a8vxy.png",
    services: ["Laravel Development", "Corporate Platform", "CMS Structure", "Responsive UI", "Regional SEO"],
    source: "InnovationPixel portfolio record",
  },
  {
    name: "Vampire Tools",
    url: "https://vampiretools.com/",
    image:
      "https://res.cloudinary.com/dsjxs1umc/image/upload/v1760473074/ihvkr9eublhgfwxbksqy.png",
    services: ["WordPress", "WooCommerce", "E-commerce Development", "Product UX", "SEO Schema"],
    source: "InnovationPixel portfolio record",
  },
  {
    name: "Jobee",
    url: "https://jobee.innovationpixel.com/",
    services: ["Job Board", "Web Development", "Search Experience", "Listings", "Responsive UI"],
    source: "InnovationPixel hosted build",
    livePreview: true,
  },
  {
    name: "Oxford Ghostwriting",
    url: "https://oxford.innovationpixel.com/",
    services: ["Service Website", "Publishing Services", "Lead Generation", "Responsive Development", "Content Architecture"],
    source: "InnovationPixel hosted build",
    livePreview: true,
  },
  {
    name: "Dissertation Lord",
    url: "https://www.disser.innovationpixel.com/",
    services: ["Academic Services", "Lead Generation", "Responsive Website", "Forms", "Content-led UX"],
    source: "InnovationPixel hosted build",
    livePreview: true,
  },
  {
    name: "Dynamic Fascia",
    url: "https://fasciau.innovationpixel.com/",
    services: ["Education Platform", "Course Content", "Enquiry Flows", "Responsive Development", "Content System"],
    source: "InnovationPixel hosted build",
    livePreview: true,
  },
];

function LiveProjectPreview({ project }) {
  if (project.image) {
    return (
      <img
        className={styles.previewImage}
        src={project.image}
        alt={`${project.name} website preview`}
        loading="lazy"
        decoding="async"
      />
    );
  }

  return (
    <iframe
      className={styles.previewFrame}
      src={project.url}
      title={`${project.name} website preview`}
      loading="lazy"
      tabIndex={-1}
      aria-hidden="true"
    />
  );
}

export default function ProjectsSection() {
  const [open, setOpen] = useState(false);

  return (
    <section className={styles.section} id="projects" aria-labelledby="projects-title">
      <div className={styles.inner}>
        <header className={styles.header}>
          <div>
            <span className={styles.eyebrow}>Selected work</span>
            <h2 className={styles.title} id="projects-title">
              Projects built for <em>real use.</em>
            </h2>
          </div>

          <div className={styles.headerSide}>
            <p className={styles.copy}>
              Production websites, commerce builds and custom platforms across
              business, education, services and digital products.
            </p>
            <button
              className={styles.toggle}
              type="button"
              aria-expanded={open}
              aria-controls="all-projects-list"
              onClick={() => setOpen((value) => !value)}
            >
              <span>{open ? "Hide projects" : "View more projects"}</span>
              <span className={styles.toggleIcon} aria-hidden="true">↓</span>
            </button>
          </div>
        </header>

        <div className={styles.listWrap} data-open={open ? "true" : "false"}>
          <div className={styles.listClip}>
            <div className={styles.list} id="all-projects-list">
              {projects.map((project, index) => (
                <article className={styles.row} key={project.name}>
                  <div className={styles.identity}>
                    <span className={styles.number}>
                      ({String(index + 1).padStart(2, "0")})
                    </span>
                    <h3 className={styles.name}>{project.name}</h3>
                    <span className={styles.source}>{project.source}</span>
                  </div>

                  <div className={styles.services} aria-label={`${project.name} services`}>
                    {project.services.map((service) => (
                      <span key={service}>{service}</span>
                    ))}
                  </div>

                  <a
                    className={styles.visualLink}
                    href={project.url}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`Open ${project.name} website`}
                  >
                    <LiveProjectPreview project={project} />
                    <span className={styles.previewShade} aria-hidden="true" />
                  </a>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
