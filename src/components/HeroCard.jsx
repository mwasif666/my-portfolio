import { useState } from 'react';
import { Logo, ArrowRight } from './Icons';

const ITEMS = [
  { caption: 'Frontend', title: 'React interfaces that feel effortless.' },
  { caption: 'Backend', title: 'APIs and systems built to scale.' },
  { caption: 'Databases', title: 'Reliable data, structured for growth.' },
];

export default function HeroCard() {
  const [idx, setIdx] = useState(0);
  const [dir, setDir] = useState(0);

  const advance = (step) => {
    setDir(step);
    setIdx((i) => (((i + step) % ITEMS.length) + ITEMS.length) % ITEMS.length);
  };

  const item = ITEMS[idx];

  return (
    <div className="hero-card">
      <div className="hero-card-row" onClick={() => advance(1)}>
        <div className="hc-tile"><Logo /></div>
        <div className="hc-panel">
          <div className="hc-slot">
            <div className="hc-item" key={idx} style={{ '--from': dir < 0 ? '-14px' : '14px' }}>
              <div className="hc-cap">{item.caption}</div>
              <div className="hc-title">{item.title}</div>
            </div>
          </div>
          <div className="hc-bottom">
            <div className="hc-dots">
              {ITEMS.map((_, i) => (
                <div key={i} className={'d' + (i === idx ? ' on' : '')} />
              ))}
            </div>
            <div className="hc-nav">
              <button aria-label="Previous" onClick={(e) => { e.stopPropagation(); advance(-1); }}>
                <ArrowRight style={{ transform: 'rotate(180deg)' }} />
              </button>
              <button aria-label="Next" onClick={(e) => { e.stopPropagation(); advance(1); }}>
                <ArrowRight />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
