import { useRef } from "react";
import Reveal from "./Reveal";
import NoiseDarkBlueGradientWithSquares from "./ui/noise-dark-blue-gradient-with-squares";
import { useInView } from "../hooks/useInView";
import myImg from "../../myimg.png";

const ArrowUpRight = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M7 17 17 7M8 7h9v9" />
  </svg>
);

const services = [
  {
    title: "Full-stack web apps",
    detail: "From polished front ends to dependable backends",
  },
  {
    title: "Fast on every screen",
    detail: "Responsive, accessible and performance-focused",
  },
  {
    title: "Ready for production",
    detail: "Scalable systems built to grow with your product",
  },
];

export default function KontourBanner({
  onContact,
  id = "home",
  theme = "orange",
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { threshold: 0.2 });

  return (
    <section
      ref={ref}
      className={`kontour portfolio-banner portfolio-banner--${theme}${
        inView ? " in" : ""
      }`}
      id={id}
    >
      {theme === "blue" && (
        <div className="portfolio-loader-background" aria-hidden="true">
          <NoiseDarkBlueGradientWithSquares
            direction="diagonal"
            speed={0.6}
            squareSize={44}
            borderColor="rgba(255,255,255,0.12)"
            vignette
          />
        </div>
      )}

      <div className="kontour-glow" aria-hidden="true" />
      <div className="portfolio-grid-lines" aria-hidden="true" />

      <div className="portfolio-hero-grid clean-hero-grid">
        <div className="portfolio-copy clean-hero-left">
          <Reveal as="span" className="clean-role-pill" move={10}>
            Full-Stack Web Developer
          </Reveal>

          <Reveal
            as="h1"
            className="clean-hero-title clean-hero-title--left"
            delay={70}
          >
            <span>Build fast.</span>
            <span>Scale smart.</span>
          </Reveal>

          <div className="clean-left-details">
            <Reveal className="clean-left-summary" delay={210}>
              <div className="clean-proof">
                <strong>30+</strong>
                <span>Digital projects delivered</span>
              </div>
              <p>
                Interfaces, APIs, databases and deployment — shaped into one
                clear, dependable product.
              </p>
            </Reveal>

            <button
              className="clean-portrait-cta"
              type="button"
              onClick={onContact}
              aria-label="Start a project with Muhammad Wasif"
            >
              <ArrowUpRight />
              <span>Start a project</span>
            </button>
          </div>
        </div>

        <div className="kontour-portrait clean-hero-portrait">
          <img
            src={myImg}
            alt="Muhammad Wasif, full-stack web developer"
            draggable="false"
          />
        </div>

        <aside className="portfolio-panel clean-hero-right">
          {/* Mirrors the role pill so both headlines share one baseline. */}
          <span className="clean-role-pill clean-role-pill--ghost" aria-hidden="true">
            Full-Stack Web Developer
          </span>

          <Reveal
            as="h2"
            className="clean-hero-title clean-hero-title--right"
            delay={110}
          >
            <span>From idea</span>
            <span>to production.</span>
          </Reveal>

          <Reveal as="ol" className="clean-service-list" delay={230}>
            {services.map((service, index) => (
              <li key={service.title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <p>
                  <strong>{service.title}</strong>
                  <small>{service.detail}</small>
                </p>
              </li>
            ))}
          </Reveal>
        </aside>

        <div className="portfolio-nameplate" aria-hidden="true">
          <span>Muhammad</span>
          <strong>Wasif</strong>
        </div>

        <div className="clean-scroll-cue" aria-hidden="true">
          Scroll to explore
        </div>
      </div>
    </section>
  );
}
