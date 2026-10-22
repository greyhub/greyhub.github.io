import { Reveal } from "../components/Reveal";
import { SectionHeading } from "../components/SectionHeading";
import { siteConfig } from "../data/siteConfig";
import { useLanguage } from "../i18n/LanguageContext";

/** Organization names shown as text only — no logos, no relationship claims. Edit in siteConfig.partners. */
export function Partners() {
  const { t } = useLanguage();
  if (siteConfig.partners.length === 0) return null;

  return (
    <section id="partners" className="section partners" aria-labelledby="partners-title">
      <div className="container">
        <SectionHeading
          id="partners-title"
          index="04"
          eyebrow={t.partners.eyebrow}
          title={t.partners.title}
          intro={t.partners.intro}
        />
        <Reveal>
          <ul className="partners__list">
            {siteConfig.partners.map((partner) => (
              <li key={partner.name} className="partners__item" translate="no">
                {partner.name}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
