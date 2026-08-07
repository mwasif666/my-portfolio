import { useEffect, useRef } from "react";
import KontourBanner from "./KontourBanner";
import styles from "./ScrollHero3D.module.css";

const clamp = (value, min = 0, max = 1) => Math.min(Math.max(value, min), max);
const easeOutCubic = (value) => 1 - Math.pow(1 - value, 3);
const easeInOutCubic = (value) =>
  value < 0.5
    ? 4 * value * value * value
    : 1 - Math.pow(-2 * value + 2, 3) / 2;

export default function ScrollHero3D({ onContact }) {
  const trackRef = useRef(null);
  const stageRef = useRef(null);

  useEffect(() => {
    const track = trackRef.current;
    const stage = stageRef.current;
    if (!track || !stage) return undefined;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reduceMotion || window.innerWidth <= 900) return undefined;

    const hero = stage.querySelector(".portfolio-banner");
    const stats = stage.querySelector('[aria-label="Professional highlights"]');
    const portraitImage = stage.querySelector(
      'img[alt*="Muhammad Wasif"]',
    );
    const portrait = portraitImage?.parentElement;
    const heading = stage.querySelector("h1")?.parentElement;
    const cta = stage.querySelector(
      'button[aria-label="Start a project with Muhammad Wasif"]',
    );
    const projectsLink = stage.querySelector('a[href="#projects"]');
    const pitch = projectsLink?.parentElement?.parentElement;
    const layout = stats?.parentElement;
    const kicker = layout?.firstElementChild;
    const activity = layout?.lastElementChild;

    if (!hero || !layout) return undefined;

    const animated = [
      kicker,
      heading,
      portrait,
      cta,
      stats,
      pitch,
      activity,
    ].filter(Boolean);

    hero.style.transformStyle = "preserve-3d";
    layout.style.transformStyle = "preserve-3d";

    let frame = 0;

    const apply = (element, transform, opacity = null, origin = null) => {
      if (!element) return;
      element.style.transition = "none";
      element.style.willChange = "transform, opacity";
      element.style.transform = transform;
      if (opacity !== null) element.style.opacity = String(opacity);
      if (origin) element.style.transformOrigin = origin;
    };

    const clear = () => {
      layout.style.removeProperty("transition");
      layout.style.removeProperty("transform");
      layout.style.removeProperty("will-change");

      animated.forEach((element) => {
        element.style.removeProperty("transition");
        element.style.removeProperty("transform");
        element.style.removeProperty("opacity");
        element.style.removeProperty("will-change");
        element.style.removeProperty("transform-origin");
      });
    };

    const render = () => {
      frame = 0;

      const rect = track.getBoundingClientRect();
      const travel = Math.max(track.offsetHeight - window.innerHeight, 1);
      const progress = clamp(-rect.top / travel);

      if (progress <= 0.002) {
        clear();
        return;
      }

      const depth = easeOutCubic(clamp(progress / 0.86));
      const exit = easeInOutCubic(clamp((progress - 0.72) / 0.28));
      const cameraY = -10 * depth;
      const cameraScale = 1 - 0.018 * depth;

      layout.style.transition = "none";
      layout.style.willChange = "transform";
      layout.style.transform = `translate3d(0, ${cameraY.toFixed(2)}px, 0) rotateX(${(
        2.2 * depth
      ).toFixed(2)}deg) rotateY(${(-1.2 * depth).toFixed(2)}deg) scale(${cameraScale.toFixed(4)})`;

      apply(
        heading,
        `translate3d(${(18 * depth).toFixed(2)}px, ${(-68 * depth).toFixed(
          2,
        )}px, ${(-300 * depth).toFixed(2)}px) rotateX(${(
          4.5 * depth
        ).toFixed(2)}deg) scale(${(1 - 0.055 * depth).toFixed(4)})`,
        Math.max(0.16, 1 - exit * 0.78),
        "50% 35%",
      );

      apply(
        kicker,
        `translate3d(${(-8 * depth).toFixed(2)}px, ${(-28 * depth).toFixed(
          2,
        )}px, ${(-125 * depth).toFixed(2)}px)`,
        Math.max(0.12, 1 - exit * 0.84),
      );

      apply(
        portrait,
        `translate3d(${(82 * depth).toFixed(2)}px, ${(-18 * depth).toFixed(
          2,
        )}px, ${(235 * depth).toFixed(2)}px) rotateY(${(-7.5 * depth).toFixed(
          2,
        )}deg) rotateZ(${(0.8 * depth).toFixed(2)}deg) scale(${(
          1 + 0.065 * depth
        ).toFixed(4)})`,
        Math.max(0.72, 1 - exit * 0.18),
        "55% 70%",
      );

      apply(
        cta,
        `translate3d(${(58 * depth).toFixed(2)}px, ${(-8 * depth).toFixed(
          2,
        )}px, ${(175 * depth).toFixed(2)}px) scale(${(
          1 + 0.035 * depth
        ).toFixed(4)})`,
        Math.max(0.42, 1 - exit * 0.5),
      );

      apply(
        stats,
        `translate3d(${(-36 * depth).toFixed(2)}px, ${(-14 * depth).toFixed(
          2,
        )}px, ${(155 * depth).toFixed(2)}px) rotateY(${(
          4.2 * depth
        ).toFixed(2)}deg) scale(${(1 + 0.025 * depth).toFixed(4)})`,
        Math.max(0.62, 1 - exit * 0.3),
        "50% 50%",
      );

      apply(
        pitch,
        `translate3d(${(-22 * depth).toFixed(2)}px, ${(-44 * depth).toFixed(
          2,
        )}px, ${(105 * depth).toFixed(2)}px) rotateY(${(
          2.6 * depth
        ).toFixed(2)}deg)`,
        Math.max(0.3, 1 - exit * 0.68),
      );

      apply(
        activity,
        `translate3d(${(24 * depth).toFixed(2)}px, ${(34 * depth).toFixed(
          2,
        )}px, ${(90 * depth).toFixed(2)}px) rotateY(${(-3.5 * depth).toFixed(
          2,
        )}deg)`,
        Math.max(0.32, 1 - exit * 0.64),
      );
    };

    const requestRender = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(render);
    };

    render();
    window.addEventListener("scroll", requestRender, { passive: true });
    window.addEventListener("resize", requestRender);

    return () => {
      window.removeEventListener("scroll", requestRender);
      window.removeEventListener("resize", requestRender);
      if (frame) window.cancelAnimationFrame(frame);
      clear();
      hero.style.removeProperty("transform-style");
      layout.style.removeProperty("transform-style");
    };
  }, []);

  return (
    <section className={styles.track} ref={trackRef} id="home">
      <div className={styles.stage} ref={stageRef}>
        <KontourBanner
          id="blue-banner"
          theme="blue"
          onContact={onContact}
        />
      </div>
    </section>
  );
}
