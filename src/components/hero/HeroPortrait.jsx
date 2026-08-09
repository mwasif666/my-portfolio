import clsx from "clsx";
import myImg from "../../../myimg.png";
import styles from "../KontourBanner.module.css";
import { heroReveal } from "./heroMotion";

export default function HeroPortrait() {
  return (
    <div
      className={clsx(
        heroReveal("delay-[200ms]"),
        "pointer-events-none relative order-2 -mt-8 -mb-16 h-168 w-[136%]",
        "max-[520px]:-mb-12 max-[520px]:h-124",
        "min-[901px]:absolute min-[901px]:z-[6] min-[901px]:m-0",
        "min-[901px]:left-[clamp(0rem,12vw,18rem)] min-[901px]:-bottom-20",
        "min-[901px]:aspect-[887/882] min-[901px]:h-[min(110vh,39rem_+_25vw,70rem)] min-[901px]:w-auto",
      )}
    >
      <div
        className={clsx(styles.portraitGlow, "absolute inset-[15%_3%_2%] blur-[1.3rem]")}
        aria-hidden="true"
      />
      <img
        src={myImg}
        alt="Muhammad Wasif, full-stack web developer"
        draggable="false"
        decoding="async"
        fetchPriority="high"
        className={clsx(
          styles.portraitImg,
          "relative z-[2] h-full w-full object-contain object-bottom",
        )}
      />
    </div>
  );
}
