import { useEffect, useState } from 'react';
import { Logo, XIcon } from './Icons';
import { NAV } from './Header';
import { useScroll } from '../contexts/ScrollContext';
import { useClock } from '../hooks/useClock';

// Full-screen overlay. Mounts while opening/closing so exit animates, then unmounts.
export default function NavMenu({ open, onClose, onContact }) {
  const { stopScroll, startScroll, scrollToId } = useScroll();
  const { time } = useClock();
  const [mounted, setMounted] = useState(false);
  const [shown, setShown] = useState(false);

  useEffect(() => { if (open) setMounted(true); }, [open]);

  // Enter: lock scroll, fade in, listen for Escape. Cleanup unlocks scroll.
  useEffect(() => {
    if (!mounted) return;
    stopScroll();
    const r = requestAnimationFrame(() => requestAnimationFrame(() => setShown(true)));
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    return () => {
      cancelAnimationFrame(r);
      document.removeEventListener('keydown', onKey);
      startScroll();
    };
  }, [mounted]); // eslint-disable-line react-hooks/exhaustive-deps

  // Exit: fade out, then unmount after the transition.
  useEffect(() => {
    if (open || !mounted) return;
    setShown(false);
    const t = setTimeout(() => setMounted(false), 500);
    return () => clearTimeout(t);
  }, [open, mounted]);

  if (!mounted) return null;

  const handle = (it) => {
    onClose();
    if (it.contact) onContact();
    else scrollToId(it.target);
  };

  return (
    <div id="navmenu" className={shown ? 'in' : ''}>
      <div className="shell nm-top">
        <div className="nm-brand"><Logo />Portfolio</div>
        <button className="nm-close" onClick={onClose}><XIcon />Close</button>
      </div>

      <nav className="shell nm-nav">
        <ul>
          {NAV.map((it, i) => (
            <li key={i}>
              <button className="nm-item" style={{ transitionDelay: `${i * 45 + 80}ms` }} onClick={() => handle(it)}>
                <span className="n">0{i + 1}</span>
                <span className="l">{it.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <div className="shell nm-bot">
        <span>Local time — {time}</span>
        <button className="start" onClick={() => { onClose(); onContact(); }}>Let's work together →</button>
      </div>
    </div>
  );
}
