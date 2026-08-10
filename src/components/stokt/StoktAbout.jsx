import myImg from "../../../myimg.png";
import AboutGlobe from "./AboutGlobe";
import styles from "./About.module.css";

const stats = [
  { value: "4+", label: "Years building" },
  { value: "30+", label: "Projects delivered" },
  { value: "100%", label: "Full-stack focus" },
];

const tools = [
  { short: "Re", label: "React" },
  { short: "JS", label: "JavaScript" },
  { short: "No", label: "Node.js" },
  { short: "Ex", label: "Express" },
  { short: "Mo", label: "MongoDB" },
  { short: "WP", label: "WordPress" },
  { short: "WC", label: "WooCommerce" },
  { short: "API", label: "REST APIs" },
];

const showcaseAsset =
  "https://framerusercontent.com/images/9MGIf21V2NJoMgEdygDwEv9OvRQ.png?width=2048&height=2080";
const expertAsset =
  "https://framerusercontent.com/images/BadwPM7OoanjNQF5nvMYcYQvtQ.png?width=2048&height=2048";

export default function StoktAbout({ onContact }) {
  return (
    <section className={styles.section} id="about" aria-labelledby="stokt-about-title">
      <span id="about-us" className={styles.anchor} aria-hidden="true" />

      <div className={styles.inner}>
        <div className={styles.eyebrowRow}>
          <span className={styles.eyebrow}>( About me )</span>
          <span className={styles.arrow} aria-hidden="true">↓</span>
        </div>

        <h2 id="stokt-about-title" className={styles.srOnly}>About Muhammad Wasif</h2>

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
              <span>Interfaces, backend and production delivery <b aria-hidden="true">→</b></span>
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

        <div className={styles.aboutBottom}>
          <article className={styles.profileCard}>
            <div className={styles.profileGlow} aria-hidden="true" />
            <img src={myImg} alt="Muhammad Wasif" draggable="false" />
            <div className={styles.profileMeta}>
              <strong>Muhammad Wasif</strong>
              <span>FULL-STACK WEB DEVELOPER</span>
            </div>
          </article>

          <article className={styles.bioCard}>
            <div className={styles.bioHeader}>The Developer</div>
            <div className={styles.bioCopy}>
              <p>
                I build responsive web experiences from interface to backend,
                combining clean visual systems with reliable application logic.
              </p>
              <p>
                My work spans React interfaces, APIs, databases, WordPress and
                commerce builds, with a focus on performance and maintainable code.
              </p>
              <p>
                From small builds to complete products, I stay close to the full
                lifecycle—from first layout and interaction through deployment,
                QA and iteration.
              </p>
            </div>
            <button type="button" className={styles.workButton} onClick={onContact}>
              Work with Wasif <span aria-hidden="true">→</span>
            </button>
          </article>

          <article className={styles.expertCard}>
            <img src={expertAsset} alt="" loading="lazy" decoding="async" />
            <div className={styles.expertMeta}>
              <strong>Interactive Systems</strong>
              <span>Motion-ready product experiences</span>
            </div>
          </article>

          <article className={styles.toolboxCard}>
            <div className={styles.toolboxHeader}>
              <span>Everyday&apos;s Toolbox</span>
              <small>Built for every project.</small>
            </div>

            <div className={styles.toolRow} aria-label="Everyday tools">
              {tools.map((tool) => (
                <div className={styles.tool} key={tool.label} title={tool.label}>
                  <strong>{tool.short}</strong>
                  <span>{tool.label}</span>
                </div>
              ))}
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
