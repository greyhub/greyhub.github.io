import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { FOG_DENSITY, fogGLSL, mulberry32, palette } from './util'

export const GROUND = -170
const CELL = 40 // city block pitch; gaps between footprints read as streets
const CITY_ROT = -0.16 // avenues recede diagonally for a more cinematic perspective
export const DISTRICT = new THREE.Vector3(-270, GROUND, -720) // innovation district centre (city-local)

type Building = { x: number; z: number; w: number; d: number; h: number; base: number; style: number; seed: number }

function generate() {
  const rnd = mulberry32(20261022)
  const list: Building[] = []
  const occupied = new Set<string>()
  const key = (i: number, j: number) => `${i}:${j}`

  // Landmark tower: stacked setbacks rising from the district centre.
  const lx = DISTRICT.x, lz = DISTRICT.z
  const tiers = [
    { w: 34, h: 168 }, { w: 27, h: 64 }, { w: 20, h: 42 }, { w: 13, h: 20 },
  ]
  let base = GROUND
  tiers.forEach((t, i) => {
    list.push({ x: lx, z: lz, w: t.w, d: t.w, h: t.h, base, style: 2, seed: 0.37 + i * 0.11 })
    base += t.h
  })
  occupied.add(key(Math.round(lx / CELL), Math.round(lz / CELL)))

  for (let i = -62; i <= 48; i++) {
    for (let j = -52; j <= -3; j++) {
      if (occupied.has(key(i, j))) continue
      const cx = i * CELL, cz = j * CELL
      const dist = Math.hypot(cx - lx, (cz - lz) * 1.25)
      const z = -cz
      // Thin out the grid with distance and leave a few plazas / avenues empty.
      if (z < 110) continue
      if (i % 6 === 0 && rnd() < 0.85) continue // broad avenues
      if (j % 5 === 0 && rnd() < 0.6) continue // cross boulevards
      const spread = Math.abs(cx) / (cx < 0 ? 420 + z * 1.6 : 260 + z * 1.2)
      if (spread > 1) continue
      if (rnd() < 0.22 + Math.min(z / 4000, 0.25)) continue

      const district = Math.exp(-(dist * dist) / (2 * 170 * 170))
      const near = z < 320
      let h: number
      if (near) h = 18 + rnd() * 60 + rnd() * rnd() * 50
      else h = 30 + rnd() * 75 + rnd() * rnd() * 70 + district * (90 + rnd() * 110)
      if (!near && rnd() < 0.05) h += 60 // occasional tall outlier
      const footprint = 16 + rnd() * 14 + district * 6
      const sub = rnd() < 0.35 && footprint > 20
      const style = rnd() < 0.42 ? 1 : 0 // 1 = glass curtain wall, 0 = warm office grid
      const jitterX = (rnd() - 0.5) * 4, jitterZ = (rnd() - 0.5) * 4
      if (sub) {
        // two slimmer towers sharing a block
        const w2 = footprint * 0.48
        list.push({ x: cx - w2 * 0.55 + jitterX, z: cz + jitterZ, w: w2, d: footprint, h, base: GROUND, style, seed: rnd() })
        list.push({ x: cx + w2 * 0.55 + jitterX, z: cz + jitterZ, w: w2, d: footprint * 0.8, h: h * (0.55 + rnd() * 0.4), base: GROUND, style: 1 - style, seed: rnd() })
      } else {
        list.push({ x: cx + jitterX, z: cz + jitterZ, w: footprint, d: footprint * (0.75 + rnd() * 0.4), h, base: GROUND, style, seed: rnd() })
        // setback crown on taller towers
        if (h > 130 && rnd() < 0.6) {
          list.push({ x: cx + jitterX, z: cz + jitterZ, w: footprint * 0.7, d: footprint * 0.6, h: 12 + rnd() * 30, base: GROUND + h, style, seed: rnd() })
        }
      }
    }
  }
  return list
}

const buildingVert = /* glsl */ `
  attribute vec4 aData; // style, seed, height, unused
  varying vec3 vWorld;
  varying vec3 vLocal;
  varying vec3 vN;
  varying vec4 vData;
  varying vec3 vSize;
  void main() {
    vec3 size = vec3(length(instanceMatrix[0].xyz), length(instanceMatrix[1].xyz), length(instanceMatrix[2].xyz));
    vSize = size;
    vLocal = (position + vec3(0.5, 0.0, 0.5)) * size;
    vec4 wp = modelMatrix * instanceMatrix * vec4(position, 1.0);
    vWorld = wp.xyz;
    vN = normalize(mat3(modelMatrix) * mat3(instanceMatrix) * normal);
    vData = aData;
    gl_Position = projectionMatrix * viewMatrix * wp;
  }
`

const buildingFrag = /* glsl */ `
  uniform float uTime;
  uniform vec3 uSkyTint;
  varying vec3 vWorld;
  varying vec3 vLocal;
  varying vec3 vN;
  varying vec4 vData;
  varying vec3 vSize;
  ${fogGLSL}
  float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

  void main() {
    vec3 n = normalize(vN);
    float style = vData.x;
    float seed = vData.y;
    float h = vLocal.y;

    vec3 viewDir = normalize(cameraPosition - vWorld);
    float fres = pow(1.0 - max(dot(n, viewDir), 0.0), 3.0);
    float heightT = clamp((vWorld.y + 170.0) / 320.0, 0.0, 1.0);

    // Glass base: dark steel reflecting the blue-hour sky, lighter toward the top.
    vec3 glass = mix(vec3(0.016, 0.026, 0.046), vec3(0.055, 0.085, 0.14), heightT);
    // curtain walls mirror the steel-blue horizon
    glass += uSkyTint * (0.12 + fres * 0.5) * (style > 0.5 && style < 1.5 ? 1.0 : 0.45);

    if (n.y > 0.5) {
      // Roof: dark with a faint rooftop plant glow on some buildings.
      vec3 roof = vec3(0.012, 0.016, 0.024) + vec3(0.06, 0.05, 0.035) * step(0.82, seed);
      gl_FragColor = vec4(applyFog(roof, vWorld), 1.0);
      return;
    }

    bool sideX = abs(n.x) > 0.5;
    float u = sideX ? vLocal.z : vLocal.x;
    float faceId = sideX ? (n.x > 0.0 ? 1.0 : 2.0) : (n.z > 0.0 ? 3.0 : 4.0);

    float floorH = style > 1.5 ? 4.2 : mix(3.6, 4.0, step(0.5, style));
    float colW = style > 1.5 ? 2.2 : (style > 0.5 ? 3.2 : 2.0 + fract(seed * 13.7) * 0.8);
    vec2 g = vec2(u / colW, h / floorH);
    vec2 cell = floor(g);
    vec2 f = fract(g);

    // Window pane mask (office grid has clear spandrels, curtain wall is nearly continuous)
    float mx = style > 0.5 ? 0.06 : 0.14;
    float my = style > 0.5 ? 0.10 : 0.26;
    float pane = step(mx, f.x) * step(f.x, 1.0 - mx) * step(my, f.y) * step(f.y, 0.92);

    // Lighting pattern: whole floors cluster on, with individual variation.
    float floorOn = hash(vec2(cell.y, seed * 91.0 + faceId));
    float r = hash(cell + vec2(seed * 57.0, faceId * 13.0));
    float density = style > 1.5 ? 0.55 : (style > 0.5 ? 0.16 : 0.36);
    float lit = step(1.0 - density, r) * step(0.42, floorOn);
    if (style > 1.5) lit = max(lit, step(0.5, r) * step(0.2, floorOn));

    float tint = hash(cell * 1.7 + seed);
    vec3 warm = mix(vec3(1.00, 0.62, 0.30), vec3(1.00, 0.84, 0.60), tint);
    vec3 cool = vec3(0.62, 0.78, 1.00);
    vec3 winCol = tint > 0.86 ? cool : warm;
    float inten = (style > 1.5 ? 1.9 : 1.05) * (0.35 + 0.8 * hash(cell + 3.1) * hash(cell + 7.7));
    // lobby floors glow brighter
    inten *= 1.0 + 1.2 * step(cell.y, 1.0);

    vec3 detailed = mix(glass, winCol * inten, lit * pane);
    // mullions catch a little light
    detailed += vec3(0.05, 0.07, 0.10) * (1.0 - pane) * fres;

    // Fade window detail into an average when cells get smaller than a pixel (prevents shimmer).
    float px = max(fwidth(g.x), fwidth(g.y));
    float avgLit = density * 0.58 * 0.45;
    vec3 averaged = glass + warm * (style > 1.5 ? 1.6 : 1.0) * avgLit * 0.5;
    vec3 col = mix(detailed, averaged, smoothstep(0.35, 0.9, px));

    // Landmark: vertical champagne light fins on the corners.
    if (style > 1.5) {
      float edge = min(u, (sideX ? vSize.z : vSize.x) - u);
      col += vec3(1.0, 0.80, 0.50) * 2.2 * smoothstep(1.2, 0.0, edge);
    }
    // darker at the base to ground the towers in the haze
    col *= mix(0.55, 1.0, smoothstep(0.0, 30.0, vWorld.y + 170.0));

    gl_FragColor = vec4(applyFog(col, vWorld), 1.0);
  }
`

function Buildings({ list }: { list: Building[] }) {
  const ref = useRef<THREE.InstancedMesh>(null!)
  const { geometry, material } = useMemo(() => {
    const geo = new THREE.BoxGeometry(1, 1, 1)
    geo.translate(0, 0.5, 0)
    const data = new Float32Array(list.length * 4)
    list.forEach((b, i) => data.set([b.style, b.seed, b.h, 0], i * 4))
    geo.setAttribute('aData', new THREE.InstancedBufferAttribute(data, 4))
    const mat = new THREE.ShaderMaterial({
      vertexShader: buildingVert,
      fragmentShader: buildingFrag,
      uniforms: {
        uTime: { value: 0 },
        uFogColor: { value: palette.fog },
        uFogDensity: { value: FOG_DENSITY },
        uSkyTint: { value: new THREE.Color('#3f5a80') },
      },
    })
    return { geometry: geo, material: mat }
  }, [list])

  const matrices = useMemo(() => {
    const m = new THREE.Matrix4()
    const arr: THREE.Matrix4[] = []
    list.forEach((b) => {
      m.compose(new THREE.Vector3(b.x, b.base, b.z), new THREE.Quaternion(), new THREE.Vector3(b.w, b.h, b.d))
      arr.push(m.clone())
    })
    return arr
  }, [list])

  return (
    <instancedMesh
      ref={(mesh) => {
        if (!mesh) return
        ref.current = mesh
        matrices.forEach((m, i) => mesh.setMatrixAt(i, m))
        mesh.instanceMatrix.needsUpdate = true
        mesh.computeBoundingSphere()
      }}
      args={[geometry, material, list.length]}
      frustumCulled={false}
    />
  )
}

// City floor: street grid glow + warm bloom around the innovation district.
function Ground() {
  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        uniforms: {
          uFogColor: { value: palette.fog },
          uFogDensity: { value: FOG_DENSITY },
          uCenter: { value: new THREE.Vector2(DISTRICT.x, DISTRICT.z) },
          uCell: { value: CELL },
        },
        vertexShader: /* glsl */ `
          varying vec3 vWorld; varying vec2 vLocal;
          void main(){ vLocal = position.xy; vec4 wp = modelMatrix * vec4(position,1.0); vWorld = wp.xyz; gl_Position = projectionMatrix * viewMatrix * wp; }
        `,
        fragmentShader: /* glsl */ `
          varying vec3 vWorld; varying vec2 vLocal;
          uniform vec2 uCenter; uniform float uCell;
          ${fogGLSL}
          void main(){
            vec2 p = vec2(vLocal.x, -vLocal.y);
            vec2 g = abs(fract(p / uCell + 0.5) - 0.5) * uCell;
            float street = 1.0 - smoothstep(1.2, 4.5, min(g.x, g.y));
            vec2 a6 = abs(fract(p / (uCell * vec2(6.0, 5.0)) + 0.5) - 0.5) * uCell * vec2(6.0, 5.0);
            float avenue = 1.0 - smoothstep(2.0, 9.0, min(a6.x, a6.y));
            float d = length((p - uCenter) * vec2(1.0, 0.8));
            float glow = exp(-d * d / (2.0 * 300.0 * 300.0));
            vec3 col = vec3(0.006, 0.009, 0.016);
            col += vec3(1.0, 0.62, 0.32) * street * (0.06 + 0.35 * glow);
            col += vec3(1.0, 0.70, 0.40) * avenue * 0.35;
            col += vec3(0.30, 0.22, 0.14) * glow * 0.25;
            gl_FragColor = vec4(applyFog(col, vWorld), 1.0);
          }
        `,
      }),
    [],
  )
  return (
    <mesh rotation-x={-Math.PI / 2} position={[0, GROUND, 0]} material={material}>
      <planeGeometry args={[4400, 4400]} />
    </mesh>
  )
}

// Animated light trails along a few avenues (headlights / tail lights).
function Trails() {
  const ref = useRef<THREE.ShaderMaterial>(null!)
  const geometry = useMemo(() => {
    const rnd = mulberry32(9)
    const geos: THREE.BufferGeometry[] = []
    const add = (x1: number, z1: number, x2: number, z2: number, w: number, dir: number, hue: number) => {
      const len = Math.hypot(x2 - x1, z2 - z1)
      const g = new THREE.PlaneGeometry(len, w, 1, 1)
      g.rotateX(-Math.PI / 2)
      const ang = Math.atan2(-(z2 - z1), x2 - x1)
      g.rotateY(ang)
      g.translate((x1 + x2) / 2, GROUND + 0.6, (z1 + z2) / 2)
      const n = g.attributes.position.count
      const meta = new Float32Array(n * 3)
      for (let i = 0; i < n; i++) meta.set([dir, hue, rnd() * 10], i * 3)
      g.setAttribute('aMeta', new THREE.BufferAttribute(meta, 3))
      geos.push(g)
    }
    // north–south avenues (along z)
    for (const i of [-18, -12, -6, 0, 6, 12]) {
      const x = i * CELL
      add(x - 2, -120, x - 2, -2000, 2.6, 1, 0)
      add(x + 2, -120, x + 2, -2000, 2.6, -1, 1)
    }
    // cross boulevards (along x)
    for (const j of [-5, -10, -15, -20, -25]) {
      const z = j * CELL
      add(-1500, z - 1.8, 1500, z - 1.8, 2.2, 1, 0)
      add(-1500, z + 1.8, 1500, z + 1.8, 2.2, -1, 1)
    }
    return mergeGeometries(geos)
  }, [])

  useFrame((_, dt) => {
    if (ref.current) ref.current.uniforms.uTime.value += dt
  })

  return (
    <mesh geometry={geometry} frustumCulled={false}>
      <shaderMaterial
        ref={ref}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        uniforms={{ uTime: { value: 0 }, uFogColor: { value: palette.fog }, uFogDensity: { value: FOG_DENSITY } }}
        vertexShader={/* glsl */ `
          attribute vec3 aMeta; varying vec3 vMeta; varying vec2 vUv; varying vec3 vWorld;
          void main(){ vMeta = aMeta; vUv = uv; vec4 wp = modelMatrix * vec4(position,1.0); vWorld = wp.xyz; gl_Position = projectionMatrix * viewMatrix * wp; }
        `}
        fragmentShader={/* glsl */ `
          uniform float uTime; varying vec3 vMeta; varying vec2 vUv; varying vec3 vWorld;
          ${fogGLSL}
          void main(){
            float t = vUv.x * 140.0 + vMeta.z - uTime * 0.6 * vMeta.x;
            float dash = smoothstep(0.0, 0.25, fract(t)) * (1.0 - smoothstep(0.25, 0.85, fract(t)));
            float across = 1.0 - abs(vUv.y - 0.5) * 2.0;
            vec3 col = mix(vec3(1.0, 0.86, 0.66), vec3(1.0, 0.22, 0.12), vMeta.y) * 2.2;
            float a = dash * across * 0.9;
            vec3 fogged = applyFog(col * a, vWorld);
            float dist = length(vWorld - cameraPosition);
            gl_FragColor = vec4(fogged * exp(-dist * 0.0006), 1.0);
          }
        `}
      />
    </mesh>
  )
}

// Thin animated data connections arcing from the landmark crown to other towers.
function DataArcs({ list }: { list: Building[] }) {
  const ref = useRef<THREE.ShaderMaterial>(null!)
  const { geometry, nodes } = useMemo(() => {
    const crownTop = list.slice(0, 4).reduce((s, b) => s + b.h, GROUND)
    const from = new THREE.Vector3(DISTRICT.x, crownTop - 10, DISTRICT.z)
    const candidates = list
      .slice(4)
      .filter((b) => b.base === GROUND && b.h > 120)
      .map((b) => ({ b, d: Math.hypot(b.x - DISTRICT.x, b.z - DISTRICT.z) }))
      .filter((c) => c.d > 120 && c.d < 900)
      .sort((a, b) => a.d - b.d)
    const picked: Building[] = []
    for (const c of candidates) {
      if (picked.every((p) => Math.hypot(p.x - c.b.x, p.z - c.b.z) > 160)) picked.push(c.b)
      if (picked.length === 6) break
    }
    const geos: THREE.BufferGeometry[] = []
    const nodePts: THREE.Vector3[] = [from]
    picked.forEach((b, i) => {
      const to = new THREE.Vector3(b.x, GROUND + b.h + 2, b.z)
      const mid = from.clone().lerp(to, 0.5)
      mid.y += 60 + from.distanceTo(to) * 0.18
      const curve = new THREE.QuadraticBezierCurve3(from, mid, to)
      const g = new THREE.TubeGeometry(curve, 80, 0.7, 5, false)
      const n = g.attributes.position.count
      const meta = new Float32Array(n)
      meta.fill(i / 6)
      g.setAttribute('aPhase', new THREE.BufferAttribute(meta, 1))
      geos.push(g)
      nodePts.push(to)
    })
    return { geometry: geos.length ? mergeGeometries(geos) : new THREE.BufferGeometry(), nodes: nodePts }
  }, [list])

  useFrame((_, dt) => {
    if (ref.current) ref.current.uniforms.uTime.value += dt
  })

  return (
    <group>
      <mesh geometry={geometry} frustumCulled={false}>
        <shaderMaterial
          ref={ref}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          uniforms={{ uTime: { value: 0 } }}
          vertexShader={/* glsl */ `
            attribute float aPhase; varying float vPhase; varying vec2 vUv;
            void main(){ vPhase = aPhase; vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }
          `}
          fragmentShader={/* glsl */ `
            uniform float uTime; varying float vPhase; varying vec2 vUv;
            void main(){
              float base = 0.10;
              float p = fract(vUv.x - uTime * 0.12 - vPhase);
              float pulse = smoothstep(0.0, 0.06, p) * (1.0 - smoothstep(0.06, 0.16, p));
              vec3 col = mix(vec3(0.50, 0.66, 0.95), vec3(1.0, 0.82, 0.52), pulse);
              float fade = smoothstep(0.0, 0.08, vUv.x) * smoothstep(1.0, 0.92, vUv.x);
              gl_FragColor = vec4(col * (base + pulse * 1.6) * fade, 1.0);
            }
          `}
        />
      </mesh>
      {nodes.map((p, i) => (
        <mesh key={i} position={p}>
          <sphereGeometry args={[i === 0 ? 2.6 : 1.4, 12, 12]} />
          <meshBasicMaterial color={i === 0 ? '#ffe2a8' : '#cfe0ff'} toneMapped={false} />
        </mesh>
      ))}
    </group>
  )
}

// Red aviation warning lights on tall towers, blinking out of phase.
function AviationLights({ list }: { list: Building[] }) {
  const ref = useRef<THREE.ShaderMaterial>(null!)
  const geometry = useMemo(() => {
    const tops = list.filter((b) => b.h > 140 && b.style !== 2)
    const pos = new Float32Array(tops.length * 3)
    const phase = new Float32Array(tops.length)
    tops.forEach((b, i) => {
      pos.set([b.x, b.base + b.h + 1.5, b.z], i * 3)
      phase[i] = (i * 0.37) % 1
    })
    const g = new THREE.BufferGeometry()
    g.setAttribute('position', new THREE.BufferAttribute(pos, 3))
    g.setAttribute('aPhase', new THREE.BufferAttribute(phase, 1))
    return g
  }, [list])
  useFrame((_, dt) => {
    if (ref.current) ref.current.uniforms.uTime.value += dt
  })
  return (
    <points geometry={geometry} frustumCulled={false}>
      <shaderMaterial
        ref={ref}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        uniforms={{ uTime: { value: 0 } }}
        vertexShader={/* glsl */ `
          attribute float aPhase; uniform float uTime; varying float vOn;
          void main(){
            vec4 mv = modelViewMatrix * vec4(position,1.0);
            vOn = 0.25 + 0.75 * step(0.55, fract(uTime * 0.5 + aPhase));
            gl_PointSize = clamp(3000.0 / -mv.z, 2.0, 6.0);
            gl_Position = projectionMatrix * mv;
          }
        `}
        fragmentShader={/* glsl */ `
          varying float vOn;
          void main(){ float d = length(gl_PointCoord - 0.5); float a = smoothstep(0.5, 0.0, d); gl_FragColor = vec4(vec3(1.0, 0.18, 0.12) * a * vOn * 2.0, 1.0); }
        `}
      />
    </points>
  )
}

// Landmark crown: champagne halo ring and spire beacon.
function LandmarkCrown({ list }: { list: Building[] }) {
  const top = list.slice(0, 4).reduce((s, b) => s + b.h, GROUND)
  const beacon = useRef<THREE.MeshBasicMaterial>(null!)
  useFrame(({ clock }) => {
    if (beacon.current) beacon.current.color.setScalar(0.6 + 0.4 * Math.sin(clock.elapsedTime * 1.4)).multiply(new THREE.Color('#ffe6b0'))
  })
  return (
    <group position={[DISTRICT.x, 0, DISTRICT.z]}>
      <mesh position={[0, top - 18, 0]} rotation-x={Math.PI / 2}>
        <torusGeometry args={[12, 0.7, 8, 64]} />
        <meshBasicMaterial color="#ffd89a" toneMapped={false} />
      </mesh>
      <mesh position={[0, top + 26, 0]}>
        <cylinderGeometry args={[0.35, 1.4, 52, 8]} />
        <meshBasicMaterial color="#2a3446" />
      </mesh>
      <mesh position={[0, top + 53, 0]}>
        <sphereGeometry args={[1.6, 12, 12]} />
        <meshBasicMaterial ref={beacon} color="#ffe6b0" toneMapped={false} />
      </mesh>
    </group>
  )
}

export function City() {
  const list = useMemo(() => generate(), [])
  return (
    <group rotation-y={CITY_ROT}>
      <Ground />
      <Buildings list={list} />
      <Trails />
      <DataArcs list={list} />
      <AviationLights list={list} />
      <LandmarkCrown list={list} />
    </group>
  )
}

// Minimal geometry merge (position/normal/uv + custom attributes present on all inputs).
function mergeGeometries(geos: THREE.BufferGeometry[]) {
  const merged = new THREE.BufferGeometry()
  const names = Object.keys(geos[0].attributes)
  const indices: number[] = []
  let offset = 0
  for (const g of geos) {
    const idx = g.index
    if (idx) for (let i = 0; i < idx.count; i++) indices.push(idx.getX(i) + offset)
    offset += g.attributes.position.count
  }
  for (const name of names) {
    const first = geos[0].attributes[name] as THREE.BufferAttribute
    const total = geos.reduce((s, g) => s + g.attributes[name].count, 0)
    const arr = new Float32Array(total * first.itemSize)
    let o = 0
    for (const g of geos) {
      const a = g.attributes[name] as THREE.BufferAttribute
      arr.set(a.array as Float32Array, o)
      o += a.array.length
    }
    merged.setAttribute(name, new THREE.BufferAttribute(arr, first.itemSize))
  }
  merged.setIndex(indices)
  return merged
}
