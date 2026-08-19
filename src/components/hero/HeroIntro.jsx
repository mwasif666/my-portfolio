import clsx from "clsx";
import { heroReveal } from "./heroMotion";
import styles from "./HeroIntro.module.css";

export default function HeroIntro() {
  return (
    <>
      <span className={clsx(heroReveal("delay-[80ms]"), styles.kicker)}>
        <span className={styles.kickerMark}>Full-Stack</span>
        Web Development
      </span>

      <div className={clsx(heroReveal("delay-[120ms]"), styles.headingWrap)}>
        <h1 className={styles.heading}>
          Web Products
          <span>Built to Perform</span>
        </h1>
      </div>
    </>
  );
}
