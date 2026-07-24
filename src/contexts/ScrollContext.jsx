import { createContext, useCallback, useContext, useEffect, useRef } from 'react';
import Lenis from 'lenis';

const ScrollCtx = createContext(null);

export function ScrollProvider({ children }) {
  const lenisRef = useRef(null);
  const enabledRef = useRef(true);

  // Lenis smooth-scroll + manual rAF loop, reset to top on load.
  useEffect(() => {
    window.scrollTo(0, 0);
    const lenis = new Lenis({ smoothWheel: true });
    lenisRef.current = lenis;
    let raf;
    function loop(t) { lenis.raf(t); raf = requestAnimationFrame(loop); }
    raf = requestAnimationFrame(loop);
    return () => { cancelAnimationFrame(raf); lenis.destroy(); };
  }, []);

  // Adaptive grid scale-up above 1920px (media queries handle scale-down).
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
    enabledRef.current = false;
    setTimeout(() => {
      const top = el.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({ top, behavior: 'smooth' });
    }, 50);
    setTimeout(() => { enabledRef.current = true; }, 100);
  }, []);

  return (
    <ScrollCtx.Provider value={{ stopScroll, startScroll, scrollToId }}>
      {children}
    </ScrollCtx.Provider>
  );
}

export const useScroll = () => useContext(ScrollCtx);
