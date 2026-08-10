import myImg from "../../../myimg.png";
import styles from "./About.module.css";

const stats = [
  { value: "4+", label: "Years building" },
  { value: "30+", label: "Projects delivered" },
  { value: "100%", label: "Full-stack focus" },
];

const tools = [
  "React",
  "Node.js",
  "Express",
  "MongoDB",
  "JavaScript",
  "WordPress",
  "WooCommerce",
  "REST APIs",
];

export default function StoktAbout({ onContact }) {
  return (
    <section className={styles.section} id="about" aria-labelledby="stokt-about-title">
      <span id="about-us" className={styles.anchor} aria-hidden="true" />

      <div className={styles.inner}>
        <div className={styles.eyebrowRow}>
          <span>( About me )</span>
          <span className={styles.arrow} aria-hidden="true">↓</span>
        </div>

        <h2 id="stokt-about-title" className={styles.srOnly}>About Muhammad Wasif</h2>

        <div className={styles.bento}>
          <div className={styles.stats} aria-label="Professional highlights">
            {stats.map((stat) => (
              <article className={styles.statCard} key={stat.label}>
                <strong>{stat.value}</strong>
                <span>{stat.label}</span>
              </article>
            ))}
          </div>

          <article className={styles.availabilityCard}>
            <div className={styles.availabilityTop}>
              <span className={styles.mutedLabel}>Remote collaboration</span>
              <span className={styles.status}>
                <i aria-hidden="true" /> Available
              </span>
            </div>
            <div className={styles.globe} aria-hidden="true">
              <span />
              <span />
              <span />
            </div>
            <h3>Available worldwide</h3>
            <p>Flexible collaboration across time zones for product and web projects.</p>
          </article>

          <article className={styles.profileCard}>
            <div className={styles.profileGlow} aria-hidden="true" />
            <img src={myImg} alt="Muhammad Wasif" draggable="false" />
            <div className={styles.profileMeta}>
              <strong>Muhammad Wasif</strong>
              <span>Full-Stack Web Developer</span>
            </div>
          </article>

          <article className={styles.bioCard}>
            <div className={styles.bioHeader}>
              <span>The Developer</span>
              <span className={styles.bioMark}>W.</span>
            </div>

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
                I stay close to the full product lifecycle—from the first layout
                and interaction idea through deployment, QA and iteration.
              </p>
            </div>

            <button type="button" className={styles.workButton} onClick={onContact}>
              Work with Wasif <span aria-hidden="true">↗</span>
            </button>
          </article>

          <article className={styles.toolboxCard}>
            <div className={styles.toolboxHeader}>
              <span>Everyday&apos;s Toolbox</span>
              <small>Built for every project.</small>
            </div>

            <div className={styles.marquee} aria-hidden="true">
              <div className={styles.marqueeTrack}>
                {[...tools, ...tools].map((tool, index) => (
                  <span className={styles.tool} key={`${tool}-${index}`}>{tool}</span>
                ))}
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
