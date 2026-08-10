import { useRef } from "react";
import clsx from "clsx";
import { useInView } from "../hooks/useInView";
import HeroBackdrop from "./hero/HeroBackdrop";
import HeroIntro from "./hero/HeroIntro";
import HeroPortrait from "./hero/HeroPortrait";
import HeroStats from "./hero/HeroStats";
import HeroPitch from "./hero/HeroPitch";
import HeroActivity from "./hero/HeroActivity";
import styles from "./KontourBanner.module.css";

export default function KontourBanner({
  onContact,
  id = "home",
  theme = "orange",
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { threshold: 0.12 });
  const isBlue = theme === "blue";

  return (
    <section
      ref={ref}
      id={id}
      data-visible={inView ? "true" : undefined}
      className={clsx(
        "kontour portfolio-banner group relative overflow-hidden",
        `portfolio-banner--${theme}`,
        "bg-[#072b48] text-[#f5fbff] font-[Onest,sans-serif]",
        "min-[901px]:min-h-[100svh]",
      )}
    >
      {isBlue && <HeroBackdrop />}

      {!isBlue && (
        <>
          <div
            className={clsx(styles.tint, "pointer-events-none absolute inset-0 z-[1]")}
            aria-hidden="true"
          />
          <div
            className={clsx(styles.light, "pointer-events-none absolute inset-0 z-[1]")}
            aria-hidden="true"
          />
        </>
      )}

      <div
        className={clsx(
          "[--rail:clamp(1.25rem,5.5vw,7.5rem)] [--rail-top:clamp(8.5rem,14vh,11rem)]",
          "relative z-[4] mx-auto w-[min(100%,140rem)]",
          "flex flex-col items-center gap-7 px-5 pt-30 pb-10",
          "min-[901px]:block min-[901px]:min-h-[100svh]",
          "min-[901px]:px-[var(--rail)] min-[901px]:pt-[var(--rail-top)] min-[901px]:pb-[clamp(1.6rem,3vh,2.5rem)]",
          "max-[520px]:pt-27",
        )}
      >
        <HeroIntro />
        <HeroPortrait />
        <HeroStats />
        <HeroPitch onContact={onContact} />
        <HeroActivity />
      </div>

      {isBlue && (
        <div className={styles.signatureBand} aria-label="Muhammad Wasif">
          <span className={styles.signatureName}>Muhammad Wasif</span>
        </div>
      )}
    </section>
  );
}
