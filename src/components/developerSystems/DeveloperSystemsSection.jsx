import { useEffect, useRef } from "react";
import styles from "./DeveloperSystemsSection.module.css";

const AIVORA_ASSETS = {
  gradient: "https://html.xpressbuddy.com/aivora/assets/img/industries/gradient.png",
  gradientAlt: "https://html.xpressbuddy.com/aivora/assets/img/industries/gradient02.png",
  network: "https://html.xpressbuddy.com/aivora/assets/img/shape/indus-shape.png",
};

const requests = [
  { method: "GET", code: "200", path: "/api/projects/featured" },
  { method: "POST", code: "201", path: "/api/contact/submit" },
  { method: "GET", code: "200", path: "/api/github/activity" },
  { method: "PATCH", code: "204", path: "/api/profile/update" },
  { method: "GET", code: "200", path: "/api/projects/featured" },
  { method: "POST", code: "201", path: "/api/contact/submit" },
];

const capabilities = [
  ["01", "React interfaces", "Responsive, component-driven frontends."],
  ["02", "Backend APIs", "Production-ready application logic and data flows."],
  ["03", "WordPress", "Custom themes, content systems and integrations."],
  ["04", "WooCommerce", "Commerce flows, checkout and store customization."],
  ["05", "Integrations", "Payments, third-party APIs and automation."],
  ["06", "Performance", "Fast rendering, responsive UX and optimization."],
  ["07", "Launch support", "QA, deployment, fixes and post-launch iteration."],
];

function RequestColumn({ item, index }) {
  return (
    <div className={styles.requestColumn} style={{ "--column-index": index }}>
      <span className={styles.requestPath}>{item.path}</span>
      <span className={styles.requestMethod}>{item.method}</span>
      <span className={styles.requestCode}>{item.code}</span>
    </div>
  );
}

function CapabilityTile({ number, title, copy }) {
  return (
    <article className={styles.capabilityTile}>
      <span className={styles.tileNumber}>{number}</span>
      <div className={styles.tileMark} aria-hidden="true">
        <i />
        <i />
        <i />
      </div>
      <div>
        <h3>{title}</h3>
        <p>{copy}</p>
      </div>
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
      { rootMargin: "15% 0px 15% 0px", threshold: 0.03 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className={styles.section} id="developer-systems" data-active="false">
      <div className={styles.rail} aria-hidden="true" />

      <div className={styles.realtimeBlock}>
        <div className={styles.eyebrow}>
          <span />
          Production-ready development
          <span />
        </div>

        <h2 className={styles.heroTitle}>
          Real-time systems for <em>modern web products</em>
        </h2>

        <div className={styles.scannerStage} aria-hidden="true">
          <img className={styles.scannerGlowOne} src={AIVORA_ASSETS.gradient} alt="" />
          <img className={styles.scannerGlowTwo} src={AIVORA_ASSETS.gradientAlt} alt="" />

          <div className={styles.scannerFrame}>
            <i className={`${styles.corner} ${styles.cornerTL}`} />
            <i className={`${styles.corner} ${styles.cornerTR}`} />
            <i className={`${styles.corner} ${styles.cornerBL}`} />
            <i className={`${styles.corner} ${styles.cornerBR}`} />

            <div className={styles.requestColumns}>
              {requests.map((item, index) => (
                <RequestColumn key={`${item.method}-${item.path}-${index}`} item={item} index={index} />
              ))}
            </div>

            <div className={styles.scanBeam} />
          </div>
        </div>
      </div>

      <div className={styles.capabilitiesBlock}>
        <div className={styles.networkStage} aria-hidden="true">
          <img className={styles.networkShape} src={AIVORA_ASSETS.network} alt="" />
          <div className={styles.networkAura} />
          <div className={styles.chipShell}>
            <div className={styles.chipMiddle}>
              <div className={styles.chipInner}>W</div>
            </div>
          </div>
        </div>

        <div className={styles.eyebrow}>
          <span />
          Developer capabilities
          <span />
        </div>

        <h2 className={styles.capabilitiesTitle}>
          What I build <em>for the web</em>
        </h2>

        <div className={styles.capabilityViewport}>
          <div className={styles.capabilityTrack}>
            {capabilities.map(([number, title, copy]) => (
              <CapabilityTile key={number} number={number} title={title} copy={copy} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
