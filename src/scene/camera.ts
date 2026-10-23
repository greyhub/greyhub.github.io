import * as THREE from 'three'

export const BASE_POS = new THREE.Vector3(2.3, 1.55, 4.1)
export const BASE_TARGET = new THREE.Vector3(-1.7, 1.05, -8)

/** Lens set-up per aspect: wide screens push the subject right of the headline, portrait centres it. */
export function lensFor(aspect: number) {
  return {
    filmOffset: aspect > 1.2 ? -7.5 : aspect > 0.9 ? -3 : 0,
    fov: aspect < 0.8 ? 50 : 36,
    portrait: aspect < 0.8,
  }
}

export function baseCamera(aspect: number) {
  const lens = lensFor(aspect)
  const cam = new THREE.PerspectiveCamera(lens.fov, aspect, 0.1, 3200)
  cam.filmOffset = lens.filmOffset
  cam.position.copy(BASE_POS)
  cam.lookAt(BASE_TARGET)
  cam.updateProjectionMatrix()
  cam.updateMatrixWorld()
  return cam
}
