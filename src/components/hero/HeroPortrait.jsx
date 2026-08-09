import clsx from "clsx";
import myImg from "../../../myimg.png";
import styles from "../KontourBanner.module.css";
import { heroReveal } from "./heroMotion";
import "./HeroPortrait.css";

export default function HeroPortrait() {
  return (
    <div
      className={clsx(
        heroReveal("delay-[200ms]"),
        "pointer-events-none relative order-2 -mt-7 -mb-14 h-164 w-[132%]",
        "max-[520px]:-mb-10 max-[520px]:h-120 max-[520px]:w-[138%]",
        "min-[901px]:absolute min-[901px]:z-[6] min-[901px]:m-0",
        "min-[901px]:left-[clamp(2rem,13.5vw,18rem)] min-[901px]:-bottom-12",
        "min-[901px]:aspect-[887/882] min-[901px]:h-[min(100vh,36rem_+_23vw,64rem)] min-[901px]:w-auto",
      )}
    >
      <div
        className="heroPortrait__glow absolute inset-[14%_5%_5%] opacity-90"
        aria-hidden="true"
      />
      <div className="heroPortrait__rim" aria-hidden="true" />
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
