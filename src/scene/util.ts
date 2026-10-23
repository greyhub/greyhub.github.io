import * as THREE from 'three'

// Deterministic RNG so the skyline is identical on every load.
export function mulberry32(seed: number) {
  let a = seed >>> 0
  return () => {
    a = (a + 0x6d2b79f5) >>> 0
    let t = a
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

export const palette = {
  fog: new THREE.Color('#0f1f35'),
  skyTop: new THREE.Color('#03070e'),
  skyMid: new THREE.Color('#0c1c33'),
  horizon: new THREE.Color('#284468'),
  glow: new THREE.Color('#9c7a52'),
  gold: new THREE.Color('#d9b878'),
  steel: new THREE.Color('#7f9cc4'),
}

export const FOG_DENSITY = 0.00085

// Shared GLSL fog: exponential-squared by distance, plus extra haze close to the ground.
export const fogGLSL = /* glsl */ `
  uniform vec3 uFogColor;
  uniform float uFogDensity;
  vec3 applyFog(vec3 col, vec3 world) {
    float dist = length(world - cameraPosition);
    float f = 1.0 - exp(-pow(uFogDensity * dist, 2.0));
    float ground = smoothstep(-60.0, -170.0, world.y) * smoothstep(150.0, 900.0, dist);
    f = clamp(f + ground * 0.5, 0.0, 1.0);
    return mix(col, uFogColor, f);
  }
`

/**
 * Adds a view-dependent rim (fresnel) term to a standard/physical material.
 * Used on the suit so the silhouette separates from the dark city.
 */
export function addRim(mat: THREE.MeshStandardMaterial, color: THREE.Color, power = 3, strength = 1) {
  mat.onBeforeCompile = (shader) => {
    shader.uniforms.uRimColor = { value: color }
    shader.uniforms.uRimPower = { value: power }
    shader.uniforms.uRimStrength = { value: strength }
    shader.fragmentShader = shader.fragmentShader
      .replace('#include <common>', '#include <common>\nuniform vec3 uRimColor;\nuniform float uRimPower;\nuniform float uRimStrength;')
      .replace(
        '#include <opaque_fragment>',
        `float rimF = pow(1.0 - saturate(dot(normalize(normal), normalize(vViewPosition))), uRimPower);
         // favour edges that face up/sideways (city light comes from the horizon)
         outgoingLight += uRimColor * rimF * uRimStrength;
         #include <opaque_fragment>`,
      )
  }
  mat.customProgramCacheKey = () => `rim-${color.getHexString()}-${power}-${strength}`
}
