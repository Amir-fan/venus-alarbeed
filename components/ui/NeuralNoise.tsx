'use client';

import { useEffect, useRef } from 'react';

interface NeuralNoiseProps {
  color?: [number, number, number];
  opacity?: number;
  speed?: number;
  className?: string;
  style?: React.CSSProperties;
}

// Canvas 2D-based neural noise — does NOT use WebGL, safe to use alongside other WebGL components
export function NeuralNoise({
  color = [0.066, 0.109, 0.176], // brand navy
  opacity = 0.7,
  speed = 0.0006,
  className = '',
  style,
}: NeuralNoiseProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const pointer = { x: 0.5, y: 0.5, tx: 0.5, ty: 0.5 };
    let rafId: number;
    let startTime = performance.now();

    // Convert 0-1 RGB to CSS hex
    const r = Math.round(color[0] * 255);
    const g = Math.round(color[1] * 255);
    const b = Math.round(color[2] * 255);

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio, 2);
      canvas.width = canvas.offsetWidth * dpr;
      canvas.height = canvas.offsetHeight * dpr;
    };

    const onPointerMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.tx = (e.clientX - rect.left) / rect.width;
      pointer.ty = (e.clientY - rect.top) / rect.height;
    };

    // Simplex-like smooth noise using sin layering
    const noise = (x: number, y: number, t: number): number => {
      let val = 0;
      let scale = 1;
      let amp = 1;
      let total = 0;
      for (let i = 0; i < 6; i++) {
        val += Math.sin(x * scale * 3.7 + t * 0.7 + i * 1.3) *
               Math.cos(y * scale * 2.9 - t * 0.5 + i * 0.9) * amp;
        total += amp;
        scale *= 1.8;
        amp *= 0.55;
      }
      return val / total;
    };

    const render = () => {
      rafId = requestAnimationFrame(render);
      const now = performance.now();
      const t = (now - startTime) * speed;

      // Smooth pointer
      pointer.x += (pointer.tx - pointer.x) * 0.05;
      pointer.y += (pointer.ty - pointer.y) * 0.05;

      const W = canvas.width;
      const H = canvas.height;

      // Use ImageData for pixel-level control at reduced resolution for performance
      const scale = 0.25; // Render at 25% size, scale up = blurry/soft = intentional
      const w = Math.ceil(W * scale);
      const h = Math.ceil(H * scale);
      const imageData = ctx.createImageData(w, h);
      const data = imageData.data;

      for (let py = 0; py < h; py++) {
        for (let px = 0; px < w; px++) {
          const nx = px / w;
          const ny = py / h;

          // Mouse influence
          const dx = nx - pointer.x;
          const dy = ny - pointer.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const influence = Math.max(0, 1 - dist * 2.5);

          const n = noise(nx, ny, t) + influence * 0.3;
          const intensity = Math.max(0, Math.min(1, (n + 0.5) * 0.9));

          // Edge fade
          const edge = (1 - Math.pow(2 * nx - 1, 2)) * (1 - Math.pow(2 * ny - 1, 2));
          const final = intensity * edge;

          const idx = (py * w + px) * 4;
          data[idx]     = r;
          data[idx + 1] = g;
          data[idx + 2] = b;
          data[idx + 3] = Math.round(final * 220); // alpha channel carries the noise shape
        }
      }

      // Clear and draw scaled up (creates the soft blurry look)
      ctx.clearRect(0, 0, W, H);
      
      // Draw to an offscreen canvas then scale
      const offscreen = document.createElement('canvas');
      offscreen.width = w;
      offscreen.height = h;
      const offCtx = offscreen.getContext('2d')!;
      offCtx.putImageData(imageData, 0, 0);
      
      ctx.save();
      ctx.filter = 'blur(4px)';
      ctx.drawImage(offscreen, 0, 0, W, H);
      ctx.restore();
    };

    resize();
    window.addEventListener('resize', resize);
    canvas.addEventListener('pointermove', onPointerMove);
    render();

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', resize);
      canvas.removeEventListener('pointermove', onPointerMove);
    };
  }, [color, speed]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{
        display: 'block',
        width: '100%',
        height: '100%',
        opacity,
        ...style,
      }}
    />
  );
}
