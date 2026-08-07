import { createContext, useCallback, useContext, useEffect, useRef } from 'react';
import Lenis from 'lenis';

const ScrollCtx = createContext(null);

export function ScrollProvider({ children }) {
  const lenisRef = useRef(null);
  const enabledRef = useRef(true);

  useEffect(() => {
    window.scrollTo(0, 0);

    const lenis = new Lenis({
      smoothWheel: true,
      lerp: 0.075,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.05,
      syncTouch: false,
    });
    lenisRef.current = lenis;

    const gsap = window.gsap;
    const ScrollTrigger = window.ScrollTrigger;
    let raf = 0;

    if (gsap && ScrollTrigger) {
      gsap.registerPlugin(ScrollTrigger);
      lenis.on('scroll', ScrollTrigger.update);

      const update = (time) => lenis.raf(time * 1000);
      gsap.ticker.add(update);
      gsap.ticker.lagSmoothing(0);
      ScrollTrigger.refresh();

      return () => {
        gsap.ticker.remove(update);
        lenis.destroy();
        lenisRef.current = null;
      };
    }

    const loop = (time) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  useEffect(() => {
    function applyAdaptiveGrid() {
      const FONT_BASE = 16, baseWidth = 1920, coef = 0.6666;
      const w = window.innerWidth;
      const widthReduction = ((baseWidth - w) / baseWidth) * 100;
      const size = FONT_BASE - (FONT_BASE * (widthReduction * coef)) / 100;
      if (size > FONT_BASE) document.documentElement.style.fontSize = size + 'px';
      else document.documentElement.style.removeProperty('font-size');
    }
    applyAdaptiveGrid();
    window.addEventListener('resize', applyAdaptiveGrid);
    return () => window.removeEventListener('resize', applyAdaptiveGrid);
  }, []);

  const stopScroll = useCallback(() => {
    enabledRef.current = false;
    lenisRef.current?.stop();
    const h = document.documentElement;
    h.style.position = 'relative';
    h.style.overflow = 'hidden';
    h.style.height = '100%';
  }, []);

  const startScroll = useCallback(() => {
    enabledRef.current = true;
    lenisRef.current?.start();
    const h = document.documentElement;
    h.style.removeProperty('position');
    h.style.removeProperty('overflow');
    h.style.removeProperty('height');
  }, []);

  const scrollToId = useCallback((id) => {
    const el = document.getElementById(id);
    if (!el) return;

    const lenis = lenisRef.current;
    if (lenis) {
      lenis.scrollTo(el, {
        duration: 1.25,
        easing: (t) => 1 - Math.pow(1 - t, 4),
      });
      return;
    }

    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  return (
    <ScrollCtx.Provider value={{ stopScroll, startScroll, scrollToId }}>
      {children}
    </ScrollCtx.Provider>
  );
}

export const useScroll = () => useContext(ScrollCtx);
