import { createContext, useCallback, useContext, useEffect, useRef } from 'react';
import LocomotiveScroll from 'locomotive-scroll';

const ScrollCtx = createContext(null);

// Locomotive Scroll v5 runs on Lenis and keeps the page on native scroll, so
// `position: sticky` and every `window.scrollY` measurement in this codebase
// keep working. It adds the declarative `[data-scroll]` effects layer on top:
// data-scroll-speed (parallax), data-scroll-class (in-view class),
// data-scroll-css-progress (--progress 0→1) and data-scroll-call (events).
const LENIS_OPTIONS = {
  smoothWheel: true,
  lerp: 0.075,
  wheelMultiplier: 0.9,
  touchMultiplier: 1.05,
  syncTouch: false,
};

export function ScrollProvider({ children }) {
  const locoRef = useRef(null);
  const lenisRef = useRef(null);
  const enabledRef = useRef(true);

  useEffect(() => {
    const previousRestoration = window.history.scrollRestoration;
    window.history.scrollRestoration = 'manual';
    window.scrollTo(0, 0);

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const gsap = window.gsap;
    const ScrollTrigger = window.ScrollTrigger;
    const useGsapTicker = Boolean(gsap && ScrollTrigger);

    if (useGsapTicker) {
      gsap.registerPlugin(ScrollTrigger);
      gsap.ticker.lagSmoothing(0);
    }

    // Drive Locomotive's render from GSAP's ticker so ScrollTrigger and the
    // smooth scroll share one clock instead of two competing rAF loops.
    const loco = new LocomotiveScroll({
      lenisOptions: {
        ...LENIS_OPTIONS,
        smoothWheel: !reducedMotion.matches,
      },
      scrollCallback: useGsapTicker ? ScrollTrigger.update : undefined,
      initCustomTicker: useGsapTicker ? (render) => gsap.ticker.add(render) : undefined,
      destroyCustomTicker: useGsapTicker ? (render) => gsap.ticker.remove(render) : undefined,
    });

    locoRef.current = loco;
    lenisRef.current = loco.lenisInstance;
    loco.scrollTo(0, { immediate: true });

    const resetOnPageShow = () => {
      window.scrollTo(0, 0);
      loco.scrollTo(0, { immediate: true });
    };

    window.addEventListener('pageshow', resetOnPageShow);
    if (useGsapTicker) ScrollTrigger.refresh();

    return () => {
      window.removeEventListener('pageshow', resetOnPageShow);
      window.history.scrollRestoration = previousRestoration;
      loco.destroy();
      locoRef.current = null;
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
    locoRef.current?.stop();
    const h = document.documentElement;
    h.style.position = 'relative';
    h.style.overflow = 'hidden';
    h.style.height = '100%';
  }, []);

  const startScroll = useCallback(() => {
    enabledRef.current = true;
    locoRef.current?.start();
    const h = document.documentElement;
    h.style.removeProperty('position');
    h.style.removeProperty('overflow');
    h.style.removeProperty('height');
  }, []);

  const scrollToTop = useCallback((immediate = true) => {
    locoRef.current?.scrollTo(0, {
      immediate,
      duration: immediate ? 0 : 0.9,
      easing: (t) => 1 - Math.pow(1 - t, 4),
    });
    window.scrollTo(0, 0);
  }, []);

  // Jump to an absolute offset. Native `window.scrollTo` is not enough here:
  // Lenis writes its own position every frame, so an external scroll is undone
  // before the next paint. Going through Locomotive updates the value Lenis is
  // animating towards, which is what actually sticks.
  const scrollToY = useCallback((y, immediate = true) => {
    const loco = locoRef.current;
    if (loco) {
      loco.scrollTo(y, {
        immediate,
        duration: immediate ? 0 : 0.6,
        easing: (t) => 1 - Math.pow(1 - t, 4),
      });
      return;
    }

    window.scrollTo(0, y);
  }, []);

  const scrollToId = useCallback((id) => {
    const el = document.getElementById(id);
    if (!el) return;

    const headerOffset = id === 'home' ? 0 : window.innerWidth <= 900 ? 76 : 92;
    const destination = el.getBoundingClientRect().top + window.scrollY - headerOffset;

    const loco = locoRef.current;
    if (loco) {
      loco.scrollTo(destination, {
        duration: 1.25,
        easing: (t) => 1 - Math.pow(1 - t, 4),
      });
      return;
    }

    window.scrollTo({ top: destination, behavior: 'smooth' });
  }, []);

  // `refresh` re-measures every [data-scroll] element — call it after layout
  // changes that Locomotive's resize observers cannot see (route/content swaps).
  const refreshScroll = useCallback(() => {
    locoRef.current?.resize();
    window.ScrollTrigger?.refresh();
  }, []);

  return (
    <ScrollCtx.Provider
      value={{ stopScroll, startScroll, scrollToId, scrollToTop, scrollToY, refreshScroll }}
    >
      {children}
    </ScrollCtx.Provider>
  );
}

export const useScroll = () => useContext(ScrollCtx);
