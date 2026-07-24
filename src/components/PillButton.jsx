import { useRef } from 'react';
import { ArrowRight, ArrowUpRight } from './Icons';
import { useSpringHover } from '../hooks/useSpringHover';

/**
 * variant: 'dark' | 'light' | 'outline'
 * arrow:   'right' | 'up-right' | undefined
 * The whole button root triggers both the scale spring and the arrow shift.
 */
export default function PillButton({ variant = 'dark', arrow, children, onClick, href, type, download }) {
  const rootRef = useRef(null);
  const scaleRef = useRef(null);
  const iconRef = useRef(null);

  useSpringHover(
    rootRef, scaleRef,
    { s: 1 }, { s: 1.04 }, { s: 1 },
    { tension: 320, friction: 18 },
    (el, st) => { el.style.transform = `scale(${st.s})`; }
  );

  const shift = arrow === 'up-right' ? { x: 2, y: -2 } : { x: 3, y: 0 };
  useSpringHover(
    rootRef, iconRef,
    { x: 0, y: 0 }, shift, { x: 0, y: 0 },
    { tension: 320, friction: 18 },
    (el, st) => { el.style.transform = `translate(${st.x}px,${st.y}px)`; }
  );

  const Icon = arrow === 'up-right' ? ArrowUpRight : ArrowRight;

  const inner = (
    <span className="pill-scale" ref={scaleRef}>
      <span className={`pill ${variant} ${arrow ? 'arrow' : 'noarrow'}`}>
        {children}
        {arrow && <span className="pill-badge"><Icon ref={iconRef} /></span>}
      </span>
    </span>
  );

  if (href) {
    return <a className="pill-root" href={href} onClick={onClick} download={download}>{inner}</a>;
  }
  return (
    <button className="pill-root" type={type || 'button'} onClick={onClick}>{inner}</button>
  );
}
