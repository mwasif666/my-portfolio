import clsx from "clsx";
import { FlowButton } from "@/components/ui/flow-button";
import { heroReveal } from "./heroMotion";
import styles from "./HeroPitch.module.css";

export default function HeroPitch({ onContact }) {
  return (
    <div className={clsx(heroReveal("delay-[380ms]"), styles.root)}>
      <p className={styles.copy}>
        I build fast, responsive websites and full-stack platforms for real
        businesses—from polished frontends and CMS builds to APIs, integrations
        and production deployment.
      </p>

      <div className={styles.actions}>
        <FlowButton
          text="Start a project"
          tone="light"
          onClick={onContact}
          className="max-[520px]:w-full"
        />

        <FlowButton
          text="View projects"
          tone="light"
          href="#projects"
          className="max-[520px]:w-full"
        />
      </div>
    </div>
  );
}
