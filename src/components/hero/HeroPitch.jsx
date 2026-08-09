import clsx from "clsx";
import { heroReveal } from "./heroMotion";

const ArrowUpRight = () => (
  <svg
    className="size-4"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M7 17 17 7M8 7h9v9" />
  </svg>
);

const Play = () => (
  <svg className="size-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="m9 7 8 5-8 5V7Z" />
  </svg>
);

export default function HeroPitch({ onContact }) {
  return (
    <div
      className={clsx(
        heroReveal("delay-[380ms]"),
        "order-4 w-full text-center",
        "min-[901px]:absolute min-[901px]:z-[7] min-[901px]:right-[var(--rail)]",
        "min-[901px]:bottom-[clamp(6rem,14vh,10rem)] min-[901px]:w-[min(40vw,38rem)] min-[901px]:text-right",
      )}
    >
      <p className="m-0 text-[0.94rem] leading-[1.65] font-normal text-[#edf9ff]/72 min-[901px]:ml-auto min-[901px]:max-w-[36rem]">
        I design and develop responsive interfaces, robust APIs and scalable web
        products—from the first idea to production deployment.
      </p>

      <div className="mt-5 flex items-center justify-center gap-2.5 max-[520px]:flex-col min-[901px]:justify-end">
        <button
          type="button"
          onClick={onContact}
          className={clsx(
            "inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-6 py-3",
            "border border-white/[0.08] bg-[#031522]/95 text-[0.8rem] font-semibold text-white",
            "shadow-[0_0.8rem_1.8rem_rgba(0,17,32,0.22),inset_0_1px_0_rgba(255,255,255,0.04)]",
            "transition-[background,transform,border-color] duration-200",
            "hover:-translate-y-0.5 hover:border-white/[0.14] hover:bg-[#01111e] max-[520px]:w-full",
          )}
        >
          <ArrowUpRight />
          Start a project
        </button>

        <a
          href="#projects"
          className={clsx(
            "inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-transparent px-5 py-3",
            "text-[0.8rem] font-semibold text-[#f1fbff]/82 transition-[background,transform,border-color] duration-200",
            "hover:-translate-y-0.5 hover:border-white/[0.06] hover:bg-white/[0.07] max-[520px]:w-full",
          )}
        >
          <Play />
          View projects
        </a>
      </div>
    </div>
  );
}
