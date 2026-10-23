import { useEffect, useRef, useState, type RefObject } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Environment, Lightformer } from '@react-three/drei'
import { Bloom, EffectComposer, Noise, ToneMapping, Vignette } from '@react-three/postprocessing'
import { BlendFunction, ToneMappingMode } from 'postprocessing'
import * as THREE from 'three'
import { City } from './City'
import { Dust } from './Dust'
import { Executive } from './Executive'
import { PanelTracker } from './Panels'
import { Sky } from './Sky'
import { Terrace } from './Terrace'
import { FOG_DENSITY, palette } from './util'
import { BASE_POS, BASE_TARGET, lensFor } from './camera'


/** Pointer parallax + scroll dolly; shifts the film so the figure sits right of the headline on wide screens. */
function CameraRig({ animate, active }: { animate: boolean; active: boolean }) {
  const { camera, size } = useThree()
  const pointer = useRef({ x: 0, y: 0 })
  const look = useRef(BASE_TARGET.clone())

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1
      pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => window.removeEventListener('pointermove', onMove)
  }, [])

  // Lens changes go through get() so the camera object isn't treated as an immutable hook value.
  const get = useThree((s) => s.get)
  useEffect(() => {
    const cam = get().camera as THREE.PerspectiveCamera
    const lens = lensFor(size.width / size.height)
    cam.filmOffset = lens.filmOffset
    cam.fov = lens.fov
    cam.updateProjectionMatrix()
  }, [get, size])

  useFrame((_, dt) => {
    if (!active) return
    const aspect = size.width / size.height
    const scrollT = Math.min(window.scrollY / window.innerHeight, 1.2)
    const k = animate ? 1 - Math.pow(0.0015, dt) : 1
    const px = animate ? pointer.current.x : 0
    const py = animate ? pointer.current.y : 0
    const portrait = lensFor(aspect).portrait
    const target = BASE_POS.clone().add(
      new THREE.Vector3(px * 0.18 + (portrait ? -1.2 : 0), -py * 0.12 + scrollT * 0.55 + (portrait ? 0.15 : 0), scrollT * 0.9 + (portrait ? 2.6 : 0)),
    )
    camera.position.lerp(target, k)
    const tgt = BASE_TARGET.clone().add(new THREE.Vector3(px * 0.25 + (portrait ? 0.4 : 0), -py * 0.1 + scrollT * 0.4 + (portrait ? -0.12 : 0), 0))
    look.current.lerp(tgt, k)
    camera.lookAt(look.current)
  })
  return null
}

function ReadySignal({ onReady }: { onReady: () => void }) {
  const frames = useRef(0)
  const done = useRef(false)
  useFrame(() => {
    if (done.current) return
    frames.current += 1
    if (frames.current > 4) {
      done.current = true
      onReady()
    }
  })
  return null
}

function Lights() {
  return (
    <>
      <hemisphereLight args={['#2b3d5c', '#07090d', 0.55]} />
      {/* key: warm city glow from the district, in front of the figure → rim on the silhouette */}
      <directionalLight position={[-6, 9, -8]} intensity={3.4} color="#ffcf98" />
      {/* cool sky rim from the right */}
      <directionalLight position={[7, 9, -6]} intensity={2.2} color="#8fb0e6" />
      {/* soft fill from the camera side so the back of the suit keeps its detail */}
      <directionalLight position={[3, 4, 6]} intensity={0.75} color="#9db2d6" />
      {/* overhead downlight in the canopy */}
      <spotLight position={[0.6, 4.6, 0.6]} angle={0.5} penumbra={1} intensity={2.2} distance={9} decay={1.6} color="#ffe2bd" target-position={[0.05, 0.9, -0.95]} />
    </>
  )
}

function Studio() {
  // Procedural environment so reflections on glass, steel and shoes need no HDR download.
  return (
    <Environment resolution={128} frames={1}>
      <color attach="background" args={['#050810']} />
      {/* dim city-glow band on the horizon + cool sky, so glossy surfaces read as night */}
      <Lightformer form="rect" intensity={0.5} color="#e0b27a" position={[-4, 0.5, -14]} scale={[26, 1.2, 1]} />
      <Lightformer form="rect" intensity={0.25} color="#4c6a98" position={[0, 6, -12]} scale={[30, 8, 1]} />
      <Lightformer form="rect" intensity={0.6} color="#7f9cc4" position={[10, 5, -6]} rotation-y={-Math.PI / 3} scale={[8, 5, 1]} />
      <Lightformer form="ring" intensity={1.4} color="#ffe2b0" position={[-3, 3, -14]} scale={1.2} />
    </Environment>
  )
}

export type HeroCanvasProps = {
  animate: boolean
  active: boolean
  panelRefs: RefObject<(HTMLElement | null)[]>
  quality: 'high' | 'low'
  onReady: () => void
}

export default function HeroCanvas({ animate, active, panelRefs, quality, onReady }: HeroCanvasProps) {
  const [high] = useState(quality === 'high')
  return (
    <Canvas
      dpr={high ? [1, 1.75] : [1, 1.25]}
      frameloop={active ? 'always' : 'never'}
      gl={{ antialias: false, powerPreference: 'high-performance', stencil: false }}
      camera={{ fov: 36, near: 0.1, far: 3200, position: BASE_POS.toArray() }}
      onCreated={({ gl, camera }) => {
        gl.toneMapping = THREE.NoToneMapping
        camera.lookAt(BASE_TARGET)
      }}
    >
      <color attach="background" args={['#05080f']} />
      <fogExp2 attach="fog" args={[palette.fog.getHex(), FOG_DENSITY * 0.7]} />
      <Sky />
      <City />
      <Terrace />
      <Executive animate={animate} />
      <Dust animate={animate} />
      <Lights />
      <Studio />
      <PanelTracker targets={panelRefs} />
      <CameraRig animate={animate} active={active} />
      <ReadySignal onReady={onReady} />
      <EffectComposer multisampling={high ? 4 : 0} enableNormalPass={false}>
        <Bloom mipmapBlur intensity={1.05} luminanceThreshold={0.7} luminanceSmoothing={0.3} radius={0.8} />
        <Vignette offset={0.22} darkness={0.72} />
        <Noise opacity={0.035} blendFunction={BlendFunction.SOFT_LIGHT} />
        <ToneMapping mode={ToneMappingMode.ACES_FILMIC} />
      </EffectComposer>
    </Canvas>
  )
}
