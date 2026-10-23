import { Component, lazy, Suspense, useEffect, useRef, useState, type ReactNode } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, ChevronDown } from 'lucide-react'
import { hero, panels, profile } from '../content/content'
import { useLang } from '../hooks/useLang'
import { scrollToId } from '../hooks/scroll'
import { panelIcons, panelLayout } from '../scene/panelLayout'
import poster from '../assets/hero-poster.jpg'

const HeroCanvas = lazy(() => import('../scene/HeroCanvas'))

function hasWebGL() {
  try {
    const c = document.createElement('canvas')
    return !!(c.getContext('webgl2') || c.getContext('webgl'))
  } catch {
    return false
  }
}

class SceneBoundary extends Component<{ fallback: ReactNode; children: ReactNode; onError: () => void }, { failed: boolean }> {
  state = { failed: false }
  static getDerivedStateFromError() {
    return { failed: true }
  }
  componentDidCatch(err: unknown) {
    console.warn('3D scene failed, showing fallback', err)
    this.props.onError()
  }
  render() {
    return this.state.failed ? this.props.fallback : this.props.children
  }
}

function useIsWide() {
  const [wide, setWide] = useState(() => window.matchMedia('(min-width: 1024px)').matches)
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)')
    const on = () => setWide(mq.matches)
    mq.addEventListener('change', on)
    return () => mq.removeEventListener('change', on)
  }, [])
  return wide
}

function Headline({ text, highlight }: { text: string; highlight: string }) {
  const i = text.indexOf(highlight)
  if (i < 0) return <>{text}</>
  return (
    <>
      {text.slice(0, i)}
      <em className="gold">{highlight}</em>
      {text.slice(i + highlight.length)}
    </>
  )
}

export function Hero() {
  const { t } = useLang()
  const reduce = useReducedMotion() ?? false
  const wide = useIsWide()
  const ref = useRef<HTMLElement>(null)
  const panelRefs = useRef<(HTMLElement | null)[]>([])
  const [webgl] = useState(hasWebGL)
  const [ready, setReady] = useState(false)
  const [failed, setFailed] = useState(!webgl)
  const [active, setActive] = useState(true)

  // Stop rendering the scene once the hero is off screen.
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => setActive(e.isIntersecting), { threshold: 0 })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  const lowPower = typeof navigator !== 'undefined' && (navigator.hardwareConcurrency ?? 8) <= 4
  const fallback = (
    <div className="hero__fallback" role="img" aria-label="Static render of the executive on a terrace above the city">
      <img src={poster} alt="" />
    </div>
  )

  const enter = (d: number) =>
    reduce ? {} : { initial: { opacity: 0, y: 18 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.9, delay: d, ease: [0.22, 1, 0.36, 1] as const } }

  return (
    <section id="top" className="hero" ref={ref} aria-label="Introduction">
      <div className="hero__scene" aria-hidden={!failed}>
        {failed ? (
          fallback
        ) : (
          <SceneBoundary fallback={fallback} onError={() => setFailed(true)}>
            <Suspense fallback={null}>
              <HeroCanvas
                animate={!reduce}
                active={active}
                panelRefs={panelRefs}
                quality={lowPower ? 'low' : 'high'}
                onReady={() => setReady(true)}
              />
            </Suspense>
          </SceneBoundary>
        )}
      </div>

      <div className={`hero__loader ${ready || failed ? 'is-done' : ''}`} aria-live="polite">
        <img src={poster} alt="" className="hero__loader-poster" />
        <div className="hero__loader-inner">
          <span className="hero__loader-mark">NVL</span>
          <span className="hero__loader-bar"><span /></span>
          <span className="hero__loader-text">{t(hero.loading)}</span>
        </div>
      </div>

      <div className="hero__shade" aria-hidden="true" />

      <div className="hero__content">
        <motion.p className="eyebrow hero__name" {...enter(0.15)}>
          <span className="eyebrow__rule" />
          <strong>Grey</strong>
          <span className="hero__fullname">{t(profile.name)}</span>
        </motion.p>
        <motion.h1 className="hero__title" {...enter(0.3)}>
          <Headline text={t(hero.headline)} highlight={t(hero.highlight)} />
        </motion.h1>
        <motion.p className="hero__lead" {...enter(0.45)}>
          {t(hero.supporting)}
        </motion.p>
        <motion.ul className="hero__roles" {...enter(0.52)}>
          {hero.roles.map((r, i) => (
            <li key={i}>{t(r)}</li>
          ))}
        </motion.ul>
        <motion.div className="hero__ctas" {...enter(0.6)}>
          <button type="button" className="btn btn--primary" onClick={() => scrollToId('contact')}>
            {t(hero.primary)} <ArrowRight size={16} strokeWidth={1.75} />
          </button>
          <button type="button" className="btn btn--ghost" onClick={() => scrollToId('services')}>
            {t(hero.secondary)}
          </button>
        </motion.div>
        {failed && <p className="hero__note">{t(hero.fallback)}</p>}
      </div>

      {wide && (
        <div className={`hero__panels ${ready || failed ? 'is-on' : ''}`} aria-label="Themes">
          {panels.map((p, i) => {
            const Icon = panelIcons[p.icon]
            const [x, y] = panelLayout[i]
            return (
              <div
                key={p.id}
                className="hero__panel-pos"
                style={{ left: `${((x + 1) / 2) * 100}%`, top: `${((1 - y) / 2) * 100}%` }}
              >
                <div className="hero__panel-track" ref={(el) => { panelRefs.current[i] = el }}>
                  <button
                    type="button"
                    className={`glass-panel ${p.id === 'dgna' ? 'is-brand' : ''}`}
                    data-tilt="10"
                    style={{ animationDelay: `${i * -1.3}s` }}
                    onClick={() => scrollToId(p.target)}
                  >
                    <span className="glass-panel__icon"><Icon size={18} strokeWidth={1.5} /></span>
                    <span className="glass-panel__body">
                      <span className="glass-panel__title">{p.num && <span className="glass-panel__num">{p.num}</span>}{t(p.title)}</span>
                      <span className="glass-panel__text">{t(p.text)}</span>
                    </span>
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {!wide && (
        <div className="hero__strip" aria-label="Themes">
          {panels.map((p, i) => {
            const Icon = panelIcons[p.icon]
            return (
              <button
                key={p.id}
                type="button"
                className={`glass-panel glass-panel--static ${p.id === 'dgna' ? 'is-brand' : ''}`}
                style={{ animationDelay: `${i * -0.9}s` }}
                onClick={() => scrollToId(p.target)}
              >
                <span className="glass-panel__icon"><Icon size={16} strokeWidth={1.5} /></span>
                <span className="glass-panel__body">
                  <span className="glass-panel__title">{p.num && <span className="glass-panel__num">{p.num}</span>}{t(p.title)}</span>
                  <span className="glass-panel__text">{t(p.text)}</span>
                </span>
              </button>
            )
          })}
        </div>
      )}

      <button type="button" className="hero__scroll" onClick={() => scrollToId('about')} aria-label={t(hero.scroll)}>
        <span>{t(hero.scroll)}</span>
        <ChevronDown size={16} strokeWidth={1.5} />
      </button>
    </section>
  )
}
