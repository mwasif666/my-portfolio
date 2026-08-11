import { useEffect, useRef } from "react";
import styles from "./DeveloperSystemsSection.module.css";
import gradient1 from "../../assets/developer-systems/gradient.png";
import gradient2 from "../../assets/developer-systems/gradient02.png";
import industryLogo from "../../assets/developer-systems/indus-logo.png";
import networkShape from "../../assets/developer-systems/indus-shape.png";
import serviceIcon01 from "../../assets/developer-systems/service-icon01.svg";
import serviceIcon02 from "../../assets/developer-systems/service-icon02.svg";
import serviceIcon03 from "../../assets/developer-systems/service-icon03.svg";
import serviceIcon04 from "../../assets/developer-systems/service-icon04.svg";
import serviceIcon05 from "../../assets/developer-systems/service-icon05.svg";
import serviceIcon06 from "../../assets/developer-systems/service-icon06.svg";
import serviceIcon07 from "../../assets/developer-systems/service-icon07.svg";

const marqueeData = [
  { tag: "POST", number: "201", text: "/api/contact/submit" },
  { tag: "GET", number: "200", text: "/api/projects/featured" },
  { tag: "PATCH", number: "204", text: "/api/profile/update" },
  { tag: "GET", number: "200", text: "/api/github/activity" },
  { tag: "DELETE", number: "204", text: "/api/cache/revalidate", red: true },
];

const ROW_SPEEDS = [10, 15, 10, 15, 10, 15];

const capabilities = [
  { icon: serviceIcon01, title: "React Interfaces" },
  { icon: serviceIcon02, title: "Backend APIs" },
  { icon: serviceIcon03, title: "WordPress" },
  { icon: serviceIcon04, title: "WooCommerce" },
  { icon: serviceIcon05, title: "Integrations" },
  { icon: serviceIcon06, title: "Performance" },
  { icon: serviceIcon07, title: "Launch Support" },
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
  return (
    <div className={styles.apiRow} style={{ "--row-speed": `${speed}s`, "--row-index": index }}>
      <div className={styles.apiTrack}>
        {[0, 1, 2].map((repeatIndex) => (
          <div className={styles.apiGroup} key={repeatIndex}>
            {marqueeData.map((item) => (
              <ApiItem
                key={`${item.tag}-${item.text}`}
                item={item}
                repeatIndex={repeatIndex}
              />
            ))}
          </div>
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
            <h2 id="developer-realtime-title">
              <span>Real-time systems for smarter web products</span>
            </h2>
          </header>

          <div className={styles.industryWrapper}>
            <div className={styles.apiMarquee} aria-label="Animated production API activity">
              <div className={styles.apiMarqueeInner}>
                {ROW_SPEEDS.map((speed, index) => (
                  <ApiMarqueeRow key={`${speed}-${index}`} speed={speed} index={index} />
                ))}
              </div>

              <div className={styles.gradientShape} aria-hidden="true">
                <img src={gradient1} alt="" />
              </div>
              <div className={styles.gradientShapeTwo} aria-hidden="true">
                <img src={gradient2} alt="" />
              </div>
            </div>

            <div className={styles.logoStage} aria-hidden="true">
              <img src={industryLogo} alt="" />
            </div>
          </div>
        </div>

        <img className={styles.networkShape} src={networkShape} alt="" aria-hidden="true" />

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
      >
        <div className={styles.container}>
          <header className={styles.sectionTitle}>
            <span className={styles.subTitle}>Developer capabilities</span>
            <h2 id="developer-capabilities-title">
              <span>What I build for the web</span>
            </h2>
          </header>
        </div>

        <div className={styles.capabilityMarquee}>
          <div className={styles.capabilityTrack}>
            {[false, true].map((duplicate) => (
              <div className={styles.capabilityGroup} key={duplicate ? "copy" : "original"}>
                {capabilities.map((item) => (
                  <CapabilityCard key={item.title} item={item} duplicate={duplicate} />
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
