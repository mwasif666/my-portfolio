import LiquidReveal from './LiquidReveal';
import Reveal from './Reveal';
import LineReveal from './LineReveal';
import { Logo, ArrowRight, ArrowUpRight } from './Icons';
import { cldUrl } from "../lib/cloudinary";

const whiteGlasses = cldUrl("whiteglass");
const blackGlasses = cldUrl("sunglasses");

const NAV = ['Home', 'About Me', 'Services', 'Project', 'Blog'];

/**
 * Second banner. One large full-bleed image fills the section with the same
 * static liquid cursor-reveal as the hero (the image itself does not move); the
 * giant headline sits over it.
 */
export default function ShowcaseBanner() {
  return (
    <section className="xb">
      <div className="xb-bg">
        <LiquidReveal
          baseSrc={whiteGlasses}
          revealSrc={blackGlasses}
          alt="Portrait wearing white glasses"
        />
        <div className="xb-overlay" />
      </div>

      <div className="shell xb-inner">
        <nav className="xb-nav">
          <div className="xb-logo"><Logo />Xofolio</div>
          <ul className="xb-links">
            {NAV.map((n) => <li key={n}><button>{n}</button></li>)}
          </ul>
          <button className="xb-cv">Download CV <span className="xb-cv-dot">⊕</span></button>
        </nav>

        <div className="xb-stage">
          <LineReveal as="h2" className="xb-title" lines={['Brands & Product', 'Designer']} stagger={120} />
        </div>

        <Reveal as="p" className="xb-lorem" delay={100}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud.
        </Reveal>

        <div className="xb-bottom">
          <Reveal className="xb-stat" delay={150}>
            <span className="xb-circles"><span /><span /><span /></span>
            <span className="xb-stat-txt">
              <span className="big">810+</span>
              <span className="sub">Lorem Ipsum Sit</span>
            </span>
          </Reveal>

          <Reveal className="xb-scroll" delay={200}>
            <ArrowRight style={{ transform: 'rotate(90deg)' }} />
            <span>Scroll To Explore</span>
          </Reveal>

          <Reveal className="xb-tag" delay={250}>
            <span>I Build Ideas Into<br />Digital Realities</span>
            <ArrowUpRight />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
