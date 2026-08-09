import clsx from "clsx";
import GitHubActivity from "../GitHubActivity";
import { heroReveal } from "./heroMotion";
import styles from "./HeroActivity.module.css";

export default function HeroActivity() {
  return (
    <div className={clsx(heroReveal("delay-[440ms]"), styles.root)}>
      <GitHubActivity username="mwasif666" />
    </div>
  );
}
