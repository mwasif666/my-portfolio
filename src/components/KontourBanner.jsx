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

export default function KontourBanner({ onContact, id = 'home', theme = 'orange' }) {
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
      className={`kontour portfolio-banner portfolio-banner--${theme}${inView ? ' in' : ''}`}
      id={id}
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
                  <div className="portfolio-tags">
                    <span className="portfolio-tag">MERN Stack</span>
                    <span className="portfolio-tag">PHP</span>
                    <span className="portfolio-tag">Laravel</span>
                  </div>
                </div>
                <div className="portfolio-stack-row">
                  <strong>Frontend</strong>
                  <div className="portfolio-tags">
                    <span className="portfolio-tag">React</span>
                    <span className="portfolio-tag">Next.js</span>
                    <span className="portfolio-tag">Bootstrap</span>
                    <span className="portfolio-tag">Tailwind CSS</span>
                  </div>
                </div>
                <div className="portfolio-stack-row">
                  <strong>Backend &amp; Data</strong>
                  <div className="portfolio-tags">
                    <span className="portfolio-tag">Node.js</span>
                    <span className="portfolio-tag">Express</span>
                    <span className="portfolio-tag">MongoDB</span>
                    <span className="portfolio-tag">MySQL</span>
                  </div>
                </div>
                <div className="portfolio-stack-row">
                  <strong>CMS &amp; Commerce</strong>
                  <div className="portfolio-tags">
                    <span className="portfolio-tag">WordPress</span>
                    <span className="portfolio-tag">Shopify</span>
                    <span className="portfolio-tag">Webflow</span>
                    <span className="portfolio-tag">WooCommerce</span>
                  </div>
                </div>
              </div>

              <button className="portfolio-resume" type="button">
                <span>Download Resume</span>
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
