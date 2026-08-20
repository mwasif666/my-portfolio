import { Fragment, useEffect, useLayoutEffect, useRef, useState } from "react";
import { FlowButton } from "@/components/ui/flow-button";
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
    // Verified from the site's production bundle: React/Vite, Tailwind,
    // GSAP ScrollTrigger and react-router are all present.
    services: ["React", "Vite", "Tailwind CSS", "GSAP ScrollTrigger", "React Router"],
  },
  {
    name: "Econetix",
    url: "https://econetix.net/",
    image: "https://res.cloudinary.com/agymx2xx/image/upload/v1787152967/8645b931-5272-4f2f-a435-943e838018c6.png",
    services: ["WordPress", "Elementor", "Advanced Custom Fields", "GSAP", "Three.js"],
  },
  {
    name: "Offplan DXB",
    url: "https://offplandxb.ae/",
    image: cldUrl("projects/offplan-dxb"),
    // Project owner confirms the production backend is Laravel with MySQL.
    services: ["Laravel", "PHP", "MySQL", "JavaScript", "Google Tag Manager"],
  },
  {
    name: "Petroc Energy",
    url: "https://petrocenergy.com/",
    image: cldUrl("projects/petroc-energy"),
    // The live site exposes static .html routes; BuiltWith detects Formspree.
    services: ["HTML5", "CSS3", "JavaScript", "Formspree"],
  },
  {
    name: "Pinnacle Design Agency",
    url: "https://www.pinnacledesignagency.com/",
    image: cldUrl("projects/pinnacle"),
    // Public fingerprinting confirms tawk.to; unverified PHP/Bootstrap/CMS
    // implementation labels were removed rather than guessed.
    services: ["HTML5", "CSS3", "JavaScript", "tawk.to"],
  },
  {
    name: "ABET Global",
    url: "https://abetglobal.com/",
    image: cldUrl("projects/abet-global"),
    // Project owner confirms React/JavaScript on the frontend with ASP.NET
    // on the backend; IIS and Bootstrap are also present in production.
    services: ["React", "JavaScript", "ASP.NET", "Microsoft IIS", "Bootstrap"],
  },
  {
    name: "Vampire Tools",
    url: "https://vampiretools.com/",
    image: cldUrl("projects/vampire-tools"),
    // WooCommerce is verified through the live commerce UI and a detected
    // WooCommerce-specific WPC Frequently Bought Together installation.
    services: ["WordPress", "WooCommerce", "WPC Frequently Bought Together", "Google Tag Manager"],
  },
  {
    name: "ReactDeploy",
    url: "https://reactdeploy-topaz.vercel.app/",
    image: "https://res.cloudinary.com/dsjxs1umc/image/upload/v1760476956/xeehnphy66xfmqocq6nt.png",
    // Keep this conservative: React app deployed on Vercel; no guessed router
    // or build framework is displayed without a reliable production fingerprint.
    services: ["React", "JavaScript", "CSS3", "Vercel"],
  },
  {
    name: "Inner Beast",
    url: "https://innerbeast.co.uk/",
    image: "https://res.cloudinary.com/agymx2xx/image/upload/v1787153583/2717dcc1-d54d-4bfd-a686-8ae5b5ab09f4.png",
    // Project owner confirms this application uses the MERN stack.
    services: ["MongoDB", "Express.js", "React", "Node.js"],
  },
  {
    name: "PECO Engineering",
    url: "https://pecoengg.com/",
    image: "https://res.cloudinary.com/agymx2xx/image/upload/v1787153762/d0ed56f9-6be5-41df-88b3-2fb38bd6fe11.png",
    // BuiltWith identifies this production domain as a Create React App site.
    services: ["React", "Create React App", "JavaScript", "CSS3"],
  },
  {
    name: "Hope Plants Dubai",
    url: "https://hopeplantsdubai.com/",
    image: "https://res.cloudinary.com/dsjxs1umc/image/upload/v1760473976/colehff0isfg4wsowla3.png",
    // BuiltWith confirms Tagembed. The site's own privacy policy explicitly
    // confirms Google Ads/Analytics and Meta Pixel tracking.
    services: ["Tagembed", "Google Analytics", "Google Ads", "Meta Pixel"],
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
      style={{ "--i": index }}
    >
      <div className={styles.identity}>
        <span className={styles.number}>
          ({String(index + 1).padStart(2, "0")})
        </span>
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
    anchorTopRef.current = open
      ? toggleRef.current?.getBoundingClientRect().top ?? null
      : null;
    setOpen((value) => !value);
  };

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
            <FlowButton
              ref={toggleRef}
              text={open ? "Show fewer projects" : "View more projects"}
              tone="light"
              type="button"
              aria-expanded={open}
              aria-controls="projects-list"
              onClick={handleToggle}
              className="min-w-[13rem] max-[420px]:w-full"
            />
          </div>
        ) : null}
      </div>
    </section>
  );
}
