import { useMemo, type RefObject } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { panelLayout } from './panelLayout'
import { baseCamera } from './camera'

export function PanelTracker({ targets }: { targets: RefObject<(HTMLElement | null)[]> }) {
  const { size, camera } = useThree()
  const anchors = useMemo(() => {
    const cam = baseCamera(size.width / size.height)
    return panelLayout.map(([x, y, depth]) => {
      const p = new THREE.Vector3(x, y, 0.5).unproject(cam)
      return cam.position.clone().add(p.sub(cam.position).normalize().multiplyScalar(depth))
    })
  }, [size.width, size.height])
  const v = useMemo(() => new THREE.Vector3(), [])

  useFrame(() => {
    const els = targets.current
    if (!els) return
    anchors.forEach((a, i) => {
      const el = els[i]
      if (!el) return
      v.copy(a).project(camera)
      const dx = ((v.x - panelLayout[i][0]) / 2) * size.width
      const dy = (-(v.y - panelLayout[i][1]) / 2) * size.height
      el.style.transform = `translate3d(${dx.toFixed(1)}px, ${dy.toFixed(1)}px, 0)`
    })
  })
  return null
}
