import { useEffect, useMemo, useState } from "react";

const WEEK_COUNT = 26;
const CONTRIBUTIONS_API = "https://github-contributions-api.jogruber.de/v4";

function toKey(date) {
  const month = `${date.getMonth() + 1}`.padStart(2, "0");
  const day = `${date.getDate()}`.padStart(2, "0");
  return `${date.getFullYear()}-${month}-${day}`;
}

function startOfDay(value) {
  const date = new Date(value);
  date.setHours(0, 0, 0, 0);
  return date;
}

function levelFor(count) {
  if (count >= 10) return 4;
  if (count >= 6) return 3;
  if (count >= 3) return 2;
  if (count >= 1) return 1;
  return 0;
}

/** Public events are the fallback when the contributions endpoint is unreachable. */
function contributionsFromEvents(events = []) {
  const counts = events.reduce((map, event) => {
    const key = toKey(startOfDay(event.created_at));
    map.set(key, (map.get(key) || 0) + 1);
    return map;
  }, new Map());

  return Array.from(counts, ([date, count]) => ({
    date,
    count,
    level: levelFor(count),
  }));
}

/** GitHub renders one column per week (Sunday → Saturday); mirror that grid. */
function buildWeeks(contributions) {
  const byDate = new Map(contributions.map((entry) => [entry.date, entry]));
  const today = startOfDay(new Date());

  const start = new Date(today);
  start.setDate(today.getDate() - today.getDay() - (WEEK_COUNT - 1) * 7);

  return Array.from({ length: WEEK_COUNT }, (_, week) =>
    Array.from({ length: 7 }, (_, day) => {
      const date = new Date(start);
      date.setDate(start.getDate() + week * 7 + day);
      const key = toKey(date);
      const entry = byDate.get(key);

      return {
        date: key,
        count: entry ? entry.count : 0,
        level: entry ? entry.level : 0,
        future: date > today,
      };
    }),
  );
}

export function useGitHubActivity(username) {
  const [state, setState] = useState({
    contributions: [],
    yearTotal: 0,
    profile: null,
    loading: true,
    error: false,
  });

  useEffect(() => {
    const controller = new AbortController();
    const options = {
      signal: controller.signal,
      headers: { Accept: "application/json" },
    };

    const loadProfile = fetch(
      `https://api.github.com/users/${username}`,
      options,
    )
      .then((response) => (response.ok ? response.json() : null))
      .catch(() => null);

    const loadContributions = fetch(
      `${CONTRIBUTIONS_API}/${username}?y=last`,
      options,
    )
      .then((response) => {
        if (!response.ok) throw new Error("contributions unavailable");
        return response.json();
      })
      .then((data) => ({
        contributions: data.contributions || [],
        yearTotal: data.total?.lastYear ?? 0,
      }))
      .catch(() =>
        fetch(
          `https://api.github.com/users/${username}/events/public?per_page=100`,
          options,
        )
          .then((response) => {
            if (!response.ok) throw new Error("events unavailable");
            return response.json();
          })
          .then((events) => {
            const contributions = contributionsFromEvents(events);
            return {
              contributions,
              yearTotal: contributions.reduce(
                (total, entry) => total + entry.count,
                0,
              ),
            };
          }),
      );

    Promise.all([loadProfile, loadContributions])
      .then(([profile, activity]) => {
        setState({ ...activity, profile, loading: false, error: false });
      })
      .catch((error) => {
        if (error.name === "AbortError") return;
        setState((current) => ({ ...current, loading: false, error: true }));
      });

    return () => controller.abort();
  }, [username]);

  const weeks = useMemo(
    () => buildWeeks(state.contributions),
    [state.contributions],
  );

  const windowTotal = useMemo(
    () =>
      weeks.reduce(
        (total, week) =>
          total + week.reduce((sum, day) => sum + day.count, 0),
        0,
      ),
    [weeks],
  );

  return { ...state, weeks, windowTotal };
}
