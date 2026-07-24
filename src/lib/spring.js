// Environment capabilities (evaluated once).
export const canHover =
  typeof window !== 'undefined' &&
  window.matchMedia('(hover:hover) and (pointer:fine)').matches;

export const reduceMotion =
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/**
 * A tiny multi-value rAF spring integrator (mass = 1), replacing react-spring.
 * accel = tension*(target - x) - friction*v, integrated at dt = 1/60.
 * Settles when |target - x| < 0.001 and |v| < 0.001.
 */
export function makeMultiSpring(keys, apply, cfg) {
  const state = {}, vel = {}, target = {};
  keys.forEach((k) => { state[k] = 0; vel[k] = 0; target[k] = 0; });
  let raf = null;

  function step() {
    let settled = true;
    for (const k of keys) {
      const accel = cfg.tension * (target[k] - state[k]) - cfg.friction * vel[k];
      vel[k] += accel / 60;
      state[k] += vel[k] / 60;
      if (Math.abs(target[k] - state[k]) > 0.001 || Math.abs(vel[k]) > 0.001) settled = false;
      else { state[k] = target[k]; vel[k] = 0; }
    }
    apply(state);
    raf = settled ? null : requestAnimationFrame(step);
  }

  return {
    set(t) {
      for (const k of keys) if (t[k] !== undefined) target[k] = t[k];
      if (raf == null) raf = requestAnimationFrame(step);
    },
    setInitial(v) {
      for (const k of keys) if (v[k] !== undefined) { state[k] = v[k]; target[k] = v[k]; }
      apply(state);
    },
    stop() { if (raf) { cancelAnimationFrame(raf); raf = null; } },
  };
}
