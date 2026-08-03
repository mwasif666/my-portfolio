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

      // 1) The full banner stays pinned while its four edges crop toward the
      // exact measured bounds of the About portrait card underneath.
      const cropPhase = easeInOutCubic(clamp(progress / 0.56, 0, 1));

      // 2) Hero copy disappears naturally after the crop is underway.
      const heroSidePhase = easeOutCubic(
        clamp((progress - 0.2) / 0.3, 0, 1),
      );

      // 3) About content appears in the exposed left and right columns.
      const sideRevealPhase = easeOutCubic(
        clamp((progress - 0.46) / 0.26, 0, 1),
      );

      // 4) The cropped hero becomes the real About portrait card.
      const cardMorphPhase = easeInOutCubic(
        clamp((progress - 0.66) / 0.19, 0, 1),
      );

      // 5) The sticky visual preview hands off to the real document-flow
      // About section at the bottom of the scroll track without a blank gap.
      const handoffPhase = easeInOutCubic(
        clamp((progress - 0.92) / 0.08, 0, 1),
      );

      const naturalFinalOffset = travel - scrolled;
      const finalCompensation =
        handoffPhase > 0 ? -naturalFinalOffset : 0;

      const portraitWidth = 160 - cropPhase * 60;
      const portraitMargin = -30 + cropPhase * 30;

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

      track.classList.toggle("is-final-active", progress >= 0.96);
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
