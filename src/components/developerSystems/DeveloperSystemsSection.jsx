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
  ["01", "Frontend systems", "Responsive React interfaces, reusable components and motion that stays smooth across devices."],
  ["02", "Backend & APIs", "REST APIs, application logic, authentication and data flows designed for real production use."],
  ["03", "CMS & commerce", "WordPress, WooCommerce and custom content systems built around practical editing workflows."],
  ["04", "Integrations", "Third-party APIs, payments, automation and services connected without turning the codebase into a patchwork."],
  ["05", "Performance", "Fast loading, image strategy, clean rendering and responsive behavior treated as part of the build."],
  ["06", "Launch & support", "Deployment, QA, fixes and post-launch improvements so the product keeps working after handoff."],
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

function CapabilityCard({ number, title, copy }) {
  return (
    <article className={styles.capabilityCard}>
      <span className={styles.capabilityNumber}>{number}</span>
      <h3>{title}</h3>
      <p>{copy}</p>
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
      { rootMargin: "20% 0px 20% 0px", threshold: 0.04 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className={styles.section} id="developer-systems" data-active="false">
      <div className={styles.verticalRail} aria-hidden="true" />

      <div className={styles.realtimeBlock}>
        <div className={styles.eyebrow}>
          <span />
          Production-ready development
          <span />
        </div>

        <h2 className={styles.heroTitle}>
          Real-time systems for <em>modern web products</em>
        </h2>

        <div className={styles.scannerWrap} aria-hidden="true">
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

            <div className={styles.scanLine} />
          </div>
        </div>
      </div>

      <div className={styles.capabilitiesBlock}>
        <div className={styles.networkVisual} aria-hidden="true">
          <img src={AIVORA_ASSETS.network} alt="" />
          <div className={styles.networkGlow} />
          <div className={styles.chip}>
            <div className={styles.chipInner}>W</div>
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

        <div className={styles.capabilityGrid}>
          {capabilities.map(([number, title, copy]) => (
            <CapabilityCard key={number} number={number} title={title} copy={copy} />
          ))}
        </div>
      </div>
    </section>
  );
}
