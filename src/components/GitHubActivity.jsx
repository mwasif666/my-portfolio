import { useGitHubActivity } from "../hooks/useGitHubActivity";
import clsx from "clsx";

const LEGEND_LEVELS = [0, 1, 2, 3, 4];

/** GitHub-style intensity ramp, tuned to the banner's blue palette. */
const LEVEL_CLASS = [
  "bg-[#ace1f9]/12 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.04)]",
  "bg-[#70cffa]/40",
  "bg-[#5bcafc]/70",
  "bg-[#6cd2ff] shadow-[0_0_0.7rem_rgba(108,210,255,0.22)]",
  "bg-[#d3f3ff] shadow-[0_0_0.8rem_rgba(147,224,255,0.4)]",
];

function labelFor({ date, count, future }) {
  if (future) return date;
  return `${date}: ${count} ${count === 1 ? "contribution" : "contributions"}`;
}

export default function GitHubActivity({ username }) {
  const { weeks, windowTotal, yearTotal, profile, loading, error } =
    useGitHubActivity(username);

  return (
    <a
      href={`https://github.com/${username}`}
      target="_blank"
      rel="noreferrer"
      aria-label={`View ${username} on GitHub`}
      className={clsx(
        "relative block w-full rounded-[1.35rem] border border-white/15 px-6 pt-5 pb-4.5",
        "bg-[linear-gradient(145deg,rgba(8,51,83,0.62),rgba(3,29,51,0.44))]",
        "shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_1.25rem_3rem_rgba(0,24,45,0.18)]",
        "text-white font-[Onest,sans-serif] backdrop-blur-xl backdrop-saturate-150",
        "transition-[transform,border-color,background] duration-200",
        "hover:-translate-y-1 hover:border-[#8fdeff]/45",
        "hover:bg-[linear-gradient(145deg,rgba(9,62,99,0.68),rgba(3,32,56,0.5))]",
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <span className="block text-[0.66rem] font-[650] tracking-[0.15em] text-[#91dcff] uppercase">
            Live from GitHub
          </span>
          <strong className="mt-1 block text-[1.02rem] font-semibold tracking-[-0.01em]">
            Contribution activity
          </strong>
        </div>
        <svg viewBox="0 0 24 24" aria-hidden="true" className="size-6 shrink-0 text-white/70">
          <path
            fill="currentColor"
            d="M12 .7a11.5 11.5 0 0 0-3.64 22.41c.58.1.79-.25.79-.56v-2.23c-3.22.7-3.9-1.37-3.9-1.37-.52-1.34-1.28-1.7-1.28-1.7-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.57-.29-5.27-1.28-5.27-5.69 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.47.11-3.05 0 0 .97-.31 3.16 1.18a10.95 10.95 0 0 1 5.76 0c2.2-1.49 3.16-1.18 3.16-1.18.63 1.58.23 2.76.11 3.05.74.81 1.19 1.83 1.19 3.09 0 4.42-2.71 5.39-5.29 5.68.42.36.79 1.06.79 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .7Z"
          />
        </svg>
      </div>

      {/* One column per week, seven rows per day — same shape as GitHub's graph. */}
      <div
        aria-label={`${windowTotal} contributions in the last 26 weeks`}
        className={clsx(
          "mt-4.5 mb-4 grid auto-cols-fr grid-flow-col gap-1",
          loading && "opacity-55",
        )}
      >
        {weeks.map((week) => (
          <div key={week[0].date} className="grid grid-rows-7 gap-1">
            {week.map((day) => (
              <span
                key={day.date}
                title={labelFor(day)}
                className={clsx(
                  "aspect-square rounded-full",
                  LEVEL_CLASS[loading || day.future ? 0 : day.level],
                  day.future && "opacity-35",
                )}
              />
            ))}
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between gap-3 text-[0.68rem] tracking-[0.03em] text-[#e6f7ff]/55">
        <span>
          {error
            ? "Open GitHub profile"
            : loading
              ? "Syncing contributions…"
              : `${yearTotal} contributions this year`}
          {profile ? ` · ${profile.public_repos} public repos` : ""}
        </span>

        <span className="inline-flex shrink-0 items-center gap-1 text-[#e6f7ff]/45" aria-hidden="true">
          Less
          {LEGEND_LEVELS.map((level) => (
            <i key={level} className={clsx("size-2 rounded-full", LEVEL_CLASS[level])} />
          ))}
          More
        </span>
      </div>
    </a>
  );
}
