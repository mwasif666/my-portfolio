import clsx from "clsx";
import { heroReveal } from "./heroMotion";

const stats = [
  { value: "30+", label: "Projects delivered" },
  { value: "4+", label: "Years building" },
  { value: "100%", label: "Full-stack delivery" },
];

export default function HeroStats() {
  return (
    <div
      className={clsx(
        heroReveal("delay-[300ms]"),
        "order-3 grid w-full grid-cols-1 overflow-hidden rounded-[0.45rem] box-border",
        "border border-white/[0.16] bg-[linear-gradient(145deg,rgba(27,104,148,0.22),rgba(3,42,68,0.3))]",
        "shadow-[inset_0_1px_0_rgba(255,255,255,0.07),0_1rem_2.6rem_rgba(0,27,48,0.08)] backdrop-blur-xl",
        "min-[521px]:grid-cols-3",
        "min-[901px]:absolute min-[901px]:z-[7] min-[901px]:right-[var(--rail)] min-[901px]:top-[51.5%]",
        "min-[901px]:w-[min(43vw,49rem)]",
      )}
      aria-label="Professional highlights"
    >
      {stats.map((stat) => (
        <div
          key={stat.label}
          className={clsx(
            "flex min-h-27 flex-col items-center justify-center px-3 py-4 text-center",
            "border-t border-white/[0.12] first:border-t-0",
            "min-[521px]:min-h-29 min-[521px]:border-t-0 min-[521px]:border-l min-[521px]:border-white/[0.12] min-[521px]:first:border-l-0",
            "min-[901px]:min-h-[7rem] min-[901px]:px-4 min-[901px]:py-4.5",
          )}
        >
          <strong className="text-[clamp(2rem,2.65vw,3.4rem)] leading-none font-[650] tracking-[-0.05em] text-white">
            {stat.value}
          </strong>
          <span className="mt-2.5 text-[0.72rem] leading-tight font-medium text-[#e9f8ff]/58">
            {stat.label}
          </span>
        </div>
      ))}
    </div>
  );
}
