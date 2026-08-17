import { useEffect, useRef } from "react";
import styles from "./Expertise.module.css";

export default function ServiceCard({ service, speed = 0 }) {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || typeof IntersectionObserver === "undefined") return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) video.play().catch(() => {});
        else video.pause();
      },
      { threshold: 0.18 },
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <article className={styles.card}>
      <div className={styles.cardBorder} aria-hidden="true" />
      {/* Parallax rides the media box, never the video: `.video` owns a scale
          transform for the hover state and Locomotive writes inline transforms. */}
      <div className={styles.media} data-scroll data-scroll-speed={speed}>
        <video
          ref={videoRef}
          className={styles.video}
          src={service.video}
          poster={service.poster}
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden="true"
        />
      </div>
      <div className={styles.cardFooter}>
        <h3 className={styles.cardTitle}>
          {service.title.map((word, index) => (
            <span key={`${word}-${index}`}>{word}</span>
          ))}
        </h3>
      </div>
    </article>
  );
}
