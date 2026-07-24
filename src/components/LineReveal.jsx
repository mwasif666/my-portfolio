import { useRef } from 'react';
import { useInView } from '../hooks/useInView';

/**
 * Line-by-line clip reveal (replaces spring-text-engine). Each line lives in an
 * overflow-clip span; the inner span slides up from 110% with per-line stagger.
 */
export default function LineReveal({
  as: Tag = 'h2',
  lines,
  stagger = 0,
  delay = 0,
  gate = false,
  ready = true,
  className,
}) {
  const ref = useRef(null);
  const active = gate ? ready : true;
  const inView = useInView(ref, { threshold: 0.2 }, active);

  return (
    <Tag ref={ref} className={className}>
      {lines.map((line, i) => (
        <span className={'line-clip' + (inView ? ' in' : '')} key={i}>
          <span style={{ transitionDelay: `${delay + i * stagger}ms` }}>{line}</span>
        </span>
      ))}
    </Tag>
  );
}
