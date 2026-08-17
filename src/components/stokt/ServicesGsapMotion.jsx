import { useEffect } from "react";
import "../../services-gsap-motion.css";

export default function ServicesGsapMotion() {
  useEffect(() => {
    const section = document.getElementById("services");
    const gsap = window.gsap;
    const ScrollTrigger = window.ScrollTrigger;

    if (!section || !gsap || !ScrollTrigger) return undefined;

    const desktop = window.matchMedia("(min-width: 769px)").matches;
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const inner = section.querySelector(":scope > div");
    const header = inner?.querySelector("header");
    const heading = header?.children?.[0];
    const primary = header?.children?.[1];
    const secondary = header?.children?.[2];
    const secondaryParagraph = secondary?.querySelector("p");
    const firstCard = section.querySelector("[data-service-card]");
    const firstColumn = firstCard?.parentElement;
    const cards = firstColumn?.parentElement;

    if (!inner || !header || !primary || !secondary || !secondaryParagraph || !cards) {
      return undefined;
    }

    section.classList.add("services-gsap-active");
    gsap.registerPlugin(ScrollTrigger);

    const originalSecondaryText = secondaryParagraph.textContent
      .trim()
      .replace(/\s+/g, " ");
    const words = originalSecondaryText.split(" ");
    const wordNodes = words.map((word, index) => {
      const span = document.createElement("span");
      span.className = "service-fill-word";
      span.setAttribute("aria-hidden", "true");
      span.textContent = index === words.length - 1 ? word : `${word} `;
      return span;
    });

    secondaryParagraph.setAttribute("aria-label", originalSecondaryText);
    secondaryParagraph.textContent = "";
    wordNodes.forEach((node) => secondaryParagraph.appendChild(node));

    if (reducedMotion || !desktop) {
      section.classList.add("services-gsap-static");
      wordNodes.forEach((node) => {
        node.style.color = "rgba(255, 255, 255, 0.96)";
      });

      return () => {
        section.classList.remove("services-gsap-active", "services-gsap-static");
        if (secondaryParagraph.isConnected) {
          secondaryParagraph.textContent = originalSecondaryText;
          secondaryParagraph.removeAttribute("aria-label");
        }
      };
    }

    const viewport = document.createElement("div");
    viewport.className = "services-cards-viewport";
    cards.parentNode.insertBefore(viewport, cards);
    viewport.appendChild(cards);

    const ctx = gsap.context(() => {
      gsap.set(wordNodes, { color: "rgba(255, 255, 255, 0.16)" });

      const introTimeline = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: header,
          start: "top top",
          end: "+=240%",
          scrub: 1,
          pin: header,
          pinSpacing: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      introTimeline
        .fromTo(
          secondary,
          {
            autoAlpha: 0,
            y: "38vh",
            scale: 0.95,
            filter: "blur(16px)",
          },
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            filter: "blur(0px)",
            duration: 0.28,
          },
          0.12,
        )
        .to(
          primary,
          {
            y: "-3.5vh",
            opacity: 0.72,
            duration: 0.22,
          },
          0.31,
        )
        .to(
          wordNodes,
          {
            color: "rgba(255, 255, 255, 0.98)",
            textShadow: "0 0 18px rgba(255, 255, 255, 0.08)",
            stagger: { each: 0.012, from: "start" },
            duration: 0.52,
          },
          0.36,
        )
        .to(
          [heading, primary, secondary],
          {
            y: "-=10vh",
            opacity: 0.16,
            duration: 0.16,
          },
          0.9,
        );

      const horizontalMetrics = () => {
        const viewportWidth = viewport.clientWidth || window.innerWidth;
        const trackWidth = cards.scrollWidth || viewportWidth;
        const startOffset = Math.min(window.innerWidth * 0.64, 760);
        const trailingRoom = Math.min(window.innerWidth * 0.12, 220);
        const overflow = Math.max(0, trackWidth - viewportWidth);

        return {
          startOffset,
          endX: -(overflow + trailingRoom),
          scrollDistance: Math.max(
            window.innerHeight * 3.1,
            overflow + startOffset + window.innerWidth * 1.45,
          ),
        };
      };

      gsap.fromTo(
        cards,
        { x: () => horizontalMetrics().startOffset },
        {
          x: () => horizontalMetrics().endX,
          ease: "none",
          scrollTrigger: {
            trigger: viewport,
            start: "top top",
            end: () => `+=${horizontalMetrics().scrollDistance}`,
            scrub: 1.1,
            pin: viewport,
            pinSpacing: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        },
      );
    }, section);

    const refreshTimer = window.setTimeout(() => ScrollTrigger.refresh(), 90);

    return () => {
      window.clearTimeout(refreshTimer);
      ctx.revert();
      section.classList.remove("services-gsap-active", "services-gsap-static");

      if (secondaryParagraph.isConnected) {
        secondaryParagraph.textContent = originalSecondaryText;
        secondaryParagraph.removeAttribute("aria-label");
      }

      if (viewport.parentNode && cards.parentNode === viewport) {
        viewport.parentNode.insertBefore(cards, viewport);
        viewport.remove();
      }
    };
  }, []);

  return null;
}
