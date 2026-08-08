import { Code2 } from "lucide-react";
import myImg from "../../myimg.png";

export default function AboutSection({ id = "about", className = "" }) {
  return (
    <section className={`about-story ${className}`.trim()} id={id}>
      <div className="about-story__noise" aria-hidden="true" />
      <div className="about-story__glow" aria-hidden="true" />

      <div className="about-story__label">
        <span className="about-story__label-orb" aria-hidden="true">
          <i />
        </span>
        <span>About Me</span>
      </div>

      <div className="about-story__inner">
        <div className="about-story__body">
          <div className="about-story__code-orb" aria-hidden="true">
            <Code2 />
          </div>

          <p className="about-story__statement">
            Building <span>digital products</span> through thoughtful interfaces,
            reliable systems, <span>clean engineering</span>, and
            performance-focused experiences that <span>work beautifully.</span>
          </p>

          <div className="about-story__profile">
            <div className="about-story__avatar">
              <img src={myImg} alt="Muhammad Wasif" draggable="false" />
            </div>

            <div className="about-story__profile-copy">
              <strong>Muhammad Wasif</strong>
              <span>Full-Stack Web Developer</span>
            </div>
          </div>
        </div>
      </div>

      <div className="about-story__meta" aria-hidden="true">
        <span>DESIGN</span>
        <i />
        <span>DEVELOPMENT</span>
        <i />
        <span>PERFORMANCE</span>
      </div>
    </section>
  );
}
