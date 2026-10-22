import { ExternalLink } from "../components/ExternalLink";
import { Icon } from "../components/Icon";
import { Reveal } from "../components/Reveal";
import { mailtoHref, siteConfig } from "../data/siteConfig";
import { useLanguage } from "../i18n/LanguageContext";

export function Contact() {
  const { t, pick } = useLanguage();
  const { email, linkedin } = siteConfig.contact;
  const linkedinDisplay = linkedin.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");

  return (
    <section id="contact" className="section contact" aria-labelledby="contact-title">
      <div className="container">
        <Reveal className="contact__panel glass">
          <div className="contact__intro">
            <p className="eyebrow">
              <span className="eyebrow__index">05</span>
              <span className="eyebrow__rule" aria-hidden="true" />
              {t.contact.eyebrow}
            </p>
            <h2 id="contact-title" className="contact__title">
              {t.contact.title}
            </h2>
            <p className="contact__text">{t.contact.text}</p>
            <div className="contact__actions">
              <a href={mailtoHref(pick(siteConfig.contactCta.emailSubject))} className="button button--primary">
                <Icon name="mail" size={18} />
                {t.contact.emailCta}
              </a>
              <ExternalLink href={linkedin} className="button button--ghost">
                <Icon name="linkedin" size={18} />
                {t.contact.linkedinCta}
              </ExternalLink>
            </div>
          </div>

          <dl className="contact__channels">
            <div className="channel">
              <dt>{t.contact.emailLabel}</dt>
              <dd>
                <a href={mailtoHref()} className="channel__link">
                  {email}
                  <Icon name="arrowUpRight" size={18} />
                </a>
              </dd>
            </div>
            <div className="channel">
              <dt>{t.contact.linkedinLabel}</dt>
              <dd>
                <ExternalLink href={linkedin} className="channel__link">
                  {linkedinDisplay}
                  <Icon name="arrowUpRight" size={18} />
                </ExternalLink>
              </dd>
            </div>
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
