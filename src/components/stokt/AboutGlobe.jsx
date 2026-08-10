import styles from "./About.module.css";

export default function AboutGlobe() {
  return (
    <div className={styles.globeStage} aria-hidden="true">
      <svg className={styles.globeSvg} viewBox="0 0 900 560" role="presentation">
        <defs>
          <clipPath id="about-globe-clip">
            <ellipse cx="450" cy="430" rx="390" ry="305" />
          </clipPath>
          <radialGradient id="about-globe-fade" cx="50%" cy="42%" r="64%">
            <stop offset="0" stopColor="white" stopOpacity=".98" />
            <stop offset=".72" stopColor="white" stopOpacity=".72" />
            <stop offset="1" stopColor="white" stopOpacity=".16" />
          </radialGradient>
        </defs>

        <g clipPath="url(#about-globe-clip)" fill="none" stroke="url(#about-globe-fade)">
          <ellipse cx="450" cy="430" rx="390" ry="305" strokeWidth="1.25" />
          <ellipse cx="450" cy="430" rx="320" ry="305" strokeWidth=".72" opacity=".45" />
          <ellipse cx="450" cy="430" rx="230" ry="305" strokeWidth=".72" opacity=".4" />
          <ellipse cx="450" cy="430" rx="125" ry="305" strokeWidth=".72" opacity=".38" />
          <ellipse cx="450" cy="430" rx="55" ry="305" strokeWidth=".72" opacity=".34" />
          <ellipse cx="450" cy="430" rx="390" ry="245" strokeWidth=".7" opacity=".42" />
          <ellipse cx="450" cy="430" rx="390" ry="170" strokeWidth=".7" opacity=".38" />
          <ellipse cx="450" cy="430" rx="390" ry="95" strokeWidth=".7" opacity=".34" />

          <path d="M188 346c35-35 53-67 95-78 41-11 66 1 88 20 18 16 32 17 57 8 31-11 50-2 67 14 17 15 25 35 49 42 24 8 51-2 73 9 18 9 25 30 20 48-7 22-27 28-47 33-24 6-42 16-51 39-8 21-8 50-30 64-22 14-52 4-69-13-16-16-24-39-43-51-24-15-55-7-77-22-20-14-26-41-43-55-18-14-48-14-59-37-11-23 5-47 26-63Z" strokeWidth="1.25" opacity=".9" />
          <path d="M506 285c27-26 70-27 97-12 25 14 35 43 57 61 20 17 48 20 66 40 14 16 15 39 5 56-13 23-43 27-67 20-26-8-46-27-72-34-24-6-52-2-68-23-12-15-7-35-17-51-12-19-31-34-1-57Z" strokeWidth="1.1" opacity=".82" />
          <path d="M323 251c19-21 52-37 82-38 26-1 53 11 65 33 10 18 2 41-15 53-18 13-45 13-64 25-16 10-24 29-40 39-20 13-49 10-66-7-14-15-15-39-7-58 9-19 28-29 45-47Z" strokeWidth="1.05" opacity=".76" />
          <path d="M610 399c19 8 35 23 40 42 5 20-3 42-20 54-19 14-47 14-67 2-18-11-26-33-20-53 6-19 21-36 40-44 9-4 18-5 27-1Z" strokeWidth="1" opacity=".72" />
        </g>
      </svg>
    </div>
  );
}
