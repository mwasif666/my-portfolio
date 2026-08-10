import { useEffect } from "react";

const clamp = (value, min = 0, max = 1) => Math.min(max, Math.max(min, value));
const lerp = (from, to, progress) => from + (to - from) * progress;
const easeOutCubic = (value) => 1 - Math.pow(1 - value, 3);

export default function useWhyScrollMotion({ sectionRef, cardRefs, layout }) {
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return undefined;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;

    const applyFinalLayout = () => {
      const vw = window.innerWidth / 100;
      const vh = window.innerHeight / 100;

      cardRefs.current.forEach((node, index) => {
        if (!node) return;
        const target = layout[index];
        node.style.opacity = "1";
        node.style.transform = `translate3d(-50%, -50%, 0) translate3d(${target.x * vw}px, ${target.y * vh}px, 0) rotate(${target.rotate}deg) scale(1)`;
      });

      section.style.setProperty("--why-title-y", "0px");
      section.style.setProperty("--why-title-scale", "1");
      section.style.setProperty("--why-clouds-y", "0px");
      section.style.setProperty("--why-stars-y", "0px");
    };

    const update = () => {
      frame = 0;

      if (window.innerWidth <= 860 || reducedMotion.matches) {
        applyFinalLayout();
        return;
      }

      const rect = section.getBoundingClientRect();
      const viewport = window.innerHeight;

      if (rect.top > viewport * 1.35 || rect.bottom < -viewport * .35) return;

      const travel = Math.max(section.offsetHeight - viewport, 1);
      const rawProgress = clamp(-rect.top / travel);
      const spreadProgress = clamp((rawProgress - 0.04) / 0.72);
      const eased = easeOutCubic(spreadProgress);
      const vw = window.innerWidth / 100;
      const vh = viewport / 100;

      cardRefs.current.forEach((node, index) => {
        if (!node) return;

        const target = layout[index];
        const startX = target.startX ?? (index - 2) * 0.75;
        const startY = target.startY ?? 17 + Math.abs(index - 2) * 0.35;
        const startRotate = target.startRotate ?? (index - 2) * 0.8;
        const x = lerp(startX, target.x, eased) * vw;
        const y = lerp(startY, target.y, eased) * vh;
        const rotate = lerp(startRotate, target.rotate, eased);
        const scale = lerp(0.92, 1, eased);
        const fadeStart = target.primary ? 1 : clamp((rawProgress - 0.08) / 0.2);

        node.style.opacity = String(fadeStart);
        node.style.transform = `translate3d(-50%, -50%, 0) translate3d(${x}px, ${y}px, 0) rotate(${rotate}deg) scale(${scale})`;
      });

      section.style.setProperty("--why-title-y", `${lerp(110, 0, eased)}px`);
      section.style.setProperty("--why-title-scale", String(lerp(0.88, 1, eased)));
      section.style.setProperty("--why-clouds-y", `${lerp(175, 0, eased)}px`);
      section.style.setProperty("--why-stars-y", `${lerp(16, -8, rawProgress)}px`);
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
  }, [cardRefs, layout, sectionRef]);
}
