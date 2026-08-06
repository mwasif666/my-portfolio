import { useEffect, useState } from "react";
import { GridIcon } from "./Icons";
import { useScroll } from "../contexts/ScrollContext";
import styles from "./Header.module.css";

export const NAV = [
  { label: "Home", target: "home", current: true },
  { label: "About", target: "about" },
  { label: "Services", target: "services" },
  { label: "Projects", target: "projects" },
];

export default function Header({ ready, onMenu, onContact }) {
  const [shown, setShown] = useState(false);
  const { scrollToId } = useScroll();

  useEffect(() => {
    if (!ready) return undefined;
    const timer = setTimeout(() => setShown(true), 120);
    return () => clearTimeout(timer);
  }, [ready]);

  return (
    <header id="header" className={`${shown ? "in " : ""}portfolio-header ${styles.header}`}>
      <div className={styles.inner}>
        <button className={styles.logo} onClick={() => scrollToId("home")} aria-label="Wasif.dev home">
          <span aria-hidden="true">W</span>
          WASIF.DEV
        </button>

        <nav className={styles.nav} aria-label="Primary navigation">
          <ul>
            {NAV.map((item) => (
              <li key={item.label}>
                <button onClick={() => scrollToId(item.target)}>{item.label}</button>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.actions}>
          <button className={styles.contact} type="button" onClick={onContact}>Let&apos;s talk</button>
          <button className={styles.menu} onClick={onMenu} aria-label="Open menu"><GridIcon /></button>
        </div>
      </div>
    </header>
  );
}
