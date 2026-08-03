import { useEffect, useRef } from "react";
import { ArrowUpRight, Code2, Gauge, Layers3 } from "lucide-react";
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

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

export default function AboutSection() {
  const sectionRef = useRef(null);
  const frameRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const frame = frameRef.current;
    if (!section || !frame) return undefined;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    let animationFrame = 0;

    const update = () => {
      animationFrame = 0;

      if (reduceMotion || window.innerWidth <= 900) {
        frame.style.setProperty("--about-scale", "1");
        frame.style.setProperty("--about-radius", "0px");
        frame.style.setProperty("--about-inset", "0px");
        frame.style.setProperty("--about-lift", "0px");
        frame.style.setProperty("--about-content-opacity", "1");
        return;
      }

      const rect = section.getBoundingClientRect();
      const scrollableDistance = Math.max(
        section.offsetHeight - window.innerHeight,
        1,
      );
      const rawProgress = -rect.top / scrollableDistance;
      const progress = clamp(rawProgress, 0, 1);
      const reveal = clamp(progress / 0.62, 0, 1);
      const eased = 1 - Math.pow(1 - reveal, 3);

      frame.style.setProperty(
        "--about-scale",
        (0.88 + eased * 0.12).toFixed(4),
      );
      frame.style.setProperty(
        "--about-radius",
        `${(34 - eased * 34).toFixed(2)}px`,
      );
      frame.style.setProperty(
        "--about-inset",
        `${(28 - eased * 28).toFixed(2)}px`,
      );
      frame.style.setProperty(
        "--about-lift",
        `${(72 - eased * 72).toFixed(2)}px`,
      );
      frame.style.setProperty(
        "--about-content-opacity",
        clamp((progress - 0.08) / 0.28, 0, 1).toFixed(3),
      );
    };

    const requestUpdate = () => {
      if (animationFrame) return;
      animationFrame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    return () => {
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      if (animationFrame) window.cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <section className="about-wrap-track" id="about" ref={sectionRef}>
      <div className="about-wrap-sticky">
        <div className="about-wrap-frame" ref={frameRef}>
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
                  scalable and dependable digital experiences from front end
                  to back end.
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

            <article className="about-feature-card">
              <div className="about-card-topline">
                <span>FULL-STACK DELIVERY</span>
                <strong>30+ PROJECTS</strong>
              </div>

              <div className="about-card-chart" aria-hidden="true">
                <svg viewBox="0 0 520 330" preserveAspectRatio="none">
                  <path
                    className="about-chart-grid"
                    d="M0 48H520M0 118H520M0 188H520M0 258H520M66 0V330M132 0V330M198 0V330M264 0V330M330 0V330M396 0V330M462 0V330"
                  />
                  <path
                    className="about-chart-line"
                    d="M8 292 C72 286 92 272 132 244 S212 203 260 170 S341 125 392 88 S455 48 512 18"
                  />
                  <circle cx="512" cy="18" r="5" />
                </svg>
              </div>

              <div className="about-portrait-glow" aria-hidden="true" />
              <img
                className="about-card-portrait"
                src={myImg}
                alt="Muhammad Wasif, full-stack web developer"
                draggable="false"
              />

              <a
                className="about-linkedin-link"
                href="https://www.linkedin.com/in/muhammad-wasif-944741202/"
                target="_blank"
                rel="noreferrer"
              >
                <span>VIEW LINKEDIN PROFILE</span>
                <ArrowUpRight aria-hidden="true" />
              </a>
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
        </div>
      </div>
    </section>
  );
}
