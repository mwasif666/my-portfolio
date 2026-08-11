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
    const rotations = [-9.5, 0, 8.5];
    const xOffsets = [-1.45, 0, 1.45];
    const yOffsets = [3.8, 0, 3.8];
    const flipStarts = [0.60, 0.64, 0.68];
    const flipEnds = [0.82, 0.86, 0.90];
    let frame = 0;

    const applyStaticState = () => {
      section.style.setProperty("--journey-heading-opacity", "1");
      section.style.setProperty("--journey-heading-y", "0px");
      section.style.setProperty("--journey-wide-opacity", "0");
      section.style.setProperty("--journey-panels-opacity", "1");
      section.style.setProperty("--journey-panels-width", "100%");
      section.style.setProperty("--journey-panels-height", "auto");
      section.style.setProperty("--journey-gap", "14px");
      section.style.setProperty("--journey-grid-y", "0px");

      cardRefs.current.forEach((node) => {
        if (!node) return;
        node.style.transform = "none";
        node.style.setProperty("--card-flip", "180deg");
        node.style.setProperty("--card-copy-opacity", "1");
        node.style.setProperty("--card-copy-y", "0px");
      });
    };

    const update = () => {
      frame = 0;

      if (window.innerWidth <= 820 || reducedMotion.matches) {
        applyStaticState();
        return;
      }

      const rect = section.getBoundingClientRect();
      const viewport = window.innerHeight;

      if (rect.top > viewport * 1.35 || rect.bottom < -viewport * 0.35) return;

      const travel = Math.max(section.offsetHeight - viewport, 1);
      const progress = clamp(-rect.top / travel);

      const heading = smoothstep(0.05, 0.20, progress);
      const wideFade = smoothstep(0.16, 0.36, progress);
      const panelsIn = smoothstep(0.20, 0.34, progress);
      const split = smoothstep(0.24, 0.52, progress);
      const cardTurn = smoothstep(0.43, 0.64, progress);

      section.style.setProperty("--journey-heading-opacity", String(heading));
      section.style.setProperty("--journey-heading-y", `${lerp(30, 0, heading)}px`);
      section.style.setProperty("--journey-wide-opacity", String(1 - wideFade));
      section.style.setProperty("--journey-wide-scale", String(lerp(1, 0.975, wideFade)));
      section.style.setProperty("--journey-panels-opacity", String(panelsIn));
      section.style.setProperty("--journey-panels-width", `${lerp(82, 70, split)}vw`);
      section.style.setProperty("--journey-panels-height", `${lerp(61, 67, split)}vh`);
      section.style.setProperty("--journey-gap", `${lerp(0.15, 2.05, split)}vw`);
      section.style.setProperty("--journey-grid-y", `${lerp(18, -14, progress)}px`);

      cardRefs.current.forEach((node, index) => {
        if (!node) return;

        const rotation = rotations[index] * cardTurn;
        const x = xOffsets[index] * cardTurn;
        const y = yOffsets[index] * cardTurn;
        const scale = lerp(1, index === 1 ? 1.012 : 0.992, cardTurn);
        const flip = smoothstep(flipStarts[index], flipEnds[index], progress);
        const copy = smoothstep(0.50, 0.88, flip);

        node.style.transform = `translate3d(${x}vw, ${y}vh, 0) rotate(${rotation}deg) scale(${scale})`;
        node.style.setProperty("--card-flip", `${lerp(0, 180, flip)}deg`);
        node.style.setProperty("--card-copy-opacity", String(copy));
        node.style.setProperty("--card-copy-y", `${lerp(24, 0, copy)}px`);
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
