import clsx from "clsx";
import { heroReveal } from "./heroMotion";
import styles from "./HeroStats.module.css";

const stats = [
  { value: "30+", label: "Projects delivered" },
  { value: "4+", label: "Years building" },
  { value: "100%", label: "Full-stack delivery" },
];

export default function HeroStats() {
  return (
    <div
      className={clsx(heroReveal("delay-[300ms]"), styles.root)}
      aria-label="Professional highlights"
    >
      {stats.map((stat) => (
        <div key={stat.label} className={styles.item}>
          <strong className={styles.value}>{stat.value}</strong>
          <span className={styles.label}>{stat.label}</span>
        </div>
      ))}
    </div>
  );
}
