import { useEffect, useRef } from 'react';
import { reduceMotion } from '../lib/spring';

const BASE = 'https://api.getlayers.ai/storage/v1/object/public/public/assets/lumora-e8b711fc68';

/**
 * Full-bleed before/after "liquid" cursor reveal.
 * Base image (always shown / LCP) = after.jpg; the brush trail paints before.jpg.
 * (Mapping preserved exactly from the original.)
 */
export default function LiquidReveal({
  baseSrc = `${BASE}/hero/after.jpg`,
  revealSrc = `${BASE}/hero/before.jpg`,
  revealTint,
  revealTintOpacity = 0.42,
  revealGridColor,
  positionY = 'center',
  alt = '',
  priority = false,
}) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    if (reduceMotion) return;
    const container = containerRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const brushRadius = 143;
    const decay = 0.016;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const afterImg = new Image();
    afterImg.crossOrigin = 'anonymous';
    afterImg.src = revealSrc;

    const cover = document.createElement('canvas');
    const coverCtx = cover.getContext('2d');
    const brush = document.createElement('canvas');
    const brushCtx = brush.getContext('2d');

    let radius = brushRadius * dpr;
    let diam = Math.ceil(radius * 2);
    let W = 0, H = 0, imgLoaded = false;
    let points = [], last = null, idle = 0, drawing = false, raf;

    function buildCover() {
      if (!imgLoaded || !W || !H) return;
      cover.width = W; cover.height = H;
      const iw = afterImg.naturalWidth, ih = afterImg.naturalHeight;
      const scale = Math.max(W / iw, H / ih);
      const dw = iw * scale, dh = ih * scale;
      coverCtx.clearRect(0, 0, W, H);
      const dx = (W - dw) / 2;
      const dy = positionY === 'top' ? 0 : (H - dh) / 2;
      coverCtx.drawImage(afterImg, dx, dy, dw, dh);
      if (revealTint) {
        coverCtx.save();
        coverCtx.globalCompositeOperation = 'source-atop';
        coverCtx.globalAlpha = revealTintOpacity;
        coverCtx.fillStyle = revealTint;
        coverCtx.fillRect(0, 0, W, H);
        coverCtx.restore();
      }
      if (revealGridColor) {
        const step = 18 * dpr;
        coverCtx.save();
        coverCtx.globalCompositeOperation = 'source-atop';
        coverCtx.strokeStyle = revealGridColor;
        coverCtx.lineWidth = Math.max(1, dpr);
        coverCtx.beginPath();
        for (let x = 0; x <= W; x += step) {
          coverCtx.moveTo(x, 0);
          coverCtx.lineTo(x, H);
        }
        for (let y = 0; y <= H; y += step) {
          coverCtx.moveTo(0, y);
          coverCtx.lineTo(W, y);
        }
        coverCtx.stroke();
        coverCtx.restore();
      }
    }

    function resize() {
      const r = container.getBoundingClientRect();
      W = Math.round(r.width * dpr);
      H = Math.round(r.height * dpr);
      canvas.width = W; canvas.height = H;
      canvas.style.width = r.width + 'px';
      canvas.style.height = r.height + 'px';
      radius = brushRadius * dpr;
      diam = Math.ceil(radius * 2);
      brush.width = diam; brush.height = diam;
      buildCover();
    }

    afterImg.onload = () => { imgLoaded = true; buildCover(); };
    const ro = new ResizeObserver(resize);
    ro.observe(container);
    resize();

    function stamp(x, y) {
      const c = diam / 2;
      brushCtx.clearRect(0, 0, diam, diam);
      brushCtx.globalCompositeOperation = 'source-over';
      const g = brushCtx.createRadialGradient(c, c, 0, c, c, c);
      g.addColorStop(0, 'rgba(255,255,255,1)');
      g.addColorStop(0.55, 'rgba(255,255,255,.82)');
      g.addColorStop(1, 'rgba(255,255,255,0)');
      brushCtx.fillStyle = g;
      brushCtx.fillRect(0, 0, diam, diam);
      brushCtx.globalCompositeOperation = 'source-in';
      brushCtx.drawImage(cover, x - c, y - c, diam, diam, 0, 0, diam, diam);
      ctx.globalCompositeOperation = 'source-over';
      ctx.drawImage(brush, x - c, y - c);
    }

    function onMove(e) {
      if (!W || !H) return;
      const r = canvas.getBoundingClientRect();
      const x = (e.clientX - r.left) * dpr;
      const y = (e.clientY - r.top) * dpr;
      if (x < -radius || x > W + radius || y < -radius || y > H + radius) { last = null; return; }
      if (last) {
        const dx = x - last.x, dy = y - last.y, dist = Math.hypot(dx, dy);
        const step = Math.max(radius * 0.3, 1);
        const n = Math.min(Math.ceil(dist / step), 60);
        for (let i = 1; i <= n; i++) points.push({ x: last.x + dx * (i / n), y: last.y + dy * (i / n) });
      } else {
        points.push({ x, y });
      }
      last = { x, y };
    }
    window.addEventListener('pointermove', onMove);

    function tick() {
      if (W && H) {
        drawing = points.length > 0;
        if (drawing) idle = 0; else idle++;
        if (idle <= 120) {
          const fade = drawing ? decay : Math.min(decay + idle * 0.004, 0.5);
          ctx.globalCompositeOperation = 'destination-out';
          ctx.fillStyle = `rgba(0,0,0,${fade})`;
          ctx.fillRect(0, 0, W, H);
          if (drawing) { for (const p of points) stamp(p.x, p.y); points.length = 0; }
          if (idle === 120) ctx.clearRect(0, 0, W, H);
        } else {
          points.length = 0;
        }
      }
      raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('pointermove', onMove);
      ro.disconnect();
    };
  }, [revealSrc, revealTint, revealTintOpacity, revealGridColor, positionY]);

  return (
    <div className="liquid" ref={containerRef}>
      <img
        src={baseSrc}
        alt={alt}
        fetchPriority={priority ? 'high' : 'auto'}
        draggable="false"
        style={{ objectPosition: positionY === 'top' ? 'center top' : 'center' }}
      />
      <canvas ref={canvasRef} aria-hidden="true" />
    </div>
  );
}
