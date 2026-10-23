import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { addRim } from './util'

/*
 * Procedural stylised-realistic executive, built from lathe and primitive geometry
 * (no external model is available). Rear three-quarter view: tailored two-piece suit
 * with centre vent and back seam, white shirt collar and cuffs, black oxfords,
 * hands clasped behind the back.
 */

const V = (x: number, y: number, z: number) => new THREE.Vector3(x, y, z)

function fabricMaps() {
  const S = 1024
  // bump: wool twill + tension folds
  const b = document.createElement('canvas')
  b.width = b.height = S
  const bx = b.getContext('2d')!
  bx.fillStyle = '#808080'
  bx.fillRect(0, 0, S, S)
  bx.globalAlpha = 0.16
  for (let i = -S; i < S * 2; i += 3) {
    bx.strokeStyle = i % 6 === 0 ? '#9a9a9a' : '#666'
    bx.lineWidth = 1.2
    bx.beginPath()
    bx.moveTo(i, 0)
    bx.lineTo(i + S * 0.5, S)
    bx.stroke()
  }
  bx.globalAlpha = 1
  const fold = (pts: number[][], w: number, dark: boolean) => {
    bx.save()
    bx.filter = `blur(${w * 0.6}px)`
    bx.strokeStyle = dark ? 'rgba(40,40,40,0.55)' : 'rgba(200,200,200,0.45)'
    bx.lineWidth = w
    bx.lineCap = 'round'
    bx.beginPath()
    bx.moveTo(pts[0][0] * S, pts[0][1] * S)
    for (let i = 1; i < pts.length - 1; i += 2) bx.quadraticCurveTo(pts[i][0] * S, pts[i][1] * S, pts[i + 1][0] * S, pts[i + 1][1] * S)
    bx.stroke()
    bx.restore()
  }
  // canvas y = 1 - v ; u = 0/1 is the centre back, 0.25 / 0.75 the sides
  // small-of-back folds where the jacket suppresses at the waist
  for (const [y, w] of [[0.62, 14], [0.66, 10], [0.585, 9]] as const) {
    fold([[0.84, y], [0.95, y + 0.02], [1.0, y]], w, true)
    fold([[0.0, y], [0.05, y + 0.02], [0.16, y]], w, true)
  }
  // diagonal tension folds from the shoulder blades toward the clasped hands
  fold([[0.18, 0.2], [0.12, 0.33], [0.04, 0.48]], 10, true)
  fold([[0.82, 0.2], [0.88, 0.33], [0.96, 0.48]], 10, true)
  fold([[0.2, 0.26], [0.15, 0.36], [0.08, 0.52]], 6, false)
  fold([[0.8, 0.26], [0.85, 0.36], [0.92, 0.52]], 6, false)
  // side drape at the hips
  fold([[0.25, 0.7], [0.27, 0.82], [0.25, 0.96]], 8, true)
  fold([[0.75, 0.7], [0.73, 0.82], [0.75, 0.96]], 8, true)
  const bump = new THREE.CanvasTexture(b)

  // colour: centre back seam + vent, subtle tonal variation
  const c = document.createElement('canvas')
  c.width = c.height = S
  const cx = c.getContext('2d')!
  const grad = cx.createLinearGradient(0, 0, 0, S)
  grad.addColorStop(0, '#ffffff')
  grad.addColorStop(1, '#e4e4e4')
  cx.fillStyle = grad
  cx.fillRect(0, 0, S, S)
  cx.fillStyle = 'rgba(0,0,0,0.55)'
  cx.fillRect(0, 0, 3, S * 0.86)
  cx.fillRect(S - 3, 0, 3, S * 0.86)
  // centre vent: deeper shadow line on the lower ~22%
  cx.fillStyle = 'rgba(0,0,0,0.85)'
  cx.fillRect(0, S * 0.78, 5, S * 0.22)
  cx.fillRect(S - 5, S * 0.78, 5, S * 0.22)
  // side seams
  cx.fillStyle = 'rgba(0,0,0,0.35)'
  cx.fillRect(S * 0.25 - 1, S * 0.12, 2, S * 0.88)
  cx.fillRect(S * 0.75 - 1, S * 0.12, 2, S * 0.88)
  const color = new THREE.CanvasTexture(c)
  color.colorSpace = THREE.SRGBColorSpace
  return { bump, color }
}

function hairMap() {
  const S = 256
  const c = document.createElement('canvas')
  c.width = c.height = S
  const x = c.getContext('2d')!
  x.fillStyle = '#808080'
  x.fillRect(0, 0, S, S)
  for (let i = 0; i < 900; i++) {
    const px = Math.random() * S, py = Math.random() * S
    x.strokeStyle = Math.random() > 0.5 ? 'rgba(255,255,255,0.25)' : 'rgba(0,0,0,0.3)'
    x.beginPath()
    x.moveTo(px, py)
    x.lineTo(px + (Math.random() - 0.5) * 3, py + 10 + Math.random() * 14)
    x.stroke()
  }
  return new THREE.CanvasTexture(c)
}

function Limb({ a, b, r1, r2, material, cap = true }: { a: THREE.Vector3; b: THREE.Vector3; r1: number; r2: number; material: THREE.Material; cap?: boolean }) {
  const { pos, quat, len } = useMemo(() => {
    const dir = a.clone().sub(b)
    const len = dir.length()
    const quat = new THREE.Quaternion().setFromUnitVectors(V(0, 1, 0), dir.normalize())
    return { pos: a.clone().add(b).multiplyScalar(0.5), quat, len }
  }, [a, b])
  return (
    <>
      <mesh position={pos} quaternion={quat} material={material} castShadow>
        <cylinderGeometry args={[r1, r2, len, 24, 6, !cap]} />
      </mesh>
      {cap && (
        <mesh position={b} material={material}>
          <sphereGeometry args={[r2, 20, 14]} />
        </mesh>
      )}
    </>
  )
}

export function Executive({ animate }: { animate: boolean }) {
  const root = useRef<THREE.Group>(null!)
  const torso = useRef<THREE.Group>(null!)
  const head = useRef<THREE.Group>(null!)

  const m = useMemo(() => {
    const maps = fabricMaps()
    const suit = new THREE.MeshPhysicalMaterial({
      color: '#172238', map: maps.color, bumpMap: maps.bump, bumpScale: 1.4,
      roughness: 0.74, sheen: 1, sheenRoughness: 0.42, sheenColor: new THREE.Color('#5b6f94'),
    })
    addRim(suit, new THREE.Color('#6f8fc0'), 2.6, 0.8)
    const trousers = new THREE.MeshPhysicalMaterial({
      color: '#182030', bumpMap: maps.bump, bumpScale: 0.8,
      roughness: 0.76, sheen: 1, sheenRoughness: 0.45, sheenColor: new THREE.Color('#52658a'),
    })
    addRim(trousers, new THREE.Color('#4f6a94'), 3.0, 0.45)
    const shirt = new THREE.MeshPhysicalMaterial({ color: '#e8edf3', roughness: 0.55, sheen: 0.4, sheenColor: new THREE.Color('#ffffff') })
    const skin = new THREE.MeshPhysicalMaterial({
      color: '#c48f73', roughness: 0.58, sheen: 0.6, sheenRoughness: 0.6, sheenColor: new THREE.Color('#ffb59a'),
    })
    addRim(skin, new THREE.Color('#d99a6c'), 2.6, 0.35)
    const hair = new THREE.MeshPhysicalMaterial({
      color: '#0b0c10', roughness: 0.4, bumpMap: hairMap(), bumpScale: 1.2,
      sheen: 0.9, sheenRoughness: 0.3, sheenColor: new THREE.Color('#5c6886'),
    })
    addRim(hair, new THREE.Color('#5d7aa6'), 2.5, 0.4)
    const crop = new THREE.MeshPhysicalMaterial({
      color: '#231d19', roughness: 0.85, bumpMap: hairMap(), bumpScale: 0.6,
    })
    const shoe = new THREE.MeshPhysicalMaterial({ color: '#07080a', roughness: 0.32, clearcoat: 1, clearcoatRoughness: 0.12, metalness: 0.1 })
    return { suit, trousers, shirt, skin, hair, crop, shoe }
  }, [])

  const jacketGeo = useMemo(() => {
    // radius, height — hem to collar
    const prof: [number, number][] = [
      [0.188, 0.775], [0.195, 0.81], [0.197, 0.87], [0.19, 0.93], [0.176, 0.99], [0.168, 1.05],
      [0.171, 1.11], [0.184, 1.2], [0.197, 1.29], [0.206, 1.36], [0.203, 1.405], [0.186, 1.44],
      [0.155, 1.468], [0.115, 1.49], [0.082, 1.51], [0.07, 1.53],
    ]
    const g = new THREE.LatheGeometry(prof.map(([r, y]) => new THREE.Vector2(r, y)), 64)
    g.scale(1.19, 1, 0.64)
    // flatten the back slightly and push the chest forward
    const p = g.attributes.position
    for (let i = 0; i < p.count; i++) {
      const z = p.getZ(i)
      if (z > 0) p.setZ(i, z * 0.93)
      else p.setZ(i, z * 1.05)
    }
    g.computeVertexNormals()
    return g
  }, [])

  const legGeo = useMemo(() => {
    const prof: [number, number][] = [
      [0.0, 0.045], [0.077, 0.05], [0.079, 0.09], [0.075, 0.2], [0.076, 0.35], [0.081, 0.5],
      [0.09, 0.65], [0.1, 0.78], [0.106, 0.88], [0.0, 0.93],
    ]
    const g = new THREE.LatheGeometry(prof.map(([r, y]) => new THREE.Vector2(r, y)), 32)
    g.scale(1, 1, 0.92)
    g.computeVertexNormals()
    return g
  }, [])

  // hands-behind-back pose (character faces -z, so +z is the back)
  const arm = useMemo(() => {
    const side = (s: 1 | -1) => {
      const shoulder = V(0.214 * s, 1.382, 0.012)
      const elbow = V(0.252 * s, 1.105, 0.085)
      const wrist = V(0.058 * s + (s > 0 ? 0.012 : 0), 0.952, 0.185)
      const dir = wrist.clone().sub(elbow).normalize()
      const sleeveEnd = wrist.clone().addScaledVector(dir, -0.028)
      const cuffEnd = wrist.clone().addScaledVector(dir, 0.004)
      return { shoulder, elbow, wrist, sleeveEnd, cuffEnd }
    }
    return { r: side(1), l: side(-1) }
  }, [])

  useFrame(({ clock }) => {
    if (!animate) return
    const t = clock.elapsedTime
    torso.current.scale.y = 1 + Math.sin(t * 1.3) * 0.0035
    torso.current.position.y = Math.sin(t * 1.3) * 0.002
    head.current.rotation.y = -0.2 + Math.sin(t * 0.23) * 0.06
    head.current.rotation.x = -0.04 + Math.sin(t * 0.31) * 0.012
    root.current.rotation.z = Math.sin(t * 0.4) * 0.0035
  })

  return (
    <group ref={root} position={[0.05, 0, -0.95]} rotation-y={-0.06}>
      {/* legs */}
      <mesh geometry={legGeo} material={m.trousers} position={[0.098, 0, 0]} rotation-z={0.018} />
      <mesh geometry={legGeo} material={m.trousers} position={[-0.098, 0, 0]} rotation-z={-0.018} />
      {/* shoes: toe toward -z */}
      {[1, -1].map((s) => (
        <group key={s} position={[0.112 * s, 0, -0.035]} rotation-y={-0.06 * s}>
          <mesh material={m.shoe} position={[0, 0.038, -0.03]} scale={[0.05, 0.04, 0.138]}>
            <sphereGeometry args={[1, 28, 18]} />
          </mesh>
          <mesh material={m.shoe} position={[0, 0.04, 0.05]} scale={[0.048, 0.042, 0.06]}>
            <sphereGeometry args={[1, 20, 14]} />
          </mesh>
        </group>
      ))}

      <group ref={torso}>
        {/* jacket body */}
        <mesh geometry={jacketGeo} material={m.suit} castShadow />
        {/* shoulder heads */}
        {[1, -1].map((s) => (
          <mesh key={s} material={m.suit} position={[0.206 * s, 1.384, 0.006]} scale={[0.07, 0.058, 0.074]}>
            <sphereGeometry args={[1, 24, 16]} />
          </mesh>
        ))}
        {/* sleeves, cuffs, hands */}
        {[arm.r, arm.l].map((a, i) => (
          <group key={i}>
            <Limb a={a.shoulder} b={a.elbow} r1={0.066} r2={0.058} material={m.suit} />
            <Limb a={a.elbow} b={a.sleeveEnd} r1={0.058} r2={0.05} material={m.suit} cap={false} />
            <Limb a={a.sleeveEnd} b={a.cuffEnd} r1={0.043} r2={0.042} material={m.shirt} cap={false} />
          </group>
        ))}
        {/* clasped hands: left hand holds the right wrist */}
        <mesh material={m.skin} position={[-0.012, 0.938, 0.198]} rotation={[0.25, 0, 0.35]} scale={[0.056, 0.04, 0.026]}>
          <sphereGeometry args={[1, 20, 14]} />
        </mesh>
        <mesh material={m.skin} position={[0.03, 0.952, 0.206]} rotation={[0.2, 0, -0.2]} scale={[0.05, 0.036, 0.024]}>
          <sphereGeometry args={[1, 20, 14]} />
        </mesh>

        {/* collars */}
        <mesh material={m.shirt} position={[0, 1.555, 0.006]} rotation-x={-0.28}>
          <cylinderGeometry args={[0.06, 0.066, 0.05, 32, 1, true]} />
        </mesh>
        <mesh material={m.suit} position={[0, 1.528, 0.01]} rotation-x={-0.3} scale={[1.1, 1, 0.92]}>
          <cylinderGeometry args={[0.07, 0.085, 0.05, 32, 1, true]} />
        </mesh>
        <mesh position={[0, 1.528, 0.01]} rotation-x={-0.3} scale={[1.1, 1, 0.92]}>
          <cylinderGeometry args={[0.069, 0.084, 0.05, 32, 1, true]} />
          <meshPhysicalMaterial color="#141b28" side={THREE.BackSide} roughness={0.8} />
        </mesh>

        {/* neck + head */}
        <mesh material={m.skin} position={[0, 1.585, 0.0]}>
          <cylinderGeometry args={[0.051, 0.056, 0.11, 24]} />
        </mesh>
        <group ref={head} position={[0, 1.648, -0.006]} rotation-y={-0.2}>
          <mesh material={m.skin} position={[0, 0.05, -0.008]} scale={[0.094, 0.118, 0.106]}>
            <sphereGeometry args={[1, 40, 28]} />
          </mesh>
          {/* jaw */}
          <mesh material={m.skin} position={[0, -0.005, -0.04]} scale={[0.074, 0.07, 0.08]}>
            <sphereGeometry args={[1, 28, 20]} />
          </mesh>
          {/* ears */}
          {[1, -1].map((s) => (
            <mesh key={s} material={m.skin} position={[0.091 * s, 0.04, 0.005]} rotation-y={0.35 * s} scale={[0.016, 0.034, 0.024]}>
              <sphereGeometry args={[1, 16, 12]} />
            </mesh>
          ))}
          {/* short, tapered executive haircut: close-cropped sides and back, fuller on top */}
          <mesh material={m.crop} position={[0, 0.05, -0.006]} rotation-x={0.6} scale={[0.0975, 0.121, 0.109]}>
            <sphereGeometry args={[1, 40, 24, 0, Math.PI * 2, 0, Math.PI * 0.62]} />
          </mesh>
          <mesh material={m.hair} position={[0, 0.062, -0.012]} rotation-x={0.25} scale={[0.1, 0.124, 0.113]}>
            <sphereGeometry args={[1, 40, 24, 0, Math.PI * 2, 0, Math.PI * 0.4]} />
          </mesh>
          <mesh material={m.hair} position={[0.008, 0.128, -0.034]} rotation={[-0.25, 0, -0.08]} scale={[0.085, 0.045, 0.098]}>
            <sphereGeometry args={[1, 28, 16]} />
          </mesh>
        </group>
      </group>
    </group>
  )
}
