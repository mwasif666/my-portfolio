import { useEffect, useState } from "react";
import { GridIcon } from "./Icons";
import { useScroll } from "../contexts/ScrollContext";
import clsx from "clsx";

export const NAV = [
  { label: "Home", target: "home" },
  { label: "About", target: "about" },
  { label: "Services", target: "services" },
  { label: "Projects", target: "projects" },
];

export default function Header({ ready, onMenu, onContact }) {
  const [shown, setShown] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollToId } = useScroll();

  useEffect(() => {
    if (!ready) return undefined;
    const timer = setTimeout(() => setShown(true), 120);
    return () => clearTimeout(timer);
  }, [ready]);

  useEffect(() => {
    let frame = 0;

    const updateHeader = () => {
      setScrolled(window.scrollY > 72);
      frame = 0;
    };

    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(updateHeader);
    };

    updateHeader();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <header
      id="header"
      className={clsx(
        "portfolio-header text-[#f5fbff] font-[Onest,sans-serif]",
        shown && "in",
        scrolled && "is-scrolled",
      )}
    >
      <div
        className={clsx(
          "portfolio-header-shell",
          "mx-auto grid w-[min(100%,140rem)] grid-cols-[1fr_auto] items-center gap-6",
          "min-h-24 px-5 py-4",
          "min-[901px]:min-h-30 min-[901px]:grid-cols-[1fr_auto_1fr]",
          "min-[901px]:px-[clamp(1.25rem,5.5vw,7.5rem)] min-[901px]:py-5.5",
        )}
      >
        <button
          onClick={() => scrollToId("home")}
          aria-label="Wasif.dev home"
          className="portfolio-header-brand inline-flex items-center justify-self-start gap-2.5 text-[1.05rem] font-[700] tracking-[-0.02em] text-white [text-shadow:0_1px_12px_rgba(0,28,48,0.45)]"
        >
          <span
            aria-hidden="true"
            className="portfolio-header-brand-mark grid size-8 place-items-center rounded-full bg-white text-[0.88rem] font-extrabold text-[#07466f]"
          >
            W
          </span>
          <span className="portfolio-header-brand-text">WASIF.DEV</span>
        </button>

        <nav className="portfolio-header-nav hidden min-[901px]:block" aria-label="Primary navigation">
          <ul className="portfolio-header-nav-list m-0 flex items-center gap-2 p-0">
            {NAV.map((item) => (
              <li key={item.label} className="portfolio-header-nav-item">
                <button
                  onClick={() => scrollToId(item.target)}
                  className={clsx(
                    "portfolio-header-nav-link min-h-10 rounded-full",
                    "text-[0.8rem] font-semibold text-white",
                    "[text-shadow:0_1px_10px_rgba(0,24,42,0.32)]",
                  )}
                  aria-label={`Go to ${item.label}`}
                >
                  <span className="portfolio-header-nav-dot" aria-hidden="true" />
                  <span className="portfolio-header-nav-label">{item.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <div className="portfolio-header-actions flex items-center justify-self-end gap-2.5">
          <button
            type="button"
            onClick={onContact}
            className={clsx(
              "portfolio-header-cta hidden min-h-12 rounded-full border border-white/15 bg-[#03121f]/90 px-7 py-3",
              "text-[0.82rem] font-semibold text-white shadow-[0_0.65rem_1.6rem_rgba(0,17,32,0.32)]",
              "transition-[background,transform] duration-200 hover:-translate-y-0.5 hover:bg-[#01111e]",
              "min-[901px]:block max-[1180px]:px-5 max-[1180px]:text-[0.76rem]",
            )}
          >
            Let&apos;s talk
          </button>

          <button
            onClick={onMenu}
            aria-label="Open menu"
            className="portfolio-header-menu grid size-12 place-items-center rounded-full border border-white/20 bg-[#03121f]/70 text-white min-[901px]:hidden"
          >
            <GridIcon />
          </button>
        </div>
      </div>
    </header>
  );
}
