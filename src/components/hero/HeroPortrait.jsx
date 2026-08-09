import clsx from "clsx";
import myImg from "../../../myimg.png";
import bannerStyles from "../KontourBanner.module.css";
import styles from "./HeroPortrait.module.css";
import { heroReveal } from "./heroMotion";

export default function HeroPortrait() {
  return (
    <div className={clsx(heroReveal("delay-[200ms]"), styles.wrap)}>
      <div className={styles.glow} aria-hidden="true" />
      <div className={styles.rim} aria-hidden="true" />
      <img
        src={myImg}
        alt="Muhammad Wasif, full-stack web developer"
        draggable="false"
        decoding="async"
        fetchPriority="high"
        className={clsx(bannerStyles.portraitImg, styles.image)}
      />
    </div>
  );
}
