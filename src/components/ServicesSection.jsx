import { useEffect, useRef, useState } from "react";
import { useScroll } from "../contexts/ScrollContext";

const services = [
  {
    number: "01",
    title: "Website Design & Development",
    description:
      "Responsive, production-ready websites built around clear interfaces, maintainable code and a polished experience across every screen.",
    tags: ["UI Development", "Responsive Systems", "SEO Setup"],
    visual: "browser",
  },
  {
    number: "02",
    title: "WordPress & WooCommerce",
    description:
      "Custom WordPress and WooCommerce builds for businesses that need flexible content management, reliable commerce flows and room to grow.",
    tags: ["Custom WordPress", "WooCommerce", "CMS"],
    visual: "commerce",
  },
  {
    number: "03",
    title: "Full-Stack Web Applications",
    description:
      "Interactive web products that connect thoughtful frontend experiences with dependable backend logic, data and real application workflows.",
    tags: ["React", "Node / APIs", "Databases"],
    visual: "stack",
  },
  {
    number: "04",
    title: "API & Backend Integration",
    description:
      "Secure integrations that connect interfaces to authentication, payments, third-party services and the backend systems your product depends on.",
    tags: ["REST APIs", "Authentication", "Payments"],
    visual: "api",
  },
  {
    number: "05",
    title: "Performance & Optimization",
    description:
      "Focused improvements for speed, technical SEO, accessibility and Core Web Vitals so the final experience feels fast and works reliably.",
    tags: ["Core Web Vitals", "Technical SEO", "Accessibility"],
    visual: "performance",
  },
];

function ServiceIllustration({ type }) {
  if (type === "browser") {
    return (
      <div className="service-visual service-visual--browser" aria-hidden="true">
        <div className="service-visual__browser-shell">
          <div className="service-visual__browser-bar">
            <i />
            <i />
            <i />
            <span>wasif.dev</span>
          </div>
          <div className="service-visual__browser-page">
            <span className="service-visual__eyebrow-line" />
            <span className="service-visual__headline-line service-visual__headline-line--wide" />
            <span className="service-visual__headline-line" />
            <div className="service-visual__browser-grid">
              <i />
              <i />
              <i />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (type === "commerce") {
    return (
      <div className="service-visual service-visual--commerce" aria-hidden="true">
        <div className="service-visual__commerce-card">
          <div className="service-visual__product">
            <span className="service-visual__product-mark">W</span>
          </div>
          <div className="service-visual__product-copy">
            <span>PRODUCT / 01</span>
            <strong>Flexible commerce</strong>
            <i />
            <i />
          </div>
          <div className="service-visual__cart">+ CART</div>
        </div>
        <div className="service-visual__commerce-chip">Woo</div>
        <div className="service-visual__commerce-chip service-visual__commerce-chip--wp">WP</div>
      </div>
    );
  }

  if (type === "stack") {
    return (
      <div className="service-visual service-visual--stack" aria-hidden="true">
        <div className="service-visual__stack-ring service-visual__stack-ring--one" />
        <div className="service-visual__stack-ring service-visual__stack-ring--two" />
        <div className="service-visual__stack-core">FULL<br />STACK</div>
        <span className="service-visual__stack-chip service-visual__stack-chip--ui">UI</span>
        <span className="service-visual__stack-chip service-visual__stack-chip--api">API</span>
        <span className="service-visual__stack-chip service-visual__stack-chip--db">DB</span>
      </div>
    );
  }

  if (type === "api") {
    return (
      <div className="service-visual service-visual--api" aria-hidden="true">
        <div className="service-visual__api-panel">
          <div className="service-visual__api-top"><span>API</span><i /></div>
          <code><b>GET</b> /api/projects</code>
          <code><b>POST</b> /checkout</code>
          <code><b>AUTH</b> bearer_token</code>
          <div className="service-visual__api-response">
            <span>{"{"}</span>
            <i>status: 200</i>
            <i>connected: true</i>
            <span>{"}"}</span>
          </div>
        </div>
        <span className="service-visual__api-node service-visual__api-node--a" />
        <span className="service-visual__api-node service-visual__api-node--b" />
        <span className="service-visual__api-node service-visual__api-node--c" />
      </div>
    );
  }

  return (
    <div className="service-visual service-visual--performance" aria-hidden="true">
      <div className="service-visual__score-ring">
        <span>98</span>
        <small>PERFORMANCE</small>
      </div>
      <div className="service-visual__metric service-visual__metric--one">
        <span>0.8s</span><small>LCP</small>
      </div>
      <div className="service-visual__metric service-visual__metric--two">
        <span>100</span><small>SEO</small>
      </div>
      <div className="service-visual__speed-lines"><i /><i /><i /><i /><i /></div>
    </div>
  );
}

export default function ServicesSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const itemRefs = useRef([]);
  const { scrollToId } = useScroll();

  useEffect(() => {
    let frame = 0;

    const updateActive = () => {
      frame = 0;
      const viewportCenter = window.innerHeight * 0.5;
      let closestIndex = 0;
      let closestDistance = Number.POSITIVE_INFINITY;

      itemRefs.current.forEach((item, index) => {
        if (!item) return;
        const rect = item.getBoundingClientRect();
        const itemCenter = rect.top + rect.height * 0.5;
        const distance = Math.abs(itemCenter - viewportCenter);
        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = index;
        }
      });

      setActiveIndex((current) => (current === closestIndex ? current : closestIndex));
    };

    const requestUpdate = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(updateActive);
    };

    updateActive();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
    };
  }, []);

  return (
    <section className="service-orbit" id="services" aria-labelledby="services-title">
      <div className="service-orbit__layout">
        <aside className="service-orbit__progress" aria-label="Services progress">
          <div className="service-orbit__progress-inner">
            <span className="service-orbit__section-label">SERVICES / 01—05</span>
            <div className="service-orbit__dial">
              <span className="service-orbit__dial-line" aria-hidden="true" />
              {services.map((service, index) => (
                <button
                  key={service.number}
                  type="button"
                  className={`service-orbit__step service-orbit__step--${index + 1}${activeIndex === index ? " is-active" : ""}`}
                  onClick={() => scrollToId(`service-${service.number}`)}
                  aria-label={`Go to ${service.title}`}
                  aria-current={activeIndex === index ? "step" : undefined}
                >
                  <span>{service.number}</span>
                  <i aria-hidden="true" />
                </button>
              ))}
            </div>
            <span className="service-orbit__progress-copy">
              SCROLL TO EXPLORE
              <b>{services[activeIndex].number}</b>
            </span>
          </div>
        </aside>

        <div className="service-orbit__items">
          <h2 className="sr-only" id="services-title">Services</h2>
          {services.map((service, index) => (
            <article
              className={`service-orbit__item${activeIndex === index ? " is-active" : ""}`}
              id={`service-${service.number}`}
              key={service.number}
              ref={(node) => {
                itemRefs.current[index] = node;
              }}
            >
              <div className="service-orbit__item-copy">
                <span className="service-orbit__item-number">/ {service.number}</span>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                <div className="service-orbit__tags" aria-label={`${service.title} capabilities`}>
                  {service.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
              </div>

              <div className="service-orbit__mobile-visual">
                <ServiceIllustration type={service.visual} />
              </div>
            </article>
          ))}
        </div>

        <aside className="service-orbit__illustrations" aria-hidden="true">
          <div className="service-orbit__illustrations-inner">
            <span className="service-orbit__illustration-label">CAPABILITY / {services[activeIndex].number}</span>
            <div className="service-orbit__visual-stage">
              {services.map((service, index) => (
                <div
                  className={`service-orbit__visual${activeIndex === index ? " is-active" : ""}`}
                  key={service.number}
                >
                  <ServiceIllustration type={service.visual} />
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}
