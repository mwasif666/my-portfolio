import { useEffect } from "react";

const clamp = (value, min = 0, max = 1) => Math.min(max, Math.max(min, value));
const lerp = (from, to, progress) => from + (to - from) * progress;

const smoothstep = (from, to, value) => {
  const progress = clamp((value - from) / Math.max(to - from, 0.0001));
  return progress * progress * (3 - 2 * progress);
};

export default function useJourneyScrollMotion({
  sectionRef,
  cardRefs,
  onReveal,
}) {
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return undefined;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    // Slices drift apart once the photo has been cut, they never cross-fade.
    const rotations = [-3.4, 0, 3.4];
    const xOffsets = [-0.5, 0, 0.5];
    const yOffsets = [1.6, -1, 1.6];
    const flipStarts = [0.58, 0.63, 0.68];
    const flipEnds = [0.78, 0.83, 0.88];
    let frame = 0;

    const applyStaticState = () => {
      section.style.setProperty("--journey-heading-opacity", "1");
      section.style.setProperty("--journey-heading-y", "0px");
      section.style.setProperty("--journey-visual-scale", "1");
      section.style.setProperty("--journey-gap", "1.55vw");
      section.style.setProperty("--journey-seam", "20px");
      section.style.setProperty("--journey-edge", "0.26");
      section.style.setProperty("--journey-shadow", "0.42");
      section.style.setProperty("--journey-split", "1");
      section.style.setProperty("--journey-grid-y", "0px");

      cardRefs.current.forEach((node, index) => {
        onReveal?.(index, true);
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

      const heading = smoothstep(0.04, 0.18, progress);
      const settle = smoothstep(0, 0.16, progress);
      const split = smoothstep(0.26, 0.52, progress);
      const drift = smoothstep(0.34, 0.62, progress);

      section.style.setProperty("--journey-heading-opacity", String(heading));
      section.style.setProperty("--journey-heading-y", `${lerp(26, 0, heading)}px`);
      section.style.setProperty(
        "--journey-visual-scale",
        String(lerp(1.02, 1, settle) * lerp(1, 0.985, split)),
      );
      section.style.setProperty("--journey-gap", `${lerp(0, 1.55, split)}vw`);
      section.style.setProperty("--journey-seam", `${lerp(0, 20, split)}px`);
      section.style.setProperty("--journey-edge", String(lerp(0, 0.26, split)));
      section.style.setProperty("--journey-shadow", String(lerp(0, 0.42, split)));
      section.style.setProperty("--journey-split", String(split));
      section.style.setProperty("--journey-grid-y", `${lerp(18, -14, progress)}px`);

      cardRefs.current.forEach((node, index) => {
        if (!node) return;

        const rotation = rotations[index] * drift;
        const x = xOffsets[index] * drift;
        const y = yOffsets[index] * drift;
        const scale = lerp(1, index === 1 ? 1.015 : 0.99, drift);
        const flip = smoothstep(flipStarts[index], flipEnds[index], progress);
        const copy = smoothstep(0.5, 0.88, flip);

        node.style.transform = `translate3d(${x}vw, ${y}vh, 0) rotate(${rotation}deg) scale(${scale})`;
        node.style.setProperty("--card-flip", `${lerp(0, 180, flip)}deg`);
        node.style.setProperty("--card-copy-opacity", String(copy));
        node.style.setProperty("--card-copy-y", `${lerp(24, 0, copy)}px`);

        // The icon animation starts once the back face is actually readable.
        onReveal?.(index, copy > 0.55);
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
  }, [cardRefs, onReveal, sectionRef]);
}
