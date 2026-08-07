import { useEffect, useState } from "react";
import { GridIcon } from "./Icons";
import { useScroll } from "../contexts/ScrollContext";
import clsx from "clsx";

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
    <header
      id="header"
      className={clsx("portfolio-header text-[#f5fbff] font-[Onest,sans-serif]", shown && "in")}
    >
      {/* Same track width and inline padding as the banner layout, so the logo
          and CTA line up with the hero content below. */}
      <div
        className={clsx(
          "mx-auto grid w-[min(100%,140rem)] grid-cols-[1fr_auto] items-center gap-6",
          "min-h-24 px-5 py-4",
          "min-[901px]:min-h-30 min-[901px]:grid-cols-[1fr_auto_1fr]",
          "min-[901px]:px-[clamp(1.25rem,5.5vw,7.5rem)] min-[901px]:py-5.5",
        )}
      >
        <button
          onClick={() => scrollToId("home")}
          aria-label="Wasif.dev home"
          className="inline-flex items-center justify-self-start gap-2.5 text-[1.05rem] font-[650] tracking-[-0.02em] text-white"
        >
          <span
            aria-hidden="true"
            className="grid size-8 place-items-center rounded-full bg-white text-[0.88rem] font-extrabold text-[#07466f]"
          >
            W
          </span>
          WASIF.DEV
        </button>

        <nav className="hidden min-[901px]:block" aria-label="Primary navigation">
          {/* Each item is its own glass pill rather than one grouped container. */}
          <ul className="m-0 flex items-center gap-1.5 p-0">
            {NAV.map((item) => (
              <li key={item.label}>
                <button
                  onClick={() => scrollToId(item.target)}
                  className={clsx(
                    "min-h-10 rounded-full border border-white/15 bg-[#e0f4ff]/15 backdrop-blur-lg",
                    "px-4.5 py-2.5 text-[0.78rem] font-[550] text-[#f4fbff]/85",
                    "shadow-[inset_0_1px_0_rgba(255,255,255,0.14)]",
                    "transition-[color,background,transform] duration-200",
                    "hover:-translate-y-0.5 hover:bg-white/25 hover:text-white",
                    "max-[1180px]:px-3.5 max-[1180px]:text-[0.72rem]",
                  )}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center justify-self-end gap-2.5">
          <button
            type="button"
            onClick={onContact}
            className={clsx(
              "hidden min-h-12 rounded-full border border-white/10 bg-[#03121f]/90 px-7 py-3",
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
            className="grid size-12 place-items-center rounded-full border border-white/20 bg-[#03121f]/70 text-white min-[901px]:hidden"
          >
            <GridIcon />
          </button>
        </div>
      </div>
    </header>
  );
}
