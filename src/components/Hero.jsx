import LiquidReveal from './LiquidReveal';
import HeroWatermark from './HeroWatermark';
import Reveal from './Reveal';
import LineReveal from './LineReveal';
import PillButton from './PillButton';
import { Logo, StackIcon } from './Icons';
import { useScroll } from '../contexts/ScrollContext';
import BackgroundGradient from '@/components/ui/background-gradient-snippet';
import { cldUrl } from "../lib/cloudinary";

const whiteGlasses = cldUrl("glasses-white");
const blackGlasses = cldUrl("glasses-black");

const STACK = [
  { name: 'React', key: 'react', tone: '#61dafb', strongest: true },
  { name: 'Next.js', key: 'next', tone: '#1a1a1a' },
  { name: 'TypeScript', key: 'ts', tone: '#3178c6' },
  { name: 'Tailwind', key: 'tailwind', tone: '#38bdf8' },
  { name: 'Node.js', key: 'node', tone: '#5fa04e' },
  { name: 'Python', key: 'python', tone: '#3776ab' },
  { name: 'GraphQL', key: 'graphql', tone: '#e10098' },
  { name: 'PostgreSQL', key: 'postgres', tone: '#336791' },
  { name: 'MongoDB', key: 'mongo', tone: '#00a44f' },
  { name: 'Redis', key: 'redis', tone: '#dc382d' },
  { name: 'Docker', key: 'docker', tone: '#2496ed' },
  { name: 'AWS', key: 'aws', tone: '#ff9900' },
];

function FocusIcon({ type }) {
  if (type === 'box') {
    return <svg viewBox="0 0 48 48"><path d="m9 15 15-8 15 8-15 8-15-8Zm0 0v18l15 8 15-8V15M24 23v18M17 19l15-8M24 23l8-4" /></svg>;
  }
  if (type === 'layers') {
    return <svg viewBox="0 0 48 48"><path d="m24 7 16 10-16 10L8 17 24 7Zm-14 18 14 9 14-9M10 33l14 9 14-9" /></svg>;
  }
  return <svg viewBox="0 0 48 48"><path d="M28 9c7-2 11-1 11-1s1 4-1 11c-2 8-8 14-16 18l-8-8c4-8 10-14 18-16M18 33l-7 6-1-9 5-5M26 39l-8-1 5-5M31 16a4 4 0 1 0 0 8 4 4 0 0 0 0-8Z" /></svg>;
}

export default function Hero({ ready, onContact }) {
  const { scrollToId } = useScroll();

  return (
    <section id="home" className="reference-hero">
      <LiquidReveal
        baseSrc={whiteGlasses}
        revealSrc={blackGlasses}
        revealTint="#97501f"
        revealTintOpacity={0.16}
        revealGridColor="rgba(220, 103, 33, 0.08)"
        positionY="top"
        alt="Muhammad Wasif, full-stack web developer"
        priority
      />
      <BackgroundGradient />
      <div className="reference-wash" />
      <HeroWatermark ready={ready} />

      <div className="shell reference-grid">
        <div className="reference-copy">
          <Reveal as="span" className="reference-eyebrow" gate ready={ready} delay={180} move={10}>
            <span className="reference-eyebrow-icon"><FocusIcon type="layers" /></span>
            Full-Stack Web Developer
          </Reveal>

          <LineReveal
            as="h1"
            className="reference-title"
            lines={[
              'I build digital',
              'products that',
              <><em>work</em> beautifully<span className="orange-stop">.</span></>,
            ]}
            gate
            ready={ready}
            delay={230}
            stagger={100}
          />

          <Reveal as="p" className="reference-intro" gate ready={ready} delay={540}>
            From intuitive interfaces to scalable backend systems —<br />
            I turn complex ideas into fast, reliable web experiences.
          </Reveal>

          <Reveal className="reference-actions" gate ready={ready} delay={620}>
            <PillButton variant="dark" arrow="up-right" onClick={onContact}>Let's Work Together</PillButton>
            <PillButton variant="outline" arrow="up-right" onClick={() => scrollToId('projects')}>View Projects</PillButton>
          </Reveal>

          <Reveal className="profile-availability" gate ready={ready} delay={710}>
            <div className="profile-stack">
              {[0, 1, 2].map((item) => (
                <span key={item}><img src={whiteGlasses} alt="" style={{ objectPosition: `${58 + item * 3}% 18%` }} /></span>
              ))}
              <button type="button" onClick={onContact} aria-label="Start a project">+</button>
            </div>
            <i />
            <strong>Available for freelance<br />&amp; remote work</strong>
          </Reveal>
        </div>

        <aside className="reference-aside">
          <Reveal className="stack-glass" gate ready={ready} delay={520} move={14}>
            <div className="stack-glass-heading"><span>Preferred Stack</span><i /><Logo /></div>
            <div className="stack-glass-list">
              {STACK.map((item) => (
                <div className={'stack-tech' + (item.strongest ? ' strongest' : '')} key={item.name} style={{ '--tint': item.tone }}>
                  <span className="stack-tech-logo"><StackIcon name={item.key} /></span>
                  <span className="stack-tech-name">{item.name}{item.strongest && <small>+ Strongest</small>}</span>
                  <i />
                </div>
              ))}
            </div>
          </Reveal>
        </aside>
      </div>
    </section>
  );
}
