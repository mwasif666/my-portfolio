import clsx from "clsx";
import { heroReveal } from "./heroMotion";

export default function HeroIntro() {
  return (
    <>
      <span
        className={clsx(
          heroReveal("delay-[80ms]"),
          "order-0 inline-flex items-center gap-2.5 whitespace-nowrap rounded-full",
          "border border-white/15 bg-[#022b47]/30 py-1.5 pr-3.5 pl-1.5 backdrop-blur-md",
          "text-[0.66rem] font-semibold tracking-[0.12em] text-[#ebf9ff]/75 uppercase",
          "min-[901px]:absolute min-[901px]:z-[6] min-[901px]:left-[var(--rail)] min-[901px]:top-[calc(var(--rail-top)+0.7rem)]",
        )}
      >
        <span className="rounded-full bg-[#031422]/90 px-2.5 py-1.5 font-bold tracking-[0.1em] text-white">
          MERN
        </span>
        Full-Stack Development
      </span>

      <div
        className={clsx(
          heroReveal("delay-[120ms]"),
          "relative z-[5] order-1 w-full text-center",
          "min-[901px]:ml-auto min-[901px]:w-[min(58rem,52vw)]",
        )}
      >
        <h1
          className={clsx(
            "m-0 text-balance font-[430] tracking-[-0.065em] text-white",
            "leading-[0.88] [text-shadow:0_0.7rem_2.5rem_rgba(3,50,79,0.16)]",
            "text-[clamp(3.4rem,13vw,6rem)] min-[901px]:text-[clamp(3.4rem,7vw,9rem)]",
            "max-[520px]:text-[3.35rem]",
          )}
        >
          Full-Stack Web
          <span className="block">Starts Here</span>
        </h1>
      </div>
    </>
  );
}
