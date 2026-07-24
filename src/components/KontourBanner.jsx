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

const StackIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M12 3 3.5 7.5 12 12l8.5-4.5L12 3Z" />
    <path d="m3.5 12 8.5 4.5 8.5-4.5M3.5 16.5 12 21l8.5-4.5" />
  </svg>
);

const DownloadIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M12 3v12M7.5 10.5 12 15l4.5-4.5M4 20h16" />
  </svg>
);

const Dot = () => <i className="portfolio-stack-dot" aria-hidden="true" />;

export default function KontourBanner({ onContact }) {
  const ref = useRef(null);
  const inView = useInView(ref, { threshold: 0.2 });

  const resetScene = () => {
    const scene = ref.current;
    if (!scene) return;

    scene.style.setProperty('--portrait-x', '0px');
    scene.style.setProperty('--portrait-y', '0px');
    scene.style.setProperty('--copy-x', '0px');
    scene.style.setProperty('--copy-y', '0px');
    scene.style.setProperty('--card-tilt-x', '0deg');
    scene.style.setProperty('--card-tilt-y', '0deg');
    scene.style.setProperty('--shine-x', '50%');
    scene.style.setProperty('--shine-y', '18%');
  };

  const moveScene = (event) => {
    if (
      event.pointerType === 'touch'
      || !ref.current
      || window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) return;

    const bounds = ref.current.getBoundingClientRect();
    const x = ((event.clientX - bounds.left) / bounds.width - 0.5) * 2;
    const y = ((event.clientY - bounds.top) / bounds.height - 0.5) * 2;

    ref.current.style.setProperty('--portrait-x', `${(x * 10).toFixed(2)}px`);
    ref.current.style.setProperty('--portrait-y', `${(y * 6).toFixed(2)}px`);
    ref.current.style.setProperty('--copy-x', `${(x * -4).toFixed(2)}px`);
    ref.current.style.setProperty('--copy-y', `${(y * -3).toFixed(2)}px`);
    ref.current.style.setProperty('--card-tilt-x', `${(y * -2.5).toFixed(2)}deg`);
    ref.current.style.setProperty('--card-tilt-y', `${(x * 3.5).toFixed(2)}deg`);
    ref.current.style.setProperty('--shine-x', `${((x + 1) * 50).toFixed(1)}%`);
    ref.current.style.setProperty('--shine-y', `${((y + 1) * 35).toFixed(1)}%`);
  };

  return (
    <section
      ref={ref}
      className={'kontour portfolio-banner' + (inView ? ' in' : '')}
      id="home"
      onPointerMove={moveScene}
      onPointerLeave={resetScene}
    >
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
          <div className="portfolio-mobile-watermark" aria-hidden="true">
            <span className="kontour-wm-inner">
              <span className="kontour-wm-name">Muhammad</span>
              <span className="kontour-wm-word">Wasif</span>
            </span>
          </div>
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

            <Reveal className="portfolio-tech-reveal" delay={240}>
              <div className="portfolio-tech-card">
                <div className="portfolio-tech-heading">
                  <StackIcon />
                  <h2>Technology Stack</h2>
                </div>

                <div className="portfolio-stack-list">
                  <div className="portfolio-stack-row">
                    <strong>Core Stack</strong>
                    <p><span>MERN Stack</span><Dot /><span>PHP</span><Dot /><span>Laravel</span></p>
                  </div>
                  <div className="portfolio-stack-row">
                    <strong>Frontend</strong>
                    <p><span>React</span><Dot /><span>Next.js</span><Dot /><span>Bootstrap</span><Dot /><span>Tailwind CSS</span></p>
                  </div>
                  <div className="portfolio-stack-row">
                    <strong>Backend &amp; Data</strong>
                    <p><span>Node.js</span><Dot /><span>Express</span><Dot /><span>MongoDB</span><Dot /><span>MySQL</span></p>
                  </div>
                  <div className="portfolio-stack-row">
                    <strong>CMS &amp; Commerce</strong>
                    <p><span>WordPress</span><Dot /><span>Shopify</span><Dot /><span>Webflow</span><Dot /><span>WooCommerce</span></p>
                  </div>
                </div>

                <button className="portfolio-resume" type="button">
                  <span>Download Résumé</span>
                  <DownloadIcon />
                </button>
              </div>
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
