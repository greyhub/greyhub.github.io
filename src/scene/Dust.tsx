import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { mulberry32 } from './util'

/** Floating motes over the terrace and soft out-of-focus bokeh beyond the glass. */
export function Dust({ animate }: { animate: boolean }) {
  const mat = useRef<THREE.ShaderMaterial>(null!)
  const geometry = useMemo(() => {
    const rnd = mulberry32(42)
    const N = 200
    const pos = new Float32Array(N * 3)
    const meta = new Float32Array(N * 4) // phase, speed, size, warm
    for (let i = 0; i < N; i++) {
      const far = i > 170
      pos.set(
        far
          ? [-16 + rnd() * 26, 0.5 + rnd() * 6, -34 + rnd() * 16]
          : [-5 + rnd() * 9, 0.1 + rnd() * 4.2, -5.5 + rnd() * 8],
        i * 3,
      )
      meta.set([rnd() * 6.28, 0.25 + rnd() * 0.6, far ? 4 + rnd() * 5 : 0.7 + rnd() * 1.3, rnd() < 0.62 ? 1 : 0], i * 4)
    }
    const g = new THREE.BufferGeometry()
    g.setAttribute('position', new THREE.BufferAttribute(pos, 3))
    g.setAttribute('aMeta', new THREE.BufferAttribute(meta, 4))
    return g
  }, [])

  useFrame((_, dt) => {
    if (animate && mat.current) mat.current.uniforms.uTime.value += dt
  })

  return (
    <points geometry={geometry} frustumCulled={false}>
      <shaderMaterial
        ref={mat}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        uniforms={{ uTime: { value: 3 } }}
        vertexShader={/* glsl */ `
          attribute vec4 aMeta; uniform float uTime;
          varying float vWarm; varying float vAlpha; varying float vSoft;
          void main(){
            float ph = aMeta.x, sp = aMeta.y;
            vec3 p = position;
            // slow rise with a looping wrap, plus a lazy sway
            p.y = mod(p.y + uTime * 0.06 * sp, 6.0) + (position.z < -10.0 ? 0.5 : 0.1);
            p.x += sin(uTime * 0.23 * sp + ph) * 0.35;
            p.z += cos(uTime * 0.19 * sp + ph * 1.3) * 0.25;
            vec4 mv = modelViewMatrix * vec4(p, 1.0);
            gl_PointSize = aMeta.z * (60.0 / -mv.z);
            gl_Position = projectionMatrix * mv;
            vWarm = aMeta.w;
            vSoft = step(3.5, aMeta.z);
            // twinkle, and fade near the wrap so motes never pop
            float edge = smoothstep(0.0, 0.6, p.y) * smoothstep(6.6, 5.6, p.y);
            vAlpha = max(0.45 + 0.55 * sin(uTime * 1.3 * sp + ph * 4.0), 0.0) * edge;
          }
        `}
        fragmentShader={/* glsl */ `
          varying float vWarm; varying float vAlpha; varying float vSoft;
          void main(){
            float d = length(gl_PointCoord - 0.5);
            float core = smoothstep(0.5, 0.0, d);
            // bokeh discs: flat body with a brighter rim
            float bokeh = smoothstep(0.5, 0.42, d) * (0.35 + 0.65 * smoothstep(0.25, 0.47, d));
            float a = mix(core * core, bokeh * 0.16, vSoft) * vAlpha;
            vec3 col = mix(vec3(0.62, 0.76, 1.0), vec3(1.0, 0.82, 0.55), vWarm);
            gl_FragColor = vec4(col * a * 1.4, 1.0);
          }
        `}
      />
    </points>
  )
}
