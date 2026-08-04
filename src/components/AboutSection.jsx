import { Code2, Gauge, Layers3 } from "lucide-react";
import myImg from "../../myimg.png";

const capabilities = [
  {
    number: "01",
    title: "End-to-end development",
    text: "From interface systems to APIs, databases and production deployment.",
    Icon: Layers3,
  },
  {
    number: "02",
    title: "Performance-first builds",
    text: "Fast, responsive experiences engineered around usability and Core Web Vitals.",
    Icon: Gauge,
  },
  {
    number: "03",
    title: "Clean, scalable code",
    text: "Maintainable foundations for startups, agencies and growing digital products.",
    Icon: Code2,
  },
];

export default function AboutSection({
  preview = false,
  id = "about",
  className = "",
}) {
  const classes = [
    "about-panel",
    preview ? "about-panel--preview" : "about-panel--final",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <section
      className={classes}
      id={preview ? undefined : id}
      aria-hidden={preview ? "true" : undefined}
    >
      <div className="about-blueprint" aria-hidden="true" />

      <div className="about-layout">
        <div className="about-intro">
          <span className="about-kicker">ABOUT / MUHAMMAD WASIF</span>
          <h2>
            Engineering
            <br />
            digital products.
          </h2>

          <div className="about-intro-copy">
            <p>
              I am a full-stack web developer focused on building fast,
              scalable and dependable digital experiences from front end to
              back end.
            </p>
            <p>
              My work combines thoughtful interfaces, practical backend
              architecture and performance-conscious implementation for
              startups, agencies and growing brands.
            </p>
          </div>

          <div className="about-meta-grid">
            <div>
              <span>BASED IN</span>
              <strong>Karachi, Pakistan</strong>
            </div>
            <div>
              <span>EXPERIENCE</span>
              <strong>4+ Years</strong>
            </div>
            <div>
              <span>DELIVERED</span>
              <strong>30+ Projects</strong>
            </div>
          </div>
        </div>

        <article className="about-feature-card" aria-label="Muhammad Wasif portrait">
          <div className="about-portrait-glow" aria-hidden="true" />
          <img
            className="about-card-portrait"
            src={myImg}
            alt="Muhammad Wasif, full-stack web developer"
            draggable="false"
          />
        </article>

        <div className="about-capabilities">
          {capabilities.map(({ number, title, text, Icon }) => (
            <article className="about-capability-card" key={number}>
              <div className="about-capability-copy">
                <span className="about-card-number">· {number}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
              <Icon className="about-capability-icon" aria-hidden="true" />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
