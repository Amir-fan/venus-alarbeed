'use client';

import { useEffect, useRef } from 'react';

const VERT = `attribute vec2 a_position;
void main() {
  gl_Position = vec4(a_position, 0.0, 1.0);
}`;

const FRAG = `#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif

uniform vec3 u_colors[8];
uniform vec4 u_scene;
uniform vec4 u_shape;
uniform vec4 u_surface;
uniform vec4 u_finish;
uniform vec4 u_transform;
uniform vec4 u_space;
uniform vec4 u_cursor;

#define u_resolution u_scene.xy
#define u_time u_scene.z
#define u_colorCount u_scene.w
#define u_scale u_shape.x
#define u_intensity u_shape.y
#define u_paramA u_shape.z
#define u_warp u_shape.w
#define u_detail u_surface.x
#define u_contrast u_surface.y
#define u_brightness u_surface.z
#define u_saturation u_surface.w
#define u_hue u_finish.x
#define u_vignette u_finish.y
#define u_blur u_finish.z
#define u_grain u_finish.w
#ifdef GL_FRAGMENT_PRECISION_HIGH
#define u_seed u_transform.x
#else
#define u_seed mod(u_transform.x, 31.0)
#endif
#define u_rotate u_transform.y
#define u_drift u_transform.z
#define u_oklab u_transform.w
#define u_offset u_space.xy
#define u_mouse u_space.zw
#define u_cursorPresence u_cursor.x
#define u_cursorEffect u_cursor.y
#define u_cursorStrength u_cursor.z
#define u_cursorRadius u_cursor.w

float hash21(vec2 p) {
#ifndef GL_FRAGMENT_PRECISION_HIGH
  p = mod(p, 31.0);
#endif
  p = fract(p * vec2(234.34, 435.345));
  p += dot(p, p + 34.23);
  return fract(p.x * p.y);
}

float grainHash(vec2 p) {
  vec3 p3 = fract(vec3(p.xyx) * 0.1031);
  p3 += dot(p3, p3.yzx + 33.33);
  return fract((p3.x + p3.y) * p3.z);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(hash21(i), hash21(i + vec2(1.0, 0.0)), u.x),
    mix(hash21(i + vec2(0.0, 1.0)), hash21(i + vec2(1.0, 1.0)), u.x),
    u.y);
}

float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  for (int i = 0; i < 5; i++) {
    v += a * noise(p);
    p = p * 2.03 + vec2(17.0, 9.2);
    a *= 0.5;
  }
  return v;
}

vec3 mixColour(vec3 a, vec3 b, float t) {
  return mix(a, b, t);
}

vec3 palette(float x) {
  float n = max(u_colorCount - 1.0, 1.0);
  float f = clamp(x, 0.0, 1.0) * n;
  vec3 col = u_colors[0];
  for (int i = 0; i < 7; i++) {
    if (float(i) < n)
      col = mixColour(col, u_colors[i + 1],
        smoothstep(0.0, 1.0, clamp(f - float(i), 0.0, 1.0)));
  }
  return col;
}

vec3 shade(vec2 uv, vec2 p, float t) {
  vec2 origin = vec2(0.0, -0.58);
  vec2 q = p - origin;
  float angle = atan(q.y, q.x);
  float radius = length(q);
  float density = 5.0 + u_intensity * 18.0;
  float n = fbm(vec2(angle * density * 0.16 + u_seed, radius * 1.7 - t * 0.08));
  float rays = pow(max(0.0, sin(angle * density + n * 5.0 + t * 0.16)), 5.0);
  rays *= exp(-radius * 1.15) * (1.0 - smoothstep(0.05, 1.1, radius));
  float bloom = exp(-radius * (9.0 - u_paramA * 6.0));
  float v = clamp(rays * (0.8 + u_intensity) + bloom * (0.25 + u_paramA), 0.0, 1.0);
  return palette(v);
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;
  vec2 p = (gl_FragCoord.xy - 0.5 * u_resolution.xy)
    / min(u_resolution.x, u_resolution.y);
  uv = p * min(u_resolution.x, u_resolution.y) / u_resolution.xy + 0.5;
  p *= u_scale;
  if (abs(u_rotate) > 0.0001) {
    float cr = cos(u_rotate), sr = sin(u_rotate);
    p = mat2(cr, -sr, sr, cr) * p;
  }
  p += u_offset;
  if (u_warp > 0.0) {
    p += u_warp * (vec2(
      fbm(p * u_detail + u_seed),
      fbm(p * u_detail + vec2(5.2, 1.3))) - 0.5);
  }
  vec3 col = shade(uv, p, u_time);
  if (abs(u_contrast - 1.0) > 0.0001)
    col = (col - 0.5) * u_contrast + 0.5;
  if (abs(u_saturation - 1.0) > 0.0001) {
    float luma = dot(col, vec3(0.299, 0.587, 0.114));
    col = mix(vec3(luma), col, u_saturation);
  }
  if (abs(u_brightness) > 0.0001)
    col += u_brightness;
  if (u_vignette > 0.0001) {
    float vd = length(uv - 0.5) * 1.41421356;
    col *= 1.0 - u_vignette * smoothstep(0.35, 1.0, vd);
  }
  if (u_grain > 0.0001)
    col += (grainHash(gl_FragCoord.xy + vec2(u_seed * 17.0, u_seed * 31.0)) - 0.5) * u_grain;
  gl_FragColor = vec4(clamp(col, 0.0, 1.0), 1.0);
}`;

// Tuned for Venus palette: pale blue-mist base with very restrained champagne/ivory rays
// Keeps the feel architectural — "daylight entering," not sci-fi
const UNIFORMS = {
  // Colors: mist → ivory → pale warm → mist (very restrained)
  colors: [
    [0.863, 0.875, 0.890],  // --mist base
    [0.965, 0.957, 0.941],  // --ivory
    [0.878, 0.847, 0.792],  // champagne warm
    [0.831, 0.851, 0.871],  // slightly cooler mist
    [0.863, 0.875, 0.890],
    [0.863, 0.875, 0.890],
    [0.863, 0.875, 0.890],
    [0.863, 0.875, 0.890],
  ] as [number, number, number][],
  colorCount: 4,
  scale: 1.2,
  intensity: 0.28,    // very low — subtle rays
  paramA: 0.40,
  warp: 0.12,
  detail: 2.0,
  contrast: 1.0,
  brightness: 0.02,
  saturation: 0.7,   // slightly desaturated for restraint
  hue: 0.0,
  vignette: 0.0,
  blur: 0.0,
  grain: 0.012,      // very subtle grain for texture
  seed: 3.5,
  rotate: 0.42,
  offsetX: 0.0,
  offsetY: 0.12,
  drift: 0.0,
  oklab: 0.0,
  timeScale: 0.18,   // very slow movement
};

const pendingContextReleases = new WeakMap<HTMLCanvasElement, number>();

interface Props {
  className?: string;
  style?: React.CSSProperties;
}

export default function GodRaysBackground({ className, style }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const pending = pendingContextReleases.get(canvas);
    if (pending !== undefined) window.clearTimeout(pending);
    pendingContextReleases.delete(canvas);

    const gl = canvas.getContext('webgl', { antialias: false });
    if (!gl) return;

    const compile = (type: number, src: string) => {
      const s = gl.createShader(type)!;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      return s;
    };

    const program = gl.createProgram()!;
    gl.attachShader(program, compile(gl.VERTEX_SHADER, VERT));
    gl.attachShader(program, compile(gl.FRAGMENT_SHADER, FRAG));
    gl.linkProgram(program);
    gl.useProgram(program);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(program, 'a_position');
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const uni = {
      colors: gl.getUniformLocation(program, 'u_colors'),
      scene: gl.getUniformLocation(program, 'u_scene'),
      shape: gl.getUniformLocation(program, 'u_shape'),
      surface: gl.getUniformLocation(program, 'u_surface'),
      finish: gl.getUniformLocation(program, 'u_finish'),
      transform: gl.getUniformLocation(program, 'u_transform'),
      space: gl.getUniformLocation(program, 'u_space'),
      cursor: gl.getUniformLocation(program, 'u_cursor'),
    };

    gl.uniform3fv(uni.colors, new Float32Array(UNIFORMS.colors.flat()));
    gl.uniform4f(uni.shape, UNIFORMS.scale, UNIFORMS.intensity, UNIFORMS.paramA, UNIFORMS.warp);
    gl.uniform4f(uni.surface, UNIFORMS.detail, UNIFORMS.contrast, UNIFORMS.brightness, UNIFORMS.saturation);
    gl.uniform4f(uni.finish, UNIFORMS.hue, UNIFORMS.vignette, UNIFORMS.blur, UNIFORMS.grain);
    gl.uniform4f(uni.transform, UNIFORMS.seed, UNIFORMS.rotate, UNIFORMS.drift, UNIFORMS.oklab);
    gl.uniform4f(uni.space, UNIFORMS.offsetX, UNIFORMS.offsetY, 0, 0);
    gl.uniform4f(uni.cursor, 0, 0, 0, 0);

    let raf = 0;
    let lastNow: number | null = null;
    let disposed = false;
    let visible = document.visibilityState === 'visible';
    let inView = true;
    const start = performance.now();

    let bounds = canvas.getBoundingClientRect();

    const resizeCanvas = () => {
      bounds = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      // Cap at 400k pixels for performance
      const rawW = Math.max(1, Math.round(bounds.width * dpr));
      const rawH = Math.max(1, Math.round(bounds.height * dpr));
      const scale = Math.min(1, Math.sqrt(400_000 / Math.max(1, rawW * rawH)));
      const w = Math.max(1, Math.round(rawW * scale));
      const h = Math.max(1, Math.round(rawH * scale));
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
        gl.viewport(0, 0, w, h);
      }
    };

    const requestRender = () => {
      if (!disposed && visible && inView && raf === 0) {
        raf = requestAnimationFrame(render);
      }
    };

    const render = (now: number) => {
      raf = 0;
      if (disposed || !visible || !inView) return;
      lastNow = now;
      resizeCanvas();
      gl.uniform4f(uni.scene, canvas.width, canvas.height, ((now - start) / 1000) * UNIFORMS.timeScale, UNIFORMS.colorCount);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      requestRender();
    };

    const ro = new ResizeObserver(() => { resizeCanvas(); requestRender(); });
    ro.observe(canvas);

    const io = new IntersectionObserver(([e]) => {
      inView = e?.isIntersecting ?? true;
      if (inView) requestRender();
      else { cancelAnimationFrame(raf); raf = 0; lastNow = null; }
    });
    io.observe(canvas);

    const onVisChange = () => {
      visible = document.visibilityState === 'visible';
      if (visible) requestRender();
      else { cancelAnimationFrame(raf); raf = 0; lastNow = null; }
    };
    document.addEventListener('visibilitychange', onVisChange);

    requestRender();

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      document.removeEventListener('visibilitychange', onVisChange);
      gl.deleteBuffer(buf);
      gl.deleteProgram(program);
      const t = window.setTimeout(() => {
        if (pendingContextReleases.get(canvas) !== t) return;
        pendingContextReleases.delete(canvas);
        gl.getExtension('WEBGL_lose_context')?.loseContext();
        canvas.width = 1;
        canvas.height = 1;
      }, 0);
      pendingContextReleases.set(canvas, t);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ display: 'block', width: '100%', height: '100%', ...style }}
    />
  );
}
