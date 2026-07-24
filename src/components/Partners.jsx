import { useRef } from 'react';
import Reveal from './Reveal';
import { CircleDot } from './Icons';
import { useSpringHover } from '../hooks/useSpringHover';

const NAMES = ['React', 'Next.js', 'Node.js', 'TypeScript', 'PostgreSQL', 'MongoDB', 'AWS'];

function Partner({ name }) {
  const ref = useRef(null);
  useSpringHover(
    ref, ref,
    { y: 0, o: 0.7 }, { y: -2, o: 1 }, { y: 0, o: 0.7 },
    { tension: 320, friction: 20 },
    (el, s) => { el.style.transform = `translateY(${s.y}px)`; el.style.opacity = s.o; }
  );
  return (
    <li>
      <span className="partner" ref={ref}><CircleDot /><span>{name}</span></span>
    </li>
  );
}

export default function Partners({ ready }) {
  return (
    <Reveal className="partners" gate ready={ready} delay={550} move={14}>
      <div className="lbl">Core technologies</div>
      <ul>
        {NAMES.map((n) => <Partner key={n} name={n} />)}
      </ul>
    </Reveal>
  );
}
