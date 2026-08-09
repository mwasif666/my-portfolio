import clsx from "clsx";
import styles from "./HeroOrbitLines.module.css";

export default function HeroOrbitLines({ active }) {
  return (
    <div
      className={clsx(styles.root, active && styles.active)}
      aria-hidden="true"
    >
      <span className={styles.field} />
      <span className={clsx(styles.field, styles.secondary)} />
    </div>
  );
}
