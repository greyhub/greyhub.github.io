import { ExternalLink } from "../components/ExternalLink";
import { Icon } from "../components/Icon";
import { Reveal } from "../components/Reveal";
import { SectionHeading } from "../components/SectionHeading";
import { siteConfig } from "../data/siteConfig";
import { useLanguage } from "../i18n/LanguageContext";

/** Renders verified case studies from siteConfig.caseStudies; hidden while the list is empty. */
export function Projects() {
  const { t, pick } = useLanguage();
  if (siteConfig.caseStudies.length === 0) return null;

  return (
    <section id="projects" className="section projects" aria-labelledby="projects-title">
      <div className="container">
        <SectionHeading id="projects-title" index="—" eyebrow={t.projects.eyebrow} title={t.projects.title} />
        <div className="projects__grid">
          {siteConfig.caseStudies.map((study, i) => (
            <Reveal as="article" key={study.id} className="project" delay={i * 70}>
              <h3 className="project__title">{pick(study.title)}</h3>
              <p className="project__summary">{pick(study.summary)}</p>
              {study.tags?.length ? (
                <ul className="project__tags">
                  {study.tags.map((tag) => (
                    <li key={tag}>{tag}</li>
                  ))}
                </ul>
              ) : null}
              {study.url ? (
                <ExternalLink href={study.url} className="text-link">
                  {t.projects.viewProject} <Icon name="arrowUpRight" size={16} />
                </ExternalLink>
              ) : null}
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
