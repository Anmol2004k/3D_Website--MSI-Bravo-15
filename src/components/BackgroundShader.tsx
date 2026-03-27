import React, { useEffect, useMemo, useRef } from 'react';
import { Canvas, useFrame, type ThreeElements } from '@react-three/fiber';
import * as THREE from 'three';

const vertexShader = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position.xy, 0.0, 1.0);
}
`;

// Low-octave, warpy noise for "liquid/smoke" at low GPU cost.
const fragmentShader = `
precision highp float;

uniform float uTime;
uniform vec2 uMouse;        // 0..1
uniform vec2 uResolution;   // px

varying vec2 vUv;

// Hash-based value noise (cheap).
float hash21(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  float a = hash21(i);
  float b = hash21(i + vec2(1.0, 0.0));
  float c = hash21(i + vec2(0.0, 1.0));
  float d = hash21(i + vec2(1.0, 1.0));
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
}

float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.55;
  // 3 octaves for performance.
  v += a * noise(p); p *= 2.02; a *= 0.55;
  v += a * noise(p); p *= 2.01; a *= 0.55;
  v += a * noise(p);
  return v;
}

void main() {
  vec2 uv = vUv;
  vec2 aspect = vec2(uResolution.x / max(uResolution.y, 1.0), 1.0);
  vec2 p = (uv - 0.5) * aspect;

  // Subtle mouse parallax.
  vec2 m = (uMouse - 0.5) * 0.18;

  float t = uTime * 0.06;
  float n1 = fbm(p * 2.0 + vec2(t, -t) + m);
  float n2 = fbm(p * 3.2 + vec2(-t * 0.7, t * 0.9) - m);
  float n = mix(n1, n2, 0.55);

  // Warp for liquid/smoke feel.
  vec2 w = vec2(
    fbm(p * 2.0 + n + t),
    fbm(p * 2.0 - n - t)
  );
  float smoke = fbm(p * 2.4 + w * 1.15 + m * 0.6);
  smoke = smoothstep(0.15, 0.95, smoke);

  vec3 base = vec3(0.02, 0.02, 0.025);
  vec3 deep = vec3(0.005, 0.005, 0.008);
  vec3 col = mix(deep, base, smoke);

  // MSI accent glows: red + green, very subtle.
  float glowBand = pow(clamp(n, 0.0, 1.0), 3.0);
  vec3 redGlow = vec3(0.90, 0.05, 0.10) * glowBand * 0.35;
  vec3 greenGlow = vec3(0.00, 1.00, 0.25) * (1.0 - glowBand) * 0.18;

  // Vignette
  float r = length(p);
  float vig = smoothstep(1.05, 0.15, r);

  col += (redGlow + greenGlow) * vig;
  col *= 0.9 + 0.1 * vig;

  gl_FragColor = vec4(col, 1.0);
}
`;

function FullscreenPlane(props: ThreeElements['mesh']) {
  const materialRef = useRef<THREE.ShaderMaterial | null>(null);
  const mouseTarget = useRef(new THREE.Vector2(0.5, 0.5));
  const mouse = useRef(new THREE.Vector2(0.5, 0.5));

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
      uResolution: { value: new THREE.Vector2(1, 1) },
    }),
    []
  );

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      mouseTarget.current.set(e.clientX / window.innerWidth, 1 - e.clientY / window.innerHeight);
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, []);

  useEffect(() => {
    const onResize = () => {
      uniforms.uResolution.value.set(window.innerWidth, window.innerHeight);
    };
    onResize();
    window.addEventListener('resize', onResize, { passive: true });
    return () => window.removeEventListener('resize', onResize);
  }, [uniforms]);

  useFrame((_, delta) => {
    uniforms.uTime.value += delta;

    // Premium-feel mouse smoothing.
    mouse.current.lerp(mouseTarget.current, 0.06);
    uniforms.uMouse.value.copy(mouse.current);

    if (materialRef.current) materialRef.current.uniformsNeedUpdate = false;
  });

  return (
    <mesh {...props}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ref={(r: any) => (materialRef.current = r)}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        depthWrite={false}
        depthTest={false}
      />
    </mesh>
  );
}

export function BackgroundShader() {
  return (
    <div className="fixed inset-0 -z-10 pointer-events-none">
      <Canvas
        dpr={1}
        gl={{ antialias: false, alpha: true, powerPreference: 'low-power' }}
        camera={{ position: [0, 0, 1], fov: 50 }}
      >
        <FullscreenPlane />
      </Canvas>
    </div>
  );
}

