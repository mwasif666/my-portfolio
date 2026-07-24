import { useEffect, useRef, useState } from 'react';
import { Logo } from './Icons';
import { useScroll } from '../contexts/ScrollContext';

// Intro loader: counts 000 -> 100 (easeInOutCubic over 1300ms) then slides up.
export default function PageLoader({ onDone }) {
  const { stopScroll, startScroll } = useScroll();
  const [progress, setProgress] = useState(0);
  const [exit, setExit] = useState(false);
  const [gone, setGone] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    stopScroll();
    const FILL_MS = 1300;
    const ease = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
    const start = performance.now();
    let raf;
    function frame(now) {
      const t = Math.min((now - start) / FILL_MS, 1);
      setProgress(Math.round(ease(t) * 100));
      if (t < 1) raf = requestAnimationFrame(frame);
      else setExit(true);
    }
    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!exit) return;
    const el = ref.current;
    function onEnd(e) {
      if (e.propertyName !== 'transform') return;
      el.removeEventListener('transitionend', onEnd);
      startScroll();
      onDone();
      setGone(true);
    }
    el.addEventListener('transitionend', onEnd);
    return () => el.removeEventListener('transitionend', onEnd);
  }, [exit]); // eslint-disable-line react-hooks/exhaustive-deps

  if (gone) return null;

  return (
    <div id="loader" ref={ref} className={exit ? 'exit' : ''}>
      <div className="loader-center">
        <div className="loader-brand"><Logo />Portfolio</div>
        <p className="loader-tag">Full-stack ideas, built into polished digital products.</p>
      </div>
      <div className="loader-prog">
        <div className="loader-track">
          <div className="loader-fill" style={{ width: progress + '%' }} />
        </div>
        <div className="loader-meta">
          <span>Loading</span>
          <span className="count">{String(progress).padStart(3, '0')}</span>
        </div>
      </div>
    </div>
  );
}
