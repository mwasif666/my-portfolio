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
        "order-3 grid w-full grid-cols-1 overflow-hidden rounded-[4px] box-border",
        "border border-white/[0.18] bg-[linear-gradient(145deg,rgba(29,113,158,0.2),rgba(3,47,77,0.32))]",
        "shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-lg",
        "min-[521px]:grid-cols-3",
        "min-[901px]:absolute min-[901px]:z-[7] min-[901px]:right-[var(--rail)] min-[901px]:top-[52%]",
        "min-[901px]:w-[min(44vw,50rem)]",
      )}
      aria-label="Professional highlights"
    >
      {stats.map((stat) => (
        <div
          key={stat.label}
          className={clsx(
            "flex min-h-28 flex-col items-center justify-center px-2 py-4 text-center",
            "border-t border-white/[0.14] first:border-t-0",
            "min-[521px]:min-h-30 min-[521px]:border-t-0 min-[521px]:border-l min-[521px]:border-white/[0.14] min-[521px]:first:border-l-0",
            "min-[901px]:min-h-[7.5rem] min-[901px]:px-4 min-[901px]:py-5",
          )}
        >
          <strong className="text-[clamp(2.1rem,2.8vw,3.6rem)] leading-none font-[650] tracking-[-0.05em]">
            {stat.value}
          </strong>
          <span className="mt-2.5 text-[0.76rem] leading-tight text-[#e6f8ff]/60">
            {stat.label}
          </span>
        </div>
      ))}
    </div>
  );
}
