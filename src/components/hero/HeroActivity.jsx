import clsx from "clsx";
import GitHubActivity from "../GitHubActivity";
import { heroReveal } from "./heroMotion";

export default function HeroActivity() {
  return (
    <div
      className={clsx(
        heroReveal("delay-[440ms]"),
        "order-5 w-full",
        "min-[901px]:absolute min-[901px]:z-[8] min-[901px]:left-[var(--rail)]",
        "min-[901px]:bottom-[clamp(1.8rem,4vh,3.25rem)] min-[901px]:w-[min(40vw,31rem)]",
      )}
    >
      <GitHubActivity username="mwasif666" />
    </div>
  );
}
