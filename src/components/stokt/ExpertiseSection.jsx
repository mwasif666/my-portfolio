import ServiceCard from "./ServiceCard";
import styles from "./Expertise.module.css";

const services = [
  {
    number: "01",
    title: ["Web", "Design", "&", "Dev"],
    video: "https://stokt.b-cdn.net/KEYCAPS-loop-01-.webm",
    poster:
      "https://framerusercontent.com/images/fsnxfPl4xnUJdyQSiOcHEYxg.png?width=1080&height=1080",
  },
  {
    number: "02",
    title: ["Full-Stack", "Systems"],
    video: "https://stokt.b-cdn.net/robot-hand-v1-%203-alpha%20(1).webm",
    poster:
      "https://framerusercontent.com/images/o5rue2juXI7jXmJGLCQ0tEIHzw.png?width=1000&height=1000",
  },
  {
    number: "03",
    title: ["APIs", "&", "Performance"],
    video: "https://stokt.b-cdn.net/skate-wheel-black-01_alpha.webm",
    poster:
      "https://framerusercontent.com/images/oxZu28Q6bOJFLSa6KzaVpa1ZuI.png?width=800&height=800",
  },
];

// Uneven drift rates so the three cards never move as one block.
const CARD_PARALLAX = [0.06, 0.12, 0.08];

export default function ExpertiseSection() {
  return (
    <section className={styles.section} id="services" aria-labelledby="stokt-services-title">
      <div className={styles.inner}>
        <div className={styles.eyebrowRow}>
          <span>( Services &amp; Expertise )</span>
          <span className={styles.arrow} aria-hidden="true">↓</span>
        </div>

        {/* Locomotive drives these: the heading drifts a touch slower than the
            page, the lead a touch faster, which opens the pair apart on scroll.
            Neither element carries a transform of its own, so nothing fights. */}
        <div className={styles.introGrid}>
          <h2
            id="stokt-services-title"
            className={styles.heading}
            data-scroll
            data-scroll-speed="0.08"
          >
            Digital Product Powerhouse
          </h2>
          <p className={styles.lead} data-scroll data-scroll-speed="-0.05">
            I combine interface design, frontend engineering and backend systems
            to build complete digital products with a strong focus on motion,
            clarity and production-ready performance.
          </p>
        </div>

        <div className={styles.cards}>
          {services.map((service, index) => (
            <ServiceCard
              key={service.number}
              service={service}
              speed={CARD_PARALLAX[index] ?? 0}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
