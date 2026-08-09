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
  const compact = useHeaderMorph(72);
  const { scrollToId } = useScroll();

  useEffect(() => {
    if (!ready) return undefined;
    const timer = window.setTimeout(() => setShown(true), 120);
    return () => window.clearTimeout(timer);
  }, [ready]);

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
            {NAV.map((item) => (
              <li key={item.target} className={styles.item}>
                <button
                  type="button"
                  onClick={() => scrollToId(item.target)}
                  className={styles.link}
                  aria-label={`Go to ${item.label}`}
                >
                  <span className={styles.dot} aria-hidden="true" />
                  <span className={styles.label}>{item.label}</span>
                </button>
              </li>
            ))}
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
