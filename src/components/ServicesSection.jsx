import { useEffect, useRef, useState } from "react";
import { useScroll } from "../contexts/ScrollContext";

const services = [
  {
    number: "01",
    title: "Website Design & Development",
    description:
      "Responsive, production-ready websites built around clear interfaces, maintainable code and a polished experience across every screen.",
    tags: ["UI Development", "Responsive Systems", "SEO Setup"],
    image:
      "https://framerusercontent.com/images/l4dV85qhMS96ZgNwZerM9ax6U8.png?width=1360&height=1360",
  },
  {
    number: "02",
    title: "WordPress & WooCommerce",
    description:
      "Flexible WordPress and WooCommerce builds for businesses that need reliable content management, commerce flows and room to grow.",
    tags: ["Custom WordPress", "WooCommerce", "CMS"],
    image:
      "https://framerusercontent.com/images/MuU4fEfvQ8jCQddULyLuuozyEGc.png?width=1360&height=1360",
  },
  {
    number: "03",
    title: "Full-Stack Web Applications",
    description:
      "Interactive web products that connect thoughtful frontend experiences with dependable backend logic, data and real application workflows.",
    tags: ["React", "Node / APIs", "Databases"],
    image:
      "https://framerusercontent.com/images/uEyJGCYCS776ED6W9QADtnCyXo.png?width=1360&height=1360",
  },
  {
    number: "04",
    title: "API & Backend Integration",
    description:
      "Secure integrations that connect interfaces to authentication, payments, third-party services and the backend systems your product depends on.",
    tags: ["REST APIs", "Authentication", "Payments"],
    image:
      "https://framerusercontent.com/images/hT4iYoRLtrcvEKW8z0SkgbY70PI.png?width=1360&height=1360",
  },
  {
    number: "05",
    title: "Performance & Optimization",
    description:
      "Focused improvements for speed, technical SEO, accessibility and Core Web Vitals so the final experience feels fast and works reliably.",
    tags: ["Core Web Vitals", "Technical SEO", "Accessibility"],
    image:
      "https://framerusercontent.com/images/gcXigyqtZNaYxdCS9aX3qKtug.png?width=1360&height=1360",
  },
];

export default function ServicesSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const triggerRefs = useRef([]);
  const { scrollToId } = useScroll();

  useEffect(() => {
    let frame = 0;

    const updateActive = () => {
      frame = 0;
      const viewportCenter = window.innerHeight * 0.5;
      let nextIndex = 0;
      let closestDistance = Number.POSITIVE_INFINITY;

      triggerRefs.current.forEach((trigger, index) => {
        if (!trigger) return;
        const rect = trigger.getBoundingClientRect();
        const center = rect.top + rect.height * 0.5;
        const distance = Math.abs(center - viewportCenter);

        if (distance < closestDistance) {
          closestDistance = distance;
          nextIndex = index;
        }
      });

      setActiveIndex((current) => (current === nextIndex ? current : nextIndex));
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
      <h2 className="sr-only" id="services-title">
        Services
      </h2>

      <div className="service-orbit__layout">
        <aside className="service-orbit__progress" aria-label="Services progress">
          <div className="service-orbit__progress-sticky">
            <div
              className="service-orbit__dial"
              style={{ "--wheel-rotation": `${activeIndex * -30}deg` }}
            >
              <span className="service-orbit__circle" aria-hidden="true" />

              {services.map((service, index) => (
                <button
                  key={service.number}
                  type="button"
                  className={`service-orbit__step${activeIndex === index ? " is-active" : ""}`}
                  style={{ "--step-angle": `${index * 30}deg` }}
                  onClick={() => scrollToId(`service-${service.number}`)}
                  aria-label={`Go to ${service.title}`}
                  aria-current={activeIndex === index ? "step" : undefined}
                >
                  <span className="service-orbit__radial" aria-hidden="true" />
                  <span className="service-orbit__step-end">
                    <i aria-hidden="true" />
                    <b>{service.number}</b>
                  </span>
                </button>
              ))}
            </div>
          </div>
        </aside>

        <div className="service-orbit__center">
          <div className="service-orbit__center-sticky">
            <div className="service-orbit__content-stage" aria-live="polite">
              {services.map((service, index) => (
                <article
                  className={`service-orbit__content-panel${activeIndex === index ? " is-active" : ""}`}
                  key={service.number}
                  aria-hidden={activeIndex !== index}
                >
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                  <div
                    className="service-orbit__tags"
                    aria-label={`${service.title} capabilities`}
                  >
                    {service.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>

          <div className="service-orbit__scroll-track" aria-hidden="true">
            {services.map((service, index) => (
              <div
                className="service-orbit__trigger"
                id={`service-${service.number}`}
                key={service.number}
                ref={(node) => {
                  triggerRefs.current[index] = node;
                }}
              />
            ))}
          </div>
        </div>

        <aside className="service-orbit__illustrations" aria-hidden="true">
          <div className="service-orbit__illustrations-sticky">
            {services.map((service, index) => (
              <div
                className={`service-orbit__visual${activeIndex === index ? " is-active" : ""}`}
                key={service.number}
              >
                <img
                  src={service.image}
                  alt=""
                  loading={index === 0 ? "eager" : "lazy"}
                />
              </div>
            ))}
          </div>
        </aside>
      </div>
    </section>
  );
}
