import { useRef } from 'react';
import Reveal from './Reveal';
import LineReveal from './LineReveal';
import { useInView } from '../hooks/useInView';
import myImg from '../../myimg.png';

const ArrowRight = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

const CalendarIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="3" y="5" width="18" height="16" rx="2.5" />
    <path d="M16 3v4M8 3v4M3 10h18" />
  </svg>
);

export default function KontourBanner({ onContact }) {
  const ref = useRef(null);
  const inView = useInView(ref, { threshold: 0.2 });

  return (
    <section ref={ref} className={'kontour portfolio-banner' + (inView ? ' in' : '')} id="home">
      <div className="kontour-glow" aria-hidden="true" />
      <div className="portfolio-grid-lines" aria-hidden="true" />

      <div className="portfolio-hero-grid">
        <div className="portfolio-copy">
            <Reveal as="span" className="portfolio-eyebrow" move={10}>
              Full-Stack Web Developer
            </Reveal>
            <LineReveal
              as="h1"
              className="portfolio-title"
              lines={['I build fast.', 'Scalable.', 'Built to last.']}
              stagger={90}
              delay={80}
            />
            <Reveal as="p" className="portfolio-sub" delay={220}>
              I design and develop high-performance websites, web apps and digital products
              from front end to back end.
            </Reveal>
            <Reveal className="portfolio-actions" delay={320}>
              <button className="portfolio-cta primary" type="button">
                <span>View Projects</span>
                <ArrowRight />
              </button>
              <button className="portfolio-cta secondary" type="button" onClick={onContact}>
                Let&apos;s Talk
              </button>
            </Reveal>
        </div>

        <div className="kontour-portrait">
          <img src={myImg} alt="Muhammad Wasif, full-stack web developer" draggable="false" />
        </div>

        <aside className="portfolio-panel">
            <Reveal className="portfolio-availability-card" move={14}>
              <div className="portfolio-calendar">
                <CalendarIcon />
              </div>
              <div>
                <h2>Available for select projects</h2>
                <p>Building reliable digital experiences for startups, agencies and growing brands.</p>
              </div>
            </Reveal>

            <Reveal className="portfolio-stats" delay={160}>
              <div className="portfolio-stat">
                <strong>4<sup>+</sup></strong>
                <span>Years</span>
              </div>
              <div className="portfolio-stat">
                <strong>30<sup>+</sup></strong>
                <span>Projects</span>
              </div>
              <div className="portfolio-stat">
                <strong>99<sup>%</sup></strong>
                <span>Performance</span>
              </div>
            </Reveal>

            <Reveal className="portfolio-tech-row" delay={240}>
              <span>React</span><i />
              <span>Next.js</span><i />
              <span>Node.js</span><i />
              <span>WordPress</span>
            </Reveal>
        </aside>
      </div>

      <div className="kontour-watermark" aria-hidden="true">
        <span className="kontour-wm-inner">
          <span className="kontour-wm-name">Muhammad</span>
          <span className="kontour-wm-word">Wasif</span>
        </span>
      </div>
    </section>
  );
}
