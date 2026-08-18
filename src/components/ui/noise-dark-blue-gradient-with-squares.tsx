import type { CSSProperties } from "react";
import clsx from "clsx";
import styles from "./noise-dark-blue-gradient-with-squares.module.css";

type Direction = "right" | "left" | "up" | "down" | "diagonal";

// Pixels per second the grid travels at `speed: 1`.
const BASE_DRIFT_PX_PER_SECOND = 10;

interface LoaderBackgroundProps {
  showGrid?: boolean;
  direction?: Direction;
  speed?: number;
  squareSize?: number;
  borderColor?: string;
  vignette?: boolean;
  className?: string;
}

export default function NoiseDarkBlueGradientWithSquares({
  showGrid = true,
  direction = "diagonal",
  speed = 0.6,
  squareSize = 44,
  borderColor = "rgba(255,255,255,0.12)",
  vignette = true,
  className = "",
}: LoaderBackgroundProps) {
  // Drift is expressed in pixels per second, not as a fixed duration: a 1px
  // grid line creeping along at ~1.5px/s never glides, it smears across a pixel
  // boundary for most of a second and reads as a stutter. Deriving the duration
  // from the tile size keeps the apparent speed constant whatever `squareSize`
  // is, and `speed` stays a multiplier on that rate.
  const duration = squareSize / (BASE_DRIFT_PX_PER_SECOND * Math.max(speed, 0.1));

  return (
    <div
      aria-hidden="true"
      className={clsx(styles.root, styles[direction], className)}
      style={{
        "--grid-size": `${squareSize}px`,
        "--grid-offset": `-${squareSize}px`,
        "--grid-color": borderColor,
        "--grid-duration": `${duration.toFixed(2)}s`,
      } as CSSProperties}
    >
      <div className={styles.glow} />
      {showGrid && <div className={styles.grid} />}
      <div className={styles.grain} />
      {vignette && <div className={styles.vignette} />}
    </div>
  );
}
