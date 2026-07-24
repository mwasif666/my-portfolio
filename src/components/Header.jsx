import { useEffect, useState } from 'react';
import { GridIcon } from './Icons';
import { useScroll } from '../contexts/ScrollContext';

export const NAV = [
  { label: 'Home', target: 'home', current: true },
  { label: 'About', target: 'about' },
  { label: 'Services', target: 'services' },
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
    <header id="header" className={shown ? 'in portfolio-header' : 'portfolio-header'}>
      <div className="portfolio-header-inner">
        <button className="portfolio-logo" onClick={() => scrollToId('home')} aria-label="Wasif.dev home">
          WASIF<span>.DEV</span>
        </button>

        <nav className="portfolio-nav" aria-label="Primary navigation">
          <ul>
            {NAV.map((item) => (
              <li key={item.label}>
                <button onClick={() => navigate(item)}>{item.label}</button>
              </li>
            ))}
          </ul>
        </nav>

        <button className="portfolio-menu" onClick={onMenu} aria-label="Open menu"><GridIcon /></button>
      </div>
    </header>
  );
}
