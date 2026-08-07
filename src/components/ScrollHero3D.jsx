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
    const portraitImage = stage.querySelector('img[alt*="Muhammad Wasif"]');
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

    const animated = [kicker, heading, portrait, cta, stats, pitch, activity].filter(Boolean);

    hero.style.transformStyle = "preserve-3d";
    layout.style.transformStyle = "preserve-3d";

    let frame = 0;
    let pointerX = 0;
    let pointerY = 0;

    const apply = (element, transform, opacity = null, origin = null) => {
      if (!element) return;
      element.style.transition = "none";
      element.style.willChange = "transform, opacity";
      element.style.transform = transform;
      if (opacity !== null) element.style.opacity = String(opacity);
      if (origin) element.style.transformOrigin = origin;
    };

    const setBackgroundVars = (progress) => {
      const depth = easeOutCubic(clamp(progress / 0.92));

      stage.style.setProperty("--bg-tilt-x", `${(-pointerY * 1.8).toFixed(2)}deg`);
      stage.style.setProperty("--bg-tilt-y", `${(pointerX * 2.2).toFixed(2)}deg`);

      stage.style.setProperty(
        "--bg-grid-x",
        `${(pointerX * 20 - depth * 18).toFixed(2)}px`,
      );
      stage.style.setProperty(
        "--bg-grid-y",
        `${(-60 + depth * 155 + pointerY * 14).toFixed(2)}px`,
      );
      stage.style.setProperty(
        "--bg-grid-z",
        `${(-120 + depth * 330).toFixed(2)}px`,
      );
      stage.style.setProperty(
        "--bg-grid-rx",
        `${(62 - depth * 20 + pointerY * 2).toFixed(2)}deg`,
      );
      stage.style.setProperty(
        "--bg-grid-rz",
        `${(-3 + pointerX * 2.2 + depth * 1.2).toFixed(2)}deg`,
      );

      stage.style.setProperty(
        "--bg-glow-x",
        `${(pointerX * 42 + depth * 24).toFixed(2)}px`,
      );
      stage.style.setProperty(
        "--bg-glow-y",
        `${(pointerY * 28 - depth * 46).toFixed(2)}px`,
      );
      stage.style.setProperty(
        "--bg-glow-scale",
        `${(1 + depth * 0.15).toFixed(4)}`,
      );

      stage.style.setProperty(
        "--bg-orb-x",
        `${(pointerX * 54 + depth * 72).toFixed(2)}px`,
      );
      stage.style.setProperty(
        "--bg-orb-y",
        `${(pointerY * 34 - depth * 34).toFixed(2)}px`,
      );
      stage.style.setProperty(
        "--bg-beam-x",
        `${(-pointerX * 36 - depth * 42).toFixed(2)}px`,
      );
      stage.style.setProperty(
        "--bg-beam-y",
        `${(-pointerY * 22 + depth * 30).toFixed(2)}px`,
      );
    };

    const clearForeground = () => {
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

      setBackgroundVars(progress);

      if (progress <= 0.002) {
        clearForeground();
        return;
      }

      const depth = easeOutCubic(clamp(progress / 0.9));
      const exit = easeInOutCubic(clamp((progress - 0.88) / 0.12));

      layout.style.transition = "none";
      layout.style.willChange = "transform";
      layout.style.transform = `translate3d(${(pointerX * 3).toFixed(2)}px, ${(-5 * depth + pointerY * 2).toFixed(2)}px, 0) rotateX(${(0.75 * depth - pointerY * 0.4).toFixed(2)}deg) rotateY(${(-0.65 * depth + pointerX * 0.45).toFixed(2)}deg)`;

      apply(
        heading,
        `translate3d(${(10 * depth + pointerX * 4).toFixed(2)}px, ${(-30 * depth + pointerY * 3).toFixed(2)}px, ${(-135 * depth).toFixed(2)}px) scale(${(1 - 0.025 * depth).toFixed(4)})`,
        Math.max(0.58, 1 - exit * 0.42),
        "50% 35%",
      );

      apply(
        kicker,
        `translate3d(${(-5 * depth + pointerX * 3).toFixed(2)}px, ${(-14 * depth + pointerY * 2).toFixed(2)}px, ${(-55 * depth).toFixed(2)}px)`,
        Math.max(0.54, 1 - exit * 0.46),
      );

      apply(
        portrait,
        `translate3d(${(44 * depth + pointerX * 8).toFixed(2)}px, ${(-10 * depth + pointerY * 4).toFixed(2)}px, ${(185 * depth).toFixed(2)}px) rotateY(${(-3.6 * depth + pointerX * 0.9).toFixed(2)}deg) scale(${(1 + 0.038 * depth).toFixed(4)})`,
        Math.max(0.84, 1 - exit * 0.12),
        "55% 72%",
      );

      apply(
        cta,
        `translate3d(${(30 * depth + pointerX * 6).toFixed(2)}px, ${(-4 * depth + pointerY * 2).toFixed(2)}px, ${(115 * depth).toFixed(2)}px) scale(${(1 + 0.02 * depth).toFixed(4)})`,
        Math.max(0.68, 1 - exit * 0.32),
      );

      apply(
        stats,
        `translate3d(${(-18 * depth + pointerX * -4).toFixed(2)}px, ${(-8 * depth + pointerY * 2).toFixed(2)}px, ${(105 * depth).toFixed(2)}px) rotateY(${(1.8 * depth - pointerX * 0.7).toFixed(2)}deg)`,
        Math.max(0.72, 1 - exit * 0.28),
        "50% 50%",
      );

      apply(
        pitch,
        `translate3d(${(-10 * depth + pointerX * -3).toFixed(2)}px, ${(-20 * depth + pointerY * 2).toFixed(2)}px, ${(62 * depth).toFixed(2)}px)`,
        Math.max(0.58, 1 - exit * 0.42),
      );

      apply(
        activity,
        `translate3d(${(12 * depth + pointerX * 4).toFixed(2)}px, ${(16 * depth + pointerY * 3).toFixed(2)}px, ${(52 * depth).toFixed(2)}px)`,
        Math.max(0.6, 1 - exit * 0.4),
      );
    };

    const requestRender = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(render);
    };

    const onPointerMove = (event) => {
      const bounds = stage.getBoundingClientRect();
      pointerX = clamp(((event.clientX - bounds.left) / bounds.width) * 2 - 1, -1, 1);
      pointerY = clamp(((event.clientY - bounds.top) / bounds.height) * 2 - 1, -1, 1);
      requestRender();
    };

    const onPointerLeave = () => {
      pointerX = 0;
      pointerY = 0;
      requestRender();
    };

    render();
    window.addEventListener("scroll", requestRender, { passive: true });
    window.addEventListener("resize", requestRender);
    stage.addEventListener("pointermove", onPointerMove, { passive: true });
    stage.addEventListener("pointerleave", onPointerLeave);

    return () => {
      window.removeEventListener("scroll", requestRender);
      window.removeEventListener("resize", requestRender);
      stage.removeEventListener("pointermove", onPointerMove);
      stage.removeEventListener("pointerleave", onPointerLeave);
      if (frame) window.cancelAnimationFrame(frame);
      clearForeground();
      hero.style.removeProperty("transform-style");
      layout.style.removeProperty("transform-style");
    };
  }, []);

  return (
    <section className={styles.track} ref={trackRef} id="home">
      <div className={styles.stage} ref={stageRef}>
        <KontourBanner id="blue-banner" theme="blue" onContact={onContact} />
      </div>
    </section>
  );
}
