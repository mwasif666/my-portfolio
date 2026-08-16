import { useRef } from "react";
import useJourneyScrollMotion from "./useJourneyScrollMotion";
import styles from "./JourneySection.module.css";

const options = [
  {
    title: "Starting from an idea",
    copy: "Need a product or website from zero? I can shape the structure, interface and full-stack build, then take it through launch without handing you a half-finished prototype.",
    icon: "launch",
  },
  {
    title: "Scaling what already works",
    copy: "If the product is live but needs better performance, new features, integrations or stronger architecture, I can extend it without rebuilding everything from scratch.",
    icon: "scale",
  },
  {
    title: "Need a focused fix",
    copy: "Have a specific page, bug, API, WooCommerce flow or automation that needs to ship quickly? I can step in, solve the problem and keep the implementation clean.",
    icon: "spark",
  },
];

function JourneyIcon({ type }) {
  if (type === "launch") {
    return (
      <svg viewBox="0 0 32 32" fill="none" aria-hidden="true">
        <path d="M7 23l6-6 4 4 8-9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M20 12h5v5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  if (type === "scale") {
    return (
      <svg viewBox="0 0 32 32" fill="none" aria-hidden="true">
        <circle cx="9" cy="18" r="3.3" stroke="currentColor" strokeWidth="1.7" />
        <circle cx="16" cy="10" r="3.3" stroke="currentColor" strokeWidth="1.7" />
        <circle cx="23" cy="18" r="3.3" stroke="currentColor" strokeWidth="1.7" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <path d="M16 4.5c1.15 6.25 3.25 8.35 9.5 9.5-6.25 1.15-8.35 3.25-9.5 9.5-1.15-6.25-3.25-8.35-9.5-9.5 6.25-1.15 8.35-3.25 9.5-9.5Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    </svg>
  );
}

export default function JourneySection() {
  const sectionRef = useRef(null);
  const cardRefs = useRef([]);

  useJourneyScrollMotion({ sectionRef, cardRefs });

  return (
    <section
      ref={sectionRef}
      className={styles.section}
      id="journey"
      aria-labelledby="journey-title"
    >
      <div className={styles.stage}>
        <div className={styles.grid} aria-hidden="true" />

        <h2 className={styles.heading} id="journey-title">
          Where are you <em>in your build?</em>
        </h2>

        <div className={styles.frame}>
          <div className={styles.panels}>
            {options.map((option, index) => (
              <article
                key={option.title}
                ref={(node) => {
                  cardRefs.current[index] = node;
                }}
                className={styles.card}
              >
                <div className={styles.cardInner}>
                  <div className={`${styles.cardFace} ${styles.cardFront}`} aria-hidden="true">
                    <div className={styles.panelImage} />
                  </div>

                  <div className={`${styles.cardFace} ${styles.cardBack}`}>
                    <div className={styles.surface} aria-hidden="true" />

                    <div className={styles.icon}>
                      <JourneyIcon type={option.icon} />
                    </div>

                    <div className={styles.copy}>
                      <h3>{option.title}</h3>
                      <p>{option.copy}</p>
                    </div>
                  </div>
                </div>
              </article>
            ))}

            <div className={styles.shine} aria-hidden="true" />
          </div>
        </div>
      </div>
    </section>
  );
}
