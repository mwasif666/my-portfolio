import { Fragment, useEffect, useRef } from "react";
import useServicesTimeline from "./useServicesTimeline";
import styles from "./Services.module.css";

const LOTTIE_SCRIPT =
  "https://cdnjs.cloudflare.com/ajax/libs/bodymovin/5.12.2/lottie.min.js";

let lottiePromise;

function loadLottieRuntime() {
  if (typeof window === "undefined") return Promise.resolve(null);
  if (window.lottie) return Promise.resolve(window.lottie);
  if (lottiePromise) return lottiePromise;

  lottiePromise = new Promise((resolve, reject) => {
    const existing = document.querySelector("script[data-outcrowd-lottie]");

    if (existing) {
      if (window.lottie) {
        resolve(window.lottie);
        return;
      }
      existing.addEventListener("load", () => resolve(window.lottie), {
        once: true,
      });
      existing.addEventListener("error", reject, { once: true });
      return;
    }

    const script = document.createElement("script");
    script.src = LOTTIE_SCRIPT;
    script.async = true;
    script.dataset.outcrowdLottie = "true";
    script.onload = () => resolve(window.lottie);
    script.onerror = reject;
    document.head.appendChild(script);
  });

  return lottiePromise;
}

// First three cards fill the left column, last three the right column.
const services = [
  {
    key: "design",
    title: "Design & Frontend",
    description:
      "I design the interface and then build it — responsive layouts, a consistent design system, and interactions that hold up on a mid-range phone.",
    art: {
      type: "video",
      src: "https://stokt.b-cdn.net/KEYCAPS-loop-01-.webm",
      poster:
        "https://framerusercontent.com/images/fsnxfPl4xnUJdyQSiOcHEYxg.png?width=1080&height=1080",
      fit: "center",
    },
  },
  {
    key: "apps",
    title: "Web Applications",
    description:
      "Dashboards, admin panels and internal tools — real product surfaces with data, state and permissions, not static pages dressed up as an app.",
    art: {
      type: "lottie",
      src: "https://cdn.prod.website-files.com/667a7576e7e7ef3ba89b3f2a/667a7576e7e7ef3ba89b3f87_Platform.json",
      loop: true,
      autoplay: false,
    },
  },
  {
    key: "mobile",
    title: "Mobile-First Builds",
    description:
      "Every layout starts at 360px and works up. Touch targets, loading states and load budgets get decided before the desktop view exists.",
    art: {
      type: "video",
      src: "https://dl.dropboxusercontent.com/scl/fi/jy5cqifucxea6mo5tx2id/taxi-app-main-v2_XdXjXRKv.mp4?rlkey=7ibn8inbyq804uxjjmhhml5q4&st=tlh7klec&dl=0",
      fit: "bottom",
    },
  },
  {
    key: "fullstack",
    title: "Full-Stack Systems",
    description:
      "APIs, databases, auth and deployment designed together with the interface, so the product behaves in production the way it did in the demo.",
    art: {
      type: "video",
      src: "https://stokt.b-cdn.net/robot-hand-v1-%203-alpha%20(1).webm",
      poster:
        "https://framerusercontent.com/images/o5rue2juXI7jXmJGLCQ0tEIHzw.png?width=1000&height=1000",
      fit: "center",
    },
  },
  {
    key: "commerce",
    title: "WordPress Builds",
    description:
      "Custom themes and plugins for teams that need real content control, plus commerce flows built to convert instead of just to render.",
    art: {
      type: "lottie",
      src: "https://cdn.prod.website-files.com/667a7576e7e7ef3ba89b3f2a/667a7576e7e7ef3ba89b3f85_Webst.json",
      loop: true,
      autoplay: false,
    },
  },
  {
    key: "integrations",
    title: "APIs & Integrations",
    description:
      "Payments, third-party services and legacy systems wired in cleanly, with the error handling and retries that keep a live product dependable.",
    art: {
      type: "lottie",
      src: "https://cdn.prod.website-files.com/667a7576e7e7ef3ba89b3f2a/66ab8b10eaf1ec4297b4c7e2_Developmnt22.json",
      loop: true,
      autoplay: false,
    },
  },
];

function LottieArt({ art, serviceKey }) {
  const hostRef = useRef(null);
  const animationRef = useRef(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return undefined;

    let cancelled = false;
    let observer;
    let playedOnce = false;

    loadLottieRuntime()
      .then((lottie) => {
        if (!lottie || cancelled || !hostRef.current) return;

        const animation = lottie.loadAnimation({
          container: hostRef.current,
          renderer: "svg",
          loop: Boolean(art.loop),
          autoplay: false,
          path: art.src,
          rendererSettings: {
            progressiveLoad: true,
            preserveAspectRatio: "xMidYMid meet",
          },
        });

        animationRef.current = animation;

        const reduceMotion = window.matchMedia(
          "(prefers-reduced-motion: reduce)",
        ).matches;

        const showStill = () => {
          const finalFrame = Math.max((animation.totalFrames || 1) - 1, 0);
          animation.goToAndStop(finalFrame, true);
        };

        if (reduceMotion) {
          animation.addEventListener("DOMLoaded", showStill);
          return;
        }

        const playVisible = () => {
          if (art.loop) {
            animation.play();
            return;
          }
          if (!playedOnce || art.autoplay) {
            animation.goToAndPlay(0, true);
            playedOnce = true;
          }
        };

        if (typeof IntersectionObserver === "undefined") {
          playVisible();
          return;
        }

        observer = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) {
              playVisible();
            } else if (art.loop) {
              animation.pause();
            }
          },
          { threshold: 0.26, rootMargin: "5% 0px 5% 0px" },
        );
        observer.observe(hostRef.current);
      })
      .catch(() => {});

    return () => {
      cancelled = true;
      observer?.disconnect();
      animationRef.current?.destroy();
      animationRef.current = null;
    };
  }, [art]);

  const replay = () => {
    if (
      typeof window !== "undefined" &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      animationRef.current?.goToAndPlay(0, true);
    }
  };

  return (
    <div
      ref={hostRef}
      className={`${styles.lottieArt} ${styles[`${serviceKey}Art`] || ""}`}
      onPointerEnter={replay}
      aria-hidden="true"
    />
  );
}

function ServiceArt({ service }) {
  const { art } = service;

  if (art.type === "lottie") {
    return <LottieArt art={art} serviceKey={service.key} />;
  }

  return (
    <div className={styles.mobileVideoWrap} data-fit={art.fit ?? "bottom"} aria-hidden="true">
      <video
        className={styles.mobileVideo}
        src={art.src}
        poster={art.poster}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
      />
    </div>
  );
}

function ServiceCard({ service, index }) {
  return (
    <article className={`${styles.card} ${styles[service.key]}`} data-service-card>
      <span className={styles.cardIndex} aria-hidden="true">
        {String(index + 1).padStart(2, "0")}
      </span>

      <div className={styles.cardCopy}>
        <h3>{service.title}</h3>
        <p>{service.description}</p>
      </div>

      <div className={styles.artStage}>
        <ServiceArt service={service} />
      </div>
    </article>
  );
}

const QUOTE = `Instead of a request which sounds like “I need a website”, I'd rather hear “I want this thing to load fast and actually convert” — then work out what to build, and ship the approved plan end to end.`;

export default function StoktServices({ onContact }) {
  const sectionRef = useRef(null);
  const heroRef = useRef(null);
  const quoteRef = useRef(null);
  const railRef = useRef(null);
  const trackRef = useRef(null);
  const cursorRef = useRef(null);
  const wordsRef = useRef([]);

  useServicesTimeline({ sectionRef, heroRef, quoteRef, wordsRef, railRef, trackRef });

  const updatePointerEffects = (event) => {
    const track = trackRef.current;
    if (track) {
      for (const card of track.querySelectorAll("[data-service-card]")) {
        const rect = card.getBoundingClientRect();
        card.style.setProperty("--mouse-x", `${event.clientX - rect.left}px`);
        card.style.setProperty("--mouse-y", `${event.clientY - rect.top}px`);
      }
    }

    const cursor = cursorRef.current;
    if (cursor) {
      cursor.style.setProperty("--cursor-x", `${event.clientX}px`);
      cursor.style.setProperty("--cursor-y", `${event.clientY}px`);
      cursor.dataset.visible = "true";
    }
  };

  const hideCursor = () => {
    if (cursorRef.current) cursorRef.current.dataset.visible = "false";
  };

  return (
    <section
      ref={sectionRef}
      className={styles.section}
      id="services"
      aria-labelledby="outcrowd-services-title"
      onPointerMove={updatePointerEffects}
      onPointerEnter={updatePointerEffects}
      onPointerLeave={hideCursor}
    >
      <span ref={cursorRef} className={styles.customCursor} aria-hidden="true">
        <i />
      </span>

      <div className={styles.viewport}>
        {/* Act 1 */}
        <div ref={heroRef} className={styles.hero}>
          <h2 id="outcrowd-services-title">Services</h2>
          <p>
            Whether you need a full-scale IT partner to define the roadmap or a
            vendor for particular tasks, we got you
          </p>
          <button type="button" className={styles.tag} onClick={onContact}>
            Complex solution
          </button>
        </div>

        {/* Act 2 — glass panel, copy fills word by word on scrub */}
        <div ref={quoteRef} className={styles.quote}>
          <div className={styles.quoteGlow} aria-hidden="true" />
          <div className={styles.quotePanel}>
            <p className={styles.quoteText}>
              {QUOTE.split(" ").map((word, index) => (
                // eslint-disable-next-line react/no-array-index-key
                <Fragment key={`${word}-${index}`}>
                  <span
                    ref={(node) => {
                      wordsRef.current[index] = node;
                    }}
                    className={styles.word}
                  >
                    {word}
                  </span>{" "}
                </Fragment>
              ))}
            </p>
          </div>
        </div>

        {/* Act 3 — carousel */}
        <div ref={railRef} className={styles.rail}>
          <div ref={trackRef} className={styles.track}>
            {services.map((service, index) => (
              <ServiceCard key={service.key} service={service} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
