import { useEffect, useRef } from "react";
import styles from "./Services.module.css";

export default function ServiceCard({ service }) {
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
      <div className={styles.media}>
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
