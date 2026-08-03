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

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    let frame = 0;

    const setFinalState = () => {
      stage.style.setProperty("--banner-clip-x", "50%");
      stage.style.setProperty("--banner-clip-y", "9svh");
      stage.style.setProperty("--banner-card-opacity", "0");
      stage.style.setProperty("--hero-side-opacity", "0");
      stage.style.setProperty("--about-left-opacity", "1");
      stage.style.setProperty("--about-right-opacity", "1");
      stage.style.setProperty("--about-card-opacity", "1");
      stage.style.setProperty("--about-left-x", "0px");
      stage.style.setProperty("--about-right-x", "0px");
      stage.style.setProperty("--about-card-scale", "1");
      stage.classList.add("is-about-active");
    };

    const render = () => {
      frame = 0;

      if (reduceMotion || window.innerWidth <= 900) {
        setFinalState();
        return;
      }

      const rect = track.getBoundingClientRect();
      const travel = Math.max(track.offsetHeight - window.innerHeight, 1);
      const progress = clamp(-rect.top / travel, 0, 1);

      /*
       * Phase 1: only crop the hero from the left and right. There is no
       * landscape-card scaling or upward movement. The centre portrait remains.
       */
      const clipPhase = easeInOutCubic(clamp((progress - 0.01) / 0.48, 0, 1));
      const sideContentPhase = easeOutCubic(clamp(progress / 0.28, 0, 1));

      /*
       * Phase 2: once the portrait-sized crop is established, reveal the
       * About copy on the left and capability cards on the right.
       */
      const sideRevealPhase = easeOutCubic(
        clamp((progress - 0.4) / 0.28, 0, 1),
      );

      /*
       * Phase 3: crossfade the cropped hero into the matching About portrait
       * card, keeping the centre composition visually continuous.
       */
      const cardCrossfadePhase = easeInOutCubic(
        clamp((progress - 0.7) / 0.2, 0, 1),
      );

      const bannerClipX = clipPhase * 33.6;
      const bannerClipY = clipPhase * 9;
      const heroSideOpacity = 1 - sideContentPhase;
      const bannerCardOpacity = 1 - cardCrossfadePhase;
      const aboutCardOpacity = cardCrossfadePhase;
      const aboutLeftX = (1 - sideRevealPhase) * -54;
      const aboutRightX = (1 - sideRevealPhase) * 54;
      const aboutCardScale = 0.985 + cardCrossfadePhase * 0.015;

      stage.style.setProperty("--transition-progress", progress.toFixed(4));
      stage.style.setProperty("--banner-clip-x", `${bannerClipX.toFixed(3)}%`);
      stage.style.setProperty("--banner-clip-y", `${bannerClipY.toFixed(3)}svh`);
      stage.style.setProperty(
        "--banner-card-opacity",
        bannerCardOpacity.toFixed(3),
      );
      stage.style.setProperty(
        "--hero-side-opacity",
        heroSideOpacity.toFixed(3),
      );
      stage.style.setProperty(
        "--about-left-opacity",
        sideRevealPhase.toFixed(3),
      );
      stage.style.setProperty(
        "--about-right-opacity",
        sideRevealPhase.toFixed(3),
      );
      stage.style.setProperty(
        "--about-card-opacity",
        aboutCardOpacity.toFixed(3),
      );
      stage.style.setProperty("--about-left-x", `${aboutLeftX.toFixed(2)}px`);
      stage.style.setProperty("--about-right-x", `${aboutRightX.toFixed(2)}px`);
      stage.style.setProperty(
        "--about-card-scale",
        aboutCardScale.toFixed(4),
      );

      stage.classList.toggle("is-about-active", progress >= 0.76);
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
    };
  }, []);

  return (
    <section className="banner-about-track" ref={trackRef}>
      <div className="banner-about-stage" ref={stageRef}>
        <div className="banner-about-about-layer">
          <AboutSection />
        </div>

        <div className="banner-about-banner-layer">
          <KontourBanner
            id="blue-banner"
            theme="blue"
            onContact={onContact}
          />
        </div>
      </div>
    </section>
  );
}
