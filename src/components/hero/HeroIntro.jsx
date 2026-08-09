import clsx from "clsx";
import { heroReveal } from "./heroMotion";
import styles from "./HeroIntro.module.css";

export default function HeroIntro() {
  return (
    <>
      <span className={clsx(heroReveal("delay-[80ms]"), styles.kicker)}>
        <span className={styles.kickerMark}>MERN</span>
        Full-Stack Development
      </span>

      <div className={clsx(heroReveal("delay-[120ms]"), styles.headingWrap)}>
        <h1 className={styles.heading}>
          Full-Stack Web
          <span>Starts Here</span>
        </h1>
      </div>
    </>
  );
}
