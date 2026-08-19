import { cldUrl } from "../../lib/cloudinary";
import AboutGlobe from "./AboutGlobe";
import styles from "./About.module.css";
import themeStyles from "./AboutBlueTheme.module.css";
import logoStyles from "./ToolLogos.module.css";
import bioStyles from "./DeveloperBio.module.css";

const PORTRAIT = cldUrl("portrait");

const stats = [
  { value: "4+", label: "Years of experience" },
  { value: "30+", label: "Projects delivered" },
  { value: "A–Z", label: "Design to deployment" },
];

const tools = [
  {
    label: "React",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg",
  },
  {
    label: "JavaScript",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg",
  },
  {
    label: "TypeScript",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg",
  },
  {
    label: "Node.js",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg",
  },
  { label: "Express", logo: "https://cdn.simpleicons.org/express/FFFFFF" },
  {
    label: "MongoDB",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg",
  },
  {
    label: "MySQL",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg",
  },
  {
    label: "PostgreSQL",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg",
  },
  {
    label: "Firebase",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/firebase/firebase-original.svg",
  },
  {
    label: "WordPress",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/wordpress/wordpress-plain.svg",
  },
  {
    label: "WooCommerce",
    logo: "https://cdn.simpleicons.org/woocommerce/96588A",
  },
  {
    label: "PHP",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/php/php-original.svg",
  },
  {
    label: "HTML5",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg",
  },
  {
    label: "CSS3",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg",
  },
  {
    label: "Tailwind CSS",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg",
  },
  {
    label: "Bootstrap",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/bootstrap/bootstrap-original.svg",
  },
  {
    label: "Sass",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/sass/sass-original.svg",
  },
  {
    label: "Vite",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vitejs/vitejs-original.svg",
  },
  { label: "Next.js", logo: "https://cdn.simpleicons.org/nextdotjs/FFFFFF" },
  {
    label: "Redux",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/redux/redux-original.svg",
  },
  {
    label: "Docker",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg",
  },
  { label: "Postman", logo: "https://cdn.simpleicons.org/postman/FF6C37" },
  {
    label: "Git",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg",
  },
  { label: "GitHub", logo: "https://cdn.simpleicons.org/github/FFFFFF" },
  {
    label: "npm",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/npm/npm-original-wordmark.svg",
  },
  {
    label: "Linux",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/linux/linux-original.svg",
  },
  {
    label: "Figma",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg",
  },
  {
    label: "Nginx",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nginx/nginx-original.svg",
  },
];

const showcaseAsset =
  "https://framerusercontent.com/images/9MGIf21V2NJoMgEdygDwEv9OvRQ.png?width=2048&height=2080";

function ToolLogo({ tool, duplicate = false }) {
  return (
    <div
      className={logoStyles.tool}
      aria-label={duplicate ? undefined : tool.label}
      aria-hidden={duplicate || undefined}
    >
      <span className={logoStyles.logoWrap}>
        <img
          className={logoStyles.logo}
          src={tool.logo}
          alt={duplicate ? "" : `${tool.label} logo`}
          loading="lazy"
          decoding="async"
        />
      </span>
    </div>
  );
}

export default function StoktAbout() {
  return (
    <section
      className={`${styles.section} ${bioStyles.aboutAmbient}`}
      id="about"
      aria-labelledby="stokt-about-title"
    >
      <span id="about-us" className={styles.anchor} aria-hidden="true" />

      <div className={styles.inner}>
        <div className={styles.eyebrowRow}>
          <span className={styles.eyebrow}>( About me )</span>
          <span className={styles.arrow} aria-hidden="true">
            ↓
          </span>
        </div>

        <h2 id="stokt-about-title" className={styles.srOnly}>
          About Muhammad Wasif
        </h2>

        <div className={styles.aboutTop}>
          <div className={styles.stats} aria-label="Professional highlights">
            {stats.map((stat) => (
              <article className={styles.statCard} key={stat.label}>
                <strong>{stat.value}</strong>
                <span>{stat.label}</span>
              </article>
            ))}
          </div>

          <article className={styles.showcaseCard}>
            <img src={showcaseAsset} alt="" loading="lazy" decoding="async" />
            <div className={styles.showcaseMeta}>
              <strong>Full-Stack Systems</strong>
              <span>
                Frontend, backend and production delivery{" "}
                <b aria-hidden="true">→</b>
              </span>
            </div>
          </article>

          <article className={styles.locationCard}>
            <div className={styles.locationCopy}>
              <h3>Working remotely, worldwide</h3>
              <span className={styles.status}>
                <i aria-hidden="true" /> AVAILABLE WORLDWIDE
              </span>
            </div>
            <AboutGlobe />
          </article>
        </div>

        <div
          className={`${styles.aboutBottom} ${logoStyles.aboutBottomTwoCol}`}
        >
          <article
            className={`${styles.profileCard} ${themeStyles.blueProfile}`}
          >
            <div
              className={`${styles.profileGlow} ${themeStyles.blueProfileGlow}`}
              aria-hidden="true"
            />
            <img src={PORTRAIT} alt="Muhammad Wasif" draggable="false" />
            <div
              className={`${styles.profileMeta} ${themeStyles.blueProfileMeta}`}
            >
              <strong>Muhammad Wasif</strong>
              <span>FULL-STACK WEB DEVELOPER</span>
            </div>
          </article>

          <article
            className={`${styles.bioCard} ${logoStyles.bioCompact} ${bioStyles.editorialBio}`}
          >
            <div className={bioStyles.codeOrb} aria-hidden="true">
              &lt;/&gt;
            </div>

            <p className={bioStyles.editorialStatement}>
              I turn <strong>business ideas</strong> into complete web products
              with clear interfaces, dependable backends and{" "}
              <strong>maintainable code</strong>. My focus is simple: build
              experiences that are fast, useful and ready for{" "}
              <strong>real people.</strong>
            </p>

            <div className={bioStyles.editorialAuthor}>
              <span className={bioStyles.editorialAvatar}>
                <img src={PORTRAIT} alt="" aria-hidden="true" />
              </span>
              <span className={bioStyles.editorialAuthorCopy}>
                <strong>Muhammad Wasif</strong>
                <small>Full-Stack Web Developer</small>
              </span>
            </div>
          </article>

          <article
            className={`${styles.toolboxCard} ${themeStyles.blueToolbox} ${logoStyles.toolboxDockCard} ${logoStyles.toolboxFullRow}`}
          >
            <div className={logoStyles.dockStage}>
              <div className={logoStyles.carousel} aria-label="Everyday tools">
                <div className={logoStyles.track}>
                  <div className={logoStyles.group}>
                    {tools.map((tool) => (
                      <ToolLogo key={`primary-${tool.label}`} tool={tool} />
                    ))}
                  </div>
                  <div className={logoStyles.group} aria-hidden="true">
                    {tools.map((tool) => (
                      <ToolLogo
                        key={`duplicate-${tool.label}`}
                        tool={tool}
                        duplicate
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
