import { HeroVisual } from "../components/HeroVisual";
import { Icon } from "../components/Icon";
import { siteConfig } from "../data/siteConfig";
import { useLanguage } from "../i18n/LanguageContext";

/** Splits the headline so the configured emphasis can be styled. */
function Headline({ text, emphasis }: { text: string; emphasis: string }) {
  const at = emphasis ? text.lastIndexOf(emphasis) : -1;
  if (at < 0) return <>{text}</>;
  return (
    <>
      {text.slice(0, at)}
      <span className="hero__emphasis">{emphasis}</span>
      {text.slice(at + emphasis.length)}
    </>
  );
}

export function Hero() {
  const { t, pick } = useLanguage();
  const { person, hero } = siteConfig;

  return (
    <section id="home" className="hero" aria-labelledby="hero-title">
      <div className="hero__backdrop" aria-hidden="true" />
      <div className="container hero__grid">
        <div className="hero__content">
          <p className="hero__identity">
            <span className="hero__name">{person.displayName}</span>
            <span className="hero__divider" aria-hidden="true" />
            <span className="hero__role">{person.title}</span>
          </p>

          <h1 id="hero-title" className="hero__title">
            <Headline text={pick(hero.headline)} emphasis={pick(hero.headlineEmphasis)} />
          </h1>

          <p className="hero__description">{pick(hero.description)}</p>

          <div className="hero__actions">
            <a href="#services" className="button button--primary">
              {t.hero.primaryCta}
              <Icon name="arrowRight" size={18} />
            </a>
            <a href="#contact" className="button button--ghost">
              {t.hero.secondaryCta}
            </a>
          </div>

          <p className="hero__kicker">{pick(hero.kicker)}</p>
        </div>

        <div className="hero__visual">
          <HeroVisual />
        </div>
      </div>

      <a href="#about" className="hero__scroll">
        <span>{t.hero.scrollHint}</span>
        <Icon name="arrowDown" size={16} />
      </a>
    </section>
  );
}
