import { useEffect, useRef, useState } from "react";
import { useScroll } from "../contexts/ScrollContext";

const WORDS = [
  "Full Stack",
  "Frontend",
  "Backend",
  "APIs",
  "Databases",
  "Development",
  "Deployment",
  "Performance",
  "Scalable",
  "Production",
];

const COUNTER_DURATION = 2350;
const HOLD_DURATION = 140;
const EXIT_DURATION = 1200;
const WORD_INTERVAL = 450;

const easeOutQuart = (value) => 1 - Math.pow(1 - value, 4);

export default function PageLoader({ onDone }) {
  const { stopScroll, startScroll } = useScroll();
  const [progress, setProgress] = useState(0);
  const [wordIndex, setWordIndex] = useState(0);
  const [wordChanging, setWordChanging] = useState(false);
  const [exit, setExit] = useState(false);
  const [gone, setGone] = useState(false);
  const onDoneRef = useRef(onDone);

  useEffect(() => {
    onDoneRef.current = onDone;
  }, [onDone]);

  useEffect(() => {
    stopScroll();

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const timeouts = [];
    let counterFrame;
    let wordTimer;
    let finished = false;

    const finish = () => {
      if (finished) return;
      finished = true;
      startScroll();
      onDoneRef.current?.();
      setGone(true);
    };

    const schedule = (callback, delay) => {
      const id = window.setTimeout(callback, delay);
      timeouts.push(id);
      return id;
    };

    if (reduceMotion) {
      setProgress(100);
      schedule(finish, 80);
    } else {
      wordTimer = window.setInterval(() => {
        setWordChanging(true);
        schedule(() => {
          setWordIndex((current) => (current + 1) % WORDS.length);
          setWordChanging(false);
        }, 150);
      }, WORD_INTERVAL);

      const startedAt = performance.now();
      const updateCounter = (now) => {
        const elapsed = now - startedAt;
        const ratio = Math.min(elapsed / COUNTER_DURATION, 1);
        setProgress(Math.min(100, Math.floor(easeOutQuart(ratio) * 100)));

        if (ratio < 1) {
          counterFrame = requestAnimationFrame(updateCounter);
          return;
        }

        setProgress(100);
        window.clearInterval(wordTimer);
        schedule(() => setExit(true), HOLD_DURATION);
        schedule(finish, HOLD_DURATION + EXIT_DURATION);
      };

      counterFrame = requestAnimationFrame(updateCounter);
    }

    return () => {
      cancelAnimationFrame(counterFrame);
      window.clearInterval(wordTimer);
      timeouts.forEach(window.clearTimeout);
      if (!finished) startScroll();
    };
  }, [startScroll, stopScroll]);

  if (gone) return null;

  return (
    <div
      id="preloader"
      className={`preloader${exit ? " is-complete" : ""}`}
      aria-hidden="true"
    >
      <div className="preloader__panels">
        {Array.from({ length: 5 }, (_, index) => (
          <span className="preloader__panel" key={index} />
        ))}
      </div>

      <div className="preloader__content">
        <div className="preloader__counter">
          <span>{progress}</span>%
        </div>

        <div className="preloader__title">
          <span className={wordChanging ? "is-changing" : ""}>
            {WORDS[wordIndex]}
          </span>
        </div>
      </div>
    </div>
  );
}
