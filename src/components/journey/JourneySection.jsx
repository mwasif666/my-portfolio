import { useCallback, useEffect, useRef, useState } from "react";
import loadLottieRuntime from "@/lib/lottie";
import useJourneyScrollMotion from "./useJourneyScrollMotion";
import styles from "./JourneySection.module.css";

const options = [
  {
    title: "Starting from an idea",
    copy: "Starting with a rough concept? I can turn it into a clear plan, design the interface, build the full product and take it through launch.",
    icon: {
      src: "https://cdn.lordicon.com/wloilxuq.json",
      primary: "#07242f",
      secondary: "#0f7fae",
      fallback: "draft",
    },
  },
  {
    title: "Scaling what already works",
    copy: "If your product is already live, I can improve performance, add features, connect new services or strengthen the architecture without an unnecessary rebuild.",
    icon: {
      src: "https://cdn.lordicon.com/gqdnbnwt.json",
      primary: "#eafaff",
      secondary: "#8fe5ff",
      fallback: "scale",
    },
  },
  {
    title: "Solving a focused problem",
    copy: "Need a specific page, bug, API, WooCommerce flow or automation handled quickly? I can solve it cleanly without disrupting the rest of your product.",
    icon: {
      src: "https://cdn.lordicon.com/iltqorsz.json",
      primary: "#e2f8ff",
      secondary: "#4aa8cf",
      fallback: "focus",
    },
  },
];

const iconRequests = new Map();

function loadIconData(src) {
  let request = iconRequests.get(src);

  if (!request) {
    request = fetch(src)
      .then((response) => {
        if (!response.ok) throw new Error(`Lordicon ${src} failed`);
        return response.json();
      })
      .catch((error) => {
        // Not cached as a permanent failure — a later mount can try again.
        iconRequests.delete(src);
        throw error;
      });
    iconRequests.set(src, request);
  }

  return request;
}

const toRgb = (hex) => [
  parseInt(hex.slice(1, 3), 16) / 255,
  parseInt(hex.slice(3, 5), 16) / 255,
  parseInt(hex.slice(5, 7), 16) / 255,
  1,
];

/* Every Lordicon file ships in its own palette and exposes it through the
   "Primary" / "Secondary" effect groups — the same handles their own player
   uses. Repainting those is what lets one icon sit on the light card and the
   next on the near-black one without shipping three colour variants. */
function paintIcon(data, { primary, secondary }) {
  const painted = JSON.parse(JSON.stringify(data));

  for (const layer of painted.layers ?? []) {
    for (const group of layer.ef ?? []) {
      const name = group.nm?.toLowerCase();
      const tone =
        name === "primary" ? primary : name === "secondary" ? secondary : null;
      if (!tone) continue;

      for (const field of group.ef ?? []) {
        if (field.ty === 2 && field.v) {
          field.v = { ...field.v, a: 0, k: toRgb(tone) };
        }
      }
    }
  }

  return painted;
}

function FallbackIcon({ type }) {
  if (type === "draft") {
    return (
      <svg className={styles.iconFallback} viewBox="0 0 32 32" fill="none" aria-hidden="true">
        <path d="M7 25l1.1-4.6L20.4 8.1a2.2 2.2 0 0 1 3.1 0l1.4 1.4a2.2 2.2 0 0 1 0 3.1L12.6 24.9 7 25Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
        <path d="M18.6 10l3.4 3.4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      </svg>
    );
  }

  if (type === "scale") {
    return (
      <svg className={styles.iconFallback} viewBox="0 0 32 32" fill="none" aria-hidden="true">
        <path d="M6 25h20" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
        <path d="M10 25v-6M16 25v-11M22 25v-16" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      </svg>
    );
  }

  return (
    <svg className={styles.iconFallback} viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <circle cx="16" cy="16" r="9.2" stroke="currentColor" strokeWidth="1.7" />
      <path d="M16 5.4v4.2M16 22.4v4.2M5.4 16h4.2M22.4 16h4.2" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      <circle cx="16" cy="16" r="2.6" stroke="currentColor" strokeWidth="1.7" />
    </svg>
  );
}

function JourneyIcon({ icon, active }) {
  const hostRef = useRef(null);
  const animationRef = useRef(null);
  const [loaded, setLoaded] = useState(false);
  const [inView, setInView] = useState(true);

  useEffect(() => {
    let cancelled = false;

    Promise.all([loadLottieRuntime(), loadIconData(icon.src)])
      .then(([lottie, data]) => {
        if (cancelled || !lottie || !hostRef.current) return;

        const animation = lottie.loadAnimation({
          container: hostRef.current,
          renderer: "svg",
          loop: false,
          autoplay: false,
          animationData: paintIcon(data, icon),
          rendererSettings: { preserveAspectRatio: "xMidYMid meet" },
        });

        animationRef.current = animation;
        animation.addEventListener("DOMLoaded", () => {
          if (!cancelled) setLoaded(true);
        });
      })
      .catch(() => {});

    return () => {
      cancelled = true;
      animationRef.current?.destroy();
      animationRef.current = null;
    };
  }, [icon]);

  /* Desktop keeps the card on screen for the whole flip, so this only matters
     on the stacked mobile layout, where the reveal is a plain scroll-in. */
  useEffect(() => {
    const host = hostRef.current;
    if (!host || typeof IntersectionObserver === "undefined") return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.4 },
    );
    observer.observe(host);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const animation = animationRef.current;
    if (!animation || !loaded) return;

    const lastFrame = Math.max((animation.totalFrames || 1) - 1, 0);

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      animation.goToAndStop(lastFrame, true);
      return;
    }

    if (active && inView) animation.goToAndPlay(0, true);
    else animation.goToAndStop(0, true);
  }, [active, inView, loaded]);

  return (
    <div className={styles.icon}>
      <span ref={hostRef} className={styles.iconPlayer} aria-hidden="true" />
      {loaded ? null : <FallbackIcon type={icon.fallback} />}
    </div>
  );
}

export default function JourneySection() {
  const sectionRef = useRef(null);
  const cardRefs = useRef([]);
  const [revealed, setRevealed] = useState(() => options.map(() => false));

  const handleReveal = useCallback((index, value) => {
    setRevealed((previous) => {
      if (previous[index] === value) return previous;
      const next = previous.slice();
      next[index] = value;
      return next;
    });
  }, []);

  useJourneyScrollMotion({ sectionRef, cardRefs, onReveal: handleReveal });

  return (
    <section
      ref={sectionRef}
      className={styles.section}
      id="journey"
      aria-labelledby="journey-title"
    >
      <div className={styles.stage}>
        <div className={styles.grid} aria-hidden="true" />

        <h2 className={styles.heading} id="journey-title">
          Where is your project <em>right now?</em>
        </h2>

        <div className={styles.frame}>
          <div className={styles.panels}>
            {options.map((option, index) => (
              <article
                key={option.title}
                ref={(node) => {
                  cardRefs.current[index] = node;
                }}
                className={styles.card}
              >
                <div className={styles.cardInner}>
                  <div className={`${styles.cardFace} ${styles.cardFront}`} aria-hidden="true">
                    <div className={styles.panelImage} />
                  </div>

                  <div className={`${styles.cardFace} ${styles.cardBack}`}>
                    <div className={styles.surface} aria-hidden="true" />

                    <JourneyIcon icon={option.icon} active={revealed[index]} />

                    <div className={styles.copy}>
                      <h3>{option.title}</h3>
                      <p>{option.copy}</p>
                    </div>
                  </div>
                </div>
              </article>
            ))}

            <div className={styles.shine} aria-hidden="true" />
          </div>
        </div>
      </div>
    </section>
  );
}
