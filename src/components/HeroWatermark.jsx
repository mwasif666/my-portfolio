import { useEffect, useState } from 'react';

// Giant LUMORA watermark; reveals to 0.4 opacity 300ms after the loader leaves.
export default function HeroWatermark({ ready }) {
  const [shown, setShown] = useState(false);
  useEffect(() => {
    if (!ready) return;
    const t = setTimeout(() => setShown(true), 300);
    return () => clearTimeout(t);
  }, [ready]);
  return <div className={'hero-watermark' + (shown ? ' in' : '')}>FULL STACK</div>;
}
