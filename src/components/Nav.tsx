import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { hero, nav, profile, ui } from '../content/content'
import { useLang } from '../hooks/useLang'
import { scrollToId } from '../hooks/scroll'

function useActiveSection(ids: string[]) {
  const [active, setActive] = useState<string | null>(null)
  useEffect(() => {
    const seen = new Map<string, number>()
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => seen.set(e.target.id, e.isIntersecting ? e.intersectionRatio : 0))
        let best: string | null = null
        let bestR = 0
        seen.forEach((r, id) => {
          if (r > bestR) { bestR = r; best = id }
        })
        setActive(best)
      },
      { rootMargin: '-35% 0px -55% 0px', threshold: [0, 0.01, 0.5, 1] },
    )
    ids.forEach((id) => {
      const el = document.getElementById(id)
      if (el) io.observe(el)
    })
    return () => io.disconnect()
  }, [ids])
  return active
}

export function LangToggle() {
  const { lang, setLang, t } = useLang()
  return (
    <div className="lang" role="group" aria-label={t(ui.langLabel)}>
      {(['en', 'vi'] as const).map((l) => (
        <button key={l} type="button" className={lang === l ? 'is-on' : ''} aria-pressed={lang === l} onClick={() => setLang(l)}>
          {l.toUpperCase()}
        </button>
      ))}
    </div>
  )
}

const items = nav.filter((n) => !n.when || n.when())
const ids = items.map((n) => n.id)

export function Nav() {
  const { t } = useLang()
  const active = useActiveSection(ids)
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 24)
    on()
    window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const go = (id: string) => {
    setOpen(false)
    // wait for the sheet to release scroll lock
    requestAnimationFrame(() => scrollToId(id))
  }

  return (
    <header className={`nav ${scrolled ? 'is-scrolled' : ''}`}>
      <div className="nav__inner">
        <a
          href="#top"
          className="brand"
          onClick={(e) => {
            e.preventDefault()
            window.scrollTo({ top: 0, behavior: 'smooth' })
          }}
        >
          <span className="brand__mark">NVL</span>
          <span className="brand__name">
            Grey <span className="brand__sub">{t(profile.name)}</span>
          </span>
        </a>

        <nav className="nav__links" aria-label="Primary">
          {items.map((n) => (
            <a
              key={n.id}
              href={`#${n.id}`}
              className={active === n.id ? 'is-active' : ''}
              aria-current={active === n.id ? 'true' : undefined}
              onClick={(e) => {
                e.preventDefault()
                go(n.id)
              }}
            >
              {t(n.label)}
            </a>
          ))}
        </nav>

        <div className="nav__actions">
          <LangToggle />
          <button type="button" className="btn btn--small btn--primary nav__cta" onClick={() => go('contact')}>
            {t(hero.primary)}
          </button>
          <button type="button" className="nav__burger" aria-label={t(open ? ui.close : ui.menu)} aria-expanded={open} onClick={() => setOpen((o) => !o)}>
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div className="sheet" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
            <nav aria-label="Mobile">
              {items.map((n, i) => (
                <motion.a
                  key={n.id}
                  href={`#${n.id}`}
                  className={active === n.id ? 'is-active' : ''}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 + i * 0.04 }}
                  onClick={(e) => {
                    e.preventDefault()
                    go(n.id)
                  }}
                >
                  <span className="sheet__idx">{String(i + 1).padStart(2, '0')}</span>
                  {t(n.label)}
                </motion.a>
              ))}
            </nav>
            <div className="sheet__foot">
              <LangToggle />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
