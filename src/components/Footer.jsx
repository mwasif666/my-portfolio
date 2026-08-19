import { useRef } from "react";
import clsx from "clsx";
import { ArrowUpRight } from "./Icons";
import { FlowButton } from "@/components/ui/flow-button";
import { NAV } from "./Header";
import NoiseDarkBlueGradientWithSquares from "./ui/noise-dark-blue-gradient-with-squares";
import { CONTACT } from "../lib/contact";
import { useScroll } from "../contexts/ScrollContext";
import { useInView } from "../hooks/useInView";
import { useClock } from "../hooks/useClock";
import styles from "./Footer.module.css";

const GITHUB_USER = "mwasif666";

export default function Footer() {
  const ref = useRef(null);
  const inView = useInView(ref, { threshold: 0.12 });
  const { scrollToId, scrollToTop } = useScroll();
  const { time } = useClock();
  const year = new Date().getFullYear();

  return (
    <footer
      ref={ref}
      id="contact"
      className={clsx(styles.footer, inView && styles.in)}
      aria-labelledby="footer-title"
    >
      <NoiseDarkBlueGradientWithSquares
        className={styles.backdrop}
        direction="diagonal"
        speed={0.4}
        squareSize={44}
        borderColor="rgba(255,255,255,0.09)"
        vignette
      />

      <div className={styles.shell}>
        <div className={styles.callout}>
          <p className={styles.eyebrow}>
            <span className={styles.pulse} aria-hidden="true" />
            Open to new projects
          </p>

          <h2 id="footer-title" className={styles.title}>
            Have an idea? Let&apos;s turn it into a web product that works.
          </h2>

          <FlowButton
            text="Let's connect"
            tone="light"
            href={CONTACT.whatsappUrl}
            target="_blank"
            rel="noreferrer noopener"
            aria-label={`Let's connect on WhatsApp at ${CONTACT.phoneDisplay}`}
            className="mt-[clamp(1.8rem,4vh,2.8rem)] max-[560px]:w-full"
          />
        </div>

        <div className={styles.columns}>
          <nav className={styles.column} aria-label="Footer navigation">
            <h3 className={styles.columnTitle}>Navigate</h3>
            <ul className={styles.list}>
              {NAV.map((item) => (
                <li key={item.target}>
                  <button
                    type="button"
                    onClick={() => scrollToId(item.target)}
                    className={styles.link}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          <div className={styles.column}>
            <h3 className={styles.columnTitle}>Contact</h3>
            <ul className={styles.list}>
              <li>
                <a href={`mailto:${CONTACT.email}`} className={styles.link}>
                  {CONTACT.email}
                  <ArrowUpRight className={styles.linkIcon} />
                </a>
              </li>
              <li>
                <a
                  href={CONTACT.whatsappUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  className={styles.link}
                >
                  {CONTACT.phoneDisplay}
                  <ArrowUpRight className={styles.linkIcon} />
                </a>
              </li>
              <li>
                <a
                  href={`https://github.com/${GITHUB_USER}`}
                  target="_blank"
                  rel="noreferrer noopener"
                  className={styles.link}
                >
                  GitHub
                  <ArrowUpRight className={styles.linkIcon} />
                </a>
              </li>
            </ul>
          </div>

          <div className={styles.column}>
            <h3 className={styles.columnTitle}>Local time</h3>
            <p className={styles.clock}>{time}</p>
          </div>
        </div>
      </div>

      <div className={styles.baseline}>
        <div className={styles.shell}>
          <div className={styles.baselineRow}>
            <span className={styles.brand}>
              <span className={styles.brandMark} aria-hidden="true">W</span>
              WASIF.DEV
            </span>

            <p className={styles.copyright}>
              © {year} Muhammad Wasif. All rights reserved.
            </p>

            <FlowButton
              text="Back to top"
              tone="light"
              onClick={() => scrollToTop(false)}
              className="min-h-10 px-6 py-2 text-[.82rem]"
            />
          </div>
        </div>
      </div>
    </footer>
  );
}
