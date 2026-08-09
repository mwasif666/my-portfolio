import { useEffect, useState } from "react";
import clsx from "clsx";
import { GridIcon } from "./Icons";
import { useScroll } from "../contexts/ScrollContext";
import { useHeaderMorph } from "../hooks/useHeaderMorph";
import "./header/Header.css";

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
      className={clsx("portfolio-header", shown && "in", compact && "is-compact")}
    >
      <div className="headerMorph__shell">
        <button
          type="button"
          onClick={() => scrollToId("home")}
          aria-label="Wasif.dev home"
          className="headerMorph__brand"
        >
          <span className="headerMorph__brandMark" aria-hidden="true">W</span>
          <span>WASIF.DEV</span>
        </button>

        <nav className="headerMorph__nav" aria-label="Primary navigation">
          <ul className="headerMorph__list">
            {NAV.map((item) => (
              <li key={item.target} className="headerMorph__item">
                <button
                  type="button"
                  onClick={() => scrollToId(item.target)}
                  className="headerMorph__link"
                  aria-label={`Go to ${item.label}`}
                >
                  <span className="headerMorph__dot" aria-hidden="true" />
                  <span className="headerMorph__label">{item.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <div className="headerMorph__actions">
          <button type="button" onClick={onContact} className="headerMorph__cta">
            Let&apos;s talk
          </button>

          <button
            type="button"
            onClick={onMenu}
            aria-label="Open menu"
            className="headerMorph__menu"
          >
            <GridIcon />
          </button>
        </div>
      </div>
    </header>
  );
}
