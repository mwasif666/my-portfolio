import type { CSSProperties } from "react";
import "./noise-dark-blue-gradient-with-squares.css";

type Direction = "right" | "left" | "up" | "down" | "diagonal";

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
  const duration = Math.max(10, 18 / Math.max(speed, 0.1));

  return (
    <div
      aria-hidden="true"
      className={`motionGrid motionGrid--${direction} ${className}`}
      style={{
        "--grid-size": `${squareSize}px`,
        "--grid-offset": `-${squareSize}px`,
        "--grid-color": borderColor,
        "--grid-duration": `${duration}s`,
      } as CSSProperties}
    >
      <div className="motionGrid__glow" />
      {showGrid && <div className="motionGrid__grid" />}
      <div className="motionGrid__grain" />
      {vignette && <div className="motionGrid__vignette" />}
    </div>
  );
}
