import { useEffect } from "react";

const clamp = (value, min = 0, max = 1) => Math.min(max, Math.max(min, value));
const lerp = (from, to, progress) => from + (to - from) * progress;

const smoothstep = (from, to, value) => {
  const progress = clamp((value - from) / Math.max(to - from, 0.0001));
  return progress * progress * (3 - 2 * progress);
};

export default function useJourneyScrollMotion({ sectionRef, cardRefs }) {
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return undefined;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const rotations = [-10.5, 0, 9.5];
    const xOffsets = [-1.7, 0, 1.7];
    const yOffsets = [4.1, 0, 4.1];
    let frame = 0;

    const applyMobileState = () => {
      section.style.setProperty("--journey-heading-opacity", "1");
      section.style.setProperty("--journey-heading-y", "0px");
      section.style.setProperty("--journey-wide-opacity", "0");
      section.style.setProperty("--journey-panels-opacity", "1");
      section.style.setProperty("--journey-panels-width", "100%");
      section.style.setProperty("--journey-panels-height", "auto");
      section.style.setProperty("--journey-gap", "14px");
      section.style.setProperty("--journey-image-opacity", ".16");
      section.style.setProperty("--journey-surface-opacity", "1");
      section.style.setProperty("--journey-copy-opacity", "1");
      section.style.setProperty("--journey-copy-y", "0px");
      section.style.setProperty("--journey-grid-y", "0px");

      cardRefs.current.forEach((node) => {
        if (!node) return;
        node.style.transform = "none";
      });
    };

    const update = () => {
      frame = 0;

      if (window.innerWidth <= 820 || reducedMotion.matches) {
        applyMobileState();
        return;
      }

      const rect = section.getBoundingClientRect();
      const viewport = window.innerHeight;

      if (rect.top > viewport * 1.35 || rect.bottom < -viewport * 0.35) return;

      const travel = Math.max(section.offsetHeight - viewport, 1);
      const progress = clamp(-rect.top / travel);
      const heading = smoothstep(0.08, 0.28, progress);
      const split = smoothstep(0.22, 0.58, progress);
      const cardTurn = smoothstep(0.58, 0.92, progress);
      const copy = smoothstep(0.66, 0.9, progress);
      const imageFade = smoothstep(0.62, 0.9, progress);
      const wideFade = smoothstep(0.2, 0.46, progress);

      section.style.setProperty("--journey-heading-opacity", String(heading));
      section.style.setProperty("--journey-heading-y", `${lerp(32, 0, heading)}px`);
      section.style.setProperty("--journey-wide-opacity", String(1 - wideFade));
      section.style.setProperty("--journey-wide-scale", String(lerp(1, 0.975, wideFade)));
      section.style.setProperty("--journey-panels-opacity", String(smoothstep(0.24, 0.43, progress)));
      section.style.setProperty("--journey-panels-width", `${lerp(82, 70, split)}vw`);
      section.style.setProperty("--journey-panels-height", `${lerp(62, 68, split)}vh`);
      section.style.setProperty("--journey-gap", `${lerp(0.15, 2.1, split)}vw`);
      section.style.setProperty("--journey-image-opacity", String(1 - imageFade * 0.92));
      section.style.setProperty("--journey-surface-opacity", String(cardTurn));
      section.style.setProperty("--journey-copy-opacity", String(copy));
      section.style.setProperty("--journey-copy-y", `${lerp(26, 0, copy)}px`);
      section.style.setProperty("--journey-grid-y", `${lerp(18, -14, progress)}px`);

      cardRefs.current.forEach((node, index) => {
        if (!node) return;
        const rotation = rotations[index] * cardTurn;
        const x = xOffsets[index] * cardTurn;
        const y = yOffsets[index] * cardTurn;
        const scale = lerp(1, index === 1 ? 1.015 : 0.99, cardTurn);
        node.style.transform = `translate3d(${x}vw, ${y}vh, 0) rotate(${rotation}deg) scale(${scale})`;
      });
    };

    const schedule = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    reducedMotion.addEventListener?.("change", schedule);

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      reducedMotion.removeEventListener?.("change", schedule);
    };
  }, [cardRefs, sectionRef]);
}
