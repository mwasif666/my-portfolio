import { useRef } from 'react';
import { useInView } from '../hooks/useInView';

/**
 * Entrance reveal: fades + slides up when scrolled into view. Uses a CSS
 * transition with the react-spring-equivalent easing/duration and a delay.
 * When `gate` is set, the reveal only begins once `ready` is true (used so
 * hero reveals wait for the intro loader to leave).
 */
export default function Reveal({
  as: Tag = 'div',
  delay = 0,
  move = 16,
  scale,
  noMove = false,
  gate = false,
  ready = true,
  className,
  children,
  style,
  ...rest
}) {
  const ref = useRef(null);
  const active = gate ? ready : true;
  const inView = useInView(ref, { threshold: 0.15 }, active);

  const initial = `translateY(${noMove ? 0 : move}px)${scale ? ` scale(${scale})` : ''}`.trim();
  const st = {
    opacity: inView ? 1 : 0,
    transform: inView ? 'none' : initial,
    transition: inView
      ? `opacity .8s cubic-bezier(.16,1,.3,1) ${delay}ms, transform .8s cubic-bezier(.16,1,.3,1) ${delay}ms`
      : 'none',
    ...style,
  };

  return (
    <Tag ref={ref} className={className} style={st} {...rest}>
      {children}
    </Tag>
  );
}
