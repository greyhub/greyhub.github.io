import { siteConfig } from "../data/siteConfig";
import { useLanguage } from "../i18n/LanguageContext";

export function LanguageSwitcher() {
  const { language, setLanguage, t } = useLanguage();
  return (
    <div className="segmented" role="group" aria-label={t.a11y.languageGroup}>
      {siteConfig.site.supportedLanguages.map((lang) => (
        <button
          key={lang}
          type="button"
          className="segmented__option"
          aria-pressed={language === lang}
          aria-label={`${lang.toUpperCase()} – ${t.a11y.switchLanguageTo[lang]}`}
          lang={lang}
          onClick={() => setLanguage(lang)}
        >
          {lang.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
