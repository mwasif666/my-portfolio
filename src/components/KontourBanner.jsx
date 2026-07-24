import { useRef } from 'react';
import Reveal from './Reveal';
import LineReveal from './LineReveal';
import PillButton from './PillButton';
import { ArrowUpRight } from './Icons';
import { useInView } from '../hooks/useInView';
import myImg from '../../myimg.png';

const NAV_LEFT = ['Home', 'Services', 'About Us', 'Projects'];
const NAV_RIGHT = ['Philosophy', 'Team', 'FAQ', 'Contact'];

// Small chevrons for the recognition carousel.
const ChevronLeft = (p) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...p}>
    <path d="M15 6l-6 6 6 6" />
  </svg>
);
const ChevronRight = (p) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...p}>
    <path d="M9 6l6 6-6 6" />
  </svg>
);

export default function KontourBanner() {
  const ref = useRef(null);
  const inView = useInView(ref, { threshold: 0.2 });

  return (
    <section ref={ref} className={'kontour' + (inView ? ' in' : '')} id="kontour">
      <div className="kontour-glow" aria-hidden="true" />

      {/* centre portrait (full-height figure that overlaps the watermark) */}
      <div className="kontour-portrait">
        <img src={myImg} alt="Portrait" draggable="false" />
      </div>

      {/* top bar — Bootstrap container + grid, no side padding */}
      <header className="container px-0 kontour-top">
        <div className="row g-0 align-items-center">
          <nav className="col-4 kontour-nav">
            {NAV_LEFT.map((item) => <button key={item} type="button">{item}</button>)}
          </nav>
          <div className="col-4 d-flex justify-content-center">
            <div className="kontour-brand"><span>Kontour</span><small>Studios</small></div>
          </div>
          <nav className="col-4 kontour-nav end">
            {NAV_RIGHT.map((item) => <button key={item} type="button">{item}</button>)}
          </nav>
        </div>
      </header>

      {/* main — Bootstrap container + grid */}
      <div className="container px-0 kontour-main">
        <div className="row g-0 w-100">
          <div className="col-12 col-lg-7 kontour-copy">
            <Reveal as="span" className="kontour-eyebrow" move={10}>Marketing agency</Reveal>
            <LineReveal
              as="h2"
              className="kontour-title"
              lines={['Clarity first.', 'Then the', 'system.']}
              stagger={90}
              delay={80}
            />
            <Reveal as="p" className="kontour-sub" delay={220}>
              Strategy, identity and communication<br />shaped into one clear brand system.
            </Reveal>
            <Reveal className="kontour-actions" delay={320}>
              <PillButton variant="light" arrow="up-right">Start a Project</PillButton>
              <PillButton variant="outline">View Our Work</PillButton>
            </Reveal>
          </div>

          <div className="col-12 col-lg-4 ms-lg-auto kontour-panel">
            <Reveal className="kontour-reco" move={14}>
              <div className="kontour-reco-thumb"><img src={myImg} alt="" draggable="false" /></div>
              <div className="kontour-reco-body">
                <h3>Recognition</h3>
                <p>We build visual systems that make brands clear and memorable.</p>
              </div>
              <button className="kontour-reco-open" type="button" aria-label="Open recognition">
                <ArrowUpRight />
              </button>
              <div className="kontour-reco-foot">
                <div className="kontour-progress"><i /></div>
                <div className="kontour-arrows">
                  <button type="button" aria-label="Previous"><ChevronLeft /></button>
                  <button type="button" className="on" aria-label="Next"><ChevronRight /></button>
                </div>
              </div>
            </Reveal>

            <Reveal className="kontour-stats" delay={160}>
              <div className="kontour-stat">
                <strong>100%</strong>
                <span>No random visuals. Only clear systems built for recognition.</span>
              </div>
              <div className="kontour-stat">
                <strong>360&deg;</strong>
                <span>Full brand presence. From strategy and identity to launch.</span>
              </div>
            </Reveal>
          </div>
        </div>
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
