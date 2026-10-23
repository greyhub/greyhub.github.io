import { useMemo } from 'react'
import * as THREE from 'three'

export const RAIL_Z = -2.4

function contactShadowTexture() {
  const c = document.createElement('canvas')
  c.width = c.height = 128
  const ctx = c.getContext('2d')!
  const g = ctx.createRadialGradient(64, 64, 0, 64, 64, 64)
  g.addColorStop(0, 'rgba(0,0,0,0.85)')
  g.addColorStop(0.45, 'rgba(0,0,0,0.45)')
  g.addColorStop(1, 'rgba(0,0,0,0)')
  ctx.fillStyle = g
  ctx.fillRect(0, 0, 128, 128)
  return new THREE.CanvasTexture(c)
}

// Polished dark stone: warm pool under the downlight, city glow and LED strip reflected near the glass,
// faint vertical light streaks like a wet-look reflection of the skyline.
function floorMaterial() {
  return new THREE.ShaderMaterial({
    uniforms: { uRail: { value: RAIL_Z }, uFig: { value: new THREE.Vector2(0.05, -0.95) } },
    vertexShader: /* glsl */ `
      varying vec3 vWorld;
      void main(){ vec4 wp = modelMatrix * vec4(position,1.0); vWorld = wp.xyz; gl_Position = projectionMatrix * viewMatrix * wp; }
    `,
    fragmentShader: /* glsl */ `
      uniform float uRail; uniform vec2 uFig;
      varying vec3 vWorld;
      float hash(float x){ return fract(sin(x * 91.7) * 43758.5453); }
      void main(){
        vec3 col = vec3(0.010, 0.012, 0.017);
        float dz = max(vWorld.z - uRail, 0.0);
        vec2 d = vWorld.xz - uFig;
        // warm pool from the canopy downlight
        col += vec3(1.0, 0.80, 0.58) * 0.075 * exp(-dot(d, d) / 1.6);
        // city glow reflected close to the glass
        col += vec3(0.10, 0.16, 0.28) * 0.2 * exp(-dz * 0.6);
        // LED strip reflection
        col += vec3(1.0, 0.72, 0.42) * 0.35 * exp(-dz * 5.0);
        // skyline light streaks
        float lane = floor(vWorld.x * 7.0);
        float streak = step(0.82, hash(lane)) * hash(lane + 3.0);
        col += mix(vec3(1.0, 0.75, 0.45), vec3(0.55, 0.7, 1.0), step(0.5, hash(lane + 7.0))) * streak * 0.035 * exp(-dz * 0.8);
        // stone slab joints
        float jx = abs(fract(vWorld.x / 3.0 + 0.5) - 0.5) * 3.0;
        float jz = abs(fract((vWorld.z - uRail) / 1.5) - 0.5) * 1.5;
        col *= mix(0.55, 1.0, smoothstep(0.004, 0.012, min(jx, jz)));
        gl_FragColor = vec4(col, 1.0);
      }
    `,
  })
}

/** Elevated terrace: polished stone floor, frameless glass balustrade, brushed steel rail, warm LED strip. */
export function Terrace() {
  const shadow = useMemo(() => contactShadowTexture(), [])
  const floor = useMemo(() => floorMaterial(), [])
  const posts = [-5.4, -3.6, -1.8, 0, 1.8, 3.6, 5.4]

  return (
    <group>
      {/* floor: unlit shader so the low key light can't glare across it */}
      <mesh rotation-x={-Math.PI / 2} position={[0, 0, 2]} material={floor}>
        <planeGeometry args={[16, 9]} />
      </mesh>
      {/* slab edge facing the city */}
      <mesh position={[0, -0.32, RAIL_Z - 0.12]}>
        <boxGeometry args={[16, 0.64, 0.24]} />
        <meshStandardMaterial color="#0d1118" roughness={0.6} metalness={0.4} />
      </mesh>
      {/* warm LED strip at the base of the glass */}
      <mesh position={[0, 0.03, RAIL_Z + 0.09]}>
        <boxGeometry args={[16, 0.02, 0.03]} />
        <meshBasicMaterial color="#ffc987" toneMapped={false} />
      </mesh>
      {/* glass balustrade */}
      <mesh position={[0, 0.55, RAIL_Z]}>
        <boxGeometry args={[16, 1.1, 0.02]} />
        <meshPhysicalMaterial
          color="#9fb6d6"
          transparent
          opacity={0.1}
          roughness={0.05}
          metalness={0.1}
          envMapIntensity={1.6}
          depthWrite={false}
        />
      </mesh>
      {/* steel posts and handrail */}
      {posts.map((x) => (
        <mesh key={x} position={[x, 0.55, RAIL_Z + 0.03]}>
          <boxGeometry args={[0.035, 1.1, 0.05]} />
          <meshStandardMaterial color="#6c7686" metalness={0.9} roughness={0.32} />
        </mesh>
      ))}
      <mesh position={[0, 1.11, RAIL_Z]} rotation-z={Math.PI / 2}>
        <cylinderGeometry args={[0.028, 0.028, 16, 16]} />
        <meshStandardMaterial color="#9aa5b6" metalness={1} roughness={0.22} />
      </mesh>
      {/* contact shadow under the figure */}
      <mesh rotation-x={-Math.PI / 2} position={[0.02, 0.004, -0.92]}>
        <planeGeometry args={[0.9, 0.7]} />
        <meshBasicMaterial map={shadow} transparent depthWrite={false} />
      </mesh>
    </group>
  )
}
