import { useMemo } from 'react'
import * as THREE from 'three'
import { palette } from './util'

// Blue-hour sky dome: deep navy zenith, steel-blue horizon, champagne glow behind the district.
export function Sky() {
  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        side: THREE.BackSide,
        depthWrite: false,
        fog: false,
        uniforms: {
          uTop: { value: palette.skyTop },
          uMid: { value: palette.skyMid },
          uHorizon: { value: palette.horizon },
          uGlow: { value: palette.glow },
          uGlowDir: { value: new THREE.Vector3(-0.2, 0, -1).normalize() },
        },
        vertexShader: /* glsl */ `
          varying vec3 vDir;
          void main(){ vDir = normalize(position); gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); gl_Position.z = gl_Position.w; }
        `,
        fragmentShader: /* glsl */ `
          uniform vec3 uTop, uMid, uHorizon, uGlow, uGlowDir;
          varying vec3 vDir;
          float hash(vec3 p){ return fract(sin(dot(p, vec3(12.9898, 78.233, 37.719))) * 43758.5453); }
          void main(){
            vec3 d = normalize(vDir);
            float y = d.y;
            vec3 col = mix(uHorizon, uMid, smoothstep(-0.02, 0.22, y));
            col = mix(col, uTop, smoothstep(0.18, 0.75, y));
            // horizon glow toward the innovation district
            float az = max(dot(normalize(vec3(d.x, 0.0, d.z)), uGlowDir), 0.0);
            float band = exp(-abs(y - 0.005) * 26.0);
            col += uGlow * band * (0.03 + 0.42 * pow(az, 14.0));
            // faint high cloud streaks
            float streak = smoothstep(0.6, 1.0, sin(d.x * 9.0 + d.z * 3.0 + y * 40.0) * 0.5 + 0.5) * smoothstep(0.05, 0.2, y) * smoothstep(0.5, 0.2, y);
            col += vec3(0.05, 0.07, 0.10) * streak * 0.18;
            // sparse stars, only high up
            vec3 sp = floor(d * 420.0);
            float s = step(0.9975, hash(sp)) * smoothstep(0.25, 0.6, y);
            col += vec3(0.8, 0.85, 1.0) * s * 0.6;
            gl_FragColor = vec4(col, 1.0);
          }
        `,
      }),
    [],
  )
  return (
    <mesh material={material} frustumCulled={false} renderOrder={-1}>
      <sphereGeometry args={[2400, 32, 16]} />
    </mesh>
  )
}
