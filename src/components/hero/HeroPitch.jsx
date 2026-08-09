import clsx from "clsx";
import { heroReveal } from "./heroMotion";
import styles from "./HeroPitch.module.css";

const ArrowUpRight = () => (
  <svg
    className={styles.icon}
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

const Play = () => (
  <svg className={styles.icon} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="m9 7 8 5-8 5V7Z" />
  </svg>
);

export default function HeroPitch({ onContact }) {
  return (
    <div className={clsx(heroReveal("delay-[380ms]"), styles.root)}>
      <p className={styles.copy}>
        I design and develop responsive interfaces, robust APIs and scalable web
        products—from the first idea to production deployment.
      </p>

      <div className={styles.actions}>
        <button type="button" onClick={onContact} className={styles.primary}>
          <ArrowUpRight />
          Start a project
        </button>

        <a href="#projects" className={styles.secondary}>
          <Play />
          View projects
        </a>
      </div>
    </div>
  );
}
