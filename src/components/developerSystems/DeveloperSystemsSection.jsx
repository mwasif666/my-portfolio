import { useEffect, useRef } from "react";
import styles from "./DeveloperSystemsSection.module.css";

const AIVORA_ASSETS = {
  gradient1: "https://html.xpressbuddy.com/aivora/assets/img/industries/gradient.png",
  gradient2: "https://html.xpressbuddy.com/aivora/assets/img/industries/gradient02.png",
  indusLogo: "https://html.xpressbuddy.com/aivora/assets/img/industries/indus-logo.png",
  shape: "https://html.xpressbuddy.com/aivora/assets/img/shape/indus-shape.png",
  cardsBg: "https://html.xpressbuddy.com/aivora/assets/img/bg/industries-bg02.png",
  serviceIcons: Array.from(
    { length: 7 },
    (_, index) =>
      `https://html.xpressbuddy.com/aivora/assets/img/icon/service-icon0${index + 1}.svg`,
  ),
};

const marqueeData = [
  { tag: "POST", number: "201", text: "/api/contact/submit" },
  { tag: "GET", number: "200", text: "/api/projects/featured" },
  { tag: "PATCH", number: "204", text: "/api/profile/update" },
  { tag: "GET", number: "200", text: "/api/github/activity" },
  { tag: "DELETE", number: "204", text: "/api/cache/revalidate", red: true },
];

const ROW_SPEEDS = [10, 15, 10, 15, 10, 15];

const capabilities = [
  { icon: AIVORA_ASSETS.serviceIcons[0], title: "React Interfaces" },
  { icon: AIVORA_ASSETS.serviceIcons[1], title: "Backend APIs" },
  { icon: AIVORA_ASSETS.serviceIcons[2], title: "WordPress" },
  { icon: AIVORA_ASSETS.serviceIcons[3], title: "WooCommerce" },
  { icon: AIVORA_ASSETS.serviceIcons[4], title: "Integrations" },
  { icon: AIVORA_ASSETS.serviceIcons[5], title: "Performance" },
  { icon: AIVORA_ASSETS.serviceIcons[6], title: "Launch Support" },
];

function ApiItem({ item, repeatIndex }) {
  return (
    <div className={styles.apiItem} aria-hidden={repeatIndex > 0 ? "true" : undefined}>
      <span className={`${styles.apiTag} ${item.red ? styles.dangerTag : ""}`}>
        {item.tag}
      </span>
      <span className={`${styles.apiNumber} ${item.red ? styles.dangerNumber : ""}`}>
        {item.number}
      </span>
      <p>{item.text}</p>
    </div>
  );
}

function ApiMarqueeRow({ speed, index }) {
  const repeatedItems = [...marqueeData, ...marqueeData, ...marqueeData];

  return (
    <div className={styles.apiRow} style={{ "--row-speed": `${speed}s`, "--row-index": index }}>
      <div className={styles.apiTrack}>
        {repeatedItems.map((item, itemIndex) => (
          <ApiItem
            key={`${item.tag}-${item.text}-${itemIndex}`}
            item={item}
            repeatIndex={Math.floor(itemIndex / marqueeData.length)}
          />
        ))}
      </div>
    </div>
  );
}

function CapabilityCard({ item, duplicate = false }) {
  return (
    <article className={styles.capabilityCard} aria-hidden={duplicate ? "true" : undefined}>
      <div className={styles.capabilityIcon}>
        <img src={item.icon} alt="" loading="lazy" decoding="async" />
      </div>
      <h3>{item.title}</h3>
    </article>
  );
}

export default function DeveloperSystemsSection() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        node.dataset.active = entry.isIntersecting ? "true" : "false";
      },
      { rootMargin: "20% 0px 20% 0px", threshold: 0.02 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={sectionRef} className={styles.section} id="developer-systems" data-active="false">
      <section className={styles.marqueeSection} aria-labelledby="developer-realtime-title">
        <div className={styles.container}>
          <header className={styles.sectionTitle}>
            <span className={styles.subTitle}>Production-ready development</span>
            <h2 id="developer-realtime-title">Real-time systems for smarter web products</h2>
          </header>

          <div className={styles.industryWrapper}>
            <div className={styles.apiMarquee} aria-label="Animated production API activity">
              <div className={styles.apiMarqueeInner}>
                {ROW_SPEEDS.map((speed, index) => (
                  <ApiMarqueeRow key={`${speed}-${index}`} speed={speed} index={index} />
                ))}
              </div>

              <div className={styles.gradientShape} aria-hidden="true">
                <img src={AIVORA_ASSETS.gradient1} alt="" />
              </div>
              <div className={styles.gradientShapeTwo} aria-hidden="true">
                <img src={AIVORA_ASSETS.gradient2} alt="" />
              </div>
            </div>
          </div>

          <div className={styles.networkBridge} aria-hidden="true">
            <img
              className={styles.bottomShape}
              src={AIVORA_ASSETS.shape}
              alt=""
              loading="lazy"
              decoding="async"
            />
            <img
              className={styles.industryLogo}
              src={AIVORA_ASSETS.indusLogo}
              alt=""
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>

        <div className={styles.gradientLines} aria-hidden="true">
          <span />
          <span />
          <span />
          <span />
        </div>
      </section>

      <section
        className={styles.capabilitiesSection}
        aria-labelledby="developer-capabilities-title"
        style={{ backgroundImage: `url(${AIVORA_ASSETS.cardsBg})` }}
      >
        <div className={styles.container}>
          <header className={styles.sectionTitle}>
            <span className={styles.subTitle}>Developer capabilities</span>
            <h2 id="developer-capabilities-title">What I build for the web</h2>
          </header>
        </div>

        <div className={styles.capabilityMarquee}>
          <div className={styles.capabilityTrack}>
            {[...capabilities, ...capabilities].map((item, index) => (
              <CapabilityCard
                key={`${item.title}-${index}`}
                item={item}
                duplicate={index >= capabilities.length}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
