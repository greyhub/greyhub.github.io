import { useEffect, useState, type ReactNode } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import {
  ArrowUp, ArrowUpRight, Check, Copy, Cpu, GraduationCap, Lightbulb, Mail, MessagesSquare, PanelsTopLeft, ShieldCheck, Tags,
} from 'lucide-react'
import { Github, Linkedin } from './BrandIcons'
import {
  about, approach, contact, footer, journey, nav, pov, principles, profile, services, work, writing,
  type IntentId, type L, type ServiceId, type StepIcon,
} from '../content/content'
import { useLang } from '../hooks/useLang'
import { scrollToId } from '../hooks/scroll'
import { setIntent, useIntent } from '../hooks/intent'

// `glass` puts the card styling on an inner element: the outer wrapper's transform belongs to
// the reveal animation, the inner one to the pointer tilt.
function Reveal({ children, delay = 0, className, glass = false, id }: { children: ReactNode; delay?: number; className?: string; glass?: boolean; id?: string }) {
  const reduce = useReducedMotion()
  const body = glass ? <div className={`${className} glass`} data-tilt="">{children}</div> : children
  const outer = glass ? 'reveal-cell' : className
  if (reduce) return <div className={outer} id={id}>{body}</div>
  return (
    <motion.div
      id={id}
      className={outer}
      initial={{ opacity: 0.25, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {body}
    </motion.div>
  )
}

function SectionHead({ eyebrow, title, children }: { eyebrow: L; title: L; children?: ReactNode }) {
  const { t } = useLang()
  return (
    <Reveal className="section__head">
      <p className="eyebrow">
        <span className="eyebrow__rule" />
        {t(eyebrow)}
      </p>
      <h2 className="section__title">{t(title)}</h2>
      {children}
    </Reveal>
  )
}

const goContact = (id: IntentId) => {
  setIntent(id)
  scrollToId('contact')
}

/* 1 · About */
export function About() {
  const { t } = useLang()
  const based = t(profile.basedIn)
  return (
    <section id="about" className="section section--about">
      <div className="wrap">
        <div className="about__grid">
          <Reveal className="about__card" delay={0.05} glass>
            <div className="monogram" aria-hidden="true">
              <span>N</span><span>V</span><span>L</span>
            </div>
            <p className="about__name">Grey</p>
            <p className="about__nick">{t(profile.name)}</p>
            <dl className="facts">
              <div><dt>{t(about.facts.role)}</dt><dd>{t(profile.role)}</dd></div>
              <div><dt>{t(about.facts.focus)}</dt><dd>{t(about.facts.focusValue)}</dd></div>
              {based && <div><dt>{t(about.facts.based)}</dt><dd>{based}</dd></div>}
            </dl>
          </Reveal>
          <div className="about__copy">
            <SectionHead eyebrow={about.eyebrow} title={about.title} />
            <Reveal className="about__body">
              {about.body.map((b, i) => (
                <p key={i} className={i === 0 ? 'about__lead' : undefined}>{t(b)}</p>
              ))}
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}

/* 2 · Point of view — big type, no cards */
export function PointOfView() {
  const { t } = useLang()
  const reduce = useReducedMotion()
  return (
    <section id="point-of-view" className="section section--pov">
      <div className="wrap pov">
        <SectionHead eyebrow={pov.eyebrow} title={pov.title} />
        <ol className="pov__list">
          {pov.observations.map((o, i) => (
            <motion.li
              key={i}
              initial={reduce ? false : { opacity: 0.15, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            >
              {t(o)}
            </motion.li>
          ))}
        </ol>
        <Reveal className="pov__belief">
          <span className="pov__belief-label">{t(pov.beliefLabel)}</span>
          <p>{t(pov.belief)}</p>
        </Reveal>
      </div>
    </section>
  )
}

/* 3 · Approach — sticky ladder + scrolling steps */
const stepIcons: Record<StepIcon, typeof Cpu> = { shield: ShieldCheck, tags: Tags, cpu: Cpu, lightbulb: Lightbulb }

export function Approach() {
  const { t } = useLang()
  const [active, setActive] = useState(0)

  // Active step = the last one whose top has passed 40% of the viewport.
  useEffect(() => {
    let frame = 0
    const update = () => {
      frame = 0
      const line = window.innerHeight * 0.4
      let idx = 0
      approach.steps.forEach((_, i) => {
        const el = document.getElementById(`step-${i + 1}`)
        if (el && el.getBoundingClientRect().top <= line) idx = i
      })
      setActive(idx)
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <section id="approach" className="section section--approach">
      <div className="wrap">
        <SectionHead eyebrow={approach.eyebrow} title={approach.title}>
          <p className="section__intro">{t(approach.intro)}</p>
        </SectionHead>
        <div className="approach">
          <nav className="approach__rail" aria-label={t(approach.title)}>
            <ol>
              {approach.steps.map((s, i) => (
                <li key={i}>
                  <button
                    type="button"
                    className={active === i ? 'is-on' : active > i ? 'is-done' : ''}
                    aria-current={active === i ? 'step' : undefined}
                    onClick={() => scrollToId(`step-${i + 1}`)}
                  >
                    <span className="approach__num">{String(i + 1).padStart(2, '0')}</span>
                    <span className="approach__rail-text">
                      <span className="approach__rail-name">{t(s.name)}</span>
                      <span className="approach__rail-goal">{t(s.goal)}</span>
                    </span>
                  </button>
                </li>
              ))}
            </ol>
          </nav>
          <div className="approach__steps">
            {approach.steps.map((s, i) => {
              const Icon = stepIcons[s.icon]
              return (
                <article key={i} id={`step-${i + 1}`} data-step={i} className={`step ${active === i ? 'is-on' : ''}`}>
                  <header className="step__head">
                    <span className="step__num">{String(i + 1).padStart(2, '0')}</span>
                    <div>
                      <h3><Icon size={20} strokeWidth={1.4} /> {t(s.name)}</h3>
                      <p className="step__goal">{t(s.goal)}</p>
                    </div>
                  </header>
                  <dl className="step__body">
                    <div>
                      <dt>{t(approach.labels.problem)}</dt>
                      <dd>{t(s.problem)}</dd>
                    </div>
                    <div>
                      <dt>{t(approach.labels.change)}</dt>
                      <dd>{t(s.change)}</dd>
                    </div>
                    <div>
                      <dt>{t(approach.labels.shows)}</dt>
                      <dd>
                        <ul className="tags">
                          {s.shows.map((x, j) => <li key={j}>{t(x)}</li>)}
                        </ul>
                      </dd>
                    </div>
                  </dl>
                </article>
              )
            })}
            <Reveal className="threads">
              <p className="threads__label">{t(approach.threadsLabel)}</p>
              <div className="threads__grid">
                {approach.threads.map((th, i) => (
                  <div key={i}>
                    <h3>{t(th.name)}</h3>
                    <p>{t(th.text)}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
        <p className="bridge">{t(approach.bridge)}</p>
      </div>
    </section>
  )
}

/* 4 · Services */
function Audience({ items }: { items: L[] }) {
  const { t } = useLang()
  return (
    <ul className="audience">
      {items.map((a, i) => <li key={i}>{t(a)}</li>)}
    </ul>
  )
}

export function Services() {
  const { t } = useLang()
  const s = services
  const cta = (id: ServiceId, label: L) => (
    <button type="button" className="btn btn--ghost btn--small service__cta" onClick={() => goContact(id)}>
      {t(label)} <ArrowUpRight size={15} />
    </button>
  )
  return (
    <section id="services" className="section section--services">
      <div className="wrap">
        <SectionHead eyebrow={s.eyebrow} title={s.title}>
          <p className="section__intro">{t(s.intro)}</p>
        </SectionHead>
        <div className="services">
          <Reveal className="service" glass>
            <span className="service__icon"><MessagesSquare size={22} strokeWidth={1.4} /></span>
            <Audience items={[s.audience.businesses, s.audience.individuals]} />
            <h3>{t(s.consulting.name)}</h3>
            <p>{t(s.consulting.text)}</p>
            <dl className="service__lines">
              {s.consulting.lines.map((l, i) => (
                <div key={i}><dt>{t(l.label)}</dt><dd>{t(l.text)}</dd></div>
              ))}
            </dl>
            {cta('consulting', s.consulting.cta)}
          </Reveal>
          <Reveal className="service" glass delay={0.08}>
            <span className="service__icon"><GraduationCap size={22} strokeWidth={1.4} /></span>
            <Audience items={[s.audience.individuals, s.audience.teams]} />
            <h3>{t(s.training.name)}</h3>
            <p>{t(s.training.text)}</p>
            <dl className="service__lines">
              {s.training.topics.map((l, i) => (
                <div key={i}><dt>{t(l.name)}</dt><dd>{t(l.text)}</dd></div>
              ))}
            </dl>
            <ul className="tags service__formats">
              {s.training.formats.map((f, i) => <li key={i}>{t(f)}</li>)}
            </ul>
            {cta('training', s.training.cta)}
          </Reveal>
          <Reveal className="service" glass delay={0.16}>
            <span className="service__icon"><PanelsTopLeft size={22} strokeWidth={1.4} /></span>
            <Audience items={[s.audience.individuals, s.audience.businesses]} />
            <h3>{t(s.landing.name)}</h3>
            <p>{t(s.landing.text)}</p>
            <div className="service__example">
              <p>{t(s.landing.example)}</p>
              <button type="button" className="service__example-link" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                <ArrowUp size={14} /> {t(s.landing.exampleCta)}
              </button>
            </div>
            {cta('landing', s.landing.cta)}
          </Reveal>
        </div>
      </div>
    </section>
  )
}

/* 5 · How I work */
export function Principles() {
  const { t } = useLang()
  return (
    <section id="how-i-work" className="section section--philosophy">
      <div className="wrap">
        <SectionHead eyebrow={principles.eyebrow} title={principles.title} />
        <div className="principles">
          {principles.items.map((p, i) => (
            <Reveal key={i} delay={(i % 2) * 0.06} className="principle">
              <span className="principle__n">{['I', 'II', 'III', 'IV'][i]}</span>
              <blockquote>
                <h3>{t(p.title)}</h3>
                <p>{t(p.text)}</p>
              </blockquote>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

/* 6 · Journey */
export function Journey() {
  const { t } = useLang()
  const reduce = useReducedMotion()
  const story = t(journey.story)
  return (
    <section id="journey" className="section section--journey">
      <div className="wrap">
        <SectionHead eyebrow={journey.eyebrow} title={journey.title}>
          {story && <p className="section__intro">{story}</p>}
        </SectionHead>
        <ol className="timeline timeline--journey">
          {journey.milestones.map((m, i) => {
            const role = t(m.role)
            const note = t(m.note)
            return (
              <motion.li
                key={m.year + m.org}
                className={`timeline__item ${m.current ? 'is-current' : ''}`}
                initial={reduce ? false : { opacity: 0.2, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.7, delay: i * 0.04 }}
              >
                <span className="timeline__dot" aria-hidden="true" />
                <span className="timeline__date">{m.year}</span>
                <div className="timeline__main">
                  <h3>
                    {m.org}
                  </h3>
                  {role && <span className="timeline__role">{role}</span>}
                  {note && <p>{note}</p>}
                </div>
              </motion.li>
            )
          })}
        </ol>
        <Reveal className="chapter-cell">
          <div id="dgna" className="chapter glass" data-tilt="4">
            <span className="chapter__label">{t(journey.chapterLabel)} · DGNA · 2026</span>
            <p>{t(journey.chapter)}</p>
            {profile.dgnaUrl && (
              <a className="work-card__link" href={profile.dgnaUrl} target="_blank" rel="noreferrer">
                {t(journey.visit)} <ArrowUpRight size={15} />
              </a>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  )
}

/* 7 · Work (only with confirmed items) */
export function Work() {
  const { t } = useLang()
  if (work.items.length === 0) return null
  return (
    <section id="work" className="section">
      <div className="wrap">
        <SectionHead eyebrow={work.eyebrow} title={work.title} />
        <div className="work-grid">
          {work.items.map((w, i) => (
            <Reveal key={i} className="work-card" glass delay={(i % 2) * 0.08}>
              <span className="work-card__cat">{t(services[w.service].name)}</span>
              <h3>{t(w.title)}</h3>
              <p>{t(w.context)}</p>
              <p className="work-card__meta">{t(w.role)}</p>
              <p className="work-card__meta">{t(w.result)}</p>
              {w.link && (
                <a className="work-card__link" href={w.link} target="_blank" rel="noreferrer">
                  {t(work.title)} <ArrowUpRight size={15} />
                </a>
              )}
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

/* 8 · Writing & talks (only with items) */
export function Writing() {
  const { t } = useLang()
  if (writing.items.length === 0) return null
  return (
    <section id="writing" className="section">
      <div className="wrap">
        <SectionHead eyebrow={writing.eyebrow} title={writing.title} />
        <div className="work-grid">
          {writing.items.map((w, i) => (
            <a key={i} className="contact-card glass" data-tilt="" href={w.link} target="_blank" rel="noreferrer">
              <span className="contact-card__label">{t(w.kind)} · {w.where} · {w.date}</span>
              <span className="contact-card__value">{t(w.title)}</span>
              <ArrowUpRight className="contact-card__arrow" size={18} />
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

/* 9 · Connect */
export function Contact() {
  const { t } = useLang()
  const intent = useIntent()
  const [topic, setTopic] = useState(0)
  const [format, setFormat] = useState<'Online' | 'Offline'>('Online')
  const [copied, setCopied] = useState(false)

  const chosen = contact.intents.find((i) => i.id === intent) ?? contact.intents[0]
  const subject = `${t(chosen.label)} — [${t(contact.yourName)}]`
  const trainingLines =
    intent === 'training'
      ? `\n${t(contact.trainingTopicLabel)}: ${t(services.training.topics[topic].name)}\n${t(contact.trainingFormatLabel)}: ${format}\n`
      : ''
  const body = `${t(contact.bodyIntro)}\n${trainingLines}\n`
  const href = `mailto:${profile.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {
      const el = document.getElementById('contact-email')
      if (el) {
        const r = document.createRange()
        r.selectNodeContents(el)
        const s = window.getSelection()
        s?.removeAllRanges()
        s?.addRange(r)
      }
    }
  }

  return (
    <section id="contact" className="section section--contact">
      <div className="wrap contact">
        <SectionHead eyebrow={contact.eyebrow} title={contact.title}>
          <p className="section__intro">{t(contact.text)}</p>
        </SectionHead>

        <Reveal className="intent">
          <p className="intent__label" id="intent-label">{t(contact.intentLabel)}</p>
          <div className="chips" role="group" aria-labelledby="intent-label">
            {contact.intents.map((i) => (
              <button key={i.id} type="button" className="chip" aria-pressed={intent === i.id} onClick={() => setIntent(i.id)}>
                {t(i.label)}
              </button>
            ))}
          </div>
          {intent === 'training' && (
            <div className="intent__sub">
              <div className="chips chips--sub" role="group" aria-label={t(contact.trainingTopicLabel)}>
                <span>{t(contact.trainingTopicLabel)}</span>
                {services.training.topics.map((tp, i) => (
                  <button key={i} type="button" className="chip chip--sub" aria-pressed={topic === i} onClick={() => setTopic(i)}>
                    {t(tp.name)}
                  </button>
                ))}
              </div>
              <div className="chips chips--sub" role="group" aria-label={t(contact.trainingFormatLabel)}>
                <span>{t(contact.trainingFormatLabel)}</span>
                {(['Online', 'Offline'] as const).map((f) => (
                  <button key={f} type="button" className="chip chip--sub" aria-pressed={format === f} onClick={() => setFormat(f)}>
                    {f}
                  </button>
                ))}
              </div>
            </div>
          )}
        </Reveal>

        <Reveal className="contact__grid">
          <div className="contact-card contact-card--email glass" data-tilt="">
            <span className="contact-card__label"><Mail size={16} strokeWidth={1.5} /> {t(contact.email)}</span>
            <span id="contact-email" className="contact-card__value">{profile.email}</span>
            <span className="contact-card__subject">{subject}</span>
            <div className="contact-card__actions">
              <a className="btn btn--primary btn--small" href={href}>
                {t(contact.write)} <ArrowUpRight size={15} />
              </a>
              <button type="button" className="btn btn--ghost btn--small" onClick={copy} aria-live="polite">
                {copied ? <Check size={15} /> : <Copy size={15} />} {copied ? t(contact.copied) : t(contact.copy)}
              </button>
            </div>
          </div>
          <a className="contact-card glass" data-tilt="" href={profile.linkedin} target="_blank" rel="noreferrer">
            <span className="contact-card__label"><Linkedin size={16} strokeWidth={1.5} /> LinkedIn</span>
            <span className="contact-card__value">{profile.linkedinLabel}</span>
            <ArrowUpRight className="contact-card__arrow" size={18} />
          </a>
          <a className="contact-card contact-card--minor glass" data-tilt="" href={profile.github} target="_blank" rel="noreferrer">
            <span className="contact-card__label"><Github size={16} strokeWidth={1.5} /> GitHub</span>
            <span className="contact-card__value">{profile.githubLabel}</span>
            <ArrowUpRight className="contact-card__arrow" size={18} />
          </a>
        </Reveal>
      </div>
    </section>
  )
}

export function Footer() {
  const { t } = useLang()
  const items = nav.filter((n) => !n.when || n.when())
  return (
    <footer className="footer">
      <div className="wrap footer__inner">
        <div className="footer__brand">
          <span className="brand__mark">NVL</span>
          <div>
            <p className="footer__name">Grey · {t(profile.name)}</p>
            <p className="footer__role">{t(profile.role)}</p>
            <p className="footer__role">{t(footer.services)}</p>
          </div>
        </div>
        <nav className="footer__nav" aria-label="Footer">
          {items.map((n) => (
            <a key={n.id} href={`#${n.id}`} onClick={(e) => { e.preventDefault(); scrollToId(n.id) }}>
              {t(n.label)}
            </a>
          ))}
          <a href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
          <a href={profile.github} target="_blank" rel="noreferrer">GitHub</a>
        </nav>
        <div className="footer__base">
          <span>© {new Date().getFullYear()} {t(profile.name)}. {t(footer.rights)}</span>
          <button type="button" className="footer__top" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            {t(footer.top)} ↑
          </button>
        </div>
      </div>
    </footer>
  )
}
