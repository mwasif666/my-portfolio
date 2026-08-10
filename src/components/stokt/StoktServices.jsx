import ServiceCard from "./ServiceCard";
import styles from "./Services.module.css";

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

export default function StoktServices() {
  return (
    <section className={styles.section} id="services" aria-labelledby="stokt-services-title">
      <div className={styles.inner}>
        <div className={styles.eyebrowRow}>
          <span>( Services &amp; Expertise )</span>
          <span className={styles.arrow} aria-hidden="true">↓</span>
        </div>

        <div className={styles.introGrid}>
          <h2 id="stokt-services-title" className={styles.heading}>
            Digital Product Powerhouse
          </h2>
          <p className={styles.lead}>
            I combine interface design, frontend engineering and backend systems
            to build complete digital products with a strong focus on motion,
            clarity and production-ready performance.
          </p>
        </div>

        <div className={styles.cards}>
          {services.map((service) => (
            <ServiceCard key={service.number} service={service} />
          ))}
        </div>
      </div>
    </section>
  );
}
