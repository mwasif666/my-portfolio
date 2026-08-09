import styles from "./HeroBackdrop.module.css";

export default function HeroBackdrop() {
  return (
    <div className={styles.root} aria-hidden="true">
      <div className={styles.grid} />
      <div className={styles.shade} />
    </div>
  );
}
