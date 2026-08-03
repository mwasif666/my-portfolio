"use client";

import React, { useEffect, useRef } from "react";

type Offset = { x: number; y: number };
type Direction = "right" | "left" | "up" | "down" | "diagonal";

const setHiDPICanvas = (
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D,
) => {
  const parent = canvas.parentElement;
  const width = (parent?.clientWidth ?? window.innerWidth) | 0;
  const height = (parent?.clientHeight ?? window.innerHeight) | 0;
  const dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));

  canvas.width = Math.floor(width * dpr);
  canvas.height = Math.floor(height * dpr);
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
};

const originFromOffset = (offset: Offset, cell: number) => ({
  x: -(((offset.x % cell) + cell) % cell),
  y: -(((offset.y % cell) + cell) % cell),
});

const Noise: React.FC<{ refresh?: number; alpha?: number }> = ({
  refresh = 2,
  alpha = 18,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let frame = 0;
    let animationFrame = 0;
    const size = 1024;

    const resize = () => {
      canvas.width = size;
      canvas.height = size;
      canvas.style.width = "100%";
      canvas.style.height = "100%";
    };

    const draw = () => {
      const image = ctx.createImageData(size, size);
      const data = image.data;

      for (let index = 0; index < data.length; index += 4) {
        const value = Math.random() * 255;
        data[index] = value;
        data[index + 1] = value;
        data[index + 2] = value;
        data[index + 3] = alpha;
      }

      ctx.putImageData(image, 0, 0);
    };

    const loop = () => {
      if (frame % refresh === 0) draw();
      frame += 1;
      animationFrame = requestAnimationFrame(loop);
    };

    window.addEventListener("resize", resize);
    resize();
    loop();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrame);
    };
  }, [refresh, alpha]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 h-full w-full"
      style={{ imageRendering: "pixelated" }}
    />
  );
};

interface GridProps {
  squareSize: number;
  borderColor: string;
  vignette?: boolean;
  gridOffsetRef: React.MutableRefObject<Offset>;
}

const MovingGrid: React.FC<GridProps> = ({
  squareSize,
  borderColor,
  vignette = true,
  gridOffsetRef,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationFrame = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const draw = () => {
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      ctx.clearRect(0, 0, width, height);

      const origin = originFromOffset(gridOffsetRef.current, squareSize);
      ctx.lineWidth = 1;
      ctx.strokeStyle = borderColor;

      for (let x = origin.x; x < width + squareSize; x += squareSize) {
        ctx.beginPath();
        ctx.moveTo(x + 0.5, 0);
        ctx.lineTo(x + 0.5, height);
        ctx.stroke();
      }

      for (let y = origin.y; y < height + squareSize; y += squareSize) {
        ctx.beginPath();
        ctx.moveTo(0, y + 0.5);
        ctx.lineTo(width, y + 0.5);
        ctx.stroke();
      }

      if (vignette) {
        const gradient = ctx.createRadialGradient(
          width / 2,
          height / 2,
          0,
          width / 2,
          height / 2,
          Math.sqrt(width * width + height * height) / 2,
        );
        gradient.addColorStop(0, "rgba(0,0,0,0)");
        gradient.addColorStop(1, "#060010");
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);
      }

      animationFrame.current = requestAnimationFrame(draw);
    };

    const resize = () => setHiDPICanvas(canvas, ctx);

    resize();
    animationFrame.current = requestAnimationFrame(draw);
    window.addEventListener("resize", resize);

    return () => {
      window.removeEventListener("resize", resize);
      if (animationFrame.current) cancelAnimationFrame(animationFrame.current);
    };
  }, [squareSize, borderColor, vignette, gridOffsetRef]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none block h-full w-full border-none"
    />
  );
};

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
  const gridOffsetRef = useRef<Offset>({ x: 0, y: 0 });
  const animationFrame = useRef<number | null>(null);

  useEffect(() => {
    const tick = () => {
      const velocity = Math.max(speed, 0.1);
      const size = squareSize;

      switch (direction) {
        case "right":
          gridOffsetRef.current.x =
            (gridOffsetRef.current.x - velocity + size) % size;
          break;
        case "left":
          gridOffsetRef.current.x =
            (gridOffsetRef.current.x + velocity + size) % size;
          break;
        case "up":
          gridOffsetRef.current.y =
            (gridOffsetRef.current.y + velocity + size) % size;
          break;
        case "down":
          gridOffsetRef.current.y =
            (gridOffsetRef.current.y - velocity + size) % size;
          break;
        case "diagonal":
        default:
          gridOffsetRef.current.x =
            (gridOffsetRef.current.x - velocity + size) % size;
          gridOffsetRef.current.y =
            (gridOffsetRef.current.y - velocity + size) % size;
          break;
      }

      animationFrame.current = requestAnimationFrame(tick);
    };

    animationFrame.current = requestAnimationFrame(tick);

    return () => {
      if (animationFrame.current) cancelAnimationFrame(animationFrame.current);
    };
  }, [direction, speed, squareSize]);

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden bg-neutral-950 ${className}`}
    >
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(circle 620px at 50% 200px, rgba(37,99,235,0.35), transparent 70%)",
        }}
      />

      {showGrid && (
        <div className="pointer-events-none absolute inset-0 z-10">
          <MovingGrid
            squareSize={squareSize}
            borderColor={borderColor}
            vignette={vignette}
            gridOffsetRef={gridOffsetRef}
          />
        </div>
      )}

      <div className="pointer-events-none absolute inset-0 z-20">
        <Noise refresh={2} alpha={18} />
      </div>

      <div
        className="pointer-events-none absolute inset-0 z-30"
        style={{
          background:
            "linear-gradient(to bottom, transparent 0%, transparent 55%, rgba(0,0,0,0.6) 100%)",
        }}
      />
    </div>
  );
}
