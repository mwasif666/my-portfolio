import { useEffect, useRef } from "react";
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

const brandVisualRows = [
  [
    {
      base: "https://cdn.prod.website-files.com/667a7576e7e7ef3ba89b3f2a/66b07d4f2bec93cba5a3d384_brand-line-2-1.svg",
      overlay:
        "https://cdn.prod.website-files.com/667a7576e7e7ef3ba89b3f2a/66b07e4f4bec20016bbe1124_brand-line-1-color.svg",
    },
    {
      base: "https://cdn.prod.website-files.com/667a7576e7e7ef3ba89b3f2a/66c366f7d9ef5f478c9202b1_Group%20427320477.webp",
    },
    {
      base: "https://cdn.prod.website-files.com/667a7576e7e7ef3ba89b3f2a/66b07d4f0961f661081c4f87_brand-line-2-3.svg",
      overlay:
        "https://cdn.prod.website-files.com/667a7576e7e7ef3ba89b3f2a/66c366f712b8e5005065e2f7_Group%20427320478.webp",
    },
    {
      base: "https://cdn.prod.website-files.com/667a7576e7e7ef3ba89b3f2a/66b07dc410edead2c1e14b9f_Group%20427320476.webp",
    },
  ],
  [
    {
      base: "https://cdn.prod.website-files.com/667a7576e7e7ef3ba89b3f2a/66b07d1c441fc462e761d231_brand-line-1-3.svg",
    },
    {
      base: "https://cdn.prod.website-files.com/667a7576e7e7ef3ba89b3f2a/66b07d1c8064490bd29b4efa_brand-line-1-2.svg",
      overlay:
        "https://cdn.prod.website-files.com/667a7576e7e7ef3ba89b3f2a/66b07e4f2ced01bc0bfbd3f8_brand-line-1-color3.svg",
    },
    {
      base: "https://cdn.prod.website-files.com/667a7576e7e7ef3ba89b3f2a/66b07d1c423eba907f44c5c8_brand-line-1-1.svg",
    },
    {
      base: "https://cdn.prod.website-files.com/667a7576e7e7ef3ba89b3f2a/66b07d1c8d9dac749b2813a9_brand-line-1-4.svg",
      overlay:
        "https://cdn.prod.website-files.com/667a7576e7e7ef3ba89b3f2a/66b07e4fbba83b5f8b2c5ac2_brand-line-1-color4.svg",
    },
  ],
];

const services = [
  {
    title: "Brand Strategy",
    description:
      "We establish comprehensive product-market fit hypotheses, validate them, and visualise in the most creative ways.",
    art: {
      type: "lottie",
      src: "https://cdn.prod.website-files.com/667a7576e7e7ef3ba89b3f2a/66c5f3ef1571f03e6a8ea9bd_BrandStrategy%20ver2%206.json",
      className: "strategyArt",
    },
  },
  {
    title: "Brand Visual",
    description:
      "We create brand materials that speak of your values non-verbally and complement your offering to the market.",
    art: { type: "brandVisual" },
  },
  {
    title: "Platforms",
    description:
      "We think about the big picture and focus primarily on your app's business success. We research deeply, validate thoroughly, and launch confidently.",
    art: {
      type: "lottie",
      src: "https://cdn.prod.website-files.com/667a7576e7e7ef3ba89b3f2a/667a7576e7e7ef3ba89b3f87_Platform.json",
      className: "platformArt",
    },
  },
  {
    title: "Website",
    description:
      "We don’t just design websites. We build reliable sales & marketing tools that drive predictably good metrics.",
    art: {
      type: "lottie",
      src: "https://cdn.prod.website-files.com/667a7576e7e7ef3ba89b3f2a/667a7576e7e7ef3ba89b3f85_Webst.json",
      className: "websiteArt",
    },
  },
  {
    title: "Mobile Apps",
    description:
      "We're masters of UX gamification and user engagement. In a world where any app competes with Instagram we make usable products that attract and retain.",
    art: {
      type: "video",
      src: "https://dl.dropboxusercontent.com/scl/fi/jy5cqifucxea6mo5tx2id/taxi-app-main-v2_XdXjXRKv.mp4?rlkey=7ibn8inbyq804uxjjmhhml5q4&st=tlh7klec&dl=0",
    },
  },
  {
    title: "Development",
    description:
      "We can take care of your product’s implementation, assuring the most efficient usage of time & resources in every decision & each line of code while maintaining seamless operation.",
    art: {
      type: "lottie",
      src: "https://cdn.prod.website-files.com/667a7576e7e7ef3ba89b3f2a/66ab8b10eaf1ec4297b4c7e2_Developmnt22.json",
      className: "developmentArt",
    },
  },
];

function LottieArt({ src, className }) {
  const hostRef = useRef(null);
  const animationRef = useRef(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return undefined;

    let cancelled = false;
    let observer;

    loadLottieRuntime()
      .then((lottie) => {
        if (!lottie || cancelled || !hostRef.current) return;

        const animation = lottie.loadAnimation({
          container: hostRef.current,
          renderer: "svg",
          loop: false,
          autoplay: false,
          path: src,
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

        if (typeof IntersectionObserver !== "undefined") {
          observer = new IntersectionObserver(
            ([entry]) => {
              if (entry.isIntersecting) {
                animation.goToAndPlay(0, true);
                observer?.disconnect();
              }
            },
            { threshold: 0.34 },
          );
          observer.observe(hostRef.current);
        } else {
          animation.play();
        }
      })
      .catch(() => {});

    return () => {
      cancelled = true;
      observer?.disconnect();
      animationRef.current?.destroy();
      animationRef.current = null;
    };
  }, [src]);

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
      className={`${styles.lottieArt} ${styles[className] || ""}`}
      onPointerEnter={replay}
      aria-hidden="true"
    />
  );
}

function BrandVisualArt() {
  return (
    <div className={styles.brandVisualArt} aria-hidden="true">
      {brandVisualRows.map((row, rowIndex) => (
        <div className={styles.brandVisualRow} key={`brand-row-${rowIndex}`}>
          {row.map((item, itemIndex) => (
            <span
              className={styles.brandVisualItem}
              key={`${rowIndex}-${itemIndex}`}
            >
              <img src={item.base} alt="" loading="lazy" decoding="async" />
              {item.overlay ? (
                <img
                  className={styles.brandVisualOverlay}
                  src={item.overlay}
                  alt=""
                  loading="lazy"
                  decoding="async"
                />
              ) : null}
            </span>
          ))}
        </div>
      ))}
    </div>
  );
}

function ServiceArt({ art }) {
  if (art.type === "lottie") {
    return <LottieArt src={art.src} className={art.className} />;
  }

  if (art.type === "brandVisual") {
    return <BrandVisualArt />;
  }

  return (
    <div className={styles.mobileVideoWrap} aria-hidden="true">
      <video
        className={styles.mobileVideo}
        src={art.src}
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
  const cardRef = useRef(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return undefined;
    if (typeof IntersectionObserver === "undefined") {
      card.dataset.visible = "true";
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          card.dataset.visible = "true";
          observer.disconnect();
        }
      },
      { threshold: 0.12 },
    );

    observer.observe(card);
    return () => observer.disconnect();
  }, []);

  return (
    <article
      ref={cardRef}
      className={`${styles.card} ${styles[`card${index + 1}`] || ""}`}
      data-service-card
    >
      <div className={styles.cardCopy}>
        <h3>{service.title}</h3>
        <p>{service.description}</p>
      </div>
      <div className={styles.artStage}>
        <ServiceArt art={service.art} />
      </div>
    </article>
  );
}

export default function StoktServices() {
  const sectionRef = useRef(null);
  const cardsRef = useRef(null);
  const cursorRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return undefined;

    if (typeof IntersectionObserver === "undefined") {
      section.dataset.revealed = "true";
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          section.dataset.revealed = "true";
          observer.disconnect();
        }
      },
      { threshold: 0.06 },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  const updatePointerEffects = (event) => {
    const wrap = cardsRef.current;
    if (!wrap) return;

    for (const card of wrap.querySelectorAll("[data-service-card]")) {
      const rect = card.getBoundingClientRect();
      card.style.setProperty("--mouse-x", `${event.clientX - rect.left}px`);
      card.style.setProperty("--mouse-y", `${event.clientY - rect.top}px`);
    }

    const cursor = cursorRef.current;
    if (cursor) {
      const wrapRect = wrap.getBoundingClientRect();
      cursor.style.setProperty("--cursor-x", `${event.clientX - wrapRect.left}px`);
      cursor.style.setProperty("--cursor-y", `${event.clientY - wrapRect.top}px`);
    }
  };

  const setCursorVisible = (visible) => {
    if (cursorRef.current) {
      cursorRef.current.dataset.visible = visible ? "true" : "false";
    }
  };

  return (
    <section
      ref={sectionRef}
      className={styles.section}
      id="services"
      aria-labelledby="outcrowd-services-title"
    >
      <div className={styles.inner}>
        <header className={styles.header}>
          <div className={styles.headingBlock}>
            <h2 id="outcrowd-services-title">Services</h2>
            <span className={styles.headingShadow} aria-hidden="true" />
          </div>

          <div className={styles.primaryIntro}>
            <p>
              Whether you need a full-scale IT partner to define the roadmap or
              a vendor for particular tasks, we got you
            </p>
            <span className={styles.tag}>Complex solution</span>
          </div>

          <div className={styles.secondaryIntro}>
            <span className={styles.verticalLine} aria-hidden="true">
              <i />
            </span>
            <p>
              Instead of a request which sounds like “I need a website”, we
              embrace - “I want to market my product to get first organic
              users”, where we can suggest what to do, and execute the approved
              plan from A to Z.
            </p>
          </div>
        </header>

        <div
          ref={cardsRef}
          className={styles.cards}
          onPointerMove={updatePointerEffects}
          onPointerEnter={() => setCursorVisible(true)}
          onPointerLeave={() => setCursorVisible(false)}
        >
          <span ref={cursorRef} className={styles.customCursor} aria-hidden="true">
            <i />
          </span>

          {services.map((service, index) => (
            <ServiceCard key={service.title} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
