import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { siteConfig, type Language, type Localized } from "../data/siteConfig";
import { readStored, writeStored } from "../storage";
import { translations, type Translation } from "./translations";

interface LanguageContextValue {
  language: Language;
  setLanguage: (language: Language) => void;
  t: Translation;
  /** Pick the active-language value from a `Localized` config entry. */
  pick: <T>(value: Localized<T>) => T;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

const isLanguage = (value: unknown): value is Language =>
  typeof value === "string" && (siteConfig.site.supportedLanguages as readonly string[]).includes(value);

function initialLanguage(): Language {
  const stored = readStored(siteConfig.site.storageKeys.language);
  return isLanguage(stored) ? stored : siteConfig.site.defaultLanguage;
}

function setMeta(selector: string, content: string) {
  document.querySelector(selector)?.setAttribute("content", content);
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(initialLanguage);

  const setLanguage = useCallback((next: Language) => {
    setLanguageState(next);
    writeStored(siteConfig.site.storageKeys.language, next);
  }, []);

  const t = translations[language];

  useEffect(() => {
    document.documentElement.lang = language;
    document.title = t.meta.title;
    setMeta('meta[name="description"]', t.meta.description);
    setMeta('meta[property="og:description"]', t.meta.description);
    setMeta('meta[property="og:locale"]', t.meta.ogLocale);
  }, [language, t]);

  const value = useMemo<LanguageContextValue>(
    () => ({ language, setLanguage, t, pick: (v) => v[language] }),
    [language, setLanguage, t],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used inside <LanguageProvider>");
  return ctx;
}
