import { useEffect } from 'react';
import { makeMultiSpring, canHover } from '../lib/spring';

/**
 * Binds a spring-animated hover to an element. On `mouseenter` of `triggerRef`
 * the spring drives toward `enter`; on `mouseleave`, toward `leave`. `apply`
 * writes the current spring state onto the target element. Disabled on touch.
 *
 * A separate trigger lets a child animate when a parent is hovered (badges).
 */
export function useSpringHover(triggerRef, targetRef, initial, enter, leave, cfg, apply) {
  useEffect(() => {
    if (!canHover) return;
    const trigger = triggerRef.current;
    const el = targetRef.current;
    if (!trigger || !el) return;

    const keys = Object.keys(initial);
    const spr = makeMultiSpring(keys, (s) => apply(el, s), cfg);
    spr.setInitial(initial);

    const onEnter = () => spr.set(enter);
    const onLeave = () => spr.set(leave);
    trigger.addEventListener('mouseenter', onEnter);
    trigger.addEventListener('mouseleave', onLeave);

    return () => {
      trigger.removeEventListener('mouseenter', onEnter);
      trigger.removeEventListener('mouseleave', onLeave);
      spr.stop();
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
}
