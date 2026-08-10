import { useRef } from "react";
import WhyCard from "./WhyCard";
import useWhyScrollMotion from "./useWhyScrollMotion";
import styles from "./WhySection.module.css";

const cards = [
  {
    title: "Engineered for longevity.",
    copy: "Clean architecture, reusable components and maintainable code keep every build adaptable long after launch.",
    x: -34,
    y: -4,
    rotate: 8.5,
    startX: -1.4,
    startRotate: -1.2,
  },
  {
    title: "Grounded in outcomes.",
    copy: "Performance, usability and business goals guide each decision instead of adding complexity just for show.",
    x: -21,
    y: -25,
    rotate: -13,
    startX: -0.7,
    startRotate: -0.6,
  },
  {
    title: "Built for the real world.",
    copy: "I build for live products, real users, real data and the edge cases that only appear after a product ships.",
    x: 0,
    y: -22,
    rotate: -3,
    startX: 0,
    startY: 17,
    startRotate: -2.2,
    primary: true,
  },
  {
    title: "Transparent by design.",
    copy: "Readable logic, clear structure and documented decisions make the work easier to understand, extend and own.",
    x: 30,
    y: -19,
    rotate: 6,
    startX: .7,
    startRotate: .8,
  },
  {
    title: "Automation with responsibility.",
    copy: "Automation should remove repetitive work while keeping important decisions visible, predictable and controllable.",
    x: 30,
    y: 17,
    rotate: -9,
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
