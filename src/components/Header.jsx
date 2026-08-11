import { useEffect, useState } from "react";
import clsx from "clsx";
import { GridIcon } from "./Icons";
import { useScroll } from "../contexts/ScrollContext";
import { useHeaderMorph } from "../hooks/useHeaderMorph";
import styles from "./header/Header.module.css";

export const NAV = [
  { label: "Home", target: "home" },
  { label: "About", target: "about" },
  { label: "Services", target: "services" },
  { label: "Projects", target: "projects" },
];

export default function Header({ ready, onMenu, onContact }) {
  const [shown, setShown] = useState(false);
  const [activeTarget, setActiveTarget] = useState("home");
  const compact = useHeaderMorph(72);
  const { scrollToId } = useScroll();

  useEffect(() => {
    if (!ready) return undefined;
    const timer = window.setTimeout(() => setShown(true), 120);
    return () => window.clearTimeout(timer);
  }, [ready]);

  useEffect(() => {
    let frame = 0;

    const updateActiveSection = () => {
      frame = 0;
      const anchor = window.innerHeight * 0.3;
      let current = NAV[0].target;

      for (const item of NAV) {
        const section = document.getElementById(item.target);
        if (!section) continue;

        const rect = section.getBoundingClientRect();
        if (rect.top <= anchor) current = item.target;
        if (rect.top <= anchor && rect.bottom > anchor) {
          current = item.target;
          break;
        }
      }

      setActiveTarget((previous) => (previous === current ? previous : current));
    };

    const schedule = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(updateActiveSection);
    };

    updateActiveSection();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);

  return (
    <header
      id="header"
      className={clsx(styles.header, shown && styles.visible, compact && styles.compact)}
    >
      <div className={styles.shell}>
        <button
          type="button"
          onClick={() => scrollToId("home")}
          aria-label="Wasif.dev home"
          className={styles.brand}
        >
          <span className={styles.brandMark} aria-hidden="true">W</span>
          <span>WASIF.DEV</span>
        </button>

        <nav className={styles.nav} aria-label="Primary navigation">
          <ul className={styles.list}>
            {NAV.map((item) => {
              const active = activeTarget === item.target;

              return (
                <li key={item.target} className={styles.item}>
                  <button
                    type="button"
                    onClick={() => scrollToId(item.target)}
                    className={clsx(styles.link, active && styles.activeLink)}
                    aria-label={`Go to ${item.label}`}
                    aria-current={active ? "page" : undefined}
                  >
                    <span className={styles.dot} aria-hidden="true" />
                    <span className={styles.label}>{item.label}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className={styles.actions}>
          <button type="button" onClick={onContact} className={styles.cta}>
            Let&apos;s talk
          </button>

          <button
            type="button"
            onClick={onMenu}
            aria-label="Open menu"
            className={styles.menu}
          >
            <GridIcon />
          </button>
        </div>
      </div>
    </header>
  );
}
