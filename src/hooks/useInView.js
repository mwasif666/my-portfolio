import { useEffect, useState } from 'react';

/**
 * Fires once when `ref` scrolls into view. When `active` is false the observer
 * is not attached yet — used to gate hero reveals on the intro loader finishing.
 */
export function useInView(ref, { threshold = 0.15, once = true } = {}, active = true) {
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (!active) return;
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setInView(true);
            if (once) obs.unobserve(e.target);
          }
        });
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [active]); // eslint-disable-line react-hooks/exhaustive-deps

  return inView;
}
