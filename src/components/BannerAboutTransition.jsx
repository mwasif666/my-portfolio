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

    const render = () => {
      frame = 0;

      if (reduceMotion || window.innerWidth <= 900) {
        stage.style.setProperty("--transition-progress", "1");
        stage.style.setProperty("--banner-scale", "1");
        stage.style.setProperty("--banner-radius", "0px");
        stage.style.setProperty("--banner-inset", "0px");
        stage.style.setProperty("--banner-y", "0px");
        stage.style.setProperty("--banner-opacity", "1");
        stage.style.setProperty("--about-y", "0px");
        stage.style.setProperty("--about-opacity", "1");
        stage.style.setProperty("--about-card-y", "0px");
        stage.style.setProperty("--about-card-scale", "1");
        return;
      }

      const rect = track.getBoundingClientRect();
      const travel = Math.max(track.offsetHeight - window.innerHeight, 1);
      const progress = clamp(-rect.top / travel, 0, 1);

      const wrapPhase = easeOutCubic(clamp(progress / 0.36, 0, 1));
      const liftPhase = easeInOutCubic(clamp((progress - 0.2) / 0.58, 0, 1));
      const aboutPhase = easeOutCubic(clamp((progress - 0.08) / 0.5, 0, 1));
      const cardPhase = easeOutCubic(clamp((progress - 0.18) / 0.46, 0, 1));

      const viewportHeight = window.innerHeight;
      const bannerScale = 1 - wrapPhase * 0.115;
      const bannerInset = wrapPhase * 28;
      const bannerRadius = wrapPhase * 30;
      const bannerY = -liftPhase * viewportHeight * 1.04;
      const bannerOpacity = 1 - clamp((progress - 0.64) / 0.2, 0, 1);
      const aboutY = (1 - aboutPhase) * viewportHeight * 0.92;
      const aboutOpacity = clamp((progress - 0.04) / 0.24, 0, 1);
      const aboutCardY = (1 - cardPhase) * viewportHeight * 0.58;
      const aboutCardScale = 0.86 + cardPhase * 0.14;

      stage.style.setProperty(
        "--transition-progress",
        progress.toFixed(4),
      );
      stage.style.setProperty("--banner-scale", bannerScale.toFixed(4));
      stage.style.setProperty("--banner-radius", `${bannerRadius.toFixed(2)}px`);
      stage.style.setProperty("--banner-inset", `${bannerInset.toFixed(2)}px`);
      stage.style.setProperty("--banner-y", `${bannerY.toFixed(2)}px`);
      stage.style.setProperty("--banner-opacity", bannerOpacity.toFixed(3));
      stage.style.setProperty("--about-y", `${aboutY.toFixed(2)}px`);
      stage.style.setProperty("--about-opacity", aboutOpacity.toFixed(3));
      stage.style.setProperty("--about-card-y", `${aboutCardY.toFixed(2)}px`);
      stage.style.setProperty(
        "--about-card-scale",
        aboutCardScale.toFixed(4),
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
