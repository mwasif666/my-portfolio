import { useEffect, useState } from 'react';
import { GridIcon } from './Icons';
import { useScroll } from '../contexts/ScrollContext';

export const NAV = [
  { label: 'Home', target: 'home', current: true },
  { label: 'About', target: 'about' },
  { label: 'Skills', target: 'skills' },
  { label: 'Projects', target: 'projects' },
  { label: 'Contact', contact: true },
];

export default function Header({ ready, onMenu, onContact }) {
  const [shown, setShown] = useState(false);
  const { scrollToId } = useScroll();

  useEffect(() => {
    if (!ready) return;
    const timer = setTimeout(() => setShown(true), 120);
    return () => clearTimeout(timer);
  }, [ready]);

  const navigate = (item) => item.contact ? onContact() : scrollToId(item.target);

  return (
    <header id="header" className={shown ? 'in reference-header' : 'reference-header'}>
      <div className="shell header-inner">
        <button className="reference-identity" onClick={() => scrollToId('home')} aria-label="Muhammad Wasif home">
          <span className="reference-mark">MW<i>.</i></span>
          <span className="reference-divider" />
          <span className="reference-name">Muhammad Wasif</span>
        </button>

        <nav className="reference-nav" aria-label="Primary navigation">
          <ul>
            {NAV.map((item) => (
              <li key={item.label}>
                <button className={item.current ? 'active' : ''} onClick={() => navigate(item)}>{item.label}</button>
              </li>
            ))}
          </ul>
        </nav>

        <div className="reference-status">
          <i />
          <span>Based in Pakistan</span>
          <b>•</b>
          <span>Available worldwide</span>
        </div>

        <button className="reference-menu" onClick={onMenu} aria-label="Open menu"><GridIcon /></button>
      </div>
    </header>
  );
}
