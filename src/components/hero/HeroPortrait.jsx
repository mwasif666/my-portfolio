import clsx from "clsx";
import { cldUrl } from "../../lib/cloudinary";
import bannerStyles from "../KontourBanner.module.css";
import styles from "./HeroPortrait.module.css";
import { heroReveal } from "./heroMotion";

const PORTRAIT = cldUrl("portrait");

export default function HeroPortrait() {
  return (
    <div className={clsx(heroReveal("delay-[200ms]"), styles.wrap)}>
      <div className={styles.glow} aria-hidden="true" />
      <div className={styles.rim} aria-hidden="true" />
      <img
        src={PORTRAIT}
        alt="Muhammad Wasif, front-end and full-stack web developer in Karachi"
        draggable="false"
        decoding="async"
        fetchpriority="high"
        className={clsx(bannerStyles.portraitImg, styles.image)}
      />
    </div>
  );
}
