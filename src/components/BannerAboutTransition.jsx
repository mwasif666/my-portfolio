import { useEffect, useRef } from "react";
import KontourBanner from "./KontourBanner";
import AboutSection from "./AboutSection";

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);
const easeOutCubic = (value) => 1 - Math.pow(1 - value, 3);
const easeInOutCubic = (value) =>
  value < 0.5
    ? 4 * value * value * value
    : 1 - Math.pow(-2 * value + 2, 3) / 2;

export default function BannerAboutTransition({ onContact }) {
  const trackRef = useRef(null);
  const stageRef = useRef(null);

  useEffect(() => {
    const track = trackRef.current;
    const stage = stageRef.current;
    if (!track || !stage) return undefined;

    const previewCard = stage.querySelector(
      ".banner-about-about-layer .about-feature-card",
    );

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    let frame = 0;
    let targetBounds = {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
    };

    const measure = () => {
      if (!previewCard || window.innerWidth <= 900) return;

      const stageRect = stage.getBoundingClientRect();
      const cardRect = previewCard.getBoundingClientRect();

      targetBounds = {
        top: Math.max(cardRect.top - stageRect.top, 0),
        right: Math.max(stageRect.right - cardRect.right, 0),
        bottom: Math.max(stageRect.bottom - cardRect.bottom, 0),
        left: Math.max(cardRect.left - stageRect.left, 0),
      };
    };

    const render = () => {
      frame = 0;

      if (reduceMotion || window.innerWidth <= 900) return;

      measure();

      const rect = track.getBoundingClientRect();
      const travel = Math.max(track.offsetHeight - window.innerHeight, 1);
      const scrolled = clamp(-rect.top, 0, travel);
      const progress = clamp(scrolled / travel, 0, 1);

      const cropPhase = easeInOutCubic(clamp(progress / 0.68, 0, 1));

      const heroSidePhase = easeOutCubic(
        clamp((progress - 0.24) / 0.34, 0, 1),
      );

      const sideRevealPhase = easeOutCubic(
        clamp((progress - 0.56) / 0.25, 0, 1),
      );

      const cardMorphPhase = easeInOutCubic(
        clamp((progress - 0.76) / 0.16, 0, 1),
      );

      const handoffPhase = easeInOutCubic(
        clamp((progress - 0.94) / 0.06, 0, 1),
      );

      const naturalFinalOffset = travel - scrolled;
      const finalCompensation =
        handoffPhase > 0 ? -naturalFinalOffset : 0;

      const portraitWidth = 144 - cropPhase * 44;
      const portraitMargin = -22 + cropPhase * 22;

      stage.style.setProperty(
        "--banner-clip-top",
        `${(targetBounds.top * cropPhase).toFixed(2)}px`,
      );
      stage.style.setProperty(
        "--banner-clip-right",
        `${(targetBounds.right * cropPhase).toFixed(2)}px`,
      );
      stage.style.setProperty(
        "--banner-clip-bottom",
        `${(targetBounds.bottom * cropPhase).toFixed(2)}px`,
      );
      stage.style.setProperty(
        "--banner-clip-left",
        `${(targetBounds.left * cropPhase).toFixed(2)}px`,
      );
      stage.style.setProperty(
        "--banner-radius",
        `${(cropPhase * 12).toFixed(2)}px`,
      );
      stage.style.setProperty(
        "--hero-side-opacity",
        (1 - heroSidePhase).toFixed(3),
      );
      stage.style.setProperty(
        "--hero-portrait-width",
        `${portraitWidth.toFixed(3)}%`,
      );
      stage.style.setProperty(
        "--hero-portrait-margin",
        `${portraitMargin.toFixed(3)}%`,
      );
      stage.style.setProperty(
        "--about-left-opacity",
        (sideRevealPhase * (1 - handoffPhase)).toFixed(3),
      );
      stage.style.setProperty(
        "--about-right-opacity",
        (sideRevealPhase * (1 - handoffPhase)).toFixed(3),
      );
      stage.style.setProperty(
        "--about-left-x",
        `${((1 - sideRevealPhase) * -48).toFixed(2)}px`,
      );
      stage.style.setProperty(
        "--about-right-x",
        `${((1 - sideRevealPhase) * 48).toFixed(2)}px`,
      );
      stage.style.setProperty(
        "--banner-card-opacity",
        ((1 - cardMorphPhase) * (1 - handoffPhase)).toFixed(3),
      );
      stage.style.setProperty(
        "--about-card-opacity",
        (cardMorphPhase * (1 - handoffPhase)).toFixed(3),
      );
      stage.style.setProperty(
        "--stage-opacity",
        (1 - handoffPhase).toFixed(3),
      );

      track.style.setProperty(
        "--final-opacity",
        handoffPhase.toFixed(3),
      );
      track.style.setProperty(
        "--final-y",
        `${finalCompensation.toFixed(2)}px`,
      );

      track.classList.toggle("is-final-active", progress >= 0.97);
    };

    const requestRender = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(render);
    };

    measure();
    render();
    window.addEventListener("scroll", requestRender, { passive: true });
    window.addEventListener("resize", requestRender);

    return () => {
      window.removeEventListener("scroll", requestRender);
      window.removeEventListener("resize", requestRender);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section className="banner-about-track" ref={trackRef}>
      <div className="banner-about-stage" ref={stageRef}>
        <div className="banner-about-about-layer">
          <AboutSection preview />
        </div>

        <div className="banner-about-banner-layer">
          <KontourBanner
            id="blue-banner"
            theme="blue"
            onContact={onContact}
          />
        </div>
      </div>

      <div className="banner-about-final-layer">
        <AboutSection />
      </div>
    </section>
  );
}
