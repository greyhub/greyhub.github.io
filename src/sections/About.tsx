import { Reveal } from "../components/Reveal";
import { SectionHeading } from "../components/SectionHeading";
import { siteConfig } from "../data/siteConfig";
import { useLanguage } from "../i18n/LanguageContext";

export function About() {
  const { t, pick } = useLanguage();
  const biography = pick(siteConfig.biography);

  return (
    <section id="about" className="section about" aria-labelledby="about-title">
      <div className="container about__grid">
        <div className="about__text">
          <SectionHeading id="about-title" index="01" eyebrow={t.about.eyebrow} title={t.about.title} />
          <Reveal className="about__copy" delay={80}>
            <p className="about__lead">{t.about.lead}</p>
            <p>{t.about.body}</p>
            {biography.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </Reveal>
        </div>

        <ol className="pillars">
          {t.about.pillars.map((pillar, i) => (
            <Reveal as="li" key={pillar.title} className="pillar" delay={i * 70}>
              <span className="pillar__index" aria-hidden="true">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="pillar__title">{pillar.title}</h3>
              <p className="pillar__text">{pillar.text}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
