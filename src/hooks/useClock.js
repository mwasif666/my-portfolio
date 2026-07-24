import { useEffect, useState } from 'react';

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

// Live local clock. Fallbacks match the original design until the first tick.
export function useClock() {
  const [t, setT] = useState({ time: '9:41am', date: '12 March, 2025' });

  useEffect(() => {
    function tick() {
      const d = new Date();
      let h = d.getHours();
      const mer = h >= 12 ? 'pm' : 'am';
      h = h % 12 || 12;
      const m = String(d.getMinutes()).padStart(2, '0');
      setT({
        time: `${h}:${m}${mer}`,
        date: `${d.getDate()} ${MONTHS[d.getMonth()]}, ${d.getFullYear()}`,
      });
    }
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return t;
}
