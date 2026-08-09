import clsx from "clsx";
import { heroReveal } from "./heroMotion";

export default function HeroIntro() {
  return (
    <>
      <span
        className={clsx(
          heroReveal("delay-[80ms]"),
          "order-0 inline-flex items-center gap-2.5 whitespace-nowrap rounded-full",
          "border border-white/[0.14] bg-[#062f4a]/35 py-1.5 pr-3.5 pl-1.5 backdrop-blur-lg",
          "shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_0.5rem_1.4rem_rgba(0,30,52,0.08)]",
          "text-[0.65rem] font-semibold tracking-[0.115em] text-[#effaff]/75 uppercase",
          "min-[901px]:absolute min-[901px]:z-[6] min-[901px]:left-[var(--rail)] min-[901px]:top-[calc(var(--rail-top)+0.55rem)]",
        )}
      >
        <span className="rounded-full border border-white/[0.05] bg-[#031624]/95 px-2.5 py-1.5 font-bold tracking-[0.09em] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]">
          MERN
        </span>
        Full-Stack Development
      </span>

      <div
        className={clsx(
          heroReveal("delay-[120ms]"),
          "relative z-[5] order-1 w-full text-center",
          "min-[901px]:ml-auto min-[901px]:w-[min(55rem,50vw)]",
        )}
      >
        <h1
          className={clsx(
            "m-0 text-balance font-[430] tracking-[-0.06em] text-white",
            "leading-[0.9] [text-shadow:0_0.8rem_2.7rem_rgba(1,34,58,0.18)]",
            "text-[clamp(3.3rem,12.5vw,5.8rem)] min-[901px]:text-[clamp(4.6rem,6.65vw,8.2rem)]",
            "max-[520px]:text-[3.2rem]",
          )}
        >
          Full-Stack Web
          <span className="block">Starts Here</span>
        </h1>
      </div>
    </>
  );
}
