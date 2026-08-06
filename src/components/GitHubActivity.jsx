import { useGitHubActivity } from "../hooks/useGitHubActivity";
import styles from "./GitHubActivity.module.css";

function levelFor(count) {
  if (count >= 6) return 4;
  if (count >= 4) return 3;
  if (count >= 2) return 2;
  if (count >= 1) return 1;
  return 0;
}

export default function GitHubActivity({ username }) {
  const { days, profile, activityCount, loading, error } =
    useGitHubActivity(username);

  return (
    <a
      className={styles.card}
      href={`https://github.com/${username}`}
      target="_blank"
      rel="noreferrer"
      aria-label={`View ${username} on GitHub`}
    >
      <div className={styles.header}>
        <div>
          <span className={styles.eyebrow}>Live from GitHub</span>
          <strong>Development activity</strong>
        </div>
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path
            fill="currentColor"
            d="M12 .7a11.5 11.5 0 0 0-3.64 22.41c.58.1.79-.25.79-.56v-2.23c-3.22.7-3.9-1.37-3.9-1.37-.52-1.34-1.28-1.7-1.28-1.7-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.57-.29-5.27-1.28-5.27-5.69 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.47.11-3.05 0 0 .97-.31 3.16 1.18a10.95 10.95 0 0 1 5.76 0c2.2-1.49 3.16-1.18 3.16-1.18.63 1.58.23 2.76.11 3.05.74.81 1.19 1.83 1.19 3.09 0 4.42-2.71 5.39-5.29 5.68.42.36.79 1.06.79 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .7Z"
          />
        </svg>
      </div>

      <div className={styles.grid} aria-label="Recent public GitHub activity">
        {days.map(({ date, count }) => (
          <span
            className={styles.dot}
            data-level={loading ? 0 : levelFor(count)}
            key={date}
            title={`${date}: ${count} public ${count === 1 ? "event" : "events"}`}
          />
        ))}
      </div>

      <div className={styles.footer}>
        <span>
          {error
            ? "Open GitHub profile"
            : loading
              ? "Syncing activity…"
              : `${activityCount} recent public events`}
        </span>
        <span>{profile ? `${profile.public_repos} public repos` : `@${username}`}</span>
      </div>
    </a>
  );
}
