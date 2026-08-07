import { useRef } from "react";
import NoiseDarkBlueGradientWithSquares from "./ui/noise-dark-blue-gradient-with-squares";
import GitHubActivity from "./GitHubActivity";
import { useInView } from "../hooks/useInView";
import myImg from "../../myimg.png";
import styles from "./KontourBanner.module.css";

const ArrowUpRight = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M7 17 17 7M8 7h9v9" />
  </svg>
);

const Play = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="m9 7 8 5-8 5V7Z" />
  </svg>
);

const stats = [
  { value: "30+", label: "Projects delivered" },
  { value: "4+", label: "Years building" },
  { value: "100%", label: "Full-stack delivery" },
];

export default function KontourBanner({ onContact, id = "home", theme = "orange" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { threshold: 0.2 });

  return (
    <section
      ref={ref}
      className={`kontour portfolio-banner portfolio-banner--${theme} ${styles.hero}${inView ? ` in ${styles.in}` : ""}`}
      id={id}
    >
      {theme === "blue" && (
        <div className={`portfolio-loader-background ${styles.background}`} aria-hidden="true">
          <NoiseDarkBlueGradientWithSquares
            direction="diagonal"
            speed={0.35}
            squareSize={54}
            borderColor="rgba(255,255,255,0.08)"
            vignette
          />
        </div>
      )}

      <div className={styles.light} aria-hidden="true" />

      <div className={styles.layout}>
        <div className={styles.headingBlock}>
          <span className={styles.kicker}>MERN / Full-Stack Development</span>
          <h1>
            Full-Stack Web
            <span>Starts Here</span>
          </h1>
        </div>

        <div className={styles.portraitWrap}>
          <img src={myImg} alt="Muhammad Wasif, full-stack web developer" draggable="false" />
          <button className={styles.orbitCta} type="button" onClick={onContact} aria-label="Start a project with Muhammad Wasif">
            <ArrowUpRight />
            <span>Start now</span>
          </button>
        </div>

        <div className={styles.stats} aria-label="Professional highlights">
          {stats.map((stat) => (
            <div className={styles.stat} key={stat.label}>
              <strong>{stat.value}</strong>
              <span>{stat.label}</span>
            </div>
          ))}
        </div>

        <div className={styles.pitch}>
          <p>
            I design and develop responsive interfaces, robust APIs and scalable
            web products—from the first idea to production deployment.
          </p>
          <div className={styles.actions}>
            <button className={styles.primary} type="button" onClick={onContact}>
              <ArrowUpRight />
              Start a project
            </button>
            <a href="#projects" className={styles.secondary}>
              <Play />
              View projects
            </a>
          </div>
        </div>

        <div className={styles.activity}>
          <GitHubActivity username="mwasif666" />
        </div>
      </div>
    </section>
  );
}
