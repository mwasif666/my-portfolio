import { useRef } from "react";
import NoiseDarkBlueGradientWithSquares from "./ui/noise-dark-blue-gradient-with-squares";
import GitHubActivity from "./GitHubActivity";
import { useInView } from "../hooks/useInView";
import clsx from "clsx";
import myImg from "../../myimg.png";
import styles from "./KontourBanner.module.css";

const ArrowUpRight = ({ className = "size-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M7 17 17 7M8 7h9v9" />
  </svg>
);

const Play = ({ className = "size-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="m9 7 8 5-8 5V7Z" />
  </svg>
);

const stats = [
  { value: "30+", label: "Projects delivered" },
  { value: "4+", label: "Years building" },
  { value: "100%", label: "Full-stack delivery" },
];

/** Fades up once the section scrolls into view; `delay` is a Tailwind class. */
const reveal = (delay) =>
  clsx(
    "opacity-0 translate-y-5 transition-[opacity,transform] duration-700 ease-[cubic-bezier(.22,1,.36,1)]",
    "group-data-[visible=true]:opacity-100 group-data-[visible=true]:translate-y-0",
    "motion-reduce:opacity-100 motion-reduce:translate-y-0 motion-reduce:transition-none",
    delay,
  );

export default function KontourBanner({ onContact, id = "home", theme = "orange" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { threshold: 0.2 });

  return (
    <section
      ref={ref}
      id={id}
      data-visible={inView ? "true" : undefined}
      className={clsx(
        "kontour portfolio-banner group relative overflow-hidden",
        `portfolio-banner--${theme}`,
        "bg-[#072b48] text-[#f5fbff] font-[Onest,sans-serif]",
        "min-[901px]:min-h-[100svh]",
      )}
    >
      {theme === "blue" && (
        <div className="portfolio-loader-background absolute inset-0 opacity-[0.42] mix-blend-screen" aria-hidden="true">
          <NoiseDarkBlueGradientWithSquares
            direction="diagonal"
            speed={0.35}
            squareSize={54}
            borderColor="rgba(255,255,255,0.08)"
            vignette
          />
        </div>
      )}

      <div className={clsx(styles.tint, "pointer-events-none absolute inset-0 z-[1]")} aria-hidden="true" />
      <div className={clsx(styles.light, "pointer-events-none absolute inset-0 z-[1]")} aria-hidden="true" />

      <div
        className={clsx(
          "[--rail:clamp(1.25rem,5.5vw,7.5rem)] [--rail-top:clamp(8.5rem,14vh,11rem)]",
          "relative z-[4] mx-auto w-[min(100%,140rem)]",
          "flex flex-col items-center gap-7 px-5 pt-30 pb-10",
          "min-[901px]:block min-[901px]:min-h-[100svh]",
          "min-[901px]:px-[var(--rail)] min-[901px]:pt-[var(--rail-top)] min-[901px]:pb-[clamp(1.6rem,3vh,2.5rem)]",
          "max-[520px]:pt-27",
        )}
      >
        <span
          className={clsx(
            reveal("delay-[80ms]"),
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
            reveal("delay-[120ms]"),
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

        <div
          className={clsx(
            reveal("delay-[200ms]"),
            "pointer-events-none relative order-2 -mt-8 -mb-16 h-144 w-[118%]",
            "max-[520px]:-mb-12 max-[520px]:h-108",
            "min-[901px]:absolute min-[901px]:z-[6] min-[901px]:m-0",
            "min-[901px]:left-[clamp(0rem,14vw,20rem)] min-[901px]:-bottom-20",
            "min-[901px]:aspect-[887/882] min-[901px]:h-[min(100vh,33rem_+_21vw,60rem)] min-[901px]:w-auto",
          )}
        >
          <div className={clsx(styles.portraitGlow, "absolute inset-[15%_3%_2%] blur-[1.3rem]")} aria-hidden="true" />
          <img
            src={myImg}
            alt="Muhammad Wasif, full-stack web developer"
            draggable="false"
            className={clsx(styles.portraitImg, "relative z-[2] h-full w-full object-contain object-bottom")}
          />
        </div>

        <button
          type="button"
          onClick={onContact}
          aria-label="Start a project with Muhammad Wasif"
          className={clsx(
            "hidden opacity-0 transition-[background,transform,opacity] duration-200 delay-[340ms]",
            "group-data-[visible=true]:opacity-100 motion-reduce:opacity-100 motion-reduce:transition-none",
            "min-[901px]:absolute min-[901px]:z-[7] min-[901px]:grid min-[901px]:place-content-center",
            "min-[901px]:left-[clamp(4.5rem,11vw,15rem)] min-[901px]:top-1/2 min-[901px]:-translate-y-1/2",
            "min-[901px]:size-25 min-[1101px]:size-30 min-[901px]:gap-1 min-[901px]:rounded-full",
            "min-[901px]:border min-[901px]:border-[#d0f1ff]/35 min-[901px]:bg-[#05486e]/45 min-[901px]:text-white min-[901px]:backdrop-blur-md",
            "min-[901px]:hover:bg-[#7cdaff]/30 min-[901px]:hover:scale-105",
          )}
        >
          <ArrowUpRight className="size-5 justify-self-center" />
          <span className="text-xs font-semibold min-[1101px]:text-[0.8rem]">Start now</span>
        </button>

        <div
          className={clsx(
            reveal("delay-[300ms]"),
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
              <span className="mt-2.5 text-[0.76rem] leading-tight text-[#e6f8ff]/60">{stat.label}</span>
            </div>
          ))}
        </div>

        <div
          className={clsx(
            reveal("delay-[380ms]"),
            "order-4 w-full text-center",
            "min-[901px]:absolute min-[901px]:z-[7] min-[901px]:right-[var(--rail)]",
            "min-[901px]:bottom-[clamp(6rem,15vh,11rem)] min-[901px]:w-[min(42vw,40rem)] min-[901px]:text-right",
          )}
        >
          <p className="m-0 text-[0.98rem] leading-relaxed text-[#e5f7ff]/75">
            I design and develop responsive interfaces, robust APIs and scalable
            web products—from the first idea to production deployment.
          </p>

          <div className="mt-5 flex items-center justify-center gap-3 max-[520px]:flex-col min-[901px]:justify-end">
            <button
              type="button"
              onClick={onContact}
              className={clsx(
                "inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-6 py-3",
                "border border-white/10 bg-[#03121f]/90 text-[0.82rem] font-semibold text-white",
                "shadow-[0_0.8rem_1.8rem_rgba(0,17,32,0.28)] transition-[background,transform] duration-200",
                "hover:-translate-y-0.5 hover:bg-[#01111e] max-[520px]:w-full",
              )}
            >
              <ArrowUpRight />
              Start a project
            </button>

            <a
              href="#projects"
              className={clsx(
                "inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-6 py-3",
                "text-[0.82rem] font-semibold text-[#f0fbff]/85 transition-[background,transform] duration-200",
                "hover:-translate-y-0.5 hover:bg-white/10 max-[520px]:w-full",
              )}
            >
              <Play />
              View projects
            </a>
          </div>
        </div>

        <div
          className={clsx(
            reveal("delay-[440ms]"),
            "order-5 w-full",
            "min-[901px]:absolute min-[901px]:z-[8] min-[901px]:left-[var(--rail)]",
            "min-[901px]:bottom-[clamp(1.8rem,4vh,3.25rem)] min-[901px]:w-[min(40vw,31rem)]",
          )}
        >
          <GitHubActivity username="mwasif666" />
        </div>
      </div>
    </section>
  );
}
