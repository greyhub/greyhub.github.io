import { Icon } from "../components/Icon";
import { Reveal } from "../components/Reveal";
import { SectionHeading } from "../components/SectionHeading";
import { siteConfig, type Service } from "../data/siteConfig";
import { useLanguage } from "../i18n/LanguageContext";

function ServiceCard({ service, index }: { service: Service; index: number }) {
  const { t, pick } = useLanguage();
  const headingId = `service-${service.id}`;
  return (
    <Reveal
      as="article"
      className={`service ${service.featured ? "service--featured" : ""}`}
      delay={index * 80}
    >
      <div className="service__head">
        <span className="service__icon">
          <Icon name={service.icon} size={service.featured ? 26 : 22} />
        </span>
        <span className="service__index" aria-hidden="true">
          {String(index + 1).padStart(2, "0")}
        </span>
        {service.featured ? <span className="service__badge">{t.services.featuredLabel}</span> : null}
      </div>
      <h3 id={headingId} className="service__title">
        {pick(service.title)}
      </h3>
      <p className="service__description">{pick(service.description)}</p>
      <div className="service__scope">
        <p className="service__scope-label">{t.services.capabilitiesLabel}</p>
        <ul className="service__list" aria-labelledby={headingId}>
          {pick(service.capabilities).map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    </Reveal>
  );
}

export function Services() {
  const { t } = useLanguage();
  return (
    <section id="services" className="section services" aria-labelledby="services-title">
      <div className="container">
        <SectionHeading
          id="services-title"
          index="02"
          eyebrow={t.services.eyebrow}
          title={t.services.title}
          intro={t.services.intro}
        />
        <div className="services__grid">
          {siteConfig.services.map((service, i) => (
            <ServiceCard key={service.id} service={service} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
