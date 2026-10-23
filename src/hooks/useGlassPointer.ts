import { useEffect } from 'react'

/**
 * One delegated listener drives every `[data-tilt]` element: it writes the pointer position
 * (--mx/--my, for the glare) and a small 3D tilt (--rx/--ry). `data-tilt="10"` sets the max degrees.
 * Skipped on touch-only devices and with reduced motion.
 */
export function useGlassPointer() {
  useEffect(() => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let current: HTMLElement | null = null
    let frame = 0
    let last: PointerEvent | null = null

    const reset = (el: HTMLElement) => {
      el.style.setProperty('--rx', '0deg')
      el.style.setProperty('--ry', '0deg')
      el.removeAttribute('data-hot')
    }
    const apply = () => {
      frame = 0
      const e = last
      if (!e) return
      const el = (e.target as Element | null)?.closest?.('[data-tilt]') as HTMLElement | null
      if (current && current !== el) reset(current)
      current = el
      if (!el) return
      const r = el.getBoundingClientRect()
      const x = Math.min(Math.max((e.clientX - r.left) / r.width, 0), 1)
      const y = Math.min(Math.max((e.clientY - r.top) / r.height, 0), 1)
      const max = Number(el.dataset.tilt) || 5
      el.style.setProperty('--mx', `${(x * 100).toFixed(1)}%`)
      el.style.setProperty('--my', `${(y * 100).toFixed(1)}%`)
      el.style.setProperty('--rx', `${((0.5 - y) * max).toFixed(2)}deg`)
      el.style.setProperty('--ry', `${((x - 0.5) * max).toFixed(2)}deg`)
      el.setAttribute('data-hot', '')
    }
    const onMove = (e: PointerEvent) => {
      last = e
      if (!frame) frame = requestAnimationFrame(apply)
    }
    const onLeave = () => {
      if (current) reset(current)
      current = null
    }
    document.addEventListener('pointermove', onMove, { passive: true })
    document.addEventListener('pointerleave', onLeave)
    return () => {
      document.removeEventListener('pointermove', onMove)
      document.removeEventListener('pointerleave', onLeave)
      cancelAnimationFrame(frame)
    }
  }, [])
}
