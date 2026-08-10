import { useEffect, useRef, useState } from "react";
import styles from "./AboutGlobe.module.css";

const D3_SRC = "https://cdn.jsdelivr.net/npm/d3@7.9.0/dist/d3.min.js";
const LAND_SRC =
  "https://raw.githubusercontent.com/martynafford/natural-earth-geojson/refs/heads/master/110m/physical/ne_110m_land.json";

let d3Loader;
let landLoader;
let dotCache;

function loadD3() {
  if (window.d3) return Promise.resolve(window.d3);
  if (d3Loader) return d3Loader;

  d3Loader = new Promise((resolve, reject) => {
    const existing = document.querySelector(`script[src="${D3_SRC}"]`);
    const script = existing || document.createElement("script");

    const handleLoad = () => {
      if (window.d3) resolve(window.d3);
      else reject(new Error("D3 failed to initialize"));
    };

    script.addEventListener("load", handleLoad, { once: true });
    script.addEventListener("error", () => reject(new Error("D3 failed to load")), {
      once: true,
    });

    if (!existing) {
      script.src = D3_SRC;
      script.async = true;
      script.crossOrigin = "anonymous";
      document.head.appendChild(script);
    }
  });

  return d3Loader;
}

function loadLand() {
  if (!landLoader) {
    landLoader = fetch(LAND_SRC).then((response) => {
      if (!response.ok) throw new Error("Failed to load land data");
      return response.json();
    });
  }
  return landLoader;
}

function pointInPolygon([x, y], polygon) {
  let inside = false;

  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const [xi, yi] = polygon[i];
    const [xj, yj] = polygon[j];
    const intersects =
      yi > y !== yj > y &&
      x < ((xj - xi) * (y - yi)) / (yj - yi || Number.EPSILON) + xi;

    if (intersects) inside = !inside;
  }

  return inside;
}

function pointInFeature(point, feature) {
  const geometry = feature.geometry;
  if (!geometry) return false;

  if (geometry.type === "Polygon") {
    const [outer, ...holes] = geometry.coordinates;
    return pointInPolygon(point, outer) && !holes.some((hole) => pointInPolygon(point, hole));
  }

  if (geometry.type === "MultiPolygon") {
    return geometry.coordinates.some(([outer, ...holes]) =>
      pointInPolygon(point, outer) && !holes.some((hole) => pointInPolygon(point, hole)),
    );
  }

  return false;
}

function buildLandDots(d3, land) {
  if (dotCache) return dotCache;

  const dots = [];
  const step = 1.45;

  land.features.forEach((feature) => {
    const [[minLng, minLat], [maxLng, maxLat]] = d3.geoBounds(feature);

    for (let lng = minLng; lng <= maxLng; lng += step) {
      for (let lat = minLat; lat <= maxLat; lat += step) {
        if (pointInFeature([lng, lat], feature)) dots.push([lng, lat]);
      }
    }
  });

  dotCache = dots;
  return dots;
}

export default function AboutGlobe() {
  const stageRef = useRef(null);
  const canvasRef = useRef(null);
  const [state, setState] = useState("loading");

  useEffect(() => {
    const stage = stageRef.current;
    const canvas = canvasRef.current;
    if (!stage || !canvas) return undefined;

    let destroyed = false;
    let animationFrame = 0;
    let resizeFrame = 0;
    let dragging = false;
    let pointerStart = null;
    let rotationStart = null;
    let autoRotate = true;
    let inView = true;
    let lastFrame = performance.now();
    let d3;
    let land;
    let dots = [];
    let context;
    let projection;
    let path;
    let graticule;
    let width = 1;
    let height = 1;
    let baseRadius = 1;
    let zoom = 1;
    const rotation = [-18, -28, 0];
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const sizeCanvas = () => {
      const rect = stage.getBoundingClientRect();
      width = Math.max(1, rect.width);
      height = Math.max(1, rect.height);
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      context = canvas.getContext("2d");
      if (!context) return;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);

      baseRadius = Math.min(width * 0.48, height * 0.76);

      if (d3) {
        projection = d3
          .geoOrthographic()
          .scale(baseRadius * zoom)
          .translate([width / 2, height * 0.55])
          .clipAngle(90)
          .precision(0.25)
          .rotate(rotation);
        path = d3.geoPath().projection(projection).context(context);
        graticule = d3.geoGraticule10();
      }
    };

    const draw = () => {
      if (!context || !projection || !path || !land) return;

      context.clearRect(0, 0, width, height);
      const scaleFactor = projection.scale() / baseRadius;
      const [cx, cy] = projection.translate();
      const radius = projection.scale();

      context.save();
      context.beginPath();
      context.arc(cx, cy, radius, 0, Math.PI * 2);
      context.fillStyle = "#050505";
      context.fill();
      context.strokeStyle = "rgba(255,255,255,.9)";
      context.lineWidth = Math.max(0.75, 1.15 * scaleFactor);
      context.stroke();

      context.beginPath();
      path(graticule);
      context.strokeStyle = "rgba(255,255,255,.18)";
      context.lineWidth = Math.max(0.45, 0.7 * scaleFactor);
      context.stroke();

      context.beginPath();
      land.features.forEach((feature) => path(feature));
      context.strokeStyle = "rgba(255,255,255,.92)";
      context.lineWidth = Math.max(0.65, 0.92 * scaleFactor);
      context.stroke();

      const center = [-rotation[0], -rotation[1]];
      const dotRadius = Math.max(0.52, 0.88 * scaleFactor);
      context.fillStyle = "rgba(190,190,190,.72)";

      dots.forEach(([lng, lat]) => {
        if (d3.geoDistance([lng, lat], center) > Math.PI / 2) return;
        const projected = projection([lng, lat]);
        if (!projected) return;

        context.beginPath();
        context.arc(projected[0], projected[1], dotRadius, 0, Math.PI * 2);
        context.fill();
      });

      context.restore();
    };

    const animate = (now) => {
      if (destroyed) return;

      const delta = Math.min(40, now - lastFrame);
      lastFrame = now;

      if (inView && autoRotate && !dragging && !reduceMotion) {
        rotation[0] += delta * 0.0065;
        projection?.rotate(rotation);
        draw();
      }

      animationFrame = requestAnimationFrame(animate);
    };

    const onPointerDown = (event) => {
      dragging = true;
      autoRotate = false;
      pointerStart = [event.clientX, event.clientY];
      rotationStart = [...rotation];
      canvas.setPointerCapture?.(event.pointerId);
    };

    const onPointerMove = (event) => {
      if (!dragging || !pointerStart || !rotationStart || !projection) return;

      const dx = event.clientX - pointerStart[0];
      const dy = event.clientY - pointerStart[1];
      rotation[0] = rotationStart[0] + dx * 0.28;
      rotation[1] = Math.max(-82, Math.min(82, rotationStart[1] - dy * 0.28));
      projection.rotate(rotation);
      draw();
    };

    const endPointer = (event) => {
      if (!dragging) return;
      dragging = false;
      pointerStart = null;
      rotationStart = null;
      canvas.releasePointerCapture?.(event.pointerId);
      window.setTimeout(() => {
        if (!destroyed) autoRotate = true;
      }, 700);
    };

    const onWheel = (event) => {
      if (!projection) return;
      event.preventDefault();
      zoom = Math.max(0.78, Math.min(1.65, zoom * (event.deltaY > 0 ? 0.94 : 1.06)));
      projection.scale(baseRadius * zoom);
      draw();
    };

    const resizeObserver = new ResizeObserver(() => {
      cancelAnimationFrame(resizeFrame);
      resizeFrame = requestAnimationFrame(() => {
        sizeCanvas();
        draw();
      });
    });

    const visibilityObserver = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting;
        if (inView) draw();
      },
      { rootMargin: "120px", threshold: 0.02 },
    );

    async function init() {
      try {
        [d3, land] = await Promise.all([loadD3(), loadLand()]);
        if (destroyed) return;

        dots = buildLandDots(d3, land);
        sizeCanvas();
        draw();
        setState("ready");
        animationFrame = requestAnimationFrame(animate);
      } catch {
        if (!destroyed) setState("error");
      }
    }

    canvas.addEventListener("pointerdown", onPointerDown);
    canvas.addEventListener("pointermove", onPointerMove);
    canvas.addEventListener("pointerup", endPointer);
    canvas.addEventListener("pointercancel", endPointer);
    canvas.addEventListener("wheel", onWheel, { passive: false });
    resizeObserver.observe(stage);
    visibilityObserver.observe(stage);
    init();

    return () => {
      destroyed = true;
      cancelAnimationFrame(animationFrame);
      cancelAnimationFrame(resizeFrame);
      resizeObserver.disconnect();
      visibilityObserver.disconnect();
      canvas.removeEventListener("pointerdown", onPointerDown);
      canvas.removeEventListener("pointermove", onPointerMove);
      canvas.removeEventListener("pointerup", endPointer);
      canvas.removeEventListener("pointercancel", endPointer);
      canvas.removeEventListener("wheel", onWheel);
    };
  }, []);

  return (
    <div ref={stageRef} className={styles.stage} aria-label="Interactive rotating world globe">
      <canvas ref={canvasRef} className={styles.canvas} />
      {state === "loading" && <span className={styles.loading}>Loading globe</span>}
      {state === "error" && <span className={styles.error}>Globe unavailable</span>}
      {state === "ready" && <span className={styles.hint}>Drag to rotate · Scroll to zoom</span>}
    </div>
  );
}
