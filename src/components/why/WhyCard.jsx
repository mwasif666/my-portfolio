import styles from "./WhySection.module.css";

export default function WhyCard({ card, nodeRef }) {
  return (
    <article ref={nodeRef} className={styles.card} data-why-card>
      <h3>{card.title}</h3>
      <p>{card.copy}</p>
    </article>
  );
}
