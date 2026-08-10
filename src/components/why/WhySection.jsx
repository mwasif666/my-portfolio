import { useRef } from "react";
import WhyCard from "./WhyCard";
import useWhyScrollMotion from "./useWhyScrollMotion";
import styles from "./WhySection.module.css";

const cloudsAsset = "https://hugo.ai/components/home/HomeWhy/clouds.webp";

const cards = [
  {
    title: "Built to stay maintainable.",
    copy: "Reusable components, clear structure and practical architecture keep the codebase easy to understand, extend and improve after launch.",
    x: -34,
    y: -4,
    rotate: 8.5,
    startX: -1.4,
    startRotate: -1.2,
  },
  {
    title: "Performance with purpose.",
    copy: "Fast loading, responsive layouts and smooth interactions are part of the build from day one, not something added at the end.",
    x: -27,
    y: -27,
    rotate: -13,
    startX: -0.7,
    startRotate: -0.6,
  },
  {
    title: "Built for production.",
    copy: "I ship real interfaces, APIs, CMS and commerce builds that are designed to work reliably beyond the demo and across real devices.",
    x: 2,
    y: -28,
    rotate: -3,
    startX: 0,
    startY: 17,
    startRotate: -2.2,
    primary: true,
  },
  {
    title: "Full-stack ownership.",
    copy: "Frontend, backend, integrations, deployment and QA stay connected so the final product feels consistent instead of stitched together.",
    x: 31,
    y: -23,
    rotate: 6.5,
    startX: 0.7,
    startRotate: 0.8,
  },
  {
    title: "Built around your goals.",
    copy: "The product, audience and business outcome decide the stack. I choose practical solutions that can grow without unnecessary complexity.",
    x: 31,
    y: 23,
    rotate: -9.5,
    startX: 1.4,
    startRotate: 1.4,
  },
];

export default function WhySection() {
  const sectionRef = useRef(null);
  const cardRefs = useRef([]);

  useWhyScrollMotion({ sectionRef, cardRefs, layout: cards });

  return (
    <section ref={sectionRef} className={styles.section} id="why" aria-labelledby="why-title">
      <div className={styles.stage}>
        <div className={styles.stars} aria-hidden="true" />
        <h2 className={styles.title} id="why-title">Why?</h2>
        <img
          className={styles.clouds}
          src={cloudsAsset}
          alt=""
          aria-hidden="true"
          loading="lazy"
          decoding="async"
          draggable="false"
        />

        <div className={styles.cardsLayer}>
          {cards.map((card, index) => (
            <WhyCard
              key={card.title}
              card={card}
              nodeRef={(node) => {
                cardRefs.current[index] = node;
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
