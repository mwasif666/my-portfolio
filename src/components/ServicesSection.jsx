import { useEffect, useRef, useState } from "react";
import { useScroll } from "../contexts/ScrollContext";
import "../services-icons.css";

const services = [
  {
    number: "01",
    title: "Website Design & Development",
    description:
      "Responsive, production-ready websites built around clear interfaces, maintainable code and a polished experience across every screen.",
    tags: ["UI Development", "Responsive Systems", "SEO Setup"],
    image: "/service-art/website-design.svg",
    visual: "website",
  },
  {
    number: "02",
    title: "WordPress & WooCommerce",
    description:
      "Flexible WordPress and WooCommerce builds for businesses that need reliable content management, commerce flows and room to grow.",
    tags: ["Custom WordPress", "WooCommerce", "CMS"],
    image: "/service-art/wordpress-commerce.svg",
    visual: "commerce",
  },
  {
    number: "03",
    title: "Full-Stack Web Applications",
    description:
      "Interactive web products that connect thoughtful frontend experiences with dependable backend logic, data and real application workflows.",
    tags: ["React", "Node / APIs", "Databases"],
    image: "/service-art/fullstack-apps.svg",
    visual: "fullstack",
  },
  {
    number: "04",
    title: "API & Backend Integration",
    description:
      "Secure integrations that connect interfaces to authentication, payments, third-party services and the backend systems your product depends on.",
    tags: ["REST APIs", "Authentication", "Payments"],
    image: "/service-art/api-backend.svg",
    visual: "api",
  },
  {
    number: "05",
    title: "Performance & Optimization",
    description:
      "Focused improvements for speed, technical SEO, accessibility and Core Web Vitals so the final experience feels fast and works reliably.",
    tags: ["Core Web Vitals", "Technical SEO", "Accessibility"],
    image: "/service-art/performance.svg",
    visual: "performance",
  },
];

function ServiceVisual({ service, eager = false }) {
  return (
    <div className={`service-orbit__art service-orbit__art--${service.visual}`}>
      <img
        src={service.image}
        alt=""
        loading={eager ? "eager" : "lazy"}
        decoding="async"
      />
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
      let nextIndex = 0;
      let closestDistance = Infinity;

      itemRefs.current.forEach((item, index) => {
        if (!item) return;
        const rect = item.getBoundingClientRect();
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
      frame = requestAnimationFrame(updateActive);
    };

    updateActive();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
    };
  }, []);

  return (
    <section className="service-orbit" id="services" aria-labelledby="services-title">
      <h2 className="sr-only" id="services-title">Services</h2>

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

        <div className="service-orbit__items">
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
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                <div className="service-orbit__tags" aria-label={`${service.title} capabilities`}>
                  {service.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
              </div>

              <div className="service-orbit__mobile-visual" aria-hidden="true">
                <ServiceVisual service={service} />
              </div>
            </article>
          ))}
        </div>

        <aside className="service-orbit__illustrations" aria-hidden="true">
          <div className="service-orbit__illustrations-sticky">
            {services.map((service, index) => (
              <div
                className={`service-orbit__visual${activeIndex === index ? " is-active" : ""}`}
                key={service.number}
              >
                <ServiceVisual service={service} eager={index === 0} />
              </div>
            ))}
          </div>
        </aside>
      </div>
    </section>
  );
}
