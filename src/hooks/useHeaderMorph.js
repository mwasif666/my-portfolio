import { useEffect, useRef, useState } from "react";

/**
 * Switches the header between its hero and compact states without updating
 * React state on every scroll frame. State changes only when the threshold is
 * crossed; requestAnimationFrame simply batches the DOM read.
 */
export function useHeaderMorph(threshold = 72) {
  const [compact, setCompact] = useState(false);
  const compactRef = useRef(false);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      const next = window.scrollY > threshold;

      if (next !== compactRef.current) {
        compactRef.current = next;
        setCompact(next);
      }

      frame = 0;
    };

    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [threshold]);

  return compact;
}
