import { useEffect, useMemo, useState } from "react";

const DAY_COUNT = 42;

function startOfDay(value) {
  const date = new Date(value);
  date.setHours(0, 0, 0, 0);
  return date;
}

function buildDays(events = []) {
  const today = startOfDay(new Date());
  const eventCounts = events.reduce((counts, event) => {
    const key = startOfDay(event.created_at).toISOString().slice(0, 10);
    counts.set(key, (counts.get(key) || 0) + 1);
    return counts;
  }, new Map());

  return Array.from({ length: DAY_COUNT }, (_, index) => {
    const date = new Date(today);
    date.setDate(today.getDate() - (DAY_COUNT - 1 - index));
    const key = date.toISOString().slice(0, 10);
    return { date: key, count: eventCounts.get(key) || 0 };
  });
}

export function useGitHubActivity(username) {
  const [state, setState] = useState({
    events: [],
    profile: null,
    loading: true,
    error: false,
  });

  useEffect(() => {
    const controller = new AbortController();
    const requestOptions = {
      signal: controller.signal,
      headers: { Accept: "application/vnd.github+json" },
    };

    Promise.all([
      fetch(`https://api.github.com/users/${username}`, requestOptions),
      fetch(
        `https://api.github.com/users/${username}/events/public?per_page=100`,
        requestOptions,
      ),
    ])
      .then(async ([profileResponse, eventsResponse]) => {
        if (!profileResponse.ok || !eventsResponse.ok) {
          throw new Error("GitHub request failed");
        }

        const [profile, events] = await Promise.all([
          profileResponse.json(),
          eventsResponse.json(),
        ]);

        setState({ profile, events, loading: false, error: false });
      })
      .catch((error) => {
        if (error.name !== "AbortError") {
          setState((current) => ({
            ...current,
            loading: false,
            error: true,
          }));
        }
      });

    return () => controller.abort();
  }, [username]);

  const days = useMemo(() => buildDays(state.events), [state.events]);
  const activityCount = useMemo(
    () => days.reduce((total, day) => total + day.count, 0),
    [days],
  );

  return { ...state, days, activityCount };
}
