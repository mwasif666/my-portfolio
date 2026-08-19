import { useRef } from "react";
import WhyCard from "./WhyCard";
import useWhyCardDrag from "./useWhyCardDrag";
import useWhyScrollMotion from "./useWhyScrollMotion";
import styles from "./WhySection.module.css";

const cards = [
  {
    title: "Code that stays maintainable.",
    copy: "Reusable components, clear structure and practical architecture keep your codebase easier to understand, extend and improve after launch.",
    x: -34,
    y: -4,
    rotate: 8.5,
    startX: -1.4,
    startRotate: -1.2,
  },
  {
    title: "Performance from day one.",
    copy: "Fast loading, responsive layouts and smooth interactions are planned into the build from the start instead of patched in at the end.",
    x: -27,
    y: -27,
    rotate: -13,
    startX: -0.7,
    startRotate: -0.6,
  },
  {
    title: "Ready for real users.",
    copy: "I build interfaces, APIs, content systems and commerce flows to work reliably beyond the demo and across real devices.",
    x: 2,
    y: -28,
    rotate: -3,
    startX: 0,
    startY: 17,
    startRotate: -2.2,
    primary: true,
  },
  {
    title: "One connected build.",
    copy: "Frontend, backend, integrations, deployment and quality checks stay connected so the final product feels consistent from end to end.",
    x: 31,
    y: -23,
    rotate: 6.5,
    startX: 0.7,
    startRotate: 0.8,
  },
  {
    title: "Decisions tied to your goals.",
    copy: "Your product, audience and business outcome guide the technology. I choose practical solutions that can grow without unnecessary complexity.",
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
  useWhyCardDrag({ cardRefs });

  return (
    <section ref={sectionRef} className={styles.section} id="why" aria-labelledby="why-title">
      <div className={styles.stage}>
        <div className={styles.stars} aria-hidden="true" />
        <h2 className={styles.title} id="why-title">Why?</h2>
        <div className={styles.planet} aria-hidden="true" />

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
