import { mailtoHref, siteConfig } from "../data/siteConfig";
import { useLanguage } from "../i18n/LanguageContext";
import { navSections } from "../i18n/translations";
import { ExternalLink } from "./ExternalLink";
import { Icon } from "./Icon";

export function Footer() {
  const { t } = useLanguage();
  const { person, contact } = siteConfig;
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="container site-footer__grid">
        <div className="site-footer__identity">
          <span className="brand__mark" aria-hidden="true">
            {person.monogram}
          </span>
          <div>
            <p className="site-footer__name">{person.displayName}</p>
            <p className="site-footer__role">{person.title}</p>
          </div>
        </div>

        <nav aria-label={t.a11y.footerNav}>
          <ul className="site-footer__nav">
            {navSections
              .filter((id) => id !== "home")
              .map((id) => (
                <li key={id}>
                  <a href={`#${id}`}>{t.nav[id]}</a>
                </li>
              ))}
          </ul>
        </nav>

        <ul className="site-footer__contact">
          <li>
            <a href={mailtoHref()}>
              <Icon name="mail" size={16} />
              {contact.email}
            </a>
          </li>
          <li>
            <ExternalLink href={contact.linkedin}>
              <Icon name="linkedin" size={16} />
              LinkedIn
            </ExternalLink>
          </li>
        </ul>
      </div>

      <div className="container site-footer__bottom">
        <p>
          © {year} {person.displayName}. {t.footer.rights}
        </p>
        <a href="#home" className="site-footer__top">
          {t.footer.backToTop}
          <Icon name="arrowUp" size={16} />
        </a>
      </div>
    </footer>
  );
}
