import { Fragment, useEffect, useLayoutEffect, useRef, useState } from "react";
import { useScroll } from "../contexts/ScrollContext";
import { cldUrl, cldVideoSources } from "../lib/cloudinary";
import styles from "./ProjectsShowcase.module.css";

// Screen recordings play at this rate — the capture is a slow scroll-through
// and reads as sluggish at 1x inside a small card.
const PREVIEW_PLAYBACK_RATE = 1.5;

const projects = [
  {
    name: "Hierys",
    url: "https://hierys.com/",
    video: cldVideoSources("projects/hierys"),
    // Read off the site's own bundle rather than guessed: react-dom + 53
    // useState calls, 206 `--tw-` custom properties in the stylesheet, 55 gsap
    // references with ScrollTrigger, and react-router in the chunk.
    services: ["React & Vite", "Tailwind CSS", "GSAP ScrollTrigger", "Agency Website", "Responsive UI"],
  },
  {
    name: "Econetix",
    url: "https://econetix.net/",
    image: "https://res.cloudinary.com/agymx2xx/image/upload/v1787152967/8645b931-5272-4f2f-a435-943e838018c6.png",
    services: ["WordPress", "Elementor", "Advanced Custom Fields", "GSAP Animations", "Responsive Development"],
  },
  {
    name: "Offplan DXB",
    url: "https://offplandxb.ae/",
    image: cldUrl("projects/offplan-dxb"),
    services: ["Laravel Development", "Property Search", "Inquiry Management", "Responsive Frontend", "SEO Structure"],
  },
  {
    name: "Petroc Energy",
    url: "https://petrocenergy.com/",
    image: cldUrl("projects/petroc-energy"),
    services: ["Corporate Website", "HTML / CSS", "Bootstrap", "Responsive Development", "Performance"],
  },
  {
    name: "Pinnacle Design Agency",
    url: "https://www.pinnacledesignagency.com/",
    image: cldUrl("projects/pinnacle"),
    services: ["PHP Development", "Agency Website", "Bootstrap", "Responsive UI", "SEO"],
  },
  {
    name: "ABET Global",
    url: "https://abetglobal.com/",
    image: cldUrl("projects/abet-global"),
    services: ["Laravel Development", "Corporate Platform", "CMS Structure", "Responsive UI", "Regional SEO"],
  },
  {
    name: "Vampire Tools",
    url: "https://vampiretools.com/",
    image: cldUrl("projects/vampire-tools"),
    services: ["WordPress", "WooCommerce", "E-commerce Development", "Product UX", "SEO Schema"],
  },
  {
    name: "Oxford Ghostwriting",
    url: "https://oxford.innovationpixel.com/",
    services: ["Service Website", "Publishing Services", "Lead Generation", "Responsive Development", "Content Architecture"],
    livePreview: true,
  },
  {
    name: "Dissertation Lord",
    url: "https://www.disser.innovationpixel.com/",
    services: ["Academic Services", "Lead Generation", "Responsive Website", "Forms", "Content-led UX"],
    livePreview: true,
  },
  {
    name: "Dynamic Fascia",
    url: "https://fasciau.innovationpixel.com/",
    services: ["Education Platform", "Course Content", "Enquiry Flows", "Responsive Development", "Content System"],
    livePreview: true,
  },
];

const INITIAL_PROJECT_COUNT = 6;

/* Play previews only while their project card is actually in view. */
function ProjectVideo({ project }) {
  const ref = useRef(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return undefined;
    const card = video.closest("article") ?? video;
    let cardVisible = false;

    const applyRate = () => {
      video.playbackRate = PREVIEW_PLAYBACK_RATE;
    };

    const syncPlayback = () => {
      if (!cardVisible || document.hidden) {
        video.pause();
        return;
      }

      applyRate();
      const playRequest = video.play();
      if (playRequest) playRequest.catch(() => {});
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        cardVisible = entry.isIntersecting && entry.intersectionRatio >= 0.3;
        syncPlayback();
      },
      { threshold: [0, 0.3] },
    );

    applyRate();
    video.pause();
    video.addEventListener("loadedmetadata", applyRate);
    document.addEventListener("visibilitychange", syncPlayback);
    observer.observe(card);

    return () => {
      observer.disconnect();
      video.pause();
      video.removeEventListener("loadedmetadata", applyRate);
      document.removeEventListener("visibilitychange", syncPlayback);
    };
  }, []);

  return (
    <video
      ref={ref}
      className={styles.previewVideo}
      muted
      loop
      playsInline
      preload="metadata"
      tabIndex={-1}
      aria-label={`${project.name} website preview`}
    >
      {project.video.map((source) => (
        <source key={source.type} src={source.src} type={source.type} />
      ))}
    </video>
  );
}

function LiveProjectPreview({ project }) {
  if (project.video) {
    return <ProjectVideo project={project} />;
  }

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

function ProjectRow({ project, index, revealed }) {
  return (
    <article
      className={`${styles.row}${revealed ? ` ${styles.revealed}` : ""}`}
      // Each card sticks a little lower than the one before it, so the stack
      // keeps a visible edge of everything already passed.
      style={{ "--i": index }}
    >
      <div className={styles.identity}>
        <span className={styles.number}>
          ({String(index + 1).padStart(2, "0")})
        </span>
        {/* One word per line — a plain wrap would break wherever the column
            happens to run out, which is not the same thing. The spaces are kept
            as real text nodes so the heading still reads as a sentence to a
            screen reader; between block spans they collapse to nothing. */}
        <h3 className={styles.name}>
          {project.name.split(" ").map((word, wordIndex) => (
            <Fragment key={word}>
              {wordIndex > 0 ? " " : null}
              <span>{word}</span>
            </Fragment>
          ))}
        </h3>
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
  );
}

export default function ProjectsSection() {
  const [open, setOpen] = useState(false);
  const { scrollToY } = useScroll();
  const toggleRef = useRef(null);
  const anchorTopRef = useRef(null);
  const visibleProjects = open ? projects : projects.slice(0, INITIAL_PROJECT_COUNT);
  const hasMore = projects.length > INITIAL_PROJECT_COUNT;

  const handleToggle = () => {
    // Only collapsing needs pinning. Expanding inserts the new rows directly
    // below what the visitor is already looking at and pushes the button down
    // past them, which is the point of pressing it.
    anchorTopRef.current = open
      ? toggleRef.current?.getBoundingClientRect().top ?? null
      : null;
    setOpen((value) => !value);
  };

  // Collapsing takes rows out from *above* the button, so everything below
  // jumps up by their height and the visitor is left somewhere they never
  // scrolled to. Put the button back on the spot it already occupied.
  useLayoutEffect(() => {
    const before = anchorTopRef.current;
    if (before === null) return;
    anchorTopRef.current = null;

    const after = toggleRef.current?.getBoundingClientRect().top;
    if (after === undefined || after === before) return;
    scrollToY(window.scrollY + (after - before));
  }, [open, scrollToY]);

  return (
    <section className={styles.section} id="projects" aria-labelledby="projects-title">
      <div className={styles.inner}>
        <header className={styles.header}>
          <div>
            <span className={styles.eyebrow}>Selected work</span>
            <h2 className={styles.title} id="projects-title">
              Work built for <em>real businesses.</em>
            </h2>
          </div>

          <div className={styles.headerSide}>
            <p className={styles.copy}>
              A selection of websites, e-commerce experiences and custom
              platforms I have delivered across different industries.
            </p>
          </div>
        </header>

        {/* One list, always. The extra projects join the stack in place rather
            than opening in a drawer underneath the button. */}
        <div className={styles.list} id="projects-list">
          {visibleProjects.map((project, index) => (
            <ProjectRow
              project={project}
              index={index}
              revealed={index >= INITIAL_PROJECT_COUNT}
              key={project.name}
            />
          ))}
        </div>

        {hasMore ? (
          <div className={styles.moreToggleRow}>
            <button
              ref={toggleRef}
              className={styles.toggle}
              type="button"
              aria-expanded={open}
              aria-controls="projects-list"
              onClick={handleToggle}
            >
              <span>{open ? "Show fewer projects" : "View more projects"}</span>
              <span className={styles.toggleIcon} aria-hidden="true">↓</span>
            </button>
          </div>
        ) : null}
      </div>
    </section>
  );
}
