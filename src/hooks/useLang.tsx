import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import type { L, Lang } from '../content/content'

type Ctx = { lang: Lang; setLang: (l: Lang) => void; toggle: () => void; t: (s: L) => string }
const LangContext = createContext<Ctx | null>(null)
const KEY = 'grey-portfolio-lang'

function initialLang(): Lang {
  try {
    const saved = localStorage.getItem(KEY)
    if (saved === 'en' || saved === 'vi') return saved
  } catch {
    /* storage unavailable */
  }
  return 'en' // English is the default; the toggle remembers a visitor's choice
}

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(initialLang)
  const setLang = useCallback((l: Lang) => {
    setLangState(l)
    try {
      localStorage.setItem(KEY, l)
    } catch {
      /* storage unavailable */
    }
  }, [])
  useEffect(() => {
    document.documentElement.lang = lang
  }, [lang])
  const value = useMemo<Ctx>(
    () => ({ lang, setLang, toggle: () => setLang(lang === 'en' ? 'vi' : 'en'), t: (s: L) => s[lang] }),
    [lang, setLang],
  )
  return <LangContext.Provider value={value}>{children}</LangContext.Provider>
}

export function useLang() {
  const ctx = useContext(LangContext)
  if (!ctx) throw new Error('useLang must be used inside LangProvider')
  return ctx
}
